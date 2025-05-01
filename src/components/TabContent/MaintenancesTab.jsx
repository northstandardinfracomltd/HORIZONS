
import React from "react";
import { Button } from "@/components/ui/button";

function MaintenancesTab({ maintenances, defibrillateurs, clients, techniciens, onConsult }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des maintenances</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">MiniCode</th>
              <th className="p-2 text-left">N° Série</th>
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Ville</th>
              <th className="p-2 text-left">Technicien</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map(maintenance => {
              const defibrillateur = defibrillateurs.find(d => d.id === maintenance.defibrillateur);
              const client = clients.find(c => c.id === defibrillateur?.client);
              const technicien = techniciens.find(t => t.id === maintenance.technicien);
              
              return (
                <tr key={maintenance.id} className="border-b">
                  <td className="p-2">{defibrillateur?.miniCode}</td>
                  <td className="p-2">{defibrillateur?.serialNumber}</td>
                  <td className="p-2">{client?.name}</td>
                  <td className="p-2">{client?.city}</td>
                  <td className="p-2">{`${technicien?.name} ${technicien?.firstName}`}</td>
                  <td className="p-2">{maintenance.maintenanceDate}</td>
                  <td className="p-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onConsult(maintenance, defibrillateur)}
                    >
                      Consulter
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenancesTab;
