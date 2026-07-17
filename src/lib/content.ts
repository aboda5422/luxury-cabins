export const services = [
  {
    id: "sales-manufacturing",
    title: "البيع والتصنيع",
    short:
      "وحدات جاهزة للتمليك وتصنيع حسب المقاسات والمواصفات: بيوت وغرف وبركسات وكرفانات ومكاتب.",
    href: "/manufacturing",
    image: "/images/cms/service-sales.jpg",
  },
  {
    id: "mobile-units",
    title: "إيجار الوحدات المتنقلة",
    short:
      "وحدات متنقلة فاخرة جاهزة للتشغيل للمشاريع والفعاليات — مع توريد وتركيب ودعم أثناء فترة التأجير.",
    href: "/rental#mobile-units",
    image: "/images/cms/service-units.jpg",
  },
  {
    id: "european-tents",
    title: "إيجار الخيام الأوروبية",
    short:
      "خيام أوروبية أنيقة للمناسبات والمعارض والفعاليات — مساحات مرنة وتركيب احترافي في الموقع.",
    href: "/rental#european-tents",
    image: "/images/cms/service-tents.jpg",
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
      "/images/products/houses-1.jpg",
      "/images/products/houses-2.jpg",
      "/images/products/houses-3.jpg",
      "/images/products/houses-4.jpg",
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
      "/images/products/rooms-1.jpg",
      "/images/products/rooms-2.jpg",
      "/images/products/rooms-3.jpg",
      "/images/products/rooms-4.jpg",
    ],
  },
  {
    id: "guard-rooms",
    slug: "guard-rooms",
    title: "غرف حراسة",
    seoTitle: "غرف حراسة جاهزة ومتنقلة بمواصفات عالية",
    h1: "غرف حراسة جاهزة ومتنقلة بمواصفات عالية",
    seoDescription:
      "تصنيع وبيع غرف حراسة جاهزة ومتنقلة للشركات والمشاريع والمواقع الإنشائية في السعودية.",
    seoKeywords: ["غرف حراسة", "غرفة حارس", "غرف حراسة جاهزة", "مكاتب غرف حارس"],
    shortDescription:
      "غرف حراسة جاهزة ومتنقلة بمواصفات أمنية عملية وتركيب سريع للمواقع والمشاريع.",
    description:
      "نصمّم ونصنّع غرف حراسة جاهزة ومتنقلة بمقاسات وتشطيبات تناسب بوابات المشاريع والمصانع والمجمعات، مع عزل ونوافذ رؤية وتركيب ميداني سريع.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب المقاس والتجهيز",
    specs: [
      "رؤية ميدانية ونوافذ عملية",
      "عزل حراري مناسب للمناخ",
      "تركيب سريع في الموقع",
    ],
    images: [
      "/images/products/rooms-1.jpg",
      "/images/products/rooms-2.jpg",
      "/images/products/rooms-3.jpg",
      "/images/products/offices-1.jpg",
    ],
  },
  {
    id: "portable-cabins",
    slug: "portable-cabins",
    title: "كبائن متنقلة",
    seoTitle: "تصنيع كباين متنقلة فاخرة في السعودية",
    h1: "تصنيع كباين متنقلة فاخرة في السعودية",
    seoDescription:
      "تصنيع كبائن متنقلة فاخرة ووحدات جاهزة للمشاريع والسكن المؤقت في الرياض وجدة وجميع مناطق المملكة.",
    seoKeywords: [
      "كبائن متنقلة",
      "تصنيع كبائن",
      "وحدات متنقلة",
      "كبائن جاهزة",
      "الكبائن الفاخرة",
    ],
    shortDescription:
      "كبائن ووحدات متنقلة فاخرة للسكن والمكاتب والمواقع، بتصنيع حسب المواصفات.",
    description:
      "نقدّم تصنيع كبائن متنقلة فاخرة ووحدات جاهزة حسب مقاسات المشروع، بعزل وتشطيب احترافي وتوريد وتركيب في مختلف مناطق المملكة.",
    priceLabel: "اطلب عرض سعر",
    priceNote: "حسب المساحة والتشطيب",
    specs: [
      "تصنيع حسب المقاس",
      "عزل وتشطيب فاخر",
      "توريد وتركيب ميداني",
    ],
    images: [
      "/images/products/houses-1.jpg",
      "/images/products/offices-1.jpg",
      "/images/products/caravans-1.jpg",
      "/images/products/barracks-1.jpg",
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
      "/images/products/barracks-1.jpg",
      "/images/products/barracks-2.jpg",
      "/images/products/barracks-3.jpg",
      "/images/products/barracks-4.jpg",
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
      "/images/products/caravans-1.jpg",
      "/images/products/caravans-2.jpg",
      "/images/products/caravans-3.jpg",
      "/images/products/caravans-4.jpg",
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
      "/images/products/offices-1.jpg",
      "/images/products/offices-2.jpg",
      "/images/products/offices-3.jpg",
      "/images/products/offices-4.jpg",
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
    title: "وحدات متنقلة",
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
      "/images/rental/units/unit-1.jpg",
      "/images/rental/units/unit-2.jpg",
      "/images/rental/units/unit-4.jpg",
      "/images/rental/units/unit-5.jpg",
      "/images/rental/units/unit-6.jpg",
      "/images/rental/units/unit-8.jpg",
      "/images/rental/units/unit-9.jpg",
      "/images/rental/units/unit-10.jpg",
      "/images/rental/units/unit-11.jpg",
      "/images/rental/units/unit-12.jpg",
      "/images/rental/units/unit-13.jpg",
      "/images/rental/units/unit-14.jpg",
    ],
    whatsappMessage:
      "السلام عليكم، أرغب في الاستفسار عن تأجير الوحدات المتنقلة.",
  },
  {
    id: "european-tents",
    title: "خيام أوروبية",
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
      "/images/rental/tents/tent-4.jpg",
      "/images/rental/tents/tent-9.jpg",
      "/images/rental/tents/tent-10.jpg",
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
    image: "/images/rental/units/unit-2.jpg",
  },
  {
    title: "خيام أوروبية",
    description:
      "خيام أوروبية أنيقة للمناسبات والمعارض والفعاليات.",
    image: "/images/rental/tents/tent-1.jpg",
  },
] as const;

export const projects = [
  {
    title: "وحدة مكتبية بواجهة زخرفية بيضاء",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-01.png",
  },
  {
    title: "حاوية مودرن بألواح هندسية",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-02.png",
  },
  {
    title: "مكتب متنقل بواجهة مشربية",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-03.png",
  },
  {
    title: "كبائن حاويات بواجهات زخرفية",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-04.png",
  },
  {
    title: "كبائن صناعية بألواح مشربية بيضاء",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-05.png",
  },
  {
    title: "تصميم داخلي لدورات مياه فاخرة",
    location: "الرياض",
    category: "تشطيب",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-06.png",
  },
  {
    title: "تجهيز مغاسل ودورات مياه حديثة",
    location: "الرياض",
    category: "تشطيب",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-07.png",
  },
  {
    title: "دورات مياه تجارية بتشطيب راقٍ",
    location: "الرياض",
    category: "تشطيب",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-08.png",
  },
  {
    title: "كبائن متنقلة بتشطيب خشبي ورمادي",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-09.png",
  },
  {
    title: "تجهيز مكاتب متنقلة داخلية",
    location: "الرياض",
    category: "تجهيز",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-10.png",
  },
  {
    title: "وحدة مكتبية عصرية بواجهة خشبية",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-11.png",
  },
  {
    title: "عرض كبائن فاخرة بتشطيبات متعددة",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-12.png",
  },
  {
    title: "حاوية فاخرة بإضاءة وواجهات زخرفية",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-13.png",
  },
  {
    title: "تحويل حاوية لمكتب فاخر",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-14.png",
  },
  {
    title: "وحدات دورات مياه متنقلة على شاحنة",
    location: "الرياض",
    category: "تأجير",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-15.png",
  },
  {
    title: "كبائن فاخرة متنقلة للفعاليات",
    location: "الرياض",
    category: "تأجير",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-16.png",
  },
  {
    title: "شاحنة كبائن فاخرة للفعاليات",
    location: "الرياض",
    category: "تأجير",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-17.png",
  },
  {
    title: "كرفان فاخر بتصميم مشربية",
    location: "الرياض",
    category: "تصنيع",
    image: "https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/project-18.png",
  },
] as const;

/** شركاء النجاح — شعارات من ملف اللوقو (ترتيب الشريحة يمين → يسار، أعلى → أسفل) */
export const sampleClients = [
  {
    name: "أرامكو السعودية",
    nameEn: "Saudi Aramco",
    sector: "النفط والطاقة",
    logo: "/images/clients/partner-01.png",
  },
  {
    name: "القدية",
    nameEn: "Qiddiya",
    sector: "الترفيه",
    logo: "/images/clients/partner-02.png",
  },
  {
    name: "وزارة النقل والخدمات اللوجستية",
    nameEn: "Ministry of Transport and Logistic Services",
    sector: "حكومي",
    logo: "/images/clients/partner-03.png",
  },
  {
    name: "وزارة الرياضة",
    nameEn: "Ministry of Sport",
    sector: "حكومي",
    logo: "/images/clients/partner-04.png",
  },
  {
    name: "صلة",
    nameEn: "Sela",
    sector: "الفعاليات",
    logo: "/images/clients/partner-05.png",
  },
  {
    name: "مسك",
    nameEn: "Misk Foundation",
    sector: "مؤسسات",
    logo: "/images/clients/partner-06.png",
  },
  {
    name: "وزارة الثقافة",
    nameEn: "Ministry of Culture",
    sector: "حكومي",
    logo: "/images/clients/partner-07.png",
  },
  {
    name: "كدانة",
    nameEn: "KIDANA",
    sector: "عقارات وتطوير",
    logo: "/images/clients/partner-24.png",
  },
  {
    name: "مفيد",
    nameEn: "MUFEED",
    sector: "تقنية",
    logo: "/images/clients/partner-08.png",
  },
  {
    name: "جامعة الملك فهد للبترول والمعادن",
    nameEn: "KFUPM",
    sector: "تعليم",
    logo: "/images/clients/partner-09.png",
  },
  {
    name: "التميمي",
    nameEn: "Tamimi",
    sector: "أعمال",
    logo: "/images/clients/partner-10.png",
  },
  {
    name: "نادي ديراب الريفي للجولف",
    nameEn: "Dirab Golf & Country Club",
    sector: "ترفيه",
    logo: "/images/clients/partner-11.png",
  },
  {
    name: "الظهران إكسبو",
    nameEn: "Dhahran Expo",
    sector: "معارض",
    logo: "/images/clients/partner-12.png",
  },
  {
    name: "واجهة الرياض للمعارض والمؤتمرات",
    nameEn: "Riyadh Front",
    sector: "معارض",
    logo: "/images/clients/partner-13.png",
  },
  {
    name: "الاتحاد السعودي للفروسية",
    nameEn: "Saudi Arabian Equestrian Federation",
    sector: "رياضة",
    logo: "/images/clients/partner-14.png",
  },
  {
    name: "حديقة الأمير ماجد",
    nameEn: "Prince Majed Park",
    sector: "ترفيه",
    logo: "/images/clients/partner-15.png",
  },
  {
    name: "أجواء السعودية",
    nameEn: "Ajwaa Alsaudia",
    sector: "فعاليات",
    logo: "/images/clients/partner-16.png",
  },
  {
    name: "ذا جاذرنق",
    nameEn: "The Gathering",
    sector: "فعاليات",
    logo: "/images/clients/partner-17.png",
  },
  {
    name: "كود",
    nameEn: "CODE",
    sector: "تقنية",
    logo: "/images/clients/partner-18.png",
  },
  {
    name: "هوادي",
    nameEn: "Hwadi",
    sector: "فعاليات",
    logo: "/images/clients/partner-19.png",
  },
  {
    name: "الحدث الذكي",
    nameEn: "Event CleVer",
    sector: "فعاليات",
    logo: "/images/clients/partner-20.png",
  },
  {
    name: "ويف إيفنت",
    nameEn: "WAVE EVENT",
    sector: "فعاليات",
    logo: "/images/clients/partner-21.png",
  },
  {
    name: "ماك مودرن آرك",
    nameEn: "MACC Modern Arch",
    sector: "تصميم",
    logo: "/images/clients/partner-22.png",
  },
  {
    name: "بلينك إكسبيرينس",
    nameEn: "Blink Experience",
    sector: "فعاليات",
    logo: "/images/clients/partner-23.png",
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
