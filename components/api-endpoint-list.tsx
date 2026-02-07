import type { ApiEndpoint } from "@/lib/system-spec";
import type { Locale } from "@/lib/i18n/locales";

const LABELS: Record<Locale, { parameters: string; optional: string }> = {
  en: {
    parameters: "Parameters",
    optional: "optional",
  },
  zh: {
    parameters: "请求参数",
    optional: "可选",
  },
};

type Props = {
  title: string;
  description?: string;
  endpoints: ApiEndpoint[];
  locale: Locale;
};

export default function ApiEndpointList({ title, description, endpoints, locale }: Props) {
  if (!endpoints.length) return null;
  const labels = LABELS[locale];

  return (
    <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
        {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <div className="mt-5 space-y-4">
        {endpoints.map((endpoint) => (
          <article
            key={`${endpoint.method}-${endpoint.path}-${endpoint.operationId}`}
            className="rounded-[24px] border border-slate-200/70 bg-white/80 p-4 text-sm shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {endpoint.method}
              </span>
              <code className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-800 dark:bg-white/10 dark:text-slate-200">
                {endpoint.path}
              </code>
            </div>
            <p className="mt-3 font-semibold text-slate-900 dark:text-white">{endpoint.summary}</p>
            {endpoint.description && (
              <p className="text-slate-600 dark:text-slate-300">{endpoint.description}</p>
            )}
            {endpoint.parameters.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {labels.parameters}
                </p>
                <ul className="space-y-1">
                  {endpoint.parameters.map((param) => (
                    <li key={`${endpoint.path}-${param.name}`} className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-xs text-slate-800 dark:text-slate-200">
                        {param.name}
                      </span>
                      <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                        {param.in}
                      </span>
                      {!param.required && (
                        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                          {labels.optional}
                        </span>
                      )}
                      {param.description && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">{param.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
