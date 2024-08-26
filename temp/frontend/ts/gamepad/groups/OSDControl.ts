import {ButtonChangeEvent} from '../GamepadUtil.ts';

import {OSDShowDefaultScreen} from "ts/cmd/cmdSender/cmdOSD.ts";

const Indices = {
    EXIT_BUTTON: 8,
    NEXT_OSD_LAYOUT: 5
};

interface Opts {
    nextLayout: () => void;
}

class OSDControl {
    nextLayout: () => void;

    constructor(options: Opts){
        this.nextLayout = options.nextLayout;
    }

    public handleButtonEvent(event: ButtonChangeEvent): void {
        switch (event.index) {
            case Indices.EXIT_BUTTON:
                if (event.value === 1) OSDShowDefaultScreen();
                break;
            case Indices.NEXT_OSD_LAYOUT:
                if (event.value === 1) this.nextLayout();
                break;
        }
    }
}

export {OSDControl};