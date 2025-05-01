
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function TicketsTab({ tickets, onAddTicket, onEditTicket, onDelete, clients, defibrillateurs }) {
  const sortedTickets = useMemo(() => {
    const priorityOrder = {
      'Urgente': 0,
      'Haute': 1,
      'Moyenne': 2,
      'Basse': 3
    };

    return [...tickets].sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }, [tickets]);

  const getClientName = (clientId) => {
    const client = clients?.find(c => c.id === parseInt(clientId));
    return client ? client.name : 'N/A';
  };

  const getDefibrillatorCode = (defId) => {
    if (!defId) return 'N/A';
    const def = defibrillateurs?.find(d => d.id === parseInt(defId));
    return def ? def.miniCode : 'N/A';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Demandes et signalements</h2>
        <Button onClick={onAddTicket}>Ajouter un ticket</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Défibrillateur</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Priorité</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets.map(ticket => (
              <tr key={ticket.id} className={`border-b ${
                ticket.priority === 'Urgente' ? 'bg-red-50' :
                ticket.priority === 'Haute' ? 'bg-orange-50' :
                ticket.priority === 'Moyenne' ? 'bg-yellow-50' :
                'bg-white'
              }`}>
                <td className="p-2">{getClientName(ticket.client)}</td>
                <td className="p-2">{getDefibrillatorCode(ticket.defibrillateur)}</td>
                <td className="p-2">{ticket.type}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    ticket.priority === 'Urgente' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'Haute' ? 'bg-orange-100 text-orange-800' :
                    ticket.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-2">{ticket.description}</td>
                <td className="p-2">{ticket.date}</td>
                <td className="p-2">{ticket.status}</td>
                <td className="p-2 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditTicket(ticket)}
                  >
                    Éditer
                  </Button>
                  {onDelete && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDelete(ticket)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketsTab;
