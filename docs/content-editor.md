# Konten Website: draft, preview, publikasi

## Aktivasi

1. Deploy/pull seluruh perubahan kode, termasuk `ContentView.tsx`, `src/lib/content`, komponen editor, dan migrasi. Jangan menyalin `page.tsx` saja.
2. Pada proyek Supabase yang sama dengan `.env.local`, jalankan seluruh isi `supabase/migrations/004_site_content.sql` melalui SQL Editor. Migrasi 001–003 harus sudah dijalankan sebelumnya. Tidak ada penghapusan data lama.
3. Pastikan konfigurasi Supabase existing tetap benar. Service role key tetap server-only (digunakan pencatatan Logs, bukan dikirim ke editor).
4. Buka **Admin → Konten Website**. Jika migrasi belum dijalankan, admin menampilkan instruksi aktivasi dan tidak mengizinkan penyimpanan. Website publik tetap menampilkan konten bawaan.

Migrasi sudah disiapkan di repositori; tidak otomatis diterapkan ke database Supabase saat aplikasi dijalankan.

## Cakupan

- Tiga komplek tetap: Taman Cibaduyut Indah, Rancamanyar Indah, Permata Buah Batu.
- Fase existing TCI 1, TCI 2, TCI 3.
- Unit existing TCI 3: Cluster Tipe 36/45/50, Non-Cluster Tipe 50, dan Terranova Arcade.
- Teks hero, judul/deskripsi bagian, luas/keterangan kawasan, badge, lokasi/akses sekitar, spesifikasi, keterangan denah, caption galeri, ringkasan kartu, dan harga awal.
- Kartu proyek di beranda/daftar proyek, kartu fase di halaman TCI, kartu unit dan tabel perbandingan di TCI 3 menggunakan sumber data terkait yang sama.
- Harga unit berupa angka Rupiah penuh. Nilai yang sama mengisi kartu dan `initialHarga` kalkulator KPR. Nama/label kartu serta judul panjang halaman disediakan sebagai field terpisah karena konteks tampilannya berbeda.
- Luas dalam paragraf deskriptif adalah teks bebas: sesuaikan juga paragraf bila mengubah badge luas. Nilai spesifikasi unit otomatis dipakai di tabel perbandingan.
- Tidak ada tambah/hapus proyek atau tipe, upload foto, edit URL, ubah layout, atau editor HTML. Teks global Navbar/Footer/CTA, Tentang, label tombol, dan konfigurasi bunga bank tidak termasuk editor ini.
- ID/rute proyek dan pilihan formulir inquiry tetap, meskipun judul tampilan diubah. Analytics/inquiry tidak kehilangan identitas existing.

## Alur admin

1. Pilih halaman lalu buka kelompok field yang ingin diubah. Semua isian memiliki batas panjang dan validasi server.
2. Klik **Simpan Draft**. Perubahan belum tampil ke pengunjung.
3. Klik **Preview draft** untuk membuka halaman publik yang sebenarnya di tab baru. Ada preview halaman detail dan kartu ringkasan terkait. Preview hanya membaca draft dokumen yang dipilih; dokumen lain tetap memakai versi terbit.
4. Periksa halaman. Jika ada koreksi, kembali ke editor, simpan ulang, lalu buka ulang/refresh preview.
5. Klik **Publikasikan**, periksa ringkasan sebelum/sesudah, lalu konfirmasi. Halaman terkait menampilkan versi terbit terbaru pada permintaan berikutnya; tab pengunjung yang sudah terbuka perlu dimuat ulang.

Preview/publikasi dinonaktifkan saat ada isian belum disimpan. Peringatan meninggalkan editor membantu menjaga isian lokal. Jika revisi berubah di tab/admin lain, penyimpanan/publikasi ditolak: salin isian penting sebelum memuat ulang editor. Tidak ada overwrite paksa.

Untuk membatalkan isi suatu draft, edit kembali isian menjadi konten yang diinginkan lalu simpan revisi baru. Fitur ini tidak menyediakan penghapusan dokumen atau riwayat rollback otomatis.

## Privasi dan konsistensi

- Draft dan publik berada pada tabel terpisah. RLS/privilege menutup akses draft dari anon; hanya admin aktif dapat membacanya.
- Preview memeriksa sesi dan status admin di server sebelum membaca draft; URL preview bukan token akses publik. Halaman preview `noindex`, dinamis, dan tidak memakai cache shared.
- Pembaca publik memakai anonymous key dan hanya meminta tabel published, bahkan ketika pengunjung sedang login sebagai admin. Tidak ada draft dalam payload publik.
- Seluruh admin aktif dapat menyimpan dan mempublikasikan. RPC menolak akun nonaktif/anon; tidak ada write table langsung dari browser.
- Simpan/publikasi memakai transaksi, advisory lock per dokumen, dan optimistic revision check. Publish menyalin snapshot draft tersimpan secara atomik, bukan payload isian yang belum disimpan.
- Konten dirender sebagai teks React, bukan `dangerouslySetInnerHTML`. Field di luar katalog, tipe data salah, kontrol karakter, angka harga invalid, dan teks terlalu panjang ditolak server.
- Logs existing mencatat `content.save_draft` dan `content.publish`, dokumen/revisi/pelaku tanpa menyalin seluruh isi teks. Pencatatan Logs tetap best-effort sesuai fitur existing.
- Jika pembacaan published gagal, halaman kembali ke default kode dengan peringatan aman di server. Editor tidak membiarkan pengguna menyimpan dari status database yang gagal dibaca. Preview yang gagal dibaca tidak dianggap sebagai preview sukses.
- Default di `src/lib/content/catalog.ts` berasal dari konten existing; perubahan database tidak menimpa file sumber. Route pages memuat data dan meneruskannya ke `ContentView.tsx`, yang mempertahankan layout/foto existing.

## Pengujian

- `node --test tests/content.test.cjs tests/admin-logs.test.cjs`
- `npx tsc --noEmit --incremental false`
- `npm run build`
- `tests/content-database.sql` hanya untuk **cluster PostgreSQL sementara kosong**, database bernama `mtk_content_test`. Script membuat role/schema tiruan untuk pengujian RLS, draft, publish, dan konflik. **Jangan jalankan script tes ini di Supabase/produksi**; yang dijalankan di Supabase hanya migrasi 004.

Setelah migrasi Supabase, lakukan smoke test dengan draft ringan: sebelum publikasi tab incognito harus tetap menampilkan versi lama; setelah konfirmasi publikasi, refresh harus menampilkan versi baru. Periksa kartu/halaman detail/KPR sesuai jenis dokumen, serta entry Logs bila migrasi 003 sudah aktif.
