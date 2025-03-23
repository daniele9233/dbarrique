
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
    }, 800); // Mantenuto lo stesso ritardo iniziale
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Dividiamo la citazione in parole per prevenire che "porta" venga spezzata
  const words = wineQuote.quote.split(' ');

  return (
    <div className="max-w-md mx-auto mt-12 relative h-24">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative overflow-hidden">
          <p 
            ref={quoteRef}
            className="text-white/80 italic text-xl font-serif relative leading-relaxed tracking-wide whitespace-pre-wrap"
          >
            <span className="absolute -left-2 -top-2 text-4xl text-wine/20 font-serif">"</span>
            <span className="inline-block">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, charIndex) => (
                    <span 
                      key={`${wordIndex}-${charIndex}`}
                      className={cn(
                        "inline-block transition-all duration-700 ease-wine-bounce", // Aumentato a 700ms e aggiunto ease-wine-bounce per una transizione più fluida
                        isRevealed 
                          ? "opacity-100 blur-none translate-x-0" 
                          : "opacity-0 blur-md -translate-x-4" // Mantenuto il movimento da sinistra a destra
                      )}
                      style={{ 
                        transitionDelay: `${(wordIndex * 3 + charIndex) * 60}ms`, // Aumentato da 40ms a 60ms per rallentare leggermente
                      }}
                    >
                      {char}
                    </span>
                  ))}
                  {/* Aggiungi spazio dopo ogni parola tranne l'ultima */}
                  {wordIndex < words.length - 1 && (
                    <span className="inline-block" style={{ width: '0.25em' }}></span>
                  )}
                </span>
              ))}
            </span>
            <span className="absolute -right-2 -bottom-2 text-4xl text-wine/20 font-serif">"</span>
          </p>
        </div>
        <div 
          className={cn(
            "text-white/60 text-sm mt-2 font-light tracking-wider transition-all duration-1000 ease-in-out self-end mr-10", // Aumentato a 1000ms e aggiunto ease-in-out
            isRevealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: `${words.length * 60 + 400}ms` }} // Aggiornato in base al nuovo ritardo dei caratteri
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
