# Bano Wyderka Website

Nowoczesna strona internetowa warsztatu samochodowego Bano Wyderka w Ozorkowie.

## Struktura

```
src/features/website/
├── components/        # Współdzielone komponenty
│   ├── Navigation.tsx     # Nawigacja + mobilne menu
│   ├── Footer.tsx         # Stopka strony
│   └── MobileStickyCall.tsx  # Przycisk "Zadzwoń" na mobile
├── sections/          # Sekcje strony głównej
│   ├── Hero.tsx           # Hero z CTA
│   ├── Services.tsx       # Lista usług
│   ├── About.tsx          # O firmie (39 lat doświadczenia)
│   ├── WhyUs.tsx          # Dlaczego my
│   └── Contact.tsx        # Kontakt + formularz
├── hooks/             # Custom hooks (placeholder)
├── types/             # TypeScript types (placeholder)
└── utils/             # Utilities (placeholder)
```

## Funkcjonalności

- **Responsive design** - działa na wszystkich urządzeniach
- **Mobile-first** - priorytet dla użytkowników mobilnych
- **Click-to-call** - sticky przycisk na mobile
- **Schema.org** - markup dla SEO lokalnego
- **GDPR compliance** - zgoda RODO w formularzu
- **SEO optimized** - meta tagi, Open Graph, keywords

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Bun

## Deployment

```bash
cd bano-wyderka
bun run build
```

Wynik w folderze `dist/`.

## Dane firmy

- **Nazwa:** PPHU BANO-WYDERKA
- **Adres:** ul. Słowackiego 37, 95-035 Ozorków
- **Telefon:** 509 795 943
- **Email:** bano@bano.com.pl
- **Godziny:** Pn-Pt 8:00-17:00, Sb 10:00-14:00
- **Doświadczenie:** 39 lat
- **Sieć:** EuroWarsztat
