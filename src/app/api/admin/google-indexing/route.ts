import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { runGoogleIndexing } from "@/lib/google-indexing/service";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  let body: { url?: string; urls?: string[]; mode?: "url" | "sitemap" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const report = await runGoogleIndexing(body);
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Indexing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
