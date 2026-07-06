import type {
  Experience,
  Project,
  SkillData,
  Education,
  SpecialExperience,
  EducationItem,
  GlobalExperienceItem,
  AboutSection,
} from './types';

// Inline helper to avoid import resolution issues across different build environments
const getAssetUrl = (filename: string): string => {
  if (!filename) return '';
  // Astro uses import.meta.env.BASE_URL
  // Type assertion needed because TypeScript doesn't recognize Astro's env types in this context
  const baseUrl = (import.meta as any).env?.BASE_URL ?? '/';

  // Clean up input path (remove leading slash)
  const cleanName = filename.replace(/^\//, '');

  // If path explicitly starts with known directories (images/ or assets/), use it as is relative to base
  if (cleanName.startsWith('images/') || cleanName.startsWith('assets/')) {
    return `${baseUrl}${cleanName}`;
  }

  // Default behavior: assume file is in assets/ if no folder specified
  return `${baseUrl}assets/${cleanName}`;
};

export const PORTFOLIO_OWNER = 'Shueny Wang';

export const SKILLS_DATA: SkillData[] = [
  { subject: 'React/Next.js', A: 95, fullMark: 100 },
  { subject: 'TypeScript/Nx', A: 90, fullMark: 100 },
  { subject: 'Testing (Cypress/Vitest)', A: 85, fullMark: 100 },
  { subject: 'UI/UX (Figma/Tailwind)', A: 90, fullMark: 100 },
  { subject: 'AI Integration', A: 80, fullMark: 100 },
  { subject: 'Analytics (GA/GTM)', A: 75, fullMark: 100 },
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'Master, Information and Learning Technology',
    school: 'National University of Tainan',
    period: '2009 - 2011',
    description:
      'Focused on human-computer interaction and educational technology.',
  },
  {
    degree: 'Bachelor, Computer Simulation & Design',
    school: 'Shih Chien University',
    period: '2005 - 2009',
    description: 'Foundation in multimedia design and 3D simulation.',
  },
];

export const SPECIAL_EXPERIENCE_DATA: SpecialExperience[] = [
  {
    title: 'TrendMicro Global AI Contest',
    description:
      "Conceptualized 'GrandKid', an AI companion designed to provide emotional support for the elderly.",
    year: '2023',
  },
  {
    title: 'Backpacking Trip',
    location: 'Chile & Argentina',
    description:
      '60-day solo backpacking journey across South America, adapting to diverse cultures and environments.',
    year: '2020',
  },
  {
    title: 'Wildlife Volunteer',
    location: 'Harnas Wildlife Foundation, Namibia',
    description:
      'One of the few wildlife orphanages in the world. Cared for abused and injured wild animals.',
    year: '2013',
  },
  {
    title: 'Working Holiday',
    location: 'Canada',
    description: 'Year-long immersive experience working and living in Canada.',
    year: '2012',
  },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp1',
    role: 'Senior Front-End Engineer',
    company: 'VicOne (Trend Micro)',
    period: 'Sep 2021 - Mar 2025',
    description:
      'Delivering cybersecurity software and services for the automotive industry. Specializing in micro-frontends, AI integration, and automated testing.',
    achievements: [
      'Architected a Scalable Monorepo with Nx: Integrated multiple frontend projects through Nx, implemented Computation Caching to reduce CI/CD build time by 40%, and unified cross-product UI standards via Shared Libraries, eliminating 30% of duplicate code.',
      'Deterministic State Management: Introduced XState in complex asynchronous data flow scenarios, resolving Race Conditions that were difficult to maintain with traditional useEffect patterns, reducing bug report rates for that module to near zero.',
      'Automated UI end-to-end testing using Cypress and TestRail, reducing QA cycle time by 50%.',
      'Built multilingual websites (Next.js/i18n), improving render speed by 30% and SEO.',
      'Integrated Azure OpenAI into Wagtail CMS for auto-parsing source URLs.',
      'Refactored legacy apps into modular micro-frontends, improving scalability and maintainability while reducing deployment risks.',
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
      'Designed Shopify interfaces boosting conversion rates by 40%.',
      'Optimized SEO strategies securing first-page rankings (40% traffic boost).',
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
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: 'Personal AI German Tutor',
    description:
      'A voice-first language simulator for real-life German, built for my own integration in Germany. Whisper handles speech recognition, Gemini provides context-aware feedback on grammar and pronunciation, and the whole thing runs as a PWA. Textbook German is not street German; this closes that gap.',
    tags: [
      'Next.js',
      'OpenAI/Gemini',
      'Speech-to-Text',
      'PWA',
      'Prompt Engineering',
    ],
    image: getAssetUrl('images/german-tutor-cover.webp'),
    banner: getAssetUrl('images/german-tutor-cover.webp'),
    visualDescription:
      'GIF: Mobile chat interface showing voice waves and instant text corrections.',
    category: 'fullstack',

    // ⭐️ 核心修改：從單純的「App太死板」提升到解決「開口恐懼症 (Sprechhemmung)」
    problem:
      "Traditional language apps are too rigid—they teach vocabulary but fail to build conversational confidence. Newcomers to Germany often struggle with the 'Sprechhemmung' (fear of speaking) because they lack a safe environment to practice chaotic, real-world scenarios like dealing with the Ausländerbehörde.",

    // ⭐️ 核心修改：強調 "Simulation" 而非單純的 "Translation"
    solution:
      "I engineered a 'Pocket Tutor' that simulates real-life pressure. It records user audio, transcribes it via Whisper, and uses a fine-tuned Gemini model to analyze syntax/grammar. It allows users to roleplay complex scenarios with instant feedback loops, functioning as a judgment-free conversation partner.",

    features: [
      'Real-time Speech Transcription (Whisper API)',
      'Context-Aware Grammar Correction (Gemini 2.0)',
      'German Bureaucracy Roleplay Scenarios', // ✨ 針對德國市場的幽默與實用性
      'Mobile-First PWA Architecture',
    ],

    // ⭐️ 核心修改：展示對 Prompt Engineering 和 API 架構的控制力
    techDeepDive:
      "Architected with Next.js API routes to securely proxy requests and manage rate limits. The core innovation lies in the 'System Instructions'—forcing the LLM to output structured JSON that separates the 'corrected sentence' from the 'conversational reply,' enabling the UI to render distinct feedback components dynamically.",
  },
  {
    id: 'p2',
    title: 'AI Smart Travel Expense Tracker',
    description:
      "Receipt in, structured data out. Gemini's multimodal parsing eliminates manual entry, while Supabase handles real-time group collaboration across currencies. The hard part was not the AI call; it was making the parsing reliable enough that users stop double-checking it.",
    tags: [
      'React',
      'Supabase',
      'Gemini AI',
      'Google Maps',
      'Full-Stack',
      'Edge Functions',
    ],
    image: getAssetUrl('images/expense-tracker-cover.webp'),
    banner: getAssetUrl('images/expense-tracker-cover.webp'),
    gallery: [
      getAssetUrl('images/expense-tracker-cover.webp'),
      getAssetUrl('images/expense-tracker-app.webp'),
      // getAssetUrl('images/expense-tracker-modal.webp'),
    ],
    link: 'https://minni.lovable.app/',
    visualDescription:
      'UI Screenshot: Clean mobile dashboard showing "Recent Transactions" with auto-converted dual currency (NT$ / €) and category icons.',
    category: 'fullstack',
    problem:
      "Spreadsheets were killing the holiday vibe. During a multi-country trip, I realized splitting bills across EUR, JPY, and TWD was a logistical nightmare. My goal was simple yet ambitious: Eliminate manual data entry entirely. I wanted a 'fire-and-forget' solution where users snap a photo, and the system handles the math, currency, and splits instantly.",
    solution:
      "A 'Lovable' built application serving as an intelligent financial assistant. By leveraging Google Gemini (Multimodal AI) via Edge Functions, the app acts as a visual parser—reading complex receipts in seconds to extract merchants, dates, and totals, automatically converting them to the user's home currency.",
    features: [
      'AI-Powered OCR & Currency Conversion (Gemini)',
      'Real-time Group Sync (Supabase Realtime)',
      'GDPR-Ready Privacy (Row Level Security)',
      'Interactive Google Maps integration',
      'Optimistic UI Updates (TanStack Query)',
    ],
    techDeepDive:
      "Architecture focuses on security and latency. Utilized Google Gemini via Deno-based Edge Functions to process images without exposing API keys. Implemented strict Supabase Row Level Security (RLS) to ensure data isolation—a critical standard for financial privacy. Employed TanStack Query for optimistic updates, ensuring the app feels 'native-fast' even on unstable travel networks.",
  },
  {
    id: 'p3',
    title: 'Pilotfit — AI Job Search Platform',
    description:
      'A full-stack AI platform that turns the chaos of job searching into structured strategy, built solo and running with real beta users.',
    tags: ['FastAPI', 'React', 'LangGraph', 'pgvector', 'Gemini'],
    image: getAssetUrl('images/job-analyzer-cover.webp'),
    banner: getAssetUrl('images/job-analyzer-cover.webp'),
    visualDescription:
      'Image: Split screen showing raw text input vs. structured JSON dashboard.',
    category: 'fullstack',

    problem:
      "Job hunting is a data problem disguised as a document problem. Reading hundreds of unstructured JDs creates cognitive overload, making it difficult to objectively quantify skill gaps (e.g., 'Do I lack React or just Next.js?'). I needed a tool to find the signal in the noise.",

    solution:
      'I built the platform solo, end to end: a FastAPI backend, a React frontend, and an agent layer that turns raw job postings into structured strategy. It runs with real beta users, which keeps the engineering honest: reliability, cost, and trust matter more than demo polish.',

    features: [
      'Hybrid RAG Search (pgvector + Structured Filters)',
      'LangGraph Coaching Agent with Cross-Session Memory',
      'Tiered Model Routing (84% Inference Cost Reduction)',
      'Transparent Agent-State Rendering',
    ],

    techDeepDive:
      'Under the hood: hybrid RAG search combining pgvector embeddings with structured filters, a LangGraph coaching agent that maintains context across sessions, and tiered model routing that cut inference costs by 84 percent without degrading output quality. The frontend renders agent state transparently, so users always know what the system is doing and why. The lesson this project taught me: in AI products, the model is 20 percent of the work; reliability, cost, and interface trust are the other 80.',
  },
  {
    id: 'p4',
    title: 'Institutional Fintech Dashboard',
    description:
      'High-density financial visualization for institutional users, where API contract precision and rendering performance are non-negotiable. No AI here, deliberately: it demonstrates the frontend rigor that the AI projects are built on.',
    tags: ['React', 'TypeScript', 'Data Visualization', 'REST API'],
    image: getAssetUrl('images/f13-cover.webp'),
    banner: getAssetUrl('images/f13-cover.webp'),
    gallery: [
      getAssetUrl('images/f13-fintech-1.webp'),
      getAssetUrl('images/f13-fintech-2.webp'),
    ],
    link: 'https://f13-fintech.lovable.app',
    visualDescription:
      'UI Screenshot: Professional financial dashboard showing dense asset tables and institutional metrics.',
    category: 'frontend',

    // ⭐️ 核心修改：強調 "Data Integrity" (數據完整性)，這對金融業至關重要
    problem:
      "In institutional finance, data presentation cannot just be 'pretty'—it must be precise. The challenge was to consume a raw, extensive backend API and transform it into a user-friendly interface without losing data granularity or introducing rendering lag.",

    // ⭐️ 核心修改：展現前端與後端的協作深度
    solution:
      'I spearheaded the frontend architecture, translating complex Swagger/OpenAPI definitions into a type-safe React application. The interface prioritizes data readability and responsiveness, utilizing component-driven development to ensure UI consistency across financial modules.',

    features: [
      'High-Density Data Tables',
      'Strict Swagger/OpenAPI Integration',
      'Real-time Asset Valuation Updates',
      'Component-Driven UI Architecture',
    ],

    // ⭐️ 核心修改：強調 "Service Layer" 設計模式
    techDeepDive:
      'Implemented a robust Service Layer pattern to decouple UI logic from API communication. This allowed for transforming raw JSON from the Zeabur-hosted backend into consumable UI state while maintaining strict type safety via TypeScript interfaces, ensuring zero runtime errors in financial calculations.',
  },
  {
    id: 'p-lucky-duck',
    title: 'Lucky Duck — Rewards Platform MVP',
    description:
      'A mobile-first MVP for a consumer rewards platform, designed and engineered end-to-end. The prototype is structured around measurable growth loops (acquisition, activation, retention) rather than static screens, so every interaction maps to a product hypothesis.',
    tags: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: getAssetUrl('images/lucky-duck-card.png'),
    banner: getAssetUrl('images/lucky-duck-card.png'),
    link: '/lucky-duck',
    visualDescription:
      'Interactive phone prototype walking through Landing, Signup/Wallet, Reward Discovery, Portfolio and Celebration in light & dark themes.',
    category: 'design',
    problem:
      "The hard part of a rewards product isn't building another marketplace — it's building enough momentum that people come back. A pile of disconnected screens doesn't prove that; it needs a coherent flow where every screen earns the next tap and maps to a real growth loop.",
    solution:
      'I designed a token-based design system (light + dark) and built the full primary happy flow as a working prototype: a mascot-led landing, low-friction signup with instant wallet setup, reward discovery with featured deals and odds, a portfolio of collections, and a confetti celebration moment — shipped on the exact stack the product would launch on.',
    features: [
      'Full clickable happy-flow prototype (5 core screens)',
      'Reusable light/dark design-system tokens',
      'Growth-loop structure: acquisition → activation → engagement → retention',
      'Animated celebration & mascot-led brand moments',
    ],
    techDeepDive:
      'Built as an Astro static page hosting a React island (mounted client:only to read the live theme with no flash). The interactive demo is a self-contained screen state machine animated with Framer Motion, driven by a single Palette abstraction so light/dark stay in lockstep. No backend coupling — the handoff for payments, credits and the odds engine stays clean.',
  },
  {
    id: 'p-tomato',
    title: 'Daily Tomato Todo',
    description:
      'A Vue 3 + Pinia daily planner where the todo list and the Pomodoro timer are one product, not two features. Swipeable day cards, a calendar hidden behind the header date, and a focus mode that takes over the whole screen on purpose.',
    tags: ['Vue 3', 'Pinia', 'CSS Scroll Snap', 'PWA'],
    image: getAssetUrl('images/tomato-todo-cover.svg'),
    banner: getAssetUrl('images/tomato-todo-cover.svg'),
    link: '/daily-tomato-todo',
    visualDescription:
      'Interactive phone mockup: day-card carousel, collapsible calendar and full-screen Pomodoro focus overlay.',
    category: 'frontend',
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
];

export const ANALYSIS_REPORT = [
  {
    title: 'QA Efficiency',
    before: 'Manual testing bottlenecks and high regression rates.',
    after: 'Automated Cypress/TestRail pipelines.',
    impact: 'High',
  },
  {
    title: 'Content Management',
    before: 'Manual data entry for threat intelligence.',
    after: 'Integrated Azure OpenAI to parse URLs automatically.',
    impact: 'High',
  },
  {
    title: 'Conversion Rate',
    before: 'Generic e-commerce templates.',
    after: 'Custom Shopify UX design & behavioral tracking.',
    impact: 'High',
  },
];
