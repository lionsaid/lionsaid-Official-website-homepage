import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import { getI18n } from "@/lib/i18n/server";
import ThemeSwitcher from "./theme-switcher";
import { getThemeMode } from "@/lib/theme/server";

export default async function Header() {
  const [{ t, locale }, themeMode] = await Promise.all([getI18n(), getThemeMode()]);

  return (
    <header className="fixed top-3 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between gap-4 rounded-full border border-black/10 bg-white/80 px-6 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-black dark:text-white">
              {t.header.brand}
            </Link>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.35em] text-black/70 dark:text-white/70 lg:flex">
            <Link className="transition hover:text-black dark:hover:text-white" href="/#products">
              {t.header.navProducts}
            </Link>
            <Link className="transition hover:text-black dark:hover:text-white" href="/#engineering">
              {t.header.navEngineering}
            </Link>
            <Link className="transition hover:text-black dark:hover:text-white" href="/about">
              {t.header.navAbout}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher initialLocale={locale} label={t.ui.language} />
            </div>
            <div className="hidden sm:block">
              <ThemeSwitcher
                initialMode={themeMode}
                label={t.ui.theme}
                labels={{
                  system: t.ui.themeSystem,
                  light: t.ui.themeLight,
                  dark: t.ui.themeDark,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
