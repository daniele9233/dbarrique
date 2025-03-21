
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 bg-noir-dark">
        <div className="absolute inset-0 bg-gradient-radial from-noir-light/10 to-noir-dark opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>
      
      {/* Wine glass decoration - positioned absolutely */}
      <div className="absolute right-[10%] top-1/4 w-72 h-72 rounded-full bg-wine/5 blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute left-[15%] bottom-1/4 w-48 h-48 rounded-full bg-wine/10 blur-3xl animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h4 className="text-wine uppercase tracking-[0.3em] text-sm font-light mb-4 opacity-0 animate-fade-in">
          The Private Collection
        </h4>
        <h1 className="font-serif text-5xl md:text-7xl font-medium mb-6">
          <span className="block opacity-0 animate-fade-in animate-delay-100">Vino</span>
          <span className="block text-gradient relative overflow-hidden">
            <span className="inline-block opacity-0 animate-fade-in animate-delay-200">
              Nero
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-wine to-wine-light transform -translate-x-full animate-[slideInLeft_1.5s_ease-in-out_forwards_0.5s]"></span>
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-white/80 text-lg mb-10 leading-relaxed opacity-0 animate-fade-in animate-delay-200">
          A curated selection of the finest wines from around the world, stored in perfect conditions and cataloged for your pleasure.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center opacity-0 animate-fade-in animate-delay-300">
          <Link to="/collection" className="btn-wine group">
            <span>Explore Collection</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
