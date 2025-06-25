import { Pokemon, PokemonListResponse, PokemonListItem } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonApiService {
  private cache = new Map<string, any>();

  async getPokemonList(limit: number = 151): Promise<PokemonListItem[]> {
    const cacheKey = `pokemon-list-${limit}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
      }

      const data: PokemonListResponse = await response.json();
      this.cache.set(cacheKey, data.results);
      return data.results;
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      throw error;
    }
  }

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const cacheKey = `pokemon-${nameOrId}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Pokemon ${nameOrId}: ${response.statusText}`,
        );
      }

      const pokemon: Pokemon = await response.json();
      this.cache.set(cacheKey, pokemon);
      return pokemon;
    } catch (error) {
      console.error(`Error fetching Pokemon ${nameOrId}:`, error);
      throw error;
    }
  }

  async getBatchPokemon(pokemonList: PokemonListItem[]): Promise<Pokemon[]> {
    const promises = pokemonList.map(async (item) => {
      try {
        return await this.getPokemon(item.name);
      } catch (error) {
        console.error(`Failed to fetch ${item.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  }

  // Helper method to extract ID from URL
  extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\//);
    return matches ? parseInt(matches[1], 10) : 0;
  }
}

export const pokemonApi = new PokemonApiService();
