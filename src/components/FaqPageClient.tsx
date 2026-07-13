"use client";

import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { useLocale } from "@/components/LocaleProvider";

export function FaqPageClient() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
        description={t.faqDescription}
        breadcrumbs={[{ label: t.home, href: "/" }, { label: t.faqEyebrow }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          <FaqList />
        </div>
      </section>
    </>
  );
}
