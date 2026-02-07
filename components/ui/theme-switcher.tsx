"use client";

import { useEffect, useRef, useState } from "react";

import type { ThemeMode } from "@/lib/theme/types";

declare global {
  interface Window {
    __theme?: {
      get: () => ThemeMode;
      set: (mode: ThemeMode) => void;
    };
  }
}

export default function ThemeSwitcher({
  initialMode,
  label,
  labels,
}: {
  initialMode: ThemeMode;
  label: string;
  labels: {
    system: string;
    light: string;
    dark: string;
  };
}) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMode(window.__theme?.get() ?? initialMode);
  }, [initialMode]);

  const applyMode = (next: ThemeMode) => {
    setMode(next);
    if (window.__theme?.set) {
      window.__theme.set(next);
      return;
    }
    const root = document.documentElement;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = next === "dark" || (next === "system" && mql.matches);
    root.classList.toggle("dark", isDark);
    root.dataset.theme = next;
    document.cookie = `theme=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`;
  };

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

  const themeIcon =
    mode === "light" ? "☀️" : mode === "dark" ? "🌙" : "💻";
  const themeName =
    mode === "light" ? labels.light : mode === "dark" ? labels.dark : labels.system;

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
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-base shadow-sm transition-transform duration-300 ease-out group-hover:scale-110 dark:bg-white/10">
          {themeIcon}
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 transition-all duration-300 ease-out group-hover:max-w-[7rem] group-hover:opacity-100 dark:text-gray-200">
          {themeName}
        </span>
      </button>
      <div
        role="listbox"
        className={`absolute right-0 mt-2 w-40 rounded-2xl border border-white/50 bg-white/45 p-1.5 text-sm shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-200 ease-out dark:border-white/10 dark:bg-gray-950/50 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {(["system", "light", "dark"] as ThemeMode[]).map((value) => {
          const itemLabel =
            value === "light" ? labels.light : value === "dark" ? labels.dark : labels.system;
          const itemIcon = value === "light" ? "☀️" : value === "dark" ? "🌙" : "💻";
          return (
            <button
              key={value}
              type="button"
              role="option"
              aria-selected={value === mode}
              onClick={() => {
                applyMode(value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-white/70 dark:hover:bg-white/10 ${
                value === mode ? "bg-white/70 font-semibold dark:bg-white/10" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{itemIcon}</span>
                <span>{itemLabel}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
