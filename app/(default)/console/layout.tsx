import ConsoleNav from "@/components/console-nav";
import ConsoleNavMobile from "@/components/console-nav-mobile";
import ConsoleScrollReset from "@/components/console/console-scroll-reset";
import { getSessionToken } from "@/lib/auth/session";
import { getI18n } from "@/lib/i18n/server";
import { redirect } from "next/navigation";

const NAV_HELPERS = {
  en: [
    "Status & health",
    "Directory & lifecycle",
    "Role definitions",
    "Casbin policies",
    "Logs & evidence",
    "API permissions",
    "Navigation menus",
    "Org bindings",
  ],
  zh: ["系统状态", "目录与生命周期", "角色定义", "Casbin 策略", "日志与证据", "API 权限", "导航菜单", "组织绑定"],
};

export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getSessionToken();
  if (!token) redirect("/signin");

  const { t, locale } = await getI18n();

  const helpers = NAV_HELPERS[locale];

  const navItems = [
    { href: "/console/dashboard", label: t.console.nav.overview, helper: helpers[0] },
    { href: "/console/users", label: t.console.nav.users, helper: helpers[1] },
    { href: "/console/roles", label: t.console.nav.roles, helper: helpers[2] },
    { href: "/console/policies", label: t.console.nav.policies, helper: helpers[3] },
    { href: "/console/audit", label: t.console.nav.audit, helper: helpers[4] },
    { href: "/console/authorities", label: t.console.nav.authorities, helper: helpers[5] },
    { href: "/console/menus", label: t.console.nav.menus, helper: helpers[6] },
    { href: "/console/organizations", label: t.console.nav.organizations, helper: helpers[7] },
    { href: "/console/api", label: t.console.nav.api },
  ];

  return (
    <section className="h-screen overflow-hidden pt-24">
      <div className="h-[calc(100vh-6rem)] w-full bg-slate-50 dark:bg-slate-950">
        <div className="grid h-full md:grid-cols-[280px,1fr]">
          <aside className="hidden h-full border-r border-slate-200 bg-white/90 px-4 py-6 shadow-sm dark:border-white/10 dark:bg-slate-950/70 md:block">
            <div className="flex items-center justify-between px-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                {locale === "zh" ? "控制台" : "Console"}
              </p>
            </div>
            <div className="mt-4 h-[calc(100%-2rem)] overflow-y-auto pr-1">
              <ConsoleNav items={navItems} />
            </div>
          </aside>

          <main className="flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="border-b border-slate-200 bg-white/90 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-950/70 md:hidden">
              <ConsoleNavMobile items={navItems} />
            </div>
            <div id="console-scroll" className="h-full flex-1 overflow-y-auto px-4 py-4 md:px-10 md:py-8">
              <ConsoleScrollReset />
              <div className="mx-auto max-w-6xl">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
