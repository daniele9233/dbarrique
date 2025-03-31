
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NetworkFilter, { FilterOptions } from '@/components/network/NetworkFilter';
import WineNetwork from '@/components/network/WineNetwork';
import { getNetworkWines } from '@/data/NetworkWineData';
import { Wine } from 'lucide-react';

const WNetwork = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    grapes: [],
    regions: [],
    characteristics: {
      body: [],
      structure: [],
      tannins: [],
      sweetness: [],
      aroma: []
    }
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Access the network wines
  const networkWines = getNetworkWines();

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Intestazione */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-serif text-4xl text-white mb-2">Wine Network</h1>
          <p className="text-white/60">
            Esplora le relazioni tra i vini in base alle loro caratteristiche e vitigni.
          </p>
        </div>
        
        {/* Contenuto principale */}
        <div className="relative flex max-w-7xl mx-auto px-4 h-[calc(100vh-300px)] min-h-[500px]">
          {/* Pannello laterale */}
          <div className={`absolute md:relative z-10 transition-all duration-300 ${
            isSidebarOpen ? 'left-0' : '-left-64'
          }`}>
            <NetworkFilter 
              onFilterChange={handleFilterChange} 
              className="w-64 h-full"
            />
          </div>
          
          {/* Pulsante per mostrare/nascondere il filtro su mobile */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden absolute top-4 left-4 z-20 p-2 bg-noir-light rounded-full border border-white/10"
          >
            <Wine className={`h-5 w-5 text-wine transition-transform ${isSidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
          </button>
          
          {/* Grafico della rete */}
          <div className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'md:ml-6' : 'ml-0'
          }`}>
            <div className="w-full h-full bg-noir-dark rounded-lg overflow-hidden border border-white/10">
              <WineNetwork filters={filters} />
            </div>
          </div>
        </div>
        
        {/* Legenda */}
        <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
          <h4 className="text-wine text-sm uppercase tracking-wide mb-3">Legenda</h4>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#4169E1] mr-2"></div>
              <span className="text-white/70 text-sm">Cabernet Sauvignon</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#9370DB] mr-2"></div>
              <span className="text-white/70 text-sm">Nebbiolo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3CB371] mr-2"></div>
              <span className="text-white/70 text-sm">Merlot</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FF6347] mr-2"></div>
              <span className="text-white/70 text-sm">Syrah</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#8B4513] mr-2"></div>
              <span className="text-white/70 text-sm">Sangiovese</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FF69B4] mr-2"></div>
              <span className="text-white/70 text-sm">Pinot Noir</span>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-4">
            Le dimensioni delle bolle rappresentano il rating del vino. Le linee collegano vini che condividono caratteristiche simili.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WNetwork;
