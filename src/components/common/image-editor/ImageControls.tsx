
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
  ZoomIn, ZoomOut, RotateCw 
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ImageControlsProps {
  scale: number;
  imageLoaded: boolean;
  onScaleChange: (value: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
}

const ImageControls = ({
  scale,
  imageLoaded,
  onScaleChange,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onZoomIn,
  onZoomOut,
  onRotate
}: ImageControlsProps) => {
  if (!imageLoaded) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20"
          onClick={onZoomIn}
          type="button"
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20"
          onClick={onZoomOut}
          type="button"
        >
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20"
          onClick={onRotate}
          type="button"
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
          onClick={onMoveUp}
          type="button"
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
          onClick={onMoveLeft}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-wine text-white hover:bg-wine/80"
          onClick={() => {}}
          type="button"
          disabled={true}
        >
          Applica
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20"
          onClick={onMoveRight}
          type="button"
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
          onClick={onMoveDown}
          type="button"
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
          onValueChange={(value) => onScaleChange(value[0] / 100)}
        />
      </div>
    </div>
  );
};

export default ImageControls;
