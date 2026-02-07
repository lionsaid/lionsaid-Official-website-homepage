import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import GlareCard from "@/components/ui/glare-card";

export const metadata: Metadata = {
  title: "About Lionsaid",
  description: "Meet the Lionsaid studio behind Moji and Zhiliao Cards.",
};

export default async function AboutPage() {
  const { t } = await getI18n();
  const copy = t.pages.about;

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_60%)]"></div>
          <div className="absolute right-[-8%] top-32 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_60%)]"></div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-black/60 dark:text-white/50">
            {copy.eyebrow}
          </p>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold uppercase tracking-[-0.02em] sm:text-6xl">
                {copy.title}
              </h1>
              <p className="max-w-xl text-lg text-black/70 dark:text-white/70">
                {copy.description}
              </p>
            </div>
            <GlareCard className="bg-white/90 p-8 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.studioTitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {copy.studioBody}
              </p>
              <div className="mt-6 grid gap-4">
                {copy.values.map((value) => (
                  <div key={value.title} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-black/40">
                    <p className="font-semibold text-black dark:text-white">{value.title}</p>
                    <p className="mt-2 text-xs text-black/60 dark:text-white/60">{value.description}</p>
                  </div>
                ))}
              </div>
            </GlareCard>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16 dark:bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.valuesTitle}
            </p>
            <div className="mt-6 space-y-6">
              {copy.values.map((value) => (
                <div key={value.title} className="border-l border-black/20 pl-4 dark:border-white/20">
                  <p className="text-lg font-semibold">{value.title}</p>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <GlareCard className="bg-white p-8 dark:bg-black/40">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
              {copy.timelineTitle}
            </p>
            <div className="mt-6 space-y-6">
              {copy.timeline.map((item) => (
                <div key={item.year} className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-black/60 dark:text-white/60">{item.year}</span>
                    <span className="h-px flex-1 bg-black/10 dark:bg-white/10"></span>
                  </div>
                  <p className="text-base font-semibold text-black dark:text-white">{item.title}</p>
                  <p className="text-sm text-black/60 dark:text-white/60">{item.description}</p>
                </div>
              ))}
            </div>
          </GlareCard>
        </div>
      </section>
    </main>
  );
}
