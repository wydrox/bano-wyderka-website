"use client";

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
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Mechanika Pojazdowa",
    description: "Diagnostyka komputerowa, naprawy silników, wymiana rozrządów, zawieszenia, hamulców i sprzęgieł.",
    features: ["Diagnostyka OBD", "Naprawa silników", "Zawieszenie", "Hamulce"],
  },
  {
    icon: Paintbrush,
    title: "Blacharstwo i Lakiernictwo",
    description: "Profesjonalne naprawy powypadkowe, usuwanie wgnieceń, malowanie elementów i całych pojazdów.",
    features: ["Naprawy blacharskie", "Lakierowanie", "Usuwanie wgnieceń", "Polerowanie"],
  },
  {
    icon: Snowflake,
    title: "Klimatyzacja",
    description: "Serwis klimatyzacji samochodowej, napełnianie czynnikiem R134a/R1234yf, ozonowanie, wykrywanie nieszczelności.",
    features: ["Napełnianie", "Ozonowanie", "Naprawa układu", "Dezynfekcja"],
  },
  {
    icon: Zap,
    title: "Elektromechanika",
    description: "Naprawa instalacji elektrycznych, alternatory, rozruszniki, ABS, ESP, centralne zamki, elektronika.",
    features: ["Alternatory", "Rozruszniki", "ABS/ESP", "Centralny zamek"],
  },
  {
    icon: CircleDot,
    title: "Wulkanizacja",
    description: "Wymiana opon, wyważanie kół, naprawa przebić, sezonowa wymiana opon, sprzedaż opon nowych i używanych.",
    features: ["Wymiana opon", "Wyważanie", "Naprawa", "Sezonowa wymiana"],
  },
  {
    icon: Settings,
    title: "Przeglądy i Obsługa",
    description: "Okresowe przeglądy rejestracyjne, wymiana oleju i filtrów, obsługa eksploatacyjna pojazdów.",
    features: ["Przeglądy rejestracyjne", "Wymiana oleju", "Filtry", "Przeglądy okresowe"],
  },
  {
    icon: Car,
    title: "Szyby i Szyberdachy",
    description: "Wymiana i naprawa szyb samochodowych, naprawa szyberdachów, uszczelnianie przed wodą.",
    features: ["Wymiana szyb", "Naprawa szyb", "Szyberdachy", "Uszczelnianie"],
  },
  {
    icon: Truck,
    title: "Pomoc Drogowa",
    description: "Całodobowa pomoc drogowa na terenie Ozorkowa i okolic. Holowanie, naprawy na miejscu.",
    features: ["Holowanie", "Naprawa na miejscu", "Awaryjne otwieranie", "24/7"],
  },
  {
    icon: Shield,
    title: "Ubezpieczenia i Dodatki",
    description: "Pomoc w zakupie ubezpieczeń OC/AC. Sprzedaż części samochodowych, lakierów, akcesoriów.",
    features: ["Ubezpieczenia OC/AC", "Części", "Lakiery", "Akcesoria"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Nasza Oferta
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Kompleksowe Usługi Motoryzacyjne
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Oferujemy pełen zakres usług dla Twojego pojazdu - od drobnych napraw 
            po kompleksową obsługę powypadkową.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center mb-4 group-hover:bg-[#D32F2F] group-hover:text-white transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
