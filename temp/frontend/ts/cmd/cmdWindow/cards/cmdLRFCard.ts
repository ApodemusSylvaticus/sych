'use strict';

import {Card} from './cmdShared.ts';
import {
    lrfDisableFogMode,
    lrfEnableFogMode,
    lrfMeasure,
    lrfScanOff,
    lrfScanOn,
    lrfSetScanMode,
    lrfStart,
    lrfStop,
    lrfTargetDesignatorOff,
    lrfTargetDesignatorOnModeA,
    lrfTargetDesignatorOnModeB,
    lrfNewSession,
    getMeteo
} from "ts/cmd/cmdSender/cmdLRF.ts";
import * as Types from "ts/proto/jon/jon_shared_data_types.ts";

export function createLrfCard(): Card {
    const lrfCard = document.createElement('div');
    lrfCard.className = "p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 mt-4";
    lrfCard.innerHTML = `
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Communication</div>
      <button id="lrfStart" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Start</button>
      <button id="lrfStop" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Stop</button>
      <button id="LrfGetMeteo" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">Get Meteo</button>
      <button id="lrfNewSession" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-blue-700">New Session</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Scan</div>
      <button id="lrfScanOn" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Scan On</button>
      <button id="lrfScanOff" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Scan Off</button>
      <select id="lrfScanMode" class="py-2 px-4 bg-gray-200 text-black rounded-lg">
        <option value="0">Select Scan Mode</option>
        <option value="1">1 Hz Continuous</option>
        <option value="2">4 Hz Continuous</option>
        <option value="3">10 Hz Continuous</option>
        <option value="4">20 Hz Continuous</option>
        <option value="5">100 Hz Continuous</option>
        <option value="6">200 Hz Continuous</option>
      </select>
      <button id="lrfSetScanMode" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Set Scan Mode</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Measure</div>
      <button id="lrfMeasure" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">Measure</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <button id="lrfEnableFogMode" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Enable Fog Mode</button>
      <button id="lrfDisableFogMode" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Disable Fog Mode</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <button id="lrfTargetDesignatorOff" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Designator Off</button>
      <button id="lrfTargetDesignatorOnModeA" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">Designator On Mode A</button>
      <button id="lrfTargetDesignatorOnModeB" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Designator On Mode B</button>
    </div>
  `;

    queueMicrotask(() => {
        document.getElementById('lrfStart')?.addEventListener('click', lrfStart);
        document.getElementById('lrfStop')?.addEventListener('click', lrfStop);
        document.getElementById('LrfGetMeteo')?.addEventListener('click', getMeteo);
        document.getElementById('lrfNewSession')?.addEventListener('click', lrfNewSession);
        document.getElementById('lrfScanOn')?.addEventListener('click', lrfScanOn);
        document.getElementById('lrfScanOff')?.addEventListener('click', lrfScanOff);
        document.getElementById('lrfMeasure')?.addEventListener('click', lrfMeasure);
        document.getElementById('lrfEnableFogMode')?.addEventListener('click', lrfEnableFogMode);
        document.getElementById('lrfDisableFogMode')?.addEventListener('click', lrfDisableFogMode);
        document.getElementById('lrfTargetDesignatorOff')?.addEventListener('click', lrfTargetDesignatorOff);
        document.getElementById('lrfTargetDesignatorOnModeA')?.addEventListener('click', () => lrfTargetDesignatorOnModeA());
        document.getElementById('lrfTargetDesignatorOnModeB')?.addEventListener('click', () => lrfTargetDesignatorOnModeB());
        document.getElementById('lrfSetScanMode')?.addEventListener('click', () => {
            const modeSelect = document.getElementById('lrfScanMode') as HTMLSelectElement;
            const mode = parseInt(modeSelect.value) as Types.JonGuiDataLrfScanModes;
            if (!isNaN(mode) && mode >= 0) {
                lrfSetScanMode(mode);
            }
        });
    });

    return {name: 'LRF', element: lrfCard};
}
