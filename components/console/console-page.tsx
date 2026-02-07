type Props = {
  breadcrumbs?: Array<{ label: string; href?: string }>;
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
};

import Link from "next/link";

export default function ConsolePage({
  breadcrumbs,
  backHref,
  backLabel = "Back",
  eyebrow,
  title,
  subtitle,
  actions,
  meta,
  children,
}: Props) {
  return (
    <div className="relative">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/85 py-5 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            {(backHref || (breadcrumbs && breadcrumbs.length > 0)) && (
              <div className="flex flex-wrap items-center gap-3">
                {backHref && (
                  <Link
                    href={backHref}
                    className="inline-flex items-center rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    ← {backLabel}
                  </Link>
                )}
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {breadcrumbs.map((crumb, index) => {
                      const isLast = index === breadcrumbs.length - 1;
                      const node = crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className="rounded-full px-2 py-1 transition hover:bg-slate-900/[0.04] hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-slate-200"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="px-2 py-1 text-slate-700 dark:text-slate-200">
                          {crumb.label}
                        </span>
                      );
                      return (
                        <span key={`${crumb.label}-${index}`} className="inline-flex items-center">
                          {index > 0 && <span className="mx-0.5 select-none text-slate-400">/</span>}
                          {node}
                        </span>
                      );
                    })}
                  </nav>
                )}
              </div>
            )}
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                {eyebrow}
              </p>
            )}
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
            {meta && (
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                {meta}
              </div>
            )}
            {actions}
          </div>
        </div>
      </header>

      <div className="space-y-8 py-8">
        {children}
      </div>
    </div>
  );
}
