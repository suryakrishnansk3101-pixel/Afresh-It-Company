import React from 'react';
import { WHY_CHOOSE_US } from '../data/constants';
import { ShieldCheck, TrendingUp, Cpu, Headphones } from 'lucide-react';

const iconMap = {
  ShieldCheck: ShieldCheck,
  TrendingUp: TrendingUp,
  Cpu: Cpu,
  Headphones: Headphones
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We partner with businesses to deliver reliable software solutions built on trust and technical precision.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-900/60 to-cyan-900/40 border border-purple-500/30 flex items-center justify-center text-cyan-400 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
