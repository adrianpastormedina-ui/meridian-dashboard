/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Percent, TrendingUp } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, UNIVERSITIES_DATA } from '../data';

interface StatsSectionProps {
  language: Language;
}

export default function StatsSection({ language }: StatsSectionProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const t = DICTIONARY[language];

  const statCards = [
    {
      id: 'likelyhood',
      value: '7x',
      label: t.stats_factor_highlight,
      sub: t.stats_factor_desc,
      icon: TrendingUp,
      color: 'from-[#E2B254] to-amber-500'
    },
    {
      id: 'offers',
      value: t.stats_offers_count,
      label: t.stats_offers_desc,
      sub: t.stats_offers_sent,
      icon: Award,
      color: 'from-[#AE2024] to-[#AE2023]'
    }
  ];

  const currentUni = UNIVERSITIES_DATA[selectedIndex];

  return (
    <section className="py-24 bg-[#070B19] relative overflow-hidden border-t border-white/5" id="estadisticas-crimson">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-sans tracking-widest text-[#E2B254] font-extrabold uppercase block mb-3">
            {t.stats_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight mb-4">
            {t.stats_title}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.stats_audited_desc}
          </p>
        </div>

        {/* BENTO GRID: Stats Summaries & Comparative Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Counters */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#151F47]/20 border border-white/5 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-sans font-bold text-[#E2B254] mb-3 uppercase tracking-wider">
                {t.stats_proven_badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-black text-white mb-4">
                {t.stats_effect_title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {t.stats_effect_desc}
              </p>
              
              <div className="flex bg-[#070B19]/80 rounded-2xl p-4 border border-white/5 items-center space-x-4">
                <div className="p-2.5 bg-[#E2B254]/10 rounded-xl text-[#E2B254]">
                  <Percent className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.stats_ib_label}</div>
                  <div className="text-xs text-slate-400">{t.stats_ib_sub}</div>
                </div>
              </div>
            </div>

            {/* Stat Cards with Hover Trigger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl bg-[#151F47]/20 border border-white/5 shadow-sm relative flex flex-col justify-between h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-3xl sm:text-4xl font-sans font-black text-[#E2B254]">
                        {card.value}
                      </span>
                      <div className="p-2 bg-[#E2B254]/10 rounded-xl text-[#E2B254]">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 leading-snug">{card.label}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed break-words">{card.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Comparative Bar Chart */}
          <div className="lg:col-span-12 xl:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#151F47]/10 border border-white/5 shadow-sm flex flex-col justify-between relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-sans font-bold text-[#E2B254] tracking-widest uppercase block mb-1">
                  {t.stats_ivy_badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-white">
                  {t.stats_comparison}
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-xs bg-[#070B19] p-2.5 rounded-xl border border-white/5">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 bg-[#AE2024] rounded-sm" />
                  <span className="text-slate-400">General</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 bg-[#E2B254] rounded-sm" />
                  <span className="text-brand-gold font-bold">Meridian</span>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Bar Graph (Just like the Crimson UI) */}
            <div className="space-y-4">
              {UNIVERSITIES_DATA.slice(0, 7).map((uni, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <div 
                    key={uni.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#0c122c] border border-[#E2B254]/30 shadow-md' 
                        : 'border border-transparent hover:bg-[#151F47]/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: uni.badgeColor }} />
                        <span>{uni.name}</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Admit: <strong className="text-[#AE2024]">{uni.generalAdmitRate}%</strong> vs <strong className="text-[#E2B254]">{uni.meridianAdmitRate}%</strong>
                      </span>
                    </div>

                    {/* Bars Stack container */}
                    <div className="w-full h-3 bg-[#070B19] rounded-full overflow-hidden flex relative">
                      {/* General Rate (Red bar) */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(uni.generalAdmitRate / 45) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-[#AE2024] rounded-l-full relative"
                      />
                      {/* Gap offset */}
                      <div className="w-[1px] bg-gray-100 z-10" />
                      {/* Meridian Rate (Gold bar) */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(uni.meridianAdmitRate / 45) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                        className="h-full bg-[#E2B254] rounded-r-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Admission rates explanation based on the active selection */}
            <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-xs text-slate-350 leading-relaxed max-w-xl">
                <span className="text-[#E2B254] font-bold">{t.stats_tip_label}: </span> 
                {language === 'EN' ? currentUni.description_en : currentUni.description}
              </div>
              <div className="text-xs bg-[#AE2024]/10 border border-[#AE2024]/30 px-3 py-1.5 rounded-xl text-[#E2B254] font-extrabold shrink-0">
                {t.stats_offers_label}: {currentUni.meridianOffers}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
