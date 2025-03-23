
import { useState, useRef, ChangeEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WineCard from '@/components/WineCard';
import { Filter, Search, Plus, Grape, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Sample wine data (updated to 1-10 rating scale) - Solo vini rossi
const wines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2015,
    rating: 10,
    type: "red",
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
    type: "red",
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
    type: "red",
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
    type: "red",
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
    type: "red",
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
const bodyOptions = ["Leggero", "Medio", "Corposo"];
const structureOptions = ["Elegante", "Equilibrato", "Strutturato"];
const tanninOptions = ["Morbido", "Equilibrato", "Tannico"];
const sweetnessOptions = ["Secco", "Amabile", "Dolce"];
const aromaOptions = ["Fruttato", "Speziato", "Evoluto"];

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);
  
  // Filtri
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedGrape, setSelectedGrape] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [selectedTannins, setSelectedTannins] = useState<string | null>(null);
  const [selectedSweetness, setSelectedSweetness] = useState<string | null>(null);
  const [selectedAroma, setSelectedAroma] = useState<string | null>(null);
  
  const [newWine, setNewWine] = useState({
    name: "",
    region: "",
    year: new Date().getFullYear(),
    rating: 5,
    type: "red",
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
  
  const filteredWines = wines.filter((wine) => {
    const matchesSearch = 
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.year.toString().includes(searchTerm) ||
      wine.grape.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion ? wine.region === selectedRegion : true;
    const matchesGrape = selectedGrape ? wine.grape === selectedGrape : true;
    const matchesBody = selectedBody ? wine.body === selectedBody : true;
    const matchesStructure = selectedStructure ? wine.structure === selectedStructure : true;
    const matchesTannins = selectedTannins ? wine.tannins === selectedTannins : true;
    const matchesSweetness = selectedSweetness ? wine.sweetness === selectedSweetness : true;
    const matchesAroma = selectedAroma ? wine.aroma === selectedAroma : true;
    
    return matchesSearch && matchesRegion && matchesGrape && matchesBody && 
           matchesStructure && matchesTannins && matchesSweetness && matchesAroma;
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
      type: "red",
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
          <div className="max-w-5xl mx-auto mb-12 px-4">
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
              showFilters ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              <div className="bg-noir-light border border-white/10 rounded-lg p-5 space-y-5">
                {/* Regione */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Regione</h3>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <button
                        key={region}
                        className={`px-3 py-1.5 text-sm rounded-md border transition-colors duration-200 ${
                          selectedRegion === region
                            ? 'bg-wine border-wine text-white'
                            : 'bg-transparent border-white/10 text-white hover:border-wine/50'
                        }`}
                        onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Vitigno */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Vitigno</h3>
                  <div className="flex flex-wrap gap-2">
                    {grapes.map((grape) => (
                      <button
                        key={grape}
                        className={`px-3 py-1.5 text-sm rounded-md border transition-colors duration-200 ${
                          selectedGrape === grape
                            ? 'bg-wine border-wine text-white'
                            : 'bg-transparent border-white/10 text-white hover:border-wine/50'
                        }`}
                        onClick={() => setSelectedGrape(selectedGrape === grape ? null : grape)}
                      >
                        {grape}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Corpo */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Corpo</h3>
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
                  <h3 className="text-sm font-medium">Struttura</h3>
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
                  <h3 className="text-sm font-medium">Tannini</h3>
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
                  <h3 className="text-sm font-medium">Dolcezza</h3>
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
                  <h3 className="text-sm font-medium">Aromi principali</h3>
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
                
                {/* Reset Filters */}
                <div className="pt-2 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="border-white/10 hover:bg-wine hover:text-white"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRegion(null);
                      setSelectedGrape(null);
                      setSelectedBody(null);
                      setSelectedStructure(null);
                      setSelectedTannins(null);
                      setSelectedSweetness(null);
                      setSelectedAroma(null);
                    }}
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
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedRegion(null);
                    setSelectedGrape(null);
                    setSelectedBody(null);
                    setSelectedStructure(null);
                    setSelectedTannins(null);
                    setSelectedSweetness(null);
                    setSelectedAroma(null);
                  }}
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
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nome del Vino
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="es. Brunello di Montalcino"
                value={newWine.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Regione
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="es. Toscana, Italia"
                value={newWine.region}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Vitigno
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="es. Sangiovese"
                value={newWine.grape}
                onChange={(e) => handleChange('grape', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Anno
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  placeholder="es. 2015"
                  value={newWine.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Valutazione (1-10)
                </label>
                {renderRatingInput()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Corpo
                </label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  value={newWine.body}
                  onChange={(e) => handleChange('body', e.target.value)}
                >
                  {bodyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Struttura
                </label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
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
                <label className="text-sm font-medium leading-none">
                  Tannini
                </label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  value={newWine.tannins}
                  onChange={(e) => handleChange('tannins', e.target.value)}
                >
                  {tanninOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Dolcezza
                </label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  value={newWine.sweetness}
                  onChange={(e) => handleChange('sweetness', e.target.value)}
                >
                  {sweetnessOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Aromi principali
                </label>
                <select 
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
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
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Immagine del Vino
              </label>
              <div className="flex gap-2">
                <input
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
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
