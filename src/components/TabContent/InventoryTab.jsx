
import React from "react";
import { Button } from "@/components/ui/button";

function InventoryTab({ inventory, onAddItem, onEditItem }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventaire</h2>
        <Button onClick={onAddItem}>Ajouter un article</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Référence</th>
              <th className="p-2 text-left">N° Série</th>
              <th className="p-2 text-left">Quantité</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Date de sortie</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.reference}</td>
                <td className="p-2">{item.serialNumber}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">{item.exitDate}</td>
                <td className="p-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditItem(item)}
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

export default InventoryTab;
