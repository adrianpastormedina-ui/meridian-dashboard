/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  ArrowLeft, 
  GraduationCap, 
  Calendar, 
  Bot, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Specialized Sub-Components
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SuccessPillars from './components/SuccessPillars';
import StatsSection from './components/StatsSection';
import Timeline from './components/Timeline';
import UniversitiesShowcase from './components/UniversitiesShowcase';
import AdvisorsSection from './components/AdvisorsSection';
import StudentPortal from './components/StudentPortal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

// TypeScript Types
import { Language, SectionType, Tutor } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('ES');
  const [activeSection, setActiveSection] = useState<SectionType>('inicio');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'tutor'>('student');
  const [selectedConsultationTutor, setSelectedConsultationTutor] = useState<Tutor | null>(null);
  const [showConsultationSuccess, setShowConsultationSuccess] = useState(false);

  // Authentication Mock Hook
  const handleLoginSuccess = (role: 'student' | 'tutor') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setActiveSection('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('inicio');
  };

  // Advisory schedule simulation
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
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Content Areas with smooth routing wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === 'portal' ? (
            
            /* PORTAL ROUTE */
            <motion.div
              key="portal-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={() => setActiveSection('inicio')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-brand-gold text-xs sm:text-sm font-semibold rounded-xl border border-white/5 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {language === 'ES' ? 'Volver al Inicio' : 'Back to Home'}
                </button>

                <div className="text-xs text-slate-400 font-mono hidden sm:block">
                  Conectado como: <strong className="text-brand-gold">{userRole === 'student' ? 'Estudiante Diego' : 'Tutor / Admin'}</strong>
                </div>
              </div>

              {/* Comprehensive Student Portal Simulation */}
              <StudentPortal language={language} />

            </motion.div>

          ) : (

            /* LANDING HOMEPAGE ROUTE */
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* SMART TIPS BANNER: Letting users bypass auth immediately */}
              <div className="bg-slate-900/60 border-y border-white/5 py-3 text-center text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5 font-sans">
                  <Sparkles className="h-3.5 w-3.5 text-brand-gold animate-pulse" />
                  <span>
                    {language === 'ES' 
                      ? '¿Quieres auditar de inmediato los reportes y el simulador de horas? Pruébalo ahora dando click en ' 
                      : 'Want to inspect academic logs and hour builders immediately? Try now clicking on '}
                    <strong 
                      onClick={() => setActiveSection('portal')}
                      className="text-brand-gold cursor-pointer underline hover:text-white transition-colors"
                    >
                      {language === 'ES' ? 'Ir al Portal Académico' : 'Go to Portal Platform'}
                    </strong>
                  </span>
                </span>
              </div>

              {/* Core sections */}
              <Hero 
                language={language}
                onOpenPortal={() => setActiveSection('portal')}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                isLoggedIn={isLoggedIn}
              />

              <AboutSection language={language} />

              <SuccessPillars 
                language={language}
                onStartJourney={() => setIsAuthModalOpen(true)}
              />

              {/* Crimson style rates stats */}
              <StatsSection language={language} />

              {/* High-school Milestones Roadmap */}
              <Timeline language={language} />

              {/* Top Choices searchable grid */}
              <UniversitiesShowcase language={language} />

              {/* Specialists list with consultation mockup triggers */}
              <AdvisorsSection 
                language={language} 
                onOpenConsultation={handleOpenConsultation}
              />

            </motion.div>
          )}
        </AnimatePresence>
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
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>

      {/* DIALOG MODAL: Book Counselor mock consultation */}
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
                    <select 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-brand-gold"
                    >
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

    </div>
  );
}
