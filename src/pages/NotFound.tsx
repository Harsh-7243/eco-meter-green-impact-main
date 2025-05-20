
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="text-center px-4">
          <div className="bg-eco-light inline-flex rounded-full p-4 mb-6">
            <div className="text-eco text-4xl">🍃</div>
          </div>
          <h1 className="text-5xl font-bold text-eco-dark mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! We couldn't find the page you're looking for. Seems like this path is not on our eco-friendly map.
          </p>
          <Button asChild className="bg-eco hover:bg-eco-dark text-white px-6 py-2">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
