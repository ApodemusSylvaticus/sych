import {ButtonChangeEvent, StickChangeEvent} from '../GamepadUtil.ts';

import {
    dayCameraHaltFocus,
    dayCameraHaltZoom,
    dayCameraMoveFocus,
    dayCameraMoveZoom,
} from "ts/cmd/cmdSender/cmdDayCamera.ts";

const Indices = {
    ZOOM_FOCUS_SPEED_MULTIPLIER_BUTTON: 7,
    ZOOM_CONTROL_STICK: 3,
    FOCUS_CONTROL_STICK: 2,
};

function inIndices(value: number): boolean {
    return Object.values(Indices).includes(value);
}

class DayCameraControl {
    private sensitivityThreshold: number = 0.0005;
    private curvatureCoefficient: number = 3.0;
    private baseMaxSpeed = 0.35;
    private bumperValue = 0.0;
    private lastStickValues: { [index: number]: number } = {};
    private activeAxis: 'zoom' | 'focus' | null = null;
    private activeSpeed: number = 0.0;
    private activeDirection: number = 0.0;

    public handleStickEvent(event: StickChangeEvent): void {
        if (!inIndices(event.index)) {
            return;
        }

        this.lastStickValues[event.index] = event.value;
        this.handleStickMovement();
    }

    public handleButtonEvent(event: ButtonChangeEvent): void {
        if (event.index === Indices.ZOOM_FOCUS_SPEED_MULTIPLIER_BUTTON) {
            this.updateBumperValue(event.value);
        }
    }

    private calculateSpeed(stickInput: number, bumperMultiplier: number): number {
        const normalizedInput = Math.abs(stickInput);
        let speedAdjustment = normalizedInput * this.baseMaxSpeed;

        if (normalizedInput > 0) {
            const speedBoost = bumperMultiplier * (1.0 - this.baseMaxSpeed);
            speedAdjustment += speedBoost;
        }

        speedAdjustment = Math.pow(speedAdjustment, this.curvatureCoefficient);
        return Math.min(speedAdjustment, 1.0);
    }

    private MoveLenses(): void {
        if (this.activeAxis === null || this.activeSpeed < this.sensitivityThreshold) {
            dayCameraHaltZoom();
            dayCameraHaltFocus();
            return;
        }

        if (this.activeAxis === 'zoom') {
            dayCameraMoveZoom(this.activeDirection, this.activeSpeed);
            dayCameraHaltFocus();
        } else {
            dayCameraMoveFocus(this.activeDirection, this.activeSpeed);
            dayCameraHaltZoom();
        }
    }

    private updateBumperValue(value: number): void {
        this.bumperValue = value;
        this.handleStickMovement();
    }

    private handleStickMovement(): void {
        const zoomValue = this.lastStickValues[Indices.ZOOM_CONTROL_STICK] || 0;
        const focusValue = this.lastStickValues[Indices.FOCUS_CONTROL_STICK] || 0;

        if (Math.abs(zoomValue) > Math.abs(focusValue)) {
            this.activeAxis = 'zoom';
            this.activeSpeed = this.calculateSpeed(zoomValue, this.bumperValue);
            this.activeDirection = zoomValue > 0 ? 0.0 : 1.0;
        } else if (Math.abs(focusValue) > Math.abs(zoomValue)) {
            this.activeAxis = 'focus';
            this.activeSpeed = this.calculateSpeed(focusValue, this.bumperValue);
            this.activeDirection = focusValue > 0 ? 1.0 : 0.0; // Inverted for focus
        } else {
            this.activeAxis = null;
            this.activeSpeed = 0;
            this.activeDirection = 0;
        }

        this.MoveLenses();
    }
}

export {DayCameraControl};