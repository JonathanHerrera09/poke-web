import { PokemonTableData } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  pokemon: PokemonTableData[];
  onPokemonClick: (pokemon: PokemonTableData) => void;
}

export const PokemonGrid = ({ pokemon, onPokemonClick }: PokemonGridProps) => {
  if (pokemon.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">
            No se encontraron Pokémon
          </div>
          <div className="text-gray-500 text-sm">
            Intenta ajustar los filtros de búsqueda
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => onPokemonClick(pokemon)}
        />
      ))}
    </div>
  );
};
