import { Pokemon, PokemonTableData, SortConfig } from "@/types/pokemon";

export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};

export const getPokemonTypes = (pokemon: Pokemon): string[] => {
  return pokemon.types.map((type) => formatPokemonName(type.type.name));
};

export const getStatValue = (pokemon: Pokemon, statName: string): number => {
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
};

export const transformPokemonToTableData = (
  pokemon: Pokemon,
): PokemonTableData => {
  return {
    id: pokemon.id,
    name: formatPokemonName(pokemon.name),
    image: pokemon.sprites.front_default || "",
    types: getPokemonTypes(pokemon),
    weight: pokemon.weight / 10, // Convert to kg
    height: pokemon.height / 10, // Convert to m
    hp: getStatValue(pokemon, "hp"),
    experience: pokemon.base_experience,
    attack: getStatValue(pokemon, "attack"),
    defense: getStatValue(pokemon, "defense"),
    specialAttack: getStatValue(pokemon, "special-attack"),
    specialDefense: getStatValue(pokemon, "special-defense"),
    speed: getStatValue(pokemon, "speed"),
    pokemon,
  };
};

export const sortPokemonData = (
  data: PokemonTableData[],
  sortConfig: SortConfig,
): PokemonTableData[] => {
  return [...data].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    // Handle array values (types)
    if (Array.isArray(aVal) && Array.isArray(bVal)) {
      const aStr = aVal.join(", ");
      const bStr = bVal.join(", ");
      return sortConfig.direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    }

    // Handle string values
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // Handle numeric values
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
};

export const filterPokemonData = (
  data: PokemonTableData[],
  searchTerm: string,
): PokemonTableData[] => {
  if (!searchTerm.trim()) return data;

  const term = searchTerm.toLowerCase();
  return data.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(term) ||
      pokemon.types.some((type) => type.toLowerCase().includes(term)) ||
      pokemon.id.toString().includes(term),
  );
};

export const paginateData = <T>(
  data: T[],
  page: number,
  pageSize: number,
): T[] => {
  const startIndex = page * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
};

export const getStatColor = (value: number, max: number = 255): string => {
  const percentage = (value / max) * 100;

  if (percentage >= 70) return "text-green-600 bg-green-50";
  if (percentage >= 50) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

export const getStatBarWidth = (value: number, max: number = 255): number => {
  return Math.min((value / max) * 100, 100);
};

export const getPokemonTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  return typeColors[type.toLowerCase()] || "bg-gray-400";
};
