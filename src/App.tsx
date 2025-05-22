
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import ArtistProfile from "./pages/ArtistProfile";
import ClientDashboard from "./pages/ClientDashboard";
import ArtistDashboard from "./pages/ArtistDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/artist-dashboard/:tab" element={<ArtistDashboard />} />
          <Route path="/artist-dashboard/upload" element={<ArtistDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
