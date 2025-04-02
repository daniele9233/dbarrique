
import { useWineForm } from '@/hooks/useWineForm';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Wine } from '@/data/models/Wine';
import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from "@/hooks/use-toast";
import WineForm from './wine-form/WineForm';
import WineFormDialogHeader from './wine-form/WineFormDialogHeader';

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineAdded?: (wine: Wine) => void;
}

const AddWineDialog: React.FC<AddWineDialogProps> = ({ isOpen, onOpenChange, onWineAdded }) => {
  // Create a ref to store original isOpen state to avoid re-renders
  const dialogOpenRef = useRef(isOpen);
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  
  // Synchronize external and internal open states
  useEffect(() => {
    if (isOpen !== dialogOpenRef.current) {
      dialogOpenRef.current = isOpen;
      setInternalIsOpen(isOpen);
    }
  }, [isOpen]);
  
  const handleWineComplete = useCallback((wine: Wine) => {
    console.log("AddWineDialog: Wine added successfully:", wine);
    
    // Prevent any state issues by ensuring state updates are triggered properly
    setInternalIsOpen(false);
    
    // Notify parent of success
    if (onWineAdded) {
      onWineAdded(wine);
    }
    
    // Close the dialog immediately
    onOpenChange(false);
    
    // Show success toast
    toast({
      title: "Successo",
      description: "Il nuovo vino è stato aggiunto alla tua collezione.",
    });
  }, [onWineAdded, onOpenChange]);
  
  const handleWineError = useCallback((error: Error) => {
    console.error("AddWineDialog: Error adding wine:", error);
    
    // Make sure dialog stays open on error
    setInternalIsOpen(true);
    
    // Show error toast
    toast({
      title: "Errore",
      description: "Impossibile aggiungere il vino. Riprova più tardi.",
      variant: "destructive"
    });
  }, []);
  
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
    onComplete: handleWineComplete,
    onError: handleWineError
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
    } else {
      toast({
        title: "In attesa",
        description: "Attendi il completamento dell'operazione...",
      });
    }
  };
  
  // Handle dialog close attempts
  const handleOpenChange = (open: boolean) => {
    if (isSubmitting && !open) {
      // Prevent closing during submission
      console.log("AddWineDialog: Preventing close during submission");
      toast({
        title: "In attesa",
        description: "Attendi il completamento dell'operazione...",
      });
      return;
    }
    
    // Only reset form when dialog is actually closing
    if (!open && internalIsOpen) {
      resetForm();
    }
    
    // Update open state
    setInternalIsOpen(open);
    onOpenChange(open);
  };

  return (
    <Dialog 
      open={internalIsOpen} 
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="bg-noir-light border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <WineFormDialogHeader />
        
        <WineForm
          wineData={newWine}
          isBlend={isBlend}
          isSubmitting={isSubmitting}
          isDisabled={isDisabled}
          fileInputRef={fileInputRef}
          setIsBlend={setIsBlend}
          handleChange={handleChange}
          handleGrapeToggle={handleGrapeToggle}
          handleFileUpload={handleFileUpload}
          handleSubmit={handleFormSubmit}
          handleCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddWineDialog;
