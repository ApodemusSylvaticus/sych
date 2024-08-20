// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.2
// source: jon_shared_cmd_lrf.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import {
  JonGuiDataLrfScanModes,
  jonGuiDataLrfScanModesFromJSON,
  jonGuiDataLrfScanModesToJSON,
} from "./jon_shared_data_types";

export interface Root {
  measure?: Measure | undefined;
  scanOn?: ScanOn | undefined;
  scanOff?: ScanOff | undefined;
  start?: Start | undefined;
  stop?: Stop | undefined;
  targetDesignatorOff?: TargetDesignatorOff | undefined;
  targetDesignatorOnModeA?: TargetDesignatorOnModeA | undefined;
  targetDesignatorOnModeB?: TargetDesignatorOnModeB | undefined;
  enableFogMode?: EnableFogMode | undefined;
  disableFogMode?: DisableFogMode | undefined;
  setScanMode?: setScanMode | undefined;
  newSession?: NewSession | undefined;
  getMeteo?: GetMeteo | undefined;
}

export interface Start {
}

export interface Stop {
}

export interface Measure {
}

export interface ScanOn {
}

export interface ScanOff {
}

export interface TargetDesignatorOff {
}

export interface TargetDesignatorOnModeA {
}

export interface TargetDesignatorOnModeB {
}

export interface EnableFogMode {
}

export interface DisableFogMode {
}

export interface GetMeteo {
}

export interface setScanMode {
  mode: JonGuiDataLrfScanModes;
}

export interface NewSession {
}

function createBaseRoot(): Root {
  return {
    measure: undefined,
    scanOn: undefined,
    scanOff: undefined,
    start: undefined,
    stop: undefined,
    targetDesignatorOff: undefined,
    targetDesignatorOnModeA: undefined,
    targetDesignatorOnModeB: undefined,
    enableFogMode: undefined,
    disableFogMode: undefined,
    setScanMode: undefined,
    newSession: undefined,
    getMeteo: undefined,
  };
}

export const Root = {
  encode(message: Root, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.measure !== undefined) {
      Measure.encode(message.measure, writer.uint32(10).fork()).ldelim();
    }
    if (message.scanOn !== undefined) {
      ScanOn.encode(message.scanOn, writer.uint32(18).fork()).ldelim();
    }
    if (message.scanOff !== undefined) {
      ScanOff.encode(message.scanOff, writer.uint32(26).fork()).ldelim();
    }
    if (message.start !== undefined) {
      Start.encode(message.start, writer.uint32(34).fork()).ldelim();
    }
    if (message.stop !== undefined) {
      Stop.encode(message.stop, writer.uint32(42).fork()).ldelim();
    }
    if (message.targetDesignatorOff !== undefined) {
      TargetDesignatorOff.encode(message.targetDesignatorOff, writer.uint32(50).fork()).ldelim();
    }
    if (message.targetDesignatorOnModeA !== undefined) {
      TargetDesignatorOnModeA.encode(message.targetDesignatorOnModeA, writer.uint32(58).fork()).ldelim();
    }
    if (message.targetDesignatorOnModeB !== undefined) {
      TargetDesignatorOnModeB.encode(message.targetDesignatorOnModeB, writer.uint32(66).fork()).ldelim();
    }
    if (message.enableFogMode !== undefined) {
      EnableFogMode.encode(message.enableFogMode, writer.uint32(74).fork()).ldelim();
    }
    if (message.disableFogMode !== undefined) {
      DisableFogMode.encode(message.disableFogMode, writer.uint32(82).fork()).ldelim();
    }
    if (message.setScanMode !== undefined) {
      setScanMode.encode(message.setScanMode, writer.uint32(90).fork()).ldelim();
    }
    if (message.newSession !== undefined) {
      NewSession.encode(message.newSession, writer.uint32(98).fork()).ldelim();
    }
    if (message.getMeteo !== undefined) {
      GetMeteo.encode(message.getMeteo, writer.uint32(106).fork()).ldelim();
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

          message.measure = Measure.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.scanOn = ScanOn.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.scanOff = ScanOff.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.start = Start.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.stop = Stop.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.targetDesignatorOff = TargetDesignatorOff.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.targetDesignatorOnModeA = TargetDesignatorOnModeA.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.targetDesignatorOnModeB = TargetDesignatorOnModeB.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.enableFogMode = EnableFogMode.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.disableFogMode = DisableFogMode.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.setScanMode = setScanMode.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.newSession = NewSession.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.getMeteo = GetMeteo.decode(reader, reader.uint32());
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
      measure: isSet(object.measure) ? Measure.fromJSON(object.measure) : undefined,
      scanOn: isSet(object.scanOn) ? ScanOn.fromJSON(object.scanOn) : undefined,
      scanOff: isSet(object.scanOff) ? ScanOff.fromJSON(object.scanOff) : undefined,
      start: isSet(object.start) ? Start.fromJSON(object.start) : undefined,
      stop: isSet(object.stop) ? Stop.fromJSON(object.stop) : undefined,
      targetDesignatorOff: isSet(object.targetDesignatorOff)
        ? TargetDesignatorOff.fromJSON(object.targetDesignatorOff)
        : undefined,
      targetDesignatorOnModeA: isSet(object.targetDesignatorOnModeA)
        ? TargetDesignatorOnModeA.fromJSON(object.targetDesignatorOnModeA)
        : undefined,
      targetDesignatorOnModeB: isSet(object.targetDesignatorOnModeB)
        ? TargetDesignatorOnModeB.fromJSON(object.targetDesignatorOnModeB)
        : undefined,
      enableFogMode: isSet(object.enableFogMode) ? EnableFogMode.fromJSON(object.enableFogMode) : undefined,
      disableFogMode: isSet(object.disableFogMode) ? DisableFogMode.fromJSON(object.disableFogMode) : undefined,
      setScanMode: isSet(object.setScanMode) ? setScanMode.fromJSON(object.setScanMode) : undefined,
      newSession: isSet(object.newSession) ? NewSession.fromJSON(object.newSession) : undefined,
      getMeteo: isSet(object.getMeteo) ? GetMeteo.fromJSON(object.getMeteo) : undefined,
    };
  },

  toJSON(message: Root): unknown {
    const obj: any = {};
    if (message.measure !== undefined) {
      obj.measure = Measure.toJSON(message.measure);
    }
    if (message.scanOn !== undefined) {
      obj.scanOn = ScanOn.toJSON(message.scanOn);
    }
    if (message.scanOff !== undefined) {
      obj.scanOff = ScanOff.toJSON(message.scanOff);
    }
    if (message.start !== undefined) {
      obj.start = Start.toJSON(message.start);
    }
    if (message.stop !== undefined) {
      obj.stop = Stop.toJSON(message.stop);
    }
    if (message.targetDesignatorOff !== undefined) {
      obj.targetDesignatorOff = TargetDesignatorOff.toJSON(message.targetDesignatorOff);
    }
    if (message.targetDesignatorOnModeA !== undefined) {
      obj.targetDesignatorOnModeA = TargetDesignatorOnModeA.toJSON(message.targetDesignatorOnModeA);
    }
    if (message.targetDesignatorOnModeB !== undefined) {
      obj.targetDesignatorOnModeB = TargetDesignatorOnModeB.toJSON(message.targetDesignatorOnModeB);
    }
    if (message.enableFogMode !== undefined) {
      obj.enableFogMode = EnableFogMode.toJSON(message.enableFogMode);
    }
    if (message.disableFogMode !== undefined) {
      obj.disableFogMode = DisableFogMode.toJSON(message.disableFogMode);
    }
    if (message.setScanMode !== undefined) {
      obj.setScanMode = setScanMode.toJSON(message.setScanMode);
    }
    if (message.newSession !== undefined) {
      obj.newSession = NewSession.toJSON(message.newSession);
    }
    if (message.getMeteo !== undefined) {
      obj.getMeteo = GetMeteo.toJSON(message.getMeteo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Root>, I>>(base?: I): Root {
    return Root.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Root>, I>>(object: I): Root {
    const message = createBaseRoot();
    message.measure = (object.measure !== undefined && object.measure !== null)
      ? Measure.fromPartial(object.measure)
      : undefined;
    message.scanOn = (object.scanOn !== undefined && object.scanOn !== null)
      ? ScanOn.fromPartial(object.scanOn)
      : undefined;
    message.scanOff = (object.scanOff !== undefined && object.scanOff !== null)
      ? ScanOff.fromPartial(object.scanOff)
      : undefined;
    message.start = (object.start !== undefined && object.start !== null) ? Start.fromPartial(object.start) : undefined;
    message.stop = (object.stop !== undefined && object.stop !== null) ? Stop.fromPartial(object.stop) : undefined;
    message.targetDesignatorOff = (object.targetDesignatorOff !== undefined && object.targetDesignatorOff !== null)
      ? TargetDesignatorOff.fromPartial(object.targetDesignatorOff)
      : undefined;
    message.targetDesignatorOnModeA =
      (object.targetDesignatorOnModeA !== undefined && object.targetDesignatorOnModeA !== null)
        ? TargetDesignatorOnModeA.fromPartial(object.targetDesignatorOnModeA)
        : undefined;
    message.targetDesignatorOnModeB =
      (object.targetDesignatorOnModeB !== undefined && object.targetDesignatorOnModeB !== null)
        ? TargetDesignatorOnModeB.fromPartial(object.targetDesignatorOnModeB)
        : undefined;
    message.enableFogMode = (object.enableFogMode !== undefined && object.enableFogMode !== null)
      ? EnableFogMode.fromPartial(object.enableFogMode)
      : undefined;
    message.disableFogMode = (object.disableFogMode !== undefined && object.disableFogMode !== null)
      ? DisableFogMode.fromPartial(object.disableFogMode)
      : undefined;
    message.setScanMode = (object.setScanMode !== undefined && object.setScanMode !== null)
      ? setScanMode.fromPartial(object.setScanMode)
      : undefined;
    message.newSession = (object.newSession !== undefined && object.newSession !== null)
      ? NewSession.fromPartial(object.newSession)
      : undefined;
    message.getMeteo = (object.getMeteo !== undefined && object.getMeteo !== null)
      ? GetMeteo.fromPartial(object.getMeteo)
      : undefined;
    return message;
  },
};

function createBaseStart(): Start {
  return {};
}

export const Start = {
  encode(_: Start, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Start {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStart();
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

  fromJSON(_: any): Start {
    return {};
  },

  toJSON(_: Start): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Start>, I>>(base?: I): Start {
    return Start.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Start>, I>>(_: I): Start {
    const message = createBaseStart();
    return message;
  },
};

function createBaseStop(): Stop {
  return {};
}

export const Stop = {
  encode(_: Stop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stop {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStop();
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

  fromJSON(_: any): Stop {
    return {};
  },

  toJSON(_: Stop): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Stop>, I>>(base?: I): Stop {
    return Stop.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Stop>, I>>(_: I): Stop {
    const message = createBaseStop();
    return message;
  },
};

function createBaseMeasure(): Measure {
  return {};
}

export const Measure = {
  encode(_: Measure, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Measure {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMeasure();
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

  fromJSON(_: any): Measure {
    return {};
  },

  toJSON(_: Measure): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Measure>, I>>(base?: I): Measure {
    return Measure.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Measure>, I>>(_: I): Measure {
    const message = createBaseMeasure();
    return message;
  },
};

function createBaseScanOn(): ScanOn {
  return {};
}

export const ScanOn = {
  encode(_: ScanOn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScanOn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScanOn();
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

  fromJSON(_: any): ScanOn {
    return {};
  },

  toJSON(_: ScanOn): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ScanOn>, I>>(base?: I): ScanOn {
    return ScanOn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScanOn>, I>>(_: I): ScanOn {
    const message = createBaseScanOn();
    return message;
  },
};

function createBaseScanOff(): ScanOff {
  return {};
}

export const ScanOff = {
  encode(_: ScanOff, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScanOff {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScanOff();
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

  fromJSON(_: any): ScanOff {
    return {};
  },

  toJSON(_: ScanOff): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ScanOff>, I>>(base?: I): ScanOff {
    return ScanOff.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScanOff>, I>>(_: I): ScanOff {
    const message = createBaseScanOff();
    return message;
  },
};

function createBaseTargetDesignatorOff(): TargetDesignatorOff {
  return {};
}

export const TargetDesignatorOff = {
  encode(_: TargetDesignatorOff, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TargetDesignatorOff {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTargetDesignatorOff();
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

  fromJSON(_: any): TargetDesignatorOff {
    return {};
  },

  toJSON(_: TargetDesignatorOff): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<TargetDesignatorOff>, I>>(base?: I): TargetDesignatorOff {
    return TargetDesignatorOff.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TargetDesignatorOff>, I>>(_: I): TargetDesignatorOff {
    const message = createBaseTargetDesignatorOff();
    return message;
  },
};

function createBaseTargetDesignatorOnModeA(): TargetDesignatorOnModeA {
  return {};
}

export const TargetDesignatorOnModeA = {
  encode(_: TargetDesignatorOnModeA, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TargetDesignatorOnModeA {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTargetDesignatorOnModeA();
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

  fromJSON(_: any): TargetDesignatorOnModeA {
    return {};
  },

  toJSON(_: TargetDesignatorOnModeA): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<TargetDesignatorOnModeA>, I>>(base?: I): TargetDesignatorOnModeA {
    return TargetDesignatorOnModeA.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TargetDesignatorOnModeA>, I>>(_: I): TargetDesignatorOnModeA {
    const message = createBaseTargetDesignatorOnModeA();
    return message;
  },
};

function createBaseTargetDesignatorOnModeB(): TargetDesignatorOnModeB {
  return {};
}

export const TargetDesignatorOnModeB = {
  encode(_: TargetDesignatorOnModeB, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TargetDesignatorOnModeB {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTargetDesignatorOnModeB();
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

  fromJSON(_: any): TargetDesignatorOnModeB {
    return {};
  },

  toJSON(_: TargetDesignatorOnModeB): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<TargetDesignatorOnModeB>, I>>(base?: I): TargetDesignatorOnModeB {
    return TargetDesignatorOnModeB.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TargetDesignatorOnModeB>, I>>(_: I): TargetDesignatorOnModeB {
    const message = createBaseTargetDesignatorOnModeB();
    return message;
  },
};

function createBaseEnableFogMode(): EnableFogMode {
  return {};
}

export const EnableFogMode = {
  encode(_: EnableFogMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnableFogMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnableFogMode();
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

  fromJSON(_: any): EnableFogMode {
    return {};
  },

  toJSON(_: EnableFogMode): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<EnableFogMode>, I>>(base?: I): EnableFogMode {
    return EnableFogMode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EnableFogMode>, I>>(_: I): EnableFogMode {
    const message = createBaseEnableFogMode();
    return message;
  },
};

function createBaseDisableFogMode(): DisableFogMode {
  return {};
}

export const DisableFogMode = {
  encode(_: DisableFogMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisableFogMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisableFogMode();
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

  fromJSON(_: any): DisableFogMode {
    return {};
  },

  toJSON(_: DisableFogMode): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DisableFogMode>, I>>(base?: I): DisableFogMode {
    return DisableFogMode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisableFogMode>, I>>(_: I): DisableFogMode {
    const message = createBaseDisableFogMode();
    return message;
  },
};

function createBaseGetMeteo(): GetMeteo {
  return {};
}

export const GetMeteo = {
  encode(_: GetMeteo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMeteo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMeteo();
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

  fromJSON(_: any): GetMeteo {
    return {};
  },

  toJSON(_: GetMeteo): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMeteo>, I>>(base?: I): GetMeteo {
    return GetMeteo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMeteo>, I>>(_: I): GetMeteo {
    const message = createBaseGetMeteo();
    return message;
  },
};

function createBasesetScanMode(): setScanMode {
  return { mode: 0 };
}

export const setScanMode = {
  encode(message: setScanMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): setScanMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasesetScanMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): setScanMode {
    return { mode: isSet(object.mode) ? jonGuiDataLrfScanModesFromJSON(object.mode) : 0 };
  },

  toJSON(message: setScanMode): unknown {
    const obj: any = {};
    if (message.mode !== 0) {
      obj.mode = jonGuiDataLrfScanModesToJSON(message.mode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<setScanMode>, I>>(base?: I): setScanMode {
    return setScanMode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<setScanMode>, I>>(object: I): setScanMode {
    const message = createBasesetScanMode();
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseNewSession(): NewSession {
  return {};
}

export const NewSession = {
  encode(_: NewSession, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewSession {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewSession();
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

  fromJSON(_: any): NewSession {
    return {};
  },

  toJSON(_: NewSession): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NewSession>, I>>(base?: I): NewSession {
    return NewSession.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NewSession>, I>>(_: I): NewSession {
    const message = createBaseNewSession();
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
