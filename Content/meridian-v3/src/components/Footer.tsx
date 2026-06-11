/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = DICTIONARY[language];

  const navLinks = [
    { href: '#inicio', label: t.nav_home },
    { href: '#nosotros', label: t.nav_about },
    { href: '#servicios', label: t.nav_services },
    { href: '#metodologia', label: t.nav_methodology },
    { href: '#top-universidades', label: t.nav_universities },
  ];

  const crafted = language === 'EN'
    ? 'high-fidelity fluid transitions.'
    : 'transiciones fluidas de alta gama.';

  return (
    <footer className="bg-[#04060C] border-t border-white/5 py-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left trademark info */}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-brand-gold/10 border border-brand-gold/25 rounded-xl">
            <GraduationCap className="h-5 w-5 text-brand-gold" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-slate-200 text-lg tracking-tight">
              MERIDIAN
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold -mt-1">
              Apex Zenith Consulting
            </span>
          </div>
        </div>

        {/* Center nav links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-mono">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-gold transition-colors uppercase">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right copyright metadata */}
        <div className="text-center md:text-right font-mono text-[10px] text-slate-500 space-y-1">
          <p>© 2026 Meridian Elite Admissions Consulting.</p>
          <p className="flex items-center justify-center md:justify-end gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-brand-crimson fill-brand-crimson" />
            <span>{crafted}</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
