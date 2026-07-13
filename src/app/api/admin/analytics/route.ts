import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readAnalytics, readCms } from "@/lib/cms/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const [analytics, cms] = await Promise.all([readAnalytics(), readCms()]);
  const topPages = Object.entries(analytics.pages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));

  const last7 = [...analytics.daily].slice(-7);

  return NextResponse.json({
    totalViews: analytics.totalViews,
    totalVisitors: analytics.totalVisitors,
    productsCount: cms.catalogProducts.length,
    rentalCount: cms.rentalCategories.length,
    faqsCount: cms.faqs.length,
    projectsCount: cms.projects.length,
    clientsCount: cms.sampleClients.length,
    topPages,
    last7,
    recent: analytics.recent.slice(0, 20),
    updatedAt: cms.updatedAt,
  });
}
