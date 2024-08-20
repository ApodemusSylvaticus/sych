import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { DeviceStateDispatch } from 'ts/statePub/deviceStateDispatch';
import { create, cssomSheet } from 'twind';

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

interface TileParams {
  x: number;
  y: number;
  z: number;
}

interface Target {
  id: string;
  lon: number;
  lat: number;
}

@customElement('target-list-by-tile')
export class TargetListByTile extends LitElement {
  static styles = [sheet.target];

  private deviceState: DeviceStateDispatch;

  @property({ type: Array }) targets: Target[] = [];
  @state() private tileParams: TileParams = { x: 0, y: 0, z: 0 };

  constructor() {
    super();
    this.deviceState = new DeviceStateDispatch();
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeLRFSignal();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.deviceState.destroy();
  }

  private initializeLRFSignal() {
    this.deviceState.lrf.subscribe((value) => {
      if (value !== undefined) {
        this.fetchTargets();
      }
    });
  }

  async fetchTargets() {
    try {
      const { x, y, z } = this.tileParams;
      const response = await fetch(`https://sych.app/api/targets/targets-by-tile/${x}/${y}/${z}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedTargets = await response.json();
      this.targets = [...fetchedTargets]; // Create a new array to trigger update
      this.requestUpdate(); // Explicitly request an update
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  }

  render() {
    const containerClasses = tw`p-4 bg-white rounded-lg shadow-md`;
    const titleClasses = tw`text-2xl font-bold mb-4 text-gray-800`;
    const formClasses = tw`mb-4 p-4 bg-gray-100 rounded-md`;
    const inputContainerClasses = tw`flex items-center mb-2`;
    const labelClasses = tw`w-20 font-medium text-gray-700`;
    const inputClasses = tw`w-24 p-1 border rounded`;
    const buttonClasses = tw`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors`;
    const targetsContainerClasses = tw`mt-4 space-y-4`;
    const targetItemClasses = tw`p-3 bg-gray-50 rounded-md shadow`;
    const targetPropertyClasses = tw`mb-1 text-sm`;

    return html`
      <div class=${containerClasses}>
        <h2 class=${titleClasses}>Targets by Tile</h2>
        <form class=${formClasses} @submit=${this.handleSubmit}>
          ${['x', 'y', 'z'].map(param => html`
            <div class=${inputContainerClasses}>
              <label class=${labelClasses} for=${param}>${param.toUpperCase()}:</label>
              <input class=${inputClasses} type="number" id=${param} .value=${this.tileParams[param as keyof TileParams]} @input=${this.handleInputChange}>
            </div>
          `)}
          <button class=${buttonClasses} type="submit">Fetch Targets</button>
        </form>
        <div class=${targetsContainerClasses}>
          ${this.targets.length ? html`
            ${repeat(this.targets, (target) => target.id, (target) => html`
              <div class=${targetItemClasses}>
                <div class=${targetPropertyClasses}>ID: ${target.id}</div>
                <div class=${targetPropertyClasses}>Longitude: ${target.lon}</div>
                <div class=${targetPropertyClasses}>Latitude: ${target.lat}</div>
              </div>
            `)}
          ` : html`
            <p>No targets found for this tile.</p>
          `}
        </div>
      </div>
    `;
  }

  private handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const param = target.id as keyof TileParams;
    this.tileParams = { ...this.tileParams, [param]: Number(target.value) };
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.fetchTargets();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'target-list-by-tile': TargetListByTile;
  }
}