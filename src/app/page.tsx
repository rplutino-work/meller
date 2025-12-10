import PromoBanner from "@/components/home/PromoBanner";
import HeroSection from "@/components/home/HeroSection";
import ProductCards from "@/components/home/ProductCards";
import ValuesSection from "@/components/home/ValuesSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <HeroSection />
      <ProductCards />
      <ValuesSection />
      <ContactSection />
    </>
  );
}
