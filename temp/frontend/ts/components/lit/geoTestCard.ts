import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { create, cssomSheet } from 'twind';
import { GeoTestSend } from "ts/cmd/cmdSender/cmdGeoTest.ts";
import { lrfNewSession } from "ts/cmd/cmdSender/cmdLRF.ts";
import { DeviceStateDispatch } from 'ts/statePub/deviceStateDispatch';

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

interface GeoData {
  lrf: {
    range: number | undefined;
  };
  gps: {
    longitude: number | undefined;
    latitude: number | undefined;
    altitude: number | undefined;
  };
  compass: {
    azimuth: number | undefined;
    elevation: number | undefined;
    bank: number | undefined;
  };
}

@customElement('geo-test-card')
export class GeoTestCard extends LitElement {
  static styles = [
    sheet.target,
    css`
      :host {
        display: block;
      }
    `
  ];

  private deviceState: DeviceStateDispatch;

  @state() private geoData: GeoData = {
    lrf: { range: undefined },
    gps: { longitude: undefined, latitude: undefined, altitude: undefined },
    compass: { azimuth: undefined, elevation: undefined, bank: undefined }
  };

  @state() private lastSignalData: GeoData = {
    lrf: { range: undefined },
    gps: { longitude: undefined, latitude: undefined, altitude: undefined },
    compass: { azimuth: undefined, elevation: undefined, bank: undefined }
  };

  @state() private isManuallyEdited: boolean = false;

  constructor() {
    super();
    this.deviceState = DeviceStateDispatch.getInstance();
    this.initializeFromSignals();
  }

  private initializeFromSignals() {
    this.deviceState.lrf.subscribe((lrfData) => {
      if (lrfData) {
        this.lastSignalData.lrf.range = lrfData.target?.rangeA;
        if (!this.isManuallyEdited) {
          this.geoData.lrf.range = lrfData.target?.rangeA;
          this.requestUpdate();
        }
      }
    });

    this.deviceState.gps.subscribe((gpsData) => {
      if (gpsData) {
        this.lastSignalData.gps = {
          longitude: gpsData.longitude,
          latitude: gpsData.latitude,
          altitude: gpsData.altitude
        };
        if (!this.isManuallyEdited) {
          this.geoData.gps = { ...this.lastSignalData.gps };
          this.requestUpdate();
        }
      }
    });

    this.deviceState.compass.subscribe((compassData) => {
      if (compassData) {
        this.lastSignalData.compass = {
          azimuth: compassData.azimuth,
          elevation: compassData.elevation,
          bank: compassData.bank
        };
        if (!this.isManuallyEdited) {
          this.geoData.compass = { ...this.lastSignalData.compass };
          this.requestUpdate();
        }
      }
    });
  }

  render() {
    const containerClasses = tw`bg-white p-6 rounded-lg shadow-md`;
    const titleClasses = tw`text-2xl font-bold mb-6 text-gray-800`;
    const sectionsContainerClasses = tw`space-y-6`;
    const buttonsContainerClasses = tw`flex flex-wrap justify-start gap-3 mt-6`;

    return html`
      <div class="${containerClasses}">
        <h2 class="${titleClasses}">Geo Test Measurements</h2>
        <div class="${sectionsContainerClasses}">
          ${this.renderSection('LRF', this.geoData.lrf)}
          ${this.renderSection('GPS', this.geoData.gps)}
          ${this.renderSection('Compass', this.geoData.compass)}
        </div>
        <div class="${buttonsContainerClasses}">
          ${this.renderButton('Capture target', this.sendGeoTest, 'bg-blue-500 hover:bg-blue-600')}
          ${this.renderButton('New target session', this.newSession, 'bg-green-500 hover:bg-green-600')}
          ${this.renderButton('Refresh geo data', this.refreshFromSignals, 'bg-yellow-500 hover:bg-yellow-600')}
        </div>
      </div>
    `;
  }

  private renderSection(title: string, data: Record<string, number | undefined>) {
    const sectionClasses = tw`bg-gray-50 p-4 rounded-md border border-gray-200`;
    const sectionTitleClasses = tw`text-lg font-semibold mb-3 text-gray-700`;
    const inputsContainerClasses = tw`space-y-3`;

    return html`
      <div class="${sectionClasses}">
        <h3 class="${sectionTitleClasses}">${title}</h3>
        <div class="${inputsContainerClasses}">
          ${Object.entries(data).map(([key, value]) => this.renderInput(title, key, value))}
        </div>
      </div>
    `;
  }

  private renderInput(groupName: string, key: string, value: number | undefined) {
    const inputGroupClasses = tw`flex flex-col`;
    const labelClasses = tw`text-sm font-medium text-gray-600 mb-1`;
    const inputClasses = tw`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;

    return html`
      <div class="${inputGroupClasses}">
        <label for="${groupName}-${key}" class="${labelClasses}">
          ${key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
        <input
          id="${groupName}-${key}"
          class="${inputClasses}"
          .value=${value ?? ''}
          @input=${this.updateGeoData}
          data-group="${groupName.toLowerCase()}"
          data-field="${key}"
        >
      </div>
    `;
  }

  private renderButton(text: string, onClick: () => void, colorClasses: string) {
    const buttonClasses = tw`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses}`;

    return html`
      <button
        @click=${onClick}
        class="${buttonClasses}"
      >
        ${text}
      </button>
    `;
  }

  private updateGeoData(e: Event) {
    const target = e.target as HTMLInputElement;
    const group = target.dataset.group as keyof GeoData;
    const field = target.dataset.field as string;
    const value = target.value === '' ? undefined : Number(target.value);
    this.geoData = {
      ...this.geoData,
      [group]: {
        ...this.geoData[group],
        [field]: value
      }
    };
    this.isManuallyEdited = true;
  }

  private sendGeoTest() {
    const flattenedGeoData = {
      ...this.geoData.lrf,
      ...this.geoData.gps,
      ...this.geoData.compass
    };
    GeoTestSend(flattenedGeoData);
  }

  private newSession() {
    lrfNewSession();
  }

  private refreshFromSignals() {
    this.geoData = JSON.parse(JSON.stringify(this.lastSignalData));
    this.isManuallyEdited = false;
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geo-test-card': GeoTestCard;
  }
}