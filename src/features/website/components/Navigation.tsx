"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const navItems = [
  { href: "#services", label: "Usługi" },
  { href: "#cars", label: "Samochody" },
  { href: "#about", label: "O nas" },
  { href: "#contact", label: "Kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/bano%20logo%202.png"
              alt="Bano"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors text-foreground/80 hover:text-[#D32F2F]"
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
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="mb-4">
                    <Image
                      src="/images/bano%20logo%202.png"
                      alt="Bano"
                      width={100}
                      height={35}
                      className="h-8 w-auto"
                      priority
                    />
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
