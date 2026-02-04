"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Clock,
  BadgeCheck,
  Wrench,
  Headphones,
  Wallet,
  X,
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

const CARD_HEIGHT = 100;
const EXPANDED_HEIGHT = 200;
const GAP = 16;
const ROWS = Math.ceil(benefits.length / 3);

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

        <div className="md:hidden space-y-4">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-[#D32F2F]" />
              </div>
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="hidden md:block">
          <div 
            ref={containerRef}
            className="relative"
            style={{ 
              height: `${ROWS * (EXPANDED_HEIGHT + GAP) - GAP}px`
            }}
          >
            {benefits.map((benefit, index) => {
              const isExpanded = expandedId === benefit.id;
              const isOtherExpanded = expandedId !== null && !isExpanded;
              const row = Math.floor(index / 3);
              const col = index % 3;
              const cardWidth = (containerWidth - 2 * GAP) / 3;
              
              return (
                <div
                  key={benefit.id}
                  className={`
                    absolute bg-white border rounded-xl cursor-pointer
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${isExpanded ? "z-50 shadow-2xl border-[#D32F2F] ring-1 ring-[#D32F2F]/20" : "z-10 border-border hover:border-[#D32F2F]/50 hover:shadow-md hover:scale-[1.02]"}
                    ${isOtherExpanded ? "opacity-60" : "opacity-100"}
                  `}
                  style={{
                    left: isExpanded ? 0 : `${col * (cardWidth + GAP)}px`,
                    top: `${row * (EXPANDED_HEIGHT + GAP)}px`,
                    width: isExpanded ? `${containerWidth}px` : `${cardWidth}px`,
                    height: isExpanded ? `${EXPANDED_HEIGHT}px` : `${CARD_HEIGHT}px`,
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : benefit.id)}
                >
                  <div className="p-6 h-full flex flex-col justify-start relative">
                    {isExpanded && (
                      <button 
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                          w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                          transition-colors duration-300
                          ${isExpanded ? "bg-[#D32F2F] text-white" : "bg-[#D32F2F]/10 text-[#D32F2F]"}
                        `}
                      >
                        <benefit.icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className={`font-semibold transition-colors ${isExpanded ? "text-lg" : "text-base"}`}>
                          {benefit.title}
                        </h3>
                        {!isExpanded && (
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Kliknij, aby rozwinąć
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`
                        overflow-hidden transition-all duration-500 ease-in-out
                        ${isExpanded ? "max-h-[120px] opacity-100 mt-4" : "max-h-0 opacity-0"}
                      `}
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                      <div className="mt-4 text-[11px] text-[#D32F2F] font-medium italic">
                        Kliknij ponownie, aby zamknąć
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
