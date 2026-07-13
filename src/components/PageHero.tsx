import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHero({ eyebrow, title, description, breadcrumbs }: Props) {
  return (
    <section className="relative overflow-hidden pt-[72px] text-white md:pt-[100px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/cover-hero.webp)" }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container-site relative py-16 md:py-20">
        {breadcrumbs && (
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/60">
            {breadcrumbs.map((item, i) => (
              <span key={item.label} className="inline-flex items-center gap-2">
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
