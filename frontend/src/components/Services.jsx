import React from 'react';
import { SERVICES } from '../data/constants';
import { Globe, BrainCircuit, Code2, Cloud, Layout, Zap, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Globe: Globe,
  BrainCircuit: BrainCircuit,
  Code2: Code2,
  Cloud: Cloud,
  Layout: Layout,
  Zap: Zap
};

export default function Services() {
  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What We <span className="text-gradient">Build</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We deliver tailored digital solutions designed to elevate your business performance and accelerate market reach.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Code2;
            return (
              <div
                key={service.id}
                onClick={handleScrollToContact}
                className="glass-card glass-card-hover rounded-2xl p-8 border border-slate-800 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-900/60 to-slate-900 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all">
                    <IconComponent className="w-7 h-7 text-cyan-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-cyan-300">
                  <span>Inquire Solution</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
