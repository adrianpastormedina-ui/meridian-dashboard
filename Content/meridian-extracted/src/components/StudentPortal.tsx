/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  FileText, 
  Plus, 
  Download, 
  Bot, 
  Compass, 
  Check, 
  PlusCircle, 
  DollarSign, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  CreditCard,
  Grid,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { Language, ClassPackage, Session, Materials, Tutor } from '../types';
import { DICTIONARY, TUTORS_DATA, REFRENCES_MATERIALS, INITIAL_PACKAGES, INITIAL_SESSIONS } from '../data';

interface StudentPortalProps {
  language: Language;
}

export default function StudentPortal({ language }: StudentPortalProps) {
  const t = DICTIONARY[language];
  
  // Role toggler
  const [userRole, setUserRole] = useState<'student' | 'tutor'>('student');
  const [subTab, setSubTab] = useState<'clases' | 'perfil' | 'materiales' | 'comprar'>('clases');
  
  // Data State
  const [packages, setPackages] = useState<ClassPackage[]>(INITIAL_PACKAGES);
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [materials, setMaterials] = useState<Materials[]>(REFRENCES_MATERIALS);

  // IA Report Form Modal
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [advancesInput, setAdvancesInput] = useState('');
  const [agreementsInput, setAgreementsInput] = useState('');
  const [isGeneratingIA, setIsGeneratingIA] = useState(false);

  // Hourly Buy Form Block
  const [purchaseType, setPurchaseType] = useState('IB');
  const [purchaseCurrency, setPurchaseCurrency] = useState<'USD' | 'PEN'>('USD');
  const [purchaseHours, setPurchaseHours] = useState<number>(24);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Quick stats calculables
  const totalHoursLeft = packages.reduce((acc, p) => acc + (p.status === 'active' ? (p.hoursTotal - p.hoursUsed) : 0), 0);
  const totalSpentUSD = 1490; // mock total
  const totalSpentPEN = Math.round(totalSpentUSD * 3.75);

  // Filter sessions active for pupil (Diego in the screenshots)
  const currentStudentName = "Diego Hernández";

  // Handles Saving academic reports back to session logs
  const handleSaveReport = () => {
    if (!editingSession) return;
    
    const updatedSessions = sessions.map((s) => {
      if (s.id === editingSession.id) {
        return {
          ...s,
          report: {
            advances: advancesInput || 'Progreso sobresaliente en la estructura metodológica de investigación.',
            agreements: agreementsInput || 'Completar borrador de análisis crítico para el próximo lunes.'
          }
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setEditingSession(null);
    setAdvancesInput('');
    setAgreementsInput('');
  };

  // Automated IA text layout simulator
  const handleTriggerIAHelper = () => {
    setIsGeneratingIA(true);
    setTimeout(() => {
      if (editingSession?.subject.includes('TdC')) {
        setAdvancesInput('Alineamos los avances de la sesión estructurando la Teoría del Conocimiento: analizamos la formulación de preguntas de conocimiento basadas en la física cuántica, contrastando marcos de racionalidad científica.');
        setAgreementsInput('Diego redactará un borrador de 400 palabras centrado en la perspectiva contra-analítica, usando autores sugeridos el fin de semana.');
      } else if (editingSession?.subject.includes('Física')) {
        setAdvancesInput('Alineamos los avances de la medición del experimento LC de electromagnetismo: revisamos el cálculo matemático de incertidumbres porcentuales acumuladas.');
        setAgreementsInput('Diego completará la tabulación de datos residuales y corregirá el marco empírico.');
      } else {
        setAdvancesInput('Desarrollamos una evaluación profunda en las metodologías recomendadas, identificando brechas analíticas y definiendo planes correctivos.');
        setAgreementsInput('Estructurar la bibliografía de referencia primaria según las pautas revisadas de estilo APA.');
      }
      setIsGeneratingIA(false);
    }, 1200);
  };

  // Computed hourly pricing
  const calculatePrice = () => {
    // 1 hour of IB = ~23 USD, pre-IB = ~20 USD
    const hourlyRate = purchaseType === 'IB' ? 23 : 20;
    const usdPrice = Math.round(purchaseHours * hourlyRate);
    const penPrice = Math.round(usdPrice * 3.75);
    return { usdPrice, penPrice };
  };

  const { usdPrice, penPrice } = calculatePrice();

  // Executing purchase hours
  const handleCheckoutPurchase = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      const newPackage: ClassPackage = {
        id: `p_new_${Date.now()}`,
        name: `Paquete Adquirido (${purchaseType} Specialization)`,
        modalidad: `MODALIDAD: MÁXIMO ${purchaseHours} HORAS`,
        hoursTotal: purchaseHours,
        hoursUsed: 0,
        pricePEN: penPrice,
        priceUSD: usdPrice,
        status: 'active'
      };
      setPackages([newPackage, ...packages]);
      setPaymentSuccess(false);
      setSubTab('clases');
    }, 2000);
  };

  return (
    <section id="portal" className="py-20 bg-brand-dark relative overflow-hidden scroll-mt-10 border-t border-white/5">
      
      {/* Decorative background grid highlights */}
      <div className="absolute top-0 right-10 w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-crimson/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Title */}
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-sans tracking-widest text-[#E2B254] font-extrabold uppercase block mb-3">
            HERRAMIENTA INTERACTIVA PORTAL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight mb-4">
            {t.portal_welcome}
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Simula las dos caras de la asesoría Meridian en tiempo real: interactúa como estudiante o audita como tutor.
          </p>
        </div>

        {/* Global Control Tab Row (Student vs Tutor mode) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#0C122C] rounded-2xl border border-white/5 shadow-2xl">
            <button
              onClick={() => {
                setUserRole('student');
                setSubTab('clases');
              }}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold tracking-wide transition-all ease-out flex items-center gap-2 cursor-pointer ${
                userRole === 'student'
                  ? 'bg-brand-gold text-brand-dark shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              {t.portal_student_tab}
            </button>
            <button
              onClick={() => {
                setUserRole('tutor');
                setSubTab('clases');
              }}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold tracking-wide transition-all ease-out flex items-center gap-2 cursor-pointer ${
                userRole === 'tutor'
                  ? 'bg-brand-gold text-brand-dark shadow-md font-extrabold'
                  : 'text-slate-405 hover:text-white'
              }`}
            >
              <Bot className="h-4 w-4" />
              {t.portal_admin_tab}
            </button>
          </div>
        </div>

        {/* MAIN PORTAL AREA CONTAINER */}
        <div className="bg-[#0C122C] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          
          {/* Top Info Bar based on role */}
          {userRole === 'student' ? (
            <div className="bg-[#151F47]/40 border-b border-white/5 py-5 px-6 sm:px-8 flex flex-col xl:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E2B254] shrink-0">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80" alt="Student avatar" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-white text-md sm:text-lg flex items-center gap-2">
                    {currentStudentName}
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded">ONLINE</span>
                  </h3>
                  <p className="text-xs text-slate-300">Colegio Peruano Norteamericano Abraham Lincoln</p>
                </div>
              </div>

              {/* Sub navbar tabs for student portal dashboard */}
              <div className="flex flex-wrap bg-[#070B19] p-1 rounded-xl gap-1 border border-white/5">
                <button
                  onClick={() => setSubTab('clases')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${subTab === 'clases' ? 'bg-[#E2B254] text-brand-dark shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Paquetes de Clases
                </button>
                <button
                  onClick={() => setSubTab('perfil')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${subTab === 'perfil' ? 'bg-[#E2B254] text-brand-dark shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Perfil Académico
                </button>
                <button
                  onClick={() => setSubTab('materiales')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${subTab === 'materiales' ? 'bg-[#E2B254] text-brand-dark shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {t.portal_materials}
                </button>
                <button
                  onClick={() => setSubTab('comprar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${subTab === 'comprar' ? 'bg-[#E2B254] text-brand-dark shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Comprar Horas
                </button>
              </div>

            </div>
          ) : (
            /* Tutor Admin Header controls */
            <div className="bg-[#151F47]/40 border-b border-white/5 py-6 px-6 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl text-brand-gold shadow-md">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-white text-md sm:text-xl flex items-center gap-2">
                      Control Panel: Tutor Corporativo
                    </h3>
                    <p className="text-xs text-slate-300">Administrador: Adrian Pastor</p>
                  </div>
                </div>

                {/* KPI block in tutor admin dashboard */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-[#070B19] p-3 rounded-2xl border border-white/5 text-center shadow-lg">
                  <div>
                    <span className="text-[10px] font-sans tracking-wider font-semibold uppercase text-slate-400 block">{t.portal_total_earnings}</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-400 font-sans">S/. 11,916.67 SOL / $3,176 USD</span>
                  </div>
                  <div className="w-px h-8 bg-white/5 hidden sm:block" />
                  <div>
                    <span className="text-[10px] font-sans tracking-wider font-semibold uppercase text-slate-400 block">{t.portal_active_students}</span>
                    <span className="text-sm sm:text-base font-bold text-white font-sans">2 Alumnos</span>
                  </div>
                  <div className="w-px h-8 bg-white/5 hidden sm:block" />
                  <div>
                    <span className="text-[10px] font-sans tracking-wider tracking-widest font-semibold uppercase text-slate-400 block">{t.portal_packages_sold}</span>
                    <span className="text-sm sm:text-base font-bold text-brand-gold font-sans">8 / Activos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE CONTENT SUBPANALS */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              
              {/* STUDENT VIEW FLOW */}
              {userRole === 'student' && (
                <motion.div
                  key={subTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  
                  {/* TAB 1: Clases Packages & Session History */}
                  {subTab === 'clases' && (
                    <div className="space-y-8">
                      {/* Top quick counter display card */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#151F47]/40 border border-white/5 rounded-2xl p-6 items-center">
                        <div className="md:col-span-8 space-y-2">
                          <span className="px-2.5 py-1 bg-brand-gold/15 text-[#E2B254] border border-brand-gold/20 rounded-lg text-[10px] font-sans font-bold tracking-widest uppercase inline-block">
                            ESTADO DE HORAS
                          </span>
                          <h4 className="text-lg sm:text-xl font-sans font-black text-white">
                            Te quedan {totalHoursLeft} HORAS de clases contratadas.
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                            ¡Restaura tus horas fácilmente! Al consumirse te enviaremos una alerta de renovación. Los paquetes vencen después de finalizado el calendario del Bachillerato.
                          </p>
                        </div>
                        <div className="md:col-span-4 shrink-0 flex flex-col items-center bg-[#070B19] border border-white/5 py-4 px-6 rounded-xl">
                          <span className="text-xs text-slate-400 font-sans font-semibold">TASA ESTIMADA DE USO</span>
                          <span className="text-3xl font-sans font-black text-[#E2B254] mt-1">1.5h / sem</span>
                        </div>
                      </div>

                      {/* Package list matching slide 7 and 9 */}
                      <div className="space-y-6">
                        <h4 className="text-sm font-sans font-bold text-[#E2B254] uppercase tracking-widest">
                          TUS PAQUETES DE CONSULTORÍA
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {packages.map((pack) => {
                            const percentUsed = (pack.hoursUsed / pack.hoursTotal) * 100;
                            return (
                              <div 
                                key={pack.id} 
                                className="bg-[#151F47]/20 p-5 rounded-xl border border-white/10 shadow-md relative overflow-hidden flex flex-col justify-between hover:border-brand-gold/30 transition-all"
                              >
                                <div className="space-y-3">
                                  <div className="flex justify-between items-start gap-3">
                                    <div>
                                      <h5 className="font-sans font-bold text-white text-sm sm:text-base">
                                        {pack.name}
                                      </h5>
                                      <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-450">
                                        {pack.modalidad}
                                      </span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      pack.status === 'active' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                        : 'bg-white/5 text-slate-400 border border-white/5'
                                    }`}>
                                      {pack.status === 'active' ? 'ACTIVO' : 'TERMINADO'}
                                    </span>
                                  </div>

                                  {/* Horizontal percentage usage bar */}
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-mono text-slate-400">
                                      <span>Consumido: {pack.hoursUsed}h</span>
                                      <span>Total: {pack.hoursTotal}h</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#070B19] rounded-full overflow-hidden border border-white/5">
                                      <div 
                                        className="h-full bg-brand-gold rounded-full" 
                                        style={{ width: `${percentUsed}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                                  <span className="text-slate-400">Precio Ref:</span>
                                  <strong className="text-[#E2B254]">S/. {pack.pricePEN} SOL / ${pack.priceUSD} USD</strong>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sessions log - Slide 7 */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-sans font-bold text-[#E2B254] uppercase tracking-widest flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          HISTORIAL DETALLADO DE MENTORÍAS RECIENTES
                        </h4>

                        <div className="space-y-3.5" id="student_sessions_history">
                          {sessions.map((session) => (
                            <div 
                              key={session.id} 
                              className="bg-[#151F47]/20 border border-white/5 rounded-xl p-5 hover:border-brand-gold/30 transition-all flex flex-col md:flex-row justify-between items-stretch gap-4"
                            >
                              <div className="space-y-2 flex-grow">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2 py-0.5 bg-brand-gold/15 border border-brand-gold/20 rounded text-[10px] font-sans font-bold text-[#E2B254]">
                                    {session.tutorName}
                                  </span>
                                  <span className="text-xs text-slate-400 font-semibold">{session.date} ({session.time})</span>
                                </div>
                                <h5 className="font-sans font-extrabold text-white text-base">
                                  {session.subject}
                                </h5>

                                {/* Report Accordion values if written */}
                                {session.report ? (
                                  <div className="mt-3 bg-[#070B19]/50 p-4 rounded-xl border border-white/5 space-y-3">
                                    <div>
                                      <p className="text-[11px] font-mono text-[#E2B254] font-bold tracking-wider uppercase">✍ AVANCE DE ESTA SESIÓN EN MERIDIAN:</p>
                                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{session.report.advances}</p>
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-mono text-[#E2B254] font-bold tracking-wider uppercase">⚿ ACUERDOS CON DIEGO PARA LA SIGUIENTE:</p>
                                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{session.report.agreements}</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xs text-slate-400 italic mt-2">
                                    Pendiente de subir reporte por parte del mentor.
                                  </div>
                                )}
                              </div>

                              <div className="shrink-0 flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 gap-2">
                                <div className="text-right">
                                  <span className="text-[10px] font-mono text-slate-400 block">DURACIÓN</span>
                                  <span className="text-sm font-bold text-brand-gold font-mono">{session.duration} hora(s)</span>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                                  session.status === 'completed' 
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' 
                                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                                }`}>
                                  {session.status === 'completed' ? '✓ Completado' : '● Programado'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: Custom Scholar Profile - Slide 8 */}
                  {subTab === 'perfil' && (
                    <div className="space-y-8">
                      <div className="p-6 rounded-xl bg-[#151F47]/40 border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80" 
                          alt="Senior Advisor" 
                          className="w-20 h-20 rounded-full object-cover border-2 border-brand-gold shadow-md shrink-0" 
                        />
                        <div className="space-y-1 text-center md:text-left">
                          <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#E2B254] block font-black">TU SENIOR COACH ACADÉMICO</span>
                          <h4 className="text-lg font-sans font-black text-white">Sofía Ruíz</h4>
                          <p className="text-xs font-sans text-slate-300">
                            Graduada de Harvard & ex evaluadora del bachillerato. Asesora asignada para velar por tu Monografía (EE) de Diego e Internos.
                          </p>
                          <div className="pt-2 text-xs flex gap-2 justify-center md:justify-start">
                            <span className="text-slate-400 font-sans">Próxima sesión calendarizada:</span>
                            <strong className="text-[#E2B254]">Miércoles 12/Junio a las 17:30</strong>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-[#151F47]/20 border border-white/5 rounded-xl space-y-4">
                          <h5 className="font-sans font-extrabold text-white text-sm sm:text-base border-b border-white/10 pb-2">
                            Alineación en Bachillerato Internacional (IB)
                          </h5>
                          
                          <div className="space-y-3.5 text-xs text-slate-300 font-sans">
                            <div className="flex justify-between items-center">
                              <span>Monografía de Física HL:</span>
                              <strong className="text-[#E2B254] bg-brand-gold/15 px-2 py-0.5 rounded text-[10px]">REVISIÓN 1 COMPLETADA</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Ensayo de Teoría del Conocimiento:</span>
                              <strong className="text-[#E2B254] bg-brand-gold/15 px-2 py-0.5 rounded text-[10px]">BORRADOR EN PROGRESO</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Interno de Historia SL:</span>
                              <strong className="text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded text-[10px]">CONCLUIDO (CALIF. A)</strong>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-[#151F47]/20 border border-white/5 rounded-xl space-y-4">
                          <h5 className="font-sans font-extrabold text-white text-sm sm:text-base border-b border-white/10 pb-2">
                            Plan Avanzado de Exámenes SAT
                          </h5>
                          <div className="space-y-3.5 text-xs text-slate-300 font-sans">
                            <div className="flex justify-between items-center">
                              <span>Diagnóstico Inicial SAT Math:</span>
                              <strong className="text-slate-400">620 / 800</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Simulado SAT Mayo 2026:</span>
                              <strong className="text-[#E2B254]">740 / 800</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Puntaje Meta SAT Digital:</span>
                              <strong className="text-[#E2B254] bg-[#070B19] px-2.5 py-0.5 rounded text-[10px]">1520+ SCORE</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Reference Materials and downloads - Slide 8 */}
                  {subTab === 'materiales' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                        <div>
                          <h4 className="font-sans font-black text-white text-lg">
                            {t.portal_materials}
                          </h4>
                          <p className="text-xs text-slate-300 font-sans">Plantillas estructuradas de alto impacto listas para descargar.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="academic-materials-hub">
                        {materials.map((mat, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-[#151F47]/20 border border-white/5 rounded-xl flex items-center justify-between gap-4 hover:border-brand-gold/30 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2.5 bg-brand-gold/10 rounded-xl text-brand-gold">
                                <BookMarked className="h-4 w-4" />
                              </div>
                              <div>
                                <h5 className="font-sans font-bold text-white text-xs sm:text-sm">
                                  {mat.title}
                                </h5>
                                <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wide">
                                  {mat.category} · {mat.type}
                                </span>
                              </div>
                            </div>

                            <button 
                              onClick={() => alert(`Iniciando descarga simulada de: ${mat.title}`)}
                              className="p-2 bg-[#070B19] hover:bg-[#E2B254] hover:text-brand-dark text-[#E2B254] rounded-lg transition-colors border border-white/10 shadow-md"
                              title="Descargar material"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Buy/Renew Hours package Calculator - Slide 9 */}
                  {subTab === 'comprar' && (
                    <div className="space-y-8">
                      <div className="bg-[#151F47]/40 p-6 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-sans tracking-widest font-extrabold text-[#E2B254] uppercase block mb-2">PROVEEDOR COMPRAR HORAS</span>
                        <h4 className="text-xl font-sans font-black text-white mb-2">Simulador de Expansión de Horas</h4>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                          Selecciona tu currículum de estudios secundario, define la moneda preferida para emitir factura y adquiere horas directamente para tu portfolio.
                        </p>
                      </div>

                      {/* Interactive form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                          
                          {/* Selector package type */}
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-bold text-[#E2B254] block">¿QUÉ CURSO O ESPECIALIZACIÓN DEL CURRÍCULO DESEA ADQUIRIR?</label>
                            <select 
                              value={purchaseType}
                              onChange={(e) => setPurchaseType(e.target.value)}
                              className="w-full bg-[#070B19] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-350 focus:outline-none focus:border-[#E2B254]"
                            >
                              <option value="IB">Tutorías Especializadas (IB Higher Level/Standard Level)</option>
                              <option value="PRE">Tutorías Avanzadas Pre-IB / SAT Preparation</option>
                            </select>
                          </div>

                          {/* Currency Select */}
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-bold text-[#E2B254] block">¿CON QUÉ MONEDA PAGARÁ?</label>
                            <div className="flex gap-2">
                              {['USD', 'PEN'].map((curr) => (
                                <button
                                  key={curr}
                                  type="button"
                                  onClick={() => setPurchaseCurrency(curr as any)}
                                  className={`flex-1 py-3 px-4 border rounded-xl text-center text-xs font-bold font-mono transition-all cursor-pointer ${
                                    purchaseCurrency === curr 
                                      ? 'bg-[#E2B254] text-brand-dark border-[#E2B254] font-extrabold shadow-sm' 
                                      : 'bg-[#070B19] border-white/5 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {curr === 'USD' ? 'us USD ($)' : 'pe PEN (S/.)'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Hours select slider / quick tag */}
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-bold text-[#E2B254] block">¿CUÁNTAS HORAS DESEA CONTRATAR?</label>
                            <div className="grid grid-cols-4 gap-2">
                              {[8, 16, 24, 48].map((hours) => (
                                <button
                                  key={hours}
                                  type="button"
                                  onClick={() => setPurchaseHours(hours)}
                                  className={`py-2.5 px-3 border rounded-xl text-center text-xs font-mono font-bold transition-all cursor-pointer ${
                                    purchaseHours === hours 
                                      ? 'bg-[#E2B254] text-brand-dark border-[#E2B254] font-extrabold' 
                                      : 'bg-[#070B19] border-white/5 text-slate-400 hover:bg-white/5'
                                  }`}
                                >
                                  {hours} horas
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Calculated total card and Checkout */}
                        <div className="p-6 bg-[#151F47]/20 border border-white/5 rounded-xl flex flex-col justify-between h-full relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                            <CreditCard className="h-24 w-24 text-white" />
                          </div>

                          <div className="space-y-4">
                            <h5 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">
                              RESUMEN DEL PLAN CON REGLAS DE ELITE
                            </h5>
                            
                            <div className="space-y-1">
                              <span className="text-xs text-slate-400">Total a Pagar calculado:</span>
                              <div className="text-3xl font-sans font-black text-[#E2B254]">
                                {purchaseCurrency === 'USD' ? `$ ${usdPrice} USD` : `S/. ${penPrice} SOL`}
                              </div>
                            </div>

                            <p className="text-xs text-slate-305 leading-relaxed font-sans bg-[#070B19]/80 p-4 rounded-xl border border-white/5">
                              En base a tu selección, el monto total por <strong className="text-brand-gold">{purchaseHours} horas</strong> de {purchaseType === 'IB' ? 'Tutorías Especializadas (IB)' : 'Tutorías Pre-IB'} es de <strong className="text-brand-gold">${usdPrice} USD (S/. {penPrice} Soles)</strong>.
                            </p>
                          </div>

                          <div className="mt-8">
                            <button
                              onClick={handleCheckoutPurchase}
                              disabled={paymentSuccess}
                              className="w-full py-4 bg-[#E2B254] hover:bg-[#E2B254]/90 text-brand-dark font-sans font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                            >
                              {paymentSuccess ? (
                                <>
                                  <span className="animate-spin h-4.5 w-4.5 border-2 border-brand-dark border-t-transparent rounded-full" />
                                  Procesando Transacción Segura...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="h-4.5 w-4.5" />
                                  Pagar y Confirmar Paquete
                                </>
                              )}
                            </button>
                            <span className="text-[10px] text-slate-400 text-center block mt-3 font-sans">
                              🔒 Encriptación SSL Certificada de 256 bits · Meridian Inc.
                            </span>
                          </div>

                        </div>
                      </div>

                    </div>
                  )}

                </motion.div>
              )}

              {/* TUTOR-ADMIN VIEW FLOW */}
              {userRole === 'tutor' && (
                <motion.div
                  key="tutor_view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  
                  {/* Student portfolio selection */}
                  <div>
                    <h4 className="text-sm font-sans font-bold text-[#E2B254] uppercase tracking-widest mb-4">
                      PORTFOLIO DE ALUMNOS REGISTRADOS
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Diego Card */}
                      <div className="bg-[#151F47]/20 border border-white/5 p-6 rounded-xl flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-gold shrink-0">
                                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80" alt="Diego" />
                              </div>
                              <div>
                                <h5 className="font-sans font-bold text-white text-base">Diego Hernández</h5>
                                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold">ACTIVO SL/HL</span>
                              </div>
                            </div>
                            <span className="text-xs bg-[#070B19] border border-white/5 py-1 px-2.5 rounded text-slate-400 font-mono">Total clases: 16</span>
                          </div>

                          <div className="text-xs text-slate-350 space-y-2 font-sans">
                            <div className="flex justify-between">
                              <span>Horas Usadas en Paquetes:</span>
                              <strong className="text-white">12h / 15h</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Siguiente Entrega Monografía:</span>
                              <strong className="text-brand-gold">14 de Junio 2026</strong>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                          <button 
                            onClick={() => {
                              // Select first session (Ensayo TdC) to edit report
                              const s = sessions[0];
                              setEditingSession(s);
                              setAdvancesInput(s.report?.advances || '');
                              setAgreementsInput(s.report?.agreements || '');
                            }}
                            className="flex-1 py-2.5 bg-[#E2B254] hover:bg-[#E2B254]/90 text-brand-dark rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Bot className="h-4 w-4" />
                            Redactar Reporte con IA
                          </button>
                        </div>
                      </div>

                      {/* Sofia Card */}
                      <div className="bg-[#151F47]/20 border border-white/5 p-6 rounded-xl flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" alt="Sofia Ruiz" />
                              </div>
                              <div>
                                <h5 className="font-sans font-bold text-white text-base">Sofia Ruiz</h5>
                                <span className="text-[10px] bg-indigo-550/10 border border-indigo-550/20 px-2 py-0.5 rounded text-indigo-400 font-bold">SAT TARGET PORTFOLIO</span>
                              </div>
                            </div>
                            <span className="text-xs bg-[#070B19] border border-white/5 py-1 px-2.5 rounded text-slate-400 font-mono">Total clases: 8</span>
                          </div>

                          <div className="text-xs text-slate-350 space-y-2 font-sans">
                            <div className="flex justify-between">
                              <span>Horas Usadas en Paquetes:</span>
                              <strong className="text-white">2h / 8h</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>SAT Simulado Estimado:</span>
                              <strong className="text-brand-gold">1420 Score</strong>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                          <button 
                            onClick={() => {
                              const s = sessions[1];
                              setEditingSession(s);
                              setAdvancesInput(s.report?.advances || '');
                              setAgreementsInput(s.report?.agreements || '');
                            }}
                            className="flex-1 py-2.5 bg-[#070B19] border border-white/10 hover:bg-white/5 text-slate-305 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <FileText className="h-4 w-4" />
                            Ver Historial Clínico
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Core Activity Classes List in Tutor Dashboard */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-sans font-bold text-[#E2B254] uppercase tracking-widest">
                      SEGUIMIENTO EN TIEMPO REAL DE SESIONES EN PROCESO
                    </h4>

                    <div className="bg-[#151F47]/20 p-5 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex items-center justify-between text-xs font-sans text-slate-400 pb-2 border-b border-white/10">
                        <span>SUJETO & ALUMNO</span>
                        <span>ASISTENCIA IA REPORTES</span>
                      </div>

                      {sessions.map((session) => (
                        <div 
                          key={session.id}
                          className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-3 border-b border-white/5 last:border-0"
                        >
                          <div>
                            <div className="text-xs text-slate-400 font-sans">{session.date} · {session.time}</div>
                            <h5 className="font-sans font-bold text-white text-sm">
                              {session.subject} (Diego)
                            </h5>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                  setEditingSession(session);
                                  setAdvancesInput(session.report?.advances || '');
                                  setAgreementsInput(session.report?.agreements || '');
                              }}
                              className="px-3 py-1.5 bg-brand-gold/15 hover:bg-brand-gold/25 text-[#E2B254] border border-brand-gold/20 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors animate-pulse"
                            >
                              <Bot className="h-4 w-4" />
                              {session.report ? 'Editar Reporte' : 'Generar Reporte con IA'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* MODAL DIALOG: AI TUTOR REPORTER (Shown when editingSession is not null) */}
      <AnimatePresence>
        {editingSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingSession(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal layout box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-[#0C122C] rounded-xl p-6 sm:p-8 border border-white/10 max-w-2xl w-full relative z-10 shadow-2xl space-y-6"
              id="ai-reporter-modal"
            >
              
              <div className="border-b border-white/10 pb-4 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-lg text-[10px] font-sans font-bold tracking-widest uppercase mb-1">
                    <Bot className="h-3 w-3 animate-bounce" />
                    <span>Asistente IA de Reportes</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-sans font-black text-white">
                    Redacción de Reporte Académico
                  </h3>
                  <p className="text-xs text-slate-300">Sesión: {editingSession.subject}</p>
                </div>
                
                {/* Close trigger */}
                <button 
                  onClick={() => setEditingSession(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-4 font-sans">
                
                {/* AI Generative tool trigger bar */}
                <div className="bg-brand-gold/10 p-4 border border-brand-gold/25 rounded-xl flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong>¿Deseas autocompletar con IA de Meridian?</strong> Analizaremos los datos de la sesión para pre-redactar el reporte de forma precisa.
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleTriggerIAHelper}
                    className="px-3.5 py-2 bg-[#E2B254] hover:bg-[#E2B254]/90 text-brand-dark rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                  >
                    {isGeneratingIA ? (
                      <>
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-dark border-t-transparent rounded-full" />
                        Redactando...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4" />
                        Redactar con IA
                      </>
                    )}
                  </button>
                </div>

                {/* Advances Input block */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-brand-gold uppercase tracking-wider block">
                    {t.portal_report_advances}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej: Avanzamos con la introducción del ensayo de TdC estableciendo posturas de Popper y la relatividad de Einstein..."
                    value={advancesInput}
                    onChange={(e) => setAdvancesInput(e.target.value)}
                    className="w-full bg-[#070B19] border border-white/10 focus:border-[#E2B254] rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                {/* Agreements Input block */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-brand-gold uppercase tracking-wider block">
                    {t.portal_report_agreements}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Continuar con la estructura de la contradeclaración usando a Kuhn para la siguiente sesión..."
                    value={agreementsInput}
                    onChange={(e) => setAgreementsInput(e.target.value)}
                    className="w-full bg-[#070B19] border border-white/10 focus:border-[#E2B254] rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

              </div>

              {/* Confirm submit buttons */}
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3.5">
                <button
                  onClick={() => setEditingSession(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs sm:text-sm text-slate-300 font-semibold rounded-xl cursor-pointer"
                >
                  {t.portal_cancel}
                </button>
                <button
                  onClick={handleSaveReport}
                  className="px-5 py-2.5 bg-[#E2B254] hover:bg-[#E2B254]/90 text-brand-dark font-sans font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  {t.portal_report_confirm}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
