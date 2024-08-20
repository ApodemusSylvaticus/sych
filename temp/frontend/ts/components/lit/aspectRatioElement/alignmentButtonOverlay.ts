import { LitElement, html, css, svg, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Alignment } from './aspectRatioInteractiveTypes';
import { apply } from 'twind';
import {
  sheet,
  tw,
  overlayContainerStyles,
  buttonBaseStyles,
  buttonHoverStyles,
  buttonActiveStyles,
  iconStyles,
  flexCenter,
  fullSize,
  defaultTransition,
  scaleOnActive,
  sweepLightAnimation,
} from '../themes/defaultTheme.ts';

@customElement('alignment-button-overlay')
export class AlignmentButtonOverlay extends LitElement {
  static styles = [
    sheet.target,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        touch-action: none;
      }
    `
  ];

  @property({ type: String }) align: Alignment = Alignment.Center;
  @state() private highlightedAlignment: Alignment = Alignment.Center;

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('align')) {
      this.highlightedAlignment = this.align;
    }
  }

  render() {
    return html`
      <div class="${tw(overlayContainerStyles)}"
           @pointerdown=${this.handlePointerDown}
           @pointermove=${this.handlePointerMove}
           @pointerup=${this.handlePointerUp}>
        ${this.renderAlignmentButtons()}
      </div>
    `;
  }

  private renderAlignmentButtons() {
    const renderArrow = (direction: string) => svg`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${tw(iconStyles)}">
        <path d="${this.getArrowPath(direction)}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;

    const renderCenter = svg`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${tw(iconStyles)}">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
    </svg>
    `;

    const buttonContentStyles = apply`
      ${flexCenter} ${fullSize} ${defaultTransition}
      relative z-10
    `;

    const renderButton = (alignment: Alignment, icon: unknown) => html`
      <button @pointerdown=${() => this.handleAlignment(alignment)}
              class="${tw`
                ${buttonBaseStyles}
                ${buttonHoverStyles}
                ${this.highlightedAlignment === alignment ? buttonActiveStyles : ''}
                ${sweepLightAnimation}
                ${scaleOnActive}
              `}">
        <div class="${tw(buttonContentStyles)} ${this.highlightedAlignment === alignment ? 'active' : ''}">
          ${icon}
        </div>
      </button>
    `;

    return html`
      ${renderButton(Alignment.TopLeft, renderArrow('top-left'))}
      ${renderButton(Alignment.Top, renderArrow('top'))}
      ${renderButton(Alignment.TopRight, renderArrow('top-right'))}
      ${renderButton(Alignment.Left, renderArrow('left'))}
      ${renderButton(Alignment.Center, renderCenter)}
      ${renderButton(Alignment.Right, renderArrow('right'))}
      ${renderButton(Alignment.BottomLeft, renderArrow('bottom-left'))}
      ${renderButton(Alignment.Bottom, renderArrow('bottom'))}
      ${renderButton(Alignment.BottomRight, renderArrow('bottom-right'))}
    `;
  }

  private getArrowPath(direction: string): string {
    switch (direction) {
      case 'top-left': return 'M17 17L7 7M7 7h10M7 7v10';
      case 'top': return 'M12 19V5M5 12l7-7 7 7';
      case 'top-right': return 'M7 17L17 7M17 7H7M17 7v10';
      case 'left': return 'M19 12H5M12 5l-7 7 7 7';
      case 'right': return 'M5 12h14M12 5l7 7-7 7';
      case 'bottom-left': return 'M17 7L7 17M7 17h10M7 17V7';
      case 'bottom': return 'M12 5v14M5 12l7 7 7-7';
      case 'bottom-right': return 'M7 7l10 10M17 17H7M17 17V7';
      default: return '';
    }
  }

  private handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  private handlePointerMove(e: PointerEvent) {
    e.preventDefault();
  }

  private handlePointerUp(e: PointerEvent) {
    e.preventDefault();
  }

  private handleAlignment(newAlignment: Alignment) {
    this.highlightedAlignment = newAlignment;
    this.dispatchEvent(new CustomEvent('alignment-changed', {
      detail: { alignment: newAlignment },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'alignment-button-overlay': AlignmentButtonOverlay;
  }
}
