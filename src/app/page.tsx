import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { OrderForm } from "@/components/sections/OrderForm";
import { Pricing } from "@/components/sections/Pricing";
import { RecommendedFeed } from "@/components/sections/RecommendedFeed";
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
        <RecommendedFeed />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <OrderForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
