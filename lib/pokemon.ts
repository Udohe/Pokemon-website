export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
    dream_world: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface TypeListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface TypeDetail {
  id: number;
  name: string;
  pokemon: {
    pokemon: PokemonListItem;
    slot: number;
  }[];
}

export type TypeColorMap = Record<string, { bg: string; text: string; border: string }>;
