import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import GlareCard from "@/components/ui/glare-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export const metadata: Metadata = {
  title: "About Lionsaid",
  description: "Meet the Lionsaid studio behind Moji and Zhiliao Cards.",
};

export default async function AboutPage() {
  const { t, locale } = await getI18n();
  const copy = t.pages.about;
  const getInitials = (name: string) => {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return name.slice(0, 2);
    if (parts.length === 1) return parts[0].slice(0, 2);
    return parts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

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

      <section className="bg-white py-12 dark:bg-black">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.craftsTitle}
            </p>
            <h2 className="text-4xl font-semibold text-black dark:text-white">
              {copy.craftsHeadline}
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70">
              {copy.craftsBody}
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.craftsToolsLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {copy.craftsTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-black/70 dark:border-white/10 dark:text-white/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <BentoCard className="bg-white/90 p-6 dark:bg-white/5">
            <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              {locale === "zh" ? "工作台" : "Workbench"}
            </p>
              <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.12))] p-6 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                <div className="grid gap-3">
                  <div className="h-10 w-3/4 rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="h-10 w-2/3 rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="h-10 w-1/2 rounded-full bg-black/10 dark:bg-white/10" />
                </div>
                <div className="mt-6 text-xs text-black/50 dark:text-white/50">
                  {copy.craftsHeadline}
                </div>
              </div>
              <p className="text-sm text-black/60 dark:text-white/60">
                {locale === "zh"
                  ? "建议替换为真实工作台照片（机械键盘、草图白板、咖啡杯）。"
                  : "Replace with a real workbench photo (keyboard, sketches, coffee)."}
              </p>
            </div>
          </BentoCard>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16 dark:bg-[#0b0b0b]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.officeTitle}
            </p>
            <p className="text-lg text-black/70 dark:text-white/70">{copy.officeBody}</p>
            <p className="text-sm text-black/50 dark:text-white/50">{copy.officeNote}</p>
          </div>

          <BentoGrid>
            <BentoCard className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.teamTitle}
              </p>
              <p className="mt-4 text-sm text-black/60 dark:text-white/60">{copy.teamBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {copy.teamRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-black/70 dark:border-white/10 dark:text-white/70"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {copy.teamProfiles.map((profile) => (
                  <div
                    key={profile.name}
                    className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-xs text-black/60 dark:border-white/10 dark:bg-black/40 dark:text-white/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-xs font-semibold text-black dark:border-white/10 dark:bg-white/10 dark:text-white">
                        {getInitials(profile.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black dark:text-white">{profile.name}</p>
                        <p className="text-xs text-black/50 dark:text-white/50">{profile.role}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-black/60 dark:text-white/60">{profile.focus}</p>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.teamSnapshotTitle}
              </p>
              <div className="mt-4 grid gap-3">
                {copy.teamStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs text-black/60 dark:border-white/10 dark:bg-black/40 dark:text-white/60"
                  >
                    <span>{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.valuesTitle}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {copy.values.map((value) => (
                  <div key={value.title} className="rounded-2xl border border-black/10 bg-white px-4 py-4 dark:border-white/10 dark:bg-black/40">
                    <p className="text-sm font-semibold text-black dark:text-white">{value.title}</p>
                    <p className="mt-2 text-xs text-black/60 dark:text-white/60">{value.description}</p>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.timelineTitle}
              </p>
              <div className="mt-6 space-y-5">
                {copy.timeline.map((item) => (
                  <div key={item.year} className="grid gap-2">
                    <div className="flex items-center gap-3 text-xs font-semibold text-black/50 dark:text-white/50">
                      <span>{item.year}</span>
                      <span className="h-px flex-1 bg-black/10 dark:bg-white/10"></span>
                    </div>
                    <p className="text-sm font-semibold text-black dark:text-white">{item.title}</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{item.description}</p>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard className="lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-3">
                {copy.officeGalleryLabels.map((label, index) => (
                  <div key={label} className="space-y-3">
                    <div
                      className="aspect-[4/3] rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.16))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]"
                      style={{ filter: `saturate(${110 + index * 5}%)` }}
                    />
                    <p className="text-xs text-black/50 dark:text-white/50">{label}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}
