
import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { wines, loadWinesFromFirestore } from '@/data/services/wineService';
import { Wine } from '@/data/models/Wine';
import { toast } from '@/hooks/use-toast';
import CollectionFiltersSection from '@/components/collection/CollectionFiltersSection';
import CollectionHeader from '@/components/collection/CollectionPageHeader';
import AddWineDialog from '@/components/collection/AddWineDialog';
import WineGrid from '@/components/collection/WineGrid';
import useFilteredWines from '@/hooks/useFilteredWines';

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);
  const [localWines, setLocalWines] = useState<Wine[]>(wines);
  
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
  
  const handleWineAdded = useCallback((wine: Wine) => {
    console.log("Collection: Wine added:", wine);
    
    setLocalWines(prev => {
      if (prev.some(w => w.id === wine.id)) {
        return prev;
      }
      return [...prev, wine];
    });
    
    setIsAddWineDialogOpen(false);
    
    toast({
      title: "Vino aggiunto",
      description: `${wine.name} è stato aggiunto alla collezione.`
    });
    
    loadWinesFromFirestore(true)
      .then(setLocalWines)
      .catch(error => {
        console.error("Errore durante l'aggiornamento dei vini:", error);
      });
  }, []);

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
  
  const filteredWines = useFilteredWines({
    wines: localWines,
    searchTerm,
    selectedRegions,
    selectedGrapes,
    selectedYears,
    selectedBody,
    selectedStructure,
    selectedTannins,
    selectedSweetness,
    selectedAroma,
    selectedOccasions,
    selectedRefinements
  });
  
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <CollectionHeader />
        
        <CollectionFiltersSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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
          handleRegionToggle={(region) => setSelectedRegions(prev => 
            prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
          )}
          handleGrapeToggle={(grape) => setSelectedGrapes(prev => 
            prev.includes(grape) ? prev.filter(g => g !== grape) : [...prev, grape]
          )}
          handleYearToggle={(year) => setSelectedYears(prev => 
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
          )}
          handleOccasionToggle={(occasion) => setSelectedOccasions(prev => 
            prev.includes(occasion) ? prev.filter(o => o !== occasion) : [...prev, occasion]
          )}
          handleRefinementToggle={(refinement) => setSelectedRefinements(prev => 
            prev.includes(refinement) ? prev.filter(r => r !== refinement) : [...prev, refinement]
          )}
          setSelectedBody={setSelectedBody}
          setSelectedStructure={setSelectedStructure}
          setSelectedTannins={setSelectedTannins}
          setSelectedSweetness={setSelectedSweetness}
          setSelectedAroma={setSelectedAroma}
          resetAllFilters={resetAllFilters}
          onAddWineClick={() => setIsAddWineDialogOpen(true)}
        />
        
        <WineGrid 
          wines={filteredWines}
          resetAllFilters={resetAllFilters}
        />
      </main>
      
      <AddWineDialog 
        isOpen={isAddWineDialogOpen}
        onOpenChange={setIsAddWineDialogOpen}
        onWineAdded={handleWineAdded}
      />
      
      <Footer />
    </div>
  );
};

export default Collection;
