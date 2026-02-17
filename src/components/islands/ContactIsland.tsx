import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ContactComp from '../Contact';

const ContactIsland: React.FC = () => (
  <LanguageProvider>
    <ContactComp />
  </LanguageProvider>
);

export default ContactIsland;
