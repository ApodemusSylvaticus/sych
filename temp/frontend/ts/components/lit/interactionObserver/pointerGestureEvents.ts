export type GestureEvent =
  | { type: 'swipe'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'panStart'; x: number; y: number }
  | { type: 'panMove'; deltaX: number; deltaY: number }
  | { type: 'panStop' }
  | { type: 'tap'; x: number; y: number }
  | { type: 'zoomIn' }
  | { type: 'zoomOut' };