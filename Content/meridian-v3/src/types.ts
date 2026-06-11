/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ES' | 'EN';

export type SectionType = 'inicio' | 'nosotros' | 'servicios' | 'top-universidades' | 'portal';

export interface University {
  id: string;
  name: string;
  location: string;
  generalAdmitRate: number;
  meridianAdmitRate: number;
  topDegrees: string[];
  meridianOffers: number;
  badgeColor: string;
  description: string;
}

export interface Tutor {
  id: string;
  name: string;
  role: string;
  bio: string;
  achievements: string[];
  avatar: string;
  subjects: string[];
  rating: number;
}

export interface Milestone {
  id: string;
  grade: string; // "9° Grado", "10° Grado", etc.
  period: string; // e.g., "Q1", "Semestre 1"
  title: string;
  description: string;
  category: 'IB' | 'SAT' | 'Profile' | 'Essays';
}

export interface Report {
  advances: string; // "Avance para mamá/papá"
  agreements: string; // "Acuerdos para la siguiente sesión"
}

export interface Session {
  id: string;
  date: string;
  time: string;
  subject: string;
  tutorName: string;
  duration: number; // in hours or minutes (e.g. 1.0, 1.5, 3.0)
  status: 'completed' | 'scheduled';
  report: Report | null;
  packageId: string;
}

export interface ClassPackage {
  id: string;
  name: string;
  modalidad: string;
  hoursTotal: number;
  hoursUsed: number;
  pricePEN: number;
  priceUSD: number;
  status: 'active' | 'completed';
}

export interface Materials {
  category: string;
  title: string;
  type: string;
  downloadUrl: string;
}
