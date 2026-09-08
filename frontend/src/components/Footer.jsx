import React from 'react';
import { COMPANY_INFO, NAV_LINKS } from '../data/constants';
import { Cpu, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#070a14] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-wider">
                AFRESH <span className="text-gradient">IT</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              "{COMPANY_INFO.tagline}"
            </p>

            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              We specialize in custom web applications, enterprise software architecture, cloud platforms, and generative AI solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Info</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Afresh IT. All rights reserved. Building Digital Solutions for the Future.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
