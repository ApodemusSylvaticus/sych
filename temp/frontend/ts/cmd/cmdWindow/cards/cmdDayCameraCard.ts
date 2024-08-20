import {Card} from './cmdShared.ts';
import {
    dayCameraGetPos,
    dayCameraHaltFocus,
    dayCameraHaltZoom,
    dayCameraMoveFocus,
    dayCameraMoveZoom,
    dayCameraSetAutoFocus,
    dayCameraSetAutoIris,
    dayCameraSetExposure,
    dayCameraSetFocus,
    dayCameraSetGain,
    dayCameraSetInfraRedFilter,
    dayCameraSetIris,
    dayCameraSetRecording,
    dayCameraSetSyncZoom,
    dayCameraSetZoom,
    dayCameraStart,
    dayCameraStop,
    dayCameraTakePhoto,
    dayCameraSetZoomTableValue,
    dayCameraNextZoomTablePos,
    dayCameraPrevZoomTablePos,
    getMeteo
} from "ts/cmd/cmdSender/cmdDayCamera.ts";
import {
    createButton,
    createDropdown,
    createInput,
    createNormalizedSlider,
    createSubCard
} from "./CardElements.ts";

function attachDayCameraEventListeners(): void {
    document.getElementById('DCamStart')?.addEventListener('click', dayCameraStart);
    document.getElementById('DCamStop')?.addEventListener('click', dayCameraStop);
    document.getElementById('DCamGetMeteo')?.addEventListener('click', getMeteo);
    document.getElementById('DCamTakePhoto')?.addEventListener('click', dayCameraTakePhoto);
    document.getElementById('DCamSetFocus')?.addEventListener('click', () =>
        dayCameraSetFocus(parseFloat((document.getElementById('DCamFocusValue') as HTMLInputElement).value)));
    document.getElementById('DCamGetPos')?.addEventListener('click', () => dayCameraGetPos());
    document.getElementById('DCamMoveFocus')?.addEventListener('click', () =>
        dayCameraMoveFocus(
            parseFloat((document.getElementById('DCamFocusTargetValue') as HTMLInputElement).value),
            parseFloat((document.getElementById('DCamFocusSpeedValue') as HTMLInputElement).value)));
    document.getElementById('DCamHaltFocus')?.addEventListener('click', dayCameraHaltFocus);
    document.getElementById('DCamSetZoom')?.addEventListener('click', () =>
        dayCameraSetZoom(parseFloat((document.getElementById('DCamZoomValue') as HTMLInputElement).value)));
    document.getElementById('DCamMoveZoom')?.addEventListener('click', () =>
        dayCameraMoveZoom(
            parseFloat((document.getElementById('DCamZoomTargetValue') as HTMLInputElement).value),
            parseFloat((document.getElementById('DCamZoomSpeedValue') as HTMLInputElement).value)));
    document.getElementById('DCamHaltZoom')?.addEventListener('click', dayCameraHaltZoom);
    document.getElementById('DCamSetExposure')?.addEventListener('click', () =>
        dayCameraSetExposure(parseFloat((document.getElementById('DCamExposureValue') as HTMLInputElement).value)));
    document.getElementById('DCamSetGain')?.addEventListener('click', () =>
        dayCameraSetGain(parseFloat((document.getElementById('DCamGainValue') as HTMLInputElement).value)));
    document.getElementById('DCamSetIris')?.addEventListener('click', () =>
        dayCameraSetIris(parseFloat((document.getElementById('DCamIrisValue') as HTMLInputElement).value)));
    document.getElementById('DCamSetAutoFocusOn')?.addEventListener('click', () => {
        dayCameraSetAutoFocus(true);
    });
    document.getElementById('DCamSetAutoFocusOff')?.addEventListener('click', () => {
        dayCameraSetAutoFocus(false);
    });
    document.getElementById('DCamSetRecordingOn')?.addEventListener('click', () => {
        dayCameraSetRecording(true);
    });
    document.getElementById('DCamSetRecordingOff')?.addEventListener('click', () => {
        dayCameraSetRecording(false);
    });
    document.getElementById('DCamSetInfraRedFilterOn')?.addEventListener('click', () => {
        dayCameraSetInfraRedFilter(true);
    });
    document.getElementById('DCamSetInfraRedFilterOff')?.addEventListener('click', () => {
        dayCameraSetInfraRedFilter(false);
    });
    document.getElementById('DCamSetAutoIrisOn')?.addEventListener('click', () => {
        dayCameraSetAutoIris(true);
    });
    document.getElementById('DCamSetAutoIrisOff')?.addEventListener('click', () => {
        dayCameraSetAutoIris(false);
    });
    document.getElementById('DCamSetSyncZoomOn')?.addEventListener('click', () => {
        dayCameraSetSyncZoom(true);
    });
    document.getElementById('DCamSetSyncZoomOff')?.addEventListener('click', () => {
        dayCameraSetSyncZoom(false);
    });

    document.getElementById('DCamSetZoomTableValue')?.addEventListener('click', () => {
        const input = document.getElementById('DCamZoomTableValue') as HTMLInputElement;
        const value = Number(input.value);
        dayCameraSetZoomTableValue(value);
    });

    document.getElementById('DCamNextZoomTablePos')?.addEventListener('click', () => {
        dayCameraNextZoomTablePos();
    });

    document.getElementById('DCamPrevZoomTablePos')?.addEventListener('click', () => {
        dayCameraPrevZoomTablePos();
    });
}

function createDayCameraCard(): Card {
    const dayCameraCard = document.createElement('div');
    dayCameraCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = [
        createSubCard("DCamControls", "Controls", [
            createButton("DCamStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("DCamStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
            createButton("DCamGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
            createButton("DCamTakePhoto", "Take Photo", "bg-green-500 text-white hover:bg-green-700"),
            createButton("DCamGetPos", "Get Position", "bg-yellow-500 text-white hover:bg-yellow-700")
        ]),
        createSubCard("DCamFocusSettings", "Focus", [
            createNormalizedSlider("DCamFocusValue", "Set Focus Value (0.0 - 1.0)"),
            createButton("DCamSetFocus", "Set Focus", "bg-blue-500 text-white hover:bg-blue-700"),
            createNormalizedSlider("DCamFocusTargetValue", "Move Focus Target Value (0.0 - 1.0)"),
            createNormalizedSlider("DCamFocusSpeedValue", "Move Focus Speed (0.0 - 1.0)"),
            createButton("DCamMoveFocus", "Move Focus", "bg-orange-500 text-white hover:bg-orange-700"),
            createButton("DCamHaltFocus", "Halt Focus", "bg-yellow-500 text-white hover:bg-yellow-700")
        ]),
        createSubCard("DCamZoomSettings", "Zoom", [
            createNormalizedSlider("DCamZoomValue", "Set Zoom Value (0.0 - 1.0)"),
            createButton("DCamSetZoom", "Set Zoom", "bg-blue-500 text-white hover:bg-blue-700"),
            createNormalizedSlider("DCamZoomTargetValue", "Move Zoom Target Value (0.0 - 1.0)"),
            createNormalizedSlider("DCamZoomSpeedValue", "Move Zoom Speed (0.0 - 1.0)"),
            createButton("DCamMoveZoom", "Move Zoom", "bg-orange-500 text-white hover:bg-orange-700"),
            createButton("DCamHaltZoom", "Halt Zoom", "bg-yellow-500 text-white hover:bg-yellow-700")
        ]),
        createSubCard("DCamImageSettings", "Image Settings", [
            createInput("DCamExposureValue", "Set Exposure (0.0 - 1.0)", "DCamSetExposure"),
            createButton("DCamSetExposure", "Set Exposure", "bg-purple-500 text-white hover:bg-purple-700"),
            createInput("DCamGainValue", "Set Gain (0.0 - 1.0)", "DCamSetGain"),
            createButton("DCamSetGain", "Set Gain", "bg-green-500 text-white hover:bg-purple-700"),
            createInput("DCamIrisValue", "Set Iris (0.0 - 1.0)", "DCamSetIris"),
            createButton("DCamSetIris", "Set Iris", "bg-yellow-500 text-white hover:bg-purple-700"),
        ]),
        createSubCard("DCamAutoFocusSettings", "Auto Focus", [
            createButton("DCamSetAutoFocusOn", "On", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("DCamSetAutoFocusOff", "Off", "bg-red-500 text-white hover:bg-red-700")
        ]),
        createSubCard("DCamRecordingSettings", "Recording", [
            createButton("DCamSetRecordingOn", "On", "bg-green-500 text-white hover:bg-green-700"),
            createButton("DCamSetRecordingOff", "Off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("DCamInfraRedFilterSettings", "Infra-Red Filter", [
            createButton("DCamSetInfraRedFilterOn", "On", "bg-green-500 text-white hover:bg-green-700"),
            createButton("DCamSetInfraRedFilterOff", "Off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("DCamAutoIrisSettings", "Auto Iris", [
            createButton("DCamSetAutoIrisOn", "On", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("DCamSetAutoIrisOff", "Off", "bg-red-500 text-white hover:bg-red-700")
        ]),
        createSubCard("DCamSyncZoomSettings", "Sync Zoom", [
            createButton("DCamSetSyncZoomOn", "On", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("DCamSetSyncZoomOff", "Off", "bg-red-500 text-white hover:bg-red-700")
        ]),
        createSubCard("DCZoomTableControl", "Zoom Table Control", [
            createButton("DCamNextZoomTablePos", "Next Zoom Table Position", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("DCamPrevZoomTablePos", "Previous Zoom Table Position", "bg-red-500 text-white hover:bg-red-700"),
            createInput("DCamZoomTableValue", "Enter zoom table index", "number"),
            createButton("DCamSetZoomTableValue", "Set Zoom Table Value", "bg-green-500 text-white hover:bg-green-700")
        ]),
    ];

    const dropdown = createDropdown("DCam-dd", subCards);
    dayCameraCard.appendChild(dropdown);

    subCards.forEach(subCard => dayCameraCard.appendChild(subCard));

    queueMicrotask(attachDayCameraEventListeners);

    return {name: 'Day Camera', element: dayCameraCard};
}

export {createDayCameraCard};
