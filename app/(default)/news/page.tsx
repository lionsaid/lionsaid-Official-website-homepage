import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { news } from "@/lib/content/news";
import NewsList from "@/components/news/news-list";

export const metadata: Metadata = {
  title: "News · Lionsaid",
  description: "Engineering notes and studio updates from Lionsaid.",
};

export default async function NewsPage() {
  const { locale } = await getI18n();
  const items = news[locale as "en" | "zh"];

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-black/60 dark:text-white/50">
          {locale === "zh" ? "新闻文档" : "News"}
        </p>
        <h1 className="mt-6 text-5xl font-semibold uppercase tracking-[-0.02em] sm:text-6xl">
          {locale === "zh" ? "工程与产品动态" : "Engineering notes"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
          {locale === "zh"
            ? "记录狮语团队的技术实践、系统设计与产品发布节奏。"
            : "Stories from the Lionsaid studio — engineering practice, systems, and releases."}
        </p>
      </section>

      <section className="bg-[#f6f6f6] py-16 dark:bg-[#0b0b0b]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <NewsList items={items} locale={locale as "en" | "zh"} />
        </div>
      </section>
    </main>
  );
}
