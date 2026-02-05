"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const brands = [
  { name: "Fiat", logo: "/images/brands/fiat.png" },
  { name: "Opel", logo: "/images/brands/opel.png" },
  { name: "Volkswagen", logo: "/images/brands/volkswagen.png" },
  { name: "Ford", logo: "/images/brands/ford.png" },
  { name: "Renault", logo: "/images/brands/renault.png" },
  { name: "Skoda", logo: "/images/brands/skoda-auto.png" },
  { name: "Toyota", logo: "/images/brands/toyota.png" },
  { name: "Nissan", logo: "/images/brands/nissan-global.png" },
  { name: "Suzuki", logo: "/images/brands/suzuki.png" },
  { name: "Dacia", logo: "/images/brands/dacia.png" },
];

const LOGO_HEIGHT = 72;

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
    <section className="py-16 bg-muted/30">
      <style jsx>{`
        @keyframes brandsScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
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
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={160}
                      height={LOGO_HEIGHT}
                      className="w-auto h-12 md:h-14 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      unoptimized
                    />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
