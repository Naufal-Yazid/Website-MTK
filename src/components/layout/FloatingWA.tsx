import Image from "next/image";
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
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image
          src="/WhatsApp.svg.webp" // Sesuaikan nama file gambar Anda di folder public/ (misal: /whatsapp.svg atau /whatsapp.png)
          alt="WhatsApp Logo"
          width={32}
          height={32}
          className="object-contain w-full h-full"
        />
      </div>
    </a>
  );
}
