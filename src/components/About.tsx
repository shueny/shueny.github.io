import React from 'react';
import { SectionId } from '../types';
import { EDUCATION_DATA, SPECIAL_EXPERIENCE_DATA } from '../constants';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-surface border-b border-orange-100">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="max-w-4xl mb-20">
          <span className="text-accent uppercase tracking-widest text-xs font-bold block mb-4">The Person Behind the Pixels</span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-primary mb-8 leading-tight">
            Design roots. Engineering mind. <br/>
            <span className="font-serif italic text-accent">Global perspective.</span>
          </h2>
          <p className="text-secondary text-lg md:text-xl font-light leading-relaxed">
            With a foundation in <strong className="font-medium text-primary">Graphic Design</strong> and a <strong className="font-medium text-primary">Master's in Learning Technology</strong>, I approach frontend development differently. I don't just implement designs; I understand the 'why' behind them. My journey from creative arts to rigorous engineering allows me to bridge the gap between design teams and developers, ensuring pixel-perfect execution with scalable architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Education */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center">
              <span className="w-8 h-[1px] bg-accent mr-4"></span>
              Education
            </h3>
            <div className="space-y-8">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="group">
                  <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">{edu.degree}</h4>
                  <p className="text-secondary font-serif italic mb-1">{edu.school}</p>
                  <p className="text-xs font-mono text-stone-400 bg-white inline-block px-2 py-1 rounded border border-orange-100">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Experience */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center">
              <span className="w-8 h-[1px] bg-accent mr-4"></span>
              Global Footprint
            </h3>
            <div className="space-y-8">
              {SPECIAL_EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-stone-200 hover:border-accent transition-colors duration-300">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-lg font-bold text-primary">{exp.title}</h4>
                    <span className="text-xs font-mono text-stone-400">{exp.year}</span>
                  </div>
                  {exp.location && <p className="text-sm text-accent font-medium mb-2">{exp.location}</p>}
                  <p className="text-sm text-secondary leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;