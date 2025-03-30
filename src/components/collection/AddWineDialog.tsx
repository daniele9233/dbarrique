
import { useWineForm } from '@/hooks/useWineForm';
import { Grape } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import form section components
import BasicInfoSection from './wine-form/BasicInfoSection';
import GrapeSection from './wine-form/GrapeSection';
import YearRatingSection from './wine-form/YearRatingSection';
import CharacteristicsSection from './wine-form/CharacteristicsSection';
import ImageUploadSection from './wine-form/ImageUploadSection';

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineAdded?: (wine: any) => void;
}

const AddWineDialog: React.FC<AddWineDialogProps> = ({ isOpen, onOpenChange, onWineAdded }) => {
  const {
    newWine,
    isBlend,
    fileInputRef,
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    setIsBlend,
    handleSubmit,
    isDisabled
  } = useWineForm(
    // On wine added callback
    (wine) => {
      console.log("AddWineDialog: onComplete callback triggered with wine:", wine);
      if (onWineAdded) {
        console.log("AddWineDialog: Calling parent onWineAdded callback");
        onWineAdded(wine);
      }
    },
    // On close callback
    () => {
      console.log("AddWineDialog: onClose callback triggered");
      onOpenChange(false);
    }
  );

  // Log for debugging
  console.log("AddWineDialog: Wine form state:", { 
    newWine, 
    isDisabled, 
    hasOnWineAdded: !!onWineAdded 
  });

  const onSubmitClick = () => {
    console.log("AddWineDialog: Submit button clicked");
    handleSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-noir-light border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Grape className="h-6 w-6 text-wine" />
            <span>Aggiungi Nuovo Vino</span>
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Inserisci i dettagli del vino che desideri aggiungere alla tua collezione. Solo il nome del vino è obbligatorio.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <BasicInfoSection wineData={newWine} handleChange={handleChange} />
          
          <GrapeSection 
            wineData={newWine} 
            isBlend={isBlend} 
            setIsBlend={setIsBlend} 
            handleChange={handleChange} 
            handleGrapeToggle={handleGrapeToggle} 
          />
          
          <YearRatingSection wineData={newWine} handleChange={handleChange} />
          
          <CharacteristicsSection wineData={newWine} handleChange={handleChange} />
          
          <ImageUploadSection 
            wineData={newWine} 
            fileInputRef={fileInputRef} 
            handleChange={handleChange} 
            handleFileUpload={handleFileUpload} 
          />
        </div>
        
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/10 hover:bg-noir hover:text-white"
          >
            Annulla
          </Button>
          <Button
            onClick={onSubmitClick}
            className="bg-wine hover:bg-wine-light"
            disabled={isDisabled}
            type="button"
          >
            Aggiungi alla Collezione
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWineDialog;
