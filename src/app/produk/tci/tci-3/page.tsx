"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Zap, Users, Home as HomeIcon, ArrowRight } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function TCI3OverviewPage() {
  const [activeTab, setActiveTab] = useState<"cluster" | "non-cluster" | "ruko">("cluster");

  const rumahTypes = [
    {
      title: "Tipe 36",
      description: "Compact, efficient, and beautifully designed for young couples.",
      price: "Rp 500jt an",
      image: "/tci3-tipe-36.webp", // Taruh file di folder public/tci3-tipe-36.jpg
      href: "/produk/tci/tci-3/tipe-36",
    },
    {
      title: "Tipe 45",
      description: "Extra space for growing families with premium finishes.",
      price: "Rp 650jt an",
      image: "/tci3-tipe-45.webp", // Taruh file di folder public/tci3-tipe-45.jpg
      href: "/produk/tci/tci-3/tipe-45",
    },
    {
      title: "Tipe 50",
      description: "The ultimate expression of luxury and space for the elite.",
      price: "Rp 800jt an",
      image: "/tci3-tipe-50.webp", // Taruh file di folder public/tci3-tipe-50.jpg
      href: "/produk/tci/tci-3/tipe-50",
    },
  ];

  const nonClusterTypes = [
    {
      title: "Tipe 50",
      description: "Hunian non-cluster dengan tata ruang fungsional dan akses langsung untuk kenyamanan keluarga.",
      price: "Rp 800jt an",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      href: "/produk/tci/tci-3/non-cluster/tipe-50",
    },
  ];

  const rukoTypes = [
    {
      title: "Terranova Arcade",
      description: "The ultimate expression of luxury and space for the elite commercial activities.",
      price: "Rp 800jt an",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      href: "/produk/tci/tci-3/ruko/teranova",
    },
  ];

  const specRows = [
    {
      label: "Luas Tanah (LT)",
      t36: "72 m²",
      t45: "90 m²",
      t50: "120 m²",
    },
    {
      label: "Luas Bangunan (LB)",
      t36: "36 m²",
      t45: "45 m²",
      t50: "50 m²",
    },
    {
      label: "Kamar Tidur (KT)",
      t36: "2",
      t45: "2",
      t50: "2",
    },
    {
      label: "Kamar Mandi (KM)",
      t36: "1",
      t45: "1",
      t50: "1",
    },
  ];

  const strategicPoints = ["Gerbang Tol Kopo", "Mulia Wacana Kindergarten", "Rumah Sakit Umum Daerah Bandung Kiwari", "Pasar Cibiuk Moh. Toha"];

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">Taman Cibaduyut Indah 3</h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/50">
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

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">Konsep Hunian Modern & Masa Depan</h2>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Taman Cibaduyut Indah 3 menghadirkan standar baru dalam pengembangan kawasan hunian terpadu. Didesain dengan filosofi fleksibilitas ruang, setiap unit di TCI 3 memungkinkan penghuni untuk menyesuaikan tata letak seiring
                dengan perkembangan kebutuhan keluarga.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Future-Ready Design</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Users className="w-3.5 h-3.5" />
                  <span>Family Oriented</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>3 Tipe Eksklusif</span>
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Interior Ruang Tamu Modern Clean" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PILIH TIPE BANGUNAN */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">TIPE RUMAH</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Pilih Tipe Bangunan Anda</h2>

            <p className="text-sm text-[#6B7280]">Investasi cerdas untuk kenyamanan keluarga jangka panjang</p>

            {/* Tab Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("cluster")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "cluster" ? "bg-[#0B5EAA] text-white shadow-sm" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"}`}
              >
                Cluster
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("non-cluster")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "non-cluster" ? "bg-[#0B5EAA] text-white shadow-sm" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"}`}
              >
                Non-Cluster
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ruko")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "ruko" ? "bg-[#0B5EAA] text-white shadow-sm" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"}`}
              >
                Ruko
              </button>
            </div>
          </div>

          {/* Cards Display */}
          {activeTab === "cluster" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {rumahTypes.map((item) => (
                <div key={item.title} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow space-y-3">
                    <h3 className="text-lg font-semibold text-[#0B5EAA]">{item.title}</h3>

                    <p className="text-xs text-[#6B7280] leading-relaxed flex-grow">{item.description}</p>

                    <div className="pt-2">
                      <div className="text-[11px] text-[#6B7280]">Mulai dari</div>

                      <div className="text-base font-bold text-[#0B5EAA] mb-3">{item.price}</div>

                      <Link href={item.href} className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs font-regular bg-[#0B5EAA] text-white hover:bg-[#0A4F91] transition-colors">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "non-cluster" ? (
            <div className="max-w-sm mx-auto">
              {nonClusterTypes.map((item) => (
                <div key={item.title} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col">
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img src={item.image} alt={`${item.title} Non-Cluster`} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow space-y-3">
                    <h3 className="text-lg font-semibold text-[#0B5EAA]">{item.title}</h3>

                    <p className="text-xs text-[#6B7280] leading-relaxed flex-grow">{item.description}</p>

                    <div className="pt-2">
                      <div className="text-[11px] text-[#6B7280]">Mulai dari</div>

                      <div className="text-base font-bold text-[#0B5EAA] mb-3">{item.price}</div>

                      <Link href={item.href} className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs font-regular bg-[#0B5EAA] text-white hover:bg-[#0A4F91] transition-colors">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-sm mx-auto">
              {rukoTypes.map((item) => (
                <div key={item.title} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow space-y-3">
                    <h3 className="text-lg font-semibold text-[#0B5EAA]">{item.title}</h3>

                    <p className="text-xs text-[#6B7280] leading-relaxed flex-grow">{item.description}</p>

                    <div className="pt-2">
                      <div className="text-[11px] text-[#6B7280]">Mulai dari</div>

                      <div className="text-base font-bold text-[#0B5EAA] mb-3">{item.price}</div>

                      <Link href={item.href} className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs font-regular bg-[#0B5EAA] text-white hover:bg-[#0A4F91] transition-colors">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 — TABEL SPESIFIKASI */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">SPESIFIKASI</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Spesifikasi Unit</h2>
          </div>

          <div className="max-w-[900px] mx-auto rounded-xl overflow-x-auto border border-[#E5E7EB] bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-[#0B5EAA] text-white text-xs sm:text-sm font-semibold">
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6 text-center">Tipe 36</th>
                  <th className="py-4 px-6 text-center">Tipe 45</th>
                  <th className="py-4 px-6 text-center">Tipe 50</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                {specRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}>
                    <td className="py-4 px-6 font-semibold text-[#111827]">{row.label}</td>

                    <td className="py-4 px-6 text-center text-[#6B7280]">{row.t36}</td>

                    <td className="py-4 px-6 text-center text-[#6B7280]">{row.t45}</td>

                    <td className="py-4 px-6 text-center text-[#6B7280]">{row.t50}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5 — LOKASI */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">LOKASI KAMI</span>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Lokasi Strategis</h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">TCI 3 terletak di jantung area berkembang Cibaduyut, memberikan akses cepat ke pusat kota Bandung dan fasilitas umum utama.</p>

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.350894603069!2d107.59729969999998!3d-6.967866599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e8dfcd2b8919%3A0xb935531870acc41!2sTaman%20Cibaduyut%20Indah%20III%2C%20Cangkuang%20Kulon%2C%20Kec.%20Dayeuhkolot%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat%2040239!5e0!3m2!1sen!2sid!4v1787558768072!5m2!1sen!2sid"
                  title="Lokasi Taman Cibaduyut Indah III"
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

      {/* SECTION 6 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 3" />

      <CTABanner />
    </>
  );
}
