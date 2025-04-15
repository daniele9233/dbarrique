
interface ResizeHandlesProps {
  imageUrl: string | null;
}

const ResizeHandles = ({ imageUrl }: ResizeHandlesProps) => {
  if (!imageUrl) return null;
  
  return (
    <>
      {/* Controllo di zoom migliorato - ancora più grande e visibile */}
      <div 
        className="resize-control absolute w-20 h-20 bg-wine/90 rounded-full bottom-6 right-6 cursor-se-resize transform translate-x-1/2 translate-y-1/2 border-2 border-white flex items-center justify-center touch-manipulation z-30 animate-pulse"
        data-direction="corner"
        style={{ touchAction: 'none' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
        <span className="absolute -top-7 right-0 bg-noir-dark/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
          Trascina per ridimensionare
        </span>
      </div>
      
      {/* Info box per istruzioni - mostrato sempre */}
      <div className="absolute bottom-4 left-4 bg-noir/90 p-2 rounded text-xs text-white/80 max-w-xs">
        <p>• Doppio tap/click per centrare</p>
        <p>• Trascina per spostare</p>
        <p>• Usa l'angolo per ridimensionare</p>
      </div>
      
      {/* Bordo di ridimensionamento */}
      <div className="absolute inset-0 border-2 border-wine/70 pointer-events-none" />
    </>
  );
};

export default ResizeHandles;
