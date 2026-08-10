import { MessageCircle } from "lucide-react";
import { buildWAUrl } from "@/lib/wa";

export default function CTABanner() {
  const waUrl = buildWAUrl({
    nama: "Pengunjung Website",
    wa: "",
    pertanyaan: "Halo, saya ingin berkonsultasi mengenai hunian impian di Marga Tirta Kencana.",
  });

  return (
    <section className="relative overflow-hidden bg-[#0D1B2A] py-16 md:py-20">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-[#0D1B2A]/80 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left Text Content */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              Konsultasikan Hunian Impian Anda Sekarang!
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Tim ahli kami siap membantu Anda memilih lokasi dan tipe rumah yang paling sesuai dengan kebutuhan dan budget Anda.
            </p>
          </div>

          {/* Right Button */}
          <div className="w-full md:w-auto shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full md:w-auto px-8 py-3.5 rounded-full bg-white text-[#0B5EAA] font-semibold text-sm sm:text-base hover:bg-sky-50 shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp Kami</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
