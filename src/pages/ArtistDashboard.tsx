
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ArtworkManagement from "@/components/dashboard/ArtworkManagement";
import ArtistProfile from "@/components/dashboard/ArtistProfile";
import ArtistEarnings from "@/components/dashboard/ArtistEarnings";
import ArtistSettings from "@/components/dashboard/ArtistSettings";
import ArtistNotifications from "@/components/dashboard/ArtistNotifications";
import ArtistPromotions from "@/components/dashboard/ArtistPromotions";
import ArtworkUploadForm from "@/components/dashboard/artwork/ArtworkUploadForm";
import PinnedArtworks from "@/components/dashboard/artwork/PinnedArtworks";
import ProjectManagement from "@/components/dashboard/projects/ProjectManagement";
import EarningsAnalysis from "@/components/dashboard/earnings/EarningsAnalysis";
import MessagingModule from "@/components/dashboard/messages/MessagingModule";

const ArtistDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("artworks");
  
  // Determine active tab based on URL path
  useEffect(() => {
    if (location.pathname.includes("/upload")) {
      return; // Don't change active tab on the upload page
    } else if (location.pathname.includes("/projects")) {
      setActiveTab("projects");
    } else if (location.pathname.includes("/messages")) {
      setActiveTab("messages");
    } else if (location.pathname.includes("/earnings")) {
      setActiveTab("earnings");
    } else if (location.pathname.includes("/profile")) {
      setActiveTab("profile");
    } else if (location.pathname.includes("/promotions")) {
      setActiveTab("promotions");
    } else if (location.pathname.includes("/notifications")) {
      setActiveTab("notifications");
    } else if (location.pathname.includes("/settings")) {
      setActiveTab("settings");
    } else if (location.pathname.includes("/pinned")) {
      setActiveTab("pinned");
    } else {
      setActiveTab("artworks");
    }
  }, [location.pathname]);
  
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
    navigate(`/artist-dashboard${value !== "artworks" ? `/${value}` : ""}`);
  };

  // Special case for upload page
  if (location.pathname.includes("/upload")) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Upload New Artwork</h1>
            <p className="text-muted-foreground">Share your creative work with the world</p>
          </div>
          <ArtworkUploadForm />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <Tabs defaultValue="artworks" value={activeTab} onValueChange={handleTabChange} className="w-full mt-6">
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap md:justify-start">
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="pinned">Pinned Artworks</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
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
          
          <TabsContent value="pinned">
            <PinnedArtworks />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>
          
          <TabsContent value="messages">
            <Card className="p-6">
              <MessagingModule />
            </Card>
          </TabsContent>
          
          <TabsContent value="earnings">
            <EarningsAnalysis />
          </TabsContent>
          
          <TabsContent value="profile">
            <ArtistProfile isLoading={isLoading} />
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
