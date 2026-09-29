import { ManagedImg, ManagedBackground } from "@/components/content/ManagedImages";
import ProjectActions from "@/components/content/ProjectActions";
import type { ContentBundle } from "@/lib/content/values";
import AvailabilityBadge from "@/components/content/AvailabilityBadge";
import { availabilityFor } from "@/lib/content/availability";
import { ManagedImage as Image } from "@/components/content/ManagedImages";
import { Ruler, Home as HomeIcon, BedDouble, Bath, Car, Zap } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";
import KPRCalculator from "@/components/sections/KPRCalculator";

export default function TCI3Tipe45Page({ content }: { content: ContentBundle }) {
  const text = (key: string) => content["tipe-45"][key];

  const specs = [
    { icon: Ruler, label: "LUAS TANAH", value: text("specs.0.value") },
    { icon: HomeIcon, label: "LUAS BANGUNAN", value: text("specs.1.value") },
    { icon: BedDouble, label: "KAMAR TIDUR", value: text("specs.2.value") },
    { icon: Bath, label: "KAMAR MANDI", value: text("specs.3.value") },
    { icon: Car, label: "CARPORT", value: text("specs.4.value") },
    { icon: Zap, label: "LISTRIK", value: text("specs.5.value") },
  ];

  const floorPlanPoints = [
    {
      number: "01",
      title: text("floorPlanPoints.0.title"),
      description: text("floorPlanPoints.0.description"),
    },
    {
      number: "02",
      title: text("floorPlanPoints.1.title"),
      description: text("floorPlanPoints.1.description"),
    },
    {
      number: "03",
      title: text("floorPlanPoints.2.title"),
      description: text("floorPlanPoints.2.description"),
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <ManagedBackground
          className="absolute inset-0 bg-cover bg-center opacity-40" src="/images/proyek/tci/tci-3/cluster/tipe-45/Tipe45_Depannn.webp" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/70 to-[#0D1B2A]/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">{text("hero.text")}</span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">{text("hero.title")}</h1>
            <AvailabilityBadge status={availabilityFor(content, "tipe-45")} />

            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">{text("hero.description")}</p>

            {/* Action Buttons */}
            <ProjectActions values={content["tipe-45"]} />
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
                <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section2.text")}</span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">{text("section2.heading")}</h2>
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
                <ManagedImg src="/images/proyek/tci/tci-3/cluster/tipe-45/Tipe45_DepanSamping.webp" alt="TCI 3 Tipe 45 Eksterior" className="w-full h-full object-cover" />
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
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section3.text")}</span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">{text("section3.heading")}</h2>

            <p className="text-sm text-[#6B7280] leading-relaxed">{text("section3.description")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left Floor Plan Image */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm aspect-square flex items-center justify-center overflow-hidden">
              <ManagedImg src="/images/proyek/tci/tci-3/denah/45-84.webp" alt="Denah rumah TCI 3 Tipe 45" className="w-full h-full object-contain" />
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

      {/* SECTION 4 — GALERI UNIT */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section4.text")}</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">{text("section4.heading")}</h2>

            <p className="text-sm text-[#6B7280]">{text("section4.description")}</p>
          </div>

          {/* Grid Galeri dengan items-stretch agar tinggi kiri dan kanan otomatis sama persis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            {/* Foto 1: Ruang Tamu (Kiri - Mengikuti tinggi total kolom kanan) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-sm bg-gray-100 relative group min-h-[300px] h-full">
              <Image src="/images/proyek/tci/tci-3/cluster/tipe-45/Foto_Interior_tipe45_Dapur.webp" alt="Dapur" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 60vw" />

              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg z-10">{text("section4.text2")}</div>
            </div>

            {/* Kolom Kanan: 2 Foto Ditumpuk */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-6">
              {/* Foto 2: Kamar Tidur Utama */}
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[16/10] bg-gray-100 relative group">
                <Image src="/images/proyek/tci/tci-3/cluster/tipe-45/Foto_Interior_tipe45_Kamar2.webp" alt="Kamar Tidur Utama" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 40vw" />

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg z-10">{text("section4.text3")}</div>
              </div>

              {/* Foto 3: Kamar Anak */}
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[16/10] bg-gray-100 relative group">
                <Image src="/images/proyek/tci/tci-3/cluster/tipe-45/Foto_Interior_tipe45_Kamar1.webp" alt="Kamar Anak" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 40vw" />

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg z-10">{text("section4.text4")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — KALKULATOR KPR */}
      <KPRCalculator key={text("price")} initialHarga={Number(text("price"))} />

      {/* SECTION 6 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 3" defaultTipe="Tipe 45" />

      <CTABanner />
    </>
  );
}
