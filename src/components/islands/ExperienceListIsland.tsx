import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ExperienceListComp from '../ExperienceList';

const ExperienceListIsland: React.FC = () => (
  <LanguageProvider>
    <ExperienceListComp />
  </LanguageProvider>
);

export default ExperienceListIsland;
