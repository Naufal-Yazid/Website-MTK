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
  mocks = { '@/lib/media/server': { getImageAdminData: async () => ({ drafts: [], published: [], error: null }), getPublishedImages: async () => ({}) }, ...mocks }
  const cache = new Map()
  function load(relative) {
    const file = path.resolve(root, relative)
    if (cache.has(file)) return cache.get(file)
    const api = {}; cache.set(file, api)
    const source = fs.readFileSync(file, 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } })
    vm.runInNewContext(outputText, {
      exports: api, process: { env: { NEXT_PUBLIC_SUPABASE_URL: 'https://example.invalid', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon' } },
      console: { warn: () => {} }, URL, FormData, File, Buffer, AbortSignal,
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

test('all main admin menus use the shared Help-style header with responsive actions', () => {
  const Header = load('src/components/admin/AdminPageHeader.tsx').default
  for (const icon of ['dashboard','analytics','leads','content','brochures','logs','settings','help']) {
    const html = renderToStaticMarkup(React.createElement(Header, {icon, title: 'Judul '+icon, description: 'Deskripsi menu', actions: React.createElement('button', {type:'button'}, 'Aksi')}))
    assert.equal((html.match(/<h1 /g)||[]).length,1)
    assert.match(html,/h-12 w-12 shrink-0/)
    assert.match(html,/rounded-xl bg-blue-50 text-\[#0B5EAA\]/)
    assert.match(html,/aria-hidden="true"/)
    assert.match(html,/sm:flex-row/)
    assert.match(html,/<button type="button">Aksi<\/button>/)
  }
  for (const route of ['dashboard','analytics','leads','logs','settings']) {
    const source = fs.readFileSync(path.join(root,'src/app/admin/(dashboard)',route,'page.tsx'),'utf8')
    assert.match(source,new RegExp('<AdminPageHeader icon="'+route+'"'))
    assert.doesNotMatch(source,/<h1\b/)
  }
  for (const route of ['content','brosur-lokasi']) assert.match(fs.readFileSync(path.join(root,'src/app/admin/(dashboard)',route,'page.tsx'),'utf8'),/<ManagementHeader/)
  assert.match(fs.readFileSync(path.join(root,'src/components/admin/content/ManagementHeader.tsx'),'utf8'),/<AdminPageHeader/)
  assert.match(fs.readFileSync(path.join(root,'src/components/admin/help/HelpCenter.tsx'),'utf8'),/<AdminPageHeader icon="help"/)
})

test('lead actions have explicit colors, Logout aligns with menu padding and image guide is full width', () => {
  const detail = fs.readFileSync(path.join(root, 'src/components/admin/leads/InquiryDetailModal.tsx'), 'utf8')
  assert.match(detail, /onClick=\{handleWaClick\} className="bg-green-600 text-white hover:bg-green-700 hover:text-white"/)
  const exports = fs.readFileSync(path.join(root, 'src/components/admin/leads/ExportButton.tsx'), 'utf8')
  assert.match(exports, /DropdownMenuContent align="end" className="[^"]*bg-white text-gray-700/)
  assert.equal((exports.match(/focus:bg-gray-100 focus:text-gray-900/g) || []).length, 2)
  const sidebar = fs.readFileSync(path.join(root, 'src/components/admin/Sidebar.tsx'), 'utf8')
  assert.match(sidebar, /h-auto w-full px-2 py-2 text-white\/70/)
  assert.match(sidebar, /aria-label="Logout"/)
  const render = loader({ 'next/link': ({ children, ...props }) => React.createElement('a', props, children) })
  const Guide = render('src/app/admin/(dashboard)/content/gambar/petunjuk/page.tsx').default
  const html = renderToStaticMarkup(React.createElement(Guide))
  assert.match(html, /^<div class="w-full space-y-6">/)
  assert.doesNotMatch(html, /max-w-4xl/)
})
const model = load('src/lib/content/model.ts')
const { contentDocuments: docs } = load('src/lib/content/catalog.ts')
const availability = load('src/lib/content/availability.ts')

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
  const published = [{ document_key: 'tipe-36', content: { 'hero.title': 'Live title', price: '600000000', availability: 'available' } }]
  const mocks = {
    '@supabase/supabase-js': { createClient: () => ({ from: table => {
      reads.push(`anon:${table}`); assert.equal(table, 'site_content_published')
      return { select: async () => ({ data: published, error: publishedError ? { code: '42P01' } : null }) }
    } }) },
    '@/lib/supabase/server': { createClient: async () => ({
      auth: { getUser: async () => ({ data: { user: user ? { id: 'test-admin' } : null } }) },
      from: table => { reads.push(`session:${table}`); return { select: () => ({ eq: () => ({
        single: async () => ({ data: { id: 'test-admin', is_active: active } }),
        maybeSingle: async () => ({ data: { content: { 'hero.title': 'Private draft', price: '700000000', availability: 'sold_out' }, revision: 2 }, error: draftError ? { code: '42P01' } : null }),
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
  assert.equal(preview.content['tipe-36'].availability, 'sold_out')
  assert.equal(preview.preview.revision, 2)
  const normal = await api.getPageContent(Promise.resolve({}))
  assert.equal(normal.content['tipe-36']['hero.title'], 'Live title')
  assert.equal(normal.content['tipe-36'].availability, 'available')
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

function actionHarness({ denied = false, conflict = false, brochurePath, missingFile = false } = {}) {
  const calls = []; const invalidated = []; const logs = []
  const doc = model.findDocument('tipe-36')
  const client = {
    storage: { from: bucket => { assert.equal(bucket, 'project-brochures'); return { exists: async () => ({ data: !missingFile, error: null }) } } },
    rpc: async (name, args) => { calls.push({ name, args }); return { data: 2, error: conflict ? { message: 'content_conflict' } : null } },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { content: { ...model.defaultValues(doc), ...(brochurePath ? { 'brochure.path': brochurePath } : {}) }, revision: 2 }, error: null }) }) }) }),
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

test('availability defaults match the requested projects and every TCI 3 unit/category', () => {
  const content = model.resolvePublished([])
  for (const id of ['tci-1', 'tci-2', 'permata-buah-batu']) assert.equal(availability.availabilityFor(content, id), 'limited')
  for (const id of ['rancamanyar', 'tci', 'tci-3', 'cluster', 'non-cluster', 'ruko', 'tipe-36', 'tipe-45', 'tipe-50', 'non-cluster-50', 'teranova']) assert.equal(availability.availabilityFor(content, id), 'available')
  assert.equal(docs.filter(doc => doc.fields.some(field => field.kind === 'availability')).length, 9)
})

test('availability validation rejects forged choices; legacy drafts are read without dropping text', async () => {
  const doc = model.findDocument('tipe-36')
  const values = model.defaultValues(doc)
  for (const value of ['Available', '', null, true, '<script>', 'sold_out ', 'toString']) {
    assert.ok(model.validateValues(doc, { ...values, availability: value }).error)
    const harness = actionHarness()
    assert.equal((await harness.api.saveContentDraft(doc.id, { ...values, availability: value }, 0)).success, false)
    assert.equal(harness.calls.length, 0)
  }
  const legacy = { ...values, 'hero.title': 'Preserved old draft' }
  delete legacy.availability
  assert.ok(model.validateValues(doc, legacy).error, 'old browser must reload instead of resetting an existing status')
  assert.equal(model.validateValues(doc, legacy, { allowLegacyAvailability: true }).error, undefined)
  const merged = model.mergeValues(doc, legacy)
  assert.equal(merged.availability, 'available')
  assert.equal(merged['hero.title'], 'Preserved old draft')
  assert.equal(model.mergeValues(doc, { availability: 'invalid' }).availability, 'available')
})

test('category and parent badges aggregate available, limited, and sold out correctly', () => {
  const content = model.resolvePublished([])
  for (const id of availability.availabilityGroups['tci-3']) content[id].availability = 'sold_out'
  assert.equal(availability.availabilityFor(content, 'tci-3'), 'sold_out')
  assert.equal(availability.availabilityFor(content, 'cluster'), 'sold_out')
  assert.equal(availability.availabilityFor(content, 'tci'), 'limited')
  content['tipe-45'].availability = 'limited'
  assert.equal(availability.availabilityFor(content, 'cluster'), 'limited')
  assert.equal(availability.availabilityFor(content, 'tci-3'), 'limited')
  content.teranova.availability = 'available'
  assert.equal(availability.availabilityFor(content, 'ruko'), 'available')
  assert.equal(availability.availabilityFor(content, 'tci'), 'available')
})

test('status saves retain text and price, log through existing actions, and revalidate the submenu', async () => {
  const { api, calls, invalidated, logs, doc } = actionHarness()
  const values = { ...model.defaultValues(doc), availability: 'sold_out', 'hero.title': 'Keep this draft', price: '555000000' }
  assert.equal((await api.saveContentDraft(doc.id, values, 1)).success, true)
  assert.equal(calls[0].args.p_values.availability, 'sold_out')
  assert.equal(calls[0].args.p_values['hero.title'], 'Keep this draft')
  assert.equal(calls[0].args.p_values.price, '555000000')
  assert.equal(logs[0].action, 'content.save_draft')
  assert.ok(invalidated.includes('/admin/content/ketersediaan'))
  assert.equal((await api.publishContentDraft(doc.id, 2)).success, true)
  for (const route of ['/', '/proyek', '/proyek/tci', '/proyek/tci/tci-3', '/admin/content/ketersediaan']) assert.ok(invalidated.includes(route))
})

test('all public detail pages and cards display the same availability without badges in category tabs', async () => {
  const content = model.resolvePublished([])
  for (const id of Object.keys(availability.availabilityDefaults)) content[id].availability = 'sold_out'
  for (const doc of docs) {
    const Component = viewLoader()(`src/app${doc.path}/ContentView.tsx`).default
    const html = renderToStaticMarkup(React.createElement(Component, { content }))
    assert.match(html, /data-availability="sold_out"/)
    assert.doesNotMatch(html, /data-availability="(?:available|limited)"/)
  }
  for (const tab of ['cluster', 'non-cluster', 'ruko']) {
    const Component = viewLoader(tab)('src/app/proyek/tci/tci-3/ContentView.tsx').default
    const html = renderToStaticMarkup(React.createElement(Component, { content }))
    assert.equal((html.match(/data-availability="sold_out"/g) || []).length, tab === 'cluster' ? 4 : 2)
    const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)]
    for (const [, body] of buttons) assert.doesNotMatch(body, /data-availability=/)
  }
  for (const file of ['src/app/page.tsx', 'src/app/proyek/page.tsx']) {
    const html = renderToStaticMarkup(await viewLoader('cluster', content)(file).default({ searchParams: Promise.resolve({}) }))
    assert.equal((html.match(/data-availability="sold_out"/g) || []).length, 3)
  }
})

test('availability submenu shows live and draft separately and disables editing on storage failure', async () => {
  for (const error of [null, 'Database unavailable']) {
    const render = loader({
      'next/link': ({ children, ...props }) => React.createElement('a', props, children),
      '@/lib/content/admin': { getContentAdminData: async () => ({ error, drafts: [{ document_key: 'tipe-36', revision: 2, content: { availability: 'sold_out' } }], published: [{ document_key: 'tipe-36', revision: 1, content: { availability: 'available' } }] }) },
    })
    const Panel = render('src/components/admin/content/AvailabilityPanel.tsx').default
    const html = renderToStaticMarkup(React.createElement(Panel, { error, drafts: [{ document_key: 'tipe-36', revision: 2, content: { availability: 'sold_out' } }], published: [{ document_key: 'tipe-36', revision: 1, content: { availability: 'available' } }] }))
    assert.match(html, /Status Ketersediaan Unit/)
    assert.match(html, /data-availability="sold_out"/)
    assert.match(html, /data-availability="available"/)
    if (error) {
      assert.match(html, /role="alert"/)
      assert.doesNotMatch(html, /\?mode=ketersediaan/)
    } else {
      assert.equal((html.match(/\?mode=ketersediaan/g) || []).length, 9)
      assert.match(html, /Draft belum terbit/)
    }
  }
})

test('status-only editor has three choices, preserves other draft fields and warns before full publication', () => {
  const doc = model.findDocument('tipe-36')
  const live = model.defaultValues(doc)
  const draft = { ...live, 'hero.title': 'Pending text', availability: 'limited' }
  const render = loader({
    'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    'next/navigation': { useRouter: () => ({ refresh() {} }) },
    '@/app/admin/(dashboard)/content/actions': { saveContentDraft() {}, publishContentDraft() {} },
  })
  const Editor = render('src/components/admin/content/ContentEditor.tsx').default
  const html = renderToStaticMarkup(React.createElement(Editor, { document: doc, initialValues: draft, publishedValues: live, draftRevision: 2, publishedRevision: 1, updatedAt: null, statusOnly: true }))
  assert.equal((html.match(/<option /g) || []).length, 3)
  assert.match(html, /value="limited" selected/)
  assert.match(html, /Publikasi menerbitkan seluruh draft/)
  assert.match(html, /buka editor lengkap/)
  assert.doesNotMatch(html, /<textarea/)
  assert.match(html, /data-availability="limited"/)
})

test('build version uses deployment metadata then local Git, and safely handles no Git/detached HEAD', () => {
  const { resolveBuildInfo } = load('src/lib/build-info.ts')
  const git = args => args[0] === 'branch' ? '0.7' : '123456789abcdef'
  assert.equal(resolveBuildInfo({}, git).branch, '0.7')
  assert.equal(resolveBuildInfo({}, git).commit, '1234567')
  const ci = resolveBuildInfo({ VERCEL_GIT_COMMIT_REF: 'release/0.8', VERCEL_GIT_COMMIT_SHA: 'abcdef123456789' }, () => { throw Error('Git should not be called') })
  assert.equal(ci.branch, 'release/0.8')
  assert.equal(ci.commit, 'abcdef1')
  assert.equal(resolveBuildInfo({ APP_GIT_BRANCH: 'manual', VERCEL_GIT_COMMIT_REF: 'ignored' }, git).branch, 'manual')
  assert.equal(resolveBuildInfo({}, () => '').branch, 'Tidak tersedia')
  assert.equal(resolveBuildInfo({}, args => args[0] === 'branch' ? 'HEAD' : '123456789').branch, 'Tidak tersedia')
  assert.equal(resolveBuildInfo({ APP_GIT_BRANCH: 'bad\nbranch' }, () => '').branch, 'Tidak tersedia')
})

test('about intro and vision sections place a single heading before photo then body on mobile', () => {
  const render = loader({
    '@/components/layout/CTABanner': () => null,
    '@/components/sections/InstagramSection': () => null,
  })
  const Page = render('src/app/tentang/page.tsx').default
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.indexOf('Membangun Kepercayaan') < html.indexOf('src="/images/tentang/about1.webp"'))
  assert.ok(html.indexOf('src="/images/tentang/about1.webp"') < html.indexOf('PT Marga Tirta Kencana adalah'))
  assert.ok(html.indexOf('Arah dan Komitmen') < html.indexOf('src="/images/tentang/about2.webp"'))
  assert.ok(html.indexOf('src="/images/tentang/about2.webp"') < html.indexOf('Visi Kami'))
  assert.equal((html.match(/Membangun Kepercayaan/g) || []).length, 1)
  assert.match(html, /lg:row-span-2/)
})

test('content tabs use buttons in the same page and the status deep link selects the correct panel', async () => {
  let reads = 0
  const render = loader({
    'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    '@/lib/content/admin': { getContentAdminData: async () => { reads++; return { drafts: [], published: [], error: null } } },
  })
  const Page = render('src/app/admin/(dashboard)/content/page.tsx').default
  const normal = renderToStaticMarkup(await Page())
  assert.equal((normal.match(/role="tab"/g) || []).length, 3)
  assert.match(normal, /<button[^>]*role="tab"[^>]*>(?:<svg[\s\S]*?<\/svg>)?Status Ketersediaan<\/button>/)
  assert.match(normal, /Edit konten/)
  assert.doesNotMatch(normal, /href="\/admin\/content\/ketersediaan"/)
  assert.doesNotMatch(normal, /Ringkasan TCI 3/)
  const status = renderToStaticMarkup(await Page({ searchParams: Promise.resolve({ tab: 'ketersediaan' }) }))
  assert.match(status, /<button[^>]*aria-selected="true"[^>]*>(?:<svg[\s\S]*?<\/svg>)?Status Ketersediaan<\/button>/)
  assert.match(status, /Ringkasan TCI 3/)
  assert.equal((status.match(/\?mode=ketersediaan/g) || []).length, 9)
  assert.equal((status.match(/<h1/g) || []).length, 1)
  assert.equal(reads, 2, 'one shared data fetch for both panels per page load')
})

test('old availability URL redirects to the content tab and website version box is full width', () => {
  const render = loader({ 'next/navigation': { redirect: href => { throw Error(`redirect:${href}`) } } })
  assert.throws(() => render('src/app/admin/(dashboard)/content/ketersediaan/page.tsx').default(), /redirect:\/admin\/content\?tab=ketersediaan/)
  const source = fs.readFileSync(path.join(root, 'src/app/admin/(dashboard)/settings/page.tsx'), 'utf8')
  const websitePanel = source.split('<TabsContent value="website">')[1].split('</TabsContent>')[0]
  assert.match(websitePanel, /<section className="w-full /)
  assert.doesNotMatch(websitePanel, /max-w-/)
})

test('public project and unit card badges overlay the top-right of their image frames', async () => {
  const content = model.resolvePublished([])
  const overlayPattern = /<div class="relative [^"]*aspect-[^"]*"[^>]*><img[^>]*\/><span[^>]*data-placement="card"/g
  for (const file of ['src/app/page.tsx', 'src/app/proyek/page.tsx']) {
    const html = renderToStaticMarkup(await viewLoader('cluster', content)(file).default({ searchParams: Promise.resolve({}) }))
    assert.equal((html.match(overlayPattern) || []).length, 3, file)
  }
  const render = viewLoader()
  const phases = renderToStaticMarkup(React.createElement(render('src/app/proyek/tci/ContentView.tsx').default, { content }))
  assert.equal((phases.match(overlayPattern) || []).length, 3)
  for (const tab of ['cluster', 'non-cluster', 'ruko']) {
    const Page = viewLoader(tab)('src/app/proyek/tci/tci-3/ContentView.tsx').default
    const html = renderToStaticMarkup(React.createElement(Page, { content }))
    assert.equal((html.match(overlayPattern) || []).length, tab === 'cluster' ? 3 : 1)
  }
  const Badge = load('src/components/content/AvailabilityBadge.tsx').default
  for (const status of ['available', 'limited', 'sold_out']) {
    const html = renderToStaticMarkup(React.createElement(Badge, { status, placement: 'card' }))
    assert.match(html, /absolute right-3 top-3 z-10/)
    assert.match(html, /whitespace-nowrap/)
    assert.match(html, new RegExp(availability.availabilityLabel(status)))
  }
  const sidebar = fs.readFileSync(path.join(root, 'src/components/admin/Sidebar.tsx'), 'utf8')
  assert.doesNotMatch(sidebar, /tab=ketersediaan|Status Ketersediaan/i)
  assert.match(sidebar, /name: 'Konten Website'/)
})


test('brochure/location defaults cover all eleven heroes and preserve existing cluster PDFs', () => {
  const content = model.resolvePublished([])
  const render = viewLoader()
  for (const doc of docs) {
    const html = renderToStaticMarkup(React.createElement(render('src/app' + doc.path + '/ContentView.tsx').default, { content }))
    const hero = html.split('</section>')[0]
    assert.equal((hero.match(/data-project-actions/g) || []).length, 1, doc.id)
    assert.match(hero, /Lihat Lokasi/)
    assert.doesNotMatch(hero, /href="#(?:brosur|lokasi)"/)
    if (['tipe-36','tipe-45','tipe-50'].includes(doc.id)) {
      assert.match(hero, /href="\/brosur\/brosur-cluster-tci.pdf" download=/)
    } else {
      assert.match(hero, /<button[^>]*disabled=""[^>]*>[\s\S]*?Brosur · Segera tersedia/)
    }
  }
  assert.equal(fs.readFileSync(path.join(root, 'public/brosur/brosur-cluster-tci.pdf')).subarray(0,5).toString(), '%PDF-')
})

test('resource validation rejects unsafe URLs, cross-document files and stale browser payloads', () => {
  const api = load('src/lib/content/resources.ts')
  const doc = model.findDocument('tci-1')
  const values = model.defaultValues(doc)
  for (const url of ['javascript:alert(1)', '//evil.com', 'https://www.google.com.evil.com/maps', 'https://evil.com/maps', 'https://evil@www.google.com/maps', 'https://www.google.com/url?q=https://evil.com', '<iframe src="https://www.google.com/maps">', 'https://www.google.com:444/maps', 'https://www.google.com/maps\n']) {
    assert.equal(api.isMapUrl(url), false, url)
    assert.ok(model.validateValues(doc, { ...values, 'location.url': url }).error)
  }
  assert.equal(api.isMapUrl('https://maps.app.goo.gl/vswkS5vy8ATpDWPt5'), true)
  assert.equal(api.isMapUrl('https://maps.app.goo.gl/vswkS5vy8ATpDWPt5', true), false)
  assert.equal(api.isMapUrl('https://www.google.com/maps?q=Bandung&output=embed', true), true)
  const other = 'tci-2/12345678-1234-4123-8123-123456789abc.pdf'
  for (const file of [other, 'https://evil.com/file.pdf', '../file.pdf', '/api/private.pdf']) {
    assert.ok(model.validateValues(doc, { ...values, 'brochure.path': file }).error)
  }
  assert.equal(model.mergeValues(doc, { 'brochure.path': other })['brochure.path'], '')
  const blank = { ...values, 'brochure.path': '', 'location.url': '', 'location.embed': '' }
  assert.equal(model.validateValues(doc, blank).error, undefined)
  const legacy = { ...values }
  delete legacy['brochure.path']; delete legacy['location.url']; delete legacy['location.embed']
  assert.ok(model.validateValues(doc, legacy).error)
  assert.equal(model.validateValues(doc, legacy, { allowLegacyAvailability: true }).error, undefined)
  assert.equal(model.mergeValues(doc, legacy)['location.url'], values['location.url'])
  assert.equal(api.brochureUrl('javascript:alert(1)'), null)
})

test('published resource values render real downloads, map buttons and embedded maps; blank hides iframe', () => {
  const render = viewLoader()
  const resources = load('src/lib/content/resources.ts')
  for (const doc of docs) {
    const file = doc.id + '/12345678-1234-4123-8123-123456789abc.pdf'
    const values = { ...model.defaultValues(doc), 'brochure.path': file, 'location.url': 'https://www.google.com/maps?q=UpdatedPin' }
    if ('location.embed' in values) values['location.embed'] = 'https://www.google.com/maps?q=UpdatedPin&output=embed'
    const content = model.resolvePublished([{ document_key: doc.id, content: values }])
    const Component = render('src/app' + doc.path + '/ContentView.tsx').default
    const html = renderToStaticMarkup(React.createElement(Component, { content }))
    assert.ok(html.includes(resources.brochureUrl(file)), doc.id)
    assert.match(html, /href="https:\/\/www.google.com\/maps\?q=UpdatedPin"/)
    if ('location.embed' in values) {
      assert.match(html, /<iframe[^>]*src="https:\/\/www.google.com\/maps\?q=UpdatedPin&amp;output=embed"/)
      content[doc.id]['location.embed'] = ''
      const blank = renderToStaticMarkup(React.createElement(Component, { content }))
      assert.doesNotMatch(blank, /<iframe/)
      assert.match(blank, /Peta belum tersedia/)
    }
  }
})

function uploadHarness({ denied = false, fail = false } = {}) {
  const uploads = []; const logs = []
  const api = loader({
    '@/lib/content/server': { requireContentAdmin: async () => {
      if (denied) throw Error('not active admin')
      return { storage: { from: bucket => { assert.equal(bucket, 'project-brochures'); return {
        upload: async (filePath, file, options) => { uploads.push({ filePath, file, options }); return { error: fail ? { message: 'private provider diagnostic' } : null } },
      } } } }
    } },
    '@/lib/logs/server': { runAdminAction: async (context, operation) => { logs.push(context); return operation() } },
  })('src/app/admin/(dashboard)/brosur-lokasi/actions.ts')
  return { api, uploads, logs }
}
function pdfForm(content = '%PDF-1.7\nTest', name = 'brosur.pdf', type = 'application/pdf') {
  const data = new FormData()
  data.set('file', new File([content], name, { type }))
  return data
}

test('PDF uploads require an active admin, known document, valid signature and size', async () => {
  const denied = uploadHarness({ denied: true })
  assert.equal((await denied.api.uploadBrochure('tci-1', pdfForm())).success, false)
  assert.equal(denied.uploads.length, 0)
  const harness = uploadHarness()
  assert.equal((await harness.api.uploadBrochure('unknown', pdfForm())).success, false)
  for (const data of [new FormData(), pdfForm('not a pdf'), pdfForm('%PDF-1.7','evil.html','text/html'), pdfForm(''), pdfForm('%PDF-' + 'x'.repeat(3*1024*1024))]) {
    assert.equal((await harness.api.uploadBrochure('tci-1', data)).success, false)
  }
  assert.equal(harness.uploads.length, 0)
  const failure = uploadHarness({ fail: true })
  const result = await failure.api.uploadBrochure('tci-1', pdfForm())
  assert.equal(result.success, false)
  assert.match(result.error, /005_project_brochures.sql/)
  assert.doesNotMatch(result.error, /private provider/)
})

test('replacement uploads use unique immutable object names and audit without file contents', async () => {
  const harness = uploadHarness()
  const resources = load('src/lib/content/resources.ts')
  const one = await harness.api.uploadBrochure('tci-1', pdfForm())
  const two = await harness.api.uploadBrochure('tci-1', pdfForm())
  assert.equal(one.success, true); assert.equal(two.success, true)
  assert.notEqual(one.path, two.path)
  assert.equal(resources.isBrochurePath(one.path, 'tci-1'), true)
  assert.equal(resources.isBrochurePath(one.path, 'tci-2'), false)
  for (const upload of harness.uploads) {
    assert.equal(upload.options.upsert, false)
    assert.equal(upload.options.contentType, 'application/pdf')
  }
  assert.equal(harness.logs[0].action, 'brochure.upload')
  assert.doesNotMatch(JSON.stringify(harness.logs), /%PDF|brosur.pdf/)
})

test('missing uploaded PDF blocks save and publish, valid PDFs preserve text and invalidate management', async () => {
  const file = 'tipe-36/12345678-1234-4123-8123-123456789abc.pdf'
  for (const missingFile of [true, false]) {
    const harness = actionHarness({ brochurePath: file, missingFile })
    const values = { ...model.defaultValues(harness.doc), 'brochure.path': file, 'hero.title': 'Text retained' }
    assert.equal((await harness.api.saveContentDraft('tipe-36', values, 1)).success, !missingFile)
    assert.equal((await harness.api.publishContentDraft('tipe-36', 2)).success, !missingFile)
    if (missingFile) assert.equal(harness.calls.length, 0)
    else {
      assert.equal(harness.calls[0].args.p_values['hero.title'], 'Text retained')
      assert.equal(harness.calls[0].args.p_values['brochure.path'], file)
      assert.ok(harness.invalidated.includes('/admin/brosur-lokasi'))
      assert.ok(harness.invalidated.includes('/admin/brosur-lokasi/tipe-36'))
    }
  }
})

test('brochure management lists eleven pages, shows placeholders and disables editing on DB failure', async () => {
  for (const error of [null, 'Database unavailable']) {
    const render = loader({
      'next/link': ({ children, ...props }) => React.createElement('a', props, children),
      '@/lib/content/admin': { getContentAdminData: async () => ({ drafts: [], published: [], error }) },
    })
    const html = renderToStaticMarkup(await render('src/app/admin/(dashboard)/brosur-lokasi/page.tsx').default())
    assert.equal((html.match(/<article/g) || []).length, 11)
    if (error) {
      assert.match(html, /role="alert"/)
      assert.doesNotMatch(html, /href="\/admin\/brosur-lokasi\/(?!petunjuk)/)
    } else {
      assert.equal((html.match(/href="\/admin\/brosur-lokasi\/(?!petunjuk)/g) || []).length, 11)
      assert.equal((html.match(/Placeholder · Segera tersedia/g) || []).length, 8)
    }
  }
})

test('resource-only editor exposes PDF and map controls and warns about other pending draft changes', () => {
  const doc = model.findDocument('tci-1'), live = model.defaultValues(doc)
  const render = loader({
    'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    'next/navigation': { useRouter: () => ({ refresh() {} }) },
    '@/app/admin/(dashboard)/content/actions': { saveContentDraft() {}, publishContentDraft() {} },
    '@/app/admin/(dashboard)/brosur-lokasi/actions': { uploadBrochure() {} },
  })
  const html = renderToStaticMarkup(React.createElement(render('src/components/admin/content/ContentEditor.tsx').default, {
    document: doc, initialValues: { ...live, 'hero.title': 'Other text draft' }, publishedValues: live,
    draftRevision: 2, publishedRevision: 1, updatedAt: null, resourcesOnly: true,
  }))
  assert.match(html, /type="file" accept=".pdf,application\/pdf"/)
  assert.match(html, /id="location.url"/)
  assert.match(html, /id="location.embed"/)
  assert.match(html, /href="\/admin\/brosur-lokasi"/)
  assert.match(html, /Publikasi menerbitkan seluruh draft/)
  assert.match(html, /dokumen rahasia/)
  assert.doesNotMatch(html, /id="hero.title"|<textarea|<select/)
})

test('storage migration restricts insert to active admins and preserves immutable PDFs', () => {
  const sql = fs.readFileSync(path.join(root, 'supabase/migrations/005_project_brochures.sql'), 'utf8')
  assert.match(sql, /3145728/)
  assert.match(sql, /ARRAY\['application\/pdf'\]/)
  assert.match(sql, /FOR INSERT TO authenticated WITH CHECK/)
  assert.match(sql, /is_active = true/)
  assert.match(sql, /FOR SELECT TO authenticated/)
  assert.doesNotMatch(sql, /FOR (UPDATE|DELETE|ALL) /)
  for (const file of ['src/components/admin/Sidebar.tsx', 'src/components/admin/AdminHeader.tsx']) {
    assert.match(fs.readFileSync(path.join(root, file), 'utf8'), /href: '\/admin\/brosur-lokasi'/)
  }
})


test('admin content, availability and brochure cards share solid accessible actions without nested links', async () => {
  for (const error of [null, 'Database unavailable']) {
    const render = loader({
      'next/link': ({ children, ...props }) => React.createElement('a', props, children),
      '@/lib/content/admin': { getContentAdminData: async () => ({ drafts: [], published: [], error }) },
    })
    const pages = [
      [await render('src/app/admin/(dashboard)/content/page.tsx').default(), 11, 'Edit konten'],
      [React.createElement(render('src/components/admin/content/AvailabilityPanel.tsx').default, { drafts: [], published: [], error }), 9, 'Ubah status'],
      [await render('src/app/admin/(dashboard)/brosur-lokasi/page.tsx').default(), 11, 'Kelola'],
    ]
    const styles = []
    for (const [element, count, label] of pages) {
      const html = renderToStaticMarkup(element)
      const cards = [...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0])
      assert.equal(cards.length, count)
      for (const card of cards) {
        assert.match(card, /mt-auto/)
        assert.doesNotMatch(card, /<a\b[^>]*>[\s\S]*<a\b/)
        if (error) {
          assert.match(card, /<button[^>]*disabled=""/)
          assert.doesNotMatch(card, /href=/)
        } else {
          assert.equal((card.match(/<a\b/g) || []).length, 1)
          assert.ok(card.includes('aria-label="' + label + ' — '))
          const className = card.match(/<a\b[^>]*class="([^"]+)"/)[1]
          styles.push(className)
          for (const token of ['bg-[#0B5EAA]', 'text-white', 'rounded-lg', 'min-h-11', 'focus-visible:ring-2']) assert.ok(className.includes(token))
          assert.match(card, /aria-hidden="true"/)
        }
      }
    }
    if (!error) assert.equal(new Set(styles).size, 1)
  }
})


test('brochure guide is a standalone beginner page and uses the same guide button as content', async () => {
  const render = loader({
    'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    '@/lib/content/admin': { getContentAdminData: async () => ({ drafts: [], published: [], error: null }) },
  })
  const brochure = renderToStaticMarkup(await render('src/app/admin/(dashboard)/brosur-lokasi/page.tsx').default())
  const content = renderToStaticMarkup(await render('src/app/admin/(dashboard)/content/page.tsx').default())
  assert.doesNotMatch(brochure, /<details/)
  const guideClass = html => html.match(/href="\/admin\/(?:content|brosur-lokasi)\/petunjuk" class="([^"]+)"/)[1]
  assert.equal(guideClass(brochure), guideClass(content))
  const guide = renderToStaticMarkup(React.createElement(render('src/app/admin/(dashboard)/brosur-lokasi/petunjuk/page.tsx').default))
  for (const text of ['Simpan Draft', 'Preview', 'Publikasikan', '3 MB', 'dokumen rahasia', '005_project_brochures.sql']) assert.ok(guide.includes(text))
  assert.match(guide, /href="\/admin\/brosur-lokasi"/)
})

const notificationApi = load('src/lib/admin/inquiry-notifications.ts')
const tick = () => new Promise(resolve => setImmediate(resolve))
function notificationHarness(initial = { unreadCount: 0, notifications: [] }) {
  let data = initial, fail = false, visible = true, calls = 0, stopped = 0
  const handlers = {}, states = []
  const sync = notificationApi.startNotificationSync({
    load: async () => { calls++; if (fail) throw Error('private provider error'); return data },
    update: state => states.push(state),
    visible: () => visible,
    subscribe: refresh => { handlers.realtime = refresh; return () => stopped++ },
    listenResume: refresh => { handlers.resume = refresh; return () => stopped++ },
    every: (refresh, ms) => { assert.equal(ms, 15000); handlers.poll = refresh; return () => stopped++ },
  })
  return { sync, states, handlers, setData: value => { data = value }, setFail: value => { fail = value }, setVisible: value => { visible = value }, calls: () => calls, stopped: () => stopped }
}

test('notifications update via polling without realtime, same-count replacements, resume and manual refresh', async () => {
  const harness = notificationHarness()
  await tick()
  assert.equal(harness.states.at(-1).unreadCount, 0)
  harness.setData({ unreadCount: 1, notifications: [{ id: 'first' }] })
  harness.handlers.poll(); await tick()
  assert.equal(harness.states.at(-1).notifications[0].id, 'first')
  harness.setData({ unreadCount: 1, notifications: [{ id: 'replacement' }] })
  harness.handlers.realtime(); await tick()
  assert.equal(harness.states.at(-1).notifications[0].id, 'replacement')
  const before = harness.calls()
  harness.setVisible(false); harness.handlers.poll(); harness.handlers.resume(); await tick()
  assert.equal(harness.calls(), before)
  harness.setVisible(true); harness.handlers.resume(); await tick()
  assert.equal(harness.calls(), before + 1)
  harness.setData({ unreadCount: 0, notifications: [] })
  await harness.sync.refresh()
  assert.equal(harness.states.at(-1).unreadCount, 0)
  harness.sync.stop()
  assert.equal(harness.stopped(), 3)
  const last = harness.calls()
  await harness.sync.refresh(); harness.handlers.poll(); await tick()
  assert.equal(harness.calls(), last)
})

test('notification failures preserve the last snapshot and never masquerade as an empty inbox', async () => {
  const harness = notificationHarness({ unreadCount: 4, notifications: [{ id: 'saved' }] })
  await tick()
  harness.setFail(true); await harness.sync.refresh()
  const failed = harness.states.at(-1)
  assert.equal(failed.unreadCount, 4)
  assert.equal(failed.notifications[0].id, 'saved')
  assert.match(failed.error, /belum dapat diperbarui/)
  assert.doesNotMatch(failed.error, /private provider/)
  harness.setFail(false); await harness.sync.refresh()
  assert.equal(harness.states.at(-1).error, null)
  harness.sync.stop()
})

test('notification refresh serializes overlapping requests and ignores responses after cleanup', async () => {
  const pending = [], updates = []
  const sync = notificationApi.startNotificationSync({
    load: () => new Promise(resolve => pending.push(resolve)),
    update: state => updates.push(state), visible: () => true,
    subscribe: () => () => {}, listenResume: () => () => {}, every: () => () => {},
  })
  const refresh = sync.refresh()
  void sync.refresh()
  assert.equal(pending.length, 1)
  pending.shift()({ unreadCount: 1, notifications: [] }); await tick()
  assert.equal(pending.length, 1)
  pending.shift()({ unreadCount: 2, notifications: [] }); await refresh
  assert.equal(updates.at(-1).unreadCount, 2)
  const late = sync.refresh()
  sync.stop()
  pending.shift()({ unreadCount: 99, notifications: [] }); await late
  assert.equal(updates.at(-1).unreadCount, 2)
})

test('notification query requests an exact count and latest unread list together, with timeout', async () => {
  const calls = []
  const query = {
    select: (...args) => { calls.push(['select', ...args]); return query },
    eq: (...args) => { calls.push(['eq', ...args]); return query },
    order: (...args) => { calls.push(['order', ...args]); return query },
    limit: n => { assert.equal(n, 5); return query },
    abortSignal: signal => { assert.ok(signal instanceof AbortSignal); return Promise.resolve({ data: [{ id: 'latest' }], count: 7, error: null }) },
  }
  const snapshot = await notificationApi.loadUnreadNotifications({ from: name => { assert.equal(name, 'inquiries'); return query } })
  assert.equal(snapshot.unreadCount, 7)
  assert.equal(snapshot.notifications.length, 1)
  assert.equal(calls[0][2].count, 'exact')
  assert.equal(calls[1][1], 'is_read')
  assert.equal(calls[1][2], false)
  query.abortSignal = async () => ({ data: null, count: null, error: { code: '42501' } })
  await assert.rejects(notificationApi.loadUnreadNotifications({ from: () => query }), /unavailable/)
})

test('contact and project forms save unread inquiries, validate email and report DB errors honestly', async () => {
  const rows = []
  let fail = false, throws = false
  const api = loader({
    '@/lib/supabase/server': { createClient: async () => ({ from: table => {
      assert.equal(table, 'inquiries')
      return { insert: async row => { if (throws) throw Error('network'); if (fail) return { error: { code: '42501' } }; rows.push(row); return { error: null } } }
    } }) },
  })('src/app/actions/inquiry.ts')
  const values = { full_name: 'Test User', whatsapp_number: '081234567890', selected_project: 'TCI 1', message: 'Info unit' }
  assert.equal((await api.createInquiry({ ...values, is_read: true, status: 'batal' })).success, true)
  assert.equal(rows[0].is_read, false)
  assert.equal(rows[0].status, 'baru')
  assert.equal((await api.createContactInquiry({ ...values, email: 'test@example.com' })).success, true)
  assert.equal(rows[1].message, 'Email: test@example.com\n\nInfo unit')
  assert.equal(rows[1].email, undefined)
  assert.equal((await api.createContactInquiry({ ...values, email: 'bad' })).success, false)
  assert.equal(rows.length, 2)
  fail = true
  assert.equal((await api.createInquiry(values)).success, false)
  throws = true
  assert.equal((await api.createContactInquiry({ ...values, email: 'test@example.com' })).success, false)
  assert.equal(rows.length, 2)
})

test('bell supports click/touch popover refresh and shows failures instead of false success', () => {
  const base = { unreadCount: 0, notifications: [], notificationsLoading: false, notificationsError: null }
  const renderWith = state => {
    const render = loader({
      '@/lib/hooks/useAuth': { useAuth: () => ({ ...base, ...state, refreshUnreadCount: async () => {} }) },
      '@/components/ui/popover': {
        Popover: ({ children }) => React.createElement('div', null, children),
        PopoverTrigger: ({ children }) => children,
        PopoverContent: ({ children }) => React.createElement('div', null, children),
      },
      '@/components/ui/button': { Button: ({ children, onClick, disabled, 'aria-label': ariaLabel }) => React.createElement('button', { onClick, disabled, 'aria-label': ariaLabel }, children) },
      'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    })
    return renderToStaticMarkup(React.createElement(render('src/components/admin/NotificationBell.tsx').default))
  }
  const html = renderWith({ notificationsError: 'Gagal memuat' })
  assert.match(html, /role="alert"/)
  assert.doesNotMatch(html, /Semua inquiry sudah dibaca/)
  assert.match(renderWith({ notificationsLoading: true }), /Memuat notifikasi/)
  assert.match(renderWith({}), /Semua inquiry sudah dibaca/)
  const source = fs.readFileSync(path.join(root, 'src/components/admin/NotificationBell.tsx'), 'utf8')
  assert.match(source, /onOpenChange=.*refreshUnreadCount/)
  assert.doesNotMatch(source, /group-hover/)
  for (const hook of ['useInquiryNotifications.ts', 'useRealtimeInquiries.ts']) {
    const code = fs.readFileSync(path.join(root, 'src/lib/hooks', hook), 'utf8')
    for (const name of ['focus', 'online', 'visibilitychange']) assert.ok(code.includes(name))
    assert.match(code, /clearInterval/)
  }
})
