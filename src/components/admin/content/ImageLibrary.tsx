'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ImageIcon, BookOpen } from 'lucide-react'
import { imagePageTabs, imagesForPage, tciImagePages } from '@/lib/media/navigation'
import type { ImageRow } from '@/lib/media/model'
import ImageLibraryTable from './ImageLibraryTable'
import FilterSummary from './FilterSummary'

const inputClass = 'h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm font-normal text-gray-900 outline-none transition-colors focus:border-[#0B5EAA] focus:ring-2 focus:ring-blue-100'
export default function ImageLibrary({ drafts, published, error }: { drafts: ImageRow[]; published: ImageRow[]; error: string | null }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState('all')
  const [unit, setUnit] = useState('')
  const [draftOnly, setDraftOnly] = useState(false)
  const [limit, setLimit] = useState(12)
  const changePage = (value: string) => {
    setPage(value)
    setUnit('')
    setQuery('')
    setDraftOnly(false)
    setLimit(12)
  }
  const resetFilters = () => changePage('all')
  const hasFilters = page !== 'all' || Boolean(query || unit || draftOnly)
  const filtered = imagesForPage(page).filter(slot => {
    const draft = drafts.find(row => row.image_key === slot.id)
    const live = published.find(row => row.image_key === slot.id)
    return (!unit || slot.pages.includes(unit)) && (!draftOnly || Boolean(draft && draft.revision !== live?.revision)) &&
      (slot.label + ' ' + slot.group + ' ' + slot.pages.join(' ')).toLowerCase().includes(query.trim().toLowerCase())
  })
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="text-lg font-semibold text-gray-900">Gambar per halaman</h2><p className="mt-1 text-sm text-gray-500">Pilih kategori halaman, lalu pilih foto yang ingin diganti.</p></div>
      <Link href="/admin/content/gambar/petunjuk" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#0B5EAA]"><BookOpen className="h-4 w-4" aria-hidden="true" />Petunjuk gambar</Link>
    </div>
    <div className="space-y-3">
      {error && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error} Penyuntingan dinonaktifkan sementara.</p>}
      <div className="space-y-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid items-end gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(220px,0.8fr)_auto]">
          <label className="flex min-w-0 flex-col gap-2 text-xs font-semibold text-gray-600">
            <span>Cari gambar</span>
            <span className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(12) }} className={inputClass + ' !pl-12'} placeholder="Cari banner, galeri, denah…" />
            </span>
          </label>

          <label className="flex min-w-0 flex-col gap-2 text-xs font-semibold text-gray-600">
            <span>Kategori halaman</span>
            <select value={page} onChange={event => changePage(event.target.value)} className={inputClass}>
              <option value="all">Semua halaman ({imagesForPage('all').length})</option>
              {imagePageTabs.map(item => <option key={item.id} value={item.id}>{item.label} ({imagesForPage(item.id).length})</option>)}
            </select>
          </label>
          <label className="flex h-12 items-center gap-2 self-end rounded-lg px-1 text-sm font-normal text-gray-700"><input type="checkbox" disabled={Boolean(error)} checked={draftOnly} onChange={event => { setDraftOnly(event.target.checked); setLimit(12) }} className="h-4 w-4 accent-[#0B5EAA]" />Ada draft</label>
          {page === 'tci-3' && <label className="flex flex-col gap-2 text-xs font-semibold text-gray-600 md:col-span-2 md:max-w-sm"><span>Halaman atau tipe unit</span><select className={inputClass} value={unit} onChange={event => { setUnit(event.target.value); setLimit(12) }}>{tciImagePages.map(item => <option key={item.path} value={item.path}>{item.label}</option>)}</select></label>}
        </div>
        <FilterSummary hint="Thumbnail menampilkan gambar publik." onReset={hasFilters ? resetFilters : undefined}>
          {filtered.length} gambar ditemukan · menampilkan {Math.min(limit, filtered.length)}
        </FilterSummary>
      </div>
      {filtered.length > 0 && <ImageLibraryTable slots={filtered.slice(0, limit)} drafts={drafts} published={published} error={error} />}
      {!filtered.length && <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"><ImageIcon className="mx-auto mb-3 h-8 w-8 text-gray-400" aria-hidden="true" /><p>Tidak ada gambar yang cocok.</p><button type="button" onClick={resetFilters} className="mt-3 min-h-11 rounded-lg px-4 font-semibold text-[#0B5EAA] hover:bg-blue-50">Reset filter</button></div>}
      {limit < filtered.length && <button type="button" onClick={() => setLimit(value => value + 12)} className="min-h-11 w-full rounded-lg border border-gray-200 bg-white px-4 font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Tampilkan lebih banyak</button>}
    </div>
  </div>
}
