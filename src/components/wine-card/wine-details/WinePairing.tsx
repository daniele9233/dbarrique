
import React from 'react';

interface WinePairingProps {
  pairing?: string;
}

const WinePairing: React.FC<WinePairingProps> = ({ pairing }) => {
  if (!pairing) return null;
  
  return (
    <div className="bg-noir-light/50 p-4 rounded-lg border border-white/5">
      <h3 className="text-sm text-white/60 uppercase mb-2">Abbinamenti</h3>
      <p className="text-sm text-white/90">{pairing}</p>
    </div>
  );
};

export default WinePairing;
