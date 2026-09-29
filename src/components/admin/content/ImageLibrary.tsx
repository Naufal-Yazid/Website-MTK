'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ImageIcon, BookOpen } from 'lucide-react'
import { imagePageTabs, imagesForPage, imagePageLabel, tciImagePages } from '@/lib/media/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { imageUrl, type ImageRow } from '@/lib/media/model'
import AdminCardAction from './AdminCardAction'

const inputClass = 'min-h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5EAA]'
export default function ImageLibrary({ drafts, published, error }: { drafts: ImageRow[]; published: ImageRow[]; error: string | null }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState('beranda')
  const [unit, setUnit] = useState('')
  const [draftOnly, setDraftOnly] = useState(false)
  const [limit, setLimit] = useState(12)
  const pageImages = imagesForPage(page)
  const filtered = pageImages.filter(slot => {
    const draft = drafts.find(row => row.image_key === slot.id)
    const live = published.find(row => row.image_key === slot.id)
    return (!unit || slot.pages.includes(unit)) && (!draftOnly || Boolean(draft && draft.revision !== live?.revision)) &&
      (slot.label + ' ' + slot.group + ' ' + slot.pages.join(' ')).toLowerCase().includes(query.trim().toLowerCase())
  })
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="text-lg font-semibold text-gray-900">Gambar per halaman</h2><p className="mt-1 text-sm text-gray-500">Pilih halaman, lalu pilih foto yang ingin diganti.</p></div>
      <Link href="/admin/content/gambar/petunjuk" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#0B5EAA]"><BookOpen className="h-4 w-4" aria-hidden="true" />Petunjuk gambar</Link>
    </div>
    <Tabs value={page} onValueChange={value => { setPage(value); setUnit(''); setQuery(''); setDraftOnly(false); setLimit(12) }} className="space-y-5">
      <TabsList aria-label="Halaman gambar" className="grid h-auto w-full grid-cols-2 items-stretch gap-2 rounded-xl border-gray-200 bg-white p-3 sm:grid-cols-3 xl:grid-cols-4">
        {imagePageTabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="group min-h-12 min-w-0 justify-between gap-2 whitespace-normal rounded-lg border border-transparent px-3 py-2.5 text-left text-sm leading-5 text-gray-600 shadow-none hover:border-gray-200 hover:bg-slate-50 last:col-span-2 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-50 data-[state=active]:font-semibold data-[state=active]:text-[#0B5EAA] data-[state=active]:shadow-none sm:last:col-span-1">
          <span className="min-w-0">{tab.label}</span><span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 px-1.5 text-xs tabular-nums text-gray-500 group-data-[state=active]:bg-white group-data-[state=active]:text-[#0B5EAA]">{imagesForPage(tab.id).length}</span>
        </TabsTrigger>)}
      </TabsList>
      {imagePageTabs.map(tab => <TabsContent key={tab.id} value={tab.id} className="space-y-5">
        {page === tab.id && <>
    {error && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error} Penyuntingan dinonaktifkan sementara.</p>}
    <div className={`grid items-end gap-4 rounded-xl border border-gray-200 bg-white p-4 ${page === 'tci-3' ? 'lg:grid-cols-[minmax(0,1fr)_minmax(200px,280px)_auto]' : 'sm:grid-cols-[minmax(0,1fr)_auto]'}`}>
      <label className="space-y-2 text-xs font-semibold text-gray-600"><span>Cari di halaman ini</span><span className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" aria-hidden="true" /><input type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(12) }} className={inputClass + ' pl-10'} placeholder="Cari banner, galeri, denah…" /></span></label>
      {page === 'tci-3' && <label className="space-y-2 text-xs font-semibold text-gray-600"><span>Halaman atau tipe unit</span><select className={inputClass} value={unit} onChange={event => { setUnit(event.target.value); setLimit(12) }}>{tciImagePages.map(item => <option key={item.path} value={item.path}>{item.label}</option>)}</select></label>}
      <label className="flex min-h-11 items-center gap-2 self-end text-sm text-gray-700"><input type="checkbox" disabled={Boolean(error)} checked={draftOnly} onChange={event => { setDraftOnly(event.target.checked); setLimit(12) }} className="h-4 w-4 accent-[#0B5EAA]" />Ada draft</label>
    </div>
    <p role="status" className="text-sm text-gray-500">{filtered.length} gambar ditemukan · menampilkan {Math.min(limit, filtered.length)}</p>
    <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">{filtered.slice(0, limit).map(slot => {
      const live = published.find(row => row.image_key === slot.id)
      const draft = drafts.find(row => row.image_key === slot.id)
      const pending = Boolean(draft && draft.revision !== live?.revision)
      return <article key={slot.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative aspect-video overflow-hidden border-b border-gray-100 bg-slate-100 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- Thumbnail displays already converted WebP or the original file. */}
          <img src={imageUrl(live?.path, slot.id) || slot.src} alt={slot.label} loading="lazy" className="h-full w-full object-contain" />
          <span className="absolute right-3 top-3 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">{error ? 'Belum terhubung' : pending ? 'Ada draft' : live?.path ? 'Gambar terbit' : 'Gambar bawaan'}</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5"><p className="text-xs font-semibold text-[#0B5EAA]">{slot.group}</p><h3 className="font-semibold text-gray-900">{slot.label}</h3><p className="break-words text-xs leading-relaxed text-gray-500">Dipakai di: {[...new Set(slot.pages.map(imagePageLabel))].join(', ')}</p><div className="mt-auto pt-4"><AdminCardAction href={'/admin/content/gambar/' + slot.id} label="Kelola gambar" context={slot.label} disabled={Boolean(error)} /></div></div>
      </article>
    })}</div>
    {!filtered.length && <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"><ImageIcon className="mx-auto mb-3 h-8 w-8 text-gray-400" aria-hidden="true" /><p>Tidak ada gambar yang cocok.</p><button type="button" onClick={() => { setQuery(''); setUnit(''); setDraftOnly(false) }} className="mt-3 min-h-11 rounded-lg px-4 font-semibold text-[#0B5EAA] hover:bg-blue-50">Reset filter</button></div>}
    {limit < filtered.length && <button type="button" onClick={() => setLimit(value => value + 12)} className="min-h-11 w-full rounded-lg border border-gray-200 bg-white px-4 font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Tampilkan lebih banyak</button>}
        </>}
      </TabsContent>)}
    </Tabs>
  </div>
}
