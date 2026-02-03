"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const navItems = [
  { href: "#services", label: "Usługi" },
  { href: "#cars", label: "Samochody" },
  { href: "#schedule", label: "Rezerwacja" },
  { href: "#about", label: "O nas" },
  { href: "#contact", label: "Kontakt" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-[#1a1a1a]">ban</span>
                <span className="text-[#D32F2F]">o</span>
              </span>
              <span 
                className="ml-1 text-lg font-light italic text-[#737373]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Wyderka
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-[#D32F2F] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+48509795943"
              className="hidden md:flex items-center gap-2"
            >
              <Button
                size="sm"
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                509 795 943
              </Button>
            </a>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">
                      <span className="text-[#1a1a1a]">ban</span>
                      <span className="text-[#D32F2F]">o</span>
                    </span>
                    <span className="text-sm italic text-[#737373]">Wyderka</span>
                  </div>
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium hover:text-[#D32F2F] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a href="tel:+48509795943" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#D32F2F] hover:bg-[#B71C1C]">
                      <Phone className="mr-2 h-4 w-4" />
                      Zadzwoń: 509 795 943
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
