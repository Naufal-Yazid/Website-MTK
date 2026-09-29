import GuideNavigation from '@/components/admin/help/GuideNavigation'
export const metadata = { title: 'Petunjuk Kelola Gambar | MTK Admin', robots: { index: false, follow: false } }
export default function ImageGuide() {
  return <div className="w-full space-y-6">
    <GuideNavigation href="/admin/content?tab=gambar" label="Buka Kelola Gambar" />
    <header><h1 className="text-2xl font-bold text-gray-900">Cara mengganti gambar</h1><p className="mt-2 text-sm text-gray-500">Foto lama tetap tampil sampai kamu menekan Publikasikan.</p></header>
    <ol className="space-y-4">{[
      ['Pilih foto yang mau diganti', 'Buka tab Kelola Gambar. Pilih kategori pada dropdown Kategori halaman. Klik Reset filter untuk kembali ke Semua halaman dan menghapus pencarian. Pada TCI 3, gunakan pilihan halaman atau tipe unit untuk mempersempit daftar, lalu klik Kelola gambar. Periksa bagian “Dipakai di” karena satu foto bisa dipakai di beberapa halaman.'],
      ['Pilih file dari komputer', 'Pakai JPG, PNG, atau WebP maksimal 3 MB dan 40 megapiksel. Untuk logo, pilih PNG/WebP transparan. SVG, GIF, dan foto animasi belum didukung.'],
      ['Unggah & simpan draft', 'Tunggu proses selesai. Sistem mengubah file menjadi WebP secara otomatis, menyesuaikan ukuran maksimal 3.200 px tanpa memotong, dan menghapus metadata GPS. Jika gagal, foto publik tidak berubah.'],
      ['Periksa preview', 'Bandingkan Versi publik dengan Preview draft. Klik Buka ukuran penuh untuk melihat detail. Frame di website tetap mengikuti desain, jadi pilih foto dengan bentuk/komposisi yang sesuai. Banner sebaiknya melebar dan denah beresolusi tinggi. Konversi mempertahankan transparansi serta menghapus metadata EXIF/GPS. Logo website memakai bentuk transparan sebagai mask, jadi jangan memakai foto berlatar penuh.'],
      ['Publikasikan', 'Jika sudah benar, klik Publikasikan gambar lalu Ya, publikasikan. Semua halaman yang memakai foto tersebut ikut diperbarui. Draft teks tidak ikut terbit.'],
      ['Ingin memakai foto semula?', 'Klik Kembalikan gambar bawaan, periksa draft, lalu publikasikan. File lama tidak dihapus.'],
    ].map(([title, detail], i) => <li key={title} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-[#0B5EAA]">{i + 1}</span><div><h2 className="font-semibold text-gray-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">{detail}</p></div></li>)}</ol>
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">Hanya unggah gambar untuk publik. File draft juga bisa dibuka jika seseorang memiliki tautan Storage. Jangan unggah dokumen rahasia. Jika muncul peringatan belum aktif, minta developer menjalankan migrasi 006_website_images.sql di Supabase. Foto Instagram berasal dari Instagram dan avatar admin dikelola di Pengaturan, bukan di menu ini.</div>
  </div>
}
