// "use client";

// import * as React from "react";
// import {
//   RainbowKitProvider,
//   getDefaultWallets,
//   getDefaultConfig,
// } from "@rainbow-me/rainbowkit";
// import {
//   argentWallet,
//   trustWallet,
//   ledgerWallet,
// } from "@rainbow-me/rainbowkit/wallets";
// import { celoAlfajores } from "wagmi/chains";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { WagmiProvider } from "wagmi";

// const { wallets } = getDefaultWallets();

// const projectId = "97712fd9a052670ee82d4a078462ba99";

// if (!projectId) throw new Error("Project ID is not defined");

// const config = getDefaultConfig({
//   appName: "Ticketopia",
//   projectId: projectId,
//   wallets: [
//     ...wallets,
//     {
//       groupName: "Other",
//       wallets: [argentWallet, trustWallet, ledgerWallet],
//     },
//   ],
//   chains: [celoAlfajores],
//   ssr: true,
// });

// const queryClient = new QueryClient();

// export function BlockchainProviders({ children }: { children: React.ReactNode }) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>{children}</RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { WagmiProvider, createConfig, http, useConnect } from "wagmi";
import { mainnet, sepolia, celo, celoAlfajores } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import Connector from "@/components/connector";

export function BlockchainProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = createConfig({
    chains: [celoAlfajores],
    connectors: [injected()],
    transports: {
      [celoAlfajores.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Connector>
          {children}
          </Connector>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
