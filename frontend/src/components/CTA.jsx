import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-card rounded-3xl p-10 md:p-16 border border-purple-500/30 overflow-hidden text-center shadow-2xl">
          
          {/* Subtle Background Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-700/50 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Ready to Accelerate Your Growth?
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have a Project <span className="text-gradient">in Mind?</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-xl font-medium">
              Let's turn your idea into a powerful digital solution.
            </p>

            <div className="pt-4">
              <button
                onClick={handleScrollToContact}
                className="glow-btn px-9 py-4 rounded-full text-base font-semibold text-white inline-flex items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
