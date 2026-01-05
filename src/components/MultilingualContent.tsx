import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MultilingualContentProps {
  children: React.ReactNode;
  zhContent?: string; // HTML string for Chinese content
  enContent?: string; // HTML string for English content
}

const MultilingualContent: React.FC<MultilingualContentProps> = ({ 
  children, 
  zhContent, 
  enContent 
}) => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before mount, show default content
  if (!mounted) {
    return <>{children}</>;
  }

  // Show Chinese content for ZH
  if (language === 'ZH' && zhContent) {
    return <div dangerouslySetInnerHTML={{ __html: zhContent }} />;
  }

  // Show English content for EN/DE
  if ((language === 'EN' || language === 'DE') && enContent) {
    return <div dangerouslySetInnerHTML={{ __html: enContent }} />;
  }

  // Fallback to default content
  return <>{children}</>;
};

export default MultilingualContent;

