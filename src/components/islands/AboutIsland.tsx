import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import AboutComp from '../About';

const AboutIsland: React.FC = () => (
  <LanguageProvider>
    <AboutComp />
  </LanguageProvider>
);

export default AboutIsland;
