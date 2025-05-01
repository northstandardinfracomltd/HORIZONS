
export const isDateCritical = (date) => {
  if (!date) return false;
  const today = new Date();
  const checkDate = new Date(date);
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  return checkDate <= threeMonthsFromNow;
};

export const needsMaintenance = (defibrillateur) => {
  return (
    defibrillateur.status === 'Maintenance requise' ||
    isDateCritical(defibrillateur.nextMaintenanceDate) ||
    isDateCritical(defibrillateur.warrantyEnd) ||
    isDateCritical(defibrillateur.adultElectrodesExpiryDate) ||
    isDateCritical(defibrillateur.pediatricElectrodesExpiryDate) ||
    isDateCritical(defibrillateur.batteryExpiryDate)
  );
};
