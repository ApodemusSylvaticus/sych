import { ButtonChangeEvent } from '../GamepadUtil.ts';

import {
    lrfMeasure,
    lrfScanOff,
    lrfScanOn,
    lrfTargetDesignatorOnModeA,
    lrfTargetDesignatorOff
} from "ts/cmd/cmdSender/cmdLRF.ts";

import {
    OSDShowLRFMeasureScreen,
    OSDShowLRFResultScreen,
    OSDShowLRFResultSimplifiedScreen
} from "ts/cmd/cmdSender/cmdOSD.ts";

const Indices = {
    MEASURE_BUTTON: 4,
    POINTER_BUTTON: 3
};

type State = 'Idle' | 'Measuring' | 'Scanning';

class LRFControl {
    private pressStartTime: number | null = null;
    private state: State = 'Idle';
    private longPressThreshold: number = 500; // Milliseconds for determining long press
    private longPressTimer: number | null = null; // Holds the timeout ID for the long press

    constructor() {}

    public handleButtonEvent(event: ButtonChangeEvent): void {
        if (event.index !== Indices.MEASURE_BUTTON && event.index !== Indices.POINTER_BUTTON) return;

        if(event.index === Indices.MEASURE_BUTTON) {
            if (event.value === 1) { // Button is pressed
                this.pressStartTime = Date.now();
                this.state = 'Measuring';
                OSDShowLRFMeasureScreen();
                this.startLongPressCheck();
            } else if (event.value === 0) { // Button is released
                this.clearLongPressCheck();
                if (this.state === 'Scanning') {
                    this.stopScanning();
                } else if (Date.now() - this.pressStartTime! < this.longPressThreshold) {
                    this.measure();
                }
                this.pressStartTime = null;
            }

        }


        if(event.index === Indices.POINTER_BUTTON) {
            if (event.value === 1) { // Button is pressed
                lrfTargetDesignatorOnModeA();
            } else{ // Button is released
                lrfTargetDesignatorOff();
            }

        }
    }

    private startLongPressCheck() {
        this.clearLongPressCheck(); // Ensure no existing timer is running
        this.longPressTimer = window.setTimeout(() => {
            if (this.state === 'Measuring') {
                this.startScanning();
            }
        }, this.longPressThreshold);
    }

    private clearLongPressCheck() {
        if (this.longPressTimer !== null) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    }

    private startScanning() {
        this.state = 'Scanning';
        lrfScanOn();
        OSDShowLRFResultSimplifiedScreen();
    }

    private stopScanning() {
        lrfScanOff();
        // No state change is made to continue showing the last scan result
    }

    private measure() {
        lrfMeasure();
        OSDShowLRFResultScreen();
        this.state = 'Idle';
    }
}

export { LRFControl };
