import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { SectionId } from '../types';
import type { Project, ProjectDomain } from '../types';
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
    case 'p-tomato': // Pomodoro timer / clock
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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      );
    case 'p-lucky-duck': // Rewards / gift
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
            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-18a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75Z"
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

const getCategoryLabel = (
  category: Project['category'],
  labels: { frontend: string; fullstack: string; design: string },
) => labels[category] ?? category;

/** Tiny template helper: fill("{a} of {b}", { a: 1, b: 2 }) */
const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));

// --- Sub-Component: ProjectCard ---
// Handles individual project rendering and image error state
interface ProjectCardProps {
  project: Project;
  index: number; // stable position in the full list (used for the "0N" badge)
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
  const imgRef = React.useRef<HTMLImageElement>(null);
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

  // With client:visible hydration the browser often finishes loading the
  // server-rendered <img> before React attaches onLoad, so the event never
  // fires and the skeleton sticks. Sync from the DOM state on mount.
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth > 0) {
        setImgLoading(false);
      } else {
        setImgError(true);
        setImgLoading(false);
      }
    }
  }, []);

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
              ref={imgRef}
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
          className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClick(project);
            }}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-all duration-300 group/btn hover:gap-3 cursor-pointer relative z-10 pointer-events-auto"
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

          {/* Domain · Category indicator — tells a client at a glance who this was for */}
          <span className="flex min-w-0 flex-col items-end text-right text-[10px] leading-snug font-mono text-stone-400 transition-colors duration-300 group-hover:text-stone-500">
            {project.domains[0] && (
              <span className="whitespace-nowrap text-accent/80">
                {t.projects.domains[project.domains[0]]}
              </span>
            )}
            <span className="whitespace-nowrap">
              {getCategoryLabel(project.category, t.projects.categories)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Container ---
const DOMAIN_ORDER: ProjectDomain[] = ['ai', 'fintech', 'enterprise', 'data', 'consumer', 'mvp'];

const SWIPE_THRESHOLD_PX = 48;

const ProjectsGrid: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeDomain, setActiveDomain] = useState<ProjectDomain | 'all'>('all');
  const [query, setQuery] = useState('');
  const touchStartX = useRef<number | null>(null);

  // Merge translated project data with static data (images, links, etc.)
  const allProjects = useMemo(
    () =>
      t.projects.data
        .map((translatedProject) => {
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
        })
        .filter((p): p is Project => p !== null),
    [t],
  );

  // Only offer domain chips that actually have projects behind them
  const availableDomains = useMemo(
    () => DOMAIN_ORDER.filter((d) => allProjects.some((p) => p.domains.includes(d))),
    [allProjects],
  );

  // --- Search + filter ---
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    return allProjects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => {
        if (activeDomain !== 'all' && !project.domains.includes(activeDomain)) return false;
        if (!normalizedQuery) return true;
        const haystack = [
          project.title,
          project.description,
          ...project.tags,
          getCategoryLabel(project.category, t.projects.categories),
          ...project.domains.map((d) => t.projects.domains[d]),
        ]
          .join(' ')
          .toLowerCase();
        return normalizedQuery
          .split(/\s+/)
          .every((term) => haystack.includes(term));
      });
  }, [allProjects, activeDomain, normalizedQuery, t]);

  const totalProjects = filtered.length;
  const maxIndex = Math.max(0, totalProjects - visibleCount);
  const isFiltered = activeDomain !== 'all' || normalizedQuery.length > 0;

  // Page stops: 0, v, 2v, … clamped so the last page is always full
  const pageStops = useMemo(() => {
    if (totalProjects <= visibleCount) return [0];
    const stops: number[] = [];
    for (let i = 0; i < totalProjects; i += visibleCount) {
      stops.push(Math.min(i, maxIndex));
    }
    return Array.from(new Set(stops));
  }, [totalProjects, visibleCount, maxIndex]);

  const currentPage = useMemo(() => {
    // The page whose stop is closest to (and not after) the current index
    let page = 0;
    pageStops.forEach((stop, i) => {
      if (stop <= currentIndex) page = i;
    });
    return page;
  }, [pageStops, currentIndex]);

  // Handle responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3); // xl and above
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2); // md to lg
      } else {
        setVisibleCount(1); // mobile
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Keep the index valid when the visible count or the result set changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Any change to the filters rewinds to the first page
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeDomain, normalizedQuery]);

  const goToIndex = useCallback(
    (index: number) => {
      if (!totalProjects) return;
      setCurrentIndex(Math.min(Math.max(index, 0), maxIndex));
    },
    [totalProjects, maxIndex],
  );

  const goToPage = (page: number) => {
    const clampedPage = Math.min(Math.max(page, 0), pageStops.length - 1);
    goToIndex(pageStops[clampedPage]);
  };

  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const hasSlider = totalProjects > visibleCount;
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage >= pageStops.length - 1;

  const rangeFrom = totalProjects === 0 ? 0 : currentIndex + 1;
  const rangeTo = Math.min(currentIndex + visibleCount, totalProjects);

  const clearFilters = () => {
    setActiveDomain('all');
    setQuery('');
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasSlider) return;
    const delta = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (delta <= -SWIPE_THRESHOLD_PX) handleNext();
    else if (delta >= SWIPE_THRESHOLD_PX) handlePrev();
  };

  // Keyboard arrows while the slider region is focused
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!hasSlider) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  const navButtonClass = (disabled: boolean) =>
    `inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
      disabled
        ? 'border-stone-200 bg-white/60 text-stone-300 cursor-not-allowed'
        : 'border-stone-300 bg-white text-primary shadow-sm hover:border-accent hover:bg-accent hover:text-white hover:shadow-md cursor-pointer'
    }`;

  return (
    <section id={SectionId.PROJECTS} className="py-24 bg-surface relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
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

        {/* Search + domain filter */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                {t.projects.filterLabel}
              </span>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label={t.projects.filterLabel}>
                {(['all', ...availableDomains] as Array<ProjectDomain | 'all'>).map((domain) => {
                  const isActive = activeDomain === domain;
                  const count =
                    domain === 'all'
                      ? allProjects.length
                      : allProjects.filter((p) => p.domains.includes(domain)).length;
                  return (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setActiveDomain(domain)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'border-accent bg-accent text-white shadow-md shadow-orange-500/20'
                          : 'border-orange-200 bg-white text-primary hover:border-accent hover:text-accent'
                      }`}
                    >
                      {t.projects.domains[domain]}
                      <span
                        className={`font-mono text-[10px] ${
                          isActive ? 'text-white/80' : 'text-stone-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="relative block w-full lg:w-80 shrink-0">
              <span className="sr-only">{t.projects.searchAriaLabel}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                inputMode="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.projects.searchPlaceholder}
                aria-label={t.projects.searchAriaLabel}
                className="w-full rounded-full border border-orange-200 bg-white py-2.5 pl-12 pr-10 text-sm text-primary placeholder:text-stone-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={t.projects.clearFilters}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:text-accent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </label>
          </div>
        </div>

        {/* Result count + slider controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-mono text-stone-500" aria-live="polite">
            {fill(t.projects.resultsCount, { count: totalProjects, total: allProjects.length })}
            {isFiltered && (
              <>
                <span className="mx-2 text-stone-300">·</span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-sans font-bold uppercase tracking-wider text-accent hover:underline"
                >
                  {t.projects.clearFilters}
                </button>
              </>
            )}
          </p>

          {hasSlider && (
            <div className="flex items-center gap-4">
              {/* "04–06 / 09" — makes it obvious there is more than one screen of work */}
              <span className="font-mono text-xs tabular-nums text-stone-500" aria-live="polite">
                {rangeFrom === rangeTo
                  ? fill(t.projects.showingOne, {
                      index: pad(rangeFrom),
                      total: pad(totalProjects),
                    })
                  : fill(t.projects.showingRange, {
                      from: pad(rangeFrom),
                      to: pad(rangeTo),
                      total: pad(totalProjects),
                    })}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={t.projects.prevProject}
                  disabled={isPrevDisabled}
                  className={navButtonClass(isPrevDisabled)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={t.projects.nextProject}
                  disabled={isNextDisabled}
                  className={navButtonClass(isNextDisabled)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Slider window: responsive card count */}
        {totalProjects > 0 ? (
          <div
            className="relative overflow-hidden -mx-4 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-2xl"
            tabIndex={hasSlider ? 0 : -1}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {filtered.map(({ project, index }, position) => {
                const isInView = position >= currentIndex && position < currentIndex + visibleCount;
                return (
                  <div
                    key={project.id}
                    className="shrink-0 basis-full md:basis-1/2 xl:basis-1/3 px-4 py-4"
                    aria-hidden={!isInView}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      onClick={setSelectedProject}
                      viewCaseStudyText={t.projects.viewCaseStudy}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white/60 px-6 py-16 text-center">
            <p className="text-secondary font-light max-w-md mx-auto mb-6">{t.projects.noResults}</p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
            >
              {t.projects.clearFilters}
            </button>
          </div>
        )}

        {/* Page dots — a second, at-a-glance signal of how much work is here */}
        {hasSlider && (
          <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label={t.projects.label}>
            {pageStops.map((_, page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={fill(t.projects.goToPage, { page: page + 1 })}
                  onClick={() => goToPage(page)}
                  className="group/dot flex h-8 items-center px-1 cursor-pointer"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-accent'
                        : 'w-2 bg-stone-300 group-hover/dot:bg-accent/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
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
