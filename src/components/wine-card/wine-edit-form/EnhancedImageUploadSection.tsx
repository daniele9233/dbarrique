
import { RefObject } from "react";
import ImageEditor from "@/components/common/ImageEditor";

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
