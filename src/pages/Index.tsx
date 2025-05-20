
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickActions from '@/components/QuickActions';
import Calculator from '@/components/Calculator';
import EcoTips from '@/components/EcoTips';
import EcoQA from '@/components/EcoQA';
import Leaderboard from '@/components/Leaderboard';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <QuickActions />
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
              Carbon Footprint Calculator
            </h2>
            <Calculator />
          </div>
        </div>
        <EcoTips />
        <EcoQA />
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
