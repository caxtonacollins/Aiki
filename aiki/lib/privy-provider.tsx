import { PrivyProvider } from "@privy-io/react-auth";
import Logo from "@/public/logo2.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function PrivyWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until the component mounts to access theme
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <PrivyProvider
      appId="cm84eas8v03e0uremh9th5w6m"
      clientId="client-WY5hqemeW9uG6AkEaKshUcjSq1wwRAiT7t7A6ymcFCUT9"
      config={{
        appearance: {
          theme: theme as "light" | "dark",
          accentColor: "#676FFF",
          logo: Logo.src,
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
