
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Award, Star, CheckCircle, Trophy, Users, Zap } from 'lucide-react';

interface ArtistProfile {
  badges: string[];
  total_sales: number;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
}

const BadgesRecognition = () => {
  const { user } = useAuth();
  const [artistProfile, setArtistProfile] = useState<ArtistProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistProfile();
  }, [user]);

  const fetchArtistProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('artist_profiles')
        .select('badges, total_sales, average_rating, total_reviews')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      // Also get verification status from profiles
      const { data: profileData } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', user.id)
        .single();

      setArtistProfile({
        ...data,
        is_verified: profileData?.is_verified || false
      });
    } catch (error) {
      console.error('Error fetching artist profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Top Artist':
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case '100+ Sales':
        return <Award className="h-6 w-6 text-blue-500" />;
      case '5 Star Rating':
        return <Star className="h-6 w-6 text-purple-500" />;
      case 'Popular Creator':
        return <Users className="h-6 w-6 text-green-500" />;
      case 'Fast Delivery':
        return <Zap className="h-6 w-6 text-orange-500" />;
      default:
        return <Award className="h-6 w-6 text-gray-500" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Top Artist':
        return 'bg-yellow-100 text-yellow-800';
      case '100+ Sales':
        return 'bg-blue-100 text-blue-800';
      case '5 Star Rating':
        return 'bg-purple-100 text-purple-800';
      case 'Popular Creator':
        return 'bg-green-100 text-green-800';
      case 'Fast Delivery':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEligibleBadges = () => {
    if (!artistProfile) return [];

    const eligible = [];
    
    if (artistProfile.total_sales >= 100) {
      eligible.push('100+ Sales');
    }
    
    if (artistProfile.average_rating >= 4.8 && artistProfile.total_reviews >= 10) {
      eligible.push('5 Star Rating');
    }
    
    if (artistProfile.total_sales >= 50 && artistProfile.average_rating >= 4.5) {
      eligible.push('Top Artist');
    }
    
    if (artistProfile.total_reviews >= 25) {
      eligible.push('Popular Creator');
    }
    
    return eligible;
  };

  if (loading) return <div>Loading badges...</div>;

  const currentBadges = artistProfile?.badges || [];
  const eligibleBadges = getEligibleBadges();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="h-6 w-6" />
          Badges & Recognition
        </h2>
      </div>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className={`h-5 w-5 ${artistProfile?.is_verified ? 'text-green-500' : 'text-gray-400'}`} />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {artistProfile?.is_verified ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Artist
              </Badge>
              <p className="text-sm text-gray-600">Your profile is verified for authenticity</p>
            </div>
          ) : (
            <div>
              <Badge variant="outline">Unverified</Badge>
              <p className="text-sm text-gray-600 mt-2">
                Complete your profile and maintain good ratings to get verified
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
        </CardHeader>
        <CardContent>
          {currentBadges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No badges earned yet. Keep working to unlock achievements!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                  {getBadgeIcon(badge)}
                  <div>
                    <Badge className={getBadgeColor(badge)}>
                      {badge}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Earned</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Available Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Sales Milestones</h4>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getBadgeIcon('100+ Sales')}
                  <div>
                    <p className="font-medium">100+ Sales</p>
                    <p className="text-sm text-gray-500">Complete 100 successful orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {artistProfile?.total_sales || 0}/100
                  </p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(((artistProfile?.total_sales || 0) / 100) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Rating Achievements</h4>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getBadgeIcon('5 Star Rating')}
                  <div>
                    <p className="font-medium">5 Star Rating</p>
                    <p className="text-sm text-gray-500">Maintain 4.8+ rating with 10+ reviews</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {artistProfile?.average_rating?.toFixed(1) || '0.0'}/5.0
                  </p>
                  <p className="text-xs text-gray-400">
                    {artistProfile?.total_reviews || 0} reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {artistProfile?.total_sales || 0}
              </div>
              <p className="text-sm text-gray-500">Total Sales</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {artistProfile?.average_rating?.toFixed(1) || '0.0'}
              </div>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {currentBadges.length}
              </div>
              <p className="text-sm text-gray-500">Badges Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgesRecognition;
