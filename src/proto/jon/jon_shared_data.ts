// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { JonGuiDataCameraDay } from "./jon_shared_data_camera_day";
import { JonGuiDataCameraHeat } from "./jon_shared_data_camera_heat";
import { JonGuiDataCompass } from "./jon_shared_data_compass";
import { JonGuiDataCompassCalibration } from "./jon_shared_data_compass_calibration";
import { JonGuiDataEnvironment } from "./jon_shared_data_environment";
import { JonGuiDataGps } from "./jon_shared_data_gps";
import { JonGuiDataLrf } from "./jon_shared_data_lrf";
import { JonGuiDataRotary } from "./jon_shared_data_rotary";
import { JonGuiDataSystem } from "./jon_shared_data_system";
import { JonGuiDataTime } from "./jon_shared_data_time";
import { JonGuiDataMeteo } from "./jon_shared_data_types";

/** Root message */
export interface JonGUIState {
  protocolVersion: number;
  system: JonGuiDataSystem | undefined;
  meteoInternal: JonGuiDataMeteo | undefined;
  meteoExternal: JonGuiDataMeteo | undefined;
  lrf: JonGuiDataLrf | undefined;
  time: JonGuiDataTime | undefined;
  gps: JonGuiDataGps | undefined;
  compass: JonGuiDataCompass | undefined;
  rotary: JonGuiDataRotary | undefined;
  cameraDay: JonGuiDataCameraDay | undefined;
  cameraHeat: JonGuiDataCameraHeat | undefined;
  compassCalibration: JonGuiDataCompassCalibration | undefined;
  environment: JonGuiDataEnvironment | undefined;
}

function createBaseJonGUIState(): JonGUIState {
  return {
    protocolVersion: 0,
    system: undefined,
    meteoInternal: undefined,
    meteoExternal: undefined,
    lrf: undefined,
    time: undefined,
    gps: undefined,
    compass: undefined,
    rotary: undefined,
    cameraDay: undefined,
    cameraHeat: undefined,
    compassCalibration: undefined,
    environment: undefined,
  };
}

export const JonGUIState = {
  encode(message: JonGUIState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocolVersion !== 0) {
      writer.uint32(8).uint32(message.protocolVersion);
    }
    if (message.system !== undefined) {
      JonGuiDataSystem.encode(message.system, writer.uint32(18).fork()).ldelim();
    }
    if (message.meteoInternal !== undefined) {
      JonGuiDataMeteo.encode(message.meteoInternal, writer.uint32(26).fork()).ldelim();
    }
    if (message.meteoExternal !== undefined) {
      JonGuiDataMeteo.encode(message.meteoExternal, writer.uint32(34).fork()).ldelim();
    }
    if (message.lrf !== undefined) {
      JonGuiDataLrf.encode(message.lrf, writer.uint32(42).fork()).ldelim();
    }
    if (message.time !== undefined) {
      JonGuiDataTime.encode(message.time, writer.uint32(50).fork()).ldelim();
    }
    if (message.gps !== undefined) {
      JonGuiDataGps.encode(message.gps, writer.uint32(58).fork()).ldelim();
    }
    if (message.compass !== undefined) {
      JonGuiDataCompass.encode(message.compass, writer.uint32(66).fork()).ldelim();
    }
    if (message.rotary !== undefined) {
      JonGuiDataRotary.encode(message.rotary, writer.uint32(74).fork()).ldelim();
    }
    if (message.cameraDay !== undefined) {
      JonGuiDataCameraDay.encode(message.cameraDay, writer.uint32(82).fork()).ldelim();
    }
    if (message.cameraHeat !== undefined) {
      JonGuiDataCameraHeat.encode(message.cameraHeat, writer.uint32(90).fork()).ldelim();
    }
    if (message.compassCalibration !== undefined) {
      JonGuiDataCompassCalibration.encode(message.compassCalibration, writer.uint32(98).fork()).ldelim();
    }
    if (message.environment !== undefined) {
      JonGuiDataEnvironment.encode(message.environment, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGUIState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGUIState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.protocolVersion = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.system = JonGuiDataSystem.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.meteoInternal = JonGuiDataMeteo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.meteoExternal = JonGuiDataMeteo.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lrf = JonGuiDataLrf.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = JonGuiDataTime.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.gps = JonGuiDataGps.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.compass = JonGuiDataCompass.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.rotary = JonGuiDataRotary.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.cameraDay = JonGuiDataCameraDay.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.cameraHeat = JonGuiDataCameraHeat.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.compassCalibration = JonGuiDataCompassCalibration.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.environment = JonGuiDataEnvironment.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGUIState {
    return {
      protocolVersion: isSet(object.protocolVersion) ? globalThis.Number(object.protocolVersion) : 0,
      system: isSet(object.system) ? JonGuiDataSystem.fromJSON(object.system) : undefined,
      meteoInternal: isSet(object.meteoInternal) ? JonGuiDataMeteo.fromJSON(object.meteoInternal) : undefined,
      meteoExternal: isSet(object.meteoExternal) ? JonGuiDataMeteo.fromJSON(object.meteoExternal) : undefined,
      lrf: isSet(object.lrf) ? JonGuiDataLrf.fromJSON(object.lrf) : undefined,
      time: isSet(object.time) ? JonGuiDataTime.fromJSON(object.time) : undefined,
      gps: isSet(object.gps) ? JonGuiDataGps.fromJSON(object.gps) : undefined,
      compass: isSet(object.compass) ? JonGuiDataCompass.fromJSON(object.compass) : undefined,
      rotary: isSet(object.rotary) ? JonGuiDataRotary.fromJSON(object.rotary) : undefined,
      cameraDay: isSet(object.cameraDay) ? JonGuiDataCameraDay.fromJSON(object.cameraDay) : undefined,
      cameraHeat: isSet(object.cameraHeat) ? JonGuiDataCameraHeat.fromJSON(object.cameraHeat) : undefined,
      compassCalibration: isSet(object.compassCalibration)
        ? JonGuiDataCompassCalibration.fromJSON(object.compassCalibration)
        : undefined,
      environment: isSet(object.environment) ? JonGuiDataEnvironment.fromJSON(object.environment) : undefined,
    };
  },

  toJSON(message: JonGUIState): unknown {
    const obj: any = {};
    if (message.protocolVersion !== 0) {
      obj.protocolVersion = Math.round(message.protocolVersion);
    }
    if (message.system !== undefined) {
      obj.system = JonGuiDataSystem.toJSON(message.system);
    }
    if (message.meteoInternal !== undefined) {
      obj.meteoInternal = JonGuiDataMeteo.toJSON(message.meteoInternal);
    }
    if (message.meteoExternal !== undefined) {
      obj.meteoExternal = JonGuiDataMeteo.toJSON(message.meteoExternal);
    }
    if (message.lrf !== undefined) {
      obj.lrf = JonGuiDataLrf.toJSON(message.lrf);
    }
    if (message.time !== undefined) {
      obj.time = JonGuiDataTime.toJSON(message.time);
    }
    if (message.gps !== undefined) {
      obj.gps = JonGuiDataGps.toJSON(message.gps);
    }
    if (message.compass !== undefined) {
      obj.compass = JonGuiDataCompass.toJSON(message.compass);
    }
    if (message.rotary !== undefined) {
      obj.rotary = JonGuiDataRotary.toJSON(message.rotary);
    }
    if (message.cameraDay !== undefined) {
      obj.cameraDay = JonGuiDataCameraDay.toJSON(message.cameraDay);
    }
    if (message.cameraHeat !== undefined) {
      obj.cameraHeat = JonGuiDataCameraHeat.toJSON(message.cameraHeat);
    }
    if (message.compassCalibration !== undefined) {
      obj.compassCalibration = JonGuiDataCompassCalibration.toJSON(message.compassCalibration);
    }
    if (message.environment !== undefined) {
      obj.environment = JonGuiDataEnvironment.toJSON(message.environment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGUIState>, I>>(base?: I): JonGUIState {
    return JonGUIState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGUIState>, I>>(object: I): JonGUIState {
    const message = createBaseJonGUIState();
    message.protocolVersion = object.protocolVersion ?? 0;
    message.system = (object.system !== undefined && object.system !== null)
      ? JonGuiDataSystem.fromPartial(object.system)
      : undefined;
    message.meteoInternal = (object.meteoInternal !== undefined && object.meteoInternal !== null)
      ? JonGuiDataMeteo.fromPartial(object.meteoInternal)
      : undefined;
    message.meteoExternal = (object.meteoExternal !== undefined && object.meteoExternal !== null)
      ? JonGuiDataMeteo.fromPartial(object.meteoExternal)
      : undefined;
    message.lrf = (object.lrf !== undefined && object.lrf !== null) ? JonGuiDataLrf.fromPartial(object.lrf) : undefined;
    message.time = (object.time !== undefined && object.time !== null)
      ? JonGuiDataTime.fromPartial(object.time)
      : undefined;
    message.gps = (object.gps !== undefined && object.gps !== null) ? JonGuiDataGps.fromPartial(object.gps) : undefined;
    message.compass = (object.compass !== undefined && object.compass !== null)
      ? JonGuiDataCompass.fromPartial(object.compass)
      : undefined;
    message.rotary = (object.rotary !== undefined && object.rotary !== null)
      ? JonGuiDataRotary.fromPartial(object.rotary)
      : undefined;
    message.cameraDay = (object.cameraDay !== undefined && object.cameraDay !== null)
      ? JonGuiDataCameraDay.fromPartial(object.cameraDay)
      : undefined;
    message.cameraHeat = (object.cameraHeat !== undefined && object.cameraHeat !== null)
      ? JonGuiDataCameraHeat.fromPartial(object.cameraHeat)
      : undefined;
    message.compassCalibration = (object.compassCalibration !== undefined && object.compassCalibration !== null)
      ? JonGuiDataCompassCalibration.fromPartial(object.compassCalibration)
      : undefined;
    message.environment = (object.environment !== undefined && object.environment !== null)
      ? JonGuiDataEnvironment.fromPartial(object.environment)
      : undefined;
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
