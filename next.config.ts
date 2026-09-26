import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
