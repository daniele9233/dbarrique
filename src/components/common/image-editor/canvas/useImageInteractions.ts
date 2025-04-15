
import { useState } from 'react';
import { useDragInteraction } from './interactions/useDragInteraction';
import { useResizeInteraction } from './interactions/useResizeInteraction';
import { useDoubleTapInteraction } from './interactions/useDoubleTapInteraction';
import { getDistance, TouchPoint } from './utils/imageInteractionUtils';

interface UseImageInteractionsProps {
  onPositionChange?: (x: number, y: number) => void;
  onScaleChange?: (scale: number) => void;
  scale: number;
  positionX: number;
  positionY: number;
}

export const useImageInteractions = ({
  onPositionChange,
  onScaleChange,
  scale,
  positionX,
  positionY
}: UseImageInteractionsProps) => {
  // Funzione per centrare l'immagine
  const centerImage = () => {
    console.log('Centrando l\'immagine');
    if (onPositionChange) {
      onPositionChange(0, 0);
    }
    if (onScaleChange) {
      onScaleChange(1);
    }
  };
  
  // Initialize the double tap interaction hook
  const { checkDoubleTap } = useDoubleTapInteraction({ centerImage });
  
  // Initialize the drag interaction hook
  const { startDrag, handleDrag, endDrag } = useDragInteraction({
    onPositionChange,
    positionX,
    positionY,
    checkDoubleTap
  });
  
  // Initialize the resize interaction hook
  const { 
    startResize, 
    startPinchResize, 
    handleMouseResize, 
    handlePinchResize,
    zoomIn,
    zoomOut,
    endResize,
    resetDistance
  } = useResizeInteraction({ onScaleChange, scale });

  // Gestori di eventi mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default del browser
    e.preventDefault();
    
    const target = e.target as HTMLElement;
    
    console.log('Mouse down su:', target.tagName, target.className);
    
    // Try to start resize
    if (startResize(target)) {
      return;
    }
    
    // Try to start drag
    startDrag(e.clientX, e.clientY, target);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default
    e.preventDefault();
    
    // Try drag first
    if (handleDrag(e.clientX, e.clientY)) {
      return;
    }
    
    // Otherwise try resize
    handleMouseResize(e.clientX, e.clientY, e.currentTarget as HTMLElement);
  };

  const handleMouseUp = () => {
    endDrag();
    endResize();
  };

  // Gestori di eventi touch
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default come lo zoom del browser
    e.preventDefault();
    
    console.log('Touch start, tocchi:', e.touches.length);
    
    // Gestisci il pinch zoom
    if (e.touches.length === 2) {
      const touch1: TouchPoint = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      };
      
      const touch2: TouchPoint = {
        clientX: e.touches[1].clientX,
        clientY: e.touches[1].clientY
      };
      
      const distance = getDistance(touch1, touch2);
      startPinchResize(distance);
      return;
    }
    
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    
    if (!target) return;
    
    console.log('Touch start su:', target.tagName, target.className);
    
    // Try to start resize
    if (startResize(target)) {
      return;
    }
    
    // Try to start drag
    startDrag(touch.clientX, touch.clientY, target);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default
    e.preventDefault();
    
    // Gestisci il pinch zoom
    if (e.touches.length === 2) {
      const touch1: TouchPoint = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      };
      
      const touch2: TouchPoint = {
        clientX: e.touches[1].clientX,
        clientY: e.touches[1].clientY
      };
      
      const currentDistance = getDistance(touch1, touch2);
      handlePinchResize(currentDistance);
      return;
    }
    
    const touch = e.touches[0];
    
    // Try drag first
    if (handleDrag(touch.clientX, touch.clientY)) {
      return;
    }
    
    // Try resize for single touch
    if (e.touches.length === 1) {
      handleMouseResize(
        touch.clientX, 
        touch.clientY, 
        e.currentTarget as HTMLElement
      );
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('Touch end, tocchi rimanenti:', e.touches.length);
    
    if (e.touches.length < 2) {
      resetDistance();
    }
    
    if (e.touches.length === 0) {
      endDrag();
      endResize();
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    centerImage,
    zoomIn,
    zoomOut,
  };
};
