import * as Cmd from "ts/proto/jon/index.cmd.ts";
import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";

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