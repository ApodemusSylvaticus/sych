import {Card} from './cmdShared.ts';
import {
    calibrateCancel,
    calibrateLongStart,
    calibrateNext,
    calibrateShortStart,
    compassStart,
    compassStop,
    setMagneticDeclination,
    setOffsetAngleAzimuth,
    setOffsetAngleElevation,
    setRefreshRate,
    setUseRotaryPosition,
    getMeteo
} from "ts/cmd/cmdSender/cmdCompass.ts";
import {
    createButton,
    createDropdown,
    createInput,
    createSubCard,
} from "./CardElements.ts";

function attachEventListeners(): void {
    document.getElementById('compassStart')?.addEventListener('click', compassStart);
    document.getElementById('compassStop')?.addEventListener('click', compassStop);
    document.getElementById('compassGetMeteo')?.addEventListener('click', getMeteo);
    document.getElementById('setRefreshRateButtonCompass')?.addEventListener('click', () =>
        setRefreshRate(parseInt((document.getElementById('refreshRateValueCompass') as HTMLInputElement).value)));
    document.getElementById('setMagneticDeclinationButton')?.addEventListener('click', () =>
        setMagneticDeclination(parseInt((document.getElementById('magneticDeclinationValue') as HTMLInputElement).value)));
    document.getElementById('setOffsetAzimuthButton')?.addEventListener('click', () =>
        setOffsetAngleAzimuth(parseInt((document.getElementById('offsetAzimuthValue') as HTMLInputElement).value)));
    document.getElementById('setOffsetElevationButton')?.addEventListener('click', () =>
        setOffsetAngleElevation(parseInt((document.getElementById('offsetElevationValue') as HTMLInputElement).value)));
    document.getElementById('calibrateStartShort')?.addEventListener('click', calibrateShortStart);
    document.getElementById('calibrateStartLong')?.addEventListener('click', calibrateLongStart);
    document.getElementById('calibrateNext')?.addEventListener('click', calibrateNext);
    document.getElementById('calibrateCancel')?.addEventListener('click', calibrateCancel);
    document.getElementById('useRotaryPositionOn')?.addEventListener('click', () => {
        setUseRotaryPosition(true);
    });
    document.getElementById('useRotaryPositionOff')?.addEventListener('click', () => {
        setUseRotaryPosition(false);
    });
}

function createCompassCard(): Card {
    const compassCard = document.createElement('div');
    compassCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = [
        createSubCard("compassControls", "Controls", [
            createButton("compassStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("compassStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
            createButton("compassGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("compassSettings", "Settings", [
            createInput("refreshRateValueCompass", "Refresh Rate (ms)", "setRefreshRateButtonCompass"),
            createButton("setRefreshRateButtonCompass", "Set Refresh Rate", "bg-green-500 text-white hover:bg-green-700"),
            createInput("magneticDeclinationValue", "Magnetic Declination (mils)", "setMagneticDeclinationButton"),
            createButton("setMagneticDeclinationButton", "Set Declination", "bg-yellow-500 text-white hover:bg-yellow-700"),
            createInput("offsetAzimuthValue", "Offset Azimuth (mils)", "setOffsetAzimuthButton"),
            createButton("setOffsetAzimuthButton", "Set Azimuth", "bg-purple-500 text-white hover:bg-purple-700"),
            createInput("offsetElevationValue", "Offset Elevation (mils)", "setOffsetElevationButton"),
            createButton("setOffsetElevationButton", "Set Elevation", "bg-orange-500 text-white hover:bg-orange-700"),
        ]),
        createSubCard("compassCalibration", "Calibration", [
            createButton("calibrateStartLong", "Start Long Calibration", "bg-teal-500 text-white hover:bg-teal-700"),
            createButton("calibrateStartShort", "Start Short Calibration", "bg-pink-500 text-white hover:bg-pink-700"),
            createButton("calibrateNext", "Next calibration stage", "bg-red-500 text-white hover:bg-red-700"),
            createButton("calibrateCancel", "Cancel Calibration", "bg-blue-500 text-white hover:bg-blue-700"),
        ]),
        createSubCard("RotaryIntegration", "Rotary Integration", [
            createButton("useRotaryPositionOn", "Use Rotary position: on", "bg-green-500 text-white hover:bg-green-700"),
            createButton("useRotaryPositionOff", "Don't Rotary Position: off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
    ];

    const dropdown = createDropdown("compass-dd", subCards);
    compassCard.appendChild(dropdown);

    subCards.forEach(subCard => compassCard.appendChild(subCard));

    queueMicrotask(attachEventListeners);

    return {name: 'Compass', element: compassCard};
}

export {createCompassCard};
