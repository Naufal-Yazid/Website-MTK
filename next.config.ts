import type { NextConfig } from "next";
import { resolveBuildInfo } from "./src/lib/build-info";

const buildInfo = resolveBuildInfo();

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  // Only non-secret release metadata. Values are frozen into the build.
  env: {
    MTK_BUILD_BRANCH: buildInfo.branch,
    MTK_BUILD_COMMIT: buildInfo.commit,
  },
  serverExternalPackages: ["@google-analytics/data"],
  async redirects() {
    return [
      {
        source: "/produk/:path*",
        destination: "/proyek/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
