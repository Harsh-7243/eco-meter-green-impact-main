import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { tips as ecoTipsList } from "@/components/EcoTips";

interface HeroProps {
  onLearnMore: () => void;
}

const Hero = ({ onLearnMore }: HeroProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [randomTip, setRandomTip] = useState<any>(null);
  const [showTipModal, setShowTipModal] = useState(false);

  const handleStartTracking = () => {
    if (isAuthenticated) {
      // If user is already logged in, navigate to profile
      navigate('/profile');
    } else {
      // If user is not logged in, navigate to login page with return path
      navigate('/login', { 
        state: { 
          from: { 
            pathname: '/profile',
            search: '?tab=actions'
          } 
        } 
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const tip = ecoTipsList[Math.floor(Math.random() * ecoTipsList.length)];
      setRandomTip(tip);
      setShowTipModal(true);
      const timer = setTimeout(() => setShowTipModal(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

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
              onClick={handleStartTracking}
              className="bg-eco hover:bg-eco-dark text-white px-8 py-6 rounded-full text-lg"
            >
              Start Tracking
            </Button>
            <Button
              variant="outline"
              className="border-eco text-eco hover:bg-eco-light px-8 py-6 rounded-full text-lg"
              onClick={onLearnMore}
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
      {/* Eco Tip Modal */}
      {showTipModal && randomTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative flex flex-col items-center">
            <button
              className="absolute top-2 right-4 text-gray-400 hover:text-eco text-2xl font-bold"
              onClick={() => setShowTipModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-eco-dark mb-2">Eco Tip</h3>
            <div className="mb-2 text-eco text-4xl">🌱</div>
            <h4 className="font-semibold text-lg mb-1">{randomTip.title}</h4>
            <p className="text-gray-700 text-center mb-2">{randomTip.content}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-eco-light text-eco-dark">
              {randomTip.category.charAt(0).toUpperCase() + randomTip.category.slice(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
