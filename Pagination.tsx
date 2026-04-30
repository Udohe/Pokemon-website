'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <PagBtn onClick={() => onPageChange(1)} disabled={page === 1} label="«" />
      <PagBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} label="‹" />

      {start > 1 && <span className="text-white/30 px-1">…</span>}

      {pages.map(p => (
        <motion.button
          key={p}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(p)}
          className="w-9 h-9 rounded-xl text-sm font-bold transition-all duration-200"
          style={{
            background: p === page ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)',
            color: p === page ? '#0f0f1e' : 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {p}
        </motion.button>
      ))}

      {end < totalPages && <span className="text-white/30 px-1">…</span>}

      <PagBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages} label="›" />
      <PagBtn onClick={() => onPageChange(totalPages)} disabled={page === totalPages} label="»" />
    </div>
  );
}

function PagBtn({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 rounded-xl text-sm font-bold transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.06)',
        color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </motion.button>
  );
}
