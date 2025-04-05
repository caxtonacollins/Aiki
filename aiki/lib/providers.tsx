"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { PrivyWrapper } from "./privy-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <PrivyWrapper>
        {children}
        <Toaster />
      </PrivyWrapper>
    </ThemeProvider>
  );
}
