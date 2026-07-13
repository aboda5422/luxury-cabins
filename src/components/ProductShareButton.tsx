"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, Share2, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
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
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const shareLabel = label || t.share;

  const absolute =
    typeof window === "undefined"
      ? url
      : new URL(url.startsWith("/") ? url : `/${url}`, window.location.origin).href;

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const updatePos = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const menuWidth = 220;
      const pad = 8;
      let left = rect.left;
      if (left + menuWidth > window.innerWidth - pad) {
        left = window.innerWidth - menuWidth - pad;
      }
      if (left < pad) left = pad;
      setMenuPos({
        top: rect.bottom + 8,
        left,
      });
    };

    updatePos();
    const onScroll = () => updatePos();
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const shareNative = async () => {
    const shareText = text?.trim() || title;
    try {
      await navigator.share({ title, text: shareText, url: absolute });
      setOpen(false);
    } catch {
      /* cancelled */
    }
  };

  const waHref = `https://wa.me/?text=${encodeURIComponent(`${title}\n${absolute}`)}`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-label={shareLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e4de] text-[#555] transition hover:text-[var(--gold)] ${
          label ? "" : "h-9 w-9"
        } ${className}`}
      >
        <Share2 size={15} />
        {label ? <span className="text-sm">{label}</span> : null}
      </button>

      {mounted && open
        ? createPortal(
            <div
              ref={menuRef}
              id={menuId}
              role="menu"
              aria-label={shareLabel}
              className="fixed z-[120] w-[220px] overflow-hidden rounded-2xl border border-[#e8e4de] bg-white py-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.28)]"
              style={{ top: menuPos.top, left: menuPos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => void copyLink()}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-start text-sm font-medium text-[#333] transition hover:bg-[#f7f4ef]"
              >
                {copied ? (
                  <Check size={16} className="text-[var(--gold)]" />
                ) : (
                  <Copy size={16} className="text-[#666]" />
                )}
                {copied ? t.copied : t.copyLink}
              </button>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#333] transition hover:bg-[#f7f4ef]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {t.shareWhatsApp}
              </a>

              {canNativeShare ? (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => void shareNative()}
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-start text-sm font-medium text-[#333] transition hover:bg-[#f7f4ef]"
                >
                  <Share2 size={16} className="text-[#666]" />
                  {t.shareMore}
                </button>
              ) : null}

              <button
                type="button"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 border-t border-[#f0ebe4] px-3.5 py-2.5 text-start text-sm font-medium text-[#777] transition hover:bg-[#f7f4ef]"
              >
                <X size={16} />
                {t.close}
              </button>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
