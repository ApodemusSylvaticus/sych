// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data_camera_heat.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import {
  JonGuiDataMeteo,
  JonGuiDataVideoChannelHeatAGCModes,
  jonGuiDataVideoChannelHeatAGCModesFromJSON,
  jonGuiDataVideoChannelHeatAGCModesToJSON,
  JonGuiDataVideoChannelHeatFilters,
  jonGuiDataVideoChannelHeatFiltersFromJSON,
  jonGuiDataVideoChannelHeatFiltersToJSON,
} from "./jon_shared_data_types";

export interface JonGuiDataCameraHeat {
  focusPos: number;
  zoomPos: number;
  agcMode: JonGuiDataVideoChannelHeatAGCModes;
  filter: JonGuiDataVideoChannelHeatFilters;
  autoFocus: boolean;
  recording: boolean;
  syncZoomToDayCamera: boolean;
  zoomTablePos: number;
  zoomTablePosMax: number;
  meteo: JonGuiDataMeteo | undefined;
  ddeLevel: number;
  ddeEnabled: boolean;
  ddeMaxLevel: number;
}

function createBaseJonGuiDataCameraHeat(): JonGuiDataCameraHeat {
  return {
    focusPos: 0,
    zoomPos: 0,
    agcMode: 0,
    filter: 0,
    autoFocus: false,
    recording: false,
    syncZoomToDayCamera: false,
    zoomTablePos: 0,
    zoomTablePosMax: 0,
    meteo: undefined,
    ddeLevel: 0,
    ddeEnabled: false,
    ddeMaxLevel: 0,
  };
}

export const JonGuiDataCameraHeat = {
  encode(message: JonGuiDataCameraHeat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.focusPos !== 0) {
      writer.uint32(13).float(message.focusPos);
    }
    if (message.zoomPos !== 0) {
      writer.uint32(21).float(message.zoomPos);
    }
    if (message.agcMode !== 0) {
      writer.uint32(24).int32(message.agcMode);
    }
    if (message.filter !== 0) {
      writer.uint32(32).int32(message.filter);
    }
    if (message.autoFocus !== false) {
      writer.uint32(40).bool(message.autoFocus);
    }
    if (message.recording !== false) {
      writer.uint32(48).bool(message.recording);
    }
    if (message.syncZoomToDayCamera !== false) {
      writer.uint32(56).bool(message.syncZoomToDayCamera);
    }
    if (message.zoomTablePos !== 0) {
      writer.uint32(64).int32(message.zoomTablePos);
    }
    if (message.zoomTablePosMax !== 0) {
      writer.uint32(72).int32(message.zoomTablePosMax);
    }
    if (message.meteo !== undefined) {
      JonGuiDataMeteo.encode(message.meteo, writer.uint32(82).fork()).ldelim();
    }
    if (message.ddeLevel !== 0) {
      writer.uint32(88).int32(message.ddeLevel);
    }
    if (message.ddeEnabled !== false) {
      writer.uint32(96).bool(message.ddeEnabled);
    }
    if (message.ddeMaxLevel !== 0) {
      writer.uint32(104).int32(message.ddeMaxLevel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGuiDataCameraHeat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGuiDataCameraHeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.focusPos = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.zoomPos = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.agcMode = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.filter = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.autoFocus = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.recording = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.syncZoomToDayCamera = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.zoomTablePos = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.zoomTablePosMax = reader.int32();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.meteo = JonGuiDataMeteo.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.ddeLevel = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.ddeEnabled = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.ddeMaxLevel = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGuiDataCameraHeat {
    return {
      focusPos: isSet(object.focusPos) ? globalThis.Number(object.focusPos) : 0,
      zoomPos: isSet(object.zoomPos) ? globalThis.Number(object.zoomPos) : 0,
      agcMode: isSet(object.agcMode) ? jonGuiDataVideoChannelHeatAGCModesFromJSON(object.agcMode) : 0,
      filter: isSet(object.filter) ? jonGuiDataVideoChannelHeatFiltersFromJSON(object.filter) : 0,
      autoFocus: isSet(object.autoFocus) ? globalThis.Boolean(object.autoFocus) : false,
      recording: isSet(object.recording) ? globalThis.Boolean(object.recording) : false,
      syncZoomToDayCamera: isSet(object.syncZoomToDayCamera) ? globalThis.Boolean(object.syncZoomToDayCamera) : false,
      zoomTablePos: isSet(object.zoomTablePos) ? globalThis.Number(object.zoomTablePos) : 0,
      zoomTablePosMax: isSet(object.zoomTablePosMax) ? globalThis.Number(object.zoomTablePosMax) : 0,
      meteo: isSet(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : undefined,
      ddeLevel: isSet(object.ddeLevel) ? globalThis.Number(object.ddeLevel) : 0,
      ddeEnabled: isSet(object.ddeEnabled) ? globalThis.Boolean(object.ddeEnabled) : false,
      ddeMaxLevel: isSet(object.ddeMaxLevel) ? globalThis.Number(object.ddeMaxLevel) : 0,
    };
  },

  toJSON(message: JonGuiDataCameraHeat): unknown {
    const obj: any = {};
    if (message.focusPos !== 0) {
      obj.focusPos = message.focusPos;
    }
    if (message.zoomPos !== 0) {
      obj.zoomPos = message.zoomPos;
    }
    if (message.agcMode !== 0) {
      obj.agcMode = jonGuiDataVideoChannelHeatAGCModesToJSON(message.agcMode);
    }
    if (message.filter !== 0) {
      obj.filter = jonGuiDataVideoChannelHeatFiltersToJSON(message.filter);
    }
    if (message.autoFocus !== false) {
      obj.autoFocus = message.autoFocus;
    }
    if (message.recording !== false) {
      obj.recording = message.recording;
    }
    if (message.syncZoomToDayCamera !== false) {
      obj.syncZoomToDayCamera = message.syncZoomToDayCamera;
    }
    if (message.zoomTablePos !== 0) {
      obj.zoomTablePos = Math.round(message.zoomTablePos);
    }
    if (message.zoomTablePosMax !== 0) {
      obj.zoomTablePosMax = Math.round(message.zoomTablePosMax);
    }
    if (message.meteo !== undefined) {
      obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
    }
    if (message.ddeLevel !== 0) {
      obj.ddeLevel = Math.round(message.ddeLevel);
    }
    if (message.ddeEnabled !== false) {
      obj.ddeEnabled = message.ddeEnabled;
    }
    if (message.ddeMaxLevel !== 0) {
      obj.ddeMaxLevel = Math.round(message.ddeMaxLevel);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGuiDataCameraHeat>, I>>(base?: I): JonGuiDataCameraHeat {
    return JonGuiDataCameraHeat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGuiDataCameraHeat>, I>>(object: I): JonGuiDataCameraHeat {
    const message = createBaseJonGuiDataCameraHeat();
    message.focusPos = object.focusPos ?? 0;
    message.zoomPos = object.zoomPos ?? 0;
    message.agcMode = object.agcMode ?? 0;
    message.filter = object.filter ?? 0;
    message.autoFocus = object.autoFocus ?? false;
    message.recording = object.recording ?? false;
    message.syncZoomToDayCamera = object.syncZoomToDayCamera ?? false;
    message.zoomTablePos = object.zoomTablePos ?? 0;
    message.zoomTablePosMax = object.zoomTablePosMax ?? 0;
    message.meteo = (object.meteo !== undefined && object.meteo !== null)
      ? JonGuiDataMeteo.fromPartial(object.meteo)
      : undefined;
    message.ddeLevel = object.ddeLevel ?? 0;
    message.ddeEnabled = object.ddeEnabled ?? false;
    message.ddeMaxLevel = object.ddeMaxLevel ?? 0;
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
