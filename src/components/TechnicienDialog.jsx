
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

function TechnicienDialog({ open, onClose, technicien, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      firstName: formData.get('firstName'),
      zone: formData.get('zone'),
    };
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{technicien ? "Modifier le technicien" : "Ajouter un technicien"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={technicien?.name}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input 
              id="firstName" 
              name="firstName" 
              defaultValue={technicien?.firstName}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zone">Zone</Label>
            <Input 
              id="zone" 
              name="zone" 
              defaultValue={technicien?.zone}
              required 
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Annuler</Button>
            </DialogClose>
            <Button type="submit">
              {technicien ? "Mettre à jour" : "Ajouter"} le technicien
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TechnicienDialog;
