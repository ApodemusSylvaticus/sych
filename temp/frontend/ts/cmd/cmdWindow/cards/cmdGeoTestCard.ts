'use strict';

import { Card } from './cmdShared.ts';
import {
    GeoTestSend
} from "ts/cmd/cmdSender/cmdGeoTest.ts";

import {
    lrfNewSession
} from "ts/cmd/cmdSender/cmdLRF.ts";

import {
    createButton,
    createDropdown,
    createInput,
    createSubCard
} from "./CardElements.ts";

function attachGeoTestEventListeners(): void {
    const longitudeInput = document.getElementById('geoTest_longitudeValue') as HTMLInputElement;
    const latitudeInput = document.getElementById('geoTest_latitudeValue') as HTMLInputElement;
    const altitudeInput = document.getElementById('geoTest_altitudeValue') as HTMLInputElement;
    const rangeInput = document.getElementById('geoTest_rangeValue') as HTMLInputElement;
    const azimuthInput = document.getElementById('geoTest_azimuthValue') as HTMLInputElement;
    const elevationInput = document.getElementById('geoTest_elevationValue') as HTMLInputElement;
    const bankInput = document.getElementById('geoTest_bankValue') as HTMLInputElement;

    document.getElementById('geoTest_sendGeoTestButton')?.addEventListener('click', () => {
        GeoTestSend({
            longitude: longitudeInput.value ? Number(longitudeInput.value) : undefined,
            latitude: latitudeInput.value ? Number(latitudeInput.value) : undefined,
            altitude: altitudeInput.value ? Number(altitudeInput.value) : undefined,
            range: rangeInput.value ? Number(rangeInput.value) : undefined,
            azimuth: azimuthInput.value ? Number(azimuthInput.value) : undefined,
            elevation: elevationInput.value ? Number(elevationInput.value) : undefined,
            bank: bankInput.value ? Number(bankInput.value) : undefined,
        });
    });

    document.getElementById('geoTest_newSessionButton')?.addEventListener('click', lrfNewSession);

}

export function createGeoTestCard(): Card {
    const geoTestCard = document.createElement('div');
    geoTestCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = [
        createSubCard("geoTestFull", "Full Geo Data", [
            createInput("geoTest_longitudeValue", "Longitude"),
            createInput("geoTest_latitudeValue", "Latitude"),
            createInput("geoTest_altitudeValue", "Altitude"),
            createInput("geoTest_rangeValue", "Range"),
            createInput("geoTest_azimuthValue", "Azimuth"),
            createInput("geoTest_elevationValue", "Elevation"),
            createInput("geoTest_bankValue", "Bank"),
            createButton("geoTest_sendGeoTestButton", "Send Geo Test", "bg-blue-500 text-white hover:bg-blue-700"),
        ]),
        createSubCard("geoTestSess", "New Session", [
            createButton("geoTest_newSessionButton", "New Session", "bg-green-500 text-white hover:bg-green-700"),
        ])
    ];
    const dropdown = createDropdown("geoTest_geo-test-dd", subCards);
    geoTestCard.appendChild(dropdown);
    subCards.forEach(subCard => geoTestCard.appendChild(subCard));

    queueMicrotask(attachGeoTestEventListeners);

    return { name: 'Fake LRF measurements', element: geoTestCard };
}
