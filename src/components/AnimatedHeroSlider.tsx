
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Showcase Your Creative Talent",
    subtitle: "Join thousands of artists making an impact with their work",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    gradient: "from-purple-900/80 via-pink-900/60 to-blue-900/80",
  },
  {
    id: 2,
    title: "Connect With Global Clients",
    subtitle: "Expand your reach and grow your creative business",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    gradient: "from-blue-900/80 via-purple-900/60 to-indigo-900/80",
  },
  {
    id: 3,
    title: "Monetize Your Art",
    subtitle: "Turn your passion into a sustainable career",
    imageUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    gradient: "from-indigo-900/80 via-blue-900/60 to-purple-900/80",
  },
];

const AnimatedHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Floating elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative h-full">
              <img 
                src={slide.imageUrl} 
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
            </div>
          </div>
        ))}
        
        {/* Content */}
        <div className="relative h-full z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white">
              <h2 className="uppercase text-sm md:text-base tracking-wider font-semibold mb-2 text-primary animate-slide-up">
                Featured Artist
              </h2>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
                Luna Eclipse
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-white/80 max-w-xl animate-slide-up animation-delay-300">
                Electronic music producer and vocalist known for atmospheric soundscapes and haunting melodies.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 animate-slide-up animation-delay-600">
                <span className="bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full text-sm border border-white/10">
                  Electronic
                </span>
                <span className="bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full text-sm border border-white/10">
                  Ambient
                </span>
                <span className="bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full text-sm border border-white/10">
                  Pop
                </span>
              </div>
              <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-900">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                  Listen Now
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-primary w-12" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSlider;
