
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  useEffect(() => {
    document.title = "Plannfly - Education Management Platform";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
      <ScrollReveal />
    </div>
  );
};

export default Index;
