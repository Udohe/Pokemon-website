import { useState, useEffect } from 'react';
import { fetchTypes, fetchTypeDetail } from '@/lib/pokemon';
import { Pokemon } from '@/types/pokemon';
import { fetchPokemon, getPokemonId } from '@/lib/pokemon';

export function useTypes() {
  const [types, setTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTypes()
      .then(data => {
        const filtered = data.results
          .filter(t => !['unknown', 'shadow'].includes(t.name))
          .map(t => t.name);
        setTypes(filtered);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { types, isLoading };
}

export function usePokemonByType(type: string | null) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) { setPokemon([]); return; }
    setIsLoading(true);
    setError(null);
    fetchTypeDetail(type)
      .then(async data => {
        const slice = data.pokemon.slice(0, 20);
        const details = await Promise.all(
          slice.map(p => fetchPokemon(getPokemonId(p.pokemon.url)))
        );
        setPokemon(details);
      })
      .catch(e => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [type]);

  return { pokemon, isLoading, error };
}
