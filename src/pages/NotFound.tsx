
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-studio-blue mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-8">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            className="bg-studio-blue hover:bg-studio-darkBlue text-white px-8 py-6"
            asChild
          >
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      
      <ContactFooter />
    </div>
  );
};

export default NotFound;
