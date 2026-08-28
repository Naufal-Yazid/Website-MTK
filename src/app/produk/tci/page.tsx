import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function TCIOverviewPage() {
  const phases = [
    {
      id: "tci-1",
      title: "Taman Cibaduyut Indah 1",
      description: "Komunitas yang telah mapan dengan lingkungan hijau yang rindang dan keamanan 24 jam yang ketat.",
      buttonClass: "bg-[#0B5EAA] text-white hover:bg-[#0A4F91]",
      href: "/produk/tci/tci-1",
    },
    {
      id: "tci-2",
      title: "Taman Cibaduyut Indah 2",
      description: "Konsep hunian minimalis modern yang mengedepankan efisiensi ruang dan pencahayaan alami maksimal.",
      buttonClass: "bg-[#0B5EAA] text-white hover:bg-[#0A4F91]",
      href: "/produk/tci/tci-2",
    },
    {
      id: "tci-3",
      title: "Taman Cibaduyut Indah 3",
      description: "Fase terbaru dengan desain arsitektur kontemporer dan integrasi smart home system yang cerdas.",
      buttonClass: "bg-[#0B5EAA] text-white hover:bg-[#0A4F91]",
      href: "/produk/tci/tci-3",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">Taman Cibaduyut Indah</h1>

            <p className="text-sm sm:text-base text-white/50 max-w-xl leading-relaxed">Pengembangan kawasan hunian terpadu yang menggabungkan kenyamanan modern dengan lingkungan asri yang harmonis.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — VISI KAWASAN */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">TAMAN CIBADUYUT INDAH</span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">Visi Kawasan Terintegrasi</h2>

              <div className="space-y-4 text-sm sm:text-base text-[#6B7280] leading-relaxed text-justify">
                <p>
                  Kawasan Taman Cibaduyut Indah merupakan bagian dari upaya Marga Tirta Kencana dalam menghadirkan hunian yang nyaman dan sesuai dengan kebutuhan keluarga modern. Berlokasi di kawasan Cibaduyut, perumahan ini menawarkan
                  kemudahan akses menuju berbagai fasilitas dan area penting di sekitarnya, sehingga mendukung aktivitas sehari-hari dengan lebih praktis.
                </p>

                <p>
                  Dengan perencanaan kawasan yang mempertimbangkan kebutuhan penghuni, Taman Cibaduyut Indah memadukan lokasi yang strategis, serta pilihan hunian dengan harga yang tetap terjangkau. Pengembangan Taman Cibaduyut Indah 1
                  hingga Taman Cibaduyut Indah 3 dilakukan secara bertahap untuk memberikan pilihan hunian yang dapat disesuaikan dengan kebutuhan keluarga anda.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="border-l-3 border-[#0B5EAA] pl-4">
                  <div className="text-2xl sm:text-2xl font-bold text-[#0B5EAA]">500+</div>

                  <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider mt-0.5">UNIT TERHUNI</div>
                </div>

                <div className="border-l-3 border-[#0B5EAA] pl-4">
                  <div className="text-2xl sm:text-2xl font-bold text-[#0B5EAA]">?? Ha</div>

                  <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider mt-0.5">TOTAL AREA</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Interior Mewah Ruang Tamu" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — EKSPLORASI FASE */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">PROYEK KAMI</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Eksplorasi Fase Pengembangan</h2>

            <p className="text-sm text-[#6B7280]">Pilih komplek yang sesuai dengan gaya hidup dan kebutuhan masa depan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {phases.map((phase) => (
              <div key={phase.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col">
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" alt={phase.title} className="w-full h-full object-cover" />

                </div>

                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <h3 className="text-lg font-semibold text-[#111827]">{phase.title}</h3>

                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed flex-grow">{phase.description}</p>

                  <div className="pt-2">
                    <Link href={phase.href} className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${phase.buttonClass}`}>
                      <span>Lihat Komplek</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 1" />

      <CTABanner />
    </>
  );
}
