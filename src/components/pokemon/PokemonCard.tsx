import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PokemonTableData } from "@/types/pokemon";
import { getPokemonTypeColor } from "@/lib/pokemonUtils";

interface PokemonCardProps {
  pokemon: PokemonTableData;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-0 shadow-md overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0 relative">
        {/* Pokemon ID Badge */}
        <div className="absolute top-2 left-2 z-10">
          <Badge
            variant="secondary"
            className="bg-white/90 text-gray-700 font-mono text-xs"
          >
            #{pokemon.id.toString().padStart(3, "0")}
          </Badge>
        </div>

        {/* Pokemon Image */}
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center min-h-[200px]">
          {pokemon.image ? (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-sm">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Pokemon Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-center text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
            {pokemon.name}
          </h3>

          {/* Types */}
          <div className="flex gap-1 justify-center flex-wrap">
            {pokemon.types.map((type, index) => (
              <Badge
                key={index}
                className={`${getPokemonTypeColor(type)} text-white text-xs px-2 py-1 border-0`}
              >
                {type}
              </Badge>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Altura:</span>
              <span className="font-medium">{pokemon.height.toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span>Peso:</span>
              <span className="font-medium">{pokemon.weight.toFixed(1)}kg</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
