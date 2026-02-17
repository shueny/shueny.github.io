import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';

export const IslandWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

export default IslandWrapper;
