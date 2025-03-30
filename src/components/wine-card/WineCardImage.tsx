
import { useState } from 'react';
import { Wine } from '@/data/models/Wine';

interface WineCardImageProps {
  image: string;
  name: string;
  type: Wine['type'];
  isHovered: boolean;
}

const WineCardImage = ({ image, name, type, isHovered }: WineCardImageProps) => {
  const typeColors = {
    red: 'bg-wine',
    white: 'bg-amber-100',
    rosé: 'bg-rose-300',
    sparkling: 'bg-yellow-100',
  };
  
  const typeTextColors = {
    red: 'text-white',
    white: 'text-noir',
    rosé: 'text-noir',
    sparkling: 'text-noir',
  };
  
  return (
    <>
      <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${typeColors[type]} ${typeTextColors[type]}`}>
        {type}
      </div>
      
      <div className="absolute inset-0 bg-noir-dark overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-transparent"></div>
      </div>
      
      <div 
        className={`absolute inset-0 bg-wine/10 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </>
  );
};

export default WineCardImage;
