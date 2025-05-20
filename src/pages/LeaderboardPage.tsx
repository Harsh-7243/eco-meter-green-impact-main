
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const globalLeaderboardData = [
  { rank: 1, name: "Emma Watson", score: 840, eco_actions: 42, image: "/src/assets/avatar1.png", badges: ["Tree Master", "Recycling Pro"] },
  { rank: 2, name: "Thomas Green", score: 790, eco_actions: 38, image: "/src/assets/avatar2.png", badges: ["Water Saver"] },
  { rank: 3, name: "Sophia Chen", score: 760, eco_actions: 35, image: "/src/assets/avatar3.png", badges: ["Energy Star"] },
  { rank: 4, name: "Miguel Lopez", score: 710, eco_actions: 32, image: "/src/assets/avatar4.png", badges: ["Bike Hero"] },
  { rank: 5, name: "Jessica Taylor", score: 680, eco_actions: 30, image: "/src/assets/avatar5.png", badges: [] },
];

const localLeaderboardData = [
  { rank: 1, name: "Carlos Rodriguez", score: 720, eco_actions: 35, image: "/src/assets/avatar3.png", badges: ["Bike Hero", "Energy Star"] },
  { rank: 2, name: "Emma Watson", score: 695, eco_actions: 32, image: "/src/assets/avatar1.png", badges: ["Tree Master"] },
  { rank: 3, name: "Lin Wei", score: 660, eco_actions: 30, image: "/src/assets/avatar2.png", badges: ["Water Saver"] },
  { rank: 4, name: "Zoe Mitchell", score: 610, eco_actions: 28, image: "/src/assets/avatar5.png", badges: [] },
  { rank: 5, name: "David Thompson", score: 580, eco_actions: 25, image: "/src/assets/avatar4.png", badges: ["Energy Star"] },
];

const friendsLeaderboardData = [
  { rank: 1, name: "Sarah Johnson", score: 710, eco_actions: 34, image: "/src/assets/avatar5.png", badges: ["Recycling Pro", "Energy Star"] },
  { rank: 2, name: "Emma Watson", score: 695, eco_actions: 32, image: "/src/assets/avatar1.png", badges: ["Tree Master"] },
  { rank: 3, name: "John Smith", score: 630, eco_actions: 29, image: "/src/assets/avatar4.png", badges: ["Bike Hero"] },
  { rank: 4, name: "Aisha Patel", score: 590, eco_actions: 27, image: "/src/assets/avatar2.png", badges: ["Water Saver"] },
  { rank: 5, name: "Michael Brown", score: 540, eco_actions: 24, image: "/src/assets/avatar3.png", badges: [] },
];

interface LeaderboardUser {
  rank: number;
  name: string;
  score: number;
  eco_actions: number;
  image: string;
  badges: string[];
}

const LeaderboardTable = ({ data }: { data: LeaderboardUser[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="py-4 px-6 text-sm font-medium text-gray-500">RANK</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-500">USER</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-500">ECO SCORE</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-500">ACTIONS</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-500">BADGES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr 
              key={index} 
              className={`
                border-b hover:bg-gray-50 transition-colors
                ${user.rank === 1 ? 'bg-yellow-50' : ''}
                ${user.rank === 2 ? 'bg-gray-50' : ''}
                ${user.rank === 3 ? 'bg-orange-50' : ''}
              `}
            >
              <td className="py-4 px-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-eco-light text-eco-dark font-bold">
                  {user.rank}
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-eco-light text-eco">
                      {user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="font-bold text-eco">{user.score}</div>
              </td>
              <td className="py-4 px-6">{user.eco_actions}</td>
              <td className="py-4 px-6">
                <div className="flex flex-wrap gap-1">
                  {user.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="outline" className="bg-eco-light text-eco border-eco">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
            Eco Leaderboards
          </h2>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="global">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="local">Local</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="global">
                <Card className="overflow-hidden border-0 shadow-md">
                  <CardHeader className="bg-eco-gradient py-4">
                    <CardTitle className="text-center text-white">Global Eco Leaders</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <LeaderboardTable data={globalLeaderboardData} />
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4">How Global Ranking Works</h3>
                  <p className="text-gray-600">
                    Global rankings are calculated based on your total eco score from actions performed around the world. 
                    Compete with users from different countries and see how your environmental impact stacks up globally!
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="local">
                <Card className="overflow-hidden border-0 shadow-md">
                  <CardHeader className="bg-eco-gradient py-4">
                    <CardTitle className="text-center text-white">Local Eco Leaders</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <LeaderboardTable data={localLeaderboardData} />
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4">Local Community Impact</h3>
                  <p className="text-gray-600">
                    Local rankings show how you compare to others in your city or region. 
                    Make a difference in your community by climbing the local leaderboard and inspiring neighbors!
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="friends">
                <Card className="overflow-hidden border-0 shadow-md">
                  <CardHeader className="bg-eco-gradient py-4">
                    <CardTitle className="text-center text-white">Friends Eco Leaders</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <LeaderboardTable data={friendsLeaderboardData} />
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4">Compete With Friends</h3>
                  <p className="text-gray-600">
                    Challenge your friends to eco-friendly competitions! Connect with friends, compare scores, 
                    and motivate each other to take more green actions.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
