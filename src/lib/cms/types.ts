export type NavLink = { href: string; label: string };

export type ServiceItem = {
  id: string;
  title: string;
  short: string;
  href: string;
  image: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type CatalogProduct = {
  id: string;
  /** SEO-friendly URL segment; falls back to id when empty */
  slug?: string;
  title: string;
  shortDescription: string;
  description: string;
  priceLabel: string;
  priceNote: string;
  specs: string[];
  images: string[];
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  seoKeywords?: string[];
};

export type RentalCategory = {
  id: string;
  /** SEO-friendly URL segment; falls back to id when empty */
  slug?: string;
  title: string;
  shortDescription: string;
  description: string;
  specs: string[];
  images: string[];
  whatsappMessage: string;
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  seoKeywords?: string[];
};

export type ProjectItem = {
  title: string;
  location: string;
  category: string;
  image: string;
};

export type ClientItem = {
  name: string;
  nameEn: string;
  sector: string;
  logo?: string;
};

export type ServiceCity = {
  slug: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  priority: "primary" | "secondary";
  heroImage?: string;
};

export type FaqItem = { q: string; a: string };

export type StatItem = { value: string; label: string };

export type SiteInfo = {
  nameAr: string;
  nameEn: string;
  legalName: string;
  commercialRegister: string;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  addressDetail: string;
  cities: ServiceCity[];
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
};

export type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroImage: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesTitleLine2: string;
  manufacturingBandTitle: string;
  manufacturingBandText: string;
  visionTitle: string;
  visionBody: string;
  visionCta: string;
  visionImage: string;
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  ctaBandTitle: string;
  ctaBandButton: string;
};

export type PageHeroImages = {
  services: string;
  about: string;
  rental: string;
  manufacturing: string;
  projects: string;
  contact: string;
  faq: string;
  locations: string;
};

export type CmsData = {
  site: SiteInfo;
  navLinks: NavLink[];
  home: HomeContent;
  pageHeroImages: PageHeroImages;
  services: ServiceItem[];
  processSteps: ProcessStep[];
  catalogProducts: CatalogProduct[];
  rentalCategories: RentalCategory[];
  manufacturingExtras: string[];
  projects: ProjectItem[];
  sampleClients: ClientItem[];
  faqs: FaqItem[];
  aboutStats: StatItem[];
  about: {
    heroTitle: string;
    heroDescription: string;
    whoTitle: string;
    whoBody1: string;
    whoBody2: string;
    sideImage: string;
    visionTitle: string;
    visionBody: string;
    missionTitle: string;
    missionBody: string;
    valuesTitle: string;
    values: string[];
  };
  rentalPage: {
    seoTitle?: string;
    seoDescription?: string;
    h1?: string;
    seoKeywords?: string[];
    heroDescription: string;
    sectionTitle: string;
    sectionBody: string;
    bullets: string[];
    catalogTitle: string;
    catalogBody: string;
    ctaTitle: string;
    ctaBody: string;
  };
  manufacturingPage: {
    heroTitle: string;
    heroDescription: string;
    introEyebrow: string;
    introTitle: string;
    introBody: string;
    introImage: string;
    highlights: string[];
    catalogEyebrow: string;
    catalogBadge: string;
    catalogTitle: string;
    catalogBody: string;
    extrasEyebrow: string;
    extrasTitle: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
  };
  contactPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    formTitle: string;
    mapEmbedUrl: string;
  };
  footer: {
    servicesTitle: string;
    companyTitle: string;
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    serviceLinks: NavLink[];
    companyLinks: NavLink[];
  };
  updatedAt: string;
};

export type AnalyticsDay = {
  date: string;
  views: number;
  visitors: number;
};

export type AnalyticsData = {
  totalViews: number;
  totalVisitors: number;
  pages: Record<string, number>;
  daily: AnalyticsDay[];
  recent: { path: string; at: string; visitorId: string }[];
};
