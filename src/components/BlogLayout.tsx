import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
      <Footer />
    </LanguageProvider>
  );
};

export default BlogLayout;

