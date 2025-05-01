
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function TourneeTab({ tournees, onAdd, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tournées de visite</h2>
        <Button onClick={onAdd}>Nouvelle tournée</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Titre</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Localisation</th>
              <th className="p-2 text-left">Technicien</th>
              <th className="p-2 text-left">Nombre de défibrillateurs</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournees.map(tournee => (
              <tr key={tournee.id} className="border-b">
                <td className="p-2">{tournee.titre}</td>
                <td className="p-2">{tournee.date}</td>
                <td className="p-2">{tournee.localisation}</td>
                <td className="p-2">{tournee.technicien}</td>
                <td className="p-2">{tournee.defibrillateurs.length}</td>
                <td className="p-2 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(tournee)}
                  >
                    Éditer
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDelete(tournee)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TourneeTab;
