import {ButtonChangeEvent} from '../GamepadUtil.ts';

import {
    heatCameraFocusIn as focusIncrease,
    heatCameraFocusOut as focusDecrease,
    heatCameraFocusStop as focusStop,
    heatCameraZoomIn as zoomIn,
    heatCameraZoomOut as zoomOut,
    heatCameraZoomStop as zoomStop,
    heatCameraSetAutoFocus as autoFocus,
} from "ts/cmd/cmdSender/cmdHeatCamera.ts";

const Indices = {
    ZOOM_PLUS_BUTTON: 12,
    ZOOM_MINUS_BUTTON: 13,
    FOCUS_PLUS_BUTTON: 15,
    FOCUS_MINUS_BUTTON: 14,
    AUTO_FOCUS_BUTTON: 0
};

class HeatCameraControl {
    constructor() {
    }

    public handleButtonEvent(event: ButtonChangeEvent): void {
        switch (event.index) {
            case Indices.AUTO_FOCUS_BUTTON:
                autoFocus(true);
                break;
            case Indices.ZOOM_PLUS_BUTTON:
                if (event.value === 1) {
                    zoomIn();
                } else {
                    zoomStop();
                }
                break;
            case Indices.ZOOM_MINUS_BUTTON:
                if (event.value === 1) {
                    zoomOut();
                } else {
                    zoomStop();
                }
                break;
            case Indices.FOCUS_PLUS_BUTTON:
                if (event.value === 1) {
                    focusIncrease();
                } else {
                    focusStop();
                }
                break;
            case Indices.FOCUS_MINUS_BUTTON:
                if (event.value === 1) {
                    focusDecrease();
                } else {
                    focusStop();
                }
                break;
            default:
                break;
        }
    }
}

export {HeatCameraControl};
