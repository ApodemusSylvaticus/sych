import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './alignmentButtonOverlay';
import { Alignment } from './aspectRatioInteractiveTypes';

@customElement('aspect-ratio-interactive-element')
export class AspectRatioInteractiveElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transform: translateZ(0);
    }
    .content-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }
    .slot-wrapper {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .button-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .button-overlay > * {
      pointer-events: auto;
    }
    .edit-mode {
      cursor: move;
    }
  `;

  @property({ type: Number }) zIndex = 0;
  @property({ type: String }) aspectRatio: string | number = 'auto';
  @property({ type: String }) align: Alignment = Alignment.Center;
  @property({ type: Boolean }) editMode = false;

  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this);
    this.handleAlignmentChanged = this.handleAlignmentChanged.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  protected firstUpdated(): void {
    this.updatePositionAndSize();

    // Dispatch the alignment-changed event immediately
    this.dispatchEvent(new CustomEvent('alignment-changed', {
      detail: { alignment: this.align },
      bubbles: true,
      composed: true
    }));

    // Use requestAnimationFrame to ensure the event is fired after the first paint
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent('alignment-changed', {
        detail: { alignment: this.align },
        bubbles: true,
        composed: true
      }));
    });
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('aspectRatio') ||
        changedProperties.has('align') ||
        changedProperties.has('zIndex')) {
      this.updatePositionAndSize();
    }
    super.updated(changedProperties);
  }

  private updatePositionAndSize(): void {
    const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper') as HTMLElement;
    if (!contentWrapper) return;

    const { width: hostWidth, height: hostHeight } = this.getBoundingClientRect();
    const { width, height } = this.calculateSize(hostWidth, hostHeight);
    const { left, top } = this.calculatePosition(width, height, hostWidth, hostHeight);

    contentWrapper.style.width = `${width}px`;
    contentWrapper.style.height = `${height}px`;
    contentWrapper.style.transform = `translate(${left}px, ${top}px)`;

    this.style.zIndex = this.zIndex.toString();
  }

  private calculateSize(hostWidth: number, hostHeight: number): { width: number; height: number } {
    if (this.aspectRatio === 'auto') {
      return { width: hostWidth, height: hostHeight };
    }

    const aspectRatio = typeof this.aspectRatio === 'number' ? this.aspectRatio : parseFloat(this.aspectRatio);
    const hostAspectRatio = hostWidth / hostHeight;

    if (hostAspectRatio > aspectRatio) {
      const height = hostHeight;
      const width = height * aspectRatio;
      return { width, height };
    } else {
      const width = hostWidth;
      const height = width / aspectRatio;
      return { width, height };
    }
  }

  private calculatePosition(width: number, height: number, hostWidth: number, hostHeight: number): { left: number; top: number } {
    const positions = {
      [Alignment.TopLeft]: { left: 0, top: 0 },
      [Alignment.Top]: { left: (hostWidth - width) / 2, top: 0 },
      [Alignment.TopRight]: { left: hostWidth - width, top: 0 },
      [Alignment.Left]: { left: 0, top: (hostHeight - height) / 2 },
      [Alignment.Center]: { left: (hostWidth - width) / 2, top: (hostHeight - height) / 2 },
      [Alignment.Right]: { left: hostWidth - width, top: (hostHeight - height) / 2 },
      [Alignment.BottomLeft]: { left: 0, top: hostHeight - height },
      [Alignment.Bottom]: { left: (hostWidth - width) / 2, top: hostHeight - height },
      [Alignment.BottomRight]: { left: hostWidth - width, top: hostHeight - height },
    };

    return positions[this.align] || positions[Alignment.Center];
  }

  render() {
    return html`
      <div class="content-wrapper ${this.editMode ? 'edit-mode' : ''}" @pointerdown=${this.handlePointerDown}>
        <div class="slot-wrapper">
          <slot></slot>
        </div>
        ${this.editMode ? this.renderAlignmentOverlay() : ''}
      </div>
    `;
  }

  private renderAlignmentOverlay() {
    return html`
      <div class="button-overlay">
        <alignment-button-overlay
          .align=${this.align}
          .onAlignmentChange=${this.handleAlignmentChanged}
        ></alignment-button-overlay>
      </div>
    `;
  }

  private handleAlignmentChanged(newAlignment: Alignment) {
    if (this.align !== newAlignment) {
      this.align = newAlignment;
      this.updatePositionAndSize();

      // Dispatch a custom event for alignment change
      this.dispatchEvent(new CustomEvent('alignment-changed', {
        detail: { alignment: newAlignment },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handlePointerDown(e: PointerEvent) {
    if (!(e.target as HTMLElement).closest('alignment-button-overlay')) {
      this.dispatchEvent(new PointerEvent('pointerdown', e));
    }
  }

  private handleResize() {
    this.updatePositionAndSize();
  }
}
