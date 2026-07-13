import { NextResponse } from "next/server";
import { adminPassword, adminUsername, setAdminSession } from "@/lib/cms/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    username?: string;
    password?: string;
  };

  const username = (body.username || "").trim();
  const password = body.password || "";

  if (!username || !password || username !== adminUsername() || password !== adminPassword()) {
    return NextResponse.json(
      { error: "اسم المستخدم أو كلمة المرور غير صحيحة" },
      { status: 401 },
    );
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
