import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bano Wyderka | Warsztat Samochodowy Ozorków - 39 Lat Doświadczenia",
  description: "Profesjonalny warsztat samochodowy w Ozorkowie. Mechanika, blacharstwo, lakiernictwo, klimatyzacja, wulkanizacja. Członek sieci EuroWarsztat. 39 lat doświadczenia.",
  keywords: "warsztat samochodowy, mechanik, Ozorków, blacharstwo, lakiernictwo, naprawa samochodów, klimatyzacja samochodowa, wulkanizacja, pomoc drogowa",
  authors: [{ name: "Bano Wyderka" }],
  creator: "Bano Wyderka",
  metadataBase: new URL("https://bano-wyderka.pl"),
  openGraph: {
    title: "Bano Wyderka | Warsztat Samochodowy Ozorków",
    description: "Profesjonalny warsztat samochodowy w Ozorkowie. 39 lat doświadczenia. Mechanika, blacharstwo, lakiernictwo.",
    type: "website",
    locale: "pl_PL",
    siteName: "Bano Wyderka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: "PPHU BANO-WYDERKA",
              image: "https://bano-wyderka.pl/og-image.jpg",
              telephone: "+48 509 795 943",
              email: "bano@bano.com.pl",
              url: "https://bano-wyderka.pl",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ul. Słowackiego 37",
                addressLocality: "Ozorków",
                postalCode: "95-035",
                addressCountry: "PL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 51.9654,
                longitude: 19.2915,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "17:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "10:00",
                  closes: "14:00",
                },
              ],
              priceRange: "$$",
              paymentAccepted: "Cash, Credit Card",
              currenciesAccepted: "PLN",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
