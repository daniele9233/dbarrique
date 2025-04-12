import { useState, useRef, RefObject } from 'react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<string | null>(null);
  const [initialScale, setInitialScale] = useState(scale);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if we clicked on one of the resize handles
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      const corner = target.dataset.corner;
      if (corner) {
        setResizeCorner(corner);
        setResizing(true);
        setInitialScale(scale);
        setInitialMousePos({ x: e.clientX, y: e.clientY });
      }
      e.preventDefault();
      return;
    }
    
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'canvas') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - positionX,
        y: e.clientY - positionY
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && onPositionChange) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onPositionChange(newX, newY);
    }
    
    if (resizing && resizeCorner && onScaleChange) {
      // Calculate how much the mouse has moved from the initial position
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;
      
      // Calculate distance moved (use the larger of deltaX or deltaY)
      const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      
      // Determine direction based on which corner is being dragged
      let direction = 1; // Default to scaling up
      
      if (resizeCorner.includes('top') || resizeCorner.includes('left')) {
        // If dragging from top or left corners, invert direction
        // Further from starting point = smaller
        direction = -1;  
      } else {
        // If dragging from bottom or right corners
        // Further from starting point = larger
        direction = 1;
      }
      
      // Adjust scale based on direction and distance moved
      // Reduce the scale factor for more precise control
      const scaleFactor = 0.003;
      let newScale = initialScale + (direction * distance * scaleFactor);
      
      // Ensure scale stays within reasonable bounds
      newScale = Math.max(0.5, Math.min(3, newScale));
      
      console.log(`Resizing: corner=${resizeCorner}, distance=${distance}, direction=${direction}, newScale=${newScale}`);
      
      onScaleChange(newScale);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      // Check if we're touching a resize handle
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element?.classList.contains('resize-handle')) {
        const corner = element.getAttribute('data-corner');
        if (corner) {
          setResizeCorner(corner);
          setResizing(true);
          setInitialScale(scale);
          setInitialMousePos({ x: touch.clientX, y: touch.clientY });
        }
        e.preventDefault();
        return;
      }
      
      // Otherwise assume we're dragging the canvas
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - positionX,
        y: touch.clientY - positionY
      });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      if (isDragging && onPositionChange) {
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        onPositionChange(newX, newY);
      }
      
      if (resizing && resizeCorner && onScaleChange) {
        // Calculate how much the touch has moved from initial position
        const deltaX = touch.clientX - initialMousePos.x;
        const deltaY = touch.clientY - initialMousePos.y;
        
        // Calculate distance moved
        const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        
        // Determine direction based on which corner is being dragged
        let direction = 1;
        
        if (resizeCorner.includes('top') || resizeCorner.includes('left')) {
          direction = -1;
        } else {
          direction = 1;
        }
        
        // Adjust scale based on direction and distance moved
        const scaleFactor = 0.003;
        let newScale = initialScale + (direction * distance * scaleFactor);
        
        // Ensure scale stays within reasonable bounds
        newScale = Math.max(0.5, Math.min(3, newScale));
        
        onScaleChange(newScale);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
