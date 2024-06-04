import { useEffect, useState } from 'react';

export const useMinipay = (): boolean => {
  const [isMinipay, setIsMinipay] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setIsMinipay(/Minipay/i.test(userAgent));
  }, []);

  return isMinipay;
};
