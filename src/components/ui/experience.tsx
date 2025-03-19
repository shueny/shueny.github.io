// src/components/ui/experience.tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string[];
}

interface ExperienceProps {
  data: Experience[];
}

export default function Experience({ data }: ExperienceProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    experienceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      experienceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleItems]);

  return (
    <div className="space-y-8 relative timeline-container">
      {data.map((experience, index) => (
        <div
          key={index}
          ref={(el) => (experienceRefs.current[index] = el)}
          data-index={index}
          className="relative pl-8 timeline-item before:absolute before:content-[''] before:w-2 before:h-2 before:bg-gray-500 before:top-2 before:left-[-20px] before:rounded-full after:absolute after:content-[''] after:w-px after:h-[calc(100%+2rem)] last:after:h-[100%] after:top-4 after:left-[-16px] after:bg-gray-500"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-medium">{experience.position}</h3>
            <p className="text-gray-400 font-normal mt-1">
              {experience.company} <span>| {experience.period}</span>
            </p>

            <ul className="mt-4 space-y-3">
              {experience.description.map((des, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-600 dark:text-gray-400 font-light"
                >
                  <span>-</span>
                  {des}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
