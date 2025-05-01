
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function MaintenanceForm({ onSubmit, techniciens }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technicien">Technicien</Label>
          <select name="technicien" id="technicien" className="w-full rounded-md border p-2" required>
            {techniciens.map(tech => (
              <option key={tech.id} value={tech.id}>{tech.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" name="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            name="notes"
            className="w-full rounded-md border p-2 min-h-[100px]"
            required
          />
        </div>
      </div>
      <Button type="submit">Enregistrer la maintenance</Button>
    </form>
  );
}

export default MaintenanceForm;
