"use client";

import { useState, useCallback } from "react";

type WalletType = "braavos" | "argent" | "okx";
type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface WalletState {
  wallet: WalletType | null;
  address: string | null;
  email: string | null;
  status: ConnectionStatus;
  error: string | null;
}

export const useWalletConnection = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    wallet: null,
    address: null,
    email: null,
    status: "disconnected",
    error: null,
  });

  const connectWallet = useCallback(
    async (walletType: WalletType, email: string, password: string) => {
      try {
        setWalletState((prev) => ({
          ...prev,
          status: "connecting",
          error: null,
        }));

        // Simulate connection delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock successful connection
        const mockAddress = `0x${Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("")}`;

        setWalletState({
          wallet: walletType,
          address: mockAddress,
          email: email,
          status: "connected",
          error: null,
        });

        return true;
      } catch (error) {
        setWalletState((prev) => ({
          ...prev,
          status: "error",
          error:
            error instanceof Error ? error.message : "Failed to connect wallet",
        }));
        return false;
      }
    },
    []
  );

  const disconnectWallet = useCallback(() => {
    setWalletState({
      wallet: null,
      address: null,
      email: null,
      status: "disconnected",
      error: null,
    });
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    isConnecting: walletState.status === "connecting",
    isConnected: walletState.status === "connected",
    hasError: walletState.status === "error",
  };
};

export type { WalletType, ConnectionStatus };
