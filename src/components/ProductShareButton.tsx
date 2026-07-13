"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  title: string;
  text?: string;
  url: string;
  className?: string;
  label?: string;
};

export function ProductShareButton({ title, text, url, className = "", label }: Props) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const shareLabel = label || t.share;

  const absolute =
    typeof window === "undefined"
      ? url
      : new URL(url.startsWith("/") ? url : `/${url}`, window.location.origin).href;

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareText = text?.trim() || title;

    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ title, text: shareText, url: absolute });
        return;
      } catch {
        /* fall through */
      }
    }

    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={shareLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e4de] text-[#555] transition hover:text-[var(--gold)] ${
        label ? "" : "h-9 w-9"
      } ${className}`}
    >
      {copied ? <Check size={15} /> : <Share2 size={15} />}
      {label ? <span className="text-sm">{copied ? t.copied : label}</span> : null}
    </button>
  );
}
