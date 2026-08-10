"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Mail } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";

// Instagram SVG Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// TikTok SVG Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.41V8.9a6.34 6.34 0 1 0 6.34 6.34V9.33a8.28 8.28 0 0 0 4.77 1.51V7.39a4.84 4.84 0 0 1-1-.7z" />
  </svg>
);

export default function KontakPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [proyek, setProyek] = useState("Pilih Proyek");
  const [pesan, setPesan] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[45vh] flex items-center justify-center bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-3xl text-center px-4 py-16 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Kontak Kami
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
            Langkah pertama menuju hunian impian Anda dimulai di sini. Tim ahli kami siap membantu mewujudkan investasi masa depan Anda.
          </p>
        </div>
      </section>

      {/* SECTION 2 — KONTEN UTAMA */}
      <section className="bg-white py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* KOLOM KIRI — INFO KONTAK */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                  HUBUNGI KAMI
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                  Mari Berdiskusi
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-2 leading-relaxed">
                  Kunjungi kantor kami atau hubungi tim pemasaran kami untuk informasi lebih lanjut mengenai proyek residensial eksklusif kami.
                </p>
              </div>

              {/* Blok 1: Kantor Pusat */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#0B5EAA] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-bold text-[#111827]">Kantor Pusat</div>
                  <div className="text-[#6B7280] leading-relaxed">
                    Jl. BKR No.140, Cigereleng, Kec. Regol, Kota Bandung, Jawa Barat 40253
                  </div>
                </div>
              </div>

              {/* Blok 2: Marketing Gallery */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#0B5EAA] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-3 text-xs sm:text-sm w-full">
                  <div className="font-bold text-[#111827]">Marketing Gallery</div>
                  
                  <div className="space-y-0.5 border-l-2 border-[#0B5EAA]/40 pl-3">
                    <div className="font-semibold text-[#111827]">Cibaduyut</div>
                    <div className="text-[#6B7280] text-xs">
                      Jl. Taman Cibaduyut Indah, Cangkuang Kulon, Kec. Dayeuhkolot, Kab. Bandung, Jawa Barat 40239
                    </div>
                  </div>

                  <div className="space-y-0.5 border-l-2 border-[#0B5EAA]/40 pl-3">
                    <div className="font-semibold text-[#111827]">Bojongsoang</div>
                    <div className="text-[#6B7280] text-xs">
                      Jl. Raya Bojongsoang No. 123, Bandung
                    </div>
                  </div>

                  <div className="space-y-0.5 border-l-2 border-[#0B5EAA]/40 pl-3">
                    <div className="font-semibold text-[#111827]">Rancamanyar</div>
                    <div className="text-[#6B7280] text-xs">
                      Rancamanyar, Kec. Baleendah, Kab. Bandung, Jawa Barat 40375
                    </div>
                  </div>
                </div>
              </div>

              {/* Blok 3: Telepon & Email */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#0B5EAA] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-bold text-[#111827]">Telepon & Email</div>
                  <div className="text-[#6B7280]">
                    Telepon: <a href="tel:+622212345678" className="text-[#0B5EAA] hover:underline">+62 22 1234 5678</a>
                  </div>
                  <div className="text-[#6B7280]">
                    Email: <a href="mailto:info@margatirtakencana.co.id" className="text-[#0B5EAA] hover:underline">info@margatirtakencana.co.id</a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-gray-600 mb-2">Ikuti Kami:</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#0B5EAA] hover:bg-[#EFF6FF] transition-all"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#0B5EAA] hover:bg-[#EFF6FF] transition-all"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN — FORM KONTAK */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
                <h3 className="text-lg font-bold text-[#111827] mb-6">
                  Formulir Kontak
                </h3>

                {submitted ? (
                  <div className="bg-[#DCFCE7] border border-[#166534]/20 text-[#166534] p-6 rounded-xl text-center space-y-2">
                    <div className="font-bold text-lg">Pesan Terkirim!</div>
                    <p className="text-xs sm:text-sm">
                      Terima kasih telah menghubungi Marga Tirta Kencana. Tim kami akan membalas pesan Anda dalam 1x24 jam.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Nama Lengkap & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          required
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          placeholder="Masukkan nama Anda"
                          className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Alamat Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@contoh.com"
                          className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: WA & Tipe Komplek */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Nomor WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={wa}
                          onChange={(e) => setWa(e.target.value)}
                          placeholder="+62 812 ..."
                          className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Tipe Komplek
                        </label>
                        <select
                          value={proyek}
                          onChange={(e) => setProyek(e.target.value)}
                          className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all cursor-pointer"
                        >
                          <option value="Pilih Proyek">Pilih Proyek</option>
                          <option value="TCI 1">TCI 1</option>
                          <option value="TCI 2">TCI 2</option>
                          <option value="TCI 3">TCI 3</option>
                          <option value="Rancamanyar Indah">Rancamanyar Indah</option>
                          <option value="Permata Buah Batu">Permata Buah Batu</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Pesan */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Pesan
                      </label>
                      <textarea
                        required
                        value={pesan}
                        onChange={(e) => setPesan(e.target.value)}
                        placeholder="Bagaimana kami dapat membantu Anda?"
                        className="w-full h-28 p-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full h-12 rounded-lg bg-[#0B5EAA] text-white font-semibold text-sm hover:bg-[#0A4F91] transition-all shadow-sm active:scale-[0.99]"
                    >
                      Kirim Pesan
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LOKASI PETA */}
      <section className="bg-white pb-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                Lokasi Kami
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Kunjungi kantor kami atau hubungi tim pemasaran kami untuk informasi lebih lanjut mengenai proyek residensial eksklusif kami. Kantor pusat kami terletak di lokasi yang sangat strategis dan mudah diakses di pusat Kota Bandung, tepatnya di Jl. BKR No. 140, Cigereleng, Kecamatan Regol. Berada dekat dengan area publik utama seperti kawasan Tegallega, lokasi kantor kami dirancang untuk memberikan kenyamanan penuh bagi Anda yang ingin berkonsultasi langsung mengenai rencana hunian masa depan.
              </p>
            </div>

            {/* Right Map Image Preview */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#E5E7EB] bg-gray-100 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Peta Lokasi Kantor Pusat Marga Tirta Kencana"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/10" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-xl shadow-lg border border-gray-200 text-xs font-bold text-[#0B5EAA] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600 fill-red-600" />
                  <span>PT. Marga Tirta Kencana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
