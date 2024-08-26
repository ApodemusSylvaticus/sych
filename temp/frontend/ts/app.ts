import './components/lit/jonStreamGUI/jonStreamGUI.ts';
import './components/lit/jonStreamGUI/svgLayoutPreview.ts';
import { JonStreamGUI } from './components/lit/jonStreamGUI/jonStreamGUI.ts';
import { MergedState } from './components/lit/jonStreamGUI/proxyManager.ts';
import { SVGLayoutPreview } from './components/lit/jonStreamGUI/svgLayoutPreview.ts';

let streamGUI: JonStreamGUI;
let svgPreview: SVGLayoutPreview;

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.getElementById('stream-gui-wrapper');
    if (!wrapper) {
        console.error('stream-gui-wrapper element not found in the DOM');
        return;
    }

    streamGUI = document.createElement('jon-stream-gui') as JonStreamGUI;

    streamGUI.error.subscribe((error) => {
        if (error) {
            console.error('Error in JonStreamGUI:', error);
        }
    });

    streamGUI.isInitialized.subscribe((initialized) => {
        if (initialized) {
            setupMergedStateListener();
        }
    });

    // Create and append SVG preview element
    svgPreview = document.createElement('svg-layout-preview') as SVGLayoutPreview;
    svgPreview.style.position = 'fixed';
    svgPreview.style.bottom = '20px';
    svgPreview.style.right = '20px';
    svgPreview.style.width = '100px';
    svgPreview.style.height = '75px';
    svgPreview.style.zIndex = '1000';
    document.body.appendChild(svgPreview);
});

function setupMergedStateListener() {
    streamGUI.mergedState.subscribe((mergedState: MergedState) => {
        const proxies = streamGUI.serializeProxies();
        svgPreview.updateLayout(proxies);
    });
}
