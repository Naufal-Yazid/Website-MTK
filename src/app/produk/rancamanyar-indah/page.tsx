import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle, Mail, Clock } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";
import { buildWAUrl } from "@/lib/wa";

export default function RancamanyarIndahPage() {
  const waUrl = buildWAUrl({
    nama: "Calon Pembeli",
    wa: "",
    proyek: "Rancamanyar Indah",
    pertanyaan: "Halo, saya tertarik dengan Rancamanyar Indah. Mohon informasi mengenai ketersediaan unit dan pricelist terbaru.",
  });

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <Link href="/produk" className="hover:text-white transition-colors">
                Produk
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6E8F7]" />
              <span className="text-white font-medium">Rancamanyar Indah</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Rancamanyar Indah
            </h1>
            <div className="flex items-center gap-2 text-sm sm:text-base text-white/80">
              <MapPin className="w-4 h-4 text-white" />
              <span>Baleendah, Kabupaten Bandung</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INFO TERBATAS */}
      <section className="bg-white py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Status Badge */}
          <div>
            <span className="inline-block bg-[#DCFCE7] text-[#166534] text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs">
              Available
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Rancamanyar Indah
          </h2>

          <div className="text-xl sm:text-2xl font-bold text-[#0B5EAA]">
            Mulai dari Rp 200 Jt
          </div>

          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl mx-auto">
            Komplek perumahan eksklusif dengan sistem keamanan satu pintu dan akses mudah ke berbagai fasilitas di sekitarnya.
          </p>

          <hr className="border-gray-200 my-8" />

          {/* Contact Actions */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-[#111827]">
              Tertarik dengan Proyek Ini?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
              Hubungi tim kami untuk informasi lengkap mengenai spesifikasi, harga, dan ketersediaan unit.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-sm active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <Link
                href="/kontak"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-[#0B5EAA] text-white font-semibold text-sm hover:bg-[#0A4F91] transition-colors shadow-sm active:scale-95"
              >
                <Mail className="w-5 h-5" />
                <span>Kirim Pesan</span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs italic text-[#6B7280] pt-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Tim kami akan merespons dalam 1×24 jam</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="Rancamanyar Indah" />

      <CTABanner />
    </>
  );
}
