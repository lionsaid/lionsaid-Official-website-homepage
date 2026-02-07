import { getI18n } from "@/lib/i18n/server";

export default async function FeaturesPlanet() {
  const { t } = await getI18n();
  const accentGradients = [
    "from-sky-500/40 via-sky-500/10 to-transparent",
    "from-indigo-500/40 via-indigo-500/10 to-transparent",
    "from-fuchsia-500/40 via-fuchsia-500/5 to-transparent",
    "from-emerald-500/30 via-emerald-500/5 to-transparent",
    "from-amber-500/30 via-amber-500/10 to-transparent",
    "from-cyan-500/30 via-cyan-500/10 to-transparent",
  ];
  const layout = [
    "lg:col-span-2",
    "md:row-span-2",
    "",
    "",
    "lg:col-span-2",
    "",
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-slate-950" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-900 px-6 py-16 text-white shadow-[0_50px_180px_rgba(15,23,42,0.65)] md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full bg-sky-500/30 blur-[160px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-10 bottom-5 size-[320px] rounded-full bg-fuchsia-500/30 blur-[140px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">
              Aceternity inspired
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              {t.featuresPlanet.title}
            </h2>
            <p className="mt-4 text-base text-slate-300">
              {t.featuresPlanet.subtitle}
            </p>
          </div>

          <div className="relative z-10 mt-12 grid auto-rows-[minmax(220px,auto)] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.featuresPlanet.items.map((item, index) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur ${layout[index] ?? ""}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-80 blur-[1px] [mask-image:radial-gradient(circle_at_top,_black,transparent_70%)] bg-gradient-to-br ${
                    accentGradients[index % accentGradients.length]
                  }`}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 text-sm font-semibold text-slate-100">
                      0{index + 1}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-200">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                    {t.hero.learnMore}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
