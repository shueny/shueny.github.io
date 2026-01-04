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
    // 優化：強調 "Confidence" (心理層面) 與 "Context-aware" (技術亮點)
    description:
      "A voice-first language simulator designed to accelerate cultural integration in Germany. Utilizes OpenAI's Whisper and Gemini 2.0 to provide real-time, context-aware feedback on spoken grammar and pronunciation, bridging the gap between textbook theory and street-level reality.",
    tags: [
      'Next.js',
      'OpenAI/Gemini',
      'Speech-to-Text',
      'PWA',
      'Prompt Engineering',
    ],
    image: getAssetUrl('images/german-tutor-cover.png'),
    banner: getAssetUrl('images/german-tutor-cover.png'),
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
    // 保持上次優化的版本，這是目前的黃金標準
    description:
      'An intelligent financial assistant that eliminates manual data entry. Leverages Google Gemini for multimodal receipt parsing and Supabase for secure, real-time group collaboration across multiple currencies.',
    tags: [
      'React',
      'Supabase',
      'Gemini AI',
      'Google Maps',
      'Full-Stack',
      'Edge Functions',
    ],
    image: getAssetUrl('images/expense-tracker-cover.png'),
    banner: getAssetUrl('images/expense-tracker-cover.png'),
    gallery: [
      getAssetUrl('images/expense-tracker-cover.png'),
      getAssetUrl('images/expense-tracker-app.png'),
      // getAssetUrl('images/expense-tracker-modal.png'),
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
    title: 'Intelligent Job Market Analyzer',
    // 優化：強調 "Strategic" 與 "Precision" (精準度)
    description:
      'A full-stack automation pipeline built with Python (FastAPI) and React. Orchestrates complex prompt engineering to transform unstructured job descriptions into structured strategic insights, performing gap analysis with high precision.',
    tags: [
      'Python (FastAPI)',
      'Prompt Engineering',
      'React',
      'Data Visualization',
    ],
    image: getAssetUrl('images/job-analyzer-cover.png'),
    banner: getAssetUrl('images/job-analyzer-cover.png'),
    visualDescription:
      'Image: Split screen showing raw text input vs. structured JSON dashboard.',
    category: 'fullstack',

    // ⭐️ 核心修改：將個人需求轉化為「數據分析問題」
    problem:
      "Job hunting is a data problem disguised as a document problem. Reading hundreds of unstructured JDs creates cognitive overload, making it difficult to objectively quantify skill gaps (e.g., 'Do I lack React or just Next.js?'). I needed a tool to find the signal in the noise.",

    // ⭐️ 核心修改：強調 "Pipeline" 與 "Standardization"
    solution:
      "I built an automated ETL pipeline for career data. It scrapes or accepts JD text, utilizes Chain-of-Thought prompting to reason through requirements (distinguishing 'Must-have' from 'Nice-to-have'), and normalizes the output into a standardized JSON schema for visual comparison against my resume.",

    features: [
      'Unstructured-to-Structured Data Pipeline',
      'Intelligent Gap Analysis (Resume vs. JD)',
      'Async Python Backend (FastAPI + Pydantic)',
      'React Dashboard for Skill Visualization',
    ],

    // ⭐️ 核心修改：強調 Python 後端能力與 Type Safety
    techDeepDive:
      "The technical challenge was ensuring data consistency. I employed Pydantic models in FastAPI to enforce strict type validation between the AI's output and the frontend. Used few-shot prompting to significantly reduce hallucinations when extracting numerical experience requirements.",
  },
  {
    id: 'p4',
    title: 'Institutional Fintech Dashboard', // 修改標題，聽起來更專業
    // 優化：強調 "Robustness" (穩健性) 與 "Compliance" (合規/精確)
    description:
      'A robust financial visualization platform engineered for institutional data clarity. Focused on strict API contract adherence and high-performance rendering of complex banking datasets.',
    tags: ['React', 'TypeScript', 'Data Visualization', 'REST API'],
    image: getAssetUrl('images/f13-cover.png'),
    banner: getAssetUrl('images/f13-cover.png'),
    gallery: [
      getAssetUrl('images/f13-fintech-1.png'),
      getAssetUrl('images/f13-fintech-2.png'),
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
