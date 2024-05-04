import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { BlockchainProviders } from "@/providers/blockchain-providers";
import { ThemeProvider } from "@/providers/theme-provider";

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
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth`}>
        <ThemeProvider
          forcedTheme="light"
          defaultTheme="light"
          enableSystem={false}
        >
          <BlockchainProviders>{children}</BlockchainProviders>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
