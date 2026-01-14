import React from 'react';
import { SectionId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSectionTitle from './ui/AnimatedSectionTitle';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    // 使用與截圖一致的米色背景 bg-[#FDFCF8]
    <section
      id={SectionId.ABOUT}
      className="py-24 bg-[#FDFCF8] border-b border-orange-100"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* --- 1. Header (完全還原 image_f9068d.png 風格) --- */}
        <div className="max-w-4xl mb-20">
          <span className="text-orange-600 uppercase tracking-widest text-xs font-bold block mb-4">
            {t.about.tagline}
          </span>
          <AnimatedSectionTitle
            textMain={t.about.title}
            textAccent={t.about.subtitle}
            accentClassName="font-serif italic text-orange-600"
            accentColor="rgb(234, 88, 12)"
            strokeColor="rgba(255, 255, 255, 0.18)"
            className="mb-8"
          />
          {/* Intro 文字，支援 HTML 粗體顯示 */}
          <p
            className="text-stone-600 text-lg md:text-xl font-light leading-relaxed [&>strong]:font-medium [&>strong]:text-stone-900"
            dangerouslySetInnerHTML={{ __html: t.about.intro }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* --- 2. Education (加入論文與專題) --- */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-10 flex items-center">
              <span className="w-8 h-[2px] bg-orange-500 mr-4"></span>
              {t.about.educationTitle}
            </h3>
            <div className="space-y-12">
              {t.about.education.map((edu, idx) => (
                <div key={idx} className="group">
                  <h4 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-stone-500 font-serif italic mb-3 text-lg">
                    {edu.school}
                  </p>

                  {/* 年份 Badge：保持原本的小巧風格 */}
                  <div className="mb-4">
                    <span className="text-xs font-mono text-stone-400 bg-white inline-block px-2 py-1 rounded border border-orange-100">
                      {edu.year}
                    </span>
                  </div>

                  {/* 新增：論文/專題描述 (灰色文字，關鍵字加深) */}
                  <p
                    className="text-sm text-stone-600 leading-relaxed border-l-2 border-stone-100 pl-4 [&>strong]:text-stone-900 [&>strong]:font-medium"
                    dangerouslySetInnerHTML={{ __html: edu.desc }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- 3. Global Footprint (還原左側線條設計) --- */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-10 flex items-center">
              <span className="w-8 h-[2px] bg-orange-500 mr-4"></span>
              {t.about.globalTitle}
            </h3>
            <div className="space-y-10">
              {t.about.global.map((exp, idx) => (
                <div
                  key={idx}
                  className={`relative pl-6 border-l-2 transition-all duration-300
                    ${
                      exp.highlight
                        ? 'border-orange-500' // Highlight 項目 (獎項) 使用橘色線條
                        : 'border-stone-200 hover:border-orange-300' // 一般項目維持灰色，Hover 變色
                    }`}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h4
                      className={`text-lg font-bold ${
                        exp.highlight ? 'text-orange-600' : 'text-stone-900'
                      }`}
                    >
                      {/* 如果有 Icon 就顯示，放在標題旁 */}
                      {exp.icon && (
                        <span className="mr-2 inline-block">{exp.icon}</span>
                      )}
                      {exp.title}
                    </h4>
                    <span className="text-xs font-mono text-stone-400 whitespace-nowrap ml-2">
                      {exp.year}
                    </span>
                  </div>

                  {/* Role & Location */}
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">
                    {exp.role}
                    {exp.location && (
                      <span className="text-stone-300 mx-2">|</span>
                    )}
                    {exp.location}
                  </p>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
