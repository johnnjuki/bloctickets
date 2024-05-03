import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/blockchain/config";

import Web3ModalProvider from "@/context/web3modal";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Ticketopia",
  description: "Ticketing system for Web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth`}>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
        <Toaster />
      </body>
    </html>
  );
}
