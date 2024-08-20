export class JonWindowBase extends HTMLElement {
    protected root: ShadowRoot;
    private startX: number = 0;
    private startY: number = 0;
    private readonly handleDragBound: (e: MouseEvent | TouchEvent) => void;
    private readonly closeDragElementBound: () => void;
    private readonly adjustPositionOnResizeBound: () => void;

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});

        this.handleDragBound = this.handleDrag.bind(this);
        this.closeDragElementBound = this.closeDragElement.bind(this);
        this.adjustPositionOnResizeBound = this.adjustPositionOnResize.bind(this);
    }

    disconnectedCallback(): void {
        window.removeEventListener('resize', this.adjustPositionOnResizeBound);
    }

    protected initDOM(): void {
        this.style.position = 'absolute';

        this.initializeDraggable();
        window.requestAnimationFrame(() => {
            this.registerResizeListener();
            this.centerWindow()
        });
    }

    protected centerWindow(): void {
        const rect = this.getBoundingClientRect();
        this.style.left = `calc(50% - ${rect.width / 2}px)`;
        this.style.top = `calc(50% - ${rect.height / 2}px)`;

        this.updateMaxDimensions();
    }

    protected disableDraggingAndResize(): void {
        document.removeEventListener('mousemove', this.handleDragBound);
        document.removeEventListener('touchmove', this.handleDragBound);
        document.removeEventListener('mouseup', this.closeDragElementBound);
        document.removeEventListener('touchend', this.closeDragElementBound);
        window.removeEventListener('resize', this.adjustPositionOnResizeBound);
    }

    protected enableDraggingAndResize(): void {
        this.initializeDraggable();
        this.registerResizeListener();
    }

    protected updateMaxDimensions(): void {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const rect = this.getBoundingClientRect();
        const maxPossibleWidth = windowWidth - rect.left;
        const maxPossibleHeight = windowHeight - rect.top;

        const windowContainer = this.root.querySelector('.window-container') as HTMLElement;

        const oldMaxWidth = parseInt(windowContainer.style.maxWidth, 10) || windowWidth;
        const oldMaxHeight = parseInt(windowContainer.style.maxHeight, 10) || windowHeight;

        windowContainer.style.maxWidth = `${maxPossibleWidth}px`;
        windowContainer.style.maxHeight = `${maxPossibleHeight}px`;

        const currentWidth = windowContainer.offsetWidth;
        const currentHeight = windowContainer.offsetHeight;

        if (currentWidth > oldMaxWidth) {
            windowContainer.style.width = `${oldMaxWidth}px`;
        }
        if (currentHeight > oldMaxHeight) {
            windowContainer.style.height = `${oldMaxHeight}px`;
        }
    }

    private initializeDraggable(): void {
        const titleBar = this.root.querySelector('#title-bar') as HTMLElement;
        titleBar?.addEventListener('mousedown', this.handleStart.bind(this), {passive: false});
        titleBar?.addEventListener('touchstart', this.handleStart.bind(this), {passive: false});
    }

    private handleStart(e: MouseEvent | TouchEvent): void {
        e.preventDefault();
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

        this.startX = clientX;
        this.startY = clientY;

        document.addEventListener('mousemove', this.handleDragBound, {passive: false});
        document.addEventListener('touchmove', this.handleDragBound, {passive: false});
        document.addEventListener('mouseup', this.closeDragElementBound, {passive: false});
        document.addEventListener('touchend', this.closeDragElementBound, {passive: false});
    }

    private handleDrag(e: MouseEvent | TouchEvent): void {
        e.preventDefault();
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || this.startX;
        const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY || this.startY;

        let dx = clientX - this.startX;
        let dy = clientY - this.startY;

        let newLeft = this.offsetLeft + dx;
        let newTop = this.offsetTop + dy;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const rect = this.getBoundingClientRect();
        const elementWidth = rect.width;
        const elementHeight = rect.height;

        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft + elementWidth > windowWidth) {
            newLeft = windowWidth - elementWidth;
        }

        if (newTop < 0) {
            newTop = 0;
        } else if (newTop + elementHeight > windowHeight) {
            newTop = windowHeight - elementHeight;
        }

        this.style.left = newLeft + 'px';
        this.style.top = newTop + 'px';

        this.startX = clientX;
        this.startY = clientY;
    }

    private closeDragElement(): void {
        document.removeEventListener('mousemove', this.handleDragBound);
        document.removeEventListener('touchmove', this.handleDragBound);
        document.removeEventListener('mouseup', this.closeDragElementBound);
        document.removeEventListener('touchend', this.closeDragElementBound);

        this.updateMaxDimensions();
    }

    private registerResizeListener(): void {
        window.addEventListener('resize', this.adjustPositionOnResizeBound, {passive: true});
    }

    private adjustPositionOnResize(): void {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const rect = this.getBoundingClientRect();
        let left = parseInt(this.style.left, 10);
        let top = parseInt(this.style.top, 10);

        if (left + rect.width > windowWidth) {
            this.style.left = `${windowWidth - rect.width}px`;
        }

        if (top + rect.height > windowHeight) {
            this.style.top = `${windowHeight - rect.height}px`;
        }

        if (left < 0) {
            this.style.left = `0px`;
        }
        if (top < 0) {
            this.style.top = `0px`;
        }

        this.updateMaxDimensions();
    }
}

customElements.define('jon-window-base', JonWindowBase);
