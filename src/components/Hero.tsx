
import { ArrowDown, Grape } from 'lucide-react';
import WineCollection from './WineCollection';

const Hero = () => {
  const scrollToCollection = () => {
    // Add smooth scroll with a fade transition
    document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with wine illustration background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with wine illustration */}
        <div className="absolute inset-0 bg-noir-dark">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/4574b078-f6e3-4d0d-9355-3a94f72d96a6.png')] bg-contain bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-radial from-noir-light/10 to-noir-dark opacity-80"></div>
        </div>
        
        {/* Wine glass decoration - positioned absolutely */}
        <div className="absolute right-[10%] top-1/4 w-72 h-72 rounded-full bg-wine/5 blur-3xl animate-pulse opacity-50"></div>
        <div className="absolute left-[15%] bottom-1/4 w-48 h-48 rounded-full bg-wine/10 blur-3xl animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
        
        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <Grape className="h-14 w-14 text-wine opacity-0 animate-fade-in animate-delay-100" />
            <span className="block relative overflow-hidden font-serif text-7xl font-medium opacity-0 animate-fade-in animate-delay-100">
              <span className="inline-block">
                <span className="text-white">D</span><span className="text-wine">Barrique</span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-wine to-wine-light transform -translate-x-full animate-[slideInLeft_1.5s_ease-in-out_forwards_0.5s]"></span>
            </span>
          </div>
          
          {/* Quote instead of search bar */}
          <div className="max-w-md mx-auto mt-12 opacity-0 animate-fade-in animate-delay-300">
            <p className="text-white/80 italic text-xl">
              "Bere del vino è bere del genio."
            </p>
            <p className="text-white/60 text-sm mt-2">
              — Charles Baudelaire
            </p>
          </div>
        </div>
        
        {/* Scrolling wine animation */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-fade-in animate-delay-500 cursor-pointer" onClick={scrollToCollection}>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-wine"></div>
            <ArrowDown className="text-wine mt-2 animate-bounce" />
          </div>
        </div>
      </div>
      
      {/* Collection Section with transition */}
      <div id="collection-section" className="min-h-screen bg-noir relative">
        {/* Transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-noir-dark to-transparent z-10"></div>
        
        <WineCollection limit={6} />
      </div>
    </div>
  );
};

export default Hero;
