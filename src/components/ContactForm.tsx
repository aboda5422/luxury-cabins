"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { trackContactSubmit } from "@/lib/analytics";

type Props = {
  title?: string;
  intro?: string;
  compact?: boolean;
  hideHeader?: boolean;
  /** Locks consultation type to a single value (shown as selected option) */
  fixedConsultationType?: string;
  submitVia?: "whatsapp" | "email";
  onSubmitted?: () => void;
};

export function ContactForm({
  title,
  intro,
  compact = false,
  hideHeader = false,
  fixedConsultationType,
  submitVia = "whatsapp",
  onSubmitted,
}: Props) {
  const { site } = useLocalizedCms();
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const resolvedTitle = title ?? t.contactFormTitle;
  const resolvedIntro = intro ?? t.contactFormIntro;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const consultationType = String(
      data.get("consultationType") || fixedConsultationType || "",
    );
    const message = String(data.get("message") || "");

    const brand = site.nameEn || site.nameAr;

    if (submitVia === "email") {
      const subject = `${resolvedTitle}${consultationType ? ` — ${consultationType}` : ""}`;
      const body = [
        `${t.waContactPrefix} ${brand}`,
        `${t.waName} ${name}`,
        `${t.waPhone} ${phone}`,
        `${t.waEmail} ${email}`,
        `${t.waConsultationType} ${consultationType}`,
        `${t.waMessage} ${message}`,
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      const text = `${t.waContactPrefix} ${brand}%0A${t.waName} ${name}%0A${t.waPhone} ${phone}%0A${t.waEmail} ${email}%0A${t.waConsultationType} ${consultationType}%0A${t.waMessage} ${message}`;
      window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    }

    trackContactSubmit(submitVia);
    setSent(true);
    onSubmitted?.();
  }

  return (
    <div className="w-full min-w-0 overflow-hidden bg-white p-6 md:p-8">
      {!hideHeader ? (
        <>
          <h3 className="heading-display mb-2 text-xl leading-[1.45] md:text-2xl">
            {resolvedTitle}
          </h3>
          <p className="mb-6 text-sm leading-7 text-[#777]">{resolvedIntro}</p>
        </>
      ) : null}

      <form onSubmit={onSubmit} className="grid min-w-0 gap-4">
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
        {fixedConsultationType ? (
          <>
            <input type="hidden" name="consultationType" value={fixedConsultationType} />
            <div className="input-field flex items-center text-[#333]">
              {fixedConsultationType}
            </div>
          </>
        ) : (
          <div className="relative">
            <select
              name="consultationType"
              required
              defaultValue=""
              className="input-field appearance-none pe-10"
            >
              <option value="" disabled>
                {t.consultationType}
              </option>
              <option value={t.consultationSale}>{t.consultationSale}</option>
              <option value={t.consultationManufacturing}>
                {t.consultationManufacturing}
              </option>
              <option value={t.consultationRental}>{t.consultationRental}</option>
              <option value={t.consultationOther}>{t.consultationOther}</option>
            </select>
            <ChevronDown
              size={18}
              aria-hidden
              className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[#777]"
            />
          </div>
        )}
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder={t.messagePlaceholder}
          className="input-field min-h-[7rem] resize-y"
        />
        <button type="submit" className="btn-primary w-full justify-center">
          {t.sendRequest}
        </button>
        {sent ? (
          <p className="text-sm font-semibold leading-6 text-[var(--gold)]">
            {submitVia === "email" ? t.formSentEmail : t.formSentWhatsApp}
          </p>
        ) : null}
      </form>
    </div>
  );
}

type RequestFormModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  intro: string;
  consultationType: string;
};

export function RequestFormModal({
  open,
  onClose,
  title,
  intro,
  consultationType,
}: RequestFormModalProps) {
  const { t } = useLocale();
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label={t.close}
        onClick={onClose}
      />
      <div className="relative z-[1] max-h-[92vh] w-full max-w-lg animate-[rise_0.22s_ease] overflow-y-auto rounded-t-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 z-10 rounded-full p-2 text-[#777] transition hover:bg-[#f4f1ea] hover:text-[#111]"
          aria-label={t.close}
        >
          <X className="h-5 w-5" />
        </button>
        <div id={titleId} className="sr-only">
          {title}
        </div>
        <ContactForm
          title={title}
          intro={intro}
          compact
          fixedConsultationType={consultationType}
          submitVia="email"
          onSubmitted={() => {
            window.setTimeout(onClose, 900);
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

type RentalRequestModalProps = {
  open: boolean;
  onClose: () => void;
  categoryTitle: string;
};

export function RentalRequestModal({
  open,
  onClose,
  categoryTitle,
}: RentalRequestModalProps) {
  const { t } = useLocale();
  return (
    <RequestFormModal
      open={open}
      onClose={onClose}
      title={t.rentalRequest}
      intro={t.rentalRequestIntro.replace("{title}", categoryTitle)}
      consultationType={t.rentalRequest}
    />
  );
}
