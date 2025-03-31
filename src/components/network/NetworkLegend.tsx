
import React from 'react';

interface NetworkLegendItem {
  color: string;
  label: string;
}

interface NetworkLegendProps {
  items: NetworkLegendItem[];
  description?: string;
}

const NetworkLegend: React.FC<NetworkLegendProps> = ({ items, description }) => {
  return (
    <div className="mt-8 mb-12">
      <h4 className="text-wine text-sm uppercase tracking-wide mb-3">Legenda</h4>
      <div className="flex items-center flex-wrap gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
            <span className="text-white/70 text-sm">{item.label}</span>
          </div>
        ))}
      </div>
      {description && (
        <p className="text-white/50 text-xs mt-4">
          {description}
        </p>
      )}
    </div>
  );
};

export default NetworkLegend;
