
import { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WineCardProps {
  name: string;
  region: string;
  year: number;
  rating: number;
  type: 'red' | 'white' | 'rosé' | 'sparkling';
  image: string;
}

const WineCard = ({ name, region, year, rating, type, image }: WineCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
      <div 
        className="group relative rounded-lg overflow-hidden transition-all duration-500 h-[400px] wine-glass cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Wine type badge */}
        <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${typeColors[type]} ${typeTextColors[type]}`}>
          {type}
        </div>
        
        {/* Wine image */}
        <div className="absolute inset-0 bg-noir-dark overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-transparent"></div>
        </div>
        
        {/* Main content */}
        <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 ease-wine-bounce">
          <div className="space-y-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            
            <h3 className="font-serif text-2xl">{name}</h3>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/70 text-sm">{region}</p>
                <p className="text-white/90 font-medium">{year}</p>
              </div>
              
              <button 
                className="h-10 w-10 rounded-full flex items-center justify-center bg-wine hover:bg-wine-light transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to collection logic would go here
                }}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div 
          className={`absolute inset-0 bg-wine/10 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
      </div>

      {/* Wine Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl">{name}</DialogTitle>
            <DialogDescription className="text-white/70">{region}, {year}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg overflow-hidden h-[300px]">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Rating</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Type</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${typeColors[type]} ${typeTextColors[type]}`}>
                  {type}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Description</h4>
                <p className="text-white/80">
                  This exceptional {type} wine from {region} showcases remarkable complexity and character.
                  With notes of {type === 'red' ? 'dark berries, leather, and oak' : 
                              type === 'white' ? 'citrus, green apple, and honeysuckle' : 
                              type === 'rosé' ? 'strawberry, watermelon, and rose petal' : 
                              'pear, brioche, and toasted almonds'}, 
                  it offers an unforgettable tasting experience.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Perfect Pairing</h4>
                <p className="text-white/80">
                  {type === 'red' ? 'Red meat, aged cheeses, and mushroom dishes' : 
                   type === 'white' ? 'Seafood, poultry, and fresh salads' : 
                   type === 'rosé' ? 'Mediterranean cuisine, grilled vegetables, and light pasta' : 
                   'Oysters, light appetizers, and celebrations'}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Storage</h4>
                <p className="text-white/80">
                  Best stored at 12-16°C with 70% humidity. Will continue to develop for {type === 'red' ? '5-10' : '2-4'} years.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WineCard;
