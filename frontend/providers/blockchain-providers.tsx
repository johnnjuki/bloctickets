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
//   appName: "BlocTickets",
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
import { celo, celoAlfajores } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import Connector from "@/components/connector";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "BlocTickets",
    projectId: "97712fd9a052670ee82d4a078462ba99",
  },
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

export function BlockchainProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {/* TODO */}
          {/* <Connector> */}
            {children}
            {/* </Connector> */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
