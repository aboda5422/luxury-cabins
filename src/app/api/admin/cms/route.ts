import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readCms, writeCms } from "@/lib/cms/store";
import type { CmsData } from "@/lib/cms/types";

export async function GET() {
  const cms = await readCms();
  return NextResponse.json(cms);
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const body = (await req.json()) as CmsData;
  if (!body?.site?.nameAr) {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }
  const saved = await writeCms(body);
  return NextResponse.json(saved);
}
