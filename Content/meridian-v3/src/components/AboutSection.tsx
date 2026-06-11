/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Eye, Target, Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = DICTIONARY[language];

  // Animation configuration
  const cardHover = {
    hover: {
      y: -5,
      borderColor: 'rgba(226, 178, 84, 0.3)',
      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="nosotros" className="relative py-24 bg-[#070B19] overflow-hidden scroll-mt-10 border-t border-white/5">
      
      {/* Soft background visual glow layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-sans tracking-widest text-[#E2B254] font-extrabold uppercase block mb-3"
          >
            {t.about_subtitle}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-white mb-4"
          >
            {t.about_title}
          </motion.h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Mission Card */}
          <motion.div
            variants={cardHover}
            whileHover="hover"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="bg-[#0C122C] p-8 sm:p-10 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden group"
            id="about-card-mission"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-300">
              <Compass className="h-28 w-28 text-white" />
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3.5 bg-brand-gold/10 rounded-2xl border border-brand-gold/20 text-[#E2B254]">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                {t.about_mission_title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {t.about_mission_desc}
            </p>

            <div className="mt-8 flex items-center space-x-2 text-xs font-mono tracking-widest text-[#E2B254] font-bold uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Transcribiendo Rigor Integral</span>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={cardHover}
            whileHover="hover"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.1 }}
            className="bg-[#0C122C] p-8 sm:p-10 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden group"
            id="about-card-vision"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-300">
              <Eye className="h-28 w-28 text-white" />
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3.5 bg-brand-gold/10 rounded-2xl border border-brand-gold/20 text-[#E2B254]">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                {t.about_vision_title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {t.about_vision_desc}
            </p>

            <div className="mt-8 flex items-center space-x-2 text-xs font-mono tracking-widest text-[#E2B254] font-bold uppercase mb-1">
              <Target className="h-3.5 w-3.5" />
              <span>Formando Líderes del Futuro</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
