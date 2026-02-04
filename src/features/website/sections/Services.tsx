"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

        <div className="hidden md:grid grid-cols-2 gap-3">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div 
                key={service.id}
                className="relative"
                style={{ minHeight: '56px' }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    isExpanded
                      ? "bg-white shadow-xl ring-1 ring-[#D32F2F]/20 absolute top-0 left-0 right-0 z-20 h-auto"
                      : "bg-white hover:shadow-md relative z-10"
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isExpanded
                          ? "bg-[#D32F2F] text-white"
                          : "bg-[#D32F2F]/10 text-[#D32F2F]"
                      }`}>
                        <service.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">{service.title}</h3>
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isExpanded ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:hidden gap-3">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isExpanded
                    ? "bg-white shadow-lg ring-1 ring-[#D32F2F]/20"
                    : "bg-white/50 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setExpandedId(isExpanded ? null : service.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isExpanded
                        ? "bg-[#D32F2F] text-white"
                        : "bg-[#D32F2F]/10 text-[#D32F2F]"
                    }`}>
                      <service.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{service.title}</h3>
                    </div>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isExpanded ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
