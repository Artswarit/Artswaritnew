
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedArtistCard from "@/components/FeaturedArtistCard";
import CategoryCard from "@/components/CategoryCard";
import { Music, BookOpen, Edit, Pencil, Camera, Palette, Video, Mic, Monitor } from "lucide-react";
import AnimatedHeroSlider from "@/components/AnimatedHeroSlider";
import ArtworkCarousel from "@/components/ArtworkCarousel";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ScrollToTop from "@/components/ScrollToTop";

// Enhanced mock data with better structure
const allArtists = [
  {
    id: "1",
    name: "Alex Rivera",
    category: "Musician",
    imageUrl: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: true,
    premium: true,
    followers: 12543,
    likes: 4580,
    views: 28750,
    bio: "Multi-platinum musician with over 10 years of experience in the industry."
  }, 
  {
    id: "2",
    name: "Maya Johnson",
    category: "Writer",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: true,
    premium: false,
    followers: 8765,
    likes: 3240,
    views: 19500,
    bio: "Award-winning author specializing in fantasy and science fiction novels."
  }, 
  {
    id: "3",
    name: "Jordan Smith",
    category: "Rapper",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: false,
    premium: true,
    followers: 6421,
    likes: 2870,
    views: 16200,
    bio: "Underground hip-hop artist known for thought-provoking lyrics and innovative beats."
  }, 
  {
    id: "4",
    name: "Taylor Reed",
    category: "Editor",
    imageUrl: "https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    verified: false,
    premium: false,
    followers: 3827,
    likes: 1950,
    views: 9800,
    bio: "Professional editor with experience working with major publishing houses."
  }, 
  {
    id: "5",
    name: "Elena Rodriguez",
    category: "Photographer",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    verified: true,
    premium: true,
    followers: 11243,
    likes: 4120,
    views: 24600,
    bio: "Specializing in portrait and landscape photography with a unique artistic style."
  }, 
  {
    id: "6",
    name: "Marcus Bell",
    category: "Illustrator",
    imageUrl: "https://images.unsplash.com/photo-1610088441520-4352457e7095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: true,
    premium: false,
    followers: 9876,
    likes: 3680,
    views: 21300,
    bio: "Digital illustrator creating vibrant fantasy scenes and character designs."
  }
];

// Top categories with proper icons
const categories = [
  {
    title: "Musicians",
    icon: <Music size={24} />,
    count: 1245,
    slug: "musicians"
  }, 
  {
    title: "Writers",
    icon: <BookOpen size={24} />,
    count: 873,
    slug: "writers"
  }, 
  {
    title: "Photographers",
    icon: <Camera size={24} />,
    count: 756,
    slug: "photographers"
  }, 
  {
    title: "Illustrators",
    icon: <Palette size={24} />,
    count: 482,
    slug: "illustrators"
  }, 
  {
    title: "Voice Artists",
    icon: <Mic size={24} />,
    count: 329,
    slug: "voice-artists"
  }, 
  {
    title: "UI/UX Designers",
    icon: <Monitor size={24} />,
    count: 368,
    slug: "designers"
  }
];

// Enhanced testimonials
const testimonials = [
  {
    content: "Artswarit helped me showcase my music to a broader audience and connect with clients I never thought possible.",
    author: "Marcus Williams",
    role: "Musician",
    rating: 5
  }, 
  {
    content: "As a writer, I was struggling to monetize my work. Artswarit provided the perfect platform to share and earn from my passion.",
    author: "Sophia Chen",
    role: "Writer",
    rating: 5
  }, 
  {
    content: "The verification badge gave my profile the credibility it needed. Now clients trust my work before even hearing it.",
    author: "Derek Johnson",
    role: "Rapper",
    rating: 5
  }
];

const Index = () => {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and sort artists by popularity
    setTimeout(() => {
      const sortedArtists = [...allArtists].sort((a, b) => {
        const scoreA = a.followers * 0.4 + a.likes * 0.3 + a.views * 0.3;
        const scoreB = b.followers * 0.4 + b.likes * 0.3 + b.views * 0.3;
        return scoreB - scoreA;
      });
      setFeaturedArtists(sortedArtists.slice(0, 6));
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ScrollToTop />
      <Navbar />
      
      <AnimatedHeroSlider />
      
      {/* Featured Artists Section */}
      <section id="featured-artists" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-artswarit-purple to-blue-500 animate-fade-in">
            Featured Artists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            Discover trending creators making waves on Artswarit, updated regularly based on popularity.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-artswarit-purple"></div>
          </div>
        ) : (
          <Carousel 
            opts={{
              align: "start",
              loop: true
            }} 
            className="w-full"
          >
            <CarouselContent>
              {featuredArtists.map(artist => (
                <CarouselItem key={artist.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full animate-fade-in">
                    <FeaturedArtistCard {...artist} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 backdrop-blur-md border border-white/30 text-primary hover:bg-white/90 transition-all duration-300" />
            <CarouselNext className="right-2 bg-white/80 backdrop-blur-md border border-white/30 text-primary hover:bg-white/90 transition-all duration-300" />
          </Carousel>
        )}
      </section>
      
      {/* Artwork Carousel Section */}
      <ArtworkCarousel />

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-artswarit-purple to-blue-500 animate-fade-in">
              Popular Categories
            </h2>
            <p className="text-lg font-serif text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Find the perfect creative professional for your project from our diverse selection of specialized talents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12 animate-slide-up">
            <p className="text-lg italic text-muted-foreground mb-4">
              ...and many more categories to explore with thousands of talented artists
            </p>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-artswarit-purple text-artswarit-purple hover:bg-artswarit-purple hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-artswarit-purple to-blue-500 animate-fade-in">
            How Artswarit Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            A simple process to showcase your talent or find the perfect creative professional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create Your Profile",
              description: "Sign up as an artist and build your custom profile showcasing your skills, portfolio, and services."
            },
            {
              step: "2", 
              title: "Upload Your Content",
              description: "Share your work with the world. Upload audio, video, or text content to showcase your talent."
            },
            {
              step: "3",
              title: "Connect & Earn", 
              description: "Get discovered by clients, receive project offers, and monetize your creative skills."
            }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="bg-gradient-to-r from-artswarit-purple to-blue-500 h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <span className="font-bold text-xl">{item.step}</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-gradient-to-r from-artswarit-purple to-blue-500 border-none hover:scale-105 transition-transform duration-300">
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-artswarit-purple to-blue-500 animate-fade-in">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Hear from artists who have transformed their careers with Artswarit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-heading font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-artswarit-purple to-blue-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Ready to Showcase Your Talent?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90 animate-slide-up">
              Join thousands of creative professionals who are building their careers with Artswarit.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
              <Button size="lg" variant="default" className="bg-white text-artswarit-purple hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                <Link to="/signup">Join as Artist</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-artswarit-purple transition-all duration-300 hover:scale-105">
                <Link to="/explore">Explore Talent</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
