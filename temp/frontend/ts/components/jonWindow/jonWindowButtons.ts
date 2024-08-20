import jonGlobCssVars from '../globCssVars.txt';
import jonWindowButtonsHTML from './jonWindowButtons.txt';

export class JonWindowButtons extends HTMLElement {
    private root: ShadowRoot;

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.innerHTML = jonGlobCssVars + jonWindowButtonsHTML;
    }

    handleButtonClick(action: string): void {
        // Query both buttons inside the shadow DOM
        const minimizeButton = this.root.querySelector('#minimize') as HTMLElement;
        const maximizeButton = this.root.querySelector('#maximize') as HTMLElement;

        // Toggle visibility based on the action
        if (action === 'maximize') {
            minimizeButton.classList.remove('hidden'); // Show minimize
            maximizeButton.classList.add('hidden'); // Hide maximize
        } else if (action === 'minimize') {
            maximizeButton.classList.remove('hidden'); // Show maximize
            minimizeButton.classList.add('hidden'); // Hide minimize
        }

        this.dispatchEvent(new CustomEvent('window-buttonaction', {
            bubbles: true,
            composed: true,
            detail: {action}
        }));
    }
}

customElements.define('jon-window-buttons', JonWindowButtons);

