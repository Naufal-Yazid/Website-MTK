import type { ImageSlot } from '@/lib/media/catalog'
import { imageUrl, type ImageRow } from '@/lib/media/model'
import { imagePageLabel } from '@/lib/media/navigation'
import AdminCardAction from './AdminCardAction'

export default function ImageLibraryTable({ slots, drafts, published, error }: {
  slots: ImageSlot[]
  drafts: ImageRow[]
  published: ImageRow[]
  error: string | null
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B5EAA]" role="region" aria-label="Daftar gambar halaman" tabIndex={0}>
        <table className="w-full min-w-[760px] text-left text-sm">
          <caption className="sr-only">Gambar publik, halaman pemakaian, dan status draft</caption>
          <thead className="border-b border-gray-200 bg-slate-50 text-xs font-semibold text-gray-600">
            <tr>
              <th scope="col" className="px-5 py-4">Gambar</th>
              <th scope="col" className="px-5 py-4">Dipakai di</th>
              <th scope="col" className="px-5 py-4">Status publikasi</th>
              <th scope="col" className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slots.map(slot => {
              const live = published.find(row => row.image_key === slot.id)
              const draft = drafts.find(row => row.image_key === slot.id)
              const pending = Boolean(draft && draft.revision !== live?.revision)
              return <tr key={slot.id} className="transition-colors hover:bg-slate-50/70">
                <th scope="row" className="px-5 py-4 font-normal">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element -- Thumbnail uses a converted WebP or the existing original. */}
                      <img src={imageUrl(live?.path, slot.id) || slot.src} alt={slot.label} loading="lazy" width={96} height={64} className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0"><p className="font-semibold text-gray-900">{slot.label}</p><p className="mt-1 text-xs text-gray-500">{slot.group}</p></div>
                  </div>
                </th>
                <td className="max-w-xs px-5 py-4 text-xs leading-relaxed text-gray-500">{[...new Set(slot.pages.map(imagePageLabel))].join(', ')}</td>
                <td className="px-5 py-4"><span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${!error && pending ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{error ? 'Belum terhubung' : pending ? 'Ada draft' : live?.path ? 'Gambar terbit' : 'Gambar bawaan'}</span></td>
                <td className="px-5 py-4 text-right"><AdminCardAction href={'/admin/content/gambar/' + slot.id} label="Kelola gambar" context={slot.label} disabled={Boolean(error)} /></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-gray-200 px-5 py-3 text-xs text-gray-500 md:hidden">Geser tabel untuk melihat semua kolom.</p>
    </div>
  )
}
