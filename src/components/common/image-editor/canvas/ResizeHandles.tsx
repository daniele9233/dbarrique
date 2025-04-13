
interface ResizeHandlesProps {
  imageUrl: string | null;
}

const ResizeHandles = ({ imageUrl }: ResizeHandlesProps) => {
  if (!imageUrl) return null;
  
  return (
    <>
      {/* Controllo di zoom sempificato */}
      <div 
        className="resize-control absolute w-12 h-12 bg-wine/80 rounded-full bottom-4 right-4 cursor-ns-resize transform translate-x-1/2 translate-y-1/2 border-2 border-white flex items-center justify-center touch-manipulation z-30"
        data-direction="vertical"
      >
        <div className="w-6 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* Info box per istruzioni - mostrato solo su desktop */}
      <div className="absolute bottom-4 left-4 bg-noir/90 p-2 rounded text-xs text-white/80 max-w-xs hidden md:block">
        <p>• Doppio click/tap per centrare</p>
        <p>• Trascina per spostare</p>
        <p>• Usa il controllo per ridimensionare</p>
      </div>
      
      {/* Bordo di ridimensionamento */}
      <div className="absolute inset-0 border-2 border-wine/70 pointer-events-none" />
    </>
  );
};

export default ResizeHandles;
