
import { ArrowRight, Grape } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background con vineyard image */}
      <div className="absolute inset-0 bg-noir-dark">
        <div className="absolute inset-0 bg-gradient-radial from-noir-light/10 to-noir-dark opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
      
      {/* Wine glass decoration - positioned absolutely */}
      <div className="absolute right-[10%] top-1/4 w-72 h-72 rounded-full bg-wine/5 blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute left-[15%] bottom-1/4 w-48 h-48 rounded-full bg-wine/10 blur-3xl animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Grape className="h-14 w-14 text-wine opacity-0 animate-fade-in animate-delay-100" />
          <span className="block relative overflow-hidden font-serif text-7xl font-medium opacity-0 animate-fade-in animate-delay-100">
            <span className="inline-block">
              DBarrique
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-wine to-wine-light transform -translate-x-full animate-[slideInLeft_1.5s_ease-in-out_forwards_0.5s]"></span>
          </span>
        </div>
        
        <p className="max-w-xl mx-auto text-white/80 text-lg mb-10 leading-relaxed opacity-0 animate-fade-in animate-delay-200 font-serif italic">
          "Bere del vino è bere del genio."
          <br />
          <span className="text-wine/80 text-sm mt-2 block">Charles Baudelaire</span>
        </p>
        
        <div className="max-w-md mx-auto opacity-0 animate-fade-in animate-delay-300">
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
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-fade-in animate-delay-500">
        <div className="flex flex-col items-center">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-wine"></div>
          <span className="text-xs tracking-widest uppercase text-white/50 mt-2">Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
