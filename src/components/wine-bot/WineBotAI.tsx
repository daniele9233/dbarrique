
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Wine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useWineBotChat } from '@/hooks/useWineBotChat';
import WineBotMessage from './WineBotMessage';
import WineRecommendation from './WineRecommendation';
import { Wine as WineType } from '@/data/models/Wine';

const WineBotAI = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    recommendations, 
    sendMessage, 
    isLoading
  } = useWineBotChat();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages, recommendations, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading) return;
    
    sendMessage(userInput.trim());
    setUserInput('');
  };
  
  return (
    <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-noir-light overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Bot className="h-5 w-5 text-wine" />
        <h2 className="text-lg font-medium">Wine Sommelier AI</h2>
      </div>
      
      <ScrollArea 
        className="h-[500px] p-4" 
        ref={chatContainerRef}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="space-y-4">
          {/* Welcome message */}
          <WineBotMessage
            message="Ciao! Sono il tuo Sommelier AI personale. Dimmi che piatto stai preparando e ti suggerirò il vino perfetto dalla tua cantina."
            isBot={true}
          />
          
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              <WineBotMessage
                message={msg.text}
                isBot={msg.isBot}
              />
              
              {/* Show wine recommendations after bot messages */}
              {msg.isBot && recommendations.length > 0 && index === messages.length - 1 && (
                <div className="ml-10 mt-3 space-y-3">
                  <p className="text-sm text-white/70 mb-2">
                    Ecco i vini consigliati dalla tua cantina:
                  </p>
                  {recommendations.map((wine, idx) => (
                    <WineRecommendation 
                      key={wine.id} 
                      wine={wine} 
                      matchScore={wine.matchScore || 0}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          
          {isLoading && (
            <WineBotMessage
              message="Sto cercando il vino perfetto per te..."
              isBot={true}
              isLoading={true}
            />
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
        <div className="relative">
          <Textarea
            placeholder="Descrivi il piatto che stai preparando..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="min-h-12 pr-16 bg-noir border-white/10 resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            size="icon" 
            className="absolute right-2 bottom-2 bg-wine hover:bg-wine/80"
            disabled={userInput.trim() === '' || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WineBotAI;
