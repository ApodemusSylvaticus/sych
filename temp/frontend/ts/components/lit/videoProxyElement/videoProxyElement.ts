import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PanelElement } from '../panelElement/panelElement';
import { AspectRatioInteractiveElement } from '../aspectRatioElement/aspectRatioElement';
import { InteractionObserverElement } from '../interactionObserver/interactionObserverElement';
import { Alignment } from '../aspectRatioElement/aspectRatioInteractiveTypes';
import { Signal, signal } from '@lit-labs/preact-signals';
import { NDCPosition } from "../interactionObserver/ndcPosition";
import { GestureEventNDC } from "../interactionObserver/pointerGestureEventsNDC";
import '../panelElement/panelElement';
import '../aspectRatioElement/aspectRatioElement';
import '../interactionObserver/interactionObserverElement';

@customElement('video-proxy-element')
export class VideoProxyElement extends LitElement {
  static shadowRootOptions: ShadowRootInit = {mode: 'closed'};

  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String }) name = 'Video Proxy';
  @property({ type: Number }) ndcX = 0;
  @property({ type: Number }) ndcY = 0;
  @property({ type: Number }) ndcWidth = 0.5;
  @property({ type: Number }) ndcHeight = 0.5;
  @property({ type: String }) mode: 'fixed' | 'draggable' | 'resizable' | 'alignable' = 'fixed';
  @property({ type: Number }) zIndex = 10;
  @property({ type: String }) aspectRatio: string | number = 'auto';
  @property({ type: String }) align: Alignment = Alignment.Center;
  @property({ type: Boolean }) debug = false;
  @property({ type: Number }) moveThreshold = 100;
  @property({ type: Number }) tapDurationThreshold = 200;
  @property({ type: Number }) longPressDurationThreshold = 300;
  @property({ type: Number }) swipeVelocityThreshold = 0.5;
  @property({ type: Number }) swipeTimeThreshold = 300;
  @property({ type: Number }) doubleTapThreshold = 300;
  @property({ type: Number }) zoomThreshold = 1.1;
  @property({ type: Number }) eventDebounceThreshold = 50; // ms

  private panelElement: PanelElement;
  private aspectRatioElement: AspectRatioInteractiveElement;
  private interactionObserver: InteractionObserverElement;
  private slotElement: HTMLSlotElement;

  private lifecycleSignal = signal<'mounted' | 'unmounted' | 'firstUpdated' | null>(null);

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
  }

  updateElementProperties() {
    this.panelElement.name = this.name;
    this.panelElement.ndcX = this.ndcX;
    this.panelElement.ndcY = this.ndcY;
    this.panelElement.ndcWidth = this.ndcWidth;
    this.panelElement.ndcHeight = this.ndcHeight;
    this.panelElement.zIndex = this.zIndex;

    switch (this.mode) {
      case 'fixed':
        this.panelElement.mode = 'fixed';
        break;
      case 'draggable':
        this.panelElement.mode = 'draggable';
        break;
      case 'resizable':
        this.panelElement.mode = 'resizable';
        break;
      default:
        this.panelElement.mode = 'fixed';
        break
    }

    this.aspectRatioElement.aspectRatio = this.aspectRatio;
    this.aspectRatioElement.align = this.align;
    this.aspectRatioElement.editMode = this.mode === 'alignable';

    this.interactionObserver.debugVisible = this.debug;
    this.interactionObserver.moveThreshold = this.moveThreshold;
    this.interactionObserver.eventDebounceThreshold = this.eventDebounceThreshold;
    this.interactionObserver.tapDurationThreshold = this.tapDurationThreshold;
    this.interactionObserver.longPressDurationThreshold = this.longPressDurationThreshold;
    this.interactionObserver.swipeVelocityThreshold = this.swipeVelocityThreshold;
    this.interactionObserver.swipeTimeThreshold = this.swipeTimeThreshold;
    this.interactionObserver.doubleTapThreshold = this.doubleTapThreshold;
    this.interactionObserver.zoomThreshold = this.zoomThreshold;

    if (this.debug) {
      this.subscribeToSignals();
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('debug')) {
      if (this.debug) {
        this.subscribeToSignals();
      } else {
        this.unsubscribeFromSignals();
      }
    }
    if (changedProperties.size > 0) {
      this.updateElementProperties();
    }
  }

  render() {
    return this.panelElement;
  }

  handleAlignmentChanged(e: CustomEvent) {
    this.align = e.detail.alignment;
    this.dispatchEvent(new CustomEvent('alignment-changed', {
      detail: { alignment: this.align },
      bubbles: true,
      composed: true
    }));
  }

  get position(): Signal<NDCPosition | null> {
    return this.interactionObserver.position;
  }

  get interaction(): Signal<GestureEventNDC | null> {
    return this.interactionObserver.interaction;
  }

  get lifecycle(): Signal<'mounted' | 'unmounted' | 'firstUpdated' | null> {
    return this.lifecycleSignal;
  }

  connectedCallback() {
    super.connectedCallback();
    this.aspectRatioElement.addEventListener('alignment-changed', this.handleAlignmentChanged as EventListener);
    this.lifecycleSignal.value = 'mounted';
    this.logDebugInfo('Lifecycle', this.lifecycleSignal.value);
    if (this.debug) {
      this.subscribeToSignals();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.aspectRatioElement.removeEventListener('alignment-changed', this.handleAlignmentChanged as EventListener);
    this.lifecycleSignal.value = 'unmounted';
    this.logDebugInfo('Lifecycle', this.lifecycleSignal.value);
    this.unsubscribeFromSignals();
  }

  firstUpdated(changedProperties: Map<string, any>) {
    super.firstUpdated(changedProperties);
    this.lifecycleSignal.value = 'firstUpdated';
    this.logDebugInfo('Lifecycle', this.lifecycleSignal.value);
  }

  private subscribeToSignals() {
    this.unsubscribeFromSignals(); // Ensure we don't have duplicate subscriptions

    this.signalUnsubscribers = [
      this.position.subscribe(this.logPositionUpdate.bind(this)),
      this.interaction.subscribe(this.logInteractionUpdate.bind(this)),
      this.lifecycle.subscribe(this.logLifecycleUpdate.bind(this))
    ];
  }

  private unsubscribeFromSignals() {
    this.signalUnsubscribers.forEach(unsubscribe => unsubscribe());
    this.signalUnsubscribers = [];
  }

  private logPositionUpdate(position: NDCPosition | null) {
    if (!position) {
      this.logDebugInfo('Position', 'null');
      return;
    }
    this.logDebugInfo('Position', `(${position.x.toFixed(2)}, ${position.y.toFixed(2)})`);
  }

  private logInteractionUpdate(interaction: GestureEventNDC | null) {
    this.logDebugInfo('Interaction', interaction ? interaction.type : 'None');
  }

  private logLifecycleUpdate(lifecycle: 'mounted' | 'unmounted' | 'firstUpdated' | null) {
    this.logDebugInfo('Lifecycle', lifecycle);
  }

  private logDebugInfo(type: string, value: any) {
    if (this.debug) {
      console.log(`[VideoProxyElement] ${type}:`, value);
    }
  }
}