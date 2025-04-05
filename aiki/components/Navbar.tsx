"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import Logo from "@/public/logo2.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/Toggletheme";

const Navbar = () => {
  const { login, authenticated } = usePrivy();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const location = usePathname();

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
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/courses")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/projects"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/projects")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/community"
            className={`nav-link text-sm font-medium transition-colors ${
              isActive("/community")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Community
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleLogin()}
            className="px-4 py-2 text-sm font-medium text-primary border border-sky-400 rounded-lg hover:bg-primary/5 transition-colors"
          >
            Log in
          </button>
          <ThemeToggle />
          {/* <Link
            to="/signup"
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign up
          </Link> */}
          {/* <ConnectButton /> */}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-md">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`block py-2 ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`block py-2 ${
                isActive("/courses") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/projects"
              className={`block py-2 ${
                isActive("/projects") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/community"
              className={`block py-2 ${
                isActive("/community")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <button
                className="px-4 py-2 text-sm font-medium text-center text-primary border border-primary rounded-lg"
                onClick={() => handleLogin()}
              >
                Log in
              </button>
              {/* <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-center text-primary-foreground bg-primary rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
