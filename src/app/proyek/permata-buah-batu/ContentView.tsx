import HeroAvailability from "@/components/content/HeroAvailability";
import { ManagedImg, ManagedBackground } from "@/components/content/ManagedImages";
import ProjectActions from "@/components/content/ProjectActions";
import type { ContentBundle } from "@/lib/content/values";
import { availabilityFor } from "@/lib/content/availability";
import { Home as HomeIcon, MapPin, ShieldCheck, Trees } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function PermataBuahBatuPage({ content }: { content: ContentBundle }) {
  const text = (key: string) => content["permata-buah-batu"][key];

  const strategicPoints = [
    text("strategicPoints.0"),
    text("strategicPoints.1"),
    text("strategicPoints.2"),
    text("strategicPoints.3"),
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <ManagedBackground
          className="absolute inset-0 bg-cover bg-center opacity-35" src="/images/proyek/permata-buah-batu/permatabb-gate-banner.webp" />

        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">{text("hero.title")}</h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/50">
              <MapPin className="w-4 h-4 text-white" />
              <span>{text("hero.text")}</span>
            </div>
            <p className="text-sm sm:text-base text-[rgb(246,247,248)] line-clamp-2 leading-relaxed flex-grow">{text("hero.description")}</p>
            <ProjectActions values={content["permata-buah-batu"]} />
            <HeroAvailability status={availabilityFor(content, "permata-buah-batu")} />
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO KOMPLEK */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section2.text")}</span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">{text("section2.heading")}</h2>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{availabilityFor(content, "permata-buah-batu") === "sold_out" ? text("section2.description") : text("section2.description").replace(" Seluruh unit pada fase ini telah habis terjual.", "")}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>{text("section2.text2")}</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <Trees className="w-3.5 h-3.5" />
                  <span>{text("section2.text3")}</span>
                </span>

                <span className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold px-4 py-2 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{text("section2.text4")}</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                <ManagedImg
                  src="/images/proyek/permata-buah-batu/permatabuahbatu-detail.webp"
                  alt="Gerbang Permata Buah Batu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LOKASI */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section3.text")}</span>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">{text("section3.heading")}</h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">{text("section3.description")}</p>

              <ul className="space-y-3 pt-2">
                {strategicPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <MapPin className="w-4 h-4 text-[#0B5EAA] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#E5E7EB] bg-gray-100 shadow-sm">
                {text("location.embed") ? <iframe
                  src={text("location.embed")}
                  title="Lokasi Permata Buah Batu"
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

      {/* SECTION 4 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="Permata Buah Batu" />

      <CTABanner />
    </>
  );
}
