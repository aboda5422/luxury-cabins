export const services = [
  {
    id: "toilets",
    title: "دورات مياه متنقلة",
    short: "خيارات متعددة وأحجام مختلفة من دورات المياه المتنقلة للمشاريع والفعاليات.",
    href: "/rental",
    image: "/images/service-toilets.jpg",
  },
  {
    id: "offices",
    title: "مكاتب وغرف متنقلة",
    short: "خيارات متعددة من المكاتب والغرف متعددة الاستخدام بتشطيب عملي واحترافي.",
    href: "/rental",
    image: "/images/cabin-5.jpg",
  },
  {
    id: "other",
    title: "خدمات أخرى",
    short: "مجموعة من الخدمات اللوجستية المساندة لتشغيل المواقع والمشاريع.",
    href: "/contact",
    image: "/images/service-logistics.jpg",
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
    title: "بيوت جاهزة",
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
    title: "غرف جاهزة",
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
    id: "barracks",
    title: "بركسات",
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
    title: "كرفانات",
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
    title: "مكاتب جاهزة",
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
      "/images/rental/units/unit-7.jpg",
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
      "/images/rental/tents/tent-1.jpg",
      "/images/rental/tents/tent-2.jpg",
      "/images/rental/tents/tent-3.jpg",
      "/images/rental/tents/tent-4.jpg",
      "/images/rental/tents/tent-5.jpg",
      "/images/rental/tents/tent-6.jpg",
      "/images/rental/tents/tent-7.jpg",
      "/images/rental/tents/tent-8.jpg",
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
    title: "توريد وحدات تشغيل لموقع ميداني",
    location: "الرياض",
    category: "تأجير",
    image: "/images/vision-side.jpg",
  },
  {
    title: "توريد دورات مياه متنقلة",
    location: "جدة",
    category: "تأجير",
    image: "/images/service-toilets.jpg",
  },
  {
    title: "مكاتب وغرف متنقلة لمشروع",
    location: "الدمام",
    category: "تأجير",
    image: "/images/cabin-5.jpg",
  },
  {
    title: "وحدات لوجستية وخدمات مساندة",
    location: "الجبيل",
    category: "خدمات",
    image: "/images/service-logistics.jpg",
  },
  {
    title: "تصنيع غرف جاهزة",
    location: "الرياض",
    category: "تصنيع",
    image: "/images/cabin-1.jpg",
  },
  {
    title: "بيع بركسات ومكاتب جاهزة",
    location: "الخبر",
    category: "بيع",
    image: "/images/cabin-3.jpg",
  },
] as const;

/** أمثلة مؤقتة لشركات سعودية معروفة — يستبدلها العميل لاحقاً بشعاراته الفعلية */
export const sampleClients = [
  { name: "أرامكو", nameEn: "Aramco", sector: "النفط والطاقة" },
  { name: "سابك", nameEn: "SABIC", sector: "البتروكيماويات" },
  { name: "معادن", nameEn: "Ma'aden", sector: "التعدين" },
  { name: "نيوم", nameEn: "NEOM", sector: "المشاريع الكبرى" },
  { name: "البحر الأحمر", nameEn: "Red Sea Global", sector: "السياحة" },
  { name: "القدية", nameEn: "Qiddiya", sector: "الترفيه" },
  { name: "STC", nameEn: "stc", sector: "الاتصالات" },
  { name: "أكوا باور", nameEn: "ACWA Power", sector: "الطاقة" },
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
