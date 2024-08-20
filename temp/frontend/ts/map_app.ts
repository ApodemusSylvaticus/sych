import { WebSocketConnectionManager } from 'js/webSocketConnectionManager.js';
import { sendCmdPing } from "ts/cmd/cmdSender/cmdSenderShared.ts";
import GlobeManager from "ts/globe/globeManager.ts";
import { DeviceStateDispatch } from "ts/statePub/deviceStateDispatch";
import { TargetsMenu } from "ts/components/lit/targetsMenu.ts";

document.addEventListener("DOMContentLoaded", function () {

    let wscm = new WebSocketConnectionManager();

    wscm.startWebSocketWorker("wss://sych.app/ws/ws_cmd", "cmd", "deviceState");

    // setInterval(() => {
    //     if (document.visibilityState === 'visible') {
    //         sendCmdPing();
    //     }
    // }, 300);

    let deviceStateDispatch = new DeviceStateDispatch();

    let globeManager = new GlobeManager( deviceStateDispatch, "globe" );

    let targetsMenu = new TargetsMenu();
    document.getElementById("targets-menu-container")?.appendChild(targetsMenu);
});