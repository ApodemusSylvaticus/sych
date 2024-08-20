import {ButtonChangeEvent, StickChangeEvent} from './GamepadUtil.ts'

export class GamepadManager {
    public axisSensitivity: number = 2;
    public buttonSensitivity: number = 2;
    public buttonThreshold: number = 0.1;
    public axisThreshold: number = 0.25;
    private queryRate: number = 33;
    private loop: number | null = null;
    private prevButtonValues: Map<number, number[]> = new Map();
    private prevAxisValues: Map<number, number[]> = new Map();
    private readonly callback: (event: ButtonChangeEvent | StickChangeEvent) => void;

    constructor(callback: (event: ButtonChangeEvent | StickChangeEvent) => void) {
        this.callback = callback;
        window.addEventListener("gamepadconnected", this.onGamepadEvent.bind(this));
        window.addEventListener("gamepaddisconnected", this.onGamepadEvent.bind(this));
    }

    public setQueryRate(rate: number): void {
        this.queryRate = rate;
        if (this.loop) {
            this.stopLoop();
            this.startLoopIfNeeded();
        }
    }

    private onGamepadEvent(): void {
        this.startLoopIfNeeded();
    }

    private getGamepads(): (Gamepad | null)[] {
        return navigator.getGamepads ? Array.from(navigator.getGamepads()) : [];
    }

    private startLoopIfNeeded(): void {
        const gamepads = this.getGamepads().filter(gp => gp !== null);
        if (gamepads.length > 0 && !this.loop) {
            this.loop = window.setTimeout(() => this.gamepadLoop(), this.queryRate);
        } else if (gamepads.length === 0 && this.loop) {
            this.stopLoop();
        }
    }

    private normalizeValue(value: number, threshold: number): number {
        if (Math.abs(value) < threshold) return 0;
        const sign = Math.sign(value);
        const normalized = (Math.abs(value) - threshold) / (1 - threshold);
        return sign * normalized;
    }

    private roundValue(value: number, sensitivity: number): number {
        const factor = Math.pow(10, sensitivity);
        return Math.round(value * factor) / factor;
    }

    private handleButtons(gamepad: Gamepad): void {
        const prevValues = this.prevButtonValues.get(gamepad.index) || [];
        gamepad.buttons.forEach((button, i) => {
            const rawValue = button.value;
            const normalizedValue = this.normalizeValue(rawValue, this.buttonThreshold);
            const roundedValue = this.roundValue(normalizedValue, this.buttonSensitivity);
            const prevRoundedValue = prevValues[i] || 0.0;
            if (!this.areFloatsEqual(roundedValue, prevRoundedValue)) {
                this.callback({type: 'button', index: i, value: roundedValue});
                prevValues[i] = roundedValue;
            }
        });
        this.prevButtonValues.set(gamepad.index, prevValues);
    }

    private handleSticks(gamepad: Gamepad): void {
        const prevValues = this.prevAxisValues.get(gamepad.index) || [];
        gamepad.axes.forEach((axis, i) => {
            const normalizedValue = this.normalizeValue(axis, this.axisThreshold);
            const roundedValue = this.roundValue(normalizedValue, this.axisSensitivity);
            const prevRoundedValue = prevValues[i] || 0.0;
            if (!this.areFloatsEqual(roundedValue, prevRoundedValue)) {
                this.callback({type: 'stick', index: i, value: roundedValue});
                prevValues[i] = roundedValue;
            }
        });
        this.prevAxisValues.set(gamepad.index, prevValues);
    }

    private areFloatsEqual(a: number, b: number, epsilon: number = 0.00001): boolean {
        return Math.abs(a - b) < epsilon;
    }

    private gamepadLoop(): void {
        this.getGamepads().forEach((gamepad) => {
            if (gamepad) {
                this.handleButtons(gamepad);
                this.handleSticks(gamepad);
            }
        });
        this.loop = window.setTimeout(() => this.gamepadLoop(), this.queryRate);
    }

    private stopLoop(): void {
        if (this.loop) {
            clearTimeout(this.loop);
            this.loop = null;
        }
    }
}
