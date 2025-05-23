
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ArtworkManagement from "@/components/dashboard/ArtworkManagement";
import CommissionsOrders from "@/components/dashboard/CommissionsOrders";
import ArtistWallet from "@/components/dashboard/ArtistWallet";
import ReviewsRatings from "@/components/dashboard/ReviewsRatings";
import BadgesRecognition from "@/components/dashboard/BadgesRecognition";
import ArtistEarnings from "@/components/dashboard/ArtistEarnings";
import ArtistNotifications from "@/components/dashboard/ArtistNotifications";
import ArtistProfile from "@/components/dashboard/ArtistProfile";
import ArtistPromotions from "@/components/dashboard/ArtistPromotions";
import ArtistSettings from "@/components/dashboard/ArtistSettings";
import MessagingModule from "@/components/dashboard/messages/MessagingModule";
import ProjectManagement from "@/components/dashboard/projects/ProjectManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ArtistDashboard = () => {
  const { tab } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const [artistProfile, setArtistProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    checkArtistProfile();
  }, [user]);

  const checkArtistProfile = async () => {
    if (!user) return;

    try {
      // Check if user has artist profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();

      if (profile?.user_type === 'client') {
        toast.error('You need to be an artist to access this dashboard');
        navigate('/client-dashboard');
        return;
      }

      // Get or create artist profile
      const { data: artistData, error } = await supabase
        .from('artist_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!artistData && (profile?.user_type === 'artist' || profile?.user_type === 'both')) {
        // Create artist profile if user is artist but doesn't have profile
        const { data: newProfile, error: createError } = await supabase
          .from('artist_profiles')
          .insert({
            user_id: user.id,
            profession: 'Artist',
            portfolio_description: 'New artist on Artswarit'
          })
          .select()
          .single();

        if (createError) throw createError;
        setArtistProfile(newProfile);
      } else {
        setArtistProfile(artistData);
      }
    } catch (error) {
      console.error('Error checking artist profile:', error);
      toast.error('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/artist-dashboard/${value}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-artswarit-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader />
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="artworks">Artworks</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <p className="text-gray-600">Welcome to your artist dashboard! Start by uploading your artworks and completing your profile.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setActiveTab("artworks")}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded"
                      >
                        Upload New Artwork
                      </button>
                      <button 
                        onClick={() => setActiveTab("orders")}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded"
                      >
                        Check New Orders
                      </button>
                      <button 
                        onClick={() => setActiveTab("settings")}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded"
                      >
                        Complete Profile
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="artworks">
              {/* Pass the isLoading prop to ArtworkManagement */}
              <ArtworkManagement isLoading={loading} />
            </TabsContent>

            <TabsContent value="orders">
              <CommissionsOrders />
            </TabsContent>

            <TabsContent value="wallet">
              <ArtistWallet />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsRatings />
            </TabsContent>

            <TabsContent value="badges">
              <BadgesRecognition />
            </TabsContent>

            <TabsContent value="messages">
              <MessagingModule />
            </TabsContent>

            <TabsContent value="settings">
              {/* Pass the isLoading prop to ArtistSettings */}
              <ArtistSettings isLoading={loading} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ArtistDashboard;
