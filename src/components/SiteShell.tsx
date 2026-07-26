"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer), {
  loading: () => null,
  ssr: true,
});

const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton").then((m) => m.WhatsAppButton),
  { ssr: false, loading: () => null },
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <AnalyticsBeacon />
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
