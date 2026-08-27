import Link from "next/link";
import { MapPin } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";

export default function ProdukIndexPage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('/hero image.webp')",
          }}
        />

        <div className="absolute inset-0 bg-[#0D1B2A]/55" />

        <div className="relative z-10 max-w-4xl text-center px-4 py-20 space-y-4">
          <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">PROYEK KAMI</span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">Hunian untuk Masa Depan Anda</h1>
        </div>
      </section>

      {/* GRID PROYEK */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">PILIHAN HUNIAN</span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">Temukan Proyek Impian Anda</h2>

            <p className="text-sm text-[#6B7280] leading-relaxed">Jelajahi pilihan kawasan hunian yang dirancang untuk mendukung kenyamanan dan masa depan keluarga Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* KARTU 1 — TAMAN CIBADUYUT INDAH */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs flex flex-col transition-all hover:shadow-md hover:border-gray-300">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" alt="Taman Cibaduyut Indah" className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="text-xl font-semibold text-[#111827]">Taman Cibaduyut Indah</h3>

                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>Cibaduyut, Kota Bandung</span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 leading-relaxed flex-grow">Pilihan hunian terlengkap dengan berbagai tipe unit di lokasi strategis yang dekat dengan pusat kota.</p>

                <div className="pt-2">
                  <Link
                    href="/produk/tci"
                    className="block w-full rounded-lg bg-[#0B5EAA] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0A4F91] focus:outline-none focus:ring-2 focus:ring-[#0B5EAA] focus:ring-offset-2"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>

            {/* KARTU 2 — RANCAMANYAR INDAH */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs flex flex-col transition-all hover:shadow-md hover:border-gray-300">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="Rancamanyar Indah" className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="text-xl font-semibold text-[#111827]">Rancamanyar Indah</h3>

                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>Baleendah, Kabupaten Bandung</span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 leading-relaxed flex-grow">Komplek perumahan eksklusif dengan sistem keamanan satu pintu dan akses mudah ke berbagai fasilitas.</p>

                <div className="pt-2">
                  <Link
                    href="/produk/rancamanyar-indah"
                    className="block w-full rounded-lg bg-[#0B5EAA] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0A4F91] focus:outline-none focus:ring-2 focus:ring-[#0B5EAA] focus:ring-offset-2"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>

            {/* KARTU 3 — PERMATA BUAH BATU */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs flex flex-col transition-all hover:shadow-md hover:border-gray-300">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Permata Buah Batu" className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="text-xl font-semibold text-[#111827]">Permata Buah Batu</h3>

                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>Bojongsoang, Bandung</span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 leading-relaxed flex-grow">Gaya hidup urban yang modern menyatu dengan kenyamanan lingkungan perumahan yang tertata rapi.</p>

                <div className="pt-2">
                  <Link
                    href="/produk/permata-buah-batu"
                    className="block w-full rounded-lg bg-[#0B5EAA] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0A4F91] focus:outline-none focus:ring-2 focus:ring-[#0B5EAA] focus:ring-offset-2"
                  >
                    Lihat Detail
                  </Link>
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
