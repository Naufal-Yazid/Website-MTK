# Ketersediaan unit dan versi website

## Mengubah status

1. Buka **Konten Website → tab Status Ketersediaan**. Tombol tab mengganti isi di halaman yang sama, tanpa navigasi halaman. Tautan kembali dari editor langsung memilih tab ini.
2. Pilih **Ubah status** pada unit/komplek yang sesuai.
3. Pilih **Tersedia** (hijau), **Hampir habis** (kuning), atau **Habis** (merah).
4. Klik **Simpan Draft**, lihat preview, lalu **Publikasikan** dan konfirmasi.

Status disimpan sebagai field `availability` di JSON konten yang sudah ada (migrasi 004). Tidak perlu migrasi baru. Penyimpanan tetap membutuhkan admin aktif, menggunakan revisi untuk mencegah penimpaan, dan tercatat melalui Logs yang sudah ada. Data draft tidak dibaca pengunjung.

Editor status mempertahankan semua field draft lain. Jika ada perubahan teks/harga yang belum terbit, muncul peringatan: publikasi menerbitkan **seluruh draft halaman**. Konfirmasi menampilkan seluruh perbedaan. Buka editor lengkap untuk memeriksa atau menyesuaikannya.

Nilai bawaan untuk dokumen lama yang belum memiliki field status:

- TCI 1, TCI 2, Permata Buah Batu: Hampir habis.
- Rancamanyar: Tersedia.
- TCI 3 cluster 36/45/50, non-cluster 50, Terranova Arcade: Tersedia.

Status TCI 3, tiap kategori bangunan, dan kawasan TCI dihitung dari anggotanya: ada Tersedia → Tersedia; jika tidak, ada Hampir habis → Hampir habis; semua Habis → Habis. Ini bukan perhitungan jumlah stok. Tidak ada penutupan formulir inquiry atau penghapusan halaman ketika status Habis.

Badge tampil di pojok kanan atas foto pada kartu beranda, daftar proyek, kartu fase TCI, serta kartu unit TCI 3. Hero halaman detail tetap menampilkan badge. Tab Cluster/Non-Cluster/Ruko hanya menampilkan nama kategori tanpa badge. Label teks selalu ditampilkan, sehingga status tidak dibedakan hanya dari warna. Pengelolaan status tetap tersedia pada tab Konten Website, tanpa submenu tambahan di sidebar admin.

Kalimat bawaan lama “Seluruh unit pada fase ini telah habis terjual.” di deskripsi Permata tidak ditampilkan ketika statusnya bukan Habis; teks kustom lainnya tidak diubah. Periksa deskripsi manual agar sesuai dengan status aktual.

## Versi website

Buka **Pengaturan → Website**. Nama branch dan commit dibaca saat `next dev`/`next build`, kemudian dimasukkan sebagai metadata build oleh `next.config.ts`. Tidak ada perintah Git pada setiap permintaan halaman.

Prioritas branch: `APP_GIT_BRANCH`, `VERCEL_GIT_COMMIT_REF`, `COMMIT_REF`, `GITHUB_HEAD_REF`, `GITHUB_REF_NAME`, lalu Git lokal. Commit memakai variabel yang setara (`APP_GIT_COMMIT`, `VERCEL_GIT_COMMIT_SHA`, `COMMIT`, `GITHUB_SHA`), lalu Git lokal. Tanpa metadata/Git atau detached HEAD, branch menampilkan “Tidak tersedia”; commit tetap dapat tersedia.

Metadata ini bukan rahasia. Jangan memasukkan token/kredensial ke variabel versi. Setelah berganti branch: restart `npm run dev`; untuk produksi jalankan build/deploy baru. Versi kode tidak berubah ketika konten dipublikasikan lewat admin.
