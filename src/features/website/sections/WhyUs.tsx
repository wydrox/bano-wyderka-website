"use client";

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
    icon: Shield,
    title: "Gwarancja Jakości",
    description: "Wszystkie naprawy objęte są gwarancją. Jako członek EuroWarsztat przestrzegamy najwyższych standardów jakości.",
  },
  {
    icon: Clock,
    title: "Krótkie Terminy",
    description: "Zdajemy sobie sprawę, jak ważny jest dla Ciebie czas. Dlatego realizujemy naprawy możliwie najszybciej.",
  },
  {
    icon: BadgeCheck,
    title: "Doświadczenie",
    description: "Prawie 40 lat na rynku to gwarancja, że zetknęliśmy się już z każdym problemem i wiemy jak go rozwiązać.",
  },
  {
    icon: Wrench,
    title: "Nowoczesny Sprzęt",
    description: "Inwestujemy w najnowszy sprzęt diagnostyczny i narzędzia, aby zapewnić profesjonalną obsługę wszystkich marek.",
  },
  {
    icon: Headphones,
    title: "Indywidualne Podejście",
    description: "Każdy klient i każdy pojazd traktowany jest indywidualnie. Doradzamy, tłumaczymy, nie narzucamy.",
  },
  {
    icon: Wallet,
    title: "Uczciwe Ceny",
    description: "Przedstawiamy jasną wycenę przed rozpoczęciem prac. Brak ukrytych kosztów i niespodzianek.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:border-[#D32F2F] transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center mb-4 group-hover:bg-[#D32F2F] group-hover:text-white transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
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
