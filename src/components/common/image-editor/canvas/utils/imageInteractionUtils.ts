
// Define interface for TouchPoint to work with React's Touch events
export interface TouchPoint {
  clientX: number;
  clientY: number;
}

// Calculate distance between two points (for pinch zoom)
export const getDistance = (touch1: TouchPoint, touch2: TouchPoint) => {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

// Check if an element is a resize control
export const isResizeControl = (target: HTMLElement | null): boolean => {
  if (!target) return false;
  return Boolean(target.closest('.resize-control'));
};

// Check if an element is a button
export const isButton = (target: HTMLElement | null): boolean => {
  if (!target) return false;
  return Boolean(target.closest('button'));
};
