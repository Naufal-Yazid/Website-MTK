import Link from "next/link";
import { MessageCircle } from "lucide-react";

// Instagram SVG Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// TikTok Icon SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.41V8.9a6.34 6.34 0 1 0 6.34 6.34V9.33a8.28 8.28 0 0 0 4.77 1.51V7.39a4.84 4.84 0 0 1-1-.7z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white pt-16 pb-8 border-t border-[#1E3A5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#1E3A5F]">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white tracking-tight">
              Marga Tirta Kencana
            </h3>
            <p className="text-[#8EA8C3] text-sm leading-relaxed max-w-sm">
              Membangun hunian berkualitas dan berkelanjutan untuk masa depan yang lebih baik di Bandung.
            </p>
          </div>

          {/* Column 2: Quick Link */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-[#8EA8C3] tracking-wider mb-4">
              Quick Link
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tentang" className="text-[#8EA8C3] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#8EA8C3] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Proyek */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-[#8EA8C3] tracking-wider mb-4">
              Proyek
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/produk/rancamanyar-indah" className="text-[#8EA8C3] hover:text-white transition-colors">
                  Rancamanyar Indah
                </Link>
              </li>
              <li>
                <Link href="/produk/permata-buah-batu" className="text-[#8EA8C3] hover:text-white transition-colors">
                  Permata Buah Batu
                </Link>
              </li>
              <li>
                <Link href="/produk/tci" className="text-[#8EA8C3] hover:text-white transition-colors">
                  TCI Complexes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-[#8EA8C3] tracking-wider mb-4">
              Social Media
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-[#8EA8C3] hover:text-white hover:bg-[#0B5EAA] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-[#8EA8C3] hover:text-white hover:bg-[#0B5EAA] transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-[#8EA8C3] hover:text-white hover:bg-[#25D366] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-xs text-[#6B7280]">
          © 2026 Marga Tirta Kencana. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
