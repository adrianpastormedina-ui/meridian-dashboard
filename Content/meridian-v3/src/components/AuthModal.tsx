/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AuthModal with REAL Firebase authentication
 * On success: redirects to student.html or admin.html based on Firestore role
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, X, Mail, Lock } from 'lucide-react';
import { Language } from '../types';
import { auth, db, googleProvider } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (role: 'student' | 'tutor') => void;
}

// Admin emails — same list as auth.js
const ADMIN_EMAILS = [
  'adrian.pastor.medina@gmail.com',
  'adrian.pastor.medina.hvtsp@gmail.com'
];

async function getRoleAndRedirect(uid: string, email: string) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    let role = 'student';
    if (docSnap.exists()) {
      role = docSnap.data().role || 'student';
    } else if (ADMIN_EMAILS.includes(email.toLowerCase())) {
      role = 'admin';
    }
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'student.html';
    }
  } catch {
    window.location.href = 'student.html';
  }
}

export default function AuthModal({ isOpen, onClose, language }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const t = {
    login: language === 'ES' ? 'Iniciar Sesión' : 'Sign In',
    signup: language === 'ES' ? 'Crear Cuenta' : 'Create Account',
    forgot: language === 'ES' ? 'Recuperar Contraseña' : 'Reset Password',
    emailLabel: language === 'ES' ? 'Correo Electrónico' : 'Email Address',
    passLabel: language === 'ES' ? 'Contraseña' : 'Password',
    nameLabel: language === 'ES' ? 'Nombre Completo' : 'Full Name',
    forgotLink: language === 'ES' ? '¿Olvidaste tu contraseña?' : 'Forgot password?',
    noAccount: language === 'ES' ? '¿No tienes cuenta? ' : "Don't have an account? ",
    hasAccount: language === 'ES' ? '¿Ya tienes cuenta? ' : 'Already have an account? ',
    registerHere: language === 'ES' ? 'Regístrate aquí' : 'Sign up here',
    loginHere: language === 'ES' ? 'Inicia Sesión' : 'Sign in here',
    backLogin: language === 'ES' ? 'Volver a Iniciar Sesión' : 'Back to Sign In',
    sendReset: language === 'ES' ? 'Enviar Enlace de Recuperación' : 'Send Reset Link',
    resetSent: language === 'ES' ? '¡Correo enviado! Revisa tu bandeja.' : 'Email sent! Check your inbox.',
    googleBtn: language === 'ES' ? 'Continuar con Google' : 'Continue with Google',
    orDivider: language === 'ES' ? 'o continúa con correo' : 'or continue with email',
    subtitleLogin: language === 'ES' ? 'Accede a tu plataforma de seguimiento' : 'Access your private tracking platform',
    subtitleSignup: language === 'ES' ? 'Únete a la plataforma académica' : 'Join our high performance academy',
    subtitleForgot: language === 'ES' ? 'Te enviaremos un enlace de recuperación' : 'We will send you a recovery link',
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await getRoleAndRedirect(cred.user.uid, cred.user.email || email);
    } catch {
      setError(language === 'ES' ? 'Correo o contraseña incorrectos' : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'student';
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name: fullName,
        email: email,
        role: role,
        createdAt: new Date().toISOString(),
        remainingHours: 0
      });
      await getRoleAndRedirect(cred.user.uid, email);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError(language === 'ES' ? 'El correo ya está registrado' : 'Email already registered');
      } else {
        setError(language === 'ES' ? 'La contraseña debe tener al menos 6 caracteres' : 'Password must be at least 6 characters');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await getRoleAndRedirect(cred.user.uid, cred.user.email || '');
    } catch {
      setError(language === 'ES' ? 'Error al iniciar con Google' : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(t.resetSent);
    } catch {
      setError(language === 'ES' ? 'Error al enviar correo' : 'Error sending email');
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'login' ? t.login : mode === 'signup' ? t.signup : t.forgot;
  const subtitle = mode === 'login' ? t.subtitleLogin : mode === 'signup' ? t.subtitleSignup : t.subtitleForgot;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="glass rounded-3xl p-6 sm:p-8 border border-white/10 max-w-md w-full relative z-10 shadow-2xl space-y-5"
        id="auth-modal"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-brand-crimson to-brand-gold rounded-2xl shadow-xl justify-center items-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl px-4 py-3 text-center">
            {successMsg}
          </div>
        )}

        {/* Google Button (login & signup only) */}
        {mode !== 'forgot' && (
          <>
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t.googleBtn}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-500 font-mono">{t.orDivider}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </>
        )}

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleEmailLogin} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400">{t.emailLabel}</label>
              <div className="relative">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none" />
                <Mail className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-mono font-bold text-slate-400">{t.passLabel}</label>
                <button type="button" onClick={() => setMode('forgot')} className="text-xs text-brand-gold hover:underline">{t.forgotLink}</button>
              </div>
              <div className="relative">
                <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none" />
                <Lock className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              {loading ? '...' : t.login}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-slate-400">{t.noAccount}
              <button type="button" onClick={() => setMode('signup')} className="text-brand-gold font-bold underline cursor-pointer">{t.registerHere}</button>
            </p>
          </form>
        )}

        {/* Sign Up Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400">{t.nameLabel}</label>
              <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Ex: Adrian Pastor"
                className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-gold/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400">{t.emailLabel}</label>
              <div className="relative">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none" />
                <Mail className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400">{t.passLabel}</label>
              <div className="relative">
                <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none" />
                <Lock className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              {loading ? '...' : t.signup}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-slate-400">{t.hasAccount}
              <button type="button" onClick={() => setMode('login')} className="text-brand-gold font-bold underline cursor-pointer">{t.loginHere}</button>
            </p>
          </form>
        )}

        {/* Forgot Password Form */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400">{t.emailLabel}</label>
              <div className="relative">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-gold/50 rounded-xl pl-4 pr-10 py-3 text-slate-100 placeholder-slate-500 focus:outline-none" />
                <Mail className="h-4 w-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              {loading ? '...' : t.sendReset}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-slate-400">
              <button type="button" onClick={() => setMode('login')} className="text-brand-gold font-bold underline cursor-pointer">← {t.backLogin}</button>
            </p>
          </form>
        )}

      </motion.div>
    </div>
  );
}
