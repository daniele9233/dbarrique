
interface ResizeHandlesProps {
  imageUrl: string | null;
}

const ResizeHandles = ({ imageUrl }: ResizeHandlesProps) => {
  if (!imageUrl) return null;
  
  return (
    <>
      {/* Maniglie di ridimensionamento con migliore visibilità e accessibilità touch */}
      <div 
        className="resize-handle absolute w-8 h-8 bg-wine/80 rounded-full top-2 left-2 cursor-nwse-resize transform -translate-x-1/2 -translate-y-1/2 border-2 border-white flex items-center justify-center touch-manipulation z-20"
        data-corner="top-left"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div 
        className="resize-handle absolute w-8 h-8 bg-wine/80 rounded-full top-2 right-2 cursor-nesw-resize transform translate-x-1/2 -translate-y-1/2 border-2 border-white flex items-center justify-center touch-manipulation z-20"
        data-corner="top-right"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div 
        className="resize-handle absolute w-8 h-8 bg-wine/80 rounded-full bottom-2 left-2 cursor-nesw-resize transform -translate-x-1/2 translate-y-1/2 border-2 border-white flex items-center justify-center touch-manipulation z-20"
        data-corner="bottom-left"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div 
        className="resize-handle absolute w-8 h-8 bg-wine/80 rounded-full bottom-2 right-2 cursor-nwse-resize transform translate-x-1/2 translate-y-1/2 border-2 border-white flex items-center justify-center touch-manipulation z-20" 
        data-corner="bottom-right"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      {/* Bordo di ridimensionamento */}
      <div className="absolute inset-0 border-2 border-wine/70 pointer-events-none" />
    </>
  );
};

export default ResizeHandles;
