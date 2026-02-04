import { Navigation } from "@/src/features/website/components/Navigation";
import { Footer } from "@/src/features/website/components/Footer";
import { MobileStickyCall } from "@/src/features/website/components/MobileStickyCall";
import { Hero } from "@/src/features/website/sections/Hero";
import { BrandsCarousel } from "@/src/features/website/sections/BrandsCarousel";
import { Services } from "@/src/features/website/sections/Services";
import { CarListings } from "@/src/features/website/sections/CarListings";
import { Scheduling } from "@/src/features/website/sections/Scheduling";
import { About } from "@/src/features/website/sections/About";
import { WhyUs } from "@/src/features/website/sections/WhyUs";
import { Contact } from "@/src/features/website/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pb-20 md:pb-0">
        <Hero />
        <BrandsCarousel />
        <Services />
        <CarListings />
        <Scheduling />
        <About />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCall />
    </>
  );
}
