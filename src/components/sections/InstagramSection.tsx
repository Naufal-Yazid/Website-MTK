const profileUrl = "https://www.instagram.com/marketing.mtk140/";

export default function InstagramSection() {
  return (
    <section
      className="bg-[#F9FAFB] py-20 md:py-24 border-t border-gray-100"
      aria-labelledby="social-media-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
              SOCIAL MEDIA
            </span>

            <h2
              id="social-media-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] leading-tight"
            >
              Lebih Dekat dengan Marga Tirta Kencana
            </h2>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Ikuti informasi hunian, kabar proyek, dan aktivitas kami melalui
              Instagram. Temukan inspirasi untuk rumah impian Anda bersama kami.
            </p>
          </div>

          <div className="lg:col-span-6 min-w-0">
            <div className="max-w-[540px] mx-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-10 shadow-sm text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EFF6FF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 text-[#0B5EAA]"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-[#111827]">
                Marga Tirta Kencana
              </h3>

              <p className="mt-2 text-sm text-[#0B5EAA] break-all">
                @marketing.mtk140
              </p>

              <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
                Lihat foto, video, dan informasi terbaru kami langsung di
                Instagram.
              </p>

              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B5EAA] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A4F91] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B5EAA]"
              >
                Kunjungi Instagram

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}