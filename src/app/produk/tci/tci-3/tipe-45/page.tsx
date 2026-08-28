import Link from "next/link";
import { ChevronRight, Download, MapPin, Ruler, Home as HomeIcon, BedDouble, Bath, Car, Zap } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";
import KPRCalculator from "@/components/sections/KPRCalculator";

export default function TCI3Tipe45Page() {
  const specs = [
    { icon: Ruler, label: "LUAS TANAH", value: "90 m²" },
    { icon: HomeIcon, label: "LUAS BANGUNAN", value: "45 m²" },
    { icon: BedDouble, label: "KAMAR TIDUR", value: "2 Kamar" },
    { icon: Bath, label: "KAMAR MANDI", value: "1 Kamar" },
    { icon: Car, label: "CARPORT", value: "1 Mobil" },
    { icon: Zap, label: "LISTRIK", value: "2200 VA" },
  ];

  const floorPlanPoints = [
    {
      number: "01",
      title: "Ruang Keluarga Lebih Luas",
      description: "Area ruang keluarga dirancang lebih lega untuk memberikan kenyamanan saat berkumpul bersama keluarga.",
    },
    {
      number: "02",
      title: "Dua Kamar Tidur",
      description: "Dua kamar tidur ditempatkan secara strategis untuk memberikan kenyamanan dan privasi bagi penghuni.",
    },
    {
      number: "03",
      title: "Pencahayaan Alami",
      description: "Penempatan pintu dan jendela membantu memaksimalkan pencahayaan alami serta sirkulasi udara.",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/Tipe45_Depannn.webp')", 
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/70 to-[#0D1B2A]/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">PREMIUM RESIDENTIAL</span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">TCI 3 — Tipe 45</h1>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#brosur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Brosur</span>
              </a>

              <a href="#lokasi" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Lihat Lokasi</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SPESIFIKASI */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">SPESIFIKASI</span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">Spesifikasi Tipe 45</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => {
                  const IconComponent = spec.icon;

                  return (
                    <div key={spec.label} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-2 hover:border-[#0B5EAA]/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-[#0B5EAA]" />

                      <div className="text-[11px] font-semibold text-gray-500 tracking-wider">{spec.label}</div>

                      <div className="text-lg font-bold text-[#111827]">{spec.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-gray-100">
                <img src="/Tipe45_DepanSamping.webp" alt="TCI 3 Tipe 45 Eksterior" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — DENAH RUMAH */}
      <section className="bg-[#F9FAFB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">GAMBARAN RUMAH</span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Denah Rumah Tipe 45</h2>

            <p className="text-sm text-[#6B7280] leading-relaxed">Visualisasi tata ruang yang dirancang untuk memaksimalkan kenyamanan dan fungsi pada setiap bagian rumah.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left Floor Plan Image */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm aspect-square flex items-center justify-center overflow-hidden">
              <img src="/floor-plan/45-84.webp" alt="Denah rumah TCI 3 Tipe 45" className="w-full h-full object-contain" />
            </div>

            {/* Right Floor Plan Points */}
            <div className="lg:col-span-6 space-y-6">
              {floorPlanPoints.map((point) => (
                <div key={point.number} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0B5EAA] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">{point.number}</div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#111827]">{point.title}</h3>

                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — KALKULATOR KPR */}
      <KPRCalculator key="tci-3-tipe-45-650jt" initialHarga={650000000} />

      {/* SECTION 5 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 3" defaultTipe="Tipe 45" />

      <CTABanner />
    </>
  );
}
