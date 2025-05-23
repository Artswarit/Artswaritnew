
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Home, TrendingUp, Sparkles } from "lucide-react";
import { smoothScrollTo } from "@/utils/smoothScroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    if (location.pathname === "/") {
      smoothScrollTo(sectionId);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm transition-all duration-300 ${scrolled ? 'shadow-md bg-white/90' : ''}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center cursor-pointer group" 
              onClick={() => setIsOpen(false)}
            >
              <span className="font-heading font-bold text-2xl text-gradient-purple group-hover:scale-105 transition-transform duration-300">Artswarit</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/' 
                    ? 'text-primary border-primary' 
                    : 'text-gray-600 hover:text-primary border-transparent hover:border-primary'
                }`}
              >
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              
              {location.pathname === '/' ? (
                <a 
                  href="#featured-artists" 
                  onClick={(e) => scrollToSection(e, 'featured-artists')}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 hover:scale-105"
                >
                  <User className="mr-1 h-4 w-4" />
                  Artists
                </a>
              ) : (
                <Link 
                  to="/#featured-artists"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 hover:scale-105"
                >
                  <User className="mr-1 h-4 w-4" />
                  Artists
                </Link>
              )}
              
              {location.pathname === '/' ? (
                <a 
                  href="#artwork" 
                  onClick={(e) => scrollToSection(e, 'artwork')}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 hover:scale-105"
                >
                  <Sparkles className="mr-1 h-4 w-4" />
                  Artwork
                </a>
              ) : (
                <Link 
                  to="/#artwork"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 hover:scale-105"
                >
                  <Sparkles className="mr-1 h-4 w-4" />
                  Artwork
                </Link>
              )}
              
              <Link 
                to="/explore" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/explore' 
                    ? 'text-primary border-primary' 
                    : 'text-gray-600 hover:text-primary border-transparent hover:border-primary'
                }`}
              >
                <TrendingUp className="mr-1 h-4 w-4" />
                Explore
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search artists..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent bg-white/80 transition-all duration-300 focus:scale-105"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>
            <Button asChild variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg fixed w-full left-0 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto animate-slide-in-right">
          <div className="pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className={`flex items-center pl-3 pr-4 py-2 text-base font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            
            {location.pathname === '/' ? (
              <a
                href="#featured-artists"
                onClick={(e) => scrollToSection(e, 'featured-artists')}
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <User className="mr-2 h-4 w-4" />
                Artists
              </a>
            ) : (
              <Link
                to="/#featured-artists"
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Artists
              </Link>
            )}
            
            {location.pathname === '/' ? (
              <a
                href="#artwork"
                onClick={(e) => scrollToSection(e, 'artwork')}
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Artwork
              </a>
            ) : (
              <Link
                to="/#artwork"
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Artwork
              </Link>
            )}
            
            <Link
              to="/explore"
              className={`flex items-center pl-3 pr-4 py-2 text-base font-medium transition-all duration-200 ${
                location.pathname === '/explore' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Explore
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
                  className="block text-base font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block text-base font-medium text-primary hover:text-primary/80 transition-colors duration-200"
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
