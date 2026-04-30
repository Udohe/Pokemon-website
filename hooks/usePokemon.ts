import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '@/types/pokemon';
import { fetchPokemonList, fetchPokemon, getPokemonId } from '@/lib/pokemon';
import { useDebounce } from '@/hooks/useDebounce';

const PAGE_SIZE = 20;

export function usePokemonList(page: number) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const list = await fetchPokemonList(PAGE_SIZE, offset);
      setTotal(list.count);
      const details = await Promise.all(
        list.results.map(p => fetchPokemon(getPokemonId(p.url)))
      );
      setPokemon(details);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load Pokémon');
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  return { pokemon, total, isLoading, error, retry: load, pageSize: PAGE_SIZE };
}

export function usePokemonDetail(nameOrId: string | number | null) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameOrId) { setPokemon(null); return; }
    setIsLoading(true);
    setError(null);
    fetchPokemon(nameOrId)
      .then(p => { setPokemon(p); setIsLoading(false); })
      .catch(e => { setError(e.message); setIsLoading(false); });
  }, [nameOrId]);

  return { pokemon, isLoading, error };
}

export function usePokemonSearch(query: string) {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) { setResults([]); setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        // Try exact name/id first
        const pokemon = await fetchPokemon(q);
        setResults([pokemon]);
      } catch {
        // Fall back to partial name match across first 300
        try {
          const list = await fetchPokemonList(300, 0);
          const matches = list.results
            .filter(p => p.name.includes(q))
            .slice(0, 20);
          const details = await Promise.all(
            matches.map(p => fetchPokemon(getPokemonId(p.url)))
          );
          setResults(details);
        } catch {
          setError('Search failed. Try a different name.');
          setResults([]);
        }
      }
      setIsLoading(false);
    })();
  }, [debouncedQuery]);

  return { results, isLoading, error };
}
