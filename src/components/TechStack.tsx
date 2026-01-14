import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SectionId } from '@/types';

// 定義技能資料結構 (若不需多語系切換技能名稱，直接寫在這裡最快)
// 包含了從您簡歷和 V1 中提取的所有關鍵字
// 注意：分類標題現在從翻譯文件中獲取
const getSkillCategories = (t: any) => [
  {
    id: 'frontend_arch',
    title: t.techStack.categories.frontendArch, // 強調架構能力
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Vue.js',
      'Nuxt 3',
      'Nx (Monorepo)',
      'Micro-frontends',
      'Tailwind CSS',
      'Sass',
      'Storybook',
    ],
  },
  {
    id: 'ai_backend',
    title: t.techStack.categories.aiBackend, // 強調 AI 整合
    skills: [
      'OpenAI API (Azure)',
      'Gemini API',
      'Prompt Engineering',
      'Python',
      'Node.js',
      'Supabase',
      'Edge Functions',
      'Wagtail CMS',
      'GraphQL',
      'NLP Parsing',
    ],
  },
  {
    id: 'quality_devops',
    title: t.techStack.categories.qaDevops, // 強調自動化測試與流程
    skills: [
      'Cypress',
      'Playwright',
      'Vitest',
      'Jest',
      'Puppeteer',
      'GitHub Actions',
      'CI/CD',
      'TestRail',
      'Webpack',
      'Vite',
    ],
  },
  {
    id: 'growth_design',
    title: t.techStack.categories.growthDesign, // 強調商業價值與設計背景
    skills: [
      'Figma',
      'Shopify',
      'GA4 / GTM',
      'SEO / Core Web Vitals',
      'Hotjar',
      'Accessibility (a11y)',
      'Adobe XD',
      'Design Systems',
      'UI/UX',
    ],
  },
];

const TechStack: React.FC = () => {
  const { t } = useLanguage();
  const SKILL_CATEGORIES = getSkillCategories(t);

  return (
    // 背景色與 Services 保持一致或微調，這裡用 bg-[#FDFCF8] 營造層次
    <section
      id={SectionId.SKILLS}
      className="py-24 bg-[#FDFCF8] border-b border-orange-100/50"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header - 完全對齊 Services/Impact 的樣式規範 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Tagline with Line Decoration */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-accent"></span>
              <span className="text-accent uppercase tracking-widest text-xs font-bold">
                {t.techStack.label}
              </span>
            </div>

            {/* Main Title with Serif Italic Accent */}
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-primary mb-6 leading-tight">
              {t.techStack.titlePart1}{' '}
              <span className="font-serif italic text-accent">
                {t.techStack.titlePart2}
              </span>
            </h2>
          </div>

          {/* Subtitle / Description - 對齊右側或下方，增加層次 */}
          <p className="text-secondary text-lg font-light leading-relaxed max-w-md text-left md:text-right">
            {t.techStack.subtitle}
          </p>
        </div>

        {/* Skills Grid - 極簡列表風格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-t border-orange-100 pt-12">
          {SKILL_CATEGORIES.map((category: any) => (
            <div key={category.id} className="group">
              {/* Category Title with Serif Font */}
              <h3 className="text-xl font-serif font-bold text-primary mb-6 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {category.title}
              </h3>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-y-3 gap-x-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="
                      inline-block text-sm text-secondary px-3 py-1.5 
                      bg-white border border-stone-200 rounded-md
                      transition-all duration-300
                      hover:border-orange-300 hover:text-accent hover:shadow-sm hover:-translate-y-0.5
                      cursor-default
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
