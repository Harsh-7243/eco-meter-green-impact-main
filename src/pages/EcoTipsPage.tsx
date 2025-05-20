
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EcoTips from '@/components/EcoTips';

const EcoTipsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-eco-dark mb-8">
              Eco Tips & Challenges
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Discover simple and effective ways to reduce your environmental footprint and make a positive impact on the planet. Try these eco-friendly challenges today!
            </p>
          </div>
        </div>
        <EcoTips />
      </main>
      <Footer />
    </div>
  );
};

export default EcoTipsPage;
