import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import Avatar06 from "@/public/images/avatar-06.jpg";
import { getI18n } from "@/lib/i18n/server";

const AVATARS = [Avatar01, Avatar02, Avatar03, Avatar04, Avatar05, Avatar06];

export default async function HeroHome() {
  const { t } = await getI18n();

  return (
    <section className="relative overflow-hidden">
      <PageIllustration />
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle_at_center,rgba(148,163,184,0.3)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="relative isolate overflow-hidden rounded-[40px] border border-white/10 bg-white/80 px-6 py-16 text-center shadow-[0_35px_120px_rgba(56,189,248,0.25)] backdrop-blur-md dark:border-white/5 dark:bg-gray-900/60 md:px-16">
            <div
              className="pointer-events-none absolute inset-6 -z-10 rounded-[32px] border border-white/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-10 top-8 -z-10 h-72 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),transparent_70%)] blur-3xl"
              aria-hidden="true"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/90 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              {t.hero.badge}
            </div>
            <h1 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
              {t.hero.titleLine1} <br className="max-lg:hidden" />
              {t.hero.titleLine2}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-200">
              {t.hero.description}
            </p>
            <div className="mx-auto mt-8 flex flex-col gap-4 text-base sm:flex-row sm:justify-center">
              <a
                className="btn group inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 px-7 py-3 text-white shadow-xl shadow-sky-500/30 transition duration-300 hover:scale-[1.01] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-400"
                href="#0"
              >
                <span className="relative inline-flex items-center">
                  {t.hero.startFreeTrial}
                  <span className="ml-2 text-sky-200 transition group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
              </a>
              <a
                className="btn inline-flex items-center justify-center rounded-full border border-slate-200/60 bg-white/70 px-7 py-3 text-slate-900 transition hover:border-slate-300 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                href="#0"
              >
                {t.hero.learnMore}
              </a>
            </div>

            <div className="mt-12 grid gap-6 text-left lg:grid-cols-[1.1fr,0.9fr]">
              <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-slate-900 via-gray-900 to-gray-900/80 p-6 text-sm text-slate-300 shadow-2xl dark:border-white/5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                  <span>{t.hero.codeDomain}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-emerald-300/90">
                    {t.hero.livePreviewLabel}
                  </span>
                </div>
                <div className="mt-6 font-mono text-base text-slate-500 [&_span]:opacity-0">
                  <span className="animate-[code-1_10s_infinite] text-emerald-300">
                    {t.hero.codeLogin}
                  </span>{" "}
                  <span className="animate-[code-2_10s_infinite] text-slate-400">
                    {t.hero.codeRegistry}
                  </span>
                  <br />
                  <span className="animate-[code-3_10s_infinite] text-slate-400">
                    {t.hero.codeScope}
                  </span>{" "}
                  <span className="animate-[code-4_10s_infinite] text-slate-200">
                    {t.hero.codeLoggedIn}
                  </span>
                  <br />
                  <br />
                  <span className="animate-[code-5_10s_infinite] text-indigo-300">
                    {t.hero.codePublish}
                  </span>
                  <br />
                  <span className="animate-[code-6_10s_infinite] text-slate-100">
                    {t.hero.codePublished}
                  </span>
                </div>
                <div className="pointer-events-none absolute -right-16 -top-10 h-48 w-48 rounded-full bg-sky-500/30 blur-3xl" />
              </div>
              <div className="grid gap-6">
                <div className="rounded-[28px] border border-slate-200/70 bg-white px-6 py-5 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                        {t.hero.statLabel}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                        {t.hero.statValue}
                      </p>
                    </div>
                    <div className="flex -space-x-3">
                      {AVATARS.map((avatar, index) => (
                        <Image
                          key={index}
                          className="box-content rounded-full border-2 border-white bg-white dark:border-gray-900 dark:bg-gray-900"
                          src={avatar}
                          width={48}
                          height={48}
                          alt={`Avatar ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                    {t.hero.highlightDescription}
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-[28px] border border-slate-200/50 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-6 py-5 shadow-2xl dark:border-white/10">
                  <div
                    className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_top,_black,transparent_70%)] [background-image:linear-gradient(120deg,rgba(59,130,246,0.8),rgba(236,72,153,0.4))]"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                      {t.hero.highlightTitle}
                    </p>
                    <p className="mt-3 text-base text-slate-100">
                      {t.hero.highlightDescription}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-sky-100">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-lg text-white">
                        ✦
                      </span>
                      {t.hero.startFreeTrial}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
