
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
  console.log("AddWineDialog: Rendering with props", { isOpen, hasOnWineAdded: !!onWineAdded });
  
  // Utilizziamo useWineForm passando direttamente le callback
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
    // Passiamo la callback onWineAdded
    onWineAdded,
    // Forniamo la callback onClose per chiudere il dialog
    () => {
      console.log("AddWineDialog: Close callback triggered");
      onOpenChange(false);
    }
  );

  // Debug log
  console.log("AddWineDialog: Wine form state:", { 
    newWine, 
    isDisabled, 
    isSubmitting,
    hasOnWineAdded: !!onWineAdded 
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("AddWineDialog: Form submitted");
    handleSubmit();
  };

  // Funzione per gestire l'annullamento
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
        // Impedisce la chiusura del dialog durante l'invio
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
              className="bg-wine hover:bg-wine-light"
              disabled={isDisabled}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">⏳</span>
                  Aggiunta in corso...
                </>
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
