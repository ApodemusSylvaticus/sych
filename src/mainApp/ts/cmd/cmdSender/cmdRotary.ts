import * as Cmd from '../../proto/jon/index.cmd.ts';
import * as CSShared from './cmdSenderShared.ts';

export function setRotateToGps(lon: number, lat: number, alt: number): void {
  console.log(`Setting rotate to GPS to ${lon}, ${lat}, ${alt}`);
  const rotateToGpsMsg = Cmd.RotaryPlatform.RotateToGPS.create({
    longitude: lon,
    latitude: lat,
    altitude: alt,
  });
  const rootMsg = CSShared.createRootMessage();
  rootMsg.rotary = Cmd.RotaryPlatform.Root.create({ rotateToGps: rotateToGpsMsg });
  CSShared.sendCmdMessage(rootMsg);
}
