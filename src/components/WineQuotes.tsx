
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const wineQuote = {
  quote: "Aprire una bottiglia di vino è come aprire una porta sulla storia.",
  author: "Ernest Hemingway"
};

const WineQuotes = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set a longer delay before starting the animation
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2000); // Increased delay before starting the animation
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Split the quote into words to ensure proper spacing
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
            {/* Slower animation with reduced speed */}
            <span className="inline-block relative">
              <span 
                className={cn(
                  "inline-block transition-all duration-2000 ease-out overflow-hidden", // Slowed down animation
                  isRevealed ? "w-full" : "w-0"
                )}
                style={{
                  whiteSpace: "nowrap"
                }}
              >
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block">
                    {word.split('').map((char, charIndex) => (
                      <span 
                        key={`${wordIndex}-${charIndex}`}
                        className={cn(
                          "inline-block transition-all duration-1500", // Slowed down character animation
                          isRevealed 
                            ? "opacity-100 blur-none" 
                            : "opacity-0 blur-md"
                        )}
                        style={{ 
                          transitionDelay: `${(wordIndex * 5 + charIndex) * 60 + 800}ms`, // Increased delay between characters
                        }}
                      >
                        {char}
                      </span>
                    ))}
                    {wordIndex < words.length - 1 && (
                      <span 
                        className={cn(
                          "inline-block transition-all duration-1500",
                          isRevealed ? "opacity-100" : "opacity-0"
                        )}
                        style={{ 
                          transitionDelay: `${wordIndex * 300 + 800}ms`, 
                        }}
                      >
                        &nbsp;
                      </span>
                    )}
                  </span>
                ))}
              </span>
            </span>
            <span className="absolute -right-2 -bottom-2 text-4xl text-wine/20 font-serif">"</span>
          </p>
        </div>
        <div 
          className={cn(
            "text-white/60 text-sm mt-2 font-light tracking-wider transition-all duration-2000 self-end mr-10", // Slowed down author animation
            isRevealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "3500ms" }} // Increased delay for the author
        >
          — {wineQuote.author}
        </div>
        <div className={cn(
          "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-wine/50 to-transparent transition-opacity duration-2000", // Slowed down decoration line animation
          isRevealed ? "opacity-100" : "opacity-0"
        )}></div>
      </div>
    </div>
  );
};

export default WineQuotes;
