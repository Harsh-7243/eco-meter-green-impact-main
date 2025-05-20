
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Edit, Save, Award, Calendar, Activity } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("actions");
  const [userData, setUserData] = useState({
    name: "Harshita",
    email: "harshita@gmail.com",
    location: "Patna , Bihar",
    joinDate: "May 12, 2024",
    bio: "Environmental activist and sustainability enthusiast. Passionate about making our planet greener one step at a time."
  });

  // Get the tab from URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'achievements') {
      setActiveTab("achievements");
    } else if (tab === 'analytics') {
      setActiveTab("analytics");
    } else if (tab === 'actions') {
      setActiveTab("actions");
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/profile?tab=${value}`);
  };

  const recentActions = [
    { id: 1, action: "Completed 20-min Outdoor Yoga", date: "Today", points: 10 },
    { id: 2, action: "Used public transport", date: "Yesterday", points: 5 },
    { id: 3, action: "Segregated waste", date: "2 days ago", points: 3 },
    { id: 4, action: "Planted a tree", date: "1 week ago", points: 20 },
    { id: 5, action: "Completed carbon footprint calculation", date: "1 week ago", points: 2 },
  ];

  const badges = [
    { name: "Tree Master", description: "Planted 10+ trees", icon: "🌳", earned: true },
    { name: "Eco Warrior", description: "Completed 100+ eco actions", icon: "🛡️", earned: true },
    { name: "Quiz Champion", description: "Answered 50+ quiz questions correctly", icon: "🧠", earned: true },
    { name: "Transport Hero", description: "Used public transport 30+ times", icon: "🚌", earned: true },
    { name: "Water Saver", description: "Save 1000+ liters of water", icon: "💧", earned: false },
    { name: "Energy Star", description: "Save 50+ kWh of electricity", icon: "⚡", earned: false },
    { name: "Meditation Master", description: "Complete 20+ yoga sessions", icon: "🧘", earned: true },
    { name: "Zero Waste Pioneer", description: "Reduce waste by 90%", icon: "♻️", earned: false }
  ];

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSaveProfile = () => {
    setEditing(false);
    // Save logic would go here in a real app
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="bg-eco-gradient text-white rounded-t-lg relative pb-24">
                <div className="absolute right-4 top-4">
                  {editing ? (
                    <Button size="sm" onClick={handleSaveProfile} variant="secondary" className="flex items-center">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  ) : (
                    <Button size="sm" onClick={handleEditToggle} variant="secondary" className="flex items-center">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">My Profile</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-center -mt-16 mb-4">
                  <Avatar className="h-32 w-32 border-4 border-white">
                    <AvatarImage src="https://i.pravatar.cc/300?img=5" />
                    <AvatarFallback className="bg-eco text-white text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center mb-6">
                  {editing ? (
                    <Input 
                      name="name"
                      value={userData.name} 
                      onChange={handleInputChange}
                      className="text-center font-bold text-xl"
                    />
                  ) : (
                    <h3 className="font-bold text-xl">{userData.name}</h3>
                  )}
                  <p className="text-gray-600">Member since {userData.joinDate}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    {editing ? (
                      <Input 
                        name="email"
                        value={userData.email} 
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-800">{userData.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Location</Label>
                    {editing ? (
                      <Input 
                        name="location"
                        value={userData.location} 
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-800">{userData.location}</p>
                    )}
                  </div>
                  <div>
                    <Label>Bio</Label>
                    {editing ? (
                      <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-2 border rounded-md"
                      />
                    ) : (
                      <p className="text-gray-800">{userData.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="actions" className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Actions
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="actions">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Actions</CardTitle>
                    <CardDescription>
                      Your eco-friendly activities from the past month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActions.map(action => (
                        <div key={action.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{action.action}</p>
                            <p className="text-sm text-gray-500">{action.date}</p>
                          </div>
                          <Badge className="bg-eco">+{action.points} pts</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Button className="bg-eco hover:bg-eco-dark text-white">
                        View All Actions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Impact Analytics</CardTitle>
                    <CardDescription>
                      See the difference you're making
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-eco-light rounded-lg p-4 text-center">
                        <h3 className="text-lg font-medium text-gray-700">CO₂ Saved</h3>
                        <p className="text-3xl font-bold text-eco">124 kg</p>
                        <p className="text-sm text-gray-500">Last 30 days</p>
                      </div>
                      <div className="bg-eco-light rounded-lg p-4 text-center">
                        <h3 className="text-lg font-medium text-gray-700">Total Actions</h3>
                        <p className="text-3xl font-bold text-eco">37</p>
                        <p className="text-sm text-gray-500">This month</p>
                      </div>
                      <div className="bg-eco-light rounded-lg p-4 text-center">
                        <h3 className="text-lg font-medium text-gray-700">Points Earned</h3>
                        <p className="text-3xl font-bold text-eco">840</p>
                        <p className="text-sm text-gray-500">Current balance</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Most Frequent Actions</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Public Transport</span>
                            <span className="font-medium">12 times</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-eco h-2.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2 mt-3">
                          <div className="flex justify-between">
                            <span>Waste Segregation</span>
                            <span className="font-medium">8 times</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-eco h-2.5 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2 mt-3">
                          <div className="flex justify-between">
                            <span>Yoga Sessions</span>
                            <span className="font-medium">5 times</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-eco h-2.5 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                      Badges and rewards you've earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {badges.map((badge, index) => (
                        <div key={index} className={`border rounded-lg p-4 flex items-center gap-4 ${!badge.earned ? 'opacity-60' : ''}`}>
                          <div className={`${badge.earned ? 'bg-eco-light' : 'bg-gray-100'} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                            {badge.earned ? badge.icon : '🔒'}
                          </div>
                          <div>
                            <h3 className="font-medium">{badge.name}</h3>
                            <p className="text-sm text-gray-500">{badge.description}</p>
                            {badge.earned && (
                              <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">Earned</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
