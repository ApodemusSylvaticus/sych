'use strict';

import {Card} from './cmdShared.ts';
import {
    OSDShowDefaultScreen,
    OSDShowLRFResultScreen,
    OSDShowLRFResultSimplifiedScreen,
    OSDShowLRFMeasureScreen
} from "ts/cmd/cmdSender/cmdOSD.ts";

interface Opts {
    nextLayout: () => void;
}

export function createOSDCard(opts: Opts): Card {
    const OSDCard = document.createElement('div');
    OSDCard.className = "p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 mt-4";
    OSDCard.innerHTML = `
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Layouts</div>
      <button id="layoutsNext" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Next layout</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">OSD Controls</div>
      <button id="osdDefaultScreen" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Default Screen</button>
      <button id="osdLRFResultScreen" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">LRF Result Screen</button>
      <button id="osdLRFResultSimpleScreen" class="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">LRF Simple Result Screen</button>
      <button id="osdLRFMeasureScreen" class="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700">LRF Measure Screen</button>
    </div>
    `;

    queueMicrotask(() => {
        document.getElementById('layoutsNext')?.addEventListener('click', opts.nextLayout);
        document.getElementById('osdDefaultScreen')?.addEventListener('click', OSDShowDefaultScreen);
        document.getElementById('osdLRFResultScreen')?.addEventListener('click', OSDShowLRFResultScreen);
        document.getElementById('osdLRFResultSimpleScreen')?.addEventListener('click', OSDShowLRFResultSimplifiedScreen);
        document.getElementById('osdLRFMeasureScreen')?.addEventListener('click', OSDShowLRFMeasureScreen);
    });

    return {name: 'OSD', element: OSDCard};
}
