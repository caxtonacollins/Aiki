"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/public/logo2.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/Toggletheme";
import { Button } from "./ui/button";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import AvatarImg from "@/public/avata.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const location = usePathname();
  const { authenticated, login, user, formattedAddress, logout } =
    usePrivyAuth();


  // const router = useRouter();

  // useEffect(() => {
  //   if (authenticated) {
  //     // router.push("/dashboard");
  //     console.log("Authenticated");
  //   }
  // }, [authenticated, router]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 10);
      setHideNavbar(currentScrollY > lastScrollY && currentScrollY > 50);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLogin = async () => {
    setIsOpen(false);
    login();
  };

  // Helper to get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-subtle py-4"
          : "bg-transparent py-6"
      } ${hideNavbar ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Aiki"
            className="w-16 h-14 rounded-lg md:ml-5"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-sky-400"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/courses")
                ? "text-sky-400"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/projects"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/projects")
                ? "text-sky-400"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/community"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/community")
                ? "text-sky-400"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Community
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {authenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src={user?.avatarUrl || ""} className="rounded-full"/> */}
                    <AvatarImage src={AvatarImg.src} className="rounded-full" />

                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {formattedAddress}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleLogin()}
                className="px-4 py-2 text-sm font-medium text-primary border border-sky-400 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
              >
                Log in
              </Button>
            </>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-sky-400 shadow-md">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`block py-2 ${
                isActive("/") ? "text-sky-400" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`block py-2 ${
                isActive("/courses") ? "text-sky-400" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/projects"
              className={`block py-2 ${
                isActive("/projects") ? "text-sky-400" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/community"
              className={`block py-2 ${
                isActive("/community")
                  ? "text-sky-400"
                  : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              {authenticated ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src={user?.avatarUrl || ""} /> */}
                      <AvatarImage
                        src={AvatarImg.src}
                        className="rounded-full"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {formattedAddress}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm font-medium text-center text-muted-foreground border border-gray-200 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-center text-primary-foreground bg-primary rounded-lg"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={"outline"}
                    className="px-4 py-2 text-sm font-medium text-center text-primary border border-primary rounded-lg"
                    onClick={() => handleLogin()}
                  >
                    Log in
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
