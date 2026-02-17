import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ServicesComp from '../Services';

const ServicesIsland: React.FC = () => (
  <LanguageProvider>
    <ServicesComp />
  </LanguageProvider>
);

export default ServicesIsland;
