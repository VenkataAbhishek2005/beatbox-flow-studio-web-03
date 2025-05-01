
import React from "react";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import ContactFooter from "@/components/ContactFooter";
import SectionDivider from "@/components/SectionDivider";

const Classes = () => {
  // Sample class data - in a real app, this might come from an API
  const danceClasses = [
    {
      id: 1,
      name: "Hip-Hop Fundamentals",
      description: "Learn the foundations of hip-hop dance with an emphasis on rhythm, groove, and self-expression.",
      level: "Beginner",
      duration: "60 min",
      days: "Monday, Wednesday",
      time: "6:00 PM",
      instructor: "Michael Johnson"
    },
    {
      id: 2,
      name: "Contemporary Ballet",
      description: "A fusion of classical ballet technique with contemporary movement styles for a dynamic dance experience.",
      level: "Intermediate",
      duration: "75 min",
      days: "Tuesday, Thursday",
      time: "5:30 PM",
      instructor: "Sarah Williams"
    },
    {
      id: 3,
      name: "Jazz Funk",
      description: "High-energy class combining jazz technique with funk-style movements and commercial choreography.",
      level: "All Levels",
      duration: "60 min",
      days: "Friday",
      time: "7:00 PM",
      instructor: "Diana Rodriguez"
    },
    {
      id: 4,
      name: "Breaking & Street Styles",
      description: "Learn breaking, popping, locking and various street dance styles in this dynamic class.",
      level: "Beginner/Intermediate",
      duration: "90 min",
      days: "Saturday",
      time: "1:00 PM",
      instructor: "Alex Chen"
    },
    {
      id: 5,
      name: "Dance Fitness",
      description: "A high-energy workout combining dance moves with fitness exercises for a full-body experience.",
      level: "All Levels",
      duration: "45 min",
      days: "Monday, Wednesday, Friday",
      time: "12:00 PM",
      instructor: "Jasmine Taylor"
    },
    {
      id: 6,
      name: "Kids Dance (Ages 5-8)",
      description: "A fun introduction to dance for children focusing on coordination, rhythm, and creativity.",
      level: "Children",
      duration: "45 min",
      days: "Saturday",
      time: "10:00 AM",
      instructor: "Emma Wilson"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <SocialBar />
      
      {/* Header */}
      <div className="bg-studio-blue py-20 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Our Classes</h1>
          <p className="text-xl text-center text-white mt-4 max-w-3xl mx-auto">
            Discover our wide range of dance and fitness classes for all ages and skill levels
          </p>
        </div>
      </div>
      
      {/* Classes List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {danceClasses.map((danceClass) => (
              <div 
                key={danceClass.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-studio-blue h-2" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{danceClass.name}</h3>
                  <p className="text-gray-600 mb-4">{danceClass.description}</p>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Level:</span>
                      <span>{danceClass.level}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Duration:</span>
                      <span>{danceClass.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Days:</span>
                      <span>{danceClass.days}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Time:</span>
                      <span>{danceClass.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Instructor:</span>
                      <span>{danceClass.instructor}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 bg-studio-blue text-white py-2 rounded-md hover:bg-studio-darkBlue transition-colors duration-300">
                    Sign Up
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Dancing?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community of dancers and discover the joy of movement. Contact us to schedule your first class today!
          </p>
          <a 
            href="/#contact" 
            className="bg-studio-blue text-white px-8 py-3 rounded-md hover:bg-studio-darkBlue transition-colors duration-300 inline-block text-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
      
      <SectionDivider />
      <ContactFooter />
    </div>
  );
};

export default Classes;
