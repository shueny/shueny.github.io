import React from 'react';
import { SectionId } from '../types';

const ImpactDashboard: React.FC = () => {
  const stats = [
    {
      value: '50%',
      label: 'QA Cycle Reduced',
      sub: 'Cypress Automation',
    },
    {
      value: '80%',
      label: 'Human Error Reduced',
      sub: 'Nx Monorepo Structure',
    },
    {
      value: '40%',
      label: 'Conversion Boost',
      sub: 'UI/UX Optimization',
    },
  ];

  return (
    <section
      id={SectionId.IMPACT}
      className="py-24 bg-primary text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-stone-800 pb-8">
          <div className="max-w-xl">
            <span
              className="uppercase tracking-widest text-xs font-bold block mb-4"
              style={{ color: 'hsl(var(--accent))' }}
            >
              Proven Results
            </span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-2">
              Impact{' '}
              <span className="font-serif italic text-stone-400">
                Dashboard
              </span>
            </h2>
          </div>
          <p className="text-stone-400 max-w-sm text-sm mt-4 md:mt-0 text-right">
            Metrics from my tenure at VicOne, Synttro, and Citiesocial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 text-center group"
            >
              <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-600 mb-4 group-hover:to-accent transition-all duration-500 font-sans tracking-tight">
                {stat.value}
              </span>
              <span className="text-xl font-bold text-white mb-2 block">
                {stat.label}
              </span>
              <span
                className="text-sm font-mono tracking-wide uppercase border border-stone-800 px-3 py-1 rounded-full"
                style={{ color: 'hsl(var(--accent))' }}
              >
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactDashboard;
