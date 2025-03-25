
import { useState, useRef, ChangeEvent } from 'react';
import { Star, Plus, Edit, Save, Upload, Grape } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { grapes, bodyOptions, structureOptions, tanninOptions, sweetnessOptions, aromaOptions, updateWine } from "@/data/WineData";

interface WineCardProps {
  id: string;
  name: string;
  region: string;
  winery?: string;
  year: number;
  rating: number;
  type: 'red' | 'white' | 'rosé' | 'sparkling';
  image: string;
  grape: string;
  grapes?: string[];
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
}

const WineCard = ({ 
  id,
  name, 
  region, 
  winery = "", 
  year, 
  rating, 
  type, 
  image,
  grape,
  grapes = [],
  body,
  structure,
  tannins,
  sweetness,
  aroma
}: WineCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBlend, setIsBlend] = useState(grape === "Blend");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editedWine, setEditedWine] = useState({
    name, 
    region, 
    winery,
    year, 
    rating, 
    type, 
    image,
    grape,
    grapes: grapes || (grape !== "Blend" ? [grape] : []),
    body,
    structure,
    tannins,
    sweetness,
    aroma,
    description: type === 'red' ? 'This exceptional red wine from ' + region + ' showcases remarkable complexity and character. With notes of dark berries, leather, and oak, it offers an unforgettable tasting experience.' : 
              type === 'white' ? 'This exceptional white wine from ' + region + ' showcases remarkable complexity and character. With notes of citrus, green apple, and honeysuckle, it offers an unforgettable tasting experience.' : 
              type === 'rosé' ? 'This exceptional rosé wine from ' + region + ' showcases remarkable complexity and character. With notes of strawberry, watermelon, and rose petal, it offers an unforgettable tasting experience.' : 
              'This exceptional sparkling wine from ' + region + ' showcases remarkable complexity and character. With notes of pear, brioche, and toasted almonds, it offers an unforgettable tasting experience.',
    pairing: type === 'red' ? 'Red meat, aged cheeses, and mushroom dishes' : 
            type === 'white' ? 'Seafood, poultry, and fresh salads' : 
            type === 'rosé' ? 'Mediterranean cuisine, grilled vegetables, and light pasta' : 
            'Oysters, light appetizers, and celebrations',
    storage: 'Best stored at 12-16°C with 70% humidity. Will continue to develop for ' + (type === 'red' ? '5-10' : '2-4') + ' years.'
  });
  
  const typeColors = {
    red: 'bg-wine',
    white: 'bg-amber-100',
    rosé: 'bg-rose-300',
    sparkling: 'bg-yellow-100',
  };
  
  const typeTextColors = {
    red: 'text-white',
    white: 'text-noir',
    rosé: 'text-noir',
    sparkling: 'text-noir',
  };

  const handleSaveChanges = async () => {
    try {
      // Determine grape value based on selection mode
      const grapeValue = isBlend ? "Blend" : editedWine.grape;
      const grapesArray = isBlend ? editedWine.grapes : editedWine.grape ? [editedWine.grape] : [];
      
      await updateWine(id, {
        name: editedWine.name,
        region: editedWine.region,
        winery: editedWine.winery,
        year: editedWine.year,
        rating: editedWine.rating,
        type: editedWine.type,
        image: editedWine.image,
        grape: grapeValue,
        grapes: grapesArray,
        body: editedWine.body,
        structure: editedWine.structure,
        tannins: editedWine.tannins,
        sweetness: editedWine.sweetness,
        aroma: editedWine.aroma
      });
      
      toast({
        title: "Modifiche salvate",
        description: `${editedWine.name} è stato aggiornato.`,
      });
      
      setIsEditMode(false);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del vino:', error);
      toast({
        title: "Errore",
        description: "Impossibile salvare le modifiche. Riprova più tardi.",
        variant: "destructive"
      });
    }
  };
  
  const handleEditField = (field: string, value: string | number | string[]) => {
    setEditedWine({
      ...editedWine,
      [field]: value
    });
  };
  
  const handleGrapeToggle = (grape: string) => {
    const updatedGrapes = editedWine.grapes.includes(grape)
      ? editedWine.grapes.filter(g => g !== grape)
      : [...editedWine.grapes, grape];
    
    handleEditField('grapes', updatedGrapes);
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleEditField('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Convert 1-10 rating to an array of 10 positions for stars
  const renderRatingStars = (rating: number, editable = false) => {
    return [...Array(10)].map((_, i) => (
      <Star 
        key={i}
        onClick={() => editable && handleEditField('rating', i + 1)}
        className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'} 
          ${editable ? 'cursor-pointer hover:text-wine-light' : ''}`}
      />
    ));
  };
  
  return (
    <>
      <div 
        className="group relative rounded-lg overflow-hidden transition-all duration-500 h-[400px] wine-glass cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Wine type badge */}
        <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${typeColors[type]} ${typeTextColors[type]}`}>
          {type}
        </div>
        
        {/* Wine image */}
        <div className="absolute inset-0 bg-noir-dark overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-transparent"></div>
        </div>
        
        {/* Main content */}
        <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 ease-wine-bounce">
          <div className="space-y-3">
            <div className="flex items-center space-x-0.5 flex-wrap">
              {renderRatingStars(rating)}
            </div>
            
            <h3 className="font-serif text-2xl">{name}</h3>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/70 text-sm">{region}</p>
                <p className="text-white/90 font-medium">{year}</p>
              </div>
              
              <button 
                className="h-10 w-10 rounded-full flex items-center justify-center bg-wine hover:bg-wine-light transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to collection logic would go here
                }}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div 
          className={`absolute inset-0 bg-wine/10 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
      </div>

      {/* Wine Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl flex justify-between items-center">
              {isEditMode ? (
                <Input 
                  value={editedWine.name} 
                  onChange={(e) => handleEditField('name', e.target.value)}
                  className="bg-noir border-white/20 text-white text-3xl font-serif"
                />
              ) : (
                <span>{editedWine.name}</span>
              )}
              <Button 
                onClick={() => isEditMode ? handleSaveChanges() : setIsEditMode(true)}
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent border-wine hover:bg-wine/20"
              >
                {isEditMode ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
              </Button>
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {isEditMode ? (
                <div className="flex gap-4 mt-2">
                  <Input 
                    value={editedWine.region} 
                    onChange={(e) => handleEditField('region', e.target.value)}
                    className="bg-noir border-white/20 text-white flex-grow"
                    placeholder="Regione"
                  />
                  <Input 
                    value={editedWine.year} 
                    onChange={(e) => handleEditField('year', parseInt(e.target.value))}
                    className="bg-noir border-white/20 text-white w-24"
                    type="number"
                  />
                </div>
              ) : (
                <span>{editedWine.region}, {editedWine.year}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {isEditMode ? (
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
                          handleEditField('grape', ''); // Clear single grape selection when switching to blend
                        } else {
                          handleEditField('grapes', []); // Clear blend selections when switching to single
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
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="rounded-lg overflow-hidden h-[300px]">
                <img src={editedWine.image} alt={editedWine.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Valutazione (1-10)</h4>
                  <div className="flex items-center space-x-0.5 flex-wrap">
                    {renderRatingStars(editedWine.rating, isEditMode)}
                    <span className="ml-2 text-white/70">{editedWine.rating}/10</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Cantina</h4>
                  <p className="text-white/80">{editedWine.winery || "Non specificata"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Vitigno</h4>
                  <p className="text-white/80">
                    {editedWine.grape === "Blend" && editedWine.grapes && editedWine.grapes.length > 0 
                      ? `Blend (${editedWine.grapes.join(', ')})`
                      : editedWine.grape}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Caratteristiche</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/80">
                    <div>
                      <span className="text-wine/80 text-xs">Corpo:</span> {editedWine.body}
                    </div>
                    <div>
                      <span className="text-wine/80 text-xs">Struttura:</span> {editedWine.structure}
                    </div>
                    <div>
                      <span className="text-wine/80 text-xs">Tannini:</span> {editedWine.tannins}
                    </div>
                    <div>
                      <span className="text-wine/80 text-xs">Dolcezza:</span> {editedWine.sweetness}
                    </div>
                    <div>
                      <span className="text-wine/80 text-xs">Aromi:</span> {editedWine.aroma}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Descrizione</h4>
                  <p className="text-white/80">{editedWine.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Abbinamenti Consigliati</h4>
                  <p className="text-white/80">{editedWine.pairing}</p>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-wine/80 mb-1">Conservazione</h4>
                  <p className="text-white/80">{editedWine.storage}</p>
                </div>
              </div>
            </div>
          )}
          
          {isEditMode && (
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditMode(false);
                  setEditedWine({ 
                    name, 
                    region, 
                    winery, 
                    year, 
                    rating, 
                    type, 
                    image,
                    grape,
                    grapes: grapes || (grape !== "Blend" ? [grape] : []),
                    body,
                    structure,
                    tannins,
                    sweetness,
                    aroma,
                    description: type === 'red' ? 'This exceptional red wine from ' + region + ' showcases remarkable complexity and character. With notes of dark berries, leather, and oak, it offers an unforgettable tasting experience.' : 
                              type === 'white' ? 'This exceptional white wine from ' + region + ' showcases remarkable complexity and character. With notes of citrus, green apple, and honeysuckle, it offers an unforgettable tasting experience.' : 
                              type === 'rosé' ? 'This exceptional rosé wine from ' + region + ' showcases remarkable complexity and character. With notes of strawberry, watermelon, and rose petal, it offers an unforgettable tasting experience.' : 
                              'This exceptional sparkling wine from ' + region + ' showcases remarkable complexity and character. With notes of pear, brioche, and toasted almonds, it offers an unforgettable tasting experience.',
                    pairing: type === 'red' ? 'Red meat, aged cheeses, and mushroom dishes' : 
                            type === 'white' ? 'Seafood, poultry, and fresh salads' : 
                            type === 'rosé' ? 'Mediterranean cuisine, grilled vegetables, and light pasta' : 
                            'Oysters, light appetizers, and celebrations',
                    storage: 'Best stored at 12-16°C with 70% humidity. Will continue to develop for ' + (type === 'red' ? '5-10' : '2-4') + ' years.'
                  });
                  setIsBlend(grape === "Blend");
                }}
                className="border-white/10 hover:bg-noir hover:text-white"
              >
                Annulla
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="bg-wine hover:bg-wine-light"
                disabled={!editedWine.name}
              >
                Salva Modifiche
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WineCard;
