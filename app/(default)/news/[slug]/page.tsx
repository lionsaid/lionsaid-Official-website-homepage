import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import HoverCard from "@/components/ui/hover-card";
import NewsReader from "@/components/news/news-reader";
import BackgroundBeams from "@/components/ui/background-beams";
import { getI18n } from "@/lib/i18n/server";
import { news, type NewsSlug } from "@/lib/content/news";
import { markdownToHtml } from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.en.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: NewsSlug }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = await getI18n();
  const item = news[locale as "en" | "zh"].find((entry) => entry.slug === resolvedParams.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: NewsSlug }>;
}) {
  const resolvedParams = await params;
  const { locale } = await getI18n();
  const items = news[locale as "en" | "zh"];
  const item = items.find((entry) => entry.slug === resolvedParams.slug);
  if (!item) notFound();

  const related = items.filter((entry) => entry.slug !== item.slug).slice(0, 2);
  const markdownContent = item.mdPath
    ? await readFile(path.join(process.cwd(), item.mdPath), "utf-8").catch(() => null)
    : null;
  const markdownHtml = markdownContent ? markdownToHtml(markdownContent) : null;
  const headingCounter = new Map<string, number>();
  const markdownHeadings =
    markdownContent?.split("\n").flatMap((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (!match) return [];
      const level = match[1].length as 2 | 3;
      const title = match[2].trim();
      const baseId = title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      let id = baseId;
      const count = headingCounter.get(baseId) ?? 0;
      if (count > 0) id = `${baseId}-${count + 1}`;
      headingCounter.set(baseId, count + 1);
      return [{ id, title, level }];
    }) ?? [];
  const wordCount = markdownContent
    ? markdownContent
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
        .replace(/[#>*_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim().length
    : null;
  const readingTime = wordCount ? Math.max(1, Math.round(wordCount / 360)) : null;

  return (
    <main className="relative overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundBeams className="opacity-35 dark:opacity-45" />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent_60%)]"></div>
      </div>
      <section className="mx-auto max-w-4xl px-4 pb-10 pt-28 sm:px-6 lg:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-black/60 dark:text-white/50">
          {locale === "zh" ? "新闻文档" : "News"}
        </p>
        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">{item.title}</h1>
        <p className="mt-4 text-lg text-black/70 dark:text-white/70">{item.summary}</p>
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
      </section>

      <section className="bg-white py-12 dark:bg-black">
        {markdownHtml ? (
          <NewsReader
            html={markdownHtml}
            headings={markdownHeadings}
            locale={locale as "en" | "zh"}
            publishedAt={item.date}
            wordCount={wordCount}
            readingTime={readingTime}
          />
        ) : (
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="space-y-8">
              {item.sections.map((section) => (
                <section key={section.heading} className="border-t border-black/10 pt-6 dark:border-white/10">
                  <h2 className="text-2xl font-semibold text-black dark:text-white">{section.heading}</h2>
                  <p className="mt-3 text-base text-black/70 dark:text-white/70">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-white py-12 dark:bg-black">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6">
          <HoverCard className="bg-white px-6 py-6 dark:bg-black/40">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "发布时间" : "Published"}
            </p>
            <p className="mt-4 text-sm text-black/70 dark:text-white/70">{item.date}</p>
          </HoverCard>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "相关文章" : "Related"}
            </p>
            <div className="mt-4 grid gap-4">
              {related.map((entry) => (
                <Link key={entry.slug} href={`/news/${entry.slug}`} className="block">
                  <HoverCard className="bg-white px-6 py-5 dark:bg-black/40">
                    <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                      {entry.date}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-black dark:text-white">{entry.title}</h3>
                    <p className="mt-2 text-sm text-black/60 dark:text-white/60">{entry.summary}</p>
                  </HoverCard>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
