import { CanvasManager, ChannelType } from 'js/canvasManager';
import { InteractionMode } from '../panelElement/panelElement';
import { Alignment } from "../aspectRatioElement/aspectRatioInteractiveTypes";
import { ProxyManager, MergedState } from './proxyManager';
import { VideoProxyOptions } from './proxySerializationUtils';
import { NDCPosition } from "../interactionObserver/ndcPosition.ts";
import { GestureEvent } from "../interactionObserver/pointerGestureEvents.ts";
import { LayoutManager, Layout, LayoutConfig } from './layoutManager.ts';
import { InteractionHandler } from './interactionHandler';
import { DeviceStateDispatch } from 'ts/statePub/deviceStateDispatch';

export class StreamViewManager {
  private canvasManager: CanvasManager;
  private proxyManager: ProxyManager;
  private layoutManager: LayoutManager;
  private interactionHandlers: Map<string, InteractionHandler> = new Map();
  private positionObservers: Map<string, () => void> = new Map();
  private isDestroyed: boolean = false;

  constructor(private canvasId: string, private shadowRoot: ShadowRoot, private host: HTMLElement, private dsd: DeviceStateDispatch) {
    this.canvasManager = new CanvasManager(canvasId, shadowRoot);
    this.proxyManager = new ProxyManager(host);
    this.layoutManager = new LayoutManager(this.canvasManager);
  }

  async initialize(): Promise<void> {
    try {
      await this.canvasManager.initWorker();
      await this.layoutManager.initialize();
      await this.setupInitialLayout();
    } catch (err) {
      console.error('Error initializing StreamViewManager:', err);
      throw err;
    }
  }

  public async reinitialize(): Promise<void> {
    this.isDestroyed = false;
    this.canvasManager = new CanvasManager(this.canvasId, this.shadowRoot);
    this.proxyManager = new ProxyManager(this.host);
    this.layoutManager = new LayoutManager(this.canvasManager);
    this.interactionHandlers.clear();
    await this.initialize();
  }

  private async setupInitialLayout(): Promise<void> {
    await this.canvasManager.ready;
    this.applyLayout(this.layoutManager.getCurrentLayout());
  }

  private applyLayout(layout: Layout): void {
    const config = this.layoutManager.setLayout(layout);
    this.removeAllVideoQuadsAndProxies();

    Object.entries(config).forEach(([name, options]) => {
      this.createVideoQuadAndProxy(name, options);
    });

    this.onLayoutChanged(layout);
  }

  private removeAllVideoQuadsAndProxies(): void {
    this.canvasManager.video_quad_destroy('day');
    this.canvasManager.video_quad_destroy('heat');

    this.proxyManager.removeAllVideoProxies();

    this.positionObservers.forEach(unsubscribe => unsubscribe());
    this.positionObservers.clear();

    this.interactionHandlers.forEach(handler => handler.destroy());
    this.interactionHandlers.clear();
  }

  private createVideoQuadAndProxy(name: string, options: VideoProxyOptions): void {
    const channelType = this.layoutManager.getChannelType(name);
    this.canvasManager.video_quad_create(name, channelType, this.layoutManager.convertToQuadConfig(options));

    this.proxyManager.addVideoProxy(name, options);

    let proxy = this.proxyManager.getVideoProxy(name);

    const interactionHandler = new InteractionHandler(name, channelType, this.handleSwipe.bind(this), this.dsd);
    this.interactionHandlers.set(name, interactionHandler);

    proxy!.interaction.subscribe((inter: GestureEvent | null) => {
      if (inter) {
        interactionHandler.handleInteraction(inter);
      }
    });

    this.observeNDCPosition(name);
  }

  private handleSwipe(direction: 'up' | 'down' | 'left' | 'right', source: string, channelType: ChannelType): void {
    if (direction === "left") {
      this.previousLayout();
    } else if (direction === "right") {
      this.nextLayout();
    }
  }

  private observeNDCPosition(name: string): void {
    const proxy = this.proxyManager.getVideoProxy(name);
    if (proxy) {
      const unsubscribe = proxy.videoPosition.subscribe((position: NDCPosition | null) => {
        if (position) {
          this.updateQuadPosition(name, position);
        }
      });
      this.positionObservers.set(name, unsubscribe);
    }
  }

  private updateQuadPosition(name: string, position: NDCPosition): void {
    const quadConfig = this.layoutManager.convertToQuadConfig({
      ndcX: position.x,
      ndcY: position.y,
      ndcWidth: position.width,
      ndcHeight: position.height,
      zIndex: 0,
      mode: InteractionMode.Fixed,
      debug: false,
      aspectRatio: 1,
      align: Alignment.Center
    });
    this.canvasManager.video_quad_update(name, quadConfig);
  }

  nextLayout(): void {
    const nextLayoutConfig = this.layoutManager.nextLayout();
    this.applyLayout(this.layoutManager.getCurrentLayout());
  }

  previousLayout(): void {
    const prevLayoutConfig = this.layoutManager.previousLayout();
    this.applyLayout(this.layoutManager.getCurrentLayout());
  }

  serializeProxies(): string {
    return this.proxyManager.serializeProxies();
  }

  deserializeProxies(json: string): void {
    this.proxyManager.deserializeProxies(json);
    this.setupAllPositionObservers();
  }

  private setupAllPositionObservers(): void {
    this.positionObservers.forEach(unsubscribe => unsubscribe());
    this.positionObservers.clear();
    this.proxyManager.getAllProxyNames().forEach(name => {
      this.observeNDCPosition(name);
    });
  }

  onMergedStateUpdated(callback: (state: MergedState) => void): void {
    this.proxyManager.onMergedStateUpdated(callback);
  }

  private onLayoutChanged(layout: Layout): void {
    console.log('Layout changed to:', Layout[layout]);
  }

  destroy(): void {
    this.canvasManager.destroy();
    this.proxyManager.cleanup();
    this.positionObservers.forEach(unsubscribe => unsubscribe());
    this.positionObservers.clear();
    this.interactionHandlers.forEach(handler => handler.destroy());
    this.interactionHandlers.clear();
    this.isDestroyed = true;
  }

  // Public methods to expose LayoutManager functionality
  getLayoutNames(): string[] {
    return this.layoutManager.getLayoutNames();
  }

  setLayoutByName(name: string): void {
    const layout = this.layoutManager.getLayoutByName(name);
    if (layout !== undefined) {
      this.applyLayout(layout);
    } else {
      console.error(`Layout '${name}' not found.`);
    }
  }

  addCustomLayout(name: string, config: LayoutConfig): void {
    this.layoutManager.addCustomLayout(name, config);
  }

  removeLayout(name: string): boolean {
    const layout = this.layoutManager.getLayoutByName(name);
    if (layout !== undefined) {
      return this.layoutManager.removeLayout(layout);
    }
    return false;
  }

  updateLayoutConfig(name: string, newConfig: LayoutConfig): void {
    const layout = this.layoutManager.getLayoutByName(name);
    if (layout !== undefined) {
      this.layoutManager.updateLayoutConfig(layout, newConfig);
    } else {
      console.error(`Layout '${name}' not found.`);
    }
  }

  getCurrentLayout(): Layout {
    return this.layoutManager.getCurrentLayout();
  }
}