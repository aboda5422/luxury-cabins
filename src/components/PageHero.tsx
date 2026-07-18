import Image from "next/image";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  /** Override back target (defaults to first breadcrumb href or home) */
  backHref?: string;
  backLabel?: string;
  showBack?: boolean;
  backgroundImage?: string;
};

const DEFAULT_HERO_BG = "/images/luxury-portable-cabins-page-hero.webp";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  backHref,
  backLabel,
  showBack = true,
  backgroundImage,
}: Props) {
  const parentCrumb = breadcrumbs?.find((item) => item.href);
  const resolvedBackHref = backHref || parentCrumb?.href || "/";
  const bg = backgroundImage?.trim() || DEFAULT_HERO_BG;
  const remote = bg.startsWith("http");

  return (
    <section className="relative overflow-hidden pt-[72px] text-white md:pt-[100px]">
        <Image
          src={bg}
          alt={title ? `خلفية صفحة ${title} — Luxury Cabins` : "خلفية صفحة Luxury Cabins"}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
          unoptimized={remote}
        />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container-site relative py-16 md:py-20">
        {showBack ? (
          <div className="mb-6">
            <BackLink href={resolvedBackHref} label={backLabel} tone="dark" />
          </div>
        ) : null}

        {breadcrumbs && (
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/60">
            {breadcrumbs.map((item, i) => (
              <span key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[var(--gold)]">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/85">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="font-display mb-3 text-sm font-extrabold text-[var(--gold)] md:text-base">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display max-w-4xl text-3xl font-black leading-[1.4] md:text-5xl md:leading-[1.35] lg:text-[3.25rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/80">{description}</p>
        )}
      </div>
    </section>
  );
}
