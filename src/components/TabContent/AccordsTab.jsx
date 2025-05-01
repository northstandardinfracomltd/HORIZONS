
import React from "react";
import { Button } from "@/components/ui/button";

function AccordsTab({ accords, defibrillateurs, onAdd, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Accords</h2>
        <Button onClick={onAdd}>Ajouter un accord</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Référence</th>
              <th className="p-2 text-left">Date début</th>
              <th className="p-2 text-left">Date fin</th>
              <th className="p-2 text-left">Valeur</th>
              <th className="p-2 text-left">Défibrillateurs</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accords.map(accord => (
              <tr key={accord.id} className="border-b">
                <td className="p-2">{accord.reference}</td>
                <td className="p-2">{accord.startDate}</td>
                <td className="p-2">{accord.endDate}</td>
                <td className="p-2">{accord.contractValue}€</td>
                <td className="p-2">
                  {accord.defibrillateurs
                    .map(id => defibrillateurs.find(d => d.id === id)?.miniCode)
                    .join(", ")}
                </td>
                <td className="p-2 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(accord)}
                  >
                    Éditer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDelete(accord)}
                  >
                    Supprimer
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

export default AccordsTab;
