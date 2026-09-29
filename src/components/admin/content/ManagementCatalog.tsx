'use client'

import { useState } from 'react'
import { Search, FilePenLine, FileText, MapPin, Layers3, CircleCheck, Clock3 } from 'lucide-react'
import { filterAdminCatalog, type CatalogItem, type CatalogMode } from '@/lib/content/admin-catalog'
import { availabilityOptions } from '@/lib/content/availability'
import AvailabilityBadge from '@/components/content/AvailabilityBadge'
import AdminCardAction from './AdminCardAction'

const control = 'min-h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0B5EAA] focus:ring-2 focus:ring-blue-100'
const categories = ['Komplek', 'Fase TCI', 'Tipe unit']

export default function ManagementCatalog({ items, mode, error }: { items: CatalogItem[]; mode: CatalogMode; error: string | null }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const visible = filterAdminCatalog(items, query, category, status)
  const isResources = mode === 'resources'
  const isAvailability = mode === 'availability'
  const pendingCount = items.filter(item => item.pending).length
  const stats = [
    { label: isAvailability ? 'Unit & fase dikelola' : 'Halaman dikelola', value: items.length, icon: Layers3, note: 'Sesuai halaman website yang ada' },
    { label: 'Draft belum terbit', value: error ? '—' : pendingCount, icon: Clock3, note: 'Perlu diperiksa sebelum publikasi' },
    { label: isResources ? 'Brosur di website' : isAvailability ? 'Status tersedia' : 'Tanpa draft baru', value: error ? '—' : items.filter(item => isResources ? item.hasBrochure : isAvailability ? item.availability === 'available' : !item.pending).length, icon: isResources ? FileText : CircleCheck, note: isResources ? 'PDF yang dapat dibuka pengunjung' : isAvailability ? 'Mengikuti status versi publik' : 'Konten terbit atau bawaan website' },
  ]
  const reset = () => { setQuery(''); setCategory('all'); setStatus('all') }

  return <div className="space-y-6">
    {error && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">{error}</div>}
    <dl className="grid gap-3 lg:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, note }) => <div key={label} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0B5EAA]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
        <div className="min-w-0"><dt className="text-xs font-medium text-gray-500">{label}</dt><dd className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{value}</dd><p className="mt-1 text-xs leading-relaxed text-gray-500">{note}</p></div>
      </div>)}
    </dl>

    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid items-end gap-3 xl:grid-cols-[minmax(0,1fr)_180px_200px]">
        <label className="min-w-0 space-y-2 text-xs font-semibold text-gray-600">
          <span>Cari halaman</span>
          <div className="relative"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Cari nama proyek atau tipe unit…" className={`${control} pl-10`} /></div>
        </label>
        <label className="space-y-2 text-xs font-semibold text-gray-600"><span>Kategori</span><select value={category} onChange={event => setCategory(event.target.value)} className={control}><option value="all">Semua kategori</option>{categories.map(name => <option key={name} value={name}>{name}</option>)}</select></label>
        <label className="space-y-2 text-xs font-semibold text-gray-600"><span>{isAvailability ? 'Status publik / draft' : 'Tampilkan'}</span><select value={status} onChange={event => setStatus(event.target.value)} className={control} disabled={Boolean(error)}>
          <option value="all">Semua status</option><option value="draft">Ada draft</option>
          {isResources ? <><option value="missing-brochure">Brosur belum tersedia</option><option value="missing-location">Lokasi belum diisi</option></> : isAvailability ? availabilityOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>) : <><option value="published">Sudah diterbitkan</option><option value="default">Konten bawaan</option></>}
        </select></label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
        <p role="status" aria-live="polite">Menampilkan <span className="font-semibold text-gray-900">{visible.length}</span> dari {items.length} halaman</p>
        {(query || category !== 'all' || status !== 'all') ? <button type="button" onClick={reset} className="min-h-9 rounded px-2 font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Reset filter</button> : <span>Perubahan tampil setelah dipublikasikan.</span>}
      </div>
    </div>

    {visible.length === 0 && <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center"><Search className="mx-auto mb-3 h-7 w-7 text-gray-400" aria-hidden="true" /><h2 className="font-semibold text-gray-900">Halaman tidak ditemukan</h2><p className="mt-2 text-sm text-gray-500">Coba kata kunci lain atau hapus filter yang dipilih.</p><button type="button" onClick={reset} className="mt-4 min-h-11 rounded-lg px-4 font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Tampilkan semua halaman</button></div>}

    {categories.map(name => {
      const group = visible.filter(item => item.category === name)
      if (!group.length) return null
      return <section key={name} className="space-y-3">
        <div className="flex items-center gap-3"><h2 className="text-base font-semibold text-gray-900">{name}</h2><span className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-500">{group.length}</span><div className="h-px flex-1 bg-gray-200" /></div>
        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">{group.map(item => <article key={item.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg bg-slate-50 p-2 text-[#0B5EAA]">{isResources ? <FileText className="h-5 w-5" aria-hidden="true" /> : <FilePenLine className="h-5 w-5" aria-hidden="true" />}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${!error && item.pending ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{error ? 'Belum terhubung' : item.pending ? 'Ada draft' : item.revision ? `Terbit · r${item.revision}` : 'Konten bawaan'}</span>
            </div>
            <h3 className="font-semibold leading-relaxed text-gray-900">{item.label}</h3>
            <p className="mt-1 break-all text-xs leading-relaxed text-gray-500">{item.path}</p>
            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
              {isResources ? <>
                <div className="flex items-start gap-2"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" /><div><p className="text-xs text-gray-500">Brosur publik</p><p className={`mt-1 text-xs font-medium ${!error && item.hasBrochure ? 'text-emerald-700' : 'text-gray-600'}`}>{error ? 'Belum dapat diperiksa' : item.hasBrochure ? 'PDF tersedia' : 'Placeholder · Segera tersedia'}</p></div></div>
                <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" /><div><p className="text-xs text-gray-500">Lokasi publik</p><p className={`mt-1 text-xs font-medium ${!error && item.hasLocation ? 'text-emerald-700' : 'text-gray-600'}`}>{error ? 'Belum dapat diperiksa' : item.hasLocation ? 'Link tersedia' : 'Belum diisi'}</p></div></div>
              </> : isAvailability ? <>
                <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs text-gray-500">{error ? 'Bawaan:' : 'Publik:'}</span><AvailabilityBadge status={item.availability} /></div>
                {item.draftAvailability && <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-50 p-2.5"><span className="text-xs text-amber-800">Draft belum terbit:</span><AvailabilityBadge status={item.draftAvailability} /></div>}
              </> : <p className="text-xs leading-relaxed text-gray-500">{item.pending && !error ? 'Draft tersimpan. Periksa perubahan sebelum ditampilkan ke pengunjung.' : 'Perbarui teks, harga, dan spesifikasi pada halaman ini.'}</p>}
            </div>
          </div>
          <div className="mt-auto border-t border-gray-100 bg-slate-50/60 px-5 py-4">
            <AdminCardAction href={isResources ? `/admin/brosur-lokasi/${item.id}` : `/admin/content/${item.id}${isAvailability ? '?mode=ketersediaan' : ''}`} label={error ? 'Editor belum tersedia' : isResources ? 'Kelola' : isAvailability ? 'Ubah status' : 'Edit konten'} context={item.label} disabled={Boolean(error)} />
          </div>
        </article>)}</div>
      </section>
    })}
  </div>
}
