import { LitElement, html, css } from 'lit';
import { customElement, property, state, queryAsync, query } from 'lit/decorators.js';
import { ActivePanelBaseStyles, tw, sheet } from '../themes/defaultTheme.ts';
import { theme, css as twCss} from 'twind/css';
import {
  NDCCoordinate,
  NDCSize,
  ResizeQuadrant,
  clientToNDC,
  getNDCPixels,
  getValidUpdate,
  determineResizeQuadrant,
  calculateDelta,
  calculateNewSize,
  calculateNewPosition
} from './ndcHelpers';

export type InteractionMode = 'fixed' | 'draggable' | 'resizable';

interface InteractionState {
  isInteracting: boolean;
  startPosition: NDCCoordinate;
  currentPosition: NDCCoordinate;
}

const interactiveStyles = {
  base: tw``,
  draggable: tw`
    ${ActivePanelBaseStyles}
    border-solid border-4
    ${twCss`border-color: ${theme('colors.panel.bgActive')}`}
  `,
  resizable: tw`
    ${ActivePanelBaseStyles}
    border-dotted border-4
    ${twCss`border-color: ${theme('colors.panel.bgActive')}`}
  `,
  hover: tw`shadow-lg`,
};

@customElement('panel-element')
export class PanelElement extends LitElement {
  static styles = [
    sheet.target,
    css`
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        box-sizing: border-box;
        contain: layout size style;
      }
      .content-wrapper {
        position: absolute;
        overflow: visible;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        transform-origin: top left;
        will-change: transform, width, height;
        contain: layout style;
      }
      .slot-wrapper {
        flex-grow: 1;
        width: 100%;
        height: 100%;
      }
    `
  ];

  @property({ type: String }) name = 'Interactive Element';
  @property({ type: Number }) ndcX = 0;
  @property({ type: Number }) ndcY = 0;
  @property({ type: Number }) ndcWidth = 0.2;
  @property({ type: Number }) ndcHeight = 0.2;
  @property({ type: Number }) zIndex = 0;
  @property({ type: String }) mode: InteractionMode = 'fixed';
  @property({ type: Number }) minWidth = 0.0;
  @property({ type: Number }) maxWidth = 2.0;
  @property({ type: Number }) minHeight = 0.0;
  @property({ type: Number }) maxHeight = 2.0;

  @queryAsync('#main-wrapper') private mainWrapperF!: Promise<HTMLDivElement>;
  @query('#main-wrapper', true) private mainWrapper!: HTMLDivElement;

  @queryAsync('#child-wrapper') private childWrapperF!: Promise<HTMLDivElement>;
  @query('#child-wrapper', true) private childWrapper!: HTMLDivElement;

  @state() private ndcPosition: NDCCoordinate = { x: 0, y: 0 };
  @state() private ndcSize: NDCSize = { width: 0.2, height: 0.2 };

  private resizeObserver: ResizeObserver | null = null;
  private resizeQuadrant: ResizeQuadrant = 'topLeft';
  private interactionState: InteractionState = {
    isInteracting: false,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 }
  };
  private initialSize: NDCSize = { width: 0, height: 0 };
  private initialPosition: NDCCoordinate = { x: 0, y: 0 };

  constructor() {
    super();
    this.handleBaseResize = this.handleBaseResize.bind(this);
    this.addEventListener('pointerdown', this.handlePointerDown);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(this.handleBaseResize);
    this.resizeObserver.observe(this);
    this.handleBaseResize();
    this.adjustSizeToConstraints();
    this.updateInteractionStyle();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.removeEventListener('pointerdown', this.handlePointerDown);
    this.removeGlobalListeners();
  }

  protected firstUpdated(): void {
    this.updatePositionAndSize();
    this.mainWrapperF.then((el: HTMLDivElement) => {
      this.updateWrapperClasses(el);
    });
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('ndcX') || changedProperties.has('ndcY') ||
        changedProperties.has('ndcWidth') || changedProperties.has('ndcHeight') ||
        changedProperties.has('zIndex')) {
      this.updatePositionAndSize();
    }
    if (changedProperties.has('mode')) {
      this.updateInteractionStyle();
    }
    super.updated(changedProperties);
  }

  private updatePositionAndSize(): void {
    this.ndcSize = { width: this.ndcWidth, height: this.ndcHeight };
    this.ndcPosition = { x: this.ndcX, y: this.ndcY };
    this.updateContentStyles();
  }

  private updateContentStyles(): void {
    const { left, top, width, height } = this.getNDCPixels();

    let setStyle = (el: HTMLDivElement) => {
      el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
    }

    this.mainWrapper ? setStyle(this.mainWrapper) : this.mainWrapperF.then(setStyle);

    this.style.zIndex = this.zIndex.toString();
  }

  render() {
    return html`
      <div id="main-wrapper" class="content-wrapper">
        <div id="child-wrapper" class="slot-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private handleBaseResize = (): void => {
    this.updatePositionAndSize();
  }

  private getNDCPixels(): { left: number; top: number; width: number; height: number } {
    const { width, height } = this.getBoundingClientRect();
    return getNDCPixels(this.ndcPosition, this.ndcSize, width, height);
  }

  private clientToNDC(clientX: number, clientY: number): NDCCoordinate {
    const { width, height } = this.getBoundingClientRect();
    return clientToNDC(clientX, clientY, width, height);
  }

  private updateNDC(position?: Partial<NDCCoordinate>, size?: Partial<NDCSize>): void {
    const draftPosition: NDCCoordinate = {
      x: position?.x ?? this.ndcPosition.x,
      y: position?.y ?? this.ndcPosition.y
    };
    const draftSize: NDCSize = {
      width: size?.width ?? this.ndcSize.width,
      height: size?.height ?? this.ndcSize.height
    };

    const validUpdate = getValidUpdate(draftPosition, draftSize);

    if (!validUpdate) {
      console.warn('Invalid update rejected:', { position: draftPosition, size: draftSize });
      return;
    }

    this.ndcPosition = validUpdate.position;
    this.ndcSize = validUpdate.size;
    this.ndcX = this.ndcPosition.x;
    this.ndcY = this.ndcPosition.y;
    this.ndcWidth = this.ndcSize.width;
    this.ndcHeight = this.ndcSize.height;

    this.updateContentStyles();
    this.requestUpdate();
  }

  private updateInteractionStyle(): void {
    this.updateCursorStyle();
    this.mainWrapperF.then((el: HTMLDivElement) => {
      this.updateWrapperClasses(el);
    });
  }

  private updateCursorStyle(): void {
    switch (this.mode) {
      case 'fixed':
        this.style.cursor = 'default';
        break;
      case 'draggable':
        this.style.cursor = 'pointer';
        break;
      case 'resizable':
        this.style.cursor = 'move';
        break;
    }
  }

  private updateWrapperClasses(wrapper: HTMLDivElement): void {
    wrapper.classList.remove('interactive-fixed', 'interactive-draggable', 'interactive-resizable');
    wrapper.classList.add(`interactive-${this.mode}`);

    wrapper.className += ' ' + tw`
      ${interactiveStyles.base}
      ${this.mode === 'draggable' ? interactiveStyles.draggable : ''}
      ${this.mode === 'resizable' ? interactiveStyles.resizable : ''}
      hover:${interactiveStyles.hover}
    `;
  }

  private adjustSizeToConstraints(): void {
    const newSize: NDCSize = {
      width: Math.max(this.minWidth, Math.min(this.maxWidth, this.ndcSize.width)),
      height: Math.max(this.minHeight, Math.min(this.maxHeight, this.ndcSize.height))
    };

    if (newSize.width !== this.ndcSize.width || newSize.height !== this.ndcSize.height) {
      this.updateNDC(undefined, newSize);
    }
  }

  private handlePointerDown = (e: PointerEvent): void => {
    const position = this.clientToNDC(e.clientX, e.clientY);
    this.startInteraction(position);
    e.preventDefault();
  }

  private handlePointerMove = (e: PointerEvent): void => {
    const position = this.clientToNDC(e.clientX, e.clientY);
    this.updateInteraction(position);
  }

  private handlePointerUp = (): void => {
    this.endInteraction();
  }

  private startInteraction(position: NDCCoordinate): void {
    if (this.mode !== 'fixed') {
      this.interactionState = {
        isInteracting: true,
        startPosition: position,
        currentPosition: position
      };
      this.initialSize = { ...this.ndcSize };
      this.initialPosition = { ...this.ndcPosition };

      if (this.mode === 'resizable') {
        this.resizeQuadrant = determineResizeQuadrant(position, this.ndcPosition, this.ndcSize);
      }

      this.addGlobalListeners();
    }
  }

  private updateInteraction(position: NDCCoordinate): void {
    if (this.interactionState.isInteracting) {
      this.interactionState.currentPosition = position;

      if (this.mode === 'draggable') {
        this.handleDrag();
      } else if (this.mode === 'resizable') {
        this.handleResize(this.resizeQuadrant);
      }
    }
  }

  private endInteraction(): void {
    if (this.interactionState.isInteracting) {
      this.interactionState.isInteracting = false;
      this.removeGlobalListeners();
    }
  }

  private addGlobalListeners(): void {
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  }

  private removeGlobalListeners(): void {
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  }

  private handleDrag(): void {
    const { dx, dy } = calculateDelta(this.interactionState.currentPosition, this.interactionState.startPosition);
    const newPosition = {
      x: Math.max(-1, Math.min(1 - this.ndcSize.width, this.initialPosition.x + dx)),
      y: Math.max(-1 + this.ndcSize.height, Math.min(1, this.initialPosition.y + dy))
    };
    this.updateNDC(newPosition);
  }

  private handleResize(quadrant: ResizeQuadrant): void {
    const { dx, dy } = calculateDelta(this.interactionState.currentPosition, this.interactionState.startPosition);
    const newSize = calculateNewSize(quadrant, dx, dy, this.initialSize, this.minWidth, this.maxWidth, this.minHeight, this.maxHeight);
    const newPosition = calculateNewPosition(quadrant, this.initialPosition, this.initialSize, newSize.width, newSize.height);
    this.updateNDC(newPosition, newSize);
  }
}