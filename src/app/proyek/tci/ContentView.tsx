import HeroAvailability from "@/components/content/HeroAvailability";
import { ManagedImg, ManagedBackground } from "@/components/content/ManagedImages";
import ProjectActions from "@/components/content/ProjectActions";
import type { ContentBundle } from "@/lib/content/values";
import AvailabilityBadge from "@/components/content/AvailabilityBadge";
import { availabilityFor } from "@/lib/content/availability";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import CTABanner from "@/components/layout/CTABanner";
import InquiryForm from "@/components/sections/InquiryForm";

export default function TCIOverviewPage({ content }: { content: ContentBundle }) {
  const text = (key: string) => content["tci"][key];

  const phases = [
    {
      id: "tci-1",
      image: "/images/proyek/tci/tci-1/tci1-gate.webp",
      title: content["tci-1"]["hero.title"],
      description: content["tci-1"]["card.description"],
      buttonClass: "bg-[#0B5EAA] text-white hover:bg-[#0A4F91]",
      href: "/proyek/tci/tci-1",
    },
    {
      id: "tci-2",
      image: "/images/proyek/tci/tci-2/gerbangTCI2_HeroBanner.webp",
      title: content["tci-2"]["hero.title"],
      description: content["tci-2"]["card.description"],
      buttonClass: "bg-[#0B5EAA] text-white hover:bg-[#0A4F91]",
      href: "/proyek/tci/tci-2",
    },
    {
      id: "tci-3",
      image: "/images/proyek/tci/tci-3/tci3-gate-banner.webp",
      title: content["tci-3"]["hero.title"],
      description: content["tci-3"]["card.description"],
      buttonClass: "bg-[#0B5EAA] text-white hover:bg-[#0A4F91]",
      href: "/proyek/tci/tci-3",
    },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-end justify-start bg-[#0D1B2A] overflow-hidden">
        <ManagedBackground
          className="absolute inset-0 bg-cover bg-center opacity-35" src="/images/proyek/tci/tci-icon-banner.webp" />
        <div className="absolute inset-0 bg-[#0D1B2A]/65" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">{text("hero.title")}</h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-white/50">
              <MapPin className="w-4 h-4 text-white" />
              <span>{text("hero.text")}</span>
            </div>

            <p className="text-sm sm:text-base text-[rgb(246,247,248)] line-clamp-2 leading-relaxed flex-grow">{text("hero.description")}</p>
            <ProjectActions values={content["tci"]} />
            <HeroAvailability status={availabilityFor(content, "tci")} />
          </div>
        </div>
      </section>

      {/* SECTION 2 — VISI KAWASAN */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section2.text")}</span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827]">{text("section2.heading")}</h2>

              <div className="space-y-4 text-sm sm:text-base text-[#6B7280] leading-relaxed text-justify">
                <p>{text("section2.description")}</p>

                <p>{text("section2.description2")}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="border-l-3 border-[#0B5EAA] pl-4">
                  <div className="text-2xl sm:text-2xl font-bold text-[#0B5EAA]">{text("section2.text2")}</div>

                  <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider mt-0.5">{text("section2.text3")}</div>
                </div>

                <div className="border-l-3 border-[#0B5EAA] pl-4">
                  <div className="text-2xl sm:text-2xl font-bold text-[#0B5EAA]">{text("section2.text4")}</div>

                  <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider mt-0.5">{text("section2.text5")}</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-gray-100">
                <ManagedImg src="/images/proyek/tci/KantorPemasaran_TCI.jpg" alt="Interior Mewah Ruang Tamu" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — EKSPLORASI FASE */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">{text("section3.text")}</span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">{text("section3.heading")}</h2>

            <p className="text-sm text-[#6B7280]">{text("section3.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {phases.map((phase) => (
              <div key={phase.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col">
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <ManagedImg src={phase.image} alt={phase.title} className="w-full h-full object-cover" />
                  <AvailabilityBadge placement="card" status={availabilityFor(content, phase.id)} />

                </div>

                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <h3 className="text-lg font-semibold text-[#111827]">{phase.title}</h3>

                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed flex-grow">{phase.description}</p>

                  <div className="pt-2">
                    <Link href={phase.href} className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${phase.buttonClass}`}>
                      <span>Lihat Komplek</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FORMULIR INQUIRY */}
      <InquiryForm defaultProyek="TCI 1" />

      <CTABanner />
    </>
  );
}
