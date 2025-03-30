
import { useState, useRef, ChangeEvent } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { updateWine } from "@/data/services/wineService";
import { Wine } from '@/data/models/Wine';
import WineCardImage from './wine-card/WineCardImage';
import WineCardContent from './wine-card/WineCardContent';
import WineDialogHeader from './wine-card/WineDialogHeader';
import WineDetailsContent from './wine-card/WineDetailsContent';
import WineEditForm from './wine-card/WineEditForm';

const WineCard = ({ 
  id,
  name, 
  region, 
  winery = "", 
  year, 
  rating, 
  type, 
  image,
  grape,
  grapes = [],
  body,
  structure,
  tannins,
  sweetness,
  aroma
}: Wine) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBlend, setIsBlend] = useState(grape === "Blend");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editedWine, setEditedWine] = useState({
    name, 
    region, 
    winery,
    year, 
    rating, 
    type, 
    image,
    grape,
    grapes: grapes || (grape !== "Blend" ? [grape] : []),
    body,
    structure,
    tannins,
    sweetness,
    aroma,
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
  
  const handleSaveChanges = async () => {
    try {
      const grapeValue = isBlend ? "Blend" : editedWine.grape;
      const grapesArray = isBlend ? editedWine.grapes : editedWine.grape ? [editedWine.grape] : [];
      
      await updateWine(id, {
        name: editedWine.name,
        region: editedWine.region,
        winery: editedWine.winery,
        year: editedWine.year,
        rating: editedWine.rating,
        type: editedWine.type,
        image: editedWine.image,
        grape: grapeValue,
        grapes: grapesArray,
        body: editedWine.body,
        structure: editedWine.structure,
        tannins: editedWine.tannins,
        sweetness: editedWine.sweetness,
        aroma: editedWine.aroma
      });
      
      toast({
        title: "Modifiche salvate",
        description: `${editedWine.name} è stato aggiornato.`,
      });
      
      setIsEditMode(false);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del vino:', error);
      toast({
        title: "Errore",
        description: "Impossibile salvare le modifiche. Riprova più tardi.",
        variant: "destructive"
      });
    }
  };
  
  const handleEditField = (field: string, value: string | number | string[]) => {
    setEditedWine({
      ...editedWine,
      [field]: value
    });
  };
  
  const handleGrapeToggle = (grape: string) => {
    const updatedGrapes = editedWine.grapes.includes(grape)
      ? editedWine.grapes.filter(g => g !== grape)
      : [...editedWine.grapes, grape];
    
    handleEditField('grapes', updatedGrapes);
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleEditField('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedWine({ 
      name, 
      region, 
      winery, 
      year, 
      rating, 
      type, 
      image,
      grape,
      grapes: grapes || (grape !== "Blend" ? [grape] : []),
      body,
      structure,
      tannins,
      sweetness,
      aroma,
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
    setIsBlend(grape === "Blend");
  };
  
  return (
    <>
      <div 
        className="group relative rounded-lg overflow-hidden transition-all duration-500 h-[400px] wine-glass cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        <WineCardImage 
          image={image} 
          name={name} 
          type={type} 
          isHovered={isHovered} 
        />
        
        <WineCardContent 
          name={name} 
          region={region} 
          year={year} 
          rating={rating} 
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <WineDialogHeader 
            name={editedWine.name}
            region={editedWine.region}
            year={editedWine.year}
            isEditMode={isEditMode}
            onEdit={() => setIsEditMode(true)}
            onSave={handleSaveChanges}
            handleEditField={handleEditField}
          />
          
          {isEditMode ? (
            <WineEditForm 
              editedWine={editedWine}
              isBlend={isBlend}
              fileInputRef={fileInputRef}
              handleEditField={handleEditField}
              handleGrapeToggle={handleGrapeToggle}
              handleFileUpload={handleFileUpload}
              setIsBlend={setIsBlend}
              onCancel={handleCancelEdit}
              onSave={handleSaveChanges}
            />
          ) : (
            <WineDetailsContent 
              wine={editedWine}
              isEditMode={isEditMode}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WineCard;
