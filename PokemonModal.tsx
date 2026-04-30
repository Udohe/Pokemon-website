'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import {
  formatPokemonName, formatStatName, getTypeColor,
  getPrimaryTypeColor
} from '@/lib/pokemon';
import { useFavorites } from '@/lib/favorites';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

function StatBar({ name, value }: { name: string; value: number }) {
  const pct = Math.min(100, (value / 255) * 100);
  const color = value >= 100 ? '#78C850' : value >= 60 ? '#F8D030' : '#F08030';

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/50 text-xs font-mono w-16 text-right shrink-0">
        {formatStatName(name)}
      </span>
      <span className="text-white font-bold text-sm w-8 text-right shrink-0">{value}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
        />
      </div>
    </div>
  );
}

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = pokemon ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [pokemon, onClose]);

  const fav = pokemon ? isFavorite(pokemon.id) : false;
  const primaryColor = pokemon ? getPrimaryTypeColor(pokemon.types) : '#888';
  const imageUrl = pokemon
    ? (pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '')
    : '';

  return (
    <AnimatePresence>
      {pokemon && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl relative"
              style={{
                background: 'linear-gradient(170deg, #1a1a3e 0%, #0f0f1e 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 24px 80px rgba(0,0,0,0.8), 0 0 60px ${primaryColor}30`,
              }}
            >
              {/* Header gradient */}
              <div
                className="absolute top-0 left-0 right-0 h-48 rounded-t-3xl opacity-30"
                style={{ background: `radial-gradient(circle at 50% 0%, ${primaryColor}, transparent 70%)` }}
              />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              {/* Favorite */}
              <button
                onClick={() => toggleFavorite(pokemon.id)}
                className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                style={{ background: fav ? 'rgba(229,57,53,0.2)' : 'rgba(255,255,255,0.1)' }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fav ? '#E53935' : 'none'} stroke={fav ? '#E53935' : 'white'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              {/* Image */}
              <div className="flex justify-center pt-10 relative">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-48 h-48"
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={pokemon.name}
                      fill
                      className="object-contain"
                      style={{ filter: `drop-shadow(0 12px 24px ${primaryColor}80)` }}
                      unoptimized
                    />
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 relative z-10">
                <p className="text-center text-white/40 font-mono text-sm mb-1">
                  #{String(pokemon.id).padStart(3, '0')}
                </p>
                <h2 className="text-center text-white text-2xl font-black mb-3">
                  {formatPokemonName(pokemon.name)}
                </h2>

                {/* Types */}
                <div className="flex gap-2 justify-center mb-5">
                  {pokemon.types.map(({ type }) => {
                    const color = getTypeColor(type.name);
                    return (
                      <span key={type.name} className="px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider"
                        style={{ background: color.bg, color: color.text }}>
                        {type.name}
                      </span>
                    );
                  })}
                </div>

                {/* Physical stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'Height', value: `${(pokemon.height / 10).toFixed(1)}m` },
                    { label: 'Weight', value: `${(pokemon.weight / 10).toFixed(1)}kg` },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-2xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <p className="text-white/40 text-xs mb-1">{label}</p>
                      <p className="text-white font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Abilities */}
                <div className="mb-5">
                  <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Abilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map(({ ability, is_hidden }) => (
                      <span key={ability.name}
                        className="px-3 py-1 rounded-xl text-sm"
                        style={{ background: 'rgba(255,255,255,0.08)', color: is_hidden ? primaryColor : 'rgba(255,255,255,0.8)' }}>
                        {formatPokemonName(ability.name)}
                        {is_hidden && <span className="ml-1 text-xs opacity-60">(hidden)</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base stats */}
                <div>
                  <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Base Stats</h3>
                  <div className="space-y-2">
                    {pokemon.stats.map(({ stat, base_stat }) => (
                      <StatBar key={stat.name} name={stat.name} value={base_stat} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
