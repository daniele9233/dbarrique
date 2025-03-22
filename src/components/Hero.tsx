
import { ArrowDown, Grape } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import WineCollection from './WineCollection';

const Hero = () => {
  const scrollToCollection = () => {
    document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with wine illustration */}
        <div className="absolute inset-0 bg-noir-dark">
          <div className="absolute inset-0 bg-gradient-radial from-noir-light/10 to-noir-dark opacity-80"></div>
        </div>
        
        {/* Left side illustration */}
        <div className="absolute left-0 h-full w-1/3 flex items-center justify-center opacity-20">
          <div className="relative h-[90%] w-full bg-[url('/lovable-uploads/311c609b-df0b-4316-9297-c778f5daff8f.png')] bg-contain bg-no-repeat bg-center"></div>
        </div>
        
        {/* Wine glass decoration - positioned absolutely */}
        <div className="absolute right-[10%] top-1/4 w-72 h-72 rounded-full bg-wine/5 blur-3xl animate-pulse opacity-50"></div>
        <div className="absolute left-[15%] bottom-1/4 w-48 h-48 rounded-full bg-wine/10 blur-3xl animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
        
        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <Grape className="h-14 w-14 text-wine opacity-0 animate-fade-in animate-delay-100" />
            <span className="block relative overflow-hidden font-serif text-7xl font-medium opacity-0 animate-fade-in animate-delay-100">
              <span className="inline-block">DBarrique</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-wine to-wine-light transform -translate-x-full animate-[slideInLeft_1.5s_ease-in-out_forwards_0.5s]"></span>
            </span>
          </div>
          
          <div className="max-w-md mx-auto mt-12 opacity-0 animate-fade-in animate-delay-300">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40" />
              </div>
              <Input 
                type="text" 
                placeholder="Search your wine collection..." 
                className="w-full pl-10 pr-4 py-6 rounded-md bg-noir-light/50 backdrop-blur-sm border border-white/10 focus:border-wine focus:ring-1 focus:ring-wine text-white placeholder:text-white/40"
              />
            </div>
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
      
      {/* Collection Section */}
      <div id="collection-section" className="min-h-screen bg-noir">
        <WineCollection limit={6} />
      </div>
    </div>
  );
};

export default Hero;
