import { Home as HomeIcon, MapPin, ShieldCheck, Trees } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function PermataBuahBatuPage() {
  const strategicPoints = [
    "Berada di kawasan Bojongsoang, Bandung",
    "Akses menuju pusat Kota Bandung",
    "Dekat dengan fasilitas pendidikan",
    "Dekat dengan pusat kebutuhan harian",
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('/images/proyek/permata-buah-batu/permatabb-gate-banner.webp')",
          }}
        />

        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
              Permata Buah Batu
            </h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/50">
              <MapPin className="w-4 h-4 text-white" />
              <span>Bojongsoang, Kota Bandung</span>
            </div>
            <p className="text-sm sm:text-base text-[rgb(246,247,248)] line-clamp-2 leading-relaxed flex-grow">Gaya hidup urban modern di tengah kota dengan harga terjangkau dan lokasi yang nyaman.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO KOMPLEK */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                PERMATA BUAH BATU
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">
                Hunian Urban dalam Lingkungan Tertata
              </h2>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Gaya hidup urban yang modern menyatu dengan kenyamanan
                lingkungan perumahan yang tertata rapi di kawasan Bojongsoang,
                Bandung. Seluruh unit pada fase ini telah habis terjual.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Kawasan Hunian Mapan</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Trees className="w-3.5 h-3.5" />
                  <span>Lingkungan Tertata</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Keamanan Satu Pintu</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                <img
                  src="/images/proyek/permata-buah-batu/permatabuahbatu-detail.webp"
                  alt="Gerbang Permata Buah Batu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LOKASI */}
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
                Permata Buah Batu terletak di kawasan Bojongsoang dengan akses
                yang memudahkan penghuni menjangkau berbagai fasilitas penting
                di Bandung dan sekitarnya.
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
                  src="https://www.google.com/maps?q=Permata%20Buah%20Batu%2C%20Bojongsoang%2C%20Bandung&output=embed"
                  title="Lokasi Permata Buah Batu"
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

      {/* SECTION 4 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="Permata Buah Batu" />

      <CTABanner />
    </>
  );
}