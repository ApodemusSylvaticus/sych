import * as Cmd from "ts/proto/jon/index.cmd.ts";
import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";
import * as Types from "ts/proto/jon/jon_shared_data_types.ts";

export function stringToPowerCanDevice(value: string): Types.JonGuiDataPowerCanDevice {
    switch (value) {
        case "compass":
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS;
        case "gps":
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_GPS;
        case "cam_day":
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY;
        case "cam_heat":
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT;
        case "lrf":
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_LRF;
        case "none":
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_NONE;
        default:
            return Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_UNSPECIFIED;
    }
}

function powerCanDeviceToString(device: Types.JonGuiDataPowerCanDevice): string {
    switch (device) {
        case Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS:
            return "Compass";
        case Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_GPS:
            return "GPS";
        case Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY:
            return "Day Camera";
        case Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT:
            return "Heat Camera";
        case Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_LRF:
            return "LRF";
        case Types.JonGuiDataPowerCanDevice.JON_GUI_DATA_POWER_CAN_DEVICE_NONE:
            return "None";
        default:
            return "Unspecified";
    }
}

export function PowerGetMeteo(): void {
    console.log("Requesting power module meteo data");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({getMeteo: Cmd.Power.GetMeteo.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function PowerPowerOn(device: Types.JonGuiDataPowerCanDevice): void {
    console.log(`Powering on ${powerCanDeviceToString(device)}`);
    let powerOn = Cmd.Power.PowerOn.create();
    let pld = Cmd.Power.SetDeviceState.create({powerOn, device});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({setDeviceState: pld});
    CSShared.sendCmdMessage(rootMsg);
}

export function PowerPowerOff(device: Types.JonGuiDataPowerCanDevice): void {
    console.log(`Powering off ${powerCanDeviceToString(device)}`);
    let powerOff = Cmd.Power.PowerOff.create();
    let pld = Cmd.Power.SetDeviceState.create({powerOff, device});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({setDeviceState: pld});
    CSShared.sendCmdMessage(rootMsg);
}

export function PowerPowerReset(device: Types.JonGuiDataPowerCanDevice): void {
    console.log(`Resetting power ${powerCanDeviceToString(device)}`);
    let powerReset = Cmd.Power.PowerReset.create();
    let pld = Cmd.Power.SetDeviceState.create({powerReset, device});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({setDeviceState: pld});
    CSShared.sendCmdMessage(rootMsg);
}

export function PowerCanOn(device: Types.JonGuiDataPowerCanDevice): void {
    console.log(`CAN on ${powerCanDeviceToString(device)}`);
    let canOn = Cmd.Power.CanOn.create();
    let pld = Cmd.Power.SetDeviceState.create({canOn, device});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({setDeviceState: pld});
    CSShared.sendCmdMessage(rootMsg);
}

export function PowerCanOff(device: Types.JonGuiDataPowerCanDevice): void {
    console.log(`CAN off ${powerCanDeviceToString(device)}`);
    let canOff = Cmd.Power.CanOff.create();
    let pld = Cmd.Power.SetDeviceState.create({canOff, device});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({setDeviceState: pld});
    CSShared.sendCmdMessage(rootMsg);
}

export function PowerCanReset(device: Types.JonGuiDataPowerCanDevice): void {
    console.log(`CAN reset ${powerCanDeviceToString(device)}`);
    let canReset = Cmd.Power.CanReset.create();
    let pld = Cmd.Power.SetDeviceState.create({canReset, device});
    let rootMsg = CSShared.createRootMessage();
    rootMsg.power = Cmd.Power.Root.create({setDeviceState: pld});
    CSShared.sendCmdMessage(rootMsg);
}