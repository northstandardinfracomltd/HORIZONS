
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export default function VerificationPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [defibrillateur, setDefibrillateur] = useState(null);
  const [maintenances, setMaintenances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro de série ou un MiniCode",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Recherche du défibrillateur
      const { data: defibData, error: defibError } = await supabase
        .from('defibrillateurs')
        .select(`
          *,
          client:clients(name, address)
        `)
        .or(`serial_number.ilike.%${searchQuery}%,mini_code.ilike.%${searchQuery}%`)
        .single();

      if (defibError) throw defibError;

      if (!defibData) {
        toast({
          title: "Aucun résultat",
          description: "Aucun défibrillateur trouvé avec ce numéro",
          variant: "destructive"
        });
        setDefibrillateur(null);
        setMaintenances([]);
        return;
      }

      setDefibrillateur(defibData);

      // Recherche des maintenances associées
      const { data: maintenanceData, error: maintenanceError } = await supabase
        .from('maintenances')
        .select(`
          *,
          technicien:techniciens(name, first_name)
        `)
        .eq('defibrillateur_id', defibData.id)
        .order('date', { ascending: false });

      if (maintenanceError) throw maintenanceError;
      setMaintenances(maintenanceData);

    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Vérification Défibrillateur
          </h1>
          <p className="text-gray-600">
            Entrez le numéro de série ou le MiniCode du défibrillateur
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Numéro de série ou MiniCode</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez le numéro de série ou le MiniCode"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
              >
                Rechercher
              </Button>
            </div>
          </div>
        </div>

        {defibrillateur && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg p-6 shadow-lg space-y-6"
          >
            <h2 className="text-xl font-semibold text-blue-900">
              Informations du défibrillateur
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Numéro de série</Label>
                <p className="mt-1">{defibrillateur.serial_number}</p>
              </div>
              <div>
                <Label>MiniCode</Label>
                <p className="mt-1">{defibrillateur.mini_code}</p>
              </div>
              <div>
                <Label>Modèle</Label>
                <p className="mt-1">{defibrillateur.model}</p>
              </div>
              <div>
                <Label>Client</Label>
                <p className="mt-1">{defibrillateur.client?.name}</p>
              </div>
              <div>
                <Label>Date d'installation</Label>
                <p className="mt-1">{defibrillateur.installation_date}</p>
              </div>
              <div>
                <Label>Prochaine maintenance</Label>
                <p className="mt-1">{defibrillateur.next_maintenance_date}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-blue-900 mt-6">
              Historique des maintenances
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Technicien</th>
                    <th className="p-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenances.map((maintenance) => (
                    <tr key={maintenance.id} className="border-b">
                      <td className="p-2">{maintenance.date}</td>
                      <td className="p-2">
                        {maintenance.technicien?.name} {maintenance.technicien?.first_name}
                      </td>
                      <td className="p-2">{maintenance.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
