
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialBar from "@/components/SocialBar";
import AboutSection from "@/components/AboutSection";
import FeatureBar from "@/components/FeatureBar";
import ImageLinks from "@/components/ImageLinks";
import ContactFooter from "@/components/ContactFooter";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  console.log("Index component rendering"); // Debug log
  
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <HeroSection />
      <SocialBar />
      <AboutSection />
      <SectionDivider />
      <FeatureBar />
      <ImageLinks />
      <ContactFooter />
    </div>
  );
};

export default Index;
