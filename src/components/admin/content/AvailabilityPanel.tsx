import type { getContentAdminData } from '@/lib/content/admin'
import { resolvePublished } from '@/lib/content/model'
import { availabilityFor } from '@/lib/content/availability'
import { buildAdminCatalog } from '@/lib/content/admin-catalog'
import AvailabilityBadge from '@/components/content/AvailabilityBadge'
import ManagementCatalog from './ManagementCatalog'

type AdminData = Awaited<ReturnType<typeof getContentAdminData>>
type Props = { drafts: AdminData['drafts']; published: AdminData['published']; error: AdminData['error'] }

export default function AvailabilityPanel({ drafts, published, error }: Props) {
  const live = resolvePublished(published)
  return <div className="space-y-6">
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">Status Ketersediaan Unit</h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">Ringkasan TCI 3 mengikuti status unit secara otomatis. Ubah status masing-masing unit di bawah.</p>
      </header>
      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">{[['tci-3', 'Semua unit TCI 3'], ['cluster', 'Cluster'], ['non-cluster', 'Non-Cluster'], ['ruko', 'Ruko']].map(([id, label]) => <div key={id} className="space-y-2 rounded-lg bg-slate-50 p-3"><p className="text-xs font-medium text-gray-500">{label}</p>{error ? <span className="text-sm text-gray-500">Belum dapat dimuat</span> : <AvailabilityBadge status={availabilityFor(live, id)} />}</div>)}</div>
      <p className="px-5 pb-4 text-xs leading-relaxed text-gray-500">Hijau: tersedia. Kuning: hampir habis. Merah: habis. Status ini bukan jumlah stok atau sistem pemesanan.</p>
    </section>
    <ManagementCatalog items={buildAdminCatalog(drafts, published, 'availability')} mode="availability" error={error} />
  </div>
}
