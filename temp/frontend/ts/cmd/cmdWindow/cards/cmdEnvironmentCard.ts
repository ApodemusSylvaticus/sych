import { Card } from './cmdShared.ts';
import {
    environmentSetWeatherCondition,
    environmentSetLightingCondition,
    environmentSetPrecipitationType,
    environmentSetGroundCondition,
    environmentSetOpticalVisibility,
    environmentSetThermalCondition,
    environmentSetNetworkStatus,
    environmentSetLightSourceCondition,
    stringToWeatherCondition,
    stringToLightingCondition,
    stringToPrecipitationType,
    stringToGroundCondition,
    stringToOpticalVisibility,
    stringToThermalCondition,
    stringToNetworkStatus,
    stringToLightSourceCondition
} from "ts/cmd/cmdSender/cmdEnvironment.ts";

import { createSelect, createSubCard, createButton } from "./CardElements.ts";

const environmentOptions = {
    Weather: ["Unspecified", "Clear", "Cloudy", "Foggy", "Hazy"],
    Lighting: ["Unspecified", "Day", "Night", "Dusk", "Dawn"],
    Precipitation: ["Unspecified", "None", "Rain", "Snow", "Sleet"],
    Ground: ["Unspecified", "Dry", "Wet", "Snowy", "Icy"],
    Visibility: ["Unspecified", "High Contrast", "Low Contrast", "Glare", "Shadow"],
    Thermal: ["Unspecified", "High Heat Contrast", "Low Heat Contrast", "Ambient Warm", "Ambient Cold"],
    Network: ["Unspecified", "Disconnected", "Flaky", "Low Bandwidth", "Medium Bandwidth", "LAN"],
    LightSource: ["Unspecified", "None", "Full Moon", "Starry Night", "Sun Above", "Sun Front", "Sun Behind", "Diffused Strong", "Diffused Weak", "Projector", "Lit Target"]
};

function setupEnvironmentSettingsActions(): void {
    Object.keys(environmentOptions).forEach(key => {
        const buttonId = `Set${key}`;
        const selectId = `Select${key}`;
        document.getElementById(buttonId)?.addEventListener('click', () => {
            const selectElement = document.getElementById(selectId) as HTMLSelectElement;
            const value = selectElement.value;

            switch (key) {
                case 'Weather':
                    environmentSetWeatherCondition(stringToWeatherCondition(value));
                    break;
                case 'Lighting':
                    environmentSetLightingCondition(stringToLightingCondition(value));
                    break;
                case 'Precipitation':
                    environmentSetPrecipitationType(stringToPrecipitationType(value));
                    break;
                case 'Ground':
                    environmentSetGroundCondition(stringToGroundCondition(value));
                    break;
                case 'Visibility':
                    environmentSetOpticalVisibility(stringToOpticalVisibility(value));
                    break;
                case 'Thermal':
                    environmentSetThermalCondition(stringToThermalCondition(value));
                    break;
                case 'Network':
                    environmentSetNetworkStatus(stringToNetworkStatus(value));
                    break;
                case 'LightSource':
                    environmentSetLightSourceCondition(stringToLightSourceCondition(value));
                    break;
                default:
                    console.error('Invalid environment setting');
            }
        });
    });
}

export function createEnvironmentSettingsCard(): Card {
    const environmentCard = document.createElement('div');
    environmentCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";

    const subCards = Object.entries(environmentOptions).map(([key, options]) => {
        const select = createSelect(`Select${key}`, options);
        const button = createButton(`Set${key}`, `Set ${key}`, 'bg-blue-500 text-white hover:bg-blue-700');
        return createSubCard(key, `${key} Condition`, [select, button]);
    });

    subCards.forEach(subCard => environmentCard.appendChild(subCard));

    queueMicrotask(setupEnvironmentSettingsActions);

    return { name: 'Environment Settings', element: environmentCard };
}
