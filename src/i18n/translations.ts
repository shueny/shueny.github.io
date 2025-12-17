// Use const to make it available at runtime
export const LANGUAGES = ['EN', 'DE', '繁'] as const;
export type Language = (typeof LANGUAGES)[number];

export interface Translations {
  nav: {
    work: string;
    services: string;
    about: string;
    experience: string;
    contact: string;
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
    title: string;
    service1Title: string;
    service1Desc: string;
    service2Title: string;
    service2Desc: string;
    service3Title: string;
    service3Desc: string;
    service4Title: string;
    service4Desc: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewCaseStudy: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
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
      capabilities: 'Capabilities',
      title: 'Core Competencies',
      service1Title: 'AI & Automation Integration',
      service1Desc:
        'Integrating LLMs (OpenAI/Gemini) into internal tools to automate document parsing and data extraction workflows.',
      service2Title: 'Scalable Web Development',
      service2Desc:
        'Developing type-safe, maintainable web applications using Next.js, TypeScript, and Nx monorepos.',
      service3Title: 'Frontend Architecture & Mentoring',
      service3Desc:
        'Establishing engineering best practices, conducting code reviews, and guiding teams through legacy migrations.',
      service4Title: 'Design-to-Code Implementation',
      service4Desc:
        'Translating Figma designs into responsive, interactive components with strict adherence to design systems.',
    },
    projects: {
      sectionTitle: 'AI & Web Solutions',
      sectionSubtitle:
        'A selection of projects demonstrating cultural adaptation, business process automation, and deep technical capabilities.',
      viewCaseStudy: 'View Case Study',
    },
    about: {
      title: 'About Me',
      description:
        'Frontend Engineer with expertise in React, TypeScript, and AI integration.',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Let's discuss your next project",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message',
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
      capabilities: 'Fähigkeiten',
      title: 'Kernkompetenzen',
      service1Title: 'KI & Automatisierungsintegration',
      service1Desc:
        'Integration von LLMs (OpenAI/Gemini) in interne Tools zur Automatisierung von Dokumenten-Parsing und Datenextraktion.',
      service2Title: 'Skalierbare Webentwicklung',
      service2Desc:
        'Entwicklung typsicherer, wartbarer Webanwendungen mit Next.js, TypeScript und Nx Monorepos.',
      service3Title: 'Frontend-Architektur & Mentoring',
      service3Desc:
        'Etablierung von Engineering-Best-Practices, Code-Reviews und Begleitung von Teams bei Legacy-Migrationen.',
      service4Title: 'Design-zu-Code-Implementierung',
      service4Desc:
        'Übersetzung von Figma-Designs in responsive, interaktive Komponenten mit strenger Einhaltung von Design-Systemen.',
    },
    projects: {
      sectionTitle: 'KI & Web-Lösungen',
      sectionSubtitle:
        'Eine Auswahl von Projekten, die kulturelle Anpassung, Geschäftsprozessautomatisierung und tiefe technische Fähigkeiten demonstrieren.',
      viewCaseStudy: 'Fallstudie ansehen',
    },
    about: {
      title: 'Über mich',
      description:
        'Frontend-Ingenieur mit Expertise in React, TypeScript und KI-Integration.',
    },
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Lassen Sie uns über Ihr nächstes Projekt sprechen',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'Ihre E-Mail',
      messagePlaceholder: 'Ihre Nachricht',
      sendButton: 'Nachricht senden',
    },
    common: {
      downloadResume: 'Lebenslauf herunterladen',
      changeLanguage: 'Sprache ändern',
    },
  },
  繁: {
    nav: {
      work: '作品',
      services: '服務',
      about: '關於',
      experience: '經歷',
      contact: '聯絡',
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
      capabilities: '專業能力',
      title: '核心競爭力',
      service1Title: 'AI 與自動化整合',
      service1Desc:
        '將大型語言模型（OpenAI/Gemini）整合到內部工具中，自動化文件解析和資料提取工作流程。',
      service2Title: '可擴展的 Web 開發',
      service2Desc:
        '使用 Next.js、TypeScript 和 Nx monorepos 開發類型安全、可維護的 Web 應用程式。',
      service3Title: '前端架構與指導',
      service3Desc:
        '建立工程最佳實踐、進行程式碼審查，並引導團隊完成舊系統遷移。',
      service4Title: '設計到程式碼的實現',
      service4Desc: '將 Figma 設計轉換為響應式、互動式元件，嚴格遵循設計系統。',
    },
    projects: {
      sectionTitle: 'AI 與 Web 解決方案',
      sectionSubtitle: '精選專案展示文化適應、業務流程自動化和深厚的技術能力。',
      viewCaseStudy: '查看案例研究',
    },
    about: {
      title: '關於我',
      description: '前端工程師，專精於 React、TypeScript 和 AI 整合。',
    },
    contact: {
      title: '聯絡我',
      subtitle: '讓我們討論您的下一個專案',
      namePlaceholder: '您的姓名',
      emailPlaceholder: '您的電子郵件',
      messagePlaceholder: '您的訊息',
      sendButton: '發送訊息',
    },
    common: {
      downloadResume: '下載履歷',
      changeLanguage: '切換語言',
    },
  },
};
