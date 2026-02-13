import React, { Suspense, lazy } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Hero from './Hero';

// Lazy load all below-the-fold components to reduce initial bundle size
const Services = lazy(() => import('./Services'));
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

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <TechStack />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <ImpactDashboard />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <ProjectsGrid />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <ExperienceList />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      </div>
    </LanguageProvider>
  );
};

export default App;
