
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function SubscriptionDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">Détails de l'abonnement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Abonnement</h3>
            <p className="mb-2">Plan : Standard, 24€ par mois</p>
            <Button asChild variant="outline" className="w-full">
              <a href="#" target="_blank" rel="noopener noreferrer">Mes paiements</a>
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="mb-2">Appellez-nous ou ouvrez un ticket</p>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <a href="#" target="_blank" rel="noopener noreferrer">Composer</a>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a href="#" target="_blank" rel="noopener noreferrer">Ticket</a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Archive</h3>
            <p className="mb-2">Téléchargez l'archive de vos données pour garder une sauvegarde votre côté.</p>
            <Button asChild variant="outline" className="w-full">
              <a href="#" download>Télécharger</a>
            </Button>
          </div>

          <DialogClose asChild>
            <Button className="w-full">Fermer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionDialog;
