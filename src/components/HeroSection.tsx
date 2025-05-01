
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  // Images for carousel
  const carouselImages = [
    "/placeholder.svg", // Using placeholder until real images are added
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel Images */}
      <div className="absolute inset-0 bg-studio-darkGray">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="studio-title mb-6">
          <span className="text-white">BEAT</span>
          <span className="text-studio-blue">BOX</span>
          <span className="text-studio-red"> STUDIO</span>
        </h1>
        
        <p className="text-white text-xl md:text-2xl max-w-3xl mb-8 animate-fade-in">
          Where passion meets movement. Discover your rhythm with us.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
          <Button 
            className="bg-studio-blue hover:bg-studio-darkBlue text-white px-8 py-6 text-lg"
            asChild
          >
            <a href="/classes">
              Join a Class
            </a>
          </Button>
          <Button 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-studio-darkGray text-white px-8 py-6 text-lg"
            variant="outline"
            asChild
          >
            <a href="/#contact">
              Contact Us
            </a>
          </Button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-studio-blue w-8" 
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
