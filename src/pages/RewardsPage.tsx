import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gift, ChevronRight, Info, Sparkles, Star, Award } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Reward {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsRequired: number;
  category: string;
  isNew?: boolean;
  isExclusive?: boolean;
  availableUntil?: string;
}

const rewards: Reward[] = [
  {
    id: 'amazon-10',
    title: '$10 Amazon Gift Card',
    description: 'Redeem your eco points for a $10 Amazon Gift Card to use on your next purchase.',
    image: '/rewards/amazon_gift_card.avif',
    pointsRequired: 1000,
    category: 'shopping',
    isNew: true
  },
  {
    id: 'zoo-tickets',
    title: 'Two Zoo Tickets',
    description: 'Get free admission for two to your local zoo and learn about wildlife conservation efforts.',
    image: '/rewards/zoo_ticket.avif',
    pointsRequired: 750,
    category: 'experience'
  },
  {
    id: 'plant-tree',
    title: 'Plant a Tree in Your Name',
    description: 'We\'ll plant a tree in a deforested area and send you a certificate with GPS coordinates.',
    image: '/rewards/plant_a_tree.webp',
    pointsRequired: 500,
    category: 'environment'
  },
  {
    id: 'sustainable-cup',
    title: 'Reusable Coffee Cup',
    description: 'A high-quality insulated coffee cup made from recycled materials - perfect for your daily coffee routine.',
    image: '/rewards/Reusable_Coffee_Cup.webp',
    pointsRequired: 350,
    category: 'lifestyle'
  },
  {
    id: 'garden-kit',
    title: 'Home Garden Starter Kit',
    description: 'Begin your gardening journey with this complete starter kit including seeds, pots, and soil.',
    image: '/rewards/Home_Garden_Starter_Kit.webp',
    pointsRequired: 450,
    category: 'lifestyle'
  },
  {
    id: 'eco-workshop',
    title: 'Sustainability Workshop',
    description: 'Attend an exclusive online workshop with environmental experts on sustainable living practices.',
    image: '/rewards/Sustainability_Workshop.jpg',
    pointsRequired: 200,
    category: 'education',
    isExclusive: true
  },
  {
    id: 'donation-wwf',
    title: '25$ Donation to WWF',
    description: 'We\'ll make a $25 donation in your name to the World Wildlife Fund to support conservation efforts.',
    image: '/rewards/donation_to_wwf.jpg',
    pointsRequired: 600,
    category: 'charity'
  },
  {
    id: 'premium-month',
    title: '1 Month Premium Membership',
    description: 'Upgrade to premium membership with advanced tracking features and exclusive content.',
    image: '/rewards/premium_membership.webp',
    pointsRequired: 800,
    category: 'membership',
    availableUntil: '2025-06-30'
  },
];

const RewardsPage = () => {
  const userPoints = 840;
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredReward, setHoveredReward] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = Array.from(new Set(rewards.map(reward => reward.category)));

  const filteredRewards = selectedCategory 
    ? rewards.filter(reward => reward.category === selectedCategory)
    : rewards;

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.pointsRequired) {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title}. Check your email for details.`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.pointsRequired - userPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate('/')} className="mb-4 text-eco hover:underline flex items-center">
            <span className="mr-2">←</span> Back
          </button>
          <h1 className="text-3xl font-bold text-center text-eco-dark mb-8">
            Rewards
          </h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto mb-10 bg-white rounded-xl shadow-lg overflow-hidden border border-eco-light"
          >
            <div className="bg-eco-gradient p-8 text-white relative overflow-hidden">
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Your Eco Points</h3>
                  <p className="text-white text-opacity-90">Redeem points for exciting rewards</p>
                </div>
                <div className="text-5xl font-bold flex items-center">
                  <span className="mr-2 text-amber-200">{userPoints}</span>
                  <Star className="h-8 w-8 text-amber-200" />
                </div>
              </div>
              
              <div className="absolute top-0 right-0 h-full w-1/3 opacity-10">
                <Award className="h-full w-full" />
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-green-50 rounded-xl p-6 text-center shadow-sm border border-eco border-opacity-20"
                >
                  <h4 className="font-medium text-sm mb-1 text-gray-500">Lifetime Points</h4>
                  <p className="text-3xl font-bold text-eco-dark">1,245</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-eco-light rounded-xl p-6 text-center shadow-sm border border-eco border-opacity-20"
                >
                  <h4 className="font-medium text-sm mb-1 text-gray-500">Points This Month</h4>
                  <p className="text-3xl font-bold text-eco-dark">320</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-amber-50 rounded-xl p-6 text-center shadow-sm border border-amber-200 border-opacity-20"
                >
                  <h4 className="font-medium text-sm mb-1 text-gray-500">Rewards Redeemed</h4>
                  <p className="text-3xl font-bold text-eco-dark">3</p>
                </motion.div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Next reward milestone: $10 Amazon Gift Card</p>
                <p className="text-sm font-medium">{userPoints}/1000 points</p>
              </div>
              <Progress value={(userPoints / 1000) * 100} className="h-3 bg-gray-100" />
            </div>
          </motion.div>
          
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setSelectedCategory(null)}
              className={`${!selectedCategory ? 'bg-eco text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Rewards
            </Button>
            {categories.map(category => (
              <Button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize ${selectedCategory === category ? 'bg-eco text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {filteredRewards.map(reward => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredReward(reward.id)}
                onHoverEnd={() => setHoveredReward(null)}
              >
                <Card className="overflow-hidden h-full flex flex-col border-2 transition-all duration-300 shadow-sm hover:shadow-xl"
                  style={{ borderColor: hoveredReward === reward.id ? '#4CAF50' : 'transparent' }}>
                  <div className="relative h-48">
                    <img 
                      src={reward.image} 
                      alt={reward.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: hoveredReward === reward.id ? 'scale(1.05)' : 'scale(1)' }}
                    />
                    {reward.isNew && (
                      <Badge className="absolute top-2 right-2 bg-eco text-white">
                        New
                      </Badge>
                    )}
                    {reward.isExclusive && (
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
                        Exclusive
                      </Badge>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                      <p className="text-white font-medium text-sm">{reward.category.toUpperCase()}</p>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      {reward.title}
                    </CardTitle>
                    {reward.availableUntil && (
                      <CardDescription className="flex items-center text-amber-600">
                        <Info className="h-3 w-3 mr-1" />
                        Available until {new Date(reward.availableUntil).toLocaleDateString()}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="py-0 flex-grow">
                    <p className="text-gray-600 text-sm">{reward.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="font-bold text-eco-dark flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-amber-400 stroke-amber-500" />
                      {reward.pointsRequired} points
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileTap={{ scale: 0.95 }}>
                            <Button 
                              size="sm" 
                              disabled={userPoints < reward.pointsRequired}
                              onClick={() => handleRedeemReward(reward)}
                              className={userPoints >= reward.pointsRequired ? "bg-eco hover:bg-eco-dark text-white" : ""}
                            >
                              Redeem
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        {userPoints < reward.pointsRequired && (
                          <TooltipContent>
                            <p>You need {reward.pointsRequired - userPoints} more points</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-5xl mx-auto border border-eco-light">
            <h3 className="font-semibold mb-6 text-xl text-eco-dark flex items-center">
              <Gift className="h-5 w-5 mr-2 text-eco" />
              How to Earn More Points
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border border-eco border-opacity-30 rounded-lg p-6 bg-gradient-to-br from-white to-eco-light bg-opacity-50"
              >
                <h4 className="font-medium mb-3 text-eco-dark">Daily Actions</h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Record sustainable transportation <span className="font-medium text-eco-dark">(+5 pts)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Track energy-saving activities <span className="font-medium text-eco-dark">(+3 pts)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Waste recycling and composting <span className="font-medium text-eco-dark">(+2 pts)</span></span>
                  </li>
                </ul>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border border-eco border-opacity-30 rounded-lg p-6 bg-gradient-to-br from-white to-eco-light bg-opacity-50"
              >
                <h4 className="font-medium mb-3 text-eco-dark">Challenges</h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Complete weekly eco challenges <span className="font-medium text-eco-dark">(+25 pts)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Join community cleanup events <span className="font-medium text-eco-dark">(+50 pts)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Participate in eco workshops <span className="font-medium text-eco-dark">(+15 pts)</span></span>
                  </li>
                </ul>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border border-eco border-opacity-30 rounded-lg p-6 bg-gradient-to-br from-white to-eco-light bg-opacity-50"
              >
                <h4 className="font-medium mb-3 text-eco-dark">Education</h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Complete eco knowledge quizzes <span className="font-medium text-eco-dark">(+10 pts)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Read sustainability articles <span className="font-medium text-eco-dark">(+5 pts)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eco mr-2">•</span>
                    <span>Share eco tips with friends <span className="font-medium text-eco-dark">(+3 pts)</span></span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsPage;
