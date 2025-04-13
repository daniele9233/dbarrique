
import { useEffect, useRef } from 'react';

interface ImageRendererProps {
  imageUrl: string;
  scale: number;
  positionX: number;
  positionY: number;
  rotation: number;
  onImageLoad: (img: HTMLImageElement) => void;
}

const ImageRenderer = ({
  imageUrl,
  scale,
  positionX,
  positionY,
  rotation,
  onImageLoad
}: ImageRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load image when URL changes
  useEffect(() => {
    if (!imageUrl) return;
    
    const img = new Image();
    img.onload = () => {
      console.log("Immagine caricata:", img.width, img.height);
      imageRef.current = img;
      onImageLoad(img);
      
      // Render dopo un breve ritardo per assicurarsi che il canvas sia pronto
      setTimeout(() => renderImage(), 50);
    };
    img.src = imageUrl;
  }, [imageUrl, onImageLoad]);

  // Render image to canvas
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

  // Update rendering when transformations change
  useEffect(() => {
    renderImage();
  }, [scale, positionX, positionY, rotation]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-contain cursor-move touch-manipulation"
      style={{
        touchAction: 'none', // Disabilita il comportamento predefinito del touch
        WebkitUserSelect: 'none', // Impedisce la selezione del testo
        userSelect: 'none'
      }}
    />
  );
};

export default ImageRenderer;
