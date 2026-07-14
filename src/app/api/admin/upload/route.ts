import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getSupabaseAdmin, getSupabasePublicUrl } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "لم يتم إرفاق ملف" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "نوع الملف غير مدعوم. استخدم JPG أو PNG أو WebP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "حجم الصورة أكبر من 8MB" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase غير مضبوط. أضف مفاتيح البيئة ثم أعد التشغيل." },
      { status: 503 },
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = EXT[file.type] || "jpg";
  const name = `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from("uploads").upload(name, buf, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return NextResponse.json(
      { error: `فشل رفع الصورة: ${error.message}` },
      { status: 500 },
    );
  }

  const publicUrl = getSupabasePublicUrl(name);
  return NextResponse.json({ url: publicUrl || `/uploads/${name}` });
}
