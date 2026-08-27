"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State Dropdown Desktop
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);

  // State Accordion Mobile
  const [mobileProyekOpen, setMobileProyekOpen] = useState(false);
  const [mobileTciOpen, setMobileTciOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isSolid = isScrolled || mobileMenuOpen;
  const useDarkContent = isSolid;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? "bg-white shadow-sm border-b border-gray-200/80 py-0" : "bg-transparent border-b border-transparent py-1"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Image */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-lg flex items-center justify-center shrink-0">
            <div
              className={`w-full h-full transition-all duration-300 group-hover:scale-105 ${useDarkContent ? "bg-[#0B5EAA]" : "bg-white"}`}
              style={{
                maskImage: 'url("/mtk logo 1.png")',
                WebkitMaskImage: 'url("/mtk logo 1.png")',
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </div>
          <span className={`text-base sm:text-lg tracking-tight transition-colors truncate ${useDarkContent ? "text-[#111827] font-normal" : "text-white font-normal"}`}>Marga Tirta Kencana</span>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Beranda */}
          <Link href="/" className={`relative py-2 text-sm font-normal transition-colors ${isActive("/") ? "text-[#0B5EAA]" : useDarkContent ? "text-[#4B5563] hover:text-[#0B5EAA]" : "text-white/90 hover:text-[#0B5EAA]"}`}>
            Beranda
            {isActive("/") && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B5EAA] rounded-full" />}
          </Link>

          {/* Tentang Kami */}
          <Link href="/tentang" className={`relative py-2 text-sm font-normal transition-colors ${isActive("/tentang") ? "text-[#0B5EAA]" : useDarkContent ? "text-[#4B5563] hover:text-[#0B5EAA]" : "text-white/90 hover:text-[#0B5EAA]"}`}>
            Tentang Kami
            {isActive("/tentang") && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B5EAA] rounded-full" />}
          </Link>

          {/* Dropdown Proyek Desktop */}
          <div
            className="relative py-2"
            onMouseEnter={() => setDesktopDropdownOpen(true)}
            onMouseLeave={() => {
              setDesktopDropdownOpen(false);
              setHoveredSubmenu(null);
            }}
          >
            <Link
              href="/produk"
              className={`inline-flex items-center gap-1.5 text-sm font-normal transition-colors ${isActive("/produk") ? "text-[#0B5EAA]" : useDarkContent ? "text-[#4B5563] hover:text-[#0B5EAA]" : "text-white/90 hover:text-[#0B5EAA]"}`}
            >
              <span>Proyek</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${desktopDropdownOpen ? "rotate-180" : ""}`} />
              {isActive("/produk") && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B5EAA] rounded-full" />}
            </Link>

            {/* Panel Dropdown Menyatu */}
            {desktopDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 z-50">
                <div className="flex bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 transition-all duration-200">
                  {/* Kolom Kiri: Menu Utama */}
                  <div className="w-56 flex flex-col gap-0.5">
                    {/* Item TCI */}
                    <Link
                      href="/produk/tci"
                      onMouseEnter={() => setHoveredSubmenu("tci")}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors ${hoveredSubmenu === "tci" ? "bg-[#EFF6FF] text-[#0B5EAA] font-medium" : "text-[#111827] hover:bg-gray-50"}`}
                    >
                      <span>Taman Cibaduyut Indah</span>
                      <ChevronRight className={`w-4 h-4 transition-all ${hoveredSubmenu === "tci" ? "text-[#0B5EAA] translate-x-0.5" : "text-gray-400"}`} />
                    </Link>

                    {/* Rancamanyar */}
                    <Link href="/produk/rancamanyar-indah" onMouseEnter={() => setHoveredSubmenu(null)} className="px-3.5 py-2.5 rounded-xl text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0B5EAA] transition-colors">
                      Rancamanyar Indah
                    </Link>

                    {/* Permata Buah Batu */}
                    <Link href="/produk/permata-buah-batu" onMouseEnter={() => setHoveredSubmenu(null)} className="px-3.5 py-2.5 rounded-xl text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0B5EAA] transition-colors">
                      Permata Buah Batu
                    </Link>
                  </div>

                  {/* Kolom Kanan: Hanya Muncul Ketika TCI di-hover */}
                  {hoveredSubmenu === "tci" && (
                    <div className="w-56 flex flex-col gap-0.5 pl-1.5 ml-1.5 border-l border-gray-100 animate-in fade-in duration-150">
                      <Link href="/produk/tci/tci-1" className="px-3.5 py-2.5 rounded-xl text-sm text-[#111827] hover:bg-[#EFF6FF] hover:text-[#0B5EAA] transition-colors">
                        Taman Cibaduyut Indah 1
                      </Link>
                      <Link href="/produk/tci/tci-2" className="px-3.5 py-2.5 rounded-xl text-sm text-[#111827] hover:bg-[#EFF6FF] hover:text-[#0B5EAA] transition-colors">
                        Taman Cibaduyut Indah 2
                      </Link>
                      <Link href="/produk/tci/tci-3" className="px-3.5 py-2.5 rounded-xl text-sm text-[#111827] hover:bg-[#EFF6FF] hover:text-[#0B5EAA] transition-colors">
                        Taman Cibaduyut Indah 3
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:block bg-[#004683] rounded-lg">
          <Link href="/kontak" className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white text-sm font-normal hover:bg-[#0A4F91] transition-all shadow-sm active:scale-95">
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${useDarkContent ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu (Mobile-Friendly) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-1.5 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile: Beranda */}
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl text-sm transition-colors ${isActive("/") ? "bg-[#EFF6FF] text-[#0B5EAA] font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
            Beranda
          </Link>

          {/* Mobile: Tentang Kami */}
          <Link
            href="/tentang"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-sm transition-colors ${isActive("/tentang") ? "bg-[#EFF6FF] text-[#0B5EAA] font-medium" : "text-gray-700 hover:bg-gray-50"}`}
          >
            Tentang Kami
          </Link>

          {/* Mobile: Accordion Proyek */}
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 overflow-hidden">
            <button onClick={() => setMobileProyekOpen(!mobileProyekOpen)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100/60 transition-colors">
              <span>Proyek</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-gray-500 ${mobileProyekOpen ? "rotate-180 text-[#0B5EAA]" : ""}`} />
            </button>

            {mobileProyekOpen && (
              <div className="px-3 pb-3 space-y-1 bg-white border-t border-gray-100">
                <Link href="/produk" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#0B5EAA] hover:underline">
                  Lihat Semua Proyek &rarr;
                </Link>

                {/* Sub-accordion TCI */}
                <div className="rounded-lg border border-gray-100 overflow-hidden bg-gray-50/40">
                  <button onClick={() => setMobileTciOpen(!mobileTciOpen)} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100/50">
                    <span>Taman Cibaduyut Indah</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-gray-400 ${mobileTciOpen ? "rotate-180 text-[#0B5EAA]" : ""}`} />
                  </button>

                  {mobileTciOpen && (
                    <div className="pl-3 pr-2 py-1.5 space-y-1 bg-white border-t border-gray-100">
                      <Link href="/produk/tci" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-medium text-[#0B5EAA] hover:bg-[#EFF6FF]">
                        Overview TCI
                      </Link>
                      <Link href="/produk/tci/tci-3" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-[#0B5EAA] hover:bg-[#EFF6FF]">
                        Taman Cibaduyut Indah 1
                      </Link>
                      <Link href="/produk/tci/tci-3" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-[#0B5EAA] hover:bg-[#EFF6FF]">
                        Taman Cibaduyut Indah 2
                      </Link>
                      <Link href="/produk/tci/tci-3" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-[#0B5EAA] hover:bg-[#EFF6FF]">
                        Taman Cibaduyut Indah 3
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/produk/rancamanyar-indah" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  Rancamanyar Indah
                </Link>

                <Link href="/produk/permata-buah-batu" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  Permata Buah Batu
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: CTA */}
          <div className="pt-3">
            <Link href="/kontak" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-5 py-3 rounded-xl bg-[#004683] text-white text-sm font-normal hover:bg-[#0A4F91] transition-all shadow-sm">
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
