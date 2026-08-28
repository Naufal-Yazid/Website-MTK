import Link from "next/link";
import { ArrowRight, MapPin, Shield, Zap, Home as HomeIcon } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";

export default function Home() {
  const featuredProjects = [
    {
      id: "tci",
      title: "Taman Cibaduyut Indah",
      location: "Cibaduyut, Bandung",
      price: "Mulai Rp 400 Jt",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      href: "/produk/tci",
    },
    {
      id: "rancamanyar",
      title: "Rancamanyar Indah",
      location: "Kabupaten Bandung",
      price: "Mulai Rp 200 Jt",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      href: "/produk/rancamanyar-indah",
    },
    {
      id: "permata-buah-batu",
      title: "Permata Buah Batu",
      location: "Buah Batu, Bandung",
      price: "Mulai Rp 453 Jt",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      href: "/produk/permata-buah-batu",
    },
  ];

  const facilities = [
    {
      icon: HomeIcon,
      title: "Sarana Ibadah dan Olahraga",
      description: "Tersedia sarana ibadah dan area olahraga yang dapat digunakan oleh penghuni untuk mendukung kebutuhan sehari-hari.",
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Keamanan lingkungan didukung oleh CCTV dan petugas keamanan yang berjaga selama 24 jam.",
    },
    {
      icon: Zap,
      title: "Instalasi Listrik & Air",
      description: "Setiap unit dilengkapi dengan instalasi listrik dan air untuk memenuhi kebutuhan dasar penghuni.",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden bg-[#0D1B2A]">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('/hero image.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/75 to-[#0D1B2A]/30" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight">Hunian Berkualitas di Bandung & Sekitarnya</h1>
            <p className="text-base sm:text-lg font-normal text-white/50 max-w-xl leading-relaxed">Wujudkan impian memiliki rumah dengan desain arsitektur modern, lingkungan asri, dan aksesibilitas terbaik untuk keluarga Anda.</p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/produk" className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#0B5EAA] text-white font-normal text-sm sm:text-base hover:bg-[#0A4F91] transition-all shadow-lg active:scale-95">
                Lihat Proyek
              </Link>
              <Link href="/kontak" className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-white text-white font-normal text-sm sm:text-base hover:bg-white/10 backdrop-blur-xs transition-all active:scale-95">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TENTANG SINGKAT */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with Overlapping Badge */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img src="/IMG_1664 1.webp" alt="Interior Ruang Tamu Modern" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="space-y-5 pt-4 lg:pt-0">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">TENTANG KAMI</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827] leading-tight">Membangun Masa Depan Sejak 2010</h2>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-normal">
                Marga Tirta Kencana telah menjadi mitra terpercaya dalam menghadirkan hunian yang tidak hanya sekadar tempat tinggal, tetapi sebuah investasi masa depan. Dengan dedikasi tinggi pada kualitas konstruksi dan estetika modern,
                kami telah sukses mengembangkan berbagai kawasan residensial strategis di wilayah Bandung dan sekitarnya.
              </p>
              <div className="pt-2">
                <Link href="/tentang" className="inline-flex items-center gap-2 text-[#0B5EAA] font-semibold text-sm hover:underline group">
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROYEK UNGGULAN */}
      <section className="bg-[#F9FAFB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">PROYEK UNGGULAN</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">Pilih Hunian Impian Anda</h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={project.href} className="group bg-white rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-[#111827] group-hover:text-[#0B5EAA] transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-base font-semibold text-[#0B5EAA]">{project.price}</span>
                    <span className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#0B5EAA] flex items-center justify-center group-hover:bg-[#0B5EAA] group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FASILITAS */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-xl mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">FASILITAS TERBAIK</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Kenyamanan & Keamanan Prioritas Kami</h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {facilities.map((fac, idx) => {
              const IconComp = fac.icon;
              return (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-xs hover:border-[#0B5EAA]/40 hover:shadow-md transition-all space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/40 flex items-center justify-center text-[#0B5EAA]">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-[#111827]">{fac.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">{fac.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
