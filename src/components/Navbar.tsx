import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SectionId } from '../types';
import { FileText, Globe } from 'lucide-react';
import { useLanguage, LanguageProvider } from '../contexts/LanguageContext';

const NavbarContent: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  // 用於判斷目前是否在 Blog 頁面 (Active 狀態用)
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const navLinks = useMemo(
    () => [
      { label: t.nav.work, href: SectionId.PROJECTS },
      { label: t.nav.services, href: SectionId.SERVICES },
      { label: t.nav.skills, href: SectionId.SKILLS },
      { label: t.nav.about, href: SectionId.ABOUT },
      { label: t.nav.experience, href: SectionId.EXPERIENCE },
      // 👇 新增 Blog 連結 (放在 Contact 之前)
      // 如果您的語系檔 (t.nav) 還沒加入 blog 翻譯，暫時先用字串 'Blog'
      { label: 'Blog', href: '/blog' },
      { label: t.nav.contact, href: SectionId.CONTACT },
    ],
    [t]
  );

  // ... (Click Outside 的 useEffect 保持不變) ...
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

  // ... (Hash Scroll 的 useEffect 保持不變) ...
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          setActiveSection(id as SectionId);
        }, 100);
      }
    }
  }, []);

  // ... (Scroll Observer 的 useEffect 保持不變) ...
  useEffect(() => {
    const sections = Object.values(SectionId);
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };
    const observers: IntersectionObserver[] = [];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(sectionId);
          });
        }, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (
        window.scrollY < 100 &&
        window.location.pathname === '/' &&
        !window.location.hash
      ) {
        setActiveSection(SectionId.HERO);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // ... (handleNavClick 保持不變) ...
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const element = document.getElementById(href);
      if (element) {
        e.preventDefault();
        const offset = 80;
        requestAnimationFrame(() => {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        });
      }
      // 如果 element 不存在 (例如點擊 Blog 或在 Blog 頁點擊 Projects)，
      // 就不會執行 preventDefault，讓瀏覽器執行原本的跳轉 (href)
    },
    []
  );

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <div
        className={`
        pointer-events-auto
        flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 transition-all duration-500 ease-out
        ${
          scrolled
            ? 'w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[850px] lg:max-w-[950px] bg-white/70 backdrop-blur-xl shadow-lg shadow-orange-900/5 border border-white/40 rounded-full'
            : 'w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl bg-transparent'
        }
      `}
      >
        <a
          href="/"
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

        <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-3 flex-shrink-0 min-w-0">
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 overflow-x-auto scrollbar-hide min-w-0 flex-1">
            {navLinks.map((link) => {
              // 👇 1. 判斷是否為跨頁連結 (Blog)
              const isPageLink = link.href.startsWith('/');

              // 👇 2. 建構正確的 href
              // 如果是 Blog -> '/blog'
              // 如果是 Section -> '/#projects'
              const finalHref = isPageLink ? link.href : `/#${link.href}`;

              // 👇 3. 判斷 Active 狀態
              // 如果是 Blog -> 檢查網址路徑是否包含 '/blog'
              // 如果是 Section -> 檢查 activeSection 狀態
              const isActive = isPageLink
                ? currentPath.startsWith(link.href)
                : activeSection === link.href;

              return (
                <a
                  key={link.label}
                  href={finalHref}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-medium transition-colors px-0.5 sm:px-1 py-1 relative group font-sans whitespace-nowrap flex-shrink-0 ${
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

          <div className="hidden sm:block w-px h-5 bg-stone-300/50 flex-shrink-0"></div>

          <a
            href="/files/2025-12_Resume_ShuenyWang_FED.pdf"
            download
            className="p-1.5 sm:p-2 text-stone-600 hover:text-accent transition-colors group relative flex-shrink-0"
            title={t.common.downloadResume}
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          <div className="relative language-switcher flex-shrink-0">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-1.5 sm:px-2 md:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-stone-600 hover:text-accent transition-colors whitespace-nowrap"
              title={t.common.changeLanguage}
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{language}</span>
            </button>

            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg py-1 min-w-[100px] z-50">
                {(['EN', 'DE', 'ZH'] as const).map((lang) => (
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
                    {lang === 'ZH' && '繁體中文'}
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

const Navbar: React.FC = () => {
  return (
    <LanguageProvider>
      <NavbarContent />
    </LanguageProvider>
  );
};

export default Navbar;
