
import { ChangeEvent, useRef } from 'react';
import { Star, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Wine } from '@/data/models/Wine';
import { grapes, bodyOptions, structureOptions, tanninOptions, sweetnessOptions, aromaOptions } from "@/data/constants/wineConstants";

interface WineEditFormProps {
  editedWine: {
    name: string;
    region: string;
    winery: string;
    year: number;
    rating: number;
    type: Wine['type'];
    image: string;
    grape: string;
    grapes: string[];
    body: string;
    structure: string;
    tannins: string;
    sweetness: string;
    aroma: string;
    description: string;
    pairing: string;
    storage: string;
  };
  isBlend: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
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
  const renderRatingStars = (rating: number) => {
    return [...Array(10)].map((_, i) => (
      <Star 
        key={i}
        onClick={() => handleEditField('rating', i + 1)}
        className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'} 
          cursor-pointer hover:text-wine-light`}
      />
    ));
  };
  
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>
          Cantina
        </Label>
        <Input
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          placeholder="es. Biondi-Santi"
          value={editedWine.winery}
          onChange={(e) => handleEditField('winery', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <Label>
            Vitigno
          </Label>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="is-blend"
              checked={isBlend}
              onCheckedChange={() => {
                setIsBlend(!isBlend);
                if (!isBlend) {
                  handleEditField('grape', '');
                } else {
                  handleEditField('grapes', []);
                }
              }}
              className="border-wine data-[state=checked]:bg-wine data-[state=checked]:border-wine"
            />
            <Label
              htmlFor="is-blend"
              className="text-sm cursor-pointer"
            >
              Blend (seleziona più vitigni)
            </Label>
          </div>
        </div>
        
        {isBlend ? (
          <div className="max-h-40 overflow-y-auto pr-2 border border-white/10 rounded-md p-2 bg-noir custom-scrollbar">
            <div className="grid grid-cols-2 gap-2">
              {grapes.filter(g => g !== "Blend").map(grape => (
                <div key={grape} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`grape-${grape}`}
                    checked={editedWine.grapes.includes(grape)}
                    onCheckedChange={() => handleGrapeToggle(grape)}
                    className="border-wine data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                  />
                  <Label 
                    htmlFor={`grape-${grape}`}
                    className="text-sm cursor-pointer"
                  >
                    {grape}
                  </Label>
                </div>
              ))}
            </div>
            {editedWine.grapes.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-xs text-white/70">Vitigni selezionati: {editedWine.grapes.join(', ')}</p>
              </div>
            )}
          </div>
        ) : (
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={editedWine.grape}
            onChange={(e) => handleEditField('grape', e.target.value)}
          >
            <option value="">Seleziona un vitigno</option>
            {grapes.filter(g => g !== "Blend").map(grape => (
              <option key={grape} value={grape}>{grape}</option>
            ))}
          </select>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Corpo
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={editedWine.body}
            onChange={(e) => handleEditField('body', e.target.value)}
          >
            {bodyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Struttura
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={editedWine.structure}
            onChange={(e) => handleEditField('structure', e.target.value)}
          >
            {structureOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>
            Tannini
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={editedWine.tannins}
            onChange={(e) => handleEditField('tannins', e.target.value)}
          >
            {tanninOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Dolcezza
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={editedWine.sweetness}
            onChange={(e) => handleEditField('sweetness', e.target.value)}
          >
            {sweetnessOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Aromi principali
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={editedWine.aroma}
            onChange={(e) => handleEditField('aroma', e.target.value)}
          >
            {aromaOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>
          Descrizione
        </Label>
        <Textarea 
          value={editedWine.description}
          onChange={(e) => handleEditField('description', e.target.value)}
          className="bg-noir border-white/20 text-white h-24"
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Abbinamenti Consigliati
        </Label>
        <Input 
          value={editedWine.pairing}
          onChange={(e) => handleEditField('pairing', e.target.value)}
          className="bg-noir border-white/20 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Conservazione
        </Label>
        <Input 
          value={editedWine.storage}
          onChange={(e) => handleEditField('storage', e.target.value)}
          className="bg-noir border-white/20 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Immagine del Vino
        </Label>
        <div className="flex gap-2">
          <Input 
            value={editedWine.image} 
            onChange={(e) => handleEditField('image', e.target.value)}
            className="bg-noir border-white/20 text-white pr-12"
            placeholder="Enter image URL or upload"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline" 
            size="icon"
            className="bg-noir border-white/20 hover:bg-wine/20"
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
        <div className="bg-noir-dark mt-2 h-40 rounded-lg overflow-hidden">
          <img src={editedWine.image} alt={editedWine.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-white/10 hover:bg-noir hover:text-white"
        >
          Annulla
        </Button>
        <Button
          onClick={onSave}
          className="bg-wine hover:bg-wine-light"
          disabled={!editedWine.name}
        >
          Salva Modifiche
        </Button>
      </div>
    </div>
  );
};

export default WineEditForm;
