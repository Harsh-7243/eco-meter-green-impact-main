
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-eco-light to-white py-12 md:py-20">
      <div
        className="absolute inset-0 opacity-20 bg-pattern-leaves bg-repeat"
        style={{ backgroundSize: "400px" }}
      ></div>
      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-dark mb-4">
            Track Your <span className="text-eco">Green Impact</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            One step at a time, measure and improve your environmental footprint
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              className="bg-eco hover:bg-eco-dark text-white px-8 py-6 rounded-full text-lg"
            >
              Start Tracking
            </Button>
            <Button
              variant="outline"
              className="border-eco text-eco hover:bg-eco-light px-8 py-6 rounded-full text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-eco rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 bg-eco rounded-full flex items-center justify-center">
              <div className="text-white text-9xl">🍃</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
