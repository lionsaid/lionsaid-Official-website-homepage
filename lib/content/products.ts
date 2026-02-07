export type ProductSlug = "moji" | "zhiliao";

export type ProductContent = {
  slug: ProductSlug;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  showcase: string[];
};

export const products: Record<"en" | "zh", Record<ProductSlug, ProductContent>> = {
  en: {
    moji: {
      slug: "moji",
      label: "Moji",
      title: "Moji — a quiet writing studio",
      subtitle: "Record the fleeting. Shape the lasting.",
      description:
        "Moji is a minimalist writing environment built for focus. It treats typography, spacing, and rhythm as first-class features so every entry feels intentional.",
      highlights: [
        "Distraction-free editor with typographic controls",
        "Day/Night modes tuned for long sessions",
        "Export-ready layouts for sharing",
      ],
      showcase: [
        "Ink-like rendering for long-form notes",
        "Block-based structure without visible blocks",
        "Quick capture from mobile to desktop",
      ],
    },
    zhiliao: {
      slug: "zhiliao",
      label: "Zhiliao Cards",
      title: "Zhiliao Cards — internalize what you learn",
      subtitle: "Spaced repetition, visualized.",
      description:
        "Zhiliao Cards transforms review into a visible memory curve, combining the SM-2 algorithm with AI assistance to keep knowledge fresh.",
      highlights: [
        "SM-2 spaced repetition engine",
        "Smart card queues with adaptive difficulty",
        "Progress analytics that reward consistency",
      ],
      showcase: [
        "Swipe-based review flow",
        "Card templates for different learning styles",
        "Knowledge graph views",
      ],
    },
  },
  zh: {
    moji: {
      slug: "moji",
      label: "墨迹",
      title: "墨迹 — 安静的写作工作室",
      subtitle: "记录稍纵即逝，沉淀长久价值。",
      description:
        "墨迹是一款为专注而设计的写作环境。它把排版、间距与节奏当作核心能力，让每一篇记录都更有温度。",
      highlights: [
        "无干扰编辑器与精细排版控制",
        "日夜模式针对长时间书写优化",
        "可分享的排版输出",
      ],
      showcase: [
        "墨迹般的渲染与长文体验",
        "隐式分区的结构化写作",
        "移动端到桌面的快速记录",
      ],
    },
    zhiliao: {
      slug: "zhiliao",
      label: "知了卡片",
      title: "知了卡片 — 把学习变成内化",
      subtitle: "间隔重复，变成可见曲线。",
      description:
        "知了卡片结合 SM-2 间隔重复算法与 AI，帮助你以可视化的记忆曲线持续复习。",
      highlights: [
        "SM-2 间隔重复引擎",
        "自适应难度的卡片队列",
        "可量化的学习进度",
      ],
      showcase: [
        "左右滑动的复习流程",
        "多样化卡片模板",
        "知识图谱视角",
      ],
    },
  },
};

export const productSlugs: ProductSlug[] = ["moji", "zhiliao"];
