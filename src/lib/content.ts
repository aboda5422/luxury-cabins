export const services = [
  {
    id: "sales-manufacturing",
    title: "البيع والتصنيع",
    short:
      "وحدات جاهزة للتمليك وتصنيع حسب المقاسات والمواصفات: بيوت وغرف وبركسات وكرفانات ومكاتب.",
    href: "/manufacturing",
    image: "/images/cms/portable-cabin-sales-manufacturing.webp",
  },
  {
    id: "mobile-units",
    title: "إيجار الوحدات المتنقلة",
    short:
      "وحدات متنقلة فاخرة جاهزة للتشغيل للمشاريع والفعاليات — مع توريد وتركيب ودعم أثناء فترة التأجير.",
    href: "/rental#mobile-units",
    image: "/images/cms/portable-cabin-rental-units.webp",
  },
  {
    id: "european-tents",
    title: "إيجار الخيام الأوروبية",
    short:
      "خيام أوروبية أنيقة للمناسبات والمعارض والفعاليات — مساحات مرنة وتركيب احترافي في الموقع.",
    href: "/rental#european-tents",
    image: "/images/cms/european-event-tent-rental.webp",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "استشارات مجانية",
    description: "نحدد احتياج مشروعك ونقترح الحل الأنسب من التأجير أو البيع أو التصنيع.",
  },
  {
    step: "02",
    title: "احصل على الميزانية التقديرية",
    description: "عرض واضح يشمل المواصفات والمدة والتكلفة دون مفاجآت.",
  },
  {
    step: "03",
    title: "إنتاج المشروع",
    description: "تنفيذ وتوريد وتركيب مع التزام بالمواعيد والجودة.",
  },
] as const;

export const whyUs = [
  {
    title: "جودة تصنيع عالية",
    description: "مواد متينة وعزل حراري وتشطيب يليق بالمشاريع الاحترافية.",
  },
  {
    title: "تغطية على مستوى المملكة",
    description: "خدمة تمتد لجميع المناطق مع أولوية للمدن الرئيسية.",
  },
  {
    title: "سرعة ودقة في التنفيذ",
    description: "تخطيط واضح والتزام بالمواعيد من الاستشارة حتى التسليم.",
  },
  {
    title: "تأجير وبيع وتصنيع",
    description: "ثلاث خدمات متكاملة تلبي احتياجك سواء كان مؤقتاً أو دائماً.",
  },
] as const;

export const catalogProducts = [
  {
    id: "houses",
    slug: "ready-houses",
    title: "بيوت جاهزة",
    seoTitle: "تصنيع بيوت جاهزة فاخرة في السعودية",
    h1: "تصنيع بيوت جاهزة فاخرة في السعودية",
    seoDescription:
      "تصنيع وبيع بيوت جاهزة وملاحق واستراحات بهيكل حديدي وعزل حراري في الرياض وجميع مناطق المملكة.",
    seoKeywords: ["بيوت جاهزة", "ملاحق جاهزة", "تصنيع بيوت جاهزة", "كبائن سكنية"],
    shortDescription:
      "ملاحق واستراحات جاهزة بهيكل حديدي وعزل، مع إمكانية مطبخ ودورة مياه حسب الطلب.",
    description:
      "بناء وتفصيل الملاحق والاستراحات بهيكل حديدي مدعم وجدار عازل، مع إمكانية إضافة دورة مياه أو مطبخ حسب الطلب والتركيب في الموقع خلال أقصر مدة.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب المساحة والتشطيب — يبدأ تقريباً من 650 ر.س / م²",
    specs: [
      "هيكل حديدي + عازل حراري",
      "تشطيب داخلي خشبي وخارجي ألمنيوم",
      "إمكانية مطبخ ودورة مياه",
    ],
    images: [
      "/images/products/ready-luxury-house-cabin-01.webp",
      "/images/products/ready-luxury-house-cabin-02.webp",
      "/images/products/ready-luxury-house-cabin-03.webp",
      "/images/products/ready-luxury-house-cabin-04.webp",
    ],
  },
  {
    id: "rooms",
    slug: "ready-rooms",
    title: "غرف جاهزة",
    seoTitle: "غرف جاهزة ومتنقلة بمواصفات عالية في السعودية",
    h1: "غرف جاهزة ومتنقلة بمواصفات عالية",
    seoDescription:
      "تصنيع غرف جاهزة بجميع الأحجام للسكن والعمل، عزل حراري وتركيب سريع في الرياض ومدن المملكة.",
    seoKeywords: ["غرف جاهزة", "غرف سندوتش بانل", "تصنيع غرف جاهزة"],
    shortDescription:
      "غرف بجميع الأحجام، اقتصادية وسهلة النقل والتركيب للسكن أو العمل.",
    description:
      "غرف بجميع المساحات والأحجام، بتكلفة أقل من المباني التقليدية، سهلة النقل والتركيب، ومقاومة للحريق لتناسب السكن أو العمل.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب المقاس والمواصفات — يبدأ تقريباً من 500 ر.س",
    specs: [
      "مقاسات متعددة حسب الطلب",
      "عزل حراري وصوتي",
      "نقل وتركيب سريع",
    ],
    images: [
      "/images/products/portable-ready-room-01.webp",
      "/images/products/portable-ready-room-02.webp",
      "/images/products/portable-ready-room-03.webp",
      "/images/products/portable-ready-room-04.webp",
    ],
  },
  {
    id: "barracks",
    slug: "barracks",
    title: "بركسات",
    seoTitle: "تصنيع وتفصيل بركسات جاهزة في السعودية",
    h1: "تصنيع وتفصيل بركسات جاهزة في السعودية",
    seoDescription:
      "تصنيع بركسات بعوازل حرارية وصوتية وشبكات كهرباء ومياه مع فك وتركيب سهل لجميع المناطق.",
    seoKeywords: ["بركسات", "تفصيل بركسات", "بركسات جاهزة", "سكن عمال"],
    shortDescription:
      "بركسات بعوازل حرارية وصوتية وشبكات كهرباء ومياه مع فك وتركيب سهل.",
    description:
      "بركسات بعوازل حرارية وصوتية وشبكات كهرباء ومياه، من مواد مانعة للصدأ، مع خاصية الفك والتركيب لسهولة النقل بين المواقع.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب النوع والموقع — يبدأ تقريباً من 499 ر.س",
    specs: [
      "عوازل حرارية وصوتية",
      "شبكات كهرباء ومياه",
      "فك وتركيب ونقل سهل",
    ],
    images: [
      "/images/products/insulated-worker-barracks-01.webp",
      "/images/products/insulated-worker-barracks-02.webp",
      "/images/products/insulated-worker-barracks-03.webp",
      "/images/products/insulated-worker-barracks-04.webp",
    ],
  },
  {
    id: "caravans",
    slug: "caravans",
    title: "كرفانات",
    seoTitle: "تصنيع كرفانات سحب ومجهزة في السعودية",
    h1: "تصنيع كرفانات سحب ومجهزة في السعودية",
    seoDescription:
      "تفصيل وتصنيع كرفانات سحب وثابتة للمخيمات والمواقع مع توريد لمختلف مناطق المملكة.",
    seoKeywords: ["كرفانات", "تصنيع كرفانات", "كرفانات سحب", "تأجير كرفانات"],
    shortDescription:
      "كرفانات سحب وثابتة تُفصَّل حسب المقاسات مع توريد لمختلف مناطق المملكة.",
    description:
      "تفصيل كرفانات السحب والثابتة حسب المواصفات والمقاسات، مع تنفيذ وتوريد لمختلف مناطق المملكة واستخدامات السكن والتخييم والمواقع.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب الحجم والتجهيز — يبدأ تقريباً من 14,000 ر.س",
    specs: [
      "سحب أو ثابت حسب الطلب",
      "تجهيز كهرباء ومياه",
      "تصنيع حسب المقاس",
    ],
    images: [
      "/images/products/towable-caravan-cabin-01.webp",
      "/images/products/towable-caravan-cabin-02.webp",
      "/images/products/towable-caravan-cabin-03.webp",
      "/images/products/towable-caravan-cabin-04.webp",
    ],
  },
  {
    id: "offices",
    slug: "portable-offices",
    title: "مكاتب جاهزة",
    seoTitle: "مكاتب متنقلة وجاهزة للمشاريع في السعودية",
    h1: "مكاتب متنقلة وجاهزة للمشاريع في السعودية",
    seoDescription:
      "تصنيع مكاتب جاهزة ومتنقلة للشركات والمشاريع الهندسية والعقارية مع تركيب سريع في الموقع.",
    seoKeywords: ["مكاتب متنقلة", "مكاتب جاهزة", "مكاتب مهندسين", "كبائن مكاتب"],
    shortDescription:
      "مكاتب للشركات والمشاريع بتشطيب عملي وتركيب سريع في الموقع.",
    description:
      "مكاتب جاهزة للشركات والمشاريع العقارية والهندسية، بتشطيب يناسب بيئة العمل وسرعة تركيب في الموقع.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب المساحة والتشطيب",
    specs: [
      "تشطيب عملي لبيئة العمل",
      "تركيب سريع في الموقع",
      "مقاسات حسب المشروع",
    ],
    images: [
      "/images/products/portable-site-office-01.webp",
      "/images/products/portable-site-office-02.webp",
      "/images/products/portable-site-office-03.webp",
      "/images/products/portable-site-office-04.webp",
    ],
  },
] as const;

export function getCatalogProduct(id: string) {
  return catalogProducts.find((p) => p.id === id);
}

export const manufacturingExtras = [
  "المكاتب العقارية",
  "سكن العمال",
  "غرفة الحراسة",
  "غرفة السائق أو العمالة المنزلية",
  "المزارع وسكن عمال المزارع",
  "المخيمات",
  "المساجد",
  "المستودعات والهناجر",
  "المجالس وغرف النوم",
  "المشاريع العقارية والهندسية",
] as const;

export const rentalCategories = [
  {
    id: "mobile-units",
    slug: "mobile-units",
    title: "وحدات متنقلة",
    seoTitle: "تأجير وحدات متنقلة فاخرة في السعودية",
    h1: "تأجير وحدات متنقلة فاخرة في السعودية",
    seoDescription:
      "تأجير وحدات متنقلة جاهزة للتشغيل: دورات مياه، مكاتب، وغرف للمشاريع والفعاليات في الرياض وجدة والدمام.",
    seoKeywords: ["تأجير وحدات متنقلة", "كبائن متنقلة", "وحدات جاهزة", "تأجير كبائن"],
    shortDescription:
      "وحدات حاويات فاخرة جاهزة للتشغيل: دورات مياه، مكاتب، غرف، ومرافق تناسب المشاريع والفعاليات.",
    description:
      "نوفّر وحدات متنقلة بتشطيب عصري وإضاءة عملية، مع خيارات متعددة للأحجام والاستخدامات — من المواقع الإنشائية إلى المناسبات الخاصة، مع توريد وتركيب ودعم أثناء فترة التأجير.",
    specs: [
      "دورات مياه ومكاتب وغرف تشغيل",
      "تشطيب فاخر وإضاءة خارجية وداخلية",
      "توريد وتركيب حسب موقع المشروع",
      "عقود مرنة حسب مدة الاحتياج",
    ],
    images: [
      "/images/rental/units/rental-luxury-portable-unit-01.webp",
      "/images/rental/units/rental-luxury-portable-unit-02.webp",
      "/images/rental/units/rental-luxury-portable-unit-04.webp",
      "/images/rental/units/rental-luxury-portable-unit-05.webp",
      "/images/rental/units/rental-luxury-portable-unit-06.webp",
      "/images/rental/units/rental-luxury-portable-unit-08.webp",
      "/images/rental/units/rental-luxury-portable-unit-09.webp",
      "/images/rental/units/rental-luxury-portable-unit-10.webp",
      "/images/rental/units/rental-luxury-portable-unit-11.webp",
      "/images/rental/units/rental-luxury-portable-unit-12.webp",
      "/images/rental/units/rental-luxury-portable-unit-13.webp",
      "/images/rental/units/rental-luxury-portable-unit-14.webp",
    ],
    whatsappMessage:
      "السلام عليكم، أرغب في الاستفسار عن تأجير الوحدات المتنقلة.",
  },
  {
    id: "european-tents",
    slug: "european-tents",
    title: "خيام أوروبية",
    seoTitle: "تأجير خيام أوروبية للمناسبات والفعاليات في السعودية",
    h1: "تأجير خيام أوروبية للمناسبات والفعاليات",
    seoDescription:
      "تأجير خيام أوروبية فاخرة للأعراس والمعارض والفعاليات — تركيب وتفكيك احترافي في موقعكم.",
    seoKeywords: ["تأجير خيام", "خيام أوروبية", "خيام مناسبات", "خيام فعاليات"],
    shortDescription:
      "خيام أوروبية فاخرة للمناسبات والمعارض والفعاليات — مظهر أنيق وسعة مرنة حسب الطلب.",
    description:
      "خيام أوروبية بهياكل متينة وتشطيب يليق بالمناسبات الرسمية والخاصة: أعراس، معارض، فعاليات شركات، واحتفالات. نوفر خيارات مساحات وتجهيزات إضافية مع إمكانية التركيب في الموقع.",
    specs: [
      "مناسبة للمناسبات والمعارض والفعاليات",
      "هياكل متينة وتصميم أوروبي أنيق",
      "مساحات قابلة للتخصيص حسب الحضور",
      "تركيب وتفكيك باحترافية في الموقع",
    ],
    images: [
      "/images/rental/tents/european-event-tent-02.webp",
      "/images/rental/tents/european-event-tent-03.webp",
      "/images/rental/tents/european-wedding-event-tent.webp",
    ],
    whatsappMessage:
      "السلام عليكم، أرغب في الاستفسار عن تأجير الخيام الأوروبية.",
  },
] as const;

export const rentalUnits = [
  {
    title: "وحدات متنقلة",
    description:
      "وحدات حاويات فاخرة للمشاريع والفعاليات والمناسبات.",
    image: "/images/rental/units/rental-luxury-portable-unit-02.webp",
  },
  {
    title: "خيام أوروبية",
    description:
      "خيام أوروبية أنيقة للمناسبات والمعارض والفعاليات.",
    image: "/images/rental/tents/european-event-tent-01.webp",
  },
] as const;

export const projects = [
  {
    title: "وحدة مكتبية بواجهة زخرفية بيضاء",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-decorative-white-office-unit.webp",
  },
  {
    title: "حاوية مودرن بألواح هندسية",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-modern-geometric-container.webp",
  },
  {
    title: "مكتب متنقل بواجهة مشربية",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-mashrabiya-portable-office.webp",
  },
  {
    title: "كبائن حاويات بواجهات زخرفية",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-decorative-container-cabins.webp",
  },
  {
    title: "كبائن صناعية بألواح مشربية بيضاء",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-industrial-mashrabiya-cabins.webp",
  },
  {
    title: "تصميم داخلي لدورات مياه فاخرة",
    location: "الرياض",
    category: "تشطيب",
    image: "/images/projects/riyadh-luxury-portable-bathroom-interior.webp",
  },
  {
    title: "تجهيز مغاسل ودورات مياه حديثة",
    location: "الرياض",
    category: "تشطيب",
    image: "/images/projects/riyadh-modern-washbasins-toilets.webp",
  },
  {
    title: "دورات مياه تجارية بتشطيب راقٍ",
    location: "الرياض",
    category: "تشطيب",
    image: "/images/projects/riyadh-commercial-luxury-toilets.webp",
  },
  {
    title: "كبائن متنقلة بتشطيب خشبي ورمادي",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-wood-gray-portable-cabins.webp",
  },
  {
    title: "تجهيز مكاتب متنقلة داخلية",
    location: "الرياض",
    category: "تجهيز",
    image: "/images/projects/riyadh-portable-office-interior.webp",
  },
  {
    title: "وحدة مكتبية عصرية بواجهة خشبية",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-modern-wood-office-unit.webp",
  },
  {
    title: "عرض كبائن فاخرة بتشطيبات متعددة",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-luxury-cabins-showcase.webp",
  },
  {
    title: "حاوية فاخرة بإضاءة وواجهات زخرفية",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-luxury-lit-decorative-container.webp",
  },
  {
    title: "تحويل حاوية لمكتب فاخر",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-container-to-luxury-office.webp",
  },
  {
    title: "وحدات دورات مياه متنقلة على شاحنة",
    location: "الرياض",
    category: "تأجير",
    image: "/images/projects/riyadh-mobile-toilet-units-truck.webp",
  },
  {
    title: "كبائن فاخرة متنقلة للفعاليات",
    location: "الرياض",
    category: "تأجير",
    image: "/images/projects/riyadh-luxury-event-portable-cabins.webp",
  },
  {
    title: "شاحنة كبائن فاخرة للفعاليات",
    location: "الرياض",
    category: "تأجير",
    image: "/images/projects/riyadh-luxury-cabins-event-truck.webp",
  },
  {
    title: "كرفان فاخر بتصميم مشربية",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/projects/riyadh-luxury-mashrabiya-caravan.webp",
  },
] as const;

/** شركاء النجاح — شعارات من ملف اللوقو (ترتيب الشريحة يمين → يسار، أعلى → أسفل) */
export const sampleClients = [
  {
    name: "أرامكو السعودية",
    nameEn: "Saudi Aramco",
    sector: "النفط والطاقة",
    logo: "/images/clients/partner-saudi-aramco.webp",
  },
  {
    name: "القدية",
    nameEn: "Qiddiya",
    sector: "الترفيه",
    logo: "/images/clients/partner-qiddiya.webp",
  },
  {
    name: "وزارة النقل والخدمات اللوجستية",
    nameEn: "Ministry of Transport and Logistic Services",
    sector: "حكومي",
    logo: "/images/clients/partner-ministry-of-transport.webp",
  },
  {
    name: "وزارة الرياضة",
    nameEn: "Ministry of Sport",
    sector: "حكومي",
    logo: "/images/clients/partner-ministry-of-sport.webp",
  },
  {
    name: "صلة",
    nameEn: "Sela",
    sector: "الفعاليات",
    logo: "/images/clients/partner-sela.webp",
  },
  {
    name: "مسك",
    nameEn: "Misk Foundation",
    sector: "مؤسسات",
    logo: "/images/clients/partner-misk-foundation.webp",
  },
  {
    name: "وزارة الثقافة",
    nameEn: "Ministry of Culture",
    sector: "حكومي",
    logo: "/images/clients/partner-ministry-of-culture.webp",
  },
  {
    name: "كدانة",
    nameEn: "KIDANA",
    sector: "عقارات وتطوير",
    logo: "/images/clients/partner-kidana.webp",
  },
  {
    name: "مفيد",
    nameEn: "MUFEED",
    sector: "تقنية",
    logo: "/images/clients/partner-mufeed.webp",
  },
  {
    name: "جامعة الملك فهد للبترول والمعادن",
    nameEn: "KFUPM",
    sector: "تعليم",
    logo: "/images/clients/partner-kfupm.webp",
  },
  {
    name: "التميمي",
    nameEn: "Tamimi",
    sector: "أعمال",
    logo: "/images/clients/partner-tamimi.webp",
  },
  {
    name: "نادي ديراب الريفي للجولف",
    nameEn: "Dirab Golf & Country Club",
    sector: "ترفيه",
    logo: "/images/clients/partner-dirab-golf.webp",
  },
  {
    name: "الظهران إكسبو",
    nameEn: "Dhahran Expo",
    sector: "معارض",
    logo: "/images/clients/partner-dhahran-expo.webp",
  },
  {
    name: "واجهة الرياض للمعارض والمؤتمرات",
    nameEn: "Riyadh Front",
    sector: "معارض",
    logo: "/images/clients/partner-riyadh-front.webp",
  },
  {
    name: "الاتحاد السعودي للفروسية",
    nameEn: "Saudi Arabian Equestrian Federation",
    sector: "رياضة",
    logo: "/images/clients/partner-saudi-equestrian-federation.webp",
  },
  {
    name: "حديقة الأمير ماجد",
    nameEn: "Prince Majed Park",
    sector: "ترفيه",
    logo: "/images/clients/partner-prince-majed-park.webp",
  },
  {
    name: "أجواء السعودية",
    nameEn: "Ajwaa Alsaudia",
    sector: "فعاليات",
    logo: "/images/clients/partner-ajwaa-alsaudia.webp",
  },
  {
    name: "ذا جاذرنق",
    nameEn: "The Gathering",
    sector: "فعاليات",
    logo: "/images/clients/partner-the-gathering.webp",
  },
  {
    name: "كود",
    nameEn: "CODE",
    sector: "تقنية",
    logo: "/images/clients/partner-code.webp",
  },
  {
    name: "هوادي",
    nameEn: "Hwadi",
    sector: "فعاليات",
    logo: "/images/clients/partner-hwadi.webp",
  },
  {
    name: "الحدث الذكي",
    nameEn: "Event CleVer",
    sector: "فعاليات",
    logo: "/images/clients/partner-event-clever.webp",
  },
  {
    name: "ويف إيفنت",
    nameEn: "WAVE EVENT",
    sector: "فعاليات",
    logo: "/images/clients/partner-wave-event.webp",
  },
  {
    name: "ماك مودرن آرك",
    nameEn: "MACC Modern Arch",
    sector: "تصميم",
    logo: "/images/clients/partner-macc-modern-arch.webp",
  },
  {
    name: "بلينك إكسبيرينس",
    nameEn: "Blink Experience",
    sector: "فعاليات",
    logo: "/images/clients/partner-blink-experience.webp",
  },
] as const;


export const faqs = [
  {
    q: "هل تغطون جميع مناطق المملكة؟",
    a: "نعم، نخدم جميع مناطق المملكة العربية السعودية مع تركيز خاص على المدن الرئيسية مثل الرياض وجدة والدمام والجبيل وغيرها.",
  },
  {
    q: "ما الفرق بين التأجير والبيع والتصنيع؟",
    a: "التأجير مناسب للاحتياجات المؤقتة. البيع لوحدات جاهزة للتمليك. التصنيع لإنتاج وحدات حسب مواصفاتكم الخاصة.",
  },
  {
    q: "هل يمكن تصنيع وحدة حسب مواصفاتنا؟",
    a: "بالتأكيد. نصمّم ونصنّع وفق المساحة والتشطيب والعزل والشبكات التي يحتاجها مشروعكم.",
  },
  {
    q: "ما مدة التوريد أو التركيب المتوقعة؟",
    a: "تختلف حسب نوع الوحدة والكميات والموقع. بعد الاستشارة نقدم جدولاً زمنياً واضحاً ضمن العرض.",
  },
  {
    q: "هل تقدمون استشارة وميزانية تقديرية؟",
    a: "نعم، نقدم استشارة أولية وميزانية تقديرية لمساعدتكم على اتخاذ القرار بسرعة ووضوح.",
  },
  {
    q: "كيف يمكن التواصل معكم؟",
    a: "عبر نموذج الاتصال في الموقع، أو الواتساب، أو الهاتف، أو البريد الإلكتروني. فريقنا جاهز للرد على استفساراتكم.",
  },
] as const;

export const aboutStats = [
  { value: "100%", label: "التزام بالجودة" },
  { value: "كافة المناطق", label: "تغطية المملكة" },
  { value: "3", label: "خدمات متكاملة" },
  { value: "24/7", label: "تواصل ودعم" },
] as const;
