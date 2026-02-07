import { getI18n } from "@/lib/i18n/server";
import ConsolePage from "@/components/console/console-page";
import Link from "next/link";
import {
  listRoles,
  listSecurityEvents,
  listUsers,
  securityEventStats,
  securityEventTopFailedIps,
} from "@/lib/system-api";
import type { Locale } from "@/lib/i18n/locales";

type Copy = {
  title: string;
  description: string;
  modules: Array<{
    name: string;
    status: string;
    description: string;
    href: string;
  }>;
  dashboard: {
    quickLinks: string;
    recentUsers: string;
    recentRoles: string;
    recentEvents: string;
    securityStats: string;
    topIps: string;
    empty: string;
  };
};

const COPY: Record<Locale, Copy> = {
  en: {
    title: "Dashboard",
    description: "System overview for admins: users, roles, security events, and developer docs.",
    modules: [
      {
        name: "Users",
        status: "Directory",
        description: "Manage system users, statuses, and credentials lifecycle.",
        href: "/console/users",
      },
      {
        name: "Roles",
        status: "RBAC",
        description: "Create roles and bind them to tenant objects.",
        href: "/console/roles",
      },
      {
        name: "Policies",
        status: "Casbin",
        description: "Operate the runtime Casbin policy matrix.",
        href: "/console/policies",
      },
      {
        name: "Authorities",
        status: "API permissions",
        description: "Refresh and manage REST authorities for authorization mapping.",
        href: "/console/authorities",
      },
      {
        name: "Menus",
        status: "Navigation",
        description: "Sync and edit menus used by clients and console experiences.",
        href: "/console/menus",
      },
      {
        name: "Organizations",
        status: "Org graph",
        description: "Manage organizations and their binding relationships.",
        href: "/console/organizations",
      },
      {
        name: "API docs",
        status: "Swagger",
        description: "Browse Swagger UI and OpenAPI JSON endpoints.",
        href: "/console/api",
      },
    ],
    dashboard: {
      quickLinks: "Quick links",
      recentUsers: "Recent users",
      recentRoles: "Recent roles",
      recentEvents: "Recent audit events",
      securityStats: "Security stats (7d)",
      topIps: "Top failed IPs (7d)",
      empty: "No data yet.",
    },
  },
  zh: {
    title: "Dashboard",
    description: "管理员总览：用户、角色、安全事件与开发者文档入口。",
    modules: [
      {
        name: "用户",
        status: "目录",
        description: "管理系统用户、状态与账号生命周期。",
        href: "/console/users",
      },
      {
        name: "角色",
        status: "RBAC",
        description: "创建角色并绑定到租户对象。",
        href: "/console/roles",
      },
      {
        name: "策略",
        status: "Casbin",
        description: "管理运行时 Casbin 策略矩阵。",
        href: "/console/policies",
      },
      {
        name: "权限",
        status: "API 权限",
        description: "刷新并维护 REST 权限，用于授权映射。",
        href: "/console/authorities",
      },
      {
        name: "菜单",
        status: "导航",
        description: "维护控制台与客户端使用的菜单配置。",
        href: "/console/menus",
      },
      {
        name: "组织",
        status: "组织图谱",
        description: "管理组织及其绑定关系。",
        href: "/console/organizations",
      },
      {
        name: "API 文档",
        status: "Swagger",
        description: "查看 Swagger UI 与 OpenAPI JSON。",
        href: "/console/api",
      },
    ],
    dashboard: {
      quickLinks: "快捷入口",
      recentUsers: "最近用户",
      recentRoles: "最近角色",
      recentEvents: "最近审计事件",
      securityStats: "安全统计（7 天）",
      topIps: "失败 IP TOP（7 天）",
      empty: "暂无数据。",
    },
  },
};

async function safe<T>(promise: Promise<T>): Promise<T | undefined> {
  try {
    return await promise;
  } catch {
    return undefined;
  }
}

export default async function ConsoleDashboardPage() {
  const { locale } = await getI18n();
  const copy = COPY[locale as Locale];
  const isZh = locale === "zh";

  const [users, roles, events, stats, topIps] = await Promise.all([
    safe(listUsers({ page: 0, size: 5 })),
    safe(listRoles({ page: 0, size: 5 })),
    safe(listSecurityEvents({ page: 0, size: 6 })),
    safe(securityEventStats(7)),
    safe(securityEventTopFailedIps(7)),
  ]);

  const quickLinks = copy.modules;
  const recentUsers = (users ?? []).slice(0, 5);
  const recentRoles = (roles ?? []).slice(0, 5);
  const recentEvents = (events ?? []).slice(0, 6);

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console/dashboard" },
        { label: "Dashboard" },
      ]}
      eyebrow="lionsaid.com/console"
      title={copy.title}
      subtitle={copy.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="space-y-6">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {copy.dashboard.quickLinks}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickLinks.map((module) => (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group rounded-[24px] border border-slate-200/70 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                    {module.status}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {module.name}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {module.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-sky-600 group-hover:underline dark:text-sky-300">
                    {isZh ? "打开" : "Open"}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {copy.dashboard.recentUsers}
              </h2>
              <div className="mt-4 space-y-3">
                {recentUsers.length ? (
                  recentUsers.map((user) => (
                    <div
                      key={user.id ?? user.email ?? user.username}
                      className="flex items-center justify-between rounded-[20px] border border-slate-200/70 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900 dark:text-white">
                          {user.nickName ?? user.username ?? user.email ?? (isZh ? "未命名用户" : "User")}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {user.email ?? user.username ?? "-"}
                        </p>
                      </div>
                      <span
                        className={`ml-3 shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.enabled === false
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                        }`}
                      >
                        {user.enabled === false ? (isZh ? "禁用" : "Disabled") : (isZh ? "启用" : "Enabled")}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.empty}</p>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {copy.dashboard.recentRoles}
              </h2>
              <div className="mt-4 space-y-3">
                {recentRoles.length ? (
                  recentRoles.map((role) => (
                    <div
                      key={role.roleCode ?? role.name}
                      className="rounded-[20px] border border-slate-200/70 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900 dark:text-white">
                            {role.name ?? role.roleCode ?? (isZh ? "未命名角色" : "Role")}
                          </p>
                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {role.roleCode ?? "-"}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            role.enabled === false
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                          }`}
                        >
                          {role.enabled === false ? (isZh ? "禁用" : "Disabled") : (isZh ? "启用" : "Enabled")}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.empty}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {copy.dashboard.securityStats}
            </h2>
            <div className="mt-4 rounded-[20px] border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <pre className="whitespace-pre-wrap break-words font-mono text-xs">
                {stats ? JSON.stringify(stats, null, 2) : copy.dashboard.empty}
              </pre>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {copy.dashboard.topIps}
            </h2>
            <div className="mt-4 space-y-2 text-sm">
              {Array.isArray(topIps) && topIps.length ? (
                topIps.slice(0, 8).map((row: any, index: number) => (
                  <div
                    key={`${index}-${String(row?.ip ?? row?.key ?? "ip")}`}
                    className="flex items-center justify-between rounded-[18px] border border-slate-200/70 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-200">
                      {row?.ip ?? row?.key ?? "-"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {String(row?.count ?? row?.value ?? "")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.empty}</p>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {copy.dashboard.recentEvents}
            </h2>
            <div className="mt-4 space-y-3">
              {recentEvents.length ? (
                recentEvents.map((event) => (
                  <div
                    key={event.id ?? `${event.createdTime}-${event.userId}-${event.eventType}`}
                    className="rounded-[20px] border border-slate-200/70 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900 dark:text-white">
                          {event.eventType ?? (isZh ? "安全事件" : "Security event")}
                        </p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                          {event.description ?? "-"}
                        </p>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                          {[event.userId, event.sourceIp].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      {event.severity && (
                        <span className="shrink-0 rounded-full border border-slate-200/70 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                          {event.severity}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.empty}</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </ConsolePage>
  );
}
