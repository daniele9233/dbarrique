
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
    setInitialDistance(distance);
    setInitialScale(scale);
    setResizing(true);
    console.log(`Pinch zoom iniziato, distanza iniziale: ${distance.toFixed(2)}`);
    return true;
  };

  const handleMouseResize = (
    clientX: number, 
    clientY: number, 
    element: HTMLElement
  ) => {
    if (!resizing || !onScaleChange) return false;
    
    // Utilizziamo la distanza dal centro per determinare lo scale
    const rect = element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcoliamo la distanza dal centro
    const distanceX = clientX - rect.left - centerX;
    const distanceY = clientY - rect.top - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Usiamo la distanza per calcolare il nuovo scale
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    const scaleRatio = Math.max(0.2, Math.min(distance / maxDistance, 1.5));
    const newScale = Math.max(0.5, Math.min(3, initialScale * scaleRatio));
    
    console.log(`Ridimensionamento: distance=${distance.toFixed(2)}, scale=${newScale.toFixed(2)}`);
    onScaleChange(newScale);
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

  const endResize = () => {
    const wasResizing = resizing;
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
    endResize,
    resetDistance
  };
};
