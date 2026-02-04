"use client";

import { useState } from "react";
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
  ChevronDown,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <Card 
                key={service.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-md ${
                  isExpanded ? "ring-1 ring-[#D32F2F]/20 border-[#D32F2F]/30" : ""
                }`}
                onClick={() => setExpandedId(isExpanded ? null : service.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isExpanded 
                          ? "bg-[#D32F2F] text-white" 
                          : "bg-[#D32F2F]/10 text-[#D32F2F] group-hover:bg-[#D32F2F] group-hover:text-white"
                      }`}>
                        <service.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base">{service.title}</CardTitle>
                    </div>
                    <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed pt-2">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-1 bg-[#D32F2F]/5 rounded-full text-[#D32F2F] font-medium"
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
