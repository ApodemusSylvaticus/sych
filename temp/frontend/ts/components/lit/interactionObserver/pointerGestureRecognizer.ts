import { GestureEvent } from './pointerGestureEvents';

enum GestureState {
  Idle,
  Pending,
  Panning,
  Zooming
}

interface PointerData {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
}

interface Resolution {
  width: number;
  height: number;
}

export class PointerGestureRecognizer {
  private element: HTMLElement;
  private onGesture: (event: GestureEvent) => void;

  private gestureState: GestureState = GestureState.Idle;
  private activePointers: Map<number, PointerData> = new Map();
  private longPressTimeout: number | null = null;
  private initialDistance: number | null = null;
  private isPanStarted: boolean = false;

  constructor(
    element: HTMLElement,
    onGesture: (event: GestureEvent) => void,
    private moveThreshold: number = 10,
    private tapLongPressThreshold: number = 300,
    private zoomThreshold: number = 0.01
  ) {
    this.element = element;
    this.onGesture = onGesture;
    this.setupInteractions();
  }

  public destroy(): void {
    this.removeEventListeners();
    this.resetGestureState();
  }

  private getResolutionAndAspectRatio(): { resolution: Resolution; aspectRatio: number } {
    const rect = this.element.getBoundingClientRect();
    const resolution = {
      width: rect.width,
      height: rect.height
    };
    const aspectRatio = resolution.width / resolution.height;
    return { resolution, aspectRatio };
  }

  private setupInteractions(): void {
    this.element.addEventListener('pointerdown', this.handlePointerDown, { passive: false });
    this.element.addEventListener('pointermove', this.handlePointerMove, { passive: false });
    this.element.addEventListener('pointerup', this.handlePointerUp, { passive: false });
    this.element.addEventListener('pointercancel', this.handlePointerCancel, { passive: false });
    this.element.addEventListener('click', this.preventDefault, { passive: false });
    this.element.addEventListener('contextmenu', this.preventDefault, { passive: false });
    this.element.addEventListener('touchstart', this.preventDefault, { passive: false });
    this.element.addEventListener('touchmove', this.preventDefault, { passive: false });
    this.element.addEventListener('touchend', this.preventDefault, { passive: false });
    this.element.oncontextmenu = this.handleContextMenu;
    this.element.style.touchAction = 'none';
    this.element.style.userSelect = 'none';
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('pointerdown', this.handlePointerDown);
    this.element.removeEventListener('pointermove', this.handlePointerMove);
    this.element.removeEventListener('pointerup', this.handlePointerUp);
    this.element.removeEventListener('pointercancel', this.handlePointerCancel);
    this.element.removeEventListener('click', this.preventDefault);
    this.element.removeEventListener('contextmenu', this.preventDefault);
    this.element.removeEventListener('touchstart', this.preventDefault);
    this.element.removeEventListener('touchmove', this.preventDefault);
    this.element.removeEventListener('touchend', this.preventDefault);
    this.element.oncontextmenu = null;
  }

  private preventDefault = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  private handleContextMenu = (): boolean => {
    return false;
  };

  private handlePointerDown = (event: PointerEvent): void => {
    this.preventDefault(event);

    const pointer: PointerData = {
      id: event.pointerId,
      startX: event.pageX,
      startY: event.pageY,
      currentX: event.pageX,
      currentY: event.pageY,
      startTime: Date.now()
    };

    this.activePointers.set(event.pointerId, pointer);
    this.element.setPointerCapture(event.pointerId);

    if (this.activePointers.size === 1) {
      this.transitionToState(GestureState.Pending);
      this.startLongPressTimeout(pointer);
    } else if (this.activePointers.size === 2) {
      this.transitionToState(GestureState.Zooming);
      this.initialDistance = this.getDistance();
    }
  };

  private handlePointerMove = (event: PointerEvent): void => {
    this.preventDefault(event);
    const pointer = this.activePointers.get(event.pointerId);
    if (!pointer) return;

    pointer.currentX = event.pageX;
    pointer.currentY = event.pageY;

    const distance = Math.hypot(pointer.currentX - pointer.startX, pointer.currentY - pointer.startY);
    const elapsedTime = Date.now() - pointer.startTime;

    if (this.gestureState === GestureState.Zooming) {
      this.handleZoom();
    } else if (this.gestureState === GestureState.Panning) {
      this.handlePan(pointer);
    } else if (this.gestureState === GestureState.Pending) {
      if (distance > this.moveThreshold) {
        this.clearLongPressTimeout();
        if (elapsedTime >= this.tapLongPressThreshold) {
          this.transitionToState(GestureState.Panning);
          this.startPan(pointer);
        }
      }
    }
  };

  private handlePointerUp = (event: PointerEvent): void => {
    this.preventDefault(event);
    this.finalizeGesture(event);
    this.activePointers.delete(event.pointerId);
    this.element.releasePointerCapture(event.pointerId);

    if (this.activePointers.size === 0) {
      this.resetGestureState();
    }
  };

  private handlePointerCancel = this.handlePointerUp;

  private startPan(pointer: PointerData): void {
    const rect = this.element.getBoundingClientRect();
    const ndcX = (pointer.startX - rect.left) / rect.width * 2 - 1;
    const ndcY = -((pointer.startY - rect.top) / rect.height) * 2 + 1;
    const { resolution, aspectRatio } = this.getResolutionAndAspectRatio();

    this.onGesture({
      type: 'panStart',
      x: pointer.startX,
      y: pointer.startY,
      ndcX,
      ndcY,
      resolution,
      aspectRatio
    });
    this.isPanStarted = true;
  }

  private handlePan(pointer: PointerData): void {
    if (!this.isPanStarted) {
      this.startPan(pointer);
    }
    const deltaX = pointer.currentX - pointer.startX;
    const deltaY = pointer.currentY - pointer.startY;
    const rect = this.element.getBoundingClientRect();
    const ndcDeltaX = deltaX / rect.width * 2;
    const ndcDeltaY = -deltaY / rect.height * 2;
    const { resolution, aspectRatio } = this.getResolutionAndAspectRatio();

    this.onGesture({
      type: 'panMove',
      deltaX,
      deltaY,
      ndcDeltaX,
      ndcDeltaY,
      x: pointer.currentX,
      y: pointer.currentY,
      xDelta: deltaX,
      yDelta: deltaY,
      resolution,
      aspectRatio
    });
  }

  private handleZoom(): void {
    if (this.initialDistance === null) return;

    const currentDistance = this.getDistance();
    const zoomChange = (currentDistance - this.initialDistance) / this.initialDistance;

    if (Math.abs(zoomChange) >= this.zoomThreshold) {
      if (zoomChange > 0) {
        this.onGesture({ type: 'zoomIn' });
      } else {
        this.onGesture({ type: 'zoomOut' });
      }
      this.initialDistance = currentDistance;
    }
  }

  private finalizeGesture(event: PointerEvent): void {
    const pointer = this.activePointers.get(event.pointerId);
    if (!pointer) return;

    const distance = Math.hypot(pointer.currentX - pointer.startX, pointer.currentY - pointer.startY);
    const elapsedTime = Date.now() - pointer.startTime;

    if (this.gestureState === GestureState.Pending) {
      if (distance <= this.moveThreshold && elapsedTime < this.tapLongPressThreshold) {
        const rect = this.element.getBoundingClientRect();
        const ndcX = (pointer.startX - rect.left) / rect.width * 2 - 1;
        const ndcY = -((pointer.startY - rect.top) / rect.height) * 2 + 1;
        const { resolution, aspectRatio } = this.getResolutionAndAspectRatio();
        this.onGesture({
          type: 'tap',
          x: pointer.startX,
          y: pointer.startY,
          ndcX,
          ndcY,
          resolution,
          aspectRatio
        });
      } else if (elapsedTime < this.tapLongPressThreshold) {
        this.handleSwipe(pointer);
      }
    } else if (this.gestureState === GestureState.Panning) {
      this.onGesture({ type: 'panStop' });
    }

    this.clearLongPressTimeout();
  }

  private handleSwipe(pointer: PointerData): void {
    const deltaX = pointer.currentX - pointer.startX;
    const deltaY = pointer.currentY - pointer.startY;
    const angle = Math.atan2(deltaY, deltaX);
    let direction: 'up' | 'down' | 'left' | 'right';

    if (angle > -Math.PI/4 && angle <= Math.PI/4) direction = 'right';
    else if (angle > Math.PI/4 && angle <= 3*Math.PI/4) direction = 'down';
    else if (angle > 3*Math.PI/4 || angle <= -3*Math.PI/4) direction = 'left';
    else direction = 'up';

    this.onGesture({ type: 'swipe', direction });
  }

  private handleLongPress = (pointer: PointerData): void => {
    if (this.gestureState === GestureState.Pending) {
      this.transitionToState(GestureState.Panning);
      this.startPan(pointer);
    }
  }

  private getDistance(): number {
    const pointers = Array.from(this.activePointers.values());
    if (pointers.length < 2) return 0;
    const [p1, p2] = pointers;
    return Math.hypot(p2.currentX - p1.currentX, p2.currentY - p1.currentY);
  }

  private startLongPressTimeout(pointer: PointerData): void {
    this.clearLongPressTimeout();
    this.longPressTimeout = window.setTimeout(() => this.handleLongPress(pointer), this.tapLongPressThreshold);
  }

  private clearLongPressTimeout(): void {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = null;
    }
  }

  private transitionToState(newState: GestureState): void {
    if (this.gestureState === newState) return;

    // Clean up previous state
    if (this.gestureState === GestureState.Pending) {
      this.clearLongPressTimeout();
    } else if (this.gestureState === GestureState.Panning) {
      this.isPanStarted = false;
    } else if (this.gestureState === GestureState.Zooming) {
      this.initialDistance = null;
    }

    // Set up new state
    this.gestureState = newState;
  }

  private resetGestureState(): void {
    this.transitionToState(GestureState.Idle);
    this.activePointers.clear();
    this.clearLongPressTimeout();
    this.initialDistance = null;
    this.isPanStarted = false;
  }
}