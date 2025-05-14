
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedArtistCard from "@/components/FeaturedArtistCard";
import CategoryCard from "@/components/CategoryCard";
import { Search, Music, BookOpen, Edit, Pencil } from "lucide-react";

// Mock data - In a real application, this would come from an API
const featuredArtists = [
  {
    id: "1",
    name: "Alex Rivera",
    category: "Musician",
    imageUrl: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: true,
    premium: true,
  },
  {
    id: "2",
    name: "Maya Johnson",
    category: "Writer",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: true,
    premium: false,
  },
  {
    id: "3",
    name: "Jordan Smith",
    category: "Rapper",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: false,
    premium: true,
  },
  {
    id: "4",
    name: "Taylor Reed",
    category: "Editor",
    imageUrl: "https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    verified: false,
    premium: false,
  },
];

const categories = [
  { title: "Musicians", icon: <Music size={24} />, count: 1245, slug: "musicians" },
  { title: "Writers", icon: <BookOpen size={24} />, count: 873, slug: "writers" },
  { title: "Rappers", icon: <Music size={24} />, count: 562, slug: "rappers" },
  { title: "Editors", icon: <Edit size={24} />, count: 421, slug: "editors" },
  { title: "Scriptwriters", icon: <Pencil size={24} />, count: 318, slug: "scriptwriters" },
];

const testimonials = [
  {
    content: "Artswarit helped me showcase my music to a broader audience and connect with clients I never thought possible.",
    author: "Marcus Williams",
    role: "Musician",
  },
  {
    content: "As a writer, I was struggling to monetize my work. Artswarit provided the perfect platform to share and earn from my passion.",
    author: "Sophia Chen",
    role: "Writer",
  },
  {
    content: "The verification badge gave my profile the credibility it needed. Now clients trust my work before even hearing it.",
    author: "Derek Johnson",
    role: "Rapper",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-artswarit-purple to-artswarit-purple-dark text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-slide-up">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Showcase Your Talent, Build Your Career
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
                Artswarit is where creative professionals showcase their talent, build portfolios, and connect with clients worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="default" className="bg-white text-artswarit-purple hover:bg-gray-100">
                  <Link to="/signup">Join as Artist</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-artswarit-purple">
                  <Link to="/explore">Explore Creators</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Artist working"
                className="rounded-lg shadow-xl animate-fade-in"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform-gpu translate-y-1/2 rounded-tl-[100%] rounded-tr-[100%]"></div>
      </section>

      {/* Featured Artists Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Artists</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trending creators across different categories making waves on Artswarit.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtists.map((artist) => (
            <FeaturedArtistCard key={artist.id} {...artist} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/explore">View All Artists</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-artswarit-gray py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect creative professional for your project from our diverse categories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How Artswarit Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple process to showcase your talent or find the perfect creative professional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-artswarit-purple h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <span className="font-bold text-xl">1</span>
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up as an artist and build your custom profile showcasing your skills, portfolio, and services.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-artswarit-purple h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <span className="font-bold text-xl">2</span>
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Upload Your Content</h3>
            <p className="text-muted-foreground">
              Share your work with the world. Upload audio, video, or text content to showcase your talent.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-artswarit-purple h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <span className="font-bold text-xl">3</span>
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Connect & Earn</h3>
            <p className="text-muted-foreground">
              Get discovered by clients, receive project offers, and monetize your creative skills.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-artswarit-gray py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from artists who have transformed their careers with Artswarit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-heading font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-artswarit-purple text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Showcase Your Talent?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of creative professionals who are building their careers with Artswarit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="default" className="bg-white text-artswarit-purple hover:bg-gray-100">
              <Link to="/signup">Join as Artist</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-artswarit-purple">
              <Link to="/explore">Explore Creators</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
