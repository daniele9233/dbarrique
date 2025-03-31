
import React from 'react';

interface NetworkHeaderProps {
  title: string;
  description: string;
}

const NetworkHeader: React.FC<NetworkHeaderProps> = ({ title, description }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl text-white mb-2">{title}</h1>
      <p className="text-white/60">
        {description}
      </p>
    </div>
  );
};

export default NetworkHeader;
