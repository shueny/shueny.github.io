import React, { useState } from 'react';
import { SectionId } from '../types';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../constants';
import ProjectModal from './ProjectModal';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSectionTitle from './ui/AnimatedSectionTitle';

// --- Helper Functions ---
const getProjectIcon = (id: string) => {
  switch (id) {
    case 'p1': // Voice/Tutor
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
          />
        </svg>
      );
    case 'p2': // Expense/Finance
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      );
    case 'p3': // Code/Tech
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 18"
          />
        </svg>
      );
    case 'p4': // F13/Fintech Institution
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
  }
};

// --- Sub-Component: ProjectCard ---
// Handles individual project rendering and image error state
interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (p: Project) => void;
  viewCaseStudyText: string;
}

// Enhanced Skeleton component for image loading with refined animation
const ImageSkeleton: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
      {/* Subtle pulse overlay */}
      <div className="absolute inset-0 bg-stone-50/50 animate-pulse-slow"></div>
      {/* Loading indicator dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-1.5">
          <div
            className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onClick,
  viewCaseStudyText,
}) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  // Use banner if available, otherwise fall back to image
  const bannerImage = project.banner || project.image;
  const showImage = bannerImage && !imgError;
  const icon = getProjectIcon(project.id);

  const handleImageLoad = () => {
    setImgLoading(false);
  };

  const handleImageError = () => {
    setImgError(true);
    setImgLoading(false);
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-orange-100 hover:border-accent/50 shadow-sm hover:shadow-2xl hover:shadow-orange-900/20 transition-all duration-500 ease-out transform hover:-translate-y-3 cursor-pointer h-full"
      onClick={() => onClick(project)}
      style={{
        transitionProperty: 'transform, box-shadow, border-color',
      }}
    >
      {/* Banner / Image Area */}
      <div className="h-56 bg-stone-100 relative overflow-hidden border-b border-stone-50">
        {showImage ? (
          <>
            {/* Skeleton loader while image is loading */}
            {imgLoading && <ImageSkeleton />}

            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img
              src={bannerImage}
              alt={`${project.title} banner`}
              width={800}
              height={450}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                imgLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
            {/* Number Badge Overlay with enhanced hover effect */}
            <div className="absolute top-4 left-4 z-20 transition-transform duration-500 group-hover:scale-110">
              <span className="flex items-center justify-center w-8 h-8 bg-white/95 backdrop-blur-md text-primary text-xs font-bold font-serif rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                0{index + 1}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Background Pattern Fallback */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-stone-200 text-center max-w-[90%] shadow-sm group-hover:scale-105 transition-transform duration-500">
                <span className="block text-accent mb-2">{icon}</span>
                <p className="text-[10px] md:text-xs font-mono text-secondary uppercase tracking-wider leading-relaxed">
                  {project.visualDescription}
                </p>
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute top-4 left-4">
              <span className="flex items-center justify-center w-8 h-8 bg-white text-primary text-xs font-bold font-serif rounded-full shadow-md">
                0{index + 1}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surfaceDark text-accent text-[10px] font-bold uppercase tracking-wider rounded border border-orange-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title with enhanced hover effect */}
        <h3 className="text-xl font-bold text-primary mb-4 font-serif leading-tight group-hover:text-accent transition-colors duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed mb-8 font-light flex-grow">
          {project.description}
        </p>

        {/* CTA with enhanced micro-interactions */}
        <div
          className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClick(project);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-all duration-300 group/btn hover:gap-3 cursor-pointer relative z-10 pointer-events-auto"
          >
            {viewCaseStudyText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 transform transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          {/* Category Indicator with subtle hover effect */}
          <span className="text-[10px] font-mono text-stone-400 capitalize transition-colors duration-300 group-hover:text-stone-500">
            {project.category === 'frontend' 
              ? t.projects.categories.frontend
              : project.category === 'fullstack'
              ? t.projects.categories.fullstack
              : project.category === 'design'
              ? t.projects.categories.design
              : project.category}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Container ---
const ProjectsGrid: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Merge translated project data with static data (images, links, etc.)
  const projects = t.projects.data.map((translatedProject) => {
    const staticData = PROJECTS_DATA.find((p) => p.id === translatedProject.id);
    if (!staticData) return null;
    
    return {
      ...staticData,
      title: translatedProject.title,
      description: translatedProject.description,
      problem: translatedProject.problem,
      solution: translatedProject.solution,
      techDeepDive: translatedProject.techDeepDive,
      features: translatedProject.features,
      category: staticData.category, // Keep original category for display
    } as Project;
  }).filter((p): p is Project => p !== null);

  const totalProjects = projects.length;
  const maxIndex = Math.max(0, totalProjects - visibleCount);

  // Handle responsive visible count
  React.useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        // xl and above
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        // md to lg
        setVisibleCount(2);
      } else {
        // mobile
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Reset index when visible count changes
  React.useEffect(() => {
    const newMaxIndex = Math.max(0, totalProjects - visibleCount);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [visibleCount, totalProjects, currentIndex]);

  const goToIndex = (index: number) => {
    if (!totalProjects) return;
    const clamped = Math.min(Math.max(index, 0), maxIndex);
    setCurrentIndex(clamped);
  };

  const handlePrev = () => goToIndex(currentIndex - 1);
  const handleNext = () => goToIndex(currentIndex + 1);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  return (
    <section id={SectionId.PROJECTS} className="py-24 bg-surface relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-accent"></span>
            <span className="text-accent uppercase tracking-widest text-xs font-bold">
              {t.projects.label}
            </span>
          </div>
          <AnimatedSectionTitle
            textMain={t.projects.titlePart1}
            textAccent={t.projects.titlePart2}
            accentClassName="font-serif italic text-accent"
            strokeColor="rgba(255, 255, 255, 0.18)"
            className="mb-6"
          />
          <p className="text-secondary text-lg font-light leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Slider Controls */}
        {totalProjects > visibleCount && (
          <div className="mb-6 flex justify-end">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                disabled={isPrevDisabled}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors ${
                  isPrevDisabled
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-accent hover:text-white cursor-pointer'
                }`}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                disabled={isNextDisabled}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors ${
                  isNextDisabled
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-accent hover:text-white cursor-pointer'
                }`}
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Slider window: responsive card count */}
        <div className="relative overflow-hidden -mx-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="shrink-0 basis-full md:basis-1/2 xl:basis-1/3 px-4"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={setSelectedProject}
                  viewCaseStudyText={t.projects.viewCaseStudy}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Integration */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          icon={getProjectIcon(selectedProject.id)}
        />
      )}
    </section>
  );
};

export default ProjectsGrid;
