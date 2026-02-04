"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Paintbrush,
  Snowflake,
  Zap,
  CircleDot,
  Car,
  Settings,
  Shield,
  Truck,
  X,
} from "lucide-react";

const services = [
  {
    id: "mechanika",
    icon: Wrench,
    title: "Mechanika Pojazdowa",
    description: "Diagnostyka komputerowa, naprawy silników, wymiana rozrządów, zawieszenia, hamulców i sprzęgieł.",
    features: ["Diagnostyka OBD", "Naprawa silników", "Zawieszenie", "Hamulce"],
  },
  {
    id: "blacharstwo",
    icon: Paintbrush,
    title: "Blacharstwo i Lakiernictwo",
    description: "Profesjonalne naprawy powypadkowe, usuwanie wgnieceń, malowanie elementów i całych pojazdów.",
    features: ["Naprawy blacharskie", "Lakierowanie", "Usuwanie wgnieceń", "Polerowanie"],
  },
  {
    id: "klimatyzacja",
    icon: Snowflake,
    title: "Klimatyzacja",
    description: "Serwis klimatyzacji samochodowej, napełnianie czynnikiem R134a/R1234yf, ozonowanie, wykrywanie nieszczelności.",
    features: ["Napełnianie", "Ozonowanie", "Naprawa układu", "Dezynfekcja"],
  },
  {
    id: "elektromechanika",
    icon: Zap,
    title: "Elektromechanika",
    description: "Naprawa instalacji elektrycznych, alternatory, rozruszniki, ABS, ESP, centralne zamki, elektronika.",
    features: ["Alternatory", "Rozruszniki", "ABS/ESP", "Centralny zamek"],
  },
  {
    id: "wulkanizacja",
    icon: CircleDot,
    title: "Wulkanizacja",
    description: "Wymiana opon, wyważanie kół, naprawa przebić, sezonowa wymiana opon, sprzedaż opon nowych i używanych.",
    features: ["Wymiana opon", "Wyważanie", "Naprawa", "Sezonowa wymiana"],
  },
  {
    id: "przeglady",
    icon: Settings,
    title: "Przeglądy i Obsługa",
    description: "Okresowe przeglądy rejestracyjne, wymiana oleju i filtrów, obsługa eksploatacyjna pojazdów.",
    features: ["Przeglądy rejestracyjne", "Wymiana oleju", "Filtry", "Przeglądy okresowe"],
  },
  {
    id: "szyby",
    icon: Car,
    title: "Szyby i Szyberdachy",
    description: "Wymiana i naprawa szyb samochodowych, naprawa szyberdachów, uszczelnianie przed wodą.",
    features: ["Wymiana szyb", "Naprawa szyb", "Szyberdachy", "Uszczelnianie"],
  },
  {
    id: "pomoc",
    icon: Truck,
    title: "Pomoc Drogowa",
    description: "Całodobowa pomoc drogowa na terenie Ozorkowa i okolic. Holowanie, naprawy na miejscu.",
    features: ["Holowanie", "Naprawa na miejscu", "Awaryjne otwieranie", "24/7"],
  },
  {
    id: "ubezpieczenia",
    icon: Shield,
    title: "Ubezpieczenia i Dodatki",
    description: "Pomoc w zakupie ubezpieczeń OC/AC. Sprzedaż części samochodowych, lakierów, akcesoriów.",
    features: ["Ubezpieczenia OC/AC", "Części", "Lakiery", "Akcesoria"],
  },
];

const CARD_HEIGHT = 100;
const EXPANDED_HEIGHT = 240;
const GAP = 16;
const ROWS = Math.ceil(services.length / 3);

export function Services() {
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
    <section id="services" className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Nasza Oferta
          </Badge>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["Kup", "Ubezpiecz", "Serwisuj"].map((word, idx) => (
              <span
                key={word}
                className={`text-xl sm:text-2xl font-bold ${
                  idx === 1 ? "text-[#D32F2F]" : "text-foreground"
                }`}
              >
                {word}
                {idx < 2 && <span className="text-gray-400 mx-2">•</span>}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Kompleksowe Usługi Motoryzacyjne
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Wszystko czego potrzebujesz w jednym miejscu - sprzedaż samochodów, 
            ubezpieczenia oraz pełen zakres usług serwisowych.
          </p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-[#D32F2F]" />
                </div>
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div 
            ref={containerRef}
            className="relative"
            style={{ 
              height: `${ROWS * (EXPANDED_HEIGHT + GAP) - GAP}px`
            }}
          >
            {services.map((service, index) => {
              const isExpanded = expandedId === service.id;
              const isOtherExpanded = expandedId !== null && !isExpanded;
              const row = Math.floor(index / 3);
              const col = index % 3;
              const cardWidth = (containerWidth - 2 * GAP) / 3;
              
              return (
                <div
                  key={service.id}
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
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
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
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className={`font-semibold transition-colors ${isExpanded ? "text-lg" : "text-base"}`}>
                          {service.title}
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
                        ${isExpanded ? "max-h-[160px] opacity-100 mt-6" : "max-h-0 opacity-0"}
                      `}
                    >
                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-3 py-1 bg-[#D32F2F]/5 rounded-full text-[#D32F2F] font-medium border border-[#D32F2F]/10"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
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
      </div>
    </section>
  );
}
