// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data_environment.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import {
  JonGuiDataEnvironmentGroundCondition,
  jonGuiDataEnvironmentGroundConditionFromJSON,
  jonGuiDataEnvironmentGroundConditionToJSON,
  JonGuiDataEnvironmentLightingCondition,
  jonGuiDataEnvironmentLightingConditionFromJSON,
  jonGuiDataEnvironmentLightingConditionToJSON,
  JonGuiDataEnvironmentLightSource,
  jonGuiDataEnvironmentLightSourceFromJSON,
  jonGuiDataEnvironmentLightSourceToJSON,
  JonGuiDataEnvironmentNetworkStatus,
  jonGuiDataEnvironmentNetworkStatusFromJSON,
  jonGuiDataEnvironmentNetworkStatusToJSON,
  JonGuiDataEnvironmentOpticalVisibility,
  jonGuiDataEnvironmentOpticalVisibilityFromJSON,
  jonGuiDataEnvironmentOpticalVisibilityToJSON,
  JonGuiDataEnvironmentPrecipitationType,
  jonGuiDataEnvironmentPrecipitationTypeFromJSON,
  jonGuiDataEnvironmentPrecipitationTypeToJSON,
  JonGuiDataEnvironmentThermalCondition,
  jonGuiDataEnvironmentThermalConditionFromJSON,
  jonGuiDataEnvironmentThermalConditionToJSON,
  JonGuiDataEnvironmentWeatherCondition,
  jonGuiDataEnvironmentWeatherConditionFromJSON,
  jonGuiDataEnvironmentWeatherConditionToJSON,
} from "./jon_shared_data_types";

export interface JonGuiDataEnvironment {
  weatherCondition: JonGuiDataEnvironmentWeatherCondition;
  lightingCondition: JonGuiDataEnvironmentLightingCondition;
  precipitationType: JonGuiDataEnvironmentPrecipitationType;
  groundCondition: JonGuiDataEnvironmentGroundCondition;
  opticalVisibility: JonGuiDataEnvironmentOpticalVisibility;
  thermalCondition: JonGuiDataEnvironmentThermalCondition;
  networkStatus: JonGuiDataEnvironmentNetworkStatus;
  lightSourceCondition: JonGuiDataEnvironmentLightSource;
}

function createBaseJonGuiDataEnvironment(): JonGuiDataEnvironment {
  return {
    weatherCondition: 0,
    lightingCondition: 0,
    precipitationType: 0,
    groundCondition: 0,
    opticalVisibility: 0,
    thermalCondition: 0,
    networkStatus: 0,
    lightSourceCondition: 0,
  };
}

export const JonGuiDataEnvironment = {
  encode(message: JonGuiDataEnvironment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.weatherCondition !== 0) {
      writer.uint32(8).int32(message.weatherCondition);
    }
    if (message.lightingCondition !== 0) {
      writer.uint32(16).int32(message.lightingCondition);
    }
    if (message.precipitationType !== 0) {
      writer.uint32(24).int32(message.precipitationType);
    }
    if (message.groundCondition !== 0) {
      writer.uint32(32).int32(message.groundCondition);
    }
    if (message.opticalVisibility !== 0) {
      writer.uint32(40).int32(message.opticalVisibility);
    }
    if (message.thermalCondition !== 0) {
      writer.uint32(48).int32(message.thermalCondition);
    }
    if (message.networkStatus !== 0) {
      writer.uint32(56).int32(message.networkStatus);
    }
    if (message.lightSourceCondition !== 0) {
      writer.uint32(64).int32(message.lightSourceCondition);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGuiDataEnvironment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGuiDataEnvironment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.weatherCondition = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lightingCondition = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.precipitationType = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.groundCondition = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.opticalVisibility = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.thermalCondition = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.networkStatus = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.lightSourceCondition = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGuiDataEnvironment {
    return {
      weatherCondition: isSet(object.weatherCondition)
        ? jonGuiDataEnvironmentWeatherConditionFromJSON(object.weatherCondition)
        : 0,
      lightingCondition: isSet(object.lightingCondition)
        ? jonGuiDataEnvironmentLightingConditionFromJSON(object.lightingCondition)
        : 0,
      precipitationType: isSet(object.precipitationType)
        ? jonGuiDataEnvironmentPrecipitationTypeFromJSON(object.precipitationType)
        : 0,
      groundCondition: isSet(object.groundCondition)
        ? jonGuiDataEnvironmentGroundConditionFromJSON(object.groundCondition)
        : 0,
      opticalVisibility: isSet(object.opticalVisibility)
        ? jonGuiDataEnvironmentOpticalVisibilityFromJSON(object.opticalVisibility)
        : 0,
      thermalCondition: isSet(object.thermalCondition)
        ? jonGuiDataEnvironmentThermalConditionFromJSON(object.thermalCondition)
        : 0,
      networkStatus: isSet(object.networkStatus) ? jonGuiDataEnvironmentNetworkStatusFromJSON(object.networkStatus) : 0,
      lightSourceCondition: isSet(object.lightSourceCondition)
        ? jonGuiDataEnvironmentLightSourceFromJSON(object.lightSourceCondition)
        : 0,
    };
  },

  toJSON(message: JonGuiDataEnvironment): unknown {
    const obj: any = {};
    if (message.weatherCondition !== 0) {
      obj.weatherCondition = jonGuiDataEnvironmentWeatherConditionToJSON(message.weatherCondition);
    }
    if (message.lightingCondition !== 0) {
      obj.lightingCondition = jonGuiDataEnvironmentLightingConditionToJSON(message.lightingCondition);
    }
    if (message.precipitationType !== 0) {
      obj.precipitationType = jonGuiDataEnvironmentPrecipitationTypeToJSON(message.precipitationType);
    }
    if (message.groundCondition !== 0) {
      obj.groundCondition = jonGuiDataEnvironmentGroundConditionToJSON(message.groundCondition);
    }
    if (message.opticalVisibility !== 0) {
      obj.opticalVisibility = jonGuiDataEnvironmentOpticalVisibilityToJSON(message.opticalVisibility);
    }
    if (message.thermalCondition !== 0) {
      obj.thermalCondition = jonGuiDataEnvironmentThermalConditionToJSON(message.thermalCondition);
    }
    if (message.networkStatus !== 0) {
      obj.networkStatus = jonGuiDataEnvironmentNetworkStatusToJSON(message.networkStatus);
    }
    if (message.lightSourceCondition !== 0) {
      obj.lightSourceCondition = jonGuiDataEnvironmentLightSourceToJSON(message.lightSourceCondition);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGuiDataEnvironment>, I>>(base?: I): JonGuiDataEnvironment {
    return JonGuiDataEnvironment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGuiDataEnvironment>, I>>(object: I): JonGuiDataEnvironment {
    const message = createBaseJonGuiDataEnvironment();
    message.weatherCondition = object.weatherCondition ?? 0;
    message.lightingCondition = object.lightingCondition ?? 0;
    message.precipitationType = object.precipitationType ?? 0;
    message.groundCondition = object.groundCondition ?? 0;
    message.opticalVisibility = object.opticalVisibility ?? 0;
    message.thermalCondition = object.thermalCondition ?? 0;
    message.networkStatus = object.networkStatus ?? 0;
    message.lightSourceCondition = object.lightSourceCondition ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
