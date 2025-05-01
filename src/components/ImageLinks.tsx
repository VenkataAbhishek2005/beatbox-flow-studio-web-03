
import React from "react";
import { Link } from "react-router-dom";

const ImageLinks = () => {
  const links = [
    {
      title: "Classes",
      description: "Explore our wide range of dance and fitness classes",
      path: "/classes",
      image: "/placeholder.svg", // Replace with actual image
    },
    {
      title: "Instructors",
      description: "Meet our talented team of professional instructors",
      path: "/instructors",
      image: "/placeholder.svg", // Replace with actual image
    },
    {
      title: "Gallery",
      description: "View photos and videos from our performances and events",
      path: "/gallery",
      image: "/placeholder.svg", // Replace with actual image
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="studio-section-title text-studio-darkGray">
            Discover More
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-80"
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${link.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-studio-blue transition-colors duration-300">
                  {link.title}
                </h3>
                <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageLinks;
