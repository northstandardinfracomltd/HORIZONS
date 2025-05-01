
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

function TourneeDialog({ open, onOpenChange, tournee, techniciens, defibrillateurs, onSubmit }) {
  const [currentTournee, setCurrentTournee] = useState({
    ...tournee,
    defibrillateurs: tournee?.defibrillateurs || [],
    observations: tournee?.observations || {}
  });

  useEffect(() => {
    setCurrentTournee({
      ...tournee,
      defibrillateurs: tournee?.defibrillateurs || [],
      observations: tournee?.observations || {}
    });
  }, [tournee]);

  const handleRemoveDefibrillateur = (defId) => {
    setCurrentTournee(prev => ({
      ...prev,
      defibrillateurs: prev.defibrillateurs.filter(d => d !== defId),
      observations: {
        ...prev.observations,
        [defId]: undefined
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const observations = {};
    currentTournee.defibrillateurs.forEach(defId => {
      const observation = formData.get(`observation_${defId}`);
      if (observation) {
        observations[defId] = observation;
      }
    });

    const updatedTournee = {
      id: currentTournee?.id || Date.now(),
      titre: formData.get('titre'),
      date: formData.get('date'),
      localisation: formData.get('localisation'),
      technicien: formData.get('technicien'),
      defibrillateurs: currentTournee.defibrillateurs,
      observations: observations
    };

    onSubmit(event, updatedTournee);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tournee ? "Modifier la tournée" : "Nouvelle tournée"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                name="titre"
                defaultValue={currentTournee?.titre}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                defaultValue={currentTournee?.date}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localisation">Localisation</Label>
              <Input
                id="localisation"
                name="localisation"
                defaultValue={currentTournee?.localisation}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicien">Technicien</Label>
              <select
                id="technicien"
                name="technicien"
                className="w-full rounded-md border p-2"
                defaultValue={currentTournee?.technicien}
                required
              >
                <option value="">Sélectionner un technicien</option>
                {techniciens?.map(tech => (
                  <option key={tech.id} value={tech.id}>
                    {tech.firstName} {tech.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Défibrillateurs sélectionnés</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">MiniCode</th>
                    <th className="p-2 text-left">N° Série</th>
                    <th className="p-2 text-left">Client</th>
                    <th className="p-2 text-left">Observation</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTournee.defibrillateurs.map((defId) => {
                    const def = defibrillateurs?.find(d => d.id === defId);
                    if (!def) return null;
                    return (
                      <tr key={def.id} className="border-b">
                        <td className="p-2">{def.miniCode}</td>
                        <td className="p-2">{def.serialNumber}</td>
                        <td className="p-2">{def.client}</td>
                        <td className="p-2">
                          <Input
                            name={`observation_${def.id}`}
                            defaultValue={currentTournee.observations[def.id] || ""}
                            placeholder="Ajouter une observation"
                          />
                        </td>
                        <td className="p-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveDefibrillateur(def.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {currentTournee ? "Mettre à jour" : "Créer"} la tournée
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TourneeDialog;
