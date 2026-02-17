import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import TechStackComp from '../TechStack';

const TechStackIsland: React.FC = () => (
  <LanguageProvider>
    <TechStackComp />
  </LanguageProvider>
);

export default TechStackIsland;
