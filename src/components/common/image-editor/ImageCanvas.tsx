
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
  const [initialScale, setInitialScale] = useState(scale);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  
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
      setInitialScale(scale);
      setInitialMousePos({ x: e.clientX, y: e.clientY });
      e.preventDefault();
      return;
    }
    
    if (e.target === canvasRef.current) {
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
      const direction = resizeCorner.includes('right') || resizeCorner.includes('bottom') ? 1 : -1;
      
      // Adjust scale based on direction and distance moved
      // Scale factor determines how sensitive the resize is
      const scaleFactor = 0.005;
      const newScale = Math.max(0.5, Math.min(3, initialScale + (direction * distance * scaleFactor)));
      
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
    setInitialScale(scale);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
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
            className="absolute w-4 h-4 bg-wine rounded-full top-2 left-2 cursor-nwse-resize transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
            onMouseDown={handleResizeStart('top-left')}
          />
          <div 
            className="absolute w-4 h-4 bg-wine rounded-full top-2 right-2 cursor-nesw-resize transform translate-x-1/2 -translate-y-1/2 border-2 border-white"
            onMouseDown={handleResizeStart('top-right')}
          />
          <div 
            className="absolute w-4 h-4 bg-wine rounded-full bottom-2 left-2 cursor-nesw-resize transform -translate-x-1/2 translate-y-1/2 border-2 border-white"
            onMouseDown={handleResizeStart('bottom-left')}
          />
          <div 
            className="absolute w-4 h-4 bg-wine rounded-full bottom-2 right-2 cursor-nwse-resize transform translate-x-1/2 translate-y-1/2 border-2 border-white"
            onMouseDown={handleResizeStart('bottom-right')}
          />
          
          {/* Resize border */}
          <div className="absolute inset-0 border-2 border-wine pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default ImageCanvas;
