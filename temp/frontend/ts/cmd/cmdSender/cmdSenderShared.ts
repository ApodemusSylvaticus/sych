import * as Cmd from '../../proto/jon/index.cmd.ts';

export function createRootMessage() {
    return Cmd.Root.create();
}

export function createAxisMessage() {
    return Cmd.RotaryPlatform.Axis.create();
}

export function encodeCmdMessage(rootMsg: Cmd.Root): Uint8Array {
    return Cmd.Root.encode(rootMsg).finish();
}

export function sendCmdMessage(rootMsg: Cmd.Root): void {
    if (! rootMsg.ping)  {
        console.log('Sending cmd message:', Cmd.Root.toJSON(rootMsg));
    }
    const encodedMessage = encodeCmdMessage(rootMsg);
    //const decodedMessage = Cmd.Root.decode(encodedMessage);
    // console.log('Decoded cmd message:', Cmd.Root.toJSON(decodedMessage));
    // console.log('Encoded cmd message:', encodedMessage.slice(0, 50));

    let shouldBuffer = true;

    if (rootMsg.ping) {
        shouldBuffer = false;
    }

    cmdChannel.postMessage({pld: encodedMessage, shouldBuffer: shouldBuffer});

}

export function sendCmdPing(): void {
    let rootMsg = createRootMessage();
    rootMsg.ping = Cmd.Ping.create();
    sendCmdMessage(rootMsg);
}

export function  sendCmdFrozen () : void {
    let rootMsg = createRootMessage();
    rootMsg.frozen = Cmd.Frozen.create();
    sendCmdMessage(rootMsg);
}

export function sendRotaryAxisCommand(axisMessageContent: {
    azimuth?: Cmd.RotaryPlatform.Azimuth;
    elevation?: Cmd.RotaryPlatform.Elevation
}): void {
    let axisMsg = createAxisMessage();

    if (axisMessageContent.azimuth) {
        axisMsg.azimuth = axisMessageContent.azimuth;
    }
    if (axisMessageContent.elevation) {
        axisMsg.elevation = axisMessageContent.elevation;
    }

    let rootMsg = createRootMessage();
    rootMsg.rotary = Cmd.RotaryPlatform.Root.create({axis: axisMsg});
    sendCmdMessage(rootMsg);
}

export const cmdChannel = new BroadcastChannel('cmd');
