
import { useState } from 'react';
import { Wine as WineType } from '@/data/models/Wine';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import WineCard from '@/components/wine-card';

interface WineRecommendationProps {
  wine: WineType & { matchScore?: number };
  matchScore: number;
}

const WineRecommendation = ({ wine, matchScore }: WineRecommendationProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const getMatchColor = () => {
    if (matchScore >= 90) return "bg-green-500";
    if (matchScore >= 75) return "bg-green-400";
    if (matchScore >= 60) return "bg-amber-400";
    return "bg-amber-300";
  };
  
  return (
    <>
      <div 
        className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
          <img 
            src={wine.image || '/placeholder.svg'} 
            alt={wine.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <h4 className="font-medium">{wine.name}</h4>
          <p className="text-sm text-white/60">{wine.winery}, {wine.year}</p>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-medium", getMatchColor())}>
            {matchScore}%
          </div>
          <span className="text-xs text-white/50">Match</span>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <WineCard {...wine} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WineRecommendation;
