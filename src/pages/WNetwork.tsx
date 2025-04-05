
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NetworkFilter, { FilterOptions } from '@/components/network/filters';
import NetworkHeader from '@/components/network/NetworkHeader';
import NetworkContainer from '@/components/network/NetworkContainer';
import SidebarToggle from '@/components/network/SidebarToggle';
import NetworkLegend from '@/components/network/NetworkLegend';

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
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const legendItems = [
    { color: "#9370DB", label: "Nebbiolo" },
    { color: "#8B4513", label: "Sangiovese" },
    { color: "#4169E1", label: "Cabernet Sauvignon" },
    { color: "#3CB371", label: "Merlot" },
    { color: "#FF6347", label: "Syrah" },
    { color: "#FF69B4", label: "Pinot Noir" },
    { color: "#800000", label: "Primitivo" },
    { color: "#A0522D", label: "Aglianico" },
    { color: "#FFD700", label: "Chardonnay" },
    { color: "#7FFF00", label: "Sauvignon Blanc" }
  ];

  const legendDescription = "Le dimensioni delle bolle rappresentano il rating del vino. Le linee collegano vini che condividono caratteristiche simili. I colori indicano il vitigno principale.";

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <NetworkHeader 
          title="Wine Network" 
          description="Esplora le relazioni tra i vini in base alle loro caratteristiche e vitigni di tutto il mondo."
        />
        
        {/* Main content area with sidebar and network */}
        <div className="relative flex max-w-7xl mx-auto px-4 h-[calc(100vh-300px)] min-h-[500px]">
          {/* Sidebar */}
          <div className={`absolute md:relative z-10 transition-all duration-300 ${
            isSidebarOpen ? 'left-0' : '-left-64'
          }`}>
            <NetworkFilter 
              onFilterChange={handleFilterChange} 
              className="w-64 h-full"
            />
          </div>
          
          {/* Sidebar toggle button */}
          <SidebarToggle 
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          
          {/* Wine network visualization */}
          <NetworkContainer 
            isSidebarOpen={isSidebarOpen}
            filters={filters}
          />
        </div>
        
        {/* Legend */}
        <div className="max-w-7xl mx-auto px-4">
          <NetworkLegend 
            items={legendItems}
            description={legendDescription}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WNetwork;
