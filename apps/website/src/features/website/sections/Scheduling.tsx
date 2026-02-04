"use client";

import { useState } from "react";
import { format, addDays, isWeekend, getMonth, getYear, addHours } from "date-fns";
import { pl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle } from "lucide-react";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00"
];

const services = [
  "Przegląd / Diagnostyka",
  "Wymiana oleju",
  "Hamulce",
  "Zawieszenie",
  "Klimatyzacja",
  "Elektromechanika",
  "Blacharstwo",
  "Lakiernictwo",
  "Wulkanizacja",
  "Inne"
];

const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"];

export function Scheduling() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carInfo, setCarInfo] = useState("");

  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendarDays = () => {
    const year = getYear(currentMonth);
    const month = getMonth(currentMonth);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = (firstDay.getDay() + 6) % 7;
    
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const now = new Date();
    const minDate = addHours(now, 36);
    const maxDate = addDays(now, 60);
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const minDateWithoutTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return dateWithoutTime < minDateWithoutTime || date > maxDate || isWeekend(date);
  };

  const handleDateSelect = (selectedDate: Date) => {
    if (isDateDisabled(selectedDate)) return;
    setDate(selectedDate);
    setTime("");
    setStep(2);
  };

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    setStep(3);
  };

  const handleServiceSelect = (selectedService: string) => {
    setService(selectedService);
    setStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !gdprConsent) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
    <section id="schedule" className="py-4 bg-[#D32F2F]/5">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Prośba o Wizytę Wysłana!</h3>
              <p className="text-muted-foreground mb-6">
                Dziękujemy {name}. Skontaktujemy się z Tobą wkrótce, aby potwierdzić wizytę.
                <br />
                <strong>{date && format(date, "dd.MM.yyyy", { locale: pl })} o {time}</strong>
              </p>
              <Button onClick={() => {
                setSubmitted(false);
                setStep(1);
                setDate(null);
                setTime("");
                setService("");
              }} variant="outline">
                Nowa prośba
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className="py-4 bg-[#D32F2F]/5">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
            Umów Wizytę
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Zarezerwuj Termin Warsztatu
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Wybierz dogodny termin, a my skontaktujemy się z Tobą w ciągu 24h.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            
            <div className="bg-muted/50 px-6 py-4 border-b">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s
                        ? "bg-[#D32F2F] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 min-h-[420px] flex flex-col">

              {step === 1 && (
                <div className="space-y-3 py-2 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-1.5 hover:bg-muted rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-medium text-sm">
                      {format(currentMonth, "LLLL yyyy", { locale: pl })}
                    </span>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-1.5 hover:bg-muted rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-xs text-muted-foreground py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, idx) => (
                      <button
                        key={idx}
                        onClick={() => day && handleDateSelect(day)}
                        disabled={isDateDisabled(day)}
                        className={`
                          h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors mx-auto
                          ${!day ? "invisible" : ""}
                          ${isDateDisabled(day) ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-muted cursor-pointer"}
                          ${date && day && date.toDateString() === day.toDateString() ? "bg-[#D32F2F] text-white hover:bg-[#B71C1C]" : ""}
                        `}
                      >
                        {day?.getDate()}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-10">
                    Wybierz dzień roboczy (pn-pt). Rezerwacje od {format(addHours(new Date(), 36), "dd.MM")}.
                  </p>
                </div>
              )}

              {step === 2 && date && (
                <div className="space-y-4 py-2 h-full">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Wróć
                    </Button>
                    <span className="text-sm font-medium">
                      {format(date, "EEEE, dd.MM", { locale: pl })}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={time === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTimeSelect(slot)}
                        className={time === slot ? "bg-[#D32F2F] hover:bg-[#B71C1C]" : ""}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

                            {step === 3 && (
                <div className="space-y-4 py-2 h-full">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Wróć
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {date && format(date, "dd.MM")} o {time}
                    </span>
                  </div>

                  <p className="text-sm font-medium mb-2">Wybierz rodzaj usługi:</p>
                  <div className="grid grid-cols-2 gap-5">
                    {services.map((s) => (
                      <Button
                        key={s}
                        variant={service === s ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleServiceSelect(s)}
                        className={`justify-start text-xs ${
                          service === s ? "bg-[#D32F2F] hover:bg-[#B71C1C]" : ""
                        }`}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

                            {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4 py-2 h-full">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setStep(3)}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Wróć
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {date && format(date, "dd.MM")} o {time} • {service}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name" className="text-sm">Imię i nazwisko *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jan Kowalski"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="123 456 789"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jan@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="car" className="text-sm">Marka i model pojazdu</Label>
                    <Input
                      id="car"
                      value={carInfo}
                      onChange={(e) => setCarInfo(e.target.value)}
                      placeholder="np. VW Golf VI 1.6 TDI"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="gdpr"
                      checked={gdprConsent}
                      onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                      required
                    />
                    <Label htmlFor="gdpr" className="text-xs font-normal leading-tight cursor-pointer">
                      Wyrażam zgodę na przetwarzanie danych w celu kontaktu ws. wizyty. *
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#D32F2F] hover:bg-[#B71C1C]"
                    disabled={!name || !phone || !gdprConsent || submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      "Wyślij prośbę o wizytę"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Wolisz zadzwonić?{" "}
            <a href="tel:+48509795943" className="text-[#D32F2F] font-medium">
              509 795 943
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
