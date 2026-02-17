import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';

import NavbarComp from './Navbar';

import ServicesComp from './Services';
import TechStackComp from './TechStack';
import ImpactDashboardComp from './ImpactDashboard';
import ProjectsGridComp from './ProjectsGrid';
import AboutComp from './About';
import ExperienceListComp from './ExperienceList';
import ContactComp from './Contact';
import FooterComp from './Footer';
import CookieConsentComp from './CookieConsent';

// HOC to wrap components with LanguageProvider
const withIsland = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => (
    <LanguageProvider>
      <Component {...props} />
    </LanguageProvider>
  );
};

export const Navbar = withIsland(NavbarComp);

export const Services = withIsland(ServicesComp);
export const TechStack = withIsland(TechStackComp);
export const ImpactDashboard = withIsland(ImpactDashboardComp);
export const ProjectsGrid = withIsland(ProjectsGridComp);
export const About = withIsland(AboutComp);
export const ExperienceList = withIsland(ExperienceListComp);
export const Contact = withIsland(ContactComp);
export const Footer = withIsland(FooterComp);
export const CookieConsent = withIsland(CookieConsentComp);
