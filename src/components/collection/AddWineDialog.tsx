
import { useWineForm } from '@/hooks/wine-form';
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
import { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineAdded?: (wine: Wine) => void;
}

const AddWineDialog: React.FC<AddWineDialogProps> = ({ isOpen, onOpenChange, onWineAdded }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  
  // Synchronize external and internal open states
  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);
  
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
    resetForm,
    isDisabled
  } = useWineForm({
    onComplete: (wine: Wine) => {
      console.log("AddWineDialog: Wine added successfully:", wine);
      
      if (onWineAdded) {
        onWineAdded(wine);
      }
      
      // Reset the form
      resetForm();
      
      // Close the dialog with a small delay to ensure UI updates
      setTimeout(() => {
        setInternalIsOpen(false);
        onOpenChange(false);
      }, 300);
      
      toast({
        title: "Successo",
        description: "Il nuovo vino è stato aggiunto alla tua collezione.",
      });
    },
    onError: (error: Error) => {
      console.error("AddWineDialog: Error adding wine:", error);
      
      toast({
        title: "Errore",
        description: "Impossibile aggiungere il vino. Riprova più tardi.",
        variant: "destructive"
      });
    }
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("AddWineDialog: Form submitted", newWine);
    handleSubmit();
  };

  const handleCancel = () => {
    console.log("AddWineDialog: Cancel button clicked");
    if (!isSubmitting) {
      resetForm();
      setInternalIsOpen(false);
      onOpenChange(false);
    }
  };
  
  // Handle dialog close attempts
  const handleOpenChange = (open: boolean) => {
    if (isSubmitting && !open) {
      // Prevent closing during submission
      console.log("AddWineDialog: Preventing close during submission");
      return;
    }
    
    // Allow closing
    setInternalIsOpen(open);
    onOpenChange(open);
    
    // Reset form when closing
    if (!open) {
      resetForm();
    }
  };

  return (
    <Dialog 
      open={internalIsOpen} 
      onOpenChange={handleOpenChange}
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
