import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SectionId } from '../types';
import { FileText, Globe } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Memoize nav links to prevent unnecessary re-renders
  const navLinks = useMemo(
    () => [
      { label: t.nav.work, href: SectionId.PROJECTS },
      { label: t.nav.services, href: SectionId.SERVICES },
      { label: t.nav.about, href: SectionId.ABOUT },
      { label: t.nav.experience, href: SectionId.EXPERIENCE },
      { label: t.nav.contact, href: SectionId.CONTACT },
    ],
    [t]
  );

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showLangMenu) {
        const target = e.target as HTMLElement;
        if (!target.closest('.language-switcher')) {
          setShowLangMenu(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLangMenu]);

  // Scroll spy implementation with Intersection Observer for better performance
  useEffect(() => {
    const sections = Object.values(SectionId);
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observers: IntersectionObserver[] = [];
    const sectionElements: Map<SectionId, Element> = new Map();

    // Create observers for each section
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        sectionElements.set(sectionId, element);
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        }, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    // Fallback: handle scroll for hero section (at top of page)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // If at top, set hero as active
      if (window.scrollY < 100) {
        setActiveSection(SectionId.HERO);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Memoized click handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const element = document.getElementById(href);
      if (element) {
        const offset = 80; // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <div
        className={`
        pointer-events-auto
        flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-3 transition-all duration-500 ease-out
        ${
          scrolled
            ? 'w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[680px] bg-white/70 backdrop-blur-xl shadow-lg shadow-orange-900/5 border border-white/40 rounded-full'
            : 'w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl bg-transparent'
        }
      `}
      >
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, SectionId.HERO)}
          className="group flex items-center gap-1 sm:gap-2 flex-shrink-0"
        >
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 text-white rounded-full flex items-center justify-center font-serif font-bold text-base sm:text-lg group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30 flex-shrink-0"
            style={{ backgroundColor: 'hsl(var(--accent))' }}
          >
            S
          </div>
          <span
            className={`font-medium tracking-tight text-xs sm:text-sm ${
              scrolled
                ? 'hidden md:block text-primary'
                : 'hidden sm:block text-primary'
            }`}
          >
            Shueny
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          {/* Nav Links */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium transition-colors px-0.5 sm:px-1 py-1 relative group font-sans whitespace-nowrap flex-shrink-0 ${
                    isActive ? 'text-accent' : 'text-primary hover:text-accent'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-0.5 bg-accent transition-all duration-300 ${
                      isActive
                        ? 'w-full -translate-x-1/2'
                        : 'w-0 group-hover:w-1/2 group-hover:-translate-x-1/2'
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-stone-300/50"></div>

          {/* Download CV Button */}
          <a
            href="/files/2025-12_Resume_ShuenyWang_FED.pdf"
            download
            className="p-1.5 sm:p-2 text-stone-600 hover:text-accent transition-colors group relative"
            title={t.common.downloadResume}
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          {/* Language Switcher */}
          <div className="relative language-switcher">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-stone-600 hover:text-accent transition-colors"
              title={t.common.changeLanguage}
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{language}</span>
            </button>

            {/* Language Dropdown */}
            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg py-1 min-w-[100px] z-50">
                {(['EN', 'DE', '繁'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      language === lang
                        ? 'text-accent font-semibold bg-orange-50'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {lang === 'EN' && 'English'}
                    {lang === 'DE' && 'Deutsch'}
                    {lang === '繁' && '繁體中文'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
