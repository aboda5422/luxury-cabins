"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type {
  AnalyticsData,
  CatalogProduct,
  ClientItem,
  CmsData,
  FaqItem,
  NavLink,
  ProcessStep,
  ProjectItem,
  RentalCategory,
  ServiceItem,
  StatItem,
} from "@/lib/cms/types";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  Clock3,
  Database,
  FileText,
  House,
  ImagePlus,
  Info,
  LoaderCircle,
  LogOut,
  Menu,
  MousePointerClick,
  Package2,
  PanelRightClose,
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Users2,
  Wrench,
  Boxes,
  X,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";

type AdminAnalytics = AnalyticsData & {
  productsCount: number;
  rentalCount: number;
  faqsCount: number;
  projectsCount: number;
  clientsCount: number;
  topPages: { path: string; views: number }[];
  last7: { date: string; views: number; visitors: number }[];
  updatedAt: string;
};

type TabId =
  | "dashboard"
  | "company"
  | "menu"
  | "home"
  | "services"
  | "process"
  | "catalog"
  | "rentals"
  | "manufacturing"
  | "projects"
  | "clients"
  | "faqs"
  | "about"
  | "footer";

type Toast = {
  kind: "success" | "error" | "info";
  message: string;
};

type ListEditorProps<T> = {
  title: string;
  description: string;
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  getKey: (item: T, index: number) => string;
  renderItem: (
    item: T,
    index: number,
    update: (next: T) => void,
  ) => ReactNode;
};

type TextListEditorProps = {
  title: string;
  description: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
};

const sidebarItems: Array<{
  id: TabId;
  icon: ComponentType<{ className?: string }>;
}> = [
  { id: "dashboard", icon: BarChart3 },
  { id: "company", icon: Building2 },
  { id: "menu", icon: PencilLine },
  { id: "home", icon: House },
  { id: "services", icon: Package2 },
  { id: "process", icon: Wrench },
  { id: "catalog", icon: Boxes },
  { id: "rentals", icon: BriefcaseBusiness },
  { id: "manufacturing", icon: Sparkles },
  { id: "projects", icon: Database },
  { id: "clients", icon: Users2 },
  { id: "faqs", icon: CircleHelp },
  { id: "about", icon: Info },
  { id: "footer", icon: FileText },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function toLines(values: string[]) {
  return values.join("\n");
}

function fromLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatDate(value: string, localeTag = "ar-SA") {
  try {
    return new Intl.DateTimeFormat(localeTag, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function initialCatalogProduct(): CatalogProduct {
  return {
    id: makeId("product"),
    title: "",
    shortDescription: "",
    description: "",
    priceLabel: "",
    priceNote: "",
    specs: [],
    images: [],
  };
}

function initialRentalCategory(): RentalCategory {
  return {
    id: makeId("rental"),
    title: "",
    shortDescription: "",
    description: "",
    specs: [],
    images: [],
    whatsappMessage: "",
  };
}

function initialService(): ServiceItem {
  return {
    id: makeId("service"),
    title: "",
    short: "",
    href: "",
    image: "",
  };
}

function initialProcessStep(): ProcessStep {
  return {
    step: "",
    title: "",
    description: "",
  };
}

function initialProject(): ProjectItem {
  return {
    title: "",
    location: "",
    category: "",
    image: "",
  };
}

function initialClient(): ClientItem {
  return {
    name: "",
    nameEn: "",
    sector: "",
  };
}

function initialFaq(): FaqItem {
  return {
    q: "",
    a: "",
  };
}

function initialNavLink(): NavLink {
  return {
    href: "",
    label: "",
  };
}

function initialStat(): StatItem {
  return {
    value: "",
    label: "",
  };
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#1e1e1e]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d9d1c0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#ffb400] focus:ring-4 focus:ring-[#ffb400]/10"
      />
    </label>
  );
}

async function uploadAdminImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "تعذّر رفع الصورة");
  }
  if (!data?.url) throw new Error("تعذّر رفع الصورة");
  return data.url as string;
}

function ImageUploadField({
  label,
  value,
  onChange,
  fallback = "",
  aspectClass = "aspect-[16/10]",
  className = "md:col-span-2",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fallback?: string;
  aspectClass?: string;
  className?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = value?.trim() || fallback;
  const hasImage = Boolean(preview);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      onChange(await uploadAdminImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذّر رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className}>
      <span className="mb-2 block text-sm font-bold text-[#1e1e1e]">{label}</span>
      <div className="overflow-hidden rounded-2xl border border-[#d9d1c0] bg-white">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className={`group relative flex w-full ${aspectClass} items-center justify-center bg-[#f7f4ef] transition hover:bg-[#f0ebe3] disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {hasImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt={label} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#111] shadow-lg opacity-90 transition group-hover:opacity-100">
                {uploading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
              </span>
              <span className="absolute bottom-3 start-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white">
                {uploading ? (
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ImagePlus className="h-3.5 w-3.5" />
                )}
                {uploading ? "جارٍ الرفع..." : "تغيير الصورة"}
              </span>
            </>
          ) : (
            <span className="flex flex-col items-center gap-2 text-[#666]">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-[#cfc5b4] bg-white text-[#111]">
                {uploading ? (
                  <LoaderCircle className="h-6 w-6 animate-spin" />
                ) : (
                  <ImagePlus className="h-6 w-6" />
                )}
              </span>
              <span className="text-sm font-bold">
                {uploading ? "جارٍ الرفع..." : "تحميل صورة"}
              </span>
            </span>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onFileChange}
        />
        {error ? (
          <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

function ImageGalleryField({
  label,
  values,
  onChange,
  className = "md:col-span-2",
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const images = values.filter(Boolean);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;

    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        uploaded.push(await uploadAdminImage(file));
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذّر رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className}>
      <span className="mb-2 block text-sm font-bold text-[#1e1e1e]">{label}</span>
      <div className="rounded-2xl border border-[#d9d1c0] bg-white p-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-[#efe8da] bg-[#f7f4ef]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, i) => i !== index))}
                className="absolute end-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="حذف الصورة"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#cfc5b4] bg-[#faf8f4] text-[#555] transition hover:border-[#ffb400] hover:bg-[#fff8e8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <LoaderCircle className="h-6 w-6 animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6" />
            )}
            <span className="px-2 text-center text-xs font-bold">
              {uploading ? "جارٍ الرفع..." : "تحميل صور"}
            </span>
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      </div>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#1e1e1e]">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-2xl border border-[#d9d1c0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#ffb400] focus:ring-4 focus:ring-[#ffb400]/10"
      />
    </label>
  );
}

function SectionCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-[#e4dbc9] bg-white p-5 shadow-[0_20px_60px_-35px_rgba(16,16,16,0.2)] md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#121212]">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#666]">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-[1.75rem] border border-[#eadfca] bg-gradient-to-br from-white to-[#fbf8f2] p-5 shadow-[0_16px_45px_-25px_rgba(15,15,15,0.25)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6b6b6b]">{label}</p>
          <p className="mt-3 text-3xl font-black text-[#131313]">{value}</p>
        </div>
        <div className="rounded-2xl bg-[#ffb400]/10 p-3 text-[#c68a00]">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function ListEditor<T>({
  title,
  description,
  items,
  onChange,
  createItem,
  getKey,
  renderItem,
}: ListEditorProps<T>) {
  const deleteItem = (index: number) => {
    if (!window.confirm("هل تريد حذف هذا العنصر؟")) {
      return;
    }
    onChange(items.filter((_, current) => current !== index));
  };

  return (
    <div className="rounded-[2rem] border border-[#e4dbc9] bg-[#fffdfa] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#181818]">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#666]">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...items, createItem()])}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#ffb400] px-4 py-3 text-sm font-black text-[#121212] transition hover:bg-[#ffc62b]"
        >
          <Plus className="h-4 w-4" />
          إضافة عنصر
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {items.length ? (
          items.map((item, index) => (
            <div
              key={getKey(item, index)}
              className="rounded-[1.75rem] border border-[#eadfca] bg-white shadow-sm"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#f0e5cf] px-4 py-3">
                <div className="text-sm font-bold text-[#333]">عنصر {index + 1}</div>
                <button
                  type="button"
                  onClick={() => deleteItem(index)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </button>
              </div>
              <div className="space-y-4 p-4">
                {renderItem(item, index, (next) => {
                  const nextItems = [...items];
                  nextItems[index] = next;
                  onChange(nextItems);
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d9cfbb] bg-white px-4 py-8 text-center text-sm text-[#666]">
            لا توجد عناصر بعد. أضف أول عنصر لبدء التحرير.
          </div>
        )}
      </div>
    </div>
  );
}

function TextListEditor({
  title,
  description,
  items,
  onChange,
  placeholder = "اكتب القيمة هنا",
}: TextListEditorProps) {
  const deleteItem = (index: number) => {
    if (!window.confirm("هل تريد حذف هذا العنصر؟")) {
      return;
    }
    onChange(items.filter((_, current) => current !== index));
  };

  return (
    <div className="rounded-[2rem] border border-[#e4dbc9] bg-[#fffdfa] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#181818]">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#666]">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#ffb400] px-4 py-3 text-sm font-black text-[#121212] transition hover:bg-[#ffc62b]"
        >
          <Plus className="h-4 w-4" />
          إضافة عنصر
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {items.length ? (
          items.map((item, index) => (
            <div key={`${title}-${index}`} className="flex gap-3">
              <input
                value={item}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
                className="min-w-0 flex-1 rounded-2xl border border-[#d9d1c0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#ffb400] focus:ring-4 focus:ring-[#ffb400]/10"
              />
              <button
                type="button"
                onClick={() => deleteItem(index)}
                className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 text-red-700 transition hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d9cfbb] bg-white px-4 py-8 text-center text-sm text-[#666]">
            لا توجد عناصر بعد. أضف أول عنصر لبدء التحرير.
          </div>
        )}
      </div>
    </div>
  );
}

function LinkListEditor({
  title,
  description,
  items,
  onChange,
  placeholderLabel = "العنوان",
}: {
  title: string;
  description: string;
  items: NavLink[];
  onChange: (items: NavLink[]) => void;
  placeholderLabel?: string;
}) {
  return (
    <ListEditor
      title={title}
      description={description}
      items={items}
      onChange={onChange}
      createItem={initialNavLink}
      getKey={(item, index) => `${item.href || "link"}-${index}`}
      renderItem={(item, _index, update) => (
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="الرابط"
            value={item.href}
            onChange={(href) => update({ ...item, href })}
            placeholder="/contact"
          />
          <Field
            label={placeholderLabel}
            value={item.label}
            onChange={(label) => update({ ...item, label })}
            placeholder="عنوان العنصر"
          />
        </div>
      )}
    />
  );
}

function ObjectListEditor<T>({
  title,
  description,
  items,
  onChange,
  createItem,
  getKey,
  renderItem,
}: ListEditorProps<T>) {
  return (
    <ListEditor
      title={title}
      description={description}
      items={items}
      onChange={onChange}
      createItem={createItem}
      getKey={getKey}
      renderItem={renderItem}
    />
  );
}

export function AdminApp() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const dateLocale = locale === "en" ? "en-US" : "ar-SA";
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [cms, setCms] = useState<CmsData | null>(null);
  const [initialCms, setInitialCms] = useState<CmsData | null>(null);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loadingCms, setLoadingCms] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [cmsError, setCmsError] = useState("");
  const [analyticsError, setAnalyticsError] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dirty = useMemo(() => {
    if (!cms || !initialCms) return false;
    return JSON.stringify(cms) !== JSON.stringify(initialCms);
  }, [cms, initialCms]);

  const applyCms = (mutator: (draft: CmsData) => void) => {
    setCms((current) => {
      if (!current) return current;
      const next = clone(current);
      mutator(next);
      return next;
    });
  };

  const showToast = (kind: Toast["kind"], message: string) => {
    setToast({ kind, message });
  };

  const loadCms = async () => {
    setLoadingCms(true);
    setCmsError("");
    try {
      const res = await fetch("/api/admin/cms", { cache: "no-store" });
      const data = (await res.json().catch(() => null)) as CmsData | null;

      if (!res.ok || !data) {
        throw new Error("تعذر تحميل بيانات CMS");
      }

      setCms(data);
      setInitialCms(clone(data));
    } catch (error) {
      setCmsError(error instanceof Error ? error.message : "تعذر تحميل بيانات CMS");
    } finally {
      setLoadingCms(false);
    }
  };

  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    setAnalyticsError("");
    try {
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
      const data = (await res.json().catch(() => null)) as AdminAnalytics | null;

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!res.ok || !data) {
        throw new Error("تعذر تحميل الإحصاءات");
      }

      setAnalytics(data);
    } catch (error) {
      setAnalyticsError(error instanceof Error ? error.message : "تعذر تحميل الإحصاءات");
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    void loadCms();
    void loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const saveCms = async () => {
    if (!cms) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cms),
      });
      const data = (await res.json().catch(() => null)) as CmsData | { error?: string } | null;

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!res.ok || !data || "error" in data) {
        throw new Error((data && "error" in data && data.error) || "تعذر حفظ التغييرات");
      }

      const saved = data as CmsData;
      setCms(saved);
      setInitialCms(clone(saved));
      showToast("success", "تم الحفظ بنجاح");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "تعذر حفظ التغييرات");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  const handleReloadCms = async () => {
    if (dirty && !window.confirm("توجد تغييرات غير محفوظة. هل تريد إعادة التحميل؟")) {
      return;
    }
    await loadCms();
    showToast("info", "تم تحديث البيانات");
  };

  const renderDashboard = () => {
    const cards = [
      {
        label: "إجمالي الزيارات",
        value: analytics?.totalViews ?? "—",
        icon: MousePointerClick,
      },
      {
        label: "عدد الزوار",
        value: analytics?.totalVisitors ?? "—",
        icon: Users2,
      },
      {
        label: "عدد المنتجات",
        value: analytics?.productsCount ?? cms?.catalogProducts.length ?? "—",
        icon: Boxes,
      },
      {
        label: "فئات التأجير",
        value: analytics?.rentalCount ?? cms?.rentalCategories.length ?? "—",
        icon: BriefcaseBusiness,
      },
      {
        label: "FAQ",
        value: analytics?.faqsCount ?? cms?.faqs.length ?? "—",
        icon: CircleHelp,
      },
      {
        label: "المشاريع",
        value: analytics?.projectsCount ?? cms?.projects.length ?? "—",
        icon: Database,
      },
    ];

    const maxViews = Math.max(...(analytics?.last7 ?? []).map((day) => day.views), 1);

    return (
      <div className="space-y-6">
        <SectionCard
          title="لوحة المؤشرات"
          description="ملخص سريع لحركة الموقع وحالة المحتوى الحالي."
          action={
            <button
              type="button"
              onClick={loadAnalytics}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#e3d7c0] bg-white px-4 py-3 text-sm font-bold text-[#1a1a1a] transition hover:border-[#ffb400] hover:text-[#b27a00]"
            >
              {loadingAnalytics ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              تحديث الإحصاءات
            </button>
          }
        >
          {analyticsError ? (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {analyticsError}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                icon={card.icon}
              />
            ))}
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-[#eadfca] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-[#181818]">أكثر الصفحات زيارة</h3>
                <span className="text-xs font-bold text-[#7a6b4d]">Top pages</span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-right text-sm">
                  <thead className="text-[#6c6c6c]">
                    <tr className="[&>th]:border-b [&>th]:border-[#eee2cc] [&>th]:px-3 [&>th]:py-3">
                      <th>الصفحة</th>
                      <th>الزيارات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(analytics?.topPages ?? []).map((page) => (
                      <tr
                        key={page.path}
                        className="[&>td]:border-b [&>td]:border-[#f1eadb] [&>td]:px-3 [&>td]:py-3"
                      >
                        <td className="font-medium text-[#222]">{page.path}</td>
                        <td className="font-bold text-[#111]">{page.views}</td>
                      </tr>
                    ))}
                    {!analytics?.topPages?.length ? (
                      <tr>
                        <td colSpan={2} className="px-3 py-6 text-center text-[#777]">
                          لا توجد بيانات حتى الآن
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#eadfca] bg-white p-5">
              <h3 className="text-lg font-black text-[#181818]">آخر 7 أيام</h3>
              <div className="mt-4 space-y-4">
                {(analytics?.last7 ?? []).map((day) => (
                  <div key={day.date} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-[#222]">{day.date}</span>
                      <span className="text-[#6a6a6a]">
                        {day.views} زيارة · {day.visitors} زائر
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-[#efe4cf]">
                      <div
                        className="h-3 rounded-full bg-[#ffb400]"
                        style={{ width: `${Math.max((day.views / maxViews) * 100, 8)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {!analytics?.last7?.length ? (
                  <div className="rounded-2xl border border-dashed border-[#d9cfbb] bg-[#fffdfa] px-4 py-8 text-center text-sm text-[#666]">
                    لا توجد زيارات يومية مسجلة بعد
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-[#eadfca] bg-white p-5">
            <h3 className="text-lg font-black text-[#181818]">آخر الزيارات</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-right text-sm">
                <thead className="text-[#6c6c6c]">
                  <tr className="[&>th]:border-b [&>th]:border-[#eee2cc] [&>th]:px-3 [&>th]:py-3">
                    <th>المسار</th>
                    <th>الوقت</th>
                    <th>الزائر</th>
                  </tr>
                </thead>
                <tbody>
                  {(analytics?.recent ?? []).slice(0, 10).map((visit) => (
                    <tr
                      key={`${visit.at}-${visit.visitorId}`}
                      className="[&>td]:border-b [&>td]:border-[#f1eadb] [&>td]:px-3 [&>td]:py-3"
                    >
                      <td className="font-medium text-[#222]">{visit.path}</td>
                      <td className="text-[#666]">{formatDate(visit.at)}</td>
                      <td className="font-mono text-xs text-[#666]">{visit.visitorId}</td>
                    </tr>
                  ))}
                  {!analytics?.recent?.length ? (
                    <tr>
                      <td colSpan={3} className="px-3 py-6 text-center text-[#777]">
                        لا توجد زيارات حديثة بعد
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>
      </div>
    );
  };

  const renderCompany = () => {
    if (!cms) return null;

    return (
      <SectionCard
        title="بيانات الشركة"
        description="اسم الشركة ووسائل التواصل والعناوين الأساسية التي تظهر في الموقع."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="الاسم العربي"
            value={cms.site.nameAr}
            onChange={(value) => applyCms((draft) => void (draft.site.nameAr = value))}
          />
          <Field
            label="الاسم الإنجليزي"
            value={cms.site.nameEn}
            onChange={(value) => applyCms((draft) => void (draft.site.nameEn = value))}
          />
          <Field
            label="الاسم النظامي"
            value={cms.site.legalName}
            onChange={(value) => applyCms((draft) => void (draft.site.legalName = value))}
          />
          <Field
            label="السجل التجاري"
            value={cms.site.commercialRegister}
            onChange={(value) => applyCms((draft) => void (draft.site.commercialRegister = value))}
          />
          <Field
            label="الوسم التعريفي"
            value={cms.site.tagline}
            onChange={(value) => applyCms((draft) => void (draft.site.tagline = value))}
          />
          <div className="md:col-span-2">
            <TextareaField
              label="وصف الشركة (يظهر في الفوتر)"
              value={cms.site.description}
              onChange={(value) => applyCms((draft) => void (draft.site.description = value))}
              rows={4}
            />
          </div>
          <Field
            label="الهاتف"
            value={cms.site.phone}
            onChange={(value) => applyCms((draft) => void (draft.site.phone = value))}
          />
          <Field
            label="الهاتف المعروض"
            value={cms.site.phoneDisplay}
            onChange={(value) => applyCms((draft) => void (draft.site.phoneDisplay = value))}
          />
          <Field
            label="واتساب"
            value={cms.site.whatsapp}
            onChange={(value) => applyCms((draft) => void (draft.site.whatsapp = value))}
          />
          <Field
            label="البريد الإلكتروني"
            value={cms.site.email}
            onChange={(value) => applyCms((draft) => void (draft.site.email = value))}
          />
          <Field
            label="Instagram"
            value={cms.site.social?.instagram || ""}
            onChange={(value) =>
              applyCms((draft) => {
                draft.site.social = { ...draft.site.social, instagram: value };
              })
            }
          />
          <Field
            label="Facebook"
            value={cms.site.social?.facebook || ""}
            onChange={(value) =>
              applyCms((draft) => {
                draft.site.social = { ...draft.site.social, facebook: value };
              })
            }
          />
          <Field
            label="X / Twitter"
            value={cms.site.social?.twitter || ""}
            onChange={(value) =>
              applyCms((draft) => {
                draft.site.social = { ...draft.site.social, twitter: value };
              })
            }
          />
          <Field
            label="LinkedIn"
            value={cms.site.social?.linkedin || ""}
            onChange={(value) =>
              applyCms((draft) => {
                draft.site.social = { ...draft.site.social, linkedin: value };
              })
            }
          />
          <Field
            label="العنوان"
            value={cms.site.address}
            onChange={(value) => applyCms((draft) => void (draft.site.address = value))}
          />
          <Field
            label="تفاصيل العنوان"
            value={cms.site.addressDetail}
            onChange={(value) => applyCms((draft) => void (draft.site.addressDetail = value))}
          />
        </div>

        <div className="mt-5">
          <TextListEditor
            title="المدن"
            description="أضف المدن التي نخدمها في الموقع."
            items={cms.site.cities}
            onChange={(items) => applyCms((draft) => void (draft.site.cities = items))}
            placeholder="اسم المدينة"
          />
        </div>
      </SectionCard>
    );
  };

  const renderMenu = () => {
    if (!cms) return null;
    return (
      <SectionCard
        title="القائمة"
        description="إدارة روابط التنقل الرئيسية التي تظهر في أعلى الموقع."
      >
        <LinkListEditor
          title="روابط القائمة"
          description="أضف أو عدل أو احذف روابط القائمة حسب الحاجة."
          items={cms.navLinks}
          onChange={(items) => applyCms((draft) => void (draft.navLinks = items))}
        />
      </SectionCard>
    );
  };

  const renderHome = () => {
    if (!cms) return null;
    return (
      <SectionCard
        title="الصفحة الرئيسية"
        description="نصوص البطل والرؤية والـ CTA وخطوات العمل في الصفحة الرئيسية."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="عنوان البطل"
            value={cms.home.heroTitle}
            onChange={(value) => applyCms((draft) => void (draft.home.heroTitle = value))}
          />
          <Field
            label="العنوان الفرعي"
            value={cms.home.heroSubtitle}
            onChange={(value) => applyCms((draft) => void (draft.home.heroSubtitle = value))}
          />
          <Field
            label="زر البطل"
            value={cms.home.heroCta}
            onChange={(value) => applyCms((draft) => void (draft.home.heroCta = value))}
          />
          <ImageUploadField
            label="صورة الهيرو"
            value={cms.home.heroImage || "/images/cover-hero.webp"}
            onChange={(value) => applyCms((draft) => void (draft.home.heroImage = value))}
            fallback="/images/cover-hero.webp"
            aspectClass="aspect-[21/9]"
          />
          <Field
            label="عنوان الرؤية"
            value={cms.home.visionTitle}
            onChange={(value) => applyCms((draft) => void (draft.home.visionTitle = value))}
          />
          <Field
            label="زر الرؤية"
            value={cms.home.visionCta}
            onChange={(value) => applyCms((draft) => void (draft.home.visionCta = value))}
          />
          <ImageUploadField
            label="صورة قسم الرؤية"
            value={cms.home.visionImage || "/images/vision-side.jpg"}
            fallback="/images/vision-side.jpg"
            aspectClass="aspect-[3/4] max-w-sm"
            onChange={(value) => applyCms((draft) => void (draft.home.visionImage = value))}
          />
          <Field
            label="بداية خطوات العمل"
            value={cms.home.processEyebrow}
            onChange={(value) => applyCms((draft) => void (draft.home.processEyebrow = value))}
          />
          <Field
            label="عنوان كيف نعمل"
            value={cms.home.processTitle}
            onChange={(value) => applyCms((draft) => void (draft.home.processTitle = value))}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextareaField
            label="وصف الرؤية"
            value={cms.home.visionBody}
            onChange={(value) => applyCms((draft) => void (draft.home.visionBody = value))}
            rows={6}
          />
          <TextareaField
            label="وصف خطوات العمل"
            value={cms.home.processSubtitle}
            onChange={(value) => applyCms((draft) => void (draft.home.processSubtitle = value))}
            rows={6}
          />
          <TextareaField
            label="عنوان اتصل بنا"
            value={cms.home.contactTitle}
            onChange={(value) => applyCms((draft) => void (draft.home.contactTitle = value))}
            rows={4}
          />
          <TextareaField
            label="نص الاتصال"
            value={cms.home.contactSubtitle}
            onChange={(value) => applyCms((draft) => void (draft.home.contactSubtitle = value))}
            rows={4}
          />
          <TextareaField
            label="شريط الدعوة"
            value={cms.home.ctaBandTitle}
            onChange={(value) => applyCms((draft) => void (draft.home.ctaBandTitle = value))}
            rows={4}
          />
          <TextareaField
            label="زر شريط الدعوة"
            value={cms.home.ctaBandButton}
            onChange={(value) => applyCms((draft) => void (draft.home.ctaBandButton = value))}
            rows={4}
          />
        </div>
      </SectionCard>
    );
  };

  const renderServices = () => {
    if (!cms) return null;
    return (
      <SectionCard
        title="الخدمات"
        description="عناوين قسم الخدمات في الصفحة الرئيسية وبطاقات الخدمات."
      >
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Field
            label="بداية قسم الخدمات"
            value={cms.home.servicesEyebrow}
            onChange={(value) => applyCms((draft) => void (draft.home.servicesEyebrow = value))}
          />
          <Field
            label="عنوان الخدمات"
            value={cms.home.servicesTitle}
            onChange={(value) => applyCms((draft) => void (draft.home.servicesTitle = value))}
          />
          <div className="md:col-span-2">
            <Field
              label="السطر الثاني للخدمات"
              value={cms.home.servicesTitleLine2}
              onChange={(value) => applyCms((draft) => void (draft.home.servicesTitleLine2 = value))}
            />
          </div>
        </div>
        <ObjectListEditor
          title="قائمة الخدمات"
          description="كل خدمة تحتوي على عنوان ووصف مختصر ورابط، مع تحميل صورة."
          items={cms.services}
          onChange={(items) => applyCms((draft) => void (draft.services = items))}
          createItem={initialService}
          getKey={(item, index) => `${item.id}-${index}`}
          renderItem={(item, _index, update) => (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="المعرف" value={item.id} onChange={(id) => update({ ...item, id })} />
              <Field
                label="العنوان"
                value={item.title}
                onChange={(title) => update({ ...item, title })}
              />
              <Field
                label="الوصف المختصر"
                value={item.short}
                onChange={(short) => update({ ...item, short })}
              />
              <Field label="الرابط" value={item.href} onChange={(href) => update({ ...item, href })} />
              <ImageUploadField
                label="الصورة"
                value={item.image}
                onChange={(image) => update({ ...item, image })}
                aspectClass="aspect-[4/3]"
                className="md:col-span-2"
              />
            </div>
          )}
        />
      </SectionCard>
    );
  };

  const renderProcess = () => {
    if (!cms) return null;
    return (
      <SectionCard
        title="كيف نعمل"
        description="تحرير الخطوات التي تشرح رحلة العميل من البداية حتى التسليم."
      >
        <ObjectListEditor
          title="خطوات العمل"
          description="يمكنك إضافة أو تعديل أو حذف خطوات العمل بسهولة."
          items={cms.processSteps}
          onChange={(items) => applyCms((draft) => void (draft.processSteps = items))}
          createItem={initialProcessStep}
          getKey={(item, index) => `${item.step || "step"}-${index}`}
          renderItem={(item, _index, update) => (
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="الخطوة" value={item.step} onChange={(step) => update({ ...item, step })} />
              <Field label="العنوان" value={item.title} onChange={(title) => update({ ...item, title })} />
              <TextareaField
                label="الوصف"
                value={item.description}
                onChange={(description) => update({ ...item, description })}
                rows={4}
              />
            </div>
          )}
        />
      </SectionCard>
    );
  };

  const renderCatalog = () => {
    if (!cms) return null;
    return (
      <SectionCard
        title="منتجات المتجر"
        description="إدارة منتجات البيع والتصنيع مع المواصفات والصور."
      >
        <ObjectListEditor
          title="منتجات المتجر"
          description="أضف المنتج، عدّل النصوص، ثم ارفع الصور واضبط المواصفات."
          items={cms.catalogProducts}
          onChange={(items) => applyCms((draft) => void (draft.catalogProducts = items))}
          createItem={initialCatalogProduct}
          getKey={(item, index) => `${item.id}-${index}`}
          renderItem={(item, _index, update) => (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="المعرف" value={item.id} onChange={(id) => update({ ...item, id })} />
              <Field
                label="العنوان"
                value={item.title}
                onChange={(title) => update({ ...item, title })}
              />
              <Field
                label="وصف مختصر"
                value={item.shortDescription}
                onChange={(shortDescription) => update({ ...item, shortDescription })}
              />
              <Field
                label="سعر"
                value={item.priceLabel}
                onChange={(priceLabel) => update({ ...item, priceLabel })}
              />
              <Field
                label="ملاحظة السعر"
                value={item.priceNote}
                onChange={(priceNote) => update({ ...item, priceNote })}
              />
              <TextareaField
                label="الوصف"
                value={item.description}
                onChange={(description) => update({ ...item, description })}
                rows={5}
              />
              <TextareaField
                label="المواصفات"
                value={toLines(item.specs)}
                onChange={(value) => update({ ...item, specs: fromLines(value) })}
                rows={5}
                placeholder={"سطر لكل مواصفة"}
              />
              <ImageGalleryField
                label="الصور"
                values={item.images}
                onChange={(images) => update({ ...item, images })}
              />
            </div>
          )}
        />
      </SectionCard>
    );
  };

  const renderRentals = () => {
    if (!cms) return null;
    return (
      <div className="space-y-6">
        <SectionCard
          title="التأجير"
          description="تعديل محتوى صفحة التأجير مع الفئات المتاحة للموقع."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="وصف الهيرو"
              value={cms.rentalPage.heroDescription}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.heroDescription = value))}
            />
            <Field
              label="عنوان القسم"
              value={cms.rentalPage.sectionTitle}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.sectionTitle = value))}
            />
            <Field
              label="عنوان الكتالوج"
              value={cms.rentalPage.catalogTitle}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.catalogTitle = value))}
            />
            <Field
              label="نص الكتالوج"
              value={cms.rentalPage.catalogBody}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.catalogBody = value))}
            />
            <Field
              label="عنوان CTA"
              value={cms.rentalPage.ctaTitle}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.ctaTitle = value))}
            />
            <Field
              label="نص CTA"
              value={cms.rentalPage.ctaBody}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.ctaBody = value))}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextareaField
              label="وصف القسم"
              value={cms.rentalPage.sectionBody}
              onChange={(value) => applyCms((draft) => void (draft.rentalPage.sectionBody = value))}
              rows={5}
            />
            <TextListEditor
              title="نقاط القسم"
              description="كل نقطة في سطر مستقل."
              items={cms.rentalPage.bullets}
              onChange={(items) => applyCms((draft) => void (draft.rentalPage.bullets = items))}
              placeholder="نقطة جديدة"
            />
          </div>
        </SectionCard>

        <SectionCard
          title="فئات التأجير"
          description="إدارة فئات التأجير القابلة للعرض في صفحة التأجير."
        >
          <ObjectListEditor
            title="فئات التأجير"
            description="كل فئة يمكن تعديلها بالكامل مع المواصفات ورفع الصور."
            items={cms.rentalCategories}
            onChange={(items) => applyCms((draft) => void (draft.rentalCategories = items))}
            createItem={initialRentalCategory}
            getKey={(item, index) => `${item.id}-${index}`}
            renderItem={(item, _index, update) => (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="المعرف" value={item.id} onChange={(id) => update({ ...item, id })} />
                <Field
                  label="العنوان"
                  value={item.title}
                  onChange={(title) => update({ ...item, title })}
                />
                <Field
                  label="وصف مختصر"
                  value={item.shortDescription}
                  onChange={(shortDescription) => update({ ...item, shortDescription })}
                />
                <Field
                  label="رسالة واتساب"
                  value={item.whatsappMessage}
                  onChange={(whatsappMessage) => update({ ...item, whatsappMessage })}
                />
                <TextareaField
                  label="الوصف"
                  value={item.description}
                  onChange={(description) => update({ ...item, description })}
                  rows={5}
                />
                <TextareaField
                  label="المواصفات"
                  value={toLines(item.specs)}
                  onChange={(value) => update({ ...item, specs: fromLines(value) })}
                  rows={5}
                />
                <ImageGalleryField
                  label="الصور"
                  values={item.images}
                  onChange={(images) => update({ ...item, images })}
                />
              </div>
            )}
          />
        </SectionCard>
      </div>
    );
  };

  const renderManufacturing = () => {
    if (!cms) return null;
    return (
      <div className="space-y-6">
        <SectionCard
          title="البيع والتصنيع"
          description="التحكم بمحتوى صفحة البيع والتصنيع والملحقات الخاصة بها."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="عنوان الهيرو"
              value={cms.manufacturingPage.heroTitle}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.heroTitle = value))
              }
            />
            <Field
              label="وصف الهيرو"
              value={cms.manufacturingPage.heroDescription}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.heroDescription = value))
              }
            />
            <Field
              label="عنوان البداية"
              value={cms.manufacturingPage.introTitle}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.introTitle = value))
              }
            />
            <Field
              label="بداية القسم"
              value={cms.manufacturingPage.introEyebrow}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.introEyebrow = value))
              }
            />
            <Field
              label="عنوان الكتالوج"
              value={cms.manufacturingPage.catalogTitle}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.catalogTitle = value))
              }
            />
            <Field
              label="وسم الكتالوج"
              value={cms.manufacturingPage.catalogBadge}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.catalogBadge = value))
              }
            />
            <Field
              label="عنوان الإضافات"
              value={cms.manufacturingPage.extrasTitle}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.extrasTitle = value))
              }
            />
            <Field
              label="بداية الإضافات"
              value={cms.manufacturingPage.extrasEyebrow}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.extrasEyebrow = value))
              }
            />
            <Field
              label="عنوان CTA"
              value={cms.manufacturingPage.ctaTitle}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.ctaTitle = value))
              }
            />
            <Field
              label="بداية CTA"
              value={cms.manufacturingPage.ctaEyebrow}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.ctaEyebrow = value))
              }
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextareaField
              label="وصف البداية"
              value={cms.manufacturingPage.introBody}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.introBody = value))
              }
              rows={5}
            />
            <TextareaField
              label="وصف الكتالوج"
              value={cms.manufacturingPage.catalogBody}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.catalogBody = value))
              }
              rows={5}
            />
            <TextareaField
              label="وصف CTA"
              value={cms.manufacturingPage.ctaBody}
              onChange={(value) =>
                applyCms((draft) => void (draft.manufacturingPage.ctaBody = value))
              }
              rows={5}
            />
            <TextListEditor
              title="مزايا البداية"
              description="أضف أو عدل النقاط الرئيسية."
              items={cms.manufacturingPage.highlights}
              onChange={(items) => applyCms((draft) => void (draft.manufacturingPage.highlights = items))}
              placeholder="ميزة جديدة"
            />
          </div>
        </SectionCard>

        <SectionCard
          title="الإضافات"
          description="القائمة النصية الإضافية المستخدمة في صفحة التصنيع."
        >
          <TextListEditor
            title="الإضافات"
            description="سطر مستقل لكل عنصر."
            items={cms.manufacturingExtras}
            onChange={(items) => applyCms((draft) => void (draft.manufacturingExtras = items))}
            placeholder="عنصر جديد"
          />
        </SectionCard>
      </div>
    );
  };

  const renderProjects = () => {
    if (!cms) return null;
    return (
      <SectionCard
        title="المشاريع"
        description="إدارة معرض المشاريع مع الموقع والتصنيف والصور."
      >
        <ObjectListEditor
          title="المشاريع"
          description="أضف مشاريع جديدة أو حدّث المشاريع الحالية."
          items={cms.projects}
          onChange={(items) => applyCms((draft) => void (draft.projects = items))}
          createItem={initialProject}
          getKey={(item, index) => `${item.title || "project"}-${index}`}
          renderItem={(item, _index, update) => (
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="العنوان"
                value={item.title}
                onChange={(title) => update({ ...item, title })}
              />
              <Field
                label="الموقع"
                value={item.location}
                onChange={(location) => update({ ...item, location })}
              />
              <Field
                label="التصنيف"
                value={item.category}
                onChange={(category) => update({ ...item, category })}
              />
              <ImageUploadField
                label="الصورة"
                value={item.image}
                onChange={(image) => update({ ...item, image })}
                aspectClass="aspect-[4/3]"
                className="md:col-span-2"
              />
            </div>
          )}
        />
      </SectionCard>
    );
  };

  const renderClients = () => {
    if (!cms) return null;
    return (
      <SectionCard title="العملاء" description="إدارة أسماء العملاء والجهات المرتبطة بالمشاريع.">
        <ObjectListEditor
          title="العملاء"
          description="أضف العملاء الحاليين أو من تريد إبرازهم في الصفحة."
          items={cms.sampleClients}
          onChange={(items) => applyCms((draft) => void (draft.sampleClients = items))}
          createItem={initialClient}
          getKey={(item, index) => `${item.name || "client"}-${index}`}
          renderItem={(item, _index, update) => (
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="الاسم" value={item.name} onChange={(name) => update({ ...item, name })} />
              <Field
                label="الاسم الإنجليزي"
                value={item.nameEn}
                onChange={(nameEn) => update({ ...item, nameEn })}
              />
              <Field
                label="القطاع"
                value={item.sector}
                onChange={(sector) => update({ ...item, sector })}
              />
            </div>
          )}
        />
      </SectionCard>
    );
  };

  const renderFaqs = () => {
    if (!cms) return null;
    return (
      <SectionCard title="الأسئلة الشائعة" description="تحرير أسئلة وأجوبة الموقع.">
        <ObjectListEditor
          title="الأسئلة الشائعة"
          description="يمكنك إضافة أو تعديل أو حذف أي سؤال."
          items={cms.faqs}
          onChange={(items) => applyCms((draft) => void (draft.faqs = items))}
          createItem={initialFaq}
          getKey={(item, index) => `${item.q || "faq"}-${index}`}
          renderItem={(item, _index, update) => (
            <div className="grid gap-4">
              <Field label="السؤال" value={item.q} onChange={(q) => update({ ...item, q })} />
              <TextareaField
                label="الإجابة"
                value={item.a}
                onChange={(a) => update({ ...item, a })}
                rows={4}
              />
            </div>
          )}
        />
      </SectionCard>
    );
  };

  const renderAbout = () => {
    if (!cms) return null;
    return (
      <div className="space-y-6">
        <SectionCard title="من نحن" description="تحرير محتوى صفحة من نحن وقيم الشركة وإحصاءاتها.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="عنوان الصفحة"
              value={cms.about.heroTitle}
              onChange={(value) => applyCms((draft) => void (draft.about.heroTitle = value))}
            />
            <TextareaField
              label="وصف الصفحة"
              value={cms.about.heroDescription}
              onChange={(value) => applyCms((draft) => void (draft.about.heroDescription = value))}
              rows={4}
            />
            <Field
              label="عنوان من نحن"
              value={cms.about.whoTitle}
              onChange={(value) => applyCms((draft) => void (draft.about.whoTitle = value))}
            />
            <Field
              label="عنوان الرؤية"
              value={cms.about.visionTitle}
              onChange={(value) => applyCms((draft) => void (draft.about.visionTitle = value))}
            />
            <Field
              label="عنوان الرسالة"
              value={cms.about.missionTitle}
              onChange={(value) => applyCms((draft) => void (draft.about.missionTitle = value))}
            />
            <Field
              label="عنوان القيم"
              value={cms.about.valuesTitle}
              onChange={(value) => applyCms((draft) => void (draft.about.valuesTitle = value))}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextareaField
              label="النص الأول"
              value={cms.about.whoBody1}
              onChange={(value) => applyCms((draft) => void (draft.about.whoBody1 = value))}
              rows={5}
            />
            <TextareaField
              label="النص الثاني"
              value={cms.about.whoBody2}
              onChange={(value) => applyCms((draft) => void (draft.about.whoBody2 = value))}
              rows={5}
            />
            <TextareaField
              label="نص الرؤية"
              value={cms.about.visionBody}
              onChange={(value) => applyCms((draft) => void (draft.about.visionBody = value))}
              rows={5}
            />
            <TextareaField
              label="نص الرسالة"
              value={cms.about.missionBody}
              onChange={(value) => applyCms((draft) => void (draft.about.missionBody = value))}
              rows={5}
            />
          </div>

          <div className="mt-4">
            <TextListEditor
              title="القيم"
              description="سطر مستقل لكل قيمة."
              items={cms.about.values}
              onChange={(items) => applyCms((draft) => void (draft.about.values = items))}
              placeholder="قيمة جديدة"
            />
          </div>
        </SectionCard>

        <SectionCard title="إحصاءات من نحن" description="أرقام أو نقاط تظهر في صفحة من نحن.">
          <ObjectListEditor
            title="الإحصاءات"
            description="أضف أو عدل الإحصاءات الظاهرة في الصفحة."
            items={cms.aboutStats}
            onChange={(items) => applyCms((draft) => void (draft.aboutStats = items))}
            createItem={initialStat}
            getKey={(item, index) => `${item.label || "stat"}-${index}`}
            renderItem={(item, _index, update) => (
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="القيمة"
                  value={item.value}
                  onChange={(value) => update({ ...item, value })}
                />
                <Field
                  label="الاسم"
                  value={item.label}
                  onChange={(label) => update({ ...item, label })}
                />
              </div>
            )}
          />
        </SectionCard>
      </div>
    );
  };

  const renderFooter = () => {
    if (!cms) return null;
    return (
      <SectionCard title="الفوتر" description="تحرير روابط وتفاصيل التذييل ونص النشرة الإخبارية.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="عنوان الخدمات"
            value={cms.footer.servicesTitle}
            onChange={(value) => applyCms((draft) => void (draft.footer.servicesTitle = value))}
          />
          <Field
            label="عنوان الشركة"
            value={cms.footer.companyTitle}
            onChange={(value) => applyCms((draft) => void (draft.footer.companyTitle = value))}
          />
          <Field
            label="عنوان النشرة"
            value={cms.footer.newsletterTitle}
            onChange={(value) => applyCms((draft) => void (draft.footer.newsletterTitle = value))}
          />
          <Field
            label="زر النشرة"
            value={cms.footer.newsletterButton}
            onChange={(value) => applyCms((draft) => void (draft.footer.newsletterButton = value))}
          />
          <Field
            label="placeholder النشرة"
            value={cms.footer.newsletterPlaceholder}
            onChange={(value) =>
              applyCms((draft) => void (draft.footer.newsletterPlaceholder = value))
            }
          />
          <TextareaField
            label="وصف النشرة"
            value={cms.footer.newsletterBody}
            onChange={(value) => applyCms((draft) => void (draft.footer.newsletterBody = value))}
            rows={4}
          />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <LinkListEditor
            title="روابط الخدمات"
            description="روابط الخدمات في الفوتر."
            items={cms.footer.serviceLinks}
            onChange={(items) => applyCms((draft) => void (draft.footer.serviceLinks = items))}
            placeholderLabel="العنوان"
          />
          <LinkListEditor
            title="روابط الشركة"
            description="روابط أقسام الشركة في الفوتر."
            items={cms.footer.companyLinks}
            onChange={(items) => applyCms((draft) => void (draft.footer.companyLinks = items))}
            placeholderLabel="العنوان"
          />
        </div>
      </SectionCard>
    );
  };

  const renderActiveSection = () => {
    if (loadingCms && !cms) {
      return (
        <SectionCard title="جارٍ التحميل" description="نقوم بتحميل محتوى CMS والإعدادات الآن.">
          <div className="flex items-center justify-center rounded-3xl border border-dashed border-[#d9cfbb] bg-[#fffdfa] px-4 py-16 text-[#666]">
            <LoaderCircle className="ml-3 h-5 w-5 animate-spin text-[#ffb400]" />
            جاري تحميل بيانات لوحة الإدارة...
          </div>
        </SectionCard>
      );
    }

    if (cmsError && !cms) {
      return (
        <SectionCard title="تعذر التحميل" description="حصل خطأ أثناء جلب بيانات CMS.">
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
            <p>{cmsError}</p>
            <button
              type="button"
              onClick={loadCms}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700"
            >
              إعادة المحاولة
            </button>
          </div>
        </SectionCard>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "company":
        return renderCompany();
      case "menu":
        return renderMenu();
      case "home":
        return renderHome();
      case "services":
        return renderServices();
      case "process":
        return renderProcess();
      case "catalog":
        return renderCatalog();
      case "rentals":
        return renderRentals();
      case "manufacturing":
        return renderManufacturing();
      case "projects":
        return renderProjects();
      case "clients":
        return renderClients();
      case "faqs":
        return renderFaqs();
      case "about":
        return renderAbout();
      case "footer":
        return renderFooter();
      default:
        return null;
    }
  };

  if (!cms) {
    return (
      <div className="min-h-screen bg-[#f1ece4] px-4 py-8 text-[#111]">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center rounded-[2rem] border border-[#e0d7c4] bg-white shadow-[0_20px_60px_-35px_rgba(15,15,15,0.2)]">
          <div className="flex items-center gap-3 text-lg font-bold text-[#444]">
            <LoaderCircle className="h-5 w-5 animate-spin text-[#ffb400]" />
            {t.loading}
          </div>
        </div>
      </div>
    );
  }

  const activeTabLabel = t.admin.tabs[activeTab];

  return (
    <div className="flex min-h-screen bg-[#f1ece4] text-[#131313]">
      {sidebarOpen ? (
        <aside className="sticky top-0 flex h-screen w-80 shrink-0 flex-col overflow-hidden border-l border-[#e0d7c4] bg-[#111111] px-4 py-5 text-white shadow-[0_25px_70px_-35px_rgba(0,0,0,0.65)]">
          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                title={locale === "en" ? "Hide sidebar" : "إخفاء القائمة"}
                aria-label={locale === "en" ? "Hide sidebar" : "إخفاء القائمة"}
              >
                <PanelRightClose className="h-4 w-4" />
              </button>
              <LanguageSwitcher />
            </div>
            <h1 className="text-2xl font-black leading-tight">
              Luxury Cabins
              <span className="mt-2 block text-[#ffb400]">Admin Dashboard</span>
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/65">{t.admin.brandSub}</p>
          </div>

          <nav className="mt-5 flex-1 space-y-1 overflow-y-auto pe-1 [scrollbar-width:thin] [scrollbar-color:#555_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#555]">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={[
                    "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right text-sm font-bold transition",
                    active
                      ? "bg-[#ffb400] text-[#111111] shadow-[0_12px_35px_-18px_rgba(255,180,0,0.95)]"
                      : "text-white/75 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1">{t.admin.tabs[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            {t.admin.logout}
          </button>
        </aside>
      ) : (
        <div className="sticky top-0 z-20 flex h-screen w-14 shrink-0 flex-col items-center border-l border-[#e0d7c4] bg-[#111111] py-5">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffb400] text-[#111] shadow-[0_12px_30px_-16px_rgba(255,180,0,0.95)] transition hover:brightness-105"
            title={locale === "en" ? "Show sidebar" : "إظهار القائمة"}
            aria-label={locale === "en" ? "Show sidebar" : "إظهار القائمة"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      )}

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          <header className="mb-6 rounded-[2rem] border border-[#e4dbc9] bg-white p-5 shadow-[0_20px_50px_-35px_rgba(15,15,15,0.2)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8e6b10]">
                  {t.admin.panel}
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#101010]">{activeTabLabel}</h2>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#666]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#fff4d6] px-3 py-2 font-medium text-[#8a6611]">
                    <Clock3 className="h-4 w-4" />
                    {t.admin.lastUpdate}{" "}
                    {cms.updatedAt ? formatDate(cms.updatedAt, dateLocale) : "—"}
                  </span>
                </div>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f4f1ea] px-3 py-2 text-sm font-medium text-[#555] transition hover:bg-[#ffb400]/20 hover:text-[#8a6611]"
                title={t.admin.viewSite}
                aria-label={t.admin.viewSite}
              >
                <House className="h-4 w-4" />
                {t.admin.viewSite}
              </a>
            </div>
          </header>

          {cmsError ? (
            <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {cmsError}
            </div>
          ) : null}

          {renderActiveSection()}

          <div className="sticky bottom-4 z-20 mt-8">
            <div className="rounded-[2rem] border border-[#e2d7c4] bg-white/95 p-4 shadow-[0_15px_45px_-30px_rgba(0,0,0,0.4)] backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#1b1b1b]">
                    {dirty ? t.admin.dirty : t.admin.synced}
                  </p>
                  <p className="mt-1 text-xs text-[#6c6c6c]">{t.admin.saveBarBody}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReloadCms}
                    className="inline-flex items-center gap-2 rounded-2xl border border-[#e3d7c0] bg-white px-4 py-3 text-sm font-bold text-[#1a1a1a] transition hover:border-[#ffb400] hover:text-[#b27a00]"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t.admin.reload}
                  </button>
                  <button
                    type="button"
                    onClick={saveCms}
                    disabled={saving || !dirty}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#111111] px-5 py-3 text-sm font-black text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {t.admin.save}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {toast ? (
        <div
          className={[
            "fixed left-4 top-4 z-50 max-w-sm rounded-2xl border px-4 py-3 shadow-2xl",
            toast.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : toast.kind === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-blue-200 bg-blue-50 text-blue-700",
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-current/10 p-1">
              {toast.kind === "success" ? (
                <ShieldCheck className="h-4 w-4" />
              ) : toast.kind === "error" ? (
                <CircleHelp className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
            </div>
            <div className="text-sm font-medium leading-6">{toast.message}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
