
import { ArrowDown, Grape } from 'lucide-react';
import { useState, useEffect } from 'react';
import WineCollection from './WineCollection';
import WineQuotes from './WineQuotes';

const Hero = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Listen for scroll events to create dynamic transition animations
  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection?.clientHeight || 0;
      
      // Calculate scroll progress as percentage
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / (heroHeight * 0.7), 1);
      
      setScrollProgress(progress);
      setHasScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToCollection = () => {
    // Add smooth scroll with fade transition
    document.getElementById('collection-section')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with vineyard background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
        {/* Dynamic background with parallax and scale effect based on scroll */}
        <div 
          className="absolute inset-0 bg-noir-dark transition-all duration-300 ease-out"
          style={{ 
            transform: `scale(${1 + scrollProgress * 0.05})`,
          }}
        >
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464638681273-0962e9b53566?q=80&w=2070')] bg-cover bg-center opacity-25 transition-transform duration-1000 ease-out"
            style={{ 
              transform: `translateY(${scrollProgress * 50}px)`,
              opacity: 0.25 - scrollProgress * 0.1,
            }}
          ></div>
          <div 
            className="absolute inset-0 bg-gradient-radial from-noir-light/10 to-noir-dark opacity-80"
            style={{ opacity: 0.8 - scrollProgress * 0.3 }}
          ></div>
        </div>
        
        {/* Wine glass decoration - positioned absolutely with parallax effect */}
        <div 
          className="absolute right-[10%] top-1/4 w-72 h-72 rounded-full bg-wine/5 blur-3xl animate-pulse opacity-50 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${scrollProgress * 100}px, ${scrollProgress * -50}px)` }}
        ></div>
        <div 
          className="absolute left-[15%] bottom-1/4 w-48 h-48 rounded-full bg-wine/10 blur-3xl animate-pulse opacity-30 transition-transform duration-700 ease-out" 
          style={{
            animationDelay: '1.5s',
            transform: `translate(${scrollProgress * -100}px, ${scrollProgress * 50}px)` 
          }}
        ></div>
        
        {/* Main content with fade out effect on scroll */}
        <div 
          className="relative z-10 container mx-auto px-4 text-center transition-all duration-500 ease-out"
          style={{ 
            opacity: 1 - scrollProgress * 1.5,
            transform: `translateY(${scrollProgress * 100}px)`
          }}
        >
          <div className="flex items-center justify-center space-x-3 mb-10">
            <Grape className="h-14 w-14 text-wine opacity-0 animate-fade-in animate-delay-100" />
            <span className="block relative overflow-hidden font-serif text-7xl font-medium opacity-0 animate-fade-in animate-delay-100">
              <span className="inline-block">
                <span className="text-white">D</span><span className="text-wine">Barrique</span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-wine to-wine-light transform -translate-x-full animate-[slideInLeft_1.5s_ease-in-out_forwards_0.5s]"></span>
            </span>
          </div>
          
          {/* Wine quotes component instead of static quote */}
          <WineQuotes />
        </div>
        
        {/* Scrolling wine animation with parallax effect */}
        <div 
          className={`absolute bottom-10 left-0 right-0 flex justify-center animate-fade-in animate-delay-500 cursor-pointer transition-all duration-500 ease-out ${
            hasScrolled ? 'opacity-0 transform translate-y-10' : 'opacity-100'
          }`}
          onClick={scrollToCollection}
          style={{ 
            opacity: 1 - scrollProgress * 2.5
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-wine"></div>
            <ArrowDown className="text-wine mt-2 animate-bounce" />
          </div>
        </div>
      </div>
      
      {/* Collection Section with dynamic transition */}
      <div 
        id="collection-section" 
        className="min-h-screen bg-noir relative"
      >
        {/* Dynamic transition overlay with parallax */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-noir-dark to-transparent z-10"></div>
        
        {/* Vineyard background image that comes into view as you scroll */}
        <div 
          className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"
          style={{ 
            opacity: Math.min(scrollProgress * 0.3, 0.2),
          }}
        >
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464638681273-0962e9b53566?q=80&w=2070')] bg-cover bg-center"
            style={{ 
              transform: `scale(${1.1 - scrollProgress * 0.1})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir to-transparent"></div>
        </div>
        
        <WineCollection limit={6} />
      </div>
    </div>
  );
};

export default Hero;
