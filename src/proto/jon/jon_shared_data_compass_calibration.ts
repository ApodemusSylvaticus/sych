// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data_compass_calibration.proto

/* eslint-disable */
import _m0 from 'protobufjs/minimal';
import {
  JonGuiDataCompassCalibrateStatus,
  jonGuiDataCompassCalibrateStatusFromJSON,
  jonGuiDataCompassCalibrateStatusToJSON,
} from './jon_shared_data_types';

export interface JonGuiDataCompassCalibration {
  stage: number;
  finalStage: number;
  targetAzimuth: number;
  targetElevation: number;
  targetBank: number;
  status: JonGuiDataCompassCalibrateStatus;
}

function createBaseJonGuiDataCompassCalibration(): JonGuiDataCompassCalibration {
  return { stage: 0, finalStage: 0, targetAzimuth: 0, targetElevation: 0, targetBank: 0, status: 0 };
}

export const JonGuiDataCompassCalibration = {
  encode(message: JonGuiDataCompassCalibration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stage !== 0) {
      writer.uint32(8).uint32(message.stage);
    }
    if (message.finalStage !== 0) {
      writer.uint32(16).uint32(message.finalStage);
    }
    if (message.targetAzimuth !== 0) {
      writer.uint32(29).float(message.targetAzimuth);
    }
    if (message.targetElevation !== 0) {
      writer.uint32(37).float(message.targetElevation);
    }
    if (message.targetBank !== 0) {
      writer.uint32(45).float(message.targetBank);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGuiDataCompassCalibration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGuiDataCompassCalibration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.stage = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.finalStage = reader.uint32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.targetAzimuth = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.targetElevation = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.targetBank = reader.float();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGuiDataCompassCalibration {
    return {
      stage: isSet(object.stage) ? globalThis.Number(object.stage) : 0,
      finalStage: isSet(object.finalStage) ? globalThis.Number(object.finalStage) : 0,
      targetAzimuth: isSet(object.targetAzimuth) ? globalThis.Number(object.targetAzimuth) : 0,
      targetElevation: isSet(object.targetElevation) ? globalThis.Number(object.targetElevation) : 0,
      targetBank: isSet(object.targetBank) ? globalThis.Number(object.targetBank) : 0,
      status: isSet(object.status) ? jonGuiDataCompassCalibrateStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: JonGuiDataCompassCalibration): unknown {
    const obj: any = {};
    if (message.stage !== 0) {
      obj.stage = Math.round(message.stage);
    }
    if (message.finalStage !== 0) {
      obj.finalStage = Math.round(message.finalStage);
    }
    if (message.targetAzimuth !== 0) {
      obj.targetAzimuth = message.targetAzimuth;
    }
    if (message.targetElevation !== 0) {
      obj.targetElevation = message.targetElevation;
    }
    if (message.targetBank !== 0) {
      obj.targetBank = message.targetBank;
    }
    if (message.status !== 0) {
      obj.status = jonGuiDataCompassCalibrateStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGuiDataCompassCalibration>, I>>(base?: I): JonGuiDataCompassCalibration {
    return JonGuiDataCompassCalibration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGuiDataCompassCalibration>, I>>(object: I): JonGuiDataCompassCalibration {
    const message = createBaseJonGuiDataCompassCalibration();
    message.stage = object.stage ?? 0;
    message.finalStage = object.finalStage ?? 0;
    message.targetAzimuth = object.targetAzimuth ?? 0;
    message.targetElevation = object.targetElevation ?? 0;
    message.targetBank = object.targetBank ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
