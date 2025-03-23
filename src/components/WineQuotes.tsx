
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
    }, 1200); // Ritardo prima di iniziare l'animazione
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Dividiamo la citazione in caratteri per creare l'effetto di comparsa progressiva
  const characters = wineQuote.quote.split('');

  return (
    <div className="max-w-md mx-auto mt-12 relative h-24">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative overflow-hidden">
          <p 
            ref={quoteRef}
            className="text-white/80 italic text-xl font-serif relative leading-relaxed tracking-wide whitespace-pre-wrap"
          >
            <span className="absolute -left-2 -top-2 text-4xl text-wine/20 font-serif">"</span>
            {/* Combinazione di animazione left-to-right con motion blur */}
            <span className="inline-block relative">
              <span 
                className={cn(
                  "inline-block transition-all duration-1000 ease-out overflow-hidden",
                  isRevealed ? "w-full" : "w-0"
                )}
                style={{
                  whiteSpace: "nowrap"
                }}
              >
                {characters.map((char, index) => (
                  <span 
                    key={index}
                    className={cn(
                      "inline-block transition-all duration-700",
                      isRevealed 
                        ? "opacity-100 blur-none" 
                        : "opacity-0 blur-md"
                    )}
                    style={{ 
                      transitionDelay: `${index * 30 + 300}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
            <span className="absolute -right-2 -bottom-2 text-4xl text-wine/20 font-serif">"</span>
          </p>
        </div>
        <div 
          className={cn(
            "text-white/60 text-sm mt-2 font-light tracking-wider transition-all duration-1000 self-end mr-10", 
            isRevealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "1800ms" }}
        >
          — {wineQuote.author}
        </div>
        <div className={cn(
          "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-wine/50 to-transparent transition-opacity duration-1000",
          isRevealed ? "opacity-100" : "opacity-0"
        )}></div>
      </div>
    </div>
  );
};

export default WineQuotes;
