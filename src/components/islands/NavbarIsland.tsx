import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import NavbarComp from '../Navbar';

const NavbarIsland: React.FC = () => (
  <LanguageProvider>
    <NavbarComp />
  </LanguageProvider>
);

export default NavbarIsland;
