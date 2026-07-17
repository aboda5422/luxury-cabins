import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lyxbpebabwiicobkaohi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  poweredByHeader: false,
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
