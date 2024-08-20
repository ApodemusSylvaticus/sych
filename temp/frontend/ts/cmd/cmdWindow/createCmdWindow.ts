'use strict';

import {JonWindow} from '../../components/jonWindow/jonWindow.ts';
import {Card} from './cards/cmdShared.ts';
import {createGpsCard} from './cards/cmdGPSCard.ts';
import {createCompassCard} from './cards/cmdCompassCard.ts';
import {createLrfCard} from './cards/cmdLRFCard.ts';
import {createRotaryCard} from './cards/cmdRotaryPlatformCard.ts';
import {createOSDCard} from './cards/cmdOSDCard.ts';
import {createSystemCard} from './cards/cmdSystemCard.ts';
import {createPowerControlCard} from "./cards/cmdPowerCard.ts";
import {
    createHeatCameraCard
} from "ts/cmd/cmdWindow/cards/cmdHeatCameraCard.ts";
import {createDayCameraCard} from "ts/cmd/cmdWindow/cards/cmdDayCameraCard.ts";
import {createEnvironmentSettingsCard} from "./cards/cmdEnvironmentCard.ts";

interface Opts {
    nextLayout: () => void;
}

let nextLayout = () => {};

const cardCreators: (() => Card)[] = [createGpsCard, createCompassCard, createLrfCard, createRotaryCard,
    createHeatCameraCard, createDayCameraCard, createSystemCard, ()=>(createOSDCard ({nextLayout: nextLayout})), createEnvironmentSettingsCard, createPowerControlCard];

function setupCards(cardCreators: (() => Card)[], jonWindow: JonWindow):
    { cardSelector: HTMLSelectElement, cards: Card[] } {
    const cardSelector = document.createElement('select');
    cardSelector.slot = 'selector';
    cardSelector.id = 'card-selector';
    cardSelector.className = "block appearance-none w-full bg-white border border-gray-400 " +
        "hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline";

    const cards = cardCreators.map(create => create());
    cards.forEach(card => {
        const option = document.createElement('option');
        option.value = card.name;
        option.textContent = card.name;
        cardSelector.appendChild(option);
        card.element.style.display = 'none';
    });

    if (cards.length > 0) {
        cards[0].element.style.display = 'block';
        cardSelector.value = cards[0].name;
        adjustWindowDimensions(cards[0], jonWindow);
    }

    cardSelector.addEventListener('change', (e) => {
        const selectedValue = (e.target as HTMLSelectElement).value;
        cards.forEach(card => {
            const isDisplayed = card.name === selectedValue;
            card.element.style.display = isDisplayed ? 'block' : 'none';
            if (isDisplayed) adjustWindowDimensions(card, jonWindow);
        });
    });

    return {cardSelector, cards};
}

function adjustWindowDimensions(card: Card, jonWindow: JonWindow) {
    const margin_w = 100;
    const margin_h = 300;
    const rect = card.element.getBoundingClientRect();
    const width = `${rect.width + margin_w}px`;
    const height = `${rect.height + margin_h}px`;
    jonWindow.setDimensions(width, height);
}

export function createCmdWindow(opts: Opts): HTMLElement {
    nextLayout = opts.nextLayout;

    const jonWindow = new JonWindow();
    jonWindow.id = 'cmd-window';

    const {cardSelector, cards} = setupCards(cardCreators, jonWindow);

    const jonTitle = document.createElement('span');
    jonTitle.slot = 'title';
    jonTitle.textContent = 'Command Window';

    const contentContainer = document.createElement('div');
    contentContainer.slot = 'content';
    contentContainer.appendChild(cardSelector);
    cards.forEach(card => contentContainer.appendChild(card.element));

    jonWindow.appendChild(jonTitle);
    jonWindow.appendChild(contentContainer);

    document.body.appendChild(jonWindow);

    return jonWindow;
}
