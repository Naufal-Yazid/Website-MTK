import type { CatalogItem, CatalogMode } from '@/lib/content/admin-catalog'
import AvailabilityBadge from '@/components/content/AvailabilityBadge'
import AdminCardAction from './AdminCardAction'

export default function ManagementTable({ items, mode, error }: {
  items: CatalogItem[]
  mode: CatalogMode
  error: string | null
}) {
  const isAvailability = mode === 'availability'
  const isResources = mode === 'resources'
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B5EAA]" role="region" aria-label={isResources ? 'Daftar brosur dan lokasi' : isAvailability ? 'Daftar status ketersediaan' : 'Daftar konten website'} tabIndex={0}>
        <table className="w-full min-w-[760px] text-left text-sm">
          <caption className="sr-only">{isResources ? 'Brosur, lokasi, dan status publikasi setiap halaman' : isAvailability ? 'Status publik dan draft ketersediaan setiap halaman' : 'Halaman website yang dapat diedit'}</caption>
          <thead className="border-b border-gray-200 bg-slate-50 text-xs font-semibold text-gray-600">
            <tr>
              <th scope="col" className="px-5 py-4">Halaman</th>
              <th scope="col" className="px-5 py-4">Kategori</th>
              {isResources && <><th scope="col" className="px-5 py-4">Brosur publik</th><th scope="col" className="px-5 py-4">Lokasi publik</th></>}
              <th scope="col" className="px-5 py-4">{isAvailability ? 'Status publik' : 'Status publikasi'}</th>
              {isAvailability && <th scope="col" className="px-5 py-4">Draft belum terbit</th>}
              <th scope="col" className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => <tr key={item.id} className="transition-colors hover:bg-slate-50/70">
              <th scope="row" className="px-5 py-4 font-normal">
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="mt-1 break-all text-xs leading-relaxed text-gray-500">{item.path}</p>
              </th>
              <td className="whitespace-nowrap px-5 py-4 text-gray-600">{item.category}</td>
              {isResources && <>
                <td className="px-5 py-4"><span className={`text-xs ${!error && item.hasBrochure ? 'font-medium text-emerald-700' : 'text-gray-500'}`}>{error ? 'Belum dapat diperiksa' : item.hasBrochure ? 'PDF tersedia' : 'Placeholder · Segera tersedia'}</span></td>
                <td className="px-5 py-4"><span className={`whitespace-nowrap text-xs ${!error && item.hasLocation ? 'font-medium text-emerald-700' : 'text-gray-500'}`}>{error ? 'Belum dapat diperiksa' : item.hasLocation ? 'Link tersedia' : 'Belum diisi'}</span></td>
              </>}
              <td className="px-5 py-4">
                {error ? <span className="text-xs text-gray-500">Belum terhubung</span> : isAvailability ? <AvailabilityBadge status={item.availability} /> : (
                  <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${item.pending ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                    {item.pending ? 'Ada draft' : item.revision ? `Terbit · r${item.revision}` : 'Konten bawaan'}
                  </span>
                )}
              </td>
              {isAvailability && <td className="px-5 py-4">
                {error ? <span className="text-xs text-gray-500">Belum dapat diperiksa</span> : item.draftAvailability ? <AvailabilityBadge status={item.draftAvailability} /> : <span className="text-xs text-gray-500">Tidak ada perubahan</span>}
              </td>}
              <td className="px-5 py-4 text-right">
                <AdminCardAction href={isResources ? `/admin/brosur-lokasi/${item.id}` : `/admin/content/${item.id}${isAvailability ? '?mode=ketersediaan' : ''}`} label={error ? 'Editor belum tersedia' : isResources ? 'Kelola' : isAvailability ? 'Ubah status' : 'Edit konten'} context={item.label} disabled={Boolean(error)} />
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <p className="border-t border-gray-200 px-5 py-3 text-xs text-gray-500 md:hidden">Geser tabel untuk melihat semua kolom.</p>
    </div>
  )
}
