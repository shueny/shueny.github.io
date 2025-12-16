import type {
  Experience,
  Project,
  SkillData,
  Education,
  SpecialExperience,
} from './types';

// Inline helper to avoid import resolution issues across different build environments
const getAssetUrl = (filename: string): string => {
  if (!filename) return '';
  // Astro uses import.meta.env.BASE_URL
  const baseUrl = import.meta.env.BASE_URL ?? '/';

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
      "Designed to accelerate cultural integration, this mobile-first application utilizes OpenAI's Whisper and Gemini models for real-time speech correction and scenario-based roleplay. It bridges the gap between textbook German and daily conversation.",
    tags: ['Next.js', 'OpenAI/Gemini', 'Speech-to-Text', 'Mobile First'],
    image: getAssetUrl('images/german-tutor-cover.png'),
    banner: getAssetUrl('images/german-tutor-cover.png'),
    visualDescription:
      'GIF: Mobile chat interface showing voice waves and instant text corrections',
    category: 'fullstack',
    problem:
      "Existing language apps are too rigid. They don't simulate the chaotic nature of real-life conversations in Germany, nor do they provide instant, context-aware grammatical feedback on spoken audio.",
    solution:
      'I built a voice-first interface that mimics a real tutor. It records audio, transcribes it via Whisper, analyzes the grammar/syntax using Gemini 2.0, and responds with both the corrected sentence and a natural conversational reply.',
    features: [
      'Real-time Audio Transcription (Whisper API)',
      'Context-aware Grammar Correction (Gemini)',
      'Scenario Selection (Bakery, Post Office, Ausländerbehörde)',
      'Mobile-Optimized PWA for on-the-go practice',
    ],
    techDeepDive:
      "Utilized Next.js API routes to proxy requests to OpenAI/Google to hide API keys. implemented specific 'System Instructions' to force the AI to return JSON containing both the correction and the response separately for UI rendering.",
  },
  {
    id: 'p2',
    title: 'AI Smart Travel Expense Tracker',
    description:
      'A collaborative finance platform powered by Google Gemini for instant receipt OCR and Supabase for real-time sync. Features automated multi-currency conversion, interactive Google Maps visualization, and row-level security for secure group travel budgeting.',
    tags: ['React', 'Supabase', 'Gemini AI', 'Google Maps', 'Full-Stack'],
    image: getAssetUrl('images/expense-tracker-cover.png'),
    banner: getAssetUrl('images/expense-tracker-cover.png'),
    gallery: [
      getAssetUrl('expense-tracker-cover.png'),
      getAssetUrl('expense-tracker-map.png'),
      getAssetUrl('expense-tracker-modal.png'),
    ],
    link: 'https://minni.lovable.app/',
    visualDescription:
      'UI Screenshot: Clean mobile dashboard showing "Recent Transactions" with auto-converted dual currency (NT$ / €) and category icons.',
    category: 'fullstack',
    problem:
      "Group travel finances are messy. Spreadsheets don't handle receipt photos or currency conversion well, and existing apps often lack real-time collaboration or require manual data entry.",
    solution:
      "A 'Lovable' built app using Supabase as the backend-as-a-service. It leverages Edge Functions to securely call Google Gemini for OCR, extracting total amounts and currencies from photos automatically.",
    features: [
      'AI Receipt Scanning (Gemini Vision)',
      'Real-time Collaboration (Supabase Realtime)',
      'Row Level Security (RLS) for data privacy',
      'Interactive Google Maps integration',
    ],
    techDeepDive:
      'Heavily relies on Supabase Row Level Security (RLS) to ensure users only see their trips. Used Deno-based Edge Functions to handle the AI processing to keep the client lightweight and secure. Implemented TanStack Query for efficient server state management.',
  },
  {
    id: 'p3',
    title: 'Intelligent Job Market Analyzer',
    description:
      'A full-stack automation pipeline built with Python (FastAPI) and React. Orchestrates complex prompt engineering to parse unstructured job descriptions into structured JSON insights, identifying skill gaps and market trends with high precision.',
    tags: ['Python (FastAPI)', 'Prompt Engineering', 'Full-Stack'],
    image: getAssetUrl('images/job-analyzer-cover.png'),
    banner: getAssetUrl('images/job-analyzer-cover.png'),
    visualDescription:
      'Image: Dark mode backend dashboard or a clean code snippet block',
    category: 'fullstack',
    problem:
      "Job hunting involves reading hundreds of unstructured JD texts. It's difficult to quantify exactly which skills are missing from a resume compared to market demands.",
    solution:
      "An automated pipeline that scrapes JDs (or accepts text input), and uses a Chain-of-Thought prompt to extract years of experience, required tech stacks, and 'nice-to-haves' into a standardized JSON format.",
    features: [
      'Unstructured to Structured Data Pipeline',
      'Resume vs. JD Gap Analysis',
      'FastAPI Backend with Pydantic Validation',
      'React Dashboard for Visualization',
    ],
    techDeepDive:
      "The core challenge was prompt engineering. I used few-shot prompting to train the model to distinguish between 'required' and 'preferred' skills. The backend uses Python's FastAPI for high-performance async processing of multiple requests.",
  },
  {
    id: 'p4',
    title: 'F13 Fintech Platform',
    description:
      'A robust institutional finance dashboard built to visualize complex banking data. Developed in close collaboration with a backend engineer, ensuring seamless consumption of a Swagger-documented API.',
    tags: ['React', 'REST API', 'Fintech', 'Collaborative'],
    image: getAssetUrl('images/f13-cover.png'),
    banner: getAssetUrl('images/f13-cover.png'),
    gallery: [
      getAssetUrl('images/f13-fintech-1.png'),
      getAssetUrl('images/f13-fintech-2.png'),
    ],
    link: 'https://f13-fintech.lovable.app',
    visualDescription:
      'UI Screenshot: Professional financial dashboard showing asset tables and institutional metrics.',
    category: 'frontend',
    problem:
      'Bridging the gap between complex backend financial logic and user-friendly interfaces. The challenge was to consume a raw, extensive API and present institutional data clearly.',
    solution:
      'I spearheaded the frontend development, translating Swagger API definitions into a responsive React application. The interface focuses on data clarity, utilizing Lovable for rapid UI iteration while ensuring strict adherence to the backend contracts.',
    features: [
      'Institutional Dashboard UI',
      'Complex REST API Integration',
      'Real-time Data binding',
      'Swagger-based Development',
    ],
    techDeepDive:
      'Collaborated on API design to ensure frontend requirements were met. Implemented a service layer to handle API communication with the Zeabur-hosted backend, transforming raw JSON into consumable UI state.',
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
