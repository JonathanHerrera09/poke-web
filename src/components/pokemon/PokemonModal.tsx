import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PokemonTableData } from "@/types/pokemon";
import {
  getPokemonTypeColor,
  getStatColor,
  getStatBarWidth,
  formatHeight,
  formatWeight,
} from "@/lib/pokemonUtils";

interface PokemonModalProps {
  pokemon: PokemonTableData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PokemonModal = ({
  pokemon,
  open,
  onOpenChange,
}: PokemonModalProps) => {
  if (!pokemon) return null;

  const stats = [
    { name: "HP", value: pokemon.hp, key: "hp" },
    { name: "Ataque", value: pokemon.attack, key: "attack" },
    { name: "Defensa", value: pokemon.defense, key: "defense" },
    {
      name: "Ataque Especial",
      value: pokemon.specialAttack,
      key: "specialAttack",
    },
    {
      name: "Defensa Especial",
      value: pokemon.specialDefense,
      key: "specialDefense",
    },
    { name: "Velocidad", value: pokemon.speed, key: "speed" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span>#{pokemon.id.toString().padStart(3, "0")}</span>
            <span>{pokemon.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pokemon Image and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                {pokemon.image ? (
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain mx-auto drop-shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              {/* Types */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Tipos
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {pokemon.types.map((type, index) => (
                    <Badge
                      key={index}
                      className={`${getPokemonTypeColor(type)} text-white px-3 py-1 text-sm border-0`}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Altura</div>
                  <div className="text-xl font-bold text-gray-800">
                    {formatHeight(pokemon.pokemon.height)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Peso</div>
                  <div className="text-xl font-bold text-gray-800">
                    {formatWeight(pokemon.pokemon.weight)}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-sm text-yellow-700">Experiencia Base</div>
                <div className="text-xl font-bold text-yellow-800">
                  {pokemon.experience}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Estadísticas Base
            </h3>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.key} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">
                    {stat.name}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          stat.value >= 80
                            ? "bg-green-500"
                            : stat.value >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${getStatBarWidth(stat.value)}%` }}
                      />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-md text-sm font-bold min-w-[3rem] text-center ${getStatColor(stat.value)}`}
                    >
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Sprites */}
          {pokemon.pokemon.sprites.other?.["official-artwork"]
            ?.front_default && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Artwork Oficial
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center">
                <img
                  src={
                    pokemon.pokemon.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt={`${pokemon.name} artwork oficial`}
                  className="w-64 h-64 object-contain mx-auto drop-shadow-xl"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
