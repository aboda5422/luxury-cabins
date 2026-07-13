import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { trackPageView } from "@/lib/cms/store";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { path?: string };
  const pathName = body.path || "/";
  if (pathName.startsWith("/admin") || pathName.startsWith("/api")) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const jar = await cookies();
  let visitorId = jar.get("lc_vid")?.value;
  const res = NextResponse.json({ ok: true });

  if (!visitorId) {
    visitorId = `v_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
    res.cookies.set("lc_vid", visitorId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  try {
    await trackPageView(pathName, visitorId);
  } catch {
    /* analytics is best-effort on read-only hosts (e.g. Cloudflare Workers) */
  }
  return res;
}
