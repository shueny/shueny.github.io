export interface SalaryData {
  role: string;
  min: number;
  max: number;
  currency: string;
  location?: string;
  experience?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
  banner?: string; // Banner image for project card
  gallery?: string[]; // Array of screenshot URLs
  category: 'frontend' | 'fullstack' | 'design';
  visualDescription?: string;
  // Case Study Specifics
  problem?: string;
  solution?: string;
  features?: string[];
  techDeepDive?: string; // Technical implementation details
  salaryData?: SalaryData[]; // Salary information for job market analyzer
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface SpecialExperience {
  title: string;
  location?: string;
  year: string;
  description: string;
  achievements?: string[]; // Added optional achievements for consistency if needed
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HERO = 'hero',
  SERVICES = 'services',
  SKILLS = 'skills',
  IMPACT = 'impact',
  PROJECTS = 'projects',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  CONTACT = 'contact',
  ANALYSIS = 'analysis',
}

export interface NavLink {
  title: string;
  href: string;
}

export interface NavMenuItem {
  title: string;
  href: string;
  description: string;
  image: string | ImageMetadata;
  launched?: boolean;
  disabled?: boolean;
  forceReload?: boolean;
}

export interface NavMenuGroup {
  title: string;
  items: NavMenuItem[];
}

export interface NavMenuConfig {
  links: NavLink[];
  pagesNav?: NavMenuGroup[];
  examplesNav?: NavMenuGroup[];
}

// For Astro image imports
export interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
  desc: string; // 支援 HTML 字串
}

export interface GlobalExperienceItem {
  title: string;
  role: string;
  year: string;
  location?: string;
  desc: string;
  icon?: string; // e.g., "🏆", "🌎"
  highlight?: boolean; // 用來標記 TrendMicro 這種重要獎項
}

export interface AboutSection {
  title: string;
  subtitle: string;
  intro: string; // 支援 HTML
  educationTitle: string;
  globalTitle: string;
  education: EducationItem[];
  global: GlobalExperienceItem[];
}

// Re-export types from types/index.d.ts
// Note: NavMenuConfig is excluded as it's already defined in this file with a different structure
export type {
  NavItem,
  MenuItem,
  MainNavItem,
  SidebarNavItem,
  SiteConfig,
  DocsConfig,
  FedConfig,
  MarketingConfig,
  DashboardConfig,
  SubscriptionPlan,
  Airing,
  Media,
  InfoList,
  InfoLdg,
} from '@/types/index';
