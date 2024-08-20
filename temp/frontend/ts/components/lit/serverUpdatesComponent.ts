import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { DeviceStateDispatch } from 'ts/statePub/deviceStateDispatch';
import { repeat } from 'lit/directives/repeat.js';

interface Update {
  timestamp: number;
  value: any;
}

@customElement('server-updates')
export class ServerUpdatesComponent extends LitElement {
  private deviceState: DeviceStateDispatch;

  @state()
  private updates: Map<string, Update[]> = new Map();

  constructor() {
    super();
    this.deviceState = new DeviceStateDispatch();
    this.initializeSignals();
  }

  private initializeSignals() {
    const signals = [
      { name: 'System', signal: this.deviceState.system },
      { name: 'LRF', signal: this.deviceState.lrf },
      { name: 'Time', signal: this.deviceState.time },
      { name: 'GPS', signal: this.deviceState.gps },
      { name: 'Compass', signal: this.deviceState.compass },
      { name: 'Rotary', signal: this.deviceState.rotary },
      { name: 'Power', signal: this.deviceState.power },
      { name: 'Camera Day', signal: this.deviceState.cameraDay },
      { name: 'Camera Heat', signal: this.deviceState.cameraHeat },
      { name: 'Compass Calibration', signal: this.deviceState.compassCalibration },
      { name: 'Environment', signal: this.deviceState.environment },
    ];

    signals.forEach(({ name, signal }) => {
      signal.subscribe((value) => {
        if (value !== undefined) {
          this.addUpdate(name, value);
        }
      });
    });
  }

  private addUpdate(name: string, value: any) {
    const update: Update = {
      timestamp: Date.now(),
      value: value
    };

    if (!this.updates.has(name)) {
      this.updates.set(name, []);
    }
    const updatesForName = this.updates.get(name)!;
    updatesForName.unshift(update);
    this.updates = new Map(this.updates);  // Create a new Map to trigger update
    this.requestUpdate();
  }

  render() {
    return html`
      ${repeat(
        Array.from(this.updates.entries()),
        ([name, _]) => name,
        ([name, updates]) => html`
          <foldable-card .title="${`${name} (${updates.length} updates)`}">
            ${repeat(
              updates,
              (update) => update.timestamp,
              (update) => html`
                <div class="update-entry">
                  <p>Timestamp: ${new Date(update.timestamp).toLocaleString()}</p>
                  <syntax-hl lang="json">${JSON.stringify(update.value, null, 2)}</syntax-hl>
                </div>
              `
            )}
          </foldable-card>
        `
      )}
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.deviceState.destroy();
  }
}