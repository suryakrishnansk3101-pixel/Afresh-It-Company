import React from 'react';
import { TECHNOLOGIES } from '../data/constants';
import { FileCode, Server, Atom, Code, Database, Cpu, Sparkles, Bot } from 'lucide-react';

const techIconMap = {
  FileCode: FileCode,
  Server: Server,
  Atom: Atom,
  Code: Code,
  Database: Database,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Bot: Bot
};

export default function Technologies() {
  return (
    <section id="technologies" className="py-20 bg-slate-950/60 relative border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Cutting-Edge Tools
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Technology <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We build robust, modern applications powered by proven frameworks and enterprise standards.
          </p>
        </div>

        {/* Tech Badges / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {TECHNOLOGIES.map((tech) => {
            const IconComp = techIconMap[tech.icon] || Code;
            return (
              <div
                key={tech.name}
                className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition-colors shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {tech.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
