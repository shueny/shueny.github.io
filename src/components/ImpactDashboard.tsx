import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // 👈 確保這行有正確引入

const ImpactDashboard: React.FC = () => {
  const { t } = useLanguage();

  // 將多語系資料映射為陣列，方便在下方用 .map 渲染
  // 這樣寫法可以確保 Type 安全，且讓 JSX 保持乾淨
  const metrics = [
    {
      value: t.impact.impact1Value, // e.g., "50%"
      label: t.impact.impact1Title, // e.g., "Faster Time-to-Market"
      subtext: t.impact.impact1Tag, // e.g., "AUTOMATED QA PIPELINES"
      description: t.impact.impact1Desc, // 詳細說明
    },
    {
      value: t.impact.impact2Value, // e.g., "30%"
      label: t.impact.impact2Title, // e.g., "Performance Boost"
      subtext: t.impact.impact2Tag, // e.g., "MODULAR ARCHITECTURE"
      description: t.impact.impact2Desc,
    },
    {
      value: t.impact.impact3Value, // e.g., "40%"
      label: t.impact.impact3Title, // e.g., "Conversion Uplift"
      subtext: t.impact.impact3Tag, // e.g., "DATA-DRIVEN UX STRATEGY"
      description: t.impact.impact3Desc,
    },
  ];

  return (
    <section className="bg-[#1a1918] py-24 border-t border-stone-800">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-accent"></span>
              <span className="text-accent uppercase tracking-widest text-xs font-bold">
                {t.impact.tagline}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-0 leading-tight">
              {t.impact.titlePart1}{' '}
              <span className="font-serif italic text-accent">
                {t.impact.titlePart2}
              </span>
            </h2>
          </div>

          {/* Context Line: 增加信任感的小字 */}
          <p className="text-stone-400 text-lg font-light max-w-md text-left md:text-right leading-relaxed">
            {t.impact.subtitle}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {metrics.map((metric, index) => (
            <div key={index} className="px-4 py-12 md:px-8 text-center group">
              {/* Value Number (使用與原本一致的字體樣式) */}
              <div
                className={`text-7xl md:text-8xl font-black font-sans tracking-tight text-transparent bg-clip-text mb-6 transition-all duration-500 ${
                  index === 2
                    ? 'bg-gradient-to-b from-orange-400 to-orange-600 group-hover:from-orange-300 group-hover:to-orange-500'
                    : 'bg-gradient-to-b from-white to-stone-600 group-hover:to-orange-500'
                }`}
              >
                {metric.value}
              </div>

              {/* Business Value Title - 固定高度確保對齊 */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 min-h-[3.5rem] flex items-center justify-center">
                {metric.label}
              </h3>

              {/* Tech Methodology Tag (橘色膠囊樣式) - 固定高度確保對齊 */}
              <div className="flex justify-center mb-6 min-h-[2rem]">
                <div className="inline-flex items-center px-3 py-1 border border-stone-700 rounded-full bg-stone-900/50">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase">
                    {metric.subtext}
                  </span>
                </div>
              </div>

              {/* Detailed Description (滑鼠移過去會更亮) */}
              <p className="text-stone-500 text-sm max-w-xs mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactDashboard;
