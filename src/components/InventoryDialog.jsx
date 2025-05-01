
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

function InventoryDialog({ open, onClose, item, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      type: formData.get('type'),
      reference: formData.get('reference'),
      serialNumber: formData.get('serialNumber'),
      quantity: parseInt(formData.get('quantity')),
      status: 'En stock',
      exitDate: null
    };
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item ? "Modifier l'article" : "Ajouter un article"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select 
              name="type" 
              id="type" 
              className="w-full rounded-md border p-2"
              defaultValue={item?.type}
              required
            >
              <option value="Défibrillateur">Défibrillateur</option>
              <option value="Batterie">Batterie</option>
              <option value="Électrodes">Électrodes</option>
              <option value="Accessoire">Accessoire</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input 
              id="reference" 
              name="reference" 
              defaultValue={item?.reference}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serialNumber">Numéro de série</Label>
            <Input 
              id="serialNumber" 
              name="serialNumber" 
              defaultValue={item?.serialNumber}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantité</Label>
            <Input 
              type="number" 
              id="quantity" 
              name="quantity" 
              min="1"
              defaultValue={item?.quantity || 1}
              required 
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Annuler</Button>
            </DialogClose>
            <Button type="submit">
              {item ? "Mettre à jour" : "Ajouter"} l'article
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InventoryDialog;
