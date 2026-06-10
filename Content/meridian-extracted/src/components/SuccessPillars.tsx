/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Eye, ShieldCheck, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface SuccessPillarsProps {
  language: Language;
  onStartJourney: () => void;
}

export default function SuccessPillars({ language, onStartJourney }: SuccessPillarsProps) {
  const t = DICTIONARY[language];

  return (
    <section className="py-24 bg-[#070B19] relative overflow-hidden border-t border-white/5">
      
      {/* Visual glowing design element */}
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-[#E2B254]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Explanation and list */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div>
              <span className="text-xs sm:text-sm font-sans tracking-widest text-[#E2B254] font-extrabold uppercase block mb-3">
                {t.key_success_subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight mb-4">
                {t.key_success_title}
              </h2>
              <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                {t.key_success_desc}
              </p>
            </div>

            {/* List items with icons */}
            <div className="space-y-6">
              
              {/* Item 1 */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#E2B254]/10 border border-[#E2B254]/20 text-[#E2B254] rounded-full shrink-0 h-11 w-11 flex items-center justify-center">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base mb-1">
                    {t.key_success_1_title}
                  </h4>
                  <p className="text-sm text-slate-400 font-sans leading-relaxed">
                    {t.key_success_1_desc}
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#E2B254]/10 border border-[#E2B254]/20 text-[#E2B254] rounded-full shrink-0 h-11 w-11 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base mb-1">
                    {t.key_success_2_title}
                  </h4>
                  <p className="text-sm text-slate-400 font-sans leading-relaxed">
                    {t.key_success_2_desc}
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#E2B254]/10 border border-[#E2B254]/20 text-[#E2B254] rounded-full shrink-0 h-11 w-11 flex items-center justify-center">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base mb-1">
                    {t.key_success_3_title}
                  </h4>
                  <p className="text-sm text-slate-400 font-sans leading-relaxed">
                    {t.key_success_3_desc}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Compromiso Exclusivo card */}
          <div className="lg:col-span-12 xl:col-span-5">
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#151F47]/20 border border-white/5 relative overflow-hidden shadow-sm"
              id="success-card-exclusive"
            >
              {/* Blue light corner effect */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#E2B254]/5 rounded-full blur-[30px]" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-[#E2B254]/10 text-[#E2B254] font-sans text-xs font-extrabold tracking-widest uppercase rounded-md border border-[#E2B254]/25">
                  {t.key_exclusive_badge}
                </span>
                <Sparkles className="h-5 w-5 text-[#E2B254] animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-black text-white mb-4">
                {t.key_exclusive_title}
              </h3>
              
              <p className="text-sm text-slate-350 leading-relaxed font-sans mb-8">
                {t.key_exclusive_desc}
              </p>

              <button
                onClick={onStartJourney}
                id="success-btn-exclusive"
                className="w-full py-4 bg-[#E2B254] hover:bg-[#E2B254]/90 text-brand-dark font-sans font-black rounded-full shadow-lg hover:shadow-[#E2B254]/15 transform hover:-translate-y-0.5 transition-all text-sm tracking-wide flex items-center justify-center gap-2 group cursor-pointer"
              >
                {t.key_exclusive_btn}
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
