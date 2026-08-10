import Link from "next/link";
import {
  ChevronRight,
  Download,
  MapPin,
  Ruler,
  Home as HomeIcon,
  BedDouble,
  Bath,
  Car,
  Zap,
} from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";
import KPRCalculator from "@/components/sections/KPRCalculator";

export default function TCI3Tipe36Page() {
  const specs = [
    { icon: Ruler, label: "LUAS TANAH", value: "120 m²" },
    { icon: HomeIcon, label: "LUAS BANGUNAN", value: "50 m²" },
    { icon: BedDouble, label: "KAMAR TIDUR", value: "2 Kamar" },
    { icon: Bath, label: "KAMAR MANDI", value: "1 Kamar" },
    { icon: Car, label: "CARPORT", value: "1 Mobil" },
    { icon: Zap, label: "LISTRIK", value: "2200 VA" },
  ];

  const floorPlanSteps = [
    {
      num: "01",
      title: "Open Plan Living",
      description: "Ruang tamu dan ruang makan yang menyatu memberikan kesan luas pada interior rumah.",
    },
    {
      num: "02",
      title: "Dual Bedroom",
      description: "Dua kamar tidur yang terpisah memberikan privasi maksimal untuk orang tua dan anak.",
    },
    {
      num: "03",
      title: "Sirkulasi Udara Optimal",
      description: "Penempatan jendela strategis di bagian depan dan belakang menjamin pertukaran udara yang baik.",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/70 to-[#0D1B2A]/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <Link href="/produk" className="hover:text-white transition-colors">
                Produk
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <Link href="/produk/tci" className="hover:text-white transition-colors">
                TCI
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <Link href="/produk/tci/tci-3" className="hover:text-white transition-colors">
                TCI 3
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <span className="text-white font-medium">Tipe 36</span>
            </nav>

            <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">
              PREMIUM RESIDENTIAL
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              TCI 3 — Tipe 36
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Hunian modern minimalis yang dirancang dengan efisiensi ruang maksimal dan estetika kontemporer untuk kenyamanan keluarga Anda.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#brosur"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Brosur</span>
              </a>
              <a
                href="#lokasi"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Lihat Lokasi</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SPESIFIKASI EKSKLUSIF */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                  SPESIFIKASI
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                  Spesifikasi Eksklusif
                </h2>
                <p className="text-sm text-[#6B7280] mt-2">
                  Tipe 50 di TCI 3 dirancang untuk memberikan kenyamanan maksimal dengan pemanfaatan lahan yang cerdas dan material bangunan kelas satu.
                </p>
              </div>

              {/* 2x3 Grid Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {specs.map((sp, idx) => {
                  const IconComp = sp.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-2 hover:border-[#0B5EAA]/30 transition-colors"
                    >
                      <IconComp className="w-5 h-5 text-[#0B5EAA]" />
                      <div className="text-[11px] font-semibold text-gray-500 tracking-wider">
                        {sp.label}
                      </div>
                      <div className="text-lg font-bold text-[#111827]">
                        {sp.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="TCI 3 Tipe 36 Eksterior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — DENAH RUMAH */}
      <section className="bg-[#F9FAFB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
              GAMBARAN RUMAH
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Denah Rumah
            </h2>
            <p className="text-sm text-[#6B7280]">
              Visualisasi tata ruang yang efisien, mengoptimalkan setiap meter persegi untuk mendukung aktivitas harian Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left Floor Plan Diagram */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm aspect-square flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-center space-y-4">
                <div className="w-48 h-48 border-2 border-dashed border-[#0B5EAA]/40 rounded-xl flex flex-col items-center justify-center p-4 bg-[#EFF6FF]/30">
                  <span className="text-xs font-bold text-[#0B5EAA]">TAMPAK DEPAN</span>
                  <div className="w-full h-24 my-2 border border-gray-300 rounded bg-white flex items-center justify-center text-[10px] text-gray-500">
                    DENAH TYPE 36 / 72
                  </div>
                  <span className="text-[10px] text-gray-400">SKALA 1:100</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">Floor Plan Visualization</div>
              </div>
            </div>

            {/* Right Numbered Points */}
            <div className="lg:col-span-6 space-y-6">
              {floorPlanSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0B5EAA] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#111827]">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — GALERI UNIT */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
              UNIT TIPE 36
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Galeri Unit
            </h2>
            <p className="text-sm text-[#6B7280]">
              Intip setiap sudut hunian impian Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left Big Photo */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 relative group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Ruang Tamu Tipe 36"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                Ruang Tamu
              </div>
            </div>

            {/* Right Stacked Photos */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-6">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[16/9] bg-gray-100 relative group">
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
                  alt="Kamar Tidur Utama"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                  Kamar Tidur Utama
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[16/9] bg-gray-100 relative group">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
                  alt="Kamar Mandi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                  Kamar Mandi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — KALKULATOR KPR */}
      <KPRCalculator initialHarga={500000000} />

      {/* SECTION 6 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 3" defaultTipe="Tipe 36" />

      <CTABanner />
    </>
  );
}
