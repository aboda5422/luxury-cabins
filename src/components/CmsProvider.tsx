"use client";

import { createContext, useContext, useMemo } from "react";
import type { CmsData } from "@/lib/cms/types";
import { getDefaultCms } from "@/lib/cms/defaults";
import { useLocale } from "@/components/LocaleProvider";
import { localizeCms } from "@/lib/i18n/localize";

const CmsContext = createContext<CmsData>(getDefaultCms());

export function CmsProvider({
  value,
  children,
}: {
  value: CmsData;
  children: React.ReactNode;
}) {
  const memo = useMemo(() => value, [value]);
  return <CmsContext.Provider value={memo}>{children}</CmsContext.Provider>;
}

/** Raw Arabic CMS (admin editing). */
export function useCms() {
  return useContext(CmsContext);
}

/** Localized CMS for public pages (EN overlay when English). */
export function useLocalizedCms() {
  const cms = useCms();
  const { locale } = useLocale();
  return useMemo(() => localizeCms(cms, locale), [cms, locale]);
}
