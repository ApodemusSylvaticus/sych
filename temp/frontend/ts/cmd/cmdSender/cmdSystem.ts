import * as Cmd from "ts/proto/jon/index.cmd.ts";
import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";

export function SystemReboot(): void {
    console.log("Sending system reboot");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.system = Cmd.System.Root.create({reboot: Cmd.System.Reboot.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function SystemPowerOff(): void {
    console.log("Sending system power off");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.system = Cmd.System.Root.create({powerOff: Cmd.System.PowerOff.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function SystemStartAll(): void {
    console.log("Sending system start all");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.system = Cmd.System.Root.create({startAll: Cmd.System.StartALl.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function SystemStopAll(): void {
    console.log("Sending system stop all");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.system = Cmd.System.Root.create({stopAll: Cmd.System.StopALl.create()});
    CSShared.sendCmdMessage(rootMsg);
}