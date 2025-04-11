
import { RefObject, useEffect } from "react";
import ImageEditor from "@/components/common/image-editor";

interface EnhancedImageUploadSectionProps {
  imageUrl: string;
  fileInputRef: RefObject<HTMLInputElement>;
  onImageChange: (url: string) => void;
}

const EnhancedImageUploadSection = ({ 
  imageUrl, 
  fileInputRef, 
  onImageChange 
}: EnhancedImageUploadSectionProps) => {
  // Forza il rendering dell'editor quando l'immagine cambia
  useEffect(() => {
    console.log("Image URL changed in wine-card EnhancedImageUploadSection:", imageUrl);
  }, [imageUrl]);

  return (
    <div className="space-y-2">
      <ImageEditor 
        imageUrl={imageUrl}
        onImageChange={onImageChange}
        aspectRatio={1.5}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default EnhancedImageUploadSection;
