import type { Locale } from "./locales";

export const messages: Record<
  Locale,
  {
    header: {
      login: string;
      register: string;
      console: string;
      logout: string;
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
      blogPosts: Array<{ title: string; subtitle: string }>;
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
    hero: {
      badge: string;
      titleLine1: string;
      titleLine2: string;
      description: string;
      livePreviewLabel: string;
      startFreeTrial: string;
      learnMore: string;
      statLabel: string;
      statValue: string;
      codeDomain: string;
      codeLogin: string;
      codeRegistry: string;
      codeScope: string;
      codeLoggedIn: string;
      codePublish: string;
      codePublished: string;
      highlightTitle: string;
      highlightDescription: string;
    };
    featuresPlanet: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    businessCategories: {
      eyebrow: string;
      title: string;
      description: string;
      metricLabel: string;
      metricValue: string;
    };
    cta: {
      title: string;
      subtitle: string;
      startFreeTrial: string;
    };
    largeTestimonial: {
      quotePrefix: string;
      quoteEmphasis: string;
      quoteSuffix: string;
      person: string;
      role: string;
    };
    footer: {
      copyright: string;
      product: string;
      company: string;
      resources: string;
      social: string;
      productLinks: {
        features: string;
        integrations: string;
        pricing: string;
        changelog: string;
        method: string;
        console: string;
      };
      companyLinks: {
        about: string;
        diversity: string;
        blog: string;
        careers: string;
        financials: string;
      };
      resourceLinks: {
        community: string;
        terms: string;
        vulnerability: string;
      };
    };
    auth: {
      signInTitle: string;
      signUpTitle: string;
      resetPasswordTitle: string;
      email: string;
      password: string;
      fullName: string;
      phone: string;
      signInButton: string;
      registerButton: string;
      noAccount: string;
      haveAccount: string;
      signUpLink: string;
      signInLink: string;
      forgotPassword: string;
      or: string;
      continueWithGithub: string;
      tosPrefix: string;
      termsOfService: string;
      tosMiddle: string;
      privacyPolicy: string;
      tosSuffix: string;
      resetPasswordButton: string;
    };
    banner: {
      download: string;
      onGithub: string;
      or: string;
      checkPremium: string;
      close: string;
    };
    ui: {
      language: string;
      theme: string;
      themeLight: string;
      themeDark: string;
      themeSystem: string;
    };
    console: {
      nav: {
        overview: string;
        users: string;
        roles: string;
        policies: string;
        audit: string;
        authorities: string;
        menus: string;
        organizations: string;
        api: string;
      };
    };
  }
> = {
  en: {
    header: {
      login: "Login",
      register: "Register",
      console: "Console",
      logout: "Logout",
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
          title: "Delivering 120Hz animation in Flutter",
          subtitle: "The key is timing across scheduling and composition.",
        },
        {
          title: "PostgreSQL optimization behind Zhiliao Cards",
          subtitle: "Compressing memory curves into millisecond queries.",
        },
        {
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
    hero: {
      badge: "Now shipping · lionsaid.com",
      titleLine1: "Design living brands with",
      titleLine2: "Lionsaid (狮语)",
      description:
        "Lionsaid is the AI-native experience OS for teams who need to ideate, design, localize, and launch premium websites across regions in days instead of months.",
      livePreviewLabel: "Live CLI preview",
      startFreeTrial: "Get early access",
      learnMore: "View platform demo",
      statLabel: "Creative & growth teams scaling on Lionsaid",
      statValue: "4,200+ creators",
      codeDomain: "lionsaid.com",
      codeLogin: "lionsaid login",
      codeRegistry: "--registry=https://packages.lionsaid.com",
      codeScope: "--scope=@lionsaid",
      codeLoggedIn: "Connected to 狮语 Cloud.",
      codePublish: "lionsaid deploy",
      codePublished: "Experience shipped.",
      highlightTitle: "Context-aware canvas",
      highlightDescription:
        "Brief, write, localize, and ship surfaces with AI copilots that understand your rituals, tone, and component system.",
    },
    featuresPlanet: {
      title: "Why teams choose Lionsaid",
      subtitle:
        "Lionsaid blends premium visuals with AI orchestration so marketing, product, and engineering move together like a studio.",
      items: [
        {
          title: "Adaptive Storylines",
          description:
            "Compose personalized sections for each buyer journey, then let our copilots adapt copy, CTAs, and visuals per region.",
        },
        {
          title: "Localized Systems",
          description:
            "Translate once, localize forever. Sync product terms, currencies, and compliance gates across 30+ locales automatically.",
        },
        {
          title: "SEO & Insights",
          description:
            "Preview Core Web Vitals, on-page semantics, and search demand as you build so every release is optimized before launch.",
        },
        {
          title: "Code & Canvas",
          description:
            "Designers work on a tactile canvas while developers pull production-ready React blocks synced to your component library.",
        },
        {
          title: "Signal Routing",
          description:
            "Route leads, trials, and intents into your CRM or CDP with a single rule engine that anyone on the team can understand.",
        },
        {
          title: "Brand Memory",
          description:
            "Every page learns from previous launches, campaign notes, and performance, so improvements compound release after release.",
        },
      ],
    },
    businessCategories: {
      eyebrow: "lionsaid.com/clients",
      title: "Trusted by ambitious brands across Asia-Pacific",
      description:
        "From AI-native startups to listed enterprises, 狮语 (Lionsaid) helps teams narrate their story with cinematic polish.",
      metricLabel: "Experience kits shipped this month",
      metricValue: "268 launches",
    },
    cta: {
      title: "Bring your lionsaid.com narrative to life",
      subtitle:
        "Ship a premium, localized, and measurable web experience with the 狮语 team standing beside your own.",
      startFreeTrial: "Book a strategy session",
    },
    largeTestimonial: {
      quotePrefix:
        "“Lionsaid finally gives our product, brand, and regional teams",
      quoteEmphasis: "one beautiful source of truth",
      quoteSuffix:
        " for every launch. Copy, layouts, data, and QA live together so we move twice as fast.”",
      person: "Lena Wu",
      role: "Head of Brand, Polaris Labs",
    },
    footer: {
      copyright:
        "© Lionsaid.com · 狮语. All rights reserved. Designed in Shanghai and Singapore.",
      product: "Platform",
      company: "Company",
      resources: "Resources",
      social: "Social",
      productLinks: {
        features: "Features",
        integrations: "Connectors",
        pricing: "Plans & billing",
        changelog: "Release notes",
        method: "BrandOS method",
        console: "Admin console",
      },
      companyLinks: {
        about: "About Lionsaid",
        diversity: "Culture & values",
        blog: "Journal",
        careers: "Careers",
        financials: "Press & financials",
      },
      resourceLinks: {
        community: "Community",
        terms: "Terms of service",
        vulnerability: "Trust & security",
      },
    },
    auth: {
      signInTitle: "Sign in to Lionsaid",
      signUpTitle: "Create your Lionsaid account",
      resetPasswordTitle: "Reset your Lionsaid password",
      email: "Email",
      password: "Password",
      fullName: "Full name",
      phone: "Phone",
      signInButton: "Sign in",
      registerButton: "Create account",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      signUpLink: "Create one",
      signInLink: "Sign in",
      forgotPassword: "Forgot password?",
      or: "Or",
      continueWithGithub: "Continue with GitHub",
      tosPrefix: "By signing up, you agree to the ",
      termsOfService: "Lionsaid Terms of Service",
      tosMiddle: " and ",
      privacyPolicy: "Privacy Policy",
      tosSuffix: ".",
      resetPasswordButton: "Send reset link",
    },
    banner: {
      download: "Visit",
      onGithub: " lionsaid.com",
      or: "or",
      checkPremium: "Book a walkthrough",
      close: "Close",
    },
    ui: {
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
    },
    console: {
      nav: {
        overview: "Overview",
        users: "Users",
        roles: "Roles",
        policies: "Policies",
        audit: "Audit log",
        authorities: "Authorities",
        menus: "Menus",
        organizations: "Organizations",
        api: "API docs",
      },
    },
  },
  zh: {
    header: {
      login: "登录",
      register: "注册",
      console: "控制台",
      logout: "退出",
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
          title: "如何在 Flutter 中实现丝滑的 120Hz 动画",
          subtitle: "120Hz 的关键是调度与合成管线的配合。",
        },
        {
          title: "知了卡片背后的 PostgreSQL 优化实践",
          subtitle: "把记忆曲线压缩成毫秒级的查询。",
        },
        {
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
    hero: {
      badge: "上线啦 · lionsaid.com",
      titleLine1: "用狮语（Lionsaid）",
      titleLine2: "打造品牌体验 OS",
      description:
        "狮语（Lionsaid）是一款面向品牌与产品团队的 AI 体验操作系统，让网站策划、设计、文案、本地化与上线同步进行。",
      livePreviewLabel: "CLI 实时预览",
      startFreeTrial: "申请体验",
      learnMore: "观看平台演示",
      statLabel: "已在狮语协同的品牌与业务团队",
      statValue: "4,200+ 名创作者",
      codeDomain: "lionsaid.com",
      codeLogin: "lionsaid login",
      codeRegistry: "--registry=https://packages.lionsaid.com",
      codeScope: "--scope=@lionsaid",
      codeLoggedIn: "已连接狮语云。",
      codePublish: "lionsaid deploy",
      codePublished: "体验上线完成。",
      highlightTitle: "语境驱动的协作画布",
      highlightDescription:
        "将简报、文案、组件、代码与洞察汇聚在同一画布，AI 会根据品牌语调自动给出协同建议。",
    },
    featuresPlanet: {
      title: "团队为何选择狮语",
      subtitle: "狮语将高级视觉语言与 AI 协作结合，让市场、产品、设计与工程像同一个工作室。",
      items: [
        {
          title: "自适应故事线",
          description:
            "根据不同客户旅程生成专属区块，文案、色调与 CTA 会按区域与角色自动调整。",
        },
        {
          title: "一键本地化系统",
          description:
            "配置一次，持续复用。术语、汇率、合规提示与排期会同步到 30+ 语言版本。",
        },
        {
          title: "SEO 与洞察",
          description:
            "实时预览网页语义、Core Web Vitals 与搜索需求，在上线前完成优化。",
        },
        {
          title: "代码与画布同频",
          description:
            "设计师在画布中创作，工程师直接获取与组件库同步的 React 模块，版本永不背离。",
        },
        {
          title: "信号路由",
          description:
            "用统一的可视化规则，将线索、试用与意向流入 CRM 或 CDP，市场同学也能配置。",
        },
        {
          title: "品牌记忆",
          description:
            "每次发布都会学习过往活动与数据洞察，让内容质量在持续复用中迭代升级。",
        },
      ],
    },
    businessCategories: {
      eyebrow: "lionsaid.com/clients",
      title: "服务泛亚太的高速与上市品牌",
      description: "从 AI 新创到跨国集团，狮语帮助团队以电影级质感讲述品牌故事。",
      metricLabel: "本月交付的体验套件",
      metricValue: "268 场上线",
    },
    cta: {
      title: "与狮语一起，打造 lionsaid.com 式体验",
      subtitle: "我们提供策划、设计、文案、本地化与工程团队，与你的业务同频共创。",
      startFreeTrial: "预约策略工作坊",
    },
    largeTestimonial: {
      quotePrefix:
        "“狮语让我们在一套系统内完成简报、创作与复盘，真正建立起",
      quoteEmphasis: "跨团队共享的品牌记忆",
      quoteSuffix: "，上线节奏翻倍提升。”",
      person: "Lena Wu",
      role: "Polaris Labs 品牌负责人",
    },
    footer: {
      copyright:
        "© Lionsaid.com · 狮语。保留所有权利，设计团队来自上海与新加坡。",
      product: "平台",
      company: "公司",
      resources: "资源",
      social: "社交",
      productLinks: {
        features: "核心能力",
        integrations: "系统连接",
        pricing: "套餐与计费",
        changelog: "版本更新",
        method: "BrandOS 方法论",
        console: "管理后台",
      },
      companyLinks: {
        about: "关于狮语",
        diversity: "文化与价值观",
        blog: "洞察专栏",
        careers: "加入我们",
        financials: "新闻与财务",
      },
      resourceLinks: {
        community: "社区",
        terms: "服务条款",
        vulnerability: "信任与安全",
      },
    },
    auth: {
      signInTitle: "登录狮语账号",
      signUpTitle: "注册狮语账号",
      resetPasswordTitle: "重置狮语密码",
      email: "邮箱",
      password: "密码",
      fullName: "姓名",
      phone: "电话",
      signInButton: "登录",
      registerButton: "创建账号",
      noAccount: "还没有账号？",
      haveAccount: "已有账号？",
      signUpLink: "去注册",
      signInLink: "去登录",
      forgotPassword: "忘记密码？",
      or: "或",
      continueWithGithub: "使用 GitHub 登录",
      tosPrefix: "注册即表示你同意 ",
      termsOfService: "狮语服务条款",
      tosMiddle: " 和 ",
      privacyPolicy: "隐私政策",
      tosSuffix: "。",
      resetPasswordButton: "发送重置链接",
    },
    banner: {
      download: "访问",
      onGithub: " lionsaid.com",
      or: "或",
      checkPremium: "预约演示",
      close: "关闭",
    },
    ui: {
      language: "语言",
      theme: "主题",
      themeLight: "浅色",
      themeDark: "深色",
      themeSystem: "跟随系统",
    },
    console: {
      nav: {
        overview: "概览",
        users: "用户管理",
        roles: "角色管理",
        policies: "权限策略",
        audit: "审计日志",
        authorities: "权限管理",
        menus: "菜单管理",
        organizations: "组织管理",
        api: "API 文档",
      },
    },
  },
};
