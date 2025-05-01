
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DefibrillatorForm({ onSubmit, clients, initialData = null }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* SECTION INFORMATIONS CLÉS */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informations clés</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="miniCode">MiniCode</Label>
            <Input 
              id="miniCode" 
              name="miniCode" 
              maxLength="4" 
              pattern="[0-9]{2}[A-Za-z]{2}"
              title="Format: 2 chiffres suivis de 2 lettres"
              defaultValue={initialData?.miniCode}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serialNumber">Numéro de série</Label>
            <Input 
              id="serialNumber" 
              name="serialNumber" 
              defaultValue={initialData?.serialNumber}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortTitle">Titre court</Label>
            <Input 
              id="shortTitle" 
              name="shortTitle" 
              defaultValue={initialData?.shortTitle}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <select 
              name="status" 
              id="status" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.status || "En fonction"}
              required
            >
              <option value="En fonction">En fonction</option>
              <option value="Maintenance requise">Maintenance requise</option>
              <option value="Nouveau">Nouveau</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Modèle</Label>
            <select 
              name="model" 
              id="model" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.model}
              required
            >
              <option value="Abc123">Abc123</option>
              <option value="Efg456">Efg456</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufacturingDate">Date fabrication</Label>
            <Input 
              type="date" 
              id="manufacturingDate" 
              name="manufacturingDate" 
              defaultValue={initialData?.manufacturingDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warrantyEnd">Date fin garantie</Label>
            <Input 
              type="date" 
              id="warrantyEnd" 
              name="warrantyEnd" 
              defaultValue={initialData?.warrantyEnd}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="installationDate">Date mise en service</Label>
            <Input 
              type="date" 
              id="installationDate" 
              name="installationDate" 
              defaultValue={initialData?.installationDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastMaintenanceDate">Date dernière maintenance</Label>
            <Input 
              type="date" 
              id="lastMaintenanceDate" 
              name="lastMaintenanceDate" 
              defaultValue={initialData?.lastMaintenanceDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nextMaintenanceDate">Date prochaine maintenance</Label>
            <Input 
              type="date" 
              id="nextMaintenanceDate" 
              name="nextMaintenanceDate" 
              defaultValue={initialData?.nextMaintenanceDate}
              required 
            />
          </div>
        </div>
      </div>

      {/* SECTION CLIENT */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Client</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <select 
              name="client" 
              id="client" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.client}
              required
            >
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="site">Site</Label>
            <Input 
              id="site" 
              name="site" 
              defaultValue={initialData?.site}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openingDays">Jours d'ouverture</Label>
            <select 
              name="openingDays" 
              id="openingDays" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.openingDays}
              required
            >
              <option value="Lundi à vendredi">Lundi à vendredi</option>
              <option value="Mardi à Samedi">Mardi à Samedi</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="openingHours">Horaires</Label>
            <select 
              name="openingHours" 
              id="openingHours" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.openingHours}
              required
            >
              <option value="9h à 18h">9h à 18h</option>
              <option value="8h à 12h - 14h à 17h">8h à 12h - 14h à 17h</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siret">SIRET du site</Label>
            <Input 
              id="siret" 
              name="siret" 
              defaultValue={initialData?.siret}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Rue</Label>
            <Input 
              id="street" 
              name="street" 
              defaultValue={initialData?.street}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input 
              id="city" 
              name="city" 
              defaultValue={initialData?.city}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Code postal</Label>
            <Input 
              id="postalCode" 
              name="postalCode" 
              defaultValue={initialData?.postalCode}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input 
              id="country" 
              name="country" 
              defaultValue={initialData?.country || "France"}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName">Identité du contact site</Label>
            <Input 
              id="contactName" 
              name="contactName" 
              defaultValue={initialData?.contactName}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Tel du contact site</Label>
            <Input 
              id="contactPhone" 
              name="contactPhone" 
              type="tel"
              defaultValue={initialData?.contactPhone}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Mail du contact site</Label>
            <Input 
              id="contactEmail" 
              name="contactEmail" 
              type="email"
              defaultValue={initialData?.contactEmail}
              required 
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="locationNotes">Observation emplacement</Label>
            <textarea
              id="locationNotes"
              name="locationNotes"
              className="w-full rounded-md border p-2 min-h-[100px]"
              defaultValue={initialData?.locationNotes}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="geoStatus">Statut GÉO DAE</Label>
            <select 
              name="geoStatus" 
              id="geoStatus" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.geoStatus}
              required
            >
              <option value="Enregistré">Enregistré</option>
              <option value="Ne pas enregistrer">Ne pas enregistrer</option>
              <option value="En enregistrement">En enregistrement</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION ÉLECTRODES MIXTE OU ADULTE */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Électrodes mixte ou adulte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="adultElectrodesLot">Numéro de lot</Label>
            <Input 
              id="adultElectrodesLot" 
              name="adultElectrodesLot" 
              defaultValue={initialData?.adultElectrodesLot}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adultElectrodesInsertionDate">Date insertion</Label>
            <Input 
              type="date" 
              id="adultElectrodesInsertionDate" 
              name="adultElectrodesInsertionDate" 
              defaultValue={initialData?.adultElectrodesInsertionDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adultElectrodesExpiryDate">Date péremption</Label>
            <Input 
              type="date" 
              id="adultElectrodesExpiryDate" 
              name="adultElectrodesExpiryDate" 
              defaultValue={initialData?.adultElectrodesExpiryDate}
              required 
            />
          </div>
        </div>
      </div>

      {/* SECTION ÉLECTRODES PÉDIATRIQUE */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Électrodes pédiatrique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pediatricElectrodesLot">Numéro de lot</Label>
            <Input 
              id="pediatricElectrodesLot" 
              name="pediatricElectrodesLot" 
              defaultValue={initialData?.pediatricElectrodesLot}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pediatricElectrodesInsertionDate">Date insertion</Label>
            <Input 
              type="date" 
              id="pediatricElectrodesInsertionDate" 
              name="pediatricElectrodesInsertionDate" 
              defaultValue={initialData?.pediatricElectrodesInsertionDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pediatricElectrodesExpiryDate">Date péremption</Label>
            <Input 
              type="date" 
              id="pediatricElectrodesExpiryDate" 
              name="pediatricElectrodesExpiryDate" 
              defaultValue={initialData?.pediatricElectrodesExpiryDate}
              required 
            />
          </div>
        </div>
      </div>

      {/* SECTION BATTERIE */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Batterie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="batteryLot">Numéro de lot</Label>
            <Input 
              id="batteryLot" 
              name="batteryLot" 
              defaultValue={initialData?.batteryLot}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batteryInsertionDate">Date insertion</Label>
            <Input 
              type="date" 
              id="batteryInsertionDate" 
              name="batteryInsertionDate" 
              defaultValue={initialData?.batteryInsertionDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batteryExpiryDate">Date péremption</Label>
            <Input 
              type="date" 
              id="batteryExpiryDate" 
              name="batteryExpiryDate" 
              defaultValue={initialData?.batteryExpiryDate}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batteryPercentage">Pourcentage au dernier passage</Label>
            <Input 
              type="number" 
              id="batteryPercentage" 
              name="batteryPercentage" 
              min="0" 
              max="99"
              defaultValue={initialData?.batteryPercentage}
              required 
            />
          </div>
        </div>
      </div>

      {/* SECTION BOITIER MURAL */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Boitier mural</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cabinetModel">Modèle</Label>
            <select 
              name="cabinetModel" 
              id="cabinetModel" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.cabinetModel}
              required
            >
              <option value="HIJ123">HIJ123</option>
              <option value="KLM456">KLM456</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cabinetObservation">Observation boitier mural</Label>
            <Input 
              id="cabinetObservation" 
              name="cabinetObservation" 
              defaultValue={initialData?.cabinetObservation}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cabinetReference">Référence</Label>
            <Input 
              id="cabinetReference" 
              name="cabinetReference" 
              defaultValue={initialData?.cabinetReference}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signage">Signalétique</Label>
            <select 
              name="signage" 
              id="signage" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.signage}
              required
            >
              <option value="Conforme">Conforme</option>
              <option value="Non conforme">Non conforme</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION INVENTAIRE DU KIT */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Inventaire du kit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="scissors">Paire de ciseaux</Label>
            <select 
              name="scissors" 
              id="scissors" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.scissors}
              required
            >
              <option value="present">Présent</option>
              <option value="missing">Manquant</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mask">Masque</Label>
            <select 
              name="mask" 
              id="mask" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.mask}
              required
            >
              <option value="present">Présent</option>
              <option value="missing">Manquant</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="absorbentTowels">Serviettes absorbantes</Label>
            <select 
              name="absorbentTowels" 
              id="absorbentTowels" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.absorbentTowels}
              required
            >
              <option value="present">Présent</option>
              <option value="missing">Manquant</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gloves">Gants</Label>
            <select 
              name="gloves" 
              id="gloves" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.gloves}
              required
            >
              <option value="present">Présent</option>
              <option value="missing">Manquant</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wipes">Lingettes</Label>
            <select 
              name="wipes" 
              id="wipes" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.wipes}
              required
            >
              <option value="present">Présent</option>
              <option value="missing">Manquant</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="razor">Rasoir</Label>
            <select 
              name="razor" 
              id="razor" 
              className="w-full rounded-md border p-2"
              defaultValue={initialData?.razor}
              required
            >
              <option value="present">Présent</option>
              <option value="missing">Manquant</option>
            </select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="kitObservation">Observation</Label>
            <textarea
              id="kitObservation"
              name="kitObservation"
              className="w-full rounded-md border p-2 min-h-[100px]"
              defaultValue={initialData?.kitObservation}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full md:w-auto">
        {initialData ? "Mettre à jour" : "Ajouter"} le défibrillateur
      </Button>
    </form>
  );
}

export default DefibrillatorForm;
