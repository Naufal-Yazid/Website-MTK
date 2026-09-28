import AdminCardAction from '@/components/admin/content/AdminCardAction'
import { contentDocuments } from '@/lib/content/catalog'
import type { getContentAdminData } from '@/lib/content/admin'
import { resolvePublished, mergeValues } from '@/lib/content/model'
import { availabilityFor, availabilityOptions } from '@/lib/content/availability'
import AvailabilityBadge from '@/components/content/AvailabilityBadge'

type AdminData = Awaited<ReturnType<typeof getContentAdminData>>
type Props = { drafts: AdminData['drafts']; published: AdminData['published']; error: AdminData['error'] }

export default function AvailabilityPanel({ drafts, published, error }: Props) {
  const live = resolvePublished(published)
  const groups = [
    { label: 'Komplek dan fase TCI', ids: ['tci-1', 'tci-2', 'rancamanyar', 'permata-buah-batu'] },
    { label: 'TCI 3 · Cluster', ids: ['tipe-36', 'tipe-45', 'tipe-50'] },
    { label: 'TCI 3 · Non-Cluster', ids: ['non-cluster-50'] },
    { label: 'TCI 3 · Ruko', ids: ['teranova'] },
  ]
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Status Ketersediaan Unit</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-500">Pilih unit, ubah status, lalu simpan draft dan publikasikan. Status yang terbit muncul pada kartu dan halaman detail. Ini adalah penanda ketersediaan, bukan hitungan stok atau sistem pemesanan.</p>
        <div className="flex flex-wrap gap-2 pt-2">{availabilityOptions.map(option => <AvailabilityBadge key={option.value} status={option.value} />)}</div>
      </header>
      {error && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error} Status di bawah adalah nilai bawaan, bukan konfirmasi data terbit.</div>}
      <section className="space-y-3 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="font-semibold text-gray-900">Ringkasan TCI 3 — otomatis dari unit</h2>
        <div className="flex flex-wrap gap-4">{[['tci-3', 'Semua unit'], ['cluster', 'Cluster'], ['non-cluster', 'Non-Cluster'], ['ruko', 'Ruko']].map(([id, label]) => <div key={id} className="flex flex-wrap items-center gap-2 text-sm"><span>{label}</span><AvailabilityBadge status={availabilityFor(live, id)} /></div>)}</div>
        <p className="text-xs leading-relaxed text-gray-600">Masih ada unit Tersedia → hijau. Tidak ada yang Tersedia tetapi masih ada Hampir habis → kuning. Semua unit Habis → merah. Ringkasan kawasan TCI mengikuti aturan yang sama.</p>
      </section>
      {groups.map(group => <section key={group.label} className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">{group.label}</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{group.ids.map(id => {
          const doc = contentDocuments.find(item => item.id === id)!
          const draft = drafts.find(row => row.document_key === id)
          const publication = published.find(row => row.document_key === id)
          const hasDraft = draft && draft.revision !== publication?.revision
          const draftBundle = { ...live, [id]: mergeValues(doc, draft?.content) }
          return <article key={id} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">{doc.label}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm"><span className="text-gray-500">{error ? 'Bawaan:' : 'Publik:'}</span><AvailabilityBadge status={availabilityFor(live, id)} /></div>
            {hasDraft && <div className="space-y-2 text-xs text-amber-800"><div className="flex flex-wrap items-center gap-2">Draft belum terbit: <AvailabilityBadge status={availabilityFor(draftBundle, id)} /></div><p>Periksa juga perubahan konten lain pada draft halaman ini.</p></div>}
            <div className="mt-auto">
              <AdminCardAction href={`/admin/content/${id}?mode=ketersediaan`} label={error ? 'Editor belum tersedia' : 'Ubah status'} context={doc.label} disabled={Boolean(error)} />
            </div>
          </article>
        })}</div>
      </section>)}
    </div>
  )
}
