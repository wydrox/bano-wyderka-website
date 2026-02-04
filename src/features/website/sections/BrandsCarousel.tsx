"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const brands = [
  { name: "Fiat", domain: "fiat.pl" },
  { name: "Opel", domain: "opel.pl" },
  { name: "Volkswagen", domain: "volkswagen.pl" },
  { name: "Ford", domain: "ford.com" },
  { name: "Renault", domain: "renault.pl" },
  { name: "Skoda", domain: "skoda.com" },
  { name: "Toyota", domain: "toyota.pl" },
  { name: "Nissan", domain: "nissan.pl" },
  { name: "Suzuki", domain: "suzuki.pl" },
  { name: "Dacia", domain: "dacia.pl" },
];

const BRANDFETCH_CLIENT_ID = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID;
const LOGO_HEIGHT = 72;

function getLogoUrl(domain: string): string {
  return `https://cdn.brandfetch.io/${domain}/h/${LOGO_HEIGHT}/logo.png?c=${BRANDFETCH_CLIENT_ID}`;
}

export function BrandsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const doubledBrands = [...brands, ...brands];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Specjalizacja
          </Badge>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Marki, którym możesz zaufać
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Specjalizujemy się w obsłudze i sprzedaży pojazdów tych marek
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div
            className={`flex items-center transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`}
            style={{
              animation: isVisible ? "brandsScroll 30s linear infinite" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {doubledBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8"
              >
                <div className="h-16 md:h-20 flex items-center justify-center">
                  <Image
                    src={getLogoUrl(brand.domain)}
                    alt={`${brand.name} logo`}
                    width={200}
                    height={LOGO_HEIGHT}
                    className="w-auto h-full object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.parentElement?.querySelector(".fallback") as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="fallback hidden w-full h-full items-center justify-center text-center">
                    <span className="text-sm font-bold text-gray-700">{brand.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
