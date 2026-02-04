"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Clock,
  BadgeCheck,
  Wrench,
  Headphones,
  Wallet,
} from "lucide-react";

const benefits = [
  {
    id: "gwarancja",
    icon: Shield,
    title: "Gwarancja Jakości",
    description: "Wszystkie naprawy objęte są gwarancją. Jako członek EuroWarsztat przestrzegamy najwyższych standardów jakości.",
  },
  {
    id: "terminy",
    icon: Clock,
    title: "Krótkie Terminy",
    description: "Zdajemy sobie sprawę, jak ważny jest dla Ciebie czas. Dlatego realizujemy naprawy możliwie najszybciej.",
  },
  {
    id: "doswiadczenie",
    icon: BadgeCheck,
    title: "Doświadczenie",
    description: "Prawie 40 lat na rynku to gwarancja, że zetknęliśmy się już z każdym problemem i wiemy jak go rozwiązać.",
  },
  {
    id: "sprzet",
    icon: Wrench,
    title: "Nowoczesny Sprzęt",
    description: "Inwestujemy w najnowszy sprzęt diagnostyczny i narzędzia, aby zapewnić profesjonalną obsługę wszystkich marek.",
  },
  {
    id: "podejscie",
    icon: Headphones,
    title: "Indywidualne Podejście",
    description: "Każdy klient i każdy pojazd traktowany jest indywidualnie. Doradzamy, tłumaczymy, nie narzucamy.",
  },
  {
    id: "ceny",
    icon: Wallet,
    title: "Uczciwe Ceny",
    description: "Przedstawiamy jasną wycenę przed rozpoczęciem prac. Brak ukrytych kosztów i niespodzianek.",
  },
];

const CARD_HEIGHT = 72;
const EXPANDED_HEIGHT = 140;
const GAP = 12;

export function WhyUs() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const rows = Math.ceil(benefits.length / 2);
  const containerHeight = rows * (CARD_HEIGHT + GAP) - GAP;

  return (
    <section id="why-us" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Dlaczego My
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Co Nas Wyróżnia
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Wybierasz sprawdzony warsztat z 39-letnim doświadczeniem.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative hidden md:block"
          style={{ height: `${containerHeight}px` }}
        >
          {benefits.map((benefit, index) => {
            const isExpanded = expandedId === benefit.id;
            const row = Math.floor(index / 2);
            const col = index % 2;
            const cardWidth = (containerWidth - GAP) / 2;
            
            return (
              <div
                key={benefit.id}
                className="absolute"
                style={{
                  left: `${col * (cardWidth + GAP)}px`,
                  top: `${row * (CARD_HEIGHT + GAP)}px`,
                  width: `${cardWidth}px`,
                  height: isExpanded ? `${EXPANDED_HEIGHT}px` : `${CARD_HEIGHT}px`,
                  zIndex: isExpanded ? 50 : 10,
                }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    isExpanded 
                      ? "bg-white shadow-xl ring-1 ring-[#D32F2F]/20" 
                      : "bg-white hover:shadow-md"
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : benefit.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isExpanded 
                          ? "bg-[#D32F2F] text-white" 
                          : "bg-[#D32F2F]/10 text-[#D32F2F]"
                      }`}>
                        <benefit.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base">{benefit.title}</h3>
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isExpanded ? "max-h-[80px] opacity-100 mt-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:hidden gap-3">
          {benefits.map((benefit) => {
            const isExpanded = expandedId === benefit.id;
            
            return (
              <Card 
                key={benefit.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isExpanded 
                    ? "bg-white shadow-lg ring-1 ring-[#D32F2F]/20" 
                    : "bg-white/50 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setExpandedId(isExpanded ? null : benefit.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isExpanded 
                        ? "bg-[#D32F2F] text-white" 
                        : "bg-[#D32F2F]/10 text-[#D32F2F]"
                    }`}>
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base">{benefit.title}</h3>
                    </div>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isExpanded ? "max-h-[120px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Masz pytania? Chętnie na nie odpowiemy!
          </p>
          <a href="tel:+48509795943">
            <span className="inline-flex items-center gap-2 text-[#D32F2F] hover:underline">
              Zadzwoń: 509 795 943
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
