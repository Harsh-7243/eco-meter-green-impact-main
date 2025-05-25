import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickActions from '@/components/QuickActions';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, Lightbulb, Globe, Heart, Target } from 'lucide-react';

const Index = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (window.location.hash === '#team-section') {
      const el = document.getElementById('team-section');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero onLearnMore={scrollToAbout} />
        <QuickActions />

        {/* About Us Section */}
        <section id="about-section" className="py-20 bg-gradient-to-br from-eco-light/30 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-eco-dark mb-4">
                About Eco Tracker
            </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Empowering individuals to make a difference, one eco-friendly action at a time
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto mb-20">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 border-eco-light hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-eco mb-4">
                      <Target className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-eco-dark mb-4">
                      Our Vision
                    </h3>
                    <p className="text-gray-600">
                      To create a world where every individual actively contributes to environmental 
                      sustainability through conscious choices and measurable actions.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-eco-light hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-eco mb-4">
                      <Heart className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-eco-dark mb-4">
                      Our Mission
                    </h3>
                    <p className="text-gray-600">
                      Empowering people to track, improve, and celebrate their environmental impact 
                      while building a community of eco-conscious individuals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-eco-light hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-eco mb-4">
                      <Globe className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-eco-dark mb-4">
                      Our Impact
                    </h3>
                    <p className="text-gray-600">
                      Join thousands of users who have already reduced their carbon footprint and 
                      made a positive impact on our planet through sustainable living.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Team Section */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-eco-dark mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 mr-3 text-eco" />
                  Meet Our Team
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A passionate group of individuals dedicated to making environmental sustainability accessible to everyone
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Harsh Kumar",
                    role: "Lead Developer",
                    description: "Passionate about creating sustainable solutions through technology.",
                    expertise: "UI/UX Designer"
                  },
                  {
                    name: "Saroj Kumar Sah",
                    role: "IoS Developer",
                    description: "Crafting beautiful and intuitive user experiences.",
                    expertise: "Development"
                  },
                  {
                    name: "Akul Shrivastava",
                    role: "Backend Developer",
                    description: "Building robust and scalable systems for a better future.",
                    expertise: "System Architecture"
                  },
                  {
                    name: "Yashu Prasar",
                    role: "Project Manager",
                    description: "Ensuring smooth project execution and team coordination.",
                    expertise: "Project Management"
                  }
                ].map((member, index) => (
                  <Card key={index} className="border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-eco-light mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl text-eco">{member.name.charAt(0)}</span>
                        </div>
                        <h4 className="font-bold text-eco-dark text-xl mb-2">{member.name}</h4>
                        <p className="text-eco font-medium mb-1">{member.role}</p>
                        <p className="text-gray-500 text-sm mb-3">{member.expertise}</p>
                        <p className="text-gray-600">{member.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
