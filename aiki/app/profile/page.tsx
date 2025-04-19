"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUserData } from "@/lib/user-storage";
import { CustomWalletModal } from "@/components/wallet/CustomWalletModal";
import AvatarImg from "@/public/avata.jpg";

const Profile = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const userData = address ? getUserData(address) : null;
  const router = useRouter();

  // Format address for display
  const formattedAddress = address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : "";

  // Create a wallet array from user data
  const wallets = address
    ? [
        {
          address: address,
          walletClientType: userData?.walletName || "Wallet",
        },
      ]
    : [];

  const getUserRole = () => {
    if (userData?.role) return userData.role;
    return "Student"; // Default role
  };

  // Handle wallet connection
  const linkWallet = () => {
    setShowWalletModal(true);
  };

  // Handle logout
  const logout = () => {
    disconnect();
    router.push("/");
  };

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected && !address) {
      router.push("/");
    }
  }, [isConnected, address, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary/10 p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-24 w-24  border-2 border-sky-400">
                <AvatarImage src={AvatarImg.src} className="rounded-full" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {userData?.email?.charAt(0).toUpperCase() || "AK"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-2xl font-bold">
                  {userData?.email || "User"}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="font-medium">
                    {getUserRole()}
                  </Badge>
                  <Badge variant="secondary" className="font-medium">
                    {formattedAddress}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2">
                  Member since {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </h3>
                  <p>{userData?.email || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Role
                  </h3>
                  <p>{getUserRole()}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Connected Wallets
                </h3>
                {wallets.length > 0 ? (
                  <div className="space-y-3">
                    {wallets.map((wallet) => (
                      <div
                        key={wallet.address}
                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {wallet.walletClientType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {wallet.address}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={linkWallet}
                      variant="outline"
                      className="mt-2"
                    >
                      Connect Another Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-secondary/30 rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      No wallets connected yet
                    </p>
                    <Button onClick={linkWallet}>Connect Wallet</Button>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button onClick={logout} variant="destructive">
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Wallet Connection Modal */}
      <CustomWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onComplete={() => setShowWalletModal(false)}
      />
    </div>
  );
};

export default Profile;
