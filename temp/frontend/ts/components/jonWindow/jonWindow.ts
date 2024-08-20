import jonGlobCssVars from '../globCssVars.txt';
import jonWindowHtml from './jonWindow.txt';
import {JonWindowBase} from "./jonWindowBase.ts";
import './jonWindowButtons.ts';

enum WindowAction {
    Minimize = 'minimize',
    Maximize = 'maximize',
    Close = 'close',
}

export class JonWindow extends JonWindowBase {
    private isMaximized: boolean = false;

    constructor() {
        super();
        this.root.innerHTML = jonGlobCssVars + jonWindowHtml;
        this.initDOM();
        this.listenForButtonActions();
    }

    public setDimensions(width: string, height: string): void {
        this.setWindowDimensions(width, height);
    }

    private listenForButtonActions(): void {
        this.root.addEventListener('window-buttonaction', (event: Event) => {
            const {action} = (event as CustomEvent).detail;

            switch (action) {
                case WindowAction.Minimize:
                    this.toggleWindowState(false);
                    break;
                case WindowAction.Maximize:
                    this.toggleWindowState(true);
                    break;
                case WindowAction.Close:
                    this.closeWindow();
                    break;
                default:
                    console.warn('Unhandled action:', action);
            }
        });
    }

    private setWindowDimensions(width: string, height: string): void {
        const windowContainer = this.root.querySelector('.window-container') as HTMLElement;
        windowContainer.style.width = `max(${width}, 200px)`;
        windowContainer.style.height = `max(${height}, 150px)`;
    }

    private toggleWindowState(maximize: boolean): void {
        if (maximize !== this.isMaximized) {
            this.isMaximized = maximize;

            if (maximize) {
                this.maximizeWindow();
            } else {
                this.minimizeWindow();
            }
        }
    }

    private maximizeWindow(): void {
        const titleBar = this.root.querySelector('#title-bar') as HTMLElement;
        const windowContainer = this.root.querySelector('.window-container') as HTMLElement;

        titleBar.style.cursor = 'default';
        this.style.left = '';
        this.style.top = '';
        this.style.width = '100vw';
        this.style.height = '100vh';

        windowContainer.style.removeProperty('max-width');
        windowContainer.style.removeProperty('max-height');
        windowContainer.style.setProperty('resize', 'none');
        windowContainer.style.setProperty('border-radius', '0');
        windowContainer.style.width = '100%';
        windowContainer.style.height = '100%';

        this.disableDraggingAndResize();
    }

    private minimizeWindow(): void {
        const titleBar = this.root.querySelector('#title-bar') as HTMLElement;
        const windowContainer = this.root.querySelector('.window-container') as HTMLElement;

        titleBar.style.removeProperty('cursor');
        this.style.removeProperty('width');
        this.style.removeProperty('height');

        windowContainer.style.setProperty('resize', '');
        windowContainer.style.setProperty('border-radius', '');
        windowContainer.style.removeProperty('width');
        windowContainer.style.removeProperty('height');

        this.centerWindow();
        this.enableDraggingAndResize();
    }

    private closeWindow(): void {
        console.log('Closing window');
        this.remove();
    }
}

customElements.define('jon-window', JonWindow);