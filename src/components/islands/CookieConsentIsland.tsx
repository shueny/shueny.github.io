import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import CookieConsentComp from '../CookieConsent';

const CookieConsentIsland: React.FC = () => (
  <LanguageProvider>
    <CookieConsentComp />
  </LanguageProvider>
);

export default CookieConsentIsland;
