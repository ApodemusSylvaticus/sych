import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SignalWatcher, Signal } from '@lit-labs/preact-signals';

@customElement('pan-start-circle-element')
export class PanStartCircleElement extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      contain: strict;
    }
    .start-circle {
      fill: rgba(255, 69, 0, 0.3);
      stroke: rgba(255, 69, 0, 0.5);
      stroke-width: 2;
    }
  `;

  @property({ type: Object })
  panStartSignal!: Signal<{ x: number; y: number; ndcX: number; ndcY: number } | null>;

  render() {
    const panStart = this.panStartSignal.value;
    if (!panStart) return html``;

    // Convert NDC coordinates to viewport percentages
    const viewportX = (panStart.ndcX + 1) / 2 * 100;
    const viewportY = (-panStart.ndcY + 1) / 2 * 100;

    return html`
      <svg width="100%" height="100%">
        <circle
          class="start-circle"
          cx="${viewportX}%"
          cy="${viewportY}%"
          r="10"
        />
      </svg>
    `;
  }
}
