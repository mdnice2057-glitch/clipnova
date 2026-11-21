import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LogoStrip />
        <Stats />
        <Services />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
