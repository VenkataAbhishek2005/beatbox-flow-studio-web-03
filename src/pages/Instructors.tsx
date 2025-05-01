
import React from "react";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import ContactFooter from "@/components/ContactFooter";
import SectionDivider from "@/components/SectionDivider";

const Instructors = () => {
  // Sample instructor data - in a real app, this might come from an API
  const instructors = [
    {
      id: 1,
      name: "Michael Johnson",
      specialty: "Hip-Hop, Breaking",
      bio: "With over 15 years of experience in hip-hop and breaking, Michael has performed with numerous professional dance companies and toured internationally. His classes focus on building strong foundations while encouraging individual style and creativity.",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 2,
      name: "Sarah Williams",
      specialty: "Ballet, Contemporary",
      bio: "Sarah is a classically trained ballerina with a Bachelor's degree in Dance from Juilliard. She has performed with the American Ballet Theatre and teaches a contemporary approach to ballet that emphasizes proper technique and artistic expression.",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 3,
      name: "Diana Rodriguez",
      specialty: "Jazz, Commercial",
      bio: "Diana's background includes performing in music videos, commercials, and tours with major recording artists. Her classes combine technical jazz training with commercial choreography that prepares dancers for professional opportunities.",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 4,
      name: "Alex Chen",
      specialty: "Breaking, Street Styles",
      bio: "Alex is an internationally recognized b-boy who has won numerous battles and competitions. His teaching approach emphasizes the cultural foundations of street dance while developing technical skills and musicality.",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 5,
      name: "Jasmine Taylor",
      specialty: "Dance Fitness, Choreography",
      bio: "Jasmine combines her backgrounds in dance and personal training to create dynamic, effective workouts that build strength and endurance while having fun. Her classes welcome participants of all fitness levels.",
      image: "/placeholder.svg" // Replace with actual image
    },
    {
      id: 6,
      name: "Emma Wilson",
      specialty: "Children's Dance, Creative Movement",
      bio: "Emma specializes in early childhood dance education with a focus on developing coordination, creativity and a love for movement. Her engaging teaching style makes dance accessible and fun for the youngest dancers.",
      image: "/placeholder.svg" // Replace with actual image
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <SocialBar />
      
      {/* Header */}
      <div className="bg-studio-blue py-20 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Our Instructors</h1>
          <p className="text-xl text-center text-white mt-4 max-w-3xl mx-auto">
            Meet our talented team of professional instructors who are passionate about sharing their knowledge and love for dance.
          </p>
        </div>
      </div>
      
      {/* Instructors Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div 
                key={instructor.id} 
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div 
                  className="h-64 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${instructor.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                  <p className="text-studio-blue font-medium mb-4">{instructor.specialty}</p>
                  <p className="text-gray-600">{instructor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Our Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Teaching Team</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Are you a passionate dance instructor looking to share your expertise? We're always interested in meeting talented teachers who can bring new energy to our studio.
          </p>
          <a 
            href="/#contact" 
            className="bg-studio-blue text-white px-8 py-3 rounded-md hover:bg-studio-darkBlue transition-colors duration-300 inline-block text-lg"
          >
            Apply Now
          </a>
        </div>
      </section>
      
      <SectionDivider />
      <ContactFooter />
    </div>
  );
};

export default Instructors;
