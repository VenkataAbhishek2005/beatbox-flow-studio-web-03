
import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const SocialBar = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col bg-studio-darkBlue py-3 px-2 rounded-r-lg">
        <a 
          href="https://www.facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 group"
          aria-label="Facebook"
        >
          <Facebook className="w-6 h-6 text-white social-bar-icon group-hover:text-studio-lightBlue" />
        </a>
        
        <a 
          href="https://www.instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 group"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6 text-white social-bar-icon group-hover:text-studio-lightBlue" />
        </a>
        
        <a 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 group"
          aria-label="YouTube"
        >
          <Youtube className="w-6 h-6 text-white social-bar-icon group-hover:text-studio-lightBlue" />
        </a>
      </div>
    </div>
  );
};

export default SocialBar;
