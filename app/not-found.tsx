'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 100%)' }}
    >
      {/* Animated Pokeball */}
      <motion.div
        animate={{ rotate: [0, -15, 15, -10, 10, 0], y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="w-32 h-32 mb-8"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
          <circle cx="50" cy="50" r="48" fill="#E53935" stroke="#0f0f1e" strokeWidth="3" />
          <path
            d="M2 50 Q2 22 22 10 Q38 2 50 2 L50 98 Q22 98 6 80 Q2 70 2 50Z"
            fill="#B71C1C"
          />
          <rect x="2" y="46" width="96" height="8" fill="#0f0f1e" />
          <circle cx="50" cy="50" r="14" fill="#0f0f1e" stroke="#0f0f1e" strokeWidth="2" />
          <circle cx="50" cy="50" r="9" fill="white" />
          <circle cx="50" cy="50" r="5" fill="#E0E0E0" />
          {/* X eyes on the ball */}
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/30 font-mono text-sm mb-2 tracking-widest">ERROR 404</p>
        <h1
          className="text-5xl font-black text-white mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Page not found
        </h1>
        <p className="text-white/50 text-lg mb-10 max-w-sm">
          This Pokémon fled into tall grass. The page you're looking for doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 rounded-2xl font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: '#E53935' }}
          >
            Return to Pokédex
          </Link>
          <Link
            href="/favorites"
            className="px-8 py-3 rounded-2xl font-bold transition-all duration-200 hover:bg-white/10"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            My Favorites
          </Link>
        </div>
      </motion.div>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #E53935, transparent)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, #4A90D9, transparent)',
            filter: 'blur(60px)',
          }}
        />
      </div>
    </div>
  );
}
