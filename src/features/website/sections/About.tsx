"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            O Nas
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Rodzinna Firma z {" "}
            <span className="text-[#D32F2F]">39-Letnim Doświadczeniem</span>
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#D32F2F] text-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <div className="text-4xl font-bold mb-1">39</div>
                <div className="text-sm opacity-80">Lat doświadczenia</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-[#D32F2F]" />
                <div className="text-4xl font-bold mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Zadowolonych klientów</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p className="text-base leading-relaxed">
              PPHU BANO-WYDERKA to warsztat samochodowy prowadzony przez rodzinę Wyderków 
              od prawie czterech dekad. Nasza historia zaczęła się w Ozorkowie, gdzie 
              z małego garażu rozwinęliśmy się w profesjonalny zakład obsługujący 
              kierowców z całej okolicy.
            </p>
            
            <p className="text-base leading-relaxed">
              Od samego początku priorytetem była dla nas jakość usług i zadowolenie klientów. 
              Dzięki temu zyskaliśmy zaufanie mieszkańców Ozorkowa oraz okolicznych miejscowości. 
              Jesteśmy dumni z tego, że wielu naszych klientów to osoby, które powierzają 
              nam swoje pojazdy od lat.
            </p>
            
            <p className="text-base leading-relaxed">
              Od 2010 roku jesteśmy członkiem sieci EuroWarsztat - największej w Polsce 
              sieci niezależnych warsztatów samochodowych. To oznacza dla Państwa gwarancję 
              jakości, uczciwe ceny i profesjonalną obsługę na najwyższym poziomie.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Award className="h-12 w-12 text-[#D32F2F] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Członek EuroWarsztat</h3>
                  <p className="text-sm text-muted-foreground">Sieć zaufanych warsztatów</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Jako członek sieci EuroWarsztat oferujemy: gwarancję na wykonane usługi, 
                oryginalne części zamienne, uczciwe wyceny i profesjonalną obsługę 
                zgodną z najwyższymi standardami.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Specjalizacja</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Szczególną wiedzą i doświadczeniem dysponujemy w obsłudze pojazdów marek:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Fiat", "Opel", "Volkswagen", "Ford", "Renault", "Skoda"].map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 bg-background rounded-full text-sm font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-5 w-5 text-[#D32F2F]" />
              <span>Mariusz & Renata Wyderka</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-5 w-5 text-[#D32F2F]" />
              <span>ul. Słowackiego 37, Ozorków</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
