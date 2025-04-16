
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WineBotMessageProps {
  message: string;
  isBot: boolean;
  isLoading?: boolean;
}

const WineBotMessage = ({ message, isBot, isLoading }: WineBotMessageProps) => {
  return (
    <div 
      className={cn(
        "flex gap-3", 
        isBot ? "" : "justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 h-8 w-8 bg-noir rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-wine" />
        </div>
      )}
      
      <div 
        className={cn(
          "rounded-xl p-3 max-w-[80%]",
          isBot 
            ? "bg-noir/50 border border-white/5 text-white/90" 
            : "bg-wine/20 border border-wine/20 text-white ml-auto"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '300ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '600ms' }}></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm">{message}</p>
        )}
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 h-8 w-8 bg-wine/30 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default WineBotMessage;
