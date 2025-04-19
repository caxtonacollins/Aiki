"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { arbitrum } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

interface WagmiProviderProps {
  children: React.ReactNode;
}

export function CustomWagmiProvider({ children }: WagmiProviderProps) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  // const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
  }

  const config = createConfig({
    chains: [arbitrum],
    connectors: [walletConnect({ projectId }), metaMask()],
    transports: {
      [arbitrum.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}