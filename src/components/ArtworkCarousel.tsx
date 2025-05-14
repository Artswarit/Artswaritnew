
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
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
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gradient-blue">Featured Artwork</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore stunning creations from our talented artists
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {featuredArtwork.map((artwork) => (
                <CarouselItem key={artwork.id} className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3 px-4">
                  <div className="artwork-card group h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                      <h3 className="text-white text-2xl font-semibold transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{artwork.title}</h3>
                      <p className="text-gray-200 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-75">by {artwork.artist}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/30 backdrop-blur-md border border-white/40 text-white hover:bg-white/50 absolute top-1/2 -translate-y-1/2 lg:left-2" />
            <CarouselNext className="right-4 bg-white/30 backdrop-blur-md border border-white/40 text-white hover:bg-white/50 absolute top-1/2 -translate-y-1/2 lg:right-2" />
          </Carousel>
          
          <div className="flex justify-center mt-10 md:justify-end md:mt-4 md:pr-4">
            <Button asChild variant="outline" className="border-artswarit-purple text-artswarit-purple hover:bg-artswarit-purple hover:text-white transition-all group">
              <Link to="/gallery">
                View All Artwork
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-artswarit-purple to-blue-500 border-none animate-fade-in">
            <Link to="/signup">Join Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-artswarit-purple text-artswarit-purple hover:bg-artswarit-purple hover:text-white animate-fade-in animation-delay-300">
            <Link to="/explore">Explore Artists</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArtworkCarousel;
