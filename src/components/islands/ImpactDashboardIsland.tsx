import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ImpactDashboardComp from '../ImpactDashboard';

const ImpactDashboardIsland: React.FC = () => (
  <LanguageProvider>
    <ImpactDashboardComp />
  </LanguageProvider>
);

export default ImpactDashboardIsland;
