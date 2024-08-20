// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.2
// source: jon_shared_cmd_system.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Root {
  startAll?: StartALl | undefined;
  stopAll?: StopALl | undefined;
  reboot?: Reboot | undefined;
  powerOff?: PowerOff | undefined;
}

export interface StartALl {
}

export interface StopALl {
}

export interface Reboot {
}

export interface PowerOff {
}

function createBaseRoot(): Root {
  return { startAll: undefined, stopAll: undefined, reboot: undefined, powerOff: undefined };
}

export const Root = {
  encode(message: Root, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startAll !== undefined) {
      StartALl.encode(message.startAll, writer.uint32(10).fork()).ldelim();
    }
    if (message.stopAll !== undefined) {
      StopALl.encode(message.stopAll, writer.uint32(18).fork()).ldelim();
    }
    if (message.reboot !== undefined) {
      Reboot.encode(message.reboot, writer.uint32(26).fork()).ldelim();
    }
    if (message.powerOff !== undefined) {
      PowerOff.encode(message.powerOff, writer.uint32(34).fork()).ldelim();
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
          if (tag !== 10) {
            break;
          }

          message.startAll = StartALl.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stopAll = StopALl.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reboot = Reboot.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.powerOff = PowerOff.decode(reader, reader.uint32());
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
      startAll: isSet(object.startAll) ? StartALl.fromJSON(object.startAll) : undefined,
      stopAll: isSet(object.stopAll) ? StopALl.fromJSON(object.stopAll) : undefined,
      reboot: isSet(object.reboot) ? Reboot.fromJSON(object.reboot) : undefined,
      powerOff: isSet(object.powerOff) ? PowerOff.fromJSON(object.powerOff) : undefined,
    };
  },

  toJSON(message: Root): unknown {
    const obj: any = {};
    if (message.startAll !== undefined) {
      obj.startAll = StartALl.toJSON(message.startAll);
    }
    if (message.stopAll !== undefined) {
      obj.stopAll = StopALl.toJSON(message.stopAll);
    }
    if (message.reboot !== undefined) {
      obj.reboot = Reboot.toJSON(message.reboot);
    }
    if (message.powerOff !== undefined) {
      obj.powerOff = PowerOff.toJSON(message.powerOff);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Root>, I>>(base?: I): Root {
    return Root.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Root>, I>>(object: I): Root {
    const message = createBaseRoot();
    message.startAll = (object.startAll !== undefined && object.startAll !== null)
      ? StartALl.fromPartial(object.startAll)
      : undefined;
    message.stopAll = (object.stopAll !== undefined && object.stopAll !== null)
      ? StopALl.fromPartial(object.stopAll)
      : undefined;
    message.reboot = (object.reboot !== undefined && object.reboot !== null)
      ? Reboot.fromPartial(object.reboot)
      : undefined;
    message.powerOff = (object.powerOff !== undefined && object.powerOff !== null)
      ? PowerOff.fromPartial(object.powerOff)
      : undefined;
    return message;
  },
};

function createBaseStartALl(): StartALl {
  return {};
}

export const StartALl = {
  encode(_: StartALl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartALl {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartALl();
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

  fromJSON(_: any): StartALl {
    return {};
  },

  toJSON(_: StartALl): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StartALl>, I>>(base?: I): StartALl {
    return StartALl.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StartALl>, I>>(_: I): StartALl {
    const message = createBaseStartALl();
    return message;
  },
};

function createBaseStopALl(): StopALl {
  return {};
}

export const StopALl = {
  encode(_: StopALl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopALl {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopALl();
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

  fromJSON(_: any): StopALl {
    return {};
  },

  toJSON(_: StopALl): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StopALl>, I>>(base?: I): StopALl {
    return StopALl.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StopALl>, I>>(_: I): StopALl {
    const message = createBaseStopALl();
    return message;
  },
};

function createBaseReboot(): Reboot {
  return {};
}

export const Reboot = {
  encode(_: Reboot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reboot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReboot();
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

  fromJSON(_: any): Reboot {
    return {};
  },

  toJSON(_: Reboot): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Reboot>, I>>(base?: I): Reboot {
    return Reboot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Reboot>, I>>(_: I): Reboot {
    const message = createBaseReboot();
    return message;
  },
};

function createBasePowerOff(): PowerOff {
  return {};
}

export const PowerOff = {
  encode(_: PowerOff, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerOff {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerOff();
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

  fromJSON(_: any): PowerOff {
    return {};
  },

  toJSON(_: PowerOff): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<PowerOff>, I>>(base?: I): PowerOff {
    return PowerOff.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PowerOff>, I>>(_: I): PowerOff {
    const message = createBasePowerOff();
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
