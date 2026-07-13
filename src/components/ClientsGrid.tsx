"use client";

import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  asSection?: boolean;
};

export function ClientsGrid({ asSection = true }: Props) {
  const { sampleClients } = useLocalizedCms();
  const { t } = useLocale();

  const grid = (
    <div className="container-site">
      <h2 className="text-center text-3xl font-extrabold text-white md:text-4xl">
        {t.partnersTitle}
      </h2>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-12 md:mt-16 md:gap-x-14 md:gap-y-14">
        {sampleClients.map((client) => (
          <div
            key={client.nameEn}
            className="flex h-14 w-[42%] items-center justify-center sm:w-[28%] md:h-16 md:w-[16%]"
          >
            <span className="select-none text-center text-[15px] font-bold tracking-wide text-white md:text-lg">
              {client.nameEn}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (!asSection) return grid;

  return <section className="bg-[#2d2d2d] py-16 md:py-20">{grid}</section>;
}
