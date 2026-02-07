"use client";

import { useEffect, useMemo, useState } from "react";
import GlareCard from "@/components/ui/glare-card";

const CODE_FLOATERS = ["{ }", "</>", "SELECT *", "const", "useMemo()", "@media", "grid", "API", "JSON"];

type HomeCopy = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  mojiLabel: string;
  mojiTitleLine1: string;
  mojiTitleLine2: string;
  mojiDescription: string;
  mojiSwitchLabel: string;
  mojiDay: string;
  mojiNight: string;
  mojiEditorLabel: string;
  mojiEditorTitle: string;
  mojiEditorSubtitle: string;
  mojiEditorBody: string;
  zhiliaoLabel: string;
  zhiliaoTitleLine1: string;
  zhiliaoTitleLine2: string;
  zhiliaoDescription: string;
  zhiliaoPoweredBy: string;
  zhiliaoSwipeLabel: string;
  zhiliaoMemoryLabel: string;
  zhiliaoCardTitle: string;
  zhiliaoCardHint: string;
  zhiliaoRetention: string;
  engineeringLabel: string;
  engineeringTitle: string;
  engineeringDescription: string;
  engineeringReadMore: string;
  blogPosts: Array<{ title: string; subtitle: string }>;
  aboutLabel: string;
  aboutTitleLine1: string;
  aboutTitleLine2: string;
  aboutDescription: string;
  aboutAdvantageLabel: string;
  aboutAdvantageItems: string[];
};

export default function HomeShowcase({
  className = "",
  copy,
}: {
  className?: string;
  copy: HomeCopy;
}) {
  const [mojiMode, setMojiMode] = useState<"day" | "night">("day");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 10;
      const y = (event.clientY / innerHeight - 0.5) * -10;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const floaters = useMemo(
    () =>
      CODE_FLOATERS.map((text, index) => ({
        id: `${text}-${index}`,
        text,
        style: {
          left: `${8 + index * 10}%`,
          top: `${10 + ((index * 13) % 60)}%`,
          animationDelay: `${index * 0.6}s`,
        },
      })),
    []
  );

  return (
    <div
      className={`relative overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.25),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent_60%)]"></div>
        <div className="absolute right-[-10%] top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:96px_96px] dark:opacity-[0.12]"></div>
      </div>

      <section className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col gap-10 px-4 pb-24 pt-24 sm:min-h-[80vh] sm:px-6 lg:pt-32">
        <div className="absolute inset-0 -z-10">
          {floaters.map((item) => (
            <span
              key={item.id}
              className="absolute text-xs font-medium text-black/30 animate-[float_8s_ease-in-out_infinite] dark:text-white/25"
              style={item.style}
            >
              {item.text}
            </span>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-black/70 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              {copy.badge}
            </p>
            <h1 className="reveal text-5xl font-semibold uppercase tracking-[-0.02em] text-black sm:text-6xl md:text-7xl dark:text-white" data-reveal>
              {copy.titleLine1}
              <br />
              {copy.titleLine2}
            </h1>
            <p className="reveal max-w-xl text-lg text-black/70 dark:text-white/70" data-reveal>
              {copy.description}
            </p>
            <div className="reveal flex flex-wrap items-center gap-4" data-reveal>
              <a
                href="#products"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30 dark:bg-white dark:text-black"
              >
                {copy.ctaPrimary}
                <span className="text-base">↘</span>
              </a>
              <a
                href="#engineering"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                {copy.ctaSecondary}
              </a>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center"
          >
            <div
              className="reveal relative flex flex-col items-center justify-center gap-6 sm:flex-row"
              data-reveal
              style={{
                transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <PhoneMock
                title="Moji"
                subtitle="Quiet writing"
                variant="moji"
                className="sm:-translate-y-6"
              />
              <PhoneMock
                title="Zhiliao"
                subtitle="Review cards"
                variant="zhiliao"
                className="sm:translate-y-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="relative bg-[#fdfbf7] py-24 dark:bg-[#0f0f0f]">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.mojiLabel}
            </p>
            <h2 className="reveal text-4xl font-semibold text-black dark:text-white" data-reveal>
              {copy.mojiTitleLine1}
              <br />
              {copy.mojiTitleLine2}
            </h2>
            <p className="reveal text-lg text-black/65 dark:text-white/60" data-reveal>
              {copy.mojiDescription}
            </p>
            <div className="reveal inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/70 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70" data-reveal>
              <span>{copy.mojiSwitchLabel}</span>
              <button
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                  mojiMode === "day"
                    ? "bg-black text-white"
                    : "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                }`}
                onClick={() => setMojiMode("day")}
              >
                {copy.mojiDay}
              </button>
              <button
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                  mojiMode === "night"
                    ? "bg-black text-white"
                    : "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                }`}
                onClick={() => setMojiMode("night")}
              >
                {copy.mojiNight}
              </button>
            </div>
          </div>

          <div
            className={`reveal relative rounded-[32px] border border-black/10 p-10 shadow-xl transition-all duration-500 dark:border-white/10 ${
              mojiMode === "day"
                ? "bg-white text-black"
                : "bg-[#0b0b0b] text-white"
            }`}
            data-reveal
          >
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                {copy.mojiEditorLabel}
              </p>
              <h3 className="text-3xl font-semibold leading-tight">
                {copy.mojiEditorTitle}
              </h3>
              <p className={`text-lg ${mojiMode === "day" ? "text-black/60" : "text-white/60"}`}>
                {copy.mojiEditorSubtitle}
              </p>
              <div className="rounded-2xl border border-black/10 p-6 text-sm leading-relaxed dark:border-white/10">
                {copy.mojiEditorBody}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24 dark:bg-black">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.zhiliaoLabel}
            </p>
            <h2 className="reveal text-4xl font-semibold text-black dark:text-white" data-reveal>
              {copy.zhiliaoTitleLine1}
              <br />
              {copy.zhiliaoTitleLine2}
            </h2>
            <p className="reveal text-lg text-black/65 dark:text-white/60" data-reveal>
              {copy.zhiliaoDescription}
            </p>
            <div className="reveal inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-black px-4 py-2 text-xs text-white shadow-lg dark:border-white/10 dark:bg-white dark:text-black font-[var(--font-plex-mono)]" data-reveal>
              {copy.zhiliaoPoweredBy}
            </div>
          </div>

          <div className="relative reveal" data-reveal>
            <div className="relative h-[360px] overflow-hidden rounded-[32px] border border-black/10 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-8 shadow-xl dark:border-white/10 dark:from-emerald-500/10 dark:via-black dark:to-emerald-500/20">
              <div className="absolute right-8 top-8 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700/70 dark:text-emerald-300/70">
                {copy.zhiliaoSwipeLabel}
              </div>
              <div className="absolute bottom-8 left-8 text-xs text-black/60 dark:text-white/60">
                {copy.zhiliaoMemoryLabel}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-56 w-80">
                  <div className="absolute left-0 top-10 h-40 w-64 -rotate-6 rounded-2xl bg-white/90 shadow-xl"></div>
                  <div className="absolute left-6 top-6 h-44 w-64 -rotate-2 rounded-2xl bg-white/95 shadow-xl"></div>
                  <div className="absolute left-12 top-2 h-48 w-64 rotate-3 rounded-2xl bg-white shadow-2xl">
                    <div className="flex h-full flex-col justify-between p-5">
                      <div className="text-sm font-semibold text-gray-900">{copy.zhiliaoCardTitle}</div>
                      <div className="text-xs text-gray-500">{copy.zhiliaoCardHint}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-10 right-8 h-20 w-40 rounded-2xl border border-emerald-200/60 bg-white/70 p-4 text-xs text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-black/30 dark:text-emerald-200">
                {copy.zhiliaoRetention}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="engineering" className="relative bg-[#f7f7f7] py-24 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.engineeringLabel}
            </p>
            <h2 className="reveal text-4xl font-semibold text-black dark:text-white" data-reveal>
              {copy.engineeringTitle}
            </h2>
            <p className="reveal text-lg text-black/65 dark:text-white/60" data-reveal>
              {copy.engineeringDescription}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {copy.blogPosts.map((post, index) => (
              <div
                key={post.title}
                className="reveal"
                data-reveal
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <GlareCard className=\"bg-white/90 dark:bg-white/5\">\n                  <p className=\"text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40\">Engineering</p>\n                  <h3 className=\"mt-4 text-xl font-semibold text-black dark:text-white\">{post.title}</h3>\n                  <p className=\"mt-3 text-sm text-black/60 dark:text-white/60\">{post.subtitle}</p>\n                  <div className=\"mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400\">\n                    {copy.engineeringReadMore} <span>→</span>\n                  </div>\n                </GlareCard>\n              </div>\n            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative bg-white py-24 dark:bg-black">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {copy.aboutLabel}
            </p>
            <h2 className="reveal text-4xl font-semibold text-black dark:text-white" data-reveal>
              {copy.aboutTitleLine1}
              <br />
              {copy.aboutTitleLine2}
            </h2>
            <p className="reveal text-lg text-black/65 dark:text-white/60" data-reveal>
              {copy.aboutDescription}
            </p>
          </div>
          <div className="reveal rounded-[32px] border border-black/10 bg-black p-10 text-white shadow-xl dark:border-white/10" data-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{copy.aboutAdvantageLabel}</p>
            <ul className="mt-6 space-y-4 text-sm text-white/75">
              {copy.aboutAdvantageItems.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 600ms ease, transform 600ms ease;
          will-change: opacity, transform;
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

function PhoneMock({
  title,
  subtitle,
  variant,
  className = "",
}: {
  title: string;
  subtitle: string;
  variant: "moji" | "zhiliao";
  className?: string;
}) {
  const isMoji = variant === "moji";
  return (
    <div
      className={`relative h-[320px] w-[180px] rounded-[32px] border border-black/10 bg-white/90 shadow-2xl transition-transform duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-white/5 sm:h-[360px] sm:w-[200px] ${className}`}
    >
      <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rounded-full bg-black/80"></div>
      <div className="absolute inset-3 rounded-[26px] bg-gradient-to-br from-white to-gray-100 p-4 dark:from-black dark:to-neutral-900">
        <div className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
          {title}
        </div>
        <div className="mt-4 text-sm font-semibold text-black dark:text-white">{subtitle}</div>
        <div className="mt-6 space-y-2 text-xs text-black/50 dark:text-white/50">
          {isMoji ? (
            <>
              <div className="h-2 w-24 rounded-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-2 w-28 rounded-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-2 w-20 rounded-full bg-black/10 dark:bg-white/10"></div>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-[10px] text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                Card · Swipe →
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-[10px] text-blue-700 dark:border-blue-400/40 dark:bg-blue-500/10 dark:text-blue-200">
                Review curve
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
