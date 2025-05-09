import { ArrowDown, Grape } from 'lucide-react';
import { useState, useEffect } from 'react';
import WineCollection from './WineCollection';
import WineQuotes from './WineQuotes';
import '@fontsource/dancing-script';
import '@fontsource/cormorant-garamond';

const Hero = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection?.clientHeight || 0;
      
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / (heroHeight * 0.7), 1);
      
      setScrollProgress(progress);
      setHasScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToCollection = () => {
    document.getElementById('collection-section')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
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
        
        <div 
          className="relative z-10 container mx-auto px-4 text-center transition-all duration-500 ease-out"
          style={{ 
            opacity: 1 - scrollProgress * 1.5,
            transform: `translateY(${scrollProgress * 100}px)`
          }}
        >
          <div className="flex flex-col items-center justify-center mb-12">
            <Grape className="h-10 w-10 text-wine opacity-0 animate-fade-in animate-delay-100 mb-2" />
            <div className="relative overflow-hidden opacity-0 animate-fade-in animate-delay-100">
              <h1 className="font-dancing text-8xl text-white tracking-wide">
                <span className="text-white">D</span>
                <span className="text-wine">Barrique</span>
              </h1>
              <div className="font-cormorant text-xs tracking-[0.3em] uppercase text-white/70 mt-1">
                WINE COLLECTION
              </div>
            </div>
          </div>
          
          <WineQuotes />
        </div>
        
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
      
      <div 
        id="collection-section" 
        className="min-h-screen bg-noir relative"
      >
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-noir-dark to-transparent z-10"></div>
        
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
