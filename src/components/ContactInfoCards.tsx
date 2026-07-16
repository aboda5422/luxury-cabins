"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { trackPhoneClick } from "@/lib/analytics";

type Props = {
  showIntro?: boolean;
};

export function ContactInfoCards({ showIntro = true }: Props) {
  const { site, home } = useLocalizedCms();
  const { t } = useLocale();

  const cards = [
    {
      id: "address",
      title: t.address,
      value: site.address,
      href: "https://maps.google.com/?q=Riyadh,Saudi+Arabia",
      icon: MapPin,
      external: true,
    },
    {
      id: "email",
      title: t.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      icon: Mail,
      external: false,
    },
    {
      id: "phone",
      title: t.phoneLabel,
      value: site.phoneDisplay,
      href: `tel:${site.phone}`,
      icon: Phone,
      external: false,
      ltr: true,
    },
  ] as const;

  return (
    <div>
      {showIntro && (
        <div className="mb-10 max-w-3xl text-center md:text-start">
          <h2 className="heading-display text-3xl md:text-4xl">{home.contactTitle}</h2>
          <p className="mt-4 leading-8 text-[#777]">{home.contactSubtitle}</p>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.id}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            onClick={() => {
              if (card.id === "phone") trackPhoneClick();
            }}
            className="group card-frame flex flex-col items-center bg-white px-6 py-10 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] transition group-hover:bg-[var(--gold)] group-hover:text-[#0f0f0f]">
              <card.icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-extrabold text-[#0f0f0f]">{card.title}</h3>
            <p
              className={`mt-2 text-sm leading-7 text-[#777] ${"ltr" in card && card.ltr ? "dir-ltr" : ""}`}
              dir={"ltr" in card && card.ltr ? "ltr" : undefined}
            >
              {card.value}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
