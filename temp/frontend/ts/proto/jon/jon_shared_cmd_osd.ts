// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.2
// source: jon_shared_cmd_osd.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Root {
  showDefaultScreen?: ShowDefaultScreen | undefined;
  showLrfMeasureScreen?: ShowLRFMeasureScreen | undefined;
  showLrfResultScreen?: ShowLRFResultScreen | undefined;
  showLrfResultSimplifiedScreen?: ShowLRFResultSimplifiedScreen | undefined;
}

export interface ShowDefaultScreen {
}

export interface ShowLRFMeasureScreen {
}

export interface ShowLRFResultScreen {
}

export interface ShowLRFResultSimplifiedScreen {
}

function createBaseRoot(): Root {
  return {
    showDefaultScreen: undefined,
    showLrfMeasureScreen: undefined,
    showLrfResultScreen: undefined,
    showLrfResultSimplifiedScreen: undefined,
  };
}

export const Root = {
  encode(message: Root, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.showDefaultScreen !== undefined) {
      ShowDefaultScreen.encode(message.showDefaultScreen, writer.uint32(10).fork()).ldelim();
    }
    if (message.showLrfMeasureScreen !== undefined) {
      ShowLRFMeasureScreen.encode(message.showLrfMeasureScreen, writer.uint32(18).fork()).ldelim();
    }
    if (message.showLrfResultScreen !== undefined) {
      ShowLRFResultScreen.encode(message.showLrfResultScreen, writer.uint32(26).fork()).ldelim();
    }
    if (message.showLrfResultSimplifiedScreen !== undefined) {
      ShowLRFResultSimplifiedScreen.encode(message.showLrfResultSimplifiedScreen, writer.uint32(34).fork()).ldelim();
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

          message.showDefaultScreen = ShowDefaultScreen.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.showLrfMeasureScreen = ShowLRFMeasureScreen.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.showLrfResultScreen = ShowLRFResultScreen.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.showLrfResultSimplifiedScreen = ShowLRFResultSimplifiedScreen.decode(reader, reader.uint32());
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
      showDefaultScreen: isSet(object.showDefaultScreen)
        ? ShowDefaultScreen.fromJSON(object.showDefaultScreen)
        : undefined,
      showLrfMeasureScreen: isSet(object.showLrfMeasureScreen)
        ? ShowLRFMeasureScreen.fromJSON(object.showLrfMeasureScreen)
        : undefined,
      showLrfResultScreen: isSet(object.showLrfResultScreen)
        ? ShowLRFResultScreen.fromJSON(object.showLrfResultScreen)
        : undefined,
      showLrfResultSimplifiedScreen: isSet(object.showLrfResultSimplifiedScreen)
        ? ShowLRFResultSimplifiedScreen.fromJSON(object.showLrfResultSimplifiedScreen)
        : undefined,
    };
  },

  toJSON(message: Root): unknown {
    const obj: any = {};
    if (message.showDefaultScreen !== undefined) {
      obj.showDefaultScreen = ShowDefaultScreen.toJSON(message.showDefaultScreen);
    }
    if (message.showLrfMeasureScreen !== undefined) {
      obj.showLrfMeasureScreen = ShowLRFMeasureScreen.toJSON(message.showLrfMeasureScreen);
    }
    if (message.showLrfResultScreen !== undefined) {
      obj.showLrfResultScreen = ShowLRFResultScreen.toJSON(message.showLrfResultScreen);
    }
    if (message.showLrfResultSimplifiedScreen !== undefined) {
      obj.showLrfResultSimplifiedScreen = ShowLRFResultSimplifiedScreen.toJSON(message.showLrfResultSimplifiedScreen);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Root>, I>>(base?: I): Root {
    return Root.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Root>, I>>(object: I): Root {
    const message = createBaseRoot();
    message.showDefaultScreen = (object.showDefaultScreen !== undefined && object.showDefaultScreen !== null)
      ? ShowDefaultScreen.fromPartial(object.showDefaultScreen)
      : undefined;
    message.showLrfMeasureScreen = (object.showLrfMeasureScreen !== undefined && object.showLrfMeasureScreen !== null)
      ? ShowLRFMeasureScreen.fromPartial(object.showLrfMeasureScreen)
      : undefined;
    message.showLrfResultScreen = (object.showLrfResultScreen !== undefined && object.showLrfResultScreen !== null)
      ? ShowLRFResultScreen.fromPartial(object.showLrfResultScreen)
      : undefined;
    message.showLrfResultSimplifiedScreen =
      (object.showLrfResultSimplifiedScreen !== undefined && object.showLrfResultSimplifiedScreen !== null)
        ? ShowLRFResultSimplifiedScreen.fromPartial(object.showLrfResultSimplifiedScreen)
        : undefined;
    return message;
  },
};

function createBaseShowDefaultScreen(): ShowDefaultScreen {
  return {};
}

export const ShowDefaultScreen = {
  encode(_: ShowDefaultScreen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShowDefaultScreen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShowDefaultScreen();
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

  fromJSON(_: any): ShowDefaultScreen {
    return {};
  },

  toJSON(_: ShowDefaultScreen): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ShowDefaultScreen>, I>>(base?: I): ShowDefaultScreen {
    return ShowDefaultScreen.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ShowDefaultScreen>, I>>(_: I): ShowDefaultScreen {
    const message = createBaseShowDefaultScreen();
    return message;
  },
};

function createBaseShowLRFMeasureScreen(): ShowLRFMeasureScreen {
  return {};
}

export const ShowLRFMeasureScreen = {
  encode(_: ShowLRFMeasureScreen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShowLRFMeasureScreen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShowLRFMeasureScreen();
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

  fromJSON(_: any): ShowLRFMeasureScreen {
    return {};
  },

  toJSON(_: ShowLRFMeasureScreen): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ShowLRFMeasureScreen>, I>>(base?: I): ShowLRFMeasureScreen {
    return ShowLRFMeasureScreen.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ShowLRFMeasureScreen>, I>>(_: I): ShowLRFMeasureScreen {
    const message = createBaseShowLRFMeasureScreen();
    return message;
  },
};

function createBaseShowLRFResultScreen(): ShowLRFResultScreen {
  return {};
}

export const ShowLRFResultScreen = {
  encode(_: ShowLRFResultScreen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShowLRFResultScreen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShowLRFResultScreen();
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

  fromJSON(_: any): ShowLRFResultScreen {
    return {};
  },

  toJSON(_: ShowLRFResultScreen): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ShowLRFResultScreen>, I>>(base?: I): ShowLRFResultScreen {
    return ShowLRFResultScreen.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ShowLRFResultScreen>, I>>(_: I): ShowLRFResultScreen {
    const message = createBaseShowLRFResultScreen();
    return message;
  },
};

function createBaseShowLRFResultSimplifiedScreen(): ShowLRFResultSimplifiedScreen {
  return {};
}

export const ShowLRFResultSimplifiedScreen = {
  encode(_: ShowLRFResultSimplifiedScreen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShowLRFResultSimplifiedScreen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShowLRFResultSimplifiedScreen();
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

  fromJSON(_: any): ShowLRFResultSimplifiedScreen {
    return {};
  },

  toJSON(_: ShowLRFResultSimplifiedScreen): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ShowLRFResultSimplifiedScreen>, I>>(base?: I): ShowLRFResultSimplifiedScreen {
    return ShowLRFResultSimplifiedScreen.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ShowLRFResultSimplifiedScreen>, I>>(_: I): ShowLRFResultSimplifiedScreen {
    const message = createBaseShowLRFResultSimplifiedScreen();
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
