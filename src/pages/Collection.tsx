
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/collection/SearchBar';
import FilterSection from '@/components/collection/FilterSection';
import WineGrid from '@/components/collection/WineGrid';
import AddWineDialog from '@/components/collection/AddWineDialog';
import { wines } from '@/data/services/wineService';

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);
  
  // Filtri
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedGrapes, setSelectedGrapes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [selectedTannins, setSelectedTannins] = useState<string | null>(null);
  const [selectedSweetness, setSelectedSweetness] = useState<string | null>(null);
  const [selectedAroma, setSelectedAroma] = useState<string | null>(null);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedRefinements, setSelectedRefinements] = useState<string[]>([]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };
  
  const handleGrapeToggle = (grape: string) => {
    setSelectedGrapes(prev => 
      prev.includes(grape) 
        ? prev.filter(g => g !== grape) 
        : [...prev, grape]
    );
  };
  
  const handleYearToggle = (year: number) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year) 
        : [...prev, year]
    );
  };
  
  const handleOccasionToggle = (occasion: string) => {
    setSelectedOccasions(prev => 
      prev.includes(occasion) 
        ? prev.filter(o => o !== occasion) 
        : [...prev, occasion]
    );
  };
  
  const handleRefinementToggle = (refinement: string) => {
    setSelectedRefinements(prev => 
      prev.includes(refinement) 
        ? prev.filter(r => r !== refinement) 
        : [...prev, refinement]
    );
  };
  
  const filteredWines = wines.filter((wine) => {
    const matchesSearch = 
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.year.toString().includes(searchTerm) ||
      wine.grape.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.some(region => wine.region.includes(region));
    const matchesGrape = selectedGrapes.length === 0 || selectedGrapes.includes(wine.grape);
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(wine.year);
    const matchesBody = selectedBody ? wine.body === selectedBody : true;
    const matchesStructure = selectedStructure ? wine.structure === selectedStructure : true;
    const matchesTannins = selectedTannins ? wine.tannins === selectedTannins : true;
    const matchesSweetness = selectedSweetness ? wine.sweetness === selectedSweetness : true;
    const matchesAroma = selectedAroma ? wine.aroma === selectedAroma : true;
    
    return matchesSearch && matchesRegion && matchesGrape && matchesYear && 
           matchesBody && matchesStructure && matchesTannins && 
           matchesSweetness && matchesAroma;
  });

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedRegions([]);
    setSelectedGrapes([]);
    setSelectedYears([]);
    setSelectedBody(null);
    setSelectedStructure(null);
    setSelectedTannins(null);
    setSelectedSweetness(null);
    setSelectedAroma(null);
    setSelectedOccasions([]);
    setSelectedRefinements([]);
  };
  
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="section">
          <div className="max-w-5xl mx-auto mb-12 text-center">
            <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3 opacity-0 animate-fade-in">Premium Selection</h4>
            <h1 className="font-serif text-4xl md:text-5xl mb-5 opacity-0 animate-fade-in animate-delay-100">Collezione di Vini</h1>
            <p className="text-white/70 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-200">
              Esplora la nostra collezione di vini rossi d'eccellenza provenienti da tutto il mondo.
              Ogni bottiglia racconta una storia unica di terroir, tradizione e maestria artigianale.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="max-w-7xl mx-auto mb-12 px-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              
              {/* Filter Button with Toggle */}
              <button
                onClick={toggleFilters}
                className={`px-5 py-3 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 ${
                  showFilters ? "bg-wine text-white" : "bg-noir-light border border-white/10 hover:bg-wine/90"
                }`}
              >
                Filtri
              </button>
              
              {/* Add Wine Button */}
              <button
                onClick={() => setIsAddWineDialogOpen(true)}
                className="px-5 py-3 rounded-md bg-wine border border-wine hover:bg-wine-light transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                <span>Aggiungi Vino</span>
              </button>
            </div>
            
            <FilterSection 
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              selectedRegions={selectedRegions}
              selectedGrapes={selectedGrapes}
              selectedYears={selectedYears}
              selectedBody={selectedBody}
              selectedStructure={selectedStructure}
              selectedTannins={selectedTannins}
              selectedSweetness={selectedSweetness}
              selectedAroma={selectedAroma}
              selectedOccasions={selectedOccasions}
              selectedRefinements={selectedRefinements}
              handleRegionToggle={handleRegionToggle}
              handleGrapeToggle={handleGrapeToggle}
              handleYearToggle={handleYearToggle}
              handleOccasionToggle={handleOccasionToggle}
              handleRefinementToggle={handleRefinementToggle}
              setSelectedBody={setSelectedBody}
              setSelectedStructure={setSelectedStructure}
              setSelectedTannins={setSelectedTannins}
              setSelectedSweetness={setSelectedSweetness}
              setSelectedAroma={setSelectedAroma}
              resetAllFilters={resetAllFilters}
            />
          </div>
          
          {/* Wine grid */}
          <WineGrid 
            wines={filteredWines}
            resetAllFilters={resetAllFilters}
          />
        </div>
      </main>
      
      {/* Add Wine Dialog */}
      <AddWineDialog 
        isOpen={isAddWineDialogOpen}
        onOpenChange={setIsAddWineDialogOpen}
      />
      
      <Footer />
    </div>
  );
};

export default Collection;
