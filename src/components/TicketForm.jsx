
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TicketForm({ onSubmit, defibrillateurs }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="defibrillateur">Défibrillateur</Label>
          <select name="defibrillateur" id="defibrillateur" className="w-full rounded-md border p-2" required>
            {defibrillateurs.map(def => (
              <option key={def.id} value={def.id}>{def.serialNumber}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type de signalement</Label>
          <select name="type" id="type" className="w-full rounded-md border p-2" required>
            <option value="panne">Panne</option>
            <option value="maintenance">Maintenance préventive</option>
            <option value="remplacement">Remplacement</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            className="w-full rounded-md border p-2 min-h-[100px]"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <select name="priority" id="priority" className="w-full rounded-md border p-2" required>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>
      <Button type="submit">Créer le ticket</Button>
    </form>
  );
}

export default TicketForm;
