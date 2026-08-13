import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageProvider } from '../contexts/LanguageContext';

interface BlogLanguageSwitcherProps {
  slug: string;
  children: React.ReactNode;
}

// Map of slugs to their language-specific versions
const MULTILINGUAL_POSTS: Record<string, { zh?: string; en?: string; de?: string }> = {
  'mobile-pagespeed-optimizations': {
    zh: 'mobile-pagespeed-optimizations-zh',
    en: 'mobile-pagespeed-optimizations',
  },
  'mobile-pagespeed-optimizations-zh': {
    zh: 'mobile-pagespeed-optimizations-zh',
    en: 'mobile-pagespeed-optimizations',
  },
  'from-spa-to-astro-islands': {
    zh: 'from-spa-to-astro-islands',
    en: 'from-spa-to-astro-islands-en',
  },
  'from-spa-to-astro-islands-en': {
    zh: 'from-spa-to-astro-islands',
    en: 'from-spa-to-astro-islands-en',
  },
  'local-chat': {
    zh: 'local-chat-zh',
    en: 'local-chat',
  },
  'local-chat-zh': {
    zh: 'local-chat-zh',
    en: 'local-chat',
  },
  'astro-islands-lighthouse-optimization': {
    en: 'astro-islands-lighthouse-optimization',
    zh: 'astro-islands-lighthouse-optimization-zh',
    de: 'astro-islands-lighthouse-optimization-de',
  },
  'astro-islands-lighthouse-optimization-zh': {
    en: 'astro-islands-lighthouse-optimization',
    zh: 'astro-islands-lighthouse-optimization-zh',
    de: 'astro-islands-lighthouse-optimization-de',
  },
  'astro-islands-lighthouse-optimization-de': {
    en: 'astro-islands-lighthouse-optimization',
    zh: 'astro-islands-lighthouse-optimization-zh',
    de: 'astro-islands-lighthouse-optimization-de',
  },
  'daily-tomato-todo': {
    en: 'daily-tomato-todo',
    zh: 'daily-tomato-todo-zh',
    de: 'daily-tomato-todo-de',
  },
  'daily-tomato-todo-zh': {
    en: 'daily-tomato-todo',
    zh: 'daily-tomato-todo-zh',
    de: 'daily-tomato-todo-de',
  },
  'daily-tomato-todo-de': {
    en: 'daily-tomato-todo',
    zh: 'daily-tomato-todo-zh',
    de: 'daily-tomato-todo-de',
  },
  'seo-content-prioritization-ai-search': {
    en: 'seo-content-prioritization-ai-search',
    zh: 'seo-content-prioritization-ai-search-zh',
    de: 'seo-content-prioritization-ai-search-de',
  },
  'seo-content-prioritization-ai-search-zh': {
    en: 'seo-content-prioritization-ai-search',
    zh: 'seo-content-prioritization-ai-search-zh',
    de: 'seo-content-prioritization-ai-search-de',
  },
  'seo-content-prioritization-ai-search-de': {
    en: 'seo-content-prioritization-ai-search',
    zh: 'seo-content-prioritization-ai-search-zh',
    de: 'seo-content-prioritization-ai-search-de',
  },
};

const BlogLanguageSwitcherContent: React.FC<BlogLanguageSwitcherProps> = ({
  slug,
  children,
}) => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const redirectingRef = useRef(false);
  const lastLanguageRef = useRef<string | null>(null);
  const lastSlugRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize refs
    lastLanguageRef.current = language;
    lastSlugRef.current = slug;
  }, []);

  // Function to check and redirect
  const checkAndRedirect = React.useCallback((currentSlug: string, currentLanguage: typeof language) => {
    if (redirectingRef.current) return;

    const postConfig = MULTILINGUAL_POSTS[currentSlug];
    if (!postConfig) {
      return;
    }

    // Determine target slug based on language
    let targetSlug: string | null = null;
    if (currentLanguage === 'ZH' && postConfig.zh) {
      targetSlug = postConfig.zh;
    } else if (currentLanguage === 'DE' && postConfig.de) {
      targetSlug = postConfig.de;
    } else if (currentLanguage === 'EN' && postConfig.en) {
      targetSlug = postConfig.en;
    }

    // Only redirect if we need to switch to a different slug
    if (targetSlug && targetSlug !== currentSlug) {
      redirectingRef.current = true;
      // Use href instead of replace to allow browser navigation
      window.location.href = `/blog/${targetSlug}`;
    }
  }, []);

  // Listen to language changes (both from localStorage and custom events)
  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        // Language changed in another tab
        const newLanguage = e.newValue as typeof language;
        const currentSlug = lastSlugRef.current || slug;
        if (newLanguage !== lastLanguageRef.current) {
          lastLanguageRef.current = newLanguage;
          checkAndRedirect(currentSlug, newLanguage);
        }
      }
    };

    // Listen to custom event for same-tab language changes
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<typeof language>;
      const newLanguage = customEvent.detail;
      const currentSlug = lastSlugRef.current || slug;
      if (newLanguage && newLanguage !== lastLanguageRef.current) {
        lastLanguageRef.current = newLanguage;
        checkAndRedirect(currentSlug, newLanguage);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languagechange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, [mounted, slug, checkAndRedirect]);

  // Check and redirect when language or slug changes
  useEffect(() => {
    if (!mounted) return;

    // Check if language or slug changed
    const languageChanged = language !== lastLanguageRef.current;
    const slugChanged = slug !== lastSlugRef.current;

    if (languageChanged || slugChanged) {
      checkAndRedirect(slug, language);
      lastLanguageRef.current = language;
      lastSlugRef.current = slug;
    }
  }, [slug, language, mounted, checkAndRedirect]);

  // Show default content while determining language or if not multilingual
  if (redirectingRef.current) {
    return null; // Don't render content while redirecting
  }

  return <>{children}</>;
};

const BlogLanguageSwitcher: React.FC<BlogLanguageSwitcherProps> = (props) => {
  return (
    <LanguageProvider>
      <BlogLanguageSwitcherContent {...props} />
    </LanguageProvider>
  );
};

export default BlogLanguageSwitcher;

