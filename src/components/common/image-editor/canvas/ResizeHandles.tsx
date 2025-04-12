
interface ResizeHandlesProps {
  imageUrl: string | null;
}

const ResizeHandles = ({ imageUrl }: ResizeHandlesProps) => {
  if (!imageUrl) return null;
  
  return (
    <>
      {/* Resize handles with improved visibility and touchability */}
      <div 
        className="resize-handle absolute w-6 h-6 bg-wine rounded-full top-2 left-2 cursor-nwse-resize transform -translate-x-1/2 -translate-y-1/2 border-2 border-white flex items-center justify-center"
        data-corner="top-left"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div 
        className="resize-handle absolute w-6 h-6 bg-wine rounded-full top-2 right-2 cursor-nesw-resize transform translate-x-1/2 -translate-y-1/2 border-2 border-white flex items-center justify-center"
        data-corner="top-right"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div 
        className="resize-handle absolute w-6 h-6 bg-wine rounded-full bottom-2 left-2 cursor-nesw-resize transform -translate-x-1/2 translate-y-1/2 border-2 border-white flex items-center justify-center"
        data-corner="bottom-left"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div 
        className="resize-handle absolute w-6 h-6 bg-wine rounded-full bottom-2 right-2 cursor-nwse-resize transform translate-x-1/2 translate-y-1/2 border-2 border-white flex items-center justify-center" 
        data-corner="bottom-right"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      {/* Resize border */}
      <div className="absolute inset-0 border-2 border-wine pointer-events-none" />
    </>
  );
};

export default ResizeHandles;
