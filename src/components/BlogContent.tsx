import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogContentProps {
  slug: string;
  children: React.ReactNode;
  zhContent?: React.ReactNode;
  enContent?: React.ReactNode;
}

const BlogContent: React.FC<BlogContentProps> = ({ 
  slug, 
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

  // Show Chinese content for ZH, English content for EN/DE
  if (language === 'ZH' && zhContent) {
    return <>{zhContent}</>;
  }

  if ((language === 'EN' || language === 'DE') && enContent) {
    return <>{enContent}</>;
  }

  // Fallback to default content
  return <>{children}</>;
};

export default BlogContent;

