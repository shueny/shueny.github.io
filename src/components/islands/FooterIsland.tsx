import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import FooterComp from '../Footer';

const FooterIsland: React.FC = () => (
  <LanguageProvider>
    <FooterComp />
  </LanguageProvider>
);

export default FooterIsland;
