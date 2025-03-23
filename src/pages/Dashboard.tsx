
import { useState, useRef, ChangeEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wine, Star, ChevronDown, Plus, Grape, Award, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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
  producer: string;
  year: number;
  region: string;
  rating: number;
};

const Dashboard = () => {
  // Sample data for the dashboard
  const [stats] = useState<WineStats>({
    totalWines: 5,
    averageRating: 8.8,
    mostCommonType: {
      type: "rosso",
      count: 4
    }
  });

  // Sample wine entries
  const [wines] = useState<WineEntry[]>([
    {
      id: 1,
      name: "Brunello di Montalcino",
      producer: "Biondi-Santi",
      year: 2016,
      region: "Toscana",
      rating: 10
    },
    {
      id: 2,
      name: "Amarone della Valpolicella",
      producer: "Dal Forno Romano",
      year: 2010,
      region: "Veneto",
      rating: 10
    },
    {
      id: 3,
      name: "Barolo Riserva",
      producer: "Cantina Mascarello",
      year: 2015,
      region: "Piemonte",
      rating: 8
    },
    {
      id: 4,
      name: "Franciacorta Brut",
      producer: "Bellavista",
      year: 2018,
      region: "Lombardia",
      rating: 8
    },
    {
      id: 5,
      name: "Sassicaia",
      producer: "Tenuta San Guido",
      year: 2018,
      region: "Toscana",
      rating: 8
    }
  ]);

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
    image: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleAddWine = () => {
    // This would normally submit the form data to a database
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
      image: ""
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
                <span className="text-4xl font-semibold">{stats.totalWines}</span>
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
                <span className="text-4xl font-semibold">{stats.averageRating.toFixed(1)}</span>
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
                <span className="text-4xl font-semibold capitalize">{stats.mostCommonType.type}</span>
                <span className="text-sm text-white/60 mt-1">
                  {stats.mostCommonType.count} BOTTIGLIE IN COLLEZIONE
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
              {wines.map((wine) => (
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
                        <p className="text-sm text-white/60">{wine.producer}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{wine.year}</TableCell>
                  <TableCell>{wine.region}</TableCell>
                  <TableCell>{renderRating(wine.rating)}</TableCell>
                </TableRow>
              ))}
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
                Produttore
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
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
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="es. Toscana"
                value={newWine.region}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Annata
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  placeholder="es. 2016"
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
              disabled={!newWine.name || !newWine.producer || !newWine.region}
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
