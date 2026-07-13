"use client";

import { useLocale } from "@/components/LocaleProvider";

type Props = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({ className = "", compact = false }: Props) {
  const { locale, t, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`inline-flex items-center justify-center rounded-full border border-[#e8e4de] bg-white px-3 py-1.5 text-xs font-bold text-[#333] transition hover:border-[var(--gold)] hover:text-[var(--gold)] ${className}`}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      {compact ? (locale === "ar" ? "EN" : "ع") : t.langSwitch}
    </button>
  );
}
