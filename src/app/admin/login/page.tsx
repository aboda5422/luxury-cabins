"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";

const REMEMBER_KEY = "admin-login-remember";

type SavedLogin = {
  username: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(REMEMBER_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as SavedLogin;
      if (saved?.username) setUsername(saved.username);
      if (saved?.password) setPassword(saved.password);
      setRemember(true);
    } catch {
      localStorage.removeItem(REMEMBER_KEY);
    }
  }, []);

  const canSubmit = useMemo(
    () => username.trim().length > 0 && password.trim().length > 0 && !loading,
    [loading, password, username],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || t.loginFailed);
        return;
      }

      if (remember) {
        localStorage.setItem(
          REMEMBER_KEY,
          JSON.stringify({ username: username.trim(), password } satisfies SavedLogin),
        );
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      router.replace("/admin");
    } catch {
      setError(t.connectionFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F4F0] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden border border-[#eee] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[#eee] bg-white px-8 py-8 text-center">
          <div className="mb-4 flex justify-end">
            <LanguageSwitcher />
          </div>
          <Link href="/" className="inline-flex justify-center">
            <Image
              src="/logo/logo-header.png"
              alt="Luxury Cabins"
              width={280}
              height={110}
              className="h-16 w-auto object-contain md:h-20"
              priority
              unoptimized
            />
          </Link>
          <h1 className="mt-5 text-2xl font-extrabold text-[#0f0f0f]">{t.adminLoginTitle}</h1>
          <p className="mt-2 text-sm text-[#777]">{t.adminLoginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8 py-8">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#333]">{t.username}</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field w-full"
              placeholder={t.username}
              autoComplete="username"
              autoFocus
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#333]">{t.password}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full"
              placeholder={t.password}
              autoComplete="current-password"
            />
          </label>

          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[var(--gold,#ffb400)]"
            />
            <span className="text-sm text-[#555]">{t.rememberPassword}</span>
          </label>

          {error ? (
            <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? t.loggingIn : t.login}
          </button>
        </form>
      </div>
    </div>
  );
}
