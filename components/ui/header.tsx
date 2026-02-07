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
            <Link className="transition hover:text-black dark:hover:text-white" href="/#about">
              {t.header.navAbout}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:-translate-y-0.5 hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 sm:flex"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.486 2 12.02c0 4.428 2.865 8.19 6.839 9.52.5.092.682-.218.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.533 1.036 1.533 1.036.892 1.53 2.341 1.088 2.91.833.092-.648.35-1.088.636-1.338-2.22-.254-4.555-1.113-4.555-4.95 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.276.098-2.66 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.506.34c1.909-1.296 2.748-1.026 2.748-1.026.546 1.384.203 2.406.1 2.66.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.694-4.566 4.942.359.31.678.923.678 1.86 0 1.342-.012 2.424-.012 2.754 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.02C22 6.486 17.523 2 12 2z" />
              </svg>
            </Link>
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-black sm:flex"
            >
              {t.header.appStore}
            </Link>
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
