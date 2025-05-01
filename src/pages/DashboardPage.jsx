
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import DefibrillateursTab from "@/components/TabContent/DefibrillateursTab";
import ClientsTab from "@/components/TabContent/ClientsTab";
import MaintenancesTab from "@/components/TabContent/MaintenancesTab";
import TicketsTab from "@/components/TabContent/TicketsTab";
import InventoryTab from "@/components/TabContent/InventoryTab";
import TechniciensTab from "@/components/TabContent/TechniciensTab";
import AccordsTab from "@/components/TabContent/AccordsTab";
import TourneeTab from "@/components/TabContent/TourneeTab";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

import ClientDialog from "@/components/ClientDialog";
import DefibrillatorDialog from "@/components/DefibrillatorDialog";
import TicketDialog from "@/components/TicketDialog";
import InventoryDialog from "@/components/InventoryDialog";
import TechnicienDialog from "@/components/TechnicienDialog";
import AccordDialog from "@/components/AccordDialog";
import TourneeDialog from "@/components/TourneeDialog";
import MaintenanceDialog from "@/components/MaintenanceDialog";

function DashboardPage({
  selectedTab,
  setSelectedTab,
  showClientDialog,
  setShowClientDialog,
  showDefibrillatorDialog,
  setShowDefibrillatorDialog,
  showTicketDialog,
  setShowTicketDialog,
  showInventoryDialog,
  setShowInventoryDialog,
  showTechnicienDialog,
  setShowTechnicienDialog,
  showAccordDialog,
  setShowAccordDialog,
  showTourneeDialog,
  setShowTourneeDialog,
  showMaintenanceDialog,
  setShowMaintenanceDialog
}) {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [defibrillateurs, setDefibrillateurs] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [accords, setAccords] = useState([]);
  const [tournees, setTournees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [
        { data: clientsData },
        { data: defibrillateurData },
        { data: maintenanceData },
        { data: ticketData },
        { data: inventoryData },
        { data: technicienData },
        { data: accordData },
        { data: tourneeData }
      ] = await Promise.all([
        supabase.from('clients').select('*'),
        supabase.from('defibrillateurs').select('*'),
        supabase.from('maintenances').select('*'),
        supabase.from('tickets').select('*'),
        supabase.from('inventory').select('*'),
        supabase.from('techniciens').select('*'),
        supabase.from('accords').select('*'),
        supabase.from('tournees').select('*')
      ]);

      setClients(clientsData || []);
      setDefibrillateurs(defibrillateurData || []);
      setMaintenances(maintenanceData || []);
      setTickets(ticketData || []);
      setInventory(inventoryData || []);
      setTechniciens(technicienData || []);
      setAccords(accordData || []);
      setTournees(tourneeData || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers for Defibrillateurs
  const handleAddDefibrillator = () => {
    setSelectedItem(null);
    setShowDefibrillatorDialog(true);
  };

  const handleEditDefibrillator = (defibrillateur) => {
    setSelectedItem(defibrillateur);
    setShowDefibrillatorDialog(true);
  };

  const handleAddMaintenance = (defibrillateur) => {
    setSelectedItem(defibrillateur);
    setShowMaintenanceDialog(true);
  };

  // Handlers for Clients
  const handleAddClient = () => {
    setSelectedItem(null);
    setShowClientDialog(true);
  };

  const handleEditClient = (client) => {
    setSelectedItem(client);
    setShowClientDialog(true);
  };

  // Handlers for Tickets
  const handleAddTicket = () => {
    setSelectedItem(null);
    setShowTicketDialog(true);
  };

  const handleEditTicket = (ticket) => {
    setSelectedItem(ticket);
    setShowTicketDialog(true);
  };

  // Handlers for Inventory
  const handleAddInventoryItem = () => {
    setSelectedItem(null);
    setShowInventoryDialog(true);
  };

  const handleEditInventoryItem = (item) => {
    setSelectedItem(item);
    setShowInventoryDialog(true);
  };

  // Handlers for Techniciens
  const handleAddTechnicien = () => {
    setSelectedItem(null);
    setShowTechnicienDialog(true);
  };

  const handleEditTechnicien = (technicien) => {
    setSelectedItem(technicien);
    setShowTechnicienDialog(true);
  };

  // Handlers for Accords
  const handleAddAccord = () => {
    setSelectedItem(null);
    setShowAccordDialog(true);
  };

  const handleEditAccord = (accord) => {
    setSelectedItem(accord);
    setShowAccordDialog(true);
  };

  // Handlers for Tournees
  const handleAddTournee = () => {
    setSelectedItem(null);
    setShowTourneeDialog(true);
  };

  const handleEditTournee = (tournee) => {
    setSelectedItem(tournee);
    setShowTourneeDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            <TabsTrigger value="defibrillateurs">Défibrillateurs</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="maintenances">Maintenances</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
            <TabsTrigger value="techniciens">Techniciens</TabsTrigger>
            <TabsTrigger value="accords">Accords</TabsTrigger>
            <TabsTrigger value="tournee">Tournées</TabsTrigger>
          </TabsList>

          <TabsContent value="defibrillateurs">
            <DefibrillateursTab 
              defibrillateurs={defibrillateurs}
              clients={clients}
              onAddDefibrillator={handleAddDefibrillator}
              onEditDefibrillator={handleEditDefibrillator}
              onAddMaintenance={handleAddMaintenance}
            />
          </TabsContent>
          
          <TabsContent value="clients">
            <ClientsTab 
              clients={clients}
              onAddClient={handleAddClient}
              onEditClient={handleEditClient}
            />
          </TabsContent>

          <TabsContent value="maintenances">
            <MaintenancesTab 
              maintenances={maintenances}
              defibrillateurs={defibrillateurs}
              clients={clients}
              techniciens={techniciens}
              onAdd={() => setShowMaintenanceDialog(true)}
            />
          </TabsContent>

          <TabsContent value="tickets">
            <TicketsTab 
              tickets={tickets}
              clients={clients}
              defibrillateurs={defibrillateurs}
              onAddTicket={handleAddTicket}
              onEditTicket={handleEditTicket}
            />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryTab 
              inventory={inventory}
              onAddItem={handleAddInventoryItem}
              onEditItem={handleEditInventoryItem}
            />
          </TabsContent>

          <TabsContent value="techniciens">
            <TechniciensTab 
              techniciens={techniciens}
              onAddTechnicien={handleAddTechnicien}
              onEditTechnicien={handleEditTechnicien}
            />
          </TabsContent>

          <TabsContent value="accords">
            <AccordsTab 
              accords={accords}
              defibrillateurs={defibrillateurs}
              onAdd={handleAddAccord}
              onEdit={handleEditAccord}
            />
          </TabsContent>

          <TabsContent value="tournee">
            <TourneeTab 
              tournees={tournees}
              onAdd={handleAddTournee}
              onEdit={handleEditTournee}
            />
          </TabsContent>
        </Tabs>

        <ClientDialog 
          open={showClientDialog} 
          onClose={() => setShowClientDialog(false)}
          client={selectedItem}
          onSave={async (data) => {
            try {
              const { error } = await supabase.from('clients').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Client ${selectedItem ? 'modifié' : 'ajouté'} avec succès`,
              });
              
              setShowClientDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} le client`,
                variant: "destructive"
              });
            }
          }}
        />
        
        <DefibrillatorDialog 
          open={showDefibrillatorDialog} 
          onClose={() => setShowDefibrillatorDialog(false)}
          defibrillateur={selectedItem}
          clients={clients}
          onSave={async (data) => {
            try {
              const { error } = await supabase.from('defibrillateurs').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Défibrillateur ${selectedItem ? 'modifié' : 'ajouté'} avec succès`,
              });
              
              setShowDefibrillatorDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} le défibrillateur`,
                variant: "destructive"
              });
            }
          }}
        />

        <TicketDialog 
          open={showTicketDialog} 
          onClose={() => setShowTicketDialog(false)}
          ticket={selectedItem}
          clients={clients}
          defibrillateurs={defibrillateurs}
          onSave={async (data) => {
            try {
              const { error } = await supabase.from('tickets').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Ticket ${selectedItem ? 'modifié' : 'ajouté'} avec succès`,
              });
              
              setShowTicketDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} le ticket`,
                variant: "destructive"
              });
            }
          }}
        />

        <InventoryDialog 
          open={showInventoryDialog} 
          onClose={() => setShowInventoryDialog(false)}
          item={selectedItem}
          onSave={async (data) => {
            try {
              const { error } = await supabase.from('inventory').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Article ${selectedItem ? 'modifié' : 'ajouté'} avec succès`,
              });
              
              setShowInventoryDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} l'article`,
                variant: "destructive"
              });
            }
          }}
        />

        <TechnicienDialog 
          open={showTechnicienDialog} 
          onClose={() => setShowTechnicienDialog(false)}
          technicien={selectedItem}
          onSave={async (data) => {
            try {
              const { error } = await supabase.from('techniciens').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Technicien ${selectedItem ? 'modifié' : 'ajouté'} avec succès`,
              });
              
              setShowTechnicienDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} le technicien`,
                variant: "destructive"
              });
            }
          }}
        />

        <AccordDialog 
          open={showAccordDialog} 
          onOpenChange={setShowAccordDialog}
          accord={selectedItem}
          clients={clients}
          defibrillateurs={defibrillateurs}
          onSubmit={async (e, data) => {
            e.preventDefault();
            try {
              const { error } = await supabase.from('accords').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Accord ${selectedItem ? 'modifié' : 'ajouté'} avec succès`,
              });
              
              setShowAccordDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} l'accord`,
                variant: "destructive"
              });
            }
          }}
        />

        <TourneeDialog 
          open={showTourneeDialog} 
          onOpenChange={setShowTourneeDialog}
          tournee={selectedItem}
          techniciens={techniciens}
          defibrillateurs={defibrillateurs}
          onSubmit={async (e, data) => {
            e.preventDefault();
            try {
              const { error } = await supabase.from('tournees').upsert([{
                id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: `Tournée ${selectedItem ? 'modifiée' : 'ajoutée'} avec succès`,
              });
              
              setShowTourneeDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: `Impossible de ${selectedItem ? 'modifier' : 'ajouter'} la tournée`,
                variant: "destructive"
              });
            }
          }}
        />

        <MaintenanceDialog 
          open={showMaintenanceDialog} 
          onOpenChange={setShowMaintenanceDialog}
          defibrillateur={selectedItem}
          techniciens={techniciens}
          onSubmit={async (e, data) => {
            e.preventDefault();
            try {
              const { error } = await supabase.from('maintenances').insert([{
                defibrillateur_id: selectedItem?.id,
                ...data
              }]);
              
              if (error) throw error;
              
              toast({
                title: "Succès",
                description: "Maintenance ajoutée avec succès",
              });
              
              setShowMaintenanceDialog(false);
              fetchAllData();
            } catch (error) {
              toast({
                title: "Erreur",
                description: "Impossible d'ajouter la maintenance",
                variant: "destructive"
              });
            }
          }}
        />
      </main>
    </div>
  );
}

export default DashboardPage;
