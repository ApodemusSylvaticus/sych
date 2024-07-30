// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data_camera_day.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { JonGuiDataMeteo } from "./jon_shared_data_types";

export interface JonGuiDataCameraDay {
  focusPos: number;
  zoomPos: number;
  irisPos: number;
  exposure: number;
  gain: number;
  autoFocus: boolean;
  recording: boolean;
  autoIris: boolean;
  infraredFilter: boolean;
  syncZoomToHeatCamera: boolean;
  zoomTablePos: number;
  zoomTablePosMax: number;
  meteo: JonGuiDataMeteo | undefined;
}

function createBaseJonGuiDataCameraDay(): JonGuiDataCameraDay {
  return {
    focusPos: 0,
    zoomPos: 0,
    irisPos: 0,
    exposure: 0,
    gain: 0,
    autoFocus: false,
    recording: false,
    autoIris: false,
    infraredFilter: false,
    syncZoomToHeatCamera: false,
    zoomTablePos: 0,
    zoomTablePosMax: 0,
    meteo: undefined,
  };
}

export const JonGuiDataCameraDay = {
  encode(message: JonGuiDataCameraDay, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.focusPos !== 0) {
      writer.uint32(13).float(message.focusPos);
    }
    if (message.zoomPos !== 0) {
      writer.uint32(29).float(message.zoomPos);
    }
    if (message.irisPos !== 0) {
      writer.uint32(37).float(message.irisPos);
    }
    if (message.exposure !== 0) {
      writer.uint32(45).float(message.exposure);
    }
    if (message.gain !== 0) {
      writer.uint32(53).float(message.gain);
    }
    if (message.autoFocus !== false) {
      writer.uint32(56).bool(message.autoFocus);
    }
    if (message.recording !== false) {
      writer.uint32(64).bool(message.recording);
    }
    if (message.autoIris !== false) {
      writer.uint32(72).bool(message.autoIris);
    }
    if (message.infraredFilter !== false) {
      writer.uint32(80).bool(message.infraredFilter);
    }
    if (message.syncZoomToHeatCamera !== false) {
      writer.uint32(88).bool(message.syncZoomToHeatCamera);
    }
    if (message.zoomTablePos !== 0) {
      writer.uint32(96).int32(message.zoomTablePos);
    }
    if (message.zoomTablePosMax !== 0) {
      writer.uint32(104).int32(message.zoomTablePosMax);
    }
    if (message.meteo !== undefined) {
      JonGuiDataMeteo.encode(message.meteo, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGuiDataCameraDay {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGuiDataCameraDay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.focusPos = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.zoomPos = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.irisPos = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.exposure = reader.float();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }

          message.gain = reader.float();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.autoFocus = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.recording = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.autoIris = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.infraredFilter = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.syncZoomToHeatCamera = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.zoomTablePos = reader.int32();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.zoomTablePosMax = reader.int32();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.meteo = JonGuiDataMeteo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGuiDataCameraDay {
    return {
      focusPos: isSet(object.focusPos) ? globalThis.Number(object.focusPos) : 0,
      zoomPos: isSet(object.zoomPos) ? globalThis.Number(object.zoomPos) : 0,
      irisPos: isSet(object.irisPos) ? globalThis.Number(object.irisPos) : 0,
      exposure: isSet(object.exposure) ? globalThis.Number(object.exposure) : 0,
      gain: isSet(object.gain) ? globalThis.Number(object.gain) : 0,
      autoFocus: isSet(object.autoFocus) ? globalThis.Boolean(object.autoFocus) : false,
      recording: isSet(object.recording) ? globalThis.Boolean(object.recording) : false,
      autoIris: isSet(object.autoIris) ? globalThis.Boolean(object.autoIris) : false,
      infraredFilter: isSet(object.infraredFilter) ? globalThis.Boolean(object.infraredFilter) : false,
      syncZoomToHeatCamera: isSet(object.syncZoomToHeatCamera)
        ? globalThis.Boolean(object.syncZoomToHeatCamera)
        : false,
      zoomTablePos: isSet(object.zoomTablePos) ? globalThis.Number(object.zoomTablePos) : 0,
      zoomTablePosMax: isSet(object.zoomTablePosMax) ? globalThis.Number(object.zoomTablePosMax) : 0,
      meteo: isSet(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : undefined,
    };
  },

  toJSON(message: JonGuiDataCameraDay): unknown {
    const obj: any = {};
    if (message.focusPos !== 0) {
      obj.focusPos = message.focusPos;
    }
    if (message.zoomPos !== 0) {
      obj.zoomPos = message.zoomPos;
    }
    if (message.irisPos !== 0) {
      obj.irisPos = message.irisPos;
    }
    if (message.exposure !== 0) {
      obj.exposure = message.exposure;
    }
    if (message.gain !== 0) {
      obj.gain = message.gain;
    }
    if (message.autoFocus !== false) {
      obj.autoFocus = message.autoFocus;
    }
    if (message.recording !== false) {
      obj.recording = message.recording;
    }
    if (message.autoIris !== false) {
      obj.autoIris = message.autoIris;
    }
    if (message.infraredFilter !== false) {
      obj.infraredFilter = message.infraredFilter;
    }
    if (message.syncZoomToHeatCamera !== false) {
      obj.syncZoomToHeatCamera = message.syncZoomToHeatCamera;
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
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGuiDataCameraDay>, I>>(base?: I): JonGuiDataCameraDay {
    return JonGuiDataCameraDay.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGuiDataCameraDay>, I>>(object: I): JonGuiDataCameraDay {
    const message = createBaseJonGuiDataCameraDay();
    message.focusPos = object.focusPos ?? 0;
    message.zoomPos = object.zoomPos ?? 0;
    message.irisPos = object.irisPos ?? 0;
    message.exposure = object.exposure ?? 0;
    message.gain = object.gain ?? 0;
    message.autoFocus = object.autoFocus ?? false;
    message.recording = object.recording ?? false;
    message.autoIris = object.autoIris ?? false;
    message.infraredFilter = object.infraredFilter ?? false;
    message.syncZoomToHeatCamera = object.syncZoomToHeatCamera ?? false;
    message.zoomTablePos = object.zoomTablePos ?? 0;
    message.zoomTablePosMax = object.zoomTablePosMax ?? 0;
    message.meteo = (object.meteo !== undefined && object.meteo !== null)
      ? JonGuiDataMeteo.fromPartial(object.meteo)
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
