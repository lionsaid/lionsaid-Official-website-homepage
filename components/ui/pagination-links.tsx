import Link from "next/link";

type Props = {
  page: number;
  size: number;
  hasNext: boolean;
  basePath: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  labels?: { prev: string; next: string };
};

function toSearchString(query: Record<string, string | number | boolean | undefined | null>) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.set(key, String(value));
  });
  const s = params.toString();
  return s ? `?${s}` : "";
}

export default function PaginationLinks({
  page,
  size,
  hasNext,
  basePath,
  query = {},
  labels = { prev: "Previous", next: "Next" },
}: Props) {
  const prevDisabled = page <= 0;

  const prevHref = `${basePath}${toSearchString({ ...query, page: Math.max(0, page - 1), size })}`;
  const nextHref = `${basePath}${toSearchString({ ...query, page: page + 1, size })}`;

  return (
    <div className="flex items-center justify-between gap-3">
      {prevDisabled ? (
        <span className="rounded-full border border-slate-200/70 px-4 py-2 text-sm font-semibold text-slate-400 dark:border-white/10 dark:text-slate-600">
          {labels.prev}
        </span>
      ) : (
        <Link
          href={prevHref}
          className="rounded-full border border-slate-200/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
        >
          {labels.prev}
        </Link>
      )}

      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
        Page {page + 1}
      </span>

      {hasNext ? (
        <Link
          href={nextHref}
          className="rounded-full border border-slate-200/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
        >
          {labels.next}
        </Link>
      ) : (
        <span className="rounded-full border border-slate-200/70 px-4 py-2 text-sm font-semibold text-slate-400 dark:border-white/10 dark:text-slate-600">
          {labels.next}
        </span>
      )}
    </div>
  );
}

