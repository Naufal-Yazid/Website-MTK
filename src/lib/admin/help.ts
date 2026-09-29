export type HelpTopic = {
  id: string
  title: string
  question: string
  description: string
  steps: string[]
  notes?: string[]
  href: string
  guide?: string
}

export const helpTopics: HelpTopic[] = [
  {
    id: 'dashboard', title: 'Dashboard', question: 'Apa yang bisa saya lihat di Dashboard?', description: 'Melihat ringkasan aktivitas website.', href: '/admin/dashboard',
    steps: ['Buka Dashboard untuk melihat angka ringkasan, grafik, dan inquiry terbaru.', 'Klik menu Website Analytics untuk melihat statistik lebih lengkap, atau Leads / Inquiry untuk menindaklanjuti calon pembeli.'],
    notes: ['Angka mengikuti data yang berhasil tercatat. Jika belum ada data, grafik bisa kosong; ini tidak selalu berarti ada error.'],
  },
  {
    id: 'analytics', title: 'Website Analytics', question: 'Bagaimana cara melihat statistik pengunjung website?', description: 'Memahami pengunjung dan performa halaman.', href: '/admin/analytics',
    steps: ['Buka Website Analytics untuk melihat ringkasan kunjungan.', 'Periksa grafik Traffic Acquisition dan halaman populer untuk 30 hari terakhir, serta pembagian perangkat pengunjung.', 'Gunakan periode yang sama saat membandingkan angka dengan laporan lain.'],
    notes: ['Jangan mengisi ID integrasi sembarangan jika data kosong. Minta tim teknis memeriksa sumber data dan koneksi analytics.'],
  },
  {
    id: 'leads', title: 'Leads / Inquiry', question: 'Bagaimana cara membaca dan menindaklanjuti inquiry?', description: 'Membaca pesan calon pembeli dan memperbarui statusnya.', href: '/admin/leads',
    steps: ['Cari calon pembeli dengan nama atau nomor WhatsApp. Gunakan filter yang tersedia untuk mempersempit daftar.', 'Buka detail inquiry, baca pesan dan proyek yang diminati.', 'Pilih Status Inquiry yang sesuai, lalu klik Simpan. Tunggu tanda berhasil sebelum menutup detail.', 'Klik Hubungi via WhatsApp untuk melanjutkan percakapan. Gunakan fitur ekspor jika perlu mengolah daftar di luar website.'],
    notes: ['Nomor telepon dan pesan calon pembeli adalah data pribadi. Bagikan hasil ekspor hanya kepada tim yang berwenang.', 'Mengubah status inquiry tidak sama dengan mengirim balasan kepada pelanggan.'],
  },
  {
    id: 'notifikasi', title: 'Notifikasi & pencarian', question: 'Bagaimana cara melihat notifikasi dan mencari inquiry?', description: 'Menemukan inquiry baru dan menu dengan cepat.', href: '/admin/leads',
    steps: ['Klik ikon lonceng di bagian atas untuk melihat inquiry yang belum dibaca.', 'Klik pesan untuk membuka inquiry terkait. Jika data belum diperbarui, gunakan tombol muat ulang pada kotak notifikasi.', 'Gunakan kolom pencarian atas untuk mencari menu, nama calon pembeli, atau nomor WhatsApp.'],
    notes: ['Notifikasi berasal dari inquiry formulir website yang berhasil disimpan. Chat langsung dari tombol WhatsApp tidak otomatis masuk sebagai inquiry.', 'Jika formulir belum muncul, periksa koneksi, coba muat ulang, lalu hubungi tim teknis dengan waktu kejadian dan pesan error. Jangan kirim password atau token.'],
  },
  {
    id: 'konten', title: 'Konten Website', question: 'Bagaimana cara mengubah teks, harga, dan spesifikasi?', description: 'Mengubah teks, harga, dan spesifikasi tanpa mengubah desain.', href: '/admin/content', guide: '/admin/content/petunjuk',
    steps: ['Pilih halaman dan klik Edit konten.', 'Ubah isian yang diperlukan, lalu Simpan Draft.', 'Buka preview untuk memeriksa hasilnya. Jika sudah benar, Publikasikan dan periksa versi publik.'],
    notes: ['Draft = tersimpan tetapi belum tampil. Preview = tampilan percobaan. Publikasikan = tampil kepada pengunjung.', 'Publikasi konten menerbitkan seluruh draft halaman, termasuk status serta brosur/lokasi bila sudah diubah. Periksa ringkasan sebelum konfirmasi.'],
  },
  {
    id: 'ketersediaan', title: 'Status Ketersediaan', question: 'Bagaimana cara mengubah status ketersediaan unit?', description: 'Mengatur Tersedia, Hampir habis, atau Habis.', href: '/admin/content?tab=ketersediaan', guide: '/admin/content/petunjuk',
    steps: ['Buka Konten Website → Status Ketersediaan.', 'Klik Ubah status pada halaman atau unit yang diperlukan.', 'Pilih hijau Tersedia, kuning Hampir habis, atau merah Habis. Simpan Draft, periksa Preview, lalu Publikasikan.'],
    notes: ['Status ringkasan TCI dan TCI 3 mengikuti unit atau fase di dalamnya. Gunakan pilihan unit/fase untuk memperbarui status sumbernya.', 'Status ini adalah label pemasaran, bukan penghitung jumlah stok otomatis.'],
  },
  {
    id: 'gambar', title: 'Kelola Gambar', question: 'Bagaimana cara mengganti banner, galeri, atau denah?', description: 'Mengganti banner, foto, galeri, dan denah; otomatis WebP.', href: '/admin/content?tab=gambar', guide: '/admin/content/gambar/petunjuk',
    steps: ['Buka Konten Website → Kelola Gambar. Pilih sub-tab halaman; pada TCI 3 pilih juga tipe unit bila diperlukan.', 'Klik Kelola gambar. Periksa bagian Dipakai di agar tahu halaman mana saja yang ikut berubah.', 'Pilih JPG, PNG, atau WebP maksimal 3 MB, lalu Unggah & simpan draft. Sistem mengonversi gambar menjadi WebP.', 'Bandingkan versi publik dengan preview draft, lalu Publikasikan gambar jika sudah sesuai.'],
    notes: ['Foto yang dipakai bersama muncul pada beberapa sub-tab, tetapi tetap satu gambar yang sama.', 'Unggah hanya gambar untuk publik. Tautan file draft bisa diakses jika diketahui orang lain.', 'Gambar tidak menambah slot baru atau mengubah layout. Foto Instagram dan avatar admin tidak dikelola di sini.'],
  },
  {
    id: 'brosur', title: 'Brosur dan Lokasi', question: 'Bagaimana cara mengunggah brosur dan mengatur lokasi?', description: 'Mengunggah PDF dan memperbarui tautan Google Maps.', href: '/admin/brosur-lokasi', guide: '/admin/brosur-lokasi/petunjuk',
    steps: ['Pilih halaman proyek atau unit, lalu klik Kelola.', 'Unggah brosur PDF maksimal 3 MB. Jika belum tersedia, gunakan placeholder.', 'Isi link tombol lokasi dan link peta jika kolomnya tersedia. Periksa tautannya.', 'Simpan Draft, cek Preview, lalu Publikasikan.'],
    notes: ['Link tombol lokasi dan link sematan peta berbeda. Petunjuk lengkap di bawah menjelaskan cara mendapatkannya.', 'File brosur yang diunggah dapat diakses melalui tautannya sebelum dipublikasikan. Jangan unggah dokumen rahasia.'],
  },
  {
    id: 'logs', title: 'Logs', question: 'Di mana saya bisa melihat riwayat perubahan dan error?', description: 'Memeriksa riwayat perubahan dan kendala server.', href: '/admin/logs',
    steps: ['Pilih Riwayat Admin untuk melihat aktivitas, atau Error Logs untuk melihat error yang dicatat aplikasi.', 'Cari nama/aktivitas atau pilih tanggal awal dan akhir, lalu klik Terapkan. Waktu log menggunakan WIB.', 'Klik Lihat detail jika perlu. Saat meminta bantuan, sertakan ID log, waktu, dan langkah yang menyebabkan masalah.'],
    notes: ['Pencatatan dimulai setelah fitur diaktifkan; aktivitas lama tidak otomatis muncul.', 'Error Logs bukan seluruh pesan console browser. Password, token, dan isi formulir tidak disimpan sebagai detail log.', 'Jika penyimpanan belum aktif, minta developer menjalankan 003_admin_logs.sql di Supabase.'],
  },
  {
    id: 'settings', title: 'Pengaturan', question: 'Apa saja yang bisa diatur melalui menu Pengaturan?', description: 'Mengelola kontak, akun, integrasi, dan versi website.', href: '/admin/settings',
    steps: ['Kontak: super admin dapat menekan Edit Data Kontak, mengubah informasi, lalu Simpan Perubahan. Admin lain hanya dapat melihat.', 'Akun: perbarui profil atau foto akun. Pengelolaan akun admin lain hanya tersedia sesuai hak akses.', 'Integrasi: ID Google Analytics dan Meta Pixel dikelola oleh super admin. Minta ID yang benar kepada tim teknis.', 'Website: lihat nama branch dan commit untuk mengetahui versi kode yang sedang digunakan. Bagian ini hanya informasi.'],
    notes: ['Versi dibaca saat server development dimulai atau saat build. Setelah mengganti branch, developer perlu restart server atau build dan deploy ulang.', 'Draft dan publikasi konten tidak mengubah versi kode. Jika versi “Tidak tersedia”, developer dapat menyiapkan APP_GIT_BRANCH dan APP_GIT_COMMIT sebelum build.', 'Jangan membagikan password atau menggunakan akun bersama. Gunakan Logout setelah selesai di komputer bersama.'],
  },
  {
    id: 'kendala', title: 'Jika menemui kendala', question: 'Apa yang harus dilakukan jika simpan atau upload gagal?', description: 'Langkah aman ketika upload, draft, atau publikasi gagal.', href: '/admin/logs',
    steps: ['Baca pesan error dan periksa koneksi. Jangan menganggap perubahan berhasil jika belum ada konfirmasi.', 'Jika ada perubahan belum tersimpan, salin dulu teksnya ke catatan sebelum memuat ulang.', 'Jika disebut “diubah admin lain”, muat ulang untuk mengambil versi terbaru, lalu masukkan kembali perubahan yang masih diperlukan.', 'Jika fitur belum aktif, minta developer memeriksa migrasi Supabase sesuai pesan di layar.'],
    notes: ['Urutan aktivasi: migrasi 003 untuk Logs, 004 untuk Konten Website, 005 untuk Brosur, dan 006_website_images.sql untuk Kelola Gambar, setelah migrasi dasar proyek. Jangan menjalankan SQL dari sumber tidak dikenal.', 'Untuk gambar, memasang kode saja belum membuat penyimpanan Supabase. Sesudah migrasi 006 dijalankan, muat ulang halaman.'],
  },
]
