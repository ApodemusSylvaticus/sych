import { ChannelType } from "js/canvasManager";
import * as Types from "ts/proto/jon/jon_shared_data_types.ts";
import { GestureEvent } from "../interactionObserver/pointerGestureEvents";
import {
    dayCameraNextZoomTablePos, dayCameraPrevZoomTablePos
} from "ts/cmd/cmdSender/cmdDayCamera.ts";
import {
    heatCameraNextZoomTablePos, heatCameraPrevZoomTablePos
} from "ts/cmd/cmdSender/cmdHeatCamera.ts";
import { RotaryPanController } from './rotaryPanController';
import {DeviceStateDispatch} from "ts/statePub/deviceStateDispatch.ts";
import {RotateToNDC} from "ts/cmd/cmdSender/cmdRotary.ts";
import {OSDStartTrackNDC} from "ts/cmd/cmdSender/cmdOSD.ts";

interface SwipeCallback {
    (direction: 'up' | 'down' | 'left' | 'right', source: string, channelType: ChannelType): void;
}

export class InteractionHandler {
    private readonly onSwipe: SwipeCallback;
    private readonly name: string;
    private readonly channelType: ChannelType;
    private isDestroyed: boolean = false;
    private rotaryPanController: RotaryPanController;

    constructor(name: string, channelType: ChannelType, onSwipe: SwipeCallback, deviceState: DeviceStateDispatch) {
        this.name = name;
        this.channelType = channelType;
        this.onSwipe = onSwipe;
        this.rotaryPanController = new RotaryPanController(deviceState, channelType);
    }

    handleInteraction(event: GestureEvent): void {
        if (this.isDestroyed) {
            console.warn(`[${this.name}][${this.channelType}] Interaction handler has been destroyed. Ignoring event.`);
            return;
        }

        switch (event.type) {
            case 'swipe':
                this.handleSwipe(event.direction);
                break;
            case 'panStart':
                this.handlePanStart(event.ndcX, event.ndcY);
                break;
            case 'panMove':
                this.handlePanMove(event.ndcDeltaX, event.ndcDeltaY, event.aspectRatio);
                break;
            case 'panStop':
                this.handlePanStop();
                break;
            case 'tap':
                this.handleTap(event.x, event.y, event.ndcX, event.ndcY);
                break;
            case 'doubleTap':
                this.handleDoubleTap(event.x, event.y, event.ndcX, event.ndcY);
                break;
            case 'zoomIn':
                this.handleZoomIn();
                break;
            case 'zoomOut':
                this.handleZoomOut();
                break;
            default:
                console.warn(`[${this.name}][${this.channelType}] Unhandled interaction type: ${(event as any).type}`);
        }
    }

    private handleSwipe(direction: 'up' | 'down' | 'left' | 'right'): void {
        // console.log(`[${this.name}][${this.channelType}] Swipe`, { direction });
        this.onSwipe(direction, this.name, this.channelType);
    }

    private handlePanStart(ndcX: number, ndcY: number): void {
        this.rotaryPanController.startPan();
       // console.log(`[${this.name}][${this.channelType}] Pan started`, { ndcX, ndcY });
    }

    private handlePanMove(ndcDeltaX: number, ndcDeltaY: number, aspectRatio: number): void {
        // Adjust ndcDeltaX based on the aspect ratio
        const adjustedNdcDeltaX = ndcDeltaX * aspectRatio;

        // Pass the adjusted values to the rotaryPanController
        this.rotaryPanController.updatePan(adjustedNdcDeltaX, ndcDeltaY);
        // console.log(`[${this.name}][${this.channelType}] Pan moved`, { adjustedNdcDeltaX, ndcDeltaY });
    }

    private handlePanStop(): void {
        this.rotaryPanController.stopPan();
       // console.log(`[${this.name}][${this.channelType}] Pan stopped`);
    }

    private handleTap(x: number, y: number, ndcX: number, ndcY: number): void {
       // console.log(`[${this.name}][${this.channelType}] Tap`, { x, y, ndcX, ndcY });
        let channel: Types.JonGuiDataVideoChannel;
        switch (this.channelType) {
            case ChannelType.HEAT:
                channel = Types.JonGuiDataVideoChannel.JON_GUI_DATA_VIDEO_CHANNEL_HEAT;
                break;
            case ChannelType.DAY:
                channel = Types.JonGuiDataVideoChannel.JON_GUI_DATA_VIDEO_CHANNEL_DAY;
                break;
            default:
                console.error(`[${this.name}][${this.channelType}] Invalid channel type`);
                return
        }
        RotateToNDC(channel, ndcX, ndcY);
    }

    private handleDoubleTap(x: number, y: number, ndcX: number, ndcY: number): void {
       // console.log(`[${this.name}][${this.channelType}] Double tap`, { x, y, ndcX, ndcY });
        let channel: Types.JonGuiDataVideoChannel;
        switch (this.channelType) {
            case ChannelType.HEAT:
                channel = Types.JonGuiDataVideoChannel.JON_GUI_DATA_VIDEO_CHANNEL_HEAT;
                break;
            case ChannelType.DAY:
                channel = Types.JonGuiDataVideoChannel.JON_GUI_DATA_VIDEO_CHANNEL_DAY;
                break;
            default:
                console.error(`[${this.name}][${this.channelType}] Invalid channel type`);
                return
        }
        OSDStartTrackNDC(channel, ndcX, ndcY);
    }

    private handleZoomIn(): void {
      //  console.log(`[${this.name}][${this.channelType}] Zoom in`);
        if (this.channelType === ChannelType.HEAT) {
            heatCameraNextZoomTablePos();
        } else {
            dayCameraNextZoomTablePos();
        }
    }

    private handleZoomOut(): void {
      //  console.log(`[${this.name}][${this.channelType}] Zoom out`);
        if (this.channelType === ChannelType.HEAT) {
            heatCameraPrevZoomTablePos();
        } else {
            dayCameraPrevZoomTablePos();
        }
    }

    destroy(): void {
        console.log(`[${this.name}][${this.channelType}] Destroying interaction handler`);
        this.isDestroyed = true;
        this.rotaryPanController.destroy();
    }
}
