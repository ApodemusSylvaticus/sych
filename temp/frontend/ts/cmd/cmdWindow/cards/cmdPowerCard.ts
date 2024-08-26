import {Card} from './cmdShared.ts';
import {
    PowerPowerOn,
    PowerPowerOff,
    PowerPowerReset,
    PowerCanOn,
    PowerCanOff,
    PowerCanReset,
    stringToPowerCanDevice
} from "ts/cmd/cmdSender/cmdPower.ts";
import {
    createButton,
    createDropdown,
    createSelect,
    createSubCard,
    createRowSeparator,
} from "./CardElements.ts";

function attachEventListeners(): void {
    const deviceSelect = document.getElementById('powerDeviceSelect') as HTMLSelectElement;
    const actionSelect = document.getElementById('powerActionSelect') as HTMLSelectElement;

    document.getElementById('executeActionButton')?.addEventListener('click', () => {
        const device = stringToPowerCanDevice(deviceSelect.value);
        const action = actionSelect.value;

        switch(action) {
            case 'poweron':
                PowerPowerOn(device);
                break;
            case 'poweroff':
                PowerPowerOff(device);
                break;
            case 'powerreset':
                PowerPowerReset(device);
                break;
            case 'canon':
                PowerCanOn(device);
                break;
            case 'canoff':
                PowerCanOff(device);
                break;
            case 'canreset':
                PowerCanReset(device);
                break;
            default:
                console.error('Unknown action:', action);
        }
    });
}

export function createPowerControlCard(): Card {
    const powerControlCard = document.createElement('div');
    powerControlCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const deviceOptions = [
        "compass",
        "gps",
        "cam_day",
        "cam_heat",
        "lrf",
        "none"
    ];

    const actionOptions = [
        "Power On",
        "Power Off",
        "Power Reset",
        "CAN On",
        "CAN Off",
        "CAN Reset"
    ];

    const subCards = [
        createSubCard("deviceControl", "Device Control", [
            createSelect("powerDeviceSelect", deviceOptions),
            createRowSeparator(),
            createSelect("powerActionSelect", actionOptions),
            createRowSeparator(),
            createButton("executeActionButton", "Execute Action", "bg-blue-500 text-white hover:bg-blue-700"),
        ]),
    ];

    const dropdown = createDropdown("power-control-dd", subCards);
    powerControlCard.appendChild(dropdown);
    subCards.forEach(subCard => powerControlCard.appendChild(subCard));

    queueMicrotask(attachEventListeners);

    return {name: 'Power Control', element: powerControlCard};
}