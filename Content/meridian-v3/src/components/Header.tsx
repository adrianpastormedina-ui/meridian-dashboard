/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Globe, Monitor, ArrowRight, Menu, X } from 'lucide-react';
import { Language, SectionType } from '../types';
import { DICTIONARY } from '../data';
import AnimatedLogo from './AnimatedLogo';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeSection: SectionType | string;
  setActiveSection: (section: SectionType) => void;
  onOpenAuthModal: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({
  language,
  setLanguage,
  activeSection,
  setActiveSection,
  onOpenAuthModal,
  isLoggedIn,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = DICTIONARY[language];

  // Fluid transition helper
  const handleNavClick = (section: SectionType) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    
    if (section !== 'portal') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems: { id: SectionType; label: string }[] = [
    { id: 'inicio', label: t.nav_home },
    { id: 'nosotros', label: t.nav_about },
    { id: 'servicios', label: t.nav_services },
    { id: 'top-universidades', label: t.nav_universities },
    { id: 'portal', label: t.nav_portal }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070B19]/80 border-b border-white/5 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Brand Logo with Premium Styling */}
        <div 
          onClick={() => handleNavClick('inicio')}
          className="flex items-center space-x-3 cursor-pointer group"
          id="logo-meridian"
        >
          <AnimatedLogo size={42} />
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-xl sm:text-2xl tracking-tighter text-white">
              MERIDIAN<span className="text-brand-gold">.</span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#E2B254]/90 font-bold -mt-1">
              Apex Zenith Consulting
            </span>
          </div>
        </div>

        {/* Desktop Navigation Link Menu */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-item-${item.id}`}
                className={`relative px-3 sm:px-4 py-2 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isActive 
                    ? 'text-brand-gold font-extrabold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5 rounded-lg'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Hand Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Language Selector ES/EN */}
          <div className="flex bg-[#0C122C] rounded-full p-1 border border-white/10" id="lang-selector">
            <button
              onClick={() => setLanguage('ES')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                language === 'ES' 
                  ? 'bg-brand-gold text-brand-dark shadow-md font-extrabold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                language === 'EN' 
                  ? 'bg-brand-gold text-brand-dark shadow-md font-extrabold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Action Call for Portal / Auth */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('portal')}
                className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark rounded-xl text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
              >
                <Monitor className="h-4 w-4" />
                Portal
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-white underline font-medium cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              id="cta-sign-in"
              className="px-6 py-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-lg hover:shadow-brand-gold/15"
            >
              {t.nav_start}
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          )}

        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Quick Lang Switch */}
          <button
            onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
            className="p-2 text-brand-gold hover:bg-white/5 rounded-lg flex items-center gap-1 border border-white/10"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-mono font-bold">{language}</span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none cursor-pointer"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#0C122C] border-t border-white/5 px-4 pt-2 pb-6 space-y-3 shadow-2xl"
          id="mobile-nav-drawer"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 font-sans text-sm font-bold uppercase tracking-wide rounded-xl ${
                activeSection === item.id 
                  ? 'bg-brand-gold/10 text-brand-gold border-l-4 border-brand-gold' 
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/5">
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('portal')}
                  className="w-full py-3 bg-brand-gold text-brand-dark rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <Monitor className="h-5 w-5" />
                  Ir al Portal Académico
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-white/5 text-slate-300 rounded-xl font-semibold text-center text-xs"
                >
                  Cerrar Sesión (Tutor/Estudiante)
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full py-3 bg-brand-gold text-brand-dark uppercase tracking-wider rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-lg"
              >
                {t.nav_start}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
