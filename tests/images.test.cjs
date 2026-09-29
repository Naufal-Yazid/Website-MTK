/* eslint-disable @typescript-eslint/no-require-imports -- Dependency-free test runner. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const sharp = require('sharp')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const root = path.resolve(__dirname, '..')

function loader(mocks = {}) {
  const cache = new Map()
  function load(file) {
    file = path.resolve(root, file)
    if (cache.has(file)) return cache.get(file)
    const exports = {}; cache.set(file, exports)
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText
    vm.runInNewContext(source, { exports, Buffer, File, FormData, URL, AbortSignal, process: { env: { NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon' } },
      require: name => {
        if (name in mocks) return mocks[name]
        if (name === 'server-only') return {}
        if (name.startsWith('@/') || name.startsWith('.')) {
          const base = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(file), name)
          const target = ['', '.ts', '.tsx'].map(ext => base + ext).find(value => fs.existsSync(value) && fs.statSync(value).isFile())
          if (!target) throw Error(name)
          return load(target)
        }
        return require(name)
      },
    }, { filename: file })
    return exports
  }
  return load
}
const load = loader()
const model = load('src/lib/media/model.ts')
const { imageSlots } = load('src/lib/media/catalog.ts')
const { convertToWebp } = load('src/lib/media/convert.ts')
const key = 'about1'
const uuid = '12345678-1234-4123-8123-123456789abc'
const objectPath = key + '/' + uuid + '.webp'

test('all 52 image slots have unique stable keys, existing defaults and migration allowlists', () => {
  assert.equal(imageSlots.length, 52)
  assert.equal(new Set(imageSlots.map(slot => slot.id)).size, 52)
  assert.equal(new Set(imageSlots.map(slot => slot.src)).size, 52)
  const sql = fs.readFileSync(path.join(root, 'supabase/migrations/006_website_images.sql'), 'utf8')
  for (const slot of imageSlots) {
    assert.match(slot.id, /^[a-z0-9-]{1,80}$/)
    assert.ok(slot.pages.length > 0)
    assert.ok(fs.existsSync(path.join(root, 'public', slot.src)))
    assert.ok(sql.includes("'" + slot.id + "'"))
  }
  assert.match(sql, /ENABLE ROW LEVEL SECURITY/g)
  assert.match(sql, /pg_advisory_xact_lock/)
  assert.match(sql, /image_conflict/)
  assert.match(sql, /auth.uid\(\) AND is_active = true/)
  assert.match(sql, /REVOKE ALL ON FUNCTION[\s\S]*FROM PUBLIC, anon/)
  assert.doesNotMatch(sql, /FOR (DELETE|UPDATE|ALL) TO/)
  assert.match(sql, /storage.objects WHERE bucket_id = 'website-images' AND name = draft.path/)
})

test('file metadata and image references reject unsafe types, sizes and cross-slot paths', () => {
  for (const file of [{name:'a.svg',type:'image/svg+xml',size:30},{name:'a.gif',type:'image/gif',size:30},{name:'a.jpg',type:'image/jpeg',size:0},{name:'a.png',type:'image/png',size:3*1024*1024+1}]) assert.ok(model.imageMetadataError(file))
  assert.equal(model.imageMetadataError({name:'a.JPG',type:'image/jpeg',size:100}), null)
  assert.equal(model.isImagePath(objectPath, key), true)
  for (const value of ['https://evil.invalid/a.webp','../about1/a.webp',objectPath.replace('.webp','.svg'),objectPath+'?x=1',objectPath.replace('about1','about2')]) assert.equal(model.isImagePath(value,key),false)
  assert.equal(model.imageUrl(objectPath,key), 'https://example.supabase.co/storage/v1/object/public/website-images/' + objectPath)
  assert.equal(model.imageUrl('',key),null)
})

test('real JPG, PNG and WebP are decoded and re-encoded as WebP', async () => {
  for (const format of ['jpeg','png','webp']) {
    const input = await sharp({create:{width:120,height:80,channels:3,background:'#125fa0'}}).toFormat(format).toBuffer()
    const output = await convertToWebp(input)
    const info = await sharp(output.data).metadata()
    assert.equal(info.format, 'webp')
    assert.equal(info.width, 120)
    assert.equal(info.height, 80)
    assert.equal(output.bytes, output.data.length)
    assert.equal(info.exif, undefined)
  }
})

test('conversion preserves transparency, auto-orients EXIF, strips GPS/metadata and limits dimensions without cropping', async () => {
  const alpha = await sharp({create:{width:40,height:20,channels:4,background:{r:255,g:0,b:0,alpha:0.25}}}).png().toBuffer()
  assert.equal((await sharp((await convertToWebp(alpha)).data).metadata()).hasAlpha,true)
  const oriented = await sharp({create:{width:80,height:40,channels:3,background:'#ffeeaa'}}).jpeg().withMetadata({orientation:6}).toBuffer()
  const orientedInfo = await sharp((await convertToWebp(oriented)).data).metadata()
  assert.equal(orientedInfo.width,40)
  assert.equal(orientedInfo.height,80)
  assert.equal(orientedInfo.exif,undefined)
  const large = await sharp({create:{width:4000,height:2000,channels:3,background:'#ffeeaa'}}).png().toBuffer()
  const resized = await convertToWebp(large)
  assert.equal(resized.width,3200)
  assert.equal(resized.height,1600)
})

test('fake images, SVG, GIF, oversized input and decompression bombs are rejected', async () => {
  const gif = await sharp({create:{width:10,height:10,channels:3,background:'white'}}).gif().toBuffer()
  const bomb = await sharp({create:{width:7000,height:6000,channels:3,background:'white'}}).png().toBuffer()
  for (const data of [Buffer.from('not an image'),Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"></svg>'),gif,Buffer.alloc(3*1024*1024+1),bomb]) await assert.rejects(()=>convertToWebp(data))
})

function actionsHarness({ denied=false, revision=0, conflict=false, storageError=false }={}) {
  const uploads=[],rpcs=[],invalidations=[],logs=[]
  const client = {
    from: () => ({select(){return this},eq(){return this},maybeSingle:async()=>({data:revision?{revision}:null,error:null})}),
    storage: {from: bucket=>({upload: async (name,data,options)=>{uploads.push({bucket,name,data,options});return {error:storageError?{message:'failure'}:null}}})},
    rpc: async (name,args)=>{rpcs.push({name,args});return {data:revision+1,error:conflict?{message:'image_conflict'}:null}},
  }
  const requireAdmin=async()=>{if(denied)throw Error('unauthorized');return client}
  const render=loader({
    '@/lib/content/server':{requireContentAdmin:requireAdmin},
    '@/lib/logs/server':{runAdminAction:async (entry,fn)=>{await requireAdmin();logs.push(entry);return fn()}},
    'next/cache':{revalidatePath:(...args)=>invalidations.push(args)},
  })
  return {api:render('src/app/admin/(dashboard)/content/gambar/actions.ts'),uploads,rpcs,invalidations,logs}
}
async function form() {
  const buffer=await sharp({create:{width:60,height:30,channels:3,background:'white'}}).jpeg().toBuffer()
  const data=new FormData(); data.set('file',new File([buffer],'foto.jpg',{type:'image/jpeg'}));return data
}
test('upload requires active admin, valid slot and matching revision before writing; storage failure cannot publish', async () => {
  for(const options of [{denied:true},{revision:3},{storageError:true}]){
    const h=actionsHarness(options)
    const result=await h.api.uploadImageDraft(key,0,await form())
    assert.equal(result.success,false)
    assert.equal(h.rpcs.length,0)
    assert.equal(h.invalidations.length,0)
    if(!options.storageError)assert.equal(h.uploads.length,0)
  }
  const h=actionsHarness()
  assert.equal((await h.api.uploadImageDraft('unknown',0,await form())).success,false)
  assert.equal((await h.api.uploadImageDraft(key,-1,await form())).success,false)
  assert.equal(h.uploads.length,0)
})

test('upload writes an immutable WebP then saves only its draft; publication copies a stored revision', async () => {
  const h=actionsHarness()
  assert.equal((await h.api.uploadImageDraft(key,0,await form())).success,true)
  assert.equal(h.uploads.length,1)
  assert.equal(h.uploads[0].bucket,'website-images')
  assert.match(h.uploads[0].name,/^about1\/[0-9a-f-]+\.webp$/)
  assert.equal(h.uploads[0].options.upsert,false)
  assert.equal(h.uploads[0].options.contentType,'image/webp')
  assert.equal((await sharp(h.uploads[0].data).metadata()).format,'webp')
  assert.equal(h.rpcs[0].name,'save_image_draft')
  assert.equal(h.rpcs[0].args.p_expected_revision,0)
  assert.ok(h.invalidations.every(args=>args[0].startsWith('/admin/')))
  assert.doesNotMatch(JSON.stringify(h.logs),/foto.jpg|base64|data:image/)
  const p=actionsHarness({revision:1})
  assert.equal((await p.api.publishImageDraft(key,1)).success,true)
  assert.equal(p.rpcs[0].name,'publish_image_draft')
  assert.deepEqual(Object.keys(p.rpcs[0].args).sort(),['p_expected_revision','p_key'])
  assert.ok(p.invalidations.some(args=>args[0]==='/'&&args[1]==='layout'))
  assert.equal((await p.api.resetImageDraft(key,1)).success,true)
  assert.equal(p.rpcs.at(-1).args.p_path,'')
})

test('conflicts and rejected publication never invalidate public pages or report success', async () => {
  const h=actionsHarness({revision:1,conflict:true})
  const result=await h.api.publishImageDraft(key,1)
  assert.equal(result.success,false)
  assert.match(result.error,/admin lain/)
  assert.equal(h.invalidations.length,0)
  const denied=actionsHarness({denied:true})
  assert.equal((await denied.api.publishImageDraft(key,1)).success,false)
  assert.equal((await denied.api.resetImageDraft(key,1)).success,false)
  assert.equal(denied.rpcs.length,0)
})

test('public provider reads only published image references, sanitizes them and falls back on missing migration', async () => {
  for (const fail of [false,true]) {
    const tables=[]
    const render=loader({
      '@/lib/content/server':{requireContentAdmin:async()=>{throw Error('Must not read admin session')}},
      '@supabase/supabase-js':{createClient:(_url,_key,options)=>{
        assert.equal(options.auth.persistSession,false)
        return {from:table=>{tables.push(table);return {select:async()=>({data:[{image_key:key,path:objectPath},{image_key:'about2',path:'https://evil.invalid/a.webp'},{image_key:'unknown',path:objectPath}],error:fail?{code:'42P01'}:null})}}}
      }},
    })
    const images=await render('src/lib/media/server.ts').getPublishedImages()
    assert.deepEqual(tables,['site_image_published'])
    assert.equal(Object.keys(images).length,fail?0:1)
    if(!fail)assert.match(images['/images/tentang/about1.webp'],/website-images\/about1\//)
  }
})

test('native, optimized and background placements consume published overrides without changing fit/alt', () => {
  const render=loader({'next/image':({unoptimized,fill,...props})=>React.createElement('img',{'data-fill':fill?'yes':undefined,'data-unoptimized':unoptimized?'yes':undefined,...props})})
  const {ImagesProvider,ManagedImg,ManagedImage,ManagedBackground}=render('src/components/content/ManagedImages.tsx')
  const src='/images/tentang/about1.webp', replacement='https://example.supabase.co/a.webp'
  const html=renderToStaticMarkup(React.createElement(ImagesProvider,{images:{[src]:replacement}},[
    React.createElement(ManagedImg,{key:'native',src,alt:'Original alt',className:'object-contain'}),
    React.createElement(ManagedImage,{key:'next',src,alt:'Original alt',fill:true,className:'object-cover'}),
    React.createElement(ManagedBackground,{key:'background',src,className:'bg-cover',style:{backgroundPosition:'center 35%'}}),
  ]))
  assert.match(html,/src="https:\/\/example.supabase.co\/a.webp"/)
  assert.match(html,/object-contain/)
  assert.match(html,/object-cover/)
  assert.match(html,/alt="Original alt"/)
  assert.match(html,/data-unoptimized="yes"/)
  assert.match(html,/background-position:center 35%/)
  assert.match(html,/background-image:/)
})

test('every local image on public pages is registered and all native/Next/background rendering is connected', () => {
  const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])
  const files=[...walk(path.join(root,'src/app')),...walk(path.join(root,'src/components/layout'))].filter(file=>file.endsWith('.tsx')&&!file.includes(path.sep+'admin'+path.sep))
  for(const file of files){
    const source=fs.readFileSync(file,'utf8')
    assert.doesNotMatch(source,/<img\b|from ["']next\/image["']|backgroundImage:/,file)
    for(const match of source.matchAll(/(?:\/images|\/floor-plan)\/[^"'\r\n)]+\.(?:webp|jpg|png|jpeg)/g)){
      const src=match[0]
      if(fs.existsSync(path.join(root,'public',src)))assert.ok(imageSlots.some(slot=>slot.src===src),src)
    }
  }
})

test('image library fails closed, defaults remain visible and images tab uses same-page navigation', async () => {
  const render=loader({
    'next/link':({children,...props})=>React.createElement('a',props,children),
    '@/lib/content/admin':{getContentAdminData:async()=>({drafts:[],published:[],error:null})},
    '@/lib/media/server':{getImageAdminData:async()=>({drafts:[],published:[],error:'Run migration 006'})},
  })
  const Page=render('src/app/admin/(dashboard)/content/page.tsx').default
  const html=renderToStaticMarkup(await Page({searchParams:Promise.resolve({tab:'gambar'})}))
  assert.match(html,/aria-selected="true"[^>]*>[\s\S]*?Kelola Gambar/)
  assert.match(html,/role="alert"/)
  assert.match(html,/Run migration 006/)
  assert.doesNotMatch(html,/href="\/admin\/content\/gambar\/(?:about1|hero-image)"/)
  assert.match(html,/disabled=""/)
})

test('page sub-tabs cover all images and separate exact pages from TCI 3 descendants', () => {
  const { imagePageTabs, imagesForPage, tciImagePages } = load('src/lib/media/navigation.ts')
  assert.equal(new Set(imagePageTabs.map(tab => tab.id)).size, imagePageTabs.length)
  const reached = new Set(imagePageTabs.flatMap(tab => imagesForPage(tab.id).map(slot => slot.id)))
  assert.equal(reached.size, imageSlots.length)
  assert.ok(imagesForPage('tentang').some(slot => slot.id === 'about1'))
  assert.ok(!imagesForPage('tci-1').some(slot => slot.id === 'tci2-bed'))
  assert.ok(imagesForPage('tci-3').some(slot => slot.id === 'ruko-hall'))
  assert.ok(!imagesForPage('tci').some(slot => slot.id === 'ruko-hall'))
  for (const page of tciImagePages.filter(item => item.path)) assert.ok(imagesForPage('tci-3').some(slot => slot.pages.includes(page.path)))
  assert.equal(imagesForPage('unknown').length, 0)
  const shared = imagesForPage('beranda').find(slot => slot.id === 'rancamanyar-banner')
  assert.equal(shared, imagesForPage('rancamanyar').find(slot => slot.id === shared.id))
})

test('image navigation uses accessible local tabs and resets filters when changing pages', () => {
  const render = loader({ 'next/link': ({children,...props}) => React.createElement('a',props,children) })
  const Library = render('src/components/admin/content/ImageLibrary.tsx').default
  const html = renderToStaticMarkup(React.createElement(Library,{drafts:[],published:[],error:null}))
  assert.equal((html.match(/role="tab"/g)||[]).length, 11)
  assert.match(html, /aria-label="Halaman gambar"/)
  assert.match(html, /href="\/admin\/content\/gambar\/rancamanyar-banner"/)
  assert.doesNotMatch(html, /href="\/admin\/content\/gambar\/tci1-bed"/)
  const source = fs.readFileSync(path.join(root,'src/components/admin/content/ImageLibrary.tsx'),'utf8')
  assert.match(source, /onValueChange=\{value => \{ setPage\(value\); setUnit\(''\); setQuery\(''\); setDraftOnly\(false\); setLimit\(12\)/)
})

test('Help covers every admin feature, preserves existing guides and is beneath Settings', () => {
  const render = loader({ 'next/link': ({children,...props}) => React.createElement('a',props,children) })
  const {helpTopics} = render('src/lib/admin/help.ts')
  const Page = render('src/app/admin/(dashboard)/help/page.tsx')
  const html = renderToStaticMarkup(React.createElement(Page.default))
  assert.equal(Page.metadata.robots.index,false)
  assert.equal((html.match(/<details/g)||[]).length,helpTopics.length)
  for (const id of ['dashboard','analytics','leads','notifikasi','konten','ketersediaan','gambar','brosur','logs','settings','kendala']) assert.ok(helpTopics.some(topic=>topic.id===id))
  for (const topic of helpTopics) {
    const route = topic.href.split('?')[0].replace('/admin/','')
    assert.ok(fs.existsSync(path.join(root,'src/app/admin/(dashboard)',route,'page.tsx')),topic.href)
    if (topic.guide) {
      const guide = render('src/app/admin/(dashboard)/'+topic.guide.replace('/admin/','')+'/page.tsx').default
      assert.match(renderToStaticMarkup(React.createElement(guide)),/href="\/admin\/help"/)
    }
  }
  const sidebar = fs.readFileSync(path.join(root,'src/components/admin/Sidebar.tsx'),'utf8')
  assert.ok(sidebar.indexOf('href="/admin/help"') > sidebar.indexOf('href="/admin/settings"'))
  assert.ok(sidebar.indexOf('href="/admin/help"') < sidebar.indexOf('onClick={() => setIsLogoutDialogOpen(true)}'))
  assert.match(fs.readFileSync(path.join(root,'src/app/admin/(dashboard)/layout.tsx'),'utf8'),/if \(!profile\?\.is_active\) redirect/)
})

test('all guides share spaced responsive navigation with distinct Help and feature actions', () => {
  const render = loader({ 'next/link': ({children,...props}) => React.createElement('a',props,children) })
  for (const route of ['content/petunjuk','content/gambar/petunjuk','brosur-lokasi/petunjuk']) {
    const Guide = render('src/app/admin/(dashboard)/'+route+'/page.tsx').default
    const html = renderToStaticMarkup(React.createElement(Guide))
    const nav = html.match(/<nav aria-label="Navigasi petunjuk"[\s\S]*?<\/nav>/)[0]
    assert.match(nav,/flex-col gap-3/)
    assert.match(nav,/sm:flex-row/)
    assert.equal((nav.match(/<a /g)||[]).length,2)
    assert.match(nav,/Semua petunjuk/)
    assert.match(nav,/Buka /)
    assert.match(nav,/text-white/)
    assert.doesNotMatch(nav,/←/)
  }
})

test('image tabs use equal responsive grid cells and readable active counts', () => {
  const render = loader({ 'next/link': ({children,...props}) => React.createElement('a',props,children) })
  const Library = render('src/components/admin/content/ImageLibrary.tsx').default
  const html = renderToStaticMarkup(React.createElement(Library,{drafts:[],published:[],error:null}))
  assert.match(html,/grid-cols-2/)
  assert.match(html,/sm:grid-cols-3/)
  assert.match(html,/xl:grid-cols-4/)
  assert.match(html,/whitespace-normal/)
  assert.match(html,/group-data-\[state=active\]:text-\[#0B5EAA\]/)
})

test('Help presents a single-column exclusive FAQ accordion with closed answers initially', () => {
  const render = loader({ 'next/link': ({children,...props}) => React.createElement('a',props,children) })
  const {helpTopics} = render('src/lib/admin/help.ts')
  const Help = render('src/components/admin/help/HelpCenter.tsx').default
  const html = renderToStaticMarkup(React.createElement(Help))
  assert.equal((html.match(/name="admin-help-faq"/g)||[]).length,helpTopics.length)
  assert.equal((html.match(/<summary /g)||[]).length,helpTopics.length)
  assert.doesNotMatch(html,/<details[^>]*\sopen(?:=|\s|>)/)
  assert.doesNotMatch(html,/xl:grid-cols-2/)
  assert.match(html,/group-open:rotate-180/)
  for (const topic of helpTopics) {
    assert.ok(topic.question.endsWith('?'))
    assert.ok(html.includes(topic.question))
    assert.ok(html.includes('id="'+topic.id+'"'))
  }
})

test('FAQ search matches question text and preserves a clear empty result state', () => {
  for (const [query, expected] of [['banner',1],['tidak-ada-topik-ini',0]]) {
    const render = loader({
      react: {...React, useState: () => [query, () => {}]},
      'next/link': ({children,...props}) => React.createElement('a',props,children),
    })
    const Help = render('src/components/admin/help/HelpCenter.tsx').default
    const html = renderToStaticMarkup(React.createElement(Help))
    assert.equal((html.match(/<details /g)||[]).length,expected)
    assert.ok(html.includes(expected+' pertanyaan'))
    if (expected) assert.match(html,/Bagaimana cara mengganti banner, galeri, atau denah\?/)
    else assert.match(html,/Reset pencarian/)
  }
})
