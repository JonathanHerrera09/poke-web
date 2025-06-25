import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { usePokemon } from "@/hooks/usePokemon";
import { PokemonTableData } from "@/types/pokemon";
import { ViewToggle } from "@/components/pokemon/ViewToggle";
import { TypeFilter } from "@/components/pokemon/TypeFilter";
import { PokemonTable } from "@/components/pokemon/PokemonTable";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";
import { PokemonModal } from "@/components/pokemon/PokemonModal";

const Index = () => {
  const {
    pokemonData,
    loading,
    error,
    loadingProgress,
    viewMode,
    searchTerm,
    selectedTypes,
    sortConfig,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    handleSort,
    handleSearch,
    handleTypesChange,
    handlePageChange,
    handlePageSizeChange,
    handleViewModeChange,
  } = usePokemon();

  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonTableData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePokemonClick = (pokemon: PokemonTableData) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">
              Error al cargar Pokémon
            </h2>
            <p className="text-red-600">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Poke Web
              </h1>
              <p className="text-gray-600 mt-1">
                realizado por Jonathan Herrera
              </p>
            </div>

            <div className="flex items-center gap-4">
              {!loading && (
                <>
                  <Badge variant="secondary" className="text-sm">
                    {totalItems} Pokémon encontrados
                  </Badge>
                  <ViewToggle
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          // Loading State
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent pokeball-spin"></div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Cargando Pokémon...
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Obteniendo datos de la PokéAPI
                  </p>
                </div>

                <div className="space-y-3">
                  <Progress value={loadingProgress} className="w-full" />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Progreso</span>
                    <span>{loadingProgress}%</span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-500">
                  {loadingProgress < 50
                    ? "Obteniendo lista de Pokémon..."
                    : "Cargando detalles de cada Pokémon..."}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Main Content
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar por nombre, tipo o número..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Select
                        value={pageSize.toString()}
                        onValueChange={(value) =>
                          handlePageSizeChange(parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 por página</SelectItem>
                          <SelectItem value="25">25 por página</SelectItem>
                          <SelectItem value="50">50 por página</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="flex flex-wrap items-center gap-4">
                    <TypeFilter
                      selectedTypes={selectedTypes}
                      onTypesChange={handleTypesChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Display */}
            {viewMode === "table" ? (
              <PokemonTable
                data={pokemonData}
                sortConfig={sortConfig}
                onSort={handleSort}
                onViewDetails={handlePokemonClick}
              />
            ) : (
              <PokemonGrid
                pokemon={pokemonData}
                onPokemonClick={handlePokemonClick}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Página {currentPage + 1} de {totalPages}
                      <span className="ml-2">({totalItems} Pokémon total)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>

                      <div className="flex gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const pageNumber =
                              currentPage < 3 ? i : currentPage - 2 + i;
                            if (pageNumber >= totalPages) return null;

                            return (
                              <Button
                                key={pageNumber}
                                variant={
                                  pageNumber === currentPage
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNumber)}
                                className="w-10"
                              >
                                {pageNumber + 1}
                              </Button>
                            );
                          },
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                      >
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Pokemon Detail Modal */}
      <PokemonModal
        pokemon={selectedPokemon}
        open={modalOpen}
        onOpenChange={handleCloseModal}
      />
    </div>
  );
};

export default Index;
