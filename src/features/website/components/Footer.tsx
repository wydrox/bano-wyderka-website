import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold tracking-tight">
                  <span className="text-white">ban</span>
                  <span className="text-[#D32F2F]">o</span>
                </span>
                <span 
                  className="ml-1 text-lg font-light italic text-gray-500"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Wyderka
                </span>
              </div>
            </div>
            <p className="text-sm mb-4 max-w-md">
              Profesjonalny warsztat samochodowy z 39-letnim doświadczeniem. 
              Oferujemy kompleksowe usługi motoryzacyjne dla kierowców z Ozorkowa i okolic.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-[#D32F2F]/20 text-[#D32F2F] rounded text-xs font-medium">
                Członek EuroWarsztat
              </span>
              <span className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs font-medium">
                39 Lat Doświadczenia
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Szybkie Linki</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#services" className="hover:text-[#D32F2F] transition-colors">
                  Usługi
                </Link>
              </li>
              <li>
                <Link href="#cars" className="hover:text-[#D32F2F] transition-colors">
                  Samochody
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="hover:text-[#D32F2F] transition-colors">
                  Rezerwacja
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#D32F2F] transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#D32F2F] transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[#D32F2F] flex-shrink-0" />
                <span>ul. Słowackiego 37<br />95-035 Ozorków</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D32F2F] flex-shrink-0" />
                <a href="tel:+48509795943" className="hover:text-[#D32F2F] transition-colors">
                  509 795 943
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D32F2F] flex-shrink-0" />
                <a href="mailto:bano@bano.com.pl" className="hover:text-[#D32F2F] transition-colors">
                  bano@bano.com.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {currentYear} PPHU BANO-WYDERKA. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#D32F2F] transition-colors">
              Polityka Prywatności
            </Link>
            <Link href="#" className="hover:text-[#D32F2F] transition-colors">
              RODO
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
