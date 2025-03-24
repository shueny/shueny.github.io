// src/components/ui/element.tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Timeline {
  title: string;
  name: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface TimelineProps {
  data: Timeline[];
}

export default function TimelineElement({ data }: TimelineProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            if (!visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    elementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      elementRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleItems]);

  return (
    <div className="space-y-8 relative timeline-container">
      {data.map((element, index) => (
        <div
          key={index}
          ref={(el) => (elementRefs.current[index] = el)}
          data-index={index}
          className="relative pl-8 timeline-item before:absolute before:content-[''] before:w-2 before:h-2 before:bg-gray-500 before:top-2 before:left-[11px] md:before:left-[-20px] before:rounded-full after:absolute after:content-[''] after:w-px after:h-[calc(100%+2rem)] last:after:h-[100%] after:top-4 after:left-[14px] md:after:left-[-16px] after:bg-gray-500"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-medium">{element.title}</h3>
            <p className="text-gray-400 font-normal mt-1">
              {element.name} <span>| {element.period}</span>
            </p>

            <ul className="mt-4 space-y-3">
              {element.description.map((des, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-600 dark:text-gray-400 font-light"
                >
                  <span>-</span>
                  {des}
                </li>
              ))}
              {/* {element.technologies && (
                <li className="text-gray-400 font-normal mt-1">
                  Technologies: {element.technologies.join(', ')}
                </li>
              )} */}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
