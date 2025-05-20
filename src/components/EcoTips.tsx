
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const tips = [
  {
    title: "Save Water",
    content: "Turn off the tap while brushing your teeth. This can save up to 8 gallons of water per day.",
    category: "water"
  },
  {
    title: "Reduce Electricity",
    content: "Unplug electronics when not in use. Even when turned off, many devices continue to draw power.",
    category: "energy"
  },
  {
    title: "Go Paperless",
    content: "Sign up for e-statements and bills to reduce paper waste and save trees.",
    category: "waste"
  },
  {
    title: "Reusable Bags",
    content: "Bring your own reusable shopping bags to reduce plastic waste.",
    category: "waste"
  },
  {
    title: "Plant Native",
    content: "Use native plants in your garden to reduce water usage and support local ecosystems.",
    category: "biodiversity"
  }
];

const EcoTips = () => {
  return (
    <div className="py-12 bg-eco-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
          Eco Tips & Challenges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <Card 
              key={index}
              className={cn(
                "overflow-hidden hover:shadow-lg transition-shadow duration-300",
                index % 2 === 0 ? "border-l-4 border-eco" : "border-l-4 border-eco-leaf"
              )}
            >
              <div className={cn(
                "h-2", 
                tip.category === "water" ? "bg-blue-400" : 
                tip.category === "energy" ? "bg-yellow-400" :
                tip.category === "waste" ? "bg-orange-400" :
                "bg-green-400"
              )} />
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 text-eco-dark">{tip.title}</h3>
                <p className="text-gray-700">{tip.content}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    tip.category === "water" ? "bg-blue-100 text-blue-700" : 
                    tip.category === "energy" ? "bg-yellow-100 text-yellow-700" :
                    tip.category === "waste" ? "bg-orange-100 text-orange-700" :
                    "bg-green-100 text-green-700"
                  )}>
                    {tip.category}
                  </span>
                  <button className="text-eco hover:underline text-sm font-medium">
                    Try this challenge
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoTips;
