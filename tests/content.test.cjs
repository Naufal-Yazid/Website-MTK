/* eslint-disable @typescript-eslint/no-require-imports -- Dependency-free Node test runner. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const root = path.join(__dirname, '..')

function loader(mocks = {}) {
  const cache = new Map()
  function load(relative) {
    const file = path.resolve(root, relative)
    if (cache.has(file)) return cache.get(file)
    const api = {}; cache.set(file, api)
    const source = fs.readFileSync(file, 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } })
    vm.runInNewContext(outputText, {
      exports: api, process: { env: { NEXT_PUBLIC_SUPABASE_URL: 'https://example.invalid', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon' } },
      console: { warn: () => {} },
      require: name => {
        if (name in mocks) return mocks[name]
        if (name === 'server-only') return {}
        if (name.startsWith('.') || name.startsWith('@/')) {
          const base = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(file), name)
          const resolved = ['', '.ts', '.tsx'].map(ext => base + ext).find(value => fs.existsSync(value) && fs.statSync(value).isFile())
          if (!resolved) throw Error(`Unresolved ${name}`)
          return load(resolved)
        }
        return require(name)
      },
    }, { filename: file })
    return api
  }
  return load
}
const load = loader()
const model = load('src/lib/content/model.ts')
const { contentDocuments: docs } = load('src/lib/content/catalog.ts')

test('fixed catalog covers existing projects/phases/types and validates every default', () => {
  assert.equal(docs.length, 11)
  assert.equal(new Set(docs.map(doc => doc.id)).size, docs.length)
  for (const doc of docs) {
    assert.ok(fs.existsSync(path.join(root, 'src/app', doc.path, 'page.tsx')))
    assert.equal(new Set(doc.fields.map(field => field.key)).size, doc.fields.length)
    assert.equal(model.validateValues(doc, model.defaultValues(doc)).error, undefined)
    const source = fs.readFileSync(path.join(root, 'src/app', doc.path, 'ContentView.tsx'), 'utf8')
    for (const match of source.matchAll(/text\("([^"]+)"\)/g)) assert.ok(doc.fields.some(field => field.key === match[1]), `${doc.id}: ${match[1]}`)
  }
  assert.equal(model.findDocument('new-project'), undefined)
})

test('validation rejects unknown keys, missing fields, huge text and invalid prices', () => {
  const doc = model.findDocument('tipe-36'); const values = model.defaultValues(doc)
  for (const price of ['-1', '0', '450.000.000', '1e9', '1000000000001', 'NaN']) assert.ok(model.validateValues(doc, { ...values, price }).error)
  assert.ok(model.validateValues(doc, { ...values, href: 'https://evil.invalid' }).error)
  assert.ok(model.validateValues(doc, { ...values, 'hero.title': 'x'.repeat(181) }).error)
  assert.ok(model.validateValues(doc, { ...values, 'hero.title': '' }).error)
  assert.ok(model.validateValues(doc, {}).error)
  assert.ok(model.validateValues(doc, JSON.parse('{"__proto__":{"x":1}}')).error)
})

test('published resolver ignores invalid stored data and never receives draft content', () => {
  const bundle = model.resolvePublished([{ document_key: 'tipe-36', content: { price: '600000000', secret: 'hidden', 'hero.title': '' } }])
  assert.equal(bundle['tipe-36'].price, '600000000')
  assert.equal(bundle['tipe-36'].secret, undefined)
  assert.equal(bundle['tipe-36']['hero.title'], 'TCI 3 — Tipe 36')
})

function publicHarness({ user = true, active = true, draftError = false, publishedError = false } = {}) {
  const reads = []
  const published = [{ document_key: 'tipe-36', content: { 'hero.title': 'Live title', price: '600000000' } }]
  const mocks = {
    '@supabase/supabase-js': { createClient: () => ({ from: table => {
      reads.push(`anon:${table}`); assert.equal(table, 'site_content_published')
      return { select: async () => ({ data: published, error: publishedError ? { code: '42P01' } : null }) }
    } }) },
    '@/lib/supabase/server': { createClient: async () => ({
      auth: { getUser: async () => ({ data: { user: user ? { id: 'test-admin' } : null } }) },
      from: table => { reads.push(`session:${table}`); return { select: () => ({ eq: () => ({
        single: async () => ({ data: { id: 'test-admin', is_active: active } }),
        maybeSingle: async () => ({ data: { content: { 'hero.title': 'Private draft', price: '700000000' }, revision: 2 }, error: draftError ? { code: '42P01' } : null }),
      }) }) } },
    }) },
    'next/navigation': { redirect: path => { throw new Error(`redirect:${path}`) } },
  }
  return { api: loader(mocks)('src/lib/content/server.ts'), reads }
}

test('regular public requests read only published content even with admin session', async () => {
  const { api, reads } = publicHarness()
  const result = await api.getPageContent(Promise.resolve({}))
  assert.equal(result.content['tipe-36']['hero.title'], 'Live title')
  assert.equal(result.preview, null)
  assert.deepEqual(reads, ['anon:site_content_published'])
})

test('draft preview requires active admin; anonymous/inactive cannot read drafts', async () => {
  for (const options of [{ user: false }, { active: false }]) {
    const { api, reads } = publicHarness(options)
    await assert.rejects(api.getPageContent(Promise.resolve({ preview: 'tipe-36' })), /redirect:\/admin\/login/)
    assert.ok(!reads.includes('session:site_content_drafts'))
  }
  const { api } = publicHarness()
  const preview = await api.getPageContent(Promise.resolve({ preview: 'tipe-36' }))
  assert.equal(preview.content['tipe-36']['hero.title'], 'Private draft')
  assert.equal(preview.preview.revision, 2)
  const normal = await api.getPageContent(Promise.resolve({}))
  assert.equal(normal.content['tipe-36']['hero.title'], 'Live title')
  assert.equal((await api.contentMetadata({ searchParams: Promise.resolve({ preview: 'tipe-36' }) })).robots.index, false)
})

test('missing migration keeps public defaults; preview storage errors fail closed', async () => {
  const result = await publicHarness({ publishedError: true }).api.getPageContent(Promise.resolve({}))
  assert.equal(result.content['tipe-36'].price, '450000000')
  await assert.rejects(publicHarness({ draftError: true }).api.getPageContent(Promise.resolve({ preview: 'tipe-36' })), /Draft belum/)
})

function viewLoader(tab = 'cluster', bundle = model.resolvePublished([])) {
  const nullComponent = () => null
  return loader({
    react: { ...React, useState: () => [tab, () => {}] },
    'next/image': ({ src, alt, className }) => React.createElement('img', { src, alt, className }),
    'next/link': ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children),
    '@/components/layout/CTABanner': nullComponent,
    '@/components/sections/InquiryForm': ({ defaultProyek, defaultTipe }) => React.createElement('div', { 'data-inquiry-project': defaultProyek, 'data-inquiry-type': defaultTipe }),
    '@/components/sections/KPRCalculator': ({ initialHarga }) => React.createElement('div', { 'data-kpr': initialHarga }),
    '@/lib/content/server': { getPageContent: async () => ({ content: bundle, preview: null }) },
    '@/components/content/PreviewNotice': nullComponent,
  })
}

test('every detail view renders safe text, preserving forms and image layout', () => {
  const content = model.resolvePublished([])
  for (const doc of docs) {
    content[doc.id]['hero.title'] = '<script>alert(1)</script>'
    const Component = viewLoader()(`src/app${doc.path}/ContentView.tsx`).default
    const html = renderToStaticMarkup(React.createElement(Component, { content }))
    assert.match(html, /&lt;script&gt;/)
    assert.doesNotMatch(html, /<script>/)
    assert.match(html, /data-inquiry-project=/)
    assert.match(html, /<section/)
  }
})

test('unit price and specifications are shared by cards, comparison and KPR', () => {
  const content = model.resolvePublished([])
  for (const [id, tab] of [['tipe-36','cluster'], ['tipe-45','cluster'], ['tipe-50','cluster'], ['non-cluster-50','non-cluster'], ['teranova','ruko']]) {
    content[id].price = '777000000'
    content[id]['card.title'] = `Updated ${id}`
    content[id]['specs.0.value'] = '199 m²'
    const render = viewLoader(tab)
    const doc = model.findDocument(id)
    const overview = renderToStaticMarkup(React.createElement(render('src/app/proyek/tci/tci-3/ContentView.tsx').default, { content }))
    const detail = renderToStaticMarkup(React.createElement(render(`src/app${doc.path}/ContentView.tsx`).default, { content }))
    assert.match(overview, /Rp 777 Jt/)
    assert.ok(overview.includes(`Updated ${id}`))
    assert.match(detail, /data-kpr="777000000"/)
    assert.match(detail, /199 m²/)
    if (tab === 'cluster') assert.match(overview, /199 m²/)
  }
})

test('project cards on home/list and TCI phase cards consume the shared text', async () => {
  const content = model.resolvePublished([])
  for (const id of ['tci','rancamanyar','permata-buah-batu','tci-1','tci-2','tci-3']) content[id]['hero.title'] = `Shared ${id}`
  const render = viewLoader('cluster', content)
  for (const file of ['src/app/page.tsx','src/app/proyek/page.tsx']) {
    const element = await render(file).default({ searchParams: Promise.resolve({}) })
    const html = renderToStaticMarkup(element)
    for (const id of ['tci','rancamanyar','permata-buah-batu']) assert.ok(html.includes(`Shared ${id}`))
  }
  const html = renderToStaticMarkup(React.createElement(render('src/app/proyek/tci/ContentView.tsx').default, { content }))
  for (const id of ['tci-1','tci-2','tci-3']) assert.ok(html.includes(`Shared ${id}`))
})

function actionHarness({ denied = false, conflict = false } = {}) {
  const calls = []; const invalidated = []; const logs = []
  const doc = model.findDocument('tipe-36')
  const client = {
    rpc: async (name, args) => { calls.push({ name, args }); return { data: 2, error: conflict ? { message: 'content_conflict' } : null } },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { content: model.defaultValues(doc), revision: 2 }, error: null }) }) }) }),
  }
  const api = loader({
    'next/cache': { revalidatePath: value => invalidated.push(value) },
    '@/lib/content/server': { requireContentAdmin: async () => { if (denied) throw Error('unauthorized'); return client } },
    '@/lib/logs/server': { runAdminAction: async (context, operation) => { logs.push(context); return operation() } },
  })('src/app/admin/(dashboard)/content/actions.ts')
  return { api, calls, invalidated, logs, doc }
}

test('save validates on server, uses conditional revision RPC and does not invalidate public pages', async () => {
  const { api, calls, invalidated, logs, doc } = actionHarness()
  assert.equal((await api.saveContentDraft('new-project', {}, 0)).success, false)
  assert.equal((await api.saveContentDraft(doc.id, { ...model.defaultValues(doc), href: '/evil' }, 0)).success, false)
  assert.equal(calls.length, 0)
  assert.equal((await api.saveContentDraft(doc.id, model.defaultValues(doc), 1)).success, true)
  assert.equal(calls[0].name, 'save_content_draft')
  assert.equal(calls[0].args.p_expected_revision, 1)
  assert.ok(invalidated.every(value => value.startsWith('/admin/')))
  assert.equal(logs.at(-1).action, 'content.save_draft')
  assert.equal(logs.at(-1).details.p_values, undefined)
})

test('publish rejects stale revision; publishes saved snapshot and refreshes connected public routes', async () => {
  const { api, calls, invalidated } = actionHarness()
  assert.equal((await api.publishContentDraft('tipe-36', 1)).success, false)
  assert.equal(calls.length, 0)
  assert.equal((await api.publishContentDraft('tipe-36', 2)).success, true)
  assert.equal(calls[0].name, 'publish_content_draft')
  assert.equal(calls[0].args.p_values, undefined)
  for (const route of ['/', '/proyek', '/proyek/tci/tci-3', '/proyek/tci/tci-3/tipe-36']) assert.ok(invalidated.includes(route))
})

test('authorization and DB revision conflict fail without claiming a successful save', async () => {
  const denied = actionHarness({ denied: true })
  assert.equal((await denied.api.saveContentDraft('tipe-36', model.defaultValues(denied.doc), 1)).success, false)
  assert.equal(denied.calls.length, 0)
  const conflict = actionHarness({ conflict: true })
  const result = await conflict.api.saveContentDraft('tipe-36', model.defaultValues(conflict.doc), 1)
  assert.equal(result.success, false)
  assert.match(result.error, /admin lain/)
  assert.equal(conflict.invalidated.length, 0)
})

test('content overview has a compact header and a link to the beginner guide', async () => {
  const render = loader({
    'next/link': ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children),
    '@/lib/content/admin': { getContentAdminData: async () => ({ drafts: [], published: [], error: null }) },
  })
  const Page = render('src/app/admin/(dashboard)/content/page.tsx').default
  const html = renderToStaticMarkup(await Page())
  assert.match(html, /href="\/admin\/content\/petunjuk"/)
  assert.match(html, /Lihat petunjuk/)
  assert.match(html, /Pilih halaman yang ingin diperbarui\./)
  assert.doesNotMatch(html, /Simpan draft → preview → publikasikan/)
  assert.match(html, /sm:flex-row/)
})

test('static guide route explains actual workflow and links back without querying content storage', () => {
  const render = loader({
    'next/link': ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children),
  })
  const guide = render('src/app/admin/(dashboard)/content/petunjuk/page.tsx')
  const html = renderToStaticMarkup(React.createElement(guide.default))
  assert.equal(guide.metadata.robots.index, false)
  assert.match(html, /Petunjuk Konten Website/)
  assert.match(html, /Simpan Draft/)
  assert.match(html, /Preview/)
  assert.match(html, /Ya, publikasikan/)
  assert.match(html, /500000000/)
  assert.match(html, /admin lain/)
  assert.match(html, /href="\/admin\/content"/)
  assert.equal((html.match(/<details/g) || []).length, 5)
  assert.ok(fs.existsSync(path.join(root, 'src/app/admin/(dashboard)/layout.tsx')))
})
