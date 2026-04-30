'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'pokedex_favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));

      return next;
    });
  };

  const isFavorite = (id: number) => {
    return favorites.has(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
}
