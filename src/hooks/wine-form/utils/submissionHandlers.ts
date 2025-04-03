
import { Dispatch, SetStateAction } from 'react';
import { WineCreationData, Wine } from '@/data/models/Wine';
import { addWine } from "@/data/services/wine/wineOperations";
import { WineFormCallbacks } from '../types';
import { showSuccessToast, showErrorToast } from './formUtils';

export const setupUITimeout = (
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  callbacks: WineFormCallbacks
): NodeJS.Timeout => {
  return setTimeout(() => {
    console.log("useWineFormActions: UI timeout triggered");
    setIsSubmitting(false);
    showErrorToast("L'operazione sta impiegando troppo tempo. Riprova più tardi.");
    
    if (callbacks.onError) {
      callbacks.onError(new Error("UI timeout"));
    }
  }, 15000);
};

export const performWineSubmission = async (
  wineToAdd: WineCreationData,
  uiTimeoutId: NodeJS.Timeout,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  callbacks: WineFormCallbacks,
  resetFormFn: () => void
): Promise<void> => {
  try {
    console.log("useWineFormActions: Chiamando addWine con", wineToAdd);
    
    const addedWine = await addWine(wineToAdd);
    
    clearTimeout(uiTimeoutId);
    console.log("useWineFormActions: Vino aggiunto con successo", addedWine);
    
    setIsSubmitting(false);
    
    if (addedWine) {
      showSuccessToast(addedWine.name);
      resetFormFn();
      
      if (callbacks.onComplete) {
        callbacks.onComplete(addedWine);
      }
    }
  } catch (error) {
    console.error('Errore durante l\'aggiunta del vino:', error);
    
    clearTimeout(uiTimeoutId);
    setIsSubmitting(false);
    
    // Handle offline wine
    if (error instanceof Error && 'id' in (error as any)) {
      const offlineWine = error as unknown as Wine;
      if (offlineWine.id && offlineWine.id.startsWith('temp_')) {
        console.log("useWineFormActions: Vino aggiunto in modalità offline", offlineWine);
        showSuccessToast(offlineWine.name);
        resetFormFn();
        
        if (callbacks.onComplete) {
          callbacks.onComplete(offlineWine);
        }
        return;
      }
    }
    
    const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
    showErrorToast(`Impossibile aggiungere il vino: ${errorMsg}`);
    
    if (callbacks.onError) {
      callbacks.onError(error instanceof Error ? error : new Error(String(error)));
    }
  }
};
