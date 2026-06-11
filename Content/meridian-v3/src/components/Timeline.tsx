/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, BookOpen, PenTool, Award, Search, CheckCircle, Flame } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, TIMELINE_DATA } from '../data';

interface TimelineProps {
  language: Language;
}

export default function Timeline({ language }: TimelineProps) {
  const t = DICTIONARY[language];

  // Use grade_en or grade depending on language
  const gradeLabel = (m: typeof TIMELINE_DATA[0]) =>
    language === 'EN' ? m.grade_en : m.grade;

  const grades = TIMELINE_DATA.map(gradeLabel);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const currentMilestone = TIMELINE_DATA[activeIndex];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'IB':
        return <BookOpen className="h-5 w-5 text-[#AE2024]" />;
      case 'SAT':
        return <Award className="h-5 w-5 text-[#E2B254]" />;
      case 'Profile':
        return <Flame className="h-5 w-5 text-[#E2B254]" />;
      case 'Essays':
        return <PenTool className="h-5 w-5 text-emerald-400" />;
      default:
        return <CheckCircle className="h-5 w-5 text-slate-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'IB':
        return 'border-[#AE2024]/30 bg-[#AE2023]/10 text-[#AE2024]';
      case 'SAT':
        return 'border-[#E2B254]/30 bg-[#E2B254]/10 text-[#E2B254]';
      case 'Profile':
        return 'border-[#E2B254]/30 bg-[#E2B254]/10 text-[#E2B254]';
      case 'Essays':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      default:
        return 'border-white/5 bg-white/5 text-slate-300';
    }
  };

  return (
    <section id="metodologia" className="py-24 bg-[#070B19] relative overflow-hidden scroll-mt-10 border-t border-white/5">
      
      {/* Background radial highlight */}
      <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] bg-[#E2B254]/5 rounded-full blur-[130px]" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[#AE2024]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Indicator */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-sans tracking-widest text-[#E2B254] font-extrabold uppercase block mb-3">
            {t.timeline_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight mb-4">
            {t.timeline_title}
          </h2>
          <p className="text-slate-350 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.timeline_desc}
          </p>
        </div>

        {/* Dynamic Grade Selector Tabs */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex p-1.5 bg-[#151F47]/40 border border-white/5 rounded-2xl shadow-sm max-w-full overflow-x-auto gap-1">
            {TIMELINE_DATA.map((milestone, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={milestone.id}
                  onClick={() => setActiveIndex(index)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-sans text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-[#E2B254] text-brand-dark font-black shadow-md' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {gradeLabel(milestone)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expanded Milestone Stage Area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div 
                className="bg-[#151F47]/20 p-6 sm:p-8 rounded-2xl border border-white/5 relative flex flex-col sm:flex-row gap-6 items-start shadow-sm"
              >
                {/* Category Icon */}
                <div className={`p-4 rounded-2xl border shrink-0 ${getCategoryColor(currentMilestone.category)}`}>
                  {getCategoryIcon(currentMilestone.category)}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-sans font-bold tracking-wider uppercase bg-[#E2B254]/10 text-[#E2B254] border border-[#E2B254]/20 rounded-md">
                      {currentMilestone.category} FOCUS
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {language === 'EN' ? currentMilestone.period_en : currentMilestone.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-sans font-black text-white">
                    {language === 'EN' ? currentMilestone.title_en : currentMilestone.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {language === 'EN' ? currentMilestone.description_en : currentMilestone.description}
                  </p>

                  {/* Checklists */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-400">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#E2B254] shrink-0" />
                      <span>{t.timeline_check_1}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#E2B254] shrink-0" />
                      <span>{t.timeline_check_2}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#E2B254] shrink-0" />
                      <span>{t.timeline_check_3}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#E2B254] shrink-0" />
                      <span>{t.timeline_check_4}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
