
import { useState, useRef } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { updateWine } from "@/data/services/wineService";
import { Wine } from '@/data/models/Wine';
import { useWineCardState } from './useWineCardState';
import WineCardImage from './WineCardImage';
import WineCardContent from './WineCardContent';
import WineDialogHeader from './WineDialogHeader';
import WineDetailsContent from './WineDetailsContent';
import WineEditForm from './WineEditForm';

const WineCard = (wine: Wine) => {
  const { 
    id, 
    name, 
    region, 
    winery, 
    year, 
    rating, 
    type, 
    image,
    grape,
    grapes = []
  } = wine;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    isEditMode,
    editedWine,
    isBlend,
    setIsEditMode,
    setIsBlend,
    handleEditField,
    handleGrapeToggle,
    handleSaveChanges,
    handleCancelEdit,
    handleFileUpload
  } = useWineCardState(wine);
  
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
