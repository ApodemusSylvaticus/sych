import { WebSocketConnectionManager } from 'js/webSocketConnectionManager.js';
import { sendCmdPing, sendCmdFrozen } from "ts/cmd/cmdSender/cmdSenderShared.ts";
import {initCards} from "./cmd/cmdWindow/createDemoCmd.ts";

document.addEventListener("DOMContentLoaded", function () {
    initCards({nextLayout: () =>
        {window.alert("nextLayout not implemented, use controller or simply tap on video!");}});

    let wscm = new WebSocketConnectionManager();

    wscm.startWebSocketWorker("wss://sych.app/ws/ws_cmd", "cmd", "deviceState");

    setInterval(() => {
        if (document.visibilityState === 'visible' && document.hasFocus()) {
            sendCmdPing();
        }
    }, 300);
});
