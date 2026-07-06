import type {
  AboutSection,
  EducationItem,
  GlobalExperienceItem,
} from '@/types';

// Use const to make it available at runtime
export const LANGUAGES = ['EN', 'DE', 'ZH'] as const;
export type Language = (typeof LANGUAGES)[number];

export interface Translations {
  nav: {
    work: string;
    services: string;
    skills: string;
    impact: string;
    analysis: string;
    projects: string;
    about: string;
    experience: string;
    contact: string;
    blog: string;
    common: {
      downloadResume: string;
      changeLanguage: string;
    };
  };
  hero: {
    location: string;
    locationMobile: string;
    title1: string;
    title2: string;
    title3: string;
    title3Suffix: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  services: {
    capabilities: string;
    subtitle: string;
    titlePart1: string; // "Technical" or "Core"
    titlePart2: string; // "Expertise" (serif italic orange)
    service1Title: string;
    service1Desc: string;
    service2Title: string;
    service2Desc: string;
    service3Title: string;
    service3Desc: string;
  };
  techStack: {
    label: string;
    titlePart1: string; // "Technologies"
    titlePart2: string; // "& Tools" (Italic part)
    subtitle: string;
    categories: {
      frontendArch: string;
      aiBackend: string;
      qaDevops: string;
      growthDesign: string;
    };
  };
  impact: {
    tagline: string; // "PROVEN RESULTS"
    titlePart1: string; // "Impact" (bold sans-serif)
    titlePart2: string; // "Dashboard" (italic serif orange)
    subtitle: string; // "Metrics derived from..." (右上的小字)

    // Metric 1 (左側)
    impact1Value: string; // "50%"
    impact1Title: string; // "Faster Time-to-Market" (商業價值)
    impact1Tag: string; // "AUTOMATED QA PIPELINES" (橘色技術標籤)
    impact1Desc: string; // "Reduced regression testing..." (詳細說明)

    // Metric 2 (中間)
    impact2Value: string; // "30%"
    impact2Title: string; // "Performance Boost"
    impact2Tag: string; // "MODULAR ARCHITECTURE"
    impact2Desc: string;

    // Metric 3 (右側)
    impact3Value: string; // "40%"
    impact3Title: string; // "Conversion Uplift"
    impact3Tag: string; // "DATA-DRIVEN UX STRATEGY"
    impact3Desc: string;
  };
  analysis: {
    title: string;
    subtitle: string;
    analysis1Title: string;
    analysis1Desc: string;
    analysis2Title: string;
    analysis2Desc: string;
  };
  about: {
    tagline: string; // "The Person Behind the Pixels"
    title: string;
    subtitle: string;
    intro: string;
    educationTitle: string;
    globalTitle: string;
    education: EducationItem[];
    global: GlobalExperienceItem[];
  };
  experience: {
    titlePart1: string; // "Professional"
    titlePart2: string; // "Trajectory"
    description: string;
    keyAchievements: string;
    items: Array<{
      id: string;
      role: string;
      company: string;
      period: string;
      description: string;
      achievements: string[];
    }>;
  };
  contact: {
    tagline: string; // "Open to opportunities"
    titlePart1: string; // "Let's build something"
    titlePart2: string; // "that ships."
    subtitle: string;
    startProject: string;
    linkedinProfile: string;
    bookCall: string; // Secondary Calendly link
  };
  footer: {
    copyright: string;
    allRightsReserved: string;
    impressum: string;
    privacyPolicy: string;
    designedWith: string;
  };
  cookieConsent: {
    title: string;
    description: string;
    customize: string;
    rejectAll: string;
    acceptAll: string;
    cookieSettings: string;
    necessaryCookies: string;
    necessaryCookiesDesc: string;
    alwaysActive: string;
    analyticsCookies: string;
    analyticsCookiesDesc: string;
    savePreferences: string;
    cancel: string;
  };
  projectModal: {
    close: string;
    theChallenge: string;
    theSolution: string;
    technicalArchitecture: string;
    keyFeatures: string;
    visualOverview: string;
    liveDemoNote: string;
    contactForDemo: string;
    launchLiveApp: string;
    interestedInStack: string;
    checkOutLiveApp: string;
  };
  projects: {
    label: string; // "Innovation & Impact"
    titlePart1: string; // "Featured"
    titlePart2: string; // "AI & Web Solutions"
    subtitle: string;
    viewCaseStudy: string;
    categories: {
      frontend: string;
      fullstack: string;
      design: string;
    };
    data: Array<{
      id: string;
      title: string;
      description: string;
      problem: string;
      solution: string;
      techDeepDive: string;
      features: string[];
    }>;
  };
  common: {
    downloadResume: string;
    changeLanguage: string;
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    nav: {
      work: 'Work',
      services: 'Services',
      about: 'About',
      experience: 'Experience',
      contact: 'Contact',
      skills: 'Skills',
      impact: 'Impact',
      analysis: 'Analysis',
      projects: 'Projects',
      blog: 'Blog',
      common: {
        downloadResume: 'Download Resume',
        changeLanguage: 'Change Language',
      },
    },
    hero: {
      location:
        'Based in Germany (CET) | Available for Hybrid (Ulm) & Global Remote',
      locationMobile: 'Germany (CET) | Hybrid & Remote',
      title1: 'Senior Frontend Engineer',
      title2: 'Shueny Wang',
      title3: 'AI Solutions',
      title3Suffix: 'Builder',
      subtitle:
        'Frontend architecture that scales. AI features that ship.',
      description:
        'Ten years of React and TypeScript across automotive cybersecurity, B2B SaaS, and e-commerce. Most recently at VicOne (Trend Micro), building security platforms as sole frontend engineer. Now applying that same rigor to LLM products: RAG pipelines, agent workflows, and interfaces people trust.',
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Download Resume',
      scroll: 'Scroll',
    },
    services: {
      capabilities: 'What I Do',
      titlePart1: 'Three Things,',
      titlePart2: 'Done Deeply',
      subtitle:
        'Frontend architecture, AI integration, and the engineering practices that keep both maintainable.',

      // 1. Frontend Architecture at Scale
      service1Title: 'Frontend Architecture at Scale',
      service1Desc:
        'React, Next.js, Vue 3, and Nx monorepos for complex business domains. I design component systems and micro-frontend structures that stay fast and maintainable as teams and codebases grow.',

      // 2. AI Integration That Ships
      service2Title: 'AI Integration That Ships',
      service2Desc:
        'Beyond API calls: RAG pipelines, prompt orchestration, multimodal parsing, and cost-aware model routing. I have built AI features as the sole engineer, from schema design to production deployment.',

      // 3. Engineering Quality & Mentoring
      service3Title: 'Engineering Quality & Mentoring',
      service3Desc:
        'Automated testing (Cypress, Playwright), code review culture, and legacy refactoring. I raise the baseline so quality does not depend on any single person.',
    },
    techStack: {
      label: 'Technical Toolkit',
      titlePart1: 'Technologies',
      titlePart2: '& Tools',
      subtitle:
        'The tools behind the work. Frontend is the core, AI engineering is the edge, and testing is the habit.',
      categories: {
        frontendArch: 'Frontend & Architecture',
        aiBackend: 'AI Engineering & Backend',
        qaDevops: 'QA & DevOps',
        growthDesign: 'Design & Product',
      },
    },
    impact: {
      tagline: 'Proven Results',
      titlePart1: 'Impact',
      titlePart2: 'Dashboard',
      subtitle:
        'Numbers from real production systems at VicOne, Synttro, and Citiesocial, not estimates from side projects.',

      // Metric 1
      impact1Value: '50%',
      impact1Title: 'Faster Time-to-Market',
      impact1Tag: 'AUTOMATED QA PIPELINES',
      impact1Desc:
        'Reduced regression testing cycles via Cypress & TestRail integration.',

      // Metric 2
      impact2Value: '30%',
      impact2Title: 'Performance Boost',
      impact2Tag: 'MODULAR ARCHITECTURE',
      impact2Desc:
        'Improved render speeds and scalability using Next.js & Nx Monorepos.',

      // Metric 3
      impact3Value: '40%',
      impact3Title: 'Conversion Uplift',
      impact3Tag: 'DATA-DRIVEN UX STRATEGY',
      impact3Desc:
        'Optimized e-commerce funnels based on user behavior analytics.',
    },
    analysis: {
      title: 'Technical Analysis',
      subtitle: 'Deep dive into technical implementations',
      analysis1Title: 'Performance Optimization',
      analysis1Desc:
        'Analyzed and optimized critical rendering paths to improve load times.',
      analysis2Title: 'Architecture Review',
      analysis2Desc:
        'Evaluated system architecture and proposed scalability improvements.',
    },
    experience: {
      titlePart1: 'Professional',
      titlePart2: 'Trajectory',
      description:
        'Ten years of frontend engineering across e-commerce, B2B SaaS, and automotive cybersecurity, with three years of design practice before that. I have seen jQuery spaghetti become React ecosystems, and led teams through the migration.',
      keyAchievements: 'Key Achievements',
      items: [
        {
          id: 'exp1',
          role: 'Senior Front-End Engineer',
          company: 'VicOne (Trend Micro)',
          period: 'Sep 2021 - Mar 2025',
          description:
            'Delivering cybersecurity software and services for the automotive industry. Specializing in micro-frontends, AI integration, and automated testing.',
          achievements: [
            'Automated UI end-to-end testing using Cypress and TestRail, reducing QA cycle time by 50%.',
            'Implemented B2B VSOC platform using Nx monorepo, reducing human error rates by 80%.',
            'Built multilingual websites (Next.js/i18n), improving render speed by 30% and SEO.',
            'Integrated Azure OpenAI into Wagtail CMS for auto-parsing source URLs.',
            'Refactored legacy apps into modular micro-frontends using Nx, React, and Vitest.',
          ],
        },
        {
          id: 'exp2',
          role: 'Senior Front-End Engineer',
          company: 'Synttro',
          period: 'May 2020 - Sep 2021',
          description:
            'Developed team collaboration CMS systems for the B2B construction industry.',
          achievements: [
            'Developed a drag-and-drop form builder with React DnD and schema validation.',
            'Built digital signature approval flows with canvas-based sketch input.',
            'Enhanced collaboration efficiency by 60% through a custom B2B system.',
            'Automated E2E tests with Puppeteer achieving over 80% test coverage.',
          ],
        },
        {
          id: 'exp3',
          role: 'Front-End Developer',
          company: 'Citiesocial',
          period: 'May 2018 - Aug 2019',
          description:
            'Online selection shop established by Shopify. Focused on e-commerce optimization.',
          achievements: [
            'Designed Shopify interfaces boosting conversion rates by 10%.',
            'Optimized SEO strategies securing first-page rankings (10% traffic boost).',
            'Reduced activity page launch time from 1 week to 1 day via templates.',
            'Integrated Hotjar and GA/GTM for data-driven UI optimizations.',
          ],
        },
        {
          id: 'exp4',
          role: 'Engineer',
          company: 'MOMO (Fubon Multimedia)',
          period: 'Aug 2016 - Mar 2018',
          description: 'Leading online retail company in Taiwan.',
          achievements: [
            'Refactored desktop and mobile homepage interfaces for accessibility.',
            'Leveraged GA data to personalize search results and suggestions.',
            'Improved SEO rankings to top 3 by optimizing metadata and keywords.',
          ],
        },
        {
          id: 'exp5',
          role: 'Graphic & Web Designer',
          company: 'Skyway Inc. & TUKEEN Inc.',
          period: '2013 - 2016',
          description: 'Design background foundation.',
          achievements: [
            'Maintained websites and optimized UI for SMEs.',
            'Managed photography, branding, and exhibition materials.',
          ],
        },
      ],
    },
    projects: {
      label: 'Innovation & Impact',
      titlePart1: 'Featured',
      titlePart2: 'AI & Web Solutions',
      subtitle:
        'Each project answers the same question: can AI capabilities become features real users rely on? Built end-to-end, from data pipeline to interface.',
      viewCaseStudy: 'View Case Study',
      categories: {
        frontend: 'Frontend',
        fullstack: 'Full Stack',
        design: 'Design',
      },
      data: [
        {
          id: 'p-lucky-duck',
          title: 'Lucky Duck — Rewards Platform MVP',
          description:
            'A mobile-first MVP for a consumer rewards platform, designed and engineered end-to-end. The prototype is structured around measurable growth loops (acquisition, activation, retention) rather than static screens, so every interaction maps to a product hypothesis.',
          problem:
            "The hard part of a rewards product isn't building another marketplace — it's building enough momentum that people come back. A pile of disconnected screens doesn't prove that; it needs a coherent flow where every screen earns the next tap and maps to a real growth loop.",
          solution:
            'I designed a token-based design system (light + dark) and built the full primary happy flow as a working prototype: a mascot-led landing, low-friction signup with instant wallet setup, reward discovery with featured deals and odds, a portfolio of collections, and a confetti celebration moment — shipped on the exact stack the product would launch on.',
          techDeepDive:
            'Built as an Astro static page hosting a React island (mounted client:only to read the live theme with no flash). The interactive demo is a self-contained screen state machine animated with Framer Motion, driven by a single Palette abstraction so light/dark stay in lockstep. No backend coupling — the handoff for payments, credits and the odds engine stays clean.',
          features: [
            'Full clickable happy-flow prototype (5 core screens)',
            'Reusable light/dark design-system tokens',
            'Growth-loop structure: acquisition → activation → engagement → retention',
            'Animated celebration & mascot-led brand moments',
          ],
        },
        {
          id: 'p1',
          title: 'Personal AI German Tutor',
          description:
            'A voice-first language simulator for real-life German, built for my own integration in Germany. Whisper handles speech recognition, Gemini provides context-aware feedback on grammar and pronunciation, and the whole thing runs as a PWA. Textbook German is not street German; this closes that gap.',
          problem:
            "Traditional language apps are too rigid—they teach vocabulary but fail to build conversational confidence. Newcomers to Germany often struggle with the 'Sprechhemmung' (fear of speaking) because they lack a safe environment to practice chaotic, real-world scenarios like dealing with the Ausländerbehörde.",
          solution:
            "I engineered a 'Pocket Tutor' that simulates real-life pressure. It records user audio, transcribes it via Whisper, and uses a fine-tuned Gemini model to analyze syntax/grammar. It allows users to roleplay complex scenarios with instant feedback loops, functioning as a judgment-free conversation partner.",
          techDeepDive:
            "Architected with Next.js API routes to securely proxy requests and manage rate limits. The core innovation lies in the 'System Instructions'—forcing the LLM to output structured JSON that separates the 'corrected sentence' from the 'conversational reply,' enabling the UI to render distinct feedback components dynamically.",
          features: [
            'Real-time Speech Transcription (Whisper API)',
            'Context-Aware Grammar Correction (Gemini 2.0)',
            'German Bureaucracy Roleplay Scenarios',
            'Mobile-First PWA Architecture',
          ],
        },
        {
          id: 'p2',
          title: 'AI Smart Travel Expense Tracker',
          description:
            "Receipt in, structured data out. Gemini's multimodal parsing eliminates manual entry, while Supabase handles real-time group collaboration across currencies. The hard part was not the AI call; it was making the parsing reliable enough that users stop double-checking it.",
          problem:
            "Spreadsheets were killing the holiday vibe. During a multi-country trip, I realized splitting bills across EUR, JPY, and TWD was a logistical nightmare. My goal was simple yet ambitious: Eliminate manual data entry entirely. I wanted a 'fire-and-forget' solution where users snap a photo, and the system handles the math, currency, and splits instantly.",
          solution:
            "A 'Lovable' built application serving as an intelligent financial assistant. By leveraging Google Gemini (Multimodal AI) via Edge Functions, the app acts as a visual parser—reading complex receipts in seconds to extract merchants, dates, and totals, automatically converting them to the user's home currency.",
          techDeepDive:
            "Architecture focuses on security and latency. Utilized Google Gemini via Deno-based Edge Functions to process images without exposing API keys. Implemented strict Supabase Row Level Security (RLS) to ensure data isolation—a critical standard for financial privacy. Employed TanStack Query for optimistic updates, ensuring the app feels 'native-fast' even on unstable travel networks.",
          features: [
            'AI-Powered OCR & Currency Conversion (Gemini)',
            'Real-time Group Sync (Supabase Realtime)',
            'GDPR-Ready Privacy (Row Level Security)',
            'Interactive Google Maps integration',
            'Optimistic UI Updates (TanStack Query)',
          ],
        },
        {
          id: 'p3',
          title: 'Pilotfit — AI Job Search Platform',
          description:
            'A full-stack AI platform that turns the chaos of job searching into structured strategy, built solo and running with real beta users.',
          problem:
            "Job hunting is a data problem disguised as a document problem. Reading hundreds of unstructured JDs creates cognitive overload, making it difficult to objectively quantify skill gaps (e.g., 'Do I lack React or just Next.js?'). I needed a tool to find the signal in the noise.",
          solution:
            'I built the platform solo, end to end: a FastAPI backend, a React frontend, and an agent layer that turns raw job postings into structured strategy. It runs with real beta users, which keeps the engineering honest: reliability, cost, and trust matter more than demo polish.',
          techDeepDive:
            'Under the hood: hybrid RAG search combining pgvector embeddings with structured filters, a LangGraph coaching agent that maintains context across sessions, and tiered model routing that cut inference costs by 84 percent without degrading output quality. The frontend renders agent state transparently, so users always know what the system is doing and why. The lesson this project taught me: in AI products, the model is 20 percent of the work; reliability, cost, and interface trust are the other 80.',
          features: [
            'Hybrid RAG Search (pgvector + Structured Filters)',
            'LangGraph Coaching Agent with Cross-Session Memory',
            'Tiered Model Routing (84% Inference Cost Reduction)',
            'Transparent Agent-State Rendering',
          ],
        },
        {
          id: 'p4',
          title: 'Institutional Fintech Dashboard',
          description:
            'High-density financial visualization for institutional users, where API contract precision and rendering performance are non-negotiable. No AI here, deliberately: it demonstrates the frontend rigor that the AI projects are built on.',
          problem:
            "In institutional finance, data presentation cannot just be 'pretty'—it must be precise. The challenge was to consume a raw, extensive backend API and transform it into a user-friendly interface without losing data granularity or introducing rendering lag.",
          solution:
            'I spearheaded the frontend architecture, translating complex Swagger/OpenAPI definitions into a type-safe React application. The interface prioritizes data readability and responsiveness, utilizing component-driven development to ensure UI consistency across financial modules.',
          techDeepDive:
            'Implemented a robust Service Layer pattern to decouple UI logic from API communication. This allowed for transforming raw JSON from the Zeabur-hosted backend into consumable UI state while maintaining strict type safety via TypeScript interfaces, ensuring zero runtime errors in financial calculations.',
          features: [
            'High-Density Data Tables',
            'Strict Swagger/OpenAPI Integration',
            'Real-time Asset Valuation Updates',
            'Component-Driven UI Architecture',
          ],
        },
        {
          id: 'p-tomato',
          title: 'Daily Tomato Todo',
          description:
            'A Vue 3 + Pinia daily planner where the todo list and the Pomodoro timer are one product, not two features. Swipeable day cards, a calendar hidden behind the header date, and a focus mode that takes over the whole screen on purpose.',
          problem:
            'Most todo apps treat time as a label and focus as an afterthought: tasks pile up in one endless list, and the Pomodoro timer lives in a corner you ignore. I wanted planning by day and focusing on one task to be the same motion, not two separate apps.',
          solution:
            'I structured the app around one card per day: swipe between days, tap any date in the collapsible calendar, and the add-task date chip follows whichever day you are looking at, so planning tomorrow needs zero extra taps. Pressing play on a task hands the entire screen to the focus overlay: countdown ring, task name, pause and stop. Nothing else is reachable, deliberately.',
          techDeepDive:
            'The day carousel is plain CSS scroll-snap, zero dependencies, with scroll position synced to the header date, day pills and calendar selection through a single Pinia store. Calendar cells derive status dots (open, overdue, all done) from the same store. The Pomodoro is a state machine (idle, focus, paused, break) rendered as a full-screen overlay with an SVG progress ring; blocking every other interaction during focus is the feature, not a limitation.',
          features: [
            'Day-Card Carousel (CSS Scroll Snap, Zero Dependencies)',
            'Collapsible Calendar with Task-Status Dots',
            'Date Chip That Follows the Day in View',
            'Full-Screen Pomodoro Focus Overlay (25/5 & 50/10)',
          ],
        },
      ],
    },
    about: {
      tagline: 'The Person Behind the Pixels',
      title: 'Never two careers.',
      subtitle: 'One education.',
      intro:
        "My degree is in <strong class='text-stone-900 font-medium'>Computer Simulation and Design</strong>, where programming, 3D graphics, and visual design were a single curriculum. My Master's thesis was a <strong class='text-stone-900 font-medium'>VR museum guide</strong> built in Unity, then validated with quantitative usability research. So when I read a Figma file, I see the designer's intent, not just measurements. When I push back on a spec, it is with an alternative, not just an objection.<br /><br />That foundation shapes how I build AI products today. LLM features live or die on interface decisions: how uncertainty is shown, when to ask for confirmation, where automation should stop and the human should decide. These are design problems and engineering problems at the same time, and I have always worked on both sides of that line.",
      educationTitle: 'Education & Research',
      globalTitle: 'Global Perspective & Resilience',

      education: [
        {
          degree: 'Master, Information & Learning Technology',
          school: 'National University of Tainan',
          year: '2009 — 2011',
          desc: 'Thesis: Developed an immersive <strong>VR Museum Guide</strong> using <strong>Unity & 3Ds Max</strong>. Conducted quantitative user research (SUS/IPO models) to validate usability.',
        },
        {
          degree: 'Bachelor, Computer Simulation & Design',
          school: 'Shih Chien University',
          year: '2005 — 2009',
          desc: 'Foundation in 3D logic and visual programming. Capstone Project: Engineered a fully functional e-commerce web platform.',
        },
      ],
      global: [
        {
          title: 'TrendMicro Global AI Contest',
          role: 'Innovation Award Winner',
          year: '2023',
          icon: '🏆',
          highlight: true,
          desc: "Conceptualized 'GrandKid', an AI companion for elderly care. Recognized for innovative LLM application.",
        },
        {
          title: 'Solo Backpacking Expedition',
          role: 'Chile & Argentina',
          year: '2020',
          icon: '🌎',
          desc: 'Navigated complex logistics in South America. Honed adaptability and problem-solving in high-pressure environments.',
        },
        {
          title: 'Wildlife Conservation Volunteer',
          role: 'Harnas Foundation, Namibia',
          year: '2013',
          icon: '🦁',
          desc: 'Collaborated with international teams on wildlife rehabilitation. Learned patience and execution in resource-constrained settings.',
        },
        {
          title: 'Working Holiday',
          role: 'Vancouver, Canada',
          year: '2012',
          icon: '🍁',
          desc: 'Year-long immersion in multicultural work environments, strengthening cross-cultural communication early in my career.',
        },
      ],
    },
    contact: {
      tagline: 'Open to opportunities',
      titlePart1: "Let's build something",
      titlePart2: 'that ships.',
      subtitle:
        'Open to senior frontend and AI engineering roles (hybrid Ulm or remote), and selective technical consulting.',
      startProject: 'Get in Touch',
      linkedinProfile: 'LinkedIn Profile',
      bookCall: 'Prefer a call? Book 30 minutes',
    },
    footer: {
      copyright: 'Shueny',
      allRightsReserved: 'All Rights Reserved',
      impressum: 'Impressum',
      privacyPolicy: 'Privacy Policy',
      designedWith: 'Astro',
    },
    cookieConsent: {
      title: 'Cookie Preferences',
      description:
        'We use cookies to enhance your browsing experience and analyze site traffic. You can choose to accept all cookies or customize your preferences.',
      customize: 'Customize',
      rejectAll: 'Reject All',
      acceptAll: 'Accept All',
      cookieSettings: 'Cookie Settings',
      necessaryCookies: 'Necessary Cookies',
      necessaryCookiesDesc: 'Required for the website to function properly',
      alwaysActive: 'Always Active',
      analyticsCookies: 'Analytics Cookies',
      analyticsCookiesDesc:
        'Help us understand how visitors interact with our website by collecting and reporting information anonymously (Google Analytics)',
      savePreferences: 'Save Preferences',
      cancel: 'Cancel',
    },
    projectModal: {
      close: 'Close',
      theChallenge: 'The Challenge',
      theSolution: 'The Solution',
      technicalArchitecture: 'Technical Architecture',
      keyFeatures: 'Key Features',
      visualOverview: 'Visual Overview',
      liveDemoNote: 'Live demo available upon request due to API costs.',
      contactForDemo: 'Contact for Demo',
      launchLiveApp: 'Launch Live App',
      interestedInStack: 'Interested in this stack?',
      checkOutLiveApp:
        'Check out the live application to see the performance optimizations in action.',
    },
    common: {
      downloadResume: 'Download Resume',
      changeLanguage: 'Change Language',
    },
  },
  DE: {
    nav: {
      work: 'Projekte',
      services: 'Leistungen',
      about: 'Über mich',
      experience: 'Erfahrung',
      contact: 'Kontakt',
      skills: 'Skills',
      impact: 'Impact',
      analysis: 'Analysis',
      projects: 'Projects',
      blog: 'Blog',
      common: {
        downloadResume: 'Download Resume',
        changeLanguage: 'Change Language',
      },
    },
    hero: {
      location:
        'Ansässig in Deutschland (MEZ) | Verfügbar für Hybrid (Ulm) & Global Remote',
      locationMobile: 'Deutschland (MEZ) | Hybrid & Remote',
      title1: 'Senior Frontend',
      title2: 'Engineer &',
      title3: 'KI-Lösungen',
      title3Suffix: 'Builder',
      subtitle:
        'Frontend-Architektur, die skaliert. KI-Features, die live gehen.',
      description:
        'Zehn Jahre React und TypeScript in Automotive-Cybersecurity, B2B-SaaS und E-Commerce. Zuletzt bei VicOne (Trend Micro) als alleiniger Frontend-Engineer für Security-Plattformen. Jetzt mit derselben Sorgfalt an LLM-Produkten: RAG-Pipelines, Agent-Workflows und Interfaces, denen Menschen vertrauen.',
      ctaPrimary: 'Projekte ansehen',
      ctaSecondary: 'Lebenslauf herunterladen',
      scroll: 'Scrollen',
    },
    services: {
      capabilities: 'Was ich mache',
      titlePart1: 'Drei Dinge,',
      titlePart2: 'mit Tiefe',
      subtitle:
        'Frontend-Architektur, KI-Integration und die Engineering-Praktiken, die beides wartbar halten.',

      service1Title: 'Frontend-Architektur im großen Maßstab',
      service1Desc:
        'React, Next.js, Vue 3 und Nx-Monorepos für komplexe Fachdomänen. Ich entwerfe Komponentensysteme und Micro-Frontend-Strukturen, die auch bei wachsenden Teams und Codebasen schnell und wartbar bleiben.',

      service2Title: 'KI-Integration, die live geht',
      service2Desc:
        'Mehr als API-Aufrufe: RAG-Pipelines, Prompt-Orchestrierung, multimodales Parsing und kostenbewusstes Model-Routing. Ich habe KI-Features als alleiniger Engineer gebaut, vom Schema-Design bis zum Produktiv-Deployment.',

      service3Title: 'Engineering-Qualität & Mentoring',
      service3Desc:
        'Automatisierte Tests (Cypress, Playwright), Code-Review-Kultur und Legacy-Refactoring. Ich hebe das Qualitätsniveau im Team, damit Qualität nicht von einer einzelnen Person abhängt.',
    },
    techStack: {
      label: 'Technisches Toolkit',
      titlePart1: 'Technologien',
      titlePart2: '& Tools',
      subtitle:
        'Die Werkzeuge hinter der Arbeit. Frontend ist der Kern, KI-Engineering der Vorsprung und Testing die Gewohnheit.',
      categories: {
        frontendArch: 'Frontend & Architektur',
        aiBackend: 'KI-Engineering & Backend',
        qaDevops: 'QA & DevOps',
        growthDesign: 'Design & Produkt',
      },
    },
    impact: {
      tagline: 'Nachgewiesene Erfolge',
      // 標題建議用 "Erfolgsbilanz" (成功記錄/業績) 或保留 "Impact Dashboard"
      // "Erfolgsbilanz" 對傳統德企很有吸引力
      titlePart1: 'Erfolgsbilanz &',
      titlePart2: 'Kennzahlen',

      subtitle:
        'Zahlen aus echten Produktivsystemen bei VicOne, Synttro und Citiesocial, keine Schätzungen aus Side-Projects.',

      // Metric 1: 50% Faster Time-to-Market
      impact1Value: '50%',
      impact1Title: 'Beschleunigte Markteinführung', // 比單純的 "Schneller" 更正式
      impact1Tag: 'AUTOMATISIERTE QA-PIPELINES', // 強調流程自動化
      impact1Desc:
        'Reduzierung der Regressionstest-Zyklen durch nahtlose Integration von Cypress & TestRail.',

      // Metric 2: 30% Performance Boost
      impact2Value: '30%',
      impact2Title: 'Performance-Steigerung', // 德國 IT 通用術語
      impact2Tag: 'MODULARE SYSTEMARCHITEKTUR', // "Systemarchitektur" 聽起來非常穩固
      impact2Desc:
        'Verbesserte Ladezeiten und Skalierbarkeit durch den Einsatz von Next.js & Nx Monorepos.',

      // Metric 3: 40% Conversion Uplift
      impact3Value: '40%',
      impact3Title: 'Conversion-Optimierung', // 強調優化的結果
      impact3Tag: 'DATENBASIERTE UX-STRATEGIE', // 強調不是憑感覺，是憑數據
      impact3Desc:
        'Optimierung der E-Commerce-Funnels basierend auf Analysen des Nutzerverhaltens.',
    },
    analysis: {
      title: 'Technische Analyse',
      subtitle: 'Detaillierte Einblicke in technische Implementierungen',
      analysis1Title: 'Performance-Optimierung',
      analysis1Desc:
        'Analyse und Optimierung kritischer Rendering-Pfade zur Verbesserung der Ladezeiten.',
      analysis2Title: 'Architektur-Review',
      analysis2Desc:
        'Bewertung der Systemarchitektur und Vorschläge zur Verbesserung der Skalierbarkeit.',
    },
    experience: {
      titlePart1: 'Professional',
      titlePart2: 'Trajectory',
      description:
        'Zehn Jahre Frontend-Engineering in E-Commerce, B2B-SaaS und Automotive-Cybersecurity, davor drei Jahre Designpraxis. Ich habe erlebt, wie aus jQuery-Spaghetti React-Ökosysteme wurden, und Teams durch diese Migration geführt.',
      keyAchievements: 'Schlüsselerfolge',
      items: [
        {
          id: 'exp1',
          role: 'Senior Frontend-Entwickler',
          company: 'VicOne (Trend Micro)',
          period: 'Sep 2021 - Mär 2025',
          description:
            'Entwicklung von Cybersicherheitssoftware und -dienstleistungen für die Automobilindustrie. Spezialisiert auf Micro-Frontends, KI-Integration und automatisierte Tests.',
          achievements: [
            'Automatisierte UI-End-to-End-Tests mit Cypress und TestRail, Reduzierung der QA-Zykluszeit um 50%.',
            'Implementierung einer B2B VSOC-Plattform mit Nx Monorepo, Reduzierung der menschlichen Fehlerrate um 80%.',
            'Entwicklung mehrsprachiger Websites (Next.js/i18n), Verbesserung der Render-Geschwindigkeit um 30% und SEO.',
            'Integration von Azure OpenAI in Wagtail CMS zur automatischen Analyse von Quell-URLs.',
            'Refactoring von Legacy-Apps zu modularen Micro-Frontends mit Nx, React und Vitest.',
          ],
        },
        {
          id: 'exp2',
          role: 'Senior Frontend-Entwickler',
          company: 'Synttro',
          period: 'Mai 2020 - Sep 2021',
          description:
            'Entwicklung von Team-Collaboration-CMS-Systemen für die B2B-Bauindustrie.',
          achievements: [
            'Entwicklung eines Drag-and-Drop-Formular-Builders mit React DnD und Schema-Validierung.',
            'Entwicklung von digitalen Signatur-Genehmigungsabläufen mit Canvas-basierter Skizzen-Eingabe.',
            'Steigerung der Zusammenarbeitseffizienz um 60% durch ein maßgeschneidertes B2B-System.',
            'Automatisierung von E2E-Tests mit Puppeteer, Erreichung von über 80% Testabdeckung.',
          ],
        },
        {
          id: 'exp3',
          role: 'Frontend-Entwickler',
          company: 'Citiesocial',
          period: 'Mai 2018 - Aug 2019',
          description:
            'Online-Auswahlshop, etabliert von Shopify. Fokus auf E-Commerce-Optimierung.',
          achievements: [
            'Entwicklung von Shopify-Oberflächen, Steigerung der Conversion-Rate um 10%.',
            'Optimierung von SEO-Strategien, Sicherung von Rankings auf der ersten Seite (10% Traffic-Steigerung).',
            'Reduzierung der Startzeit von Aktivitätsseiten von 1 Woche auf 1 Tag durch Templates.',
            'Integration von Hotjar und GA/GTM für datengesteuerte UI-Optimierungen.',
          ],
        },
        {
          id: 'exp4',
          role: 'Entwickler',
          company: 'MOMO (Fubon Multimedia)',
          period: 'Aug 2016 - Mär 2018',
          description: 'Führendes Online-Einzelhandelsunternehmen in Taiwan.',
          achievements: [
            'Refactoring von Desktop- und Mobile-Homepage-Oberflächen für Barrierefreiheit.',
            'Nutzung von GA-Daten zur Personalisierung von Suchergebnissen und Vorschlägen.',
            'Verbesserung der SEO-Rankings auf Top 3 durch Optimierung von Metadaten und Keywords.',
          ],
        },
        {
          id: 'exp5',
          role: 'Grafik- & Web-Designer',
          company: 'Skyway Inc. & TUKEEN Inc.',
          period: '2013 - 2016',
          description: 'Design-Hintergrund-Grundlage.',
          achievements: [
            'Wartung von Websites und Optimierung der UI für KMU.',
            'Verwaltung von Fotografie, Branding und Ausstellungsmaterialien.',
          ],
        },
      ],
    },
    projects: {
      label: 'Innovation & Impact',
      titlePart1: 'Featured',
      titlePart2: 'KI & Web-Lösungen',
      subtitle:
        'Jedes Projekt beantwortet dieselbe Frage: Können KI-Fähigkeiten zu Features werden, auf die sich echte Nutzer verlassen? End-to-end gebaut, von der Datenpipeline bis zum Interface.',
      viewCaseStudy: 'Fallstudie ansehen',
      categories: {
        frontend: 'Frontend',
        fullstack: 'Full Stack',
        design: 'Design',
      },
      data: [
        {
          id: 'p-lucky-duck',
          title: 'Lucky Duck — Rewards-Plattform MVP',
          description:
            'Ein Mobile-First-MVP für eine Consumer-Rewards-Plattform, end-to-end gestaltet und umgesetzt. Der Prototyp ist um messbare Growth Loops (Akquise, Aktivierung, Retention) statt statischer Screens strukturiert, sodass jede Interaktion auf eine Produkthypothese einzahlt.',
          problem:
            'Das Schwierige an einem Rewards-Produkt ist nicht, einen weiteren Marktplatz zu bauen — sondern genug Momentum aufzubauen, damit Menschen zurückkommen. Eine Sammlung zusammenhangloser Screens beweist das nicht; es braucht einen stimmigen Flow, in dem jeder Screen den nächsten Tap verdient und auf einen echten Growth Loop einzahlt.',
          solution:
            'Ich habe ein token-basiertes Designsystem (hell + dunkel) entworfen und den kompletten primären Happy Flow als funktionierenden Prototyp gebaut: ein maskottchengeführtes Landing, reibungsarmes Signup mit sofortigem Wallet-Setup, Reward-Discovery mit Featured Deals und Gewinnchancen, ein Portfolio aus Sammlungen und ein Konfetti-Celebration-Moment — ausgeliefert auf exakt dem Stack, auf dem das Produkt starten würde.',
          techDeepDive:
            'Umgesetzt als statische Astro-Seite mit einer React-Insel (client:only gemountet, um das aktuelle Theme ohne Flackern zu lesen). Die interaktive Demo ist eine in sich geschlossene Screen-State-Machine, mit Framer Motion animiert und über eine einzige Palette-Abstraktion gesteuert, damit Hell/Dunkel synchron bleiben. Keine Backend-Kopplung — die Übergabe für Payments, Credits und die Odds-Engine bleibt sauber.',
          features: [
            'Vollständiger klickbarer Happy-Flow-Prototyp (5 Kern-Screens)',
            'Wiederverwendbare Designsystem-Tokens für Hell/Dunkel',
            'Growth-Loop-Struktur: Akquise → Aktivierung → Engagement → Retention',
            'Animierte Celebration- & maskottchengeführte Markenmomente',
          ],
        },
        {
          id: 'p1',
          title: 'Persönlicher KI-Deutschlehrer',
          description:
            'Ein Voice-First-Sprachsimulator für Alltagsdeutsch, gebaut für meine eigene Integration in Deutschland. Whisper übernimmt die Spracherkennung, Gemini liefert kontextbewusstes Feedback zu Grammatik und Aussprache, und das Ganze läuft als PWA. Lehrbuchdeutsch ist kein Alltagsdeutsch; genau diese Lücke schließt das Projekt.',
          problem:
            "Traditionelle Sprach-Apps sind zu starr—sie lehren Vokabeln, bauen aber kein Gesprächsvertrauen auf. Neuankömmlinge in Deutschland kämpfen oft mit der 'Sprechhemmung', weil ihnen eine sichere Umgebung fehlt, um chaotische, realistische Szenarien wie den Umgang mit der Ausländerbehörde zu üben.",
          solution:
            "Ich entwickelte einen 'Taschenlehrer', der realen Druck simuliert. Er nimmt Benutzer-Audio auf, transkribiert es über Whisper und nutzt ein feinabgestimmtes Gemini-Modell zur Analyse von Syntax/Grammatik. Benutzer können komplexe Szenarien mit sofortigen Feedback-Schleifen nachspielen und fungieren als urteilsfreier Gesprächspartner.",
          techDeepDive:
            "Architektur mit Next.js API-Routen zur sicheren Proxy-Anfragen und Rate-Limit-Verwaltung. Die Kerninnovation liegt in den 'Systemanweisungen'—das LLM wird gezwungen, strukturiertes JSON auszugeben, das den 'korrigierten Satz' von der 'konversationellen Antwort' trennt, sodass die UI verschiedene Feedback-Komponenten dynamisch rendern kann.",
          features: [
            'Echtzeit-Sprachtranskription (Whisper API)',
            'Kontextbewusste Grammatikkorrektur (Gemini 2.0)',
            'Deutsche Bürokratie-Rollenspiel-Szenarien',
            'Mobile-First PWA-Architektur',
          ],
        },
        {
          id: 'p2',
          title: 'KI-Reisekosten-Tracker',
          description:
            'Beleg rein, strukturierte Daten raus. Geminis multimodales Parsing eliminiert manuelle Eingaben, während Supabase die Echtzeit-Zusammenarbeit in der Gruppe über Währungen hinweg übernimmt. Die Schwierigkeit war nicht der KI-Aufruf, sondern das Parsing so zuverlässig zu machen, dass Nutzer aufhören, es nachzuprüfen.',
          problem:
            'Tabellenkalkulationen zerstörten die Urlaubsstimmung. Während einer mehrländerigen Reise erkannte ich, dass die Aufteilung von Rechnungen über EUR, JPY und TWD ein logistischer Albtraum war. Mein Ziel war einfach, aber ehrgeizig: Manuelle Dateneingabe vollständig eliminieren. Ich wollte eine "Fire-and-Forget"-Lösung, bei der Benutzer ein Foto machen und das System sofort die Mathematik, Währung und Aufteilung übernimmt.',
          solution:
            'Eine "Lovable"-Anwendung, die als intelligenter Finanzassistent dient. Durch Nutzung von Google Gemini (Multimodale KI) über Edge Functions fungiert die App als visueller Parser—liest komplexe Belege in Sekunden, um Händler, Daten und Summen zu extrahieren und sie automatisch in die Heimatwährung des Benutzers umzurechnen.',
          techDeepDive:
            'Die Architektur konzentriert sich auf Sicherheit und Latenz. Nutzte Google Gemini über Deno-basierte Edge Functions zur Bildverarbeitung ohne Preisgabe von API-Schlüsseln. Implementierte strikte Supabase Row Level Security (RLS) zur Gewährleistung der Datenisolation—ein kritischer Standard für Finanzdatenschutz. Verwendete TanStack Query für optimistische UI-Updates, sodass die App selbst auf instabilen Reisenetzwerken "nativ-schnell" wirkt.',
          features: [
            'KI-gestützte OCR & Währungsumrechnung (Gemini)',
            'Echtzeit-Gruppensynchronisation (Supabase Realtime)',
            'DSGVO-konformer Datenschutz (Row Level Security)',
            'Interaktive Google Maps-Integration',
            'Optimistische UI-Updates (TanStack Query)',
          ],
        },
        {
          id: 'p3',
          title: 'Pilotfit — KI-Plattform für die Jobsuche',
          description:
            'Eine Full-Stack-KI-Plattform, die das Chaos der Jobsuche in strukturierte Strategie verwandelt, solo gebaut und mit echten Beta-Nutzern im Betrieb.',
          problem:
            "Jobsuche ist ein Datenproblem, das als Dokumentproblem getarnt ist. Das Lesen von Hunderten unstrukturierter Stellenbeschreibungen erzeugt kognitive Überlastung und macht es schwierig, Qualifikationslücken objektiv zu quantifizieren (z.B. 'Fehlt mir React oder nur Next.js?'). Ich brauchte ein Tool, um das Signal im Rauschen zu finden.",
          solution:
            'Ich habe die Plattform solo und end-to-end gebaut: FastAPI-Backend, React-Frontend und eine Agenten-Schicht, die rohe Stellenanzeigen in strukturierte Strategie übersetzt. Sie läuft mit echten Beta-Nutzern, was das Engineering ehrlich hält: Zuverlässigkeit, Kosten und Vertrauen zählen mehr als Demo-Politur.',
          techDeepDive:
            'Unter der Haube: hybride RAG-Suche, die pgvector-Embeddings mit strukturierten Filtern kombiniert, ein LangGraph-Coaching-Agent, der Kontext über Sessions hinweg hält, und gestuftes Model-Routing, das die Inferenzkosten um 84 Prozent senkte, ohne die Ausgabequalität zu verschlechtern. Das Frontend stellt den Agentenzustand transparent dar, sodass Nutzer immer wissen, was das System tut und warum. Die Lektion dieses Projekts: In KI-Produkten ist das Modell 20 Prozent der Arbeit; Zuverlässigkeit, Kosten und Interface-Vertrauen sind die anderen 80.',
          features: [
            'Hybride RAG-Suche (pgvector + strukturierte Filter)',
            'LangGraph-Coaching-Agent mit Session-übergreifendem Gedächtnis',
            'Gestuftes Model-Routing (84% geringere Inferenzkosten)',
            'Transparente Darstellung des Agentenzustands',
          ],
        },
        {
          id: 'p4',
          title: 'Institutionelles Fintech-Dashboard',
          description:
            'Hochverdichtete Finanzvisualisierung für institutionelle Nutzer, bei der Präzision im API-Vertrag und Rendering-Performance nicht verhandelbar sind. Bewusst ohne KI: Es zeigt die Frontend-Disziplin, auf der die KI-Projekte aufbauen.',
          problem:
            "Im institutionellen Finanzwesen kann Datenpräsentation nicht nur 'hübsch' sein—sie muss präzise sein. Die Herausforderung war, eine rohe, umfangreiche Backend-API zu konsumieren und in eine benutzerfreundliche Oberfläche zu transformieren, ohne Datengranularität zu verlieren oder Rendering-Verzögerungen einzuführen.",
          solution:
            'Ich leitete die Frontend-Architektur und übersetzte komplexe Swagger/OpenAPI-Definitionen in eine typsichere React-Anwendung. Die Oberfläche priorisiert Datenlesbarkeit und Reaktionsfähigkeit und nutzt komponentengetriebene Entwicklung, um UI-Konsistenz über Finanzmodule hinweg sicherzustellen.',
          techDeepDive:
            'Implementierte ein robustes Service-Layer-Muster zur Entkopplung der UI-Logik von der API-Kommunikation. Dies ermöglichte die Transformation von rohem JSON vom Zeabur-gehosteten Backend in konsumierbaren UI-Zustand bei gleichzeitiger Aufrechterhaltung strikter Typsicherheit über TypeScript-Schnittstellen, was null Laufzeitfehler bei Finanzberechnungen gewährleistet.',
          features: [
            'Hochdichte Datentabellen',
            'Strikte Swagger/OpenAPI-Integration',
            'Echtzeit-Vermögensbewertungs-Updates',
            'Komponentengetriebene UI-Architektur',
          ],
        },
        {
          id: 'p-tomato',
          title: 'Daily Tomato Todo',
          description:
            'Ein Vue-3-Tagesplaner mit Pinia, bei dem Todo-Liste und Pomodoro-Timer ein Produkt sind, nicht zwei Features. Wischbare Tageskarten, ein hinter dem Kopfzeilendatum verborgener Kalender und ein Fokusmodus, der bewusst den ganzen Bildschirm übernimmt.',
          problem:
            'Die meisten Todo-Apps behandeln Zeit als Label und Fokus als Nebensache: Aufgaben stapeln sich in einer endlosen Liste, und der Pomodoro-Timer lebt in einer Ecke, die man ignoriert. Ich wollte, dass Tagesplanung und Fokussieren auf eine Aufgabe dieselbe Bewegung sind, nicht zwei getrennte Apps.',
          solution:
            'Ich habe die App um eine Karte pro Tag strukturiert: zwischen Tagen wischen, jedes Datum im ausklappbaren Kalender antippen, und der Datums-Chip beim Anlegen folgt dem gerade sichtbaren Tag, sodass Planen für morgen keinen zusätzlichen Tap braucht. Ein Druck auf Play übergibt den ganzen Bildschirm an das Fokus-Overlay: Countdown-Ring, Aufgabenname, Pause und Stopp. Alles andere ist bewusst unerreichbar.',
          techDeepDive:
            'Das Tageskarussell ist reines CSS Scroll-Snap ohne Abhängigkeiten; die Scroll-Position ist über einen einzigen Pinia-Store mit Kopfzeilendatum, Tages-Pills und Kalenderauswahl synchronisiert. Kalenderzellen leiten Status-Punkte (offen, überfällig, alles erledigt) aus demselben Store ab. Der Pomodoro ist eine State Machine (idle, focus, paused, break) als Vollbild-Overlay mit SVG-Fortschrittsring; dass während des Fokus jede andere Interaktion blockiert ist, ist das Feature, keine Einschränkung.',
          features: [
            'Tageskarten-Karussell (CSS Scroll-Snap, ohne Abhängigkeiten)',
            'Ausklappbarer Kalender mit Status-Punkten',
            'Datums-Chip, der dem sichtbaren Tag folgt',
            'Vollbild-Pomodoro-Fokus-Overlay (25/5 & 50/10)',
          ],
        },
      ],
    },
    about: {
      tagline: 'Die Person hinter den Pixeln',
      title: 'Nie zwei Karrieren.',
      subtitle: 'Eine Ausbildung.',
      intro:
        "Mein Studiengang heißt <strong class='text-stone-900 font-medium'>Computer Simulation and Design</strong>: Programmierung, 3D-Grafik und visuelles Design waren ein einziges Curriculum. Meine Masterarbeit war ein <strong class='text-stone-900 font-medium'>VR-Museumsführer</strong> in Unity, validiert mit quantitativer Usability-Forschung. Wenn ich eine Figma-Datei lese, sehe ich die Absicht des Designers, nicht nur Maße. Wenn ich eine Spezifikation hinterfrage, dann mit einer Alternative, nicht nur mit einem Einwand.<br /><br />Dieses Fundament prägt, wie ich heute KI-Produkte baue. LLM-Features stehen und fallen mit Interface-Entscheidungen: wie Unsicherheit gezeigt wird, wann nach Bestätigung gefragt wird, wo Automatisierung endet und der Mensch entscheidet. Das sind Design- und Engineering-Probleme zugleich, und ich habe immer auf beiden Seiten dieser Linie gearbeitet.",
      educationTitle: 'Ausbildung & Forschung',
      globalTitle: 'Globale Perspektive & Resilienz',

      education: [
        {
          degree: 'Master, Information & Learning Technology',
          school: 'National University of Tainan',
          year: '2009 — 2011',
          desc: 'Thesis: Entwicklung eines immersiven <strong>VR-Museumsführers</strong> mit <strong>Unity & 3Ds Max</strong>. Durchführung quantitativer Nutzerforschung (SUS/IPO) zur Validierung der Usability.',
        },
        {
          degree: 'Bachelor, Computer Simulation & Design',
          school: 'Shih Chien University',
          year: '2005 — 2009',
          desc: 'Fundament in 3D-Logik und visueller Programmierung. Abschlussprojekt: Entwicklung einer voll funktionsfähigen E-Commerce-Webplattform.',
        },
      ],
      global: [
        {
          title: 'TrendMicro Global AI Contest',
          role: 'Innovation Award Winner',
          year: '2023',
          icon: '🏆',
          highlight: true,
          desc: "Konzeption von 'GrandKid', einem KI-Begleiter für die Altenpflege. Ausgezeichnet für innovative Anwendung von LLMs.",
        },
        {
          title: 'Solo Backpacking Expedition',
          role: 'Chile & Argentinien',
          year: '2020',
          icon: '🌎',
          desc: 'Bewältigung komplexer Logistik in Südamerika. Entwicklung hoher Anpassungsfähigkeit und Problemlösungskompetenz in unvorhersehbaren Umgebungen.',
        },
        {
          title: 'Wildlife Conservation Volunteer',
          role: 'Harnas Foundation, Namibia',
          year: '2013',
          icon: '🦁',
          desc: 'Zusammenarbeit mit internationalen Teams zur Rehabilitation von Wildtieren. Geduld und präzise Ausführung unter Ressourcenbeschränkungen.',
        },
        {
          title: 'Working Holiday',
          role: 'Vancouver, Kanada',
          year: '2012',
          icon: '🍁',
          desc: 'Einjähriges Eintauchen in ein multikulturelles Arbeitsumfeld. Stärkung der interkulturellen Kommunikation zu Beginn meiner Karriere.',
        },
      ],
    },
    contact: {
      tagline: 'Offen für neue Aufgaben',
      titlePart1: 'Lassen Sie uns bauen,',
      titlePart2: 'was live geht.',
      subtitle:
        'Offen für Senior-Frontend- und KI-Engineering-Rollen (hybrid in Ulm oder remote) sowie ausgewählte technische Beratung.',
      startProject: 'Kontakt aufnehmen',
      linkedinProfile: 'LinkedIn Profil',
      bookCall: 'Lieber ein Gespräch? 30 Minuten buchen',
    },
    footer: {
      copyright: 'Shueny',
      allRightsReserved: 'Alle Rechte vorbehalten',
      impressum: 'Impressum',
      privacyPolicy: 'Datenschutzerklärung',
      designedWith: 'Astro',
    },
    cookieConsent: {
      title: 'Cookie-Einstellungen',
      description:
        'Wir verwenden Cookies, um Ihr Browsing-Erlebnis zu verbessern und den Website-Traffic zu analysieren. Sie können alle Cookies akzeptieren oder Ihre Einstellungen anpassen.',
      customize: 'Anpassen',
      rejectAll: 'Alle ablehnen',
      acceptAll: 'Alle akzeptieren',
      cookieSettings: 'Cookie-Einstellungen',
      necessaryCookies: 'Notwendige Cookies',
      necessaryCookiesDesc:
        'Erforderlich für die ordnungsgemäße Funktion der Website',
      alwaysActive: 'Immer aktiv',
      analyticsCookies: 'Analyse-Cookies',
      analyticsCookiesDesc:
        'Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden (Google Analytics)',
      savePreferences: 'Einstellungen speichern',
      cancel: 'Abbrechen',
    },
    projectModal: {
      close: 'Schließen',
      theChallenge: 'Die Herausforderung',
      theSolution: 'Die Lösung',
      technicalArchitecture: 'Technische Architektur',
      keyFeatures: 'Hauptfunktionen',
      visualOverview: 'Visuelle Übersicht',
      liveDemoNote: 'Live-Demo auf Anfrage verfügbar aufgrund von API-Kosten.',
      contactForDemo: 'Demo anfragen',
      launchLiveApp: 'Live-App öffnen',
      interestedInStack: 'Interessiert an diesem Stack?',
      checkOutLiveApp:
        'Schauen Sie sich die Live-Anwendung an, um die Performance-Optimierungen in Aktion zu sehen.',
    },
    common: {
      downloadResume: 'Lebenslauf herunterladen',
      changeLanguage: 'Sprache ändern',
    },
  },
  ZH: {
    nav: {
      work: '作品',
      services: '服務',
      about: '關於',
      experience: '經歷',
      contact: '聯絡',
      skills: '技能',
      impact: '成效',
      analysis: '分析',
      projects: '專案',
      blog: '文章',
      common: {
        downloadResume: '下載履歷',
        changeLanguage: '切換語言',
      },
    },
    hero: {
      location: '位於德國（中歐時區）| 可進行混合辦公（烏爾姆）與全球遠程合作',
      locationMobile: '德國（中歐時區）| 混合辦公與遠程',
      title1: '資深前端',
      title2: '工程師 &',
      title3: 'AI 解決方案',
      title3Suffix: '實踐者',
      subtitle: '可擴展的前端架構。能真正上線的 AI 功能。',
      description:
        '十年 React 與 TypeScript 經驗，橫跨汽車網路安全、B2B SaaS 與電商。最近在 VicOne（趨勢科技）以唯一前端工程師的身分打造安全平台。現在把同樣的嚴謹帶進 LLM 產品：RAG pipeline、agent 工作流程，以及讓人信任的介面。',
      ctaPrimary: '查看專案',
      ctaSecondary: '下載履歷',
      scroll: '向下滾動',
    },
    services: {
      capabilities: '我做的事',
      titlePart1: '三件事，',
      titlePart2: '做到深',
      subtitle: '前端架構、AI 整合，以及讓兩者都能長期維護的工程實踐。',

      service1Title: '可擴展的前端架構',
      service1Desc:
        'React、Next.js、Vue 3 與 Nx monorepo，服務複雜的商業領域。我設計的元件系統與微前端架構，在團隊與程式碼規模成長時仍能保持快速且可維護。',

      service2Title: '能真正上線的 AI 整合',
      service2Desc:
        '不只是呼叫 API：RAG pipeline、prompt 編排、多模態解析與成本導向的模型路由。我曾以唯一工程師的身分打造 AI 功能，從 schema 設計到正式部署。',

      service3Title: '工程品質與 Mentoring',
      service3Desc:
        '自動化測試（Cypress、Playwright）、code review 文化與舊系統重構。我提升團隊的品質基準線，讓品質不依賴任何單一個人。',
    },
    techStack: {
      label: '技術工具箱',
      titlePart1: '核心技術',
      titlePart2: '與工具',
      subtitle: '支撐作品的工具。前端是核心，AI 工程是優勢，測試是習慣。',
      categories: {
        frontendArch: '前端與架構',
        aiBackend: 'AI 工程與後端',
        qaDevops: 'QA 與 DevOps',
        growthDesign: '設計與產品',
      },
    },
    impact: {
      tagline: '實證成效',
      titlePart1: '成效數據',
      titlePart2: '儀表板',
      subtitle:
        '來自 VicOne、Synttro 與 Citiesocial 真實生產系統的數據，而非 side project 的估計值。',
      // Metric 1
      impact1Value: '50%',
      impact1Title: '加速產品上市',
      impact1Tag: '自動化 QA 流程',
      impact1Desc: '透過 Cypress 與 TestRail 整合，大幅縮短回歸測試週期。',

      // Metric 2
      impact2Value: '30%',
      impact2Title: '效能顯著提升',
      impact2Tag: '模組化架構設計',
      impact2Desc: '運用 Next.js 與 Nx Monorepo 優化渲染速度與系統擴展性。',

      // Metric 3
      impact3Value: '40%',
      impact3Title: '轉換率成長',
      impact3Tag: '數據驅動 UX 策略',
      impact3Desc: '基於使用者行為分析優化電商漏斗與購物體驗。',
    },
    analysis: {
      title: '技術分析',
      subtitle: '深入探討技術實作細節',
      analysis1Title: '效能優化',
      analysis1Desc: '分析並優化關鍵渲染路徑，提升載入速度。',
      analysis2Title: '架構評估',
      analysis2Desc: '評估系統架構並提出可擴展性改進方案。',
    },
    experience: {
      titlePart1: '專業',
      titlePart2: '職涯軌跡',
      description:
        '十年前端工程經驗，橫跨電商、B2B SaaS 與汽車網路安全，在此之前還有三年設計實務。我看著 jQuery 義大利麵程式碼演變成 React 生態系，並帶領團隊完成這段遷移。',
      keyAchievements: '關鍵成就',
      items: [
        {
          id: 'exp1',
          role: '資深前端工程師',
          company: 'VicOne (趨勢科技)',
          period: '2021年9月 - 2025年3月',
          description:
            '為汽車產業提供網路安全軟體與服務。專精於微前端架構、AI 整合與自動化測試。',
          achievements: [
            '架構可擴展的 Monorepo（使用 Nx）：透過 Nx 整合多個前端專案，實作 Computation Caching，將 CI/CD 建置時間縮短 40%，並透過 Shared Libraries 統一跨產品的 UI 規範，減少 30% 的重複程式碼。',
            '確定性狀態管理：在複雜的非同步資料流場景中引入 XState，解決了傳統 useEffect 難以維護的 Race Conditions，將該模組的 Bug Report 率降低至接近零。',
            '使用 Cypress 與 TestRail 自動化 UI 端對端測試，將 QA 週期時間減少 50%。',
            '建置多語系網站（Next.js/i18n），提升渲染速度 30% 並改善 SEO。',
            '整合 Azure OpenAI 至 Wagtail CMS，實現來源 URL 自動解析。',
            '將舊版應用程式重構為模組化微前端，提升可擴展性與可維護性，同時降低部署風險。',
          ],
        },
        {
          id: 'exp2',
          role: '資深前端工程師',
          company: 'Synttro',
          period: '2020年5月 - 2021年9月',
          description: '為 B2B 建築業開發團隊協作 CMS 系統。',
          achievements: [
            '開發拖放式表單建構器，使用 React DnD 與 schema 驗證。',
            '建置數位簽名審核流程，支援畫布式手繪輸入。',
            '透過客製化 B2B 系統，將協作效率提升 60%。',
            '使用 Puppeteer 自動化 E2E 測試，達成超過 80% 測試覆蓋率。',
          ],
        },
        {
          id: 'exp3',
          role: '前端開發工程師',
          company: 'Citiesocial',
          period: '2018年5月 - 2019年8月',
          description: '以 Shopify 建立的線上選物店。專注於電商優化。',
          achievements: [
            '設計 Shopify 介面，將轉換率提升 10%。',
            '優化 SEO 策略，確保首頁排名（流量提升 10%）。',
            '透過模板化，將活動頁面上線時間從 1 週縮短至 1 天。',
            '整合 Hotjar 與 GA/GTM，實現數據驅動的 UI 優化。',
          ],
        },
        {
          id: 'exp4',
          role: '工程師',
          company: 'MOMO（富邦媒體）',
          period: '2016年8月 - 2018年3月',
          description: '台灣領先的線上零售公司。',
          achievements: [
            '重構桌面與行動版首頁介面，提升無障礙性。',
            '運用 GA 數據個人化搜尋結果與建議。',
            '透過優化 metadata 與關鍵字，將 SEO 排名提升至前 3 名。',
          ],
        },
        {
          id: 'exp5',
          role: '平面與網頁設計師',
          company: 'Skyway Inc. & TUKEEN Inc.',
          period: '2013 - 2016',
          description: '設計背景基礎。',
          achievements: [
            '維護網站並為中小企業優化 UI。',
            '管理攝影、品牌與展覽素材。',
          ],
        },
      ],
    },
    projects: {
      label: '創新與影響力',
      titlePart1: '精選',
      titlePart2: 'AI 與 Web 解決方案',
      subtitle:
        '每個專案都在回答同一個問題：AI 能力能否成為真實使用者依賴的功能？從資料管線到介面，端對端打造。',
      viewCaseStudy: '查看案例研究',
      categories: {
        frontend: '前端',
        fullstack: '全端',
        design: '設計',
      },
      data: [
        {
          id: 'p-lucky-duck',
          title: 'Lucky Duck — 獎勵平台 MVP',
          description:
            '一個行動優先的消費者獎勵平台 MVP，從設計到工程一手完成。原型圍繞可衡量的成長迴圈（獲取、啟用、留存）而非靜態畫面構建，讓每一個互動都對應到一個產品假設。',
          problem:
            '獎勵產品難的不是再做一個商城，而是建立足夠的動能讓人願意回來。一堆彼此無關的畫面證明不了這件事；它需要一個連貫的流程，讓每個畫面都值得使用者點下一步，並對應到真實的成長迴圈。',
          solution:
            '我設計了一套以 token 為基礎的設計系統（淺色 + 深色），並把完整的主要 happy flow 做成可運作的原型：吉祥物主導的 Landing、低摩擦註冊與即時錢包設定、含精選優惠與中獎機率的獎勵探索、收藏組成的個人作品集，以及彩帶慶祝時刻——而且用的是產品實際上線會採用的同一套技術棧。',
          techDeepDive:
            '以 Astro 靜態頁面承載一個 React island（用 client:only 掛載，直接讀取當前主題、避免閃爍）。互動 demo 是一個自包含的畫面狀態機，用 Framer Motion 製作動畫，並由單一的 Palette 抽象驅動，讓淺色／深色保持同步。不與後端耦合——付款、點數與機率引擎的交接保持乾淨。',
          features: [
            '完整可點擊的 happy-flow 原型（5 個核心畫面）',
            '可重用的淺色／深色設計系統 token',
            '成長迴圈結構：獲取 → 啟用 → 參與 → 留存',
            '動畫慶祝與吉祥物主導的品牌時刻',
          ],
        },
        {
          id: 'p1',
          title: '專屬的AI德語教師',
          description:
            '一個為真實生活德語打造的語音優先模擬器，源自我自己在德國融入的需求。Whisper 負責語音辨識，Gemini 提供情境感知的文法與發音回饋，整體以 PWA 運行。教科書德語不等於街頭德語；這個專案就是要補上這段落差。',
          problem:
            '傳統語言應用程式過於僵化——它們教授詞彙，但無法建立對話信心。初到德國的新移民經常面臨「開口恐懼症」（Sprechhemmung），因為他們缺乏安全的環境來練習混亂的真實場景，例如與外國人辦公室打交道。',
          solution:
            '我設計了一個「口袋教師」，模擬真實生活壓力。它錄製用戶音訊，透過 Whisper 轉錄，並使用微調的 Gemini 模型分析語法/文法。它允許用戶在即時回饋循環中扮演複雜場景，作為無判斷的對話夥伴。',
          techDeepDive:
            '使用 Next.js API 路由架構，安全地代理請求並管理速率限制。核心創新在於「系統指令」——強制 LLM 輸出結構化 JSON，將「修正後的句子」與「對話回覆」分離，使 UI 能夠動態渲染不同的回饋組件。',
          features: [
            '即時語音轉錄（Whisper API）',
            '情境感知語法修正（Gemini 2.0）',
            '德國官僚角色扮演場景',
            '行動優先 PWA 架構',
          ],
        },
        {
          id: 'p2',
          title: 'AI 智慧旅行費用追蹤器',
          description:
            '收據進，結構化資料出。Gemini 的多模態解析消除了手動輸入，Supabase 則處理跨幣別的即時群組協作。難的不是呼叫 AI，而是讓解析可靠到使用者不再需要重複核對。',
          problem:
            '試算表破壞了假期氛圍。在一次多國旅行中，我意識到在 EUR、JPY 和 TWD 之間分攤帳單是一個後勤噩夢。我的目標簡單而雄心勃勃：完全消除手動資料輸入。我想要一個「發射後不管」的解決方案，用戶拍照，系統立即處理數學、貨幣和分攤。',
          solution:
            '一個「Lovable」建置的應用程式，作為智慧財務助手。透過 Edge Functions 利用 Google Gemini（多模態 AI），應用程式充當視覺解析器——在幾秒內讀取複雜收據，提取商家、日期和總額，自動將其轉換為用戶的本國貨幣。',
          techDeepDive:
            '架構專注於安全性和延遲。透過基於 Deno 的 Edge Functions 使用 Google Gemini 處理圖像，而不暴露 API 金鑰。實施嚴格的 Supabase 行級安全性（RLS）以確保資料隔離——這是財務隱私的關鍵標準。使用 TanStack Query 進行樂觀 UI 更新，確保應用程式即使在動盪的旅行網路上也能感覺「原生快速」。',
          features: [
            'AI 驅動的 OCR 和貨幣轉換（Gemini）',
            '即時群組同步（Supabase Realtime）',
            'GDPR 就緒的隱私（行級安全性）',
            '互動式 Google Maps 整合',
            '樂觀 UI 更新（TanStack Query）',
          ],
        },
        {
          id: 'p3',
          title: 'Pilotfit — AI 求職平台',
          description:
            '一個把求職的混亂轉化為結構化策略的全端 AI 平台，獨立打造，並有真實 beta 使用者在使用。',
          problem:
            '求職是一個偽裝成文件問題的資料問題。閱讀數百個非結構化職位描述會造成認知超載，使得客觀量化技能差距變得困難（例如，「我缺少 React 還是只是 Next.js？」）。我需要一個工具來在噪音中找到信號。',
          solution:
            '我獨立完成整個平台：FastAPI 後端、React 前端，以及把原始職缺轉化為結構化策略的 agent 層。它有真實 beta 使用者在用，這讓工程必須誠實：可靠性、成本與信任比 demo 的華麗更重要。',
          techDeepDive:
            '技術核心：混合式 RAG 搜尋結合 pgvector 向量與結構化篩選；LangGraph 教練 agent 能跨 session 維持上下文，而不是每次對話都重來；分層模型路由在不犧牲輸出品質的前提下，將推論成本降低 84%。前端透明呈現 agent 狀態，讓使用者永遠知道系統在做什麼、為什麼。這個專案教我的一課：在 AI 產品裡，模型只佔兩成工作；可靠性、成本與介面信任才是另外八成。',
          features: [
            '混合式 RAG 搜尋（pgvector + 結構化篩選）',
            '具跨 session 記憶的 LangGraph 教練 agent',
            '分層模型路由（推論成本降低 84%）',
            'agent 狀態透明化呈現',
          ],
        },
        {
          id: 'p4',
          title: '機構金融科技儀表板',
          description:
            '為機構使用者打造的高密度金融視覺化，API 合約精確度與渲染效能沒有妥協空間。刻意不含 AI：它展示的是那些 AI 專案賴以建立的前端基本功。',
          problem:
            '在機構金融中，資料呈現不能只是「漂亮」——它必須精確。挑戰是消費一個原始、廣泛的後端 API，並將其轉換為用戶友好的介面，而不失去資料粒度或引入渲染延遲。',
          solution:
            '我領導了前端架構，將複雜的 Swagger/OpenAPI 定義轉換為類型安全的 React 應用程式。介面優先考慮資料可讀性和響應性，利用組件驅動開發確保跨金融模組的 UI 一致性。',
          techDeepDive:
            '實施了穩健的服務層模式，將 UI 邏輯與 API 通訊解耦。這允許將來自 Zeabur 託管後端的原始 JSON 轉換為可消費的 UI 狀態，同時透過 TypeScript 介面維持嚴格的類型安全，確保財務計算中的零運行時錯誤。',
          features: [
            '高密度資料表',
            '嚴格的 Swagger/OpenAPI 整合',
            '即時資產估值更新',
            '組件驅動的 UI 架構',
          ],
        },
        {
          id: 'p-tomato',
          title: 'Daily Tomato Todo',
          description:
            '一個 Vue 3 + Pinia 的每日計畫工具，待辦清單與蕃茄鐘是同一個產品，而不是兩個功能。可滑動的每日卡片、藏在標題日期後的行事曆，以及刻意接管全畫面的專注模式。',
          problem:
            '多數待辦 app 把時間當成標籤、把專注當成附加功能：任務堆在一條無盡的清單裡，蕃茄鐘則縮在你不會看的角落。我希望「按天計畫」和「專注做一件事」是同一個動作，而不是兩個分開的 app。',
          solution:
            '我以「一天一張卡」為核心結構：左右滑動切換日子、在可收合的行事曆點任何一天，而新增任務的日期 chip 會跟著你正在看的那天，所以規劃明天完全不用多點一下。按下任務的播放鍵後，整個畫面交給專注遮罩：倒數進度環、任務名稱、暫停與停止。其他一切刻意碰不到。',
          techDeepDive:
            '每日卡片輪播用純 CSS scroll-snap 實作、零依賴，捲動位置透過單一 Pinia store 與標題日期、日子膠囊、行事曆選取保持同步。行事曆格子的狀態圓點（未完成、逾期、全部完成）也從同一個 store 推導。蕃茄鐘是一個狀態機（idle、focus、paused、break），以全畫面遮罩加 SVG 進度環呈現；專注期間封鎖所有其他操作是功能，不是限制。',
          features: [
            '每日卡片輪播（CSS scroll-snap、零依賴）',
            '可收合行事曆與任務狀態圓點',
            '跟著檢視日的新增日期 chip',
            '全畫面蕃茄鐘專注遮罩（25/5 與 50/10）',
          ],
        },
      ],
    },
    about: {
      tagline: '像素背後的人',
      title: '設計與工程從來不是兩條路，',
      subtitle: '而是同一套教育。',
      intro:
        "我的學位是<strong class='text-stone-900 font-medium'>電腦模擬與設計</strong>：程式、3D 圖學與視覺設計從第一天起就是同一套課程。我的碩士論文是用 Unity 打造的 <strong class='text-stone-900 font-medium'>VR 博物館導覽</strong>，並以量化易用性研究驗證。所以當我閱讀 Figma 檔案時，我看到的是設計師的意圖，而不只是尺寸；當我對規格提出異議時，我帶的是替代方案，而不只是反對。<br /><br />這個基礎形塑了我今天打造 AI 產品的方式。LLM 功能的成敗取決於介面決策：如何呈現不確定性、何時請使用者確認、自動化該在哪裡停下讓人來決定。這些同時是設計問題與工程問題，而我一直都在這條線的兩側工作。",
      educationTitle: '學歷與研究',
      globalTitle: '國際視野與適應力',

      education: [
        {
          degree: '數位學習科技學系 碩士',
          school: '國立臺南大學',
          year: '2009 — 2011',
          desc: '論文：基於 <strong>Unity 3D</strong> 與 <strong>3Ds Max</strong> 開發沈浸式虛擬博物館系統。運用 IPO 模式與 SUS 易用性量表進行實證研究。',
        },
        {
          degree: '電腦模擬與設計學系 學士',
          school: '實踐大學',
          year: '2005 — 2009',
          desc: '建立 3D 邏輯與互動設計基礎。畢業專題：負責電子商務平台之網頁前端開發，實作購物流程。',
        },
      ],
      global: [
        {
          title: 'TrendMicro Global AI Contest',
          role: '創新獎得主',
          year: '2023',
          icon: '🏆',
          highlight: true,
          desc: "構思並製作了老年照護 AI 解決方案 'GrandKid' 原型。因創新應用 LLM 解決社會問題而獲獎。",
        },
        {
          title: '南美洲背包客遠征',
          role: '智利與阿根廷',
          year: '2020',
          icon: '🌎',
          desc: '獨自克服南美洲複雜的後勤挑戰。在充滿未知的高壓環境中，培養了極致的適應力與問題解決能力。',
        },
        {
          title: '野生動物保育志工',
          role: '納米比亞 Harnas 基金會',
          year: '2013',
          icon: '🦁',
          desc: '與國際團隊合作復育野生動物。在資源受限的環境中，磨練了耐心與精確執行的能力。',
        },
        {
          title: '海外打工度假',
          role: '加拿大溫哥華',
          year: '2012',
          icon: '🍁',
          desc: '沉浸於多元文化工作環境一年，在職涯早期即建立了跨文化溝通與英語協作能力。',
        },
      ],
    },
    contact: {
      tagline: '開放工作機會',
      titlePart1: '一起打造',
      titlePart2: '能上線的東西。',
      subtitle:
        '開放資深前端與 AI 工程職位（烏爾姆混合辦公或遠端），以及少量精選的技術顧問合作。',
      startProject: '與我聯繫',
      linkedinProfile: 'LinkedIn 檔案',
      bookCall: '想先聊聊？預約 30 分鐘通話',
    },
    footer: {
      copyright: 'Shueny',
      allRightsReserved: '版權所有',
      impressum: '法律聲明',
      privacyPolicy: '隱私政策',
      designedWith: 'Astro',
    },
    cookieConsent: {
      title: 'Cookie 偏好設定',
      description:
        '我們使用 Cookie 來增強您的瀏覽體驗並分析網站流量。您可以選擇接受所有 Cookie 或自訂您的偏好設定。',
      customize: '自訂',
      rejectAll: '全部拒絕',
      acceptAll: '全部接受',
      cookieSettings: 'Cookie 設定',
      necessaryCookies: '必要 Cookie',
      necessaryCookiesDesc: '網站正常運作所必需',
      alwaysActive: '始終啟用',
      analyticsCookies: '分析 Cookie',
      analyticsCookiesDesc:
        '幫助我們了解訪客如何與網站互動，透過匿名收集和報告資訊（Google Analytics）',
      savePreferences: '儲存偏好設定',
      cancel: '取消',
    },
    projectModal: {
      close: '關閉',
      theChallenge: '挑戰',
      theSolution: '解決方案',
      technicalArchitecture: '技術架構',
      keyFeatures: '關鍵功能',
      visualOverview: '視覺概覽',
      liveDemoNote: '由於 API 成本，可應要求提供即時演示。',
      contactForDemo: '聯絡以取得演示',
      launchLiveApp: '開啟即時應用',
      interestedInStack: '對這個技術棧感興趣？',
      checkOutLiveApp: '查看即時應用程式，親眼見證效能優化的效果。',
    },
    common: {
      downloadResume: '下載履歷',
      changeLanguage: '切換語言',
    },
  },
};
