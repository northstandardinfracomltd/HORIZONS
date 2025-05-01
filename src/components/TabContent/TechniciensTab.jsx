
import React from "react";
import { Button } from "@/components/ui/button";

function TechniciensTab({ techniciens, onAddTechnicien, onEditTechnicien }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Techniciens</h2>
        <Button onClick={onAddTechnicien}>Ajouter un technicien</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Prénom</th>
              <th className="p-2 text-left">Zone</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {techniciens.map(technicien => (
              <tr key={technicien.id} className="border-b">
                <td className="p-2">{technicien.name}</td>
                <td className="p-2">{technicien.firstName}</td>
                <td className="p-2">{technicien.zone}</td>
                <td className="p-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditTechnicien(technicien)}
                  >
                    Éditer
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

export default TechniciensTab;
