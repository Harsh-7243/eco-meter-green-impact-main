
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, Bus, Leaf, Trash, Lightbulb, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ActionStats {
  carbonFootprint: number;
  bikeToWork: number;
  publicTransport: number;
  treesPlanted: number;
  wasteSegregated: number;
  energySaved: number;
  mentalExercise: number;
}

const QuickActions = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<ActionStats>({
    carbonFootprint: 0,
    bikeToWork: 0,
    publicTransport: 0,
    treesPlanted: 0,
    wasteSegregated: 0,
    energySaved: 0,
    mentalExercise: 0,
  });

  const handleActionClick = (action: keyof ActionStats) => {
    setStats((prev) => ({
      ...prev,
      [action]: prev[action] + 1,
    }));

    const messages: Record<keyof ActionStats, string> = {
      carbonFootprint: "Carbon footprint calculated!",
      bikeToWork: "Great job biking to work! 🚲 You saved 3.5kg of CO2 emissions",
      publicTransport: "You chose public transport! 🚌 Saved 2.8kg of CO2 emissions",
      treesPlanted: "You planted a tree! 🌱 It will absorb ~25kg of CO2 annually",
      wasteSegregated: "Waste properly segregated! ♻️ Thank you for recycling",
      energySaved: "Energy efficient choice! 💡 Saved 5 kWh of electricity",
      mentalExercise: "Mental wellness exercise logged! 🧘 Great for your wellbeing",
    };

    toast({
      title: "Action Recorded!",
      description: messages[action],
    });
  };

  const ActionCard = ({ title, icon, action, isLink = false, to = "" }: { 
    title: string; 
    icon: React.ReactNode; 
    action: keyof ActionStats;
    isLink?: boolean;
    to?: string;
  }) => {
    const content = (
      <div className="text-eco mb-3 text-3xl">{icon}</div>
    );

    if (isLink) {
      return (
        <Card className="eco-card hover:shadow-lg transition-all duration-300">
          <Link to={to}>
            <CardContent className="p-4 flex flex-col items-center">
              {content}
              <h3 className="font-medium text-gray-800">{title}</h3>
              <div className="mt-2 text-sm text-gray-500">
                Count: <span className="font-bold text-eco">{stats[action]}</span>
              </div>
            </CardContent>
          </Link>
        </Card>
      );
    }

    return (
      <Card 
        className="eco-card hover:shadow-lg transition-all duration-300" 
        onClick={() => handleActionClick(action)}
      >
        <CardContent className="p-4 flex flex-col items-center">
          {content}
          <h3 className="font-medium text-gray-800">{title}</h3>
          <div className="mt-2 text-sm text-gray-500">
            Count: <span className="font-bold text-eco">{stats[action]}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <ActionCard 
            title="Carbon Footprint" 
            icon={<Calculator size={36} />} 
            action="carbonFootprint" 
            isLink={true}
            to="/calculator"
          />
          <ActionCard 
            title="Bike to Work" 
            icon={<Bike size={36} />} 
            action="bikeToWork" 
          />
          <ActionCard 
            title="Public Transport" 
            icon={<Bus size={36} />} 
            action="publicTransport" 
          />
          <ActionCard 
            title="Plant a Tree" 
            icon={<Leaf size={36} />} 
            action="treesPlanted" 
          />
          <ActionCard 
            title="Waste Segregation" 
            icon={<Trash size={36} />} 
            action="wasteSegregated" 
          />
          <ActionCard 
            title="Energy Saved" 
            icon={<Lightbulb size={36} />} 
            action="energySaved" 
          />
          <ActionCard 
            title="Mental Exercise" 
            icon={<span role="img" aria-label="yoga">🧘</span>} 
            action="mentalExercise"
            isLink={true}
            to="/yoga"
          />
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/ecotips">
            <Button className="bg-eco hover:bg-eco-dark text-white px-6">
              View All Actions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
