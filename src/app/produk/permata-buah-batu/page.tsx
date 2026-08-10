import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle, Mail, Clock } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";
import { buildWAUrl } from "@/lib/wa";

export default function PermataBuahBatuPage() {
  const waUrl = buildWAUrl({
    nama: "Calon Pembeli",
    wa: "",
    proyek: "Permata Buah Batu",
    pertanyaan: "Halo, saya ingin menanyakan info mengenai Permata Buah Batu (waiting list / unit second / proyek fase berikutnya).",
  });

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')`,
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
              <span className="text-white font-medium">Permata Buah Batu</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Permata Buah Batu
            </h1>
            <div className="flex items-center gap-2 text-sm sm:text-base text-white/80">
              <MapPin className="w-4 h-4 text-white" />
              <span>Bojongsoang, Bandung</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INFO TERBATAS */}
      <section className="bg-white py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Status Badge */}
          <div>
            <span className="inline-block bg-[#FEE2E2] text-[#991B1B] text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs">
              Sold Out
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Permata Buah Batu
          </h2>

          <div className="text-xl sm:text-2xl font-bold text-[#0B5EAA]">
            Mulai dari Rp 600 Jt
          </div>

          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl mx-auto">
            Gaya hidup urban yang modern menyatu dengan kenyamanan lingkungan perumahan yang tertata rapi di kawasan Bojongsoang, Bandung.
          </p>

          <hr className="border-gray-200 my-8" />

          {/* Contact Actions */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-[#111827]">
              Tertarik dengan Proyek Ini?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
              Seluruh unit pada fase ini telah habis terjual (Sold Out). Hubungi kami untuk bergabung di waiting list atau info proyek terbaru di sekitarnya.
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
      <InquiryForm defaultProyek="Permata Buah Batu" />

      <CTABanner />
    </>
  );
}
