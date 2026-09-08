import React from 'react';
import { Sparkles, ArrowRight, Code, ShieldCheck, Terminal, Cpu, Zap, Activity } from 'lucide-react';

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-700/40 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>INNOVATION • TECHNOLOGY • GROWTH</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Building Digital Solutions for the <span className="text-gradient">Future</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-300 text-lg sm:text-xl font-normal max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              We build modern web, AI and software solutions that help businesses transform, automate and grow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleScroll('#contact')}
                className="w-full sm:w-auto glow-btn px-8 py-3.5 rounded-full text-base font-semibold text-white inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('#services')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 transition-all cursor-pointer"
              >
                Explore Services
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-slate-400">System Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">Modern</div>
                <div className="text-xs text-slate-400">Tech Architecture</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">AI Powered</div>
                <div className="text-xs text-slate-400">Automation Ready</div>
              </div>
            </div>

          </div>

          {/* Right Technology Visual Element (Pure CSS & Lucide Icons) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Background Card Container */}
            <div className="w-full max-w-md glass-card rounded-2xl p-6 border border-slate-700/50 shadow-2xl relative">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  afresh-system.config.js
                </div>
              </div>

              {/* Code Snippet & Interactive Graphics */}
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-bold">const</span>
                  <span className="text-cyan-300">afreshStack</span> = &#123;
                </div>
                <div className="pl-4 text-slate-400">
                  frontend: <span className="text-emerald-400">'React 19 + Vite'</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  backend: <span className="text-emerald-400">'Django REST Framework'</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  database: <span className="text-emerald-400">'MySQL Relational DB'</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  aiEngine: <span className="text-purple-300">'Gemini Generative AI'</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Interactive Status Indicator Grid */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Core API</div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      Active <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">AI Pipeline</div>
                    <div className="text-xs font-bold text-cyan-300">Ready</div>
                  </div>
                </div>
              </div>

              {/* Floating Glowing Badge Accent */}
              <div className="absolute -bottom-5 -left-5 glass-card px-4 py-2.5 rounded-xl border border-purple-500/30 flex items-center gap-2.5 shadow-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Enterprise Ready</div>
                  <div className="text-[10px] text-slate-400">Production Standards</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
