import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { PokemonTableData, SortConfig } from "@/types/pokemon";
import { getPokemonTypeColor, getStatColor } from "@/lib/pokemonUtils";

interface PokemonTableProps {
  data: PokemonTableData[];
  sortConfig: SortConfig;
  onSort: (key: keyof PokemonTableData) => void;
  onViewDetails: (pokemon: PokemonTableData) => void;
}

const columnHelper = createColumnHelper<PokemonTableData>();

export const PokemonTable = ({
  data,
  sortConfig,
  onSort,
  onViewDetails,
}: PokemonTableProps) => {
  const getSortIcon = (columnKey: keyof PokemonTableData) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const SortableHeader = ({
    children,
    columnKey,
  }: {
    children: React.ReactNode;
    columnKey: keyof PokemonTableData;
  }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold text-left justify-start"
      onClick={() => onSort(columnKey)}
    >
      {children}
      {getSortIcon(columnKey)}
    </Button>
  );

  const StatCell = ({ value }: { value: number }) => (
    <div className="flex items-center gap-2">
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${getStatColor(value)}`}
      >
        {value}
      </span>
    </div>
  );

  const columns = [
    columnHelper.accessor("image", {
      header: "Imagen",
      cell: ({ getValue, row }) => (
        <div className="flex justify-center">
          {getValue() ? (
            <img
              src={getValue()}
              alt={row.original.name}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">N/A</span>
            </div>
          )}
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor("name", {
      header: () => <SortableHeader columnKey="name">Nombre</SortableHeader>,
      cell: ({ getValue, row }) => (
        <div className="font-medium">
          <div className="font-semibold">{getValue()}</div>
          <div className="text-xs text-gray-500">
            #{row.original.id.toString().padStart(3, "0")}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("types", {
      header: () => <SortableHeader columnKey="types">Tipo</SortableHeader>,
      cell: ({ getValue }) => (
        <div className="flex gap-1 flex-wrap">
          {getValue().map((type, index) => (
            <Badge
              key={index}
              className={`${getPokemonTypeColor(type)} text-white text-xs border-0`}
            >
              {type}
            </Badge>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("weight", {
      header: () => (
        <SortableHeader columnKey="weight">Peso (kg)</SortableHeader>
      ),
      cell: ({ getValue }) => <span>{getValue().toFixed(1)}</span>,
    }),
    columnHelper.accessor("height", {
      header: () => (
        <SortableHeader columnKey="height">Altura (m)</SortableHeader>
      ),
      cell: ({ getValue }) => <span>{getValue().toFixed(1)}</span>,
    }),
    columnHelper.accessor("hp", {
      header: () => <SortableHeader columnKey="hp">Salud Base</SortableHeader>,
      cell: ({ getValue }) => <StatCell value={getValue()} />,
    }),
    columnHelper.accessor("experience", {
      header: () => (
        <SortableHeader columnKey="experience">Exp. Base</SortableHeader>
      ),
      cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
    }),
    columnHelper.accessor("attack", {
      header: () => <SortableHeader columnKey="attack">Ataque</SortableHeader>,
      cell: ({ getValue }) => <StatCell value={getValue()} />,
    }),
    columnHelper.accessor("defense", {
      header: () => (
        <SortableHeader columnKey="defense">Defensa</SortableHeader>
      ),
      cell: ({ getValue }) => <StatCell value={getValue()} />,
    }),
    columnHelper.accessor("specialAttack", {
      header: () => (
        <SortableHeader columnKey="specialAttack">At. Especial</SortableHeader>
      ),
      cell: ({ getValue }) => <StatCell value={getValue()} />,
    }),
    columnHelper.accessor("specialDefense", {
      header: () => (
        <SortableHeader columnKey="specialDefense">
          Def. Especial
        </SortableHeader>
      ),
      cell: ({ getValue }) => <StatCell value={getValue()} />,
    }),
    columnHelper.accessor("speed", {
      header: () => (
        <SortableHeader columnKey="speed">Velocidad</SortableHeader>
      ),
      cell: ({ getValue }) => <StatCell value={getValue()} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onViewDetails(row.original)}
          className="h-8 px-3"
        >
          <Eye className="h-4 w-4 mr-1" />
          Ver detalles
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  });

  if (data.length === 0) {
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
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left p-4 font-semibold text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-25"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
