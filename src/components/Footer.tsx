"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { CtaBand } from "@/components/CtaBand";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick } from "@/lib/analytics";

const ADMIN_LONG_PRESS_MS = 2500;
const iconClass = "h-[18px] w-[18px]";
const linkClass = "inline-flex text-[#666] transition hover:text-[var(--gold)]";

function SocialLink({
  href,
  label,
  children,
  onClick,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ready = Boolean(href?.trim());
  if (!ready) {
    return (
      <span aria-label={label} title={label} className={`${linkClass} cursor-default opacity-40`}>
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={linkClass}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.4-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.9h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-extrabold text-[#0f0f0f]">{children}</h3>
      <span className="mt-2 block h-[3px] w-10 bg-[var(--gold)]" />
    </div>
  );
}

export function Footer() {
  const router = useRouter();
  const { site, home, footer } = useLocalizedCms();
  const { t } = useLocale();
  const [subscribed, setSubscribed] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearPressTimer() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }

  function startAdminPress() {
    clearPressTimer();
    pressTimer.current = setTimeout(() => {
      pressTimer.current = null;
      router.push("/admin/login");
    }, ADMIN_LONG_PRESS_MS);
  }

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const text = encodeURIComponent(`${t.newsletterWaPrefix} ${email}`);
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    trackWhatsAppClick("newsletter");
    setSubscribed(true);
  }

  return (
    <>
      <CtaBand title={home.ctaBandTitle} primaryLabel={home.ctaBandButton} />

      <footer className="bg-[#F3F1EE] text-[#2a2a2a]">
        <div className="container-site section-pad grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <button
              type="button"
              className="mb-6 block w-full max-w-[300px] cursor-default select-none border-0 bg-transparent p-0 md:max-w-[340px]"
              aria-hidden
              tabIndex={-1}
              onPointerDown={startAdminPress}
              onPointerUp={clearPressTimer}
              onPointerLeave={clearPressTimer}
              onPointerCancel={clearPressTimer}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src="/logo/logo-footer.png"
                alt={site.nameAr}
                width={420}
                height={180}
                className="pointer-events-none h-auto w-full object-contain"
                unoptimized
                draggable={false}
              />
            </button>
            <p className="text-sm leading-7 text-[#555]">{site.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              <SocialLink
                href={`https://wa.me/${site.whatsapp}`}
                label={t.whatsapp}
                onClick={() => trackWhatsAppClick("footer")}
              >
                <WhatsAppIcon className={iconClass} />
              </SocialLink>
              <SocialLink href={site.social?.instagram} label="Instagram">
                <InstagramIcon className={iconClass} />
              </SocialLink>
              <SocialLink href={site.social?.facebook} label="Facebook">
                <FacebookIcon className={iconClass} />
              </SocialLink>
              <SocialLink href={site.social?.twitter} label="X">
                <XIcon className={iconClass} />
              </SocialLink>
              <SocialLink href={site.social?.linkedin} label="LinkedIn">
                <LinkedInIcon className={iconClass} />
              </SocialLink>
            </div>
          </div>

          <div>
            <FooterHeading>{footer.servicesTitle}</FooterHeading>
            <ul className="space-y-2.5 text-sm text-[#555]">
              {footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-[var(--gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>{footer.companyTitle}</FooterHeading>
            <ul className="space-y-2.5 text-sm text-[#555]">
              {footer.companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="transition hover:text-[var(--gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>{footer.newsletterTitle}</FooterHeading>
            <p className="mb-4 text-sm leading-7 text-[#555]">{footer.newsletterBody}</p>
            <form onSubmit={onSubscribe} className="space-y-3">
              <input
                name="email"
                type="email"
                required
                placeholder={footer.newsletterPlaceholder}
                className="input-field bg-white"
                dir="ltr"
              />
              <button type="submit" className="btn-primary w-full justify-center">
                {footer.newsletterButton}
              </button>
              {subscribed && (
                <p className="text-xs font-semibold text-[var(--gold)]">{t.newsletterDone}</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-[#e0ddd8]">
          <div className="container-site flex flex-col gap-3 py-5 text-center text-xs text-[#777] md:flex-row md:items-center md:justify-between md:text-start">
            <p>
              © {site.nameEn} {new Date().getFullYear()}. {t.copyright}
            </p>
            <p>{site.legalName}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="hover:text-[var(--gold)]">
                {t.terms}
              </Link>
              <Link href="/contact" className="hover:text-[var(--gold)]">
                {t.privacy}
              </Link>
              <span>
                {t.commercialRegister} {site.commercialRegister}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
