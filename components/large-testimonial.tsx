import Image from "next/image";
import TestimonialImg from "@/public/images/large-testimonial.jpg";
import { getI18n } from "@/lib/i18n/server";

export default async function LargeTestimonial() {
  const { t } = await getI18n();
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/90 px-8 py-12 text-center shadow-[0_40px_120px_rgba(59,130,246,0.15)] dark:border-white/10 dark:bg-gray-950/80 md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute -left-16 top-0 size-64 rounded-full bg-sky-400/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-8 bottom-0 size-56 rounded-full bg-indigo-500/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-6">
            <div className="relative mx-auto inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/70 p-2 shadow-lg shadow-slate-200/60 dark:border-white/10 dark:bg-white/5">
              <Image
                className="size-16 rounded-full object-cover"
                src={TestimonialImg}
                width={64}
                height={64}
                alt="Large testimonial"
              />
              <div className="absolute -right-1.5 -top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg">
                “
              </div>
            </div>
            <blockquote className="text-2xl font-semibold text-slate-800 dark:text-white md:text-[28px]">
              {t.largeTestimonial.quotePrefix}{" "}
              <em className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                {t.largeTestimonial.quoteEmphasis}
              </em>
              {t.largeTestimonial.quoteSuffix}
            </blockquote>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-300">
              <span className="text-slate-900 dark:text-white">
                {t.largeTestimonial.person}
              </span>{" "}
              <span className="text-slate-400">/</span>{" "}
              <a
                className="text-sky-600 transition hover:text-sky-500 dark:text-sky-300"
                href="#0"
              >
                {t.largeTestimonial.role}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
