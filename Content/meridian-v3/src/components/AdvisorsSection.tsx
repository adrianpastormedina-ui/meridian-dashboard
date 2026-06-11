/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Award, Sparkles, MessageSquare, PhoneCall, ArrowRight, UserCheck } from 'lucide-react';
import { Language, Tutor } from '../types';
import { DICTIONARY, TUTORS_DATA } from '../data';

interface AdvisorsSectionProps {
  language: Language;
  onOpenConsultation: (tutor: Tutor) => void;
}

export default function AdvisorsSection({ language, onOpenConsultation }: AdvisorsSectionProps) {
  const [selectedTutor, setSelectedTutor] = React.useState<string>(TUTORS_DATA[0].id);
  const t = DICTIONARY[language];

  const currentTutor = TUTORS_DATA.find((t) => t.id === selectedTutor) || TUTORS_DATA[0];

  return (
    <section id="asesores" className="py-24 bg-brand-dark relative overflow-hidden">
      
      {/* Background radial effects */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-[#E2B254] font-bold uppercase block mb-3">
            {t.advisors_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
            {t.advisors_title}
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Dynamic Split Layout: Selector on Left, Expanded Portfolio on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          
          {/* List Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            {TUTORS_DATA.map((tutor) => {
              const isSelected = selectedTutor === tutor.id;
              return (
                <button
                  key={tutor.id}
                  onClick={() => setSelectedTutor(tutor.id)}
                  className={`w-full p-4 rounded-2xl text-left border cursor-pointer flex items-center gap-4 transition-all duration-300 ${
                    isSelected 
                      ? 'bg-brand-slate border-brand-gold shadow-lg ring-1 ring-brand-gold/20' 
                      : 'bg-brand-slate/40 hover:bg-brand-slate/80 border-white/5'
                  }`}
                >
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold text-slate-100 text-sm sm:text-base">
                      {tutor.name}
                    </h4>
                    <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider">
                      {tutor.role}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Micro value badge explaining why elite consulting */}
            <div className="bg-brand-gold/5 p-5 border border-brand-gold/15 rounded-2xl flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong>¿Sabías qué?</strong> Todos nuestros mentores escribieron monografías calificadas con grado &apos;A&apos; o rindieron el examen SAT obteniendo puntajes en el percentil 99%.
              </div>
            </div>
          </div>

          {/* Detailed Profile View Column with Staggered Animations */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTutor}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-premium rounded-3xl p-6 sm:p-10 border border-white/5 space-y-6"
                id={`advisor-profile-${currentTutor.id}`}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start justify-between pb-6 border-b border-white/5">
                  <div className="flex gap-4 items-center">
                    <img 
                      src={currentTutor.avatar} 
                      alt={currentTutor.name} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-brand-gold shadow-xl"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                        {currentTutor.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-gold font-mono font-bold uppercase tracking-wider">
                        {currentTutor.role}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2 bg-slate-900 border border-brand-gold/20 rounded-xl text-center shrink-0">
                    <span className="text-xs text-slate-400 block font-mono">CALIFICACIÓN</span>
                    <span className="text-sm font-bold text-brand-gold font-display">★ {currentTutor.rating} / 5.0</span>
                  </div>
                </div>

                {/* Coach Bio */}
                <div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {currentTutor.bio}
                  </p>
                </div>

                {/* Achievements List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider mb-3">
                      {t.advisors_achievements}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {currentTutor.achievements.map((item, id) => (
                        <li key={id} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expertise Subjects */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider mb-3">
                      {t.advisors_subjects}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentTutor.subjects.map((sub, id) => (
                        <span 
                          key={id}
                          className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-lg text-xs"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Schedule simulation button */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs text-slate-400 font-sans">
                    Reserva una llamada exploratoria gratuita con {currentTutor.name.split(' ')[0]} para planificar el año.
                  </div>
                  <button
                    onClick={() => onOpenConsultation(currentTutor)}
                    className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark rounded-xl font-display font-bold text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
                  >
                    {t.advisors_book_btn}
                    <PhoneCall className="h-4 w-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
