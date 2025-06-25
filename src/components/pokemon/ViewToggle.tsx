import { Button } from "@/components/ui/button";
import { Grid3X3, Table } from "lucide-react";
import { ViewMode } from "@/types/pokemon";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ViewToggle = ({ viewMode, onViewModeChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 bg-white rounded-lg border p-1">
      <Button
        variant={viewMode === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("table")}
        className="h-8 px-3"
      >
        <Table className="h-4 w-4 mr-2" />
        Tabla
      </Button>
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="h-8 px-3"
      >
        <Grid3X3 className="h-4 w-4 mr-2" />
        Cuadrícula
      </Button>
    </div>
  );
};
