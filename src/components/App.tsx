import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import ImpactDashboard from './ImpactDashboard';
import ProjectsGrid from './ProjectsGrid';
import About from './About';
import ExperienceList from './ExperienceList';
import Contact from './Contact';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import TechStack from './TechStack';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <TechStack />
          <ImpactDashboard />
          <ProjectsGrid />
          <About />
          <ExperienceList />
          <Contact />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </LanguageProvider>
  );
};

export default App;
