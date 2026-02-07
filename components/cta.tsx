import Image from "next/image";
import Stripes from "@/public/images/stripes-dark.svg";
import { getI18n } from "@/lib/i18n/server";

export default async function Cta() {
  const { t } = await getI18n();
  return (
    <section className="pb-16 pt-8 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-950 px-6 py-14 text-center shadow-[0_40px_140px_rgba(45,212,191,0.28)] md:px-14 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_top,_rgba(56,189,248,0.3),transparent_65%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-30"
            aria-hidden="true"
          >
            <Image
              className="w-full opacity-40"
              src={Stripes}
              alt="Stripes"
              width={768}
              height={432}
            />
          </div>
          <div className="absolute -left-4 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            {t.hero.badge}
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-300">
              {t.cta.subtitle}
            </p>
            <div className="mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                className="btn group inline-flex w-full items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-emerald-400 to-sky-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/30 transition hover:scale-[1.01] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-300 sm:w-auto"
                href="#0"
              >
                <span className="relative inline-flex items-center">
                  {t.cta.startFreeTrial}
                  <span className="ml-2 text-emerald-100 transition group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
              </a>
              <a
                className="btn inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                href="#0"
              >
                {t.hero.learnMore}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
