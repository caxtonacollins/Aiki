"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomWalletModal } from "@/components/wallet/CustomWalletModal";
import { ThemeToggle } from "@/components/Toggletheme";

export default function CustomWalletDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [walletIcon, setWalletIcon] = useState<string | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConnect = () => {
    setIsModalOpen(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setEmail(null);
    setWalletName(null);
    setWalletIcon(null);
  };

  const handleComplete = (data: {
    address: string;
    email: string;
    walletName: string;
    walletIcon: string;
  }) => {
    setWalletAddress(data.address);
    setEmail(data.email);
    setWalletName(data.walletName);
    setWalletIcon(data.walletIcon);
    setIsConnected(true);
  };

  return (
    <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-lg flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Custom Wallet Modal</h1>
        <ThemeToggle />
      </div>

      {!isConnected ? (
        <>
          <div className="text-center mb-8 max-w-lg">
            <p className="mb-6 text-muted-foreground">
              This demo shows a custom wallet modal with light and dark mode
              support. You can select a wallet, verify your email, and set up a
              password.
            </p>
            <Button size="lg" onClick={handleConnect}>
              Connect Wallet
            </Button>
          </div>

          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                This modal showcases the following features:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Light and dark mode support (try the toggle in the top right)
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                List of wallets with icons and descriptions
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Email verification step
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Password creation with confirmation
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Success screen showing connection details
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connected Wallet</CardTitle>
            <CardDescription>
              Your wallet is successfully connected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {walletName && walletIcon && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Wallet Type</p>
                <div className="flex items-center gap-2">
                  <img
                    src={walletIcon}
                    alt={walletName}
                    className="h-5 w-5 object-contain"
                  />
                  <p className="text-sm text-muted-foreground">{walletName}</p>
                </div>
              </div>
            )}

            {email && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            )}

            {walletAddress && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {walletAddress}
                </p>
              </div>
            )}

            <Button
              variant="destructive"
              className="w-full mt-4"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </CardContent>
        </Card>
      )}

      <CustomWalletModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onComplete={handleComplete}
      />
    </div>
  );
}
