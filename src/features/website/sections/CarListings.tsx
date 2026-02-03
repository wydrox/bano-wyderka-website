"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CarListing } from "@/src/features/website/types/cars";
import { Fuel, Gauge, Calendar, MapPin, ExternalLink, Loader2, Phone } from "lucide-react";

export function CarListings() {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [showPrice, setShowPrice] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    async function fetchCars() {
      try {
        const response = await fetch(
          "https://api.autoplac.pl/offers/search?dealerDomains=bano",
          { headers: { Accept: "application/json" } }
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setListings(data.offerList?.slice(0, 6) || []);
      } catch (err) {
        setError("Nie udało się pobrać ofert");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [visible]);

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("pl-PL").format(mileage) + " km";
  };

  return (
    <section
      ref={sectionRef}
      id="cars"
      className="py-16 md:py-24 bg-muted/20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Samochody na Sprzedaż
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Aktualna Oferta Pojazdów
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Sprawdź naszą ofertę sprawdzonych samochodów używanych.
          </p>
        </div>

        {!visible || loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#D32F2F]" />
            <p className="mt-4 text-muted-foreground">Ładowanie ofert...</p>
          </div>
        ) : error || listings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Brak dostępnych ofert
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => {
                const { offer, photoList } = listing;
                const mainPhoto = photoList?.[0];
                const isPriceVisible = showPrice === offer.id;

                return (
                  <Card key={offer.id} className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      {mainPhoto ? (
                        <img
                          src={mainPhoto.webpMiniatureUrl || mainPhoto.miniatureUrl}
                          alt={`${offer.brand} ${offer.model}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground text-sm">Brak zdjęcia</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[#D32F2F] text-white">
                          {offer.productionYear}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold mb-1">
                        {offer.brand} {offer.model}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {offer.generation}
                      </p>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Gauge className="h-3.5 w-3.5 text-[#D32F2F]" />
                          <span className="text-muted-foreground">{formatMileage(offer.mileage)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Fuel className="h-3.5 w-3.5 text-[#D32F2F]" />
                          <span className="text-muted-foreground">{offer.fuelTypeText}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#D32F2F]" />
                          <span className="text-muted-foreground">{offer.engineCapacity} cm³</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#D32F2F]" />
                          <span className="text-muted-foreground">{offer.city}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t mt-auto">
                        <div className="flex flex-col gap-2">
                          {isPriceVisible ? (
                            <div className="text-center py-2">
                              <span className="text-xl font-bold text-[#D32F2F]">
                                {new Intl.NumberFormat("pl-PL", {
                                  style: "currency",
                                  currency: "PLN",
                                  maximumFractionDigits: 0,
                                }).format(offer.price)}
                              </span>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => setShowPrice(offer.id)}
                            >
                              Sprawdź cenę
                            </Button>
                          )}
                          <a href="tel:+48509795943">
                            <Button
                              size="sm"
                              className="w-full bg-[#D32F2F] hover:bg-[#B71C1C]"
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Zadzwoń po szczegóły
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://autoplac.pl/dealer/bano"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  Zobacz więcej
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
