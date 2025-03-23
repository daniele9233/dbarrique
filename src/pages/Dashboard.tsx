
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WineGlass, Star, ChevronDown, Plus, Grape, Award, Wine } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl md:text-4xl font-serif">
              La Tua <span className="text-wine">Collezione</span>
            </h1>
            <Button className="bg-wine hover:bg-wine-light">
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
                        <WineGlass size={16} className="text-wine" />
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
      
      <Footer />
    </div>
  );
};

export default Dashboard;
