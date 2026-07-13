import type { CmsData } from "@/lib/cms/types";

/** English marketing overlay applied on top of live CMS when locale is `en`. */
export const enCmsOverlay: DeepPartial<CmsData> = {
  site: {
    tagline: "Rental · Sales · Manufacturing of mobile units",
    description:
      "A Saudi company specializing in rental, sales, and manufacturing of cabins and mobile units — serving all regions of the Kingdom with focus on major cities.",
    address: "Riyadh, Kingdom of Saudi Arabia",
    addressDetail: "Riyadh - Riyadh",
    cities: [
      "Riyadh",
      "Jeddah",
      "Makkah",
      "Madinah",
      "Dammam",
      "Khobar",
      "Jubail",
      "Tabuk",
      "Abha",
      "Qassim",
      "Hail",
    ],
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/rental", label: "Rental" },
    { href: "/manufacturing", label: "Sales & Manufacturing" },
    { href: "/projects", label: "Projects" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  home: {
    heroTitle: "Leading in rental, sales, and manufacturing of mobile units",
    heroSubtitle: "Mobile units · European tents · Custom manufacturing",
    heroCta: "Explore our solutions",
    heroImage: "/images/cover-hero.webp",
    servicesEyebrow: "Integrated solutions",
    servicesTitle: "Integrated solutions for manufacturing, sales, and rental of mobile units",
    servicesTitleLine2: "(Mobile units – European tents)",
    manufacturingBandTitle: "Sales & manufacturing",
    manufacturingBandText: "Ready-to-own units and custom manufacturing to specs",
    visionTitle: "Our vision..",
    visionBody:
      "Our vision is to be the leading provider of mobile unit solutions through rental, sales, and manufacturing in Saudi Arabia. We are known for quality and innovation — delivering professional-grade units, not cheap alternatives — while expanding to serve clients and ensure project success.",
    visionCta: "Contact us now",
    visionImage: "/images/vision-side.jpg",
    processEyebrow: "A professional methodology… executed to world-class standards",
    processTitle: "Your project delivery journey",
    processSubtitle:
      "A professional delivery system that ensures quality, accuracy, and commitment at every stage.",
    contactTitle: "Contact us now",
    contactSubtitle:
      "Our specialist team puts its expertise at your service — professional solutions that meet your project needs to the highest quality standards.",
    ctaBandTitle: "Let's build a project that meets the highest standards of quality and excellence.",
    ctaBandButton: "Contact us now",
  },
  services: [
    {
      id: "toilets",
      title: "Mobile toilets",
      short: "Multiple options and sizes of mobile toilets for projects and events.",
    },
    {
      id: "offices",
      title: "Mobile offices & rooms",
      short: "Practical, professional finish offices and multi-use rooms.",
    },
    {
      id: "other",
      title: "Other services",
      short: "Supporting logistics services for site and project operations.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Free consultation",
      description: "We define your needs and recommend the best rental, sales, or manufacturing solution.",
    },
    {
      step: "02",
      title: "Get a budget estimate",
      description: "A clear proposal covering specs, timeline, and cost — no surprises.",
    },
    {
      step: "03",
      title: "Project delivery",
      description: "Execution, supply, and installation with commitment to schedule and quality.",
    },
  ],
  catalogProducts: [
    {
      id: "houses",
      title: "Ready houses",
      shortDescription:
        "Ready annexes and rest houses with steel structure and insulation, optional kitchen and bathroom.",
      description:
        "Custom annexes and rest houses with reinforced steel structure and insulated walls, with optional bathroom or kitchen and on-site installation in the shortest time.",
      priceLabel: "Request a quote",
      priceNote: "Based on area and finish — starting approx. from SAR 650 / m²",
      specs: [
        "Steel structure + thermal insulation",
        "Wood interior / aluminum exterior finish",
        "Optional kitchen and bathroom",
      ],
    },
    {
      id: "rooms",
      title: "Ready rooms",
      shortDescription: "Rooms in all sizes — economical, easy to transport and install for living or work.",
      description:
        "Rooms in all sizes, more cost-effective than traditional buildings, easy to move and install, and fire-resistant for living or work use.",
      priceLabel: "Request a quote",
      priceNote: "Based on size and specs — starting approx. from SAR 500",
      specs: ["Multiple sizes on demand", "Thermal and acoustic insulation", "Fast transport & installation"],
    },
    {
      id: "barracks",
      title: "Portable barracks",
      shortDescription: "Barracks with thermal/acoustic insulation and utilities, easy to dismantle and reinstall.",
      description:
        "Barracks with thermal and acoustic insulation, power and water networks, rust-resistant materials, and easy dismantling for relocation.",
      priceLabel: "Request a quote",
      priceNote: "Based on type and location — starting approx. from SAR 499",
      specs: ["Thermal and acoustic insulation", "Power and water networks", "Easy dismantling and transport"],
    },
    {
      id: "caravans",
      title: "Caravans",
      shortDescription: "Towable and fixed caravans customized to size, supplied across the Kingdom.",
      description:
        "Towable and fixed caravans detailed to your specs and sizes, with manufacturing and supply across Saudi Arabia for housing, camping, and site use.",
      priceLabel: "Request a quote",
      priceNote: "Based on size and fit-out — starting approx. from SAR 14,000",
      specs: ["Towable or fixed on demand", "Power and water fit-out", "Custom sizing"],
    },
    {
      id: "offices",
      title: "Ready offices",
      shortDescription: "Offices for companies and projects with practical finish and fast on-site installation.",
      description:
        "Ready offices for companies and real-estate/engineering projects, with finishes suited to work environments and fast installation.",
      priceLabel: "Request a quote",
      priceNote: "Based on area and finish",
      specs: ["Practical workplace finish", "Fast on-site installation", "Project-based sizes"],
    },
  ],
  rentalCategories: [
    {
      id: "mobile-units",
      title: "Mobile units",
      shortDescription:
        "Premium container units ready to operate: toilets, offices, rooms, and facilities for projects and events.",
      description:
        "We provide mobile units with modern finishes and practical lighting, in multiple sizes and uses — from construction sites to private events — with supply, installation, and support during the rental period.",
      specs: [
        "Toilets, offices, and operating rooms",
        "Premium finish with indoor/outdoor lighting",
        "Supply and installation by project location",
        "Flexible contracts by duration",
      ],
      whatsappMessage: "Hello, I would like to inquire about renting mobile units.",
    },
    {
      id: "european-tents",
      title: "European tents",
      shortDescription:
        "Premium European tents for events, exhibitions, and occasions — elegant look with flexible capacity.",
      description:
        "European tents with durable structures and finishes fitting formal and private events: weddings, exhibitions, corporate events, and celebrations. Flexible sizes and extra equipment with on-site installation.",
      specs: [
        "Ideal for events, exhibitions, and occasions",
        "Durable structures with elegant European design",
        "Customizable capacity by attendance",
        "Professional on-site install and dismantle",
      ],
      whatsappMessage: "Hello, I would like to inquire about renting European tents.",
    },
  ],
  manufacturingExtras: [
    "Real-estate offices",
    "Workers housing",
    "Guard rooms",
    "Driver / domestic staff rooms",
    "Farms and farm-worker housing",
    "Camps",
    "Mosques",
    "Warehouses and hangars",
    "Majlis and bedrooms",
    "Real-estate and engineering projects",
  ],
  projects: [
    {
      title: "Supply of operating units for a field site",
      location: "Riyadh",
      category: "Rental",
    },
    {
      title: "Supply of mobile toilets",
      location: "Jeddah",
      category: "Rental",
    },
    {
      title: "Mobile offices and rooms for a project",
      location: "Dammam",
      category: "Rental",
    },
    {
      title: "Logistics units and support services",
      location: "Jubail",
      category: "Services",
    },
    {
      title: "Manufacturing ready rooms",
      location: "Riyadh",
      category: "Manufacturing",
    },
    {
      title: "Sale of barracks and ready offices",
      location: "Khobar",
      category: "Sales",
    },
  ],
  sampleClients: [
    { name: "Aramco", sector: "Oil & Energy" },
    { name: "SABIC", sector: "Petrochemicals" },
    { name: "Ma'aden", sector: "Mining" },
    { name: "NEOM", sector: "Giga projects" },
    { name: "Red Sea Global", sector: "Tourism" },
    { name: "Qiddiya", sector: "Entertainment" },
    { name: "stc", sector: "Telecom" },
    { name: "ACWA Power", sector: "Energy" },
  ],
  faqs: [
    {
      q: "Do you cover all regions of the Kingdom?",
      a: "Yes. We serve all regions of Saudi Arabia with special focus on major cities such as Riyadh, Jeddah, Dammam, Jubail, and more.",
    },
    {
      q: "What is the difference between rental, sales, and manufacturing?",
      a: "Rental suits temporary needs. Sales covers ready-to-own units. Manufacturing produces units to your custom specifications.",
    },
    {
      q: "Can you manufacture a unit to our specs?",
      a: "Absolutely. We design and manufacture to the size, finish, insulation, and utilities your project needs.",
    },
    {
      q: "What is the expected supply or installation timeline?",
      a: "It depends on unit type, quantities, and location. After consultation we provide a clear schedule in the proposal.",
    },
    {
      q: "Do you offer consultation and budget estimates?",
      a: "Yes. We provide an initial consultation and estimate to help you decide quickly and clearly.",
    },
    {
      q: "How can we contact you?",
      a: "Via the contact form, WhatsApp, phone, or email. Our team is ready to answer your inquiries.",
    },
  ],
  aboutStats: [
    { value: "100%", label: "Quality commitment" },
    { value: "All regions", label: "Kingdom coverage" },
    { value: "3", label: "Integrated services" },
    { value: "24/7", label: "Support & contact" },
  ],
  about: {
    heroTitle: "Quality work from a committed professional team",
    heroDescription:
      "Luxury Cabins General Contracting is a Saudi company specialized in logistics solutions and mobile units: rental, sales, and manufacturing.",
    whoTitle: "The name trusted by major projects for mobile unit solutions.",
    whoBody1:
      "We deliver high-quality mobile unit solutions that support operational efficiency on construction sites, industrial locations, and events. We do not pursue cheap options — we deliver durable, professional solutions.",
    whoBody2: "Trade name: الكبائن الفاخرة | Luxury Cabins",
    visionTitle: "Our vision",
    visionBody:
      "To be the leading company in mobile unit solutions, rental, and manufacturing in Saudi Arabia — with lasting commitment to quality, innovation, and client service in every city.",
    missionTitle: "Our mission",
    missionBody:
      "Deliver the highest quality in rental, sales, and manufacturing with fast, reliable service and customizable options that meet every project's needs and boost operational efficiency.",
    valuesTitle: "Our values",
    values: [
      "Accuracy in execution and deadlines",
      "Quality above all",
      "Transparency in proposals and dealings",
      "Innovation in solutions",
      "Professional customer service",
      "Scalability as your business grows",
    ],
  },
  rentalPage: {
    heroDescription:
      "Flexible rental solutions for projects and events with efficiency and reliability — serving all needs and occasions.",
    sectionTitle:
      "Flexible rental solutions for projects and events with efficiency and reliability — serving all needs and occasions.",
    sectionBody:
      "Practical and elegant rental solutions for projects, events, and private occasions: from ready-to-operate mobile units to premium European tents — with logistics support, supply, and installation in major cities.",
    bullets: [
      "Coverage for projects, events, and occasions",
      "On-site supply and installation",
      "Flexible contracts by duration",
      "Fast contact via WhatsApp",
    ],
    catalogTitle: "Choose the optimal solution for your project",
    catalogBody: "Mobile units or European tents — contact us on WhatsApp for a quote.",
    ctaTitle: "Contact us on WhatsApp for a rental quote",
    ctaBody: "Tell us the unit/tent type, location, and duration — we will respond with a clear quote quickly.",
  },
  manufacturingPage: {
    heroTitle: "Sales & manufacturing of ready units",
    heroDescription:
      "Ready-to-own units and custom manufacturing by size and specs — houses, rooms, barracks, caravans, and offices.",
    introEyebrow: "Integrated solutions",
    introTitle: "Solutions tailored to your project requirements and technical specs.",
    introBody:
      "Choose a ready-to-own unit, or request custom manufacturing with optional on-site installation.",
    highlights: ["Quality materials and finish", "Custom sizing", "On-time commitment"],
    catalogEyebrow: "Our products",
    catalogBadge: "Installation & supply by agreement",
    catalogTitle: "Ready houses, rooms, barracks, and caravans",
    catalogBody: "Browse products, review details, and request a quote that fits your needs with ease.",
    extrasEyebrow: "Additional uses",
    extrasTitle: "We cover diverse needs based on project nature",
    ctaEyebrow: "Request a quote",
    ctaTitle: "Buy ready or manufacture to order",
    ctaBody: "Send your requirements and we will respond with a clear sales or manufacturing quote.",
  },
  footer: {
    servicesTitle: "Services",
    companyTitle: "Company",
    newsletterTitle: "Newsletter",
    newsletterBody: "Subscribe for the latest offers and services.",
    newsletterPlaceholder: "Email address",
    newsletterButton: "Subscribe",
    serviceLinks: [
      { href: "/rental", label: "Mobile unit rental" },
      { href: "/rental", label: "European tents" },
      { href: "/manufacturing", label: "Sales & manufacturing" },
      { href: "/projects", label: "Projects" },
    ],
    companyLinks: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/projects", label: "Latest work" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};
