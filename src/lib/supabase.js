
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iauwsoojdjglcqmxeutt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdXdzb29qZGpnbGNxbXhldXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTczMTksImV4cCI6MjA2MTY3MzMxOX0.9FKrYwVnw0GxvLSVejq2USsc9Yv8TzL9doVtM5qEn9E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonctions pour les clients
export async function addNewClient(clientData) {
  const { data, error } = await supabase
    .from('clients')
    .insert([{
      name: clientData.name,
      address: clientData.address,
      contact: clientData.contact,
      phone: clientData.phone,
      email: clientData.email
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour les défibrillateurs
export async function addNewDefibrillateur(defibrillatorData) {
  // Formatage des dates
  const formattedData = {
    mini_code: defibrillatorData.miniCode,
    serial_number: defibrillatorData.serialNumber,
    short_title: defibrillatorData.shortTitle,
    status: defibrillatorData.status,
    model: defibrillatorData.model,
    manufacturing_date: defibrillatorData.manufacturingDate,
    warranty_end: defibrillatorData.warrantyEnd,
    installation_date: defibrillatorData.installationDate,
    last_maintenance_date: defibrillatorData.lastMaintenanceDate,
    next_maintenance_date: defibrillatorData.nextMaintenanceDate,
    client_id: defibrillatorData.client,
    site: defibrillatorData.site,
    opening_days: defibrillatorData.openingDays,
    opening_hours: defibrillatorData.openingHours,
    siret: defibrillatorData.siret,
    street: defibrillatorData.street,
    city: defibrillatorData.city,
    postal_code: defibrillatorData.postalCode,
    country: defibrillatorData.country,
    contact_name: defibrillatorData.contactName,
    contact_phone: defibrillatorData.contactPhone,
    contact_email: defibrillatorData.contactEmail,
    location_notes: defibrillatorData.locationNotes,
    geo_status: defibrillatorData.geoStatus
  };

  const { data, error } = await supabase
    .from('defibrillateurs')
    .insert([formattedData])
    .select()
    .single();

  if (error) {
    console.error('Erreur Supabase:', error);
    throw error;
  }
  return data;
}

export async function getDefibrillateurs() {
  const { data, error } = await supabase
    .from('defibrillateurs')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour les techniciens
export async function addNewTechnicien(technicienData) {
  const { data, error } = await supabase
    .from('techniciens')
    .insert([{
      name: technicienData.name,
      first_name: technicienData.firstName,
      zone: technicienData.zone
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTechniciens() {
  const { data, error } = await supabase
    .from('techniciens')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour l'inventaire
export async function addNewInventoryItem(itemData) {
  const { data, error } = await supabase
    .from('inventory')
    .insert([{
      type: itemData.type,
      reference: itemData.reference,
      serial_number: itemData.serialNumber,
      quantity: parseInt(itemData.quantity) || 0
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getInventory() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour les tickets
export async function addNewTicket(ticketData) {
  const { data, error } = await supabase
    .from('tickets')
    .insert([{
      defibrillateur_id: ticketData.defibrillateur,
      type: ticketData.type,
      description: ticketData.description,
      priority: ticketData.priority,
      status: ticketData.status || 'open'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTickets() {
  const { data, error } = await supabase
    .from('tickets')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour les maintenances
export async function addNewMaintenance(maintenanceData) {
  const { data, error } = await supabase
    .from('maintenances')
    .insert([{
      defibrillateur_id: maintenanceData.defibrillateur,
      technicien_id: maintenanceData.technicien,
      date: maintenanceData.date,
      notes: maintenanceData.notes
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMaintenances() {
  const { data, error } = await supabase
    .from('maintenances')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour les accords
export async function addNewAccord(accordData) {
  const { data, error } = await supabase
    .from('accords')
    .insert([{
      client_id: accordData.client,
      type: accordData.type,
      start_date: accordData.startDate,
      end_date: accordData.endDate
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAccords() {
  const { data, error } = await supabase
    .from('accords')
    .select('*');

  if (error) throw error;
  return data;
}

// Fonctions pour les tournées
export async function addNewTournee(tourneeData) {
  const { data, error } = await supabase
    .from('tournees')
    .insert([{
      name: tourneeData.name,
      technicien_id: tourneeData.technicien,
      date: tourneeData.date,
      defibrillateurs: tourneeData.defibrillateurs
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTournees() {
  const { data, error } = await supabase
    .from('tournees')
    .select('*');

  if (error) throw error;
  return data;
}
