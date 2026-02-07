"use client";

import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import { messages } from "./messages";

const LOCALE_COOKIE = "locale";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${name}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(name.length + 1));
}

export function getClientLocale(): Locale {
  const cookieLocale = getCookie(LOCALE_COOKIE);
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }
  const browserLocale =
    typeof navigator === "undefined" ? "" : (navigator.language ?? "").toLowerCase();
  if (browserLocale.startsWith("zh")) return "zh";
  return DEFAULT_LOCALE;
}

export function setClientLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=31536000; samesite=lax`;
}

export function getClientI18n() {
  const locale = getClientLocale();
  return { locale, t: messages[locale] };
}
