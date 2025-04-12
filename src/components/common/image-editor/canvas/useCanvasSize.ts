
import { useEffect, useState, RefObject } from 'react';

interface UseCanvasSizeProps {
  containerRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  aspectRatio: number;
  onSizeChange?: () => void;
}

export const useCanvasSize = ({ 
  containerRef, 
  canvasRef, 
  aspectRatio,
  onSizeChange 
}: UseCanvasSizeProps) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current && containerRef.current) {
        const parent = containerRef.current;
        const width = parent.clientWidth;
        const height = width / aspectRatio;
        
        console.log("Canvas size updated:", width, height);
        
        // Set canvas dimensions
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        setContainerSize({ width, height });
        
        // Notify that the size has changed
        if (onSizeChange) {
          onSizeChange();
        }
      }
    };

    // Initial setup
    updateCanvasSize();
    
    // Add resize listener
    window.addEventListener('resize', updateCanvasSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [aspectRatio, canvasRef, containerRef, onSizeChange]);

  return containerSize;
};
