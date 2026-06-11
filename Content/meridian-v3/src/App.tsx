/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, CheckCircle, Clock } from 'lucide-react';

// Specialized Sub-Components
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SuccessPillars from './components/SuccessPillars';
import StatsSection from './components/StatsSection';
import Timeline from './components/Timeline';
import UniversitiesShowcase from './components/UniversitiesShowcase';
import AdvisorsSection from './components/AdvisorsSection';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// TypeScript Types
import { Language, Tutor } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('ES');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedConsultationTutor, setSelectedConsultationTutor] = useState<Tutor | null>(null);
  const [showConsultationSuccess, setShowConsultationSuccess] = useState(false);

  const handleOpenConsultation = (tutor: Tutor) => {
    setSelectedConsultationTutor(tutor);
  };

  const handleSettleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConsultationSuccess(true);
    setTimeout(() => {
      setShowConsultationSuccess(false);
      setSelectedConsultationTutor(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden font-sans text-slate-100 flex flex-col justify-between selection:bg-brand-gold/30 selection:text-white">
      
      {/* Dynamic Header */}
      <Header 
        language={language}
        setLanguage={setLanguage}
        activeSection="inicio"
        setActiveSection={() => {}}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isLoggedIn={false}
        onLogout={() => {}}
      />

      {/* Main Landing Page Content */}
      <main className="flex-grow">

        {/* SMART TIPS BANNER */}
        <div className="bg-slate-900/60 border-y border-white/5 py-3 text-center text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold animate-pulse" />
            <span>
              {language === 'ES' 
                ? '¿Ya eres alumno? Accede a tu portal académico haciendo click en ' 
                : 'Already a student? Access your academic portal by clicking on '}
              <strong 
                onClick={() => setIsAuthModalOpen(true)}
                className="text-brand-gold cursor-pointer underline hover:text-white transition-colors"
              >
                {language === 'ES' ? 'Iniciar Camino' : 'Start Journey'}
              </strong>
            </span>
          </span>
        </div>

        {/* Core sections */}
        <div id="inicio">
          <Hero 
            language={language}
            onOpenPortal={() => setIsAuthModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            isLoggedIn={false}
          />
        </div>

        <div id="nosotros">
          <AboutSection language={language} />
        </div>

        <div id="servicios">
          <SuccessPillars 
            language={language}
            onStartJourney={() => setIsAuthModalOpen(true)}
          />
        </div>

        <StatsSection language={language} />

        <Timeline language={language} />

        {/* Universities section with id for nav scroll */}
        <div id="top-universidades">
          <UniversitiesShowcase language={language} />
        </div>

        <AdvisorsSection 
          language={language} 
          onOpenConsultation={handleOpenConsultation}
        />

      </main>

      {/* FOOTER */}
      <Footer language={language} />

      {/* AUTHENTICATION DIALOG */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal 
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            language={language}
            onLoginSuccess={() => {}}
          />
        )}
      </AnimatePresence>

      {/* DIALOG MODAL: Book Counselor consultation */}
      <AnimatePresence>
        {selectedConsultationTutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 font-sans">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedConsultationTutor(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass rounded-3xl p-6 sm:p-8 border border-white/10 max-w-md w-full relative z-10 shadow-2xl space-y-6"
              id="consultation-booking-modal"
            >
              <div className="border-b border-white/5 pb-4 flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-1 bg-brand-gold/15 text-brand-gold border border-brand-gold/20 text-[9px] font-mono tracking-widest font-bold uppercase rounded-md">
                    ASESORÍA PERSONALIZADA
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-2">
                    Llamada de Evaluación Gratuita
                  </h3>
                  <p className="text-xs text-slate-400">Asesor: {selectedConsultationTutor.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedConsultationTutor(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  ✕
                </button>
              </div>

              {showConsultationSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="inline-flex p-4 bg-emerald-500/15 rounded-full text-emerald-400 border border-emerald-500/25">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-display font-bold text-slate-100 text-lg">¡Solicitud Registrada con Éxito!</h4>
                  <p className="text-xs text-slate-400">Nos pondremos en contacto vía Whatsapp o correo en un lapso de 4 horas hábiles.</p>
                </div>
              ) : (
                <form onSubmit={handleSettleConsultation} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-slate-400">NOMBRE DEL ALUMNO / APODERADO</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Adrian Pastor"
                      className="w-full bg-slate-950/80 hover:bg-slate-950 border border-white/5 focus:border-brand-gold/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-slate-400">WHATSAPP / CELULAR DE CONTACTO</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Ex: +51 987 654 321"
                      className="w-full bg-slate-950/80 hover:bg-slate-950 border border-white/5 focus:border-brand-gold/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-slate-400">¿QUÉ CURRICULUM O GRADO CURSA ACTUALMENTE?</label>
                    <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-brand-gold">
                      <option>10° Grado (Iniciando Programa IB)</option>
                      <option>11° Grado (Mitad de Programa IB)</option>
                      <option>12° Grado (Fase Final de Envío de Ensayos)</option>
                      <option>9° Grado u otro (Asesoría Estratégica Precoz)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                    >
                      Agendar Mi Llamada de Diagnóstico
                      <Clock className="h-4 w-4" />
                    </button>
                    <span className="text-[9px] font-mono text-slate-500 text-center block mt-2">
                      Al agendar, aceptas que analicemos de forma personalizada el plan académico.
                    </span>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}
