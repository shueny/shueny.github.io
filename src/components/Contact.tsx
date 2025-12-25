import React from 'react';
import { SectionId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id={SectionId.CONTACT}
      className="py-32 bg-primary text-white relative overflow-hidden"
    >
      {/* Warm glow effect */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent opacity-10 blur-[100px]"></div>

      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <span className="inline-block py-1 px-4 border border-stone-700 rounded-full text-xs uppercase tracking-widest text-stone-400 mb-8">
          {t.contact.tagline}
        </span>

        <h2 className="text-5xl md:text-9xl font-serif font-bold mb-8 leading-[0.9] tracking-tight">
          {t.contact.titlePart1} <br />
          <span className="text-accent italic">{t.contact.titlePart2}</span>
        </h2>

        <p className="text-stone-400 max-w-xl mx-auto mb-16 text-lg font-light">
          {t.contact.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
          <a
            href="mailto:shuenyw@gmail.com"
            className="min-w-[200px] px-8 py-5 bg-accent text-white font-bold tracking-wide hover:bg-white hover:text-accent transition-all duration-300 rounded-full shadow-xl shadow-orange-900/20"
          >
            {t.contact.startProject}
          </a>
          <a
            href="https://www.linkedin.com/in/shueny-wang/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[200px] px-8 py-5 bg-transparent border border-stone-700 text-white font-medium hover:border-accent hover:text-accent transition-all duration-300 rounded-full"
          >
            {t.contact.linkedinProfile}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
