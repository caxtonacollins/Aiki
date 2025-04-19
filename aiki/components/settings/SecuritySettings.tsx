import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import { useAccount, useDisconnect } from "wagmi";
import { getUserData } from "@/lib/user-storage";
import { CustomWalletModal } from "@/components/wallet/CustomWalletModal";

interface Wallet {
  address: string;
  walletClientType: string;
}

const SecuritySettings = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const userData = address ? getUserData(address) : null;

  // Create wallets array from address
  const wallets: Wallet[] = address
    ? [
        {
          address: address,
          walletClientType: userData?.walletName || "Wallet",
        },
      ]
    : [];

  const handleLinkWallet = () => {
    setShowWalletModal(true);
  };

  const handleWalletDisconnect = (address: string) => {
    disconnect();
    toast("Wallet disconnected", {
      description: `Wallet ${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )} has been disconnected.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Connected Wallets</h3>
        <div className="space-y-4">
          {wallets.length > 0 ? (
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <Card key={wallet.address} className="bg-card">
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">
                          {wallet.walletClientType}
                        </CardTitle>
                        <Badge variant="secondary">Primary</Badge>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleWalletDisconnect(wallet.address)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm font-mono text-muted-foreground">
                      {wallet.address}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg bg-secondary/30">
              <p className="text-muted-foreground mb-4">
                No wallets connected yet
              </p>
              <Button onClick={handleLinkWallet}>Connect Wallet</Button>
            </div>
          )}

          {wallets.length > 0 && (
            <Button
              onClick={handleLinkWallet}
              variant="outline"
              className="w-full"
            >
              Connect Another Wallet
            </Button>
          )}
        </div>
      </div>

      {showWalletModal && (
        <CustomWalletModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onComplete={() => setShowWalletModal(false)}
        />
      )}

      <div className="pt-6 border-t">
        <h3 className="text-lg font-medium mb-4">Account Security</h3>
        <Card className="bg-card/50">
          <CardHeader className="py-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">
                Two-Factor Authentication
              </CardTitle>
            </div>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardFooter className="pb-3 pt-0">
            <Button
              variant="outline"
              onClick={() => {
                toast("Coming Soon", {
                  description:
                    "Two-factor authentication will be available soon.",
                });
              }}
            >
              Enable 2FA
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;
