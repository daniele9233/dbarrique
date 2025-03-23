
import { useState, useRef, ChangeEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wine, Star, Plus, Grape, Award, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { wines, grapes, bodyOptions, structureOptions, tanninOptions, sweetnessOptions, aromaOptions } from "@/data/WineData";

// Types for our dashboard stats
type WineStats = {
  totalWines: number;
  averageRating: number;
  mostCommonType: {
    type: string;
    count: number;
  };
};

// Types for our wine entries
type WineEntry = {
  id: number;
  name: string;
  producer?: string;
  year: number;
  region: string;
  rating: number;
  grape?: string;
};

const Dashboard = () => {
  // Calculate stats based on the actual wines array
  const calculateStats = (): WineStats => {
    const totalWines = wines.length;
    const totalRating = wines.reduce((sum, wine) => sum + wine.rating, 0);
    const averageRating = totalWines > 0 ? totalRating / totalWines : 0;

    return {
      totalWines,
      averageRating,
      mostCommonType: {
        type: "rosso",
        count: totalWines
      }
    };
  };

  const [stats] = useState<WineStats>(calculateStats());

  // Convert the wines array to WineEntry format
  const convertWinesToEntries = (): WineEntry[] => {
    return wines.map(wine => ({
      id: wine.id,
      name: wine.name,
      producer: wine.name.split(' ')[0], // Simplified for demo
      year: wine.year,
      region: wine.region,
      rating: wine.rating,
      grape: wine.grape
    }));
  };

  const [wineEntries] = useState<WineEntry[]>(convertWinesToEntries());

  // Render the wine rating as stars/icons
  const renderRating = (rating: number) => {
    const maxRating = 10;
    const fullStars = Math.floor(rating);
    const emptyStars = Math.floor(maxRating - rating);
    
    return (
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={14} className="text-wine fill-wine mr-0.5" />
        ))}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={14} className="text-wine/30 mr-0.5" />
        ))}
        <span className="text-xs ml-2">{rating.toFixed(1)}/10</span>
      </div>
    );
  };

  // Add Wine Dialog State
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);
  const [newWine, setNewWine] = useState({
    name: "",
    producer: "",
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
  
  const handleAddWine = () => {
    // Generate a unique ID
    const newId = Date.now() + Math.floor(Math.random() * 1000);
    
    // Create full wine object
    const wineToAdd = {
      id: newId,
      name: newWine.name,
      region: newWine.region || "Non specificata",
      year: newWine.year || new Date().getFullYear(),
      rating: newWine.rating,
      type: "red" as const,
      image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: newWine.grape || "Non specificato",
      body: newWine.body,
      structure: newWine.structure,
      tannins: newWine.tannins,
      sweetness: newWine.sweetness,
      aroma: newWine.aroma
    };
    
    // Add to wine collection
    wines.push(wineToAdd);
    
    // Add to wine entries for the dashboard
    wineEntries.push({
      id: newId,
      name: newWine.name,
      producer: newWine.producer || newWine.name.split(' ')[0],
      year: newWine.year || new Date().getFullYear(),
      region: newWine.region || "Non specificata",
      rating: newWine.rating,
      grape: newWine.grape
    });
    
    toast({
      title: "Successo",
      description: "Nuovo vino aggiunto alla tua collezione.",
    });
    
    setIsAddWineDialogOpen(false);
    setNewWine({
      name: "",
      producer: "",
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

  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl md:text-4xl font-serif">
              La Tua <span className="text-wine">Collezione</span>
            </h1>
            <Button 
              className="bg-wine hover:bg-wine-light"
              onClick={() => setIsAddWineDialogOpen(true)}
            >
              <Plus size={16} className="mr-1" /> Aggiungi Vino
            </Button>
          </div>
          <p className="text-white/60 italic">
            "Una bottiglia di vino contiene più filosofia che tutti i libri del mondo." – Louis Pasteur
          </p>
        </header>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-noir-light border-wine/20 border">
            <CardHeader className="pb-2 pt-6 flex flex-row items-center justify-between">
              <h3 className="text-sm uppercase tracking-wide text-white/70">Totale Vini</h3>
              <Grape className="h-5 w-5 text-wine" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">{wines.length}</span>
                <span className="text-sm text-white/60 mt-1">
                  NELLA TUA COLLEZIONE
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-noir-light border-wine/20 border">
            <CardHeader className="pb-2 pt-6 flex flex-row items-center justify-between">
              <h3 className="text-sm uppercase tracking-wide text-white/70">Valutazione Media</h3>
              <Award className="h-5 w-5 text-wine" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">
                  {wines.length > 0 
                    ? (wines.reduce((sum, wine) => sum + wine.rating, 0) / wines.length).toFixed(1) 
                    : "0.0"}
                </span>
                <span className="text-sm text-white/60 mt-1">
                  SU 10 PUNTI
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-noir-light border-wine/20 border">
            <CardHeader className="pb-2 pt-6 flex flex-row items-center justify-between">
              <h3 className="text-sm uppercase tracking-wide text-white/70">Tipo Più Comune</h3>
              <Wine className="h-5 w-5 text-wine" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold capitalize">Rosso</span>
                <span className="text-sm text-white/60 mt-1">
                  {wines.length} BOTTIGLIE IN COLLEZIONE
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Wines Section */}
        <div className="mb-5">
          <div className="border-b border-white/10 pb-2 mb-6">
            <h2 className="text-xl font-medium flex items-center">
              <span className="inline-block w-8 h-px bg-wine mr-3"></span>
              I TUOI MIGLIORI VINI
            </h2>
          </div>
          
          <Table>
            <TableHeader className="bg-noir-light border-b border-white/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-white/70 font-medium">VINO</TableHead>
                <TableHead className="text-white/70 font-medium">ANNATA</TableHead>
                <TableHead className="text-white/70 font-medium">REGIONE</TableHead>
                <TableHead className="text-white/70 font-medium">VALUTAZIONE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wines
                .sort((a, b) => b.rating - a.rating) // Sort by rating
                .slice(0, 5) // Take top 5
                .map((wine) => (
                <TableRow 
                  key={wine.id} 
                  className="border-b border-white/5 hover:bg-noir-light/40 transition-colors cursor-pointer"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 mr-4 rounded bg-noir-dark flex items-center justify-center">
                        <Wine size={16} className="text-wine" />
                      </div>
                      <div>
                        <p className="font-medium">{wine.name}</p>
                        <p className="text-sm text-white/60">{wine.grape}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{wine.year}</TableCell>
                  <TableCell>{wine.region}</TableCell>
                  <TableCell>{renderRating(wine.rating)}</TableCell>
                </TableRow>
              ))}
              {wines.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-white/50">
                    Nessun vino nella collezione. Aggiungi il tuo primo vino!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Add Wine Dialog */}
      <Dialog open={isAddWineDialogOpen} onOpenChange={setIsAddWineDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl flex items-center gap-2">
              <Grape className="h-6 w-6 text-wine" />
              <span>Aggiungi Nuovo Vino</span>
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Inserisci i dettagli del vino che desideri aggiungere alla tua collezione. I campi contrassegnati con * sono obbligatori.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nome del Vino *
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. Brunello di Montalcino"
                value={newWine.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Produttore
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. Biondi-Santi"
                value={newWine.producer}
                onChange={(e) => handleChange('producer', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Regione
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. Toscana"
                value={newWine.region}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Vitigno
              </label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.grape}
                onChange={(e) => handleChange('grape', e.target.value)}
              >
                <option value="">Seleziona un vitigno</option>
                {grapes.map(grape => (
                  <option key={grape} value={grape}>{grape}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Annata
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                  placeholder="es. 2016"
                  value={newWine.year || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? '' : parseInt(e.target.value);
                    handleChange('year', value || new Date().getFullYear());
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Valutazione (1-10)
                </label>
                {renderRatingInput()}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Corpo
                </label>
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
                <label className="text-sm font-medium leading-none">
                  Struttura
                </label>
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Tannini
                </label>
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
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Dolcezza
                </label>
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
                <label className="text-sm font-medium leading-none">
                  Aromi principali
                </label>
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
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Immagine del Vino
              </label>
              <div className="flex gap-2">
                <input
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
              disabled={!newWine.name} // Only name is required
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

export default Dashboard;
