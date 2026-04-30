'use client';

import { motion } from 'framer-motion';
import { getTypeColor } from '@/lib/pokemon';

interface TypeFilterProps {
  types: string[];
  selected: string | null;
  onSelect: (type: string | null) => void;
}

export function TypeFilter({ types, selected, onSelect }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200"
        style={{
          background: !selected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)',
          color: !selected ? '#0f0f1e' : 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        All
      </motion.button>
      {types.map(type => {
        const color = getTypeColor(type);
        const isSelected = selected === type;
        return (
          <motion.button
            key={type}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(isSelected ? null : type)}
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200"
            style={{
              background: isSelected ? color.bg : 'rgba(255,255,255,0.08)',
              color: isSelected ? color.text : 'rgba(255,255,255,0.6)',
              border: `1px solid ${isSelected ? color.bg : 'rgba(255,255,255,0.15)'}`,
              boxShadow: isSelected ? `0 0 12px ${color.bg}60` : 'none',
            }}
          >
            {type}
          </motion.button>
        );
      })}
    </div>
  );
}
