import Link from "next/link";

export default function KebijakanPrivasi() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner — Memberi background gelap agar Navbar transparan/putih terlihat jelas */}
      <section className="bg-[#0D1B2A] pt-28 pb-12 md:pt-36 md:pb-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Terakhir diperbarui: 19 September 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-[#333] leading-relaxed">
          
          {/* Pengantar */}
          <div className="space-y-4 mb-8 text-sm sm:text-base">
            <p>
              Kebijakan Privasi ini menjelaskan kebijakan dan prosedur Kami mengenai pengumpulan, penggunaan, dan pengungkapan informasi Anda saat Anda menggunakan Layanan, serta memberi tahu Anda tentang hak-hak privasi Anda dan bagaimana hukum melindungi Anda.
            </p>
            <p>
              Kami menggunakan Data Pribadi Anda untuk menyediakan dan meningkatkan Layanan. Kami mengumpulkan, menggunakan, dan mengungkapkan informasi Anda sebagaimana dijelaskan dalam Kebijakan Privasi ini dan, jika diwajibkan oleh hukum yang berlaku, hanya jika Kami memiliki dasar hukum yang sah untuk melakukannya, termasuk persetujuan Anda (jika persetujuan diperlukan). Kebijakan Privasi ini dibuat dengan bantuan{" "}
              <a 
                href="https://www.termsfeed.com/privacy-policy-generator/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#0B5EAA] hover:underline font-medium"
              >
                Pembuat Kebijakan Privasi
              </a>.
            </p>
          </div>

          {/* Section: Interpretasi dan Definisi */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-semibold text-[#1a365d] border-b pb-2">
              Interpretasi dan Definisi
            </h2>
            
            <h3 className="text-lg font-semibold text-[#1a365d]">Interpretasi</h3>
            <p className="text-sm sm:text-base">
              Kata-kata yang huruf pertamanya dikapitalisasi memiliki arti yang didefinisikan berdasarkan kondisi berikut. Definisi berikut memiliki arti yang sama tanpa memandang apakah mereka muncul dalam bentuk tunggal atau jamak.
            </p>

            <h3 className="text-lg font-semibold text-[#1a365d]">Definisi</h3>
            <p className="text-sm sm:text-base">Untuk keperluan Kebijakan Privasi ini:</p>
            
            <ul className="list-disc pl-6 space-y-3 text-sm sm:text-base">
              <li>
                <strong>Akun</strong> berarti akun unik yang dibuat untuk Anda agar dapat mengakses Layanan Kami atau bagian dari Layanan Kami.
              </li>
              <li>
                <strong>Afiliasi</strong> berarti entitas yang mengendalikan, dikendalikan oleh, atau berada di bawah pengendalian bersama dengan suatu pihak, di mana "pengendalian" berarti kepemilikan 50% atau lebih dari saham, kepentingan ekuitas, atau efek lainnya yang memiliki hak suara untuk pemilihan direktur atau otoritas pengelola lainnya.
              </li>
              <li>
                <strong>Perusahaan</strong> (dirujuk sebagai "Perusahaan", "Kami", atau "Milik Kami" dalam Kebijakan Privasi ini) mengacu pada PT Marga Tirta Kencana, Jl. BKR No.140, Cigereleng, Kec. Regol, Kota Bandung, Jawa Barat 40253.
              </li>
              <li>
                <strong>Cookie</strong> adalah berkas kecil yang ditempatkan di komputer, perangkat seluler, atau perangkat Anda lainnya oleh situs web, yang berisi rincian riwayat penjelajahan Anda di situs web tersebut, di antara banyak kegunaannya.
              </li>
              <li>
                <strong>Negara/Provinsi</strong> mengacu pada: Indonesia.
              </li>
              <li>
                <strong>Perangkat</strong> berarti perangkat apa pun yang dapat mengakses Layanan, seperti komputer, telepon seluler, atau tablet digital.
              </li>
              <li>
                <strong>Data Pribadi</strong> (atau "Informasi Pribadi") adalah setiap informasi yang berkaitan dengan individu yang teridentifikasi atau dapat diidentifikasi.
                <br />
                Kami menggunakan istilah "Data Pribadi" dan "Informasi Pribadi" secara bergantian kecuali jika hukum menggunakan istilah tertentu.
              </li>
              <li>
                <strong>Layanan</strong> mengacu pada Situs Web.
              </li>
              <li>
                <strong>Penyedia Layanan</strong> berarti setiap orang perseorangan atau badan hukum yang memproses data atas nama Perusahaan. Ini mengacu pada perusahaan pihak ketiga atau individu yang dipekerjakan oleh Perusahaan untuk memfasilitasi Layanan, menyediakan Layanan atas nama Perusahaan, melakukan layanan yang berkaitan dengan Layanan, atau membantu Perusahaan dalam menganalisis bagaimana Layanan digunakan.
              </li>
              <li>
                <strong>Data Penggunaan</strong> mengacu pada data yang dikumpulkan secara otomatis, baik yang dihasilkan oleh penggunaan Layanan atau dari infrastruktur Layanan itu sendiri (misalnya, durasi kunjungan halaman).
              </li>
              <li>
                <strong>Pengguna</strong> berarti setiap individu yang mengakses atau menggunakan Layanan.
              </li>
              <li>
                <strong>Situs Web</strong> mengacu pada Marga Tirta Kencana, yang dapat diakses dari{" "}
                <a 
                  href="http://www.MargaTirtaKencana.co" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#0B5EAA] hover:underline font-medium"
                >
                  http://www.MargaTirtaKencana.co
                </a>.
              </li>
              <li>
                <strong>Anda</strong> berarti individu yang mengakses atau menggunakan Layanan, atau perusahaan, atau badan hukum lain atas nama mana individu tersebut mengakses atau menggunakan Layanan, sebagaimana berlaku.
              </li>
            </ul>
          </section>

          {/* Section: Pengumpulan dan Penggunaan Informasi */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-semibold text-[#1a365d] border-b pb-2">
              Pengumpulan dan Penggunaan Informasi Pribadi Anda
            </h2>

            <h3 className="text-xl font-semibold text-[#1a365d]">Jenis Data yang Dikumpulkan</h3>
            
            <h4 className="text-lg font-medium text-[#1a365d]">Data Pribadi</h4>
            <p className="text-sm sm:text-base">
              Saat menggunakan Layanan Kami, Kami dapat meminta Anda untuk memberikan informasi pengenal pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda. Informasi pengenal pribadi dapat mencakup, tetapi tidak terbatas pada:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
              <li>Alamat email</li>
              <li>Nama depan dan nama belakang</li>
              <li>Nomor telepon</li>
              <li>Alamat, Negara/Provinsi, Kode Pos, Kota</li>
            </ul>

            <h4 className="text-lg font-medium text-[#1a365d] pt-2">Data Penggunaan</h4>
            <p className="text-sm sm:text-base">Data Penggunaan dikumpulkan secara otomatis saat menggunakan Layanan.</p>
            <p className="text-sm sm:text-base">
              Data Penggunaan dapat mencakup informasi seperti alamat Protokol Internet Perangkat Anda (misalnya alamat IP), jenis peramban, versi peramban, halaman Layanan Kami yang Anda kunjungi, waktu dan tanggal kunjungan Anda, waktu yang dihabiskan pada halaman tersebut, pengenal perangkat unik, dan data diagnostik lainnya.
            </p>
            <p className="text-sm sm:text-base">
              Ketika Anda mengakses Layanan melalui perangkat seluler, Kami dapat mengumpulkan informasi tertentu secara otomatis, termasuk, tetapi tidak terbatas pada, jenis perangkat seluler yang Anda gunakan, ID unik perangkat seluler Anda, alamat IP perangkat seluler Anda, sistem operasi seluler Anda, jenis peramban Internet seluler yang Anda gunakan, pengenal perangkat unik, dan data diagnostik lainnya.
            </p>

            <h4 className="text-lg font-medium text-[#1a365d] pt-2">Teknologi Pelacakan dan Cookie</h4>
            <p className="text-sm sm:text-base">
              Kami menggunakan teknologi pelacakan (seperti cookie) untuk melacak aktivitas dan meningkatkan Layanan Kami. Teknologi yang Kami gunakan dapat mencakup:
            </p>
            <p className="text-sm sm:text-base">
              <strong>Google Analytics.</strong> Kami menggunakan Google Analytics untuk mengumpulkan dan menganalisis informasi tentang bagaimana pengguna berinteraksi dengan dan menggunakan Situs Web Kami. Ini dapat mencakup informasi seperti halaman yang dikunjungi, waktu yang dihabiskan pada halaman, informasi peramban dan perangkat, serta data penggunaan lainnya.
            </p>
            <p className="text-sm sm:text-base">
              <strong>Optimasi Gambar Berbantuan AI.</strong> Kami menggunakan alat berbasis kecerdasan buatan (AI) untuk mengoptimalkan, meningkatkan, mengubah ukuran, atau memperbarui gambar yang digunakan dalam Layanan Kami.
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Cookie atau Cookie Peramban.</strong> Cookie adalah berkas kecil yang ditempatkan di Perangkat Anda. Anda dapat menginstruksikan peramban Anda untuk menolak semua Cookie.
              </li>
              
            </ul>

            <p className="text-sm sm:text-base pt-2">Kami menggunakan Cookie Sesi dan Persisten untuk tujuan yang tercantum di bawah ini:</p>
            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base">
              <li>
                <strong>Cookie Diperlukan / Esensial</strong>
                
                <p>Tujuan: Cookie ini sangat penting untuk menyediakan layanan yang tersedia melalui Situs Web kepada Anda dan memungkinkan Anda menggunakan beberapa fiturnya.</p>
              </li>
              <li>
                <strong>Cookie Kebijakan / Penerimaan Pemberitahuan Cookie</strong>
               
                <p>Tujuan: Cookie ini mengidentifikasi apakah pengguna telah menerima penggunaan cookie di Situs Web.</p>
              </li>
              <li>
                <strong>Cookie Fungsionalitas</strong>
                
                <p>Tujuan: Cookie ini memungkinkan Kami untuk mengingat pilihan yang Anda buat saat menggunakan Situs Web.</p>
              </li>
            </ul>
          </section>

          {/* Section: Penggunaan & Pengungkapan Data */}
          <section className="mb-10 space-y-4">
            <h3 className="text-xl font-semibold text-[#1a365d]">Penggunaan Data Pribadi Anda</h3>
            <p className="text-sm sm:text-base">Perusahaan dapat menggunakan Data Pribadi untuk tujuan berikut:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li><strong>Untuk menyediakan dan memelihara Layanan Kami</strong>, termasuk untuk memantau penggunaan Layanan Kami.</li>
              <li><strong>Untuk mengelola Akun Anda:</strong> mengelola pendaftaran Anda sebagai pengguna Layanan.</li>
              <li><strong>Untuk pelaksanaan kontrak:</strong> pelaksanaan kontrak pembelian produk/layanan.</li>
              <li><strong>Untuk menghubungi Anda:</strong> Melalui email, panggilan telepon, SMS, atau pemberitahuan push notification.</li>
              <li><strong>Untuk memberikan berita &amp; penawaran khusus:</strong> Informasi produk/layanan serupa.</li>
              <li><strong>Untuk mengelola permintaan Anda:</strong> Melayani permintaan Anda kepada Kami.</li>
            </ul>

            
          </section>

          {/* Section: Penyimpanan & Hak Hapus */}
          <section className="mb-10 space-y-4">
            <h3 className="text-xl font-semibold text-[#1a365d]">Penyimpanan &amp; Penghapusan Data</h3>
            <p className="text-sm sm:text-base">
              Perusahaan akan menyimpan Data Pribadi Anda hanya selama diperlukan untuk tujuan yang ditetapkan dalam Kebijakan Privasi ini (maksimal hingga 24 bulan setelah penutupan akun/layanan).
            </p>
            <p className="text-sm sm:text-base">
              Anda memiliki hak untuk menghapus atau meminta Kami membantu menghapus Data Pribadi yang telah Kami kumpulkan tentang Anda melalui pengaturan akun atau menghubungi Kami langsung.
            </p>
          </section>

    

          {/* Section: Hubungi Kami */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
            <h2 className="text-xl font-semibold text-[#1a365d]">Hubungi Kami</h2>
            <p className="text-sm sm:text-base">Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, Anda dapat menghubungi Kami:</p>
            <ul className="space-y-1 text-sm sm:text-base font-medium text-gray-700">
              <li>Email: <a href="mailto:marketing140@gmail.com" className="text-[#0B5EAA] hover:underline">marketing140@gmail.com</a></li>
              <li>Telepon: <a href="tel:085759072321" className="text-[#0B5EAA] hover:underline">085759072321</a></li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}