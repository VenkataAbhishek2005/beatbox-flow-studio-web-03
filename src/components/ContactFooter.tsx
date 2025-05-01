
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const ContactFooter = () => {
  return (
    <footer id="contact" className="bg-studio-blue text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Address & Social */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 uppercase">Visit Us</h3>
            <p className="mb-4">
              123 Dance Street<br />
              Rhythm City, RC 10001<br />
              United States
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <Facebook />
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <Instagram />
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <Youtube />
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Navigation & Contact */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 uppercase">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-studio-lightBlue transition-colors duration-200">
                Home
              </Link>
              <Link to="/classes" className="hover:text-studio-lightBlue transition-colors duration-200">
                Classes
              </Link>
              <Link to="/instructors" className="hover:text-studio-lightBlue transition-colors duration-200">
                Instructors
              </Link>
              <Link to="/gallery" className="hover:text-studio-lightBlue transition-colors duration-200">
                Gallery
              </Link>
            </nav>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 mr-2" />
                <a 
                  href="tel:+11234567890" 
                  className="hover:text-studio-lightBlue transition-colors duration-200"
                >
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a 
                  href="mailto:info@beatboxstudio.com" 
                  className="hover:text-studio-lightBlue transition-colors duration-200"
                >
                  info@beatboxstudio.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 3: Map */}
          <div className="h-64 lg:h-auto">
            <h3 className="text-xl font-bold mb-4 uppercase">Find Us</h3>
            <div className="h-full min-h-64 bg-gray-200 rounded overflow-hidden">
              {/* Replace with actual Google Map embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1649194736192!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-studio-darkBlue py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Beatbox Dance & Fitness Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
