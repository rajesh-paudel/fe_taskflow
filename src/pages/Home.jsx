import React from "react";
import HeroSection from "../components/HeroSection";
import KeyBenefits from "../components/KeyBenefitsSection";
import HowItWorks from "../components/HowItWorksSection";
import ProductPreview from "../components/ProductPreviewSection";
import FeatureDeepDive from "../components/FeatureSection";
import Testimonials from "../components/Testimonials";
import Stats from "../components/Sats";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <KeyBenefits />
      <HowItWorks />
      <ProductPreview />
      <FeatureDeepDive />
      <Testimonials />
      <Stats />
    </div>
  );
};

export default Home;
