import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import HoverCard from "@/components/ui/hover-card";
import Spotlight from "@/components/ui/spotlight";
import { Button } from "@/components/ui/moving-border";

export const metadata: Metadata = {
  title: "Contact Lionsaid",
  description: "Reach the Lionsaid studio team.",
};

export default async function ContactPage() {
  const { t } = await getI18n();
  const copy = t.pages.contact;

  return (
    <main className="relative overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      <Spotlight className="opacity-50 dark:opacity-60" />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-12 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_60%)]"></div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-28 sm:px-6 lg:pt-32">
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
            <div className="rounded-[32px] border border-black/10 bg-white/90 p-8 shadow-xl dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.visitTitle}
              </p>
              <p className="mt-4 text-sm text-black/70 dark:text-white/70">{copy.visitBody}</p>
              <div className="mt-6 rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs text-black/60 dark:border-white/10 dark:bg-black/30 dark:text-white/60">
                lionsaid.com · Studio inbox
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16 dark:bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.channelsTitle}
            </p>
            <div className="mt-6 space-y-4">
              {copy.channels.map((channel) => (
                <HoverCard key={channel.label} className="bg-white/95 px-5 py-4 dark:bg-black/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-black dark:text-white">{channel.label}</p>
                    <span className="text-xs text-black/50 dark:text-white/50">{channel.hint}</span>
                  </div>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70">{channel.value}</p>
                </HoverCard>
              ))}
            </div>
          </div>
          <HoverCard className="rounded-[32px] bg-white p-8 dark:bg-black/40">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
              {copy.formTitle}
            </p>
            <p className="mt-4 text-sm text-black/60 dark:text-white/60">{copy.formNote}</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-xs text-black/60 dark:border-white/10 dark:bg-black/30 dark:text-white/60">
                project · scope · timeline
              </div>
              <div className="rounded-2xl border border-dashed border-black/20 px-4 py-6 text-center text-xs text-black/40 dark:border-white/20 dark:text-white/40">
                {copy.title}
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
                hello@lionsaid.com
              </Button>
            </div>
          </HoverCard>
        </div>
      </section>
    </main>
  );
}
