import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: [
      "https://luxurycabins.com.sa/sitemap.xml",
      "https://luxurycabins.com.sa/sitemap-images.xml",
    ],
    host: "https://luxurycabins.com.sa",
  };
}
