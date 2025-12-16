import React, { useEffect } from 'react';
import type { Project } from '../types';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col animate-fade-in-up"
        style={{ animationDuration: '0.4s' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-stone-500"
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

        {/* Header / Hero */}
        <div className="bg-surface p-8 sm:p-12 border-b border-orange-100 relative overflow-hidden">
          {/* Decorative BG */}
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-accent">
              {icon}
              <span className="text-xs font-bold uppercase tracking-widest">
                {project.category}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-primary mb-4 leading-tight">
              {project.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white text-stone-600 text-xs font-bold uppercase tracking-wider rounded border border-orange-100 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content (Left 2 cols) */}
          <div className="md:col-span-2 space-y-10">
            {/* The Challenge */}
            <div className="prose prose-stone">
              <h3 className="text-xl font-bold text-primary font-serif italic mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></span>
                The Challenge
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {project.problem || project.description}
              </p>
            </div>

            {/* The Solution */}
            <div className="prose prose-stone">
              <h3 className="text-xl font-bold text-primary font-serif italic mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></span>
                The Solution
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {project.solution || 'Solution details currently under NDA.'}
              </p>
            </div>

            {/* Gallery / Screenshots */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                  Visual Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={img}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Deep Dive */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                Technical Architecture
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-mono">
                {project.techDeepDive || 'Technical architecture details.'}
              </p>
            </div>
          </div>

          {/* Sidebar (Right 1 col) */}
          <div className="space-y-8">
            {/* Key Features */}
            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features?.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-stone-700"
                  >
                    <svg
                      className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0"
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
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visuals Note */}
            {!project.link && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <p className="text-xs text-orange-800 font-medium text-center">
                  Live demo available upon request due to API costs.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-8 py-6 border-t border-stone-200 flex justify-end gap-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-stone-500 hover:text-stone-800 transition-colors"
          >
            Close
          </button>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-accent text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              Launch Live App
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <button className="px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors shadow-lg shadow-stone-300">
              Contact for Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
