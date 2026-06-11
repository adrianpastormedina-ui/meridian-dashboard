/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, ShieldCheck, ArrowUpRight, GraduationCap } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface HeroProps {
  language: Language;
  onOpenPortal: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export default function Hero({ language, onOpenPortal, onOpenAuth, isLoggedIn }: HeroProps) {
  const t = DICTIONARY[language];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const floatingTransition = {
    y: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // Scroll downwards helper
  const scrollDown = () => {
    const nextElem = document.getElementById('nosotros');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#070B19] pt-14 pb-20">
      
      {/* Immersive high-end background glow effects and layout illustrations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-gold/5 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-brand-crimson/5 blur-[150px]" />
        
        {/* Abstract lines representing university connects */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] sm:opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#E2B254" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="85%" y1="15%" x2="15%" y2="85%" stroke="#AE2024" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="10%" cy="20%" r="4" fill="#E2B254" />
          <circle cx="90%" cy="80%" r="5" fill="#AE2024" />
          <circle cx="85%" cy="15%" r="3" fill="#E2B254" />
          <circle cx="15%" cy="85%" r="4" fill="#AE2024" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Top subtle luxury badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#0C122C] border border-white/5 rounded-full shadow-lg mb-6"
            id="hero-badge"
          >
            <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-sans tracking-widest text-[#E2B254] font-extrabold uppercase">
              {t.hero_consultancy}
            </span>
          </motion.div>

          {/* Epic Bold Typography Style Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white max-w-5xl leading-[1.05] mb-8"
            id="hero-main-title"
          >
            <span className="block text-slate-300 font-serif italic font-normal tracking-wide text-3xl sm:text-5xl md:text-6xl mb-2">
              {t.hero_title_1}
            </span>
            <span className="block text-brand-gold font-serif italic font-medium tracking-tight scale-[1.02] transform transition-transform mb-3">
              {t.hero_title_2}
            </span>
            <span className="block text-white text-5xl sm:text-7xl md:text-8.5xl font-extrabold tracking-[-0.04em] leading-[0.95]">
              {t.hero_title_3}
            </span>
          </motion.h1>

          {/* Descriptive Subtitle with optimal grid width */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10 px-2"
            id="hero-subtitle-paragraph"
          >
            {t.hero_subtitle}
          </motion.p>

          {/* Premium Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md px-4"
          >
            <button
              onClick={isLoggedIn ? onOpenPortal : onOpenAuth}
              id="hero-primary-cta"
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-sans font-extrabold text-base rounded-full shadow-lg hover:shadow-brand-gold/25 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoggedIn ? (
                <>
                  Ver Mi Alumno Portal
                  <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  {t.hero_button}
                  <GraduationCap className="h-5 w-5" />
                </>
              )}
            </button>
            
            <button
              onClick={scrollDown}
              className="w-full sm:w-auto px-6 py-4 bg-[#0C122C] border border-white/5 hover:border-white/10 hover:bg-[#151F47] text-slate-200 font-sans font-semibold text-sm rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            >
              {t.hero_scroll_hint}
            </button>
          </motion.div>

          {/* Social Proof Badges with correct Brand Gold & dark formatting */}
          <motion.div
            variants={itemVariants}
            className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 border-t border-white/5 pt-10 w-full max-w-5xl"
            id="hero-social-proof"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center text-brand-gold font-extrabold text-2xl sm:text-4xl font-sans tracking-tight">
                7x
              </div>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.1em] text-slate-400 mt-2 text-center font-bold">
                {t.hero_stat_1}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center text-brand-gold font-extrabold text-2xl sm:text-4xl font-sans tracking-tight">
                100%
              </div>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.1em] text-slate-400 mt-2 text-center font-bold">
                {t.hero_stat_2}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center text-brand-gold font-extrabold text-2xl sm:text-4xl font-sans tracking-tight">
                1500+
              </div>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.1em] text-slate-400 mt-2 text-center font-bold">
                {t.hero_stat_3}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center text-brand-gold font-extrabold text-2xl sm:text-4xl font-sans tracking-tight">
                98%
              </div>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.1em] text-slate-400 mt-2 text-center font-bold">
                {t.hero_stat_4}
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Floating Animated Golden Stars Decorating outer region */}
      <motion.div 
        animate={floatingTransition}
        className="absolute top-1/4 right-[8%] hidden lg:block pointer-events-none"
      >
        <Trophy className="h-7 w-7 text-brand-gold opacity-15" />
      </motion.div>
      <motion.div 
        animate={{...floatingTransition, y: { ...floatingTransition.y, delay: 1 }}}
        className="absolute bottom-1/4 left-[8%] hidden lg:block pointer-events-none"
      >
        <ShieldCheck className="h-7 w-7 text-brand-gold opacity-15" />
      </motion.div>
    </div>
  );
}
