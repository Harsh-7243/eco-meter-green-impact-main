
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const leaderboardData = [
  { rank: 1, name: "Emma Watson", score: 840, eco_actions: 42, image: "/src/assets/avatar1.png", badges: ["Tree Master", "Recycling Pro"] },
  { rank: 2, name: "Thomas Green", score: 790, eco_actions: 38, image: "/src/assets/avatar2.png", badges: ["Water Saver"] },
  { rank: 3, name: "Sophia Chen", score: 760, eco_actions: 35, image: "/src/assets/avatar3.png", badges: ["Energy Star"] },
  { rank: 4, name: "Miguel Lopez", score: 710, eco_actions: 32, image: "/src/assets/avatar4.png", badges: ["Bike Hero"] },
  { rank: 5, name: "Jessica Taylor", score: 680, eco_actions: 30, image: "/src/assets/avatar5.png", badges: [] },
];

const Leaderboard = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
          Eco Leaders
        </h2>

        <Card className="overflow-hidden border-0 shadow-md">
          <CardHeader className="bg-eco-gradient py-4">
            <CardTitle className="text-center text-white">This Month's Top Performers</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
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
                  {leaderboardData.map((user, index) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
