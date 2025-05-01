
import React from "react";
import { Button } from "@/components/ui/button";

function ClientsTab({ clients, onAddClient, onEditClient }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des clients</h2>
        <Button onClick={onAddClient}>Ajouter un client</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Téléphone</th>
              <th className="p-2 text-left">Adresse</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="border-b">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.phone}</td>
                <td className="p-2">{client.address}</td>
                <td className="p-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditClient(client)}
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

export default ClientsTab;
