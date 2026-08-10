import { MessageCircle } from "lucide-react";
import { buildWAUrl } from "@/lib/wa";

export default function FloatingWA() {
  const waUrl = buildWAUrl({
    nama: "Pengunjung Website",
    wa: "",
    pertanyaan: "Halo, saya ingin bertanya tentang hunian di Marga Tirta Kencana.",
  });

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-glow"
      aria-label="Chat WhatsApp"
      title="Hubungi kami via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />
    </a>
  );
}
