'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

function Input({ label, type, value, onChange, placeholder, required }: InputProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label className="block text-white/60 text-sm mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 outline-none transition-all duration-200 pr-10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onFocus={e => {
            (e.target as HTMLInputElement).style.border = '1px solid rgba(255,255,255,0.3)';
          }}
          onBlur={e => {
            (e.target as HTMLInputElement).style.border = '1px solid rgba(255,255,255,0.1)';
          }}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              {show
                ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
              }
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function LoginForm() {
  const { login, loginWithGoogle, loginWithGithub, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    if (!error) router.push('/');
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (provider === 'google') await loginWithGoogle();
    else await loginWithGithub();
    router.push('/');
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Pokédex account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="trainer@pokemon.com" required />
        <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="px-4 py-3 rounded-xl text-red-400 text-sm"
            style={{ background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.3)' }}>
            {error}
            <button onClick={clearError} className="ml-2 text-red-400/60 hover:text-red-400">✕</button>
          </motion.div>
        )}

        <button type="submit" disabled={isLoading}
          className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 mt-2"
          style={{ background: isLoading ? 'rgba(229,57,53,0.5)' : '#E53935' }}>
          {isLoading ? 'Signing in…' : 'Sign In'}
        </button>

        <OAuthDivider />
        <OAuthButtons onGoogle={() => handleOAuth('google')} onGithub={() => handleOAuth('github')} loading={isLoading} />

        <p className="text-center text-white/40 text-sm pt-2">
          No account?{' '}
          <Link href="/auth/signup" className="text-red-400 hover:text-red-300 transition-colors">
            Sign up free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export function SignupForm() {
  const { signup, loginWithGoogle, loginWithGithub, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup({ username, email, password, confirmPassword: confirm });
    if (!error) router.push('/');
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (provider === 'google') await loginWithGoogle();
    else await loginWithGithub();
    router.push('/');
  };

  return (
    <AuthLayout title="Join the Pokédex" subtitle="Create your trainer account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Username" type="text" value={username} onChange={setUsername} placeholder="AshKetchum" required />
        <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="trainer@pokemon.com" required />
        <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
        <Input label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="••••••••" required />

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="px-4 py-3 rounded-xl text-red-400 text-sm"
            style={{ background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.3)' }}>
            {error}
            <button onClick={clearError} className="ml-2 text-red-400/60 hover:text-red-400">✕</button>
          </motion.div>
        )}

        <button type="submit" disabled={isLoading}
          className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 mt-2"
          style={{ background: isLoading ? 'rgba(229,57,53,0.5)' : '#E53935' }}>
          {isLoading ? 'Creating account…' : 'Create Account'}
        </button>

        <OAuthDivider />
        <OAuthButtons onGoogle={() => handleOAuth('google')} onGithub={() => handleOAuth('github')} loading={isLoading} />

        <p className="text-center text-white/40 text-sm pt-2">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-red-400 hover:text-red-300 transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function OAuthDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-white/30 text-xs">or continue with</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function OAuthButtons({ onGoogle, onGithub, loading }: { onGoogle: () => void; onGithub: () => void; loading: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button type="button" onClick={onGoogle} disabled={loading}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white/80 transition-all hover:bg-white/15"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </button>
      <button type="button" onClick={onGithub} disabled={loading}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white/80 transition-all hover:bg-white/15"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </button>
    </div>
  );
}

function AuthLayout({ title, subtitle, children }: {
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 50%, #0f0f1e 100%)' }}>
      {/* Bg effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E53935, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4A90D9, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="#E53935" stroke="#0f0f1e" strokeWidth="4"/>
                <path d="M2 50 Q2 22 22 10 Q38 2 50 2 L50 98 Q22 98 6 80 Q2 70 2 50Z" fill="#B71C1C"/>
                <rect x="2" y="46" width="96" height="8" fill="#0f0f1e"/>
                <circle cx="50" cy="50" r="14" fill="#0f0f1e"/>
                <circle cx="50" cy="50" r="9" fill="white"/>
                <circle cx="50" cy="50" r="5" fill="#E0E0E0"/>
              </svg>
            </div>
            <span className="text-white font-black text-xl">Pokédex Lite</span>
          </Link>
        </div>

        <div className="rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}>
          <h1 className="text-white text-2xl font-black mb-1">{title}</h1>
          <p className="text-white/40 text-sm mb-6">{subtitle}</p>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
