
import { useState, useCallback } from 'react';
import { isButton, isResizeControl } from '../utils/imageInteractionUtils';

interface UseDragInteractionProps {
  onPositionChange?: (x: number, y: number) => void;
  positionX: number;
  positionY: number;
  checkDoubleTap: () => boolean;
}

export const useDragInteraction = ({
  onPositionChange,
  positionX,
  positionY,
  checkDoubleTap
}: UseDragInteractionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const startDrag = useCallback((clientX: number, clientY: number, target: HTMLElement | null) => {
    // Verifica se dovremmo iniziare il trascinamento
    if (isResizeControl(target) || isButton(target)) {
      return false;
    }
    
    // Verifica per doppio tap (questo previene l'inizio del trascinamento se è doppio tap)
    if (checkDoubleTap()) {
      return false;
    }
    
    console.log('Iniziato spostamento immagine', {clientX, clientY, positionX, positionY});
    setIsDragging(true);
    setDragStart({
      x: clientX - positionX,
      y: clientY - positionY
    });
    return true;
  }, [checkDoubleTap, positionX, positionY]);

  const handleDrag = useCallback((clientX: number, clientY: number) => {
    if (isDragging && onPositionChange) {
      const newX = clientX - dragStart.x;
      const newY = clientY - dragStart.y;
      console.log(`Spostamento: x=${newX}, y=${newY}`);
      onPositionChange(newX, newY);
      return true;
    }
    
    return isDragging;
  }, [isDragging, onPositionChange, dragStart]);

  const endDrag = useCallback(() => {
    const wasDragging = isDragging;
    if (wasDragging) {
      console.log('Trascinamento terminato');
    }
    setIsDragging(false);
    return wasDragging;
  }, [isDragging]);

  return {
    isDragging,
    startDrag,
    handleDrag,
    endDrag
  };
};
