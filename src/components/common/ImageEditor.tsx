
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut, Upload, RotateCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

interface ImageEditorProps {
  imageUrl: string;
  onImageChange: (imageDataUrl: string) => void;
  aspectRatio?: number;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const ImageEditor = ({ 
  imageUrl, 
  onImageChange, 
  aspectRatio = 1.5, 
  fileInputRef: externalFileInputRef 
}: ImageEditorProps) => {
  // Use provided ref or create our own
  const internalFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = externalFileInputRef || internalFileInputRef;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  // Image transformation state
  const [scale, setScale] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Container dimensions (will be set based on parent)
  const [containerWidth, setContainerWidth] = useState(300);
  const [containerHeight, setContainerHeight] = useState(200);
  
  // Load image when imageUrl changes
  useEffect(() => {
    if (!imageUrl) {
      setImageLoaded(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      // Reset transformation when loading new image
      setScale(1);
      setPositionX(0);
      setPositionY(0);
      setRotation(0);
      renderImage();
    };
    img.src = imageUrl;
  }, [imageUrl]);
  
  // Update container size based on parent element
  useEffect(() => {
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = width / aspectRatio;
        setContainerWidth(width);
        setContainerHeight(height);
        
        // Set canvas dimensions
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        renderImage();
      }
    }
  }, [aspectRatio, imageLoaded]);
  
  // Render image to canvas with current transformations
  const renderImage = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!canvas || !img || !imageLoaded) return;
    
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
  
  // Effect to re-render image when transformations change
  useEffect(() => {
    renderImage();
  }, [scale, positionX, positionY, rotation, containerWidth, containerHeight]);
  
  // Movement handlers
  const moveUp = () => setPositionY(prev => prev - 10);
  const moveDown = () => setPositionY(prev => prev + 10);
  const moveLeft = () => setPositionX(prev => prev - 10);
  const moveRight = () => setPositionX(prev => prev + 10);
  
  // Zoom handlers
  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  
  // Rotation handler
  const rotateImage = () => setRotation(prev => (prev + 90) % 360);
  
  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File troppo grande",
        description: "L'immagine non deve superare i 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Save current canvas state as image
  const saveImage = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/jpeg');
    onImageChange(dataUrl);
    
    toast({
      title: "Modifiche salvate",
      description: "Le modifiche all'immagine sono state applicate."
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Immagine</Label>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="bg-noir border-white/20 hover:bg-wine/20"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      
      <div className="bg-noir-dark rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
        />
      </div>
      
      {imageLoaded && (
        <>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={zoomIn}
            >
              <ZoomIn className="h-4 w-4 mr-1" />
              Zoom In
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={zoomOut}
            >
              <ZoomOut className="h-4 w-4 mr-1" />
              Zoom Out
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={rotateImage}
            >
              <RotateCw className="h-4 w-4 mr-1" />
              Ruota
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1"></div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={moveUp}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <div className="col-span-1"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={moveLeft}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-wine text-white hover:bg-wine/80"
              onClick={saveImage}
            >
              Applica
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={moveRight}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1"></div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-noir border-white/20 hover:bg-wine/20"
              onClick={moveDown}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <div className="col-span-1"></div>
          </div>
          
          <div>
            <Label className="mb-2 block text-sm">Zoom: {Math.round(scale * 100)}%</Label>
            <Slider
              className="bg-noir-dark"
              value={[scale * 100]}
              min={50}
              max={300}
              step={5}
              onValueChange={(value) => setScale(value[0] / 100)}
            />
          </div>
        </>
      )}
      
      {!imageUrl && (
        <p className="text-sm text-white/60 text-center py-4">
          Nessuna immagine caricata. Carica un'immagine per iniziare.
        </p>
      )}
      
      <p className="text-xs text-white/60 mt-1">
        Formato massimo: 10MB. Supportati: JPG, PNG, WebP.
      </p>
    </div>
  );
};

export default ImageEditor;
