import * as CSShared from "ts/cmd/cmdSender/cmdSenderShared.ts";
import * as Cmd from "ts/proto/jon/index.cmd.ts";
import * as Types from "ts/proto/jon/jon_shared_data_types.ts";

export function stringToWeatherCondition(value: string): Types.JonGuiDataEnvironmentWeatherCondition {
    switch (value.toLowerCase()) {
        case 'clear':
            return Types.JonGuiDataEnvironmentWeatherCondition.JON_GUI_DATA_ENVIRONMENT_WEATHER_CLEAR;
        case 'cloudy':
            return Types.JonGuiDataEnvironmentWeatherCondition.JON_GUI_DATA_ENVIRONMENT_WEATHER_CLOUDY;
        case 'foggy':
            return Types.JonGuiDataEnvironmentWeatherCondition.JON_GUI_DATA_ENVIRONMENT_WEATHER_FOGGY;
        case 'hazy':
            return Types.JonGuiDataEnvironmentWeatherCondition.JON_GUI_DATA_ENVIRONMENT_WEATHER_HAZY;
        default:
            return Types.JonGuiDataEnvironmentWeatherCondition.JON_GUI_DATA_ENVIRONMENT_WEATHER_UNSPECIFIED;
    }
}

export function stringToLightingCondition(value: string): Types.JonGuiDataEnvironmentLightingCondition {
    switch (value.toLowerCase()) {
        case 'day':
            return Types.JonGuiDataEnvironmentLightingCondition.JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAY;
        case 'night':
            return Types.JonGuiDataEnvironmentLightingCondition.JON_GUI_DATA_ENVIRONMENT_LIGHTING_NIGHT;
        case 'dusk':
            return Types.JonGuiDataEnvironmentLightingCondition.JON_GUI_DATA_ENVIRONMENT_LIGHTING_DUSK;
        case 'dawn':
            return Types.JonGuiDataEnvironmentLightingCondition.JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAWN;
        default:
            return Types.JonGuiDataEnvironmentLightingCondition.JON_GUI_DATA_ENVIRONMENT_LIGHTING_UNSPECIFIED;
    }
}

export function stringToPrecipitationType(value: string): Types.JonGuiDataEnvironmentPrecipitationType {
    switch (value.toLowerCase()) {
        case 'none':
            return Types.JonGuiDataEnvironmentPrecipitationType.JON_GUI_DATA_ENVIRONMENT_PRECIP_NONE;
        case 'rain':
            return Types.JonGuiDataEnvironmentPrecipitationType.JON_GUI_DATA_ENVIRONMENT_PRECIP_RAIN;
        case 'snow':
            return Types.JonGuiDataEnvironmentPrecipitationType.JON_GUI_DATA_ENVIRONMENT_PRECIP_SNOW;
        case 'sleet':
            return Types.JonGuiDataEnvironmentPrecipitationType.JON_GUI_DATA_ENVIRONMENT_PRECIP_SLEET;
        default:
            return Types.JonGuiDataEnvironmentPrecipitationType.JON_GUI_DATA_ENVIRONMENT_PRECIP_UNSPECIFIED;
    }
}

export function stringToGroundCondition(value: string): Types.JonGuiDataEnvironmentGroundCondition {
    switch (value.toLowerCase()) {
        case 'dry':
            return Types.JonGuiDataEnvironmentGroundCondition.JON_GUI_DATA_ENVIRONMENT_GROUND_DRY;
        case 'wet':
            return Types.JonGuiDataEnvironmentGroundCondition.JON_GUI_DATA_ENVIRONMENT_GROUND_WET;
        case 'snowy':
            return Types.JonGuiDataEnvironmentGroundCondition.JON_GUI_DATA_ENVIRONMENT_GROUND_SNOWY;
        case 'icy':
            return Types.JonGuiDataEnvironmentGroundCondition.JON_GUI_DATA_ENVIRONMENT_GROUND_ICY;
        default:
            return Types.JonGuiDataEnvironmentGroundCondition.JON_GUI_DATA_ENVIRONMENT_GROUND_UNSPECIFIED;
    }
}

export function stringToOpticalVisibility(value: string): Types.JonGuiDataEnvironmentOpticalVisibility {
    switch (value.toLowerCase()) {
        case 'highcontrast':
            return Types.JonGuiDataEnvironmentOpticalVisibility.JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_HIGH_CONTRAST;
        case 'lowcontrast':
            return Types.JonGuiDataEnvironmentOpticalVisibility.JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_LOW_CONTRAST;
        case 'glare':
            return Types.JonGuiDataEnvironmentOpticalVisibility.JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_GLARE;
        case 'shadow':
            return Types.JonGuiDataEnvironmentOpticalVisibility.JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_SHADOW;
        default:
            return Types.JonGuiDataEnvironmentOpticalVisibility.JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_UNSPECIFIED;
    }
}


export function stringToThermalCondition(value: string): Types.JonGuiDataEnvironmentThermalCondition {
    switch (value.toLowerCase()) {
        case 'highheatcontrast':
            return Types.JonGuiDataEnvironmentThermalCondition.JON_GUI_DATA_ENVIRONMENT_THERMAL_HIGH_HEAT_CONTRAST;
        case 'lowheatcontrast':
            return Types.JonGuiDataEnvironmentThermalCondition.JON_GUI_DATA_ENVIRONMENT_THERMAL_LOW_HEAT_CONTRAST;
        case 'ambientwarm':
            return Types.JonGuiDataEnvironmentThermalCondition.JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_WARM;
        case 'ambientcold':
            return Types.JonGuiDataEnvironmentThermalCondition.JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_COLD;
        default:
            return Types.JonGuiDataEnvironmentThermalCondition.JON_GUI_DATA_ENVIRONMENT_THERMAL_UNSPECIFIED;
    }
}

export function stringToNetworkStatus(value: string): Types.JonGuiDataEnvironmentNetworkStatus {
    switch (value.toLowerCase()) {
        case 'disconnected':
            return Types.JonGuiDataEnvironmentNetworkStatus.JON_GUI_DATA_ENVIRONMENT_NETWORK_DISCONNECTED;
        case 'flaky':
            return Types.JonGuiDataEnvironmentNetworkStatus.JON_GUI_DATA_ENVIRONMENT_NETWORK_FLAKY;
        case 'lowbandwidth':
            return Types.JonGuiDataEnvironmentNetworkStatus.JON_GUI_DATA_ENVIRONMENT_NETWORK_LOW_BANDWIDTH;
        case 'mediumbandwidth':
            return Types.JonGuiDataEnvironmentNetworkStatus.JON_GUI_DATA_ENVIRONMENT_NETWORK_MEDIUM_BANDWIDTH;
        case 'lan':
            return Types.JonGuiDataEnvironmentNetworkStatus.JON_GUI_DATA_ENVIRONMENT_NETWORK_LAN;
        default:
            return Types.JonGuiDataEnvironmentNetworkStatus.JON_GUI_DATA_ENVIRONMENT_NETWORK_UNSPECIFIED;
    }
}

export function stringToLightSourceCondition(value: string): Types.JonGuiDataEnvironmentLightSource {
    switch (value.toLowerCase()) {
        case 'none':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_NONE;
        case 'fullmoon':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_FULL_MOON;
        case 'starrynight':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_STARRY_NIGHT;
        case 'sunabove':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_ABOVE;
        case 'sunfront':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_FRONT;
        case 'sunbehind':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_BEHIND;
        case 'diffusedstrong':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_STRONG;
        case 'diffusedweak':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_WEAK;
        case 'projector':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_PROJECTOR;
        case 'littarget':
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_LIT_TARGET;
        default:
            return Types.JonGuiDataEnvironmentLightSource.JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_UNSPECIFIED;
    }
}

export function environmentSetWeatherCondition(value: Types.JonGuiDataEnvironmentWeatherCondition): void {
    console.log(`Setting weather condition to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setWeatherCondition: Cmd.Environment.SetWeatherCondition.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetLightingCondition(value: Types.JonGuiDataEnvironmentLightingCondition): void {
    console.log(`Setting lighting condition to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setLightingCondition: Cmd.Environment.SetLightingCondition.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetPrecipitationType(value: Types.JonGuiDataEnvironmentPrecipitationType): void {
    console.log(`Setting precipitation type to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setPrecipitationType: Cmd.Environment.SetPrecipitationType.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetGroundCondition(value: Types.JonGuiDataEnvironmentGroundCondition): void {
    console.log(`Setting ground condition to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setGroundCondition: Cmd.Environment.SetGroundCondition.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetOpticalVisibility(value: Types.JonGuiDataEnvironmentOpticalVisibility): void {
    console.log(`Setting optical visibility to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setOpticalVisibility: Cmd.Environment.SetOpticalVisibility.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetThermalCondition(value: Types.JonGuiDataEnvironmentThermalCondition): void {
    console.log(`Setting thermal condition to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setThermalCondition: Cmd.Environment.SetThermalCondition.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetNetworkStatus(value: Types.JonGuiDataEnvironmentNetworkStatus): void {
    console.log(`Setting network status to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setNetworkStatus: Cmd.Environment.SetNetworkStatus.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}

export function environmentSetLightSourceCondition(value: Types.JonGuiDataEnvironmentLightSource): void {
    console.log(`Setting light source condition to ${value}`);
    let rootMsg = CSShared.createRootMessage();
    rootMsg.environment = Cmd.Environment.Root.create({setLightSourceCondition: Cmd.Environment.SetLightSourceCondition.create({value})});
    CSShared.sendCmdMessage(rootMsg);
}