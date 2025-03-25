
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wine as WineIcon, Star, Plus, Grape, Award, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import AddWineDialog from "@/components/collection/AddWineDialog";
import { 
  wines, 
  loadWinesFromFirestore, 
  bodyOptions, 
  structureOptions, 
  tanninOptions, 
  sweetnessOptions, 
  aromaOptions, 
  addWine,
  Wine, 
  grapes 
} from "@/data/WineData";

type WineStats = {
  totalWines: number;
  averageRating: number;
  mostCommonType: {
    type: string;
    count: number;
  };
};

type WineEntry = {
  id: string;
  name: string;
  producer?: string;
  year: number;
  region: string;
  rating: number;
  grape?: string;
};

const Dashboard = () => {
  const [localWines, setLocalWines] = useState<Wine[]>(wines);
  const [isLoading, setIsLoading] = useState(wines.length === 0);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);

  useEffect(() => {
    if (wines.length > 0) {
      setLocalWines(wines);
      setIsLoading(false);
      return;
    }

    const fetchWines = async () => {
      try {
        const winesFromFirestore = await loadWinesFromFirestore();
        setLocalWines(winesFromFirestore);
      } catch (error) {
        console.error('Errore nel caricamento dei vini:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i vini dal database.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWines();
  }, []);

  const calculateStats = (): WineStats => {
    const totalWines = localWines.length;
    const totalRating = localWines.reduce((sum, wine) => sum + wine.rating, 0);
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

  const [stats, setStats] = useState<WineStats>(calculateStats());

  useEffect(() => {
    setStats(calculateStats());
  }, [localWines]);

  const convertWinesToEntries = (): WineEntry[] => {
    return localWines.map(wine => ({
      id: wine.id,
      name: wine.name,
      producer: wine.name.split(' ')[0],
      year: wine.year,
      region: wine.region,
      rating: wine.rating,
      grape: wine.grape
    }));
  };

  const [wineEntries, setWineEntries] = useState<WineEntry[]>(convertWinesToEntries());

  useEffect(() => {
    setWineEntries(convertWinesToEntries());
  }, [localWines]);

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

  const handleAddWineComplete = (newWine: Wine) => {
    console.log("Wine added to collection:", newWine);
    setLocalWines(prev => [...prev, newWine]);
    setIsAddWineDialogOpen(false);
    toast({
      title: "Vino Aggiunto",
      description: `${newWine.name} è stato aggiunto alla tua collezione.`
    });
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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-noir-light border-wine/20 border">
                <CardHeader className="pb-2 pt-6 flex flex-row items-center justify-between">
                  <h3 className="text-sm uppercase tracking-wide text-white/70">Totale Vini</h3>
                  <Grape className="h-5 w-5 text-wine" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <span className="text-4xl font-semibold">{localWines.length}</span>
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
                      {localWines.length > 0 
                        ? (localWines.reduce((sum, wine) => sum + wine.rating, 0) / localWines.length).toFixed(1) 
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
                  <WineIcon className="h-5 w-5 text-wine" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <span className="text-4xl font-semibold capitalize">Rosso</span>
                    <span className="text-sm text-white/60 mt-1">
                      {localWines.length} BOTTIGLIE IN COLLEZIONE
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
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
                  {localWines
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5)
                    .map((wine) => (
                      <TableRow 
                        key={wine.id} 
                        className="border-b border-white/5 hover:bg-noir-light/40 transition-colors cursor-pointer"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 mr-4 rounded bg-noir-dark flex items-center justify-center">
                              <WineIcon size={16} className="text-wine" />
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
                  {localWines.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-white/50">
                        Nessun vino nella collezione. Aggiungi il tuo primo vino!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
      
      <AddWineDialog 
        isOpen={isAddWineDialogOpen}
        onOpenChange={setIsAddWineDialogOpen}
        onWineAdded={handleAddWineComplete}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
