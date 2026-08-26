import Link from "next/link";
import { ChevronRight, MapPin, Sun, Users, Zap } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function TCI2OverviewPage() {
  const strategicPoints = ["Terhubung dengan kawasan Cibaduyut", "Akses menuju pusat Kota Bandung", "Dekat dengan fasilitas pendidikan", "Dekat dengan fasilitas kesehatan"];

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">Taman Cibaduyut Indah 2</h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/80">
              <MapPin className="w-4 h-4 text-white" />
              <span>Cibaduyut, Kota Bandung</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO KOMPLEK */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">TAMAN CIBADUYUT INDAH</span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">Hunian Minimalis untuk Keluarga Modern</h2>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Taman Cibaduyut Indah 2 dikembangkan dengan konsep hunian minimalis modern yang mengutamakan efisiensi ruang dan kenyamanan keluarga. Perencanaan bangunan yang fungsional serta pemanfaatan pencahayaan alami menciptakan
                lingkungan tempat tinggal yang nyaman untuk aktivitas sehari-hari.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Modern Development</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Pencahayaan Alami</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Users className="w-3.5 h-3.5" />
                  <span>Family Oriented</span>
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Interior hunian Taman Cibaduyut Indah 2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LOKASI */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">LOKASI KAMI</span>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Lokasi Strategis</h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">TCI 2 berada di kawasan Cibaduyut dengan akses yang mendukung mobilitas penghuni menuju pusat aktivitas dan berbagai fasilitas umum di Bandung dan sekitarnya.</p>

              <ul className="space-y-3 pt-2">
                {strategicPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-[#0B5EAA] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#E5E7EB] bg-gray-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps?q=Taman%20Cibaduyut%20Indah%20II&output=embed"
                  title="Lokasi Taman Cibaduyut Indah II"
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
      <InquiryForm defaultProyek="TCI 2" />

      <CTABanner />
    </>
  );
}
