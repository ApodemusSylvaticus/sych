import {Card} from './cmdShared.ts';
import {
    rotaryAzimuthRotate,
    rotaryAzimuthRotateRelative,
    rotaryAzimuthRotateRelativeSet,
    rotaryAzimuthRotateTo,
    rotaryAzimuthSetValue,
    rotaryElevationRotate,
    rotaryElevationRotateRelative,
    rotaryElevationRotateRelativeSet,
    rotaryElevationRotateTo,
    rotaryElevationSetValue,
    rotaryHalt,
    rotaryHaltAzimuth,
    rotaryHaltElevation,
    rotaryHaltElevationAndAzimuth,
    rotarySetPlatformAzimuth,
    rotarySetPlatformBank,
    rotarySetPlatformElevation,
    rotaryStart,
    rotaryStop,
    rotateBoth,
    rotateBothRelative,
    rotateBothRelativeSet,
    rotateBothTo,
    setBothTo,
    setCalculateBasePositionFromCompass,
    setRotateToGps,
    setOriginGps,
    stringToRotaryMode,
    setRotaryMode,
    stringToRotaryDirection,
    getMeteo
} from "ts/cmd/cmdSender/cmdRotary.ts";
import * as Types from "ts/proto/jon/jon_shared_data_types.ts";
import {
    createButton,
    createDropdown,
    createInput,
    createRowSeparator,
    createSelect,
    createSubCard
} from "./CardElements.ts";

function attachEventListeners(): void {
    document.getElementById('rotaryStart')?.addEventListener('click', rotaryStart);
    document.getElementById('rotaryStop')?.addEventListener('click', rotaryStop);
    document.getElementById('RotaryGetMeteo')?.addEventListener('click', getMeteo);
    document.getElementById('rotaryHalt')?.addEventListener('click', rotaryHalt);
    document.getElementById('rotaryHaltAzimuth')?.addEventListener('click', rotaryHaltAzimuth);
    document.getElementById('rotaryHaltElevation')?.addEventListener('click', rotaryHaltElevation);
    document.getElementById('rotaryHaltElevationAndAzimuth')?.addEventListener('click', rotaryHaltElevationAndAzimuth);

    document.getElementById('calculateBasePositionFromCompassOn')
        ?.addEventListener('click', () => setCalculateBasePositionFromCompass(true));
    document.getElementById('calculateBasePositionFromCompassOff')
        ?.addEventListener('click', () => setCalculateBasePositionFromCompass(false));

    const azimuthInput = document.getElementById('azimuthValue') as HTMLInputElement;
    const elevationInput = document.getElementById('elevationValue') as HTMLInputElement;
    const bankInput = document.getElementById('bankValue') as HTMLInputElement;

    document.getElementById('setOrientation')?.addEventListener('click',
        () => {
            if (azimuthInput.value) {
                rotarySetPlatformAzimuth(Number(azimuthInput.value));
            }
            if (elevationInput.value) {
                rotarySetPlatformElevation(Number(elevationInput.value));
            }
            if (bankInput.value) {
                rotarySetPlatformBank(Number(bankInput.value));
            }
        });

    setupActions();
}

function setupActions(): void {
    const rotateToValueInputAZ = document.getElementById(`rotateToValueAzimuth`) as HTMLInputElement;
    const rotateToSpeedInputAZ = document.getElementById(`rotateToSpeedAzimuth`) as HTMLInputElement;
    const rotateSpeedInputAZ = document.getElementById(`rotateSpeedAzimuth`) as HTMLInputElement;
    const rotateToDirectionSelectAZ = document.getElementById(`rotateToDirectionAzimuth`) as HTMLSelectElement;
    const rotateDirectionSelectAZ = document.getElementById(`rotateDirectionAzimuth`) as HTMLSelectElement;
    const setValueValueInputAZ = document.getElementById(`setValueValueAzimuth`) as HTMLInputElement;
    const setValueDirectionSelectAZ = document.getElementById(`setValueDirectionAzimuth`) as HTMLSelectElement;
    const rotateValueInputRelativeAZ = document.getElementById(`rotateValueAzimuthRelative`) as HTMLInputElement;
    const rotateSpeedInputRelativeAZ = document.getElementById(`rotateSpeedAzimuthRelative`) as HTMLInputElement;
    const rotateDirectionSelectRelativeAZ = document.getElementById(`rotateDirectionAzimuthRelative`) as HTMLSelectElement;
    const setValueValueInputRelativeAZ = document.getElementById(`setValueValueAzimuthRelative`) as HTMLInputElement;
    const setValueDirectionSelectRelativeAZ = document.getElementById(`setValueDirectionAzimuthRelative`) as HTMLSelectElement;

    const rotateToValueInputEL = document.getElementById(`rotateToValueElevation`) as HTMLInputElement;
    const rotateToSpeedInputEL = document.getElementById(`rotateToSpeedElevation`) as HTMLInputElement;
    const rotateSpeedInputEL = document.getElementById(`rotateSpeedElevation`) as HTMLInputElement;
    const rotateDirectionSelectEL = document.getElementById(`rotateDirectionElevation`) as HTMLSelectElement;
    const setValueValueInputEL = document.getElementById(`setValueValueElevation`) as HTMLInputElement;
    const rotateValueInputRelativeEL = document.getElementById(`rotateValueElevationRelative`) as HTMLInputElement;
    const rotateSpeedInputRelativeEL = document.getElementById(`rotateSpeedElevationRelative`) as HTMLInputElement;
    const rotateDirectionSelectRelativeEL = document.getElementById(`rotateDirectionElevationRelative`) as HTMLSelectElement;
    const setValueValueInputRelativeEL = document.getElementById(`setValueValueElevationRelative`) as HTMLInputElement;
    const setValueDirectionSelectRelativeEL = document.getElementById(`setValueDirectionElevationRelative`) as HTMLSelectElement;

    const RotaryGPSlatitudeValueEL = document.getElementById(`RotaryGPSlatitudeValue`) as HTMLInputElement;
    const RotaryGPSlongitudeValueEL = document.getElementById(`RotaryGPSlongitudeValue`) as HTMLInputElement;
    const RotaryGPSaltitudeValueEL = document.getElementById(`RotaryGPSaltitudeValue`) as HTMLInputElement;

    const RotarySetOriginGPSlatitudeValueEL = document.getElementById(`RotarySetOriginGPSlatitudeValue`) as HTMLInputElement;
    const RotarySetOriginGPSlongitudeValueEL = document.getElementById(`RotarySetOriginGPSlongitudeValue`) as HTMLInputElement;
    const RotarySetOriginGPSaltitudeValueEL = document.getElementById(`RotarySetOriginGPSaltitudeValue`) as HTMLInputElement;

    const RotaryModeSelect = document.getElementById(`RotaryModeSelect`) as HTMLSelectElement;
    const RotaryModeButton = document.getElementById(`RotaryModeButton`);

    RotaryModeButton?.addEventListener('click', () => {
        setRotaryMode(stringToRotaryMode(RotaryModeSelect.value));
    });

    document.getElementById(`RotaryGPSSetRotateToGps`)?.addEventListener('click', () => {
        if (RotaryGPSlatitudeValueEL.value && RotaryGPSlongitudeValueEL.value && RotaryGPSaltitudeValueEL.value) {
            setRotateToGps(Number(RotaryGPSlatitudeValueEL.value), Number(RotaryGPSlongitudeValueEL.value), Number(RotaryGPSaltitudeValueEL.value));
        }
    });

    document.getElementById(`RotarySetOriginGPSSetOriginGps`)?.addEventListener('click', () => {
        if (RotarySetOriginGPSlatitudeValueEL.value && RotarySetOriginGPSlongitudeValueEL.value && RotarySetOriginGPSaltitudeValueEL.value) {
            setOriginGps(Number(RotarySetOriginGPSlatitudeValueEL.value), Number(RotarySetOriginGPSlongitudeValueEL.value), Number(RotarySetOriginGPSaltitudeValueEL.value));
        }
    });

    document.getElementById(`rotateToOrientationButton`)?.addEventListener('click', () => {
        if (rotateToSpeedInputAZ.value && rotateToValueInputAZ.value && rotateToSpeedInputEL.value && rotateToValueInputEL.value) {
            rotateBothTo(Number(rotateToValueInputAZ.value), Number(rotateToSpeedInputAZ.value),
                stringToRotaryDirection(rotateToDirectionSelectAZ.value), Number(rotateToValueInputEL.value), Number(rotateToSpeedInputEL.value));
        } else if (rotateToSpeedInputAZ.value && rotateToValueInputAZ.value) {
            rotaryAzimuthRotateTo(Number(rotateToValueInputAZ.value), Number(rotateToSpeedInputAZ.value),
                stringToRotaryDirection(rotateToDirectionSelectAZ.value));
        } else if (rotateToSpeedInputEL.value && rotateToValueInputEL.value) {
            rotaryElevationRotateTo(Number(rotateToValueInputEL.value), Number(rotateToSpeedInputEL.value));
        }
    });

    document.getElementById(`continuousRotateOrientationButton`)?.addEventListener('click', () => {
        if (rotateSpeedInputAZ.value && rotateSpeedInputEL.value) {
            rotateBoth(Number(rotateSpeedInputAZ.value), stringToRotaryDirection(rotateDirectionSelectAZ.value),
                Number(rotateSpeedInputEL.value), stringToRotaryDirection(rotateDirectionSelectEL.value));
        } else if (rotateSpeedInputAZ.value) {
            rotaryAzimuthRotate(Number(rotateSpeedInputAZ.value), stringToRotaryDirection(rotateDirectionSelectAZ.value));
        } else if (rotateSpeedInputEL.value) {
            rotaryElevationRotate(Number(rotateSpeedInputEL.value), stringToRotaryDirection(rotateDirectionSelectEL.value));
        }
    });

    document.getElementById(`setValueOrientationButton`)?.addEventListener('click', () => {
        if (setValueValueInputAZ.value && setValueValueInputEL.value) {
            setBothTo(Number(setValueValueInputAZ.value), Number(setValueValueInputEL.value), stringToRotaryDirection(setValueDirectionSelectAZ.value));
        } else if (setValueValueInputAZ.value) {
            rotaryAzimuthSetValue(Number(setValueValueInputAZ.value), stringToRotaryDirection(setValueDirectionSelectAZ.value));
        } else if (setValueValueInputEL.value) {
            rotaryElevationSetValue(Number(setValueValueInputEL.value));
        }
    });

    document.getElementById(`continuousRotateOrientationRelativeButton`)?.addEventListener('click', () => {
        if (rotateSpeedInputRelativeAZ.value && rotateSpeedInputRelativeEL.value) {
            rotateBothRelative(Number(rotateValueInputRelativeAZ.value), Number(rotateSpeedInputRelativeAZ.value),
                stringToRotaryDirection(rotateDirectionSelectRelativeAZ.value), Number(rotateValueInputRelativeEL.value),
                Number(rotateSpeedInputRelativeEL.value), stringToRotaryDirection(rotateDirectionSelectRelativeEL.value));
        } else if (rotateSpeedInputRelativeAZ.value) {
            rotaryAzimuthRotateRelative(Number(rotateValueInputRelativeAZ.value), Number(rotateSpeedInputRelativeAZ.value),
                stringToRotaryDirection(rotateDirectionSelectRelativeAZ.value));
        } else if (rotateSpeedInputRelativeEL.value) {
            rotaryElevationRotateRelative(Number(rotateValueInputRelativeEL.value), Number(rotateSpeedInputRelativeEL.value),
                stringToRotaryDirection(rotateDirectionSelectRelativeEL.value));
        }
    });

    document.getElementById(`setValueOrientationRelativeButton`)?.addEventListener('click', () => {
        if (setValueValueInputRelativeAZ.value && setValueValueInputRelativeEL.value) {
            rotateBothRelativeSet(Number(setValueValueInputRelativeAZ.value), stringToRotaryDirection(setValueDirectionSelectRelativeAZ.value),
                Number(setValueValueInputRelativeEL.value), stringToRotaryDirection(setValueDirectionSelectRelativeEL.value));
        } else if (setValueValueInputRelativeAZ.value) {
            rotaryAzimuthRotateRelativeSet(Number(setValueValueInputRelativeAZ.value), stringToRotaryDirection(setValueDirectionSelectRelativeAZ.value));
        } else if (setValueValueInputRelativeEL.value) {
            rotaryElevationRotateRelativeSet(Number(setValueValueInputRelativeEL.value), stringToRotaryDirection(setValueDirectionSelectRelativeEL.value));
        }
    });
}

export function createRotaryCard(): Card {
    const rotaryCard = document.createElement('div');
    rotaryCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = [
        createSubCard("control", "Control", [
            createButton("rotaryStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("rotaryStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
            createButton("RotaryGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
            createButton("rotaryHalt", "Halt", "bg-yellow-500 text-white hover:bg-yellow-700"),
            createButton("rotaryHaltAzimuth", "Halt Azimuth", "bg-green-500 text-white hover:bg-green-700"),
            createButton("rotaryHaltElevation", "Halt Elevation", "bg-purple-500 text-white hover:bg-purple-700"),
            createButton("rotaryHaltElevationAndAzimuth", "Halt Azimuth and Elevation", "bg-cyan-500 text-white hover:bg-cyan-700")
        ]),
        createSubCard("setBaseOrientation", "Set Base Orientation", [
            createInput("azimuthValue", "Azimuth"),
            createInput("elevationValue", "Elevation"),
            createInput("bankValue", "Bank"),
            createButton("setOrientation", "Set Orientation", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("RotaryCompassIntegration", "Compass Integration", [
            createButton("calculateBasePositionFromCompassOn", "Base Position From Compass: on", "bg-green-500 text-white hover:bg-green-700"),
            createButton("calculateBasePositionFromCompassOff", "Base Position From Compass: off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("rotateToOrientation", "Rotate To Orientation", [
            createInput("rotateToValueAzimuth", "Value (Azimuth)"),
            createInput("rotateToSpeedAzimuth", "Speed (Azimuth)"),
            createSelect("rotateToDirectionAzimuth", ["Clockwise", "Counter Clockwise"]),
            createRowSeparator(),
            createInput("rotateToValueElevation", "Value (Elevation)"),
            createInput("rotateToSpeedElevation", "Speed (Elevation)"),
            createButton("rotateToOrientationButton", "Rotate To Orientation", "bg-purple-500 text-white hover:bg-purple-700"),
        ]),
        createSubCard("rotateOrientation", "Rotate Orientation", [
            createInput("rotateSpeedAzimuth", "Speed (Azimuth)"),
            createSelect("rotateDirectionAzimuth", ["Clockwise", "Counter Clockwise"]),
            createRowSeparator(),
            createInput("rotateSpeedElevation", "Speed (Elevation)"),
            createSelect("rotateDirectionElevation", ["Clockwise", "Counter Clockwise"]),
            createButton("continuousRotateOrientationButton", "Continuous Rotate", "bg-purple-500 text-white hover:bg-purple-700"),
        ]),
        createSubCard("setValueOrientation", "Set Value Orientation", [
            createInput("setValueValueAzimuth", "Value (Azimuth)"),
            createSelect("setValueDirectionAzimuth", ["Clockwise", "Counter Clockwise"]),
            createRowSeparator(),
            createInput("setValueValueElevation", "Value (Elevation)"),
            createButton("setValueOrientationButton", "Set Orientation", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("rotateOrientationRelative", "Rotate Orientation Relative", [
            createInput("rotateValueAzimuthRelative", "Value (Azimuth) relative"),
            createInput("rotateSpeedAzimuthRelative", "Speed (Azimuth) relative"),
            createSelect("rotateDirectionAzimuthRelative", ["Clockwise", "Counter Clockwise"]),
            createRowSeparator(),
            createInput("rotateValueElevationRelative", "Value (Elevation) relative"),
            createInput("rotateSpeedElevationRelative", "Speed (Elevation) relative"),
            createSelect("rotateDirectionElevationRelative", ["Clockwise", "Counter Clockwise"]),
            createButton("continuousRotateOrientationRelativeButton", "Continuous Rotate Relative", "bg-purple-500 text-white hover:bg-purple-700"),
        ]),
        createSubCard("setValueOrientationRelative", "Set Value Orientation Relative", [
            createInput("setValueValueAzimuthRelative", "Value (Azimuth) relative"),
            createSelect("setValueDirectionAzimuthRelative", ["Clockwise", "Counter Clockwise"]),
            createRowSeparator(),
            createInput("setValueValueElevationRelative", "Value (Elevation) relative"),
            createSelect("setValueDirectionElevationRelative", ["Clockwise", "Counter Clockwise"]),
            createButton("setValueOrientationRelativeButton", "Set Orientation Relative", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("RotarySetOriginGPSCommands", "Set origin GPS", [
            createInput("RotarySetOriginGPSlatitudeValue", "Latitude", "setManualPositionButton"),
            createInput("RotarySetOriginGPSlongitudeValue", "Longitude", "setManualPositionButton"),
            createInput("RotarySetOriginGPSaltitudeValue", "Altitude (meters)", "setManualPositionButton"),
            createButton("RotarySetOriginGPSSetOriginGps", "Set Origin GPS", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("RotaryGPSCommands", "Rotate to GPS", [
            createInput("RotaryGPSlatitudeValue", "Latitude", "setManualPositionButton"),
            createInput("RotaryGPSlongitudeValue", "Longitude", "setManualPositionButton"),
            createInput("RotaryGPSaltitudeValue", "Altitude (meters)", "setManualPositionButton"),
            createButton("RotaryGPSSetRotateToGps", "Rotate To GPS", "bg-blue-500 text-white hover:bg-blue-700"),
        ]),
        createSubCard("RotaryMode", "Rotary Mode", [
            createSelect("RotaryModeSelect", ["init", "speed", "position", "stabilization", "targeting", "video_tracker"]),
            createButton("RotaryModeButton", "Set Rotary Mode", "bg-green-500 text-white hover:bg-green-700"),
        ])
    ];
    const dropdown = createDropdown("rotary-dd", subCards);
    rotaryCard.appendChild(dropdown);
    subCards.forEach(subCard => rotaryCard.appendChild(subCard));

    queueMicrotask(attachEventListeners);

    return {name: 'Rotary Platform', element: rotaryCard};
}