import { getI18n } from "@/lib/i18n/server";
import ConsolePage from "@/components/console/console-page";

const DEFAULT_API_BASE = "http://127.0.0.1:8000";

function getApiBase() {
  const base = process.env.SYSTEM_API_BASE_URL ?? process.env.NEXT_PUBLIC_SYSTEM_API_BASE_URL ?? "http://www.lionsaid.com";
  const prefix =
    process.env.SYSTEM_API_PATH_PREFIX ??
    process.env.NEXT_PUBLIC_SYSTEM_API_PATH_PREFIX ??
    "/gateway";
  const normalizedPrefix = prefix.startsWith("/") ? prefix : `/${prefix}`;
  return `${base}${normalizedPrefix}`.replace(/\/+$/, "");
}

export default async function ConsoleApiPage() {
  const { locale } = await getI18n();
  const isZh = locale === "zh";
  const apiBase = getApiBase() || DEFAULT_API_BASE;

  const openApiSystem = `${apiBase}/v3/api-docs/system`;
  const openApiDefault = `${apiBase}/v3/api-docs`;
  const swaggerUi = `${apiBase}/swagger-ui/index.html`;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "API 文档" : "API docs" },
      ]}
      eyebrow={isZh ? "开发者" : "Developer"}
      title={isZh ? "API 文档" : "API docs"}
      subtitle={
        isZh
          ? "统一在此查看 Swagger / OpenAPI，避免每个页面重复堆 API 参考。"
          : "Use this page as the single source of truth for Swagger/OpenAPI, instead of repeating API references on every screen."
      }
      meta={<span className="font-mono">{apiBase}</span>}
    >

      <div className="grid gap-4 md:grid-cols-3">
        <a
          href={swaggerUi}
          target="_blank"
          rel="noreferrer"
          className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
            Swagger UI
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            {isZh ? "打开交互式文档" : "Open interactive docs"}
          </p>
          <p className="mt-2 font-mono text-xs text-slate-600 dark:text-slate-300">
            {swaggerUi}
          </p>
        </a>
        <a
          href={openApiSystem}
          target="_blank"
          rel="noreferrer"
          className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
            OpenAPI
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            {isZh ? "system 模块 JSON" : "system module JSON"}
          </p>
          <p className="mt-2 font-mono text-xs text-slate-600 dark:text-slate-300">
            {openApiSystem}
          </p>
        </a>
        <a
          href={openApiDefault}
          target="_blank"
          rel="noreferrer"
          className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
            OpenAPI
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            {isZh ? "聚合文档 JSON" : "Aggregate JSON"}
          </p>
          <p className="mt-2 font-mono text-xs text-slate-600 dark:text-slate-300">
            {openApiDefault}
          </p>
        </a>
      </div>

      <section className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/90 shadow dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 px-6 py-4 dark:border-white/10">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {isZh ? "Swagger 预览" : "Swagger preview"}
          </h2>
          <a
            href={swaggerUi}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-sky-600 hover:underline dark:text-sky-300"
          >
            {isZh ? "新窗口打开" : "Open in new tab"}
          </a>
        </div>
        <iframe
          title="Swagger UI"
          src={swaggerUi}
          className="h-[70vh] w-full bg-white dark:bg-slate-950"
        />
      </section>

      <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {isZh ? "提示" : "Notes"}
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>
            {isZh
              ? "本控制台所有接口默认走网关前缀 /gateway，可通过环境变量 SYSTEM_API_PATH_PREFIX 覆盖。"
              : "This console uses the /gateway prefix by default; override via SYSTEM_API_PATH_PREFIX."}
          </li>
          <li>
            {isZh
              ? "如果 Swagger UI 不存在，请至少使用 OpenAPI JSON 地址进行接口校验。"
              : "If Swagger UI is not available, use the OpenAPI JSON endpoints for verification."}
          </li>
        </ul>
      </section>
    </ConsolePage>
  );
}
