// hooks/useMinipay.ts
import { useEffect, useState } from 'react';

export const useMinipay = (): boolean => {
  const [isMinipay, setIsMinipay] = useState(false);

  useEffect(() => {
    // Check if the browser is Opera and contains a specific Minipay marker
    const userAgent = navigator.userAgent;
    const isOpera = userAgent.indexOf('OPR') > -1;
    if (isOpera) {
      setIsMinipay(true);
    }
  }, []);

  return isMinipay;
};
