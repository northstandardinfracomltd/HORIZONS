
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AccordDialog({ open, onOpenChange, accord, defibrillateurs, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{accord ? "Modifier l'accord" : "Ajouter un accord"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input 
              id="reference" 
              name="reference" 
              defaultValue={accord?.reference}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Date de début</Label>
            <Input 
              type="date" 
              id="startDate" 
              name="startDate" 
              defaultValue={accord?.startDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Date de fin</Label>
            <Input 
              type="date" 
              id="endDate" 
              name="endDate" 
              defaultValue={accord?.endDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="includedParts">Pièces incluses</Label>
            <Input 
              id="includedParts" 
              name="includedParts" 
              defaultValue={accord?.includedParts}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excludedParts">Pièces exclues</Label>
            <Input 
              id="excludedParts" 
              name="excludedParts" 
              defaultValue={accord?.excludedParts}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contractValue">Valeur du contrat</Label>
            <Input 
              type="number" 
              id="contractValue" 
              name="contractValue" 
              min="0"
              step="0.01"
              defaultValue={accord?.contractValue}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defibrillateurs">Défibrillateurs</Label>
            <select 
              name="defibrillateurs" 
              id="defibrillateurs" 
              multiple
              className="w-full rounded-md border p-2 min-h-[100px]"
              defaultValue={accord?.defibrillateurs}
              required
            >
              {defibrillateurs.map(defibrillateur => (
                <option key={defibrillateur.id} value={defibrillateur.id}>
                  {defibrillateur.miniCode} - {defibrillateur.serialNumber}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">
            {accord ? "Mettre à jour" : "Ajouter"} l'accord
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AccordDialog;
