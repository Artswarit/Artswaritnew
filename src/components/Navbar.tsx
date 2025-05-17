
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Home, TrendingUp, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Smooth scroll function for featured artists section
  const scrollToFeaturedArtists = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuredArtistsSection = document.getElementById('featured-artists');
    if (featuredArtistsSection) {
      featuredArtistsSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        // Add offset for fixed header
        const yOffset = -80; 
        const y = featuredArtistsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <header className={`bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => setIsOpen(false)}>
              <span className="font-heading font-bold text-2xl text-gradient-purple">Artswarit</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-200">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              <a 
                href="#featured-artists" 
                onClick={scrollToFeaturedArtists}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-200"
              >
                <User className="mr-1 h-4 w-4" />
                Artists
              </a>
              <Link to="/explore" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-200">
                <Sparkles className="mr-1 h-4 w-4" />
                Explore
              </Link>
              <Link to="/trending" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-200">
                <TrendingUp className="mr-1 h-4 w-4" />
                Trending
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search artists..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent bg-white/80"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>
            <Button asChild variant="ghost" className="hover:bg-primary/10 hover:text-primary">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Now with fixed position when open */}
      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg fixed w-full left-0 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <a
              href="#featured-artists"
              onClick={scrollToFeaturedArtists}
              className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
            >
              <User className="mr-2 h-4 w-4" />
              Artists
            </a>
            <Link
              to="/explore"
              className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Explore
            </Link>
            <Link
              to="/trending"
              className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full text-gray-400" />
              </div>
              <div className="ml-3 space-y-2">
                <Link
                  to="/login"
                  className="block text-base font-medium text-gray-600 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block text-base font-medium text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
