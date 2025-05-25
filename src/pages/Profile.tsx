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
import { User, Edit, Save, Award, Calendar, Activity, MapPin, Cake } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_KEY = 'ecoProfileUserData';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("actions");
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return {
      name: "",
      email: "",
      location: "",
      place: "",
      dob: "",
      sex: "",
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    bio: "Environmental activist and sustainability enthusiast. Passionate about making our planet greener one step at a time."
    };
  });
  const [recentActions, setRecentActions] = useState<any[]>([]);
  const [showAllActions, setShowAllActions] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  // Update user data when auth state changes
  useEffect(() => {
    if (user) {
      setUserData(prev => {
        const updated = {
          ...prev,
          name: user.name,
          email: user.email,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }, [user]);

  // Save userData to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

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

  useEffect(() => {
    const stored = localStorage.getItem('ecoRecentActions');
    if (stored) {
      setRecentActions(JSON.parse(stored));
    } else {
      setRecentActions([]);
    }
    // Listen for storage changes in case actions are performed in another tab
    const onStorage = () => {
      const updated = localStorage.getItem('ecoRecentActions');
      setRecentActions(updated ? JSON.parse(updated) : []);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/profile?tab=${value}`);
  };

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
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    // In a real app, this would make an API call to update the user's profile
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // On logout, clear localStorage profile data
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    logout();
  };

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco"></div>
      </div>
    );
  }

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
              
                <div className="flex justify-center -mt-16 mb-4">
                <Avatar className="h-32 w-32 border-4 border-white bg-gray-100">
                  {/* Avatar image based on sex */}
                  {userData.sex === 'male' ? (
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                  ) : userData.sex === 'female' ? (
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" />
                  ) : userData.sex === 'other' ? (
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" />
                  ) : (
                    <AvatarImage src={`https://i.pravatar.cc/300?u=${userData.email}`} />
                  )}
                    <AvatarFallback className="bg-eco text-white text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

              <CardContent className="space-y-4">
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
                      <p className="text-gray-800">{userData.location || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <Label>Place</Label>
                    {editing ? (
                      <Input 
                        name="place"
                        value={userData.place} 
                        onChange={handleInputChange}
                        placeholder="Your city, village, etc."
                      />
                    ) : (
                      <p className="text-gray-800">{userData.place || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    {editing ? (
                      <Input 
                        name="dob"
                        type="date"
                        value={userData.dob}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-800 flex items-center gap-2">{userData.dob ? <><Cake className="h-4 w-4 text-eco" />{userData.dob}</> : 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <Label>Sex</Label>
                    {editing ? (
                      <select
                        name="sex"
                        value={userData.sex}
                        onChange={handleSelectChange}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 flex items-center gap-2">
                        {userData.sex === 'male' && <><User className="h-4 w-4 text-blue-500" /> Male</>}
                        {userData.sex === 'female' && <><User className="h-4 w-4 text-pink-500" /> Female</>}
                        {userData.sex === 'other' && <><User className="h-4 w-4 text-green-500" /> Other</>}
                        {!userData.sex && 'Not specified'}
                      </p>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="actions">Recent Actions</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="actions">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Actions</CardTitle>
                    <CardDescription>Your latest eco-friendly activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActions.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                          No recent activity yet. Perform a Quick Action to see it here!
                        </div>
                      ) : (
                        <>
                          {(showAllActions ? recentActions : recentActions.slice(0, 6)).map((action) => (
                            <div key={action.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                              <div className="flex items-center">
                                <Activity className="h-5 w-5 text-eco mr-3" />
                                <div>
                                  <p className="font-medium">{action.action}</p>
                                  <p className="text-sm text-gray-500">{action.date}</p>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-eco-light text-eco">
                                +{action.points} points
                              </Badge>
                            </div>
                          ))}
                          {recentActions.length > 6 && !showAllActions && (
                            <div className="flex justify-center mt-4">
                              <Button variant="outline" onClick={() => setShowAllActions(true)}>
                                View All
                              </Button>
                            </div>
                          )}
                          {showAllActions && recentActions.length > 6 && (
                            <div className="flex justify-center mt-4">
                              <Button variant="outline" onClick={() => setShowAllActions(false)}>
                                Show Less
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your eco-friendly milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {badges.map((badge, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            badge.earned ? 'bg-eco-light border-eco' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{badge.icon}</span>
                            <div>
                              <h4 className="font-medium">{badge.name}</h4>
                              <p className="text-sm text-gray-600">{badge.description}</p>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Your environmental impact over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h4 className="font-medium text-gray-500">Total Points</h4>
                          <p className="text-2xl font-bold text-eco">1,234</p>
                          </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h4 className="font-medium text-gray-500">Carbon Saved</h4>
                          <p className="text-2xl font-bold text-eco">2.5 tons</p>
                          </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h4 className="font-medium text-gray-500">Actions Taken</h4>
                          <p className="text-2xl font-bold text-eco">156</p>
                        </div>
                      </div>
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
