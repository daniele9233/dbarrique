
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { WineFormData } from "@/hooks/useWineForm";
import { ChangeEvent, RefObject } from "react";

interface ImageUploadSectionProps {
  wineData: WineFormData;
  fileInputRef: RefObject<HTMLInputElement>;
  handleChange: (field: string, value: string | number | string[]) => void;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ 
  wineData, 
  fileInputRef, 
  handleChange, 
  handleFileUpload 
}) => {
  return (
    <div className="space-y-2">
      <Label>
        Immagine del Vino
      </Label>
      <div className="flex gap-2">
        <Input
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          placeholder="Inserisci URL immagine o carica un'immagine"
          value={typeof wineData.image === 'string' ? wineData.image : ''}
          onChange={(e) => handleChange('image', e.target.value)}
        />
        <Button 
          variant="outline"
          className="border-white/10 hover:bg-wine hover:text-white"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Carica
        </Button>
        <input 
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </div>
      
      {wineData.image && (
        <div className="mt-2 h-40 rounded-md overflow-hidden bg-noir-dark">
          <img 
            src={wineData.image.toString()} 
            alt="Anteprima vino" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;
