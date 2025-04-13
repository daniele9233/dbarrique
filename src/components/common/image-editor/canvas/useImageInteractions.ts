
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
  const [resizeStartPoint, setResizeStartPoint] = useState({ x: 0, y: 0 });
  const [initialScale, setInitialScale] = useState(scale);
  const lastTapRef = useRef<number>(0);
  const dragTimeoutRef = useRef<number | null>(null);

  // Center the image with double tap/click
  const centerImage = () => {
    console.log('Centrando l\'immagine');
    if (onPositionChange) {
      onPositionChange(0, 0);
    }
  };

  // Check if this is a double tap for centering
  const checkDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      centerImage();
      return true;
    }
    lastTapRef.current = now;
    return false;
  };

  // Handle resizing with a simpler approach
  const handleResize = (newScale: number) => {
    console.log(`Applicando nuovo zoom: ${newScale}`);
    if (onScaleChange) {
      onScaleChange(Math.max(0.5, Math.min(3, newScale)));
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    // Handle resize controls
    if (target.classList.contains('resize-control')) {
      e.preventDefault();
      e.stopPropagation();
      
      const direction = target.dataset.direction;
      console.log(`Iniziato ridimensionamento direzione: ${direction}`);
      
      setResizing(true);
      setInitialScale(scale);
      setResizeStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }
    
    // Check for double-click to center
    if (checkDoubleTap()) {
      e.preventDefault();
      return;
    }
    
    // Start dragging (if not clicking on a button or other control)
    if (target.tagName.toLowerCase() !== 'button' && 
        !target.closest('button') && 
        !target.classList.contains('resize-control')) {
      console.log('Iniziato spostamento immagine');
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
      console.log(`Spostamento: x=${newX}, y=${newY}`);
      onPositionChange(newX, newY);
    }
    
    if (resizing && onScaleChange) {
      const deltaY = resizeStartPoint.y - e.clientY;
      // Usa deltaY per un controllo più intuitivo: su = zoom in, giù = zoom out
      const scaleFactor = 0.01;
      const newScale = initialScale + (deltaY * scaleFactor);
      handleResize(newScale);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
  };

  // Touch event handlers (improved)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    
    if (!target) return;
    
    // Previeni lo scrolling della pagina durante le interazioni con l'editor
    e.preventDefault();
    
    // Handle resize controls
    if (target.classList.contains('resize-control')) {
      const direction = target.dataset.direction;
      console.log(`Iniziato ridimensionamento touch direzione: ${direction}`);
      
      setResizing(true);
      setInitialScale(scale);
      setResizeStartPoint({ x: touch.clientX, y: touch.clientY });
      return;
    }
    
    // Check for double-tap to center
    if (checkDoubleTap()) return;
    
    // Start dragging
    console.log('Iniziato spostamento immagine con touch');
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - positionX,
      y: touch.clientY - positionY
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    
    // Previeni lo scrolling della pagina durante le interazioni
    e.preventDefault();
    
    const touch = e.touches[0];
    
    if (isDragging && onPositionChange) {
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      console.log(`Spostamento touch: x=${newX}, y=${newY}`);
      onPositionChange(newX, newY);
    }
    
    if (resizing && onScaleChange) {
      const deltaY = resizeStartPoint.y - touch.clientY;
      // Usa deltaY per un controllo più intuitivo: su = zoom in, giù = zoom out
      const scaleFactor = 0.01;
      const newScale = initialScale + (deltaY * scaleFactor);
      handleResize(newScale);
    }
  };

  const handleTouchEnd = () => {
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
      dragTimeoutRef.current = null;
    }
    setIsDragging(false);
    setResizing(false);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    centerImage,
  };
};
