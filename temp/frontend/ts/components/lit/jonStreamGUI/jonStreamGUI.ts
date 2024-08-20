import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/preact-signals';
import { WebSocketConnectionManager } from 'js/webSocketConnectionManager';
import { sendCmdPing, sendCmdFrozen } from "ts/cmd/cmdSender/cmdSenderShared";
import { InputDeviceManager } from 'ts/gamepad/GamepadBindings';
import { DeviceStateDispatch } from "ts/statePub/deviceStateDispatch";
import { MergedState } from './proxyManager';
import { StreamViewManager } from './streamViewManager';
import {
  InteractionObserverElement
} from "../interactionObserver/interactionObserverElement.ts";
import {
  GestureEvent
} from "../interactionObserver/pointerGestureEvents.ts";

@customElement('jon-stream-gui')
export class JonStreamGUI extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :host, #main-canvas, #interaction-observer {
      width: 100vw;
      height: 100vh;
      display: block;
      contain: strict;
    }
    #main-canvas {
      pointer-events: none;
      transform: translateZ(0);
    }
    #interaction-observer {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    .error {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: rgba(255, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
    }
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }
  `;

  private readonly canvasId = 'main-canvas';
  private canvasElement: HTMLCanvasElement;
  private interactionObserver: InteractionObserverElement;

  isInitialized = signal<boolean>(false);
  error = signal<string | null>(null);
  mergedState = signal<MergedState>({ proxies: {}, metadata: {} });

  private streamViewManager?: StreamViewManager;
  private wscm?: WebSocketConnectionManager;
  private inputDeviceManager?: InputDeviceManager;
  private deviceStateDispatch?: DeviceStateDispatch;
  private visibilityChangeHandler: () => void;
  private beforeUnloadHandler: (event: BeforeUnloadEvent) => void;
  private pingInterval?: number;
  private interactionUnsubscribe?: () => void;

  constructor() {
    super();
    this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
    this.beforeUnloadHandler = this.handleBeforeUnload.bind(this);

    this.canvasElement = document.createElement('canvas');
    this.canvasElement.id = this.canvasId;

    this.interactionObserver = new InteractionObserverElement();
    this.interactionObserver.id = 'interaction-observer';
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    const root = super.createRenderRoot();
    root.appendChild(this.canvasElement);
    root.appendChild(this.interactionObserver);
    return root;
  }

  firstUpdated() {
    try {
      this.initialize()
          .then(() => {
            this.isInitialized.value = true;
            console.log('JonStreamGUI initialized');
          })
          .catch((err: Error) => {
            this.handleInitError(err);
          });
    } catch (err) {
      this.handleInitError(err as Error);
    }
  }

  private handleInitError(err: Error) {
    this.error.value = err.message;
    console.error('Error initializing JonStreamGUI:', err);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup();
  }

  private async initialize(): Promise<void> {
    if (!this.shadowRoot) {
        throw new Error('Shadow root not found');
    }

    this.deviceStateDispatch = DeviceStateDispatch.getInstance();

    this.streamViewManager = new StreamViewManager(this.canvasId, this.shadowRoot, this, this.deviceStateDispatch);
    this.wscm = new WebSocketConnectionManager();

    try {
      await this.streamViewManager.initialize();
    } catch (err) {
      this.error.value = (err as Error).message;
      console.error('Error initializing StreamViewManager:', err);
      return;
    }

    this.wscm.startWebSocketWorker("wss://sych.app/ws/ws_video_day", "videoDayFeedback", "videoDay");
    this.wscm.startWebSocketWorker("wss://sych.app/ws/ws_video_heat", "videoHeatFeedback", "videoHeat");
    this.wscm.startWebSocketWorker("wss://sych.app/ws/ws_cmd", "cmd", "deviceState");

    if (this.isControllerTrue(window.location.href)) {
      this.inputDeviceManager = new InputDeviceManager({
        nextLayout: () => this.nextLayout(),
        day_cam_signal: this.deviceStateDispatch.cameraDay,
        heat_cam_signal: this.deviceStateDispatch.cameraHeat
      });
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.pingInterval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        sendCmdPing();
      }
    }, 300);

    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    window.addEventListener('blur', this.visibilityChangeHandler);
    window.addEventListener('focus', this.visibilityChangeHandler);
    window.addEventListener('beforeunload', this.beforeUnloadHandler);

    requestAnimationFrame(this.visibilityChangeHandler);

    this.streamViewManager?.onMergedStateUpdated((state: MergedState) => {
      this.mergedState.value = state;
    });

    this.interactionUnsubscribe = this.interactionObserver.interaction.subscribe((event: GestureEvent | null) => {
      if (event) {
        this.handleInteraction(event);
      }
    });
  }

  private handleBeforeUnload(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = '';

    if (this.streamViewManager) {
      this.streamViewManager.destroy();

      // We'll reinitialize if the user stays on the page
      queueMicrotask(() => {
        this.streamViewManager?.reinitialize().catch(
            err => console.error('Error reinitializing StreamViewManager:', err)
        );
      });
    }
    sendCmdFrozen();
  }

  private handleInteraction(event: GestureEvent): void {
    switch (event.type) {
      case 'swipe':
        if (event.direction === 'left') {
          this.nextLayout();
        } else if (event.direction === 'right') {
          this.previousLayout();
        }
        break;
    }
  }

  private handleVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      sendCmdFrozen();
    }
  }

  cleanup(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    window.removeEventListener('blur', this.visibilityChangeHandler);
    window.removeEventListener('focus', this.visibilityChangeHandler);
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);

    this.streamViewManager?.destroy();
    this.streamViewManager = undefined;

    this.inputDeviceManager?.destroy();
    this.inputDeviceManager = undefined;

    if (this.interactionUnsubscribe) {
      this.interactionUnsubscribe();
    }

    this.isInitialized.value = false;
  }

  private isControllerTrue(urlString: string): boolean {
    try {
      const url = new URL(urlString);
      const params = new URLSearchParams(url.search);
      return params.get('controller') === 'true';
    } catch (error) {
      console.error('Invalid URL:', error);
      return false;
    }
  }

  nextLayout(): void {
    this.streamViewManager?.nextLayout();
  }

  previousLayout(): void {
    this.streamViewManager?.previousLayout();
  }

  serializeProxies(): string {
    return this.streamViewManager?.serializeProxies() ?? '{}';
  }

  deserializeProxies(json: string): void {
    try {
      this.streamViewManager?.deserializeProxies(json);
    } catch (error) {
      console.error('Error deserializing proxies:', error);
      this.error.value = 'Failed to deserialize proxies configuration';
    }
  }

  render() {
    return html`
      ${this.isInitialized.value ? html`
        <slot></slot>
      ` : html`
        <div class="loading">Initializing...</div>
      `}
      ${this.error.value ? html`<div class="error">Error: ${this.error.value}</div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jon-stream-gui': JonStreamGUI;
  }
}