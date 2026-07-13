import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "lc_admin_session";

function secret() {
  return process.env.ADMIN_SECRET || "luxury-cabins-admin-secret-change-me";
}

export function adminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function signToken(payload: string) {
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}

export async function setAdminSession() {
  const jar = await cookies();
  const token = signToken(`admin:${Date.now()}`);
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export { COOKIE };
