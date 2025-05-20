
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';

const CalculatorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-eco-dark mb-3">
              Carbon Footprint Calculator
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Measure your environmental impact and find ways to reduce your carbon footprint with our easy-to-use calculator.
            </p>
            <Calculator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
