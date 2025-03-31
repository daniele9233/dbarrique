
import { Plus } from 'lucide-react';
import SearchBar from '@/components/collection/SearchBar';
import FilterSection from '@/components/collection/FilterSection';

interface CollectionFiltersSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showFilters: boolean;
  toggleFilters: () => void;
  selectedRegions: string[];
  selectedGrapes: string[];
  selectedYears: number[];
  selectedBody: string | null;
  selectedStructure: string | null;
  selectedTannins: string | null;
  selectedSweetness: string | null;
  selectedAroma: string | null;
  selectedOccasions: string[];
  selectedRefinements: string[];
  handleRegionToggle: (region: string) => void;
  handleGrapeToggle: (grape: string) => void;
  handleYearToggle: (year: number) => void;
  handleOccasionToggle: (occasion: string) => void;
  handleRefinementToggle: (refinement: string) => void;
  setSelectedBody: (value: string | null) => void;
  setSelectedStructure: (value: string | null) => void;
  setSelectedTannins: (value: string | null) => void;
  setSelectedSweetness: (value: string | null) => void;
  setSelectedAroma: (value: string | null) => void;
  resetAllFilters: () => void;
  onAddWineClick: () => void;
}

const CollectionFiltersSection: React.FC<CollectionFiltersSectionProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  toggleFilters,
  selectedRegions,
  selectedGrapes,
  selectedYears,
  selectedBody,
  selectedStructure,
  selectedTannins,
  selectedSweetness,
  selectedAroma,
  selectedOccasions,
  selectedRefinements,
  handleRegionToggle,
  handleGrapeToggle,
  handleYearToggle,
  handleOccasionToggle,
  handleRefinementToggle,
  setSelectedBody,
  setSelectedStructure,
  setSelectedTannins,
  setSelectedSweetness,
  setSelectedAroma,
  resetAllFilters,
  onAddWineClick
}) => {
  return (
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
          onClick={onAddWineClick}
          className="px-5 py-3 rounded-md bg-wine border border-wine hover:bg-wine-light transition-colors duration-300 flex items-center justify-center gap-2 group"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span>Aggiungi Vino</span>
        </button>
      </div>
      
      <FilterSection 
        showFilters={showFilters}
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
  );
};

export default CollectionFiltersSection;
