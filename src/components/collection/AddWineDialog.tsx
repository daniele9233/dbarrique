
import { useWineForm } from '@/hooks/useWineForm';
import { Grape, Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import form section components
import BasicInfoSection from './wine-form/BasicInfoSection';
import GrapeSection from './wine-form/GrapeSection';
import YearRatingSection from './wine-form/YearRatingSection';
import CharacteristicsSection from './wine-form/CharacteristicsSection';
import ImageUploadSection from './wine-form/ImageUploadSection';
import DescriptionSection from '@/components/wine-card/wine-edit-form/DescriptionSection';
import { Wine } from '@/data/models/Wine';
import { useEffect } from 'react';

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineAdded?: (wine: Wine) => void;
}

const AddWineDialog: React.FC<AddWineDialogProps> = ({ isOpen, onOpenChange, onWineAdded }) => {
  console.log("AddWineDialog: Rendering with props", { isOpen, hasOnWineAdded: !!onWineAdded });
  
  const {
    newWine,
    isBlend,
    isSubmitting,
    fileInputRef,
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    setIsBlend,
    handleSubmit,
    isDisabled
  } = useWineForm(
    // Callback for when a wine is added successfully
    (wine: Wine) => {
      console.log("AddWineDialog: Wine added successfully, triggering callback:", wine);
      if (onWineAdded) {
        onWineAdded(wine);
      } else {
        console.warn("AddWineDialog: No onWineAdded callback provided");
      }
      onOpenChange(false); // Close the dialog after successful submission
    }
  );

  // Log changes to isSubmitting for debugging
  useEffect(() => {
    console.log("AddWineDialog: isSubmitting changed to:", isSubmitting);
  }, [isSubmitting]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("AddWineDialog: Form submitted", newWine);
    handleSubmit();
  };

  const handleCancel = () => {
    console.log("AddWineDialog: Cancel button clicked");
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        console.log("AddWineDialog: Dialog onOpenChange triggered", { open, isSubmitting });
        // Prevent dialog closure during submission
        if (isSubmitting && !open) {
          console.log("AddWineDialog: Preventing dialog close during submission");
          return;
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="bg-noir-light border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Grape className="h-6 w-6 text-wine" />
            <span>Aggiungi Nuovo Vino</span>
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Inserisci i dettagli del vino che desideri aggiungere alla tua collezione. Solo il nome del vino è obbligatorio.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
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
          
          <DescriptionSection 
            description={newWine.description || ''}
            onChange={(value) => handleChange('description', value)}
            placeholder="Descrivi le caratteristiche del vino..."
          />
          
          <ImageUploadSection 
            wineData={newWine} 
            fileInputRef={fileInputRef} 
            handleChange={handleChange} 
            handleFileUpload={handleFileUpload} 
          />
          
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-white/10 hover:bg-noir hover:text-white"
              type="button"
              disabled={isSubmitting}
            >
              Annulla
            </Button>
            <Button
              className="bg-wine hover:bg-wine-light text-white"
              disabled={isDisabled || isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Aggiunta in corso...
                </span>
              ) : (
                "Aggiungi alla Collezione"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWineDialog;
