
import React from 'react';
import { Wine } from '@/data/models/Wine';
import WineCharacteristics from './wine-details/WineCharacteristics';
import WineDescription from './wine-details/WineDescription';
import WinePairing from './wine-details/WinePairing';
import WineStorage from './wine-details/WineStorage';
import ShareButtons from './ShareButtons';

interface WineDetailsContentProps {
  wine: Wine;
  isEditMode: boolean;
}

const WineDetailsContent: React.FC<WineDetailsContentProps> = ({ wine, isEditMode }) => {
  if (isEditMode) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Colonna immagine */}
        <div className="md:w-1/3">
          {wine.image && (
            <div className="rounded-lg overflow-hidden border border-white/10">
              <img 
                src={wine.image} 
                alt={wine.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Colonna dettagli */}
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <div className="bg-noir-light/50 p-4 rounded-lg border border-white/5">
                <h3 className="text-sm text-white/60 uppercase mb-2">Dettagli</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-white/60">Cantina:</span>
                  <span>{wine.winery || "Non specificato"}</span>
                  
                  <span className="text-white/60">Tipo:</span>
                  <span>{wine.type}</span>
                  
                  <span className="text-white/60">Vitigno:</span>
                  <span>{wine.grape}</span>
                  
                  {wine.grape === "Blend" && wine.grapes && wine.grapes.length > 0 && (
                    <>
                      <span className="text-white/60">Vitigni:</span>
                      <span>{wine.grapes.join(", ")}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <WineCharacteristics wine={wine} />
            </div>
          </div>
          
          <WineDescription description={wine.description} />
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <WinePairing pairing={wine.pairing} />
            </div>
            <div className="md:w-1/2">
              <WineStorage storage={wine.storage} />
            </div>
          </div>
          
          <ShareButtons wine={wine} />
        </div>
      </div>
    </div>
  );
};

export default WineDetailsContent;
