// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data_time.proto

/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

/** Message representing time information */
export interface JonGuiDataTime {
  timestamp: number;
  manualTimestamp: number;
  zoneId: number;
  useManualTime: boolean;
}

function createBaseJonGuiDataTime(): JonGuiDataTime {
  return { timestamp: 0, manualTimestamp: 0, zoneId: 0, useManualTime: false };
}

export const JonGuiDataTime = {
  encode(message: JonGuiDataTime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).int64(message.timestamp);
    }
    if (message.manualTimestamp !== 0) {
      writer.uint32(16).int64(message.manualTimestamp);
    }
    if (message.zoneId !== 0) {
      writer.uint32(24).int32(message.zoneId);
    }
    if (message.useManualTime !== false) {
      writer.uint32(32).bool(message.useManualTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGuiDataTime {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGuiDataTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.manualTimestamp = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.zoneId = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.useManualTime = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGuiDataTime {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      manualTimestamp: isSet(object.manualTimestamp) ? globalThis.Number(object.manualTimestamp) : 0,
      zoneId: isSet(object.zoneId) ? globalThis.Number(object.zoneId) : 0,
      useManualTime: isSet(object.useManualTime) ? globalThis.Boolean(object.useManualTime) : false,
    };
  },

  toJSON(message: JonGuiDataTime): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.manualTimestamp !== 0) {
      obj.manualTimestamp = Math.round(message.manualTimestamp);
    }
    if (message.zoneId !== 0) {
      obj.zoneId = Math.round(message.zoneId);
    }
    if (message.useManualTime !== false) {
      obj.useManualTime = message.useManualTime;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGuiDataTime>, I>>(base?: I): JonGuiDataTime {
    return JonGuiDataTime.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGuiDataTime>, I>>(object: I): JonGuiDataTime {
    const message = createBaseJonGuiDataTime();
    message.timestamp = object.timestamp ?? 0;
    message.manualTimestamp = object.manualTimestamp ?? 0;
    message.zoneId = object.zoneId ?? 0;
    message.useManualTime = object.useManualTime ?? false;
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is smaller than Number.MIN_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
