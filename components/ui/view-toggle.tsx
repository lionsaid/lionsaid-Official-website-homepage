import Link from "next/link";

type Props = {
  basePath: string;
  view: "list" | "cards";
  query?: Record<string, string | number | boolean | undefined | null>;
  labels?: { list: string; cards: string };
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

export default function ViewToggle({
  basePath,
  view,
  query = {},
  labels = { list: "List", cards: "Cards" },
}: Props) {
  const listHref = `${basePath}${toSearchString({ ...query, view: "list" })}`;
  const cardsHref = `${basePath}${toSearchString({ ...query, view: "cards" })}`;

  return (
    <div className="inline-flex rounded-full border border-slate-200/70 bg-white/70 p-1 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
      <Link
        href={listHref}
        className={`rounded-full px-3 py-1.5 font-semibold transition ${
          view === "list"
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        }`}
      >
        {labels.list}
      </Link>
      <Link
        href={cardsHref}
        className={`rounded-full px-3 py-1.5 font-semibold transition ${
          view === "cards"
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        }`}
      >
        {labels.cards}
      </Link>
    </div>
  );
}

