"use client";

import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppButton() {
  const { site } = useLocalizedCms();
  const { t } = useLocale();
  const brand = site.nameEn || site.nameAr;
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `${t.waGreeting} ${brand}`,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contactWhatsApp}
      onClick={() => trackWhatsAppClick("floating_button")}
      className="whatsapp-float fixed bottom-5 left-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_rgba(37,211,102,0.5)] transition hover:scale-105 hover:bg-[#1ebe57] md:bottom-7 md:left-7 md:h-[4.25rem] md:w-[4.25rem]"
    >
      <WhatsAppIcon className="relative z-[1] h-8 w-8 md:h-9 md:w-9" />
    </a>
  );
}
