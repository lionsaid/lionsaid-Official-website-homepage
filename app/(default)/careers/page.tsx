import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import HoverCard from "@/components/ui/hover-card";
import { Button } from "@/components/ui/moving-border";

export const metadata: Metadata = {
  title: "Careers at Lionsaid",
  description: "Join the Lionsaid studio team.",
};

export default async function CareersPage() {
  const { t } = await getI18n();
  const copy = t.pages.careers;

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_60%)]"></div>
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
            <HoverCard className="bg-black p-8 text-white dark:bg-black">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {copy.cultureTitle}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {copy.culture.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </HoverCard>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16 dark:bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.rolesTitle}
            </p>
            <div className="mt-6 space-y-4">
              {copy.roles.map((role) => (
                <HoverCard key={role.title} className="bg-white px-5 py-4 dark:bg-black/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-black dark:text-white">{role.title}</p>
                    <span className="text-xs text-black/50 dark:text-white/50">{role.location}</span>
                  </div>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70">{role.description}</p>
                </HoverCard>
              ))}
            </div>
          </div>
          <HoverCard className="bg-white p-8 dark:bg-black/40">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
              {copy.ctaTitle}
            </p>
            <p className="mt-4 text-sm text-black/60 dark:text-white/60">{copy.ctaBody}</p>
            <div className="mt-6">
              <Button className="w-full bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
                people@lionsaid.com
              </Button>
            </div>
          </HoverCard>
        </div>
      </section>
    </main>
  );
}
