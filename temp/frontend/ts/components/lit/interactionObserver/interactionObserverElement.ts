import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Signal, signal } from '@lit-labs/preact-signals';
import { NDCPosition } from './ndcPosition';
import { GestureEvent } from './pointerGestureEvents';
import { PointerGestureRecognizer } from './pointerGestureRecognizer';

export type GestureEventNDC =
  | { type: 'swipe'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'panStart'; x: number; y: number; ndcX: number; ndcY: number }
  | { type: 'panMove'; deltaX: number; deltaY: number; ndcDeltaX: number; ndcDeltaY: number }
  | { type: 'panStop' }
  | { type: 'tap'; x: number; y: number; ndcX: number; ndcY: number }
  | { type: 'doubleTap'; x: number; y: number; ndcX: number; ndcY: number }
  | { type: 'zoomIn' }
  | { type: 'zoomOut' };

@customElement('interaction-observer-element')
export class InteractionObserverElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      border: 2px solid #ff00ff;
      background-color: rgba(255, 0, 255, 0.1);
      box-sizing: border-box;
    }
  `;

  @property({ type: Number }) moveThreshold = 100;
  @property({ type: Number }) tapDurationThreshold = 200;
  @property({ type: Number }) longPressDurationThreshold = 300;
  @property({ type: Number }) swipeVelocityThreshold = 0.5;
  @property({ type: Number }) swipeTimeThreshold = 300;
  @property({ type: Number }) zoomThreshold = 1.1;
  @property({ type: Number }) doubleTapThreshold = 300;
  @property({ type: Boolean }) debugVisible = false;
  @property({ type: Number }) eventDebounceThreshold = 50; // ms

  private positionSignal: Signal<NDCPosition | null>;
  private interactionSignal: Signal<GestureEventNDC | null>;
  private frameCount: number = 0;
  private animationFrameId: number | null = null;
  private lastPosition: NDCPosition = { x: 0, y: 0, width: 0, height: 0 };
  private gestureRecognizer: PointerGestureRecognizer | null = null;
  private lastTapTime: number = 0;
  private lastTapPosition: { x: number, y: number } | null = null;
  private tapTimer: number | null = null;
  private boundHandleWheel: (e: WheelEvent) => void;
  private lastEventTime: number = 0;
  private lastEventType: string | null = null;

  constructor() {
    super();
    this.positionSignal = signal(null);
    this.interactionSignal = signal(null);
    this.boundHandleWheel = this.handleWheel.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.startUpdateLoop();
    this.setupInteractions();
    this.addEventListener('wheel', this.boundHandleWheel, { passive: false });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopUpdateLoop();
    this.teardownInteractions();
    this.removeEventListener('wheel', this.boundHandleWheel);
    this.positionSignal.value = null;
    this.interactionSignal.value = null;
  }

  updated(): void {
    this.updateDebugVisibility();
  }

  private updateDebugVisibility(): void {
    if (this.debugVisible) {
      this.style.border = '2px solid #ff00ff';
      this.style.backgroundColor = 'rgba(255, 0, 255, 0.1)';
    } else {
      this.style.border = 'none';
      this.style.backgroundColor = 'transparent';
    }
  }

  private startUpdateLoop(): void {
    const update = () => {
      this.frameCount++;
      if (this.frameCount % 10 === 0) {
        this.checkAndUpdatePosition();
      }
      this.animationFrameId = requestAnimationFrame(update);
    };
    this.animationFrameId = requestAnimationFrame(update);
  }

  private stopUpdateLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private checkAndUpdatePosition(): void {
    const rect = this.getBoundingClientRect();
    const { width: screenWidth, height: screenHeight } = document.documentElement.getBoundingClientRect();

    const ndcX = (rect.left / screenWidth) * 2 - 1;
    const ndcY = -(rect.top / screenHeight) * 2 + 1;
    const ndcWidth = rect.width / screenWidth;
    const ndcHeight = rect.height / screenHeight;

    const newPosition: NDCPosition = { x: ndcX, y: ndcY, width: ndcWidth, height: ndcHeight };

    if (this.hasPositionChanged(newPosition)) {
      this.lastPosition = newPosition;
      this.positionSignal.value = newPosition;
    }
  }

  private hasPositionChanged(newPosition: NDCPosition): boolean {
    const epsilon = 0.0001;
    return (
      Math.abs(newPosition.x - this.lastPosition.x) > epsilon ||
      Math.abs(newPosition.y - this.lastPosition.y) > epsilon ||
      Math.abs(newPosition.width - this.lastPosition.width) > epsilon ||
      Math.abs(newPosition.height - this.lastPosition.height) > epsilon
    );
  }

  private pageToNDC(pageX: number, pageY: number): { ndcX: number, ndcY: number } {
    const rect = this.getBoundingClientRect();
    const ndcX = ((pageX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((pageY - rect.top) / rect.height) * 2 + 1;
    return { ndcX, ndcY };
  }

  private pixelToNDCDelta(deltaX: number, deltaY: number): { ndcDeltaX: number, ndcDeltaY: number } {
    const rect = this.getBoundingClientRect();
    const ndcDeltaX = (deltaX / rect.width) * 2;
    const ndcDeltaY = -(deltaY / rect.height) * 2;
    return { ndcDeltaX, ndcDeltaY };
  }

  private setupInteractions(): void {
    this.gestureRecognizer = new PointerGestureRecognizer(
      this,
      this.handleGesture.bind(this),
      this.moveThreshold,
      this.tapDurationThreshold,
      this.longPressDurationThreshold,
      this.swipeVelocityThreshold,
      this.swipeTimeThreshold,
      this.zoomThreshold
    );
  }

  private teardownInteractions(): void {
    if (this.gestureRecognizer) {
      this.gestureRecognizer.destroy();
      this.gestureRecognizer = null;
    }
  }

  private handleGesture(event: GestureEvent): void {
    let ndcEvent: GestureEventNDC;

    switch (event.type) {
      case 'tap':
        const { ndcX, ndcY } = this.pageToNDC(event.x, event.y);
        ndcEvent = { type: 'tap', x: event.x, y: event.y, ndcX, ndcY };
        this.handleTap(ndcEvent);
        break;
      case 'panStart':
        const { ndcX: startNdcX, ndcY: startNdcY } = this.pageToNDC(event.x, event.y);
        ndcEvent = { type: 'panStart', x: event.x, y: event.y, ndcX: startNdcX, ndcY: startNdcY };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
      case 'panMove':
        const { ndcDeltaX, ndcDeltaY } = this.pixelToNDCDelta(event.deltaX, event.deltaY);
        ndcEvent = { type: 'panMove', deltaX: event.deltaX, deltaY: event.deltaY, ndcDeltaX, ndcDeltaY };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
      case 'swipe':
        ndcEvent = { type: 'swipe', direction: event.direction };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
      case 'panStop':
        ndcEvent = { type: 'panStop' };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
      case 'zoomIn':
      case 'zoomOut':
        ndcEvent = { type: event.type };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
    }
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    const { deltaY } = e;
    const eventType: 'zoomIn' | 'zoomOut' = deltaY < 0 ? 'zoomIn' : 'zoomOut';
    const event: GestureEventNDC = { type: eventType };
    this.emitEvent(event);
  }

  private handleTap(event: GestureEventNDC & { type: 'tap' }): void {
    const currentTime = Date.now();

    if (this.lastTapTime && currentTime - this.lastTapTime < this.doubleTapThreshold &&
        this.lastTapPosition &&
        Math.abs(this.lastTapPosition.x - event.x) < 10 &&
        Math.abs(this.lastTapPosition.y - event.y) < 10) {
      // Double tap detected
      const doubleTapEvent: GestureEventNDC = {
        type: 'doubleTap',
        x: event.x,
        y: event.y,
        ndcX: event.ndcX,
        ndcY: event.ndcY
      };
      this.emitEvent(doubleTapEvent);
      this.lastTapTime = 0;
      this.lastTapPosition = null;
      if (this.tapTimer) {
        clearTimeout(this.tapTimer);
        this.tapTimer = null;
      }
    } else {
      // First tap
      this.lastTapTime = currentTime;
      this.lastTapPosition = { x: event.x, y: event.y };

      // Set a timer for potential double tap
      this.tapTimer = window.setTimeout(() => {
        // If timer expires, it's a single tap
        this.emitEvent(event);
        this.lastTapTime = 0;
        this.lastTapPosition = null;
        this.tapTimer = null;
      }, this.doubleTapThreshold);
    }
  }

  private cancelPotentialDoubleTap(): void {
    if (this.tapTimer) {
      clearTimeout(this.tapTimer);
      this.tapTimer = null;
    }
    if (this.lastTapTime && this.lastTapPosition) {
      const { ndcX, ndcY } = this.pageToNDC(this.lastTapPosition.x, this.lastTapPosition.y);
      this.emitEvent({
        type: 'tap',
        x: this.lastTapPosition.x,
        y: this.lastTapPosition.y,
        ndcX,
        ndcY
      });
      this.lastTapTime = 0;
      this.lastTapPosition = null;
    }
  }

  private emitEvent(event: GestureEventNDC): void {
    const currentTime = Date.now();
    if (
      event.type !== this.lastEventType ||
      currentTime - this.lastEventTime > this.eventDebounceThreshold
    ) {
      this.interactionSignal.value = event;
      this.lastEventTime = currentTime;
      this.lastEventType = event.type;
    }
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  get position(): Signal<NDCPosition | null> {
    return this.positionSignal;
  }

  get interaction(): Signal<GestureEventNDC | null> {
    return this.interactionSignal;
  }
}