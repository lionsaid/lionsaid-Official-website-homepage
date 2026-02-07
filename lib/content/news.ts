export type NewsSlug = "flutter-120hz" | "zhiliao-postgres" | "local-first";

export type NewsContent = {
  slug: NewsSlug;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  sections: Array<{ heading: string; body: string }>;
  mdPath?: string;
};

export const news: Record<"en" | "zh", NewsContent[]> = {
  en: [
    {
      slug: "flutter-120hz",
      title: "Delivering 120Hz animation in Flutter",
      summary: "Tuning scheduling, rasterization, and input to hit 120Hz on real devices.",
      date: "2026-02-07",
      tags: ["Flutter", "Performance"],
      mdPath: "content/news/flutter-120hz.en.md",
      sections: [
        {
          heading: "Why 120Hz matters",
          body: "High-refresh experiences demand consistent frame pacing. We measure input, layout, and raster work separately to spot spikes.",
        },
        {
          heading: "Pipeline fixes",
          body: "We reduced overdraw, simplified compositing layers, and moved heavy work off the UI thread.",
        },
        {
          heading: "Results",
          body: "The app sustains 120Hz on ProMotion devices while staying under the thermal budget.",
        },
      ],
    },
    {
      slug: "zhiliao-postgres",
      title: "PostgreSQL optimization behind Zhiliao Cards",
      summary: "Compressing memory curves into millisecond queries with smarter indexes.",
      date: "2026-02-03",
      tags: ["PostgreSQL", "Data"],
      sections: [
        {
          heading: "The bottleneck",
          body: "Review queues require sorting by spaced-repetition schedules at scale. Naive queries create latency spikes.",
        },
        {
          heading: "The fix",
          body: "We introduced composite indexes, reduced query fan-out, and batched due-card calculations.",
        },
        {
          heading: "Outcome",
          body: "Median fetch latency dropped below 12ms under peak load.",
        },
      ],
    },
    {
      slug: "local-first",
      title: "Local-First architecture: why we insist on locality",
      summary: "Offline-first sync that keeps data trustworthy and fast.",
      date: "2026-01-28",
      tags: ["Architecture", "Local-first"],
      sections: [
        {
          heading: "The principle",
          body: "Local-first means the device is source of truth; sync is additive, not blocking.",
        },
        {
          heading: "Sync design",
          body: "We use CRDT-style merges for notes and review stats, so edits reconcile deterministically.",
        },
        {
          heading: "Why it matters",
          body: "Users can learn anywhere without waiting for servers or sacrificing privacy.",
        },
      ],
    },
  ],
  zh: [
    {
      slug: "flutter-120hz",
      title: "如何在 Flutter 中实现丝滑的 120Hz 动画",
      summary: "从调度、栅格化到输入响应，定位 120Hz 的关键瓶颈。",
      date: "2026-02-07",
      tags: ["Flutter", "性能"],
      mdPath: "content/news/flutter-120hz.zh.md",
      sections: [
        {
          heading: "为什么 120Hz 重要",
          body: "高刷新体验依赖稳定的帧节奏。我们拆解输入、布局与渲染耗时来定位抖动来源。",
        },
        {
          heading: "管线优化",
          body: "减少过度绘制、精简合成层，并把重任务转移出 UI 线程。",
        },
        {
          heading: "结果",
          body: "在 ProMotion 设备上稳定达到 120Hz，同时控制住温度与功耗。",
        },
      ],
    },
    {
      slug: "zhiliao-postgres",
      title: "知了卡片背后的 PostgreSQL 优化实践",
      summary: "把记忆曲线压缩成毫秒级查询。",
      date: "2026-02-03",
      tags: ["PostgreSQL", "数据"],
      sections: [
        {
          heading: "瓶颈定位",
          body: "复习队列需要按间隔重复时间排序，规模上来后容易出现延迟峰值。",
        },
        {
          heading: "优化方案",
          body: "引入组合索引、降低查询扇出，并对到期卡片进行批处理。",
        },
        {
          heading: "结果",
          body: "高峰期中位耗时降至 12ms 以内。",
        },
      ],
    },
    {
      slug: "local-first",
      title: "Local-First 架构：为什么我们坚持数据本地化",
      summary: "离线优先的同步设计，让数据更快更可信。",
      date: "2026-01-28",
      tags: ["架构", "Local-first"],
      sections: [
        {
          heading: "核心原则",
          body: "本地为主意味着设备是事实数据源，同步是附加而非阻塞。",
        },
        {
          heading: "同步方案",
          body: "我们使用类似 CRDT 的合并策略，确保笔记与复习统计可确定性合并。",
        },
        {
          heading: "价值",
          body: "用户随时学习，不受网络影响，也更有隐私保障。",
        },
      ],
    },
  ],
};
