"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/moving-border";

export type NewsHeading = { id: string; title: string; level: 2 | 3 };

type Props = {
  html: string;
  headings: NewsHeading[];
  locale: "en" | "zh";
  publishedAt: string;
  wordCount: number | null;
  readingTime: number | null;
};

export default function NewsReader({ html, headings, locale, publishedAt, wordCount, readingTime }: Props) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const [readingMode, setReadingMode] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const percent = height > 0 ? Math.min(1, Math.max(0, current / height)) : 0;
      setProgress(percent);

      const headingEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-news-content] h2, [data-news-content] h3"),
      );
      const currentId = headingEls
        .filter((el) => el.offsetTop - 120 <= current)
        .map((el) => el.id)
        .pop();
      if (currentId && currentId !== activeId) setActiveId(currentId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeId]);

  const progressLabel = useMemo(() => `${Math.round(progress * 100)}%`, [progress]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[180px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-6">
          <div className="rounded-2xl border border-black/10 bg-white/80 p-4 text-xs text-black/60 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            <div className="flex items-center justify-between">
              <span>{locale === "zh" ? "阅读进度" : "Progress"}</span>
              <span className="text-black dark:text-white">{progressLabel}</span>
            </div>
            <div className="mt-3 h-32 w-2 rounded-full bg-black/10 dark:bg-white/10">
              <div
                className="w-full rounded-full bg-emerald-500 transition-all"
                style={{ height: `${Math.max(6, progress * 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/80 p-4 text-xs text-black/60 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "目录" : "Contents"}
            </p>
            <nav className="mt-4 space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block text-xs transition ${
                    activeId === heading.id
                      ? "text-black dark:text-white"
                      : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
                  } ${heading.level === 3 ? "pl-3" : "pl-0"}`}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/80 p-4 text-xs text-black/60 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "阅读模式" : "Reading"}
            </p>
            <div className="mt-3 w-full">
              <Button
                onClick={() => setReadingMode((prev) => !prev)}
                className="w-full bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                {readingMode ? (locale === "zh" ? "恢复默认" : "Normal") : locale === "zh" ? "专注阅读" : "Focus"}
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
            <span>
              {locale === "zh" ? "发布时间" : "Published"} · {publishedAt}
            </span>
            {readingTime ? (
              <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold text-black/60 dark:border-white/10 dark:text-white/60">
                {locale === "zh" ? `${readingTime} 分钟阅读` : `${readingTime} min read`}
              </span>
            ) : null}
            {wordCount ? (
              <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold text-black/60 dark:border-white/10 dark:text-white/60">
                {locale === "zh" ? `${wordCount} 字` : `${wordCount} chars`}
              </span>
            ) : null}
          </div>
          <div className="lg:hidden">
            <Button
              onClick={() => setReadingMode((prev) => !prev)}
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              {readingMode ? (locale === "zh" ? "恢复默认" : "Normal") : locale === "zh" ? "专注阅读" : "Focus"}
            </Button>
          </div>
        </div>

        <div
          className={`rounded-[28px] border border-black/10 px-6 py-8 shadow-sm ${
            readingMode ? "bg-[#fdfbf7] dark:bg-[#0b0b0b]" : "bg-white/95 dark:bg-black/60"
          } dark:border-white/10`}
        >
          <article
            data-news-content
            className={`prose prose-lg max-w-none text-black/80 dark:prose-invert dark:text-white/80 [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:pt-8 [&_h2]:border-t [&_h2]:border-black/10 dark:[&_h2]:border-white/10 [&_h2]:scroll-mt-28 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_p]:leading-relaxed [&_p.lead]:text-lg [&_p.lead]:text-black/70 dark:[&_p.lead]:text-white/70 [&_a]:text-emerald-600 [&_a]:no-underline hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-black/20 [&_blockquote]:pl-6 [&_blockquote]:text-black/60 dark:[&_blockquote]:border-white/20 dark:[&_blockquote]:text-white/60 [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-white/10 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-black/10 [&_pre]:bg-black/5 [&_pre]:p-5 dark:[&_pre]:border-white/10 dark:[&_pre]:bg-white/5 ${
              readingMode ? "text-[1.02rem] leading-8" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-10 border-t border-black/10 pt-6 text-xs text-black/60 dark:border-white/10 dark:text-white/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "脚注" : "Footnotes"}
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>{locale === "zh" ? "数据来源于内部性能评测与用户回访。" : "Based on internal profiling and user feedback."}</li>
              <li>{locale === "zh" ? "硬件环境为 iPhone ProMotion 系列设备。" : "Hardware reference: iPhone ProMotion devices."}</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
