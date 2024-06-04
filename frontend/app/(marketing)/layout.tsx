"use client";

import React, { useEffect, useState } from 'react';
import { useMinipay } from '../hooks/useMinipay';

function isOperaMobile() {
  const userAgent = navigator.userAgent;
  const isOpera = userAgent.indexOf('OPR') > -1;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  return isOpera && isMobile;
}


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isMinipay = useMinipay();

  if (isOperaMobile()) {
    return <p>YES</p>
  } else {
    return <p>NO</p>
  }

}
