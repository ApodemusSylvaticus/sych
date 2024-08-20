import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Signal, signal } from '@lit-labs/preact-signals';
import { NDCPosition } from './ndcPosition';
import { GestureEvent } from './pointerGestureEvents';
import { PointerGestureRecognizer } from './pointerGestureRecognizer';
import './gestureVisualizerElement';

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
      pointer-events: auto;
    }
  `;

  @property({ type: Number }) doubleTapThreshold = 300;
  @property({ type: Boolean }) debugVisible = false;
  @property({ type: Number }) zoomDebounceTime = 200;

  private positionSignal: Signal<NDCPosition | null>;
  private interactionSignal: Signal<GestureEvent | null>;
  private frameCount: number = 0;
  private animationFrameId: number | null = null;
  private lastPosition: NDCPosition = { x: 0, y: 0, width: 0, height: 0 };
  private gestureRecognizer: PointerGestureRecognizer | null = null;
  private lastTapTime: number = 0;
  private lastTapPosition: { x: number, y: number } | null = null;
  private tapTimer: number | null = null;
  private zoomTimeout: number | null = null;
  private lastZoomType: 'zoomIn' | 'zoomOut' | null = null;
  private isZooming = false;
  private runUpdateLoop = false;

  constructor() {
    super();
    this.positionSignal = signal(null);
    this.interactionSignal = signal(null);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.startUpdateLoop();
    this.setupInteractions();
    this.addEventListener('wheel', this.handleWheel);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopUpdateLoop();
    this.teardownInteractions();
    this.removeEventListener('wheel', this.handleWheel);
    if (this.zoomTimeout !== null) {
      clearTimeout(this.zoomTimeout);
    }
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
    this.runUpdateLoop = true;
    const update = () => {
      this.frameCount++;
      if (this.frameCount % 10 === 0) {
        this.checkAndUpdatePosition().finally(() => {
          if (this.runUpdateLoop) {
            this.animationFrameId = requestAnimationFrame(update);
          }
        });
      } else {
        this.animationFrameId = requestAnimationFrame(update);
      }
    };

    // First call
    this.animationFrameId = requestAnimationFrame(update);
  }

  private stopUpdateLoop(): void {
    this.runUpdateLoop = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private async checkAndUpdatePosition() {
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

  firstUpdated(): void {
    this.checkAndUpdatePosition().catch((error) => {
        console.error('Error updating position', error);
    });
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
      this.handleGesture.bind(this)
    );
  }

  private teardownInteractions(): void {
    if (this.gestureRecognizer) {
      this.gestureRecognizer.destroy();
      this.gestureRecognizer = null;
    }
  }

  private handleGesture(event: GestureEvent): void {
    let ndcEvent: GestureEvent;

    switch (event.type) {
      case 'tap':
        const { ndcX, ndcY } = this.pageToNDC(event.x, event.y);
        ndcEvent = { ...event, ndcX, ndcY };
        this.handleTap(ndcEvent);
        break;
      case 'panStart':
        const { ndcX: startNdcX, ndcY: startNdcY } = this.pageToNDC(event.x, event.y);
        ndcEvent = { ...event, ndcX: startNdcX, ndcY: startNdcY };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
      case 'panMove':
        const { ndcDeltaX, ndcDeltaY } = this.pixelToNDCDelta(event.deltaX, event.deltaY);
        ndcEvent = { ...event, ndcDeltaX, ndcDeltaY, xDelta: event.deltaX, yDelta: event.deltaY, x: event.x, y: event.y };
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
      case 'panStop':
      case 'swipe':
      case 'zoomIn':
      case 'zoomOut':
        ndcEvent = event;
        this.cancelPotentialDoubleTap();
        this.emitEvent(ndcEvent);
        break;
    }
  }

  private handleTap(event: GestureEvent & { type: 'tap' }): void {
    const currentTime = Date.now();

    if (this.lastTapTime && currentTime - this.lastTapTime < this.doubleTapThreshold &&
        this.lastTapPosition &&
        Math.abs(this.lastTapPosition.x - event.x) < 10 &&
        Math.abs(this.lastTapPosition.y - event.y) < 10) {
      // Double tap detected
      this.emitEvent({ ...event, type: 'doubleTap' } as GestureEvent);
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

  private handleWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY;
    const zoomType = delta < 0 ? 'zoomIn' : 'zoomOut';

    this.debouncedZoom(zoomType);
  }

  private debouncedZoom(zoomType: 'zoomIn' | 'zoomOut') {
    if (this.zoomTimeout !== null) {
      clearTimeout(this.zoomTimeout);
    }

    if (!this.isZooming || zoomType !== this.lastZoomType) {
      this.isZooming = true;
      this.lastZoomType = zoomType;
      this.emitEvent({ type: zoomType });
    }

    this.zoomTimeout = window.setTimeout(() => {
      this.isZooming = false;
      this.lastZoomType = null;
      this.zoomTimeout = null;
    }, this.zoomDebounceTime);
  }

  private emitEvent(event: GestureEvent): void {
    this.interactionSignal.value = event;
  }

  render() {
    return html`
      <div>
        <slot></slot>
        <gesture-visualizer-element .interactionSignal="${this.interactionSignal}"></gesture-visualizer-element>
      </div>
    `;
  }

  get position(): Signal<NDCPosition | null> {
    return this.positionSignal;
  }

  get interaction(): Signal<GestureEvent | null> {
    return this.interactionSignal;
  }
}