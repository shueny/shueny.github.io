import React from 'react';
import { SectionId } from '../types';
import { ANALYSIS_REPORT } from '../constants';

const OptimizationReport: React.FC = () => {
  return (
    <section id={SectionId.ANALYSIS} className="py-24 bg-white border-y border-orange-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:flex justify-between items-end">
           <div className="max-w-xl">
             <span className="text-accent uppercase tracking-widest text-xs font-bold block mb-4">The Process</span>
             <h2 className="text-3xl md:text-5xl font-sans font-bold text-primary mb-6">
               Refining the <span className="font-serif italic text-accent">Experience</span>
             </h2>
             <p className="text-secondary text-lg font-light">
               Applying product thinking to portfolio design. From data-driven decisions to emotional resonance.
             </p>
           </div>
           <div className="hidden md:block h-[1px] flex-1 bg-orange-100 mx-12 mb-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ANALYSIS_REPORT.map((item, idx) => (
            <div key={idx} className="bg-surface p-8 rounded-xl border border-orange-100 hover:border-accent hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{item.title}</h3>
                <span className="text-5xl font-serif text-orange-200 font-bold -mt-2 opacity-50 group-hover:text-accent group-hover:opacity-20 transition-all">
                  0{idx + 1}
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="relative pl-4 border-l-2 border-stone-200 group-hover:border-stone-300 transition-colors">
                  <p className="text-xs uppercase text-secondary/60 font-bold tracking-wider mb-1">Challenge</p>
                  <p className="text-sm text-secondary italic">
                    "{item.before}"
                  </p>
                </div>
                <div className="relative pl-4 border-l-2 border-accent">
                  <p className="text-xs uppercase text-accent font-bold tracking-wider mb-1">Optimization</p>
                  <p className="text-sm text-primary font-medium">
                    {item.after}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">Impact</span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${item.impact === 'High' ? 'bg-accent text-white' : 'bg-stone-200 text-stone-600'}`}>
                  {item.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptimizationReport;