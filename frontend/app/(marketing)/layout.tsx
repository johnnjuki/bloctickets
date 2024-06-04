"use client";

import React, { useEffect, useState } from 'react';
import { useMinipay } from '../hooks/useMinipay';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMinipay = useMinipay();

  if (isMinipay) {
    return <p>YES</p>
  } else {
    return <p>NO</p>
  }


}
