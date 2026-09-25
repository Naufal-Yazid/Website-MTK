import Image from "next/image";
import { Home as HomeIcon, MapPin, ShieldCheck, Trees } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function RancamanyarIndahPage() {
  const strategicPoints = [
    "Terhubung ke Baleendah dan Bojongsoang",
    "Dekat dengan fasilitas pendidikan",
    "Akses menuju fasilitas kesehatan",
    "Dekat dengan kebutuhan harian keluarga",
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('/images/proyek/rancamanyar/rancamanyar-banner.webp')",
          }}
        />

        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
              Rancamanyar Indah
            </h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/50">
              <MapPin className="w-4 h-4 text-white" />
              <span>Baleendah, Kabupaten Bandung</span>
            </div>
            <p className="text-sm sm:text-base text-[rgb(246,247,248)] line-clamp-2 leading-relaxed flex-grow">Kawasan hunian dengan harga terjangkau dan lokasi strategis untuk keluarga anda.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO KOMPLEK */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                RANCAMANYAR INDAH
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">
                Hunian Terjangkau di Kawasan Berkembang
              </h2>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Rancamanyar Indah adalah kawasan perumahan seluas 15 hektar
                yang dirancang untuk mendukung kebutuhan keluarga. Lingkungan
                yang tertata, akses praktis, dan pilihan hunian yang terjangkau
                menjadikannya tempat tinggal yang nyaman untuk bertumbuh.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Kawasan 15 Hektar</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Trees className="w-3.5 h-3.5" />
                  <span>Lingkungan Tertata</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Keamanan 24/7</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                <img
                  src="/images/proyek/rancamanyar/rancamanyar-card.webp"
                  alt="Lingkungan Rancamanyar Indah"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — GALERI UNIT */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
              RANCAMANYAR INDAH
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">
              Galeri Unit
            </h2>
            <p className="text-sm text-[#6B7280]">
              Jelajahi ruang tamu, kamar tidur, dan area belakang hunian Rancamanyar Indah.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-sm bg-gray-100 relative group min-h-[300px] h-full">
              <Image
                src="/images/proyek/rancamanyar/rancamanyar-living.webp"
                alt="Ruang tamu unit Rancamanyar Indah"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg z-10">
                Ruang Tamu
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-6">
              {[
                { label: "Kamar Tidur", src: "/images/proyek/rancamanyar/rancamanyar-bed.webp" },
                { label: "Area Belakang", src: "/images/proyek/rancamanyar/rancamanyar-back.webp" },
              ].map(({ label, src }) => (
                <div key={label} className="rounded-2xl overflow-hidden shadow-sm aspect-[16/10] bg-gray-100 relative group">
                  <Image
                    src={src}
                    alt={`${label} unit Rancamanyar Indah`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* SECTION 4 — LOKASI */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                LOKASI KAMI
              </span>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">
                Lokasi Strategis
              </h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">
                Rancamanyar Indah berada di Baleendah, Kabupaten Bandung,
                dengan akses yang mendukung aktivitas keluarga menuju berbagai
                fasilitas di sekitarnya.
              </p>

              <ul className="space-y-3 pt-2">
                {strategicPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <MapPin className="w-4 h-4 text-[#0B5EAA] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#E5E7EB] bg-gray-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps?q=Rancamanyar%20Indah%2C%20Baleendah%2C%20Bandung&output=embed"
                  title="Lokasi Rancamanyar Indah"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="Rancamanyar Indah" />

      <CTABanner />
    </>
  );
}
