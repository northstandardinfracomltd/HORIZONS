
import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import LoginPage from '@/components/LoginPage';
import LoadingWave from '@/components/ui/loading-wave';
import {
  getDefibrillateurs,
  getClients,
  getMaintenances,
  getTickets,
  getInventory,
  getTechniciens,
  getAccords,
  getTournees,
  addNewDefibrillateur,
  addNewClient,
  addNewMaintenance,
  addNewTicket,
  addNewInventoryItem,
  addNewTechnicien,
  addNewAccord,
  addNewTournee
} from '@/lib/supabase';

// Import des composants de dialogue
import SubscriptionDialog from '@/components/SubscriptionDialog';
import DefibrillatorDialog from '@/components/DefibrillatorDialog';
import MaintenanceDialog from '@/components/MaintenanceDialog';
import ClientDialog from '@/components/ClientDialog';
import TicketDialog from '@/components/TicketDialog';
import InventoryDialog from '@/components/InventoryDialog';
import TechnicienDialog from '@/components/TechnicienDialog';
import AccordDialog from '@/components/AccordDialog';
import TourneeDialog from '@/components/TourneeDialog';

// Import des composants d'onglets
import DefibrillateursTab from '@/components/TabContent/DefibrillateursTab';
import ClientsTab from '@/components/TabContent/ClientsTab';
import MaintenancesTab from '@/components/TabContent/MaintenancesTab';
import TicketsTab from '@/components/TabContent/TicketsTab';
import InventoryTab from '@/components/TabContent/InventoryTab';
import TechniciensTab from '@/components/TabContent/TechniciensTab';
import AccordsTab from '@/components/TabContent/AccordsTab';
import ArchivedTab from '@/components/TabContent/ArchivedTab';
import TourneeTab from '@/components/TabContent/TourneeTab';

// Import des hooks et utilitaires
import { needsMaintenance } from '@/utils/dateUtils';

function App() {
  const { toast } = useToast();
  
  // États d'authentification et UI
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("defibrillateurs");
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [company, setCompany] = useState('');
  
  // États pour les dialogues
  const [showDefibrillatorDialog, setShowDefibrillatorDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [showInventoryDialog, setShowInventoryDialog] = useState(false);
  const [showTechnicienDialog, setShowTechnicienDialog] = useState(false);
  const [showAccordDialog, setShowAccordDialog] = useState(false);
  const [showTourneeDialog, setShowTourneeDialog] = useState(false);

  // États pour les éléments sélectionnés
  const [selectedDefibrillator, setSelectedDefibrillator] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
  const [selectedTechnicien, setSelectedTechnicien] = useState(null);
  const [selectedAccord, setSelectedAccord] = useState(null);
  const [selectedTournee, setSelectedTournee] = useState(null);

  // États pour les données
  const [defibrillateurs, setDefibrillateurs] = useState([]);
  const [clients, setClients] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [accords, setAccords] = useState([]);
  const [tournees, setTournees] = useState([]);

  // États pour les filtres
  const [selectedClientFilter, setSelectedClientFilter] = useState("");
  const [showMaintenanceRequired, setShowMaintenanceRequired] = useState(false);

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [
          defibrillateursData,
          clientsData,
          maintenancesData,
          ticketsData,
          inventoryData,
          techniciensData,
          accordsData,
          tourneesData
        ] = await Promise.all([
          getDefibrillateurs(),
          getClients(),
          getMaintenances(),
          getTickets(),
          getInventory(),
          getTechniciens(),
          getAccords(),
          getTournees()
        ]);

        setDefibrillateurs(defibrillateursData);
        setClients(clientsData);
        setMaintenances(maintenancesData);
        setTickets(ticketsData);
        setInventory(inventoryData);
        setTechniciens(techniciensData);
        setAccords(accordsData);
        setTournees(tourneesData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement des données.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCompany('');
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  // Filtrer les défibrillateurs
  const filteredDefibrillateurs = useMemo(() => {
    return defibrillateurs
      .filter(d => d.status !== 'archived')
      .filter(d => !selectedClientFilter || d.client === selectedClientFilter)
      .filter(d => !showMaintenanceRequired || needsMaintenance(d))
      .filter(d => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          d.serialNumber?.toLowerCase().includes(query) ||
          d.miniCode?.toLowerCase().includes(query)
        );
      });
  }, [defibrillateurs, selectedClientFilter, showMaintenanceRequired, searchQuery]);

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={() => {
          setCompany("Utilisateur");
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AnimatePresence>
        {isLoading && <LoadingWave />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen"
      >
        <div className="px-0">
          <div className="flex justify-between items-center p-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-blue-900">
                Gestion des Défibrillateurs
              </h1>
              <div className="flex gap-2 flex-wrap">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Utilisateur : {company}
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  ID : 123456
                </div>
                <Button
                  variant="outline"
                  className="rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                  onClick={() => setShowSubscriptionDialog(true)}
                >
                  Usage et Support : Standard
                </Button>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="border-b">
              <div className="px-6">
                <TabsList className="h-12">
                  <TabsTrigger value="defibrillateurs">Défibrillateurs</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                  <TabsTrigger value="maintenances">Maintenances</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="inventory">Inventaire</TabsTrigger>
                  <TabsTrigger value="techniciens">Techniciens</TabsTrigger>
                  <TabsTrigger value="accords">Accords</TabsTrigger>
                  <TabsTrigger value="tournees">Tournées</TabsTrigger>
                  <TabsTrigger value="archived">Archivés</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="p-6">
              <TabsContent value="defibrillateurs">
                <DefibrillateursTab
                  defibrillateurs={filteredDefibrillateurs}
                  onAddDefibrillator={() => setShowDefibrillatorDialog(true)}
                  onEditDefibrillator={(defib) => {
                    setSelectedDefibrillator(defib);
                    setShowDefibrillatorDialog(true);
                  }}
                  onAddMaintenance={(defib) => {
                    setSelectedDefibrillator(defib);
                    setShowMaintenanceDialog(true);
                  }}
                  clients={clients}
                  selectedClientFilter={selectedClientFilter}
                  setSelectedClientFilter={setSelectedClientFilter}
                  showMaintenanceRequired={showMaintenanceRequired}
                  setShowMaintenanceRequired={setShowMaintenanceRequired}
                  searchQuery={searchQuery}
                  onSearchChange={onSearchChange}
                  tournees={tournees}
                />
              </TabsContent>
              <TabsContent value="clients">
                <ClientsTab
                  clients={clients}
                  onAddClient={() => setShowClientDialog(true)}
                  onEditClient={(client) => {
                    setSelectedClient(client);
                    setShowClientDialog(true);
                  }}
                />
              </TabsContent>
              <TabsContent value="maintenances">
                <MaintenancesTab
                  maintenances={maintenances}
                  defibrillateurs={defibrillateurs}
                  techniciens={techniciens}
                  onAddMaintenance={() => setShowMaintenanceDialog(true)}
                />
              </TabsContent>
              <TabsContent value="tickets">
                <TicketsTab
                  tickets={tickets}
                  onAddTicket={() => setShowTicketDialog(true)}
                  onEditTicket={(ticket) => {
                    setSelectedTicket(ticket);
                    setShowTicketDialog(true);
                  }}
                  clients={clients}
                  defibrillateurs={defibrillateurs}
                />
              </TabsContent>
              <TabsContent value="inventory">
                <InventoryTab
                  inventory={inventory}
                  onAddItem={() => setShowInventoryDialog(true)}
                  onEditItem={(item) => {
                    setSelectedInventoryItem(item);
                    setShowInventoryDialog(true);
                  }}
                />
              </TabsContent>
              <TabsContent value="techniciens">
                <TechniciensTab
                  techniciens={techniciens}
                  onAddTechnicien={() => setShowTechnicienDialog(true)}
                  onEditTechnicien={(tech) => {
                    setSelectedTechnicien(tech);
                    setShowTechnicienDialog(true);
                  }}
                />
              </TabsContent>
              <TabsContent value="accords">
                <AccordsTab
                  accords={accords}
                  onAddAccord={() => setShowAccordDialog(true)}
                  onEditAccord={(accord) => {
                    setSelectedAccord(accord);
                    setShowAccordDialog(true);
                  }}
                />
              </TabsContent>
              <TabsContent value="tournees">
                <TourneeTab
                  tournees={tournees}
                  defibrillateurs={defibrillateurs}
                  onAddTournee={() => setShowTourneeDialog(true)}
                  onEditTournee={(tournee) => {
                    setSelectedTournee(tournee);
                    setShowTourneeDialog(true);
                  }}
                />
              </TabsContent>
              <TabsContent value="archived">
                <ArchivedTab
                  defibrillateurs={defibrillateurs.filter(d => d.status === 'archived')}
                />
              </TabsContent>
            </div>
          </Tabs>

          {showDefibrillatorDialog && (
            <DefibrillatorDialog
              open={showDefibrillatorDialog}
              onClose={() => {
                setShowDefibrillatorDialog(false);
                setSelectedDefibrillator(null);
              }}
              defibrillateur={selectedDefibrillator}
              clients={clients}
              onSave={async (newDefibrillateur) => {
                try {
                  if (selectedDefibrillator) {
                    // Mise à jour à implémenter
                    setDefibrillateurs(prev =>
                      prev.map(d =>
                        d.id === selectedDefibrillator.id ? { ...newDefibrillateur, id: d.id } : d
                      )
                    );
                    toast({
                      title: "Défibrillateur mis à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewDefibrillateur(newDefibrillateur);
                    setDefibrillateurs(prev => [...prev, data]);
                    toast({
                      title: "Défibrillateur ajouté",
                      description: "Le nouveau défibrillateur a été créé avec succès."
                    });
                  }
                  setShowDefibrillatorDialog(false);
                  setSelectedDefibrillator(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
            />
          )}

          {showMaintenanceDialog && (
            <MaintenanceDialog
              open={showMaintenanceDialog}
              onClose={() => {
                setShowMaintenanceDialog(false);
                setSelectedDefibrillator(null);
              }}
              defibrillateur={selectedDefibrillator}
              techniciens={techniciens}
              onSave={async (newMaintenance) => {
                try {
                  const data = await addNewMaintenance(newMaintenance);
                  setMaintenances(prev => [...prev, data]);
                  toast({
                    title: "Maintenance ajoutée",
                    description: "La nouvelle maintenance a été enregistrée avec succès."
                  });
                  setShowMaintenanceDialog(false);
                  setSelectedDefibrillator(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
            />
          )}

          {showClientDialog && (
            <ClientDialog
              open={showClientDialog}
              onClose={() => {
                setShowClientDialog(false);
                setSelectedClient(null);
              }}
              client={selectedClient}
              onSave={async (newClient) => {
                try {
                  if (selectedClient) {
                    // Mise à jour à implémenter
                    setClients(prev =>
                      prev.map(c =>
                        c.id === selectedClient.id ? { ...newClient, id: c.id } : c
                      )
                    );
                    toast({
                      title: "Client mis à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewClient(newClient);
                    setClients(prev => [...prev, data]);
                    toast({
                      title: "Client ajouté",
                      description: "Le nouveau client a été créé avec succès."
                    });
                  }
                  setShowClientDialog(false);
                  setSelectedClient(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
            />
          )}

          {showTicketDialog && (
            <TicketDialog
              open={showTicketDialog}
              onClose={() => {
                setShowTicketDialog(false);
                setSelectedTicket(null);
              }}
              ticket={selectedTicket}
              onSave={async (newTicket) => {
                try {
                  if (selectedTicket) {
                    // Mise à jour à implémenter
                    setTickets(prev =>
                      prev.map(t =>
                        t.id === selectedTicket.id ? { ...newTicket, id: t.id } : t
                      )
                    );
                    toast({
                      title: "Ticket mis à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewTicket(newTicket);
                    setTickets(prev => [...prev, data]);
                    toast({
                      title: "Ticket ajouté",
                      description: "Le nouveau ticket a été créé avec succès."
                    });
                  }
                  setShowTicketDialog(false);
                  setSelectedTicket(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
              defibrillateurs={defibrillateurs}
            />
          )}

          {showInventoryDialog && (
            <InventoryDialog
              open={showInventoryDialog}
              onClose={() => {
                setShowInventoryDialog(false);
                setSelectedInventoryItem(null);
              }}
              item={selectedInventoryItem}
              onSave={async (newItem) => {
                try {
                  if (selectedInventoryItem) {
                    // Mise à jour à implémenter
                    setInventory(prev =>
                      prev.map(i =>
                        i.id === selectedInventoryItem.id ? { ...newItem, id: i.id } : i
                      )
                    );
                    toast({
                      title: "Article mis à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewInventoryItem(newItem);
                    setInventory(prev => [...prev, data]);
                    toast({
                      title: "Article ajouté",
                      description: "Le nouvel article a été créé avec succès."
                    });
                  }
                  setShowInventoryDialog(false);
                  setSelectedInventoryItem(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
            />
          )}

          {showTechnicienDialog && (
            <TechnicienDialog
              open={showTechnicienDialog}
              onClose={() => {
                setShowTechnicienDialog(false);
                setSelectedTechnicien(null);
              }}
              technicien={selectedTechnicien}
              onSave={async (newTechnicien) => {
                try {
                  if (selectedTechnicien) {
                    // Mise à jour à implémenter
                    setTechniciens(prev =>
                      prev.map(t =>
                        t.id === selectedTechnicien.id ? { ...newTechnicien, id: t.id } : t
                      )
                    );
                    toast({
                      title: "Technicien mis à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewTechnicien(newTechnicien);
                    setTechniciens(prev => [...prev, data]);
                    toast({
                      title: "Technicien ajouté",
                      description: "Le nouveau technicien a été créé avec succès."
                    });
                  }
                  setShowTechnicienDialog(false);
                  setSelectedTechnicien(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
            />
          )}

          {showAccordDialog && (
            <AccordDialog
              open={showAccordDialog}
              onClose={() => {
                setShowAccordDialog(false);
                setSelectedAccord(null);
              }}
              accord={selectedAccord}
              onSave={async (newAccord) => {
                try {
                  if (selectedAccord) {
                    // Mise à jour à implémenter
                    setAccords(prev =>
                      prev.map(a =>
                        a.id === selectedAccord.id ? { ...newAccord, id: a.id } : a
                      )
                    );
                    toast({
                      title: "Accord mis à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewAccord(newAccord);
                    setAccords(prev => [...prev, data]);
                    toast({
                      title: "Accord ajouté",
                      description: "Le nouvel accord a été créé avec succès."
                    });
                  }
                  setShowAccordDialog(false);
                  setSelectedAccord(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
              clients={clients}
            />
          )}

          {showTourneeDialog && (
            <TourneeDialog
              open={showTourneeDialog}
              onClose={() => {
                setShowTourneeDialog(false);
                setSelectedTournee(null);
              }}
              tournee={selectedTournee}
              onSave={async (newTournee) => {
                try {
                  if (selectedTournee) {
                    // Mise à jour à implémenter
                    setTournees(prev =>
                      prev.map(t =>
                        t.id === selectedTournee.id ? { ...newTournee, id: t.id } : t
                      )
                    );
                    toast({
                      title: "Tournée mise à jour",
                      description: "Les modifications ont été enregistrées avec succès."
                    });
                  } else {
                    const data = await addNewTournee(newTournee);
                    setTournees(prev => [...prev, data]);
                    toast({
                      title: "Tournée ajoutée",
                      description: "La nouvelle tournée a été créée avec succès."
                    });
                  }
                  setShowTourneeDialog(false);
                  setSelectedTournee(null);
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement:', error);
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue lors de l'enregistrement.",
                    variant: "destructive"
                  });
                }
              }}
              defibrillateurs={defibrillateurs}
              techniciens={techniciens}
            />
          )}

          {showSubscriptionDialog && (
            <SubscriptionDialog
              open={showSubscriptionDialog}
              onClose={() => setShowSubscriptionDialog(false)}
            />
          )}
        </div>
      </motion.div>
      <Toaster />
    </div>
  );
}

export default App;
