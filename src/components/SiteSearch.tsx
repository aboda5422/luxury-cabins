"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { productPath } from "@/lib/seo/products";

type SearchHit = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  kind: "product" | "rental" | "service" | "page";
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F]/g, "")
    .trim();
}

export function SiteSearch() {
  const { catalogProducts, rentalCategories, services, navLinks } = useLocalizedCms();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    const onHotkey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onHotkey);
    return () => window.removeEventListener("keydown", onHotkey);
  }, []);

  const kindLabel = useCallback(
    (kind: SearchHit["kind"]) => {
      if (kind === "product") return t.searchKindProduct;
      if (kind === "rental") return t.searchKindRental;
      if (kind === "service") return t.searchKindService;
      return t.searchKindPage;
    },
    [t],
  );

  const catalog = useMemo<SearchHit[]>(() => {
    const pages: SearchHit[] = navLinks.map((link) => ({
      id: `page-${link.href}`,
      title: link.label,
      subtitle: t.searchPageHint,
      href: link.href,
      kind: "page",
    }));

    const productHits: SearchHit[] = catalogProducts.map((p) => ({
      id: `product-${p.id}`,
      title: p.title,
      subtitle: p.shortDescription,
      href: productPath(p),
      image: p.images[0],
      kind: "product",
    }));

    const rentalHits: SearchHit[] = rentalCategories.map((c) => ({
      id: `rental-${c.id}`,
      title: c.title,
      subtitle: c.shortDescription,
      href: "/rental",
      image: c.images[0],
      kind: "rental",
    }));

    const serviceHits: SearchHit[] = services.map((s) => ({
      id: `service-${s.id}`,
      title: s.title,
      subtitle: s.short,
      href: s.href,
      image: s.image,
      kind: "service",
    }));

    return [...productHits, ...rentalHits, ...serviceHits, ...pages];
  }, [catalogProducts, rentalCategories, services, navLinks, t.searchPageHint]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return catalog.slice(0, 8);
    return catalog
      .filter((item) => {
        const hay = normalize(`${item.title} ${item.subtitle} ${kindLabel(item.kind)}`);
        return hay.includes(q);
      })
      .slice(0, 10);
  }, [catalog, query, kindLabel]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#555] transition hover:bg-[#f4f1ea] hover:text-[#111]"
        aria-label={t.searchOpen}
        title={`${t.searchOpen} (Ctrl+K)`}
      >
        <Search size={18} strokeWidth={1.75} />
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[110] flex items-start justify-center bg-black/45 px-4 pt-[12vh] sm:pt-[14vh]"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                type="button"
                className="absolute inset-0"
                aria-label={t.close}
                onClick={close}
              />
              <div className="relative z-[1] w-full max-w-xl overflow-hidden rounded-3xl border border-[#ebe4da] bg-white shadow-[0_28px_80px_-24px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-2 border-b border-[#efe8da] px-4 py-3">
                  <Search size={18} className="shrink-0 text-[#999]" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="min-w-0 flex-1 bg-transparent text-base text-[#111] outline-none placeholder:text-[#aaa]"
                    aria-labelledby={titleId}
                  />
                  <span id={titleId} className="sr-only">
                    {t.searchOpen}
                  </span>
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="rounded-full p-1.5 text-[#888] hover:bg-[#f4f1ea] hover:text-[#111]"
                      aria-label={t.searchClear}
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <kbd className="hidden rounded-md border border-[#e8e4de] px-1.5 py-0.5 text-[10px] font-semibold text-[#999] sm:inline">
                      Esc
                    </kbd>
                  )}
                </div>

                <div className="max-h-[min(58vh,28rem)] overflow-y-auto py-2">
                  {results.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-[#777]">{t.searchEmpty}</p>
                  ) : (
                    <ul className="px-2">
                      {!query ? (
                        <li className="px-3 pb-2 pt-1 text-xs font-bold tracking-wide text-[#999]">
                          {t.searchSuggestions}
                        </li>
                      ) : null}
                      {results.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-[#f7f4ef]"
                          >
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#f0ebe4]">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center text-[#bbb]">
                                  <Search size={16} />
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-[#151515]">
                                {item.title}
                              </p>
                              <p className="mt-0.5 truncate text-xs text-[#888]">
                                {kindLabel(item.kind)} · {item.subtitle}
                              </p>
                            </div>
                            <ArrowLeft size={14} className="shrink-0 text-[#ccc]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
