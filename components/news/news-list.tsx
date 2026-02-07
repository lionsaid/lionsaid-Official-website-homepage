"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import HoverCard from "@/components/ui/hover-card";
import type { NewsContent } from "@/lib/content/news";

const SORT_OPTIONS = ["newest", "oldest"] as const;
type SortKey = (typeof SORT_OPTIONS)[number];

export default function NewsList({
  items,
  locale,
}: {
  items: NewsContent[];
  locale: "en" | "zh";
}) {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("newest");

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filteredItems = items.filter((item) => {
      const tagMatch = activeTag === "all" || item.tags.includes(activeTag);
      if (!tagMatch) return false;
      if (!needle) return true;
      return (
        item.title.toLowerCase().includes(needle) ||
        item.summary.toLowerCase().includes(needle) ||
        item.tags.some((tag) => tag.toLowerCase().includes(needle))
      );
    });

    const sorted = [...filteredItems].sort((a, b) => {
      const aDate = Date.parse(a.date);
      const bDate = Date.parse(b.date);
      return sortKey === "newest" ? bDate - aDate : aDate - bDate;
    });

    return sorted;
  }, [items, activeTag, query, sortKey]);

  const allLabel = locale === "zh" ? "全部" : "All";
  const searchLabel = locale === "zh" ? "搜索" : "Search";
  const searchPlaceholder = locale === "zh" ? "搜索标题、摘要或标签" : "Search title, summary, or tags";

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                activeTag === tag
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 text-black/60 hover:border-black/30 dark:border-white/10 dark:text-white/60 dark:hover:border-white/30"
              }`}
            >
              {tag === "all" ? allLabel : tag}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
            {searchLabel}
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 outline-none transition focus:border-black/40 dark:border-white/10 dark:bg-black/40 dark:text-white/70"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
            {locale === "zh" ? "排序" : "Sort"}
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 outline-none transition focus:border-black/40 dark:border-white/10 dark:bg-black/40 dark:text-white/70"
            >
              <option value="newest">{locale === "zh" ? "最新" : "Newest"}</option>
              <option value="oldest">{locale === "zh" ? "最早" : "Oldest"}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link key={item.slug} href={`/news/${item.slug}`} className="group">
            <HoverCard>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                {item.date}
              </p>
              <h2 className="mt-4 text-xl font-semibold text-black dark:text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-black/60 dark:text-white/60">{item.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/60 dark:border-white/10 dark:text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </HoverCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
