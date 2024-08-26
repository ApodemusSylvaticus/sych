import * as Cmd from "ts/proto/jon/index.cmd.ts";
import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";
import {JonGuiDataVideoChannel} from "../../proto/jon/jon_shared_data_types.ts";

export function OSDShowDefaultScreen(): void {
    console.log("Sending show default screen");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.osd = Cmd.OSD.Root.create({showDefaultScreen: Cmd.OSD.ShowDefaultScreen.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function OSDShowLRFMeasureScreen(): void {
    console.log("Sending show LRF measure screen");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.osd = Cmd.OSD.Root.create({showLrfMeasureScreen: Cmd.OSD.ShowLRFMeasureScreen.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function OSDShowLRFResultScreen(): void {
    console.log("Sending show LRF result screen");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.osd = Cmd.OSD.Root.create({showLrfResultScreen: Cmd.OSD.ShowLRFResultScreen.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function OSDShowLRFResultSimplifiedScreen(): void {
    console.log("Sending show LRF result simplified screen");
    let rootMsg = CSShared.createRootMessage();
    rootMsg.osd = Cmd.OSD.Root.create({showLrfResultSimplifiedScreen: Cmd.OSD.ShowLRFResultSimplifiedScreen.create()});
    CSShared.sendCmdMessage(rootMsg);
}

export function OSDStartTrackNDC(channel: JonGuiDataVideoChannel, x: number, y:number): void {
    console.log(`Sending start track NDC command with channel ${channel}, x ${x}, y ${y}`);
    let rootMsg = CSShared.createRootMessage();
    const cmd = Cmd.OSD.StartTrackNDC.create({channel: channel, x: x, y: y});
    rootMsg.osd = Cmd.OSD.Root.create({startTrackNdc: cmd});
    CSShared.sendCmdMessage(rootMsg);
}