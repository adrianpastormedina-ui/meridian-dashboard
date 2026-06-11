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
  description_en: string;
}

export interface Tutor {
  id: string;
  name: string;
  role: string;
  role_en: string;
  bio: string;
  bio_en: string;
  achievements: string[];
  achievements_en: string[];
  avatar: string;
  subjects: string[];
  rating: number;
}

export interface Milestone {
  id: string;
  grade: string;
  grade_en: string;
  period: string;
  period_en: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  category: 'IB' | 'SAT' | 'Profile' | 'Essays';
}

export interface Report {
  advances: string;
  agreements: string;
}

export interface Session {
  id: string;
  date: string;
  time: string;
  subject: string;
  tutorName: string;
  duration: number;
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
