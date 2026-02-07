import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlareCard from "@/components/ui/glare-card";
import { Button } from "@/components/ui/moving-border";
import { getI18n } from "@/lib/i18n/server";
import { productSlugs, products, type ProductSlug } from "@/lib/content/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: ProductSlug } }): Promise<Metadata> {
  const { locale } = await getI18n();
  const data = products[locale as "en" | "zh"][params.slug];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: ProductSlug } }) {
  const { locale } = await getI18n();
  const data = products[locale as "en" | "zh"][params.slug];
  if (!data) notFound();

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_60%)]"></div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-black/60 dark:text-white/50">
            {data.label}
          </p>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold uppercase tracking-[-0.02em] sm:text-6xl">
                {data.title}
              </h1>
              <p className="text-lg text-black/70 dark:text-white/70">{data.subtitle}</p>
              <p className="max-w-xl text-base text-black/60 dark:text-white/60">{data.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 px-6 py-3 text-xs">
                  {locale === "zh" ? "查看演示" : "View demo"}
                </Button>
                <Button className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 px-6 py-3 text-xs">
                  {locale === "zh" ? "下载 App" : "Download app"}
                </Button>
              </div>
            </div>
            <GlareCard className="bg-white/90 p-8 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {locale === "zh" ? "核心亮点" : "Highlights"}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-black/70 dark:text-white/70">
                {data.highlights.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </GlareCard>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16 dark:bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          {data.showcase.map((item) => (
            <GlareCard key={item} className="bg-white px-6 py-5 dark:bg-black/40">
              <p className="text-sm font-semibold text-black dark:text-white">{item}</p>
              <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                {locale === "zh" ? "示例展示卡片" : "Sample showcase card"}
              </p>
            </GlareCard>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <GlareCard className="bg-white/90 p-6 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "产品截图" : "Product screenshot"}
            </p>
            <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.12))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
            <p className="mt-4 text-xs text-black/50 dark:text-white/50">
              {locale === "zh" ? "替换为真实 UI 截图" : "Replace with real UI capture"}
            </p>
          </GlareCard>
          <GlareCard className="bg-white/90 p-6 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "细节特写" : "Detail close-up"}
            </p>
            <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.06),rgba(0,0,0,0.16))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]" />
            <p className="mt-4 text-xs text-black/50 dark:text-white/50">
              {locale === "zh" ? "用于展示排版与交互细节" : "Show typography and interaction details"}
            </p>
          </GlareCard>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlareCard className="bg-black p-8 text-white dark:bg-black">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {locale === "zh" ? "体验场景" : "Use cases"}
            </p>
            <p className="mt-4 text-sm text-white/70">
              {locale === "zh"
                ? "适合深度写作、结构化学习与长期知识管理。"
                : "Designed for deep writing, structured learning, and long-term knowledge systems."}
            </p>
          </GlareCard>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "功能矩阵" : "Feature matrix"}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.highlights.map((item) => (
                <GlareCard key={item} className="bg-white px-4 py-4 dark:bg-black/40">
                  <p className="text-sm font-semibold text-black dark:text-white">{item}</p>
                  <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                    {locale === "zh" ? "精细打磨与一致体验" : "Precision-crafted for consistency"}
                  </p>
                </GlareCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
