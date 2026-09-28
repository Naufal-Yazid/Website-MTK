"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const profileUrl = "https://www.instagram.com/marketing.mtk140/";

const instagramPosts = [
  {
    url: "https://www.instagram.com/reel/DbIcumQxjwA/",
    embedUrl: "https://www.instagram.com/reel/DbIcumQxjwA/embed/",
  },
  {
    url: "https://www.instagram.com/reel/DZertepzsuN/",
    embedUrl: "https://www.instagram.com/reel/DZertepzsuN/embed/",
  },
  {
    url: "https://www.instagram.com/reel/DddgQ6gETv3/",
    embedUrl: "https://www.instagram.com/reel/DddgQ6gETv3/embed/",
  },
];

export default function InstagramSection() {
  const [activePost, setActivePost] = useState(0);
  const currentPost = instagramPosts[activePost];

  const showPreviousPost = () => {
    setActivePost((current) =>
      current === 0 ? instagramPosts.length - 1 : current - 1,
    );
  };

  const showNextPost = () => {
    setActivePost((current) =>
      current === instagramPosts.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section
      className="border-t border-gray-100 bg-[#F9FAFB] py-20 md:py-24"
      aria-labelledby="social-media-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-5 lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0B5EAA]">
              SOCIAL MEDIA
            </span>

            <h2
              id="social-media-title"
              className="text-2xl font-bold leading-tight text-[#111827] sm:text-3xl lg:text-4xl"
            >
              Lebih Dekat dengan Marga Tirta Kencana
            </h2>

            <p className="text-sm leading-relaxed text-[#6B7280] sm:text-base">
              Ikuti informasi hunian, kabar proyek, dan aktivitas kami melalui
              Instagram. Temukan inspirasi untuk rumah impian Anda bersama kami.
            </p>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B5EAA] transition-colors hover:text-[#084C8A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B5EAA]"
            >
              @marketing.mtk140
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="min-w-0 lg:col-span-6">
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
              <div className="border-b border-[#E5E7EB] px-5 py-4 sm:px-6">
                <p className="text-sm font-semibold text-[#111827]">
                  Instagram Marga Tirta Kencana
                </p>
              </div>

              <div
                className="flex items-center justify-center bg-[#FAFAFA] p-3 sm:p-4"
                aria-live="polite"
              >
                <iframe
                  key={currentPost.embedUrl}
                  src={currentPost.embedUrl}
                  title={`Postingan Instagram ${activePost + 1} dari ${instagramPosts.length}`}
                  className="block h-[510px] w-full min-w-0 max-w-[460px] rounded-xl border-0 bg-white sm:h-[530px]"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={showPreviousPost}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#374151] transition-colors hover:border-[#0B5EAA] hover:bg-[#EFF6FF] hover:text-[#0B5EAA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5EAA]"
                  aria-label="Lihat postingan Instagram sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-2" aria-hidden="true">
                  {instagramPosts.map((post, index) => (
                    <span
                      key={post.url}
                      className={`h-2 rounded-full transition-all ${
                        index === activePost
                          ? "w-6 bg-[#0B5EAA]"
                          : "w-2 bg-[#D1D5DB]"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={showNextPost}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#374151] transition-colors hover:border-[#0B5EAA] hover:bg-[#EFF6FF] hover:text-[#0B5EAA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5EAA]"
                  aria-label="Lihat postingan Instagram berikutnya"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-[#E5E7EB] px-5 py-4 text-center">
                <a
                  href={currentPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B5EAA] transition-colors hover:text-[#084C8A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B5EAA]"
                >
                  Lihat postingan di Instagram
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
