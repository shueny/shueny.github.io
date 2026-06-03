import React, { useEffect, lazy, Suspense } from 'react';
import type { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// Code-split: only fetched when the Lucky Duck modal actually opens.
const LuckyDuckDemo = lazy(() => import('./LuckyDuck/LuckyDuckDemo'));

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  icon: React.ReactNode;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  icon,
}) => {
  const { t } = useLanguage();
  
  // Get translated category name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'frontend':
        return t.projects.categories.frontend;
      case 'fullstack':
        return t.projects.categories.fullstack;
      case 'design':
        return t.projects.categories.design;
      default:
        return category;
    }
  };
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl h-[100vh] sm:h-auto sm:max-h-[90vh] bg-[#FDFCF8] sm:rounded-2xl shadow-2xl overflow-y-auto flex flex-col animate-fade-in-up"
        style={{ animationDuration: '0.4s' }}
      >
        {/* Close Button (Sticky) */}
        <button
          onClick={onClose}
          className="fixed sm:absolute top-4 right-4 z-50 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-stone-100 transition-colors shadow-sm border border-stone-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-stone-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 1. Header Section */}
        <div className="bg-white px-8 pt-10 pb-8 border-b border-stone-100">
          <div className="max-w-4xl mx-auto">
            {/* Category & Icon */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-600">{icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {getCategoryName(project.category)}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-stone-900 mb-6 leading-tight">
              {project.title}
            </h2>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider rounded border border-stone-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live interactive prototype (Lucky Duck only) */}
        {project.id === 'p-lucky-duck' && (
          <div className="bg-stone-50 border-b border-stone-100 px-6 sm:px-12 py-10">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif italic font-bold text-stone-900 mb-2 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Live interactive prototype
              </h3>
              <p className="text-stone-600 mb-6">
                Click through the primary flow — create an account, claim a reward,
                and watch it land in your portfolio. Toggle the site theme for light &amp; dark.
              </p>
              <Suspense
                fallback={
                  <div className="h-[700px] flex items-center justify-center text-stone-400 text-sm">
                    Loading prototype…
                  </div>
                }
              >
                <LuckyDuckDemo />
              </Suspense>
            </div>
          </div>
        )}

        {/* 2. Main Content Grid */}
        <div className="flex-1 px-6 sm:px-12 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN: Narrative & Tech (Span 8) */}
            <div className="lg:col-span-8 space-y-12">
              {/* The Challenge */}
              {project.problem && (
                <div className="prose prose-stone max-w-none">
                  <h3 className="text-2xl font-serif italic font-bold text-stone-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1"></span>
                    {t.projectModal.theChallenge}
                  </h3>
                  <p className="text-lg text-stone-600 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* The Solution */}
              {project.solution && (
                <div className="prose prose-stone max-w-none">
                  <h3 className="text-2xl font-serif italic font-bold text-stone-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1"></span>
                    {t.projectModal.theSolution}
                  </h3>
                  <p className="text-lg text-stone-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Technical Architecture Block (Styled like Image 3) */}
              {project.techDeepDive && (
                <div className="mt-8 bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200/60 shadow-sm relative overflow-hidden">
                  {/* Decorative faint background code icon or pattern could go here */}
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      {t.projectModal.technicalArchitecture}
                    </h3>
                    <p className="text-stone-700 font-mono text-sm leading-7">
                      {project.techDeepDive}
                    </p>
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest pb-2 border-b border-stone-100">
                    {t.projectModal.visualOverview}
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {project.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg overflow-hidden border border-stone-200 shadow-md group"
                      >
                        <img
                          src={img}
                          alt={`${project.title} Screenshot ${idx + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar (Span 4) */}
            <div className="lg:col-span-4 space-y-10">
              {/* Key Features List */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6 border-b border-stone-200 pb-3">
                    {t.projectModal.keyFeatures}
                  </h3>
                  <ul className="space-y-4">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-stone-700"
                      >
                        {/* Orange Checkmark */}
                        <svg
                          className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm font-medium leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call to Action Card */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-lg shadow-stone-200/50 sticky top-8">
                <h4 className="font-bold text-stone-900 mb-2">
                  {t.projectModal.interestedInStack}
                </h4>
                <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                  {project.link
                    ? t.projectModal.checkOutLiveApp
                    : t.projectModal.liveDemoNote}
                </p>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-stone-900 text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    {t.projectModal.launchLiveApp}
                  </a>
                ) : (
                  <button className="block w-full text-center px-6 py-3 bg-white text-stone-900 border-2 border-stone-900 text-sm font-bold uppercase tracking-wider rounded hover:bg-stone-900 hover:text-white transition-all duration-300">
                    {t.projectModal.contactForDemo}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
