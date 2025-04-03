
import { Dispatch, SetStateAction } from 'react';
import { WineCreationData, Wine } from '@/data/models/Wine';
import { addWine } from "@/data/services/wine/wineOperations";
import { WineFormCallbacks } from '../types';
import { showSuccessToast, showErrorToast } from './formUtils';

// Ridotto il timeout UI da 15 secondi a 8 secondi per dare un feedback più rapido
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
  }, 8000); // Ridotto da 15000 a 8000 ms
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
    
    // Ottimizzato con Promise.race per evitare blocchi
    const addWinePromise = addWine(wineToAdd);
    
    // Utilizziamo Promise.race per evitare attese troppo lunghe
    const addedWine = await Promise.race([
      addWinePromise,
      // Aggiungiamo un timeout di 6 secondi anche qui come fallback
      new Promise<Wine>((_, reject) => 
        setTimeout(() => reject(new Error("Timeout locale durante l'aggiunta del vino")), 6000)
      )
    ]);
    
    // Puliamo il timeout UI poiché l'operazione è completata
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
    
    // Se riceviamo un timeout locale, proviamo a utilizzare la modalità offline
    if (error instanceof Error && error.message.includes('Timeout locale')) {
      console.log("useWineFormActions: Timeout locale durante l'aggiunta del vino, tentiamo comunque di completare l'operazione");
      
      try {
        // Tentiamo di registrare comunque il vino (questa operazione avverrà dietro le quinte)
        addWine(wineToAdd).then(wine => {
          console.log("useWineFormActions: Vino aggiunto con successo dopo il timeout locale:", wine);
        }).catch(err => {
          console.error("useWineFormActions: Impossibile aggiungere il vino dopo il timeout:", err);
        });
        
        // Nel frattempo, mostriamo all'utente un messaggio di successo
        const tempWine = { ...wineToAdd, id: 'temp_' + Date.now() } as Wine;
        showSuccessToast(tempWine.name);
        resetFormFn();
        
        if (callbacks.onComplete) {
          callbacks.onComplete(tempWine);
        }
        return;
      } catch (offlineError) {
        console.error("useWineFormActions: Errore durante il fallback offline:", offlineError);
      }
    }
    
    const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
    showErrorToast(`Impossibile aggiungere il vino: ${errorMsg}`);
    
    if (callbacks.onError) {
      callbacks.onError(error instanceof Error ? error : new Error(String(error)));
    }
  }
};
