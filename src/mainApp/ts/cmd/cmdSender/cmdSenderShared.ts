import * as Cmd from '../../proto/jon/index.cmd.ts';

export function createRootMessage() {
  return Cmd.Root.create();
}

export function encodeCmdMessage(rootMsg: Cmd.Root): Uint8Array {
  return Cmd.Root.encode(rootMsg).finish();
}

export function sendCmdMessage(rootMsg: Cmd.Root): void {
  if (!rootMsg.ping) {
    console.log('Sending cmd message:', Cmd.Root.toJSON(rootMsg));
  }
  const encodedMessage = encodeCmdMessage(rootMsg);
  // const decodedMessage = Cmd.Root.decode(encodedMessage);
  // console.log('Decoded cmd message:', Cmd.Root.toJSON(decodedMessage));
  // console.log('Encoded cmd message:', encodedMessage.slice(0, 50));

  let shouldBuffer = true;

  if (rootMsg.ping) {
    shouldBuffer = false;
  }

  cmdChannel.postMessage({ pld: encodedMessage, shouldBuffer: shouldBuffer });
}

export const cmdChannel = new BroadcastChannel('cmd');
