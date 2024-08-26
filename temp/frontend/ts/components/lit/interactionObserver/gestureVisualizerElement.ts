import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SignalWatcher, Signal, signal } from '@lit-labs/preact-signals';
import { GestureEvent } from './pointerGestureEvents';
import './panArrowElement';
import './panStartCircleElement';

@customElement('gesture-visualizer-element')
export class GestureVisualizerElement extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2000;
      contain: strict;
    }
  `;

  @property({ type: Object })
  interactionSignal!: Signal<GestureEvent | null>;

  @state()
  private panStartSignal = signal<{ x: number; y: number; ndcX: number; ndcY: number } | null>(null);

  @state()
  private panMoveSignal = signal<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  private panStartX: number = 0;
  private panStartY: number = 0;

  updated() {
    this.processInteraction();
  }

  private processInteraction() {
    const interaction = this.interactionSignal.value;
    if (!interaction) {
      this.resetState();
      return;
    }

    const rect = this.getBoundingClientRect();

    switch (interaction.type) {
      case 'panStart':
        this.panStartX = interaction.x - rect.left;
        this.panStartY = interaction.y - rect.top;
        this.panStartSignal.value = {
          x: this.panStartX,
          y: this.panStartY,
          ndcX: interaction.ndcX,
          ndcY: interaction.ndcY
        };
        break;
      case 'panMove':
        const currentX = interaction.x - rect.left;
        const currentY = interaction.y - rect.top;
        this.panMoveSignal.value = {
          startX: this.panStartX,
          startY: this.panStartY,
          currentX,
          currentY
        };
        break;
      case 'panStop':
        this.resetState();
        break;
    }
  }

  private resetState() {
    this.panStartSignal.value = null;
    this.panMoveSignal.value = null;
    this.panStartX = 0;
    this.panStartY = 0;
  }

  render() {
    return html`
      <pan-start-circle-element .panStartSignal="${this.panStartSignal}"></pan-start-circle-element>
      <pan-arrow-element .panMoveSignal="${this.panMoveSignal}"></pan-arrow-element>
    `;
  }
}
