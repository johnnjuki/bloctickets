"use client";

import React, { useEffect, useState } from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEthereumAvailable, setIsEthereumAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      if (window.ethereum.isMinipay) {

        setIsEthereumAvailable(false);
      }
    }
  }, []);

  if (isEthereumAvailable) {
    return <div>YES</div>;
  }

  return <div>NO</div>

  // return <>{children}</>;
}
