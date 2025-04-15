
import { useRef } from 'react';

interface UseDoubleTapInteractionProps {
  centerImage: () => void;
}

export const useDoubleTapInteraction = ({ centerImage }: UseDoubleTapInteractionProps) => {
  const lastTapRef = useRef<number>(0);
  
  const checkDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      console.log('Doppio tap rilevato, centrando immagine');
      centerImage();
      // Reset the timer to prevent triple-tap issues
      lastTapRef.current = 0;
      return true;
    }
    
    lastTapRef.current = now;
    return false;
  };

  return {
    checkDoubleTap
  };
};
