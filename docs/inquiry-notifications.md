# Notifikasi inquiry admin

Notifikasi membaca pesan dari tabel inquiries, bukan pesan WhatsApp langsung.
Tidak ada integrasi WhatsApp inbox/webhook pada fitur ini.

## Perbaikan

- Form Kontak sekarang benar-benar menyimpan inquiry; sebelumnya hanya mengganti
  tampilan menjadi "Pesan Terkirim" tanpa insert database.
- Email kontak disimpan di awal teks pesan, karena tabel inquiries belum memiliki
  kolom email. Data nama, nomor WA, proyek, dan pesan tetap tersedia di Leads.
- Inquiry baru selalu status baru dan is_read=false; formulir tidak bisa mengirim
  override untuk menjadikannya sudah dibaca.
- Form Kontak dan form proyek hanya menampilkan sukses setelah insert berhasil.
  Error koneksi/penyimpanan mempertahankan isian. Form proyek membuka WhatsApp
  setelah sukses, dengan tautan cadangan jika popup diblokir.
- Jumlah dan daftar maksimal 5 inquiry terbaru yang belum dibaca diambil bersama
  dalam satu query. Pergantian pesan dengan jumlah sama tidak membuat daftar macet.
- Pembaruan melalui Realtime, setiap 15 detik saat tab terlihat, saat kembali ke
  tab/fokus atau online, serta ketika ikon notifikasi dibuka.
- Popup memakai klik/tap/keyboard, tidak hanya hover. Ada tombol muat ulang.
- Error tidak dianggap "semua sudah dibaca". Data terakhir dipertahankan dengan
  peringatan. Request dibatasi timeout 10 detik, diserialkan, dan cleanup menolak
  hasil request lama setelah logout/unmount.
- Membuka detail inquiry menandainya dibaca lalu langsung memperbarui badge.
- Dashboard/daftar Leads juga diperbarui berkala bila Realtime tidak tersedia.

Tidak memerlukan migrasi baru. Penyimpanan formulir tetap memerlukan tabel inquiries
dan izin INSERT publik yang sudah didefinisikan dalam migrasi 001_initial_schema.sql.
Jangan menjalankan ulang seluruh migrasi awal pada database yang sudah berisi data
tanpa pemeriksaan tim teknis. Jika pesan gagal disimpan, periksa policy tersebut,
koneksi, dan konfigurasi Supabase. Polling tidak dapat memperbaiki izin database yang
salah. Realtime boleh diaktifkan untuk inquiries agar pembaruan lebih cepat, tetapi
notifikasi tidak lagi bergantung hanya pada Realtime.

## Uji setelah update

1. Login admin di tab pertama; biarkan halaman admin tetap terbuka.
2. Di tab lain/private window, isi formulir Kontak atau inquiry proyek lalu kirim.
3. Pastikan ada konfirmasi berhasil tersimpan, bukan hanya WhatsApp yang terbuka.
4. Kembali ke tab admin. Klik lonceng atau tunggu maksimal sekitar 15 detik
   saat tab terlihat (di luar waktu request jaringan).
5. Inquiry tampil pada lonceng dan Leads. Buka detailnya; jumlah belum dibaca berkurang.
6. Putuskan koneksi dan muat ulang notifikasi: muncul peringatan, bukan klaim inbox kosong.
7. Klik tombol WhatsApp hijau tanpa formulir: ini tidak membuat inquiry/notifikasi.

Pengujian otomatis memakai mock database dan event; pengiriman ke Supabase asli
perlu diuji dengan langkah di atas. Perubahan ini tidak mengirim inquiry percobaan
ke database produksi.
