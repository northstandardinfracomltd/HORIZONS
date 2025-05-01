
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import DefibrillatorForm from "@/components/DefibrillatorForm";
import { Button } from "@/components/ui/button";

function DefibrillatorDialog({ 
  open, 
  onClose,
  defibrillateur, 
  clients, 
  onSave,
  title 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{defibrillateur ? "Modifier le défibrillateur" : "Ajouter un défibrillateur"}</DialogTitle>
        </DialogHeader>
        <DefibrillatorForm
          onSubmit={handleSubmit}
          clients={clients}
          initialData={defibrillateur}
        />
        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DefibrillatorDialog;
