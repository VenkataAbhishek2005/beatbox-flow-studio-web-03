
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style after scrolling 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-studio-blue shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Studio Name */}
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 bg-studio-blue rounded-full flex items-center justify-center border-2 border-white">
              <span className="font-bold text-white text-lg">BB</span>
            </div>
            <span className="font-bold text-xl md:text-2xl">
              BEATBOX DANCE & FITNESS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`navbar-link ${isScrolled ? "text-white" : "text-white"}`}
            >
              Home
            </Link>
            <Link
              to="/classes"
              className={`navbar-link ${isScrolled ? "text-white" : "text-white"}`}
            >
              Classes
            </Link>
            <Link
              to="/instructors"
              className={`navbar-link ${isScrolled ? "text-white" : "text-white"}`}
            >
              Instructors
            </Link>
            <Link
              to="/gallery"
              className={`navbar-link ${isScrolled ? "text-white" : "text-white"}`}
            >
              Gallery
            </Link>
            <Link
              to="/#contact"
              className={`navbar-link ${isScrolled ? "text-white" : "text-white"}`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-4 bg-studio-blue animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white px-4 py-2 hover:bg-studio-darkBlue"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/classes"
                className="text-white px-4 py-2 hover:bg-studio-darkBlue"
                onClick={toggleMenu}
              >
                Classes
              </Link>
              <Link
                to="/instructors"
                className="text-white px-4 py-2 hover:bg-studio-darkBlue"
                onClick={toggleMenu}
              >
                Instructors
              </Link>
              <Link
                to="/gallery"
                className="text-white px-4 py-2 hover:bg-studio-darkBlue"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                to="/#contact"
                className="text-white px-4 py-2 hover:bg-studio-darkBlue"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
