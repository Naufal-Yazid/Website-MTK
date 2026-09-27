/* eslint-disable @typescript-eslint/no-require-imports -- Node's built-in test runner, no extra test dependencies. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

// Test the actual TypeScript helpers without adding a test framework dependency.
const source = fs.readFileSync(path.join(__dirname, '../src/lib/logs/filters.ts'), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } })
const exportsObject = {}
vm.runInNewContext(outputText, { exports: exportsObject })
const { normalizeLogFilters, safeErrorCode, actionFailed } = exportsObject

test('defaults and repeated query parameters are safe', () => {
  const value = normalizeLogFilters({ kind: ['error', 'audit'], page: ['2'], from: ['2026-01-01'] })
  assert.equal(value.kind, 'audit')
  assert.equal(value.page, 1)
  assert.equal(value.from, '')
  assert.equal(normalizeLogFilters({ kind: 'error' }).kind, 'error')
})

test('validates calendar dates and reversed ranges', () => {
  assert.equal(normalizeLogFilters({ from: '2024-02-29' }).from, '2024-02-29')
  assert.equal(normalizeLogFilters({ from: '2026-02-29' }).from, '')
  assert.equal(normalizeLogFilters({ to: '2026-13-01' }).to, '')
  assert.equal(normalizeLogFilters({ from: '2026-09-02', to: '2026-09-01' }).invalidRange, true)
})

test('bounds pagination and search input; strips filter operators', () => {
  for (const page of ['-1', '0', 'NaN', '1.5', 'Infinity']) assert.equal(normalizeLogFilters({ page }).page, 1)
  assert.equal(normalizeLogFilters({ page: '999999' }).page, 10000)
  assert.equal(normalizeLogFilters({ q: 'a'.repeat(100) }).q.length, 80)
  assert.doesNotMatch(normalizeLogFilters({ q: 'admin),kind.eq.error,%*"' }).q, /[,()%*\"]/)
})

test('classifies returned failures without treating void mutations as errors', () => {
  assert.equal(actionFailed(undefined), false)
  assert.equal(actionFailed({ success: true }), false)
  assert.equal(actionFailed({ success: false }), true)
  assert.equal(actionFailed({ error: 'failure' }), true)
  assert.equal(actionFailed({ error: null }), false)
})

test('only structured safe error codes can enter diagnostics', () => {
  assert.equal(safeErrorCode({ code: 'PGRST205', message: 'private data' }), 'PGRST205')
  assert.equal(safeErrorCode(new Error('password=secret')), null)
  assert.equal(safeErrorCode({ code: 'Bearer secret-token' }), null)
  assert.equal(safeErrorCode(null), null)
})

function serverHarness({ authenticated = true, active = true, storageError = false } = {}) {
  const entries = []
  const actor = { id: '11111111-1111-4111-8111-111111111111', full_name: 'Admin Test', is_active: active }
  const session = {
    auth: { getUser: async () => ({ data: { user: authenticated ? { id: actor.id } : null } }) },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: actor }) }) }) }),
  }
  const modules = {
    'server-only': {},
    '@supabase/supabase-js': { createClient: () => ({ from: () => ({ insert: async (entry) => {
      if (storageError) throw new Error('storage unavailable')
      entries.push(entry)
      return { error: null }
    } }) }) },
    '@/lib/supabase/server': { createClient: async () => session },
    './filters': exportsObject,
  }
  const serverSource = fs.readFileSync(path.join(__dirname, '../src/lib/logs/server.ts'), 'utf8')
  const compiled = ts.transpileModule(serverSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } })
  const api = {}
  vm.runInNewContext(compiled.outputText, {
    exports: api, require: (name) => {
      if (!(name in modules)) throw new Error(`Unexpected module ${name}`)
      return modules[name]
    },
    process: { env: { NEXT_PUBLIC_SUPABASE_URL: 'https://example.invalid', SUPABASE_SERVICE_ROLE_KEY: 'test-only-key' } },
    console: { warn: () => {} },
  })
  return { api, entries, actor }
}

test('audit gets actor from server session and keeps mutation result', async () => {
  const { api, entries, actor } = serverHarness()
  const result = await api.runAdminAction({ action: 'test.update', summary: 'Update test', targetId: actor.id }, async () => ({ success: true }))
  assert.equal(result.success, true)
  assert.equal(entries.length, 1)
  assert.equal(entries[0].kind, 'audit')
  assert.equal(entries[0].actor_id, actor.id)
  assert.equal(entries[0].target_id, actor.id)
})

test('unauthenticated and inactive users cannot execute the mutation', async () => {
  for (const options of [{ authenticated: false }, { active: false }]) {
    const { api, entries } = serverHarness(options)
    let executed = false
    await assert.rejects(api.runAdminAction({ action: 'test', summary: 'Test' }, async () => { executed = true }), /Unauthorized/)
    assert.equal(executed, false)
    assert.equal(entries.length, 0)
  }
})

test('returned and thrown failures log no raw secret and preserve failure behavior', async () => {
  const { api, entries } = serverHarness()
  const context = { action: 'test', summary: 'Test', targetId: 'untrusted value' }
  const result = await api.runAdminAction(context, async () => ({ success: false, error: 'password=secret' }))
  assert.equal(result.success, false)
  const failure = new Error('Bearer secret-token')
  await assert.rejects(api.runAdminAction(context, async () => { throw failure }), (error) => error === failure)
  assert.equal(entries.length, 2)
  assert.equal(entries[0].kind, 'error')
  assert.equal(entries[1].kind, 'error')
  assert.equal(entries[0].target_id, null)
  assert.doesNotMatch(JSON.stringify(entries), /secret|Bearer|password=/)
})

test('logging outage does not turn a successful mutation into failure', async () => {
  const { api } = serverHarness({ storageError: true })
  const result = await api.runAdminAction({ action: 'test', summary: 'Test' }, async () => ({ success: true }))
  assert.equal(result.success, true)
})
