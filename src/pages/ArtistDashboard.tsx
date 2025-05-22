
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ArtworkManagement from "@/components/dashboard/ArtworkManagement";
import ArtistProfile from "@/components/dashboard/ArtistProfile";
import ArtistEarnings from "@/components/dashboard/ArtistEarnings";
import ArtistSettings from "@/components/dashboard/ArtistSettings";
import ArtistNotifications from "@/components/dashboard/ArtistNotifications";
import ArtistPromotions from "@/components/dashboard/ArtistPromotions";

const ArtistDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("artworks");
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect to login if not authenticated
  // In a real app, this would check for auth status
  useEffect(() => {
    // Authentication check would go here
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <Tabs defaultValue="artworks" value={activeTab} onValueChange={handleTabChange} className="w-full mt-6">
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap md:justify-start">
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="artworks">
            <ArtworkManagement isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="profile">
            <ArtistProfile isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="earnings">
            <ArtistEarnings isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="promotions">
            <ArtistPromotions isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="notifications">
            <ArtistNotifications isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="settings">
            <ArtistSettings isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistDashboard;
