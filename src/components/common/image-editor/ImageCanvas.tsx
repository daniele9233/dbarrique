
import { useEffect, useRef, useState } from 'react';

interface ImageCanvasProps {
  imageUrl: string;
  scale: number;
  positionX: number;
  positionY: number;
  rotation: number;
  aspectRatio: number;
  onImageLoad: (img: HTMLImageElement) => void;
  onPositionChange?: (x: number, y: number) => void;
  onScaleChange?: (scale: number) => void;
}

const ImageCanvas = ({
  imageUrl,
  scale,
  positionX,
  positionY,
  rotation,
  aspectRatio,
  onImageLoad,
  onPositionChange,
  onScaleChange
}: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  // Update container size based on parent element and window resize
  useEffect(() => {
    if (!imageUrl) return;
    
    const img = new Image();
    img.onload = () => {
      console.log("Image loaded:", img.width, img.height);
      imageRef.current = img;
      onImageLoad(img);
      
      // Render after a short delay to ensure canvas is ready
      setTimeout(() => renderImage(), 50);
    };
    img.src = imageUrl;
  }, [imageUrl, onImageLoad]);

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
        renderImage();
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
  }, [aspectRatio]);
  
  // Effect to re-render image when transformations change
  useEffect(() => {
    renderImage();
  }, [scale, positionX, positionY, rotation]);
  
  // Render image to canvas with current transformations
  const renderImage = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!canvas || !img) {
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    // Apply rotation (in radians)
    ctx.rotate((rotation * Math.PI) / 180);
    
    // Apply scale
    ctx.scale(scale, scale);
    
    // Apply position (adjusted for scale)
    ctx.translate(positionX / scale, positionY / scale);
    
    // Draw image centered
    ctx.drawImage(
      img,
      -img.width / 2,
      -img.height / 2,
      img.width,
      img.height
    );
    
    // Restore context state
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (resizeCorner) {
      setResizing(true);
      return;
    }
    
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - positionX,
        y: e.clientY - positionY
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      if (onPositionChange) {
        onPositionChange(newX, newY);
      }
    }
    
    if (resizing && resizeCorner && onScaleChange) {
      // Calculate new scale based on resize direction
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center to cursor
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      // Use distance to determine scale (normalized by container size)
      const referenceSize = Math.min(rect.width, rect.height) / 2;
      const newScale = Math.max(0.5, Math.min(3, distance / referenceSize));
      
      onScaleChange(newScale);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };
  
  const handleResizeStart = (corner: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizeCorner(corner);
    setResizing(true);
  };

  // Ensure we stop dragging even if mouse leaves the element
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setResizing(false);
      setResizeCorner(null);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-noir-dark rounded-lg overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain cursor-move"
      />
      
      {imageUrl && (
        <>
          {/* Resize handles */}
          <div 
            className="absolute w-3 h-3 bg-blue-400 rounded-full top-2 left-2 cursor-nwse-resize transform -translate-x-1/2 -translate-y-1/2"
            onMouseDown={handleResizeStart('top-left')}
          />
          <div 
            className="absolute w-3 h-3 bg-blue-400 rounded-full top-2 right-2 cursor-nesw-resize transform translate-x-1/2 -translate-y-1/2"
            onMouseDown={handleResizeStart('top-right')}
          />
          <div 
            className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-2 left-2 cursor-nesw-resize transform -translate-x-1/2 translate-y-1/2"
            onMouseDown={handleResizeStart('bottom-left')}
          />
          <div 
            className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-2 right-2 cursor-nwse-resize transform translate-x-1/2 translate-y-1/2"
            onMouseDown={handleResizeStart('bottom-right')}
          />
          
          {/* Resize border */}
          <div className="absolute inset-0 border-2 border-blue-400 pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default ImageCanvas;
