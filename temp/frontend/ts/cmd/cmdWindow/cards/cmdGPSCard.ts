'use strict';

import {Card} from './cmdShared.ts';
import {
    gpsStart,
    gpsStop,
    setGpsRefreshRate,
    setManualPosition,
    setUseManualPosition,
    getMeteo
} from "ts/cmd/cmdSender/cmdGps.ts";
import {
    createButton,
    createDropdown,
    createInput,
    createSubCard
} from "./CardElements.ts";

function attachGpsEventListeners(): void {
    document.getElementById('gpsStart')?.addEventListener('click', gpsStart);
    document.getElementById('gpsStop')?.addEventListener('click', gpsStop);
    document.getElementById('gpsGetMeteo')?.addEventListener('click', getMeteo);
    document.getElementById('setRefreshRateButtonGPS')?.addEventListener('click', () =>
        setGpsRefreshRate(parseInt((document.getElementById('refreshRateValueGPS') as HTMLInputElement).value)));
    document.getElementById('setUseManualPositionOn')?.addEventListener('click', () => {
        setUseManualPosition(true);
    });
    document.getElementById('setUseManualPositionOff')?.addEventListener('click', () => {
        setUseManualPosition(false);
    });
    document.getElementById('setManualPositionButton')?.addEventListener('click', () => {
        const latitudeInput = (document.getElementById('latitudeValue') as HTMLInputElement).value;
        const longitudeInput = (document.getElementById('longitudeValue') as HTMLInputElement).value;
        const altitudeInput = (document.getElementById('altitudeValue') as HTMLInputElement).value;

        // Parse the inputs as integers
        const latitude = parseInt(latitudeInput);
        const longitude = parseInt(longitudeInput);
        const altitude = parseInt(altitudeInput);

        // Check if the parsed values are NaN or out of expected range
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
            console.error('Invalid latitude. Please enter a value between -90 and 90.');
            return;
        }
        if (isNaN(longitude) || longitude < -180 || longitude > 180) {
            console.error('Invalid longitude. Please enter a value between -180 and 180.');
            return;
        }
        if (isNaN(altitude)) {
            console.error('Invalid altitude. Please enter a valid integer.');
            return;
        }
        setManualPosition(latitude, longitude, altitude);
    });
}

function createGpsCard(): Card {
    const gpsCard = document.createElement('div');
    gpsCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = [
        createSubCard("gpsControls", "Controls", [
            createButton("gpsStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("gpsStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
            createButton("gpsGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
        ]),
        createSubCard("gpsSettings", "Settings", [
            createInput("refreshRateValueGPS", "Refresh Rate (ms)", "setRefreshRateButton"),
            createButton("setRefreshRateButtonGPS", "Set Refresh Rate", "bg-green-500 text-white hover:bg-green-700"),
            createButton("setUseManualPositionOn", "Use Manual Position: on", "bg-blue-500 text-white hover:bg-blue-700"),
            createButton("setUseManualPositionOff", "Use Manual position: off", "bg-red-500 text-white hover:bg-red-700"),
        ]),
        createSubCard("gpsSetManPos", "Set manual position", [
            createInput("latitudeValue", "Latitude", "setManualPositionButton"),
            createInput("longitudeValue", "Longitude", "setManualPositionButton"),
            createInput("altitudeValue", "Altitude (meters)", "setManualPositionButton"),
            createButton("setManualPositionButton", "Set Manual Position", "bg-yellow-500 text-white hover:bg-yellow-700"),
        ])
    ];

    const dropdown = createDropdown("gps-dd", subCards);
    gpsCard.appendChild(dropdown);

    subCards.forEach(subCard => gpsCard.appendChild(subCard));

    queueMicrotask(attachGpsEventListeners);

    return {name: 'GPS', element: gpsCard};
}

export {createGpsCard};
