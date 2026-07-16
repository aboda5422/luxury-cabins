const SITE_URL = "https://luxurycabins.com.sa";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbSchema(
  items: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType,
    provider: {
      "@type": "LocalBusiness",
      name: "الكبائن الفاخرة",
      url: SITE_URL,
    },
    areaServed: (input.areaServed || ["SA"]).map((city) =>
      city.length <= 3
        ? { "@type": "Country", name: "Saudi Arabia" }
        : { "@type": "City", name: city },
    ),
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image ? absoluteUrl(input.image) : undefined,
    brand: {
      "@type": "Brand",
      name: input.brand || "Luxury Cabins",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(input.path),
      availability: "https://schema.org/InStock",
      priceCurrency: "SAR",
    },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
