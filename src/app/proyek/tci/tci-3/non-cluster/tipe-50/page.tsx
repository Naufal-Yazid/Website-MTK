import Image from "next/image";
import {
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

export default function TCI3NonClusterTipe50Page() {
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
      number: "01",
      title: "Akses Langsung",
      desc: "Hunian non-cluster dengan akses langsung dari jalan lingkungan untuk mobilitas keluarga yang lebih praktis.",
    },
    {
      number: "02",
      title: "Tata Ruang Fungsional",
      desc: "Ruang keluarga, kamar tidur, dan area servis dirancang untuk memenuhi kebutuhan hunian keluarga modern.",
    },
    {
      number: "03",
      title: "Sirkulasi Nyaman",
      desc: "Susunan ruangan memberikan pencahayaan dan sirkulasi udara yang baik untuk kenyamanan sehari-hari.",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[70vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('/images/proyek/tci/tci-3/non-cluster/tci3-t50-nc-detail.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/95 via-[#0D1B2A]/70 to-[#0D1B2A]/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <div className="max-w-2xl space-y-5">
            <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#60A5FA] uppercase">
              Non-Cluster Residence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              TCI 3 — Tipe 50
            </h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/80">
              <MapPin className="w-4 h-4 text-white" />
              <span>Cibaduyut, Kota Bandung</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="#brosur"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white bg-white/10 text-white font-semibold text-sm hover:bg-white hover:text-[#0D1B2A] transition-all"
              >
                <Download className="w-4 h-4" />
                Download Brosur
              </a>

              <a
                href="#lokasi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white bg-white/10 text-white font-semibold text-sm hover:bg-white hover:text-[#0D1B2A] transition-all"
              >
                <MapPin className="w-4 h-4" />
                Lihat Lokasi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SPESIFIKASI */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.18em] text-[#0B5EAA] uppercase">
                  Spesifikasi
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">
                  Spesifikasi Tipe 50
                </h2>
                <p className="text-[#6B7280] leading-relaxed max-w-xl">
                  Hunian non-cluster yang nyaman dengan lahan luas, akses
                  langsung, dan tata ruang fungsional untuk kebutuhan keluarga.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((spec) => {
                  const Icon = spec.icon;

                  return (
                    <div
                      key={spec.label}
                      className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 space-y-3 hover:border-[#0B5EAA]/40 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-[#0B5EAA]" />
                      <div>
                        <p className="text-[10px] sm:text-xs font-bold text-[#6B7280] tracking-wide">
                          {spec.label}
                        </p>
                        <p className="text-sm sm:text-base font-bold text-[#0D1B2A] mt-1">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[460px] shadow-lg">
              <img
                src="/images/proyek/tci/tci-3/non-cluster/tci3-t50-nc-detail.webp"
                alt="Rumah TCI 3 Tipe 50 Non-Cluster"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — DENAH RUMAH */}
      <section className="bg-[#F8FAFC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold tracking-[0.18em] text-[#0B5EAA] uppercase mb-3">
              Denah Rumah
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">
              Tata Ruang Tipe 50
            </h2>
            <p className="text-[#6B7280] mt-4 leading-relaxed">
              Dirancang untuk memberikan kenyamanan keluarga melalui pembagian
              ruang yang efisien dan mudah digunakan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 shadow-sm aspect-square flex items-center justify-center relative overflow-hidden">
              <img
                src="/images/proyek/tci/tci-3/denah/50-90.webp"
                alt="Denah Rumah TCI 3 Tipe 50 Non-Cluster"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="lg:col-span-6 space-y-7">
              {floorPlanSteps.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#0B5EAA] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0D1B2A] text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — GALERI UNIT */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold tracking-[0.18em] text-[#0B5EAA] uppercase mb-3">
              Galeri Unit
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">
              Tampilan Tipe 50 Non-Cluster
            </h2>
            <p className="text-[#6B7280] mt-4 leading-relaxed">
              Lihat tampilan fasad hunian dan denah Tipe 50 Non-Cluster di
              Taman Cibaduyut Indah 3.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/proyek/tci/tci-3/non-cluster/tipe50-living.webp"
                alt="Tampak depan TCI 3 Tipe 50 Non-Cluster"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white text-lg font-bold">Ruang Tamu & Keluarga</p>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
              <div className="relative min-h-[230px] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/proyek/tci/tci-3/non-cluster/tipe50-bed.webp"
                  alt="Fasad rumah TCI 3 Tipe 50 Non-Cluster"
                  fill
                  className="object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-bold">Kamar tidur</p>
                </div>
              </div>

              <div className="relative min-h-[230px] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/proyek/tci/tci-3/non-cluster/tipe50-kitchen.webp"
                  alt="Denah TCI 3 Tipe 50 Non-Cluster"
                  fill
                  className="object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-bold">Dapur dan ruang makan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — SIMULASI KPR */}
     <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KPRCalculator initialHarga={800000000} />
      </div>
    </section>

      {/* SECTION 6 — FORM INQUIRY */}
      <InquiryForm
        defaultProyek="Taman Cibaduyut Indah 3"
        defaultTipe="Tipe 50 Non-Cluster"
      />

      <CTABanner />
    </>
  );
}