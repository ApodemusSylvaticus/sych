import { ChannelType } from "js/canvasManager";
import { DeviceStateDispatch } from 'ts/statePub/deviceStateDispatch';
import { JonGuiDataCameraDay } from "ts/proto/jon/jon_shared_data_camera_day.ts";
import { JonGuiDataCameraHeat } from "ts/proto/jon/jon_shared_data_camera_heat.ts";
import { rotateBoth, rotaryHalt } from "ts/cmd/cmdSender/cmdRotary.ts";
import { JonGuiDataRotaryDirection } from "ts/proto/jon/jon_shared_data_types.ts";

const MAX_ROTATION_SPEED = 1.0;
const MIN_ROTATION_SPEED = 0.0001;
const ZOOM_THRESHOLD = 0.7;
const NDC_THRESHOLD = 0.5;
const UPDATE_INTERVAL = 120;
const DEAD_ZONE_RADIUS = 0.05;
const CURVE_STEEPNESS = 4.0;

export class RotaryPanController {
    private deviceState: DeviceStateDispatch;
    private channelType: ChannelType;
    private zoomPos: number = 0;
    private cameraSubscription: (() => void) | null = null;
    private updateInterval: NodeJS.Timeout | null = null;

    private currentAzimuthSpeed: number = 0;
    private currentElevationSpeed: number = 0;
    private currentAzimuthDirection: JonGuiDataRotaryDirection = JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE;
    private currentElevationDirection: JonGuiDataRotaryDirection = JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE;

    private lastNdcDeltaX: number = 0;
    private lastNdcDeltaY: number = 0;
    private isInDeadZone: boolean = true;

    constructor(deviceState: DeviceStateDispatch, channelType: ChannelType) {
        this.deviceState = deviceState;
        this.channelType = channelType;
        this.initializeSignals();
    }

    private initializeSignals() {
        const cameraSignal = this.channelType === ChannelType.HEAT ? this.deviceState.cameraHeat : this.deviceState.cameraDay;
        this.cameraSubscription = cameraSignal.subscribe((value: JonGuiDataCameraHeat | JonGuiDataCameraDay | undefined) => {
            if (value !== undefined) {
                this.zoomPos = value.zoomPos;
            }
        });
    }

    startPan(): void {
        // Reset current values
        this.currentAzimuthSpeed = 0;
        this.currentElevationSpeed = 0;
        this.currentAzimuthDirection = JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE;
        this.currentElevationDirection = JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE;
        this.lastNdcDeltaX = 0;
        this.lastNdcDeltaY = 0;
        this.isInDeadZone = true;

        this.startPeriodicUpdate();
    }

    updatePan(ndcDeltaX: number, ndcDeltaY: number): void {
        const magnitude = Math.sqrt(ndcDeltaX * ndcDeltaX + ndcDeltaY * ndcDeltaY);
        this.isInDeadZone = magnitude <= DEAD_ZONE_RADIUS;

        if (!this.isInDeadZone) {
            // Check if we've crossed the X or Y axis and update directions accordingly
            if (Math.sign(ndcDeltaX) !== Math.sign(this.lastNdcDeltaX)) {
                this.currentAzimuthDirection = ndcDeltaX > 0 ? JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE : JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE;
            }
            if (Math.sign(ndcDeltaY) !== Math.sign(this.lastNdcDeltaY)) {
                this.currentElevationDirection = ndcDeltaY > 0 ? JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE : JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE;
            }

            const [azimuthSpeed, elevationSpeed] = this.calculateRotationSpeeds(ndcDeltaX, ndcDeltaY);

            this.currentAzimuthSpeed = azimuthSpeed;
            this.currentElevationSpeed = elevationSpeed;

            // Update last NDC deltas
            this.lastNdcDeltaX = ndcDeltaX;
            this.lastNdcDeltaY = ndcDeltaY;
        } else {
            // In dead zone, reset speeds to 0
            this.currentAzimuthSpeed = 0;
            this.currentElevationSpeed = 0;
        }
    }

    stopPan(): void {
        this.stopPeriodicUpdate();
        rotaryHalt();
    }

    private calculateRotationSpeeds(ndcDeltaX: number, ndcDeltaY: number): [number, number] {
        const magnitude = Math.sqrt(ndcDeltaX * ndcDeltaX + ndcDeltaY * ndcDeltaY);

        const normalizedDeltaX = ndcDeltaX / magnitude;
        const normalizedDeltaY = ndcDeltaY / magnitude;

        let speed: number;

        if (this.zoomPos > ZOOM_THRESHOLD) {
            speed = MIN_ROTATION_SPEED;
        } else {
            // Adjust magnitude to start from the dead zone edge
            const adjustedMagnitude = Math.max(magnitude - DEAD_ZONE_RADIUS, 0);
            // Calculate the new maximum magnitude (from dead zone edge to NDC_THRESHOLD)
            const maxMagnitude = NDC_THRESHOLD - DEAD_ZONE_RADIUS;
            // Normalize the adjusted magnitude
            const normalizedMagnitude = Math.min(adjustedMagnitude / maxMagnitude, 1);

            // Apply curve interpolation
            const curvedMagnitude = this.applyCurveInterpolation(normalizedMagnitude);

            // Map the curved magnitude to the speed range
            speed = MIN_ROTATION_SPEED + (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED) * curvedMagnitude;
        }

        return [
            Math.max(Math.abs(normalizedDeltaX * speed), MIN_ROTATION_SPEED),
            Math.max(Math.abs(normalizedDeltaY * speed), MIN_ROTATION_SPEED)
        ];
    }

    private applyCurveInterpolation(t: number): number {
        // Using a power function for the curve
        // Adjust CURVE_STEEPNESS to change the shape of the curve
        return Math.pow(t, CURVE_STEEPNESS);
    }

    private startPeriodicUpdate(): void {
        if (this.updateInterval === null) {
            this.updateInterval = setInterval(() => {
                this.sendRotaryCommands();
            }, UPDATE_INTERVAL);
        }
    }

    private stopPeriodicUpdate(): void {
        if (this.updateInterval !== null) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    private sendRotaryCommands(): void {
        if (this.isInDeadZone) {
            rotaryHalt();
        } else {
            rotateBoth(
                this.currentAzimuthSpeed,
                this.currentAzimuthDirection,
                this.currentElevationSpeed,
                this.currentElevationDirection
            );
        }
    }

    destroy(): void {
        this.stopPeriodicUpdate();
        if (this.cameraSubscription) {
            this.cameraSubscription();
        }
    }
}
