import {Card} from './cmdShared.ts';
import {
    heatCameraCalibrate,
    heatCameraFocusIn,
    heatCameraFocusOut,
    heatCameraFocusStop,
    heatCameraGetPos,
    heatCameraHaltFocus,
    heatCameraHaltZoom,
    heatCameraMoveFocus,
    heatCameraMoveZoom,
    heatCameraSetAgc,
    heatCameraSetAutoFocus,
    heatCameraSetFilter,
    heatCameraSetFocus,
    heatCameraSetRecording,
    heatCameraSetSyncZoom,
    heatCameraSetZoom,
    heatCameraSetZoomTableValue,
    heatCameraStart,
    heatCameraStop,
    heatCameraTakePhoto,
    heatCameraZoomIn,
    heatCameraZoomOut,
    heatCameraZoomStop,
    stringToHeatCameraAgcMode,
    stringToHeatCameraFilter,
    heatCameraNextZoomTablePos,
    heatCameraPrevZoomTablePos,
    getMeteo,
    enableDDE,
    disableDDE,
    setDDELevel
} from "ts/cmd/cmdSender/cmdHeatCamera.ts";
import {
    createButton,
    createDropdown,
    createNormalizedSlider,
    createSelect,
    createSubCard,
    createInput,
} from "./CardElements.ts";

function attachEventListeners(): void {
    document.getElementById('HCamStart')?.addEventListener('click', heatCameraStart);
    document.getElementById('HCamStop')?.addEventListener('click', heatCameraStop);
    document.getElementById('HCamGetMeteo')?.addEventListener('click', getMeteo);
    document.getElementById('HCamGetPos')?.addEventListener('click', () => heatCameraGetPos());
    document.getElementById('HCamFocusHalt')?.addEventListener('click', heatCameraHaltFocus);
    document.getElementById('HCamZoomHalt')?.addEventListener('click', heatCameraHaltZoom);
    document.getElementById('HCamTakePhoto')?.addEventListener('click', heatCameraTakePhoto);

    document.getElementById('HCamZoomIn')?.addEventListener('mousedown', heatCameraZoomIn);
    document.getElementById('HCamZoomOut')?.addEventListener('mousedown', heatCameraZoomOut);
    document.getElementById('HCamZoomIn')?.addEventListener('mouseup', heatCameraZoomStop);
    document.getElementById('HCamZoomOut')?.addEventListener('mouseup', heatCameraZoomStop);
    document.getElementById('HCamZoomStop')?.addEventListener('click', heatCameraZoomStop);

    document.getElementById('HCamFocusIn')?.addEventListener('mousedown', heatCameraFocusIn);
    document.getElementById('HCamFocusOut')?.addEventListener('mousedown', heatCameraFocusOut);
    document.getElementById('HCamFocusIn')?.addEventListener('mouseup', heatCameraFocusStop);
    document.getElementById('HCamFocusOut')?.addEventListener('mouseup', heatCameraFocusStop);
    document.getElementById('HCamFocusStop')?.addEventListener('click', heatCameraFocusStop);

    document.getElementById('HCamCalibrate')?.addEventListener('click', heatCameraCalibrate);


    document.getElementById('HCamEnableDDE')?.addEventListener('click', enableDDE);
    document.getElementById('HCamDisableDDE')?.addEventListener('click', disableDDE);

    document.getElementById('HCamSetZoomTableValue')?.addEventListener('click', () => {
        const input = document.getElementById('HCamZoomTableValue') as HTMLInputElement;
        const value = Number(input.value);
        heatCameraSetZoomTableValue(value);
    });

    document.getElementById('HCamNextZoomTablePos')?.addEventListener('click', heatCameraNextZoomTablePos);

    document.getElementById('HCamPrevZoomTablePos')?.addEventListener('click', heatCameraPrevZoomTablePos);

    setupHeatCameraFocusAndZoomActions();
    setupHeatCameraSettingsActions();
}

function setupHeatCameraFocusAndZoomActions(): void {
    const actions = ['Focus', 'Zoom'];
    actions.forEach(action => {
        const setValueInputId = `HCamSet${action}Value`;
        const moveValueInputId = `HCamMove${action}Value`;
        const moveSpeedInputId = `HCamMove${action}Speed`;

        document.getElementById(`HCamSet${action}`)?.addEventListener('click', () => {
            const input = document.getElementById(setValueInputId) as HTMLInputElement;
            const value = Number(input.value);
            if (action === 'Focus') heatCameraSetFocus(value);
            else heatCameraSetZoom(value);
        });

        document.getElementById(`HCamMove${action}`)?.addEventListener('click', () => {
            const targetInput = document.getElementById(moveValueInputId) as HTMLInputElement;
            const speedInput = document.getElementById(moveSpeedInputId) as HTMLInputElement;
            const targetValue = Number(targetInput.value);
            const speed = Number(speedInput.value);

            if (action === 'Focus') heatCameraMoveFocus(targetValue, speed);
            else heatCameraMoveZoom(targetValue, speed);
        });

        document.getElementById(`HCamHalt${action}`)?.addEventListener('click', () => {
            if (action === 'Focus') heatCameraHaltFocus();
            else heatCameraHaltZoom();
        });
    });
}

function setupHeatCameraSettingsActions(): void {
    document.getElementById('HCamSetAGC')?.addEventListener('click', () => {
        const agcModeSelect = document.getElementById('HCamAGCMode');
        const input = agcModeSelect as HTMLSelectElement;
        const agcMode = stringToHeatCameraAgcMode(input.value);
        heatCameraSetAgc(agcMode);
    });

    document.getElementById('HCamSetFilter')?.addEventListener('click', () => {
        const filterModeSelect = document.getElementById('HCamFilterMode');
        const input = filterModeSelect as HTMLSelectElement;
        const filterMode = stringToHeatCameraFilter(input.value);
        heatCameraSetFilter(filterMode);
    });

    document.getElementById('HCamSetDDELevel')?.addEventListener('click', () => {
        const ddeLevelInput = document.getElementById('HCamDDELevel');
        const input = ddeLevelInput as HTMLInputElement;
        const ddeLevel = Number(input.value);
        setDDELevel(ddeLevel);
    });

    setupOnOffSettingsActions();
}

function setupOnOffSettingsActions() {
    const settingsActions = {
        'AutoFocus': heatCameraSetAutoFocus,
        'Recording': heatCameraSetRecording,
        'SyncZoom': heatCameraSetSyncZoom
    };

    Object.entries(settingsActions).forEach(([setting, actionFunction]) => {
        document.getElementById(`HCamSet${setting}On`)?.addEventListener('click', () => actionFunction(true));
        document.getElementById(`HCamSet${setting}Off`)?.addEventListener('click', () => actionFunction(false));
    });
}

export function createHeatCameraCard(): Card {
    const heatCameraCard = document.createElement('div');
    heatCameraCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = [
        createSubCard("control", "Control", [
            createButton("HCamStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("HCamStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
            createButton("HCamGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamTakePhoto", "Take Photo", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamGetPos", "Get Position", "bg-yellow-500 text-white hover:bg-yellow-700"),
            createButton("HCamCalibrate", "Calibrate", "bg-yellow-500 text-white hover:bg-yellow-700"),
        ]),
        createSubCard("focusControl", "Focus Control", [
            createButton("HCamFocusIn", "Focus In", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamFocusOut", "Focus Out", "bg-red-500 text-white hover:bg-red-700"),
            createButton("HCamFocusStop", "Focus Stop", "bg-yellow-500 text-white hover:bg-yellow-700"),
            createNormalizedSlider("HCamSetFocusValue", "Set Focus Value (0.0 - 1.0)"),
            createButton("HCamSetFocus", "Set Focus", "bg-green-500 text-white hover:bg-green-700"),
            createNormalizedSlider("HCamMoveFocusValue", "Move To Value (0.0 - 1.0)"),
            createNormalizedSlider("HCamMoveFocusSpeed", "Speed (0.0 - 1.0)"),
            createButton("HCamMoveFocus", "Move Focus", "bg-purple-500 text-white hover:bg-purple-700"),
            createButton("HCamFocusHalt", "Halt Focus", "bg-yellow-500 text-white hover:bg-yellow-700"),
        ]),
        createSubCard("zoomControl", "Zoom Control", [
            createButton("HCamZoomIn", "Zoom In", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamZoomOut", "Zoom Out", "bg-red-500 text-white hover:bg-red-700"),
            createButton("HCamZoomStop", "Zoom Stop", "bg-yellow-500 text-white hover:bg-yellow-700"),
            createNormalizedSlider("HCamSetZoomValue (digital)", "Set Zoom Value (0.0 - 1.0)"),
            createButton("HCamSetZoom", "Set Zoom (digital)", "bg-green-500 text-white hover:bg-green-700"),
            createNormalizedSlider("HCamMoveZoomValue", "Move To Value (0.0 - 1.0)"),
            createNormalizedSlider("HCamMoveZoomSpeed", "Speed (0.0 - 1.0)"),
            createButton("HCamMoveZoom", "Move Zoom", "bg-purple-500 text-white hover:bg-purple-700"),
            createButton("HCamZoomHalt", "Halt Zoom", "bg-yellow-500 text-white hover:bg-yellow-700"),
        ]),
        createSubCard("HCZoomTableControl", "Zoom Table Control", [
            createButton("HCamNextZoomTablePos", "Next Zoom Table Position", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamPrevZoomTablePos", "Previous Zoom Table Position", "bg-red-500 text-white hover:bg-red-700"),
            createInput("HCamZoomTableValue", "Enter zoom table index", "number"),
            createButton("HCamSetZoomTableValue", "Set Zoom Table Value", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("AGCMode", "AGC Mode", [
            createSelect("HCamAGCMode", ["mode_1", "mode_2", "mode_3"]),
            createButton("HCamSetAGC", "Set AGC Mode", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("DDELevel", "DDE Level", [
            createInput("HCamDDELevel", "Enter DDE Level", "number"),
            createButton("HCamSetDDELevel", "Set DDE Level", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamEnableDDE", "Enable DDE", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("HCamDisableDDE", "Disable DDE", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("FilterMode", "Filter Mode", [
            createSelect("HCamFilterMode", ["hot_black", "hot_white", "sepia"]),
            createButton("HCamSetFilter", "Set Filter Mode", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("AutoFocus", "Auto Focus", [
            createButton("HCamSetAutoFocusOn", "On", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamSetAutoFocusOff", "Off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("Recording", "Recording", [
            createButton("HCamSetRecordingOn", "On", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamSetRecordingOff", "Off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("SyncZoom", "Sync Zoom", [
            createButton("HCamSetSyncZoomOn", "On", "bg-green-500 text-white hover:bg-green-700"),
            createButton("HCamSetSyncZoomOff", "Off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
    ];

    const dropdown = createDropdown("HCam-dd", subCards);
    heatCameraCard.appendChild(dropdown);
    subCards.forEach(subCard => heatCameraCard.appendChild(subCard));

    queueMicrotask(attachEventListeners);

    return {name: 'Heat Camera', element: heatCameraCard};
}
