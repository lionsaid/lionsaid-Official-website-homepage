import { cookies, headers } from "next/headers";

import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import { messages } from "./messages";

const LOCALE_COOKIE = "locale";

function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export async function getLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.trim().toLowerCase();
  if (preferred.startsWith("zh")) return "zh";

  return DEFAULT_LOCALE;
}

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: messages[locale] };
}
