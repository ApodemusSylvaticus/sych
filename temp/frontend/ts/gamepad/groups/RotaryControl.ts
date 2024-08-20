import * as Types from "ts/proto/jon/jon_shared_data_types.ts";
import { ButtonChangeEvent, StickChangeEvent } from '../GamepadUtil.ts';
import {
    rotaryAzimuthRotate,
    rotaryElevationRotate,
    rotaryHaltAzimuth,
    rotaryHaltElevation,
    rotaryHaltElevationAndAzimuth,
    rotateBoth,
} from "ts/cmd/cmdSender/cmdRotary.ts";
import { Signal } from '@lit-labs/preact-signals';
import { JonGuiDataCameraDay } from "../../proto/jon/jon_shared_data_camera_day";
import { JonGuiDataCameraHeat } from "../../proto/jon/jon_shared_data_camera_heat";

const Indices = {
    ROTARY_SPEED_MULTIPLIER_BUTTON: 6, // Bumper button
    ROTARY_AZIMUTH_STICK: 0,
    ROTARY_ELEVATION_STICK: 1,
};

function inIndices(value: number): boolean {
    return Object.values(Indices).includes(value);
}

class RotaryControl {
    private deadZoneRadius: number = 0.15;
    private curvatureCoefficient: number = 3.0;
    private baseMaxSpeed = 0.35;
    private bumperValue = 0.0;
    private zoomSpeedCoefficientMin = 0.2;
    private zoomSpeedCoefficientMax = 1.0;
    private zoomThresholdLower = 0.5;
    private zoomThresholdUpper = 0.9;
    private day_cam_signal: Signal<JonGuiDataCameraDay | undefined>;
    private heat_cam_signal: Signal<JonGuiDataCameraHeat | undefined>;
    private lastStickValues: { [index: number]: number } = {};
    private speeds: { azimuth: number, elevation: number } = {
        azimuth: 0.0,
        elevation: 0.0
    };
    private directions: {
        azimuth: Types.JonGuiDataRotaryDirection,
        elevation: Types.JonGuiDataRotaryDirection
    } = {
        azimuth: Types.JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED,
        elevation: Types.JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED,
    };

    constructor(day_cam_signal: Signal<JonGuiDataCameraDay | undefined>,
                heat_cam_signal: Signal<JonGuiDataCameraHeat | undefined>) {
        this.day_cam_signal = day_cam_signal;
        this.heat_cam_signal = heat_cam_signal;
    }

    private calculateZoomSpeedCoefficient(): number {
        const day_zoom_pos = this.day_cam_signal.value?.zoomPos || 0;
        const heat_zoom_pos = this.heat_cam_signal.value?.zoomPos || 0;
        const zoom_pos = Math.max(day_zoom_pos, heat_zoom_pos);

        if (zoom_pos <= this.zoomThresholdLower) {
            return this.zoomSpeedCoefficientMax;
        }

        if (zoom_pos >= this.zoomThresholdUpper) {
            return this.zoomSpeedCoefficientMin;
        }

        const normalizedZoom = (zoom_pos - this.zoomThresholdLower) / (this.zoomThresholdUpper - this.zoomThresholdLower);
        return this.zoomSpeedCoefficientMax - normalizedZoom * (this.zoomSpeedCoefficientMax - this.zoomSpeedCoefficientMin);
    }

    public handleStickEvent(event: StickChangeEvent) {
        if (!(inIndices(event.index))) {
            return;
        }

        this.lastStickValues[event.index] = event.value;
        this.handleStickMovement();
    }

    public handleButtonEvent(event: ButtonChangeEvent) {
        if (event.index === Indices.ROTARY_SPEED_MULTIPLIER_BUTTON) {
            this.updateBumperValue(event.value);
        }
    }

    private calculateSpeed(stickInput: number, bumperMultiplier: number): number {
        const normalizedInput = Math.max(0, (stickInput - this.deadZoneRadius) / (1 - this.deadZoneRadius));

        let speedAdjustment = normalizedInput * this.baseMaxSpeed;

        if (normalizedInput > 0) {
            const speedBoost = bumperMultiplier * (1.0 - this.baseMaxSpeed);
            speedAdjustment += speedBoost;
        }

        speedAdjustment = Math.pow(speedAdjustment, this.curvatureCoefficient);
        speedAdjustment = Math.min(speedAdjustment, 1.0);

        // Apply zoom speed coefficient to the final calculated speed
        const zoomSpeedCoefficient = this.calculateZoomSpeedCoefficient();
        return speedAdjustment * zoomSpeedCoefficient;
    }

    private rotate() {
        if (this.speeds.azimuth === 0 && this.speeds.elevation === 0) {
            rotaryHaltElevationAndAzimuth();
            return;
        }

        if (this.speeds.azimuth > 0 && this.speeds.elevation > 0) {
            rotateBoth(
                this.speeds.azimuth,
                this.directions.azimuth,
                this.speeds.elevation,
                this.directions.elevation
            );
            return;
        }

        if (this.speeds.azimuth > 0) {
            rotaryAzimuthRotate(
                this.speeds.azimuth,
                this.directions.azimuth
            );
            rotaryHaltElevation();
            return;
        }

        if (this.speeds.elevation > 0) {
            rotaryElevationRotate(
                this.speeds.elevation,
                this.directions.elevation
            );
            rotaryHaltAzimuth();
            return;
        }
    }

    private updateBumperValue(value: number) {
        this.bumperValue = value;
        this.handleStickMovement();
    }

    private handleStickMovement() {
        const azimuthValue = this.lastStickValues[Indices.ROTARY_AZIMUTH_STICK] || 0;
        const elevationValue = this.lastStickValues[Indices.ROTARY_ELEVATION_STICK] || 0;

        const magnitude = Math.sqrt(azimuthValue * azimuthValue + elevationValue * elevationValue);

        if (magnitude < this.deadZoneRadius) {
            this.speeds.azimuth = 0;
            this.speeds.elevation = 0;
        } else {
            const normalizedAzimuth = azimuthValue / magnitude;
            const normalizedElevation = elevationValue / magnitude;

            const speed = this.calculateSpeed(magnitude, this.bumperValue);

            this.speeds.azimuth = Math.abs(normalizedAzimuth * speed);
            this.speeds.elevation = Math.abs(normalizedElevation * speed);
        }

        this.directions.azimuth = this.getDirection(azimuthValue);
        this.directions.elevation = this.getDirection(-elevationValue);

        this.rotate();
    }

    private getDirection(value: number): Types.JonGuiDataRotaryDirection {
        return value > 0
            ? Types.JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE
            : Types.JonGuiDataRotaryDirection.JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE;
    }
}

export { RotaryControl };