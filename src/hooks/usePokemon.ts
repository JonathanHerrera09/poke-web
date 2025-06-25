import { useState, useEffect, useMemo } from "react";
import {
  Pokemon,
  PokemonTableData,
  PokemonListItem,
  ViewMode,
  SortConfig,
} from "@/types/pokemon";
import { pokemonApi } from "@/services/pokemonApi";
import {
  transformPokemonToTableData,
  sortPokemonData,
  filterPokemonData,
  paginateData,
} from "@/lib/pokemonUtils";

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Load initial Pokemon list
  useEffect(() => {
    const loadPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await pokemonApi.getPokemonList(151);
        setPokemonList(list);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar la lista de Pokémon",
        );
      }
    };

    loadPokemonList();
  }, []);

  // Load Pokemon details in batches
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const loadPokemonDetails = async () => {
      try {
        setError(null);
        const batchSize = 20;
        const allPokemon: Pokemon[] = [];

        for (let i = 0; i < pokemonList.length; i += batchSize) {
          const batch = pokemonList.slice(i, i + batchSize);
          const batchPokemon = await pokemonApi.getBatchPokemon(batch);
          allPokemon.push(...batchPokemon);

          // Update progress
          const progress = Math.round(
            ((i + batchSize) / pokemonList.length) * 100,
          );
          setLoadingProgress(Math.min(progress, 100));

          // Update data progressively
          setPokemonData([...allPokemon]);
        }

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar los detalles de Pokémon",
        );
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [pokemonList]);

  // Transform and process data
  const processedData = useMemo(() => {
    const tableData = pokemonData.map(transformPokemonToTableData);
    let filtered = filterPokemonData(tableData, searchTerm);

    // Filter by selected types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type)),
      );
    }

    const sorted = sortPokemonData(filtered, sortConfig);
    return sorted;
  }, [pokemonData, searchTerm, selectedTypes, sortConfig]);

  // Paginated data
  const paginatedData = useMemo(() => {
    return paginateData(processedData, currentPage, pageSize);
  }, [processedData, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, selectedTypes, sortConfig, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const handleSort = (key: keyof PokemonTableData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTypesChange = (types: string[]) => {
    setSelectedTypes(types);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return {
    // Data
    pokemonData: paginatedData,
    allPokemonData: processedData,

    // State
    loading,
    error,
    loadingProgress,

    // UI State
    viewMode,
    searchTerm,
    selectedTypes,
    sortConfig,
    currentPage,
    pageSize,
    totalPages,
    totalItems: processedData.length,

    // Actions
    handleSort,
    handleSearch,
    handleTypesChange,
    handlePageChange,
    handlePageSizeChange,
    handleViewModeChange,
  };
};

export const usePokemonDetails = (pokemonId?: number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonId) {
      setPokemon(null);
      return;
    }

    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pokemonApi.getPokemon(pokemonId);
        setPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el Pokémon",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [pokemonId]);

  return { pokemon, loading, error };
};
