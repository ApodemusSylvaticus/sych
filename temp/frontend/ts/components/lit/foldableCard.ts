import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { create, cssomSheet } from 'twind';

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

@customElement('foldable-card')
export class FoldableCard extends LitElement {
  static styles = [
    sheet.target,
    css`
      .card {
        display: grid;
        grid-template-rows: auto 0fr;
        transition: grid-template-rows 0.3s ease-out;
      }
      .card.unfolded {
        grid-template-rows: auto 1fr;
      }
      .card-content {
        overflow: hidden;
      }
    `
  ];

  private _title = '';

  @property({ type: String })
  get title() {
    return this._title;
  }

  set title(value: string) {
    const oldValue = this._title;
    this._title = value;
    this.requestUpdate('title', oldValue);
  }

  @state() private isUnfolded = false;

  render() {
    const wrapperClasses = tw`my-4`;
    const cardClasses = tw`
      bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out
      border border-gray-200 p-2
      ${this.isUnfolded ? 'unfolded' : ''}
    `;
    const headerClasses = tw`
      flex items-center cursor-pointer
      ${this.isUnfolded ? 'mb-2' : ''}
    `;
    const arrowClasses = tw`
      text-blue-500 transition-transform duration-300 ease-in-out
      ${this.isUnfolded ? 'transform rotate-90' : ''}
      mr-2
    `;
    const titleClasses = tw`text-lg font-semibold m-0 truncate flex-grow`;
    const dividerClasses = tw`
      border-t border-gray-200 my-2
      ${this.isUnfolded ? '' : 'hidden'}
    `;

    return html`
      <div class="${wrapperClasses}">
        <div class="${cardClasses} card">
          <div class="${headerClasses}" @click=${this.toggleFold}>
            <span class="${arrowClasses}" aria-hidden="true">&#10095;</span>
            <h2 class="${titleClasses}">${this.title}</h2>
          </div>
          <div class="card-content">
            <div class="${dividerClasses}"></div>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  private toggleFold() {
    this.isUnfolded = !this.isUnfolded;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'foldable-card': FoldableCard;
  }
}
