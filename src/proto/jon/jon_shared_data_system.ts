// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.1
// source: jon_shared_data_system.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface JonGuiDataSystem {
  cpuTemperature: number;
  gpuTemperature: number;
  /** percent */
  gpuLoad: number;
  /** percent */
  cpuLoad: number;
  /** GigaWt */
  powerConsumption: number;
}

function createBaseJonGuiDataSystem(): JonGuiDataSystem {
  return { cpuTemperature: 0, gpuTemperature: 0, gpuLoad: 0, cpuLoad: 0, powerConsumption: 0 };
}

export const JonGuiDataSystem = {
  encode(message: JonGuiDataSystem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpuTemperature !== 0) {
      writer.uint32(13).float(message.cpuTemperature);
    }
    if (message.gpuTemperature !== 0) {
      writer.uint32(21).float(message.gpuTemperature);
    }
    if (message.gpuLoad !== 0) {
      writer.uint32(29).float(message.gpuLoad);
    }
    if (message.cpuLoad !== 0) {
      writer.uint32(37).float(message.cpuLoad);
    }
    if (message.powerConsumption !== 0) {
      writer.uint32(45).float(message.powerConsumption);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JonGuiDataSystem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJonGuiDataSystem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.cpuTemperature = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.gpuTemperature = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.gpuLoad = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.cpuLoad = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.powerConsumption = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JonGuiDataSystem {
    return {
      cpuTemperature: isSet(object.cpuTemperature) ? globalThis.Number(object.cpuTemperature) : 0,
      gpuTemperature: isSet(object.gpuTemperature) ? globalThis.Number(object.gpuTemperature) : 0,
      gpuLoad: isSet(object.gpuLoad) ? globalThis.Number(object.gpuLoad) : 0,
      cpuLoad: isSet(object.cpuLoad) ? globalThis.Number(object.cpuLoad) : 0,
      powerConsumption: isSet(object.powerConsumption) ? globalThis.Number(object.powerConsumption) : 0,
    };
  },

  toJSON(message: JonGuiDataSystem): unknown {
    const obj: any = {};
    if (message.cpuTemperature !== 0) {
      obj.cpuTemperature = message.cpuTemperature;
    }
    if (message.gpuTemperature !== 0) {
      obj.gpuTemperature = message.gpuTemperature;
    }
    if (message.gpuLoad !== 0) {
      obj.gpuLoad = message.gpuLoad;
    }
    if (message.cpuLoad !== 0) {
      obj.cpuLoad = message.cpuLoad;
    }
    if (message.powerConsumption !== 0) {
      obj.powerConsumption = message.powerConsumption;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JonGuiDataSystem>, I>>(base?: I): JonGuiDataSystem {
    return JonGuiDataSystem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JonGuiDataSystem>, I>>(object: I): JonGuiDataSystem {
    const message = createBaseJonGuiDataSystem();
    message.cpuTemperature = object.cpuTemperature ?? 0;
    message.gpuTemperature = object.gpuTemperature ?? 0;
    message.gpuLoad = object.gpuLoad ?? 0;
    message.cpuLoad = object.cpuLoad ?? 0;
    message.powerConsumption = object.powerConsumption ?? 0;
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
