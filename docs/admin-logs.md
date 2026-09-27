# Logs admin

Menu **Logs** tersedia di `/admin/logs` untuk admin aktif, dengan dua kategori:

- **Riwayat Admin**: hasil sukses perubahan status/read inquiry, klik WhatsApp inquiry, penghapusan inquiry, perubahan pengaturan, profil/password, dan pengelolaan akun admin.
- **Error Logs**: aksi di atas yang gagal serta error server tidak tertangani pada rute admin. Bukan pengumpul seluruh console browser, error build, atau error situs publik.

## Aktivasi database

1. Jalankan `supabase/migrations/003_admin_logs.sql` pada SQL Editor proyek Supabase yang sama dengan aplikasi, setelah migrasi 001 dan 002. Migrasi tidak menghapus data yang sudah ada.
2. Pastikan server memiliki `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY` yang benar. Jangan gunakan prefix `NEXT_PUBLIC_` untuk service role key atau commit `.env.local`.
3. Restart server jika environment berubah. Login sebagai admin aktif dan buka menu Logs.

Tidak ada layanan berbayar baru atau paket baru untuk fitur ini. Penyimpanan log tetap memakai kuota database Supabase yang sudah digunakan proyek.

## Perilaku dan keamanan

- Filter kategori, pencarian nama/aksi, rentang tanggal WIB, serta pagination 25 entri per halaman.
- Identitas pelaku diambil dari sesi server, bukan parameter dari browser.
- Detail berisi ID target (jika tersedia), nama field yang disimpan, status/role baru, atau kode korelasi error. Ini riwayat aktivitas, bukan salinan lengkap nilai sebelum/sesudah setiap field.
- Password, token, service key, isi inquiry, raw error message/stack, request body, dan header tidak disimpan.
- Akun nonaktif/publik tidak dapat membaca log melalui RLS. Browser tidak diberi hak insert/update/delete; service role aplikasi hanya dapat insert/read tabel log.
- Penghapusan admin tidak menghapus snapshot riwayat pelakunya.
- Error server memiliki pelaku `Sistem`; error action memiliki identitas admin yang sedang login. Sebuah kegagalan action yang juga menjadi error request bisa muncul sebagai dua catatan terkait.
- Error halaman Logs sendiri tidak dicatat ulang untuk menghindari loop.
- Penyimpanan bersifat best-effort dengan timeout 3 detik. Kegagalan menulis log tidak membatalkan perubahan admin yang sudah berhasil; ada peringatan aman di console server. Ini bukan audit transaksional yang menjamin setiap perubahan tersimpan.
- Riwayat lama tidak diisi ulang. Perubahan manual di Supabase/SQL atau jalur lain di luar action terintegrasi tidak tercatat otomatis.
- Tidak ada penghapusan otomatis. Pantau ukuran tabel dan tentukan retensi melalui prosedur database terpisah bila dibutuhkan.

## Verifikasi setelah migrasi

1. Ubah status inquiry uji; pastikan Riwayat Admin menampilkan pelaku, waktu WIB, aksi, ID target, dan status baru.
2. Coba ubah password dengan password saat ini yang salah; pastikan Error Logs mencatat kegagalan tanpa menyimpan password.
3. Uji pencarian, rentang tanggal, reset, dan pergantian tab. Keduanya harus hanya menampilkan kategorinya masing-masing.
4. Pastikan pengguna yang belum login dialihkan ke login; akun nonaktif tidak dapat membaca tabel.
5. Uji error server hanya di lingkungan pengembangan; jangan sengaja merusak produksi.

Tes helper lokal: `node --test tests/admin-logs.test.cjs`.
