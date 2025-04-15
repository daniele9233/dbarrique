
import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Wine } from '@/data/models/Wine';

interface ShareButtonsProps {
  wine: Wine;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ wine }) => {
  const handleWhatsAppShare = () => {
    const text = `Dai un'occhiata a questo vino: ${wine.name} (${wine.year}) - ${wine.winery} - ${wine.region}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleTelegramShare = () => {
    const text = `Dai un'occhiata a questo vino: ${wine.name} (${wine.year}) - ${wine.winery} - ${wine.region}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex space-x-2 mt-4">
      <Button 
        onClick={handleWhatsAppShare}
        variant="outline"
        className="flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] border-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          <path d="M9 10a0.5.5 0 0 0 1 0v-1a0.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a0.5.5 0 0 0 0-1h-1a0.5.5 0 0 0 0 1"></path>
        </svg>
        WhatsApp
      </Button>
      <Button 
        onClick={handleTelegramShare}
        variant="outline"
        className="flex items-center gap-2 bg-[#0088cc] text-white hover:bg-[#0077b5] border-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.5 15-5-12L2 8l10.57 13.12a.5.5 0 0 0 .87-.3L16 14"></path>
          <path d="m2 8 20 8"></path>
          <path d="M16 8v8"></path>
        </svg>
        Telegram
      </Button>
    </div>
  );
};

export default ShareButtons;
