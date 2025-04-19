"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronRight, Loader2, Wallet } from "lucide-react";
import { useConnect, useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  getUserData,
  hasConnectedBefore,
  saveUserData,
  UserData,
} from "@/lib/user-storage";

// Wallet download URLs
const walletDownloadUrls: Record<string, string> = {
  metaMask: "https://metamask.io/download/",
  walletConnect: "https://walletconnect.com/",
  coinbase: "https://www.coinbase.com/wallet/downloads",
  brave: "https://brave.com/wallet/",
  argent: "https://www.argent.xyz/download/",
  rainbow: "https://rainbow.me/",
  trust: "https://trustwallet.com/download",
  okx: "https://www.okx.com/web3",
  imToken: "https://token.im/download",
  bybit: "https://www.bybit.com/download",
};

type Step =
  | "selectWallet"
  | "verifyEmail"
  | "createPassword"
  | "selectRole"
  | "success";

interface Wallet {
  id: string;
  name: string;
  icon: string;
}

interface CustomWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: {
    address: string;
    email: string;
    walletName: string;
    walletIcon: string;
    role: string;
  }) => void;
}

// Use React.memo to prevent unnecessary re-renders
export const CustomWalletModal = React.memo(function CustomWalletModal({
  isOpen,
  onClose,
  onComplete,
}: CustomWalletModalProps) {
  const [step, setStep] = useState<Step>("selectWallet");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"admin" | "instructor" | "student">(
    "student"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Only get these values if the modal is open
  const { connectors, connectAsync } = useConnect();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // Check if user has connected before
  useEffect(() => {
    if (!isOpen) return; // Skip effect if modal is closed

    if (address && isConnected) {
      const userData = getUserData(address);
      if (userData && userData.isOnboarded) {
        // User has completed onboarding before, redirect to dashboard
        router.push(`/dashboard/${userData.role}`);
        onClose();
      }
    }
  }, [address, isConnected, router, onClose, isOpen]);

  // Create a stable version of the connect function to avoid multiple initialization
  const connectWallet = useMemo(() => {
    return async (connector: any, connectorId: string) => {
      setSelectedWallet(connector);
      setIsProcessing(true);
      setError(null);

      try {
        console.log(`[CustomWalletModal] Connecting to ${connectorId}...`);

        const result = await connectAsync({ connector });
        console.log("[CustomWalletModal] Connection successful:", result);

        // Check if the user has connected before
        if (result.accounts[0]) {
          const walletAddress = result.accounts[0];
          setWalletAddress(walletAddress);

          if (hasConnectedBefore(walletAddress)) {
            const userData = getUserData(walletAddress);
            if (userData) {
              // User exists, redirect to dashboard
              router.push(`/dashboard/${userData.role}`);
              onClose();
              return;
            }
          }

          // New user, continue with onboarding
          setStep("verifyEmail");
        } else {
          throw new Error("No account connected");
        }
      } catch (err) {
        console.error("[CustomWalletModal] Wallet connection error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to connect wallet. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
    };
  }, [connectAsync, router, onClose]);

  const handleWalletSelect = (connector: any, connectorId: string) => {
    connectWallet(connector, connectorId);
  };

  const handleEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate verification delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Move to password creation step
      setStep("createPassword");
      setError(null);
    } catch (err) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate account creation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Move to role selection
      setStep("selectRole");
      setError(null);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRoleSelect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate role registration delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStep("success");
      setError(null);

      // Save user data
      if (address && selectedWallet) {
        const userData: UserData = {
          address,
          email,
          walletName: (selectedWallet as any).name || selectedWallet.id,
          walletIcon:
            (selectedWallet as any).iconUrl ||
            `/wallets/${selectedWallet.id.toLowerCase()}.svg`,
          role,
          isOnboarded: true,
        };

        saveUserData(userData);

        // Send data back to parent component
        if (onComplete) {
          onComplete({
            address,
            email,
            walletName: userData.walletName,
            walletIcon: userData.walletIcon,
            role,
          });
        }
      }
    } catch (err) {
      setError("Failed to set role. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    // Reset state when modal is closed
    setStep("selectWallet");
    setSelectedWallet(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("student");
    setError(null);

    onClose();
  };

  const handleContinueToApplication = () => {
    if (address) {
      const userData = getUserData(address);
      if (userData) {
        router.push(`/dashboard/${userData.role}`);
      }
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-[8px] bg-background/80" />
        <DialogContent className="sm:max-w-[425px] z-50">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              {step === "selectWallet" && "Connect Wallet"}
              {step === "verifyEmail" && "Verify Email"}
              {step === "createPassword" && "Create Password"}
              {step === "selectRole" && "Select Role"}
              {step === "success" && "Connected Successfully"}
            </DialogTitle>
          </DialogHeader>

          {step === "selectWallet" && (
            <div className="flex flex-col gap-3 py-4">
              {isProcessing && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-center text-sm text-muted-foreground">
                    Connecting to wallet...
                  </p>
                </div>
              )}

              {!isProcessing &&
                connectors.map((connector) => {
                  // Get icon URL from connector or fallback to default
                  const iconUrl =
                    (connector as any).iconUrl ||
                    `/wallets/${connector.id.toLowerCase()}.svg`;
                  const connectorName = (connector as any).name || connector.id;

                  return (
                    <button
                      key={connector.uid || connector.id}
                      onClick={() =>
                        handleWalletSelect(connector, connector.id)
                      }
                      className="flex items-center justify-between p-4 w-full hover:bg-accent transition-colors rounded-lg border border-border mb-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 relative flex-shrink-0 overflow-hidden rounded-md bg-muted flex items-center justify-center">
                          {iconUrl ? (
                            <>
                              <Image
                                src={iconUrl}
                                alt={connectorName}
                                width={40}
                                height={40}
                                className="object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  const fallbackIcon =
                                    e.currentTarget.parentElement?.querySelector(
                                      ".fallback-icon"
                                    );
                                  if (fallbackIcon instanceof HTMLElement) {
                                    fallbackIcon.classList.remove("hidden");
                                  }
                                }}
                              />
                              <Wallet className="h-6 w-6 text-muted-foreground hidden fallback-icon" />
                            </>
                          ) : (
                            <Wallet className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex flex-col items-start text-lg ml-1.5">
                          <span className="font-medium">{connectorName}</span>
                          <span className="text-xs text-muted-foreground">
                            Click to connect
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                  );
                })}
            </div>
          )}

          {step === "verifyEmail" && (
            <form onSubmit={handleEmailVerify} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isProcessing}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  We'll send a verification code to this email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing || !email}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

              {selectedWallet && (
                <div className="pt-4 flex items-center gap-2 border-t mt-4">
                  <div className="h-8 w-8 relative flex-shrink-0">
                    <Image
                      src={
                        (selectedWallet as any).iconUrl ||
                        `/wallets/${selectedWallet.id.toLowerCase()}.svg`
                      }
                      alt={(selectedWallet as any).name || selectedWallet.id}
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {(selectedWallet as any).name || selectedWallet.id}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[250px]">
                      {address}
                    </span>
                  </div>
                </div>
              )}
            </form>
          )}

          {step === "createPassword" && (
            <form onSubmit={handleCreatePassword} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isProcessing}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isProcessing}
                  required
                />
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <p className="text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  password.length < 8 ||
                  isProcessing
                }
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

              <div className="pt-4 flex items-center gap-2 border-t mt-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{email}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
            </form>
          )}

          {step === "selectRole" && (
            <form onSubmit={handleRoleSelect} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select your role</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) =>
                    setRole(value as "instructor" | "student")
                  }
                  className="grid grid-cols-1 gap-2 pt-2"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex-1 cursor-pointer">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="instructor" id="instructor" />
                    <Label
                      htmlFor="instructor"
                      className="flex-1 cursor-pointer"
                    >
                      Instructor
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </form>
          )}

          {step === "success" && (
            <div className="py-6 space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium">Account Created</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Your account has been set up successfully
                </p>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Wallet</p>
                <div className="flex items-center gap-2">
                  {selectedWallet && (
                    <div className="h-5 w-5 relative flex-shrink-0">
                      <Image
                        src={
                          (selectedWallet as any).iconUrl ||
                          `/wallets/${selectedWallet.id.toLowerCase()}.svg`
                        }
                        alt={(selectedWallet as any).name || selectedWallet.id}
                        width={20}
                        height={20}
                        className="object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <p className="text-sm font-medium">
                    {selectedWallet
                      ? (selectedWallet as any).name || selectedWallet.id
                      : ""}
                  </p>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="text-sm font-medium">{email}</p>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Wallet Address
                </p>
                <p className="text-sm font-mono break-all">{address}</p>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Account Type
                </p>
                <p className="text-sm font-medium capitalize">{role}</p>
              </div>

              <Button className="w-full" onClick={handleContinueToApplication}>
                Go to Dashboard
              </Button>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
});
