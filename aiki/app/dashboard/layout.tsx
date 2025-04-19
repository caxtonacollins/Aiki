"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Users,
  Book,
  Folder,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEnsAvatar, useEnsName, useAccount, useDisconnect } from "wagmi";
import { getUserData, getUserRole } from "@/lib/user-storage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moveHeaderbar, setMoveHeaderbar] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const location = usePathname();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  useEffect(() => {
    // Measure navbar height when component mounts
    const navbar = document.querySelector("header");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      setMoveHeaderbar(currentScrollY > lastScrollY && currentScrollY > 50);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const role = getUserRole(address);

  // Define navigation items based on role
  const navigationItems = [
    {
      label: "Overview",
      href: `/dashboard/${role}`,
      icon: BarChart,
      roles: ["admin", "instructor", "student"],
    },
    {
      label: "Users",
      href: `/dashboard/${role}/users`,
      icon: Users,
      roles: ["admin"],
    },
    {
      label: "Courses",
      href: `/dashboard/${role}/courses`,
      icon: Book,
      roles: ["admin", "instructor", "student"],
    },
    {
      label: "Projects",
      href: `/dashboard/${role}/projects`,
      icon: Folder,
      roles: ["admin", "instructor", "student"],
    },
    {
      label: "Settings",
      href: `/dashboard/${role}/settings`,
      icon: Settings,
      roles: ["admin", "instructor", "student"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(role)
  );

  const title = (() => {
    switch (role) {
      case "admin":
        return "Admin Dashboard";
      case "instructor":
        return "Instructor Dashboard";
      case "student":
        return "Student Dashboard";
      default:
        return "Dashboard";
    }
  })();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 h-screen transition-all duration-300 bg-card border-r border-border flex flex-col max-md:-translate-x-full max-md:data-[open=true]:translate-x-0",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        {/* <div className="h-16 flex items-center px-3 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              A
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-semibold">Aiki</span>
            )}
          </Link>
        </div> */}

        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-20 h-8 w-8 rounded-full border border-border bg-background shadow-md"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Nav Links */}
        <ScrollArea className="flex-1 py-24">
          <div className="space-y-1 px-3">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Home className="h-5 w-5" />
              {!sidebarCollapsed && <span>Back to Home</span>}
            </Link>

            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </ScrollArea>

        {/* User Section */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-md p-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage
                src={typeof ensAvatar === "string" ? ensAvatar : undefined}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {ensName?.substring(0, 2) || "A"}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="text-sm font-medium line-clamp-1">
                  {ensName}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {role}
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <Link
              href="/profile"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <User className="h-5 w-5" />
              {!sidebarCollapsed && <span>Profile</span>}
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50"
              onClick={() => disconnect()}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {!sidebarCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Header */}
        <header
          className={cn(
            "sticky top-0 z-40 transition-all duration-300 h-16 border-b border-border",
            "bg-background/95 backdrop-blur-sm",
            "flex items-center px-6",
            {
              "bg-background/80 backdrop-blur-md shadow-subtle": scrolled,
              "transform-none": !moveHeaderbar,
              "-translate-y-full": moveHeaderbar,
            }
          )}
        >
          <h1 className="text-xl font-bold">{title}</h1>
        </header>

        {/* Page Content */}
        <main
          className={cn(
            "p-6 min-h-[calc(100vh-4rem)]",
            "max-md:ml-0 max-md:pl-4"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
