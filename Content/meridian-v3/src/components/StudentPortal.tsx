/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  BookOpen,
  FileText,
  Plus,
  Download,
  Bot,
  Check,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Clock,
  LogOut,
  ShoppingBag,
  Sparkles,
  Users,
  Info,
  CalendarDays,
  PlusCircle,
  GraduationCap,
} from "lucide-react";
import { Language, ClassPackage, Session, Materials } from "../types";
import { DICTIONARY, REFRENCES_MATERIALS } from "../data";
import AnimatedLogo from './AnimatedLogo';

interface ProgramPlan {
  id: "ib" | "sat" | "university";
  name: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  bulletPoints: string[];
  packages: {
    hours: number;
    pricePEN: number;
    priceUSD: number;
    discountPercent: number;
  }[];
}

const PROGRAMS_PLANS: ProgramPlan[] = [
  {
    id: "ib",
    name: "Tutorías Especializadas IB",
    tagline: "Dominio absoluto del Bachillerato Internacional",
    shortDesc: "Incluye preparación de clases teóricas de alta exigencia, asesoría especializada en Trabajos Internos (IAs) y mentoría completa para proyectos de Monografía (Extended Essay) con enfoque en obtener Grado A.",
    longDesc: "Diseñado especialmente para estudiantes del Bachillerato Internacional (IB). Nuestros asesores con puntajes perfectos preparan explicaciones personalizadas según los criterios de examinación oficiales del IB. Cubre clases bilingües, revisión especializada de fuentes, estructuración y control del avance investigativo.",
    bulletPoints: [
      "🎓 Especialistas y asesores teóricos del más alto rigor IB",
      "✍️ Mentoría integral de Monografías con metas reales de Grado A",
      "🔍 Análisis matemático y revisión de rúbricas de Trabajos Internos (IAs)",
      "🧠 Redacción académica estructurada y soporte para Ensayos de TdC (TOK)"
    ],
    packages: [
      { hours: 3, pricePEN: 450, priceUSD: 120, discountPercent: 0 },
      { hours: 6, pricePEN: 800, priceUSD: 215, discountPercent: 11 },
      { hours: 8, pricePEN: 1020, priceUSD: 275, discountPercent: 15 },
      { hours: 10, pricePEN: 1200, priceUSD: 320, discountPercent: 20 },
      { hours: 15, pricePEN: 1680, priceUSD: 450, discountPercent: 25 }
    ]
  },
  {
    id: "sat",
    name: "Prep SAT / Diagnósticos",
    tagline: "Metodología científica para el éxito del SAT Digital",
    shortDesc: "Maximiza tus resultados mediante métodos analíticos y entrenamientos sofisticados orientados a superar los 1500+ puntos. Incluye retroalimentación basada en exámenes de diagnóstico de Meridian.",
    longDesc: "Entrenamiento intensivo en Evidence-Based Reading, Writing y matemáticas del SAT. Te preparamos con software interactivo de simulación oficial, explicando trucos cognitivos que reducen la fatiga mental y aumentan el ritmo de respuesta correcta por minuto.",
    bulletPoints: [
      "📊 Sesiones de diagnóstico exhaustivo y detección cuantitativa de brechas",
      "📐 Explicación de atajos y algoritmos lógicos para SAT Math a alta velocidad",
      "📄 Técnicas de lectura crítica y precisión gramatical avanzada para Reading",
      "⏱️ Simulacros cronometrados que duplican las condiciones de la prueba real"
    ],
    packages: [
      { hours: 3, pricePEN: 400, priceUSD: 108, discountPercent: 0 },
      { hours: 6, pricePEN: 700, priceUSD: 188, discountPercent: 12 },
      { hours: 8, pricePEN: 890, priceUSD: 240, discountPercent: 16 },
      { hours: 10, pricePEN: 1050, priceUSD: 280, discountPercent: 21 },
      { hours: 15, pricePEN: 1450, priceUSD: 390, discountPercent: 27 }
    ]
  },
  {
    id: "university",
    name: "Asesorías Universitarias Premium Meridian International",
    tagline: "Acceso exclusivo a Ivy League y Top Universities",
    shortDesc: "Asesoramiento estratégico de élite Meridian International diseñado para alumnos excepcionales que buscan postular y asegurar su admisión en universidades TOP globales.",
    longDesc: "Mentoría personalizada para diseñar el esquema perfecto de postulación. Trabajamos de la mano en perfilar tus actividades extracurriculares con impacto auténtico, estructurar ensayos (Personal Statements) deslumbrantes que capturen al comité de admisión y entrenar tus habilidades de entrevista.",
    bulletPoints: [
      "🗺️ Arquitectura estratégica y curaduría de la carpeta extracurricular",
      "📝 Estructuración, redacción y pulido estético de Ensayos del Common App",
      "🎭 Simulaciones teatrales de entrevistas ante oficiales de admisión internacionales",
      "🗽 Recomendación clave sobre plazos Early Decision / Action y soporte financiero"
    ],
    packages: [
      { hours: 3, pricePEN: 560, priceUSD: 150, discountPercent: 0 },
      { hours: 6, pricePEN: 980, priceUSD: 265, discountPercent: 12 },
      { hours: 8, pricePEN: 1250, priceUSD: 335, discountPercent: 16 },
      { hours: 10, pricePEN: 1490, priceUSD: 400, discountPercent: 20 },
      { hours: 15, pricePEN: 2100, priceUSD: 560, discountPercent: 25 }
    ]
  }
];

const BookingFormBlock = ({ programName, availableHours, optionsSubjects, optionsTutors, onSchedule, t }: any) => {
  const [subject, setSubject] = useState(optionsSubjects[0]);
  const [tutor, setTutor] = useState(optionsTutors[0].value);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1.0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onSchedule({ subject, tutor, date, time, duration, programName });
      setSuccess(false);
      setSubject(optionsSubjects[0]);
      setTutor(optionsTutors[0].value);
      setDate("");
      setTime("");
      setDuration(1.0);
    }, 1500);
  };

  return (
    <div className="bg-[#0C122C] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="bg-[#151F47] px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold tracking-wider text-[#E2B254] uppercase block">
            {t.portal_program || "PROGRAMA"}
          </span>
          <h3 className="text-lg font-black text-white font-sans">{programName}</h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-sans font-bold text-slate-400 block pb-0.5">SALDO DISPONIBLE</span>
          <span className="text-xl font-sans font-black text-[#E2B254]">{availableHours.toFixed(1)} Hrs</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white text-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">{t.portal_book_subject || "Materia"}</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2B254]"
            >
              {optionsSubjects.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">{t.portal_book_mentor || "Asesor / Mentor"}</label>
            <select
              value={tutor}
              onChange={(e) => setTutor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2B254]"
            >
              {optionsTutors.map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">{t.portal_book_date || "Fecha"}</label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2B254]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">{t.portal_book_time || "Hora"}</label>
            <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2B254]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">{t.portal_book_duration || "Duración"}</label>
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2B254]">
              <option value={1.0}>1.0 Hora</option>
              <option value={1.5}>1.5 Horas</option>
              <option value={2.0}>2.0 Horas</option>
              <option value={3.0}>3.0 Horas</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Equivale a: <strong>{duration} Hr(s)</strong> de tu saldo de horas.
          </div>
          <button type="submit" disabled={success} className="py-3 px-6 bg-[#0C122C] hover:bg-[#E2B254] hover:text-[#0C122C] text-xs font-black text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
            {success ? (
              <><span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" /> Confirmando...</>
            ) : (
              <><CalendarDays className="h-4 w-4" /> {t.portal_book_btn || "Agendar Clase Ahora"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

interface StudentPortalProps {
  language?: Language;
  forcedRole?: "student" | "admin";
}

export default function StudentPortal({ language = "ES", forcedRole = "student" }: StudentPortalProps) {
  const [lang, setLang] = useState<Language>(language);
  const t = DICTIONARY[lang] || DICTIONARY["ES"];

  // Auth protection check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/';
      }
    });
    return () => unsubscribe();
  }, []);

  // 3 Distinct Program Balances
  const [ibHours, setIbHours] = useState(15.0);
  const [satHours, setSatHours] = useState(10.0);
  const [uniHours, setUniHours] = useState(5.0);

  const totalHoursLeft = ibHours + satHours + uniHours;

  // Tienda / Purchase Form States
  const [purchaseType, setPurchaseType] = useState<"ib" | "sat" | "university">("ib");
  const [purchaseCurrency, setPurchaseCurrency] = useState<"USD" | "PEN">("PEN");
  const [purchaseHours, setPurchaseHours] = useState<number>(6);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Role state based on prop
  const [userRole, setUserRole] = useState<"student" | "tutor">(forcedRole === "admin" ? "tutor" : "student");

  // Active Sidebar Sub-Tab for Student Mode
  const [studentTab, setStudentTab] = useState<
    "historial" | "agendar" | "tienda" | "recursos"
  >("historial");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending_confirmation" | "scheduled" | "completed"
  >("all");

  // Expanded Session Accordion state for past reports
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  // Core interactive states seeded to match database models on load
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "pending-1",
      date: "18 JUN 2026",
      time: "08:08",
      subject: "IB Physics HL",
      tutorName: "Adrian Pastor",
      duration: 1.5,
      status: "pending_confirmation",
      report: null,
      packageId: "p_premium",
    },
    {
      id: "pending-2",
      date: "12 JUN 2026",
      time: "02:32",
      subject: "IB Math AA HL",
      tutorName: "Sofía Ruíz",
      duration: 2.0,
      status: "scheduled",
      report: null,
      packageId: "p_premium",
    },
    {
      id: "pending-3",
      date: "11 JUN 2026",
      time: "16:35",
      subject: "IB Math AA HL",
      tutorName: "Sofía Ruíz",
      duration: 1.0,
      status: "pending_confirmation",
      report: null,
      packageId: "p_premium",
    },
    {
      id: "past-1",
      date: "09 JUN 2026",
      time: "17:30",
      subject: "Ensayo - TdC (Teoría del Conocimiento)",
      tutorName: "Sofía Ruíz",
      duration: 1.0,
      status: "completed",
      packageId: "p_premium",
      report: {
        advances:
          "Alineamos los avances de la sesión estructurando la Teoría del Conocimiento: analizamos la formulación de preguntas de conocimiento basadas en la física cuántica, contrastando marcos de racionalidad científica.",
        agreements:
          "Diego redactará un borrador de 400 palabras centrado en la perspectiva contra-analítica, usando autores sugeridos el fin de semana.",
      },
    },
    {
      id: "past-2",
      date: "08 JUN 2026",
      time: "21:20",
      subject: "Redacción de Monografía de Física HL",
      tutorName: "Adrian Pastor",
      duration: 1.5,
      status: "completed",
      packageId: "p_premium",
      report: {
        advances:
          "Alineamos los avances de la medición del experimento LC de electromagnetismo: revisamos el cálculo matemático de incertidumbres porcentuales acumuladas.",
        agreements:
          "Diego completará la tabulación de datos residuales y corregirá el marco empírico.",
      },
    },
    {
      id: "past-3",
      date: "07 JUN 2026",
      time: "19:30",
      subject: "Interno de Historia: Revolución Industrial",
      tutorName: "Sofía Ruíz",
      duration: 1.0,
      status: "completed",
      packageId: "p_past",
      report: {
        advances:
          "Diego presentó su propuesta de fuentes primarias para la evaluación crítica de impacto socioeconómico.",
        agreements:
          "Redactar por completo la sección B (Investigación Académica) contrastando la postura de Hobsbawm.",
      },
    },
  ]);

  const [packages, setPackages] = useState<ClassPackage[]>([
    {
      id: "p_premium",
      name: "Paquete de Consultoría de Élite (Premium Plan)",
      modalidad: "MODALIDAD: EXCLUSIVA INDIVIDUAL",
      hoursTotal: 10.0,
      hoursUsed: 5.5,
      pricePEN: 2850,
      priceUSD: 750,
      status: "active",
    },
    {
      id: "p_past",
      name: "Paquete Inicial de Nivelación Académica",
      modalidad: "MODALIDAD: TRABAJOS & ADAPTACIÓN",
      hoursTotal: 6.0,
      hoursUsed: 6.0,
      pricePEN: 1850,
      priceUSD: 500,
      status: "completed",
    },
  ]);

  // Materials hub
  const [materials] = useState<Materials[]>(REFRENCES_MATERIALS);

  // Administrative Tutor Flow State
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [advancesInput, setAdvancesInput] = useState("");
  const [agreementsInput, setAgreementsInput] = useState("");
  const [isGeneratingIA, setIsGeneratingIA] = useState(false);
  const [showPackagesHistoryModal, setShowPackagesHistoryModal] = useState(false);

  const handleScheduleBlock = (data: any) => {
    let hasEnoughHours = false;
    if (data.programName === "Tutorías Especializadas IB" && ibHours >= data.duration) hasEnoughHours = true;
    if (data.programName === "Preparación SAT Digital" && satHours >= data.duration) hasEnoughHours = true;
    if (data.programName === "Asesorías Universitarias Premium" && uniHours >= data.duration) hasEnoughHours = true;

    if (!hasEnoughHours) {
      alert(lang === "ES" ? "Saldo insuficiente para este programa." : "Insufficient balance for this program.");
      return;
    }

    if (data.programName === "Tutorías Especializadas IB") setIbHours((prev) => prev - data.duration);
    if (data.programName === "Preparación SAT Digital") setSatHours((prev) => prev - data.duration);
    if (data.programName === "Asesorías Universitarias Premium") setUniHours((prev) => prev - data.duration);

    const formattedDate = new Date(data.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase().replace(".", "");

    const newSession: Session = {
      id: `pending-${Date.now()}`,
      date: formattedDate,
      time: data.time,
      subject: data.subject,
      tutorName: data.tutor,
      duration: data.duration,
      status: "pending_confirmation",
      report: null,
      packageId: data.programName,
    };

    setSessions([newSession, ...sessions]);
    setStudentTab("historial");
  };

  // Live bundle top-up
  const handleCheckoutPurchase = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      if (purchaseType === "ib") setIbHours((prev) => prev + purchaseHours);
      if (purchaseType === "sat") setSatHours((prev) => prev + purchaseHours);
      if (purchaseType === "university") setUniHours((prev) => prev + purchaseHours);

      setPaymentSuccess(false);
      alert(
        lang === "ES"
          ? `¡Transacción aprobada! Se han añadido ${purchaseHours} horas a tu cuenta.`
          : `Transaction approved! Added ${purchaseHours} hours to your balance.`,
      );
      setStudentTab("historial");
    }, 2000);
  };

  // Automated IA report text generator (for Tutor Simulation Role)
  const handleTriggerIAHelper = () => {
    setIsGeneratingIA(true);
    setTimeout(() => {
      if (
        editingSession?.subject.includes("TdC") ||
        editingSession?.subject.includes("Teoría")
      ) {
        setAdvancesInput(
          "Analizamos críticamente el ensayo de Teoría del Conocimiento: estructuramos la introducción planteando preguntas de conocimiento secundario vinculadas al sesgo cognitivo.",
        );
        setAgreementsInput(
          "Diego redactará la sección de contraargumentación empleando el marco epistemológico de Thomas Kuhn.",
        );
      } else if (
        editingSession?.subject.includes("Physics") ||
        editingSession?.subject.includes("Física")
      ) {
        setAdvancesInput(
          "Alineamos los avances de cálculo en electromagnetismo: revisamos las incertidumbres absolutas en las mediciones de voltaje del capacitor.",
        );
        setAgreementsInput(
          "Diego elaborará las gráficas de dispersión lineal y el cálculo final de covarianza de datos.",
        );
      } else {
        setAdvancesInput(
          "Estructuramos un borrador exhaustivo sobre los objetivos principales, resolviendo ambigüedades teóricas en los marcos metodológicos.",
        );
        setAgreementsInput(
          "Culminar el análisis crítico de fuentes y referenciar bajo estandares académicos.",
        );
      }
      setIsGeneratingIA(false);
    }, 1000);
  };

  const handleSaveReport = () => {
    if (!editingSession) return;
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === editingSession.id) {
          return {
            ...s,
            status: "completed",
            report: {
              advances:
                advancesInput ||
                "Progreso consistente en la revisión de contenidos avanzados.",
              agreements:
                agreementsInput || "Completar tareas asignadas de repaso.",
            },
          };
        }
        return s;
      }),
    );
    setEditingSession(null);
    setAdvancesInput("");
    setAgreementsInput("");
  };

  const filteredSessions = sessions.filter((s) => {
    if (filterStatus === "all") return true;
    return s.status === filterStatus;
  });

  return (
    <section
      id="meridian-exclusive-portal"
      className="py-4 bg-[#070B19] relative overflow-hidden rounded-3xl"
    >
      <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-[#E2B254]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-[#AE2024]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-1">
        
        {/* Dynamic Dual-Role Switch Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#0C122C]/90 p-4 rounded-2xl border border-white/5 shadow-xl">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-brand-gold/15 text-[#E2B254] rounded-xl animate-pulse">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#E2B254] block uppercase">
                HERRAMIENTA INTEGRADORA DIGITAL
              </span>
              <h3 className="text-sm font-bold text-slate-100 font-sans">
                {language === "ES"
                  ? "Simulador de Roles de Mentoría"
                  : "Mentoring Role Simulator"}
              </h3>
            </div>
          </div>

          <div className="inline-flex bg-[#070B19] p-1 rounded-xl border border-white/10 shrink-0">
            <span className="px-4 py-2 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all bg-[#E2B254] text-[#070B19] shadow-md">
              <Users className="h-3.5 w-3.5" />
              {userRole === "student" ? "Vista Alumno" : "Vista Administrador"}
            </span>
          </div>
        </div>

        {userRole === "student" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c122c] h-auto min-h-[700px] items-stretch">
            
            {/* COLUMN 1: Sidebar Nav */}
            <div
              className="lg:col-span-3 bg-[#0B122C] border-r border-[#151F47] p-6 lg:p-8 flex flex-col justify-between"
              id="portal-student-sidebar"
            >
              <div className="space-y-10">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex items-center space-x-3">
                    <AnimatedLogo size={32} />
                    <span className="text-base font-sans font-black tracking-[0.25em] text-[#E2B254] uppercase">
                      MERIDIAN
                    </span>
                  </div>
                  <button
                    onClick={() => setLang(lang === "ES" ? "EN" : "ES")}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[#E2B254] rounded text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    {lang === "ES" ? "EN" : "ES"}
                  </button>
                </div>

                <div className="space-y-1.5 font-sans">
                  <button
                    onClick={() => setStudentTab("historial")}
                    className={`w-full flex items-center gap-3.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-bold text-left transition-all relative group cursor-pointer ${
                      studentTab === "historial"
                        ? "text-white bg-[#151F47] shadow-inner font-black"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {studentTab === "historial" && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#E2B254] rounded-r" />
                    )}
                    <Clock
                      className={`h-4.5 w-4.5 ${studentTab === "historial" ? "text-[#E2B254]" : "text-slate-400"}`}
                    />
                    {t.portal_history}
                  </button>

                  <button
                    onClick={() => setStudentTab("agendar")}
                    className={`w-full flex items-center gap-3.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-bold text-left transition-all relative group cursor-pointer ${
                      studentTab === "agendar"
                        ? "text-white bg-[#151F47] shadow-inner font-black"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {studentTab === "agendar" && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#E2B254] rounded-r" />
                    )}
                    <CalendarDays
                      className={`h-4.5 w-4.5 ${studentTab === "agendar" ? "text-[#E2B254]" : "text-slate-400"}`}
                    />
                    {t.portal_book_title}
                  </button>

                  <button
                    onClick={() => setStudentTab("tienda")}
                    className={`w-full flex items-center gap-3.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-bold text-left transition-all relative group cursor-pointer ${
                      studentTab === "tienda"
                        ? "text-white bg-[#151F47] shadow-inner font-black"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {studentTab === "tienda" && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#E2B254] rounded-r" />
                    )}
                    <ShoppingBag
                      className={`h-4.5 w-4.5 ${studentTab === "tienda" ? "text-[#E2B254]" : "text-slate-400"}`}
                    />
                    {t.portal_store || "Tienda de Paquetes"}
                  </button>

                  <button
                    onClick={() => setStudentTab("recursos")}
                    className={`w-full flex items-center gap-3.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-bold text-left transition-all relative group cursor-pointer ${
                      studentTab === "recursos"
                        ? "text-white bg-[#151F47] shadow-inner font-black"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {studentTab === "recursos" && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#E2B254] rounded-r" />
                    )}
                    <FileText
                      className={`h-4.5 w-4.5 ${studentTab === "recursos" ? "text-[#E2B254]" : "text-slate-400"}`}
                    />
                    {t.portal_resources || "Banco de Recursos"}
                  </button>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 space-y-4 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#E2B254] to-amber-500 text-white font-sans font-black text-sm border border-white/10">
                    DH
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Diego Hernández
                    </h4>
                    <span className="text-[10px] text-[#E2B254] tracking-wide font-extrabold uppercase">
                      Premium Plan
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await signOut(auth);
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center gap-2 py-2.5 px-4 font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-xs cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-slate-400" />
                  {t.portal_logout || "Cerrar Sesión"}
                </button>
              </div>
            </div>

            {/* COLUMN 2: Workspace Panel */}
            <div
              className="lg:col-span-9 bg-[#F5F7FB] p-6 sm:p-10 flex flex-col justify-between"
              id="portal-student-workspace"
            >
              <div className="space-y-8">
                
                {/* A. HISTORIAL DE SESIONES */}
                {studentTab === "historial" && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-1.5">
                        <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight leading-none">
                          Historial de Sesiones
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans font-medium">
                          Control exacto y transparente de tu progreso académico.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {/* Box 1: IB */}
                        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3 hover:border-[#E2B254]/40 transition-all">
                          <div className="text-right">
                            <span className="text-[9px] font-sans font-extrabold text-slate-400 tracking-wider block uppercase">
                              {lang === "ES" ? "TUTORÍAS IB" : "IB TUTORING"}
                            </span>
                            <span className="text-base font-sans font-black text-slate-900 leading-none block mt-0.5">
                              {ibHours.toFixed(1)} <span className="text-[10px] font-bold text-slate-500">Hrs</span>
                            </span>
                          </div>
                          <div className="p-1.5 bg-amber-50 rounded-lg text-[#E2B254] border border-[#E2B254]/10">
                            <Clock className="h-4 w-4" />
                          </div>
                        </div>

                        {/* Box 2: SAT */}
                        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3 hover:border-rose-500/40 transition-all">
                          <div className="text-right">
                            <span className="text-[9px] font-sans font-extrabold text-slate-400 tracking-wider block uppercase">
                              {lang === "ES" ? "PREP SAT" : "SAT PREP"}
                            </span>
                            <span className="text-base font-sans font-black text-slate-900 leading-none block mt-0.5">
                              {satHours.toFixed(1)} <span className="text-[10px] font-bold text-slate-500">Hrs</span>
                            </span>
                          </div>
                          <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500 border border-rose-500/10">
                            <Clock className="h-4 w-4" />
                          </div>
                        </div>

                        {/* Box 3: Uni */}
                        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3 hover:border-indigo-500/40 transition-all">
                          <div className="text-right">
                            <span className="text-[9px] font-sans font-extrabold text-slate-400 tracking-wider block uppercase">
                              {lang === "ES" ? "ASESORÍAS UNIV." : "UNI ADVISORY"}
                            </span>
                            <span className="text-base font-sans font-black text-slate-900 leading-none block mt-0.5">
                              {uniHours.toFixed(1)} <span className="text-[10px] font-bold text-slate-500">Hrs</span>
                            </span>
                          </div>
                          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500 border border-indigo-500/10">
                            <Clock className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200/60 pb-3">
                      <div className="inline-flex flex-wrap bg-slate-200/50 p-1 rounded-xl gap-2 max-w-full">
                        <button
                          onClick={() => setFilterStatus("all")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                            filterStatus === "all"
                              ? "bg-[#151F47] text-white shadow-md"
                              : "text-slate-600 hover:text-slate-950"
                          }`}
                        >
                          Todas ({sessions.length})
                        </button>
                        <button
                          onClick={() => setFilterStatus("pending_confirmation")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                            filterStatus === "pending_confirmation"
                              ? "bg-[#151F47] text-white shadow-md"
                              : "text-slate-600 hover:text-slate-950"
                          }`}
                        >
                          Por Confirmar (
                          {sessions.filter((s) => s.status === "pending_confirmation").length}
                          )
                        </button>
                        <button
                          onClick={() => setFilterStatus("scheduled")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                            filterStatus === "scheduled"
                              ? "bg-[#151F47] text-white shadow-md"
                              : "text-slate-600 hover:text-slate-950"
                          }`}
                        >
                          Confirmadas (
                          {sessions.filter((s) => s.status === "scheduled").length}
                          )
                        </button>
                        <button
                          onClick={() => setFilterStatus("completed")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                            filterStatus === "completed"
                              ? "bg-[#151F47] text-white shadow-md"
                              : "text-slate-600 hover:text-slate-950"
                          }`}
                        >
                          Completadas (
                          {sessions.filter((s) => s.status === "completed").length}
                          )
                        </button>
                      </div>

                      <div className="text-[11px] font-sans font-semibold text-slate-400">
                        Diego Hernández · Lincoln High
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
                              <th className="py-4 px-6">{lang === "ES" ? "Fecha y Hora" : "Date & Time"}</th>
                              <th className="py-4 px-6">{lang === "ES" ? "Materia / Tema" : "Subject / Topic"}</th>
                              <th className="py-4 px-6">{lang === "ES" ? "Programa" : "Program"}</th>
                              <th className="py-4 px-6">{lang === "ES" ? "Duración" : "Duration"}</th>
                              <th className="py-4 px-6">{lang === "ES" ? "Estado" : "Status"}</th>
                              <th className="py-4 px-6 text-center w-12">{lang === "ES" ? "Detalles" : "Details"}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredSessions.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                                  No se encontraron clases programadas bajo este filtro.
                                </td>
                              </tr>
                            ) : (
                              filteredSessions.map((session) => {
                                const isExpanded = expandedSessionId === session.id;
                                return (
                                  <React.Fragment key={session.id}>
                                    <tr
                                      onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                                      className={`hover:bg-slate-50/80 transition-all duration-200 cursor-pointer ${
                                        isExpanded ? "bg-amber-500/[0.02]" : ""
                                      }`}
                                    >
                                      <td className="py-4 px-6">
                                        <div className="font-bold text-slate-800">{session.date}</div>
                                        <div className="text-[11px] font-medium text-slate-400 mt-0.5">{session.time}</div>
                                      </td>
                                      <td className="py-4 px-6">
                                        <div className="font-extrabold text-[#151F47] flex items-center gap-1.5">
                                          <BookOpen className="h-3.5 w-3.5 text-[#AE2024]" />
                                          {session.subject}
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                                          {session.status === "completed"
                                            ? (lang === "ES" ? "Sesión Realizada con Éxito" : "Session Successfully Completed")
                                            : session.status === "scheduled"
                                            ? (lang === "ES" ? "Sesión Confirmada" : "Session Confirmed")
                                            : (lang === "ES" ? "Falta Confirmación del Profesor" : "Pending Tutor Confirmation")}
                                        </div>
                                      </td>
                                      <td className="py-4 px-6">
                                        <div className="font-bold text-slate-600 text-xs">
                                          {session.packageId === "p_premium" ? "Tutorías Especializadas IB" : session.packageId === "p_past" ? "Preparación SAT Digital" : session.packageId}
                                        </div>
                                      </td>
                                      <td className="py-4 px-6 font-semibold font-mono text-[#E2B254]">
                                        {session.duration.toFixed(1)} Hrs
                                      </td>
                                      <td className="py-4 px-6">
                                        {session.status === "completed" ? (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 font-extrabold text-[10px] rounded-lg border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            {lang === "ES" ? "Completado" : "Completed"}
                                          </span>
                                        ) : session.status === "scheduled" ? (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-600 font-extrabold text-[10px] rounded-lg border border-sky-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                                            {lang === "ES" ? "Confirmado" : "Confirmed"}
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 font-extrabold text-[10px] rounded-lg border border-amber-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                            {lang === "ES" ? "Por Confirmar" : "Pending"}
                                          </span>
                                        )}
                                      </td>
                                      <td className="py-4 px-6 text-center">
                                        {isExpanded ? <ChevronUp className="h-4.5 w-4.5 text-slate-400" /> : <ChevronDown className="h-4.5 w-4.5 text-slate-400" />}
                                      </td>
                                    </tr>

                                    {isExpanded && (
                                      <tr>
                                        <td colSpan={6} className="bg-slate-50/55 p-6 border-t border-b border-slate-100">
                                          {session.status === "completed" ? (
                                            <div className="space-y-4 max-w-4xl font-sans text-xs sm:text-sm">
                                              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                                <div className="flex items-center gap-2">
                                                  <Bot className="h-4.5 w-4.5 text-[#E2B254]" />
                                                  <strong className="text-slate-800 text-xs uppercase tracking-wider font-extrabold">
                                                    {lang === "ES" ? "Reporte Académico Oficial Meridian" : "Official Meridian Academic Report"}
                                                  </strong>
                                                </div>
                                                <span className="text-[11px] text-slate-400 font-mono">
                                                  {lang === "ES" ? "Asesor:" : "Tutor:"} <strong>{session.tutorName}</strong>
                                                </span>
                                              </div>

                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {session.report ? (
                                                  <>
                                                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                                                      <span className="text-[10px] font-bold text-[#E2B254] block mb-2 uppercase tracking-wide">
                                                        {lang === "ES" ? "✍ AVANCE PEDAGÓGICO REVISADO:" : "✍ REVIEWED PEDAGOGICAL PROGRESS:"}
                                                      </span>
                                                      <p className="text-slate-600 leading-relaxed">{session.report.advances}</p>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                                                      <span className="text-[10px] font-bold text-[#AE2024] block mb-2 uppercase tracking-wide">
                                                        {lang === "ES" ? "⚿ ADVERTENCIAS & COMPROMISOS:" : "⚿ WARNINGS & COMMITMENTS:"}
                                                      </span>
                                                      <p className="text-slate-600 leading-relaxed">{session.report.agreements}</p>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <div className="col-span-2 text-center py-4 text-slate-400 italic">
                                                    {lang === "ES" ? "No se han registrado anotaciones." : "No notes have been registered."}
                                                  </div>
                                                )}
                                              </div>
                                              
                                              <div className="flex justify-end">
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert(lang === "ES" ? "Descargando PDF oficial de auditoría académica..." : "Downloading official academic audit PDF...");
                                                  }}
                                                  className="py-1.5 px-3 bg-[#0C122C] text-[#E2B254] hover:bg-[#E2B254] hover:text-[#0C122C] text-xs font-black rounded-lg border border-[#E2B254]/30 flex items-center gap-1.5 transition-all cursor-pointer"
                                                >
                                                  <Download className="h-3.5 w-3.5" />
                                                  {lang === "ES" ? "Exportar Reporte PDF" : "Export PDF Report"}
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 text-amber-900 leading-relaxed text-xs">
                                              <strong className="block mb-1 text-xs">{lang === "ES" ? "Protección de Horas Meridian:" : "Meridian Hours Protection:"}</strong>
                                              {lang === "ES" ? `Estas ${session.duration} horas de clase están reservadas. Si el tutor no confirma o necesitas hacer un cambio, las horas regresan de forma automática a tu billetera para tu tranquilidad y control.` : `These ${session.duration} class hours are reserved. If the tutor does not confirm or you need to make a change, the hours automatically return to your wallet for your peace of mind and control.`}
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* B. AGENDAR SESION */}
                {studentTab === "agendar" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                      <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight leading-none">
                          Agendar Nueva Sesión
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans font-medium">
                          Coordina tu clase con la plana de mentores asignados.
                        </p>
                      </div>
                      
                    </div>
                    <div className="space-y-8">
                        <BookingFormBlock
                          programName="Tutorías Especializadas IB"
                          availableHours={ibHours}
                          optionsSubjects={["IB Physics HL", "IB Math AA HL", "Ensayo - TdC", "Monografía - Extended Essay"]}
                          optionsTutors={[{ label: "Adrian Pastor (Física / Monografías)", value: "Adrian Pastor" }, { label: "Sofía Ruíz (Math AA / Ensayos)", value: "Sofía Ruíz" }]}
                          onSchedule={handleScheduleBlock}
                          t={t}
                        />
                        <BookingFormBlock
                          programName="Preparación SAT Digital"
                          availableHours={satHours}
                          optionsSubjects={["SAT Math", "SAT Reading & Writing", "Simulacro Completo"]}
                          optionsTutors={[{ label: "Adrian Pastor (Math)", value: "Adrian Pastor" }, { label: "Sofía Ruíz (Reading)", value: "Sofía Ruíz" }]}
                          onSchedule={handleScheduleBlock}
                          t={t}
                        />
                        <BookingFormBlock
                          programName="Asesorías Universitarias Premium"
                          availableHours={uniHours}
                          optionsSubjects={["Common App Essay", "Personal Statement", "Entrevista", "Extracurriculares"]}
                          optionsTutors={[{ label: "Adrian Pastor", value: "Adrian Pastor" }]}
                          onSchedule={handleScheduleBlock}
                          t={t}
                        />
                      </div>
                  </div>
                )}

                {/* C. TIENDA DE RECARGA DE HORAS */}
                {studentTab === "tienda" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-1 border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight leading-none">
                          Comprar Paquete de Horas
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans font-medium">
                          Adquiere horas de mentoría privada con descuentos por bloques de volumen.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {/* Box 1: IB */}
                        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3 hover:border-[#E2B254]/40 transition-all">
                          <div className="text-right">
                            <span className="text-[9px] font-sans font-extrabold text-slate-400 tracking-wider block uppercase">
                              {lang === "ES" ? "TUTORÍAS IB" : "IB TUTORING"}
                            </span>
                            <span className="text-base font-sans font-black text-slate-900 leading-none block mt-0.5">
                              {ibHours.toFixed(1)} <span className="text-[10px] font-bold text-slate-500">Hrs</span>
                            </span>
                          </div>
                          <div className="p-1.5 bg-amber-50 rounded-lg text-[#E2B254] border border-[#E2B254]/10">
                            <Clock className="h-4 w-4" />
                          </div>
                        </div>

                        {/* Box 2: SAT */}
                        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3 hover:border-rose-500/40 transition-all">
                          <div className="text-right">
                            <span className="text-[9px] font-sans font-extrabold text-slate-400 tracking-wider block uppercase">
                              {lang === "ES" ? "PREP SAT" : "SAT PREP"}
                            </span>
                            <span className="text-base font-sans font-black text-slate-900 leading-none block mt-0.5">
                              {satHours.toFixed(1)} <span className="text-[10px] font-bold text-slate-500">Hrs</span>
                            </span>
                          </div>
                          <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500 border border-rose-500/10">
                            <Clock className="h-4 w-4" />
                          </div>
                        </div>

                        {/* Box 3: Uni */}
                        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3 hover:border-indigo-500/40 transition-all">
                          <div className="text-right">
                            <span className="text-[9px] font-sans font-extrabold text-slate-400 tracking-wider block uppercase">
                              {lang === "ES" ? "ASESORÍAS UNIV." : "UNI ADVISORY"}
                            </span>
                            <span className="text-base font-sans font-black text-slate-900 leading-none block mt-0.5">
                              {uniHours.toFixed(1)} <span className="text-[10px] font-bold text-slate-500">Hrs</span>
                            </span>
                          </div>
                          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500 border border-indigo-500/10">
                            <Clock className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Interactive Configurator */}
                      <div className="xl:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-6 text-slate-700">
                        <span className="text-[9px] font-sans font-extrabold tracking-widest text-[#E2B254] uppercase block">CONCEPTO PRESTIGIOSO</span>
                        
                        <div className="space-y-6 text-xs sm:text-sm">
                          
                          {/* Program choosing */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">1. Programa Académico de Destino</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {PROGRAMS_PLANS.map((prog) => {
                                const isSelected = purchaseType === prog.id;
                                return (
                                  <button
                                    key={prog.id}
                                    type="button"
                                    onClick={() => setPurchaseType(prog.id)}
                                    className={`p-4 border-2 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                                      isSelected
                                        ? "bg-slate-50 border-[#E2B254] shadow-xs"
                                        : "bg-slate-50/20 border-slate-100 hover:border-slate-300"
                                    }`}
                                  >
                                    <div className="space-y-3">
                                      <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs ${
                                        isSelected ? "bg-[#0C122C] text-[#E2B254]" : "bg-slate-200 text-slate-500"
                                      }`}>
                                        {prog.id === "ib" && <BookOpen className="h-4.5 w-4.5" />}
                                        {prog.id === "sat" && <FileText className="h-4.5 w-4.5" />}
                                        {prog.id === "university" && <GraduationCap className="h-4.5 w-4.5" />}
                                      </div>
                                      <div>
                                        <h4 className="text-xs sm:text-sm font-black leading-tight text-slate-900">{prog.name}</h4>
                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{prog.tagline}</p>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Currency selection */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">2. Divisa Facturada preferida</label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => setPurchaseCurrency("PEN")}
                                className={`py-3 px-4 border-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  purchaseCurrency === "PEN" ? "bg-[#0C122C] text-[#E2B254] border-[#0C122C]" : "bg-slate-50 border-slate-100"
                                }`}
                              >
                                🇵🇪 Soles Peruanos PEN (S/.)
                              </button>
                              <button
                                type="button"
                                onClick={() => setPurchaseCurrency("USD")}
                                className={`py-3 px-4 border-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  purchaseCurrency === "USD" ? "bg-[#0C122C] text-[#E2B254] border-[#0C122C]" : "bg-slate-50 border-slate-100"
                                }`}
                              >
                                🇺🇸 Dólares Estadounidenses USD ($)
                              </button>
                            </div>
                          </div>

                          {/* Hours blocks slider */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">3. Cantidad de Horas a Comprar</label>
                            <div className="grid grid-cols-5 gap-2">
                              {PROGRAMS_PLANS.find((pr) => pr.id === purchaseType)?.packages.map((pkgOption) => (
                                <button
                                  key={pkgOption.hours}
                                  type="button"
                                  onClick={() => setPurchaseHours(pkgOption.hours)}
                                  className={`py-3 px-1 border-2 rounded-xl text-center font-bold text-xs transition-all cursor-pointer ${
                                    purchaseHours === pkgOption.hours
                                      ? "bg-[#0C122C] text-[#E2B254] border-[#E2B254]"
                                      : "bg-slate-50 border-slate-100 text-slate-650"
                                  }`}
                                >
                                  <div className="font-extrabold">{pkgOption.hours}h</div>
                                  {pkgOption.discountPercent > 0 && (
                                    <div className="text-[8px] text-emerald-600 font-extrabold mt-0.5">-{pkgOption.discountPercent}%</div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Checkout Panel */}
                      {(() => {
                        const activeProgram = PROGRAMS_PLANS.find((p) => p.id === purchaseType)!;
                        const activePkg = activeProgram.packages.find((p) => p.hours === purchaseHours) || activeProgram.packages[0];
                        const priceToPay = purchaseCurrency === "PEN" ? activePkg.pricePEN : activePkg.priceUSD;
                        const priceSymbol = purchaseCurrency === "PEN" ? "S/." : "$";

                        return (
                          <div className="xl:col-span-5 bg-[#0C122C] p-6 sm:p-8 rounded-2xl border border-white/5 text-white flex flex-col justify-between shadow-xl space-y-6">
                            <div className="space-y-5">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-sans font-bold text-[#E2B254] uppercase tracking-widest">RESUMEN COGNITIVO</span>
                                <span className="text-[9px] font-bold text-[#E2B254] bg-white/5 px-2.5 py-1 rounded border border-white/10 uppercase">Secure SSL</span>
                              </div>

                              <div className="space-y-1">
                                <h3 className="text-lg sm:text-xl font-black text-white">{activeProgram.name}</h3>
                                <p className="text-xs text-[#E2B254] italic">{activeProgram.tagline}</p>
                              </div>

                              <p className="text-xs text-slate-350 leading-relaxed font-sans">{activeProgram.longDesc}</p>

                              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                                <span className="text-[10px] text-slate-400 font-bold block uppercase">Beneficios Premium:</span>
                                <ul className="space-y-1 text-slate-300">
                                  {activeProgram.bulletPoints.map((bp, i) => (
                                    <li key={i} className="flex gap-2">
                                      <span className="text-emerald-400">✔️</span>
                                      <span>{bp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                <span className="text-xs text-slate-400">Inversión Final:</span>
                                <div className="text-right">
                                  <span className="text-3xl font-black text-[#E2B254] font-sans">
                                    {priceSymbol} {priceToPay.toFixed(0)} {purchaseCurrency}
                                  </span>
                                  {activePkg.discountPercent > 0 && (
                                    <span className="text-[9px] text-emerald-400 font-black inline-block bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                                      Ahorro del {activePkg.discountPercent}% por volumen!
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {(() => {
                              const waPhone = "51987593657";
                              const waMessage = 
`¡Hola, Meridian! 👋 Soy estudiante y me encuentro interesado/a en adquirir el siguiente paquete de asesorías:

📚 *Programa:* ${activeProgram.name}
⏱️ *Horas solicitadas:* ${purchaseHours} horas
💰 *Precio referencial:* ${priceSymbol} ${priceToPay.toFixed(0)} ${purchaseCurrency}${activePkg.discountPercent > 0 ? ` *(incluye ${activePkg.discountPercent}% de descuento por volumen)*` : ""}

Me gustaría confirmar la disponibilidad, coordinar el proceso de pago y comenzar lo antes posible.

¡Quedo a la espera de su respuesta! 🎓`;
                              const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

                              return (
                                <div className="space-y-3">
                                  <p className="text-center text-xs text-slate-400 font-sans">
                                    Para proceder con la compra,{" "}
                                    <span className="text-[#E2B254] font-bold">contáctese con nuestro CEO</span>{" "}
                                    directamente:
                                  </p>
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)] text-sm"
                                  >
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                    </svg>
                                    Contactar al CEO por WhatsApp
                                  </a>
                                </div>
                              );
                            })()}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* D. BANCO DE RECURSOS ACADEMICOS */}
                {studentTab === "recursos" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight leading-none">
                        Banco de Recursos Académicos
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-sans font-medium">
                        Modelos exitosos de Trabajos Internos (IAs) y Monografías calificadas con Grado A.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {materials.map((mat, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between gap-4 hover:border-[#E2B254]/55 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-amber-50 text-[#E2B254] rounded-xl shrink-0">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 line-clamp-1">{mat.title}</h4>
                              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase block mt-0.5">{mat.category} · {mat.type}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => alert(`Descargando recurso premium: ${mat.title}`)}
                            className="p-2.5 bg-slate-100 hover:bg-[#E2B254] hover:text-[#0C122C] text-slate-650 rounded-xl transition-all border border-slate-200 cursor-pointer"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                <span>© 2026 Meridian Consultores S.A.C. Todos los derechos reservados.</span>
                <span className="flex items-center gap-1.5 font-sans font-bold">
                  <span className="w-1.5 h-1.5 bg-[#E2B254] rounded-full animate-ping" />
                  Conexión Exclusiva Estudiante
                </span>
              </div>
            </div>
          </div>
        ) : (
          
          /* ==================== VISTA TUTOR / ADMIN SIMULADOR ==================== */
          <div className="p-6 sm:p-8 bg-[#0C122C] rounded-3xl border border-white/10 space-y-8 text-white animate-fadeIn">
            <div className="border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <span className="text-xs bg-[#AE2024]/10 border border-[#AE2024]/35 px-3 py-1 rounded text-[#E2B254] font-extrabold tracking-widest uppercase">
                  ADMINISTRADOR REGISTRADO
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-white mt-2">
                  Panel de Control del Mentor Académico
                </h3>
              </div>

              <div className="bg-[#070B19] p-3 rounded-xl border border-white/5 text-xs text-slate-300 font-sans">
                Tutor en Turno: <span className="text-[#E2B254] font-black">Adrian Pastor Medina</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#E2B254] tracking-widest uppercase block mb-4">PORTAFOLIO DE ALUMNOS INTELIGENTE</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Diego card */}
                <div className="bg-[#151F47]/20 border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-md hover:border-[#E2B254]/45 transition-all">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E2B254] to-amber-500 text-white flex items-center justify-center font-bold">
                          DH
                        </div>
                        <div>
                          <h5 className="font-extrabold text-white text-base">Diego Hernández</h5>
                          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded font-bold uppercase">
                            Lincoln High · Bachillerato IB
                          </span>
                        </div>
                      </div>
                      <span className="text-xs bg-[#070B19] p-1.5 rounded text-slate-350 font-mono border border-white/5">6 Clases</span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-2 font-sans pt-1">
                      <div className="flex justify-between">
                        <span>Horas Consolidadas de Bolsa:</span>
                        <span className="text-white">5.5h de 10.0h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horas Restantes vigentes:</span>
                        <span className="text-[#E2B254] font-black">{totalHoursLeft.toFixed(1)} Hrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                    <button
                      onClick={() => {
                        const nextSch = sessions.find((s) => s.status === "scheduled");
                        if (nextSch) {
                          setEditingSession(nextSch);
                          setAdvancesInput(nextSch.report?.advances || "");
                          setAgreementsInput(nextSch.report?.agreements || "");
                        } else {
                          alert("No hay clases programadas vigentes para redactar un informe instructivo.");
                        }
                      }}
                      className="w-full py-2.5 bg-[#E2B254] hover:bg-[#E2B254]/95 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                    >
                      <Bot className="h-4 w-4" />
                      Redactar Reporte Familiar con Soporte IA
                    </button>
                    <button
                      onClick={() => setShowPackagesHistoryModal(true)}
                      className="w-full py-2.5 bg-[#0C122C] border border-[#E2B254]/30 text-[#E2B254] hover:bg-[#E2B254] hover:text-[#0C122C] rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                    >
                      <Clock className="h-4 w-4" />
                      Ver paquetes y horas utilizadas
                    </button>
                  </div>
                </div>

                {/* Sofia card dummy */}
                <div className="bg-[#151F47]/25 border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-md opacity-75">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-850 text-slate-200 border border-white/10 flex items-center justify-center font-bold">SM</div>
                        <div>
                          <h5 className="font-extrabold text-[#94A3B8] text-base">Sofia Medina</h5>
                          <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded font-bold uppercase">Newton College · SAT Prep</span>
                        </div>
                      </div>
                      <span className="text-xs bg-[#070B19] p-1.5 rounded text-slate-400 font-mono">8 Clases</span>
                    </div>

                    <div className="text-xs text-slate-400 space-y-2 pt-1 font-sans">
                      <div className="flex justify-between">
                        <span>Horas de Bolsa Usadas:</span>
                        <span>2h de 16h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Siguiente Diagnóstico:</span>
                        <span className="text-[#E2B254]">15 Jun 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <button
                      onClick={() => alert("Solo el alumno Diego contiene licencias activas para este simulador de tutor.")}
                      className="w-full py-2.5 bg-white/5 text-slate-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      Ver Historial Escolar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5.5 bg-[#070B19] border border-white/5 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-[#E2B254] tracking-widest uppercase">CRONOGRAMA DE CLASES ACUÑADO - DIEGO HERNÁNDEZ</h4>
              
              <div className="divide-y divide-white/5 font-sans">
                {sessions.map((session) => (
                  <div key={session.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 first:pt-0 last:pb-0">
                    <div>
                      <div className="text-xs text-slate-400">
                        {session.date} · {session.time} · Coach responsable: <strong>{session.tutorName}</strong>
                      </div>
                      <h5 className="font-bold text-white text-sm mt-1 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-[#AE2024]" />
                        {session.subject}
                      </h5>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingSession(session);
                          setAdvancesInput(session.report?.advances || "");
                          setAgreementsInput(session.report?.agreements || "");
                        }}
                        className="py-1.5 px-3 bg-[#E2B254]/10 border border-[#E2B254]/20 text-[#E2B254] hover:bg-[#E2B254] hover:text-[#0C122C] text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Bot className="h-3.5 w-3.5" />
                        {session.report ? "Re-editar Reporte Familiar por IA" : "Completar & Generar Avance"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI TUTOR REPORTING DIALOG MODAL */}
      <AnimatePresence>
        {editingSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingSession(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-[#0C122C] rounded-2xl p-6 sm:p-8 border border-white/10 max-w-2xl w-full relative z-10 shadow-2xl space-y-6"
            >
              <div className="border-b border-white/10 pb-4 flex justify-between items-start">
                <div className="space-y-1">
                  <span className="px-2.5 py-1 bg-[#E2B254]/10 text-[#E2B254] border border-[#E2B254]/25 text-[9px] font-mono tracking-widest font-bold uppercase rounded-md inline-block">
                    CONEXIÓN DIRECTA COGNITIVA
                  </span>
                  <h3 className="text-lg font-sans font-black text-white mt-1">Redactar Reporte Familiar</h3>
                  <p className="text-xs text-slate-400">Evaluando la materia: {editingSession.subject}</p>
                </div>
                <button
                  onClick={() => setEditingSession(null)}
                  className="p-1 px-2.5 hover:bg-white/5 rounded text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm">
                
                <div className="bg-[#E2B254]/10 p-4 border border-[#E2B254]/25 rounded-xl flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-350">
                    <strong>¿Deseas autocompletar con la asistencia IA de Meridian?</strong> Adaptaremos las mediciones y avances usando el rigor reflexivo del Bachillerato Internacional.
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerIAHelper}
                    className="py-1.5 px-3 bg-[#E2B254] hover:bg-[#E2B254]/80 text-[#0C122C] font-black rounded-lg transition-all cursor-pointer shrink-0"
                  >
                    {isGeneratingIA ? "Redactando..." : "Asistir de Inmediato"}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Avances consolidados del alumno durante la clase:</label>
                  <textarea
                    rows={3}
                    placeholder="Escribe el marco teórico resuelto, ecuaciones vistas, etc..."
                    value={advancesInput}
                    onChange={(e) => setAdvancesInput(e.target.value)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E2B254]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Compromisos & Tareas pendientes de cara a la siguiente sesión:</label>
                  <textarea
                    rows={2}
                    placeholder="Lecturas pendientes, ejercicios de repaso de incertidumbre para el fin de semana..."
                    value={agreementsInput}
                    onChange={(e) => setAgreementsInput(e.target.value)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E2B254]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 font-sans">
                <button
                  onClick={() => setEditingSession(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-slate-300 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveReport}
                  className="px-5 py-2.5 bg-[#E2B254] text-[#070B19] hover:bg-[#E2B254]/90 text-xs font-black rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  Emitir y Guardar Reporte Familiar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PACKAGES HISTORY MODAL */}
      <AnimatePresence>
        {showPackagesHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPackagesHistoryModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-full text-center space-y-1">
                  <h2 className="text-3xl font-black text-[#0C122C] tracking-tight">Registro de Sesiones</h2>
                  <p className="text-slate-500 text-sm">Diego Hernández — Progreso y Control de Paquetes</p>
                </div>
                <button onClick={() => setShowPackagesHistoryModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors cursor-pointer">
                  ✕
                </button>
              </div>

              <div className="bg-[#10b981] rounded-2xl p-6 text-center text-white shadow-lg mb-8">
                <div className="text-xs font-bold uppercase tracking-widest opacity-90 mb-1">INGRESOS TOTALES REGISTRADOS</div>
                <div className="text-5xl font-black">{packages.reduce((acc, pkg) => acc + pkg.pricePEN, 0).toFixed(2)} Soles</div>
              </div>

              <div className="space-y-6">
                {packages.map((pkg, idx) => {
                  const pkgSessions = sessions.filter(s => s.packageId === pkg.id);
                  const borderColors = ['border-red-500', 'border-blue-500', 'border-emerald-500', 'border-amber-500'];
                  const borderColor = borderColors[idx % borderColors.length];
                  
                  return (
                    <div key={pkg.id} className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex`}>
                      <div className={`w-1.5 shrink-0 bg-white border-l-4 ${borderColor} rounded-l-2xl`}></div>
                      
                      <div className="p-6 w-full">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-black text-[#0C122C] flex items-center gap-2">
                              {pkg.name} <span className="text-[#6366f1] text-base font-bold">(S/. {pkg.pricePEN.toFixed(2)})</span>
                            </h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{pkg.modalidad}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-[#10b981] rounded flex items-center justify-center text-white shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                              <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                              {Math.floor(pkg.hoursUsed)}h {Math.round((pkg.hoursUsed % 1) * 60)}m
                            </div>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-2">ACTIVIDAD</th>
                                <th className="py-3 px-2 text-center">IA</th>
                                <th className="py-3 px-2">FECHA</th>
                                <th className="py-3 px-2">HORARIO</th>
                                <th className="py-3 px-2 text-right">DURACIÓN</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {pkgSessions.map(session => (
                                <tr key={session.id} className="text-sm font-bold text-slate-700">
                                  <td className="py-4 px-2">{session.subject}</td>
                                  <td className="py-4 px-2 text-center">
                                    {session.report ? (
                                      <div className="inline-flex bg-[#fbbf24] p-1.5 rounded-lg text-white shadow-sm">
                                        <Bot className="w-4 h-4" />
                                      </div>
                                    ) : <span className="text-slate-300">-</span>}
                                  </td>
                                  <td className="py-4 px-2">{session.date}</td>
                                  <td className="py-4 px-2 text-slate-500 font-medium">{session.time}</td>
                                  <td className="py-4 px-2 text-right text-slate-600">
                                    {Math.floor(session.duration)} h {Math.round((session.duration % 1) * 60)} min
                                  </td>
                                </tr>
                              ))}
                              {pkgSessions.length === 0 && (
                                <tr>
                                  <td colSpan={5} className="py-6 text-center text-slate-400 font-normal">No hay sesiones registradas en este paquete.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}