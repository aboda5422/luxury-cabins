"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const { site, navLinks } = useLocalizedCms();
  const { t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow ${
        scrolled || open ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-3 md:h-[100px] md:gap-5">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo/logo-header.png"
            alt={site.nameEn}
            width={240}
            height={100}
            className="h-11 w-auto object-contain md:h-[4.5rem]"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={`font-display px-3 py-2 text-[17px] font-black transition ${
                pathname === link.href
                  ? "text-[var(--gold)]"
                  : "text-[#1a1a1a] hover:text-[var(--gold)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link href="/contact" className="btn-primary text-[15px] font-black md:px-7 md:py-3.5">
            {t.requestQuote}
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-[#0f0f0f]"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#eee] bg-white xl:hidden">
          <nav className="container-site flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-3">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}-m`}
                href={link.href}
                className={`px-3 py-3 text-base font-semibold ${
                  pathname === link.href ? "text-[var(--gold)]" : "text-[#333]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-2 justify-center">
              {t.requestQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
