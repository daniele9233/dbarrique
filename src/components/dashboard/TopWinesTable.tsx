
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wine as WineIcon, Star } from 'lucide-react';
import { Wine } from "@/data/models/Wine";

interface TopWinesTableProps {
  wines: Wine[];
}

const TopWinesTable = ({ wines }: TopWinesTableProps) => {
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
          {wines.length > 0 ? (
            wines
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
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-white/50">
                Nessun vino nella collezione. Aggiungi il tuo primo vino!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopWinesTable;
