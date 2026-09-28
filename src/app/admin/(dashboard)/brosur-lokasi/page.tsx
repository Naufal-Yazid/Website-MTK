import AdminCardAction from '@/components/admin/content/AdminCardAction'
import { contentDocuments } from '@/lib/content/catalog'
import { mergeValues } from '@/lib/content/model'
import { getContentAdminData } from '@/lib/content/admin'

export const metadata = { title: 'Brosur dan Lokasi | MTK Admin' }

export default async function BrochureLocationPage() {
  const { drafts, published, error } = await getContentAdminData()
  return <div className="space-y-6">
    <header><h1 className="text-2xl font-bold text-gray-900">Brosur dan Lokasi</h1><p className="mt-2 text-sm text-gray-500">Kelola PDF brosur, tombol lokasi, dan peta pada halaman proyek serta tipe unit.</p></header>
    <details className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-950">
      <summary className="cursor-pointer font-semibold">Petunjuk singkat</summary>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>Pilih halaman yang ingin diubah melalui tombol Kelola.</li>
        <li>Unggah brosur PDF (maks. 3 MB). Jika belum ada, biarkan placeholder.</li>
        <li>Untuk tombol lokasi, buka tempat yang benar di Google Maps → Bagikan → Salin link. Tempel di kolom link lokasi.</li>
        <li>Untuk peta di dalam halaman, gunakan Bagikan → Sematkan peta. Salin hanya alamat di dalam atribut src, bukan seluruh kode iframe. Link peta dan tombol diatur terpisah; pastikan keduanya menunjuk tempat yang sama.</li>
        <li>Klik Simpan Draft → buka Preview → jika sudah benar, Publikasikan. Perubahan tersimpan bersama draft konten halaman tersebut.</li>
      </ol>
      <p className="mt-3">Aktivasi upload pertama kali: jalankan migrasi 005_project_brochures.sql setelah migrasi 004_site_content.sql di Supabase. File upload bersifat publik; jangan unggah dokumen rahasia.</p>
    </details>
    {error && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">{error}</div>}
    {['Komplek', 'Fase TCI', 'Tipe unit'].map(category => <section key={category} className="space-y-4">
      <h2 className="text-lg font-semibold">{category}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contentDocuments.filter(doc => doc.category === category).map(doc => {
          const live = published.find(row => row.document_key === doc.id)
          const draft = drafts.find(row => row.document_key === doc.id)
          const values = mergeValues(doc, live?.content)
          return <article key={doc.id} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">{doc.label}</h3>
            {!error && <><p className="text-sm text-gray-600">Brosur publik: {values['brochure.path'] ? 'PDF tersedia' : 'Placeholder · Segera tersedia'}</p><p className="text-sm text-gray-600">Lokasi publik: {values['location.url'] ? 'Link tersedia' : 'Belum diisi'}</p><p className="text-xs text-gray-500">{draft && draft.revision > (live?.revision || 0) ? 'Ada draft belum dipublikasikan' : 'Tidak ada draft baru'}</p></>}
            <div className="mt-auto">
              <AdminCardAction href={'/admin/brosur-lokasi/' + doc.id} label={error ? 'Pengelolaan belum tersedia' : 'Kelola'} context={doc.label} disabled={Boolean(error)} />
            </div>
          </article>
        })}
      </div>
    </section>)}
  </div>
}
