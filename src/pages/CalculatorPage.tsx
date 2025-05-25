import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';

const CalculatorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate('/')} className="mb-4 text-eco hover:underline flex items-center">
            <span className="mr-2">←</span> Back
          </button>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
