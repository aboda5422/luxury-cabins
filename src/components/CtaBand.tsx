import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel: string;
};

/** شريط CTA أبيض مثل الموقع المرجعي */
export function CtaBand({
  title,
  primaryHref = "/contact",
  primaryLabel,
}: Props) {
  return (
    <section className="border-t border-[#eee] bg-white py-10 md:py-12">
      <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="text-2xl font-extrabold text-[#0f0f0f] md:text-3xl lg:text-[2rem]">
          {title}
        </h2>
        <Link href={primaryHref} className="btn-primary shrink-0 px-8 py-3.5 text-[15px]">
          {primaryLabel}
        </Link>
      </div>
    </section>
  );
}
