import Image from "next/image";
import {
  Download,
  MapPin,
  Store,
  Layers3,
  LayoutGrid,
  Bath,
  Car,
  Zap,
} from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";
import KPRCalculator from "@/components/sections/KPRCalculator";

export default function TerranovaArcadePage() {
  const specs = [
    { icon: Store, label: "FUNGSI", value: "Komersial" },
    { icon: Layers3, label: "JUMLAH LANTAI", value: "2 Lantai" },
    { icon: LayoutGrid, label: "RUANG UTAMA", value: "Area Usaha" },
    { icon: Bath, label: "TOILET", value: "1 Unit" },
    { icon: Car, label: "AREA PARKIR", value: "Depan Unit" },
    { icon: Zap, label: "LISTRIK", value: "2200 VA" },
  ];

  const layoutPoints = [
    {
      number: "01",
      title: "Area Usaha Fleksibel",
      description:
        "Ruang utama dirancang fleksibel untuk mendukung berbagai kebutuhan bisnis, mulai dari toko, kantor, hingga layanan profesional.",
    },
    {
      number: "02",
      title: "Pemisahan Area yang Efisien",
      description:
        "Pembagian dua lantai membantu memisahkan area pelayanan, operasional, dan ruang kerja agar aktivitas usaha lebih teratur.",
    },
    {
      number: "03",
      title: "Fasad Komersial Modern",
      description:
        "Tampilan depan yang modern memberikan visibilitas baik dan membantu membangun citra profesional untuk bisnis Anda.",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_65%] opacity-40"
          style={{
            backgroundImage:
              "url('/images/proyek/tci/tci-3/ruko/tci3-ruko-ta-card.webp')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/70 to-[#0D1B2A]/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">
              Commercial Space
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              TCI 3 — Terranova Arcade
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Ruang komersial modern di kawasan TCI 3 yang dirancang untuk
              mendukung pertumbuhan dan visibilitas bisnis Anda.
            </p>

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

      {/* SECTION 2 — SPESIFIKASI */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                  Spesifikasi
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                  Spesifikasi Terranova Arcade
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => {
                  const IconComponent = spec.icon;

                  return (
                    <div
                      key={spec.label}
                      className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-2 hover:border-[#0B5EAA]/30 transition-colors"
                    >
                      <IconComponent className="w-5 h-5 text-[#0B5EAA]" />

                      <div className="text-[11px] font-semibold text-gray-500 tracking-wider">
                        {spec.label}
                      </div>

                      <div className="text-lg font-bold text-[#111827]">
                        {spec.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-gray-100">
                <img
                  src="/images/proyek/tci/tci-3/ruko/ruko-hall2.webp"
                  alt="Eksterior Terranova Arcade TCI 3"
                  className="w-full h-full object-cover object-[center_65%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — DENAH RUKO */}
      <section className="bg-[#F9FAFB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
              Denah Ruko
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Denah Terranova Arcade
            </h2>

            <p className="text-sm text-[#6B7280] leading-relaxed">
              Tata ruang komersial yang dirancang untuk memberikan fleksibilitas,
              kenyamanan operasional, dan tampilan bisnis yang profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* GAMBAR DENAH RUKO (REPLACE PLACEHOLDER) */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm aspect-square relative flex items-center justify-center overflow-hidden">
              <Image
                src="/floor-plan/fp_terranova.webp"
                alt="Denah Terranova Arcade TCI 3"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              {layoutPoints.map((point) => (
                <div key={point.number} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0B5EAA] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {point.number}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#111827]">
                      {point.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                      {point.description}
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
              TERRANOVA ARCADE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">
              Galeri Unit
            </h2>
            <p className="text-sm text-[#6B7280]">
              Jelajahi ruang utama, teras, dan area dapur ruko Terranova Arcade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-sm bg-[#F3F1ED] relative min-h-[300px] h-full">
              <Image
                src="/images/proyek/tci/tci-3/ruko/ruko-hall.webp"
                alt="Ruang utama ruko Terranova Arcade"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg z-10">
                Ruang Utama
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-6">
              {[
                { label: "Teras Ruko", src: "/images/proyek/tci/tci-3/ruko/ruko-porch.webp" },
                { label: "Area Dapur", src: "/images/proyek/tci/tci-3/ruko/ruko-kitchen.webp" },
              ].map(({ label, src }) => (
                <div key={label} className="rounded-2xl overflow-hidden shadow-sm aspect-[16/10] bg-[#F3F1ED] relative">
                  <Image
                    src={src}
                    alt={`${label} Terranova Arcade`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg z-10">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — KALKULATOR KPR */}
      <KPRCalculator
        key="tci-3-terranova-arcade-800jt"
        initialHarga={800000000}
      />

      {/* SECTION 6 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 3" defaultTipe="Terranova Arcade" />

      <CTABanner />
    </>
  );
}
