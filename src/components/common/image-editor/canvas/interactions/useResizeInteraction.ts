
import { useState } from 'react';
import { isResizeControl } from '../utils/imageInteractionUtils';

interface UseResizeInteractionProps {
  onScaleChange?: (scale: number) => void;
  scale: number;
}

export const useResizeInteraction = ({
  onScaleChange,
  scale
}: UseResizeInteractionProps) => {
  const [resizing, setResizing] = useState(false);
  const [initialScale, setInitialScale] = useState(scale);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialPointerPosition, setInitialPointerPosition] = useState({ x: 0, y: 0 });

  const startResize = (target: HTMLElement | null) => {
    if (isResizeControl(target)) {
      console.log('Iniziato il ridimensionamento con il mouse');
      setResizing(true);
      setInitialScale(scale);
      return true;
    }
    return false;
  };

  const startPinchResize = (distance: number) => {
    console.log(`Pinch zoom iniziato, distanza iniziale: ${distance.toFixed(2)}`);
    setInitialDistance(distance);
    setInitialScale(scale);
    setResizing(true);
    return true;
  };

  const handleMouseResize = (
    clientX: number, 
    clientY: number, 
    element: HTMLElement
  ) => {
    if (!resizing || !onScaleChange) return false;
    
    // Get element dimensions and position
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center to pointer
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Fattore di scala più semplice e diretto
    const scaleFactor = Math.max(0.5, Math.min(3, distance / 100));
    
    console.log(`Ridimensionamento: distance=${distance.toFixed(2)}, scaleFactor=${scaleFactor.toFixed(2)}`);
    
    // Applica la scala considerando la scala iniziale
    const newScale = initialScale * scaleFactor;
    
    // Limita la scala tra 0.5 e 3
    const clampedScale = Math.max(0.5, Math.min(3, newScale));
    
    console.log(`Nuova scala: ${clampedScale.toFixed(2)}`);
    onScaleChange(clampedScale);
    return true;
  };

  const handlePinchResize = (distance: number) => {
    if (!resizing || !onScaleChange || initialDistance <= 0) return false;
    
    const scaleFactor = distance / initialDistance;
    const newScale = Math.max(0.5, Math.min(3, initialScale * scaleFactor));
    
    console.log(`Pinch zoom: factor=${scaleFactor.toFixed(2)}, scale=${newScale.toFixed(2)}`);
    onScaleChange(newScale);
    return true;
  };
  
  // Funzioni specifiche per lo zoom in/out tramite pulsanti
  const zoomIn = () => {
    if (!onScaleChange) return;
    const newScale = Math.min(scale + 0.2, 3);
    console.log(`Zoom in: ${newScale.toFixed(2)}`);
    onScaleChange(newScale);
  };
  
  const zoomOut = () => {
    if (!onScaleChange) return;
    const newScale = Math.max(scale - 0.2, 0.5);
    console.log(`Zoom out: ${newScale.toFixed(2)}`);
    onScaleChange(newScale);
  };

  const endResize = () => {
    const wasResizing = resizing;
    if (wasResizing) {
      console.log('Ridimensionamento terminato');
    }
    setResizing(false);
    return wasResizing;
  };

  const resetDistance = () => {
    setInitialDistance(0);
  };

  return {
    resizing,
    startResize,
    startPinchResize,
    handleMouseResize,
    handlePinchResize,
    zoomIn,
    zoomOut,
    endResize,
    resetDistance
  };
};
