import { LitElement, html, css, svg, SVGTemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { extractSVGFriendlyPanels, ProxiesConfig, SVGFriendlyPanel } from './proxySerializationUtils';
import { theme } from 'twind/css';
import {
  tw,
  overlayBackground,
  overlayBorder,
  buttonShadow
} from '../themes/defaultTheme';

@customElement('svg-layout-preview')
export class SVGLayoutPreview extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      contain: strict;
      pointer-events: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  @state() private svgContent: SVGTemplateResult = svg``;
  private resizeObserver: ResizeObserver | null = null;

  render() {
    return html`${this.svgContent}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardownResizeObserver();
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') {
      console.warn('ResizeObserver is not supported in this browser. The SVG layout preview may not resize correctly.');
      return;
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === this) {
          this.updateSVGContent(entry.contentRect.width, entry.contentRect.height);
          break;
        }
      }
    });
    this.resizeObserver.observe(this);
  }

  private teardownResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  public updateLayout(serializedProxies: string) {
    const width = this.clientWidth;
    const height = this.clientHeight;
    this.updateSVGContent(width, height, serializedProxies);
  }

  private updateSVGContent(width: number, height: number, serializedProxies?: string) {
    if (!serializedProxies) {
      this.svgContent = svg``;
      return;
    }

    const panels = extractSVGFriendlyPanels(serializedProxies);
    const config: ProxiesConfig = JSON.parse(serializedProxies);

    const aspectRatio = width / height;
    let svgWidth, svgHeight;

    if (aspectRatio > 1) {
      svgWidth = 100;
      svgHeight = 100 / aspectRatio;
    } else {
      svgHeight = 100;
      svgWidth = 100 * aspectRatio;
    }

    const background = tw`${overlayBackground}`;

    // Sort panels by z-index in ascending order (lowest z-index first)
    panels.sort((a, b) => a.zIndex - b.zIndex);

    this.svgContent = svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}">
        <defs>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
            <feOffset dx="0.5" dy="0.5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="${svgWidth}" height="${svgHeight}" fill="${background}" />
        ${panels.map((panel, index) => this.renderPanel(panel, svgWidth, svgHeight, index, panels.length))}
      </svg>
    `;

    this.requestUpdate();
  }

  private renderPanel(
    panel: SVGFriendlyPanel,
    svgWidth: number,
    svgHeight: number,
    index: number,
    totalPanels: number
  ) {
    const baseColor = tw`${theme('colors.panel.bgActive')}`;
    const border = tw`${overlayBorder}`;

    // Scale panel coordinates and dimensions
    const scaledX = panel.x * (svgWidth / 100);
    const scaledY = panel.y * (svgHeight / 100);
    const scaledWidth = panel.width * (svgWidth / 100);
    const scaledHeight = panel.height * (svgHeight / 100);

    // Calculate opacity for the darkening layer
    // We use a logarithmic scale to make the darkening more subtle as layers increase
    const maxDarkening = 0.2; // Maximum darkening effect
    const darkeningFactor = Math.log(index + 1) / Math.log(totalPanels);
    const layerOpacity = maxDarkening * darkeningFactor;

    return svg`
      <g>
        ${index > 0 ? svg`
          <rect
            x="${scaledX}"
            y="${scaledY}"
            width="${scaledWidth}"
            height="${scaledHeight}"
            fill="black"
            opacity="${layerOpacity}"
          />
        ` : ''}
        <rect
          x="${scaledX}"
          y="${scaledY}"
          width="${scaledWidth}"
          height="${scaledHeight}"
          fill="${baseColor}"
          stroke="${border}"
          stroke-width="0.5"
          filter="url(#dropShadow)"
        />
      </g>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'svg-layout-preview': SVGLayoutPreview;
  }
}