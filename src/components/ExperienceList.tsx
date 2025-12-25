import React, { useState } from 'react';
import { SectionId } from '../types';
import SkillsChart from './SkillsChart';
import { useLanguage } from '../contexts/LanguageContext';

const ExperienceList: React.FC = () => {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Use translated experience data
  const experienceData = t.experience.items;

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const INITIAL_ACHIEVEMENTS_COUNT = 2;

  return (
    <section id={SectionId.EXPERIENCE} className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-surface to-white"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Header & Chart Area */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-primary mb-8 tracking-tight">
                {t.experience.titlePart1}
                <br />
                <span className="font-serif italic text-accent">
                  {t.experience.titlePart2}
                </span>
              </h2>
              <p className="text-secondary mb-12 leading-relaxed font-light text-lg">
                {t.experience.description}
              </p>
              <div className="transform hover:scale-[1.02] transition-transform duration-500">
                <SkillsChart />
              </div>
            </div>
          </div>

          {/* Timeline List */}
          <div className="lg:col-span-7 space-y-0 pt-8">
            {experienceData.map((exp) => {
              const isExpanded = expandedItems.has(exp.id);
              const hasMoreAchievements =
                exp.achievements.length > INITIAL_ACHIEVEMENTS_COUNT;
              const visibleAchievements = isExpanded
                ? exp.achievements
                : exp.achievements.slice(0, INITIAL_ACHIEVEMENTS_COUNT);

              return (
                <div
                  key={exp.id}
                  className="group relative border-l border-stone-200 pl-10 pb-20 last:pb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[6px] top-2.5 w-3 h-3 bg-white border-2 border-stone-300 rounded-full group-hover:border-accent group-hover:bg-accent transition-colors duration-300"></div>

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-sm text-stone-400 bg-stone-50 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xl font-serif text-secondary mb-6 italic">
                    {exp.company}
                  </p>
                  <p className="text-secondary mb-8 leading-relaxed max-w-xl">
                    {exp.description}
                  </p>

                  <div className="bg-surface p-6 border border-orange-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-accent">
                        {t.experience.keyAchievements}
                      </p>
                      {hasMoreAchievements && (
                        <button
                          onClick={() => toggleExpanded(exp.id)}
                          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 group/btn ${
                            isExpanded
                              ? 'border-accent bg-accent text-white'
                              : 'border-stone-300 text-stone-600 hover:border-accent hover:bg-accent hover:text-white'
                          }`}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          aria-expanded={isExpanded}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isExpanded ? 'rotate-45' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <ul className="space-y-4">
                        {exp.achievements.map((ach, i) => {
                          const isVisible =
                            i < INITIAL_ACHIEVEMENTS_COUNT || isExpanded;
                          const isNewlyExpanded =
                            isExpanded && i >= INITIAL_ACHIEVEMENTS_COUNT;

                          if (!isVisible) return null;

                          return (
                            <li
                              key={i}
                              className={`flex items-start text-sm text-secondary ${
                                isNewlyExpanded ? 'animate-fade-in-up' : ''
                              }`}
                              style={{
                                animationDelay: isNewlyExpanded
                                  ? `${
                                      (i - INITIAL_ACHIEVEMENTS_COUNT) * 0.08
                                    }s`
                                  : '0s',
                              }}
                            >
                              <span className="mr-3 text-accent mt-1 flex-shrink-0">
                                ✦
                              </span>
                              <span>{ach}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceList;
