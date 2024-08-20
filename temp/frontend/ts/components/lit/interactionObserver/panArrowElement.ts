import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SignalWatcher, Signal } from '@lit-labs/preact-signals';

@customElement('pan-arrow-element')
export class PanArrowElement extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      contain: strict;
      transform: translateZ(0);
    }
    .arrow {
      fill: url(#arrow-gradient);
      filter: drop-shadow(0 0 3px rgba(0,0,0,0.3));
      opacity: 0.4;
      mask-image: linear-gradient(
        90deg,
        transparent 0%,
        transparent var(--arrow-transparent-size, 10%),
        rgba(0, 0, 0, 0.3) var(--arrow-semi-transparent-size, 20%),
        rgba(0, 0, 0, 0.7) var(--arrow-visible-start, 30%),
        black 100%
      );
    }
  `;

  @property({ type: Object })
  panMoveSignal!: Signal<{ startX: number; startY: number; currentX: number; currentY: number } | null>;

  @property({ type: Number })
  deadZoneRadius = 20; // Radius of the dead zone in pixels

  render() {
    const panMove = this.panMoveSignal.value;
    if (!panMove) return html``;

    const { startX, startY, currentX, currentY } = panMove;
    const dx = currentX - startX;
    const dy = currentY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Check if the pan distance is within the dead zone
    if (length <= this.deadZoneRadius) {
      return html``; // Don't render the arrow if within the dead zone
    }

    const angle = Math.atan2(dy, dx);

    // Adjust the arrow length to account for the dead zone
    const adjustedLength = length - this.deadZoneRadius;

    const baseWidth = Math.min(20, adjustedLength / 10 + 10);
    const tipWidth = Math.min(5, baseWidth / 2);
    const tipLength = Math.min(20, adjustedLength / 4);

    // Calculate gradient stops based on adjusted arrow length
    const transparentSize = Math.min(25, Math.max(10, 30 - (adjustedLength / 10))) + '%';
    const semiTransparentSize = (parseFloat(transparentSize) + Math.min(15, Math.max(5, 20 - (adjustedLength / 20)))) + '%';
    const visibleStart = (parseFloat(semiTransparentSize) + Math.min(15, Math.max(5, 20 - (adjustedLength / 20)))) + '%';

    const arrowPath = `
      M 0,${-baseWidth/2}
      L ${adjustedLength-tipLength},${-tipWidth}
      L ${adjustedLength-tipLength},${-tipWidth*2}
      L ${adjustedLength},0
      L ${adjustedLength-tipLength},${tipWidth*2}
      L ${adjustedLength-tipLength},${tipWidth}
      L 0,${baseWidth/2}
      Z
    `;

    const centerX = this.getBoundingClientRect().width / 2;
    const centerY = this.getBoundingClientRect().height / 2;
    // Adjust the transform to account for the dead zone
    const transform = `translate(${centerX + this.deadZoneRadius * Math.cos(angle)} ${centerY + this.deadZoneRadius * Math.sin(angle)}) rotate(${angle * (180 / Math.PI)})`;

    return html`
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff4500;" />
            <stop offset="100%" style="stop-color:#ffa500;" />
          </linearGradient>
        </defs>
        <path
          class="arrow"
          d="${arrowPath}"
          transform="${transform}"
          style="--arrow-transparent-size: ${transparentSize};
                 --arrow-semi-transparent-size: ${semiTransparentSize};
                 --arrow-visible-start: ${visibleStart};"
        />
      </svg>
    `;
  }
}
