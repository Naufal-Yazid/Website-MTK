import GuideNavigation from '@/components/admin/help/GuideNavigation'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Petunjuk Konten Website | MTK Admin',
  robots: { index: false, follow: false },
}

const steps = [
  {
    title: 'Pilih halaman yang mau diubah',
    description: 'Kembali ke Konten Website, cari nama komplek atau tipe unit, lalu klik “Edit konten”. Misalnya, pilih TCI 3 — Cluster Tipe 36 untuk mengubah informasi unit tersebut.',
  },
  {
    title: 'Ubah tulisan yang diperlukan',
    description: 'Klik judul kelompok, seperti “HERO”, “Harga”, atau “Spesifikasi”, untuk membuka isinya. HERO adalah bagian paling atas halaman. Ubah kotak isian yang diperlukan saja; yang lain boleh dibiarkan.',
  },
  {
    title: 'Klik “Simpan Draft”',
    description: 'Draft itu seperti catatan sementara. Tunggu sampai muncul tulisan “Draft tersimpan”. Pada tahap ini, pengunjung masih melihat tulisan yang lama.',
  },
  {
    title: 'Cek tampilannya lewat preview',
    description: 'Di bagian “Preview draft”, klik “Halaman detail”. Tampilan percobaan akan terbuka di tab baru. Periksa juga “Kartu beranda” atau “Kartu ringkasan” jika tersedia. Kalau ada yang kurang pas, kembali ke editor, perbaiki, simpan lagi, lalu buka ulang preview.',
  },
  {
    title: 'Sudah yakin? Klik “Publikasikan”',
    description: 'Baca perbandingan tulisan sebelum dan sesudah. Jika sudah benar, klik “Ya, publikasikan”. Inilah langkah yang membuat perubahan terlihat oleh pengunjung. Kalau belum yakin, klik “Batal”; draft tetap tersimpan.',
  },
  {
    title: 'Lihat hasil akhirnya',
    description: 'Klik “Lihat versi publik” di editor. Jika halaman itu sudah terbuka sebelumnya, muat ulang atau refresh. Pastikan tulisan dan angkanya sudah sesuai.',
  },
]

const questions = [
  {
    question: 'Kenapa preview atau tombol Publikasikan belum bisa diklik?',
    answer: 'Biasanya karena draft belum disimpan atau masih ada perubahan baru. Klik “Simpan Draft” dan tunggu prosesnya selesai. Jika revisi itu sudah dipublikasikan, tombol Publikasikan juga tidak aktif karena tidak ada revisi baru yang perlu ditayangkan.',
  },
  {
    question: 'Kenapa tombol Simpan Draft tidak aktif?',
    answer: 'Jika draft sudah tersimpan dan kamu belum mengubah apa-apa lagi, tidak perlu menyimpan ulang. Tombol juga tidak aktif sementara saat aplikasi sedang memproses penyimpanan.',
  },
  {
    question: 'Muncul pesan “konten sudah diubah admin lain”. Harus apa?',
    answer: 'Artinya ada orang atau tab lain yang lebih dulu menyimpan perubahan. Salin dulu tulisanmu yang belum tersimpan ke catatan agar tidak hilang. Setelah itu, muat ulang editor, periksa versi terbaru, lalu masukkan kembali perubahan yang masih diperlukan.',
  },
  {
    question: 'Sudah dipublikasikan, tetapi ada salah ketik?',
    answer: 'Buka lagi halaman yang sama di editor. Perbaiki tulisannya, simpan draft, cek preview, lalu publikasikan lagi. Tidak ada tombol untuk otomatis kembali ke versi lama.',
  },
  {
    question: 'Muncul tulisan “editor belum diaktifkan” atau gagal menyimpan?',
    answer: 'Jangan tutup editor jika masih ada tulisan yang belum tersimpan; salin dulu ke catatan. Jika editor belum diaktifkan, minta tim teknis mengaktifkan penyimpanan konten. Jika koneksi bermasalah, coba lagi setelah koneksi pulih. Jangan menganggap perubahan sudah tersimpan sebelum ada tanda berhasil.',
  },
]

export default function ContentGuidePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
    <GuideNavigation href="/admin/content" label="Buka Konten Website" />
    <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0B5EAA]">
          <BookOpen className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Petunjuk Konten Website</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">Baru pertama kali? Ikuti langkah di bawah, satu per satu.</p>
        </div>
      </header>

      <aside className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-relaxed text-blue-950">
        <p className="font-semibold">Ingat tiga hal ini saja:</p>
        <ul className="mt-3 space-y-2">
          <li><strong>Simpan Draft</strong> = simpan dulu, belum ditampilkan ke pengunjung.</li>
          <li><strong>Preview</strong> = lihat tampilan percobaan, hanya untuk admin yang login.</li>
          <li><strong>Publikasikan</strong> = tampilkan perubahan ke pengunjung website.</li>
        </ul>
      </aside>

      <section aria-labelledby="guide-steps" className="space-y-4">
        <h2 id="guide-steps" className="text-lg font-semibold text-gray-900">Cara mengubah konten</h2>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B5EAA] text-sm font-bold text-white">{index + 1}</span>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">Cara mengubah ketersediaan unit</h2>
        <p className="text-sm leading-relaxed text-gray-600">Buka <Link href="/admin/content?tab=ketersediaan" className="font-semibold text-[#0B5EAA] underline">Status ketersediaan unit</Link>, klik “Ubah status”, lalu pilih hijau Tersedia, kuning Hampir habis, atau merah Habis. Simpan Draft → cek Preview → Publikasikan, sama seperti mengubah teks.</p>
        <p className="text-sm leading-relaxed text-gray-600">Status TCI 3 dan jenis bangunannya mengikuti unit-unit di dalamnya. Jika ada draft teks/harga pada halaman yang sama, perubahan itu juga ikut diterbitkan. Baca peringatan dan perbandingan sebelum konfirmasi.</p>
      </section>

      <section aria-labelledby="guide-tips" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 id="guide-tips" className="text-lg font-semibold text-gray-900">Supaya tidak bingung saat mengisi</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-600">
          <li><strong className="text-gray-900">Harga:</strong> tulis angka penuh tanpa “Rp”, titik, atau koma. Contoh harga Rp 500 juta ditulis <code className="rounded bg-slate-100 px-1.5 py-0.5 text-gray-900">500000000</code>.</li>
          <li><strong className="text-gray-900">Luas dan spesifikasi:</strong> ikuti contoh yang sudah ada, seperti “72 m²” atau “2 Kamar”. Jika luas juga disebut di paragraf lain, perbarui paragraf itu juga.</li>
          <li><strong className="text-gray-900">Keterangan singkat:</strong> “Kartu ringkasan” adalah kotak proyek atau tipe rumah pada halaman daftar. Tulisannya boleh lebih pendek daripada judul halaman detail.</li>
          <li><strong className="text-gray-900">Harga unit saling terhubung:</strong> perubahan harga unit akan dipakai di kartu tipe dan simulasi KPR. Spesifikasi cluster juga dipakai di tabel perbandingan TCI 3.</li>
          <li><strong className="text-gray-900">Tidak perlu kode:</strong> isi dengan tulisan biasa. Menu ini tidak mengubah foto, susunan halaman, atau menambah dan menghapus komplek maupun tipe unit.</li>
        </ul>
      </section>

      <section aria-labelledby="guide-status" className="space-y-4">
        <h2 id="guide-status" className="text-lg font-semibold text-gray-900">Arti tulisan status</h2>
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            ['Konten bawaan', 'Masih memakai isi awal website, belum ada versi baru yang diterbitkan lewat editor.'],
            ['Ada draft', 'Ada versi yang disimpan, tetapi belum ditampilkan ke pengunjung.'],
            ['Terbit · r2', 'Versi ini sudah ditampilkan ke pengunjung. “r2” berarti revisi atau versi ke-2; angka bisa berbeda.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-semibold text-[#0B5EAA]">{title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-gray-600">{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="guide-questions" className="space-y-3">
        <h2 id="guide-questions" className="text-lg font-semibold text-gray-900">Kalau menemui kendala</h2>
        {questions.map(({ question, answer }) => (
          <details key={question} className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <summary className="cursor-pointer p-5 text-sm font-semibold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B5EAA]">{question}</summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{answer}</p>
          </details>
        ))}
      </section>

      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-600">Siap mencoba? Mulai dari halaman yang ingin kamu ubah.</p>
        <Link href="/admin/content" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0B5EAA] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#094c89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2">
          Pilih halaman <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
