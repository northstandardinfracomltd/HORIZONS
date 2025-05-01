
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { isDateCritical, needsMaintenance } from '@/utils/dateUtils';
import DefibrillatorFilters from '@/components/DefibrillatorFilters';

export default function DefibrillateursTab({
  defibrillateurs = [],
  onAddDefibrillator,
  onEditDefibrillator,
  onAddMaintenance,
  clients = [],
  selectedClientFilter,
  setSelectedClientFilter,
  showMaintenanceRequired,
  setShowMaintenanceRequired,
  searchQuery,
  onSearchChange,
  onAddToTournee,
  tournees = []
}) {
  const [selectedDefibrillateurs, setSelectedDefibrillateurs] = useState([]);
  const [selectedTournee, setSelectedTournee] = useState("");

  const handleCheckboxChange = (defibrillateur) => {
    setSelectedDefibrillateurs(prev => {
      if (prev.includes(defibrillateur.id)) {
        return prev.filter(id => id !== defibrillateur.id);
      } else {
        return [...prev, defibrillateur.id];
      }
    });
  };

  const handleSubmitToTournee = () => {
    if (selectedTournee && selectedDefibrillateurs.length > 0) {
      onAddToTournee(selectedTournee, selectedDefibrillateurs);
      setSelectedDefibrillateurs([]);
      setSelectedTournee("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des défibrillateurs</h2>
          <Button onClick={onAddDefibrillator}>
            Ajouter un défibrillateur
          </Button>
        </div>

        <DefibrillatorFilters
          clients={clients}
          onClientChange={setSelectedClientFilter}
          showMaintenanceRequired={showMaintenanceRequired}
          onMaintenanceRequiredChange={setShowMaintenanceRequired}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        {selectedDefibrillateurs.length > 0 && tournees && tournees.length > 0 && (
          <div className="flex gap-2 mb-4">
            <select
              className="rounded-md border p-2"
              value={selectedTournee}
              onChange={(e) => setSelectedTournee(e.target.value)}
            >
              <option value="">Sélectionner une tournée</option>
              {tournees.map(tournee => (
                <option key={tournee.id} value={tournee.id}>
                  {tournee.titre} ({tournee.date})
                </option>
              ))}
            </select>
            <Button onClick={handleSubmitToTournee}>
              Ajouter à la tournée
            </Button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDefibrillateurs(defibrillateurs.map(d => d.id));
                      } else {
                        setSelectedDefibrillateurs([]);
                      }
                    }}
                    checked={defibrillateurs.length > 0 && selectedDefibrillateurs.length === defibrillateurs.length}
                  />
                </th>
                <th className="p-2 text-left">N° Série</th>
                <th className="p-2 text-left">Modèle</th>
                <th className="p-2 text-left">MiniCode</th>
                <th className="p-2 text-left">Client</th>
                <th className="p-2 text-left">Dernière visite</th>
                <th className="p-2 text-left">Prochaine visite</th>
                <th className="p-2 text-left">Péremption électrode</th>
                <th className="p-2 text-left">Péremption électrode péd.</th>
                <th className="p-2 text-left">Péremption batterie</th>
                <th className="p-2 text-left">Tel contact</th>
                <th className="p-2 text-left">Email contact</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {defibrillateurs.map(defibrillateur => (
                <tr 
                  key={defibrillateur.id} 
                  className={`border-b ${needsMaintenance(defibrillateur) ? 'bg-red-50' : ''}`}
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedDefibrillateurs.includes(defibrillateur.id)}
                      onChange={() => handleCheckboxChange(defibrillateur)}
                    />
                  </td>
                  <td className="p-2">{defibrillateur.serialNumber}</td>
                  <td className="p-2">{defibrillateur.model}</td>
                  <td className="p-2">{defibrillateur.miniCode}</td>
                  <td className="p-2">{clients.find(c => c.id === defibrillateur.client)?.name}</td>
                  <td className="p-2">{defibrillateur.lastMaintenanceDate}</td>
                  <td className={`p-2 ${isDateCritical(defibrillateur.nextMaintenanceDate) ? 'text-red-600 font-semibold' : ''}`}>
                    {defibrillateur.nextMaintenanceDate}
                  </td>
                  <td className={`p-2 ${isDateCritical(defibrillateur.adultElectrodesExpiryDate) ? 'text-red-600 font-semibold' : ''}`}>
                    {defibrillateur.adultElectrodesExpiryDate}
                  </td>
                  <td className={`p-2 ${isDateCritical(defibrillateur.pediatricElectrodesExpiryDate) ? 'text-red-600 font-semibold' : ''}`}>
                    {defibrillateur.pediatricElectrodesExpiryDate}
                  </td>
                  <td className={`p-2 ${isDateCritical(defibrillateur.batteryExpiryDate) ? 'text-red-600 font-semibold' : ''}`}>
                    {defibrillateur.batteryExpiryDate}
                  </td>
                  <td className="p-2">{defibrillateur.contactPhone}</td>
                  <td className="p-2">{defibrillateur.contactEmail}</td>
                  <td className="p-2 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditDefibrillator(defibrillateur)}
                    >
                      Éditer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onAddMaintenance(defibrillateur)}
                    >
                      Maintenance
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
