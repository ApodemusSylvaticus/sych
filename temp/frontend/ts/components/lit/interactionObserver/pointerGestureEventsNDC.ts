export type GestureEventNDC =
  | { type: 'swipe'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'panStart'; x: number; y: number; ndcX: number; ndcY: number }
  | { type: 'panMove'; deltaX: number; deltaY: number; ndcDeltaX: number; ndcDeltaY: number }
  | { type: 'panStop' }
  | { type: 'tap'; x: number; y: number; ndcX: number; ndcY: number }
  | { type: 'doubleTap'; x: number; y: number; ndcX: number; ndcY: number }
  | { type: 'zoomIn' }
  | { type: 'zoomOut' };
