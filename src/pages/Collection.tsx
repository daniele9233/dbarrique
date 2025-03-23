
import { useState, useRef, ChangeEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WineCard from '@/components/WineCard';
import { Filter, Search, Plus, Grape, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample wine data (updated to 1-10 rating scale) - Solo vini rossi
const wines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2015,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    grape: "Cabernet Sauvignon",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 2,
    name: "Barolo Riserva",
    region: "Piedmont, Italy",
    year: 2016,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Nebbiolo",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Evoluto"
  },
  {
    id: 4,
    name: "Opus One",
    region: "Napa Valley, USA",
    year: 2017,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Merlot",
    body: "Corposo",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 7,
    name: "Sassicaia",
    region: "Tuscany, Italy",
    year: 2016,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Cabernet Sauvignon",
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 8,
    name: "Penfolds Grange",
    region: "South Australia",
    year: 2014,
    rating: 9,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    grape: "Syrah",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Speziato"
  }
];

// Definisco le opzioni di filtro
const regions = [...new Set(wines.map(wine => wine.region))];
const grapes = [...new Set(wines.map(wine => wine.grape))];
const years = [...new Set(wines.map(wine => wine.year))].sort((a, b) => b - a);
const bodyOptions = ["Leggero", "Medio", "Corposo"];
const structureOptions = ["Elegante", "Equilibrato", "Strutturato"];
const tanninOptions = ["Morbido", "Equilibrato", "Tannico"];
const sweetnessOptions = ["Secco", "Amabile", "Dolce"];
const aromaOptions = ["Fruttato", "Speziato", "Evoluto"];

// Definisco le opzioni per le occasioni
const occasions = [
  { id: "pranzo", label: "Pranzo della domenica", count: 219 },
  { id: "cena", label: "Cena Romantica", count: 1 },
  { id: "giorno", label: "Ogni giorno", count: 192 },
  { id: "importante", label: "Occasione Importante", count: 405 },
  { id: "dopocena", label: "Dopo cena", count: 3 },
  { id: "aperitivo", label: "Aperitivo fra amici", count: 1 }
];

// Definisco le opzioni per l'affinamento
const refinements = [
  { id: "acciaio", label: "Acciaio", count: 106 },
  { id: "anfora", label: "Anfora", count: 1 },
  { id: "cemento", label: "Cemento", count: 13 },
  { id: "legnogrande", label: "Legno grande", count: 335 },
  { id: "legnopiccolo", label: "Legno piccolo", count: 563 },
  { id: "surlieviti", label: "Sui lieviti", count: 3 }
];

// Definisco dei vini italiani per regioni
const italianRegions = [
  { id: "abruzzo", label: "Abruzzo", count: 4 },
  { id: "altoadige", label: "Alto Adige", count: 40 },
  { id: "basilicata", label: "Basilicata", count: 1 },
  { id: "calabria", label: "Calabria", count: 1 },
  { id: "campania", label: "Campania", count: 4 },
  { id: "emiliaromagna", label: "Emilia Romagna", count: 21 },
  { id: "friuli", label: "Friuli Venezia Giulia", count: 6 },
  { id: "lazio", label: "Lazio", count: 6 },
  { id: "toscana", label: "Toscana", count: 32 },
  { id: "veneto", label: "Veneto", count: 28 },
  { id: "piemonte", label: "Piemonte", count: 45 },
  { id: "sicilia", label: "Sicilia", count: 18 },
  { id: "sardegna", label: "Sardegna", count: 14 }
];

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
  
  // Collapsible states
  const [isRegionOpen, setIsRegionOpen] = useState(true);
  const [isYearOpen, setIsYearOpen] = useState(true);
  const [isOccasionOpen, setIsOccasionOpen] = useState(true);
  const [isRefinementOpen, setIsRefinementOpen] = useState(true);
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(true);
  
  const [newWine, setNewWine] = useState({
    name: "",
    region: "",
    year: new Date().getFullYear(),
    rating: 5,
    type: "red" as const,
    image: "",
    grape: "",
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  const handleAddWine = () => {
    // This would normally submit the form data to a database
    toast({
      title: "Successo",
      description: "Il nuovo vino è stato aggiunto alla tua collezione.",
    });
    setIsAddWineDialogOpen(false);
    setNewWine({
      name: "",
      region: "",
      year: new Date().getFullYear(),
      rating: 5,
      type: "red" as const,
      image: "",
      grape: "",
      body: "Medio",
      structure: "Equilibrato",
      tannins: "Equilibrato",
      sweetness: "Secco",
      aroma: "Fruttato"
    });
  };
  
  const handleChange = (field: string, value: string | number) => {
    setNewWine({
      ...newWine,
      [field]: value
    });
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Rating selector for 1-10 scale
  const renderRatingInput = () => {
    return (
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="1"
          max="10"
          value={newWine.rating}
          onChange={(e) => handleChange('rating', parseInt(e.target.value))}
          className="w-full h-2 bg-noir rounded-lg appearance-none cursor-pointer accent-wine"
        />
        <span className="text-white font-medium">{newWine.rating}/10</span>
      </div>
    );
  };

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
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  placeholder="Cerca vini per nome, regione, anno o vitigno..."
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-noir-light border border-white/10 focus:border-wine focus:ring-1 focus:ring-wine outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={toggleFilters}
                className="px-5 py-3 rounded-md bg-noir-light border border-white/10 hover:bg-wine transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Filter className="h-5 w-5" />
                <span>Filtri</span>
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
            
            {/* Expandable filters */}
            <div className={`mt-6 transition-all duration-300 ease-wine-bounce ${
              showFilters ? 'opacity-100 max-h-[10000px]' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              <div className="bg-noir-light border border-white/10 rounded-lg p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column - Regions */}
                  <div className="space-y-5">
                    <Collapsible open={isRegionOpen} onOpenChange={setIsRegionOpen}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
                        <h3 className="text-lg font-serif">Nome regione</h3>
                        <span>{isRegionOpen ? '−' : '+'}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {italianRegions.map((region) => (
                          <div key={region.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={region.id} 
                              checked={selectedRegions.includes(region.label)}
                              onCheckedChange={() => handleRegionToggle(region.label)}
                              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                            />
                            <Label 
                              htmlFor={region.id} 
                              className="text-sm font-normal cursor-pointer flex justify-between w-full"
                            >
                              <span>{region.label}</span>
                              <span className="text-white/40">({region.count})</span>
                            </Label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* Grape filter section */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif mb-3">Vitigno</h3>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {grapes.map((grape) => (
                          <div key={grape} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`grape-${grape}`} 
                              checked={selectedGrapes.includes(grape)}
                              onCheckedChange={() => handleGrapeToggle(grape)}
                              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                            />
                            <Label 
                              htmlFor={`grape-${grape}`} 
                              className="text-sm font-normal cursor-pointer"
                            >
                              {grape}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle column - Year, Occasions */}
                  <div className="space-y-5">
                    {/* Year filter */}
                    <Collapsible open={isYearOpen} onOpenChange={setIsYearOpen}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
                        <h3 className="text-lg font-serif">Anno</h3>
                        <span>{isYearOpen ? '−' : '+'}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {years.map((year) => (
                          <div key={year} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`year-${year}`} 
                              checked={selectedYears.includes(year)}
                              onCheckedChange={() => handleYearToggle(year)}
                              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                            />
                            <Label 
                              htmlFor={`year-${year}`} 
                              className="text-sm font-normal cursor-pointer"
                            >
                              {year}
                            </Label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* Occasions filter */}
                    <Collapsible open={isOccasionOpen} onOpenChange={setIsOccasionOpen}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
                        <h3 className="text-lg font-serif">Occasioni</h3>
                        <span>{isOccasionOpen ? '−' : '+'}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {occasions.map((occasion) => (
                          <div key={occasion.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={occasion.id} 
                              checked={selectedOccasions.includes(occasion.id)}
                              onCheckedChange={() => handleOccasionToggle(occasion.id)}
                              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                            />
                            <Label 
                              htmlFor={occasion.id} 
                              className="text-sm font-normal cursor-pointer flex justify-between w-full"
                            >
                              <span>{occasion.label}</span>
                              <span className="text-white/40">({occasion.count})</span>
                            </Label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  
                  {/* Right column - Wine characteristics, Refinement */}
                  <div className="space-y-5">
                    {/* Wine characteristics */}
                    <Collapsible open={isCharacteristicsOpen} onOpenChange={setIsCharacteristicsOpen}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
                        <h3 className="text-lg font-serif">Caratteristiche Vino</h3>
                        <span>{isCharacteristicsOpen ? '−' : '+'}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4">
                        {/* Corpo */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Corpo</h4>
                          <ToggleGroup 
                            type="single" 
                            className="justify-start"
                            value={selectedBody || ""}
                            onValueChange={(value) => setSelectedBody(value || null)}
                          >
                            {bodyOptions.map((option) => (
                              <ToggleGroupItem 
                                key={option} 
                                value={option} 
                                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
                              >
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                        
                        {/* Struttura */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Struttura</h4>
                          <ToggleGroup 
                            type="single" 
                            className="justify-start"
                            value={selectedStructure || ""}
                            onValueChange={(value) => setSelectedStructure(value || null)}
                          >
                            {structureOptions.map((option) => (
                              <ToggleGroupItem 
                                key={option} 
                                value={option} 
                                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
                              >
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                        
                        {/* Tannini */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Tannini</h4>
                          <ToggleGroup 
                            type="single" 
                            className="justify-start"
                            value={selectedTannins || ""}
                            onValueChange={(value) => setSelectedTannins(value || null)}
                          >
                            {tanninOptions.map((option) => (
                              <ToggleGroupItem 
                                key={option} 
                                value={option} 
                                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
                              >
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                        
                        {/* Dolcezza */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Dolcezza</h4>
                          <ToggleGroup 
                            type="single" 
                            className="justify-start"
                            value={selectedSweetness || ""}
                            onValueChange={(value) => setSelectedSweetness(value || null)}
                          >
                            {sweetnessOptions.map((option) => (
                              <ToggleGroupItem 
                                key={option} 
                                value={option} 
                                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
                              >
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                        
                        {/* Aromi principali */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Aromi principali</h4>
                          <ToggleGroup 
                            type="single" 
                            className="justify-start"
                            value={selectedAroma || ""}
                            onValueChange={(value) => setSelectedAroma(value || null)}
                          >
                            {aromaOptions.map((option) => (
                              <ToggleGroupItem 
                                key={option} 
                                value={option} 
                                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
                              >
                                {option}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* Refinement filter */}
                    <Collapsible open={isRefinementOpen} onOpenChange={setIsRefinementOpen}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
                        <h3 className="text-lg font-serif">Affinamento</h3>
                        <span>{isRefinementOpen ? '−' : '+'}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {refinements.map((refinement) => (
                          <div key={refinement.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={refinement.id} 
                              checked={selectedRefinements.includes(refinement.id)}
                              onCheckedChange={() => handleRefinementToggle(refinement.id)}
                              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                            />
                            <Label 
                              htmlFor={refinement.id} 
                              className="text-sm font-normal cursor-pointer flex justify-between w-full"
                            >
                              <span>{refinement.label}</span>
                              <span className="text-white/40">({refinement.count})</span>
                            </Label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
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
          </div>
          
          {/* Wine grid */}
          <div className="max-w-7xl mx-auto px-4">
            {filteredWines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWines.map((wine, index) => (
                  <div
                    key={wine.id}
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 100 + 300}ms` }}
                  >
                    <WineCard {...wine} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg mb-4">Nessun vino trovato che corrisponda ai tuoi criteri.</p>
                <button
                  onClick={resetAllFilters}
                  className="text-wine hover:text-wine-light transition-colors duration-300"
                >
                  Azzera tutti i filtri
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add Wine Dialog */}
      <Dialog open={isAddWineDialogOpen} onOpenChange={setIsAddWineDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl flex items-center gap-2">
              <Grape className="h-6 w-6 text-wine" />
              <span>Aggiungi Nuovo Vino</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Nome del Vino
              </Label>
              <Input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. Brunello di Montalcino"
                value={newWine.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Regione
              </Label>
              <Input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. Toscana, Italia"
                value={newWine.region}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Vitigno
              </Label>
              <Input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. Sangiovese"
                value={newWine.grape}
                onChange={(e) => handleChange('grape', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Anno
                </Label>
                <Input
                  type="number"
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  placeholder="es. 2015"
                  value={newWine.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>
                  Valutazione (1-10)
                </Label>
                {renderRatingInput()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Corpo
                </Label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  value={newWine.body}
                  onChange={(e) => handleChange('body', e.target.value)}
                >
                  {bodyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>
                  Struttura
                </Label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  value={newWine.structure}
                  onChange={(e) => handleChange('structure', e.target.value)}
                >
                  {structureOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>
                  Tannini
                </Label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  value={newWine.tannins}
                  onChange={(e) => handleChange('tannins', e.target.value)}
                >
                  {tanninOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>
                  Dolcezza
                </Label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  value={newWine.sweetness}
                  onChange={(e) => handleChange('sweetness', e.target.value)}
                >
                  {sweetnessOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>
                  Aromi principali
                </Label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  value={newWine.aroma}
                  onChange={(e) => handleChange('aroma', e.target.value)}
                >
                  {aromaOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>
                Immagine del Vino
              </Label>
              <div className="flex gap-2">
                <Input
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  placeholder="Inserisci URL immagine o carica un'immagine"
                  value={typeof newWine.image === 'string' ? newWine.image : ''}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
                <Button 
                  variant="outline"
                  className="border-white/10 hover:bg-wine hover:text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica
                </Button>
                <input 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </div>
              
              {newWine.image && (
                <div className="mt-2 h-40 rounded-md overflow-hidden bg-noir-dark">
                  <img 
                    src={newWine.image.toString()} 
                    alt="Anteprima vino" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsAddWineDialogOpen(false)}
              className="border-white/10 hover:bg-noir hover:text-white"
            >
              Annulla
            </Button>
            <Button
              onClick={handleAddWine}
              className="bg-wine hover:bg-wine-light"
              disabled={!newWine.name || !newWine.region || !newWine.image || !newWine.grape}
            >
              Aggiungi alla Collezione
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Collection;
