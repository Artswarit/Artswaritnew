
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";

// Mock data for featured artwork
const featuredArtwork = [
  {
    id: "1",
    title: "Abstract Harmony",
    artist: "Alex Rivera",
    imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "2",
    title: "Urban Poetry",
    artist: "Maya Johnson",
    imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "3",
    title: "Music Flow",
    artist: "Jordan Smith",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "4",
    title: "Digital Dreams",
    artist: "Taylor Reed",
    imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "5",
    title: "Futuristic Melodies",
    artist: "Emma Williams",
    imageUrl: "https://images.unsplash.com/photo-1614173188975-0e2aae485595?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

const ArtworkCarousel = () => {
  const carouselRef = useRef(null);

  return (
    <section className="py-16 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Featured Artwork
          </h2>
          <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 group">
            <Link to="/artwork" className="flex items-center gap-2">
              View All Artwork
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredArtwork.map((artwork) => (
              <CarouselItem key={artwork.id} className="md:basis-1/2 lg:basis-1/3 h-full">
                <div className="artwork-card group h-[500px] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl shadow-purple-900/10 hover:shadow-purple-500/20">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold">{artwork.title}</h3>
                    <p className="text-gray-300">by {artwork.artist}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10" />
          <CarouselNext className="right-4 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10" />
        </Carousel>
      </div>
    </section>
  );
};

export default ArtworkCarousel;
