
import { useEffect, useRef } from 'react';

interface ImageCanvasProps {
  imageUrl: string;
  scale: number;
  positionX: number;
  positionY: number;
  rotation: number;
  aspectRatio: number;
  onImageLoad: (img: HTMLImageElement) => void;
}

const ImageCanvas = ({
  imageUrl,
  scale,
  positionX,
  positionY,
  rotation,
  aspectRatio,
  onImageLoad
}: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
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
    
    console.log("Image rendered with:", { scale, positionX, positionY, rotation });
  };

  return (
    <div 
      ref={containerRef}
      className="bg-noir-dark rounded-lg overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ImageCanvas;
