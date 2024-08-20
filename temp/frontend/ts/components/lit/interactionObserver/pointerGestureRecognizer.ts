import { GestureEvent } from './pointerGestureEvents';

enum GestureState {
  Idle,
  PotentialGesture,
  Moving,
  Swiping,
  Zooming
}

interface PointerData {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

interface Point {
  x: number;
  y: number;
}

export class PointerGestureRecognizer {
  private element: HTMLElement;
  private onGesture: (event: GestureEvent) => void;

  private gestureState: GestureState = GestureState.Idle;
  private gestureStartTime: number = 0;
  private longPressTimeout: number | null = null;
  private activePointers: Map<number, PointerData> = new Map();
  private initialDistance: number | null = null;
  private panStartedByLongPress: boolean = false;

  constructor(
    element: HTMLElement,
    onGesture: (event: GestureEvent) => void,
    private moveThreshold: number = 100,
    private tapDurationThreshold: number = 200,
    private longPressDurationThreshold: number = 300,
    private swipeVelocityThreshold: number = 0.5,
    private swipeTimeThreshold: number = 300,
    private zoomThreshold: number = 0.1
  ) {
    this.element = element;
    this.onGesture = onGesture;
    this.setupInteractions();
  }

  public destroy(): void {
    this.removeEventListeners();
    this.clearLongPressTimeout();
  }

  private setupInteractions(): void {
    this.element.addEventListener('pointerdown', this.handlePointerDown);
    this.element.addEventListener('pointermove', this.handlePointerMove);
    this.element.addEventListener('pointerup', this.handlePointerUp);
    this.element.addEventListener('pointercancel', this.handlePointerCancel);
    this.element.addEventListener('pointerleave', this.handlePointerLeave);
    this.element.addEventListener('pointerout', this.handlePointerOut);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('pointerdown', this.handlePointerDown);
    this.element.removeEventListener('pointermove', this.handlePointerMove);
    this.element.removeEventListener('pointerup', this.handlePointerUp);
    this.element.removeEventListener('pointercancel', this.handlePointerCancel);
    this.element.removeEventListener('pointerleave', this.handlePointerLeave);
    this.element.removeEventListener('pointerout', this.handlePointerOut);
  }

  private handlePointerDown = (event: PointerEvent): void => {
    event.preventDefault();
    if (event.button !== 0) return;

    this.activePointers.set(event.pointerId, {
      id: event.pointerId,
      startX: event.pageX,
      startY: event.pageY,
      currentX: event.pageX,
      currentY: event.pageY
    });

    if (this.activePointers.size === 1) {
      this.gestureStartTime = Date.now();
      this.gestureState = GestureState.PotentialGesture;
      this.startLongPressTimeout(event);
    } else if (this.activePointers.size === 2) {
      this.clearLongPressTimeout();
      this.gestureState = GestureState.Zooming;
      this.initialDistance = this.calculateDistanceBetweenFirstTwoPointers();
    }
  };

  private handlePointerMove = (event: PointerEvent): void => {
    event.preventDefault();
    const pointer = this.activePointers.get(event.pointerId);
    if (!pointer) return;

    pointer.currentX = event.pageX;
    pointer.currentY = event.pageY;

    if (!this.isPointerWithinElement(event)) {
      this.handlePointerExit(event);
      return;
    }

    if (this.gestureState === GestureState.PotentialGesture || this.gestureState === GestureState.Moving) {
      this.handlePan(event);
    }
  };

  private handlePointerUp = (event: PointerEvent): void => {
    event.preventDefault();
    this.finalizeGesture(event);
    this.activePointers.delete(event.pointerId);
  };

  private handlePointerCancel = (event: PointerEvent): void => {
    event.preventDefault();
    this.finalizeGesture(event);
    this.activePointers.delete(event.pointerId);
  };

  private handlePointerLeave = (event: PointerEvent): void => {
    event.preventDefault();
    this.handlePointerExit(event);
  };

  private handlePointerOut = (event: PointerEvent): void => {
    event.preventDefault();
    if (!this.element.contains(event.relatedTarget as Node) || event.target === this.element) {
      this.handlePointerExit(event);
    }
  };

  private handlePointerExit(event: PointerEvent): void {
    if (this.activePointers.has(event.pointerId)) {
      const fakePointerUpEvent = new PointerEvent('pointerup', event);
      this.handlePointerUp(fakePointerUpEvent);
    }
  }

  private isPointerWithinElement(event: PointerEvent): boolean {
    const rect = this.element.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  }

  private handlePan(event: PointerEvent): void {
    const pointer = this.activePointers.get(event.pointerId);
    if (!pointer) return;

    const distance = Math.hypot(pointer.currentX - pointer.startX, pointer.currentY - pointer.startY);
    const timeSinceStart = Date.now() - this.gestureStartTime;

    if (this.panStartedByLongPress || distance > this.moveThreshold) {
      this.clearLongPressTimeout();

      if (this.gestureState === GestureState.PotentialGesture) {
        this.gestureState = timeSinceStart < this.swipeTimeThreshold ? GestureState.Swiping : GestureState.Moving;
        if (this.gestureState === GestureState.Moving) {
          this.onGesture({ type: 'panStart', x: pointer.startX, y: pointer.startY });
        }
      }

      if (this.gestureState === GestureState.Moving) {
        const deltaX = pointer.currentX - pointer.startX;
        const deltaY = pointer.currentY - pointer.startY;
        this.onGesture({ type: 'panMove', deltaX, deltaY });
      }
    }
  }

  private finalizeGesture(event: PointerEvent): void {
    this.clearLongPressTimeout();
    this.panStartedByLongPress = false;

    if (this.gestureState === GestureState.Zooming) {
      if (this.activePointers.size < 2 && this.initialDistance !== null) {
        const finalDistance = this.calculateDistanceBetweenFirstTwoPointers();
        const zoomChange = Math.abs(finalDistance - this.initialDistance) / this.initialDistance;

        if (zoomChange >= this.zoomThreshold) {
          if (finalDistance > this.initialDistance) {
            this.onGesture({ type: 'zoomOut' });
          } else {
            this.onGesture({ type: 'zoomIn' });
          }
        }
        this.resetGestureState();
      }
      return;
    }

    const pointer = this.activePointers.get(event.pointerId);
    if (!pointer) return;

    const duration = Date.now() - this.gestureStartTime;
    const distance = Math.hypot(pointer.currentX - pointer.startX, pointer.currentY - pointer.startY);
    const velocity = distance / duration;

    if (this.gestureState === GestureState.PotentialGesture && duration < this.tapDurationThreshold) {
      this.onGesture({ type: 'tap', x: pointer.currentX, y: pointer.currentY });
    } else if (this.gestureState === GestureState.Moving) {
      this.onGesture({ type: 'panStop' });
    } else if (this.gestureState === GestureState.Swiping || velocity > this.swipeVelocityThreshold) {
      this.handleSwipe(pointer);
    }

    if (this.activePointers.size === 0) {
      this.resetGestureState();
    }
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

  private handleLongPress = (event: PointerEvent): void => {
    if (this.gestureState === GestureState.PotentialGesture) {
      this.panStartedByLongPress = true;
      this.gestureState = GestureState.Moving;
      this.onGesture({ type: 'panStart', x: event.pageX, y: event.pageY });
    }
  }

  private calculateDistanceBetweenFirstTwoPointers(): number {
    const pointers = Array.from(this.activePointers.values());
    if (pointers.length < 2) return 0;

    const [p1, p2] = pointers;
    return Math.hypot(p2.currentX - p1.currentX, p2.currentY - p1.currentY);
  }

  private startLongPressTimeout(event: PointerEvent): void {
    this.clearLongPressTimeout();
    this.longPressTimeout = window.setTimeout(() => this.handleLongPress(event), this.longPressDurationThreshold);
  }

  private clearLongPressTimeout(): void {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = null;
    }
  }

  private resetGestureState(): void {
    this.gestureState = GestureState.Idle;
    this.initialDistance = null;
    this.panStartedByLongPress = false;
  }
}