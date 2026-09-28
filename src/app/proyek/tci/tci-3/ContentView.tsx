"use client";
import { shortPrice } from "@/lib/content/values";
import ProjectActions from "@/components/content/ProjectActions";
import type { ContentBundle } from "@/lib/content/values";
import AvailabilityBadge from "@/components/content/AvailabilityBadge";
import { availabilityFor } from "@/lib/content/availability";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Zap, Users, Home as HomeIcon, ArrowRight } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function TCI3OverviewPage({ content }: { content: ContentBundle }) {
  const text = (key: string) => content["tci-3"][key];

  const [activeTab, setActiveTab] = useState<"cluster" | "non-cluster" | "ruko">("cluster");

  const rumahTypes = [
    {
      id: "tipe-36",
      title: content["tipe-36"]["card.title"],
      description: content["tipe-36"]["card.description"],
      price: shortPrice(content["tipe-36"]["price"]),
      image: "/images/proyek/tci/tci-3/cluster/tipe-36/tci3-tipe-36.webp",
      href: "/proyek/tci/tci-3/tipe-36",
    },
    {
      id: "tipe-45",
      title: content["tipe-45"]["card.title"],
      description: content["tipe-45"]["card.description"],
      price: shortPrice(content["tipe-45"]["price"]),
      image: "/images/proyek/tci/tci-3/cluster/tipe-45/Tipe45_Depannn.webp",
      href: "/proyek/tci/tci-3/tipe-45",
    },
    {
      id: "tipe-50",
      title: content["tipe-50"]["card.title"],
      description: content["tipe-50"]["card.description"],
      price: shortPrice(content["tipe-50"]["price"]),
      image: "/images/proyek/tci/tci-3/cluster/tipe-50/tci3-tipe-50.webp",
      href: "/proyek/tci/tci-3/tipe-50",
    },
  ];

  const nonClusterTypes = [
    {
      id: "non-cluster-50",
      title: content["non-cluster-50"]["card.title"],
      description: content["non-cluster-50"]["card.description"],
      price: shortPrice(content["non-cluster-50"]["price"]),
      image: "/images/proyek/tci/tci-3/non-cluster/tci3-t50-nc-detail.webp",
      href: "/proyek/tci/tci-3/non-cluster/tipe-50",
    },
  ];

  const rukoTypes = [
    {
      id: "teranova",
      title: content["teranova"]["card.title"],
      description: content["teranova"]["card.description"],
      price: shortPrice(content["teranova"]["price"]),
      image: "/images/proyek/tci/tci-3/ruko/tci3-ruko-ta-card.webp",
      href: "/proyek/tci/tci-3/ruko/teranova",
    },
  ];

  const specRows = [
    {
      label: "Luas Tanah (LT)",
      t36: content["tipe-36"]["specs.0.value"],
      t45: content["tipe-45"]["specs.0.value"],
      t50: content["tipe-50"]["specs.0.value"],
    },
    {
      label: "Luas Bangunan (LB)",
      t36: content["tipe-36"]["specs.1.value"],
      t45: content["tipe-45"]["specs.1.value"],
      t50: content["tipe-50"]["specs.1.value"],
    },
    {
      label: "Kamar Tidur (KT)",
      t36: content["tipe-36"]["specs.2.value"].replace(/\s+Kamar$/i, ""),
      t45: content["tipe-45"]["specs.2.value"].replace(/\s+Kamar$/i, ""),
      t50: content["tipe-50"]["specs.2.value"].replace(/\s+Kamar$/i, ""),
    },
    {
      label: "Kamar Mandi (KM)",
      t36: content["tipe-36"]["specs.3.value"].replace(/\s+Kamar$/i, ""),
      t45: content["tipe-45"]["specs.3.value"].replace(/\s+Kamar$/i, ""),
      t50: content["tipe-50"]["specs.3.value"].replace(/\s+Kamar$/i, ""),
    },
  ];

  const strategicPoints = [text("strategicPoints.0"), text("strategicPoints.1"), text("strategicPoints.2"), text("strategicPoints.3")];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: "url('/images/proyek/tci/tci-3/tci3-gate-banner.webp')",
          }}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">{text("hero.title")}</h1>
            <AvailabilityBadge status={availabilityFor(content, "tci-3")} />

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/50">
              <MapPin className="w-4 h-4 text-white" />
              <span>{text("hero.text")}</span>  
            </div>
            <p className="text-sm sm:text-base text-[rgb(246,247,248)] line-clamp-2 leading-relaxed flex-grow">{text("hero.description")}</p>
            <ProjectActions values={content["tci-3"]} />
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO KOMPLEK */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section2.text")}</span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">{text("section2.heading")}</h2>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{text("section2.description")}</p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{text("section2.text2")}</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Users className="w-3.5 h-3.5" />
                  <span>{text("section2.text3")}</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>{text("section2.text4")}</span>
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                <img src="/images/proyek/tci/tci-3/Rumah-TCI3.jpg" alt="Interior Ruang Tamu Modern Clean" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PILIH TIPE BANGUNAN */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section3.text")}</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">{text("section3.heading")}</h2>

            <p className="text-sm text-[#6B7280]">{text("section3.description")}</p>

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
                    <AvailabilityBadge placement="card" status={availabilityFor(content, item.id)} />
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
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img key={item.image} src={item.image} alt="Rumah merah TCI 3 Tipe 50 Non-Cluster" className="w-full h-full object-cover" />
                    <AvailabilityBadge placement="card" status={availabilityFor(content, item.id)} />
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
                    <img key={item.image} src={item.image} alt="Deretan ruko Terranova Arcade TCI 3" className="w-full h-full object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-500" />
                    <AvailabilityBadge placement="card" status={availabilityFor(content, item.id)} />
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

      {/* SECTION 4 — TABEL SPESIFIKASI RESPONSIVE */}
      {/* SECTION 4 — SPESIFIKASI (PAS DI HP TANPA SCROLL) */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section4.text")}</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">{text("section4.heading")}</h2>
          </div>

          <div className="max-w-[900px] mx-auto rounded-xl overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">
            {/* 
              - table-fixed: Memaksa tabel mengikuti persentase kolom yang ditentukan 
              - w-full: Memenuhi 100% lebar layar (tidak akan overflow)
            */}
            <table className="w-full table-fixed text-left border-collapse">
              <colgroup>
                {/* 
                  Kategori 34%, sisa 3 kolom masing-masing 22% 
                  Total = 100% (Muat sempurna di HP tanpa scroll)
                */}
                <col className="w-[34%] sm:w-[31%]" />
                <col className="w-[22%] sm:w-[23%]" />
                <col className="w-[22%] sm:w-[23%]" />
                <col className="w-[22%] sm:w-[23%]" />
              </colgroup>

              <thead>
                <tr className="bg-[#0B5EAA] text-white text-[11px] sm:text-sm font-semibold">
                  <th className="py-3 px-2 sm:py-4 sm:px-6">Kategori</th>
                  <th className="py-3 px-1.5 sm:py-4 sm:px-6 text-center">{content["tipe-36"]["card.title"]}</th>
                  <th className="py-3 px-1.5 sm:py-4 sm:px-6 text-center">{content["tipe-45"]["card.title"]}</th>
                  <th className="py-3 px-1.5 sm:py-4 sm:px-6 text-center">{content["tipe-50"]["card.title"]}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-[11px] sm:text-sm">
                {specRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}>
                    <td className="py-3 px-2 sm:py-4 sm:px-6 font-semibold text-[#111827] leading-tight break-words">{row.label}</td>
                    <td className="py-3 px-1.5 sm:py-4 sm:px-6 text-center text-[#6B7280]">{row.t36}</td>
                    <td className="py-3 px-1.5 sm:py-4 sm:px-6 text-center text-[#6B7280]">{row.t45}</td>
                    <td className="py-3 px-1.5 sm:py-4 sm:px-6 text-center text-[#6B7280]">{row.t50}</td>
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
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section5.text")}</span>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">{text("section5.heading")}</h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">{text("section5.description")}</p>

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
                {text("location.embed") ? <iframe
                  src={text("location.embed")}
                  title="Lokasi Taman Cibaduyut Indah III"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                /> : <div className="absolute inset-0 flex items-center justify-center p-6 text-sm text-gray-500">Peta belum tersedia.</div>}
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
