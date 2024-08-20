import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";
import * as Cmd from "ts/proto/jon/index.cmd.ts";

export function dayCameraSetGain(value: number): void {
    console.log(`Day Camera Setting gain to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setGain: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetExposure(value: number): void {
    console.log(`Day Camera Setting exposure to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setExposure: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetInfraRedFilter(value: boolean): void {
    console.log(`Day Camera Setting infra red filter to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setInfraRedFilter: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetIris(value: number): void {
    console.log(`Day Camera Setting iris to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setIris: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetAutoIris(value: boolean): void {
    console.log(`Day Camera Setting auto iris to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setAutoIris: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetSyncZoom(value: boolean): void {
    console.log(`Day Camera Setting sync zoom to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({syncZoom: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetRecording(value: boolean): void {
    console.log(`Day Camera Setting recording to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setRecording: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetAutoFocus(value: boolean): void {
    console.log(`Day Camera Setting auto focus to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({setAutoFocus: {value}});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraTakePhoto(): void {
    console.log("Day Camera Taking photo");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({
        photo: function (): Cmd.DayCamera.Photo {
            return Cmd.DayCamera.Photo.create();
        }
    });
    CSShared.sendCmdMessage(rootMsg);

}

export function dayCameraStart(): void {
    console.log("Day Camera Sending dayCamera start");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({start: Cmd.DayCamera.Start.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraGetPos(): void {
    console.log("Day Camera Getting dayCamera position");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({getPos: Cmd.DayCamera.GetPos.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraStop(): void {
    console.log("Day Camera Sending dayCamera stop");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({stop: Cmd.DayCamera.Stop.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetFocus(value: number): void {
    console.log(`Day Camera Setting day camera focus value to ${value}`);
    let focus = Cmd.DayCamera.Focus.create({setValue: {value}});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({focus});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraMoveFocus(targetValue: number, speed: number): void {
    console.log(`Moving day camera focus to ${targetValue} at speed ${speed}`);
    let focus = Cmd.DayCamera.Focus.create({move: {targetValue, speed}});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({focus});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraHaltFocus(): void {
    console.log("Halting day camera focus");
    let focus = Cmd.DayCamera.Focus.create({halt: {}});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({focus});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetZoom(value: number): void {
    console.log(`Day Camera Setting day camera zoom value to ${value}`);
    let zoom = Cmd.DayCamera.Zoom.create({setValue: {value}});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({zoom});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraMoveZoom(targetValue: number, speed: number): void {
    console.log(`Moving day camera zoom to ${targetValue} at speed ${speed}`);
    let zoom = Cmd.DayCamera.Zoom.create({move: {targetValue, speed}});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({zoom});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraHaltZoom(): void {
    console.log("Halting day camera zoom");
    let zoom = Cmd.DayCamera.Zoom.create({halt: {}});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({zoom});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraSetZoomTableValue (value: number): void {
    console.log(`Day Camera Setting optical zoom table value to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    let zoom = Cmd.DayCamera.Zoom.create({setZoomTableValue: {value}});
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({zoom});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraNextZoomTablePos (): void {
    console.log(`Day Camera Setting next optical zoom table position`);
    let rootMsg = CSShared.createRootMessage();
    let zoom = Cmd.DayCamera.Zoom.create({nextZoomTablePos: {}});
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({zoom});
    CSShared.sendCmdMessage(rootMsg);
}

export function dayCameraPrevZoomTablePos (): void {
    console.log(`Day Camera Setting previous optical zoom table position`);
    let rootMsg = CSShared.createRootMessage();
    let zoom = Cmd.DayCamera.Zoom.create({prevZoomTablePos: {}});
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({zoom});
    CSShared.sendCmdMessage(rootMsg);
}

export function getMeteo(): void {
    console.log("Requesting camera day meteo data");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.dayCamera = Cmd.DayCamera.Root.create({getMeteo: Cmd.DayCamera.GetMeteo.create()});
    CSShared.sendCmdMessage(rootMsg);
}
