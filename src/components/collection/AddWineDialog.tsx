
import { useState, useRef, ChangeEvent } from 'react';
import { Grape, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Define wine characteristics options
const bodyOptions = ["Leggero", "Medio", "Corposo"];
const structureOptions = ["Elegante", "Equilibrato", "Strutturato"];
const tanninOptions = ["Morbido", "Equilibrato", "Tannico"];
const sweetnessOptions = ["Secco", "Amabile", "Dolce"];
const aromaOptions = ["Fruttato", "Speziato", "Evoluto"];

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddWineDialog: React.FC<AddWineDialogProps> = ({ isOpen, onOpenChange }) => {
  const [newWine, setNewWine] = useState({
    name: "",
    region: "",
    year: new Date().getFullYear(),
    rating: 5,
    type: "red" as const,
    image: "",
    grape: "",
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleAddWine = () => {
    // This would normally submit the form data to a database
    toast({
      title: "Successo",
      description: "Il nuovo vino è stato aggiunto alla tua collezione.",
    });
    onOpenChange(false);
    setNewWine({
      name: "",
      region: "",
      year: new Date().getFullYear(),
      rating: 5,
      type: "red" as const,
      image: "",
      grape: "",
      body: "Medio",
      structure: "Equilibrato",
      tannins: "Equilibrato",
      sweetness: "Secco",
      aroma: "Fruttato"
    });
  };
  
  const handleChange = (field: string, value: string | number) => {
    setNewWine({
      ...newWine,
      [field]: value
    });
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Rating selector for 1-10 scale
  const renderRatingInput = () => {
    return (
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="1"
          max="10"
          value={newWine.rating}
          onChange={(e) => handleChange('rating', parseInt(e.target.value))}
          className="w-full h-2 bg-noir rounded-lg appearance-none cursor-pointer accent-wine"
        />
        <span className="text-white font-medium">{newWine.rating}/10</span>
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-noir-light border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Grape className="h-6 w-6 text-wine" />
            <span>Aggiungi Nuovo Vino</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              Nome del Vino
            </Label>
            <Input
              className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
              placeholder="es. Brunello di Montalcino"
              value={newWine.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              Regione
            </Label>
            <Input
              className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
              placeholder="es. Toscana, Italia"
              value={newWine.region}
              onChange={(e) => handleChange('region', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              Vitigno
            </Label>
            <Input
              className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
              placeholder="es. Sangiovese"
              value={newWine.grape}
              onChange={(e) => handleChange('grape', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Anno
              </Label>
              <Input
                type="number"
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. 2015"
                value={newWine.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Valutazione (1-10)
              </Label>
              {renderRatingInput()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Corpo
              </Label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.body}
                onChange={(e) => handleChange('body', e.target.value)}
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
                value={newWine.structure}
                onChange={(e) => handleChange('structure', e.target.value)}
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
                value={newWine.tannins}
                onChange={(e) => handleChange('tannins', e.target.value)}
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
                value={newWine.sweetness}
                onChange={(e) => handleChange('sweetness', e.target.value)}
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
                value={newWine.aroma}
                onChange={(e) => handleChange('aroma', e.target.value)}
              >
                {aromaOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>
              Immagine del Vino
            </Label>
            <div className="flex gap-2">
              <Input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="Inserisci URL immagine o carica un'immagine"
                value={typeof newWine.image === 'string' ? newWine.image : ''}
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
            
            {newWine.image && (
              <div className="mt-2 h-40 rounded-md overflow-hidden bg-noir-dark">
                <img 
                  src={newWine.image.toString()} 
                  alt="Anteprima vino" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/10 hover:bg-noir hover:text-white"
          >
            Annulla
          </Button>
          <Button
            onClick={handleAddWine}
            className="bg-wine hover:bg-wine-light"
            disabled={!newWine.name || !newWine.region || !newWine.image || !newWine.grape}
          >
            Aggiungi alla Collezione
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWineDialog;
