import { CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";

export default function TentangPage() {
  const projects = [
    {
      title: "Taman Cibaduyut Indah",
      description: "Perumahan di area Bandung Selatan dengan akses mudah ke pusat kota, terminal bis, pintu tol dan fasilitas umum lainnya.",
    },
    {
      title: "Rancamanyar Indah",
      description: "Hunian keluarga strategis di Bandung Selatan dengan lingkungan aman, akses mudah ke tol, pusat pendidikan, pusat perbelanjaan, serta berbagai fasilitas umum di sekitarnya.",
    },
    {
      title: "Permata Buah Batu",
      description: "Hunian nyaman di kawasan Rancamanyar yang didukung akses mudah, lingkungan berkembang, dan fasilitas umum yang lengkap.",
    },
  ];

  const team = [
    {
      name: "Eva",
      role: "Founder",
      image: "../Tentang/Placeholder_Profil_Photo.webp",
    },
    {
      name: "Evi Kurnialah",
      role: "Founder",
      image: "../Tentang/Placeholder_Profil_Photo.webp",
    },
    {
      name: " Elsye Liana Dewi ",
      role: "Founder",
      image: "../Tentang/Placeholder_Profil_Photo.webp",
    },
  ];

  const partners = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat opacity-50"
          style={{
            backgroundImage: "url('../Tentang/Foto-Hero-Banner.webp')",
            backgroundPosition: "center 35%",
          }}
        />

        <div className="absolute inset-0 bg-[#0D1B2A]/50" />

        <div className="relative z-10 max-w-4xl text-center px-4 py-20 space-y-4">
          <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">
            TENTANG KAMI
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Tentang Marga Tirta Kencana
          </h1>
        </div>
      </section>

      {/* SECTION 2 — PROFIL PERUSAHAAN */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                TENTANG KAMI
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] leading-tight">
                Membangun Kepercayaan, Mewujudkan Impian
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                PT Marga Tirta Kencana adalah perusahaan pengembang properti yang berfokus pada penyediaan hunian berkualitas dan terjangkau di wilayah Bandung dan sekitarnya.
              </p>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Kami hadir untuk menjawab kebutuhan akan rumah yang nyaman, aman, dan memiliki lokasi strategis tanpa mengorbankan kualitas bangunan. Dengan pengalaman dalam mengembangkan kawasan perumahan, kami berkomitmen membangun lingkungan hunian yang rapi, fungsional, dan mendukung kualitas hidup penghuni.
              </p>
              <div className="pt-2">
                <span className="inline-block bg-[#0B5EAA] text-white text-xs font-semibold px-4 py-2 rounded-md tracking-wider uppercase">
                  25+ TAHUN PENGALAMAN
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img
                  src="../Tentang/Kawat_Besi.webp"
                  alt="Konstruksi Bangunan"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-4 bg-[#0B5EAA] text-white rounded-xl p-5 shadow-xl text-center min-w-[150px]">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-[10px] font-semibold tracking-wider uppercase text-white/90 mt-0.5">
                  TAHUN PENGALAMAN
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VISI & MISI */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/5]">
                <img
                  src="../Tentang/Foto-Kamar-type36.webp"
                  alt="Interior Kamar Tidur Modern"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Visi */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[#111827]">Visi Kami</h3>
                <blockquote className="text-sm sm:text-base text-[#6B7280] italic leading-relaxed">
                  &ldquo;Menjadi pengembang perumahan terpercaya di Bandung yang menghadirkan hunian berkualitas, terjangkau, dan strategis.&rdquo;
                </blockquote>
              </div>

              <hr className="border-gray-200" />

              {/* Misi */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#111827]">Misi Kami</h3>
                <ul className="space-y-3 text-sm text-[#6B7280]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0B5EAA] shrink-0 mt-0.5" />
                    <span>Menyediakan hunian terjangkau</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0B5EAA] shrink-0 mt-0.5" />
                    <span>Mengembangkan kawasan di lokasi strategis yang mudah diakses ke fasilitas publik.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0B5EAA] shrink-0 mt-0.5" />
                    <span>Mempermudah proses KPR melalui kerja sama dengan bank nasional.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0B5EAA] shrink-0 mt-0.5" />
                    <span>Memberikan pelayanan profesional dan transparan mulai dari pembelian hingga purna jual.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROYEK KAMI */}
      <section className="bg-[#1A2B4A] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/70">
              PROYEK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">Proyek Kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-[#0D2140] border border-white/10 rounded-xl p-7 space-y-3 shadow-md hover:border-white/20 transition-all"
              >
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs sm:text-sm text-[#8EA8C3] leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — TIM MANAJEMEN */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
              MEET OUR TEAM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Tim Manajemen
            </h2>
            <p className="text-sm text-[#6B7280]">
              Dipimpin oleh para profesional berpengalaman yang berdedikasi untuk menciptakan standar baru dalam properti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="text-center space-y-3 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827]">{member.name}</h3>
                  <div className="text-[11px] font-semibold text-[#0B5EAA] tracking-wider uppercase mt-0.5">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <CTABanner />
    </>
  );
}
