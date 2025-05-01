
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="studio-section-title text-studio-darkGray">
            About Our Studio
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6 text-center">
            At Beatbox Dance & Fitness Studio, we believe in the transformative power of movement. 
            Founded in 2015, our studio has grown into a vibrant community of dancers, 
            fitness enthusiasts, and artists of all levels.
          </p>
          
          <p className="text-lg mb-6 text-center">
            Our mission is to provide world-class dance and fitness instruction in a 
            supportive, inclusive environment where everyone can discover their rhythm, 
            express themselves, and achieve their physical goals.
          </p>
          
          <p className="text-lg mb-6 text-center">
            Whether you're a beginner taking your first dance steps or an experienced dancer 
            looking to refine your technique, our diverse class offerings and passionate 
            instructors are here to guide your journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-studio-blue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Professional Training</h3>
            <p>Expert instruction from industry professionals with years of experience.</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-studio-blue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Inclusive Community</h3>
            <p>A welcoming space for dancers of all ages, backgrounds, and experience levels.</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-studio-blue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Continuous Growth</h3>
            <p>Progressive training programs to help you evolve from basics to advanced skills.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
