// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_cmd_geo_test.proto

/* eslint-disable */
import _m0 from 'protobufjs/minimal';

export interface Root {
  /** GPS data */
  longitude: number;
  latitude: number;
  altitude: number;
  /** LRF data */
  range: number;
  /** Compass data */
  azimuth: number;
  elevation: number;
  bank: number;
}

function createBaseRoot(): Root {
  return { longitude: 0, latitude: 0, altitude: 0, range: 0, azimuth: 0, elevation: 0, bank: 0 };
}

export const Root = {
  encode(message: Root, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.longitude !== 0) {
      writer.uint32(9).double(message.longitude);
    }
    if (message.latitude !== 0) {
      writer.uint32(17).double(message.latitude);
    }
    if (message.altitude !== 0) {
      writer.uint32(25).double(message.altitude);
    }
    if (message.range !== 0) {
      writer.uint32(33).double(message.range);
    }
    if (message.azimuth !== 0) {
      writer.uint32(41).double(message.azimuth);
    }
    if (message.elevation !== 0) {
      writer.uint32(49).double(message.elevation);
    }
    if (message.bank !== 0) {
      writer.uint32(57).double(message.bank);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Root {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.longitude = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.latitude = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.altitude = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.range = reader.double();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.azimuth = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.elevation = reader.double();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.bank = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Root {
    return {
      longitude: isSet(object.longitude) ? globalThis.Number(object.longitude) : 0,
      latitude: isSet(object.latitude) ? globalThis.Number(object.latitude) : 0,
      altitude: isSet(object.altitude) ? globalThis.Number(object.altitude) : 0,
      range: isSet(object.range) ? globalThis.Number(object.range) : 0,
      azimuth: isSet(object.azimuth) ? globalThis.Number(object.azimuth) : 0,
      elevation: isSet(object.elevation) ? globalThis.Number(object.elevation) : 0,
      bank: isSet(object.bank) ? globalThis.Number(object.bank) : 0,
    };
  },

  toJSON(message: Root): unknown {
    const obj: any = {};
    if (message.longitude !== 0) {
      obj.longitude = message.longitude;
    }
    if (message.latitude !== 0) {
      obj.latitude = message.latitude;
    }
    if (message.altitude !== 0) {
      obj.altitude = message.altitude;
    }
    if (message.range !== 0) {
      obj.range = message.range;
    }
    if (message.azimuth !== 0) {
      obj.azimuth = message.azimuth;
    }
    if (message.elevation !== 0) {
      obj.elevation = message.elevation;
    }
    if (message.bank !== 0) {
      obj.bank = message.bank;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Root>, I>>(base?: I): Root {
    return Root.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Root>, I>>(object: I): Root {
    const message = createBaseRoot();
    message.longitude = object.longitude ?? 0;
    message.latitude = object.latitude ?? 0;
    message.altitude = object.altitude ?? 0;
    message.range = object.range ?? 0;
    message.azimuth = object.azimuth ?? 0;
    message.elevation = object.elevation ?? 0;
    message.bank = object.bank ?? 0;
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
