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

export default function TCI3Tipe45Page() {
  const specs = [
    { icon: Ruler, label: "LUAS TANAH", value: "90 m²" },
    { icon: HomeIcon, label: "LUAS BANGUNAN", value: "45 m²" },
    { icon: BedDouble, label: "KAMAR TIDUR", value: "2 Kamar" },
    { icon: Bath, label: "KAMAR MANDI", value: "1 Kamar" },
    { icon: Car, label: "CARPORT", value: "1 Mobil" },
    { icon: Zap, label: "LISTRIK", value: "2200 VA" },
  ];

  return (
    <>
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/70 to-[#0D1B2A]/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <Link href="/produk" className="hover:text-white transition-colors">
                Produk
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <Link href="/produk/tci/tci-3" className="hover:text-white transition-colors">
                TCI 3
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <span className="text-white font-medium">Tipe 45</span>
            </nav>

            <span className="text-xs uppercase tracking-[3px] font-semibold text-[#D6E8F7]">
              PREMIUM RESIDENTIAL
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              TCI 3 — Tipe 45
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Extra space for growing families with premium finishes and generous garden space.
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

      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                  SPESIFIKASI
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                  Spesifikasi Tipe 45
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {specs.map((sp, idx) => {
                  const IconComp = sp.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-2"
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

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="TCI 3 Tipe 45 Eksterior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <KPRCalculator initialHarga={650000000} />
      <InquiryForm defaultProyek="TCI 3" defaultTipe="Tipe 45" />
      <CTABanner />
    </>
  );
}
