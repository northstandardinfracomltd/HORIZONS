
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DefibrillatorForm from "./DefibrillatorForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function MaintenanceDialog({ open, onOpenChange, defibrillator, techniciens, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Maintenance du défibrillateur {defibrillator?.miniCode}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Section Maintenance */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Informations de maintenance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="technicien">Technicien</Label>
                <select 
                  name="technicien" 
                  id="technicien" 
                  className="w-full rounded-md border p-2"
                  required
                >
                  {techniciens.map(technicien => (
                    <option key={technicien.id} value={technicien.id}>
                      {technicien.name} {technicien.firstName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceDate">Date de passage</Label>
                <Input 
                  type="date" 
                  id="maintenanceDate" 
                  name="maintenanceDate" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextMaintenanceDate">Prochaine maintenance prévue</Label>
                <Input 
                  type="date" 
                  id="nextMaintenanceDate" 
                  name="nextMaintenanceDate" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceNotes">Notes de maintenance</Label>
                <textarea
                  id="maintenanceNotes"
                  name="maintenanceNotes"
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  placeholder="Observations, actions effectuées..."
                />
              </div>
            </div>
          </div>

          {/* Formulaire complet du défibrillateur */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Mise à jour des données du défibrillateur</h3>
            <DefibrillatorForm 
              initialData={defibrillator}
              onSubmit={(e) => e.preventDefault()} // Prevent individual form submission
              clients={[]} // Pass actual clients prop here
            />
          </div>

          <div className="sticky bottom-0 bg-white p-4 border-t mt-6">
            <Button type="submit" className="w-full md:w-auto">
              Enregistrer la maintenance et mettre à jour le défibrillateur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default MaintenanceDialog;
