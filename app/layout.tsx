import "./css/style.css";

import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { getLocale } from "@/lib/i18n/server";
import { getThemeMode } from "@/lib/theme/server";

export const metadata: Metadata = {
  metadataBase: new URL("http://127.0.0.1:8000/"),
  title: {
    default: "狮语 Lionsaid · AI 品牌体验 OS",
    template: "%s · 狮语 Lionsaid",
  },
  description:
    "狮语（Lionsaid）是一款面向亚洲高增长品牌的 AI 体验操作系统，帮助团队以电影级质感打造网站与多语言体验。",
  openGraph: {
    title: "狮语 Lionsaid · AI 品牌体验 OS",
    description:
      "在 lionsaid.com 打造高级视觉与 AI 协作体验，覆盖策划、设计、本地化与工程。",
    url: "https://lionsaid.com",
    siteName: "Lionsaid",
    images: [
      {
        url: "/images/planet.png",
        width: 1200,
        height: 630,
        alt: "Lionsaid planet visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "狮语 Lionsaid · AI 品牌体验 OS",
    description:
      "与狮语工作室一起，在亚洲打造高级品牌体验与 AI 驱动的官网。",
  },
};

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const themeMode = await getThemeMode();
  const htmlClassName = [
    "scroll-smooth",
    themeMode === "dark" ? "dark" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html
      lang={locale}
      className={htmlClassName}
      data-theme={themeMode}
      suppressHydrationWarning
    >
      <body
        className={`${plex.variable} ${plexMono.variable} bg-gray-50 font-[var(--font-plex)] tracking-tight text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100`}
      >
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            var THEME_COOKIE = "theme";
            var mql = window.matchMedia("(prefers-color-scheme: dark)");
            function getCookie(name) {
              var value = document.cookie.split(";").map(function (v) { return v.trim(); }).find(function (v) { return v.indexOf(name + "=") === 0; });
              return value ? decodeURIComponent(value.slice(name.length + 1)) : undefined;
            }
            function setCookie(value) {
              document.cookie = THEME_COOKIE + "=" + encodeURIComponent(value) + "; path=/; max-age=31536000; samesite=lax";
            }
            var mode = getCookie(THEME_COOKIE) || document.documentElement.dataset.theme || "system";
            function apply(nextMode) {
              var isDark = nextMode === "dark" || (nextMode === "system" && mql.matches);
              document.documentElement.classList.toggle("dark", !!isDark);
              document.documentElement.dataset.theme = nextMode;
            }
            function setMode(nextMode) {
              mode = nextMode;
              setCookie(nextMode);
              apply(nextMode);
            }
            function onSystemChange() {
              if (mode === "system") apply(mode);
            }
            if (mql.addEventListener) mql.addEventListener("change", onSystemChange);
            else if (mql.addListener) mql.addListener(onSystemChange);
            apply(mode);
            window.__theme = {
              get: function () { return mode; },
              set: setMode,
            };
          })();
        `}</Script>
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
