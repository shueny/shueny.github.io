import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/icons';
import { AnimatePresence, motion } from 'framer-motion';

interface SectionItem {
  id: string;
  text: string;
}

interface SectionNavigatorProps {
  items: SectionItem[];
  className?: string;
  activeSection?: string;
}

export function SectionNavigator({
  items,
  className,
  activeSection,
}: SectionNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(
    activeSection || 'greeting'
  );

  useEffect(() => {
    const handleSectionChange = (
      event: CustomEvent<{ activeSection: string }>
    ) => {
      setCurrentSection(event.detail.activeSection);
    };

    document.addEventListener(
      'sectionchange',
      handleSectionChange as EventListener
    );

    return () => {
      document.removeEventListener(
        'sectionchange',
        handleSectionChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (activeSection) {
      setCurrentSection(activeSection);
    }
  }, [activeSection]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed z-50">
      {/* 桌面版 - 固定在右側 */}
      <div
        className={cn(
          'hidden md:flex fixed right-4 top-[calc(3rem+1rem)] flex-col gap-2',
          className
        )}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-nav-item={item.id}
            className={cn(
              'text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200 text-right',
              currentSection === item.id && 'text-gray-300'
            )}
          >
            <span className="relative">
              {item.text}
              <span
                className={cn(
                  'underline absolute -bottom-1 right-0 h-0.5 bg-gray-300 dark:bg-white transition-all duration-300 ease-out',
                  currentSection === item.id ? 'w-full' : 'w-0 hover:w-full'
                )}
                style={{ transformOrigin: 'right' }}
              />
            </span>
          </a>
        ))}
      </div>

      <div className="md:hidden fixed right-4 bottom-4">
        <motion.button
          onClick={toggleMenu}
          className="w-12 h-12 rounded-full bg-gray-700/90 backdrop-blur-sm text-white flex items-center justify-center shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <Icons.close className="w-5 h-5" />
            ) : (
              <Icons.menu className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-16 right-0 bg-gray-700/90 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-[150px]"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
            >
              {items.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  data-nav-item={item.id}
                  className={cn(
                    'block py-2 text-sm hover:text-white text-right relative',
                    currentSection === item.id
                      ? 'text-white font-medium'
                      : 'text-gray-300'
                  )}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.05 * index },
                  }}
                >
                  {currentSection === item.id && (
                    <motion.span
                      className="absolute inset-0 bg-gray-600/50 rounded-sm -z-10"
                      layoutId="activeSection"
                    />
                  )}
                  {item.text}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
