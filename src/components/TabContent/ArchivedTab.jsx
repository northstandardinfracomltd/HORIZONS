
import React from "react";
import { Button } from "@/components/ui/button";

function ArchivedTab({ defibrillateurs, clients, onDelete }) {
  const archivedDefibrillateurs = defibrillateurs.filter(d => d.status === 'archived');

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Défibrillateurs archivés</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">N° Série</th>
              <th className="p-2 text-left">Modèle</th>
              <th className="p-2 text-left">MiniCode</th>
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {archivedDefibrillateurs.map(defibrillateur => (
              <tr key={defibrillateur.id} className="border-b">
                <td className="p-2">{defibrillateur.serialNumber}</td>
                <td className="p-2">{defibrillateur.model}</td>
                <td className="p-2">{defibrillateur.miniCode}</td>
                <td className="p-2">{clients.find(c => c.id === parseInt(defibrillateur.client))?.name}</td>
                <td className="p-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDelete(defibrillateur)}
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

export default ArchivedTab;
