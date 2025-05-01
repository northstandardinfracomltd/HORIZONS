
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function DefibrillatorFilters({ 
  clients, 
  onClientChange, 
  showMaintenanceRequired, 
  onMaintenanceRequiredChange,
  searchQuery,
  onSearchChange
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="search" className="mb-2 block">Rechercher (N° Série ou MiniCode)</Label>
        <Input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher..."
          className="w-full"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="clientFilter" className="mb-2 block">Filtrer par client</Label>
        <select
          id="clientFilter"
          className="w-full rounded-md border p-2"
          onChange={(e) => onClientChange(e.target.value)}
        >
          <option value="">Tous les clients</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="maintenanceRequired"
          className="h-4 w-4"
          checked={showMaintenanceRequired}
          onChange={(e) => onMaintenanceRequiredChange(e.target.checked)}
        />
        <Label htmlFor="maintenanceRequired">
          Maintenances à réaliser
        </Label>
      </div>
    </div>
  );
}

export default DefibrillatorFilters;
