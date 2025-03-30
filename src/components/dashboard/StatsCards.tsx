
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Grape, Award, Wine as WineIcon } from 'lucide-react';
import { Wine } from "@/data/models/Wine";

interface StatsCardsProps {
  localWines: Wine[];
}

const StatsCards = ({ localWines }: StatsCardsProps) => {
  const averageRating = localWines.length > 0
    ? (localWines.reduce((sum, wine) => sum + wine.rating, 0) / localWines.length).toFixed(1)
    : "0.0";

  return (
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
            <span className="text-4xl font-semibold">{averageRating}</span>
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
  );
};

export default StatsCards;
