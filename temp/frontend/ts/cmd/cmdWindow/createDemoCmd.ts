'use strict';

import { Card } from './cards/cmdShared.ts';
import { createGpsCard } from './cards/cmdGPSCard.ts';
import { createCompassCard } from './cards/cmdCompassCard.ts';
import { createLrfCard } from './cards/cmdLRFCard.ts';
import { createRotaryCard } from './cards/cmdRotaryPlatformCard.ts';
import { createOSDCard } from './cards/cmdOSDCard.ts';
import { createSystemCard } from './cards/cmdSystemCard.ts';
import { createHeatCameraCard } from "ts/cmd/cmdWindow/cards/cmdHeatCameraCard.ts";
import { createDayCameraCard } from "ts/cmd/cmdWindow/cards/cmdDayCameraCard.ts";
import { createEnvironmentSettingsCard } from "./cards/cmdEnvironmentCard.ts";
import { createGeoTestCard} from "./cards/cmdGeoTestCard.ts";
import { createPowerControlCard} from "./cards/cmdPowerCard.ts";

interface Opts {
    nextLayout: () => void;
}

let nextLayout = () => {};

const cardCreators: (() => Card)[] = [
    createGpsCard, createCompassCard, createHeatCameraCard, createDayCameraCard, createSystemCard,
    () => (createOSDCard({nextLayout: nextLayout})), createRotaryCard,createLrfCard,
    createEnvironmentSettingsCard, createGeoTestCard, createPowerControlCard
];

function displayCards(cardCreators: (() => Card)[]): void {
    const container = document.getElementById('cards-container') as HTMLDivElement;
    if (!container) {
        console.error('Card container not found');
        return;
    }

    cardCreators.forEach(create => {
        const card = create();
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');

        // Create a header element to display the card's name
        const header = document.createElement('h3');
        header.textContent = card.name;
        header.classList.add('card-header');

        // Append the header and the card element to the wrapper
        cardWrapper.appendChild(header);
        cardWrapper.appendChild(card.element);

        // Style the card wrapper if needed
        cardWrapper.style.marginBottom = '20px'; // Example of additional styling

        // Append the wrapper to the container
        container.appendChild(cardWrapper);
    });
}

export function initCards(opts: Opts): void {
    nextLayout = opts.nextLayout;
    displayCards(cardCreators);
}