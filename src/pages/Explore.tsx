
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, Eye, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data for artwork (expanded)
const allArtwork = [
  {
    id: "1",
    title: "Abstract Harmony",
    artist: "Alex Rivera",
    artistId: "1",
    category: "Abstract",
    medium: "Digital",
    imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 243,
    views: 1862,
    price: 450,
    year: 2023,
  },
  {
    id: "2",
    title: "Urban Poetry",
    artist: "Maya Johnson",
    artistId: "2",
    category: "Urban",
    medium: "Oil",
    imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 187,
    views: 1253,
    price: 350,
    year: 2022,
  },
  {
    id: "3",
    title: "Music Flow",
    artist: "Jordan Smith",
    artistId: "3",
    category: "Abstract",
    medium: "Acrylic",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    likes: 329,
    views: 2451,
    price: 550,
    year: 2023,
  },
  {
    id: "4",
    title: "Digital Dreams",
    artist: "Taylor Reed",
    artistId: "4",
    category: "Digital",
    medium: "Digital",
    imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    likes: 156,
    views: 983,
    price: 300,
    year: 2021,
  },
  {
    id: "5",
    title: "Futuristic Melodies",
    artist: "Emma Williams",
    artistId: "5",
    category: "Futuristic",
    medium: "Mixed Media",
    imageUrl: "https://images.unsplash.com/photo-1614173188975-0e2aae485595?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 274,
    views: 1764,
    price: 480,
    year: 2023,
  },
  {
    id: "6",
    title: "Ocean Depths",
    artist: "Alex Rivera",
    artistId: "1",
    category: "Nature",
    medium: "Watercolor",
    imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    likes: 412,
    views: 2891,
    price: 680,
    year: 2022,
  },
  {
    id: "7",
    title: "Neon City",
    artist: "Maya Johnson",
    artistId: "2",
    category: "Urban",
    medium: "Digital",
    imageUrl: "https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 382,
    views: 2176,
    price: 520,
    year: 2023,
  },
  {
    id: "8",
    title: "Golden Hour",
    artist: "Jordan Smith",
    artistId: "3",
    category: "Landscape",
    medium: "Oil",
    imageUrl: "https://images.unsplash.com/photo-1548263594-a71ea65a8598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    likes: 276,
    views: 1654,
    price: 490,
    year: 2021,
  },
];

// Categories for filtering
const categories = ["All", "Abstract", "Urban", "Digital", "Futuristic", "Nature", "Landscape"];

// Mediums for filtering
const mediums = ["All", "Digital", "Oil", "Acrylic", "Watercolor", "Mixed Media"];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMedium, setSelectedMedium] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [filters, setFilters] = useState({
    mostLiked: false,
    mostViewed: false,
    latest: false,
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  // Filter artwork based on search, category, and other filters
  const filteredArtwork = allArtwork.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || artwork.category === selectedCategory;
    
    const matchesMedium =
      selectedMedium === "All" || artwork.medium === selectedMedium;
    
    const matchesPrice = 
      artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesMedium && matchesPrice;
  });
  
  // Sort the filtered artwork
  const sortedArtwork = [...filteredArtwork].sort((a, b) => {
    if (sortBy === "latest") {
      return b.year - a.year;
    } else if (sortBy === "mostLiked") {
      return b.likes - a.likes;
    } else if (sortBy === "mostViewed") {
      return b.views - a.views;
    } else if (sortBy === "priceLowHigh") {
      return a.price - b.price;
    } else if (sortBy === "priceHighLow") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-artswarit-purple to-blue-500">
              Explore Artwork
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover stunning artwork from talented artists across various styles and mediums.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto mb-6">
              <Input
                type="text"
                placeholder="Search artworks by title or artist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm backdrop-blur-sm bg-white/80 border-blue-100 focus:border-artswarit-purple"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-lg shadow-sm border border-blue-100 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-primary" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category filter */}
                <div>
                  <Label className="block mb-2 font-medium">Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
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
                  </div>
                </div>
                
                {/* Medium filter */}
                <div>
                  <Label className="block mb-2 font-medium">Medium</Label>
                  <div className="flex flex-wrap gap-2">
                    {mediums.map((medium) => (
                      <Button
                        key={medium}
                        variant={selectedMedium === medium ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMedium(medium)}
                        className={selectedMedium === medium 
                          ? "bg-gradient-to-r from-artswarit-purple to-blue-500 border-none" 
                          : "border-blue-200"
                        }
                      >
                        {medium}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price range filter */}
                <div>
                  <Label htmlFor="price-range" className="block mb-2 font-medium">
                    Price range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    id="price-range"
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>
              </div>
              
              <Separator className="my-4" />

              {/* Sort options */}
              <div>
                <Label className="block mb-2 font-medium">Sort by</Label>
                <RadioGroup 
                  defaultValue="latest" 
                  value={sortBy}
                  onValueChange={setSortBy}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="latest" id="latest" />
                    <Label htmlFor="latest">Latest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mostLiked" id="mostLiked" />
                    <Label htmlFor="mostLiked">Most Liked</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mostViewed" id="mostViewed" />
                    <Label htmlFor="mostViewed">Most Viewed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="priceLowHigh" id="priceLowHigh" />
                    <Label htmlFor="priceLowHigh">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="priceHighLow" id="priceHighLow" />
                    <Label htmlFor="priceHighLow">Price: High to Low</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredArtwork.length} of {allArtwork.length} artworks
              </p>
              <Separator className="mt-2" />
            </div>

            {/* Artwork carousel/slider - Larger slides */}
            {filteredArtwork.length > 0 ? (
              <div className="mt-8">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {sortedArtwork.map((artwork) => (
                      <CarouselItem key={artwork.id} className="md:basis-2/3 lg:basis-1/2 pl-4">
                        <div className="artwork-card group h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 neo-blur-sm relative">
                          <img 
                            src={artwork.imageUrl} 
                            alt={artwork.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col space-y-2">
                              <h3 className="text-white text-3xl font-semibold">{artwork.title}</h3>
                              <p className="text-gray-200 text-xl">by {artwork.artist}</p>
                              <p className="text-gray-300">{artwork.category} • {artwork.medium} • {artwork.year}</p>
                              <p className="text-white text-xl font-semibold mt-1">${artwork.price}</p>
                              
                              {/* Stats display */}
                              <div className="flex items-center space-x-6 mt-2 text-gray-200 text-lg">
                                <div className="flex items-center gap-2">
                                  <Heart size={20} className="text-red-400" />
                                  <span>{artwork.likes}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Eye size={20} className="text-blue-400" />
                                  <span>{artwork.views}</span>
                                </div>
                              </div>
                              
                              <Button 
                                className="mt-4 bg-gradient-to-r from-artswarit-purple to-blue-500 border-none w-full md:w-auto"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white/80 backdrop-blur-md border border-white/30 text-primary hover:bg-white/90" />
                  <CarouselNext className="right-2 bg-white/80 backdrop-blur-md border border-white/30 text-primary hover:bg-white/90" />
                </Carousel>
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
                <h3 className="font-heading text-xl font-semibold mb-2">No artwork found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more artwork.
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
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
