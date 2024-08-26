import * as Cmd from "ts/proto/jon/index.cmd.ts";
import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";

interface GeoTestArgs {
    longitude?: number;
    latitude?: number;
    altitude?: number;
    range?: number;
    azimuth?: number;
    elevation?: number;
    bank?: number;
}

export function GeoTestSend(args: GeoTestArgs): void {
    console.log("Sending GeoTest with data ", args);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.geoTest = Cmd.GeoTest.Root.create({
        longitude: args.longitude ?? 0,
        latitude: args.latitude ?? 0,
        altitude: args.altitude ?? 0,
        range: args.range ?? 0,
        azimuth: args.azimuth ?? 0,
        elevation: args.elevation ?? 0,
        bank: args.bank ?? 0
    });
    CSShared.sendCmdMessage(rootMsg);
}
