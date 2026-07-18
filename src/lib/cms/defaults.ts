import type { CmsData } from "./types";
import { siteConfig, navLinks } from "@/lib/site";
import { SEO_CITIES } from "@/lib/seo/cities";
import {
  services,
  processSteps,
  catalogProducts,
  rentalCategories,
  manufacturingExtras,
  projects,
  sampleClients,
  faqs,
  aboutStats,
} from "@/lib/content";

export function getDefaultCms(): CmsData {
  return {
    site: {
      nameAr: siteConfig.nameAr,
      nameEn: siteConfig.nameEn,
      legalName: siteConfig.legalName,
      commercialRegister: siteConfig.commercialRegister,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      phone: siteConfig.phone,
      phoneDisplay: siteConfig.phoneDisplay,
      whatsapp: siteConfig.whatsapp,
      email: siteConfig.email,
      address: siteConfig.address,
      addressDetail: siteConfig.addressDetail,
      cities: SEO_CITIES.map((c) => ({ ...c })),
      social: {
        instagram: siteConfig.social.instagram,
        facebook: siteConfig.social.facebook,
        twitter: siteConfig.social.twitter,
        linkedin: siteConfig.social.linkedin,
      },
    },
    navLinks: navLinks.map((l) => ({ ...l })),
    pageHeroImages: {
      services: "/images/luxury-portable-cabins-page-hero.webp",
      about: "/images/luxury-portable-cabins-page-hero.webp",
      rental: "/images/luxury-portable-cabins-page-hero.webp",
      manufacturing: "/images/luxury-portable-cabins-page-hero.webp",
      projects: "/images/luxury-portable-cabins-page-hero.webp",
      contact: "/images/luxury-portable-cabins-page-hero.webp",
      faq: "/images/luxury-portable-cabins-page-hero.webp",
      locations: "/images/luxury-portable-cabins-page-hero.webp",
    },
    home: {
      heroTitle: "الأولى في تأجير وبيع وتصنيع الوحدات المتنقلة",
      heroSubtitle: "وحدات متنقلة - خيام أوروبية - بيع وتصنيع حسب الطلب",
      heroCta: "استكشف حلولنا",
      heroImage: "/images/cms/luxury-cabins-home-hero.webp",
      servicesEyebrow: "حلولنا المتكاملة",
      servicesTitle: "حلول متكاملة لتصنيع وبيع وتأجير الوحدات المتنقلة",
      servicesTitleLine2: "(وحدات متنقلة – خيام أوروبية)",
      manufacturingBandTitle: "البيع والتصنيع",
      manufacturingBandText: "وحدات جاهزة للتمليك وتصنيع حسب المواصفات",
      visionTitle: "رؤيتنا..",
      visionBody:
        "رؤيتنا أن نكون الشركة الرائدة في توفير حلول الوحدات المتنقلة عبر التأجير والبيع والتصنيع في المملكة العربية السعودية. نحن معروفون بالتزامنا بالجودة والابتكار. لا نهدف إلى تصنيع وحدات رخيصة بل وحدات عالية الجودة بطابع احترافي، مع التوسع المستمر لخدمة عملائنا وضمان نجاح مشاريعهم.",
      visionCta: "اتصل بنا الآن",
      visionImage: "/images/cms/luxury-cabins-field-services.webp",
      processEyebrow: "منهجية احترافية... تنفذ بمعايير عالمية",
      processTitle: "رحلة تنفيذ مشروعك",
      processSubtitle:
        "منظومة تنفيذ احترافية تضمن الجودة والدقة والالتزام في جميع مراحل المشروع.",
      contactTitle: "اتصل بنا الآن",
      contactSubtitle:
        "يضع فريقنا المتخصص خبراته بين يديكم لتقديم حلول احترافية تلبي متطلبات مشاريعكم بأعلى معايير الجودة.",
      ctaBandTitle: "لنصنع معًا مشروعًا يواكب أعلى معايير الجودة والتميز.",
      ctaBandButton: "اتصل بنا الآن",
    },
    services: services.map((s) => ({ ...s })),
    processSteps: processSteps.map((s) => ({ ...s })),
    catalogProducts: catalogProducts.map((p) => ({
      ...p,
      specs: [...p.specs],
      images: [...p.images],
      seoKeywords: p.seoKeywords ? [...p.seoKeywords] : [],
    })),
    rentalCategories: rentalCategories.map((c) => ({
      ...c,
      specs: [...c.specs],
      images: [...c.images],
      seoKeywords: "seoKeywords" in c && c.seoKeywords ? [...c.seoKeywords] : [],
    })),
    manufacturingExtras: [...manufacturingExtras],
    projects: projects.map((p) => ({ ...p })),
    sampleClients: sampleClients.map((c) => ({ ...c })),
    faqs: faqs.map((f) => ({ ...f })),
    aboutStats: aboutStats.map((s) => ({ ...s })),
    about: {
      heroTitle: "جودة عمل من فريق محترف ملتزم",
      heroDescription: `${siteConfig.legalName} مؤسسة سعودية متخصصة في الحلول اللوجستية والوحدات المتنقلة: تأجير، بيع، وتصنيع.`,
      whoTitle: "الاسم الذي تثق به المشاريع الكبرى في حلول الوحدات المتنقلة.",
      whoBody1:
        "نعمل على تقديم حلول وحدات متنقلة عالية الجودة تدعم كفاءة التشغيل في المواقع الإنشائية والصناعية والفعاليات. لا نسعى لتقديم حلول رخيصة، بل حلول متينة بطابع احترافي.",
      whoBody2: `الاسم التجاري: ${siteConfig.nameAr} | ${siteConfig.nameEn}`,
      sideImage: "/images/luxury-cabins-about-company.webp",
      visionTitle: "رؤيتنا",
      visionBody:
        "أن نكون الشركة الرائدة في توفير حلول الوحدات المتنقلة والتأجير والتصنيع في المملكة العربية السعودية، مع التزام دائم بالجودة والابتكار وخدمة العميل في كل مدينة.",
      missionTitle: "رسالتنا",
      missionBody:
        "تقديم أعلى مستويات الجودة في التأجير والبيع والتصنيع، بخدمة سريعة وموثوقة وخيارات قابلة للتخصيص تلبي احتياجات كل مشروع وتعزز كفاءته التشغيلية.",
      valuesTitle: "قيمنا",
      values: [
        "الدقة في التنفيذ والمواعيد",
        "الجودة قبل أي اعتبار آخر",
        "الشفافية في العروض والتعامل",
        "الابتكار في الحلول",
        "خدمة عملاء احترافية",
        "قابلية التوسع مع نمو أعمالكم",
      ],
    },
    rentalPage: {
      seoTitle: "تأجير وحدات متنقلة وخيام أوروبية في السعودية",
      h1: "تأجير وحدات متنقلة وخيام أوروبية",
      seoDescription:
        "حلول تأجير مرنة للمشاريع والفعاليات بكفاءة واعتمادية، يخدم كافة الاحتياجات والمناسبات.",
      seoKeywords: ["تأجير وحدات متنقلة", "تأجير خيام", "كبائن للإيجار", "Luxury Cabins"],
      heroDescription:
        "حلول تأجير مرنة للمشاريع والفعاليات بكفاءة واعتمادية، يخدم كافة الاحتياجات والمناسبات.",
      sectionTitle: "وحدات متنقلة وخيام أوروبية لمشروعك",
      sectionBody:
        "نقدّم حلول تأجير عملية وأنيقة للمشاريع والفعاليات والمناسبات الخاصة: من الوحدات المتنقلة الجاهزة للتشغيل، إلى الخيام الأوروبية الفاخرة — مع دعم لوجستي وتوريد وتركيب في المدن الرئيسية.",
      bullets: [
        "تغطية للمشاريع والفعاليات والمناسبات",
        "توريد وتركيب في الموقع",
        "عقود مرنة حسب المدة",
        "تواصل سريع عبر واتساب",
      ],
      catalogTitle: "اختر الحل الأمثل لمشروعك",
      catalogBody:
        "وحدات متنقلة أو خيام أوروبية — تواصل معنا مباشرة عبر واتساب لطلب العرض.",
      ctaTitle: "تواصل عبر واتساب لطلب عرض تأجير",
      ctaBody: "أخبرنا بنوع الوحدة أو الخيمة والموقع والمدة، وسنعود إليك بعرض واضح بسرعة.",
    },
    manufacturingPage: {
      heroTitle: "بيع وتصنيع الوحدات الجاهزة",
      heroDescription:
        "وحدات جاهزة للتمليك، وتصنيع حسب المقاسات والمواصفات — بيوت وغرف وبركسات وكرفانات ومكاتب.",
      introEyebrow: "حلول متكاملة",
      introTitle: "حلول مصممة خصيصًا وفق متطلبات مشروعك ومواصفاته الفنية.",
      introBody:
        "اختر وحدة جاهزة للتمليك، أو اطلب تصنيعاً بمواصفاتكم الخاصة مع إمكانية التركيب في الموقع.",
      introImage: "/images/custom-portable-cabin-manufacturing.webp",
      highlights: ["جودة مواد وتشطيب", "تفصيل حسب المقاس", "التزام بالمواعيد"],
      catalogEyebrow: "منتجاتنا",
      catalogBadge: "تركيب وتوريد حسب الاتفاق",
      catalogTitle: "بيوت، غرف، بركسات وكرفانات جاهزة",
      catalogBody: "استعرض منتجاتنا، واطلع على التفاصيل، واطلب عرض السعر بما يناسب احتياجك بكل سهولة.",
      extrasEyebrow: "استخدامات إضافية",
      extrasTitle: "نغطي احتياجات متنوعة حسب طبيعة المشروع",
      ctaEyebrow: "اطلب عرضاً",
      ctaTitle: "شراء جاهز أو تصنيع حسب الطلب",
      ctaBody: "أرسل تفاصيل احتياجك وسنعود إليك بعرض واضح للبيع أو التصنيع.",
    },
    contactPage: {
      heroEyebrow: "اتصل بنا",
      heroTitle: "اتصل بنا الآن",
      heroDescription:
        "يضع فريقنا المتخصص خبراته بين يديكم لتقديم حلول احترافية تلبي متطلبات مشاريعكم بأعلى معايير الجودة.",
      formTitle: "أرسل استشارتك",
      mapEmbedUrl: "https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed",
    },
    footer: {
      servicesTitle: "خدماتنا",
      companyTitle: "الشركة",
      newsletterTitle: "النشرة الإخبارية",
      newsletterBody: "اشترك ليصلك جديد العروض والخدمات.",
      newsletterPlaceholder: "البريد الالكتروني",
      newsletterButton: "اشترك",
      serviceLinks: [
        { href: "/rental", label: "تأجير الوحدات المتنقلة" },
        { href: "/rental", label: "خيام أوروبية" },
        { href: "/manufacturing", label: "البيع والتصنيع" },
        { href: "/projects", label: "المشاريع" },
      ],
      companyLinks: [
        { href: "/about", label: "من نحن" },
        { href: "/faq", label: "الأسئلة الشائعة" },
        { href: "/projects", label: "آخر الأعمال" },
        { href: "/contact", label: "اتصل بنا" },
      ],
    },
    updatedAt: new Date().toISOString(),
  };
}
