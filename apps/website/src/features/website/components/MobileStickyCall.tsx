"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function MobileStickyCall() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-md border-t">
      <a href="tel:+48509795943" className="block w-full">
        <Button size="lg" className="w-full bg-[#D32F2F] hover:bg-[#B71C1C]">
          <Phone className="mr-2 h-5 w-5" />
          Zadzwoń: 509 795 943
        </Button>
      </a>
    </div>
  );
}
