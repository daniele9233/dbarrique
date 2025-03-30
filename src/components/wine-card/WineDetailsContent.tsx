
import { Wine } from '@/data/models/Wine';
import { Star } from 'lucide-react';

interface WineDetailsContentProps {
  wine: {
    name: string;
    region: string;
    winery?: string;
    year: number;
    rating: number;
    type: Wine['type'];
    grape: string;
    grapes?: string[];
    body: string;
    structure: string;
    tannins: string;
    sweetness: string;
    aroma: string;
    image: string;
    description: string;
    pairing: string;
    storage: string;
  };
  isEditMode: boolean;
}

const WineDetailsContent = ({ wine, isEditMode }: WineDetailsContentProps) => {
  const renderRatingStars = (rating: number) => {
    return [...Array(10)].map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'}`}
      />
    ));
  };
  
  if (isEditMode) {
    return null; // Don't render in edit mode
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="rounded-lg overflow-hidden h-[300px]">
        <img src={wine.image} alt={wine.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Valutazione (1-10)</h4>
          <div className="flex items-center space-x-0.5 flex-wrap">
            {renderRatingStars(wine.rating)}
            <span className="ml-2 text-white/70">{wine.rating}/10</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Cantina</h4>
          <p className="text-white/80">{wine.winery || "Non specificata"}</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Vitigno</h4>
          <p className="text-white/80">
            {wine.grape === "Blend" && wine.grapes && wine.grapes.length > 0 
              ? `Blend (${wine.grapes.join(', ')})`
              : wine.grape}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Caratteristiche</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/80">
            <div>
              <span className="text-wine/80 text-xs">Corpo:</span> {wine.body}
            </div>
            <div>
              <span className="text-wine/80 text-xs">Struttura:</span> {wine.structure}
            </div>
            <div>
              <span className="text-wine/80 text-xs">Tannini:</span> {wine.tannins}
            </div>
            <div>
              <span className="text-wine/80 text-xs">Dolcezza:</span> {wine.sweetness}
            </div>
            <div>
              <span className="text-wine/80 text-xs">Aromi:</span> {wine.aroma}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Descrizione</h4>
          <p className="text-white/80">{wine.description}</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Abbinamenti Consigliati</h4>
          <p className="text-white/80">{wine.pairing}</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Conservazione</h4>
          <p className="text-white/80">{wine.storage}</p>
        </div>
      </div>
    </div>
  );
};

export default WineDetailsContent;
