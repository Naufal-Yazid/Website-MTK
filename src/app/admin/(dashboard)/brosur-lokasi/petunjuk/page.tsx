import GuideNavigation from '@/components/admin/help/GuideNavigation'
import { BookOpen } from 'lucide-react'

export const metadata = { title: 'Petunjuk Brosur dan Lokasi | MTK Admin', robots: { index: false, follow: false } }

const steps = [
  ['Pilih halaman', 'Buka Brosur dan Lokasi, cari nama proyek atau tipe unit, lalu klik “Kelola”. Setiap halaman memiliki pengaturan sendiri.'],
  ['Masukkan brosur jika sudah ada', 'Klik pilih file, lalu pilih brosur PDF dengan ukuran maksimal 3 MB. Tunggu sampai upload berhasil. Klik “Periksa PDF yang dipilih” untuk memastikan filenya benar. Jika belum punya brosur, biarkan kosong; pengunjung akan melihat “Brosur · Segera tersedia”.'],
  ['Isi link tombol lokasi', 'Buka Google Maps, cari lokasi proyek yang benar, lalu pilih Bagikan → Salin link. Tempel link tersebut di kolom “Link tombol Lihat Lokasi”. Klik “Periksa lokasi” untuk mencoba tautannya.'],
  ['Sesuaikan peta di halaman', 'Jika ada kolom “Link peta yang ditampilkan di halaman”, buka Google Maps → Bagikan → Sematkan peta. Dari kode yang tersedia, ambil hanya alamat di dalam src="...". Jangan tempel seluruh kode iframe. Link tombol dan link peta berbeda; pastikan keduanya menuju lokasi yang sama. Jika kesulitan, minta tim teknis membantu.'],
  ['Simpan dan cek dulu', 'Klik “Simpan Draft”. Pengunjung belum melihat perubahan ini. Setelah tersimpan, buka “Preview halaman detail” untuk memeriksa tombol brosur dan lokasi. Jika perlu diperbaiki, kembali ke editor lalu simpan lagi.'],
  ['Tampilkan ke pengunjung', 'Jika sudah benar, klik “Publikasikan”, periksa perubahan, lalu pilih “Ya, publikasikan”. Buka “Lihat versi publik” dan coba kedua tombolnya.'],
]

export default function BrochureGuidePage() {
  return <div className="mx-auto max-w-4xl space-y-8">
    <GuideNavigation href="/admin/brosur-lokasi" label="Buka Brosur dan Lokasi" />
    <header className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0B5EAA]"><BookOpen className="h-6 w-6" aria-hidden="true" /></div>
      <div><h1 className="text-2xl font-bold text-gray-900">Petunjuk Brosur dan Lokasi</h1><p className="mt-2 text-sm leading-relaxed text-gray-500">Ikuti langkah berikut satu per satu. Tidak perlu mengubah kode website.</p></div>
    </header>
    <aside className="space-y-2 rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-relaxed text-blue-950"><p><strong>Simpan Draft</strong> = simpan sementara.</p><p><strong>Preview</strong> = periksa tampilannya.</p><p><strong>Publikasikan</strong> = tampilkan ke pengunjung.</p></aside>
    <section aria-labelledby="brochure-guide-steps" className="space-y-4">
      <h2 id="brochure-guide-steps" className="text-lg font-semibold text-gray-900">Cara mengatur brosur dan lokasi</h2>
      <ol className="space-y-3">{steps.map(([title, description], index) => <li key={title} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B5EAA] text-sm font-bold text-white">{index + 1}</span><div className="min-w-0"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p></div></li>)}</ol>
    </section>
    <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
      <h2 className="text-lg font-semibold">Hal penting sebelum upload</h2>
      <p>Hanya unggah brosur untuk publik. File yang sudah diunggah dapat dibuka melalui tautannya, meskipun tombolnya belum dipublikasikan. Jangan unggah dokumen rahasia.</p>
      <p>Publikasi menerbitkan seluruh draft halaman. Jika ada perubahan teks atau status dari menu Konten Website, perubahan itu juga ikut terbit. Periksa ringkasan sebelum konfirmasi.</p>
    </section>
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-600">
      <h2 className="text-lg font-semibold text-gray-900">Kalau menemui kendala</h2>
      <p><strong>Belum punya brosur / ingin melepas brosur?</strong> Pilih “Gunakan placeholder”, simpan draft, lalu publikasikan. File lama tidak dihapus.</p>
      <p><strong>Upload ditolak?</strong> Pastikan file benar-benar PDF, maksimal 3 MB, dan koneksi internet tersambung.</p>
      <p><strong>Upload belum diaktifkan?</strong> Minta tim teknis menjalankan migrasi 005_project_brochures.sql setelah 004_site_content.sql di Supabase SQL Editor, kemudian muat ulang halaman.</p>
      <p><strong>Link lokasi ditolak?</strong> Gunakan link HTTPS dari Google Maps, bukan kode iframe atau link situs lain. Kosongkan kolom jika lokasi belum tersedia.</p>
    </section>
  </div>
}
