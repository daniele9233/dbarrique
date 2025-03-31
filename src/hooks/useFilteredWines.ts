import { Wine } from '@/data/models/Wine';

interface FilterOptions {
  wines: Wine[];
  searchTerm: string;
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
}

const useFilteredWines = (options: FilterOptions): Wine[] => {
  const {
    wines,
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
  } = options;

  return wines.filter((wine) => {
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
    
    const matchesOccasions = selectedOccasions.length === 0 || 
      (wine.pairing && selectedOccasions.some(occasion => wine.pairing?.toLowerCase().includes(occasion.toLowerCase())));
    
    const matchesRefinements = selectedRefinements.length === 0 ||
      selectedRefinements.some(refinement => {
        if (refinement === 'aged' && wine.storage) {
          return wine.storage.toLowerCase().includes('aged') || wine.storage.toLowerCase().includes('invecchiato');
        }
        return false;
      });
    
    return matchesSearch && matchesRegion && matchesGrape && matchesYear && 
           matchesBody && matchesStructure && matchesTannins && 
           matchesSweetness && matchesAroma && matchesOccasions && matchesRefinements;
  });
};

export default useFilteredWines;
