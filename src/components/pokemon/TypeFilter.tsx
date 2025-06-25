import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Filter, X } from "lucide-react";
import { getPokemonTypeColor } from "@/lib/pokemonUtils";

const POKEMON_TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

interface TypeFilterProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

export const TypeFilter = ({
  selectedTypes,
  onTypesChange,
}: TypeFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  const handleClearAll = () => {
    onTypesChange([]);
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="h-4 w-4" />
            Filtrar por tipo
            {selectedTypes.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {selectedTypes.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-between p-2 border-b">
            <span className="text-sm font-medium">Tipos de Pokémon</span>
            {selectedTypes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-6 px-2 text-xs"
              >
                Limpiar
              </Button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {POKEMON_TYPES.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-3 h-3 rounded-full ${getPokemonTypeColor(type)}`}
                />
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected types display */}
      {selectedTypes.length > 0 && (
        <div className="flex gap-1 flex-wrap max-w-sm">
          {selectedTypes.map((type) => (
            <Badge
              key={type}
              className={`${getPokemonTypeColor(type)} text-white text-xs border-0 pr-1`}
            >
              {type}
              <button
                onClick={() => handleTypeToggle(type)}
                className="ml-1 hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
