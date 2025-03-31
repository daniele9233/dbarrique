
import { WineType } from '@/data/models/Wine';

interface WineDescriptions {
  description: string;
  pairing: string;
  storage: string;
}

export const generateWineDescription = (type: WineType, region: string): WineDescriptions => {
  const descriptions = {
    description: 
      type === 'red' 
        ? `This exceptional red wine from ${region} showcases remarkable complexity and character. With notes of dark berries, leather, and oak, it offers an unforgettable tasting experience.` 
      : type === 'white' 
        ? `This exceptional white wine from ${region} showcases remarkable complexity and character. With notes of citrus, green apple, and honeysuckle, it offers an unforgettable tasting experience.` 
      : type === 'rosé' 
        ? `This exceptional rosé wine from ${region} showcases remarkable complexity and character. With notes of strawberry, watermelon, and rose petal, it offers an unforgettable tasting experience.` 
      : `This exceptional sparkling wine from ${region} showcases remarkable complexity and character. With notes of pear, brioche, and toasted almonds, it offers an unforgettable tasting experience.`,
      
    pairing: 
      type === 'red' 
        ? 'Red meat, aged cheeses, and mushroom dishes' 
      : type === 'white' 
        ? 'Seafood, poultry, and fresh salads' 
      : type === 'rosé' 
        ? 'Mediterranean cuisine, grilled vegetables, and light pasta' 
      : 'Oysters, light appetizers, and celebrations',
      
    storage: `Best stored at 12-16°C with 70% humidity. Will continue to develop for ${type === 'red' ? '5-10' : '2-4'} years.`
  };
  
  return descriptions;
};
