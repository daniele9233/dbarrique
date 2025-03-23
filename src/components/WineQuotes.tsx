
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// Citazione corretta sul vino di Hemingway
const wineQuote = {
  quote: "Aprire una bottiglia di vino è come aprire una porta sulla storia.",
  author: "Ernest Hemingway"
};

const WineQuotes = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Imposta un breve ritardo prima di iniziare l'animazione
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 800);
    
    // Imposta un intervallo per ricominciare l'animazione periodicamente
    const intervalId = setInterval(() => {
      setIsRevealed(false);
      
      setTimeout(() => {
        setIsRevealed(true);
      }, 500);
    }, 12000); // Ricomincia l'animazione ogni 12 secondi (più lento)
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 relative h-24">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative overflow-hidden">
          <p 
            ref={quoteRef}
            className="text-white/80 italic text-xl font-serif relative leading-relaxed tracking-wide"
          >
            {/* Utilizziamo lettere individuali per l'animazione */}
            <span className="absolute -left-2 -top-2 text-4xl text-wine/20 font-serif">"</span>
            <span className="inline-block">
              {wineQuote.quote.split('').map((char, index) => (
                <span 
                  key={index}
                  className={cn(
                    "inline-block transition-all duration-300", // Aumentato duration per rallentare
                    isRevealed 
                      ? "opacity-100 blur-none translate-y-0" 
                      : "opacity-0 blur-md translate-y-2"
                  )}
                  style={{ 
                    transitionDelay: `${index * 70}ms`, // Più lento (70ms invece di 50ms)
                    marginLeft: char === " " ? "0.25em" : "0" // Aggiungi spazio per i caratteri spazio
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="absolute -right-2 -bottom-2 text-4xl text-wine/20 font-serif">"</span>
          </p>
        </div>
        <div 
          className={cn(
            "text-white/60 text-sm mt-2 font-light tracking-wider transition-all duration-700 self-end mr-10", // Aggiunto self-end e mr-10 per spostare a destra
            isRevealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: `${wineQuote.quote.length * 70 + 200}ms` }} // Ritardo maggiore
        >
          — {wineQuote.author}
        </div>
        <div className={cn(
          "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-wine/50 to-transparent transition-opacity duration-700", // Durata maggiore
          isRevealed ? "opacity-100" : "opacity-0"
        )}></div>
      </div>
    </div>
  );
};

export default WineQuotes;
