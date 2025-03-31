
import React from 'react';
import { Wine } from 'lucide-react';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className="md:hidden absolute top-4 left-4 z-20 p-2 bg-noir-light rounded-full border border-white/10"
    >
      <Wine className={`h-5 w-5 text-wine transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
    </button>
  );
};

export default SidebarToggle;
