
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import YogaPage from "./pages/Yoga";
import QuizPage from "./pages/QuizPage";
import RewardsPage from "./pages/RewardsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/Profile";
import EcoTipsPage from "./pages/EcoTipsPage";
import CalculatorPage from "./pages/CalculatorPage";

const queryClient = new QueryClient();

const App = () => {
  // Update the page title
  useEffect(() => {
    document.title = "Eco Meter - Track Your Green Impact";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/yoga" element={<YogaPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/ecotips" element={<EcoTipsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
