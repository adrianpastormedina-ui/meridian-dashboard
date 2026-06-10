/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { University, Tutor, Milestone, ClassPackage, Session, Materials } from './types';

export const UNIVERSITIES_DATA: University[] = [
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    generalAdmitRate: 3.0,
    meridianAdmitRate: 26.2,
    topDegrees: ['Economics', 'Computer Science', 'Government / Political Science'],
    meridianOffers: 98,
    badgeColor: '#A51C30',
    description: 'Enfoque en liderazgo global y excelencia académica absoluta. Evaluamos el perfil integral con énfasis en el impacto social.'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, CA',
    generalAdmitRate: 3.5,
    meridianAdmitRate: 31.1,
    topDegrees: ['Computer Science', 'Engineering', 'Symbolic Systems'],
    meridianOffers: 217,
    badgeColor: '#8C1515',
    description: 'Espíritu emprendedor, innovación tecnológica y "vitalidad intelectual" sobresaliente.'
  },
  {
    id: 'yale',
    name: 'Yale University',
    location: 'New Haven, CT',
    generalAdmitRate: 4.2,
    meridianAdmitRate: 23.6,
    topDegrees: ['History', 'Political Science', 'Molecular Biophysics'],
    meridianOffers: 155,
    badgeColor: '#00356B',
    description: 'Prestigiosa red humanística y de artes liberales. Valoramos el amor por el conocimiento y la comunidad.'
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    location: 'New York, NY',
    generalAdmitRate: 3.9,
    meridianAdmitRate: 22.4,
    topDegrees: ['Finance & Economics', 'Neuroscience', 'English Literature'],
    meridianOffers: 173,
    badgeColor: '#B9D9EB',
    description: 'Ubicación cosmopolita en NYC con un Core Curriculum de rigurosidad legendaria.'
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, MA',
    generalAdmitRate: 4.0,
    meridianAdmitRate: 27.6,
    topDegrees: ['Physics', 'Mathematics', 'Electrical Engineering'],
    meridianOffers: 63,
    badgeColor: '#A31F34',
    description: 'La cuna del pensamiento experimental. Buscamos genios matemáticos con sed de resolver problemas reales.'
  },
  {
    id: 'princeton',
    name: 'Princeton University',
    location: 'Princeton, NJ',
    generalAdmitRate: 4.3,
    meridianAdmitRate: 23.4,
    topDegrees: ['Public Policy', 'Operations Research', 'Astrophysical Sciences'],
    meridianOffers: 126,
    badgeColor: '#FF6600',
    description: 'Énfasis riguroso en investigación de pregrado. Exige una tesis senior impecable para graduarse.'
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    location: 'Ithaca, NY',
    generalAdmitRate: 7.0,
    meridianAdmitRate: 28.4,
    topDegrees: ['Architecture', 'Hotel Administration', 'Applied Economics'],
    meridianOffers: 307,
    badgeColor: '#B31B1B',
    description: '"Cualquier persona, cualquier estudio". El campus de la Ivy League más diverso académicamente.'
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    location: 'Oxford, UK',
    generalAdmitRate: 14.2,
    meridianAdmitRate: 48.6,
    topDegrees: ['Philosophy, Politics and Economics (PPE)', 'Law', 'Medicine'],
    meridianOffers: 85,
    badgeColor: '#002147',
    description: 'Sistema colegiado y tutoriales súper exigentes. Enfoque extremo en el conocimiento profundo de la materia seleccionada.'
  }
];

export const TUTORS_DATA: Tutor[] = [
  {
    id: '1',
    name: 'Adrian Pastor',
    role: 'Managing Coach & Senior Advisor',
    bio: 'Coach especialista en admisiones extranjeras. Experto en SAT Math (1580 Score) e IB (43 puntos). Ha asesorado exitosamente a más de 80 alumnos latinoamericanos para ingresar a la Ivy League.',
    achievements: [
      '1er Puesto & Abanderado - Colegio Abraham Lincoln',
      'Beca de Excelencia Integral en Ivy League',
      'Consultor certificado en College Admissions'
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', // Student portal avatar
    subjects: ['SAT Math', 'SAT Reading & Writing', 'IB Physics HL/SL', 'Admissions Coaching'],
    rating: 4.9
  },
  {
    id: '2',
    name: 'Sofía Ruíz',
    role: 'IB Senior Mentor & TOK Specialist',
    bio: 'Graduada de la Ivy League y ex-coordinadora de Ensayos del IB. Ha ayudado a docenas de estudiantes de Meridian con redacción académica de Teoría del Conocimiento (TOK) y Monografías completadas con grado "A".',
    achievements: [
      'Graduada con Honores de Columbia University',
      'Examinadora oficial externa en Ensayos Ampliados (EE) e IB Literature',
      '8+ años de experiencia docente bilingüe'
    ],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    subjects: ['IB TOK', 'Extended Essay (EE)', 'IB Business Management', 'English Essay Editing'],
    rating: 5.0
  },
  {
    id: '3',
    name: 'Esteban Montalván',
    role: 'Extracurricular & Core Profile Engineer',
    bio: 'Especialista en estructuración de actividades extracurriculares de alto impacto. Ha guiado a estudiantes en la creación de ONGs, startups tecnológicas escolares y proyectos de investigación publicados internacionalmente.',
    achievements: [
      'Master en Creatividad Educativa de Stanford University',
      'Fundador de 2 startups de impacto juvenil en Latinoamérica',
      'Asesor de Estrategia de Perfiles de Admisión Exclusivos'
    ],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    subjects: ['Profile Architecture', 'Personal Statement', 'Creative Writing', 'Interview Prep'],
    rating: 4.8
  }
];

export const TIMELINE_DATA: Milestone[] = [
  {
    id: 'm1',
    grade: '9° Grado',
    period: 'Fase Inicial (Exploración)',
    title: 'Cimentación y Pasiones',
    description: 'Evaluación del perfil de intereses. Selección óptima de cursos de nivel avanzado de preparación. Inicio de registros preliminares académicos y deportes.',
    category: 'Profile'
  },
  {
    id: 'm2',
    grade: '10° Grado',
    period: 'Fase de Consolidación',
    title: 'Estrategia de Perfil y Primer SAT',
    description: 'Elección preliminar de asignaturas en Bachillerato Internacional (IB) Higher Level. Diseño y lanzamiento del proyecto extracurricular emblemático (Capstone). Preparación inicial del examen SAT.',
    category: 'SAT'
  },
  {
    id: 'm3',
    grade: '11° Grado',
    period: 'Año Académico Crítico',
    title: 'Rigor IB Extremo y Resultados SAT',
    description: 'Desarrollo riguroso de la Monografía y Ensayos de Teoría del Conocimiento (TOK). Obtención del puntaje meta en el SAT (Meta: 1500+). Planificación de visitas virtuales o presenciales a campus.',
    category: 'IB'
  },
  {
    id: 'm4',
    grade: '12° Grado',
    period: 'Fase de Aplicación',
    title: 'Proceso de Envío a Universidades',
    description: 'Redacción y refinamiento individual del Common App Personal Statement y ensayos suplementarios. Consolidación de cartas de recomendación de profesores. Envío de postulaciones en fases Early Decision/Early Action y Regular Decision.',
    category: 'Essays'
  }
];

export const INITIAL_PACKAGES: ClassPackage[] = [
  {
    id: 'p1',
    name: 'Paquete Clases #1 (Tutoría Especializada IB)',
    modalidad: 'MODALIDAD: MÁXIMO 3 HORAS',
    hoursTotal: 3,
    hoursUsed: 1,
    pricePEN: 270,
    priceUSD: 73.3,
    status: 'active'
  },
  {
    id: 'p6',
    name: 'Paquete Trabajos #6 (Mentoring Monografías)',
    modalidad: 'MODALIDAD: MÁXIMO 6 HORAS',
    hoursTotal: 6,
    hoursUsed: 5,
    pricePEN: 1540,
    priceUSD: 416.7,
    status: 'active'
  },
  {
    id: 'p5',
    name: 'Paquete Trabajos #5 (Simulador Interno de Historia)',
    modalidad: 'MODALIDAD: MÁXIMO 6 HORAS',
    hoursTotal: 6,
    hoursUsed: 6,
    pricePEN: 1850,
    priceUSD: 500,
    status: 'completed'
  },
  {
    id: 'p4',
    name: 'Paquete Trabajos #4 (Ensayo de TdC Avanzado)',
    modalidad: 'MODALIDAD: MÁXIMO 6 HORAS',
    hoursTotal: 6,
    hoursUsed: 6,
    pricePEN: 1850,
    priceUSD: 500,
    status: 'completed'
  }
];

export const INITIAL_SESSIONS: Session[] = [
  {
    id: 's1',
    date: '2026-06-09',
    time: '17:30 - 18:30',
    subject: 'Ensayo - TdC (Teoría del Conocimiento)',
    tutorName: 'Sofía Ruíz',
    duration: 1.0,
    status: 'completed',
    report: {
      advances: 'Avanzamos con la introducción con planteamiento de áreas del conocimiento secundario. Analizamos la rigurosidad de metodologías históricas y matemáticas.',
      agreements: 'Alinear los argumentos de contradeclaración con ejemplos reales y pragmáticos usando el falsacionismo de Karl Popper.'
    },
    packageId: 'p1'
  },
  {
    id: 's2',
    date: '2026-06-08',
    time: '21:20 - 22:10',
    subject: 'Redacción de Monografía de Física HL',
    tutorName: 'Adrian Pastor',
    duration: 0.83,
    status: 'completed',
    report: {
      advances: 'Revisión técnica de la toma de datos del circuito LC. Se calculó la incertidumbre de la inductancia empleando regresión lineal.',
      agreements: 'Completar la sección de análisis cualitativo y justificar el coeficiente de correlación R² obtenido.'
    },
    packageId: 'p6'
  },
  {
    id: 's3',
    date: '2026-06-07',
    time: '19:30 - 20:30',
    subject: 'Interno de Historia: Revolución Industrial',
    tutorName: 'Sofía Ruíz',
    duration: 1.0,
    status: 'completed',
    report: {
      advances: 'Diego presentó su propuesta de 5 fuentes para evaluación crítica histórica.',
      agreements: 'Redactar por completo la sección B (Investigación Académica) contrastando la postura de Hobsbawm.'
    },
    packageId: 'p5'
  }
];

export const REFRENCES_MATERIALS: Materials[] = [
  {
    category: 'Coaching-Universidades',
    title: 'Guía Maestra Common App: Ivy League Personal Statements',
    type: 'PDF / Guía Teórica',
    downloadUrl: '#'
  },
  {
    category: 'Proyecto-Personal-PAI',
    title: 'Rúbrica de Oro y Criterios del Proyecto Personal IB',
    type: 'XLSX / Planificador de Rúbricas',
    downloadUrl: '#'
  },
  {
    category: 'IB-Asesorias-Ingles A SL',
    title: 'Plantilla de Análisis de Textos No Literarios',
    type: 'DOCX / Esteroestructuras',
    downloadUrl: '#'
  },
  {
    category: 'IB-Asesorias-Politica Global SL',
    title: 'Glosario Clave de Conceptos de Paz y Conflicto en Global Politics',
    type: 'PDF / Vocabulario de Elite',
    downloadUrl: '#'
  },
  {
    category: 'SAT - Math',
    title: 'Fórmulas Indispensables y Guía Avanzada de Passport to Advanced Math',
    type: 'PDF / Fórmulas Pro',
    downloadUrl: '#'
  },
  {
    category: 'SAT - Reading',
    title: 'Caja de Herramientas de Vocabulario y Conectores de Texto del SAT',
    type: 'Interactive Doc',
    downloadUrl: '#'
  }
];

// Spanish and English full text dictionaries
export const DICTIONARY = {
  ES: {
    nav_home: 'Inicio',
    nav_about: 'Nosotros',
    nav_services: 'Servicios',
    nav_methodology: 'Metodología',
    nav_universities: 'Universidades Top',
    nav_portal: 'Plataforma Portal',
    nav_start: 'Iniciar Camino',
    
    hero_consultancy: 'CONSULTORÍA APEX ZENITH',
    hero_title_1: 'Miles aplican.',
    hero_title_2: 'Pocos destacan.',
    hero_title_3: 'Aseguraremos que seas uno de ellos.',
    hero_subtitle: 'Transformando a estudiantes de alto rendimiento en candidatos sobresalientes para las mejores universidades del mundo a través de la excelencia en el IB y exámenes estandarizados.',
    hero_button: 'Potenciar mi Perfil Académico',
    hero_scroll_hint: 'Explora nuestra fórmula de éxito',

    about_subtitle: 'NUESTRA ESENCIA ACADÉMICA',
    about_title: 'Un Estándar Supremo de Excelencia',
    about_mission_title: 'Nuestra Misión',
    about_mission_desc: 'Guiar a estudiantes ambiciosos hacia la excelencia absoluta, desmitificando el complejo panorama de las admisiones universitarias internacionales mediante estrategias rigurosas, personalizadas y respaldadas por resultados demostrables.',
    about_vision_title: 'Nuestra Visión',
    about_vision_desc: 'Convertirnos en el estándar de oro en consultoría educativa de alto nivel, donde cada estudiante que forma parte de Meridian alcance su máximo potencial intelectual y asegure su lugar en las instituciones más prestigiosas del mundo.',

    services_subtitle: 'UNA ESTRATEGIA GANADORA',
    services_title: 'Nuestros Centros de Dominio Académico',
    services_ib_title: 'IB Mastery',
    services_ib_desc: 'Estrategias estructuradas de alto rigor para dominar componentes complejos del Bachillerato Internacional, tales como la Monografía (EE) y Teoría del Conocimiento (TOK).',
    services_sat_title: 'SAT Prep',
    services_sat_desc: 'Maximiza tus resultados mediante metodologías científicas de resolución de problemas orientadas a superar los 1500+ puntos en el SAT Digital.',
    services_profile_title: 'Estrategia de Perfil',
    services_profile_desc: 'Construcción y articulación de un perfil extracurricular único, coherente e inspirador que destaque con fuerza frente a los comités de admisiones.',

    stats_title: 'Los Números No Mienten',
    stats_subtitle: 'RESULTADOS COMPROBADOS',
    stats_comparison: 'Tasa de Admisión Directa vs Alumnos Meridian',
    stats_factor_label: 'Nuestros alumnos son',
    stats_factor_highlight: '7 veces más propensos',
    stats_factor_desc: 'de ingresar a la Ivy League y a las 15 mejores universidades del mundo comparado con la tasa general.',
    stats_offers_count: '1,736',
    stats_offers_desc: 'Ofertas totales recibidas de universidades de la Ivy League.',

    timeline_subtitle: 'TU HOJA DE RUTA AL ÉXITO',
    timeline_title: 'Cronograma de Admisiones de Alta Gama',
    timeline_tab_grade: 'Grado',

    unis_subtitle: 'DONDE PERTENECEN NUESTROS GRADUADOS',
    unis_title: 'Elite Universitaria Global',
    unis_search_placeholder: 'Buscar universidad o especialidad...',
    unis_filter_all: 'Todas',
    unis_general_rate: 'Tasa General:',
    unis_meridian_rate: 'Tasa Meridian:',
    unis_top_degrees: 'Carreras Top:',
    unis_description: 'Perspectiva de Admisión Meridian:',

    advisors_subtitle: 'CONOCE A TUS INSTRUCTORES',
    advisors_title: 'Asesoría Impartida por Líderes de Élite',
    advisors_achievements: 'Hitos Clave:',
    advisors_subjects: 'Especialidades:',
    advisors_book_btn: 'Consultar Disponibilidad',

    key_success_title: 'El Secreto de Nuestro Éxito',
    key_success_subtitle: 'POR QUÉ MERIDIAN',
    key_success_desc: 'A diferencia de las tutorías convencionales, Meridian opera bajo un marco estructurado de Consultoría de Alto Rendimiento. No solo enseñamos materias; diseñamos y orquestamos una arquitectura para tu futuro académico.',
    key_success_1_title: 'Transparencia Total',
    key_success_1_desc: 'Control estricto de horas tomadas, reportes detallados del avance y material de estudio premium unificado en un solo portal privado.',
    key_success_2_title: 'Asesoría de Élite',
    key_success_2_desc: 'Instructores internacionales de altísimo nivel egresados de las mejores universidades del mundo, expertos en currículum IB y SAT.',
    key_success_3_title: 'Enfoque de Resultados',
    key_success_3_desc: 'Nuestras métricas de éxito se basan en potenciar tu rendimiento con puntajes óptimos que garanticen tu carta de aceptación.',
    key_exclusive_badge: '1° EXCLUSIVO',
    key_exclusive_title: 'Un Compromiso Exclusivo',
    key_exclusive_desc: 'En Meridian no aceptamos a cualquier estudiante. Aceptamos a aquellos apasionados por esforzarse y listos para llegar al máximo nivel. Si tienes el compromiso, nosotros te daremos todo el mapa de vuelo.',
    key_exclusive_btn: 'Inicia tu Camino',

    portal_welcome: 'Bienvenido a la Plataforma Meridian',
    portal_student_tab: 'Vista Estudiante',
    portal_admin_tab: 'Administrador Tutor',
    portal_calendar: 'Calendario de Clases',
    portal_materials: 'Banco de Recursos Premium',
    portal_report_ia: 'Asistente IA de Reportes',
    portal_buy_hours: 'Comprar & Renovar Paquetes',
    portal_hours_left: 'Horas Restantes',
    portal_total_earnings: 'Ingresos Totales Registrados',
    portal_active_students: 'Estudiantes Activos',
    portal_packages_sold: 'Paquetes de Clases Vendidos',
    portal_button_generate_report: 'Generar Reporte con IA',
    portal_report_title: 'Asistente IA de Reportes Académicos',
    portal_report_advances: 'Avances de la Sesión (Para la Familia):',
    portal_report_agreements: 'Acuerdos de Trabajo (Próxima Sesión):',
    portal_report_confirm: 'Confirmar y Guardar Reporte',
    portal_cancel: 'Cancelar'
  },
  EN: {
    nav_home: 'Home',
    nav_about: 'AboutUs',
    nav_services: 'Services',
    nav_methodology: 'Methodology',
    nav_universities: 'Top Universities',
    nav_portal: 'Portal Platform',
    nav_start: 'Start Journey',

    hero_consultancy: 'APEX ZENITH CONSULTING',
    hero_title_1: 'Thousands apply.',
    hero_title_2: 'Few stand out.',
    hero_title_3: 'We will make sure you are one of them.',
    hero_subtitle: 'Transforming high-performing students into outstanding candidates for the world\'s top universities through IB excellence and standardized test mastery.',
    hero_button: 'Accelerate My Academic Profile',
    hero_scroll_hint: 'Discover our formula of success',

    about_subtitle: 'OUR ACADEMIC ESSENCE',
    about_title: 'A Supreme Standard of Excellence',
    about_mission_title: 'Our Mission',
    about_mission_desc: 'To guide ambitious students toward absolute excellence, demystifying the complex landscape of global college admissions through rigorous, customized, and results-proven strategies.',
    about_vision_title: 'Our Vision',
    about_vision_desc: 'To become the gold standard in premium educational consulting, enabling every Meridian student to realize their full intellectual potential and secure placement in the world\'s most prestigious institutions.',

    services_subtitle: 'A WINNING STRATEGY',
    services_title: 'Our Key Pillars of Academic Dominance',
    services_ib_title: 'IB Mastery',
    services_ib_desc: 'Structured, high-stakes coaching to master complex International Baccalaureate components, including the Extended Essay (EE) and Theory of Knowledge (TOK).',
    services_sat_title: 'SAT Prep',
    services_sat_desc: 'Maximal performance scaling through scientific problem-solving frameworks aimed at securing 1500+ Digital SAT scores.',
    services_profile_title: 'Profile Strategy',
    services_profile_desc: 'Engendering and organizing a high-impact, cohesive, and compelling extracurricular profile that stands out to Ivy League admission officers.',

    stats_title: 'The Numbers Don\'t Lie',
    stats_subtitle: 'PROVEN RESULTS',
    stats_comparison: 'General Admission Rate vs Meridian Students Rate',
    stats_factor_label: 'Our portfolio is',
    stats_factor_highlight: '7x more likely',
    stats_factor_desc: 'to secure acceptances at Ivy League and Top 15 universities globally compared to standard applicants.',
    stats_offers_count: '1,736',
    stats_offers_desc: 'Total admission offers received from Ivy League institutions globally.',

    timeline_subtitle: 'YOUR ROADMAP TO SUCCESS',
    timeline_title: 'Elite Admissions Chronogram Strategy',
    timeline_tab_grade: 'Grade',

    unis_subtitle: 'WHERE OUR GRADUATES BELONG',
    unis_title: 'Global University Elite',
    unis_search_placeholder: 'Search university or major field...',
    unis_filter_all: 'All',
    unis_general_rate: 'General Rate:',
    unis_meridian_rate: 'Meridian Rate:',
    unis_top_degrees: 'Top Majors:',
    unis_description: 'Meridian Admission Perspective:',

    advisors_subtitle: 'MEET YOUR EXPERT COACHES',
    advisors_title: 'Coaching Rendered by Elite International Leaders',
    advisors_achievements: 'Key Achievements:',
    advisors_subjects: 'Subjects & Specialties:',
    advisors_book_btn: 'Query Advisor Availability',

    key_success_title: 'The Secret of Our Success',
    key_success_subtitle: 'WHY MERIDIAN',
    key_success_desc: 'Unlike generic tutoring services, Meridian operates under an elite High-Performance Consulting model. We do not just teach material; we co-author an architecture for your entire academic future.',
    key_success_1_title: 'Complete Transparency',
    key_success_1_desc: 'Rigorous tracking of rendered hours, detailed sesion progress files, and premium educational materials in your secure student portal.',
    key_success_2_title: 'Elite Advisory',
    key_success_2_desc: 'Instructors of outstanding pedigree with academic backgrounds in Ivy League institutions, expert in the IB Program and Digital SAT.',
    key_success_3_title: 'Results Driven',
    key_success_3_desc: 'Our fundamental success metric is maximizing your grades and profiles to warrant your acceptance decision letters.',
    key_exclusive_badge: '1st EXCLUSIVE',
    key_exclusive_title: 'An Exclusive Commitment',
    key_exclusive_desc: 'At Meridian, we do not admit everyone. We selectively partner with students determined to apply maximum rigor to their goals. If you have the passion, we supply the complete flight manual.',
    key_exclusive_btn: 'Begin Your Journey',

    portal_welcome: 'Welcome to the Meridian Portal',
    portal_student_tab: 'Student Dashboard',
    portal_admin_tab: 'Tutor Admin Center',
    portal_calendar: 'Academic Calendar',
    portal_materials: 'Premium Resource Bank',
    portal_report_ia: 'Tutor IA Reporter',
    portal_buy_hours: 'Purchase & Renew Hourly Packages',
    portal_hours_left: 'Remaining Package Hours',
    portal_total_earnings: 'Total Tracked Revenue',
    portal_active_students: 'Active Portfolio Students',
    portal_packages_sold: 'Hour Packages Dispatched',
    portal_button_generate_report: 'Generate Report with AI',
    portal_report_title: 'Academic Session AI Assistant Report',
    portal_report_advances: 'Session Accomplishments (For Parents):',
    portal_report_agreements: 'Rigor Commitments (Next Session):',
    portal_report_confirm: 'Settle and Dispatch Report',
    portal_cancel: 'Cancel'
  }
};
