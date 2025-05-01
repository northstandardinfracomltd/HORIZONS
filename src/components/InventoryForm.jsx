
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function InventoryForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select name="type" id="type" className="w-full rounded-md border p-2" required>
            <option value="defibrillateur">Défibrillateur</option>
            <option value="batterie">Batterie</option>
            <option value="electrodes">Électrodes</option>
            <option value="accessoire">Accessoire</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reference">Référence</Label>
          <Input id="reference" name="reference" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNumber">Numéro de série</Label>
          <Input id="serialNumber" name="serialNumber" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantité</Label>
          <Input type="number" id="quantity" name="quantity" min="1" required />
        </div>
      </div>
      <Button type="submit">Ajouter à l'inventaire</Button>
    </form>
  );
}

export default InventoryForm;
