/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, X, Mail, Lock, UserCheck, Bot } from 'lucide-react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (role: 'student' | 'tutor') => void;
}

export default function AuthModal({ isOpen, onClose, language, onLoginSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Adrian Pastor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate logging in
    const role = email.toLowerCase().includes('tutor') || email.toLowerCase().includes('admin')
      ? 'tutor' 
      : 'student';
    
    onLoginSuccess(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Background overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Modal containment card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="glass rounded-3xl p-6 sm:p-8 border border-white/10 max-w-md w-full relative z-10 shadow-2xl space-y-6"
        id="auth-modal"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand logo in modal header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-brand-crimson to-brand-gold rounded-2xl shadow-xl justify-center items-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            {isSignUp 
              ? (language === 'ES' ? 'Crear Cuenta' : 'Create Account') 
              : (language === 'ES' ? 'Iniciar Sesión' : 'Sign In')}
          </h3>
          <p className="text-xs text-slate-400">
            {isSignUp 
              ? (language === 'ES' ? 'Únete a la plataforma académica' : 'Join our high performance academy') 
              : (language === 'ES' ? 'Accede a tu plataforma de seguimiento' : 'Access your private tracking platform')}
          </p>
        </div>

        {/* Form elements */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
          
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400">
                {language === 'ES' ? 'Nombre Completo' : 'Full Name'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ex: Adrian Pastor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950/80 hover:bg-slate-950 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400">
              {language === 'ES' ? 'Correo Electrónico' : 'Email Address'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 hover:bg-slate-950 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <Mail className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-mono font-bold text-slate-400">
                {language === 'ES' ? 'Contraseña' : 'Password'}
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => alert(language === 'ES' ? 'Simulación: enlace de recuperación enviado.' : 'Simulation: recovery instructions dispatched.')}
                  className="text-xs text-[#E2B254] hover:underline font-semibold"
                >
                  {language === 'ES' ? '¿Olvidaste tu contraseña?' : 'Forgot password?'}
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 hover:bg-slate-950 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <Lock className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isSignUp 
                ? (language === 'ES' ? 'Crear Cuenta' : 'Create Account') 
                : (language === 'ES' ? 'Ingresar' : 'Sign In')}
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>

        {/* Quick Credentials Info Box helper */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 text-center text-xs space-y-1 text-slate-400">
          <p className="font-semibold text-slate-300">💡 Credenciales Rápidas para Test:</p>
          <div className="flex justify-around gap-2 pt-1 font-mono text-[10px]">
            <div>
              <p className="text-brand-gold font-bold">Modo Estudiante:</p>
              <p>student@example.com</p>
            </div>
            <div className="border-l border-white/10" />
            <div>
              <p className="text-red-400 font-bold">Modo Tutor/Admin:</p>
              <p>tutor@example.com</p>
            </div>
          </div>
        </div>

        {/* Bottom switcher helper */}
        <div className="text-center pt-2">
          {isSignUp ? (
            <p className="text-xs text-slate-400 font-sans">
              {language === 'ES' ? '¿Ya tienes cuenta?' : 'Already have an account?'}{' '}
              <button 
                onClick={() => setIsSignUp(false)}
                className="text-brand-gold font-bold underline cursor-pointer"
              >
                {language === 'ES' ? 'Inicia Sesión' : 'Sign in here'}
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400 font-sans">
              {language === 'ES' ? '¿No tienes cuenta?' : 'Don\'t have an account?'}{' '}
              <button 
                onClick={() => setIsSignUp(true)}
                className="text-[#E2B254] font-bold underline cursor-pointer"
              >
                {language === 'ES' ? 'Regístrate aquí' : 'Sign up here'}
              </button>
            </p>
          )}
        </div>

      </motion.div>
    </div>
  );
}
