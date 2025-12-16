import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { SectionId } from '../types';
import SkillsChart from './SkillsChart';

const ExperienceList: React.FC = () => {
  return (
    <section id={SectionId.EXPERIENCE} className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-surface to-white"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Header & Chart Area */}
          <div className="lg:col-span-5">
             <div className="sticky top-32">
               <h2 className="text-4xl md:text-5xl font-sans font-bold text-primary mb-8 tracking-tight">
                 Professional<br/><span className="font-serif italic text-accent">Trajectory</span>
               </h2>
               <p className="text-secondary mb-12 leading-relaxed font-light text-lg">
                 Over two decades of navigating the evolving landscape of web technology. From jQuery spaghetti code to modern React ecosystems, I've led teams through it all.
               </p>
               <div className="transform hover:scale-[1.02] transition-transform duration-500">
                 <SkillsChart />
               </div>
             </div>
          </div>

          {/* Timeline List */}
          <div className="lg:col-span-7 space-y-0 pt-8">
             {EXPERIENCE_DATA.map((exp) => (
               <div key={exp.id} className="group relative border-l border-stone-200 pl-10 pb-20 last:pb-0">
                 {/* Dot */}
                 <div className="absolute -left-[6px] top-2.5 w-3 h-3 bg-white border-2 border-stone-300 rounded-full group-hover:border-accent group-hover:bg-accent transition-colors duration-300"></div>
                 
                 <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">{exp.role}</h3>
                    <span className="font-mono text-sm text-stone-400 bg-stone-50 px-2 py-1 rounded">{exp.period}</span>
                 </div>
                 
                 <p className="text-xl font-serif text-secondary mb-6 italic">{exp.company}</p>
                 <p className="text-secondary mb-8 leading-relaxed max-w-xl">{exp.description}</p>
                 
                 <div className="bg-surface p-6 border border-orange-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Key Achievements</p>
                    <ul className="space-y-4">
                        {exp.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start text-sm text-secondary">
                                <span className="mr-3 text-accent mt-1">✦</span>
                                {ach}
                            </li>
                        ))}
                    </ul>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceList;