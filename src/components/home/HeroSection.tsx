import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { MapPin } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [greeting, setGreeting] = useState('नमस्ते!');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/17431284/pexels-photo-17431284/free-photo-of-kedarnath-temple.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Kedarnath Temple, Uttarakhand" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center pt-20">
        {/* Welcome Banner */}
        <div 
          className={`inline-block bg-accent-500/90 rounded-lg p-3 mb-4 self-start 
          transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-white" />
            <p className="text-white font-medium">Uttarakhand - देवभूमि उत्तराखंड</p>
          </div>
        </div>

        {/* Greeting */}
        <h2 
          className={`text-3xl md:text-4xl font-bold text-white mb-2 
          transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          {greeting}
        </h2>

        {/* Main Title */}
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl 
          transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          Explore the Divine Beauty of Uttarakhand
        </h1>

        {/* Description */}
        <p 
          className={`text-lg md:text-xl text-white/80 mb-8 max-w-2xl 
          transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          Land of gods, mighty Himalayas, sacred rivers, and majestic valleys. Experience the spiritual and natural wonders of Dev Bhoomi Uttarakhand.
        </p>

        {/* Poem */}
        <div 
          className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-xl border-l-4 border-accent-500 
          transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          <p className="text-white italic">
            "पहाड़ों की वादियों में, गंगा की धारा में,<br />
            हिमालय की चोटियों पर, देवभूमि है न्यारा।<br />
            उत्तराखंड की यात्रा पर, आइए थोड़ा ठहरिए,<br />
            रूह को सुकून मिलेगा, मन को विश्राम।"
          </p>
        </div>

        {/* CTAs */}
        <div 
          className={`flex flex-wrap gap-4 
          transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          <Button variant="primary" size="lg">
            Plan Your Trip
          </Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div 
          className={`animate-bounce w-8 h-12 flex justify-center items-center 
          transition-opacity duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;