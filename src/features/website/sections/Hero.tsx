"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, MapPin, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/service-mechanic.jpg"
          alt="Warsztat samochodowy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[720px] px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 tracking-wider">
              Kup, Ubezpiecz, Serwisuj
            </span>
          </div>

          <Badge className="mb-8 bg-[#D32F2F]/20 text-white border-[#D32F2F]/40 hover:bg-[#D32F2F]/30 px-4 py-1">
            <Clock className="mr-1 h-3 w-3" />
            39 Lat Doświadczenia
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Profesjonalny{" "}
            <span className="text-[#D32F2F]">Warsztat Samochodowy</span>
            {" "}w Ozorkowie
          </h1>

          <p className="text-base sm:text-lg text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed">
            Kompleksowe usługi motoryzacyjne: sprzedaż, ubezpieczenia, mechanika, 
            blacharstwo, lakiernictwo i serwis. Członek sieci EuroWarsztat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href="tel:+48509795943">
              <Button size="lg" className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8">
                <Phone className="mr-2 h-5 w-5" />
                Zadzwoń Teraz
              </Button>
            </a>
            <a href="#schedule">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-[#1a1a1a] hover:text-white px-8">
                <Calendar className="mr-2 h-5 w-5" />
                Umów Online
              </Button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-gray-300 text-sm">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-[#D32F2F]" />
              <span>ul. Słowackiego 37, Ozorków</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-[#D32F2F]" />
              <span>Pn-Pt: 8:00-17:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
