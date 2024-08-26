import {css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {InteractionMode, PanelElement} from '../panelElement/panelElement';
import {
  AspectRatioInteractiveElement
} from '../aspectRatioElement/aspectRatioElement';
import {
  InteractionObserverElement
} from '../interactionObserver/interactionObserverElement';
import {Alignment} from '../aspectRatioElement/aspectRatioInteractiveTypes';
import {Signal, signal} from '@lit-labs/preact-signals';
import {NDCPosition} from "../interactionObserver/ndcPosition";
import {GestureEvent} from "../interactionObserver/pointerGestureEvents";
import '../panelElement/panelElement';
import '../aspectRatioElement/aspectRatioElement';
import '../interactionObserver/interactionObserverElement';

interface PanelPositionUpdate {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

@customElement('video-proxy-element')
export class VideoProxyElement extends LitElement {
  static shadowRootOptions: ShadowRootInit = { mode: 'closed' };

  static styles = css`
    :host {
      display: block;
      pointer-events: none;
    }
  `;

  // PanelElement properties
  @property({ type: String }) name = 'Video Proxy';
  @property({ type: Number }) ndcX = 0;
  @property({ type: Number }) ndcY = 0;
  @property({ type: Number }) ndcWidth = 0.5;
  @property({ type: Number }) ndcHeight = 0.5;
  @property({ type: String }) mode: InteractionMode = InteractionMode.Fixed;
  @property({ type: Number }) zIndex = 10;

  // AspectRatioInteractiveElement properties
  @property({ type: String }) aspectRatio: string | number = 'auto';
  @property({ type: String }) align: Alignment = Alignment.Center;

  // InteractionObserverElement properties
  @property({ type: Boolean }) debug = false;
  @property({ type: Number }) doubleTapThreshold = 300;
  @property({ type: Number }) zoomThreshold = 1.1;
  @property({ type: Number }) zoomDebounceTime = 200;

  private panelElement: PanelElement;
  private aspectRatioElement: AspectRatioInteractiveElement;
  private interactionObserver: InteractionObserverElement;
  private slotElement: HTMLSlotElement;

  private lifecycleSignal: Signal<'mounted' | 'unmounted' | 'firstUpdated' | null> = signal<'mounted' | 'unmounted' | 'firstUpdated' | null>(null);
  private videoPositionSignal: Signal<NDCPosition | null> = signal<NDCPosition | null>(null);
  private interactionSignal: Signal<GestureEvent | null> = signal<GestureEvent | null>(null);
  private panelPositionSignal: Signal<PanelPositionUpdate | null> = signal<PanelPositionUpdate | null>(null);

  private signalUnsubscribers: (() => void)[] = [];

  constructor() {
    super();

    this.panelElement = new PanelElement();
    this.aspectRatioElement = new AspectRatioInteractiveElement();
    this.interactionObserver = new InteractionObserverElement();
    this.slotElement = document.createElement('slot');

    this.interactionObserver.appendChild(this.slotElement);
    this.aspectRatioElement.appendChild(this.interactionObserver);
    this.panelElement.appendChild(this.aspectRatioElement);

    this.updateElementProperties();

    // Bind the handlers to 'this'
    this.handlePanelPositionUpdate = this.handlePanelPositionUpdate.bind(this);
    this.handleAlignmentChanged = this.handleAlignmentChanged.bind(this);

    // Subscribe to events
    this.panelElement.addEventListener('position-update', this.handlePanelPositionUpdate as EventListener);
    this.aspectRatioElement.addEventListener('alignment-changed', this.handleAlignmentChanged as EventListener);

    // Subscribe to signals
    this.signalUnsubscribers.push(
      this.interactionObserver.position.subscribe((position) => {
        this.videoPositionSignal.value = position;
        this.logPositionUpdate(position);
      }),
      this.interactionObserver.interaction.subscribe((interaction) => {
        this.interactionSignal.value = interaction;
        this.logInteractionUpdate(interaction);
      })
    );
  }

  updateElementProperties(): void {
    // Update PanelElement properties
    this.panelElement.name = this.name;
    this.panelElement.ndcX = this.ndcX;
    this.panelElement.ndcY = this.ndcY;
    this.panelElement.ndcWidth = this.ndcWidth;
    this.panelElement.ndcHeight = this.ndcHeight;
    this.panelElement.zIndex = this.zIndex;

    if (this.mode == InteractionMode.Alignable) {
      this.panelElement.mode = InteractionMode.Fixed
    } else {
      this.panelElement.mode = this.mode as InteractionMode;
    }

    // Update AspectRatioInteractiveElement properties
    this.aspectRatioElement.aspectRatio = this.aspectRatio;
    this.aspectRatioElement.align = this.align;
    this.aspectRatioElement.editMode = this.mode === InteractionMode.Alignable;

    // Update InteractionObserverElement properties
    this.interactionObserver.debugVisible = this.debug;
    this.interactionObserver.doubleTapThreshold = this.doubleTapThreshold;
    this.interactionObserver.zoomDebounceTime = this.zoomDebounceTime;
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('debug')) {
      this.interactionObserver.debugVisible = this.debug;
    }
    if (changedProperties.size > 0) {
      this.updateElementProperties();
    }
  }

  render() {
    return this.panelElement;
  }

  handleAlignmentChanged(e: CustomEvent): void {
    this.align = e.detail.alignment;
    this.logDebugInfo('Alignment Changed', this.align);
    this.dispatchEvent(new CustomEvent('alignment-changed', {
      detail: { alignment: this.align },
      bubbles: true,
      composed: true
    }));
  }

  handlePanelPositionUpdate(e: CustomEvent<PanelPositionUpdate>): void {
    this.panelPositionSignal.value = e.detail;
    this.logPanelPositionUpdate(e.detail);
  }

  get videoPosition(): Signal<NDCPosition | null> {
    return this.videoPositionSignal;
  }

  get interaction(): Signal<GestureEvent | null> {
    return this.interactionSignal;
  }

  get panelPosition(): Signal<PanelPositionUpdate | null> {
    return this.panelPositionSignal;
  }

  get lifecycle(): Signal<'mounted' | 'unmounted' | 'firstUpdated' | null> {
    return this.lifecycleSignal;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.lifecycleSignal.value = 'mounted';
    this.logLifecycleUpdate(this.lifecycleSignal.value);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.panelElement.removeEventListener('position-update', this.handlePanelPositionUpdate as EventListener);
    this.aspectRatioElement.removeEventListener('alignment-changed', this.handleAlignmentChanged as EventListener);
    this.unsubscribeFromSignals();
    this.lifecycleSignal.value = 'unmounted';
    this.logLifecycleUpdate(this.lifecycleSignal.value);
  }

  firstUpdated(changedProperties: Map<string, unknown>): void {
    super.firstUpdated(changedProperties);
    this.lifecycleSignal.value = 'firstUpdated';
    this.logLifecycleUpdate(this.lifecycleSignal.value);
  }

  private unsubscribeFromSignals(): void {
    this.signalUnsubscribers.forEach(unsubscribe => unsubscribe());
    this.signalUnsubscribers = [];
  }

  private logPositionUpdate(position: NDCPosition | null): void {
    if (!position) {
      this.logDebugInfo('Video Position', 'null');
      return;
    }
    this.logDebugInfo('Video Position', `x: ${position.x.toFixed(4)}, y: ${position.y.toFixed(4)}, width: ${position.width.toFixed(4)}, height: ${position.height.toFixed(4)}`);
  }

  private logInteractionUpdate(interaction: GestureEvent | null): void {
    if (!interaction) {
      this.logDebugInfo('Interaction', 'None');
      return;
    }

    switch (interaction.type) {
      case 'swipe':
        this.logDebugInfo('Interaction', `Swipe ${interaction.direction}`);
        break;
      case 'panStart':
        this.logDebugInfo('Interaction', `Pan Start - x: ${interaction.x.toFixed(2)}, y: ${interaction.y.toFixed(2)}, ndcX: ${interaction.ndcX.toFixed(4)}, ndcY: ${interaction.ndcY.toFixed(4)}`);
        break;
      case 'panMove':
        this.logDebugInfo('Interaction', `Pan Move - deltaX: ${interaction.deltaX.toFixed(2)}, deltaY: ${interaction.deltaY.toFixed(2)}, ndcDeltaX: ${interaction.ndcDeltaX.toFixed(4)}, ndcDeltaY: ${interaction.ndcDeltaY.toFixed(4)}`);
        break;
      case 'panStop':
        this.logDebugInfo('Interaction', 'Pan Stop');
        break;
      case 'tap':
        this.logDebugInfo('Interaction', `Tap - x: ${interaction.x.toFixed(2)}, y: ${interaction.y.toFixed(2)}, ndcX: ${interaction.ndcX.toFixed(4)}, ndcY: ${interaction.ndcY.toFixed(4)}`);
        break;
      case 'doubleTap':
        this.logDebugInfo('Interaction', `Double Tap - x: ${interaction.x.toFixed(2)}, y: ${interaction.y.toFixed(2)}, ndcX: ${interaction.ndcX.toFixed(4)}, ndcY: ${interaction.ndcY.toFixed(4)}`);
        break;
      case 'zoomIn':
        this.logDebugInfo('Interaction', 'Zoom In');
        break;
      case 'zoomOut':
        this.logDebugInfo('Interaction', 'Zoom Out');
        break;
    }
  }

  private logPanelPositionUpdate(update: PanelPositionUpdate | null): void {
    if (!update) {
      this.logDebugInfo('Panel Position', 'null');
      return;
    }
    this.logDebugInfo('Panel Position', `x: ${update.position.x.toFixed(4)}, y: ${update.position.y.toFixed(4)}, width: ${update.size.width.toFixed(4)}, height: ${update.size.height.toFixed(4)}`);
  }

  private logLifecycleUpdate(lifecycle: 'mounted' | 'unmounted' | 'firstUpdated' | null): void {
    this.logDebugInfo('Lifecycle', lifecycle);
  }

  private logDebugInfo(type: string, value: unknown): void {
    if (this.debug) {
      console.log(`[VideoProxyElement] ${type}:`, value);
    }
  }
}