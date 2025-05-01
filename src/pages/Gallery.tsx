
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import ContactFooter from "@/components/ContactFooter";
import SectionDivider from "@/components/SectionDivider";

const Gallery = () => {
  // Categories for filtering
  const categories = ["All", "Performances", "Classes", "Events", "Workshops"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Sample gallery data - in a real app, this would come from an API
  const galleryItems = [
    {
      id: 1,
      title: "Summer Dance Showcase 2023",
      category: "Performances",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 2,
      title: "Hip-Hop Class",
      category: "Classes",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 3,
      title: "International Dance Day",
      category: "Events",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 4,
      title: "Contemporary Workshop",
      category: "Workshops",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 5,
      title: "Ballet Performance",
      category: "Performances",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 6,
      title: "Children's Dance Class",
      category: "Classes",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 7,
      title: "Dance Competition",
      category: "Events",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 8,
      title: "Guest Teacher Workshop",
      category: "Workshops",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 9,
      title: "Winter Showcase",
      category: "Performances",
      image: "/placeholder.svg" // Replace with actual image
    }
  ];
  
  // Filter gallery items based on active category
  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <SocialBar />
      
      {/* Header */}
      <div className="bg-studio-blue py-20 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Gallery</h1>
          <p className="text-xl text-center text-white mt-4 max-w-3xl mx-auto">
            Explore photos from our performances, classes, and events
          </p>
        </div>
      </div>
      
      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 m-2 rounded-full transition-colors duration-300 ${
                  activeCategory === category
                    ? "bg-studio-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative group cursor-pointer">
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-gray-200 text-sm">{item.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Next Photo Shoot</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our classes and performances to be featured in our gallery. Everyone has a chance to shine!
          </p>
          <a 
            href="/classes" 
            className="bg-studio-blue text-white px-8 py-3 rounded-md hover:bg-studio-darkBlue transition-colors duration-300 inline-block text-lg"
          >
            View Classes
          </a>
        </div>
      </section>
      
      <SectionDivider />
      <ContactFooter />
    </div>
  );
};

export default Gallery;
