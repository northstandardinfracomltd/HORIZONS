
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TicketDialog({ open, onClose, ticket, defibrillateurs, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      type: formData.get('type'),
      priority: formData.get('priority'),
      description: formData.get('description'),
      defibrillateur: formData.get('defibrillateur'),
      date: new Date().toISOString().split('T')[0],
      status: 'Nouveau'
    };
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{ticket ? "Modifier le ticket" : "Créer un ticket"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select 
              name="type" 
              id="type" 
              className="w-full rounded-md border p-2"
              defaultValue={ticket?.type}
              required
            >
              <option value="Incident">Incident</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Installation">Installation</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priorité</Label>
            <select 
              name="priority" 
              id="priority" 
              className="w-full rounded-md border p-2"
              defaultValue={ticket?.priority}
              required
            >
              <option value="Urgente">Urgente</option>
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="defibrillateur">Défibrillateur (optionnel)</Label>
            <select 
              name="defibrillateur" 
              id="defibrillateur" 
              className="w-full rounded-md border p-2"
              defaultValue={ticket?.defibrillateur}
            >
              <option value="">Sélectionner un défibrillateur</option>
              {defibrillateurs?.map(defibrillateur => (
                <option key={defibrillateur.id} value={defibrillateur.id}>
                  {defibrillateur.miniCode} - {defibrillateur.serialNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              className="w-full rounded-md border p-2 min-h-[100px]"
              defaultValue={ticket?.description}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Annuler</Button>
            </DialogClose>
            <Button type="submit">
              {ticket ? "Mettre à jour" : "Créer"} le ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TicketDialog;
