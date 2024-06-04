// hooks/useMinipay.ts
import { useEffect, useState } from 'react';

export const useMinipay = (): boolean => {
  const [isMinipay, setIsMinipay] = useState(false);

  useEffect(() => {
    // Check if the browser is Opera and contains a specific Minipay marker
    const userAgent = navigator.userAgent;
    const isOpera = userAgent.indexOf('OPR') > -1;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    if (isOpera && isMobile) {
      setIsMinipay(true);
    }
  }, []);

  return isMinipay;
};
