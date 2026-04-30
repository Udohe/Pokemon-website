'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md"
      >
        <div className="text-7xl mb-6">⚡</div>
        <h2
          className="text-3xl font-black text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Something went wrong
        </h2>
        <p className="text-white/50 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 rounded-2xl font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#E53935' }}
          >
            Try again
          </button>
          <a
            href="/"
            className="px-8 py-3 rounded-2xl font-bold text-white/70 transition-all hover:bg-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Go home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
