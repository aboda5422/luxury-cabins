"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  href?: string;
  label?: string;
  /** Light style for dark heroes */
  tone?: "light" | "dark";
  className?: string;
};

export function BackLink({
  href = "/",
  label,
  tone = "light",
  className = "",
}: Props) {
  const { t } = useLocale();
  const text = label || t.backToHome;

  const tones =
    tone === "dark"
      ? "border-white/25 bg-white/10 text-white hover:border-[var(--gold)] hover:bg-white/15 hover:text-[var(--gold)]"
      : "border-[#e8e4de] bg-white text-[#333] shadow-sm hover:border-[var(--gold)] hover:text-[var(--gold)]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${tones} ${className}`}
    >
      <ArrowRight size={16} className="shrink-0" />
      {text}
    </Link>
  );
}
