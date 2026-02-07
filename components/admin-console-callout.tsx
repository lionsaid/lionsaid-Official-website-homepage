import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/locales";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
  features: Array<{ title: string; body: string }>;
}> = {
  en: {
    eyebrow: "Platform · Admin",
    title: "Lionsaid system console",
    description:
      "Configure users, roles, Casbin policies, and automation guardrails in one secure dashboard designed for multi-tenant SaaS teams.",
    primary: "Enter admin console",
    secondary: "View RBAC design",
    features: [
      {
        title: "JWT + Casbin",
        body: "Authentication handled via JWT while authorization flows through Casbin for least-privilege enforcement.",
      },
      {
        title: "Multi-tenant domains",
        body: "Each tenant owns its own workspace, role matrix, and deployment cadence without cross-bleed.",
      },
      {
        title: "Audit evidence",
        body: "Every policy change, login, or publish request is logged with hashes for compliance exports.",
      },
    ],
  },
  zh: {
    eyebrow: "平台 · 管理后台",
    title: "Lionsaid 系统管理后台",
    description:
      "在一个安全面板内配置用户、角色、Casbin 策略和自动化保障，专为多租户 SaaS 团队设计。",
    primary: "进入管理后台",
    secondary: "查看 RBAC 方案",
    features: [
      {
        title: "JWT + Casbin",
        body: "认证交给 JWT，授权由 Casbin 实时判定，默认最小权限。",
      },
      {
        title: "多租户隔离",
        body: "每个租户拥有独立的工作区与角色矩阵，互不干扰。",
      },
      {
        title: "审计留痕",
        body: "策略、登录、发布都会记录校验信息，便于合规导出。",
      },
    ],
  },
};

export default async function AdminConsoleCallout() {
  const { locale } = await getI18n();
  const copy = COPY[locale as Locale];

  return (
    <section className="relative py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),rgba(99,102,241,0.15),transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/90 px-6 py-12 shadow-[0_45px_160px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 md:px-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/15 via-transparent to-indigo-500/20" aria-hidden="true" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">
                {copy.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                {copy.title}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-200">{copy.description}</p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <Link
                  href="/console/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:scale-[1.01]"
                >
                  {copy.primary}
                  <span className="ml-2" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link
                  href="/console/policies"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/70 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                >
                  {copy.secondary}
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:w-[45%]">
              {copy.features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[28px] border border-slate-200/70 bg-white/90 p-4 text-left shadow dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
