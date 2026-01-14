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
    service4Title: string;
    service4Desc: string;
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
    tagline: string; // "Available for hire"
    titlePart1: string; // "Let's create"
    titlePart2: string; // "impact."
    subtitle: string;
    startProject: string;
    linkedinProfile: string;
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
      title1: 'Senior Frontend',
      title2: 'Engineer &',
      title3: 'AI Solutions',
      title3Suffix: 'Specialist',
      subtitle:
        'Specializing in scalable frontend architecture (React/Nx) and practical AI integration for business automation.',
      description:
        'Building scalable design systems and AI-enhanced applications that reduce operational overhead and improve user conversion.',
      ctaPrimary: 'View AI Projects',
      ctaSecondary: 'Book Consultation',
      scroll: 'Scroll',
    },
    services: {
      capabilities: 'Technical Solutions',
      titlePart1: 'Engineering &',
      titlePart2: 'Strategy',
      subtitle:
        'Selecting the right tools for the job—from custom enterprise applications to rapid marketing sites.',

      // 1. Custom Apps (React, Next, Vue, Nuxt)
      service1Title: 'Modern Web Applications',
      service1Desc:
        'Framework-agnostic architecture using React, Next.js, Vue 3, or Nuxt. I build scalable, high-performance applications tailored to complex business logic.',

      // 2. CMS & Rapid Deployment (Wix, WP)
      service2Title: 'CMS & Rapid Deployment',
      service2Desc:
        'Efficient solutions for marketing sites using WordPress or Wix. I focus on speed-to-market and empowering teams to manage their own content without code.',

      // 3. AI (Same)
      service3Title: 'AI & Workflow Automation',
      service3Desc:
        'Integrating LLMs (OpenAI/Gemini) to automate manual processes, parse unstructured data, and build intelligent internal tools.',

      // 4. Consulting (Same)
      service4Title: 'Mentoring & Optimization',
      service4Desc:
        'Improving code quality through reviews, refactoring legacy systems, and establishing best practices to prevent technical debt.',
    },
    techStack: {
      label: 'Technical Toolkit',
      titlePart1: 'Technologies',
      titlePart2: '& Tools',
      subtitle:
        'The engine behind the strategy. A comprehensive list of tools I use to build scalable solutions.',
      categories: {
        frontendArch: 'Frontend & Architecture',
        aiBackend: 'AI Engineering & Backend',
        qaDevops: 'QA & DevOps',
        growthDesign: 'Growth & Design',
      },
    },
    impact: {
      tagline: 'Proven Results',
      titlePart1: 'Impact',
      titlePart2: 'Dashboard',
      subtitle:
        'Real-world performance metrics delivered for VicOne, Synttro, and Citiesocial.',

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
        "Over two decades of navigating the evolving landscape of web technology. From jQuery spaghetti code to modern React ecosystems, I've led teams through it all.",
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
        'A selection of projects demonstrating cultural adaptation, business process automation, and deep technical capabilities.',
      viewCaseStudy: 'View Case Study',
      categories: {
        frontend: 'Frontend',
        fullstack: 'Full Stack',
        design: 'Design',
      },
      data: [
        {
          id: 'p1',
          title: 'Personal AI German Tutor',
          description:
            "A voice-first language simulator designed to accelerate cultural integration in Germany. Utilizes OpenAI's Whisper and Gemini 2.0 to provide real-time, context-aware feedback on spoken grammar and pronunciation, bridging the gap between textbook theory and street-level reality.",
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
            'An intelligent financial assistant that eliminates manual data entry. Leverages Google Gemini for multimodal receipt parsing and Supabase for secure, real-time group collaboration across multiple currencies.',
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
          title: 'Intelligent Job Market Analyzer',
          description:
            'A full-stack automation pipeline built with Python (FastAPI) and React. Orchestrates complex prompt engineering to transform unstructured job descriptions into structured strategic insights, performing gap analysis with high precision.',
          problem:
            "Job hunting is a data problem disguised as a document problem. Reading hundreds of unstructured JDs creates cognitive overload, making it difficult to objectively quantify skill gaps (e.g., 'Do I lack React or just Next.js?'). I needed a tool to find the signal in the noise.",
          solution:
            "I built an automated ETL pipeline for career data. It scrapes or accepts JD text, utilizes Chain-of-Thought prompting to reason through requirements (distinguishing 'Must-have' from 'Nice-to-have'), and normalizes the output into a standardized JSON schema for visual comparison against my resume.",
          techDeepDive:
            "The technical challenge was ensuring data consistency. I employed Pydantic models in FastAPI to enforce strict type validation between the AI's output and the frontend. Used few-shot prompting to significantly reduce hallucinations when extracting numerical experience requirements.",
          features: [
            'Unstructured-to-Structured Data Pipeline',
            'Intelligent Gap Analysis (Resume vs. JD)',
            'Async Python Backend (FastAPI + Pydantic)',
            'React Dashboard for Skill Visualization',
          ],
        },
        {
          id: 'p4',
          title: 'Institutional Fintech Dashboard',
          description:
            'A robust financial visualization platform engineered for institutional data clarity. Focused on strict API contract adherence and high-performance rendering of complex banking datasets.',
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
      ],
    },
    about: {
      tagline: 'The Person Behind the Pixels',
      title: 'Design roots. Engineering mind.',
      subtitle: 'Global perspective.',
      intro:
        "With a foundation in <strong class='text-stone-900 font-medium'>Graphic Design</strong> and a <strong class='text-stone-900 font-medium'>Master's in Learning Technology</strong>, I approach frontend development differently. I don't just implement designs; I understand the 'why' behind them. My journey from creative arts to rigorous engineering allows me to bridge the gap between design teams and developers.",
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
      tagline: 'Available for hire',
      titlePart1: "Let's create",
      titlePart2: 'impact.',
      subtitle:
        'Open for strategic partnerships, product leadership roles, and technical consulting.',
      startProject: 'Start a Project',
      linkedinProfile: 'LinkedIn Profile',
    },
    footer: {
      copyright: 'Shueny',
      allRightsReserved: 'All Rights Reserved',
      impressum: 'Impressum',
      privacyPolicy: 'Privacy Policy',
      designedWith: 'Designed with Gemini 2.5',
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
      checkOutLiveApp: 'Check out the live application to see the performance optimizations in action.',
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
      title3Suffix: 'Spezialist',
      subtitle:
        'Spezialisiert auf skalierbare Frontend-Architektur (React/Nx) und praktische KI-Integration für Geschäftsautomatisierung.',
      description:
        'Entwicklung skalierbarer Design-Systeme und KI-gestützter Anwendungen, die den Betriebsaufwand reduzieren und die Benutzerkonversion verbessern.',
      ctaPrimary: 'KI-Projekte ansehen',
      ctaSecondary: 'Beratung buchen',
      scroll: 'Scrollen',
    },
    services: {
      capabilities: 'Technische Lösungen',
      titlePart1: 'Engineering &',
      titlePart2: 'Strategie',
      subtitle:
        'Die richtigen Tools für jede Anforderung – von maßgeschneiderten Enterprise-Apps bis hin zu schnellen Marketing-Websites.',

      service1Title: 'Moderne Web-Applikationen',
      service1Desc:
        'Framework-agnostische Architektur mit React, Next.js, Vue 3 oder Nuxt. Entwicklung skalierbarer High-Performance-Anwendungen für komplexe Geschäftslogik.',

      service2Title: 'CMS & Rapid Deployment',
      service2Desc:
        'Effiziente Lösungen für Marketing-Websites mit WordPress oder Wix. Fokus auf kurze Markteinführungszeiten (Time-to-Market) und einfache Content-Pflege.',

      service3Title: 'KI & Workflow-Automation',
      service3Desc:
        'Integration von LLMs (OpenAI/Gemini) zur Automatisierung manueller Prozesse, Datenanalyse und Entwicklung intelligenter interner Tools.',

      service4Title: 'Mentoring & Optimierung',
      service4Desc:
        'Verbesserung der Codequalität durch Reviews, Refactoring von Legacy-Systemen und Etablierung von Best Practices zur Vermeidung technischer Schulden.',
    },
    techStack: {
      label: 'Technisches Toolkit',
      titlePart1: 'Technologien',
      titlePart2: '& Tools',
      subtitle:
        'Der Motor hinter der Strategie. Eine umfassende Liste der Werkzeuge, die ich für skalierbare Lösungen verwende.',
      categories: {
        frontendArch: 'Frontend & Architektur',
        aiBackend: 'KI-Engineering & Backend',
        qaDevops: 'QA & DevOps',
        growthDesign: 'Growth & Design',
      },
    },
    impact: {
      tagline: 'Nachgewiesene Erfolge',
      // 標題建議用 "Erfolgsbilanz" (成功記錄/業績) 或保留 "Impact Dashboard"
      // "Erfolgsbilanz" 對傳統德企很有吸引力
      titlePart1: 'Erfolgsbilanz &',
      titlePart2: 'Kennzahlen',

      subtitle:
        'Nachweisbare Erfolge aus meiner Arbeit für VicOne, Synttro und Citiesocial.',

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
        'Über zwei Jahrzehnte Erfahrung in der sich entwickelnden Landschaft der Web-Technologie. Von jQuery-Spaghetti-Code bis zu modernen React-Ökosystemen – ich habe Teams durch alles geführt.',
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
        'Eine Auswahl von Projekten, die kulturelle Anpassung, Geschäftsprozessautomatisierung und tiefe technische Fähigkeiten demonstrieren.',
      viewCaseStudy: 'Fallstudie ansehen',
      categories: {
        frontend: 'Frontend',
        fullstack: 'Full Stack',
        design: 'Design',
      },
      data: [
        {
          id: 'p1',
          title: 'Persönlicher KI-Deutschlehrer',
          description:
            'Ein sprachbasiertes Sprachsimulator, entwickelt zur Beschleunigung der kulturellen Integration in Deutschland. Nutzt OpenAIs Whisper und Gemini 2.0, um Echtzeit-Feedback zu Grammatik und Aussprache zu geben und die Lücke zwischen Lehrbuchtheorie und Alltagsrealität zu schließen.',
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
            'Ein intelligenter Finanzassistent, der manuelle Dateneingabe eliminiert. Nutzt Google Gemini für multimodale Beleganalyse und Supabase für sichere, Echtzeit-Gruppenzusammenarbeit über mehrere Währungen.',
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
          title: 'Intelligenter Arbeitsmarkt-Analysator',
          description:
            'Eine Full-Stack-Automatisierungspipeline, erstellt mit Python (FastAPI) und React. Orchestriert komplexes Prompt Engineering, um unstrukturierte Stellenbeschreibungen in strukturierte strategische Erkenntnisse zu transformieren und Gap-Analysen mit hoher Präzision durchzuführen.',
          problem:
            "Jobsuche ist ein Datenproblem, das als Dokumentproblem getarnt ist. Das Lesen von Hunderten unstrukturierter Stellenbeschreibungen erzeugt kognitive Überlastung und macht es schwierig, Qualifikationslücken objektiv zu quantifizieren (z.B. 'Fehlt mir React oder nur Next.js?'). Ich brauchte ein Tool, um das Signal im Rauschen zu finden.",
          solution:
            "Ich baute eine automatisierte ETL-Pipeline für Karrieredaten. Sie scraped oder akzeptiert JD-Text, nutzt Chain-of-Thought-Prompting, um Anforderungen zu durchdenken (unterscheidet 'Must-have' von 'Nice-to-have') und normalisiert die Ausgabe in ein standardisiertes JSON-Schema zur visuellen Vergleich mit meinem Lebenslauf.",
          techDeepDive:
            "Die technische Herausforderung war die Gewährleistung der Datenkonsistenz. Ich verwendete Pydantic-Modelle in FastAPI, um strenge Typvalidierung zwischen der KI-Ausgabe und dem Frontend durchzusetzen. Nutzte Few-Shot-Prompting, um Halluzinationen beim Extrahieren numerischer Erfahrungsanforderungen erheblich zu reduzieren.",
          features: [
            'Unstrukturiert-zu-strukturiert Datenpipeline',
            'Intelligente Gap-Analyse (Lebenslauf vs. JD)',
            'Asynchrones Python-Backend (FastAPI + Pydantic)',
            'React-Dashboard zur Qualifikationsvisualisierung',
          ],
        },
        {
          id: 'p4',
          title: 'Institutionelles Fintech-Dashboard',
          description:
            'Eine robuste Finanzvisualisierungsplattform, entwickelt für institutionelle Datentransparenz. Fokus auf strikte API-Vertragseinhaltung und High-Performance-Rendering komplexer Bankdatensätze.',
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
      ],
    },
    about: {
      tagline: 'Die Person hinter den Pixeln',
      title: 'Design-Wurzeln. Engineering-Verstand.',
      subtitle: 'Globale Perspektive.',
      intro:
        "Mit einem Hintergrund in <strong class='text-stone-900 font-medium'>Grafikdesign</strong> und einem <strong class='text-stone-900 font-medium'>Master in Learning Technology</strong> gehe ich Frontend-Entwicklung anders an. Ich setze Designs nicht nur um, ich verstehe das 'Warum' dahinter. Mein Weg von den kreativen Künsten zum strengen Engineering ermöglicht es mir, die Lücke zwischen Design-Teams und Entwicklern zu schließen.",
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
      tagline: 'Verfügbar für Aufträge',
      titlePart1: 'Lassen Sie uns',
      titlePart2: 'Wirkung erzielen.',
      subtitle:
        'Offen für strategische Partnerschaften, Produktleitungsrollen und technische Beratung.',
      startProject: 'Projekt starten',
      linkedinProfile: 'LinkedIn Profil',
    },
    footer: {
      copyright: 'Shueny',
      allRightsReserved: 'Alle Rechte vorbehalten',
      impressum: 'Impressum',
      privacyPolicy: 'Datenschutzerklärung',
      designedWith: 'Entworfen mit Gemini 2.5',
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
      checkOutLiveApp: 'Schauen Sie sich die Live-Anwendung an, um die Performance-Optimierungen in Aktion zu sehen.',
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
      title3Suffix: '專家',
      subtitle:
        '專注於可擴展的前端架構（React/Nx）和實用的 AI 整合以實現業務自動化。',
      description:
        '構建可擴展的設計系統和 AI 增強應用，減少運營開銷並提升用戶轉換率。',
      ctaPrimary: '查看 AI 專案',
      ctaSecondary: '預約諮詢',
      scroll: '向下滾動',
    },
    services: {
      capabilities: '技術解決方案',
      titlePart1: '工程與',
      titlePart2: '策略規劃',
      subtitle:
        '依據專案需求選擇最合適的工具——從高度客製化的企業級應用到快速上線的行銷網站。',

      service1Title: '現代化網頁應用開發',
      service1Desc:
        '跨框架的架構設計能力（React, Next.js, Vue 3, Nuxt）。專為複雜商業邏輯打造高可擴展性與高效能的應用程式。',

      service2Title: 'CMS 與快速部署方案',
      service2Desc:
        '針對形象官網與行銷活動，運用 WordPress 或 Wix 提供高性價比方案。強調快速上線，並賦能行銷團隊自行維護內容。',

      service3Title: 'AI 與工作流自動化',
      service3Desc:
        '整合 LLM (OpenAI/Gemini) 以自動化繁瑣的手動流程，從非結構化資料解析到建置智慧內部工具。',

      service4Title: '前端顧問與代碼優化',
      service4Desc:
        '透過代碼審查與重構舊系統來提升品質。協助團隊建立最佳實踐，在技術債累積前先行預防。',
    },
    techStack: {
      label: '技術工具箱',
      titlePart1: '核心技術',
      titlePart2: '與工具',
      subtitle:
        '支撐策略執行的技術引擎。構建可擴展解決方案所使用的完整工具列表。',
      categories: {
        frontendArch: '前端與架構',
        aiBackend: 'AI 工程與後端',
        qaDevops: 'QA 與 DevOps',
        growthDesign: '成長與設計',
      },
    },
    impact: {
      tagline: '實證成效',
      titlePart1: '成效數據',
      titlePart2: '儀表板',
      subtitle:
        '源自 VicOne, Synttro 與 Citiesocial 的實戰數據，以卓越工程技術創造可衡量的商業價值。',
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
        '超過二十年的網頁技術演進歷程。從 jQuery 的混亂代碼到現代 React 生態系統，我帶領團隊走過這一切。',
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
      subtitle: '精選專案展示文化適應、業務流程自動化和深厚的技術能力。',
      viewCaseStudy: '查看案例研究',
      categories: {
        frontend: '前端',
        fullstack: '全端',
        design: '設計',
      },
      data: [
        {
          id: 'p1',
          title: '專屬的AI德語教師',
          description:
            '專為加速在德國文化融入而設計的語音優先語言模擬器。運用 OpenAI 的 Whisper 和 Gemini 2.0，提供即時、情境感知的語法和發音回饋，彌合教科書理論與實際生活之間的差距。',
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
            '一個消除手動資料輸入的智慧財務助手。利用 Google Gemini 進行多模態收據解析，並使用 Supabase 進行安全、即時的多貨幣群組協作。',
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
          title: '智慧職場市場分析器',
          description:
            '使用 Python（FastAPI）和 React 建置的全端自動化管道。編排複雜的提示工程，將非結構化職位描述轉換為結構化策略洞察，以高精度執行差距分析。',
          problem:
            '求職是一個偽裝成文件問題的資料問題。閱讀數百個非結構化職位描述會造成認知超載，使得客觀量化技能差距變得困難（例如，「我缺少 React 還是只是 Next.js？」）。我需要一個工具來在噪音中找到信號。',
          solution:
            '我建立了一個用於職業資料的自動化 ETL 管道。它抓取或接受職位描述文字，利用 Chain-of-Thought 提示來推理需求（區分「必須具備」和「加分項」），並將輸出標準化為結構化 JSON 架構，以便與我的履歷進行視覺比較。',
          techDeepDive:
            '技術挑戰是確保資料一致性。我在 FastAPI 中使用 Pydantic 模型，在 AI 輸出和前端之間強制執行嚴格的類型驗證。使用少樣本提示來顯著減少提取數值經驗要求時的幻覺。',
          features: [
            '非結構化到結構化資料管道',
            '智慧差距分析（履歷 vs. 職位描述）',
            '非同步 Python 後端（FastAPI + Pydantic）',
            '用於技能視覺化的 React 儀表板',
          ],
        },
        {
          id: 'p4',
          title: '機構金融科技儀表板',
          description:
            '為機構資料清晰度而設計的穩健財務視覺化平台。專注於嚴格的 API 合約遵守和複雜銀行資料集的高效能渲染。',
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
      ],
    },
    about: {
      tagline: '像素背後的人',
      title: '設計的靈魂，工程的思維。',
      subtitle: '以及全球化的視野。',
      intro:
        "擁有 <strong class='text-stone-900 font-medium'>平面設計背景</strong> 與 <strong class='text-stone-900 font-medium'>數位學習科技碩士學位</strong>，這讓我能以獨特的視角切入前端開發。我不僅僅是實作設計稿，更深入理解設計背後的「為什麼」。從創意藝術到嚴謹工程的跨域歷程，讓我能有效連結設計與開發團隊。",
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
      tagline: '可接受委託',
      titlePart1: '讓我們創造',
      titlePart2: '影響力。',
      subtitle: '開放戰略合作夥伴關係、產品領導職位和技術諮詢。',
      startProject: '開始專案',
      linkedinProfile: 'LinkedIn 檔案',
    },
    footer: {
      copyright: 'Shueny',
      allRightsReserved: '版權所有',
      impressum: '法律聲明',
      privacyPolicy: '隱私政策',
      designedWith: '使用 Gemini 2.5 設計',
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
