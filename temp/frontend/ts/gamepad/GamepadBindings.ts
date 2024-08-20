'use strict';

import {ButtonChangeEvent, StickChangeEvent} from './GamepadUtil.ts'
import {RotaryControl} from './groups/RotaryControl.ts';
import {HeatCameraControl} from './groups/HeatCameraControl.ts';
import {DayCameraControl} from "./groups/DayCameraControl.ts";
import {LRFControl} from "./groups/LRFControl.ts";
import {OSDControl} from "./groups/OSDControl.ts";
import { Signal } from '@lit-labs/preact-signals';
import { JonGuiDataCameraDay } from "../proto/jon/jon_shared_data_camera_day";
import { JonGuiDataCameraHeat } from "../proto/jon/jon_shared_data_camera_heat";

import {GamepadManager} from './GamepadManager.ts';

interface Opts {
    nextLayout: () => void;
    day_cam_signal: Signal<JonGuiDataCameraDay | undefined>;
    heat_cam_signal: Signal<JonGuiDataCameraHeat | undefined>;
}

class InputDeviceManager {
    private gamepadManager: GamepadManager;
    private rotary: RotaryControl;
    private heatCamera: HeatCameraControl = new HeatCameraControl();
    private dayCamera: DayCameraControl = new DayCameraControl();
    private lrf: LRFControl = new LRFControl();
    private osd: OSDControl;
    private day_cam_signal: Signal<JonGuiDataCameraDay | undefined>;
    private heat_cam_signal: Signal<JonGuiDataCameraHeat | undefined>;

    constructor(options: Opts ){
        this.gamepadManager = new GamepadManager(this.handleGamepadEvent.bind(this));
        this.initGamepadManager();
        this.osd = new OSDControl({nextLayout: options.nextLayout});
        this.day_cam_signal = options.day_cam_signal;
        this.heat_cam_signal = options.heat_cam_signal;
        this.rotary = new RotaryControl(this.day_cam_signal, this.heat_cam_signal);
    }

    private handleGamepadEvent(event: ButtonChangeEvent | StickChangeEvent): void {
        if (event.type === 'button') {
            this.handleButtonEvent(event);
            this.heatCamera.handleButtonEvent(event);
            this.dayCamera.handleButtonEvent(event);
            this.lrf.handleButtonEvent(event);
            this.osd.handleButtonEvent(event);

        } else if (event.type === 'stick') {
            this.handleStickEvent(event);
            this.dayCamera.handleStickEvent(event);
        }
    }

    private handleStickEvent(event: StickChangeEvent) {
        console.log(`Stick ${event.index} value: ${event.value}`);
        this.rotary.handleStickEvent(event);
    }

    private handleButtonEvent(event: ButtonChangeEvent) {
        console.log(`Button ${event.index} value: ${event.value}`);
        this.rotary.handleButtonEvent(event);
    }

    private initGamepadManager() {
        this.gamepadManager.setQueryRate(33);
    }

    destroy() {
        this.gamepadManager.destroy();

        // Clean up signals
        if (this.day_cam_signal) {
            this.day_cam_signal.value = undefined;
        }
        if (this.heat_cam_signal) {
            this.heat_cam_signal.value = undefined;
        }
    }
}

export {InputDeviceManager};