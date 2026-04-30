'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import { formatPokemonName, getTypeColor, getPrimaryTypeColor } from '@/lib/pokemon';
import { useFavorites } from '@/lib/favorites';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
  index?: number;
}

export function PokemonCard({ pokemon, onClick, index = 0 }: PokemonCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(pokemon.id);
  const primaryColor = getPrimaryTypeColor(pokemon.types);
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(pokemon)}
      className="relative cursor-pointer rounded-3xl overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #16213E 0%, #0F3460 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 0 ${primaryColor}`,
        transition: 'box-shadow 0.3s ease',
      }}
      onHoverStart={() => {}}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl"
        style={{ background: `radial-gradient(circle at 50% 40%, ${primaryColor}, transparent 70%)` }}
      />

      {/* Pokeball watermark */}
      <div className="absolute -right-6 -top-6 w-28 h-28 opacity-5">
        <svg viewBox="0 0 100 100" fill="white">
          <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="4" fill="none"/>
          <path d="M2 50 Q2 22 22 10 Q38 2 50 2" stroke="white" strokeWidth="4" fill="none"/>
          <line x1="2" y1="50" x2="98" y2="50" stroke="white" strokeWidth="4"/>
          <circle cx="50" cy="50" r="12" fill="white"/>
          <circle cx="50" cy="50" r="6" fill="none" stroke="#16213E" strokeWidth="3"/>
        </svg>
      </div>

      {/* Favorite button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(pokemon.id); }}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: fav ? 'rgba(229,57,53,0.2)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fav ? '#E53935' : 'none'} stroke={fav ? '#E53935' : 'rgba(255,255,255,0.6)'} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      {/* ID */}
      <div className="absolute top-3 left-3 text-xs font-mono text-white/30 font-bold">
        #{String(pokemon.id).padStart(3, '0')}
      </div>

      {/* Image */}
      <div className="flex justify-center pt-8 pb-2 relative h-40">
        {imageUrl ? (
          <motion.div
            className="relative w-32 h-32"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-2xl"
              style={{ filter: `drop-shadow(0 8px 16px ${primaryColor}60)` }}
              unoptimized
            />
          </motion.div>
        ) : (
          <div className="w-32 h-32 flex items-center justify-center text-white/20 text-4xl">?</div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pb-4">
        <h3 className="text-white font-bold text-sm text-center mb-2 truncate">
          {formatPokemonName(pokemon.name)}
        </h3>

        {/* Types */}
        <div className="flex gap-1 justify-center flex-wrap">
          {pokemon.types.map(({ type }) => {
            const color = getTypeColor(type.name);
            return (
              <span
                key={type.name}
                className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
                style={{ background: color.bg, color: color.text }}
              >
                {type.name}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function PokemonCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden animate-pulse"
      style={{ background: 'linear-gradient(135deg, #16213E 0%, #0F3460 100%)', border: '1px solid rgba(255,255,255,0.08)', minHeight: 220 }}>
      <div className="flex justify-center pt-8 pb-2">
        <div className="w-32 h-32 rounded-full bg-white/5" />
      </div>
      <div className="px-4 pb-4 space-y-2">
        <div className="h-4 bg-white/5 rounded-full mx-4" />
        <div className="flex gap-1 justify-center">
          <div className="h-5 w-12 bg-white/5 rounded-full" />
          <div className="h-5 w-12 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
