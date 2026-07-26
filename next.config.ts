import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    /** Cache optimized /_next/image responses for 30 days */
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lyxbpebabwiicobkaohi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    const longCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];
    const imageOptimizerCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=2592000, stale-while-revalidate=86400",
      },
    ];
    return [
      { source: "/_next/image", headers: imageOptimizerCache },
      { source: "/_next/static/:path*", headers: longCache },
      { source: "/images/:path*", headers: longCache },
      { source: "/logo/:path*", headers: longCache },
      { source: "/uploads/:path*", headers: longCache },
      {
        source: "/:path*.(ico|png|jpg|jpeg|webp|avif|svg|woff|woff2|ttf|css|js)",
        headers: longCache,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/manufacturing/Readycommercial%20units",
        destination: "/manufacturing",
        permanent: true,
      },
      {
        source: "/manufacturing/Readycommercial units",
        destination: "/manufacturing",
        permanent: true,
      },
      {
        source: "/manufacturing/Readycommercial-units",
        destination: "/manufacturing",
        permanent: true,
      },
      // Legacy product ids → SEO slugs
      { source: "/manufacturing/houses", destination: "/manufacturing/ready-houses", permanent: true },
      { source: "/manufacturing/rooms", destination: "/manufacturing/ready-rooms", permanent: true },
      { source: "/manufacturing/offices", destination: "/manufacturing/portable-offices", permanent: true },
      // Removed products — keep old URLs from returning soft content
      { source: "/manufacturing/portable-cabins", destination: "/manufacturing", permanent: true },
      { source: "/manufacturing/guard-rooms", destination: "/manufacturing", permanent: true },
    ];
  },
};

export default nextConfig;
