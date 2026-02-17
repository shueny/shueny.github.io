import React from 'react';
import { SectionId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id={SectionId.HERO}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-surface pt-24 pb-32 md:pb-12 snap-center"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full border border-orange-200/40 opacity-60 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-orange-100/30 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
        {/* Intro Tag */}
        <div
          className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-10 animate-fade-in-up"
          style={{ animationDelay: '0s' }}
        >
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent"></span>
          </span>
          <span
            className="uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs font-bold leading-tight"
            style={{ color: 'hsl(var(--accent))' }}
          >
            <span className="hidden sm:inline">{t.hero.location}</span>
            <span className="inline sm:hidden">{t.hero.locationMobile}</span>
          </span>
        </div>

        {/* Macro Typography */}
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] leading-[0.95] sm:leading-[0.9] font-bold text-primary tracking-tighter font-sans mix-blend-multiply">
            <span
              className="block animate-fade-in-up font-extrabold"
              style={{ animationDelay: '0.15s' }}
            >
              {t.hero.title1}
            </span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-stone-500 via-stone-400 to-stone-500 animate-fade-in-up font-bold mt-1 sm:mt-2"
              style={{ animationDelay: '0.3s' }}
            >
              {t.hero.title2}
            </span>
            <span
              className="block animate-fade-in-up font-extrabold mt-1 sm:mt-2"
              style={{
                animationDelay: '0.45s',
                color: 'hsl(var(--accent))',
              }}
            >
              {t.hero.title3}{' '}
              <span className="font-serif italic font-normal text-primary">
                {t.hero.title3Suffix}
              </span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8 md:gap-12 border-t border-orange-200/60 pt-8 sm:pt-10 md:pt-12">
          {/* Quote section */}
          <div
            className="w-full md:w-1/2 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary font-sans leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>
          </div>

          {/* CTA section */}
          <div
            className="w-full md:w-1/3 space-y-6 sm:space-y-8 animate-fade-in-up"
            style={{ animationDelay: '0.75s' }}
          >
            <p className="text-xs sm:text-sm md:text-base text-secondary leading-6 sm:leading-7 md:leading-8 font-light">
              {t.hero.description}
            </p>

            {/* 👇 重點修改：按鈕容器的 Flex 邏輯 👇 */}
            {/* 邏輯：手機(col) -> 平板(row) -> 筆電1250px(col) -> 大螢幕(row) */}
            <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-3 sm:gap-4 w-full">
              {/* Primary CTA */}
              <a
                href={`#${SectionId.PROJECTS}`}
                // 👇 重點修改：按鈕寬度的響應式邏輯 (配合容器方向)
                className="group relative w-full sm:w-auto md:w-full xl:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-white text-xs sm:text-sm font-bold uppercase tracking-wider overflow-hidden shadow-lg shadow-orange-500/30 rounded-full text-center flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
                style={{ backgroundColor: 'hsl(var(--accent))' }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {t.hero.ctaPrimary}
                </span>
                <div className="absolute inset-0 bg-stone-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </a>

              {/* Secondary CTA */}
              <a
                href="https://calendly.com/shuenyw/30min"
                target="_blank"
                rel="noopener noreferrer"
                // 👇 重點修改：按鈕寬度的響應式邏輯
                className="w-full sm:w-auto md:w-full xl:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-stone-300 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 rounded-full text-center flex justify-center items-center bg-white hover:scale-105"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 items-center animate-float opacity-60 hidden md:flex flex-col">
        <span
          className="text-[10px] uppercase tracking-widest mb-2 font-bold"
          style={{ color: 'hsl(var(--accent))' }}
        >
          {t.hero.scroll}
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
