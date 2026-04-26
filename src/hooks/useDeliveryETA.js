import { useState, useEffect } from 'react';
import { addMinutes, format } from 'date-fns';

/**
 * Hook to simulate and format delivery ETA
 * @param {Date} placedAt 
 * @param {number} initialMinutes 
 */
export const useDeliveryETA = (placedAt, initialMinutes = 25) => {
  const [eta, setEta] = useState(null);

  useEffect(() => {
    if (!placedAt) return;
    
    const deliveryTime = addMinutes(new Date(placedAt), initialMinutes);
    setEta(format(deliveryTime, 'h:mm a'));
  }, [placedAt, initialMinutes]);

  return eta;
};
