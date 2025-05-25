import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickActions from "@/components/QuickActions";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-eco-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Eco-Friendly Journey
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Join us in making a difference. Track your environmental impact, 
              discover sustainable practices, and contribute to a greener future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button 
                    className="bg-white text-eco hover:bg-gray-100 px-8 py-6 text-lg"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-eco px-8 py-6 text-lg"
                    onClick={scrollToAbout}
                  >
                    Learn More
                  </Button>
                </>
              ) : (
                <Button 
                  className="bg-white text-eco hover:bg-gray-100 px-8 py-6 text-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Quick Actions Section */}
      <QuickActions />

      {/* About Us Section */}
      <section id="about-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-eco-dark mb-12">
            About Eco Tracker
          </h2>
          
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-eco-light">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-eco-dark mb-4 flex items-center">
                    <Leaf className="w-6 h-6 mr-2 text-eco" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    Eco Tracker is dedicated to empowering individuals to make sustainable choices 
                    and track their environmental impact. We believe that small actions can lead 
                    to significant positive changes for our planet.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-eco-light">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-eco-dark mb-4 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-eco" />
                    What We Offer
                  </h3>
                  <p className="text-gray-600">
                    Track your carbon footprint, log eco-friendly actions, participate in 
                    sustainable activities, and connect with like-minded individuals. 
                    Together, we can create a more sustainable future.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-eco-dark mb-8 flex items-center justify-center">
              <Users className="w-6 h-6 mr-2 text-eco" />
              Our Team
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Harsh Kumar",
                  role: "Lead Developer",
                  description: "Passionate about creating sustainable solutions through technology."
                },
                {
                  name: "Saroj Kumar Sah",
                  role: "UI/UX Designer",
                  description: "Crafting beautiful and intuitive user experiences."
                },
                {
                  name: "Akul Shrivastava",
                  role: "Backend Developer",
                  description: "Building robust and scalable systems for a better future."
                },
                {
                  name: "Yashu Prasar",
                  role: "Project Manager",
                  description: "Ensuring smooth project execution and team coordination."
                }
              ].map((member, index) => (
                <Card key={index} className="border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-eco-light mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl text-eco">{member.name.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold text-eco-dark mb-1">{member.name}</h4>
                      <p className="text-eco text-sm mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage; 