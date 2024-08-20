import { WebSocketConnectionManager } from 'js/webSocketConnectionManager.js';

import { sendCmdPing, sendCmdFrozen } from "ts/cmd/cmdSender/cmdSenderShared.ts";
import { CanvasManager } from 'js/canvasManager.js';
import { InputDeviceManager } from './gamepad/GamepadBindings.ts';
import { DeviceStateDispatch } from "ts/statePub/deviceStateDispatch";
import { VideoProxyElement } from './components/lit/videoProxyElement/videoProxyElement.ts';
import { Alignment } from "./components/lit/aspectRatioElement/aspectRatioInteractiveTypes.ts";

let canvasManager: CanvasManager;

document.addEventListener("DOMContentLoaded", function () {
    canvasManager = new CanvasManager('main-canvas');

    if (isControllerTrue(window.location.href)) {
        let deviceStateDispatch = new DeviceStateDispatch();
        let day_cam_s = deviceStateDispatch.cameraDay;
        let heat_cam_s = deviceStateDispatch.cameraHeat;
        new InputDeviceManager({
            nextLayout: () => {
                canvasManager.nextLayout();
            },
            day_cam_signal: day_cam_s,
            heat_cam_signal: heat_cam_s
        });
    }

    canvasManager.initWorker().then(() => {
        let wscm = new WebSocketConnectionManager();
        wscm.startWebSocketWorker("wss://sych.app/ws/ws_video_day", "videoDayFeedback", "videoDay");
        wscm.startWebSocketWorker("wss://sych.app/ws/ws_video_heat", "videoHeatFeedback", "videoHeat");
        wscm.startWebSocketWorker("wss://sych.app/ws/ws_cmd", "cmd", "deviceState");

        let videoProxyMovable = new VideoProxyElement ();
        videoProxyMovable.name = "Movable Video";
        videoProxyMovable.ndcX = 0.0;
        videoProxyMovable.ndcY = 0.5;
        videoProxyMovable.ndcWidth = 0.4;
        videoProxyMovable.ndcHeight = 0.4;
        videoProxyMovable.mode = "resizable";
        videoProxyMovable.debug = true;
        videoProxyMovable.zIndex = 10;
        videoProxyMovable.aspectRatio = 16/9;
        videoProxyMovable.align = Alignment.Center;

       document.body.appendChild(videoProxyMovable);

       videoProxyMovable.position.subscribe((pos) => {
              console.log(pos);
       });

       videoProxyMovable.interaction.subscribe((interaction) => {
                console.log(interaction);
       });

         document.addEventListener('click', () => {
             canvasManager.nextLayout();
         });

        setInterval(() => {
            if (document.visibilityState === 'visible') {
                sendCmdPing();
            }
        }, 300);

        function handleVisibilityChange() {
            if (document.visibilityState === 'hidden') {
                sendCmdFrozen();
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleVisibilityChange);
        window.addEventListener('focus', handleVisibilityChange);
        window.addEventListener('beforeunload', () => {
            sendCmdFrozen();
        });

        requestAnimationFrame(handleVisibilityChange);

    }).catch((error: Error) => {
        console.error('Error initializing canvas:', error);
    });
});

function isControllerTrue(urlString: string): boolean {
    try {
        const url = new URL(urlString);
        const params = new URLSearchParams(url.search);
        return params.get('controller') === 'true';
    } catch (error) {
        console.error('Invalid URL:', error);
        return false;
    }
}
