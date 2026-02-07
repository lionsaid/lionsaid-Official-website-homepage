import Image from "next/image";
import { getI18n } from "@/lib/i18n/server";
import Logo01 from "@/public/images/logo-01.svg";
import Logo02 from "@/public/images/logo-02.svg";
import Logo03 from "@/public/images/logo-03.svg";
import Logo04 from "@/public/images/logo-04.svg";
import Logo05 from "@/public/images/logo-05.svg";
import Logo06 from "@/public/images/logo-06.svg";
import Logo07 from "@/public/images/logo-07.svg";
import Logo08 from "@/public/images/logo-08.svg";
import Logo09 from "@/public/images/logo-09.svg";

const LOGOS = [
  { src: Logo01, alt: "Logo 01" },
  { src: Logo02, alt: "Logo 02" },
  { src: Logo03, alt: "Logo 03" },
  { src: Logo04, alt: "Logo 04" },
  { src: Logo05, alt: "Logo 05" },
  { src: Logo06, alt: "Logo 06" },
  { src: Logo07, alt: "Logo 07" },
  { src: Logo08, alt: "Logo 08" },
  { src: Logo09, alt: "Logo 09" },
];

export default async function BusinessCategories() {
  const { t } = await getI18n();

  const marqueeLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/80 px-6 py-12 shadow-[0_45px_120px_rgba(59,130,246,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/70 md:px-12">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle_at_top,_rgba(191,219,254,0.35),transparent_60%)] dark:opacity-40"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden="true"
          />
          <div className="relative z-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">
              {t.businessCategories.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
              {t.businessCategories.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-200">
              {t.businessCategories.description}
            </p>
          </div>

          <div className="relative z-10 mt-12 overflow-hidden rounded-[28px] border border-white/60 bg-white/80 px-4 py-6 shadow-inner dark:border-white/10 dark:bg-white/5">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-gray-950 dark:via-gray-950/80" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-gray-950 dark:via-gray-950/80" />
            <div className="flex w-max gap-10 animate-[infinite-scroll_26s_linear_infinite]">
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="flex h-16 w-40 items-center justify-center rounded-2xl border border-slate-200/60 bg-white/80 px-5 shadow-sm shadow-slate-200/70 dark:border-white/10 dark:bg-white/5"
                >
                  <Image src={logo.src} alt={logo.alt} width={96} height={40} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-12 grid gap-6 text-left sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                {t.businessCategories.metricLabel}
              </p>
              <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
                {t.businessCategories.metricValue}
              </p>
            </div>
            <div className="rounded-[28px] border border-slate-200/60 bg-white/80 px-6 py-5 shadow-lg shadow-slate-200/60 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold text-slate-700 dark:text-white">
                {t.hero.highlightTitle}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {t.hero.highlightDescription}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300">
                {t.hero.learnMore}
                <span aria-hidden="true">↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
