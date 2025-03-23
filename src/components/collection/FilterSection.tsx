
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import FilterRegion from './FilterRegion';
import FilterGrape from './FilterGrape';
import FilterYear from './FilterYear';
import FilterOccasion from './FilterOccasion';
import FilterWineCharacteristics from './FilterWineCharacteristics';
import FilterRefinement from './FilterRefinement';

interface FilterSectionProps {
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
}

const FilterSection: React.FC<FilterSectionProps> = ({
  showFilters,
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
  resetAllFilters
}) => {
  return (
    <div className={`mt-6 transition-all duration-300 ease-wine-bounce ${
      showFilters ? 'opacity-100 max-h-[10000px]' : 'opacity-0 max-h-0 overflow-hidden'
    }`}>
      <div className="bg-noir-light border border-white/10 rounded-lg p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Regions and Grape */}
          <div className="space-y-5">
            <FilterRegion 
              selectedRegions={selectedRegions} 
              handleRegionToggle={handleRegionToggle} 
            />
            <FilterGrape 
              selectedGrapes={selectedGrapes} 
              handleGrapeToggle={handleGrapeToggle} 
            />
          </div>
          
          {/* Middle column - Year, Occasions */}
          <div className="space-y-5">
            <FilterYear 
              selectedYears={selectedYears} 
              handleYearToggle={handleYearToggle} 
            />
            <FilterOccasion 
              selectedOccasions={selectedOccasions} 
              handleOccasionToggle={handleOccasionToggle} 
            />
          </div>
          
          {/* Right column - Wine characteristics, Refinement */}
          <div className="space-y-5">
            <FilterWineCharacteristics 
              selectedBody={selectedBody}
              selectedStructure={selectedStructure}
              selectedTannins={selectedTannins}
              selectedSweetness={selectedSweetness}
              selectedAroma={selectedAroma}
              setSelectedBody={setSelectedBody}
              setSelectedStructure={setSelectedStructure}
              setSelectedTannins={setSelectedTannins}
              setSelectedSweetness={setSelectedSweetness}
              setSelectedAroma={setSelectedAroma}
            />
            <FilterRefinement 
              selectedRefinements={selectedRefinements} 
              handleRefinementToggle={handleRefinementToggle} 
            />
          </div>
        </div>
        
        {/* Reset Filters */}
        <div className="pt-5 flex justify-end">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-wine hover:text-white"
            onClick={resetAllFilters}
          >
            Azzera filtri
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
