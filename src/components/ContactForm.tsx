"use client";

import { FormEvent, useState } from "react";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  title?: string;
  compact?: boolean;
};

export function ContactForm({ title, compact = false }: Props) {
  const { site } = useLocalizedCms();
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const resolvedTitle = title ?? t.contactFormTitle;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const consultationType = String(data.get("consultationType") || "");
    const message = String(data.get("message") || "");

    const brand = site.nameEn || site.nameAr;
    const text = `${t.waContactPrefix} ${brand}%0A${t.waName} ${name}%0A${t.waPhone} ${phone}%0A${t.waEmail} ${email}%0A${t.waConsultationType} ${consultationType}%0A${t.waMessage} ${message}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <div className={compact ? "" : "bg-white p-6 md:p-8"}>
      <h3 className="heading-display mb-2 text-2xl">{resolvedTitle}</h3>
      <p className="mb-6 text-sm text-[#777]">{t.contactFormIntro}</p>
      <form onSubmit={onSubmit} className="grid gap-4">
        <input
          name="name"
          required
          placeholder={t.name}
          className="input-field"
          autoComplete="name"
        />
        <input
          name="phone"
          required
          placeholder={t.mobile}
          className="input-field"
          autoComplete="tel"
          dir="ltr"
        />
        <input
          name="email"
          type="email"
          placeholder={t.emailPlaceholder}
          className="input-field"
          autoComplete="email"
          dir="ltr"
        />
        <select name="consultationType" required defaultValue="" className="input-field">
          <option value="" disabled>
            {t.consultationType}
          </option>
          <option value={t.consultationSale}>{t.consultationSale}</option>
          <option value={t.consultationManufacturing}>{t.consultationManufacturing}</option>
          <option value={t.consultationRental}>{t.consultationRental}</option>
          <option value={t.consultationOther}>{t.consultationOther}</option>
        </select>
        <textarea
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder={t.messagePlaceholder}
          className="input-field resize-y"
        />
        <button type="submit" className="btn-primary justify-center">
          {t.sendRequest}
        </button>
        {sent && (
          <p className="text-sm font-semibold text-[var(--gold)]">{t.formSentWhatsApp}</p>
        )}
      </form>
    </div>
  );
}
