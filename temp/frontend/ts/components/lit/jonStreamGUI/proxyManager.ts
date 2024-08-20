import { VideoProxyElement } from 'ts/components/lit/videoProxyElement/videoProxyElement';
import { VideoProxyOptions } from './proxySerializationUtils';
import { serializeProxies, deserializeProxies } from './proxySerializationUtils';
import { Alignment } from "ts/components/lit/aspectRatioElement/aspectRatioInteractiveTypes";
import { Signal, signal, computed } from '@preact/signals-core';
import { NDCPosition } from "../interactionObserver/ndcPosition.ts";

export interface PanelPositionUpdate {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface MergedProxyState {
  name: string;
  ndcX: number;
  ndcY: number;
  ndcWidth: number;
  ndcHeight: number;
  mode: string;
  debug: boolean;
  zIndex: number;
  aspectRatio: number | string;
  align: Alignment;
  videoPosition: NDCPosition | null;
  panelPosition: PanelPositionUpdate | null;
  lifecycle: "mounted" | "unmounted" | "firstUpdated" | null;
}

export interface MergedState {
  proxies: { [key: string]: MergedProxyState };
  metadata: { [key: string]: any };
}

export class ProxyManager {
  private videoProxies = signal<Map<string, VideoProxyElement>>(new Map());
  private metadata = signal<{ [key: string]: any }>({});

  private mergedState = computed<MergedState>(() => {
    const proxies: { [key: string]: MergedProxyState } = {};

    this.videoProxies.value.forEach((proxy, name) => {
      proxies[name] = {
        name,
        ndcX: proxy.ndcX,
        ndcY: proxy.ndcY,
        ndcWidth: proxy.ndcWidth,
        ndcHeight: proxy.ndcHeight,
        mode: proxy.mode,
        debug: proxy.debug,
        zIndex: proxy.zIndex,
        aspectRatio: proxy.aspectRatio,
        align: proxy.align,
        videoPosition: proxy.videoPosition.value,
        panelPosition: proxy.panelPosition.value,
        lifecycle: proxy.lifecycle.value as "mounted" | "unmounted" | "firstUpdated" | null
      };
    });

    return {
      proxies,
      metadata: this.metadata.value
    };
  });

  constructor(private parentElement: HTMLElement) {}

  addVideoProxy(name: string, options: Partial<VideoProxyOptions> = {}): VideoProxyElement {
    const defaultOptions: VideoProxyOptions = {
      ndcX: 0.0,
      ndcY: 0.5,
      ndcWidth: 0.4,
      ndcHeight: 0.4,
      mode: "resizable",
      debug: true,
      zIndex: 10,
      aspectRatio: 16/9,
      align: Alignment.Center
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const videoProxy = new VideoProxyElement();
    videoProxy.name = name;
    Object.assign(videoProxy, mergedOptions);

    this.parentElement.appendChild(videoProxy);

          this.videoProxies.value = new Map(this.videoProxies.value).set(name, videoProxy);
          this.subscribeToProxySignals(name, videoProxy);

    return videoProxy;
  }

  removeVideoProxy(name: string): void {
    const videoProxy = this.videoProxies.value.get(name);
    if (videoProxy) {
      this.parentElement.removeChild(videoProxy);
      const newProxies = new Map(this.videoProxies.value);
      newProxies.delete(name);
      this.videoProxies.value = newProxies;
    }
  }

  removeAllVideoProxies(): void {
    this.videoProxies.value.forEach((_, name) => {
      this.removeVideoProxy(name);
    });
  }

  getAllProxyNames(): string[] {
    return Array.from(this.videoProxies.value.keys());
  }

  getVideoProxy(name: string): VideoProxyElement | undefined {
    return this.videoProxies.value.get(name);
  }

  private subscribeToProxySignals(name: string, proxy: VideoProxyElement): void {
    const updateProxies = () => this.videoProxies.value = new Map(this.videoProxies.value);
    proxy.videoPosition.subscribe(updateProxies);
    proxy.panelPosition.subscribe(updateProxies);
    proxy.interaction.subscribe(updateProxies);
    proxy.lifecycle.subscribe(updateProxies);
  }

  serializeProxies(): string {
    return serializeProxies(this.videoProxies.value, this.metadata.value);
  }

  deserializeProxies(json: string): void {
    try {
      const config = deserializeProxies(json);

      // Clear existing proxies
      this.videoProxies.value.forEach((_, name) => {
        this.removeVideoProxy(name);
      });

      // Add new proxies from the config
      Object.entries(config.proxies).forEach(([name, options]) => {
        this.addVideoProxy(name, options as VideoProxyOptions);
      });

      // Handle metadata
      this.metadata.value = config.metadata;

    } catch (error) {
      console.error('Error applying deserialized proxies:', error);
      throw new Error('Failed to apply deserialized proxies configuration');
    }
  }

  updateMetadata(key: string, value: any): void {
    this.metadata.value = { ...this.metadata.value, [key]: value };
  }

  getMetadata(key: string): any {
    return this.metadata.value[key];
  }

  cleanup(): void {
    this.videoProxies.value.forEach((_, name) => {
      this.removeVideoProxy(name);
    });
  }

  // Method for subscribing to merged state updates
  onMergedStateUpdated(callback: (state: MergedState) => void): () => void {
    return this.mergedState.subscribe(callback);
  }
}