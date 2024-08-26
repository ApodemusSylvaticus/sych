import { VideoProxyElement } from 'ts/components/lit/videoProxyElement/videoProxyElement';
import { VideoProxyOptions } from './proxySerializationUtils';

export interface MergedState {
  proxies: { [key: string]: any };
  metadata: { [key: string]: any };
}

export class ProxyManager {
  private proxies: Map<string, VideoProxyElement> = new Map();
  private metadata: { [key: string]: any } = {};
  private stateUpdateCallbacks: ((state: MergedState) => void)[] = [];

  constructor(private parent: any) {}

  async addVideoProxy(name: string, options: Partial<VideoProxyOptions> = {}): Promise<void> {
    if (this.proxies.has(name)) {
      console.warn(`Video proxy with name "${name}" already exists. Updating instead.`);
      // Update existing proxy if needed
      return;
    }

    const proxyElement = document.createElement('video-proxy-element') as VideoProxyElement;
    // Set up the proxy element with the provided options
    Object.assign(proxyElement, options);

    // Instead of appending to parentElement, we'll add it to our map
    this.proxies.set(name, proxyElement);

    // Notify state update
    this.notifyStateUpdate();
  }

  removeVideoProxy(name: string): void {
    const proxy = this.proxies.get(name);
    if (proxy) {
      this.proxies.delete(name);
      // Notify state update
      this.notifyStateUpdate();
    }
  }

  getVideoProxy(name: string): VideoProxyElement | undefined {
    return this.proxies.get(name);
  }

  updateMetadata(key: string, value: any): void {
    this.metadata[key] = value;
    this.notifyStateUpdate();
  }

  getMetadata(key: string): any {
    return this.metadata[key];
  }

  serializeProxies(): string {
    const serializedState = {
      proxies: Object.fromEntries(this.proxies),
      metadata: this.metadata
    };
    return JSON.stringify(serializedState);
  }

  deserializeProxies(json: string): void {
    const parsedState = JSON.parse(json);
    this.proxies = new Map(Object.entries(parsedState.proxies));
    this.metadata = parsedState.metadata;
    this.notifyStateUpdate();
  }

  onMergedStateUpdated(callback: (state: MergedState) => void): void {
    this.stateUpdateCallbacks.push(callback);
  }

  private notifyStateUpdate(): void {
    const state: MergedState = {
      proxies: Object.fromEntries(this.proxies),
      metadata: this.metadata
    };
    this.stateUpdateCallbacks.forEach(callback => callback(state));
  }

  cleanup(): void {
    this.proxies.clear();
    this.metadata = {};
    this.stateUpdateCallbacks = [];
  }
}
