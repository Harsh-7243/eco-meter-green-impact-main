import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuickActions from '@/components/QuickActions';

const QuickActionsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <button onClick={() => navigate('/')} className="mb-4 text-eco hover:underline flex items-center">
            <span className="mr-2">←</span> Back
          </button>
          <h1 className="text-3xl font-bold text-center text-eco-dark mb-8">
            Quick Actions
          </h1>
          <QuickActions />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuickActionsPage; 