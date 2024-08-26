import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { create, cssomSheet } from 'twind';

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

@customElement('component-switcher')
export class ComponentSwitcher extends LitElement {
  static styles = [sheet.target];

  @state() private options: string[] = [];
  @property({ type: String }) selectedOption: string = '';
  @state() private components: Map<string, Element> = new Map();

  connectedCallback() {
    super.connectedCallback();
    this.updateOptions();
  }

  private updateOptions() {
    const children = Array.from(this.children) as HTMLElement[];
    this.components.clear();
    this.options = children.map(child => {
      const name = child.getAttribute('name') || '';
      this.components.set(name, child);
      return name;
    });
    if (this.options.length > 0 && !this.selectedOption) {
      this.selectedOption = this.options[0];
    }
    this.requestUpdate();
  }

  private handleChange(e: Event) {
    this.selectedOption = (e.target as HTMLSelectElement).value;
    this.requestUpdate();
  }

  render() {
    const selectedComponent = this.components.get(this.selectedOption);

    const outerWrapperClasses = tw`
      bg-gray-100 rounded-xl shadow-lg p-6 my-8 max-w-4xl mx-auto
    `;

    const innerWrapperClasses = tw`
      bg-white rounded-lg shadow-md p-4
    `;

    const selectClasses = tw`
      w-full p-3 mb-4 border border-gray-300 rounded-md 
      focus:outline-none focus:ring-2 focus:ring-blue-500
      text-lg font-bold text-gray-700
      appearance-none bg-white
    `;

    const contentClasses = tw`
      mt-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2
    `;

    return html`
      <div class="${outerWrapperClasses}">
        <div class="${tw`relative`}">
          <select @change=${this.handleChange} class="${selectClasses}">
            ${this.options.map(option => html`
              <option value=${option} ?selected=${option === this.selectedOption}>
                ${option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </option>
            `)}
          </select>
          <div class="${tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}">
            <svg class="${tw`fill-current h-4 w-4`}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        <div class="${innerWrapperClasses}">
          <div class="${contentClasses}">
            ${selectedComponent ? selectedComponent.cloneNode(true) : ''}
          </div>
        </div>
      </div>
    `;
  }
}

@customElement('switchable-component')
export class SwitchableComponent extends LitElement {
  static styles = [sheet.target];

  @property({ type: String }) name: string = '';

  render() {
    return html`<slot></slot>`;
  }
}