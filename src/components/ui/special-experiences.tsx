import { Icons } from '@/icons';
import type { SpecialExperiences } from '@/lib/types/portfolio';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpecialExperiencesProps {
  data: SpecialExperiences['list'];
}

export default function SpecialExperiences({ data }: SpecialExperiencesProps) {
  if (!data?.length) return null;

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
    <div className="space-y-20">
      {data.map((experience, index) => (
        <div
          key={index}
          ref={(el) => (experienceRefs.current[index] = el)}
          data-index={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          <motion.div
            className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="image-container h-[300px] md:h-[600px] overflow-hidden rounded-lg shadow-lg">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </motion.div>

          <motion.div
            className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h4 className="text-2xl mb-2">{experience.title}</h4>
            <p className="text-gray-500 mb-6">{experience.date}</p>
            <hr className="my-4" />
            <ul className="space-y-3">
              {experience.description.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}
                  }
                  transition={{ duration: 0.5, delay: 0.5 + itemIndex * 0.1 }}
                >
                  <span className="text-gray-500 mr-2 mt-1 font-light">
                    <Icons.check className="w-5 h-5" />
                  </span>
                  <span className="font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
