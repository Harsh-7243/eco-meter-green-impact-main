import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Droplet, Zap, Leaf, Recycle, Globe } from 'lucide-react';

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
  },
  {
    title: "Shorter Showers",
    content: "Take shorter showers to save both water and energy.",
    category: "water"
  },
  {
    title: "LED Lighting",
    content: "Switch to LED bulbs to reduce your energy consumption.",
    category: "energy"
  },
  {
    title: "Compost Food Waste",
    content: "Composting food scraps reduces landfill waste and creates natural fertilizer.",
    category: "waste"
  },
  {
    title: "Bike or Walk",
    content: "Choose biking or walking for short trips to reduce emissions and improve health.",
    category: "energy"
  },
  {
    title: "Support Local Farmers",
    content: "Buy local produce to reduce transportation emissions and support your community.",
    category: "biodiversity"
  },
  {
    title: "Fix Leaks",
    content: "A dripping faucet can waste gallons of water a day. Fix leaks promptly!",
    category: "water"
  },
  {
    title: "Eco-Friendly Cleaning",
    content: "Use natural cleaning products to reduce chemical pollution in your home and waterways.",
    category: "waste"
  },
  {
    title: "Plant a Tree",
    content: "Trees absorb CO₂, provide shade, and support wildlife. Plant one today!",
    category: "biodiversity"
  },
  {
    title: "Turn Off Lights",
    content: "Switch off lights when leaving a room to save energy.",
    category: "energy"
  },
  {
    title: "Eat Less Meat",
    content: "Reducing meat consumption can lower your carbon footprint and improve health.",
    category: "biodiversity"
  }
];

const categoryStyles: Record<string, { color: string; icon: React.ReactNode }> = {
  water: {
    color: 'bg-blue-100 text-blue-700',
    icon: <Droplet className="h-5 w-5 text-blue-500" />
  },
  energy: {
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Zap className="h-5 w-5 text-yellow-500" />
  },
  waste: {
    color: 'bg-green-100 text-green-700',
    icon: <Recycle className="h-5 w-5 text-green-500" />
  },
  biodiversity: {
    color: 'bg-emerald-100 text-emerald-700',
    icon: <Globe className="h-5 w-5 text-emerald-500" />
  },
  default: {
    color: 'bg-gray-100 text-gray-700',
    icon: <Leaf className="h-5 w-5 text-eco" />
  }
};

const EcoTips = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-eco-light/30 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
          Eco Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tips.map((tip, idx) => {
            const style = categoryStyles[tip.category] || categoryStyles.default;
            return (
              <Card
                key={idx}
                className={cn(
                  'rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-0',
                  'bg-white flex flex-col h-full'
                )}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <span className={cn('rounded-full p-2 mr-3', style.color)}>
                      {style.icon}
                    </span>
                    <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                      {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-eco-dark mb-2">{tip.title}</h3>
                  <p className="text-gray-700 flex-1">{tip.content}</p>
                  {tip.category === 'biodiversity' && (
                    <div className="mt-4 p-3 rounded bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Did you know? Native plants require less water and support more wildlife!
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { tips };
export default EcoTips;
