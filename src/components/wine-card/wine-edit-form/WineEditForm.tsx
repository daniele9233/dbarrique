
import { ChangeEvent, RefObject } from 'react';
import WinerySection from './WinerySection';
import GrapeSelectionSection from './GrapeSelectionSection';
import WineCharacteristicsSection from './WineCharacteristicsSection';
import DescriptionSection from './DescriptionSection';
import PairingStorageSection from './PairingStorageSection';
import ImageUploadSection from './ImageUploadSection';
import FormActions from './FormActions';
import { EditedWine } from '../useWineCardState';

interface WineEditFormProps {
  editedWine: EditedWine;
  isBlend: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  handleEditField: (field: string, value: string | number | string[]) => void;
  handleGrapeToggle: (grape: string) => void;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  setIsBlend: (isBlend: boolean) => void;
  onCancel: () => void;
  onSave: () => void;
}

const WineEditForm = ({ 
  editedWine, 
  isBlend,
  fileInputRef,
  handleEditField, 
  handleGrapeToggle, 
  handleFileUpload,
  setIsBlend,
  onCancel,
  onSave
}: WineEditFormProps) => {
  return (
    <div className="space-y-4 py-4">
      <WinerySection 
        winery={editedWine.winery} 
        onChange={(value) => handleEditField('winery', value)} 
      />
      
      <GrapeSelectionSection 
        isBlend={isBlend}
        selectedGrape={editedWine.grape}
        selectedGrapes={editedWine.grapes}
        onIsBlendChange={setIsBlend}
        onGrapeChange={(value) => handleEditField('grape', value)}
        onGrapeToggle={handleGrapeToggle}
      />
      
      <WineCharacteristicsSection 
        body={editedWine.body}
        structure={editedWine.structure}
        tannins={editedWine.tannins}
        sweetness={editedWine.sweetness}
        aroma={editedWine.aroma}
        onChange={handleEditField}
      />
      
      <DescriptionSection 
        description={editedWine.description}
        onChange={(value) => handleEditField('description', value)}
      />
      
      <PairingStorageSection 
        pairing={editedWine.pairing}
        storage={editedWine.storage}
        onPairingChange={(value) => handleEditField('pairing', value)}
        onStorageChange={(value) => handleEditField('storage', value)}
      />
      
      <ImageUploadSection 
        imageUrl={editedWine.image}
        fileInputRef={fileInputRef}
        onImageUrlChange={(value) => handleEditField('image', value)}
        onFileUploadClick={() => fileInputRef.current?.click()}
      />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      
      <FormActions 
        onCancel={onCancel}
        onSave={onSave}
        isDisabled={!editedWine.name}
      />
    </div>
  );
};

export default WineEditForm;
