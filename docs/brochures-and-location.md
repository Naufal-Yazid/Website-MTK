# Brosur dan Lokasi

Menu admin: /admin/brosur-lokasi. Pengelolaan tersedia untuk 11 halaman tetap:
TCI, Rancamanyar, Permata Buah Batu, TCI 1/2/3, Cluster 36/45/50,
Non-Cluster 50, dan Terranova Arcade.

## Aktivasi satu kali

1. Pastikan migrasi 001–004 telah dijalankan di proyek Supabase yang dipakai website.
2. Buka Supabase → SQL Editor → New query.
3. Salin seluruh isi supabase/migrations/005_project_brochures.sql, lalu Run.
4. Periksa Storage: bucket project-brochures harus ada, public, hanya application/pdf,
   maksimal 3 MB. Migrasi dapat dijalankan ulang.
5. Jalankan ulang server lokal (npm run dev) atau build/deploy ulang karena
   next.config.ts menambah batas body Server Actions 4 MB untuk upload PDF 3 MB
   beserta overhead multipart.
6. Login memakai akun admin aktif, lalu buka menu Brosur dan Lokasi.

Tidak perlu environment variable baru. Storage menggunakan sesi admin dan
NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY yang sudah dipakai.
Jangan memasukkan service-role key ke browser. Migrasi ini tidak dijalankan
otomatis oleh build dan tidak mengubah tabel/draft konten yang sudah ada.

## Cara memakai

1. Klik Kelola pada halaman yang diinginkan.
2. Unggah PDF yang sudah final dan boleh dibagikan kepada publik (maks. 3 MB).
   Jika belum ada, biarkan placeholder. Gunakan placeholder untuk melepas
   tautan brosur dari halaman; file lama tidak dihapus.
3. Isi link tombol lokasi dari Google Maps → Bagikan → Salin link.
   Link harus HTTPS Google Maps atau maps.app.goo.gl, bukan tautan situs lain.
4. Pada halaman yang memiliki peta, ada kolom link peta terpisah:
   Google Maps → Bagikan → Sematkan peta → salin URL di dalam src="...".
   Jangan tempel seluruh kode iframe. Pastikan pin tombol dan peta sama.
   Kosongkan untuk menampilkan keterangan peta belum tersedia.
5. Simpan Draft → Preview halaman detail → Publikasikan → konfirmasi.
   Hanya draft tersimpan yang dipublikasikan. Jika draft memuat perubahan
   teks/status dari menu Konten Website, semuanya ikut diterbitkan; periksa
   peringatan dan ringkasan perubahan sebelum konfirmasi.

## Perilaku publik dan keamanan

- Semua 11 hero memakai komponen tombol yang sama, responsif dan dapat membungkus baris.
- Tanpa PDF, tombol disabled berlabel "Brosur · Segera tersedia"; tidak ada link palsu.
- Brosur cluster TCI 3 yang sudah ada (/brosur/brosur-cluster-tci.pdf) dipertahankan
  untuk tipe 36/45/50. Halaman lain awalnya placeholder.
- Lokasi bawaan mengikuti peta lama; TCI overview memakai pencarian nama kawasan.
  Admin perlu memastikan pin tepat sebelum menggantinya.
- File upload divalidasi ekstensi, MIME, ukuran, dan awalan PDF di server. Ini
  validasi format dasar, bukan pemindai malware.
- Bucket berisi brosur publik. URL file dapat diakses sebelum tombol diterbitkan.
  Jangan unggah dokumen pribadi atau rahasia. Draft teks/link tetap dilindungi CMS.
- Setiap upload memakai nama UUID baru tanpa overwrite. Penggantian/placeholder
  tidak menghapus file yang mungkin masih dipakai versi publik.
- File yang batal dipakai tetap berada di Storage. Pembersihan manual harus
  mengecek referensi draft/published terlebih dahulu; tidak ada hapus otomatis.
- Save/publish memeriksa keberadaan PDF upload; file hilang atau Storage tidak
  dapat diakses akan menggagalkan perubahan dengan pesan, bukan menerbitkan link mati.
- Upload, simpan draft, dan publikasi tercatat lewat mekanisme Logs yang sudah ada.
- Draft/published lama tetap terbaca dengan nilai bawaan field baru. Editor lama
  harus dimuat ulang sebelum menyimpan agar tidak menghapus pengaturan baru.

## Pemeriksaan setelah migrasi (lingkungan Supabase asli)

1. TCI 1/2 dan proyek lain menampilkan placeholder, lokasi dapat dibuka.
2. Unggah PDF kecil, Simpan Draft; publik masih placeholder, Preview menampilkan PDF.
3. Publikasikan; Download Brosur mengunduh PDF yang sama.
4. Ubah link tombol dan peta; cek Preview lalu publikasi.
5. Gunakan placeholder lalu publikasi; tombol tidak lagi menjadi link unduh.
6. Coba file selain PDF / di atas 3 MB; upload harus ditolak.
7. Akun non-admin/inaktif tidak boleh upload atau menyimpan/publikasi.
8. Uji di mobile dan desktop; tombol tidak meluber.

Pengujian otomatis lokal memakai mock Storage, sehingga upload/RLS dan pin Google
Maps tetap perlu dicek pada proyek Supabase asli setelah aktivasi.
