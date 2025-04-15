
interface ResizeHandlesProps {
  imageUrl: string | null;
}

const ResizeHandles = ({ imageUrl }: ResizeHandlesProps) => {
  if (!imageUrl) return null;
  
  return (
    <>
      {/* Controllo di zoom migliorato - ancora più grande e visibile */}
      <div 
        className="resize-control absolute w-24 h-24 bg-wine/80 rounded-full bottom-8 right-8 cursor-se-resize transform translate-x-1/2 translate-y-1/2 border-4 border-white flex items-center justify-center touch-manipulation z-30"
        data-direction="corner"
        style={{ 
          touchAction: 'none',
          boxShadow: '0 0 15px rgba(255,255,255,0.6)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
        <span className="absolute -top-12 right-0 bg-noir-dark/95 px-3 py-2 rounded text-sm text-white whitespace-nowrap border border-white/30 shadow-lg">
          Trascina per ridimensionare
        </span>
      </div>
      
      {/* Bordo di ridimensionamento */}
      <div className="absolute inset-0 border-2 border-wine/70 pointer-events-none" />
    </>
  );
};

export default ResizeHandles;
