
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Home, Calculator, Award, MessageSquare, Users, Gift, User, LogOut, X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    toast({
      title: `Navigating to ${item}`,
      description: `You selected the ${item} page`,
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative z-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-eco-dark" />
            </Button>
            <Link to="/" className="flex items-center">
              <div className="bg-eco rounded-full p-2 mr-2">
                <div className="text-white text-xl font-bold">🍃</div>
              </div>
              <h1 className="text-eco-dark font-bold text-xl hidden sm:block">Eco Meter</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavItem 
              icon={<Home className="h-4 w-4 mr-1" />} 
              label="Home" 
              to="/"
              isActive={location.pathname === "/"}
            />
            <NavItem 
              icon={<Calculator className="h-4 w-4 mr-1" />} 
              label="Calculator" 
              to="/calculator"
              isActive={location.pathname === "/calculator"}
            />
            <NavItem 
              icon={<Award className="h-4 w-4 mr-1" />} 
              label="Achievements" 
              to="/profile?tab=achievements"
              isActive={location.pathname === "/profile" && location.search.includes("achievements")}
            />
            <NavItem 
              icon={<MessageSquare className="h-4 w-4 mr-1" />} 
              label="Eco Tips" 
              to="/ecotips"
              isActive={location.pathname === "/ecotips"}
            />
            <NavItem 
              icon={<Users className="h-4 w-4 mr-1" />} 
              label="Leaderboard" 
              to="/leaderboard"
              isActive={location.pathname === "/leaderboard"}
            />
            <NavItem 
              icon={<Trophy className="h-4 w-4 mr-1" />} 
              label="Quiz" 
              to="/quiz"
              isActive={location.pathname === "/quiz"}
            />
            <NavItem 
              icon={<Gift className="h-4 w-4 mr-1" />} 
              label="Rewards" 
              to="/rewards"
              isActive={location.pathname === "/rewards"}
            />
          </div>

          <Link to="/profile">
            <Button 
              variant="ghost" 
              className={cn(
                "flex items-center",
                location.pathname === "/profile" && "bg-gray-100"
              )}
            >
              <User className="h-5 w-5 text-eco-dark mr-1" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleMenuToggle}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform z-50 overflow-y-auto",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-eco rounded-full p-2 mr-2">
              <div className="text-white text-xl font-bold">🍃</div>
            </div>
            <h1 className="text-eco-dark font-bold text-xl">Eco Meter</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleMenuToggle}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-2">
          <SidebarItem 
            icon={<Home className="h-5 w-5" />} 
            label="Home" 
            to="/" 
            isActive={location.pathname === "/"}
          />
          <SidebarItem 
            icon={<Menu className="h-5 w-5" />} 
            label="Quick Actions" 
            to="/" 
            isActive={false}
          />
          <SidebarItem 
            icon={<Calculator className="h-5 w-5" />} 
            label="Calculator" 
            to="/calculator" 
            isActive={location.pathname === "/calculator"}
          />
          <SidebarItem 
            icon={<MessageSquare className="h-5 w-5" />} 
            label="Eco Tips" 
            to="/ecotips" 
            isActive={location.pathname === "/ecotips"}
          />
          <SidebarItem 
            icon={<Award className="h-5 w-5" />} 
            label="Achievements" 
            to="/profile?tab=achievements" 
            isActive={location.pathname === "/profile" && location.search.includes("achievements")}
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            label="Leaderboard" 
            to="/leaderboard" 
            isActive={location.pathname === "/leaderboard"}
          />
          <SidebarItem 
            icon={<Trophy className="h-5 w-5" />} 
            label="Quiz" 
            to="/quiz" 
            isActive={location.pathname === "/quiz"}
          />
          <SidebarItem 
            icon={<Gift className="h-5 w-5" />} 
            label="Rewards" 
            to="/rewards" 
            isActive={location.pathname === "/rewards"}
          />
          <SidebarItem 
            icon={<User className="h-5 w-5" />} 
            label="Profile" 
            to="/profile" 
            isActive={location.pathname === "/profile" && !location.search.includes("achievements")}
          />
          
          <div className="border-t mt-4 pt-4">
            <SidebarItem 
              icon={<LogOut className="h-5 w-5" />} 
              label="Logout" 
              onClick={() => handleMenuItemClick("Logout")} 
              isActive={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
};

const NavItem = ({ icon, label, to, onClick, isActive = false }: NavItemProps) => {
  if (to) {
    return (
      <Link to={to}>
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center", 
            isActive 
              ? "text-foreground bg-gray-100" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {icon}
          <span>{label}</span>
        </Button>
      </Link>
    );
  }
  
  return (
    <Button 
      variant="ghost" 
      onClick={onClick} 
      className="flex items-center text-muted-foreground hover:text-foreground"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
};

const SidebarItem = ({ icon, label, to, onClick, isActive = false }: SidebarItemProps) => {
  if (to) {
    return (
      <Link to={to}>
        <div className={cn(
          "flex items-center px-4 py-3 hover:bg-eco-light cursor-pointer",
          isActive && "bg-eco-light"
        )}>
          <div className="mr-3 text-eco-dark">{icon}</div>
          <span className="text-gray-800">{label}</span>
        </div>
      </Link>
    );
  }
  
  return (
    <div
      className="flex items-center px-4 py-3 hover:bg-eco-light cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-3 text-eco-dark">{icon}</div>
      <span className="text-gray-800">{label}</span>
    </div>
  );
};

export default Navbar;
