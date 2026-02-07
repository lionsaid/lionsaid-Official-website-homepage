import type { Locale } from "./locales";

type BlogPost = { slug: string; title: string; subtitle: string };

type Messages = {
  header: {
    brand: string;
    navProducts: string;
    navEngineering: string;
    navAbout: string;
    appStore: string;
  };
  home: {
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
    blogPosts: BlogPost[];
    aboutLabel: string;
    aboutTitleLine1: string;
    aboutTitleLine2: string;
    aboutDescription: string;
    aboutAdvantageLabel: string;
    aboutAdvantageItems: string[];
  };
    pages: {
      about: {
        eyebrow: string;
        title: string;
        description: string;
        craftsTitle: string;
        craftsHeadline: string;
        craftsBody: string;
        craftsToolsLabel: string;
        craftsTools: string[];
        studioTitle: string;
        studioBody: string;
        valuesTitle: string;
      values: Array<{ title: string; description: string }>;
      timelineTitle: string;
      timeline: Array<{ year: string; title: string; description: string }>;
    };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
      channelsTitle: string;
      channels: Array<{ label: string; value: string; hint: string }>;
      visitTitle: string;
      visitBody: string;
      formTitle: string;
      formNote: string;
    };
    careers: {
      eyebrow: string;
      title: string;
      description: string;
      rolesTitle: string;
      roles: Array<{ title: string; location: string; description: string }>;
      cultureTitle: string;
      culture: string[];
      ctaTitle: string;
      ctaBody: string;
    };
  };
  ui: {
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
  };
  legal: {
    terms: string;
    privacy: string;
  };
};

export const messages: Record<Locale, Messages> = {
  en: {
    header: {
      brand: "Lionsaid (狮语)",
      navProducts: "Products",
      navEngineering: "Engineering",
      navAbout: "About",
      appStore: "App Store",
    },
    home: {
      badge: "Digital Crafts · Record & Internalize",
      titleLine1: "Thinking in Code,",
      titleLine2: "Designing for Mind.",
      description:
        "We build refined iOS & Android apps to help you record life and internalize knowledge. This is the Lionsaid showroom for digital craftsmen.",
      ctaPrimary: "Explore products",
      ctaSecondary: "Engineering",
      mojiLabel: "Moji · Record",
      mojiTitleLine1: "Capture fleeting inspiration.",
      mojiTitleLine2: "A distraction-free writing space.",
      mojiDescription:
        "Moji is a pure recording canvas. Precise typography and airy rhythm make every note feel like ink on paper.",
      mojiSwitchLabel: "Theme switch",
      mojiDay: "Day",
      mojiNight: "Night",
      mojiEditorLabel: "Moji Editor",
      mojiEditorTitle: "Recording is the beginning of internalization.",
      mojiEditorSubtitle: "The quietest interface. The richest typography.",
      mojiEditorBody:
        "Writing should not be interrupted. Moji lets thoughts flow with the page — every line becomes a breath.",
      zhiliaoLabel: "Zhiliao · Internalize",
      zhiliaoTitleLine1: "A tool against forgetting.",
      zhiliaoTitleLine2: "Let knowledge become yours.",
      zhiliaoDescription:
        "Powered by spaced repetition and AI, Zhiliao Cards turns review into a visible learning curve.",
      zhiliaoPoweredBy: "Powered by SM-2 Algorithm & AI.",
      zhiliaoSwipeLabel: "Swipe Review",
      zhiliaoMemoryLabel: "Memory curve · Adaptive difficulty",
      zhiliaoCardTitle: "What is spaced repetition?",
      zhiliaoCardHint: "Swipe to reveal",
      zhiliaoRetention: "+12% retention",
      engineeringLabel: "Under the Hood",
      engineeringTitle: "Under the Hood",
      engineeringDescription: "We publish engineering practice and system details to earn developer trust.",
      engineeringReadMore: "Read more",
      blogPosts: [
        {
          slug: "flutter-120hz",
          title: "Delivering 120Hz animation in Flutter",
          subtitle: "The key is timing across scheduling and composition.",
        },
        {
          slug: "zhiliao-postgres",
          title: "PostgreSQL optimization behind Zhiliao Cards",
          subtitle: "Compressing memory curves into millisecond queries.",
        },
        {
          slug: "local-first",
          title: "Local-First architecture: why we insist on locality",
          subtitle: "Offline-ready, without compromising trust.",
        },
      ],
      aboutLabel: "Lionsaid Studio",
      aboutTitleLine1: "Technology and design,",
      aboutTitleLine2: "built into one product matrix.",
      aboutDescription:
        "We believe the loop of record & internalize changes how people learn and think. Strong engineering supports restrained design.",
      aboutAdvantageLabel: "Team Advantage",
      aboutAdvantageItems: [
        "Consistent iOS / Android experiences",
        "Algorithm-driven learning and memory modeling",
        "Minimal interfaces + high-performance architecture",
      ],
    },
    pages: {
      about: {
        eyebrow: "Lionsaid · Studio",
        title: "Designing tools that help people think.",
        description:
          "Lionsaid (狮语) is a product studio for digital craftsmen. We pair engineering rigor with design restraint to build tools for recording and internalizing knowledge.",
        craftsTitle: "The Digital Craftsmen",
        craftsHeadline: "Code is our brush, the screen is our canvas.",
        craftsBody:
          "We are Lionsaid, an independent studio of developers and designers. In an age of noise, we build quiet tools. From every Moji stroke to every Zhiliao recall, we craft software that stays warm and lasting. We don’t chase explosive DAU; we care about elegant code and precise pixels. Good software should feel like a trusted tool—better every day.",
        craftsToolsLabel: "Toolbox",
        craftsTools: ["Flutter", "PostgreSQL", "Figma", "Next.js", "Spring"],
        studioTitle: "Two products, one loop",
        studioBody:
          "Moji captures the fleeting. Zhiliao Cards turns recall into ownership. Together they form a closed loop that makes learning tangible.",
        valuesTitle: "What we believe",
        values: [
          { title: "Quiet UX", description: "Interfaces that disappear when focus matters most." },
          { title: "Systems thinking", description: "Every feature ships with a clear mental model." },
          { title: "Craft over noise", description: "Deliberate typography, spacing, and motion." },
        ],
        timelineTitle: "Studio timeline",
        timeline: [
          { year: "2022", title: "Studio founded", description: "Started as a two-person craft lab." },
          { year: "2023", title: "Moji shipped", description: "A minimal writing experience for focused notes." },
          { year: "2024", title: "Zhiliao Cards", description: "Spaced repetition, visualized." },
        ],
      },
      contact: {
        eyebrow: "Lionsaid · Contact",
        title: "Let’s build something precise.",
        description:
          "Whether you need product collaboration, media inquiries, or partnerships, our team replies quickly with clear next steps.",
        channelsTitle: "Channels",
        channels: [
          { label: "General", value: "hello@lionsaid.com", hint: "Product & partnerships" },
          { label: "Press", value: "press@lionsaid.com", hint: "Media & interviews" },
          { label: "Careers", value: "people@lionsaid.com", hint: "Join the team" },
        ],
        visitTitle: "Visit",
        visitBody: "Remote-first across Asia. Studio hubs in Shanghai and Singapore.",
        formTitle: "Send a brief",
        formNote: "Include timeline, scope, and desired outcomes for the fastest response.",
      },
      careers: {
        eyebrow: "Lionsaid · Careers",
        title: "Join the digital craftsmen.",
        description:
          "We are a small, senior team building tools for thought. If you care about craft, typography, and engineering discipline, you will fit right in.",
        rolesTitle: "Open roles",
        roles: [
          {
            title: "Product Designer",
            location: "Remote · Asia",
            description: "Own visual systems and high-fidelity interaction prototypes.",
          },
          {
            title: "Frontend Engineer",
            location: "Remote · Asia",
            description: "Build fast, refined interfaces with motion and precision.",
          },
          {
            title: "iOS Engineer",
            location: "Remote · Asia",
            description: "Craft native experiences for Moji and Zhiliao Cards.",
          },
        ],
        cultureTitle: "How we work",
        culture: [
          "Weekly craft reviews and code critiques",
          "Dual-track design + engineering planning",
          "Deep work windows, minimal meetings",
        ],
        ctaTitle: "Ready to build?",
        ctaBody: "Send a short intro and links to your work.",
      },
    },
    ui: {
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
    },
    legal: {
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
  },
  zh: {
    header: {
      brand: "Lionsaid 狮语",
      navProducts: "产品",
      navEngineering: "工程",
      navAbout: "关于",
      appStore: "App Store",
    },
    home: {
      badge: "数字工匠 · Record & Internalize",
      titleLine1: "Thinking in Code,",
      titleLine2: "Designing for Mind.",
      description:
        "我们打造 iOS & Android 应用，帮助你记录生活、内化知识。这里是 Lionsaid 狮语的数字工匠展示橱窗。",
      ctaPrimary: "浏览产品",
      ctaSecondary: "工程实践",
      mojiLabel: "墨迹 · Record",
      mojiTitleLine1: "捕捉稍纵即逝的灵感。",
      mojiTitleLine2: "无干扰的写作体验。",
      mojiDescription:
        "墨迹是一个纯粹的记录空间。专注排版、字距与呼吸感，让每一次记录都像在宣纸上落笔。",
      mojiSwitchLabel: "主题切换",
      mojiDay: "日间",
      mojiNight: "夜间",
      mojiEditorLabel: "Moji Editor",
      mojiEditorTitle: "记录是一种内化的开始。",
      mojiEditorSubtitle: "The quietest interface. The richest typography.",
      mojiEditorBody:
        "我们相信写作不该被打扰。墨迹让思绪顺着版面自然流动，每一行文字都是呼吸的节拍。",
      zhiliaoLabel: "知了卡片 · Internalize",
      zhiliaoTitleLine1: "抵抗遗忘的工具。",
      zhiliaoTitleLine2: "让知识真正属于你。",
      zhiliaoDescription:
        "基于间隔重复算法与 AI 引擎，知了卡片把复习变成一条可视化的学习曲线。",
      zhiliaoPoweredBy: "Powered by SM-2 Algorithm & AI.",
      zhiliaoSwipeLabel: "Swipe Review",
      zhiliaoMemoryLabel: "Memory curve · Adaptive difficulty",
      zhiliaoCardTitle: "What is spaced repetition?",
      zhiliaoCardHint: "Swipe to reveal",
      zhiliaoRetention: "+12% retention",
      engineeringLabel: "Under the Hood",
      engineeringTitle: "引擎盖之下",
      engineeringDescription: "我们公开工程实践与系统细节，构建开发者信任。",
      engineeringReadMore: "阅读全文",
      blogPosts: [
        {
          slug: "flutter-120hz",
          title: "如何在 Flutter 中实现丝滑的 120Hz 动画",
          subtitle: "120Hz 的关键是调度与合成管线的配合。",
        },
        {
          slug: "zhiliao-postgres",
          title: "知了卡片背后的 PostgreSQL 优化实践",
          subtitle: "把记忆曲线压缩成毫秒级的查询。",
        },
        {
          slug: "local-first",
          title: "Local-First 架构：为什么我们坚持数据本地化",
          subtitle: "断网可用，不妥协用户信任。",
        },
      ],
      aboutLabel: "Lionsaid Studio",
      aboutTitleLine1: "技术与设计，",
      aboutTitleLine2: "共同构建的产品矩阵。",
      aboutDescription:
        "我们相信“记录与内化”的闭环能改变学习与思考的方式。用更强的工程能力，兑现更克制的设计。",
      aboutAdvantageLabel: "Team Advantage",
      aboutAdvantageItems: [
        "iOS / Android 双端体验一致性设计",
        "算法驱动的学习与记忆建模",
        "极简界面 + 高性能架构",
      ],
    },
    pages: {
      about: {
        eyebrow: "狮语 · 工作室",
        title: "为思考打造的工具。",
        description:
          "Lionsaid（狮语）是一家数字工匠产品工作室。我们以工程严谨与克制设计并行，构建记录与内化的工具。",
        craftsTitle: "工匠型团队 (The Digital Craftsmen)",
        craftsHeadline: "代码是我们的画笔，屏幕是我们的画布。",
        craftsBody:
          "我们是 Lionsaid 狮语，一个由开发者和设计师组成的独立工作室。在信息爆炸的时代，我们拒绝制造噪音。我们相信工具应该是安静的、克制的。从“墨迹”的每一次落笔，到“知了卡片”的每一次记忆唤醒，我们致力于构建“长久且有温度”的软件。我们不追求日活的爆发式增长，更在意每一行代码的优雅与每一个像素的精准。好的软件应该像一把趁手的老工具，越用越顺手。",
        craftsToolsLabel: "武器库",
        craftsTools: ["Flutter", "PostgreSQL", "Figma", "Next.js", "Spring"],
        studioTitle: "两款产品，一个闭环",
        studioBody:
          "墨迹捕捉稍纵即逝的灵感，知了卡片把记忆变成能力。输入与输出形成闭环，让学习更可感。",
        valuesTitle: "我们的信念",
        values: [
          { title: "安静的体验", description: "界面在需要专注时隐去存在感。" },
          { title: "系统化思维", description: "每个功能都有清晰的心智模型。" },
          { title: "克制的工艺", description: "字体、留白与动效都经过推敲。" },
        ],
        timelineTitle: "发展历程",
        timeline: [
          { year: "2022", title: "工作室成立", description: "从两人的工艺实验室出发。" },
          { year: "2023", title: "墨迹发布", description: "专注写作的极简记录体验。" },
          { year: "2024", title: "知了卡片", description: "用间隔重复可视化记忆。" },
        ],
      },
      contact: {
        eyebrow: "狮语 · 联系",
        title: "让我们一起打磨更准确的产品。",
        description: "无论是产品合作、媒体沟通还是伙伴关系，我们都会快速回应并给出清晰下一步。",
        channelsTitle: "联系渠道",
        channels: [
          { label: "通用", value: "hello@lionsaid.com", hint: "产品与合作" },
          { label: "媒体", value: "press@lionsaid.com", hint: "采访与报道" },
          { label: "加入我们", value: "people@lionsaid.com", hint: "岗位与团队" },
        ],
        visitTitle: "办公方式",
        visitBody: "团队远程协作，上海与新加坡设有工作室。",
        formTitle: "提交需求简报",
        formNote: "建议包含时间规划、范围与预期目标，以便快速评估。",
      },
      careers: {
        eyebrow: "狮语 · 加入我们",
        title: "成为数字工匠的一员。",
        description: "我们是一支小而资深的团队，致力于为思考打造工具。如果你热爱工艺与工程秩序，欢迎加入。",
        rolesTitle: "开放岗位",
        roles: [
          { title: "产品设计师", location: "远程 · 亚洲", description: "负责视觉系统与高保真交互原型。" },
          { title: "前端工程师", location: "远程 · 亚洲", description: "构建高性能、细腻的界面体验。" },
          { title: "iOS 工程师", location: "远程 · 亚洲", description: "打造墨迹与知了卡片的原生体验。" },
        ],
        cultureTitle: "工作方式",
        culture: [
          "每周设计与代码评审",
          "设计与工程双轨规划",
          "深度工作时间，减少会议",
        ],
        ctaTitle: "准备好了？",
        ctaBody: "发送简短介绍与作品链接。",
      },
    },
    ui: {
      language: "语言",
      theme: "主题",
      themeLight: "浅色",
      themeDark: "深色",
      themeSystem: "跟随系统",
    },
    legal: {
      terms: "服务条款",
      privacy: "隐私政策",
    },
  },
};
