'use strict';

import {Card} from './cmdShared.ts';
import {
    SystemPowerOff,
    SystemReboot,
    SystemStartAll,
    SystemStopAll
} from "ts/cmd/cmdSender/cmdSystem.ts";

export function createSystemCard(): Card {
    const SystemCard = document.createElement('div');
    SystemCard.className = "p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 mt-4";
    SystemCard.innerHTML = `
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">System Actions</div>
      <button id="systemStartAll" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Start All Systems</button>
      <button id="systemStopAll" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Stop All Systems</button>
      <button id="systemReboot" class="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">Reboot System</button>
      <button id="systemPowerOff" class="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700">Power Off</button>
    </div>
    `;

    queueMicrotask(() => {
        document.getElementById('systemStartAll')?.addEventListener('click', SystemStartAll);
        document.getElementById('systemStopAll')?.addEventListener('click', SystemStopAll);
        document.getElementById('systemReboot')?.addEventListener('click', SystemReboot);
        document.getElementById('systemPowerOff')?.addEventListener('click', SystemPowerOff);
    });

    return {name: 'System', element: SystemCard};
}
