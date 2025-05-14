
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Home, Headphones, Image, List } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  {/* Logo symbol - infinity with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transform rotate-45 blur-[1px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-6 border-4 border-white rounded-full"></div>
                  </div>
                </div>
                <span className="font-heading font-bold text-2xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Artswarit</span>
              </div>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary">
                <Home size={18} className="mr-1" /> Home
              </Link>
              <Link to="/explore" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary">
                <Image size={18} className="mr-1" /> Explore
              </Link>
              <Link to="/categories" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary">
                <List size={18} className="mr-1" /> Categories
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary">
                <Headphones size={18} className="mr-1" /> Trending
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search artists, songs, albums..."
                className="pl-10 pr-4 py-2 rounded-full text-sm bg-black/30 border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>
            <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
              <Link to="/login">Login</Link>
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-primary focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-primary flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Home size={18} className="mr-2" /> Home
            </Link>
            <Link
              to="/explore"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-primary flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Image size={18} className="mr-2" /> Explore
            </Link>
            <Link
              to="/categories"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-primary flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <List size={18} className="mr-2" /> Categories
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-primary flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Headphones size={18} className="mr-2" /> Trending
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-white/10">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-gray-800 p-2 text-gray-300" />
              </div>
              <div className="ml-3 space-y-2">
                <Link
                  to="/login"
                  className="block text-base font-medium text-gray-300 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Login
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
