"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n/locales";
import { setClientLocale } from "@/lib/i18n/client";

const LOCALE_OPTIONS: Array<{ value: Locale; label: string; name: string }> = [
  { value: "en", label: "EN", name: "English" },
  { value: "zh", label: "中文", name: "中文" },
];

export default function LanguageSwitcher({
  initialLocale,
  label,
}: {
  initialLocale: Locale;
  label: string;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const current = LOCALE_OPTIONS.find((opt) => opt.value === locale) ?? LOCALE_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <span className="sr-only">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/35 px-3 py-1.5 text-sm text-gray-800 shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300 ease-out hover:bg-white/50 dark:border-white/10 dark:bg-gray-900/40 dark:text-gray-100"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-base shadow-sm transition-transform duration-500 ease-out group-hover:rotate-180 dark:bg-white/10">
          🌐
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 transition-all duration-300 ease-out group-hover:max-w-[7rem] group-hover:opacity-100 dark:text-gray-200">
          {current.name}
        </span>
      </button>
      <div
        role="listbox"
        className={`absolute right-0 mt-2 w-36 rounded-2xl border border-white/50 bg-white/45 p-1.5 text-sm shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-200 ease-out dark:border-white/10 dark:bg-gray-950/50 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {LOCALE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="option"
            aria-selected={opt.value === locale}
            onClick={() => {
              const next = opt.value as Locale;
              setLocale(next);
              setClientLocale(next);
              document.documentElement.lang = next;
              router.refresh();
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-white/70 dark:hover:bg-white/10 ${
              opt.value === locale ? "bg-white/70 font-semibold dark:bg-white/10" : ""
            }`}
          >
            <span>{opt.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
