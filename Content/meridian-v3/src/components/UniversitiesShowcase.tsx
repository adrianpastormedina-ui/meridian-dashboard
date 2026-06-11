/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, CheckCircle2, Bookmark, Trophy, GraduationCap } from 'lucide-react';
import { Language, University } from '../types';
import { DICTIONARY, UNIVERSITIES_DATA } from '../data';

interface UniversitiesShowcaseProps {
  language: Language;
}

export default function UniversitiesShowcase({ language }: UniversitiesShowcaseProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState<'All' | 'US' | 'UK'>('All');
  const t = DICTIONARY[language];

  // Filtering criteria
  const filteredUnis = UNIVERSITIES_DATA.filter((uni) => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.topDegrees.some(degree => degree.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedLocation === 'All') return matchesSearch;
    if (selectedLocation === 'US') return matchesSearch && !uni.location.includes('UK');
    if (selectedLocation === 'UK') return matchesSearch && uni.location.includes('UK');
    
    return matchesSearch;
  });

  return (
    <section id="top-universidades" className="py-24 bg-[#070B19] relative overflow-hidden scroll-mt-10">
      <div className="absolute top-0 right-[20%] w-[350px] h-[350px] bg-[#AE2024]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#AE2024] font-bold uppercase block mb-3">
              {t.unis_subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              {t.unis_title}
            </h2>
          </div>

          {/* Location Filters */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 space-x-1 self-start md:self-auto">
            {(['All', 'US', 'UK'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedLocation === loc 
                    ? 'bg-brand-gold text-brand-dark shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {loc === 'All' ? t.unis_filter_all : loc === 'US' ? t.unis_filter_us : t.unis_filter_uk}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Search Box */}
        <div className="mb-10 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={t.unis_search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 hover:bg-slate-950 border border-white/10 focus:border-brand-gold/50 rounded-2xl pl-12 pr-4 py-3.5 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
            />
          </div>
        </div>

        {/* Dynamic Universities Grid with Smooth Exit/Entrance Animations */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          id="universities-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredUnis.map((uni) => (
              <motion.div
                layout
                key={uni.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-6 sm:p-8 border border-white/5 relative flex flex-col justify-between overflow-hidden group"
              >
                {/* Decorative university bar indicator */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2.5" 
                  style={{ backgroundColor: uni.badgeColor }}
                />

                <div className="space-y-4">
                  <div className="flex justify-between items-start pl-2">
                    <div>
                      <h3 className="text-xl font-display font-bold text-slate-100 mb-1 group-hover:text-brand-gold transition-colors">
                        {uni.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {uni.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 pl-2 leading-relaxed">
                    {language === 'EN' ? uni.description_en : uni.description}
                  </p>

                  {/* Sub Rates Card Area */}
                  <div className="bg-slate-950/60 p-4 border border-white/5 rounded-2xl space-y-2 ml-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold">{t.unis_general_rate}</span>
                      <span className="text-[#AE2024] font-mono font-bold text-sm">{uni.generalAdmitRate}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold">{t.unis_meridian_rate}</span>
                      <span className="text-brand-gold font-mono font-bold text-sm bg-brand-gold/10 px-2 py-0.5 border border-brand-gold/15 rounded-md">
                        {uni.meridianAdmitRate}%
                      </span>
                    </div>
                  </div>

                  {/* Top careers listed tags */}
                  <div className="pl-2">
                    <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-brand-gold uppercase block mb-2">
                      {t.unis_top_degrees}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uni.topDegrees.map((degree, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 text-[10px] font-sans font-medium rounded-full bg-white/5 border border-white/10 text-slate-300"
                        >
                          {degree}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acceptance tags footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center pl-2">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                    <Bookmark className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Offers:</span>
                    <strong className="text-slate-200">{uni.meridianOffers}</strong>
                  </div>
                  <div className="text-[11px] font-mono text-[#AE2024] font-bold tracking-wider uppercase flex items-center gap-0.5">
                    <Trophy className="h-3 w-3" />
                    {t.unis_top_choice}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results placeholder */}
        {filteredUnis.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-display">
            {t.unis_no_results}
          </div>
        )}

      </div>
    </section>
  );
}
