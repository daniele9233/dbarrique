
import { useEffect } from 'react';

export const useGlobalEvents = (onMouseUp: () => void) => {
  // Ensure we stop dragging even if mouse leaves the element
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      onMouseUp();
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [onMouseUp]);
};
