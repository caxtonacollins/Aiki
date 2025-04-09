"use client"

import { User } from "@/types";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export const usePrivyAuth = () => {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    unlinkWallet,
  } = usePrivy();
  const { wallets } = useWallets();
  const [formattedAddress, setFormattedAddress] = useState<string>("");

  console.log("User data:", user);

  useEffect(() => {
    if (authenticated && wallets.length > 0) {
      const mainWallet = wallets[0];
      const address = mainWallet.address;
      // Format the address to show the first 6 and last 4 characters
      if (address) {
        const formatted = `${address.substring(0, 6)}...${address.substring(
          address.length - 4
        )}`;
        setFormattedAddress(formatted);
      }
    }
  }, [authenticated, wallets]);

  const getUserEmail = (): string => {
    if (!user?.email) return "";
    // Handle both string and object email types
    return typeof user.email === "string" ? user.email : user.email.address;
  };

  // Transform the Privy user to your User type
  const transformedUser: User | null = user
    ? {
        email: getUserEmail(),
        // avatarUrl: user?.picture || "",
      }
    : null;

  return {
    ready,
    authenticated,
    user: transformedUser,
    wallets,
    formattedAddress,
    login,
    logout,
    linkWallet,
    unlinkWallet,
  };
};
