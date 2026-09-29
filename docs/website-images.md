# Kelola Gambar Website

## Mengaktifkan

1. Pull kode ini dan jalankan `npm ci`. Sharp kini menjadi dependency langsung untuk konversi di server (Node.js, bukan Edge).
2. Di Supabase project yang sama, buka SQL Editor dan jalankan seluruh isi `supabase/migrations/006_website_images.sql` setelah migrasi 001–005. Skrip ini menambah dua tabel, dua RPC dan bucket `website-images`; tidak mengganti konten/gambar lama.
3. Restart development server atau build/deploy ulang.
4. Login sebagai admin aktif → Konten Website → Kelola Gambar. Jika tabel belum tersedia, editor akan memberi petunjuk dan menonaktifkan upload. Website tetap memakai foto bawaan.

Migrasi belum dijalankan oleh perubahan kode ini. Tidak perlu menambahkan service-role key ke browser. Akses upload, draft dan publikasi memakai sesi admin + RLS/RPC.

## Alur

- Katalog berisi 52 sumber gambar yang sudah digunakan: banner, kartu, galeri, denah, tentang kami, logo/ikon publik, dan CTA.
- Satu sumber yang dipakai berulang adalah satu slot; perubahan akan mengikuti semua pemakaiannya. Admin melihat daftar halaman terdampak sebelum menerbitkan.
- JPG/JPEG, PNG dan WebP statis maksimal 3 MB/40 MP; MIME, ekstensi, dan hasil decode diperiksa. SVG, GIF, animasi, file rusak, serta dimensi berlebih ditolak.
- File didekode dengan Sharp, orientasi EXIF diterapkan, sisi panjang dibatasi 3.200 px tanpa pembesaran/pemotongan, transparansi dipertahankan, EXIF/GPS dihapus, lalu di-encode WebP. Output maksimal 3 MB.
- Upload menyimpan draft secara otomatis. Preview membandingkan gambar utuh, bukan keseluruhan halaman dengan frame/cropping-nya.
- Publikasi menyalin revisi draft secara atomik. Gambar publik dan preview admin terpisah; draft teks tidak ikut diterbitkan.
- Kembalikan gambar bawaan menyimpan draft referensi kosong. Harus dipublikasikan agar pengunjung kembali melihat gambar awal.
- File disimpan dengan UUID baru, bukan overwrite. Tidak ada penghapusan file dari UI, sehingga foto live lama tidak rusak ketika upload baru gagal.
- Konflik admin/tab ditolak menggunakan expected revision dan transaction lock. Jika koneksi terputus setelah upload, muat ulang sebelum mengulang. Upload sukses tapi penyimpanan draft konflik bisa meninggalkan file yang tidak ditautkan.

## Privasi & pemeliharaan

Bucket bersifat publik untuk aset pemasaran. File yang baru diunggah juga dapat dibuka lewat URL langsung meskipun belum dipublikasikan. Jangan unggah identitas, dokumen privat, atau foto tanpa hak penggunaan.
Tidak ada pembersihan otomatis file yatim/lama; pantau kapasitas Storage, dan verifikasi seluruh referensi draft/publik sebelum menghapus manual.
Foto Instagram tetap milik embed Instagram. Avatar admin tetap di Pengaturan Akun. Fitur ini mengganti slot gambar yang sudah ada, bukan menambah jumlah galeri atau mengubah layout.
Logo publik memakai mask: unggah PNG/WebP dengan latar transparan. Logo di layar login/sidebar admin tidak ikut berubah.

## Checklist setelah migrasi (gunakan proyek uji)

Kelola Gambar kini dipisah menjadi sub-tab per halaman. TCI 3 memiliki pilihan halaman utama dan tipe unit. Gambar bersama tetap memakai slot yang sama meskipun tampil pada beberapa sub-tab. Tab Umum berisi logo, ikon WhatsApp, dan latar konsultasi.

Menu Help berada di bawah Pengaturan (`/admin/help`), menyediakan pencarian dan panduan semua fitur. Petunjuk konten, brosur/lokasi, dan gambar yang sudah ada tetap tersedia dari Help maupun tombol petunjuk masing-masing fitur. Penjelasan panjang editor gambar dan versi website dipindahkan ke panduan; batas file dan peringatan privasi tetap terlihat saat upload.

1. Upload JPG orientasi portrait pada slot foto; pastikan draft berformat WebP, orientasi benar, URL berakhir .webp, dan publik masih foto lama.
2. Buka preview penuh. Publikasikan dan muat ulang halaman terkait (termasuk kartu beranda jika sumber dibagi).
3. Coba galeri dan denah: ukuran frame/object-fit tetap sama, denah tidak menjadi foto dari slot lain.
4. Coba PNG transparan. Coba file palsu, SVG, GIF, file >3 MB dan foto >40 MP: semua yang tidak didukung harus ditolak.
5. Buka slot sama di dua tab, simpan di tab pertama, lalu tab kedua: konflik harus ditolak.
6. Kembalikan bawaan, publikasikan; pastikan file sebelumnya tidak dihapus.
7. Logout: upload dan akses draft harus ditolak. Pengunjung hanya menerima referensi tabel site_image_published.
8. Periksa Logs untuk image.upload_draft, image.reset_draft, dan image.publish.
