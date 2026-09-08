import React from 'react';
import { ABOUT_STATS } from '../data/constants';
import { Layers, CheckCircle2, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-950/40 relative border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              About Afresh IT
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Technology That Moves Your <span className="text-gradient">Business Forward</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              At Afresh IT, we specialize in delivering high-impact, custom software engineered to solve complex business challenges. From responsive web applications to artificial intelligence integrations, we build reliable digital systems tailored to your vision.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Our engineering philosophy combines technical precision, clean maintainable code, and modern design ethics—ensuring every solution is built to scale seamlessly.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-slate-300 text-sm font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Agile Development</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>Full-Stack Expertise</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>AI-Assisted Workflows</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span>24/7 Cloud Monitoring</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3 Pillar Feature Cards */}
          <div className="lg:col-span-6 space-y-4">
            {ABOUT_STATS.map((stat, idx) => (
              <div
                key={stat.title}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800/80 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-700/30 text-purple-400 shrink-0">
                  {idx === 0 && <Layers className="w-6 h-6 text-cyan-400" />}
                  {idx === 1 && <Award className="w-6 h-6 text-purple-400" />}
                  {idx === 2 && <Users className="w-6 h-6 text-emerald-400" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{stat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
