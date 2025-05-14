import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedArtistCard from "@/components/FeaturedArtistCard";
import { Search, Filter } from "lucide-react";

// Mock data for artists (expanded)
const allArtists = [
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
  {
    id: "5",
    name: "Emma Williams",
    category: "Musician",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    verified: true,
    premium: false,
  },
  {
    id: "6",
    name: "Daniel Brown",
    category: "Scriptwriter",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: false,
    premium: true,
  },
  {
    id: "7",
    name: "Olivia Martinez",
    category: "Editor",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: true,
    premium: true,
  },
  {
    id: "8",
    name: "Liam Wilson",
    category: "Rapper",
    imageUrl: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1030&q=80",
    verified: false,
    premium: false,
  },
  {
    id: "9",
    name: "Noah Clark",
    category: "Photographer",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: true,
    premium: true,
  },
  {
    id: "10",
    name: "Sophia Lee",
    category: "Illustrator",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    verified: true,
    premium: false,
  },
  {
    id: "11",
    name: "Lucas Rodriguez",
    category: "Voice Artist",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    verified: false,
    premium: true,
  },
  {
    id: "12",
    name: "Emily Chen",
    category: "Animator",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
    verified: true,
    premium: true,
  },
];

// Expanded categories for filtering
const categories = [
  "All", 
  "Musician", 
  "Writer", 
  "Rapper", 
  "Editor", 
  "Scriptwriter", 
  "Photographer", 
  "Illustrator", 
  "Voice Artist", 
  "Animator", 
  "Composer", 
  "Producer", 
  "Filmmaker", 
  "Graphic Designer"
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [filters, setFilters] = useState({
    verified: false,
    premium: false,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters({
      ...filters,
      [key]: !filters[key],
    });
  };

  // Filter artists based on search, category, and other filters
  const filteredArtists = allArtists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || artist.category === selectedCategory;
    
    const matchesVerified = filters.verified ? artist.verified : true;
    const matchesPremium = filters.premium ? artist.premium : true;

    return matchesSearch && matchesCategory && matchesVerified && matchesPremium;
  });

  // Display either limited or all categories based on toggle
  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 7);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-artswarit-purple to-blue-500">
              Explore Artists
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover talented artists across different categories and find the perfect match for your project.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto mb-6">
              <Input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm backdrop-blur-sm bg-white/80 border-blue-100 focus:border-artswarit-purple"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-4 rounded-lg shadow-sm border border-blue-100 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter size={16} />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {displayedCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-gradient-to-r from-artswarit-purple to-blue-500 border-none" 
                      : "border-blue-200"
                    }
                  >
                    {category}
                  </Button>
                ))}
                {categories.length > 7 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-blue-500"
                  >
                    {showAllCategories ? "Show Less" : `+${categories.length - 7} More`}
                  </Button>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={() => handleFilterChange("verified")}
                  />
                  <Label htmlFor="verified">Verified only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="premium"
                    checked={filters.premium}
                    onCheckedChange={() => handleFilterChange("premium")}
                  />
                  <Label htmlFor="premium">Premium only</Label>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="price-range" className="block mb-2">
                    Price range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    id="price-range"
                    defaultValue={[0, 100]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredArtists.length} of {allArtists.length} artists
              </p>
              <Separator className="mt-2" />
            </div>

            {/* Artists grid */}
            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredArtists.map((artist) => (
                  <FeaturedArtistCard key={artist.id} {...artist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
                <h3 className="font-heading text-xl font-semibold mb-2">No artists found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more artists.
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <Button variant="outline" disabled className="backdrop-blur-sm bg-white/50">
                  Previous
                </Button>
                <Button variant="outline" className="bg-gradient-to-r from-artswarit-purple to-blue-500 text-white border-none">
                  1
                </Button>
                <Button variant="outline" className="backdrop-blur-sm bg-white/50">2</Button>
                <Button variant="outline" className="backdrop-blur-sm bg-white/50">3</Button>
                <Button variant="outline" className="backdrop-blur-sm bg-white/50">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
