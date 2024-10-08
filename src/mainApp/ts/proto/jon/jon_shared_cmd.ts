// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.27.2
// source: jon_shared_cmd.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Root as Root4 } from "./jon_shared_cmd_compass";
import { Root as Root1 } from "./jon_shared_cmd_day_camera";
import { Root as Root10 } from "./jon_shared_cmd_environment";
import { Root as Root11 } from "./jon_shared_cmd_geo_test";
import { Root as Root3 } from "./jon_shared_cmd_gps";
import { Root as Root2 } from "./jon_shared_cmd_heat_camera";
import { Root as Root5 } from "./jon_shared_cmd_lrf";
import { Root as Root6 } from "./jon_shared_cmd_lrf_align";
import { Root as Root8 } from "./jon_shared_cmd_osd";
import { Root as Root12 } from "./jon_shared_cmd_power";
import { Root as Root7 } from "./jon_shared_cmd_rotary";
import { Root as Root9 } from "./jon_shared_cmd_system";

export interface Root {
  protocolVersion: number;
  sessionId: number;
  important: boolean;
  dayCamera?: Root1 | undefined;
  heatCamera?: Root2 | undefined;
  gps?: Root3 | undefined;
  compass?: Root4 | undefined;
  lrf?: Root5 | undefined;
  lrfCalib?: Root6 | undefined;
  rotary?: Root7 | undefined;
  osd?: Root8 | undefined;
  ping?: Ping | undefined;
  noop?: Noop | undefined;
  frozen?: Frozen | undefined;
  system?: Root9 | undefined;
  environment?: Root10 | undefined;
  geoTest?: Root11 | undefined;
  power?: Root12 | undefined;
}

export interface Ping {
}

export interface Noop {
}

export interface Frozen {
}

function createBaseRoot(): Root {
  return {
    protocolVersion: 0,
    sessionId: 0,
    important: false,
    dayCamera: undefined,
    heatCamera: undefined,
    gps: undefined,
    compass: undefined,
    lrf: undefined,
    lrfCalib: undefined,
    rotary: undefined,
    osd: undefined,
    ping: undefined,
    noop: undefined,
    frozen: undefined,
    system: undefined,
    environment: undefined,
    geoTest: undefined,
    power: undefined,
  };
}

export const Root = {
  encode(message: Root, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocolVersion !== 0) {
      writer.uint32(8).uint32(message.protocolVersion);
    }
    if (message.sessionId !== 0) {
      writer.uint32(16).uint32(message.sessionId);
    }
    if (message.important !== false) {
      writer.uint32(24).bool(message.important);
    }
    if (message.dayCamera !== undefined) {
      Root1.encode(message.dayCamera, writer.uint32(162).fork()).ldelim();
    }
    if (message.heatCamera !== undefined) {
      Root2.encode(message.heatCamera, writer.uint32(170).fork()).ldelim();
    }
    if (message.gps !== undefined) {
      Root3.encode(message.gps, writer.uint32(178).fork()).ldelim();
    }
    if (message.compass !== undefined) {
      Root4.encode(message.compass, writer.uint32(186).fork()).ldelim();
    }
    if (message.lrf !== undefined) {
      Root5.encode(message.lrf, writer.uint32(194).fork()).ldelim();
    }
    if (message.lrfCalib !== undefined) {
      Root6.encode(message.lrfCalib, writer.uint32(202).fork()).ldelim();
    }
    if (message.rotary !== undefined) {
      Root7.encode(message.rotary, writer.uint32(210).fork()).ldelim();
    }
    if (message.osd !== undefined) {
      Root8.encode(message.osd, writer.uint32(218).fork()).ldelim();
    }
    if (message.ping !== undefined) {
      Ping.encode(message.ping, writer.uint32(226).fork()).ldelim();
    }
    if (message.noop !== undefined) {
      Noop.encode(message.noop, writer.uint32(234).fork()).ldelim();
    }
    if (message.frozen !== undefined) {
      Frozen.encode(message.frozen, writer.uint32(242).fork()).ldelim();
    }
    if (message.system !== undefined) {
      Root9.encode(message.system, writer.uint32(250).fork()).ldelim();
    }
    if (message.environment !== undefined) {
      Root10.encode(message.environment, writer.uint32(258).fork()).ldelim();
    }
    if (message.geoTest !== undefined) {
      Root11.encode(message.geoTest, writer.uint32(266).fork()).ldelim();
    }
    if (message.power !== undefined) {
      Root12.encode(message.power, writer.uint32(274).fork()).ldelim();
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
          if (tag !== 8) {
            break;
          }

          message.protocolVersion = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sessionId = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.important = reader.bool();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.dayCamera = Root1.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.heatCamera = Root2.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.gps = Root3.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.compass = Root4.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.lrf = Root5.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.lrfCalib = Root6.decode(reader, reader.uint32());
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.rotary = Root7.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.osd = Root8.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.ping = Ping.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.noop = Noop.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.frozen = Frozen.decode(reader, reader.uint32());
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.system = Root9.decode(reader, reader.uint32());
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.environment = Root10.decode(reader, reader.uint32());
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.geoTest = Root11.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.power = Root12.decode(reader, reader.uint32());
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
      protocolVersion: isSet(object.protocolVersion) ? globalThis.Number(object.protocolVersion) : 0,
      sessionId: isSet(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
      important: isSet(object.important) ? globalThis.Boolean(object.important) : false,
      dayCamera: isSet(object.dayCamera) ? Root1.fromJSON(object.dayCamera) : undefined,
      heatCamera: isSet(object.heatCamera) ? Root2.fromJSON(object.heatCamera) : undefined,
      gps: isSet(object.gps) ? Root3.fromJSON(object.gps) : undefined,
      compass: isSet(object.compass) ? Root4.fromJSON(object.compass) : undefined,
      lrf: isSet(object.lrf) ? Root5.fromJSON(object.lrf) : undefined,
      lrfCalib: isSet(object.lrfCalib) ? Root6.fromJSON(object.lrfCalib) : undefined,
      rotary: isSet(object.rotary) ? Root7.fromJSON(object.rotary) : undefined,
      osd: isSet(object.osd) ? Root8.fromJSON(object.osd) : undefined,
      ping: isSet(object.ping) ? Ping.fromJSON(object.ping) : undefined,
      noop: isSet(object.noop) ? Noop.fromJSON(object.noop) : undefined,
      frozen: isSet(object.frozen) ? Frozen.fromJSON(object.frozen) : undefined,
      system: isSet(object.system) ? Root9.fromJSON(object.system) : undefined,
      environment: isSet(object.environment) ? Root10.fromJSON(object.environment) : undefined,
      geoTest: isSet(object.geoTest) ? Root11.fromJSON(object.geoTest) : undefined,
      power: isSet(object.power) ? Root12.fromJSON(object.power) : undefined,
    };
  },

  toJSON(message: Root): unknown {
    const obj: any = {};
    if (message.protocolVersion !== 0) {
      obj.protocolVersion = Math.round(message.protocolVersion);
    }
    if (message.sessionId !== 0) {
      obj.sessionId = Math.round(message.sessionId);
    }
    if (message.important !== false) {
      obj.important = message.important;
    }
    if (message.dayCamera !== undefined) {
      obj.dayCamera = Root1.toJSON(message.dayCamera);
    }
    if (message.heatCamera !== undefined) {
      obj.heatCamera = Root2.toJSON(message.heatCamera);
    }
    if (message.gps !== undefined) {
      obj.gps = Root3.toJSON(message.gps);
    }
    if (message.compass !== undefined) {
      obj.compass = Root4.toJSON(message.compass);
    }
    if (message.lrf !== undefined) {
      obj.lrf = Root5.toJSON(message.lrf);
    }
    if (message.lrfCalib !== undefined) {
      obj.lrfCalib = Root6.toJSON(message.lrfCalib);
    }
    if (message.rotary !== undefined) {
      obj.rotary = Root7.toJSON(message.rotary);
    }
    if (message.osd !== undefined) {
      obj.osd = Root8.toJSON(message.osd);
    }
    if (message.ping !== undefined) {
      obj.ping = Ping.toJSON(message.ping);
    }
    if (message.noop !== undefined) {
      obj.noop = Noop.toJSON(message.noop);
    }
    if (message.frozen !== undefined) {
      obj.frozen = Frozen.toJSON(message.frozen);
    }
    if (message.system !== undefined) {
      obj.system = Root9.toJSON(message.system);
    }
    if (message.environment !== undefined) {
      obj.environment = Root10.toJSON(message.environment);
    }
    if (message.geoTest !== undefined) {
      obj.geoTest = Root11.toJSON(message.geoTest);
    }
    if (message.power !== undefined) {
      obj.power = Root12.toJSON(message.power);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Root>, I>>(base?: I): Root {
    return Root.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Root>, I>>(object: I): Root {
    const message = createBaseRoot();
    message.protocolVersion = object.protocolVersion ?? 0;
    message.sessionId = object.sessionId ?? 0;
    message.important = object.important ?? false;
    message.dayCamera = (object.dayCamera !== undefined && object.dayCamera !== null)
      ? Root1.fromPartial(object.dayCamera)
      : undefined;
    message.heatCamera = (object.heatCamera !== undefined && object.heatCamera !== null)
      ? Root2.fromPartial(object.heatCamera)
      : undefined;
    message.gps = (object.gps !== undefined && object.gps !== null) ? Root3.fromPartial(object.gps) : undefined;
    message.compass = (object.compass !== undefined && object.compass !== null)
      ? Root4.fromPartial(object.compass)
      : undefined;
    message.lrf = (object.lrf !== undefined && object.lrf !== null) ? Root5.fromPartial(object.lrf) : undefined;
    message.lrfCalib = (object.lrfCalib !== undefined && object.lrfCalib !== null)
      ? Root6.fromPartial(object.lrfCalib)
      : undefined;
    message.rotary = (object.rotary !== undefined && object.rotary !== null)
      ? Root7.fromPartial(object.rotary)
      : undefined;
    message.osd = (object.osd !== undefined && object.osd !== null) ? Root8.fromPartial(object.osd) : undefined;
    message.ping = (object.ping !== undefined && object.ping !== null) ? Ping.fromPartial(object.ping) : undefined;
    message.noop = (object.noop !== undefined && object.noop !== null) ? Noop.fromPartial(object.noop) : undefined;
    message.frozen = (object.frozen !== undefined && object.frozen !== null)
      ? Frozen.fromPartial(object.frozen)
      : undefined;
    message.system = (object.system !== undefined && object.system !== null)
      ? Root9.fromPartial(object.system)
      : undefined;
    message.environment = (object.environment !== undefined && object.environment !== null)
      ? Root10.fromPartial(object.environment)
      : undefined;
    message.geoTest = (object.geoTest !== undefined && object.geoTest !== null)
      ? Root11.fromPartial(object.geoTest)
      : undefined;
    message.power = (object.power !== undefined && object.power !== null)
      ? Root12.fromPartial(object.power)
      : undefined;
    return message;
  },
};

function createBasePing(): Ping {
  return {};
}

export const Ping = {
  encode(_: Ping, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ping {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Ping {
    return {};
  },

  toJSON(_: Ping): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Ping>, I>>(base?: I): Ping {
    return Ping.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Ping>, I>>(_: I): Ping {
    const message = createBasePing();
    return message;
  },
};

function createBaseNoop(): Noop {
  return {};
}

export const Noop = {
  encode(_: Noop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Noop {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNoop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Noop {
    return {};
  },

  toJSON(_: Noop): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Noop>, I>>(base?: I): Noop {
    return Noop.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Noop>, I>>(_: I): Noop {
    const message = createBaseNoop();
    return message;
  },
};

function createBaseFrozen(): Frozen {
  return {};
}

export const Frozen = {
  encode(_: Frozen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Frozen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrozen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Frozen {
    return {};
  },

  toJSON(_: Frozen): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Frozen>, I>>(base?: I): Frozen {
    return Frozen.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Frozen>, I>>(_: I): Frozen {
    const message = createBaseFrozen();
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
