
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Array di aforismi sul vino
const wineQuotes = [
  {
    quote: "Bere del vino è bere del genio.",
    author: "Charles Baudelaire"
  },
  {
    quote: "Il vino è la poesia della terra.",
    author: "Mario Soldati"
  },
  {
    quote: "Un pasto senza vino è come un giorno senza sole.",
    author: "Jean Anthelme Brillat-Savarin"
  },
  {
    quote: "Il vino è la più sana e igienica delle bevande.",
    author: "Louis Pasteur"
  },
  {
    quote: "Nei vini antichi si trova la saggezza.",
    author: "Plinio il Vecchio"
  },
  {
    quote: "Aprire una bottiglia di vino è come aprire una porta sulla storia.",
    author: "Ernest Hemingway"
  },
  {
    quote: "Il buon vino è un buon compagno di viaggio.",
    author: "William Shakespeare"
  }
];

const WineQuotes = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  
  useEffect(() => {
    // Cambia l'aforisma ogni 8 secondi
    const intervalId = setInterval(() => {
      setFadeState('fade-out');
      
      // Dopo che l'animazione di dissolvenza è completata, cambia l'aforisma
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % wineQuotes.length);
        setFadeState('fade-in');
      }, 500); // Attendi che l'animazione di fade-out sia completata
      
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const currentQuote = wineQuotes[currentQuoteIndex];

  return (
    <div className="max-w-md mx-auto mt-12 relative h-24">
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center",
          fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
        )}
      >
        <p className="text-white/80 italic text-xl font-serif relative">
          "{currentQuote.quote}"
          <span className="absolute -left-2 -top-2 text-4xl text-wine/20 font-serif">"</span>
          <span className="absolute -right-2 -bottom-2 text-4xl text-wine/20 font-serif">"</span>
        </p>
        <p className="text-white/60 text-sm mt-2 font-light tracking-wider">
          — {currentQuote.author}
        </p>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-wine/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default WineQuotes;
