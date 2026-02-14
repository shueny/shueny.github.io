import React, { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Hero from './Hero';

// Services can be lazy loaded since it's below the fold
const Services = lazy(() => import('./Services'));

// Lazy load below-the-fold sections — chunks only load when triggered by scroll cascade
const TechStack = lazy(() => import('./TechStack'));
const ImpactDashboard = lazy(() => import('./ImpactDashboard'));
const ProjectsGrid = lazy(() => import('./ProjectsGrid'));
const About = lazy(() => import('./About'));
const ExperienceList = lazy(() => import('./ExperienceList'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));
const CookieConsent = lazy(() => import('./CookieConsent'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-stone-400">Loading...</div>
  </div>
);

/**
 * Wrapper that defers rendering until `shouldLoad` is true,
 * then observes its own visibility to trigger the next section.
 */
const LazySection: React.FC<{
  shouldLoad: boolean;
  onVisible: () => void;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ shouldLoad, onVisible, fallback, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  useEffect(() => {
    if (!shouldLoad || triggered.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          onVisibleRef.current();
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <div ref={ref}>
      <Suspense fallback={fallback ?? <LoadingFallback />}>
        {children}
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  // Tracks how many lazy sections are unlocked.
  // 0 = only Hero + Services visible
  // 1 = TechStack, 2 = ImpactDashboard, … 7 = Footer + CookieConsent
  const [unlockedCount, setUnlockedCount] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);

  const unlock = useCallback((next: number) => {
    setUnlockedCount((prev) => Math.max(prev, next));
  }, []);

  // Observe Hero section — when it enters viewport, unlock Services
  useEffect(() => {
    // Unlock Services immediately when Hero is visible (Hero is above the fold)
    unlock(1);
    
    // Also observe Hero to trigger Services loading when user scrolls
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            unlock(1); // Ensure Services is unlocked
            observer.disconnect();
          }
        },
        { rootMargin: '200px 0px' },
      );

      observer.observe(heroSection);
      return () => observer.disconnect();
    }
  }, [unlock]);

  return (
    <LanguageProvider>
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <div ref={servicesRef}>
            <LazySection shouldLoad={unlockedCount >= 1} onVisible={() => unlock(2)}>
              <Services />
            </LazySection>
          </div>

          <LazySection shouldLoad={unlockedCount >= 2} onVisible={() => unlock(3)}>
            <TechStack />
          </LazySection>

          <LazySection shouldLoad={unlockedCount >= 3} onVisible={() => unlock(4)}>
            <ImpactDashboard />
          </LazySection>

          <LazySection shouldLoad={unlockedCount >= 4} onVisible={() => unlock(5)}>
            <ProjectsGrid />
          </LazySection>

          <LazySection shouldLoad={unlockedCount >= 5} onVisible={() => unlock(6)}>
            <About />
          </LazySection>

          <LazySection shouldLoad={unlockedCount >= 6} onVisible={() => unlock(7)}>
            <ExperienceList />
          </LazySection>

          <LazySection shouldLoad={unlockedCount >= 7} onVisible={() => unlock(8)}>
            <Contact />
          </LazySection>
        </main>

        <LazySection shouldLoad={unlockedCount >= 8} onVisible={() => {}} fallback={null}>
          <Footer />
        </LazySection>

        {/* Delay CookieConsent until page is fully loaded */}
        {unlockedCount >= 8 && (
          <Suspense fallback={null}>
            <CookieConsent />
          </Suspense>
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;
