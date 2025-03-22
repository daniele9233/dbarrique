
import { useState, useRef, ChangeEvent } from 'react';
import { Star, Plus, Edit, Save, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

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
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editedWine, setEditedWine] = useState({
    name, 
    region, 
    year, 
    rating, 
    type, 
    image,
    description: type === 'red' ? 'This exceptional red wine from ' + region + ' showcases remarkable complexity and character. With notes of dark berries, leather, and oak, it offers an unforgettable tasting experience.' : 
              type === 'white' ? 'This exceptional white wine from ' + region + ' showcases remarkable complexity and character. With notes of citrus, green apple, and honeysuckle, it offers an unforgettable tasting experience.' : 
              type === 'rosé' ? 'This exceptional rosé wine from ' + region + ' showcases remarkable complexity and character. With notes of strawberry, watermelon, and rose petal, it offers an unforgettable tasting experience.' : 
              'This exceptional sparkling wine from ' + region + ' showcases remarkable complexity and character. With notes of pear, brioche, and toasted almonds, it offers an unforgettable tasting experience.',
    pairing: type === 'red' ? 'Red meat, aged cheeses, and mushroom dishes' : 
            type === 'white' ? 'Seafood, poultry, and fresh salads' : 
            type === 'rosé' ? 'Mediterranean cuisine, grilled vegetables, and light pasta' : 
            'Oysters, light appetizers, and celebrations',
    storage: 'Best stored at 12-16°C with 70% humidity. Will continue to develop for ' + (type === 'red' ? '5-10' : '2-4') + ' years.'
  });
  
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

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    toast({
      title: "Changes saved",
      description: `${editedWine.name} has been updated.`,
    });
    setIsEditMode(false);
  };
  
  const handleEditField = (field: string, value: string | number) => {
    setEditedWine({
      ...editedWine,
      [field]: value
    });
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleEditField('image', e.target.result as string);
        toast({
          title: "Image uploaded",
          description: "Your image has been successfully uploaded.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Convert 1-10 rating to an array of 10 positions for stars
  const renderRatingStars = (rating: number, editable = false) => {
    return [...Array(10)].map((_, i) => (
      <Star 
        key={i}
        onClick={() => editable && handleEditField('rating', i + 1)}
        className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'} 
          ${editable ? 'cursor-pointer hover:text-wine-light' : ''}`}
      />
    ));
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
            <div className="flex items-center space-x-0.5 flex-wrap">
              {renderRatingStars(rating)}
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
            <DialogTitle className="font-serif text-3xl flex justify-between items-center">
              {isEditMode ? (
                <Input 
                  value={editedWine.name} 
                  onChange={(e) => handleEditField('name', e.target.value)}
                  className="bg-noir border-white/20 text-white text-3xl font-serif"
                />
              ) : (
                <span>{editedWine.name}</span>
              )}
              <Button 
                onClick={() => isEditMode ? handleSaveChanges() : setIsEditMode(true)}
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent border-wine hover:bg-wine/20"
              >
                {isEditMode ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
              </Button>
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {isEditMode ? (
                <div className="flex gap-4 mt-2">
                  <Input 
                    value={editedWine.region} 
                    onChange={(e) => handleEditField('region', e.target.value)}
                    className="bg-noir border-white/20 text-white flex-grow"
                  />
                  <Input 
                    value={editedWine.year} 
                    onChange={(e) => handleEditField('year', parseInt(e.target.value))}
                    className="bg-noir border-white/20 text-white w-24"
                    type="number"
                  />
                </div>
              ) : (
                <span>{editedWine.region}, {editedWine.year}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg overflow-hidden h-[300px]">
              {isEditMode ? (
                <div className="flex flex-col h-full">
                  <label className="text-sm text-white/70 mb-1">Wine Image</label>
                  <div className="relative mb-2">
                    <Input 
                      value={editedWine.image} 
                      onChange={(e) => handleEditField('image', e.target.value)}
                      className="bg-noir border-white/20 text-white pr-12"
                      placeholder="Enter image URL or upload"
                    />
                    <Button 
                      onClick={handleUploadButtonClick}
                      variant="outline" 
                      size="icon"
                      className="absolute right-0 top-0 h-full aspect-square rounded-l-none bg-noir border-white/20 hover:bg-wine/20"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="bg-noir-dark flex-grow rounded-lg overflow-hidden">
                    <img src={editedWine.image} alt={editedWine.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                <img src={editedWine.image} alt={editedWine.name} className="w-full h-full object-cover" />
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Rating (1-10)</h4>
                <div className="flex items-center space-x-0.5 flex-wrap">
                  {renderRatingStars(editedWine.rating, isEditMode)}
                  <span className="ml-2 text-white/70">{editedWine.rating}/10</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Type</h4>
                {isEditMode ? (
                  <select 
                    value={editedWine.type}
                    onChange={(e) => handleEditField('type', e.target.value)}
                    className="bg-noir border border-white/20 rounded-md px-3 py-1 text-white"
                  >
                    <option value="red">Red</option>
                    <option value="white">White</option>
                    <option value="rosé">Rosé</option>
                    <option value="sparkling">Sparkling</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${typeColors[editedWine.type]} ${typeTextColors[editedWine.type]}`}>
                    {editedWine.type}
                  </span>
                )}
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Description</h4>
                {isEditMode ? (
                  <Textarea 
                    value={editedWine.description}
                    onChange={(e) => handleEditField('description', e.target.value)}
                    className="bg-noir border-white/20 text-white h-24"
                  />
                ) : (
                  <p className="text-white/80">{editedWine.description}</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Perfect Pairing</h4>
                {isEditMode ? (
                  <Input 
                    value={editedWine.pairing}
                    onChange={(e) => handleEditField('pairing', e.target.value)}
                    className="bg-noir border-white/20 text-white"
                  />
                ) : (
                  <p className="text-white/80">{editedWine.pairing}</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Storage</h4>
                {isEditMode ? (
                  <Input 
                    value={editedWine.storage}
                    onChange={(e) => handleEditField('storage', e.target.value)}
                    className="bg-noir border-white/20 text-white"
                  />
                ) : (
                  <p className="text-white/80">{editedWine.storage}</p>
                )}
              </div>
            </div>
          </div>
          
          {isEditMode && (
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditMode(false);
                  setEditedWine({ name, region, year, rating, type, image, 
                    description: type === 'red' ? 'This exceptional red wine from ' + region + ' showcases remarkable complexity and character. With notes of dark berries, leather, and oak, it offers an unforgettable tasting experience.' : 
                                type === 'white' ? 'This exceptional white wine from ' + region + ' showcases remarkable complexity and character. With notes of citrus, green apple, and honeysuckle, it offers an unforgettable tasting experience.' : 
                                type === 'rosé' ? 'This exceptional rosé wine from ' + region + ' showcases remarkable complexity and character. With notes of strawberry, watermelon, and rose petal, it offers an unforgettable tasting experience.' : 
                                'This exceptional sparkling wine from ' + region + ' showcases remarkable complexity and character. With notes of pear, brioche, and toasted almonds, it offers an unforgettable tasting experience.',
                    pairing: type === 'red' ? 'Red meat, aged cheeses, and mushroom dishes' : 
                            type === 'white' ? 'Seafood, poultry, and fresh salads' : 
                            type === 'rosé' ? 'Mediterranean cuisine, grilled vegetables, and light pasta' : 
                            'Oysters, light appetizers, and celebrations',
                    storage: 'Best stored at 12-16°C with 70% humidity. Will continue to develop for ' + (type === 'red' ? '5-10' : '2-4') + ' years.'
                  });
                }}
                className="border-white/10 hover:bg-noir hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="bg-wine hover:bg-wine-light"
              >
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WineCard;
