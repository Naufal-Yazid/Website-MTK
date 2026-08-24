import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";

export default function ProdukIndexPage() {
  return (
    <>
      {/* HEADER HALAMAN */}
      <section className="relative bg-white pt-33 pb-12 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight">Proyek Kami</h1>

              <p className="text-sm sm:text-base text-[#6B7280] max-w-xl leading-relaxed">Menghadirkan hunian yang berkualitas dengan desain arsitektur modern dan lingkungan yang asri untuk masa depan keluarga Anda.</p>
            </div>

            {/* Right Decorative Geometric Elements */}
            <div className="md:col-span-5 relative hidden md:block min-h-[160px]">
              <div className="absolute right-0 top-0 w-48 h-48 bg-[#D6E8F7]/40 rounded-3xl transform rotate-12" />
              <div className="absolute right-20 top-8 w-32 h-32 bg-[#0B5EAA]/10 rounded-2xl transform -rotate-6" />
            </div>
          </div>
        </div>
      </section>

      {/* GRID PROYEK */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
