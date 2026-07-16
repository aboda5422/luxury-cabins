"use client";

import Image from "next/image";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  asSection?: boolean;
};

export function ClientsGrid({ asSection = true }: Props) {
  const { sampleClients } = useLocalizedCms();
  const { t } = useLocale();

  const grid = (
    <div className="container-site" dir="rtl">
      <h2 className="heading-display text-center text-3xl text-[#1a1a1a] md:text-4xl">
        {t.partnersTitle}
      </h2>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-12 md:mt-16 md:gap-x-12 md:gap-y-14">
        {sampleClients.map((client) => (
          <div
            key={`${client.nameEn}-${client.logo || client.name}`}
            className="flex h-24 w-[48%] items-center justify-center sm:w-[32%] md:h-[7.5rem] md:w-[22%]"
            title={client.name}
          >
            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={330}
                height={132}
                className="max-h-24 w-auto max-w-full object-contain md:max-h-[7.5rem]"
                unoptimized
              />
            ) : (
              <span className="select-none text-center text-base font-bold tracking-wide text-[#1a1a1a] md:text-xl">
                {client.nameEn}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (!asSection) return grid;

  return <section className="bg-white py-16 md:py-20">{grid}</section>;
}
