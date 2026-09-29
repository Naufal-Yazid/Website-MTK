/* eslint-disable @typescript-eslint/no-require-imports -- Dependency-free Node test runner. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const vm = require('node:vm')

const cache = new Map()
function load(file) {
  file = path.resolve(__dirname, '../src/lib/content', file)
  if (cache.has(file)) return cache.get(file)
  const exports = {}; cache.set(file, exports)
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  vm.runInNewContext(source, { exports, URL, process: { env: {} }, require: name => name.startsWith('.') ? load(path.resolve(path.dirname(file), name + '.ts')) : require(name) })
  return exports
}
const { buildAdminCatalog, filterAdminCatalog } = load('admin-catalog.ts')
const rows = buildAdminCatalog([
  { document_key: 'tipe-36', revision: 2, content: { availability: 'sold_out', 'hero.title': 'Private draft' } },
], [{ document_key: 'tipe-36', revision: 1, content: { availability: 'limited' } }], 'content')

test('catalog metadata keeps draft and public status separate without exposing raw content', () => {
  assert.equal(rows.length, 11)
  const unit = rows.find(item => item.id === 'tipe-36')
  assert.equal(unit.pending, true)
  assert.equal(unit.availability, 'limited')
  assert.equal(unit.draftAvailability, 'sold_out')
  assert.equal(unit.revision, 1)
  assert.doesNotMatch(JSON.stringify(rows), /Private draft|hero.title/)
  assert.equal(buildAdminCatalog([], [], 'availability').length, 9)
  assert.equal(rows.filter(item => item.hasBrochure).length, 3)
})

test('search, category and status filters compose and tolerate whitespace/case', () => {
  assert.equal(filterAdminCatalog(rows, '  tCi  ', 'all', 'all').length, 9)
  assert.equal(filterAdminCatalog(rows, '36', 'Tipe unit', 'draft')[0].id, 'tipe-36')
  assert.equal(filterAdminCatalog(rows, '36', 'Komplek', 'draft').length, 0)
  assert.equal(filterAdminCatalog(rows, 'unmatched', 'all', 'all').length, 0)
  assert.equal(filterAdminCatalog(rows, '', 'all', 'missing-brochure').length, 8)
  assert.ok(filterAdminCatalog(rows, '', 'all', 'limited').some(item => item.id === 'tipe-36'))
  assert.ok(!filterAdminCatalog(rows, '', 'all', 'sold_out').some(item => item.id === 'tipe-36'))
  assert.equal(filterAdminCatalog(rows, '', 'all', 'all').length, rows.length)
})

test('published and default filters do not mislabel a pending draft as ready', () => {
  const published = buildAdminCatalog([{ document_key: 'tipe-36', revision: 2, content: {} }], [{ document_key: 'tipe-36', revision: 2, content: {} }], 'content')
  assert.equal(filterAdminCatalog(published, '', 'all', 'published').length, 1)
  assert.equal(filterAdminCatalog(published, '', 'all', 'draft').length, 0)
  assert.equal(filterAdminCatalog(rows, '', 'all', 'published').length, 0)
  assert.equal(filterAdminCatalog(rows, '', 'all', 'default').length, 10)
})
