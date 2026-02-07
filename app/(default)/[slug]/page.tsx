import Link from "next/link";
import { notFound } from "next/navigation";

import { getI18n } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/locales";

const PRODUCT_SLUGS = new Set<Slug>([
  "features",
  "integrations",
  "pricing",
  "changelog",
  "method",
]);

const COMPANY_SLUGS = new Set<Slug>([
  "about",
  "diversity",
  "blog",
  "careers",
  "financials",
]);

const RESOURCE_SLUGS = new Set<Slug>(["community", "terms", "vulnerability"]);

const CTA_LINKS: Record<Slug, string> = {
  features: "/signup",
  integrations: "mailto:hello@lionsaid.com",
  pricing: "mailto:sales@lionsaid.com",
  changelog: "/community",
  method: "mailto:hello@lionsaid.com?subject=BrandOS%20Deck",
  about: "mailto:hello@lionsaid.com",
  diversity: "/careers",
  blog: "mailto:press@lionsaid.com",
  careers: "mailto:people@lionsaid.com",
  financials: "mailto:invest@lionsaid.com",
  community: "mailto:community@lionsaid.com",
  terms: "mailto:legal@lionsaid.com",
  vulnerability: "mailto:security@lionsaid.com",
};

const SLUG_LABEL_KEYS = {
  features: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.productLinks.features,
  integrations: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.productLinks.integrations,
  pricing: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.productLinks.pricing,
  changelog: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.productLinks.changelog,
  method: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.productLinks.method,

  about: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.companyLinks.about,
  diversity: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.companyLinks.diversity,
  blog: (t: Awaited<ReturnType<typeof getI18n>>["t"]) => t.footer.companyLinks.blog,
  careers: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.companyLinks.careers,
  financials: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.companyLinks.financials,

  community: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.resourceLinks.community,
  terms: (t: Awaited<ReturnType<typeof getI18n>>["t"]) => t.footer.resourceLinks.terms,
  vulnerability: (t: Awaited<ReturnType<typeof getI18n>>["t"]) =>
    t.footer.resourceLinks.vulnerability,
} as const;

type Slug = keyof typeof SLUG_LABEL_KEYS;

type PageSection = {
  label: string;
  title: string;
  body: string;
  bullets?: string[];
};

type PageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: {
    value: string;
    label: string;
  };
  sections: PageSection[];
  cta: {
    title: string;
    description: string;
    action: string;
    href: string;
  };
};

const COPY_LIBRARY = {
  en: {
    product: {
      eyebrow: "Lionsaid · Platform",
      statsValue: "7 days",
      statsLabel: "Average go-live timeline",
      ctaTitle: "Launch with the studio",
      ctaDescription:
        "We’ll pair premium visuals with AI orchestration across strategy, design, copy, and build.",
      ctaAction: "Book a walkthrough",
      sections: [
        {
          label: "Strategy",
          title: "Narratives and rituals",
          body:
            "Co-design briefs, creative direction, and QA flows so every release feels cinematic yet repeatable.",
          bullets: ["BrandOS workshops", "AI copilots with your tone"],
        },
        {
          label: "Localization",
          title: "Regional quality by default",
          body:
            "Sync currencies, legal notes, and CTAs across every locale so nothing breaks when you scale.",
          bullets: ["40+ language packs", "Currency + compliance helpers"],
        },
        {
          label: "Delivery",
          title: "Canvas to production",
          body:
            "Design on a tactile canvas while engineers ship React blocks mapped to your component library.",
          bullets: ["Component parity", "Preview + publish in one flow"],
        },
      ],
    },
    company: {
      eyebrow: "Inside Lionsaid",
      statsValue: "2 studios",
      statsLabel: "Shanghai · Singapore",
      ctaTitle: "Meet the team",
      ctaDescription:
        "Say hello to the studio leads crafting lionsaid.com-caliber experiences for Asia-Pacific brands.",
      ctaAction: "Schedule an intro",
      sections: [
        {
          label: "Craft",
          title: "Premium at startup speed",
          body:
            "We believe cinematic art direction and agile execution can coexist when everyone shares one canvas.",
          bullets: ["Transparent rituals", "Design + engineering parity"],
        },
        {
          label: "People",
          title: "Multilingual, multi-market",
          body:
            "Women and non-binary leaders guide product, design, and operations supported by regional advisors.",
          bullets: ["Dual-language reviews", "Partner network across APAC"],
        },
        {
          label: "Growth",
          title: "Mentorship-first culture",
          body:
            "Join weekly critiques, personal growth plans, and a mentor bench pulled from global consumer brands.",
          bullets: ["Personal budgets", "Quarterly craft salons"],
        },
      ],
    },
    resource: {
      eyebrow: "Trust & community",
      statsValue: "<24 hrs",
      statsLabel: "Average response time",
      ctaTitle: "Stay close to lionsaid.com",
      ctaDescription:
        "Join the Circle community or request the trust paperwork you need to greenlight a launch.",
      ctaAction: "Get in touch",
      sections: [
        {
          label: "Community",
          title: "Playbooks and salons",
          body:
            "Monthly critiques, template drops, and office hours with the studio keep your team inspired.",
          bullets: ["Bilingual replays", "Request kits anytime"],
        },
        {
          label: "Policies",
          title: "Plain-language terms",
          body:
            "Service terms include human summaries, regional hosting notes, and anti-abuse guardrails.",
          bullets: ["Version history", "Readable summaries"],
        },
        {
          label: "Security",
          title: "Coordinated disclosure",
          body:
            "Report findings to our 24/7 inbox; we respond quickly with shared remediation plans.",
          bullets: ["Managed inbox", "Annual red-team reviews"],
        },
      ],
    },
  },
  zh: {
    product: {
      eyebrow: "狮语 · 平台",
      statsValue: "平均 7 天",
      statsLabel: "上线周期",
      ctaTitle: "与工作室共创",
      ctaDescription:
        "我们提供策划、设计、文案、本地化与工程支持，让 lionsaid.com 级别体验复制到你的品牌。",
      ctaAction: "预约策略会议",
      sections: [
        {
          label: "策略",
          title: "统一的叙事节奏",
          body:
            "和狮语一起定义简报、创意方向与 QA 机制，既保留电影级质感，也兼顾效率。",
          bullets: ["BrandOS 工作坊", "懂语调的 AI 协作者"],
        },
        {
          label: "本地化",
          title: "多区域原生适配",
          body:
            "币种、合规提示与 CTA 自动同步到所有语言版本，支持快速迭代。",
          bullets: ["覆盖 40+ 语言", "币种与法律提示自动注入"],
        },
        {
          label: "交付",
          title: "画布即生产",
          body:
            "设计师在画布创作，工程师直接输出与组件库一致的 React 模块，发布零偏差。",
          bullets: ["组件级别对齐", "预览与上线同一流程"],
        },
      ],
    },
    company: {
      eyebrow: "狮语工作室",
      statsValue: "两地办公室",
      statsLabel: "上海 · 新加坡",
      ctaTitle: "认识我们的团队",
      ctaDescription: "了解 lionsaid.com 背后的创意人以及他们的协作方式。",
      ctaAction: "联系狮语",
      sections: [
        {
          label: "创作",
          title: "高质感与速度并存",
          body:
            "只要所有人共享同一个工作区，就能在保持电影级质感的同时快速交付。",
          bullets: ["透明流程", "设计与工程平权"],
        },
        {
          label: "团队",
          title: "多语言多文化",
          body:
            "女性与非二元成员在核心岗位上与区域顾问协作，确保体验足够在地化。",
          bullets: ["双语评审", "覆盖亚太的顾问网络"],
        },
        {
          label: "成长",
          title: "导师与复盘文化",
          body:
            "每周 Craft 评审与个人成长预算帮助成员快速升级，并持续沉淀经验。",
          bullets: ["个人成长预算", "季度线下沙龙"],
        },
      ],
    },
    resource: {
      eyebrow: "信任与社区",
      statsValue: "<24 小时",
      statsLabel: "平均响应时间",
      ctaTitle: "紧跟狮语节奏",
      ctaDescription:
        "加入 Lionsaid Circle 或索取信任材料，以便快速批准你的下一次发布。",
      ctaAction: "取得联系",
      sections: [
        {
          label: "社区",
          title: "模板与沙龙",
          body:
            "每月举办私享会、模板投放与 Office Hour，随时吸收最新打法。",
          bullets: ["双语回放", "按需定制模板"],
        },
        {
          label: "政策",
          title: "易读条款",
          body:
            "条款附上白话摘要与托管说明，方便法务与采购同步理解。",
          bullets: ["版本可追溯", "反滥用机制"],
        },
        {
          label: "安全",
          title: "协同披露",
          body:
            "安全研究者可 24/7 报告问题，我们会在共享看板中同步修复计划。",
          bullets: ["全天候邮箱", "年度红队评估"],
        },
      ],
    },
  },
};

function buildPageCopy(
  locale: Locale,
  slug: Slug,
  navLabel: string,
): PageCopy {
  const lang = COPY_LIBRARY[locale];
  const category = PRODUCT_SLUGS.has(slug)
    ? lang.product
    : COMPANY_SLUGS.has(slug)
      ? lang.company
      : lang.resource;

  const heroEyebrow =
    locale === "zh"
      ? `${category.eyebrow} · ${navLabel}`
      : `${category.eyebrow} · ${navLabel}`;

  const heroTitle =
    locale === "zh"
      ? `${navLabel} 的下一阶段体验`
      : `${navLabel} built the Lionsaid way`;

  const heroDescription =
    locale === "zh"
      ? `借助狮语（Lionsaid）的 AI 体验 OS，在 ${navLabel} 中同步策略、设计与工程。`
      : `Use Lionsaid’s AI-native experience OS to ship ${navLabel} surfaces with shared rituals across strategy, design, and engineering.`;

  return {
    hero: {
      eyebrow: heroEyebrow,
      title: heroTitle,
      description: heroDescription,
    },
    stats: {
      value: category.statsValue,
      label: category.statsLabel,
    },
    sections: category.sections.map((section, index) => ({
      ...section,
      label: `${index + 1}`.padStart(2, "0"),
    })),
    cta: {
      title: category.ctaTitle,
      description: category.ctaDescription,
      action: category.ctaAction,
      href: CTA_LINKS[slug],
    },
  };
}

function isSlug(value: string): value is Slug {
  return value in SLUG_LABEL_KEYS;
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { t, locale } = await getI18n();
  const { slug } = await params;

  if (!isSlug(slug)) notFound();

  const navLabel = SLUG_LABEL_KEYS[slug](t);
  const page = buildPageCopy(locale, slug, navLabel);
  const backLabel = locale === "zh" ? "返回首页" : "Back to home";
  const isInternalCta = page.cta.href.startsWith("/");
  const isHttpLink = page.cta.href.startsWith("http");
  const buttonClasses =
    "inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:scale-[1.01]";

  const CTAButton = isInternalCta ? (
    <Link href={page.cta.href} className={buttonClasses}>
      <span className="inline-flex items-center gap-2">
        {page.cta.action}
        <span aria-hidden="true">-&gt;</span>
      </span>
    </Link>
  ) : (
    <a
      href={page.cta.href}
      className={buttonClasses}
      target={isHttpLink ? "_blank" : undefined}
      rel={isHttpLink ? "noreferrer" : undefined}
    >
      <span className="inline-flex items-center gap-2">
        {page.cta.action}
        <span aria-hidden="true">-&gt;</span>
      </span>
    </a>
  );

  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/80 px-6 py-12 shadow-[0_45px_160px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 md:px-16">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_top,_rgba(96,165,250,0.4),transparent_65%)]"
            aria-hidden="true"
          />
          <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            {page.hero.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 dark:text-white md:text-5xl">
            {page.hero.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-200">
            {page.hero.description}
          </p>
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            {navLabel}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200/60 bg-white/90 px-6 py-6 shadow-xl shadow-slate-200/80 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                {page.stats.label}
              </p>
              <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
                {page.stats.value}
              </p>
            </div>
            <div className="rounded-[28px] border border-slate-200/60 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-6 py-6 text-white shadow-2xl dark:border-white/10">
              <h2 className="text-xl font-semibold">{page.cta.title}</h2>
              <p className="mt-3 text-sm text-slate-200">{page.cta.description}</p>
              <div className="mt-5">{CTAButton}</div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="relative overflow-hidden rounded-[28px] border border-slate-200/60 bg-white/90 p-6 text-left shadow-lg shadow-slate-200/70 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                  {section.label}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
            >
              {backLabel}
              <span aria-hidden="true">↺</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
