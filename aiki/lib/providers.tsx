"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { CustomWagmiProvider } from "./wagmi-provider";
import { AiChatButton } from "@/components/chat/AiChatButton";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <CustomWagmiProvider>
        {children}
        <Toaster />
        <AiChatButton />
      </CustomWagmiProvider>
    </ThemeProvider>
  );
}
