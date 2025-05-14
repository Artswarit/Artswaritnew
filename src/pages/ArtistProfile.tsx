
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Music, BookOpen, Play, MessageCircle, Heart, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for artist profile
const artistData = {
  id: "1",
  name: "Alex Rivera",
  category: "Musician",
  bio: "Award-winning musician with over 10 years of experience in the industry. Specializing in creating unique sound experiences for advertising, film, and personal projects.",
  imageUrl: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  location: "Los Angeles, CA",
  followersCount: 12458,
  projectsCount: 87,
  verified: true,
  premium: true,
  rating: 4.9,
  reviewsCount: 142,
  socialLinks: {
    instagram: "https://instagram.com/alexrivera",
    twitter: "https://twitter.com/alexrivera",
    youtube: "https://youtube.com/alexrivera",
    website: "https://alexrivera.com",
  },
  services: [
    { name: "Custom Music Track", price: 300, deliveryTime: "3-5 days" },
    { name: "Music Mixing & Mastering", price: 150, deliveryTime: "2 days" },
    { name: "Audio Editing", price: 100, deliveryTime: "1 day" },
  ],
  portfolio: [
    {
      id: "p1",
      title: "Summer Vibes EP",
      category: "Music",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      isPremium: false,
      views: 2345,
    },
    {
      id: "p2",
      title: "Urban Nights",
      category: "Music",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isPremium: true,
      views: 1256,
    },
    {
      id: "p3",
      title: "Acoustic Sessions",
      category: "Music",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isPremium: false,
      views: 3678,
    },
    {
      id: "p4",
      title: "Electric Dreams",
      category: "Music",
      imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isPremium: true,
      views: 982,
    },
  ],
  reviews: [
    {
      id: "r1",
      name: "Sarah Johnson",
      rating: 5,
      date: "2023-05-15",
      comment: "Alex created the perfect soundtrack for our short film. Professional, creative, and a pleasure to work with!",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "r2",
      name: "Michael Chen",
      rating: 5,
      date: "2023-04-22",
      comment: "Incredible talent and attention to detail. The music Alex created perfectly matched our brand's vision.",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "r3",
      name: "Jessica Lee",
      rating: 4,
      date: "2023-03-10",
      comment: "Great communication throughout the project. The final product was excellent, just took a bit longer than expected.",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
  ],
};

const ArtistProfile = () => {
  const { id } = useParams();
  // In a real application, you would fetch the artist data based on the id parameter
  const artist = artistData;
  const [followStatus, setFollowStatus] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Cover image and profile section */}
        <div className="relative">
          <div className="h-64 md:h-80 overflow-hidden">
            <img
              src={artist.coverImageUrl}
              alt={`${artist.name}'s cover`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-24 sm:-mt-16 flex flex-col sm:flex-row items-center sm:items-end sm:space-x-6 pb-4">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white bg-white">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start">
                  <h1 className="text-2xl font-heading font-bold">{artist.name}</h1>
                  {artist.verified && (
                    <CheckCircle className="ml-2 h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-muted-foreground">{artist.category}</p>
                <div className="flex items-center justify-center sm:justify-start mt-1 text-sm">
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {artist.rating}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{artist.reviewsCount} reviews</span>
                  <span className="mx-2">•</span>
                  <span>{artist.location}</span>
                </div>
              </div>
              <div className="flex mt-4 sm:mt-0 space-x-2">
                <Button
                  onClick={() => setFollowStatus(!followStatus)}
                  variant={followStatus ? "default" : "outline"}
                >
                  {followStatus ? "Following" : "Follow"}
                </Button>
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <h2 className="font-heading text-2xl font-bold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artist.portfolio.map((item) => (
                  <Card key={item.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="default" className="rounded-full p-2">
                          {item.isPremium ? <Lock size={20} /> : <Play size={20} />}
                        </Button>
                      </div>
                      {item.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="badge-premium">
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <span>{item.category}</span>
                        <span className="flex items-center">
                          <Heart size={14} className="mr-1" />
                          {item.views}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="max-w-3xl">
                <h2 className="font-heading text-2xl font-bold mb-4">About {artist.name}</h2>
                <p className="mb-6">{artist.bio}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 flex-1 min-w-[150px]">
                    <div className="text-lg font-bold">{artist.followersCount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex-1 min-w-[150px]">
                    <div className="text-lg font-bold">{artist.projectsCount}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex-1 min-w-[150px]">
                    <div className="text-lg font-bold">{artist.rating}</div>
                    <div className="text-sm text-muted-foreground">Avg. Rating</div>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-semibold mb-3">Connect with {artist.name}</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {Object.entries(artist.socialLinks).map(([platform, url]) => (
                    <Button key={platform} variant="outline" size="sm" asChild>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize">
                        {platform}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <h2 className="font-heading text-2xl font-bold mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artist.services.map((service, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-2xl font-bold mb-1">${service.price}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Delivery in {service.deliveryTime}
                      </p>
                      <Button className="w-full">Order Now</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-heading text-2xl font-bold">
                    Reviews ({artist.reviewsCount})
                  </h2>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{artist.rating}</span>
                    <div className="text-yellow-500">
                      {'★'.repeat(Math.floor(artist.rating))}
                      {artist.rating % 1 !== 0 ? '½' : ''}
                      {'☆'.repeat(Math.floor(5 - artist.rating))}
                    </div>
                  </div>
                </div>
                <Separator className="mb-6" />
                
                <div className="space-y-6">
                  {artist.reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-none">
                      <div className="flex items-start">
                        <img
                          src={review.avatarUrl}
                          alt={review.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="text-yellow-500 my-1">
                            {'★'.repeat(review.rating)}
                            {'☆'.repeat(5 - review.rating)}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
