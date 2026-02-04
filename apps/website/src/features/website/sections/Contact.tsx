"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  AtSign,
  Loader2,
} from "lucide-react";
import { submitToCrm } from "@/src/features/crm/actions/submit-form";


const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    content: "ul. Słowackiego 37",
    subContent: "95-035 Ozorków",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "509 795 943",
    href: "tel:+48509795943",
  },
  {
    icon: AtSign,
    title: "Email",
    content: "bano@bano.com.pl",
    href: "mailto:bano@bano.com.pl",
  },
];

const openingHours = [
  { day: "Poniedziałek", hours: "08:00 - 17:00" },
  { day: "Wtorek", hours: "08:00 - 17:00" },
  { day: "Środa", hours: "08:00 - 17:00" },
  { day: "Czwartek", hours: "08:00 - 17:00" },
  { day: "Piątek", hours: "08:00 - 17:00" },
  { day: "Sobota", hours: "10:00 - 14:00" },
  { day: "Niedziela", hours: "Zamknięte", closed: true },
];

export function Contact() {
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      carInfo: formData.get('car') as string,
      message: formData.get('message') as string,
      type: 'contact' as const,
    };

    const result = await submitToCrm(data);
    
    setSubmitting(false);
    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setGdprConsent(false);
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Kontakt
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Skontaktuj się z Nami
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Masz pytania lub chcesz umówić wizytę? Zadzwoń lub napisz do nas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Mail className="h-5 w-5 text-[#D32F2F]" />
                  Dane Kontaktowe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-[#D32F2F] mt-0.5" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-[#D32F2F] transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">
                          {item.content}
                          {item.subContent && (
                            <>
                              <br />
                              {item.subContent}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Clock className="h-5 w-5 text-[#D32F2F]" />
                  Godziny Otwarcia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {openingHours.map((item) => (
                    <div
                      key={item.day}
                      className={`flex justify-between py-1 ${
                        item.closed ? "text-muted-foreground" : ""
                      }`}
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-full flex flex-col">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Send className="h-5 w-5 text-[#D32F2F]" />
                Wyślij Wiadomość
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię i nazwisko *</Label>
                    <Input id="name" name="name" placeholder="Jan Kowalski" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="123 456 789" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="jan@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="car">Marka i model pojazdu</Label>
                  <Input id="car" name="car" placeholder="np. Volkswagen Golf VI 1.6 TDI" />
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <Label htmlFor="message">Wiadomość *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Opisz krótko czego dotyczy sprawa..."
                    className="flex-1 resize-none"
                    required
                  />
                </div>

                <div className="space-y-4 mt-auto">
                  {status === 'success' && (
                    <p className="text-sm text-green-600 font-medium">Wiadomość została wysłana pomyślnie!</p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-600 font-medium">Wystąpił błąd podczas wysyłania. Spróbuj ponownie.</p>
                  )}
                  <Separator />

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="gdpr"
                      checked={gdprConsent}
                      onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                      required
                    />
                    <Label htmlFor="gdpr" className="text-sm font-normal leading-tight cursor-pointer">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z 
                      ustawą o ochronie danych osobowych w związku z wysłaniem zapytania 
                      przez formularz kontaktowy. Podanie danych jest dobrowolne, ale 
                      niezbędne do przetworzenia zapytania. *
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#D32F2F] hover:bg-[#B71C1C]"
                    disabled={!gdprConsent || submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Wyślij Wiadomość
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="aspect-video w-full rounded-xl overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.8935240871793!2d19.2915!3d51.9654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471c4a8f6f5e8b3f%3A0x7a8f5e8b3f6f5e8b!2sS%C5%82owackiego%2037%2C%2095-035%20Ozork%C3%B3w!5e0!3m2!1spl!2spl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Bano Wyderka"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
