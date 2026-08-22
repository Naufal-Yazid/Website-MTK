"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/produk", label: "Proyek" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // Header solid jika di-scroll, di halaman /produk, ATAU saat menu mobile sedang terbuka
  const isSolid = isScrolled || pathname.startsWith("/produk") || mobileMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? "bg-white shadow-sm border-b border-gray-200/80 py-0" : "bg-transparent border-b border-transparent py-1"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Image */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 overflow-hidden rounded-lg flex items-center justify-center">
            {/* Logo dengan CSS Mask */}
            <div
              className={`w-full h-full transition-all duration-300 group-hover:scale-105 ${isSolid ? "bg-[#0B5EAA]" : "bg-white"}`}
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
          <span className={`text-lg tracking-tight transition-colors ${isSolid ? "text-[#111827] font-normal" : "text-white font-normal"}`}>Marga Tirta Kencana</span>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link key={link.href} href={link.href} className={`relative py-2 text-sm font-normal transition-colors ${active ? "text-[#0B5EAA]" : isSolid ? "text-[#4B5563] hover:text-[#0B5EAA]" : "text-white/90 hover:text-[#0B5EAA]"}`}>
                {link.label}
                {active && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B5EAA] rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:block bg-[#004683] rounded-lg">
          <Link href="/kontak" className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white text-sm font-normal hover:bg-[#0A4F91] transition-all shadow-sm active:scale-95">
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 rounded-lg transition-colors ${isSolid ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`} aria-label="Toggle Navigation Menu">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-colors font-normal ${active ? "bg-[#EFF6FF] text-[#0B5EAA]" : "text-gray-700 hover:text-[#0B5EAA] hover:bg-gray-50"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link href="/kontak" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-5 py-3 rounded-lg bg-[#004683] text-white text-sm font-normal hover:bg-[#0A4F91] transition-all shadow-sm">
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
