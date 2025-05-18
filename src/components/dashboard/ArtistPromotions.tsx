
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, TrendingUp, Eye, Heart, 
  MessageSquare, Calendar, Gallery, Image 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ArtistPromotionsProps {
  isLoading: boolean;
}

// Sample artwork data
const ARTWORK_DATA = [
  {
    id: "1",
    title: "Mystic Mountains",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    views: 1253,
    likes: 245,
    comments: 32,
  },
  {
    id: "2",
    title: "Ocean Dreams",
    thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    views: 876,
    likes: 154,
    comments: 18,
  },
  {
    id: "3",
    title: "Urban Thoughts",
    thumbnail: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    views: 723,
    likes: 132,
    comments: 25,
  },
  {
    id: "4",
    title: "Ethereal Landscapes",
    thumbnail: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    views: 654,
    likes: 98,
    comments: 14,
  }
];

const ArtistPromotions = ({ isLoading }: ArtistPromotionsProps) => {
  const [activeTab, setActiveTab] = useState("featured");
  const [isFeaturedApplied, setIsFeaturedApplied] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);

  const toggleSelectArtwork = (id: string) => {
    if (selectedArtworks.includes(id)) {
      setSelectedArtworks(selectedArtworks.filter(artworkId => artworkId !== id));
    } else {
      setSelectedArtworks([...selectedArtworks, id]);
    }
  };

  const applyForFeatured = () => {
    console.log("Applied for featured artist badge");
    setIsFeaturedApplied(true);
  };

  const submitForPromotion = () => {
    console.log("Submitted artworks for promotion:", selectedArtworks);
    setSelectedArtworks([]);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Promotions & Recognition</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap md:justify-start">
          <TabsTrigger value="featured">Featured Artist</TabsTrigger>
          <TabsTrigger value="promote">Promote Artwork</TabsTrigger>
          <TabsTrigger value="stats">Artwork Stats</TabsTrigger>
          <TabsTrigger value="commissions">Commission Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Featured Artist Badge
              </CardTitle>
              <CardDescription>
                Get recognized as a featured artist on our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                <h3 className="font-semibold text-lg mb-2">How to Qualify</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Have at least 10 published artworks</li>
                  <li>Achieved ₹20,000 in total sales</li>
                  <li>Maintained a 4.5+ star rating from customers</li>
                  <li>Been active on the platform for at least 3 months</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-800">
                <h3 className="font-semibold text-lg mb-2">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Featured profile on the homepage rotation</li>
                  <li>Special "Featured Artist" badge on your profile</li>
                  <li>Priority placement in search results</li>
                  <li>Invitation to exclusive featured artist events</li>
                  <li>Special promotional opportunities</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              {isFeaturedApplied ? (
                <div className="w-full text-center">
                  <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">Application Submitted</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your application within 5-7 business days
                  </p>
                </div>
              ) : (
                <Button onClick={applyForFeatured} className="w-full">
                  Apply for Featured Artist
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="promote">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Promote Your Artwork
              </CardTitle>
              <CardDescription>
                Get your best work featured on the homepage and explore section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Select artworks to submit for promotion consideration:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ARTWORK_DATA.map((artwork) => (
                  <div 
                    key={artwork.id} 
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedArtworks.includes(artwork.id) 
                        ? "ring-2 ring-primary ring-offset-2" 
                        : "hover:shadow-md"
                    }`}
                    onClick={() => toggleSelectArtwork(artwork.id)}
                  >
                    <div className="relative h-32">
                      <img
                        src={artwork.thumbnail}
                        alt={artwork.title}
                        className="h-full w-full object-cover"
                      />
                      {selectedArtworks.includes(artwork.id) && (
                        <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm truncate">{artwork.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {artwork.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {artwork.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedArtworks.length} artworks selected
              </p>
              <Button 
                onClick={submitForPromotion} 
                disabled={selectedArtworks.length === 0}
              >
                Submit for Promotion
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gallery className="h-5 w-5 text-green-500" />
                Artwork Stats
              </CardTitle>
              <CardDescription>
                Track performance metrics for your artwork
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Artwork</th>
                      <th className="text-center p-4 font-medium">Views</th>
                      <th className="text-center p-4 font-medium">Likes</th>
                      <th className="text-center p-4 font-medium">Comments</th>
                      <th className="text-center p-4 font-medium">Engagement Rate</th>
                      <th className="text-center p-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ARTWORK_DATA.map((artwork) => (
                      <tr key={artwork.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded overflow-hidden">
                              <img
                                src={artwork.thumbnail}
                                alt={artwork.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{artwork.title}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">{artwork.views.toLocaleString()}</td>
                        <td className="p-4 text-center">{artwork.likes.toLocaleString()}</td>
                        <td className="p-4 text-center">{artwork.comments.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          {Math.round((artwork.likes + artwork.comments) / artwork.views * 100)}%
                        </td>
                        <td className="p-4 text-center">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-purple-500" />
                Commission Services
              </CardTitle>
              <CardDescription>
                Offer personalized artwork services to clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-800">
                <h3 className="font-semibold text-lg mb-2">About Commissions</h3>
                <p className="mb-4">
                  Commissions allow you to create custom artwork based on client requests.
                  Set your own pricing, timeline, and availability.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Commission Status</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-red-500"></div>
                    <span className="ml-2">Currently not accepting commissions</span>
                  </div>
                  <Button>Enable Commissions</Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Commission Requests</h3>
                  </div>
                  <p className="text-muted-foreground">No pending commission requests</p>
                  <Button variant="outline">View Past Commissions</Button>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Configure Commission Settings</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Commission Settings</DialogTitle>
                    <DialogDescription>
                      Set your preferences for accepting commissions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="min-price">
                        Minimum Price (₹)
                      </label>
                      <input
                        id="min-price"
                        type="number"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="5000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="timeframe">
                        Average Timeframe
                      </label>
                      <select
                        id="timeframe"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="1-3">1-3 days</option>
                        <option value="3-7">3-7 days</option>
                        <option value="1-2">1-2 weeks</option>
                        <option value="2-4">2-4 weeks</option>
                        <option value="4-8">1-2 months</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Available Commission Types</label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Digital Art</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Illustrations</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Portraits</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Character Design</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="description">
                        Commission Description
                      </label>
                      <textarea
                        id="description"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                        placeholder="Describe your commission process, what clients can expect, etc."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Settings</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistPromotions;
