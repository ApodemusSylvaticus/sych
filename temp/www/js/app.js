"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i8 = decorators.length - 1, decorator; i8 >= 0; i8--)
      if (decorator = decorators[i8])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // frontend/node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "frontend/node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }
  });

  // frontend/node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "frontend/node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      var base64 = exports2;
      base64.length = function length(string) {
        var p4 = string.length;
        if (!p4)
          return 0;
        var n7 = 0;
        while (--p4 % 4 > 1 && string.charAt(p4) === "=")
          ++n7;
        return Math.ceil(string.length * 3) / 4 - n7;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i8 = 0; i8 < 64; )
        s64[b64[i8] = i8 < 26 ? i8 + 65 : i8 < 52 ? i8 + 71 : i8 < 62 ? i8 - 4 : i8 - 59 | 43] = i8++;
      var i8;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i9 = 0, j2 = 0, t8;
        while (start < end) {
          var b4 = buffer[start++];
          switch (j2) {
            case 0:
              chunk[i9++] = b64[b4 >> 2];
              t8 = (b4 & 3) << 4;
              j2 = 1;
              break;
            case 1:
              chunk[i9++] = b64[t8 | b4 >> 4];
              t8 = (b4 & 15) << 2;
              j2 = 2;
              break;
            case 2:
              chunk[i9++] = b64[t8 | b4 >> 6];
              chunk[i9++] = b64[b4 & 63];
              j2 = 0;
              break;
          }
          if (i9 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i9 = 0;
          }
        }
        if (j2) {
          chunk[i9++] = b64[t8];
          chunk[i9++] = 61;
          if (j2 === 1)
            chunk[i9++] = 61;
        }
        if (parts) {
          if (i9)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i9)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i9));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j2 = 0, t8;
        for (var i9 = 0; i9 < string.length; ) {
          var c7 = string.charCodeAt(i9++);
          if (c7 === 61 && j2 > 1)
            break;
          if ((c7 = s64[c7]) === void 0)
            throw Error(invalidEncoding);
          switch (j2) {
            case 0:
              t8 = c7;
              j2 = 1;
              break;
            case 1:
              buffer[offset++] = t8 << 2 | (c7 & 48) >> 4;
              t8 = c7;
              j2 = 2;
              break;
            case 2:
              buffer[offset++] = (t8 & 15) << 4 | (c7 & 60) >> 2;
              t8 = c7;
              j2 = 3;
              break;
            case 3:
              buffer[offset++] = (t8 & 3) << 6 | c7;
              j2 = 0;
              break;
          }
        }
        if (j2 === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }
  });

  // frontend/node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "frontend/node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i8 = 0; i8 < listeners.length; )
              if (listeners[i8].fn === fn)
                listeners.splice(i8, 1);
              else
                ++i8;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i8 = 1;
          for (; i8 < arguments.length; )
            args.push(arguments[i8++]);
          for (i8 = 0; i8 < listeners.length; )
            listeners[i8].fn.apply(listeners[i8++].ctx, args);
        }
        return this;
      };
    }
  });

  // frontend/node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "frontend/node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined") (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
        else (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
        if (typeof Float64Array !== "undefined") (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
        else (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports3;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // frontend/node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "frontend/node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e9) {
        }
        return null;
      }
    }
  });

  // frontend/node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "frontend/node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      var utf8 = exports2;
      utf8.length = function utf8_length(string) {
        var len = 0, c7 = 0;
        for (var i8 = 0; i8 < string.length; ++i8) {
          c7 = string.charCodeAt(i8);
          if (c7 < 128)
            len += 1;
          else if (c7 < 2048)
            len += 2;
          else if ((c7 & 64512) === 55296 && (string.charCodeAt(i8 + 1) & 64512) === 56320) {
            ++i8;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i8 = 0, t8;
        while (start < end) {
          t8 = buffer[start++];
          if (t8 < 128)
            chunk[i8++] = t8;
          else if (t8 > 191 && t8 < 224)
            chunk[i8++] = (t8 & 31) << 6 | buffer[start++] & 63;
          else if (t8 > 239 && t8 < 365) {
            t8 = ((t8 & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i8++] = 55296 + (t8 >> 10);
            chunk[i8++] = 56320 + (t8 & 1023);
          } else
            chunk[i8++] = (t8 & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i8 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i8 = 0;
          }
        }
        if (parts) {
          if (i8)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i8)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i8));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c22;
        for (var i8 = 0; i8 < string.length; ++i8) {
          c1 = string.charCodeAt(i8);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c22 = string.charCodeAt(i8 + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c22 & 1023);
            ++i8;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // frontend/node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "frontend/node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // frontend/node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "frontend/node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber2(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber2(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }
  });

  // frontend/node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "frontend/node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (
        /* istanbul ignore next */
        []
      );
      util.emptyObject = Object.freeze ? Object.freeze({}) : (
        /* istanbul ignore next */
        {}
      );
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet27(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e9) {
          return null;
        }
      }();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = /* istanbul ignore next */
      util.global.dcodeIO && /* istanbul ignore next */
      util.global.dcodeIO.Long || /* istanbul ignore next */
      util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      function merge3(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i8 = 0; i8 < keys.length; ++i8)
          if (dst[keys[i8]] === void 0 || !ifNotSet)
            dst[keys[i8]] = src[keys[i8]];
        return dst;
      }
      util.merge = merge3;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge3(this, properties);
        }
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: function get() {
              return name;
            },
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: function value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i8 = 0; i8 < fieldNames.length; ++i8)
          fieldMap[fieldNames[i8]] = 1;
        return function() {
          for (var keys = Object.keys(this), i9 = keys.length - 1; i9 > -1; --i9)
            if (fieldMap[keys[i9]] === 1 && this[keys[i9]] !== void 0 && this[keys[i9]] !== null)
              return keys[i9];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i8 = 0; i8 < fieldNames.length; ++i8)
            if (fieldNames[i8] !== name)
              delete this[fieldNames[i8]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
        function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        };
      };
    }
  });

  // frontend/node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "frontend/node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop2() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop2, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create2 = function create3() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create2();
      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp(
          (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
          value
        )).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytes_for(val, buf, pos) {
        for (var i8 = 0; i8 < val.length; ++i8)
          buf[pos + i8] = val[i8];
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop2, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop2, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail2 = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail2;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create2();
        BufferWriter._configure();
      };
    }
  });

  // frontend/node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "frontend/node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        } : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else for (var i8 = 0; i8 < val.length; )
            buf[pos++] = val[i8++];
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    }
  });

  // frontend/node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "frontend/node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      } : function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      };
      var create2 = function create3() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create2();
      Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
      util.Array.prototype.slice;
      Reader.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      }();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i8 = 0;
        if (this.len - this.pos > 4) {
          for (; i8 < 4; ++i8) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i8 * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i8 = 0;
        } else {
          for (; i8 < 3; ++i8) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i8 * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i8 * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i8 < 5; ++i8) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i8 * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i8 < 5; ++i8) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i8 * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create2();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // frontend/node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "frontend/node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      BufferReader._configure();
    }
  });

  // frontend/node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "frontend/node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(
                  /* endedByRPC */
                  true
                );
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // frontend/node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "frontend/node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // frontend/node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "frontend/node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    }
  });

  // frontend/node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "frontend/node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure2;
      function configure2() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure2();
    }
  });

  // frontend/node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "frontend/node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      module2.exports = require_index_minimal();
    }
  });

  // frontend/js/webSocketConnectionManager.js
  var WebSocketConnectionManager = class {
    /**
     * Constructs the WebSocketConnectionManager.
     */
    constructor() {
    }
    /**
     * Starts a Shared Worker for WebSocket communication.
     *
     * @param {string} endpoint The WebSocket endpoint URL.
     * @param {string} channelNameToWS The name of the BroadcastChannel
     * for sending data to the WebSocket.
     * @param {string} channelNameFromWS The name of the BroadcastChannel
     * for receiving data from the WebSocket.
     */
    startWebSocketWorker(endpoint, channelNameToWS, channelNameFromWS) {
      const worker = new SharedWorker(`/js/webSocketManagerWorker.js?endpoint=${endpoint}`, { type: "module" });
      worker.port.postMessage({
        endpoint,
        channelNameToWS,
        channelNameFromWS
      });
      worker.port.onmessage = (event) => {
        const logPrefix = `Worker [${endpoint}]: `;
        if (event.data.type === "error") {
          console.error(`${logPrefix}Error`, event.data.error);
        } else if (event.data.type === "info") {
          console.log(`${logPrefix}Info`, event.data.message);
        }
      };
      worker.port.start();
    }
  };

  // frontend/ts/proto/jon/jon_shared_cmd_gps.ts
  var import_minimal = __toESM(require_minimal2());
  function createBaseRoot() {
    return {
      start: void 0,
      stop: void 0,
      setRefreshRate: void 0,
      setManualPosition: void 0,
      setUseManualPosition: void 0,
      getMeteo: void 0
    };
  }
  var Root = {
    encode(message, writer = import_minimal.default.Writer.create()) {
      if (message.start !== void 0) {
        Start.encode(message.start, writer.uint32(10).fork()).ldelim();
      }
      if (message.stop !== void 0) {
        Stop.encode(message.stop, writer.uint32(18).fork()).ldelim();
      }
      if (message.setRefreshRate !== void 0) {
        SetRefreshRate.encode(message.setRefreshRate, writer.uint32(26).fork()).ldelim();
      }
      if (message.setManualPosition !== void 0) {
        SetManualPosition.encode(message.setManualPosition, writer.uint32(34).fork()).ldelim();
      }
      if (message.setUseManualPosition !== void 0) {
        SetUseManualPosition.encode(message.setUseManualPosition, writer.uint32(42).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo.encode(message.getMeteo, writer.uint32(50).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.start = Start.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.stop = Stop.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.setRefreshRate = SetRefreshRate.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setManualPosition = SetManualPosition.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.setUseManualPosition = SetUseManualPosition.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
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
    fromJSON(object) {
      return {
        start: isSet(object.start) ? Start.fromJSON(object.start) : void 0,
        stop: isSet(object.stop) ? Stop.fromJSON(object.stop) : void 0,
        setRefreshRate: isSet(object.setRefreshRate) ? SetRefreshRate.fromJSON(object.setRefreshRate) : void 0,
        setManualPosition: isSet(object.setManualPosition) ? SetManualPosition.fromJSON(object.setManualPosition) : void 0,
        setUseManualPosition: isSet(object.setUseManualPosition) ? SetUseManualPosition.fromJSON(object.setUseManualPosition) : void 0,
        getMeteo: isSet(object.getMeteo) ? GetMeteo.fromJSON(object.getMeteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.start !== void 0) {
        obj.start = Start.toJSON(message.start);
      }
      if (message.stop !== void 0) {
        obj.stop = Stop.toJSON(message.stop);
      }
      if (message.setRefreshRate !== void 0) {
        obj.setRefreshRate = SetRefreshRate.toJSON(message.setRefreshRate);
      }
      if (message.setManualPosition !== void 0) {
        obj.setManualPosition = SetManualPosition.toJSON(message.setManualPosition);
      }
      if (message.setUseManualPosition !== void 0) {
        obj.setUseManualPosition = SetUseManualPosition.toJSON(message.setUseManualPosition);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo.toJSON(message.getMeteo);
      }
      return obj;
    },
    create(base) {
      return Root.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot();
      message.start = object.start !== void 0 && object.start !== null ? Start.fromPartial(object.start) : void 0;
      message.stop = object.stop !== void 0 && object.stop !== null ? Stop.fromPartial(object.stop) : void 0;
      message.setRefreshRate = object.setRefreshRate !== void 0 && object.setRefreshRate !== null ? SetRefreshRate.fromPartial(object.setRefreshRate) : void 0;
      message.setManualPosition = object.setManualPosition !== void 0 && object.setManualPosition !== null ? SetManualPosition.fromPartial(object.setManualPosition) : void 0;
      message.setUseManualPosition = object.setUseManualPosition !== void 0 && object.setUseManualPosition !== null ? SetUseManualPosition.fromPartial(object.setUseManualPosition) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo.fromPartial(object.getMeteo) : void 0;
      return message;
    }
  };
  function createBaseStart() {
    return {};
  }
  var Start = {
    encode(_5, writer = import_minimal.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStart();
      return message;
    }
  };
  function createBaseStop() {
    return {};
  }
  var Stop = {
    encode(_5, writer = import_minimal.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStop();
      return message;
    }
  };
  function createBaseGetMeteo() {
    return {};
  }
  var GetMeteo = {
    encode(_5, writer = import_minimal.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo();
      return message;
    }
  };
  function createBaseSetRefreshRate() {
    return { value: 0 };
  }
  var SetRefreshRate = {
    encode(message, writer = import_minimal.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).uint32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetRefreshRate();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.uint32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = Math.round(message.value);
      }
      return obj;
    },
    create(base) {
      return SetRefreshRate.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetRefreshRate();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetUseManualPosition() {
    return { flag: false };
  }
  var SetUseManualPosition = {
    encode(message, writer = import_minimal.default.Writer.create()) {
      if (message.flag !== false) {
        writer.uint32(8).bool(message.flag);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetUseManualPosition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.flag = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { flag: isSet(object.flag) ? globalThis.Boolean(object.flag) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.flag !== false) {
        obj.flag = message.flag;
      }
      return obj;
    },
    create(base) {
      return SetUseManualPosition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetUseManualPosition();
      message.flag = object.flag ?? false;
      return message;
    }
  };
  function createBaseSetManualPosition() {
    return { latitude: 0, longitude: 0, altitude: 0 };
  }
  var SetManualPosition = {
    encode(message, writer = import_minimal.default.Writer.create()) {
      if (message.latitude !== 0) {
        writer.uint32(13).float(message.latitude);
      }
      if (message.longitude !== 0) {
        writer.uint32(21).float(message.longitude);
      }
      if (message.altitude !== 0) {
        writer.uint32(29).float(message.altitude);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetManualPosition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.latitude = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.longitude = reader.float();
            continue;
          case 3:
            if (tag !== 29) {
              break;
            }
            message.altitude = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        latitude: isSet(object.latitude) ? globalThis.Number(object.latitude) : 0,
        longitude: isSet(object.longitude) ? globalThis.Number(object.longitude) : 0,
        altitude: isSet(object.altitude) ? globalThis.Number(object.altitude) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.latitude !== 0) {
        obj.latitude = message.latitude;
      }
      if (message.longitude !== 0) {
        obj.longitude = message.longitude;
      }
      if (message.altitude !== 0) {
        obj.altitude = message.altitude;
      }
      return obj;
    },
    create(base) {
      return SetManualPosition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetManualPosition();
      message.latitude = object.latitude ?? 0;
      message.longitude = object.longitude ?? 0;
      message.altitude = object.altitude ?? 0;
      return message;
    }
  };
  function isSet(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.OSD.ts
  var index_cmd_OSD_exports = {};
  __export(index_cmd_OSD_exports, {
    Root: () => Root2,
    ShowDefaultScreen: () => ShowDefaultScreen,
    ShowLRFMeasureScreen: () => ShowLRFMeasureScreen,
    ShowLRFResultScreen: () => ShowLRFResultScreen,
    ShowLRFResultSimplifiedScreen: () => ShowLRFResultSimplifiedScreen
  });

  // frontend/ts/proto/jon/jon_shared_cmd_osd.ts
  var import_minimal2 = __toESM(require_minimal2());
  function createBaseRoot2() {
    return {
      showDefaultScreen: void 0,
      showLrfMeasureScreen: void 0,
      showLrfResultScreen: void 0,
      showLrfResultSimplifiedScreen: void 0
    };
  }
  var Root2 = {
    encode(message, writer = import_minimal2.default.Writer.create()) {
      if (message.showDefaultScreen !== void 0) {
        ShowDefaultScreen.encode(message.showDefaultScreen, writer.uint32(10).fork()).ldelim();
      }
      if (message.showLrfMeasureScreen !== void 0) {
        ShowLRFMeasureScreen.encode(message.showLrfMeasureScreen, writer.uint32(18).fork()).ldelim();
      }
      if (message.showLrfResultScreen !== void 0) {
        ShowLRFResultScreen.encode(message.showLrfResultScreen, writer.uint32(26).fork()).ldelim();
      }
      if (message.showLrfResultSimplifiedScreen !== void 0) {
        ShowLRFResultSimplifiedScreen.encode(message.showLrfResultSimplifiedScreen, writer.uint32(34).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal2.default.Reader ? input : import_minimal2.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot2();
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
    fromJSON(object) {
      return {
        showDefaultScreen: isSet2(object.showDefaultScreen) ? ShowDefaultScreen.fromJSON(object.showDefaultScreen) : void 0,
        showLrfMeasureScreen: isSet2(object.showLrfMeasureScreen) ? ShowLRFMeasureScreen.fromJSON(object.showLrfMeasureScreen) : void 0,
        showLrfResultScreen: isSet2(object.showLrfResultScreen) ? ShowLRFResultScreen.fromJSON(object.showLrfResultScreen) : void 0,
        showLrfResultSimplifiedScreen: isSet2(object.showLrfResultSimplifiedScreen) ? ShowLRFResultSimplifiedScreen.fromJSON(object.showLrfResultSimplifiedScreen) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.showDefaultScreen !== void 0) {
        obj.showDefaultScreen = ShowDefaultScreen.toJSON(message.showDefaultScreen);
      }
      if (message.showLrfMeasureScreen !== void 0) {
        obj.showLrfMeasureScreen = ShowLRFMeasureScreen.toJSON(message.showLrfMeasureScreen);
      }
      if (message.showLrfResultScreen !== void 0) {
        obj.showLrfResultScreen = ShowLRFResultScreen.toJSON(message.showLrfResultScreen);
      }
      if (message.showLrfResultSimplifiedScreen !== void 0) {
        obj.showLrfResultSimplifiedScreen = ShowLRFResultSimplifiedScreen.toJSON(message.showLrfResultSimplifiedScreen);
      }
      return obj;
    },
    create(base) {
      return Root2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot2();
      message.showDefaultScreen = object.showDefaultScreen !== void 0 && object.showDefaultScreen !== null ? ShowDefaultScreen.fromPartial(object.showDefaultScreen) : void 0;
      message.showLrfMeasureScreen = object.showLrfMeasureScreen !== void 0 && object.showLrfMeasureScreen !== null ? ShowLRFMeasureScreen.fromPartial(object.showLrfMeasureScreen) : void 0;
      message.showLrfResultScreen = object.showLrfResultScreen !== void 0 && object.showLrfResultScreen !== null ? ShowLRFResultScreen.fromPartial(object.showLrfResultScreen) : void 0;
      message.showLrfResultSimplifiedScreen = object.showLrfResultSimplifiedScreen !== void 0 && object.showLrfResultSimplifiedScreen !== null ? ShowLRFResultSimplifiedScreen.fromPartial(object.showLrfResultSimplifiedScreen) : void 0;
      return message;
    }
  };
  function createBaseShowDefaultScreen() {
    return {};
  }
  var ShowDefaultScreen = {
    encode(_5, writer = import_minimal2.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal2.default.Reader ? input : import_minimal2.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowDefaultScreen.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseShowDefaultScreen();
      return message;
    }
  };
  function createBaseShowLRFMeasureScreen() {
    return {};
  }
  var ShowLRFMeasureScreen = {
    encode(_5, writer = import_minimal2.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal2.default.Reader ? input : import_minimal2.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowLRFMeasureScreen.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseShowLRFMeasureScreen();
      return message;
    }
  };
  function createBaseShowLRFResultScreen() {
    return {};
  }
  var ShowLRFResultScreen = {
    encode(_5, writer = import_minimal2.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal2.default.Reader ? input : import_minimal2.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowLRFResultScreen.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseShowLRFResultScreen();
      return message;
    }
  };
  function createBaseShowLRFResultSimplifiedScreen() {
    return {};
  }
  var ShowLRFResultSimplifiedScreen = {
    encode(_5, writer = import_minimal2.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal2.default.Reader ? input : import_minimal2.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowLRFResultSimplifiedScreen.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseShowLRFResultSimplifiedScreen();
      return message;
    }
  };
  function isSet2(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_geo_test.ts
  var import_minimal3 = __toESM(require_minimal2());
  function createBaseRoot3() {
    return { longitude: 0, latitude: 0, altitude: 0, range: 0, azimuth: 0, elevation: 0, bank: 0 };
  }
  var Root3 = {
    encode(message, writer = import_minimal3.default.Writer.create()) {
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
    decode(input, length) {
      const reader = input instanceof import_minimal3.default.Reader ? input : import_minimal3.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot3();
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
    fromJSON(object) {
      return {
        longitude: isSet3(object.longitude) ? globalThis.Number(object.longitude) : 0,
        latitude: isSet3(object.latitude) ? globalThis.Number(object.latitude) : 0,
        altitude: isSet3(object.altitude) ? globalThis.Number(object.altitude) : 0,
        range: isSet3(object.range) ? globalThis.Number(object.range) : 0,
        azimuth: isSet3(object.azimuth) ? globalThis.Number(object.azimuth) : 0,
        elevation: isSet3(object.elevation) ? globalThis.Number(object.elevation) : 0,
        bank: isSet3(object.bank) ? globalThis.Number(object.bank) : 0
      };
    },
    toJSON(message) {
      const obj = {};
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
    create(base) {
      return Root3.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot3();
      message.longitude = object.longitude ?? 0;
      message.latitude = object.latitude ?? 0;
      message.altitude = object.altitude ?? 0;
      message.range = object.range ?? 0;
      message.azimuth = object.azimuth ?? 0;
      message.elevation = object.elevation ?? 0;
      message.bank = object.bank ?? 0;
      return message;
    }
  };
  function isSet3(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.RotaryPlatform.ts
  var index_cmd_RotaryPlatform_exports = {};
  __export(index_cmd_RotaryPlatform_exports, {
    Axis: () => Axis,
    Azimuth: () => Azimuth,
    Elevation: () => Elevation,
    GetMeteo: () => GetMeteo2,
    Halt: () => Halt,
    HaltAzimuth: () => HaltAzimuth,
    HaltElevation: () => HaltElevation,
    Root: () => Root4,
    RotateAzimuth: () => RotateAzimuth,
    RotateAzimuthRelative: () => RotateAzimuthRelative,
    RotateAzimuthRelativeSet: () => RotateAzimuthRelativeSet,
    RotateAzimuthTo: () => RotateAzimuthTo,
    RotateElevation: () => RotateElevation,
    RotateElevationRelative: () => RotateElevationRelative,
    RotateElevationRelativeSet: () => RotateElevationRelativeSet,
    RotateElevationTo: () => RotateElevationTo,
    RotateToGPS: () => RotateToGPS,
    SetAzimuthValue: () => SetAzimuthValue,
    SetCalculateBasePositionFromCompass: () => SetCalculateBasePositionFromCompass,
    SetElevationValue: () => SetElevationValue,
    SetMode: () => SetMode,
    SetOriginGPS: () => SetOriginGPS,
    SetPlatformAzimuth: () => SetPlatformAzimuth,
    SetPlatformBank: () => SetPlatformBank,
    SetPlatformElevation: () => SetPlatformElevation,
    Start: () => Start2,
    Stop: () => Stop2
  });

  // frontend/ts/proto/jon/jon_shared_cmd_rotary.ts
  var import_minimal5 = __toESM(require_minimal2());

  // frontend/ts/proto/jon/jon_shared_data_types.ts
  var import_minimal4 = __toESM(require_minimal2());
  function jonGuiDataVideoChannelHeatFiltersFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_WHITE":
        return 1 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_WHITE */;
      case 2:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_BLACK":
        return 2 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_BLACK */;
      case 3:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_SEPIA":
        return 3 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_SEPIA */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataVideoChannelHeatFiltersToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_UNSPECIFIED */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_WHITE */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_WHITE";
      case 2 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_BLACK */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_BLACK";
      case 3 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_SEPIA */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_SEPIA";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataVideoChannelHeatAGCModesFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_1":
        return 1 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_1 */;
      case 2:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_2":
        return 2 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_2 */;
      case 3:
      case "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_3":
        return 3 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_3 */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataVideoChannelHeatAGCModesToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_UNSPECIFIED */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_1 */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_1";
      case 2 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_2 */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_2";
      case 3 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_3 */:
        return "JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_3";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataGpsFixTypeFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_GPS_FIX_TYPE_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_GPS_FIX_TYPE_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_GPS_FIX_TYPE_NONE":
        return 1 /* JON_GUI_DATA_GPS_FIX_TYPE_NONE */;
      case 2:
      case "JON_GUI_DATA_GPS_FIX_TYPE_1D":
        return 2 /* JON_GUI_DATA_GPS_FIX_TYPE_1D */;
      case 3:
      case "JON_GUI_DATA_GPS_FIX_TYPE_2D":
        return 3 /* JON_GUI_DATA_GPS_FIX_TYPE_2D */;
      case 4:
      case "JON_GUI_DATA_GPS_FIX_TYPE_3D":
        return 4 /* JON_GUI_DATA_GPS_FIX_TYPE_3D */;
      case 5:
      case "JON_GUI_DATA_GPS_FIX_TYPE_MANUAL":
        return 5 /* JON_GUI_DATA_GPS_FIX_TYPE_MANUAL */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataGpsFixTypeToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_GPS_FIX_TYPE_UNSPECIFIED */:
        return "JON_GUI_DATA_GPS_FIX_TYPE_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_GPS_FIX_TYPE_NONE */:
        return "JON_GUI_DATA_GPS_FIX_TYPE_NONE";
      case 2 /* JON_GUI_DATA_GPS_FIX_TYPE_1D */:
        return "JON_GUI_DATA_GPS_FIX_TYPE_1D";
      case 3 /* JON_GUI_DATA_GPS_FIX_TYPE_2D */:
        return "JON_GUI_DATA_GPS_FIX_TYPE_2D";
      case 4 /* JON_GUI_DATA_GPS_FIX_TYPE_3D */:
        return "JON_GUI_DATA_GPS_FIX_TYPE_3D";
      case 5 /* JON_GUI_DATA_GPS_FIX_TYPE_MANUAL */:
        return "JON_GUI_DATA_GPS_FIX_TYPE_MANUAL";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataRotaryDirectionFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE":
        return 1 /* JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE */;
      case 2:
      case "JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE":
        return 2 /* JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataRotaryDirectionToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED */:
        return "JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE */:
        return "JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE";
      case 2 /* JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE */:
        return "JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataLrfScanModesFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_LRF_SCAN_MODE_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_LRF_SCAN_MODE_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_LRF_SCAN_MODE_1_HZ_CONTINUOUS":
        return 1 /* JON_GUI_DATA_LRF_SCAN_MODE_1_HZ_CONTINUOUS */;
      case 2:
      case "JON_GUI_DATA_LRF_SCAN_MODE_4_HZ_CONTINUOUS":
        return 2 /* JON_GUI_DATA_LRF_SCAN_MODE_4_HZ_CONTINUOUS */;
      case 3:
      case "JON_GUI_DATA_LRF_SCAN_MODE_10_HZ_CONTINUOUS":
        return 3 /* JON_GUI_DATA_LRF_SCAN_MODE_10_HZ_CONTINUOUS */;
      case 4:
      case "JON_GUI_DATA_LRF_SCAN_MODE_20_HZ_CONTINUOUS":
        return 4 /* JON_GUI_DATA_LRF_SCAN_MODE_20_HZ_CONTINUOUS */;
      case 5:
      case "JON_GUI_DATA_LRF_SCAN_MODE_100_HZ_CONTINUOUS":
        return 5 /* JON_GUI_DATA_LRF_SCAN_MODE_100_HZ_CONTINUOUS */;
      case 6:
      case "JON_GUI_DATA_LRF_SCAN_MODE_200_HZ_CONTINUOUS":
        return 6 /* JON_GUI_DATA_LRF_SCAN_MODE_200_HZ_CONTINUOUS */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataLrfScanModesToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_LRF_SCAN_MODE_UNSPECIFIED */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_LRF_SCAN_MODE_1_HZ_CONTINUOUS */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_1_HZ_CONTINUOUS";
      case 2 /* JON_GUI_DATA_LRF_SCAN_MODE_4_HZ_CONTINUOUS */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_4_HZ_CONTINUOUS";
      case 3 /* JON_GUI_DATA_LRF_SCAN_MODE_10_HZ_CONTINUOUS */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_10_HZ_CONTINUOUS";
      case 4 /* JON_GUI_DATA_LRF_SCAN_MODE_20_HZ_CONTINUOUS */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_20_HZ_CONTINUOUS";
      case 5 /* JON_GUI_DATA_LRF_SCAN_MODE_100_HZ_CONTINUOUS */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_100_HZ_CONTINUOUS";
      case 6 /* JON_GUI_DATA_LRF_SCAN_MODE_200_HZ_CONTINUOUS */:
        return "JON_GUI_DATA_LRF_SCAN_MODE_200_HZ_CONTINUOUS";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataCompassCalibrateStatusFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_NOT_CALIBRATING":
        return 1 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_NOT_CALIBRATING */;
      case 2:
      case "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_SHORT":
        return 2 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_SHORT */;
      case 3:
      case "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_LONG":
        return 3 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_LONG */;
      case 4:
      case "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_FINISHED":
        return 4 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_FINISHED */;
      case 5:
      case "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_ERROR":
        return 5 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_ERROR */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataCompassCalibrateStatusToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_UNSPECIFIED */:
        return "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_NOT_CALIBRATING */:
        return "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_NOT_CALIBRATING";
      case 2 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_SHORT */:
        return "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_SHORT";
      case 3 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_LONG */:
        return "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_CALIBRATING_LONG";
      case 4 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_FINISHED */:
        return "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_FINISHED";
      case 5 /* JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_ERROR */:
        return "JON_GUI_DATA_COMPASS_CALIBRATE_STATUS_ERROR";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentWeatherConditionFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_WEATHER_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_WEATHER_CLEAR":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_CLEAR */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_WEATHER_CLOUDY":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_CLOUDY */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_WEATHER_FOGGY":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_FOGGY */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_WEATHER_HAZY":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_HAZY */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentWeatherConditionToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_WEATHER_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_CLEAR */:
        return "JON_GUI_DATA_ENVIRONMENT_WEATHER_CLEAR";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_CLOUDY */:
        return "JON_GUI_DATA_ENVIRONMENT_WEATHER_CLOUDY";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_FOGGY */:
        return "JON_GUI_DATA_ENVIRONMENT_WEATHER_FOGGY";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_HAZY */:
        return "JON_GUI_DATA_ENVIRONMENT_WEATHER_HAZY";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentLightingConditionFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHTING_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAY":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAY */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHTING_NIGHT":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_NIGHT */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHTING_DUSK":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DUSK */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAWN":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAWN */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentLightingConditionToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHTING_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAY */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAY";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_NIGHT */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHTING_NIGHT";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DUSK */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHTING_DUSK";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAWN */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAWN";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentPrecipitationTypeFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_PRECIP_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_PRECIP_NONE":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_NONE */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_PRECIP_RAIN":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_RAIN */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_PRECIP_SNOW":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_SNOW */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_PRECIP_SLEET":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_SLEET */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentPrecipitationTypeToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_PRECIP_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_NONE */:
        return "JON_GUI_DATA_ENVIRONMENT_PRECIP_NONE";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_RAIN */:
        return "JON_GUI_DATA_ENVIRONMENT_PRECIP_RAIN";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_SNOW */:
        return "JON_GUI_DATA_ENVIRONMENT_PRECIP_SNOW";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_SLEET */:
        return "JON_GUI_DATA_ENVIRONMENT_PRECIP_SLEET";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentGroundConditionFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_GROUND_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_GROUND_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_GROUND_DRY":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_GROUND_DRY */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_GROUND_WET":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_GROUND_WET */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_GROUND_SNOWY":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_GROUND_SNOWY */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_GROUND_ICY":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_GROUND_ICY */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentGroundConditionToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_GROUND_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_GROUND_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_GROUND_DRY */:
        return "JON_GUI_DATA_ENVIRONMENT_GROUND_DRY";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_GROUND_WET */:
        return "JON_GUI_DATA_ENVIRONMENT_GROUND_WET";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_GROUND_SNOWY */:
        return "JON_GUI_DATA_ENVIRONMENT_GROUND_SNOWY";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_GROUND_ICY */:
        return "JON_GUI_DATA_ENVIRONMENT_GROUND_ICY";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentOpticalVisibilityFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_HIGH_CONTRAST":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_HIGH_CONTRAST */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_LOW_CONTRAST":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_LOW_CONTRAST */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_GLARE":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_GLARE */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_SHADOW":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_SHADOW */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentOpticalVisibilityToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_HIGH_CONTRAST */:
        return "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_HIGH_CONTRAST";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_LOW_CONTRAST */:
        return "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_LOW_CONTRAST";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_GLARE */:
        return "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_GLARE";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_SHADOW */:
        return "JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_SHADOW";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentThermalConditionFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_THERMAL_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_THERMAL_HIGH_HEAT_CONTRAST":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_HIGH_HEAT_CONTRAST */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_THERMAL_LOW_HEAT_CONTRAST":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_LOW_HEAT_CONTRAST */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_WARM":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_WARM */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_COLD":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_COLD */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentThermalConditionToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_THERMAL_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_HIGH_HEAT_CONTRAST */:
        return "JON_GUI_DATA_ENVIRONMENT_THERMAL_HIGH_HEAT_CONTRAST";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_LOW_HEAT_CONTRAST */:
        return "JON_GUI_DATA_ENVIRONMENT_THERMAL_LOW_HEAT_CONTRAST";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_WARM */:
        return "JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_WARM";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_COLD */:
        return "JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_COLD";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentNetworkStatusFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_NETWORK_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_NETWORK_DISCONNECTED":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_DISCONNECTED */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_NETWORK_FLAKY":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_FLAKY */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_NETWORK_LOW_BANDWIDTH":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_LOW_BANDWIDTH */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_NETWORK_MEDIUM_BANDWIDTH":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_MEDIUM_BANDWIDTH */;
      case 5:
      case "JON_GUI_DATA_ENVIRONMENT_NETWORK_LAN":
        return 5 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_LAN */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentNetworkStatusToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_NETWORK_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_DISCONNECTED */:
        return "JON_GUI_DATA_ENVIRONMENT_NETWORK_DISCONNECTED";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_FLAKY */:
        return "JON_GUI_DATA_ENVIRONMENT_NETWORK_FLAKY";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_LOW_BANDWIDTH */:
        return "JON_GUI_DATA_ENVIRONMENT_NETWORK_LOW_BANDWIDTH";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_MEDIUM_BANDWIDTH */:
        return "JON_GUI_DATA_ENVIRONMENT_NETWORK_MEDIUM_BANDWIDTH";
      case 5 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_LAN */:
        return "JON_GUI_DATA_ENVIRONMENT_NETWORK_LAN";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataEnvironmentLightSourceFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_NONE":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_NONE */;
      case 2:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_FULL_MOON":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_FULL_MOON */;
      case 3:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_STARRY_NIGHT":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_STARRY_NIGHT */;
      case 4:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_ABOVE":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_ABOVE */;
      case 5:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_FRONT":
        return 5 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_FRONT */;
      case 6:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_BEHIND":
        return 6 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_BEHIND */;
      case 7:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_STRONG":
        return 7 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_STRONG */;
      case 8:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_WEAK":
        return 8 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_WEAK */;
      case 9:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_PROJECTOR":
        return 9 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_PROJECTOR */;
      case 10:
      case "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_LIT_TARGET":
        return 10 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_LIT_TARGET */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataEnvironmentLightSourceToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_UNSPECIFIED */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_NONE */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_NONE";
      case 2 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_FULL_MOON */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_FULL_MOON";
      case 3 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_STARRY_NIGHT */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_STARRY_NIGHT";
      case 4 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_ABOVE */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_ABOVE";
      case 5 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_FRONT */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_FRONT";
      case 6 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_BEHIND */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_BEHIND";
      case 7 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_STRONG */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_STRONG";
      case 8 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_WEAK */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_WEAK";
      case 9 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_PROJECTOR */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_PROJECTOR";
      case 10 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_LIT_TARGET */:
        return "JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_LIT_TARGET";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataRotaryModeFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_ROTARY_MODE_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_ROTARY_MODE_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_ROTARY_MODE_INITIALIZATION":
        return 1 /* JON_GUI_DATA_ROTARY_MODE_INITIALIZATION */;
      case 2:
      case "JON_GUI_DATA_ROTARY_MODE_SPEED":
        return 2 /* JON_GUI_DATA_ROTARY_MODE_SPEED */;
      case 3:
      case "JON_GUI_DATA_ROTARY_MODE_POSITION":
        return 3 /* JON_GUI_DATA_ROTARY_MODE_POSITION */;
      case 4:
      case "JON_GUI_DATA_ROTARY_MODE_STABILIZATION":
        return 4 /* JON_GUI_DATA_ROTARY_MODE_STABILIZATION */;
      case 5:
      case "JON_GUI_DATA_ROTARY_MODE_TARGETING":
        return 5 /* JON_GUI_DATA_ROTARY_MODE_TARGETING */;
      case 6:
      case "JON_GUI_DATA_ROTARY_MODE_VIDEO_TRACKER":
        return 6 /* JON_GUI_DATA_ROTARY_MODE_VIDEO_TRACKER */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataRotaryModeToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_ROTARY_MODE_UNSPECIFIED */:
        return "JON_GUI_DATA_ROTARY_MODE_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_ROTARY_MODE_INITIALIZATION */:
        return "JON_GUI_DATA_ROTARY_MODE_INITIALIZATION";
      case 2 /* JON_GUI_DATA_ROTARY_MODE_SPEED */:
        return "JON_GUI_DATA_ROTARY_MODE_SPEED";
      case 3 /* JON_GUI_DATA_ROTARY_MODE_POSITION */:
        return "JON_GUI_DATA_ROTARY_MODE_POSITION";
      case 4 /* JON_GUI_DATA_ROTARY_MODE_STABILIZATION */:
        return "JON_GUI_DATA_ROTARY_MODE_STABILIZATION";
      case 5 /* JON_GUI_DATA_ROTARY_MODE_TARGETING */:
        return "JON_GUI_DATA_ROTARY_MODE_TARGETING";
      case 6 /* JON_GUI_DATA_ROTARY_MODE_VIDEO_TRACKER */:
        return "JON_GUI_DATA_ROTARY_MODE_VIDEO_TRACKER";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function jonGuiDataPowerCanDeviceFromJSON(object) {
    switch (object) {
      case 0:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_UNSPECIFIED":
        return 0 /* JON_GUI_DATA_POWER_CAN_DEVICE_UNSPECIFIED */;
      case 1:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_NONE":
        return 1 /* JON_GUI_DATA_POWER_CAN_DEVICE_NONE */;
      case 2:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS":
        return 2 /* JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS */;
      case 3:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_GPS":
        return 3 /* JON_GUI_DATA_POWER_CAN_DEVICE_GPS */;
      case 4:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY":
        return 4 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY */;
      case 5:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT":
        return 5 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT */;
      case 6:
      case "JON_GUI_DATA_POWER_CAN_DEVICE_LRF":
        return 6 /* JON_GUI_DATA_POWER_CAN_DEVICE_LRF */;
      case -1:
      case "UNRECOGNIZED":
      default:
        return -1 /* UNRECOGNIZED */;
    }
  }
  function jonGuiDataPowerCanDeviceToJSON(object) {
    switch (object) {
      case 0 /* JON_GUI_DATA_POWER_CAN_DEVICE_UNSPECIFIED */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_UNSPECIFIED";
      case 1 /* JON_GUI_DATA_POWER_CAN_DEVICE_NONE */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_NONE";
      case 2 /* JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS";
      case 3 /* JON_GUI_DATA_POWER_CAN_DEVICE_GPS */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_GPS";
      case 4 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY";
      case 5 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT";
      case 6 /* JON_GUI_DATA_POWER_CAN_DEVICE_LRF */:
        return "JON_GUI_DATA_POWER_CAN_DEVICE_LRF";
      case -1 /* UNRECOGNIZED */:
      default:
        return "UNRECOGNIZED";
    }
  }
  function createBaseJonGuiDataMeteo() {
    return { temperature: 0, humidity: 0, pressure: 0 };
  }
  var JonGuiDataMeteo = {
    encode(message, writer = import_minimal4.default.Writer.create()) {
      if (message.temperature !== 0) {
        writer.uint32(13).float(message.temperature);
      }
      if (message.humidity !== 0) {
        writer.uint32(21).float(message.humidity);
      }
      if (message.pressure !== 0) {
        writer.uint32(29).float(message.pressure);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal4.default.Reader ? input : import_minimal4.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataMeteo();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.temperature = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.humidity = reader.float();
            continue;
          case 3:
            if (tag !== 29) {
              break;
            }
            message.pressure = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        temperature: isSet4(object.temperature) ? globalThis.Number(object.temperature) : 0,
        humidity: isSet4(object.humidity) ? globalThis.Number(object.humidity) : 0,
        pressure: isSet4(object.pressure) ? globalThis.Number(object.pressure) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.temperature !== 0) {
        obj.temperature = message.temperature;
      }
      if (message.humidity !== 0) {
        obj.humidity = message.humidity;
      }
      if (message.pressure !== 0) {
        obj.pressure = message.pressure;
      }
      return obj;
    },
    create(base) {
      return JonGuiDataMeteo.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataMeteo();
      message.temperature = object.temperature ?? 0;
      message.humidity = object.humidity ?? 0;
      message.pressure = object.pressure ?? 0;
      return message;
    }
  };
  function isSet4(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_rotary.ts
  function createBaseRoot4() {
    return {
      start: void 0,
      stop: void 0,
      axis: void 0,
      setPlatformAzimuth: void 0,
      setPlatformElevation: void 0,
      setPlatformBank: void 0,
      halt: void 0,
      setCalculateBasePositionFromCompass: void 0,
      rotateToGps: void 0,
      setOriginGps: void 0,
      getMeteo: void 0,
      setMode: void 0
    };
  }
  var Root4 = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.start !== void 0) {
        Start2.encode(message.start, writer.uint32(10).fork()).ldelim();
      }
      if (message.stop !== void 0) {
        Stop2.encode(message.stop, writer.uint32(18).fork()).ldelim();
      }
      if (message.axis !== void 0) {
        Axis.encode(message.axis, writer.uint32(26).fork()).ldelim();
      }
      if (message.setPlatformAzimuth !== void 0) {
        SetPlatformAzimuth.encode(message.setPlatformAzimuth, writer.uint32(34).fork()).ldelim();
      }
      if (message.setPlatformElevation !== void 0) {
        SetPlatformElevation.encode(message.setPlatformElevation, writer.uint32(42).fork()).ldelim();
      }
      if (message.setPlatformBank !== void 0) {
        SetPlatformBank.encode(message.setPlatformBank, writer.uint32(50).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        Halt.encode(message.halt, writer.uint32(58).fork()).ldelim();
      }
      if (message.setCalculateBasePositionFromCompass !== void 0) {
        SetCalculateBasePositionFromCompass.encode(message.setCalculateBasePositionFromCompass, writer.uint32(66).fork()).ldelim();
      }
      if (message.rotateToGps !== void 0) {
        RotateToGPS.encode(message.rotateToGps, writer.uint32(74).fork()).ldelim();
      }
      if (message.setOriginGps !== void 0) {
        SetOriginGPS.encode(message.setOriginGps, writer.uint32(82).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo2.encode(message.getMeteo, writer.uint32(90).fork()).ldelim();
      }
      if (message.setMode !== void 0) {
        SetMode.encode(message.setMode, writer.uint32(98).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot4();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.start = Start2.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.stop = Stop2.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.axis = Axis.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setPlatformAzimuth = SetPlatformAzimuth.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.setPlatformElevation = SetPlatformElevation.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.setPlatformBank = SetPlatformBank.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.halt = Halt.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.setCalculateBasePositionFromCompass = SetCalculateBasePositionFromCompass.decode(
              reader,
              reader.uint32()
            );
            continue;
          case 9:
            if (tag !== 74) {
              break;
            }
            message.rotateToGps = RotateToGPS.decode(reader, reader.uint32());
            continue;
          case 10:
            if (tag !== 82) {
              break;
            }
            message.setOriginGps = SetOriginGPS.decode(reader, reader.uint32());
            continue;
          case 11:
            if (tag !== 90) {
              break;
            }
            message.getMeteo = GetMeteo2.decode(reader, reader.uint32());
            continue;
          case 12:
            if (tag !== 98) {
              break;
            }
            message.setMode = SetMode.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        start: isSet5(object.start) ? Start2.fromJSON(object.start) : void 0,
        stop: isSet5(object.stop) ? Stop2.fromJSON(object.stop) : void 0,
        axis: isSet5(object.axis) ? Axis.fromJSON(object.axis) : void 0,
        setPlatformAzimuth: isSet5(object.setPlatformAzimuth) ? SetPlatformAzimuth.fromJSON(object.setPlatformAzimuth) : void 0,
        setPlatformElevation: isSet5(object.setPlatformElevation) ? SetPlatformElevation.fromJSON(object.setPlatformElevation) : void 0,
        setPlatformBank: isSet5(object.setPlatformBank) ? SetPlatformBank.fromJSON(object.setPlatformBank) : void 0,
        halt: isSet5(object.halt) ? Halt.fromJSON(object.halt) : void 0,
        setCalculateBasePositionFromCompass: isSet5(object.setCalculateBasePositionFromCompass) ? SetCalculateBasePositionFromCompass.fromJSON(object.setCalculateBasePositionFromCompass) : void 0,
        rotateToGps: isSet5(object.rotateToGps) ? RotateToGPS.fromJSON(object.rotateToGps) : void 0,
        setOriginGps: isSet5(object.setOriginGps) ? SetOriginGPS.fromJSON(object.setOriginGps) : void 0,
        getMeteo: isSet5(object.getMeteo) ? GetMeteo2.fromJSON(object.getMeteo) : void 0,
        setMode: isSet5(object.setMode) ? SetMode.fromJSON(object.setMode) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.start !== void 0) {
        obj.start = Start2.toJSON(message.start);
      }
      if (message.stop !== void 0) {
        obj.stop = Stop2.toJSON(message.stop);
      }
      if (message.axis !== void 0) {
        obj.axis = Axis.toJSON(message.axis);
      }
      if (message.setPlatformAzimuth !== void 0) {
        obj.setPlatformAzimuth = SetPlatformAzimuth.toJSON(message.setPlatformAzimuth);
      }
      if (message.setPlatformElevation !== void 0) {
        obj.setPlatformElevation = SetPlatformElevation.toJSON(message.setPlatformElevation);
      }
      if (message.setPlatformBank !== void 0) {
        obj.setPlatformBank = SetPlatformBank.toJSON(message.setPlatformBank);
      }
      if (message.halt !== void 0) {
        obj.halt = Halt.toJSON(message.halt);
      }
      if (message.setCalculateBasePositionFromCompass !== void 0) {
        obj.setCalculateBasePositionFromCompass = SetCalculateBasePositionFromCompass.toJSON(
          message.setCalculateBasePositionFromCompass
        );
      }
      if (message.rotateToGps !== void 0) {
        obj.rotateToGps = RotateToGPS.toJSON(message.rotateToGps);
      }
      if (message.setOriginGps !== void 0) {
        obj.setOriginGps = SetOriginGPS.toJSON(message.setOriginGps);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo2.toJSON(message.getMeteo);
      }
      if (message.setMode !== void 0) {
        obj.setMode = SetMode.toJSON(message.setMode);
      }
      return obj;
    },
    create(base) {
      return Root4.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot4();
      message.start = object.start !== void 0 && object.start !== null ? Start2.fromPartial(object.start) : void 0;
      message.stop = object.stop !== void 0 && object.stop !== null ? Stop2.fromPartial(object.stop) : void 0;
      message.axis = object.axis !== void 0 && object.axis !== null ? Axis.fromPartial(object.axis) : void 0;
      message.setPlatformAzimuth = object.setPlatformAzimuth !== void 0 && object.setPlatformAzimuth !== null ? SetPlatformAzimuth.fromPartial(object.setPlatformAzimuth) : void 0;
      message.setPlatformElevation = object.setPlatformElevation !== void 0 && object.setPlatformElevation !== null ? SetPlatformElevation.fromPartial(object.setPlatformElevation) : void 0;
      message.setPlatformBank = object.setPlatformBank !== void 0 && object.setPlatformBank !== null ? SetPlatformBank.fromPartial(object.setPlatformBank) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? Halt.fromPartial(object.halt) : void 0;
      message.setCalculateBasePositionFromCompass = object.setCalculateBasePositionFromCompass !== void 0 && object.setCalculateBasePositionFromCompass !== null ? SetCalculateBasePositionFromCompass.fromPartial(object.setCalculateBasePositionFromCompass) : void 0;
      message.rotateToGps = object.rotateToGps !== void 0 && object.rotateToGps !== null ? RotateToGPS.fromPartial(object.rotateToGps) : void 0;
      message.setOriginGps = object.setOriginGps !== void 0 && object.setOriginGps !== null ? SetOriginGPS.fromPartial(object.setOriginGps) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo2.fromPartial(object.getMeteo) : void 0;
      message.setMode = object.setMode !== void 0 && object.setMode !== null ? SetMode.fromPartial(object.setMode) : void 0;
      return message;
    }
  };
  function createBaseAxis() {
    return { azimuth: void 0, elevation: void 0 };
  }
  var Axis = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.azimuth !== void 0) {
        Azimuth.encode(message.azimuth, writer.uint32(10).fork()).ldelim();
      }
      if (message.elevation !== void 0) {
        Elevation.encode(message.elevation, writer.uint32(18).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseAxis();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.azimuth = Azimuth.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.elevation = Elevation.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        azimuth: isSet5(object.azimuth) ? Azimuth.fromJSON(object.azimuth) : void 0,
        elevation: isSet5(object.elevation) ? Elevation.fromJSON(object.elevation) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.azimuth !== void 0) {
        obj.azimuth = Azimuth.toJSON(message.azimuth);
      }
      if (message.elevation !== void 0) {
        obj.elevation = Elevation.toJSON(message.elevation);
      }
      return obj;
    },
    create(base) {
      return Axis.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseAxis();
      message.azimuth = object.azimuth !== void 0 && object.azimuth !== null ? Azimuth.fromPartial(object.azimuth) : void 0;
      message.elevation = object.elevation !== void 0 && object.elevation !== null ? Elevation.fromPartial(object.elevation) : void 0;
      return message;
    }
  };
  function createBaseSetMode() {
    return { mode: 0 };
  }
  var SetMode = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.mode !== 0) {
        writer.uint32(8).int32(message.mode);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetMode();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.mode = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { mode: isSet5(object.mode) ? jonGuiDataRotaryModeFromJSON(object.mode) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.mode !== 0) {
        obj.mode = jonGuiDataRotaryModeToJSON(message.mode);
      }
      return obj;
    },
    create(base) {
      return SetMode.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetMode();
      message.mode = object.mode ?? 0;
      return message;
    }
  };
  function createBaseSetAzimuthValue() {
    return { value: 0, direction: 0 };
  }
  var SetAzimuthValue = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      if (message.direction !== 0) {
        writer.uint32(16).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetAzimuthValue();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        value: isSet5(object.value) ? globalThis.Number(object.value) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return SetAzimuthValue.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetAzimuthValue();
      message.value = object.value ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseRotateAzimuthTo() {
    return { targetValue: 0, speed: 0, direction: 0 };
  }
  var RotateAzimuthTo = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.targetValue !== 0) {
        writer.uint32(13).float(message.targetValue);
      }
      if (message.speed !== 0) {
        writer.uint32(21).float(message.speed);
      }
      if (message.direction !== 0) {
        writer.uint32(24).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateAzimuthTo();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.targetValue = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.speed = reader.float();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        targetValue: isSet5(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet5(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.targetValue !== 0) {
        obj.targetValue = message.targetValue;
      }
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateAzimuthTo.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateAzimuthTo();
      message.targetValue = object.targetValue ?? 0;
      message.speed = object.speed ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseRotateAzimuth() {
    return { speed: 0, direction: 0 };
  }
  var RotateAzimuth = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.speed !== 0) {
        writer.uint32(13).float(message.speed);
      }
      if (message.direction !== 0) {
        writer.uint32(16).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateAzimuth();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.speed = reader.float();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        speed: isSet5(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateAzimuth.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateAzimuth();
      message.speed = object.speed ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseRotateElevation() {
    return { speed: 0, direction: 0 };
  }
  var RotateElevation = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.speed !== 0) {
        writer.uint32(13).float(message.speed);
      }
      if (message.direction !== 0) {
        writer.uint32(16).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateElevation();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.speed = reader.float();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        speed: isSet5(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateElevation.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateElevation();
      message.speed = object.speed ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseSetElevationValue() {
    return { value: 0 };
  }
  var SetElevationValue = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetElevationValue();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet5(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetElevationValue.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetElevationValue();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseRotateElevationTo() {
    return { targetValue: 0, speed: 0 };
  }
  var RotateElevationTo = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.targetValue !== 0) {
        writer.uint32(13).float(message.targetValue);
      }
      if (message.speed !== 0) {
        writer.uint32(21).float(message.speed);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateElevationTo();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.targetValue = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.speed = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        targetValue: isSet5(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet5(object.speed) ? globalThis.Number(object.speed) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.targetValue !== 0) {
        obj.targetValue = message.targetValue;
      }
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      return obj;
    },
    create(base) {
      return RotateElevationTo.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateElevationTo();
      message.targetValue = object.targetValue ?? 0;
      message.speed = object.speed ?? 0;
      return message;
    }
  };
  function createBaseRotateElevationRelative() {
    return { value: 0, speed: 0, direction: 0 };
  }
  var RotateElevationRelative = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      if (message.speed !== 0) {
        writer.uint32(21).float(message.speed);
      }
      if (message.direction !== 0) {
        writer.uint32(24).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateElevationRelative();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.speed = reader.float();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        value: isSet5(object.value) ? globalThis.Number(object.value) : 0,
        speed: isSet5(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateElevationRelative.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateElevationRelative();
      message.value = object.value ?? 0;
      message.speed = object.speed ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseRotateElevationRelativeSet() {
    return { value: 0, direction: 0 };
  }
  var RotateElevationRelativeSet = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      if (message.direction !== 0) {
        writer.uint32(16).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateElevationRelativeSet();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        value: isSet5(object.value) ? globalThis.Number(object.value) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateElevationRelativeSet.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateElevationRelativeSet();
      message.value = object.value ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseRotateAzimuthRelative() {
    return { value: 0, speed: 0, direction: 0 };
  }
  var RotateAzimuthRelative = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      if (message.speed !== 0) {
        writer.uint32(21).float(message.speed);
      }
      if (message.direction !== 0) {
        writer.uint32(24).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateAzimuthRelative();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.speed = reader.float();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        value: isSet5(object.value) ? globalThis.Number(object.value) : 0,
        speed: isSet5(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateAzimuthRelative.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateAzimuthRelative();
      message.value = object.value ?? 0;
      message.speed = object.speed ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseRotateAzimuthRelativeSet() {
    return { value: 0, direction: 0 };
  }
  var RotateAzimuthRelativeSet = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      if (message.direction !== 0) {
        writer.uint32(16).int32(message.direction);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateAzimuthRelativeSet();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.direction = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        value: isSet5(object.value) ? globalThis.Number(object.value) : 0,
        direction: isSet5(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      if (message.direction !== 0) {
        obj.direction = jonGuiDataRotaryDirectionToJSON(message.direction);
      }
      return obj;
    },
    create(base) {
      return RotateAzimuthRelativeSet.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateAzimuthRelativeSet();
      message.value = object.value ?? 0;
      message.direction = object.direction ?? 0;
      return message;
    }
  };
  function createBaseSetPlatformAzimuth() {
    return { value: 0 };
  }
  var SetPlatformAzimuth = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetPlatformAzimuth();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet5(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetPlatformAzimuth.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetPlatformAzimuth();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetPlatformElevation() {
    return { value: 0 };
  }
  var SetPlatformElevation = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetPlatformElevation();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet5(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetPlatformElevation.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetPlatformElevation();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetPlatformBank() {
    return { value: 0 };
  }
  var SetPlatformBank = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetPlatformBank();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet5(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetPlatformBank.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetPlatformBank();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseGetMeteo2() {
    return {};
  }
  var GetMeteo2 = {
    encode(_5, writer = import_minimal5.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetMeteo2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo2();
      return message;
    }
  };
  function createBaseAzimuth() {
    return {
      setValue: void 0,
      rotateTo: void 0,
      rotate: void 0,
      relative: void 0,
      relativeSet: void 0,
      halt: void 0
    };
  }
  var Azimuth = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.setValue !== void 0) {
        SetAzimuthValue.encode(message.setValue, writer.uint32(10).fork()).ldelim();
      }
      if (message.rotateTo !== void 0) {
        RotateAzimuthTo.encode(message.rotateTo, writer.uint32(18).fork()).ldelim();
      }
      if (message.rotate !== void 0) {
        RotateAzimuth.encode(message.rotate, writer.uint32(26).fork()).ldelim();
      }
      if (message.relative !== void 0) {
        RotateAzimuthRelative.encode(message.relative, writer.uint32(34).fork()).ldelim();
      }
      if (message.relativeSet !== void 0) {
        RotateAzimuthRelativeSet.encode(message.relativeSet, writer.uint32(42).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        HaltAzimuth.encode(message.halt, writer.uint32(50).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseAzimuth();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setValue = SetAzimuthValue.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.rotateTo = RotateAzimuthTo.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.rotate = RotateAzimuth.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.relative = RotateAzimuthRelative.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.relativeSet = RotateAzimuthRelativeSet.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.halt = HaltAzimuth.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setValue: isSet5(object.setValue) ? SetAzimuthValue.fromJSON(object.setValue) : void 0,
        rotateTo: isSet5(object.rotateTo) ? RotateAzimuthTo.fromJSON(object.rotateTo) : void 0,
        rotate: isSet5(object.rotate) ? RotateAzimuth.fromJSON(object.rotate) : void 0,
        relative: isSet5(object.relative) ? RotateAzimuthRelative.fromJSON(object.relative) : void 0,
        relativeSet: isSet5(object.relativeSet) ? RotateAzimuthRelativeSet.fromJSON(object.relativeSet) : void 0,
        halt: isSet5(object.halt) ? HaltAzimuth.fromJSON(object.halt) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setValue !== void 0) {
        obj.setValue = SetAzimuthValue.toJSON(message.setValue);
      }
      if (message.rotateTo !== void 0) {
        obj.rotateTo = RotateAzimuthTo.toJSON(message.rotateTo);
      }
      if (message.rotate !== void 0) {
        obj.rotate = RotateAzimuth.toJSON(message.rotate);
      }
      if (message.relative !== void 0) {
        obj.relative = RotateAzimuthRelative.toJSON(message.relative);
      }
      if (message.relativeSet !== void 0) {
        obj.relativeSet = RotateAzimuthRelativeSet.toJSON(message.relativeSet);
      }
      if (message.halt !== void 0) {
        obj.halt = HaltAzimuth.toJSON(message.halt);
      }
      return obj;
    },
    create(base) {
      return Azimuth.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseAzimuth();
      message.setValue = object.setValue !== void 0 && object.setValue !== null ? SetAzimuthValue.fromPartial(object.setValue) : void 0;
      message.rotateTo = object.rotateTo !== void 0 && object.rotateTo !== null ? RotateAzimuthTo.fromPartial(object.rotateTo) : void 0;
      message.rotate = object.rotate !== void 0 && object.rotate !== null ? RotateAzimuth.fromPartial(object.rotate) : void 0;
      message.relative = object.relative !== void 0 && object.relative !== null ? RotateAzimuthRelative.fromPartial(object.relative) : void 0;
      message.relativeSet = object.relativeSet !== void 0 && object.relativeSet !== null ? RotateAzimuthRelativeSet.fromPartial(object.relativeSet) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? HaltAzimuth.fromPartial(object.halt) : void 0;
      return message;
    }
  };
  function createBaseStart2() {
    return {};
  }
  var Start2 = {
    encode(_5, writer = import_minimal5.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStart2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStart2();
      return message;
    }
  };
  function createBaseStop2() {
    return {};
  }
  var Stop2 = {
    encode(_5, writer = import_minimal5.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStop2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStop2();
      return message;
    }
  };
  function createBaseHalt() {
    return {};
  }
  var Halt = {
    encode(_5, writer = import_minimal5.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHalt();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Halt.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHalt();
      return message;
    }
  };
  function createBaseHaltAzimuth() {
    return {};
  }
  var HaltAzimuth = {
    encode(_5, writer = import_minimal5.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHaltAzimuth();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltAzimuth.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHaltAzimuth();
      return message;
    }
  };
  function createBaseHaltElevation() {
    return {};
  }
  var HaltElevation = {
    encode(_5, writer = import_minimal5.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHaltElevation();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltElevation.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHaltElevation();
      return message;
    }
  };
  function createBaseElevation() {
    return {
      setValue: void 0,
      rotateTo: void 0,
      rotate: void 0,
      relative: void 0,
      relativeSet: void 0,
      halt: void 0
    };
  }
  var Elevation = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.setValue !== void 0) {
        SetElevationValue.encode(message.setValue, writer.uint32(10).fork()).ldelim();
      }
      if (message.rotateTo !== void 0) {
        RotateElevationTo.encode(message.rotateTo, writer.uint32(18).fork()).ldelim();
      }
      if (message.rotate !== void 0) {
        RotateElevation.encode(message.rotate, writer.uint32(26).fork()).ldelim();
      }
      if (message.relative !== void 0) {
        RotateElevationRelative.encode(message.relative, writer.uint32(34).fork()).ldelim();
      }
      if (message.relativeSet !== void 0) {
        RotateElevationRelativeSet.encode(message.relativeSet, writer.uint32(42).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        HaltElevation.encode(message.halt, writer.uint32(50).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseElevation();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setValue = SetElevationValue.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.rotateTo = RotateElevationTo.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.rotate = RotateElevation.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.relative = RotateElevationRelative.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.relativeSet = RotateElevationRelativeSet.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.halt = HaltElevation.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setValue: isSet5(object.setValue) ? SetElevationValue.fromJSON(object.setValue) : void 0,
        rotateTo: isSet5(object.rotateTo) ? RotateElevationTo.fromJSON(object.rotateTo) : void 0,
        rotate: isSet5(object.rotate) ? RotateElevation.fromJSON(object.rotate) : void 0,
        relative: isSet5(object.relative) ? RotateElevationRelative.fromJSON(object.relative) : void 0,
        relativeSet: isSet5(object.relativeSet) ? RotateElevationRelativeSet.fromJSON(object.relativeSet) : void 0,
        halt: isSet5(object.halt) ? HaltElevation.fromJSON(object.halt) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setValue !== void 0) {
        obj.setValue = SetElevationValue.toJSON(message.setValue);
      }
      if (message.rotateTo !== void 0) {
        obj.rotateTo = RotateElevationTo.toJSON(message.rotateTo);
      }
      if (message.rotate !== void 0) {
        obj.rotate = RotateElevation.toJSON(message.rotate);
      }
      if (message.relative !== void 0) {
        obj.relative = RotateElevationRelative.toJSON(message.relative);
      }
      if (message.relativeSet !== void 0) {
        obj.relativeSet = RotateElevationRelativeSet.toJSON(message.relativeSet);
      }
      if (message.halt !== void 0) {
        obj.halt = HaltElevation.toJSON(message.halt);
      }
      return obj;
    },
    create(base) {
      return Elevation.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseElevation();
      message.setValue = object.setValue !== void 0 && object.setValue !== null ? SetElevationValue.fromPartial(object.setValue) : void 0;
      message.rotateTo = object.rotateTo !== void 0 && object.rotateTo !== null ? RotateElevationTo.fromPartial(object.rotateTo) : void 0;
      message.rotate = object.rotate !== void 0 && object.rotate !== null ? RotateElevation.fromPartial(object.rotate) : void 0;
      message.relative = object.relative !== void 0 && object.relative !== null ? RotateElevationRelative.fromPartial(object.relative) : void 0;
      message.relativeSet = object.relativeSet !== void 0 && object.relativeSet !== null ? RotateElevationRelativeSet.fromPartial(object.relativeSet) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? HaltElevation.fromPartial(object.halt) : void 0;
      return message;
    }
  };
  function createBaseSetCalculateBasePositionFromCompass() {
    return { flag: false };
  }
  var SetCalculateBasePositionFromCompass = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.flag !== false) {
        writer.uint32(8).bool(message.flag);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetCalculateBasePositionFromCompass();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.flag = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { flag: isSet5(object.flag) ? globalThis.Boolean(object.flag) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.flag !== false) {
        obj.flag = message.flag;
      }
      return obj;
    },
    create(base) {
      return SetCalculateBasePositionFromCompass.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetCalculateBasePositionFromCompass();
      message.flag = object.flag ?? false;
      return message;
    }
  };
  function createBaseRotateToGPS() {
    return { latitude: 0, longitude: 0, altitude: 0 };
  }
  var RotateToGPS = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.latitude !== 0) {
        writer.uint32(13).float(message.latitude);
      }
      if (message.longitude !== 0) {
        writer.uint32(21).float(message.longitude);
      }
      if (message.altitude !== 0) {
        writer.uint32(29).float(message.altitude);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRotateToGPS();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.latitude = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.longitude = reader.float();
            continue;
          case 3:
            if (tag !== 29) {
              break;
            }
            message.altitude = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        latitude: isSet5(object.latitude) ? globalThis.Number(object.latitude) : 0,
        longitude: isSet5(object.longitude) ? globalThis.Number(object.longitude) : 0,
        altitude: isSet5(object.altitude) ? globalThis.Number(object.altitude) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.latitude !== 0) {
        obj.latitude = message.latitude;
      }
      if (message.longitude !== 0) {
        obj.longitude = message.longitude;
      }
      if (message.altitude !== 0) {
        obj.altitude = message.altitude;
      }
      return obj;
    },
    create(base) {
      return RotateToGPS.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRotateToGPS();
      message.latitude = object.latitude ?? 0;
      message.longitude = object.longitude ?? 0;
      message.altitude = object.altitude ?? 0;
      return message;
    }
  };
  function createBaseSetOriginGPS() {
    return { latitude: 0, longitude: 0, altitude: 0 };
  }
  var SetOriginGPS = {
    encode(message, writer = import_minimal5.default.Writer.create()) {
      if (message.latitude !== 0) {
        writer.uint32(13).float(message.latitude);
      }
      if (message.longitude !== 0) {
        writer.uint32(21).float(message.longitude);
      }
      if (message.altitude !== 0) {
        writer.uint32(29).float(message.altitude);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetOriginGPS();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.latitude = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.longitude = reader.float();
            continue;
          case 3:
            if (tag !== 29) {
              break;
            }
            message.altitude = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        latitude: isSet5(object.latitude) ? globalThis.Number(object.latitude) : 0,
        longitude: isSet5(object.longitude) ? globalThis.Number(object.longitude) : 0,
        altitude: isSet5(object.altitude) ? globalThis.Number(object.altitude) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.latitude !== 0) {
        obj.latitude = message.latitude;
      }
      if (message.longitude !== 0) {
        obj.longitude = message.longitude;
      }
      if (message.altitude !== 0) {
        obj.altitude = message.altitude;
      }
      return obj;
    },
    create(base) {
      return SetOriginGPS.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetOriginGPS();
      message.latitude = object.latitude ?? 0;
      message.longitude = object.longitude ?? 0;
      message.altitude = object.altitude ?? 0;
      return message;
    }
  };
  function isSet5(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.HeatCamera.ts
  var index_cmd_HeatCamera_exports = {};
  __export(index_cmd_HeatCamera_exports, {
    Calibrate: () => Calibrate,
    DisableDDE: () => DisableDDE,
    EnableDDE: () => EnableDDE,
    Focus: () => Focus,
    FocusIn: () => FocusIn,
    FocusOut: () => FocusOut,
    FocusStop: () => FocusStop,
    GetMeteo: () => GetMeteo3,
    GetPos: () => GetPos,
    Halt: () => Halt2,
    HaltAll: () => HaltAll,
    Move: () => Move,
    NextZoomTablePos: () => NextZoomTablePos,
    Photo: () => Photo,
    PrevZoomTablePos: () => PrevZoomTablePos,
    Root: () => Root5,
    SetAGC: () => SetAGC,
    SetAutoFocus: () => SetAutoFocus,
    SetDDELevel: () => SetDDELevel,
    SetFilters: () => SetFilters,
    SetRecording: () => SetRecording,
    SetValue: () => SetValue,
    SetZoomTableValue: () => SetZoomTableValue,
    Start: () => Start3,
    Stop: () => Stop3,
    SyncZoomToHeatCamera: () => SyncZoomToHeatCamera,
    Zoom: () => Zoom,
    ZoomIn: () => ZoomIn,
    ZoomOut: () => ZoomOut,
    ZoomStop: () => ZoomStop
  });

  // frontend/ts/proto/jon/jon_shared_cmd_heat_camera.ts
  var import_minimal6 = __toESM(require_minimal2());
  function createBaseRoot5() {
    return {
      focus: void 0,
      zoom: void 0,
      setAgc: void 0,
      setFilter: void 0,
      setAutoFocus: void 0,
      setRecording: void 0,
      start: void 0,
      stop: void 0,
      photo: void 0,
      syncZoom: void 0,
      getPos: void 0,
      zoomIn: void 0,
      zoomOut: void 0,
      zoomStop: void 0,
      focusIn: void 0,
      focusOut: void 0,
      focusStop: void 0,
      calibrate: void 0,
      haltAll: void 0,
      getMeteo: void 0,
      setDdeLevel: void 0,
      enableDde: void 0,
      disableDde: void 0
    };
  }
  var Root5 = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.focus !== void 0) {
        Focus.encode(message.focus, writer.uint32(10).fork()).ldelim();
      }
      if (message.zoom !== void 0) {
        Zoom.encode(message.zoom, writer.uint32(18).fork()).ldelim();
      }
      if (message.setAgc !== void 0) {
        SetAGC.encode(message.setAgc, writer.uint32(26).fork()).ldelim();
      }
      if (message.setFilter !== void 0) {
        SetFilters.encode(message.setFilter, writer.uint32(34).fork()).ldelim();
      }
      if (message.setAutoFocus !== void 0) {
        SetAutoFocus.encode(message.setAutoFocus, writer.uint32(42).fork()).ldelim();
      }
      if (message.setRecording !== void 0) {
        SetRecording.encode(message.setRecording, writer.uint32(50).fork()).ldelim();
      }
      if (message.start !== void 0) {
        Start3.encode(message.start, writer.uint32(58).fork()).ldelim();
      }
      if (message.stop !== void 0) {
        Stop3.encode(message.stop, writer.uint32(66).fork()).ldelim();
      }
      if (message.photo !== void 0) {
        Photo.encode(message.photo, writer.uint32(74).fork()).ldelim();
      }
      if (message.syncZoom !== void 0) {
        SyncZoomToHeatCamera.encode(message.syncZoom, writer.uint32(82).fork()).ldelim();
      }
      if (message.getPos !== void 0) {
        GetPos.encode(message.getPos, writer.uint32(90).fork()).ldelim();
      }
      if (message.zoomIn !== void 0) {
        ZoomIn.encode(message.zoomIn, writer.uint32(98).fork()).ldelim();
      }
      if (message.zoomOut !== void 0) {
        ZoomOut.encode(message.zoomOut, writer.uint32(106).fork()).ldelim();
      }
      if (message.zoomStop !== void 0) {
        ZoomStop.encode(message.zoomStop, writer.uint32(114).fork()).ldelim();
      }
      if (message.focusIn !== void 0) {
        FocusIn.encode(message.focusIn, writer.uint32(122).fork()).ldelim();
      }
      if (message.focusOut !== void 0) {
        FocusOut.encode(message.focusOut, writer.uint32(130).fork()).ldelim();
      }
      if (message.focusStop !== void 0) {
        FocusStop.encode(message.focusStop, writer.uint32(138).fork()).ldelim();
      }
      if (message.calibrate !== void 0) {
        Calibrate.encode(message.calibrate, writer.uint32(146).fork()).ldelim();
      }
      if (message.haltAll !== void 0) {
        HaltAll.encode(message.haltAll, writer.uint32(154).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo3.encode(message.getMeteo, writer.uint32(162).fork()).ldelim();
      }
      if (message.setDdeLevel !== void 0) {
        SetDDELevel.encode(message.setDdeLevel, writer.uint32(170).fork()).ldelim();
      }
      if (message.enableDde !== void 0) {
        EnableDDE.encode(message.enableDde, writer.uint32(178).fork()).ldelim();
      }
      if (message.disableDde !== void 0) {
        DisableDDE.encode(message.disableDde, writer.uint32(186).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot5();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.focus = Focus.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.zoom = Zoom.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.setAgc = SetAGC.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setFilter = SetFilters.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.setAutoFocus = SetAutoFocus.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.setRecording = SetRecording.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.start = Start3.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.stop = Stop3.decode(reader, reader.uint32());
            continue;
          case 9:
            if (tag !== 74) {
              break;
            }
            message.photo = Photo.decode(reader, reader.uint32());
            continue;
          case 10:
            if (tag !== 82) {
              break;
            }
            message.syncZoom = SyncZoomToHeatCamera.decode(reader, reader.uint32());
            continue;
          case 11:
            if (tag !== 90) {
              break;
            }
            message.getPos = GetPos.decode(reader, reader.uint32());
            continue;
          case 12:
            if (tag !== 98) {
              break;
            }
            message.zoomIn = ZoomIn.decode(reader, reader.uint32());
            continue;
          case 13:
            if (tag !== 106) {
              break;
            }
            message.zoomOut = ZoomOut.decode(reader, reader.uint32());
            continue;
          case 14:
            if (tag !== 114) {
              break;
            }
            message.zoomStop = ZoomStop.decode(reader, reader.uint32());
            continue;
          case 15:
            if (tag !== 122) {
              break;
            }
            message.focusIn = FocusIn.decode(reader, reader.uint32());
            continue;
          case 16:
            if (tag !== 130) {
              break;
            }
            message.focusOut = FocusOut.decode(reader, reader.uint32());
            continue;
          case 17:
            if (tag !== 138) {
              break;
            }
            message.focusStop = FocusStop.decode(reader, reader.uint32());
            continue;
          case 18:
            if (tag !== 146) {
              break;
            }
            message.calibrate = Calibrate.decode(reader, reader.uint32());
            continue;
          case 19:
            if (tag !== 154) {
              break;
            }
            message.haltAll = HaltAll.decode(reader, reader.uint32());
            continue;
          case 20:
            if (tag !== 162) {
              break;
            }
            message.getMeteo = GetMeteo3.decode(reader, reader.uint32());
            continue;
          case 21:
            if (tag !== 170) {
              break;
            }
            message.setDdeLevel = SetDDELevel.decode(reader, reader.uint32());
            continue;
          case 22:
            if (tag !== 178) {
              break;
            }
            message.enableDde = EnableDDE.decode(reader, reader.uint32());
            continue;
          case 23:
            if (tag !== 186) {
              break;
            }
            message.disableDde = DisableDDE.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        focus: isSet6(object.focus) ? Focus.fromJSON(object.focus) : void 0,
        zoom: isSet6(object.zoom) ? Zoom.fromJSON(object.zoom) : void 0,
        setAgc: isSet6(object.setAgc) ? SetAGC.fromJSON(object.setAgc) : void 0,
        setFilter: isSet6(object.setFilter) ? SetFilters.fromJSON(object.setFilter) : void 0,
        setAutoFocus: isSet6(object.setAutoFocus) ? SetAutoFocus.fromJSON(object.setAutoFocus) : void 0,
        setRecording: isSet6(object.setRecording) ? SetRecording.fromJSON(object.setRecording) : void 0,
        start: isSet6(object.start) ? Start3.fromJSON(object.start) : void 0,
        stop: isSet6(object.stop) ? Stop3.fromJSON(object.stop) : void 0,
        photo: isSet6(object.photo) ? Photo.fromJSON(object.photo) : void 0,
        syncZoom: isSet6(object.syncZoom) ? SyncZoomToHeatCamera.fromJSON(object.syncZoom) : void 0,
        getPos: isSet6(object.getPos) ? GetPos.fromJSON(object.getPos) : void 0,
        zoomIn: isSet6(object.zoomIn) ? ZoomIn.fromJSON(object.zoomIn) : void 0,
        zoomOut: isSet6(object.zoomOut) ? ZoomOut.fromJSON(object.zoomOut) : void 0,
        zoomStop: isSet6(object.zoomStop) ? ZoomStop.fromJSON(object.zoomStop) : void 0,
        focusIn: isSet6(object.focusIn) ? FocusIn.fromJSON(object.focusIn) : void 0,
        focusOut: isSet6(object.focusOut) ? FocusOut.fromJSON(object.focusOut) : void 0,
        focusStop: isSet6(object.focusStop) ? FocusStop.fromJSON(object.focusStop) : void 0,
        calibrate: isSet6(object.calibrate) ? Calibrate.fromJSON(object.calibrate) : void 0,
        haltAll: isSet6(object.haltAll) ? HaltAll.fromJSON(object.haltAll) : void 0,
        getMeteo: isSet6(object.getMeteo) ? GetMeteo3.fromJSON(object.getMeteo) : void 0,
        setDdeLevel: isSet6(object.setDdeLevel) ? SetDDELevel.fromJSON(object.setDdeLevel) : void 0,
        enableDde: isSet6(object.enableDde) ? EnableDDE.fromJSON(object.enableDde) : void 0,
        disableDde: isSet6(object.disableDde) ? DisableDDE.fromJSON(object.disableDde) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.focus !== void 0) {
        obj.focus = Focus.toJSON(message.focus);
      }
      if (message.zoom !== void 0) {
        obj.zoom = Zoom.toJSON(message.zoom);
      }
      if (message.setAgc !== void 0) {
        obj.setAgc = SetAGC.toJSON(message.setAgc);
      }
      if (message.setFilter !== void 0) {
        obj.setFilter = SetFilters.toJSON(message.setFilter);
      }
      if (message.setAutoFocus !== void 0) {
        obj.setAutoFocus = SetAutoFocus.toJSON(message.setAutoFocus);
      }
      if (message.setRecording !== void 0) {
        obj.setRecording = SetRecording.toJSON(message.setRecording);
      }
      if (message.start !== void 0) {
        obj.start = Start3.toJSON(message.start);
      }
      if (message.stop !== void 0) {
        obj.stop = Stop3.toJSON(message.stop);
      }
      if (message.photo !== void 0) {
        obj.photo = Photo.toJSON(message.photo);
      }
      if (message.syncZoom !== void 0) {
        obj.syncZoom = SyncZoomToHeatCamera.toJSON(message.syncZoom);
      }
      if (message.getPos !== void 0) {
        obj.getPos = GetPos.toJSON(message.getPos);
      }
      if (message.zoomIn !== void 0) {
        obj.zoomIn = ZoomIn.toJSON(message.zoomIn);
      }
      if (message.zoomOut !== void 0) {
        obj.zoomOut = ZoomOut.toJSON(message.zoomOut);
      }
      if (message.zoomStop !== void 0) {
        obj.zoomStop = ZoomStop.toJSON(message.zoomStop);
      }
      if (message.focusIn !== void 0) {
        obj.focusIn = FocusIn.toJSON(message.focusIn);
      }
      if (message.focusOut !== void 0) {
        obj.focusOut = FocusOut.toJSON(message.focusOut);
      }
      if (message.focusStop !== void 0) {
        obj.focusStop = FocusStop.toJSON(message.focusStop);
      }
      if (message.calibrate !== void 0) {
        obj.calibrate = Calibrate.toJSON(message.calibrate);
      }
      if (message.haltAll !== void 0) {
        obj.haltAll = HaltAll.toJSON(message.haltAll);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo3.toJSON(message.getMeteo);
      }
      if (message.setDdeLevel !== void 0) {
        obj.setDdeLevel = SetDDELevel.toJSON(message.setDdeLevel);
      }
      if (message.enableDde !== void 0) {
        obj.enableDde = EnableDDE.toJSON(message.enableDde);
      }
      if (message.disableDde !== void 0) {
        obj.disableDde = DisableDDE.toJSON(message.disableDde);
      }
      return obj;
    },
    create(base) {
      return Root5.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot5();
      message.focus = object.focus !== void 0 && object.focus !== null ? Focus.fromPartial(object.focus) : void 0;
      message.zoom = object.zoom !== void 0 && object.zoom !== null ? Zoom.fromPartial(object.zoom) : void 0;
      message.setAgc = object.setAgc !== void 0 && object.setAgc !== null ? SetAGC.fromPartial(object.setAgc) : void 0;
      message.setFilter = object.setFilter !== void 0 && object.setFilter !== null ? SetFilters.fromPartial(object.setFilter) : void 0;
      message.setAutoFocus = object.setAutoFocus !== void 0 && object.setAutoFocus !== null ? SetAutoFocus.fromPartial(object.setAutoFocus) : void 0;
      message.setRecording = object.setRecording !== void 0 && object.setRecording !== null ? SetRecording.fromPartial(object.setRecording) : void 0;
      message.start = object.start !== void 0 && object.start !== null ? Start3.fromPartial(object.start) : void 0;
      message.stop = object.stop !== void 0 && object.stop !== null ? Stop3.fromPartial(object.stop) : void 0;
      message.photo = object.photo !== void 0 && object.photo !== null ? Photo.fromPartial(object.photo) : void 0;
      message.syncZoom = object.syncZoom !== void 0 && object.syncZoom !== null ? SyncZoomToHeatCamera.fromPartial(object.syncZoom) : void 0;
      message.getPos = object.getPos !== void 0 && object.getPos !== null ? GetPos.fromPartial(object.getPos) : void 0;
      message.zoomIn = object.zoomIn !== void 0 && object.zoomIn !== null ? ZoomIn.fromPartial(object.zoomIn) : void 0;
      message.zoomOut = object.zoomOut !== void 0 && object.zoomOut !== null ? ZoomOut.fromPartial(object.zoomOut) : void 0;
      message.zoomStop = object.zoomStop !== void 0 && object.zoomStop !== null ? ZoomStop.fromPartial(object.zoomStop) : void 0;
      message.focusIn = object.focusIn !== void 0 && object.focusIn !== null ? FocusIn.fromPartial(object.focusIn) : void 0;
      message.focusOut = object.focusOut !== void 0 && object.focusOut !== null ? FocusOut.fromPartial(object.focusOut) : void 0;
      message.focusStop = object.focusStop !== void 0 && object.focusStop !== null ? FocusStop.fromPartial(object.focusStop) : void 0;
      message.calibrate = object.calibrate !== void 0 && object.calibrate !== null ? Calibrate.fromPartial(object.calibrate) : void 0;
      message.haltAll = object.haltAll !== void 0 && object.haltAll !== null ? HaltAll.fromPartial(object.haltAll) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo3.fromPartial(object.getMeteo) : void 0;
      message.setDdeLevel = object.setDdeLevel !== void 0 && object.setDdeLevel !== null ? SetDDELevel.fromPartial(object.setDdeLevel) : void 0;
      message.enableDde = object.enableDde !== void 0 && object.enableDde !== null ? EnableDDE.fromPartial(object.enableDde) : void 0;
      message.disableDde = object.disableDde !== void 0 && object.disableDde !== null ? DisableDDE.fromPartial(object.disableDde) : void 0;
      return message;
    }
  };
  function createBaseHaltAll() {
    return {};
  }
  var HaltAll = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHaltAll();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltAll.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHaltAll();
      return message;
    }
  };
  function createBaseEnableDDE() {
    return {};
  }
  var EnableDDE = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseEnableDDE();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return EnableDDE.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseEnableDDE();
      return message;
    }
  };
  function createBaseDisableDDE() {
    return {};
  }
  var DisableDDE = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseDisableDDE();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return DisableDDE.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseDisableDDE();
      return message;
    }
  };
  function createBaseSetValue() {
    return { value: 0 };
  }
  var SetValue = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetValue();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetValue.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetValue();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetDDELevel() {
    return { value: 0 };
  }
  var SetDDELevel = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetDDELevel();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = Math.round(message.value);
      }
      return obj;
    },
    create(base) {
      return SetDDELevel.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetDDELevel();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseMove() {
    return { targetValue: 0, speed: 0 };
  }
  var Move = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.targetValue !== 0) {
        writer.uint32(13).float(message.targetValue);
      }
      if (message.speed !== 0) {
        writer.uint32(21).float(message.speed);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseMove();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.targetValue = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.speed = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        targetValue: isSet6(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet6(object.speed) ? globalThis.Number(object.speed) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.targetValue !== 0) {
        obj.targetValue = message.targetValue;
      }
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      return obj;
    },
    create(base) {
      return Move.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseMove();
      message.targetValue = object.targetValue ?? 0;
      message.speed = object.speed ?? 0;
      return message;
    }
  };
  function createBaseZoomIn() {
    return {};
  }
  var ZoomIn = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseZoomIn();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ZoomIn.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseZoomIn();
      return message;
    }
  };
  function createBaseZoomOut() {
    return {};
  }
  var ZoomOut = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseZoomOut();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ZoomOut.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseZoomOut();
      return message;
    }
  };
  function createBaseZoomStop() {
    return {};
  }
  var ZoomStop = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseZoomStop();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ZoomStop.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseZoomStop();
      return message;
    }
  };
  function createBaseFocusIn() {
    return {};
  }
  var FocusIn = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseFocusIn();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return FocusIn.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseFocusIn();
      return message;
    }
  };
  function createBaseFocusOut() {
    return {};
  }
  var FocusOut = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseFocusOut();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return FocusOut.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseFocusOut();
      return message;
    }
  };
  function createBaseFocusStop() {
    return {};
  }
  var FocusStop = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseFocusStop();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return FocusStop.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseFocusStop();
      return message;
    }
  };
  function createBaseCalibrate() {
    return {};
  }
  var Calibrate = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCalibrate();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Calibrate.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCalibrate();
      return message;
    }
  };
  function createBaseGetPos() {
    return {};
  }
  var GetPos = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetPos();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetPos.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetPos();
      return message;
    }
  };
  function createBaseFocus() {
    return { setValue: void 0, move: void 0, halt: void 0 };
  }
  var Focus = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.setValue !== void 0) {
        SetValue.encode(message.setValue, writer.uint32(10).fork()).ldelim();
      }
      if (message.move !== void 0) {
        Move.encode(message.move, writer.uint32(18).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        Halt2.encode(message.halt, writer.uint32(26).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseFocus();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setValue = SetValue.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.move = Move.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.halt = Halt2.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setValue: isSet6(object.setValue) ? SetValue.fromJSON(object.setValue) : void 0,
        move: isSet6(object.move) ? Move.fromJSON(object.move) : void 0,
        halt: isSet6(object.halt) ? Halt2.fromJSON(object.halt) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setValue !== void 0) {
        obj.setValue = SetValue.toJSON(message.setValue);
      }
      if (message.move !== void 0) {
        obj.move = Move.toJSON(message.move);
      }
      if (message.halt !== void 0) {
        obj.halt = Halt2.toJSON(message.halt);
      }
      return obj;
    },
    create(base) {
      return Focus.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseFocus();
      message.setValue = object.setValue !== void 0 && object.setValue !== null ? SetValue.fromPartial(object.setValue) : void 0;
      message.move = object.move !== void 0 && object.move !== null ? Move.fromPartial(object.move) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? Halt2.fromPartial(object.halt) : void 0;
      return message;
    }
  };
  function createBaseZoom() {
    return {
      setValue: void 0,
      setZoomTableValue: void 0,
      move: void 0,
      halt: void 0,
      nextZoomTablePos: void 0,
      prevZoomTablePos: void 0
    };
  }
  var Zoom = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.setValue !== void 0) {
        SetValue.encode(message.setValue, writer.uint32(10).fork()).ldelim();
      }
      if (message.setZoomTableValue !== void 0) {
        SetZoomTableValue.encode(message.setZoomTableValue, writer.uint32(18).fork()).ldelim();
      }
      if (message.move !== void 0) {
        Move.encode(message.move, writer.uint32(26).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        Halt2.encode(message.halt, writer.uint32(34).fork()).ldelim();
      }
      if (message.nextZoomTablePos !== void 0) {
        NextZoomTablePos.encode(message.nextZoomTablePos, writer.uint32(42).fork()).ldelim();
      }
      if (message.prevZoomTablePos !== void 0) {
        PrevZoomTablePos.encode(message.prevZoomTablePos, writer.uint32(50).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseZoom();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setValue = SetValue.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.setZoomTableValue = SetZoomTableValue.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.move = Move.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.halt = Halt2.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.nextZoomTablePos = NextZoomTablePos.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.prevZoomTablePos = PrevZoomTablePos.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setValue: isSet6(object.setValue) ? SetValue.fromJSON(object.setValue) : void 0,
        setZoomTableValue: isSet6(object.setZoomTableValue) ? SetZoomTableValue.fromJSON(object.setZoomTableValue) : void 0,
        move: isSet6(object.move) ? Move.fromJSON(object.move) : void 0,
        halt: isSet6(object.halt) ? Halt2.fromJSON(object.halt) : void 0,
        nextZoomTablePos: isSet6(object.nextZoomTablePos) ? NextZoomTablePos.fromJSON(object.nextZoomTablePos) : void 0,
        prevZoomTablePos: isSet6(object.prevZoomTablePos) ? PrevZoomTablePos.fromJSON(object.prevZoomTablePos) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setValue !== void 0) {
        obj.setValue = SetValue.toJSON(message.setValue);
      }
      if (message.setZoomTableValue !== void 0) {
        obj.setZoomTableValue = SetZoomTableValue.toJSON(message.setZoomTableValue);
      }
      if (message.move !== void 0) {
        obj.move = Move.toJSON(message.move);
      }
      if (message.halt !== void 0) {
        obj.halt = Halt2.toJSON(message.halt);
      }
      if (message.nextZoomTablePos !== void 0) {
        obj.nextZoomTablePos = NextZoomTablePos.toJSON(message.nextZoomTablePos);
      }
      if (message.prevZoomTablePos !== void 0) {
        obj.prevZoomTablePos = PrevZoomTablePos.toJSON(message.prevZoomTablePos);
      }
      return obj;
    },
    create(base) {
      return Zoom.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseZoom();
      message.setValue = object.setValue !== void 0 && object.setValue !== null ? SetValue.fromPartial(object.setValue) : void 0;
      message.setZoomTableValue = object.setZoomTableValue !== void 0 && object.setZoomTableValue !== null ? SetZoomTableValue.fromPartial(object.setZoomTableValue) : void 0;
      message.move = object.move !== void 0 && object.move !== null ? Move.fromPartial(object.move) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? Halt2.fromPartial(object.halt) : void 0;
      message.nextZoomTablePos = object.nextZoomTablePos !== void 0 && object.nextZoomTablePos !== null ? NextZoomTablePos.fromPartial(object.nextZoomTablePos) : void 0;
      message.prevZoomTablePos = object.prevZoomTablePos !== void 0 && object.prevZoomTablePos !== null ? PrevZoomTablePos.fromPartial(object.prevZoomTablePos) : void 0;
      return message;
    }
  };
  function createBaseSetZoomTableValue() {
    return { value: 0 };
  }
  var SetZoomTableValue = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetZoomTableValue();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = Math.round(message.value);
      }
      return obj;
    },
    create(base) {
      return SetZoomTableValue.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetZoomTableValue();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseNextZoomTablePos() {
    return {};
  }
  var NextZoomTablePos = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseNextZoomTablePos();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return NextZoomTablePos.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseNextZoomTablePos();
      return message;
    }
  };
  function createBasePrevZoomTablePos() {
    return {};
  }
  var PrevZoomTablePos = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePrevZoomTablePos();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PrevZoomTablePos.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePrevZoomTablePos();
      return message;
    }
  };
  function createBaseSetAGC() {
    return { value: 0 };
  }
  var SetAGC = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetAGC();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? jonGuiDataVideoChannelHeatAGCModesFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataVideoChannelHeatAGCModesToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetAGC.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetAGC();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetFilters() {
    return { value: 0 };
  }
  var SetFilters = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetFilters();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? jonGuiDataVideoChannelHeatFiltersFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataVideoChannelHeatFiltersToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetFilters.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetFilters();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetAutoFocus() {
    return { value: false };
  }
  var SetAutoFocus = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetAutoFocus();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetAutoFocus.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetAutoFocus();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseSetRecording() {
    return { value: false };
  }
  var SetRecording = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetRecording();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetRecording.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetRecording();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseStart3() {
    return {};
  }
  var Start3 = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStart3();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start3.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStart3();
      return message;
    }
  };
  function createBaseStop3() {
    return {};
  }
  var Stop3 = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStop3();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop3.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStop3();
      return message;
    }
  };
  function createBaseHalt2() {
    return {};
  }
  var Halt2 = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHalt2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Halt2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHalt2();
      return message;
    }
  };
  function createBasePhoto() {
    return {};
  }
  var Photo = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePhoto();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Photo.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePhoto();
      return message;
    }
  };
  function createBaseGetMeteo3() {
    return {};
  }
  var GetMeteo3 = {
    encode(_5, writer = import_minimal6.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetMeteo3();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo3.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo3();
      return message;
    }
  };
  function createBaseSyncZoomToHeatCamera() {
    return { value: false };
  }
  var SyncZoomToHeatCamera = {
    encode(message, writer = import_minimal6.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSyncZoomToHeatCamera();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet6(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SyncZoomToHeatCamera.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSyncZoomToHeatCamera();
      message.value = object.value ?? false;
      return message;
    }
  };
  function isSet6(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_compass.ts
  var import_minimal7 = __toESM(require_minimal2());
  function createBaseRoot6() {
    return {
      start: void 0,
      stop: void 0,
      refreshRate: void 0,
      setMagneticDeclination: void 0,
      setOffsetAngleAzimuth: void 0,
      setOffsetAngleElevation: void 0,
      setUseRotaryPosition: void 0,
      startCalibrateLong: void 0,
      startCalibrateShort: void 0,
      calibrateNext: void 0,
      calibrateCencel: void 0,
      getMeteo: void 0
    };
  }
  var Root6 = {
    encode(message, writer = import_minimal7.default.Writer.create()) {
      if (message.start !== void 0) {
        Start4.encode(message.start, writer.uint32(10).fork()).ldelim();
      }
      if (message.stop !== void 0) {
        Stop4.encode(message.stop, writer.uint32(18).fork()).ldelim();
      }
      if (message.refreshRate !== void 0) {
        SetRefreshRate2.encode(message.refreshRate, writer.uint32(26).fork()).ldelim();
      }
      if (message.setMagneticDeclination !== void 0) {
        SetMagneticDeclination.encode(message.setMagneticDeclination, writer.uint32(34).fork()).ldelim();
      }
      if (message.setOffsetAngleAzimuth !== void 0) {
        SetOffsetAngleAzimuth.encode(message.setOffsetAngleAzimuth, writer.uint32(42).fork()).ldelim();
      }
      if (message.setOffsetAngleElevation !== void 0) {
        SetOffsetAngleElevation.encode(message.setOffsetAngleElevation, writer.uint32(50).fork()).ldelim();
      }
      if (message.setUseRotaryPosition !== void 0) {
        SetUseRotaryPosition.encode(message.setUseRotaryPosition, writer.uint32(58).fork()).ldelim();
      }
      if (message.startCalibrateLong !== void 0) {
        CalibrateStartLong.encode(message.startCalibrateLong, writer.uint32(66).fork()).ldelim();
      }
      if (message.startCalibrateShort !== void 0) {
        CalibrateStartShort.encode(message.startCalibrateShort, writer.uint32(74).fork()).ldelim();
      }
      if (message.calibrateNext !== void 0) {
        CalibrateNext.encode(message.calibrateNext, writer.uint32(82).fork()).ldelim();
      }
      if (message.calibrateCencel !== void 0) {
        CalibrateCencel.encode(message.calibrateCencel, writer.uint32(90).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo4.encode(message.getMeteo, writer.uint32(98).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot6();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.start = Start4.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.stop = Stop4.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.refreshRate = SetRefreshRate2.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setMagneticDeclination = SetMagneticDeclination.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.setOffsetAngleAzimuth = SetOffsetAngleAzimuth.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.setOffsetAngleElevation = SetOffsetAngleElevation.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.setUseRotaryPosition = SetUseRotaryPosition.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.startCalibrateLong = CalibrateStartLong.decode(reader, reader.uint32());
            continue;
          case 9:
            if (tag !== 74) {
              break;
            }
            message.startCalibrateShort = CalibrateStartShort.decode(reader, reader.uint32());
            continue;
          case 10:
            if (tag !== 82) {
              break;
            }
            message.calibrateNext = CalibrateNext.decode(reader, reader.uint32());
            continue;
          case 11:
            if (tag !== 90) {
              break;
            }
            message.calibrateCencel = CalibrateCencel.decode(reader, reader.uint32());
            continue;
          case 12:
            if (tag !== 98) {
              break;
            }
            message.getMeteo = GetMeteo4.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        start: isSet7(object.start) ? Start4.fromJSON(object.start) : void 0,
        stop: isSet7(object.stop) ? Stop4.fromJSON(object.stop) : void 0,
        refreshRate: isSet7(object.refreshRate) ? SetRefreshRate2.fromJSON(object.refreshRate) : void 0,
        setMagneticDeclination: isSet7(object.setMagneticDeclination) ? SetMagneticDeclination.fromJSON(object.setMagneticDeclination) : void 0,
        setOffsetAngleAzimuth: isSet7(object.setOffsetAngleAzimuth) ? SetOffsetAngleAzimuth.fromJSON(object.setOffsetAngleAzimuth) : void 0,
        setOffsetAngleElevation: isSet7(object.setOffsetAngleElevation) ? SetOffsetAngleElevation.fromJSON(object.setOffsetAngleElevation) : void 0,
        setUseRotaryPosition: isSet7(object.setUseRotaryPosition) ? SetUseRotaryPosition.fromJSON(object.setUseRotaryPosition) : void 0,
        startCalibrateLong: isSet7(object.startCalibrateLong) ? CalibrateStartLong.fromJSON(object.startCalibrateLong) : void 0,
        startCalibrateShort: isSet7(object.startCalibrateShort) ? CalibrateStartShort.fromJSON(object.startCalibrateShort) : void 0,
        calibrateNext: isSet7(object.calibrateNext) ? CalibrateNext.fromJSON(object.calibrateNext) : void 0,
        calibrateCencel: isSet7(object.calibrateCencel) ? CalibrateCencel.fromJSON(object.calibrateCencel) : void 0,
        getMeteo: isSet7(object.getMeteo) ? GetMeteo4.fromJSON(object.getMeteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.start !== void 0) {
        obj.start = Start4.toJSON(message.start);
      }
      if (message.stop !== void 0) {
        obj.stop = Stop4.toJSON(message.stop);
      }
      if (message.refreshRate !== void 0) {
        obj.refreshRate = SetRefreshRate2.toJSON(message.refreshRate);
      }
      if (message.setMagneticDeclination !== void 0) {
        obj.setMagneticDeclination = SetMagneticDeclination.toJSON(message.setMagneticDeclination);
      }
      if (message.setOffsetAngleAzimuth !== void 0) {
        obj.setOffsetAngleAzimuth = SetOffsetAngleAzimuth.toJSON(message.setOffsetAngleAzimuth);
      }
      if (message.setOffsetAngleElevation !== void 0) {
        obj.setOffsetAngleElevation = SetOffsetAngleElevation.toJSON(message.setOffsetAngleElevation);
      }
      if (message.setUseRotaryPosition !== void 0) {
        obj.setUseRotaryPosition = SetUseRotaryPosition.toJSON(message.setUseRotaryPosition);
      }
      if (message.startCalibrateLong !== void 0) {
        obj.startCalibrateLong = CalibrateStartLong.toJSON(message.startCalibrateLong);
      }
      if (message.startCalibrateShort !== void 0) {
        obj.startCalibrateShort = CalibrateStartShort.toJSON(message.startCalibrateShort);
      }
      if (message.calibrateNext !== void 0) {
        obj.calibrateNext = CalibrateNext.toJSON(message.calibrateNext);
      }
      if (message.calibrateCencel !== void 0) {
        obj.calibrateCencel = CalibrateCencel.toJSON(message.calibrateCencel);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo4.toJSON(message.getMeteo);
      }
      return obj;
    },
    create(base) {
      return Root6.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot6();
      message.start = object.start !== void 0 && object.start !== null ? Start4.fromPartial(object.start) : void 0;
      message.stop = object.stop !== void 0 && object.stop !== null ? Stop4.fromPartial(object.stop) : void 0;
      message.refreshRate = object.refreshRate !== void 0 && object.refreshRate !== null ? SetRefreshRate2.fromPartial(object.refreshRate) : void 0;
      message.setMagneticDeclination = object.setMagneticDeclination !== void 0 && object.setMagneticDeclination !== null ? SetMagneticDeclination.fromPartial(object.setMagneticDeclination) : void 0;
      message.setOffsetAngleAzimuth = object.setOffsetAngleAzimuth !== void 0 && object.setOffsetAngleAzimuth !== null ? SetOffsetAngleAzimuth.fromPartial(object.setOffsetAngleAzimuth) : void 0;
      message.setOffsetAngleElevation = object.setOffsetAngleElevation !== void 0 && object.setOffsetAngleElevation !== null ? SetOffsetAngleElevation.fromPartial(object.setOffsetAngleElevation) : void 0;
      message.setUseRotaryPosition = object.setUseRotaryPosition !== void 0 && object.setUseRotaryPosition !== null ? SetUseRotaryPosition.fromPartial(object.setUseRotaryPosition) : void 0;
      message.startCalibrateLong = object.startCalibrateLong !== void 0 && object.startCalibrateLong !== null ? CalibrateStartLong.fromPartial(object.startCalibrateLong) : void 0;
      message.startCalibrateShort = object.startCalibrateShort !== void 0 && object.startCalibrateShort !== null ? CalibrateStartShort.fromPartial(object.startCalibrateShort) : void 0;
      message.calibrateNext = object.calibrateNext !== void 0 && object.calibrateNext !== null ? CalibrateNext.fromPartial(object.calibrateNext) : void 0;
      message.calibrateCencel = object.calibrateCencel !== void 0 && object.calibrateCencel !== null ? CalibrateCencel.fromPartial(object.calibrateCencel) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo4.fromPartial(object.getMeteo) : void 0;
      return message;
    }
  };
  function createBaseStart4() {
    return {};
  }
  var Start4 = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStart4();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start4.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStart4();
      return message;
    }
  };
  function createBaseStop4() {
    return {};
  }
  var Stop4 = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStop4();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop4.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStop4();
      return message;
    }
  };
  function createBaseGetMeteo4() {
    return {};
  }
  var GetMeteo4 = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetMeteo4();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo4.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo4();
      return message;
    }
  };
  function createBaseCalibrateStartLong() {
    return {};
  }
  var CalibrateStartLong = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCalibrateStartLong();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateStartLong.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCalibrateStartLong();
      return message;
    }
  };
  function createBaseCalibrateStartShort() {
    return {};
  }
  var CalibrateStartShort = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCalibrateStartShort();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateStartShort.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCalibrateStartShort();
      return message;
    }
  };
  function createBaseCalibrateNext() {
    return {};
  }
  var CalibrateNext = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCalibrateNext();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateNext.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCalibrateNext();
      return message;
    }
  };
  function createBaseCalibrateCencel() {
    return {};
  }
  var CalibrateCencel = {
    encode(_5, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCalibrateCencel();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateCencel.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCalibrateCencel();
      return message;
    }
  };
  function createBaseSetRefreshRate2() {
    return { value: 0 };
  }
  var SetRefreshRate2 = {
    encode(message, writer = import_minimal7.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).uint32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetRefreshRate2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.uint32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet7(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = Math.round(message.value);
      }
      return obj;
    },
    create(base) {
      return SetRefreshRate2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetRefreshRate2();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetMagneticDeclination() {
    return { value: 0 };
  }
  var SetMagneticDeclination = {
    encode(message, writer = import_minimal7.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetMagneticDeclination();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet7(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetMagneticDeclination.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetMagneticDeclination();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetOffsetAngleAzimuth() {
    return { value: 0 };
  }
  var SetOffsetAngleAzimuth = {
    encode(message, writer = import_minimal7.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetOffsetAngleAzimuth();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet7(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetOffsetAngleAzimuth.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetOffsetAngleAzimuth();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetOffsetAngleElevation() {
    return { value: 0 };
  }
  var SetOffsetAngleElevation = {
    encode(message, writer = import_minimal7.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetOffsetAngleElevation();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet7(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetOffsetAngleElevation.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetOffsetAngleElevation();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetUseRotaryPosition() {
    return { flag: false };
  }
  var SetUseRotaryPosition = {
    encode(message, writer = import_minimal7.default.Writer.create()) {
      if (message.flag !== false) {
        writer.uint32(8).bool(message.flag);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetUseRotaryPosition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.flag = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { flag: isSet7(object.flag) ? globalThis.Boolean(object.flag) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.flag !== false) {
        obj.flag = message.flag;
      }
      return obj;
    },
    create(base) {
      return SetUseRotaryPosition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetUseRotaryPosition();
      message.flag = object.flag ?? false;
      return message;
    }
  };
  function isSet7(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.Lrf.ts
  var index_cmd_Lrf_exports = {};
  __export(index_cmd_Lrf_exports, {
    DisableFogMode: () => DisableFogMode,
    EnableFogMode: () => EnableFogMode,
    GetMeteo: () => GetMeteo5,
    Measure: () => Measure,
    NewSession: () => NewSession,
    Root: () => Root7,
    ScanOff: () => ScanOff,
    ScanOn: () => ScanOn,
    Start: () => Start5,
    Stop: () => Stop5,
    TargetDesignatorOff: () => TargetDesignatorOff,
    TargetDesignatorOnModeA: () => TargetDesignatorOnModeA,
    TargetDesignatorOnModeB: () => TargetDesignatorOnModeB,
    setScanMode: () => setScanMode
  });

  // frontend/ts/proto/jon/jon_shared_cmd_lrf.ts
  var import_minimal8 = __toESM(require_minimal2());
  function createBaseRoot7() {
    return {
      measure: void 0,
      scanOn: void 0,
      scanOff: void 0,
      start: void 0,
      stop: void 0,
      targetDesignatorOff: void 0,
      targetDesignatorOnModeA: void 0,
      targetDesignatorOnModeB: void 0,
      enableFogMode: void 0,
      disableFogMode: void 0,
      setScanMode: void 0,
      newSession: void 0,
      getMeteo: void 0
    };
  }
  var Root7 = {
    encode(message, writer = import_minimal8.default.Writer.create()) {
      if (message.measure !== void 0) {
        Measure.encode(message.measure, writer.uint32(10).fork()).ldelim();
      }
      if (message.scanOn !== void 0) {
        ScanOn.encode(message.scanOn, writer.uint32(18).fork()).ldelim();
      }
      if (message.scanOff !== void 0) {
        ScanOff.encode(message.scanOff, writer.uint32(26).fork()).ldelim();
      }
      if (message.start !== void 0) {
        Start5.encode(message.start, writer.uint32(34).fork()).ldelim();
      }
      if (message.stop !== void 0) {
        Stop5.encode(message.stop, writer.uint32(42).fork()).ldelim();
      }
      if (message.targetDesignatorOff !== void 0) {
        TargetDesignatorOff.encode(message.targetDesignatorOff, writer.uint32(50).fork()).ldelim();
      }
      if (message.targetDesignatorOnModeA !== void 0) {
        TargetDesignatorOnModeA.encode(message.targetDesignatorOnModeA, writer.uint32(58).fork()).ldelim();
      }
      if (message.targetDesignatorOnModeB !== void 0) {
        TargetDesignatorOnModeB.encode(message.targetDesignatorOnModeB, writer.uint32(66).fork()).ldelim();
      }
      if (message.enableFogMode !== void 0) {
        EnableFogMode.encode(message.enableFogMode, writer.uint32(74).fork()).ldelim();
      }
      if (message.disableFogMode !== void 0) {
        DisableFogMode.encode(message.disableFogMode, writer.uint32(82).fork()).ldelim();
      }
      if (message.setScanMode !== void 0) {
        setScanMode.encode(message.setScanMode, writer.uint32(90).fork()).ldelim();
      }
      if (message.newSession !== void 0) {
        NewSession.encode(message.newSession, writer.uint32(98).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo5.encode(message.getMeteo, writer.uint32(106).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot7();
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
            message.start = Start5.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.stop = Stop5.decode(reader, reader.uint32());
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
            message.getMeteo = GetMeteo5.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        measure: isSet8(object.measure) ? Measure.fromJSON(object.measure) : void 0,
        scanOn: isSet8(object.scanOn) ? ScanOn.fromJSON(object.scanOn) : void 0,
        scanOff: isSet8(object.scanOff) ? ScanOff.fromJSON(object.scanOff) : void 0,
        start: isSet8(object.start) ? Start5.fromJSON(object.start) : void 0,
        stop: isSet8(object.stop) ? Stop5.fromJSON(object.stop) : void 0,
        targetDesignatorOff: isSet8(object.targetDesignatorOff) ? TargetDesignatorOff.fromJSON(object.targetDesignatorOff) : void 0,
        targetDesignatorOnModeA: isSet8(object.targetDesignatorOnModeA) ? TargetDesignatorOnModeA.fromJSON(object.targetDesignatorOnModeA) : void 0,
        targetDesignatorOnModeB: isSet8(object.targetDesignatorOnModeB) ? TargetDesignatorOnModeB.fromJSON(object.targetDesignatorOnModeB) : void 0,
        enableFogMode: isSet8(object.enableFogMode) ? EnableFogMode.fromJSON(object.enableFogMode) : void 0,
        disableFogMode: isSet8(object.disableFogMode) ? DisableFogMode.fromJSON(object.disableFogMode) : void 0,
        setScanMode: isSet8(object.setScanMode) ? setScanMode.fromJSON(object.setScanMode) : void 0,
        newSession: isSet8(object.newSession) ? NewSession.fromJSON(object.newSession) : void 0,
        getMeteo: isSet8(object.getMeteo) ? GetMeteo5.fromJSON(object.getMeteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.measure !== void 0) {
        obj.measure = Measure.toJSON(message.measure);
      }
      if (message.scanOn !== void 0) {
        obj.scanOn = ScanOn.toJSON(message.scanOn);
      }
      if (message.scanOff !== void 0) {
        obj.scanOff = ScanOff.toJSON(message.scanOff);
      }
      if (message.start !== void 0) {
        obj.start = Start5.toJSON(message.start);
      }
      if (message.stop !== void 0) {
        obj.stop = Stop5.toJSON(message.stop);
      }
      if (message.targetDesignatorOff !== void 0) {
        obj.targetDesignatorOff = TargetDesignatorOff.toJSON(message.targetDesignatorOff);
      }
      if (message.targetDesignatorOnModeA !== void 0) {
        obj.targetDesignatorOnModeA = TargetDesignatorOnModeA.toJSON(message.targetDesignatorOnModeA);
      }
      if (message.targetDesignatorOnModeB !== void 0) {
        obj.targetDesignatorOnModeB = TargetDesignatorOnModeB.toJSON(message.targetDesignatorOnModeB);
      }
      if (message.enableFogMode !== void 0) {
        obj.enableFogMode = EnableFogMode.toJSON(message.enableFogMode);
      }
      if (message.disableFogMode !== void 0) {
        obj.disableFogMode = DisableFogMode.toJSON(message.disableFogMode);
      }
      if (message.setScanMode !== void 0) {
        obj.setScanMode = setScanMode.toJSON(message.setScanMode);
      }
      if (message.newSession !== void 0) {
        obj.newSession = NewSession.toJSON(message.newSession);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo5.toJSON(message.getMeteo);
      }
      return obj;
    },
    create(base) {
      return Root7.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot7();
      message.measure = object.measure !== void 0 && object.measure !== null ? Measure.fromPartial(object.measure) : void 0;
      message.scanOn = object.scanOn !== void 0 && object.scanOn !== null ? ScanOn.fromPartial(object.scanOn) : void 0;
      message.scanOff = object.scanOff !== void 0 && object.scanOff !== null ? ScanOff.fromPartial(object.scanOff) : void 0;
      message.start = object.start !== void 0 && object.start !== null ? Start5.fromPartial(object.start) : void 0;
      message.stop = object.stop !== void 0 && object.stop !== null ? Stop5.fromPartial(object.stop) : void 0;
      message.targetDesignatorOff = object.targetDesignatorOff !== void 0 && object.targetDesignatorOff !== null ? TargetDesignatorOff.fromPartial(object.targetDesignatorOff) : void 0;
      message.targetDesignatorOnModeA = object.targetDesignatorOnModeA !== void 0 && object.targetDesignatorOnModeA !== null ? TargetDesignatorOnModeA.fromPartial(object.targetDesignatorOnModeA) : void 0;
      message.targetDesignatorOnModeB = object.targetDesignatorOnModeB !== void 0 && object.targetDesignatorOnModeB !== null ? TargetDesignatorOnModeB.fromPartial(object.targetDesignatorOnModeB) : void 0;
      message.enableFogMode = object.enableFogMode !== void 0 && object.enableFogMode !== null ? EnableFogMode.fromPartial(object.enableFogMode) : void 0;
      message.disableFogMode = object.disableFogMode !== void 0 && object.disableFogMode !== null ? DisableFogMode.fromPartial(object.disableFogMode) : void 0;
      message.setScanMode = object.setScanMode !== void 0 && object.setScanMode !== null ? setScanMode.fromPartial(object.setScanMode) : void 0;
      message.newSession = object.newSession !== void 0 && object.newSession !== null ? NewSession.fromPartial(object.newSession) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo5.fromPartial(object.getMeteo) : void 0;
      return message;
    }
  };
  function createBaseStart5() {
    return {};
  }
  var Start5 = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStart5();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start5.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStart5();
      return message;
    }
  };
  function createBaseStop5() {
    return {};
  }
  var Stop5 = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStop5();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop5.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStop5();
      return message;
    }
  };
  function createBaseMeasure() {
    return {};
  }
  var Measure = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Measure.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseMeasure();
      return message;
    }
  };
  function createBaseScanOn() {
    return {};
  }
  var ScanOn = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ScanOn.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseScanOn();
      return message;
    }
  };
  function createBaseScanOff() {
    return {};
  }
  var ScanOff = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ScanOff.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseScanOff();
      return message;
    }
  };
  function createBaseTargetDesignatorOff() {
    return {};
  }
  var TargetDesignatorOff = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return TargetDesignatorOff.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseTargetDesignatorOff();
      return message;
    }
  };
  function createBaseTargetDesignatorOnModeA() {
    return {};
  }
  var TargetDesignatorOnModeA = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return TargetDesignatorOnModeA.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseTargetDesignatorOnModeA();
      return message;
    }
  };
  function createBaseTargetDesignatorOnModeB() {
    return {};
  }
  var TargetDesignatorOnModeB = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return TargetDesignatorOnModeB.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseTargetDesignatorOnModeB();
      return message;
    }
  };
  function createBaseEnableFogMode() {
    return {};
  }
  var EnableFogMode = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return EnableFogMode.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseEnableFogMode();
      return message;
    }
  };
  function createBaseDisableFogMode() {
    return {};
  }
  var DisableFogMode = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return DisableFogMode.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseDisableFogMode();
      return message;
    }
  };
  function createBaseGetMeteo5() {
    return {};
  }
  var GetMeteo5 = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetMeteo5();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo5.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo5();
      return message;
    }
  };
  function createBasesetScanMode() {
    return { mode: 0 };
  }
  var setScanMode = {
    encode(message, writer = import_minimal8.default.Writer.create()) {
      if (message.mode !== 0) {
        writer.uint32(8).int32(message.mode);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasesetScanMode();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.mode = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { mode: isSet8(object.mode) ? jonGuiDataLrfScanModesFromJSON(object.mode) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.mode !== 0) {
        obj.mode = jonGuiDataLrfScanModesToJSON(message.mode);
      }
      return obj;
    },
    create(base) {
      return setScanMode.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBasesetScanMode();
      message.mode = object.mode ?? 0;
      return message;
    }
  };
  function createBaseNewSession() {
    return {};
  }
  var NewSession = {
    encode(_5, writer = import_minimal8.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return NewSession.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseNewSession();
      return message;
    }
  };
  function isSet8(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.DayCamera.ts
  var index_cmd_DayCamera_exports = {};
  __export(index_cmd_DayCamera_exports, {
    Focus: () => Focus2,
    GetMeteo: () => GetMeteo6,
    GetPos: () => GetPos2,
    Halt: () => Halt3,
    HaltAll: () => HaltAll2,
    Move: () => Move2,
    NextZoomTablePos: () => NextZoomTablePos2,
    Photo: () => Photo2,
    PrevZoomTablePos: () => PrevZoomTablePos2,
    Root: () => Root8,
    SetAutoFocus: () => SetAutoFocus2,
    SetAutoIris: () => SetAutoIris,
    SetExposure: () => SetExposure,
    SetGain: () => SetGain,
    SetInfraRedFilter: () => SetInfraRedFilter,
    SetIris: () => SetIris,
    SetRecording: () => SetRecording2,
    SetValue: () => SetValue2,
    SetZoomTableValue: () => SetZoomTableValue2,
    Start: () => Start6,
    Stop: () => Stop6,
    SyncZoomToDayCamera: () => SyncZoomToDayCamera,
    Zoom: () => Zoom2
  });

  // frontend/ts/proto/jon/jon_shared_cmd_day_camera.ts
  var import_minimal9 = __toESM(require_minimal2());
  function createBaseSetValue2() {
    return { value: 0 };
  }
  var SetValue2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetValue2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetValue2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetValue2();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseMove2() {
    return { targetValue: 0, speed: 0 };
  }
  var Move2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.targetValue !== 0) {
        writer.uint32(13).float(message.targetValue);
      }
      if (message.speed !== 0) {
        writer.uint32(21).float(message.speed);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseMove2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.targetValue = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.speed = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        targetValue: isSet9(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet9(object.speed) ? globalThis.Number(object.speed) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.targetValue !== 0) {
        obj.targetValue = message.targetValue;
      }
      if (message.speed !== 0) {
        obj.speed = message.speed;
      }
      return obj;
    },
    create(base) {
      return Move2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseMove2();
      message.targetValue = object.targetValue ?? 0;
      message.speed = object.speed ?? 0;
      return message;
    }
  };
  function createBaseRoot8() {
    return {
      focus: void 0,
      zoom: void 0,
      setExposure: void 0,
      setGain: void 0,
      setIris: void 0,
      setAutoFocus: void 0,
      setRecording: void 0,
      setInfraRedFilter: void 0,
      start: void 0,
      stop: void 0,
      photo: void 0,
      setAutoIris: void 0,
      syncZoom: void 0,
      getPos: void 0,
      haltAll: void 0,
      getMeteo: void 0
    };
  }
  var Root8 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.focus !== void 0) {
        Focus2.encode(message.focus, writer.uint32(10).fork()).ldelim();
      }
      if (message.zoom !== void 0) {
        Zoom2.encode(message.zoom, writer.uint32(18).fork()).ldelim();
      }
      if (message.setExposure !== void 0) {
        SetExposure.encode(message.setExposure, writer.uint32(26).fork()).ldelim();
      }
      if (message.setGain !== void 0) {
        SetGain.encode(message.setGain, writer.uint32(34).fork()).ldelim();
      }
      if (message.setIris !== void 0) {
        SetIris.encode(message.setIris, writer.uint32(42).fork()).ldelim();
      }
      if (message.setAutoFocus !== void 0) {
        SetAutoFocus2.encode(message.setAutoFocus, writer.uint32(50).fork()).ldelim();
      }
      if (message.setRecording !== void 0) {
        SetRecording2.encode(message.setRecording, writer.uint32(58).fork()).ldelim();
      }
      if (message.setInfraRedFilter !== void 0) {
        SetInfraRedFilter.encode(message.setInfraRedFilter, writer.uint32(66).fork()).ldelim();
      }
      if (message.start !== void 0) {
        Start6.encode(message.start, writer.uint32(74).fork()).ldelim();
      }
      if (message.stop !== void 0) {
        Stop6.encode(message.stop, writer.uint32(82).fork()).ldelim();
      }
      if (message.photo !== void 0) {
        Photo2.encode(message.photo, writer.uint32(90).fork()).ldelim();
      }
      if (message.setAutoIris !== void 0) {
        SetAutoIris.encode(message.setAutoIris, writer.uint32(98).fork()).ldelim();
      }
      if (message.syncZoom !== void 0) {
        SyncZoomToDayCamera.encode(message.syncZoom, writer.uint32(106).fork()).ldelim();
      }
      if (message.getPos !== void 0) {
        GetPos2.encode(message.getPos, writer.uint32(114).fork()).ldelim();
      }
      if (message.haltAll !== void 0) {
        HaltAll2.encode(message.haltAll, writer.uint32(122).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo6.encode(message.getMeteo, writer.uint32(130).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot8();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.focus = Focus2.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.zoom = Zoom2.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.setExposure = SetExposure.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setGain = SetGain.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.setIris = SetIris.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.setAutoFocus = SetAutoFocus2.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.setRecording = SetRecording2.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.setInfraRedFilter = SetInfraRedFilter.decode(reader, reader.uint32());
            continue;
          case 9:
            if (tag !== 74) {
              break;
            }
            message.start = Start6.decode(reader, reader.uint32());
            continue;
          case 10:
            if (tag !== 82) {
              break;
            }
            message.stop = Stop6.decode(reader, reader.uint32());
            continue;
          case 11:
            if (tag !== 90) {
              break;
            }
            message.photo = Photo2.decode(reader, reader.uint32());
            continue;
          case 12:
            if (tag !== 98) {
              break;
            }
            message.setAutoIris = SetAutoIris.decode(reader, reader.uint32());
            continue;
          case 13:
            if (tag !== 106) {
              break;
            }
            message.syncZoom = SyncZoomToDayCamera.decode(reader, reader.uint32());
            continue;
          case 14:
            if (tag !== 114) {
              break;
            }
            message.getPos = GetPos2.decode(reader, reader.uint32());
            continue;
          case 15:
            if (tag !== 122) {
              break;
            }
            message.haltAll = HaltAll2.decode(reader, reader.uint32());
            continue;
          case 16:
            if (tag !== 130) {
              break;
            }
            message.getMeteo = GetMeteo6.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        focus: isSet9(object.focus) ? Focus2.fromJSON(object.focus) : void 0,
        zoom: isSet9(object.zoom) ? Zoom2.fromJSON(object.zoom) : void 0,
        setExposure: isSet9(object.setExposure) ? SetExposure.fromJSON(object.setExposure) : void 0,
        setGain: isSet9(object.setGain) ? SetGain.fromJSON(object.setGain) : void 0,
        setIris: isSet9(object.setIris) ? SetIris.fromJSON(object.setIris) : void 0,
        setAutoFocus: isSet9(object.setAutoFocus) ? SetAutoFocus2.fromJSON(object.setAutoFocus) : void 0,
        setRecording: isSet9(object.setRecording) ? SetRecording2.fromJSON(object.setRecording) : void 0,
        setInfraRedFilter: isSet9(object.setInfraRedFilter) ? SetInfraRedFilter.fromJSON(object.setInfraRedFilter) : void 0,
        start: isSet9(object.start) ? Start6.fromJSON(object.start) : void 0,
        stop: isSet9(object.stop) ? Stop6.fromJSON(object.stop) : void 0,
        photo: isSet9(object.photo) ? Photo2.fromJSON(object.photo) : void 0,
        setAutoIris: isSet9(object.setAutoIris) ? SetAutoIris.fromJSON(object.setAutoIris) : void 0,
        syncZoom: isSet9(object.syncZoom) ? SyncZoomToDayCamera.fromJSON(object.syncZoom) : void 0,
        getPos: isSet9(object.getPos) ? GetPos2.fromJSON(object.getPos) : void 0,
        haltAll: isSet9(object.haltAll) ? HaltAll2.fromJSON(object.haltAll) : void 0,
        getMeteo: isSet9(object.getMeteo) ? GetMeteo6.fromJSON(object.getMeteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.focus !== void 0) {
        obj.focus = Focus2.toJSON(message.focus);
      }
      if (message.zoom !== void 0) {
        obj.zoom = Zoom2.toJSON(message.zoom);
      }
      if (message.setExposure !== void 0) {
        obj.setExposure = SetExposure.toJSON(message.setExposure);
      }
      if (message.setGain !== void 0) {
        obj.setGain = SetGain.toJSON(message.setGain);
      }
      if (message.setIris !== void 0) {
        obj.setIris = SetIris.toJSON(message.setIris);
      }
      if (message.setAutoFocus !== void 0) {
        obj.setAutoFocus = SetAutoFocus2.toJSON(message.setAutoFocus);
      }
      if (message.setRecording !== void 0) {
        obj.setRecording = SetRecording2.toJSON(message.setRecording);
      }
      if (message.setInfraRedFilter !== void 0) {
        obj.setInfraRedFilter = SetInfraRedFilter.toJSON(message.setInfraRedFilter);
      }
      if (message.start !== void 0) {
        obj.start = Start6.toJSON(message.start);
      }
      if (message.stop !== void 0) {
        obj.stop = Stop6.toJSON(message.stop);
      }
      if (message.photo !== void 0) {
        obj.photo = Photo2.toJSON(message.photo);
      }
      if (message.setAutoIris !== void 0) {
        obj.setAutoIris = SetAutoIris.toJSON(message.setAutoIris);
      }
      if (message.syncZoom !== void 0) {
        obj.syncZoom = SyncZoomToDayCamera.toJSON(message.syncZoom);
      }
      if (message.getPos !== void 0) {
        obj.getPos = GetPos2.toJSON(message.getPos);
      }
      if (message.haltAll !== void 0) {
        obj.haltAll = HaltAll2.toJSON(message.haltAll);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo6.toJSON(message.getMeteo);
      }
      return obj;
    },
    create(base) {
      return Root8.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot8();
      message.focus = object.focus !== void 0 && object.focus !== null ? Focus2.fromPartial(object.focus) : void 0;
      message.zoom = object.zoom !== void 0 && object.zoom !== null ? Zoom2.fromPartial(object.zoom) : void 0;
      message.setExposure = object.setExposure !== void 0 && object.setExposure !== null ? SetExposure.fromPartial(object.setExposure) : void 0;
      message.setGain = object.setGain !== void 0 && object.setGain !== null ? SetGain.fromPartial(object.setGain) : void 0;
      message.setIris = object.setIris !== void 0 && object.setIris !== null ? SetIris.fromPartial(object.setIris) : void 0;
      message.setAutoFocus = object.setAutoFocus !== void 0 && object.setAutoFocus !== null ? SetAutoFocus2.fromPartial(object.setAutoFocus) : void 0;
      message.setRecording = object.setRecording !== void 0 && object.setRecording !== null ? SetRecording2.fromPartial(object.setRecording) : void 0;
      message.setInfraRedFilter = object.setInfraRedFilter !== void 0 && object.setInfraRedFilter !== null ? SetInfraRedFilter.fromPartial(object.setInfraRedFilter) : void 0;
      message.start = object.start !== void 0 && object.start !== null ? Start6.fromPartial(object.start) : void 0;
      message.stop = object.stop !== void 0 && object.stop !== null ? Stop6.fromPartial(object.stop) : void 0;
      message.photo = object.photo !== void 0 && object.photo !== null ? Photo2.fromPartial(object.photo) : void 0;
      message.setAutoIris = object.setAutoIris !== void 0 && object.setAutoIris !== null ? SetAutoIris.fromPartial(object.setAutoIris) : void 0;
      message.syncZoom = object.syncZoom !== void 0 && object.syncZoom !== null ? SyncZoomToDayCamera.fromPartial(object.syncZoom) : void 0;
      message.getPos = object.getPos !== void 0 && object.getPos !== null ? GetPos2.fromPartial(object.getPos) : void 0;
      message.haltAll = object.haltAll !== void 0 && object.haltAll !== null ? HaltAll2.fromPartial(object.haltAll) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo6.fromPartial(object.getMeteo) : void 0;
      return message;
    }
  };
  function createBaseGetPos2() {
    return {};
  }
  var GetPos2 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetPos2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetPos2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetPos2();
      return message;
    }
  };
  function createBaseHaltAll2() {
    return {};
  }
  var HaltAll2 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHaltAll2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltAll2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHaltAll2();
      return message;
    }
  };
  function createBaseFocus2() {
    return { setValue: void 0, move: void 0, halt: void 0 };
  }
  var Focus2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.setValue !== void 0) {
        SetValue2.encode(message.setValue, writer.uint32(10).fork()).ldelim();
      }
      if (message.move !== void 0) {
        Move2.encode(message.move, writer.uint32(18).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        Halt3.encode(message.halt, writer.uint32(26).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseFocus2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setValue = SetValue2.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.move = Move2.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.halt = Halt3.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setValue: isSet9(object.setValue) ? SetValue2.fromJSON(object.setValue) : void 0,
        move: isSet9(object.move) ? Move2.fromJSON(object.move) : void 0,
        halt: isSet9(object.halt) ? Halt3.fromJSON(object.halt) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setValue !== void 0) {
        obj.setValue = SetValue2.toJSON(message.setValue);
      }
      if (message.move !== void 0) {
        obj.move = Move2.toJSON(message.move);
      }
      if (message.halt !== void 0) {
        obj.halt = Halt3.toJSON(message.halt);
      }
      return obj;
    },
    create(base) {
      return Focus2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseFocus2();
      message.setValue = object.setValue !== void 0 && object.setValue !== null ? SetValue2.fromPartial(object.setValue) : void 0;
      message.move = object.move !== void 0 && object.move !== null ? Move2.fromPartial(object.move) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? Halt3.fromPartial(object.halt) : void 0;
      return message;
    }
  };
  function createBaseZoom2() {
    return {
      setValue: void 0,
      move: void 0,
      halt: void 0,
      setZoomTableValue: void 0,
      nextZoomTablePos: void 0,
      prevZoomTablePos: void 0
    };
  }
  var Zoom2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.setValue !== void 0) {
        SetValue2.encode(message.setValue, writer.uint32(10).fork()).ldelim();
      }
      if (message.move !== void 0) {
        Move2.encode(message.move, writer.uint32(18).fork()).ldelim();
      }
      if (message.halt !== void 0) {
        Halt3.encode(message.halt, writer.uint32(26).fork()).ldelim();
      }
      if (message.setZoomTableValue !== void 0) {
        SetZoomTableValue2.encode(message.setZoomTableValue, writer.uint32(34).fork()).ldelim();
      }
      if (message.nextZoomTablePos !== void 0) {
        NextZoomTablePos2.encode(message.nextZoomTablePos, writer.uint32(42).fork()).ldelim();
      }
      if (message.prevZoomTablePos !== void 0) {
        PrevZoomTablePos2.encode(message.prevZoomTablePos, writer.uint32(50).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseZoom2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setValue = SetValue2.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.move = Move2.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.halt = Halt3.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setZoomTableValue = SetZoomTableValue2.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.nextZoomTablePos = NextZoomTablePos2.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.prevZoomTablePos = PrevZoomTablePos2.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setValue: isSet9(object.setValue) ? SetValue2.fromJSON(object.setValue) : void 0,
        move: isSet9(object.move) ? Move2.fromJSON(object.move) : void 0,
        halt: isSet9(object.halt) ? Halt3.fromJSON(object.halt) : void 0,
        setZoomTableValue: isSet9(object.setZoomTableValue) ? SetZoomTableValue2.fromJSON(object.setZoomTableValue) : void 0,
        nextZoomTablePos: isSet9(object.nextZoomTablePos) ? NextZoomTablePos2.fromJSON(object.nextZoomTablePos) : void 0,
        prevZoomTablePos: isSet9(object.prevZoomTablePos) ? PrevZoomTablePos2.fromJSON(object.prevZoomTablePos) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setValue !== void 0) {
        obj.setValue = SetValue2.toJSON(message.setValue);
      }
      if (message.move !== void 0) {
        obj.move = Move2.toJSON(message.move);
      }
      if (message.halt !== void 0) {
        obj.halt = Halt3.toJSON(message.halt);
      }
      if (message.setZoomTableValue !== void 0) {
        obj.setZoomTableValue = SetZoomTableValue2.toJSON(message.setZoomTableValue);
      }
      if (message.nextZoomTablePos !== void 0) {
        obj.nextZoomTablePos = NextZoomTablePos2.toJSON(message.nextZoomTablePos);
      }
      if (message.prevZoomTablePos !== void 0) {
        obj.prevZoomTablePos = PrevZoomTablePos2.toJSON(message.prevZoomTablePos);
      }
      return obj;
    },
    create(base) {
      return Zoom2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseZoom2();
      message.setValue = object.setValue !== void 0 && object.setValue !== null ? SetValue2.fromPartial(object.setValue) : void 0;
      message.move = object.move !== void 0 && object.move !== null ? Move2.fromPartial(object.move) : void 0;
      message.halt = object.halt !== void 0 && object.halt !== null ? Halt3.fromPartial(object.halt) : void 0;
      message.setZoomTableValue = object.setZoomTableValue !== void 0 && object.setZoomTableValue !== null ? SetZoomTableValue2.fromPartial(object.setZoomTableValue) : void 0;
      message.nextZoomTablePos = object.nextZoomTablePos !== void 0 && object.nextZoomTablePos !== null ? NextZoomTablePos2.fromPartial(object.nextZoomTablePos) : void 0;
      message.prevZoomTablePos = object.prevZoomTablePos !== void 0 && object.prevZoomTablePos !== null ? PrevZoomTablePos2.fromPartial(object.prevZoomTablePos) : void 0;
      return message;
    }
  };
  function createBaseNextZoomTablePos2() {
    return {};
  }
  var NextZoomTablePos2 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseNextZoomTablePos2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return NextZoomTablePos2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseNextZoomTablePos2();
      return message;
    }
  };
  function createBasePrevZoomTablePos2() {
    return {};
  }
  var PrevZoomTablePos2 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePrevZoomTablePos2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PrevZoomTablePos2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePrevZoomTablePos2();
      return message;
    }
  };
  function createBaseSetExposure() {
    return { value: 0 };
  }
  var SetExposure = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetExposure();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetExposure.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetExposure();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetGain() {
    return { value: 0 };
  }
  var SetGain = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetGain();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetGain.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetGain();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetIris() {
    return { value: 0 };
  }
  var SetIris = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(13).float(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetIris();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.value = reader.float();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetIris.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetIris();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetAutoFocus2() {
    return { value: false };
  }
  var SetAutoFocus2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetAutoFocus2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetAutoFocus2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetAutoFocus2();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseSetRecording2() {
    return { value: false };
  }
  var SetRecording2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetRecording2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetRecording2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetRecording2();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseSetInfraRedFilter() {
    return { value: false };
  }
  var SetInfraRedFilter = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetInfraRedFilter();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetInfraRedFilter.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetInfraRedFilter();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseSetAutoIris() {
    return { value: false };
  }
  var SetAutoIris = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetAutoIris();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SetAutoIris.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetAutoIris();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseSyncZoomToDayCamera() {
    return { value: false };
  }
  var SyncZoomToDayCamera = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== false) {
        writer.uint32(8).bool(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSyncZoomToDayCamera();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.bool();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Boolean(object.value) : false };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== false) {
        obj.value = message.value;
      }
      return obj;
    },
    create(base) {
      return SyncZoomToDayCamera.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSyncZoomToDayCamera();
      message.value = object.value ?? false;
      return message;
    }
  };
  function createBaseSetZoomTableValue2() {
    return { value: 0 };
  }
  var SetZoomTableValue2 = {
    encode(message, writer = import_minimal9.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetZoomTableValue2();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet9(object.value) ? globalThis.Number(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = Math.round(message.value);
      }
      return obj;
    },
    create(base) {
      return SetZoomTableValue2.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetZoomTableValue2();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseStop6() {
    return {};
  }
  var Stop6 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStop6();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop6.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStop6();
      return message;
    }
  };
  function createBaseStart6() {
    return {};
  }
  var Start6 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseStart6();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start6.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStart6();
      return message;
    }
  };
  function createBasePhoto2() {
    return {};
  }
  var Photo2 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePhoto2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Photo2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePhoto2();
      return message;
    }
  };
  function createBaseHalt3() {
    return {};
  }
  var Halt3 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseHalt3();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Halt3.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseHalt3();
      return message;
    }
  };
  function createBaseGetMeteo6() {
    return {};
  }
  var GetMeteo6 = {
    encode(_5, writer = import_minimal9.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetMeteo6();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo6.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo6();
      return message;
    }
  };
  function isSet9(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_lrf_align.ts
  var import_minimal10 = __toESM(require_minimal2());
  function createBaseRoot9() {
    return { day: void 0, heat: void 0 };
  }
  var Root9 = {
    encode(message, writer = import_minimal10.default.Writer.create()) {
      if (message.day !== void 0) {
        Offsets.encode(message.day, writer.uint32(10).fork()).ldelim();
      }
      if (message.heat !== void 0) {
        Offsets.encode(message.heat, writer.uint32(18).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot9();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.day = Offsets.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.heat = Offsets.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        day: isSet10(object.day) ? Offsets.fromJSON(object.day) : void 0,
        heat: isSet10(object.heat) ? Offsets.fromJSON(object.heat) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.day !== void 0) {
        obj.day = Offsets.toJSON(message.day);
      }
      if (message.heat !== void 0) {
        obj.heat = Offsets.toJSON(message.heat);
      }
      return obj;
    },
    create(base) {
      return Root9.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot9();
      message.day = object.day !== void 0 && object.day !== null ? Offsets.fromPartial(object.day) : void 0;
      message.heat = object.heat !== void 0 && object.heat !== null ? Offsets.fromPartial(object.heat) : void 0;
      return message;
    }
  };
  function createBaseOffsets() {
    return { set: void 0, save: void 0, reset: void 0, shift: void 0 };
  }
  var Offsets = {
    encode(message, writer = import_minimal10.default.Writer.create()) {
      if (message.set !== void 0) {
        SetOffsets.encode(message.set, writer.uint32(10).fork()).ldelim();
      }
      if (message.save !== void 0) {
        SaveOffsets.encode(message.save, writer.uint32(18).fork()).ldelim();
      }
      if (message.reset !== void 0) {
        ResetOffsets.encode(message.reset, writer.uint32(26).fork()).ldelim();
      }
      if (message.shift !== void 0) {
        ShiftOffsetsBy.encode(message.shift, writer.uint32(34).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseOffsets();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.set = SetOffsets.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.save = SaveOffsets.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.reset = ResetOffsets.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.shift = ShiftOffsetsBy.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        set: isSet10(object.set) ? SetOffsets.fromJSON(object.set) : void 0,
        save: isSet10(object.save) ? SaveOffsets.fromJSON(object.save) : void 0,
        reset: isSet10(object.reset) ? ResetOffsets.fromJSON(object.reset) : void 0,
        shift: isSet10(object.shift) ? ShiftOffsetsBy.fromJSON(object.shift) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.set !== void 0) {
        obj.set = SetOffsets.toJSON(message.set);
      }
      if (message.save !== void 0) {
        obj.save = SaveOffsets.toJSON(message.save);
      }
      if (message.reset !== void 0) {
        obj.reset = ResetOffsets.toJSON(message.reset);
      }
      if (message.shift !== void 0) {
        obj.shift = ShiftOffsetsBy.toJSON(message.shift);
      }
      return obj;
    },
    create(base) {
      return Offsets.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseOffsets();
      message.set = object.set !== void 0 && object.set !== null ? SetOffsets.fromPartial(object.set) : void 0;
      message.save = object.save !== void 0 && object.save !== null ? SaveOffsets.fromPartial(object.save) : void 0;
      message.reset = object.reset !== void 0 && object.reset !== null ? ResetOffsets.fromPartial(object.reset) : void 0;
      message.shift = object.shift !== void 0 && object.shift !== null ? ShiftOffsetsBy.fromPartial(object.shift) : void 0;
      return message;
    }
  };
  function createBaseSetOffsets() {
    return { x: 0, y: 0 };
  }
  var SetOffsets = {
    encode(message, writer = import_minimal10.default.Writer.create()) {
      if (message.x !== 0) {
        writer.uint32(8).int32(message.x);
      }
      if (message.y !== 0) {
        writer.uint32(16).int32(message.y);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetOffsets();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.x = reader.int32();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.y = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        x: isSet10(object.x) ? globalThis.Number(object.x) : 0,
        y: isSet10(object.y) ? globalThis.Number(object.y) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.x !== 0) {
        obj.x = Math.round(message.x);
      }
      if (message.y !== 0) {
        obj.y = Math.round(message.y);
      }
      return obj;
    },
    create(base) {
      return SetOffsets.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetOffsets();
      message.x = object.x ?? 0;
      message.y = object.y ?? 0;
      return message;
    }
  };
  function createBaseShiftOffsetsBy() {
    return { x: 0, y: 0 };
  }
  var ShiftOffsetsBy = {
    encode(message, writer = import_minimal10.default.Writer.create()) {
      if (message.x !== 0) {
        writer.uint32(8).int32(message.x);
      }
      if (message.y !== 0) {
        writer.uint32(16).int32(message.y);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseShiftOffsetsBy();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.x = reader.int32();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.y = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        x: isSet10(object.x) ? globalThis.Number(object.x) : 0,
        y: isSet10(object.y) ? globalThis.Number(object.y) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.x !== 0) {
        obj.x = Math.round(message.x);
      }
      if (message.y !== 0) {
        obj.y = Math.round(message.y);
      }
      return obj;
    },
    create(base) {
      return ShiftOffsetsBy.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseShiftOffsetsBy();
      message.x = object.x ?? 0;
      message.y = object.y ?? 0;
      return message;
    }
  };
  function createBaseResetOffsets() {
    return {};
  }
  var ResetOffsets = {
    encode(_5, writer = import_minimal10.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseResetOffsets();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ResetOffsets.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseResetOffsets();
      return message;
    }
  };
  function createBaseSaveOffsets() {
    return {};
  }
  var SaveOffsets = {
    encode(_5, writer = import_minimal10.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSaveOffsets();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return SaveOffsets.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseSaveOffsets();
      return message;
    }
  };
  function isSet10(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_system.ts
  var import_minimal11 = __toESM(require_minimal2());
  function createBaseRoot10() {
    return { startAll: void 0, stopAll: void 0, reboot: void 0, powerOff: void 0 };
  }
  var Root10 = {
    encode(message, writer = import_minimal11.default.Writer.create()) {
      if (message.startAll !== void 0) {
        StartALl.encode(message.startAll, writer.uint32(10).fork()).ldelim();
      }
      if (message.stopAll !== void 0) {
        StopALl.encode(message.stopAll, writer.uint32(18).fork()).ldelim();
      }
      if (message.reboot !== void 0) {
        Reboot.encode(message.reboot, writer.uint32(26).fork()).ldelim();
      }
      if (message.powerOff !== void 0) {
        PowerOff.encode(message.powerOff, writer.uint32(34).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal11.default.Reader ? input : import_minimal11.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot10();
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
    fromJSON(object) {
      return {
        startAll: isSet11(object.startAll) ? StartALl.fromJSON(object.startAll) : void 0,
        stopAll: isSet11(object.stopAll) ? StopALl.fromJSON(object.stopAll) : void 0,
        reboot: isSet11(object.reboot) ? Reboot.fromJSON(object.reboot) : void 0,
        powerOff: isSet11(object.powerOff) ? PowerOff.fromJSON(object.powerOff) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.startAll !== void 0) {
        obj.startAll = StartALl.toJSON(message.startAll);
      }
      if (message.stopAll !== void 0) {
        obj.stopAll = StopALl.toJSON(message.stopAll);
      }
      if (message.reboot !== void 0) {
        obj.reboot = Reboot.toJSON(message.reboot);
      }
      if (message.powerOff !== void 0) {
        obj.powerOff = PowerOff.toJSON(message.powerOff);
      }
      return obj;
    },
    create(base) {
      return Root10.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot10();
      message.startAll = object.startAll !== void 0 && object.startAll !== null ? StartALl.fromPartial(object.startAll) : void 0;
      message.stopAll = object.stopAll !== void 0 && object.stopAll !== null ? StopALl.fromPartial(object.stopAll) : void 0;
      message.reboot = object.reboot !== void 0 && object.reboot !== null ? Reboot.fromPartial(object.reboot) : void 0;
      message.powerOff = object.powerOff !== void 0 && object.powerOff !== null ? PowerOff.fromPartial(object.powerOff) : void 0;
      return message;
    }
  };
  function createBaseStartALl() {
    return {};
  }
  var StartALl = {
    encode(_5, writer = import_minimal11.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal11.default.Reader ? input : import_minimal11.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return StartALl.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStartALl();
      return message;
    }
  };
  function createBaseStopALl() {
    return {};
  }
  var StopALl = {
    encode(_5, writer = import_minimal11.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal11.default.Reader ? input : import_minimal11.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return StopALl.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseStopALl();
      return message;
    }
  };
  function createBaseReboot() {
    return {};
  }
  var Reboot = {
    encode(_5, writer = import_minimal11.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal11.default.Reader ? input : import_minimal11.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Reboot.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseReboot();
      return message;
    }
  };
  function createBasePowerOff() {
    return {};
  }
  var PowerOff = {
    encode(_5, writer = import_minimal11.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal11.default.Reader ? input : import_minimal11.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerOff.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePowerOff();
      return message;
    }
  };
  function isSet11(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_environment.ts
  var import_minimal12 = __toESM(require_minimal2());
  function createBaseRoot11() {
    return {
      setWeatherCondition: void 0,
      setLightingCondition: void 0,
      setPrecipitationType: void 0,
      setGroundCondition: void 0,
      setOpticalVisibility: void 0,
      setThermalCondition: void 0,
      setNetworkStatus: void 0,
      setLightSourceCondition: void 0
    };
  }
  var Root11 = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.setWeatherCondition !== void 0) {
        SetWeatherCondition.encode(message.setWeatherCondition, writer.uint32(10).fork()).ldelim();
      }
      if (message.setLightingCondition !== void 0) {
        SetLightingCondition.encode(message.setLightingCondition, writer.uint32(18).fork()).ldelim();
      }
      if (message.setPrecipitationType !== void 0) {
        SetPrecipitationType.encode(message.setPrecipitationType, writer.uint32(26).fork()).ldelim();
      }
      if (message.setGroundCondition !== void 0) {
        SetGroundCondition.encode(message.setGroundCondition, writer.uint32(34).fork()).ldelim();
      }
      if (message.setOpticalVisibility !== void 0) {
        SetOpticalVisibility.encode(message.setOpticalVisibility, writer.uint32(42).fork()).ldelim();
      }
      if (message.setThermalCondition !== void 0) {
        SetThermalCondition.encode(message.setThermalCondition, writer.uint32(50).fork()).ldelim();
      }
      if (message.setNetworkStatus !== void 0) {
        SetNetworkStatus.encode(message.setNetworkStatus, writer.uint32(58).fork()).ldelim();
      }
      if (message.setLightSourceCondition !== void 0) {
        SetLightSourceCondition.encode(message.setLightSourceCondition, writer.uint32(66).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot11();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setWeatherCondition = SetWeatherCondition.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.setLightingCondition = SetLightingCondition.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.setPrecipitationType = SetPrecipitationType.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.setGroundCondition = SetGroundCondition.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.setOpticalVisibility = SetOpticalVisibility.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.setThermalCondition = SetThermalCondition.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.setNetworkStatus = SetNetworkStatus.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.setLightSourceCondition = SetLightSourceCondition.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setWeatherCondition: isSet12(object.setWeatherCondition) ? SetWeatherCondition.fromJSON(object.setWeatherCondition) : void 0,
        setLightingCondition: isSet12(object.setLightingCondition) ? SetLightingCondition.fromJSON(object.setLightingCondition) : void 0,
        setPrecipitationType: isSet12(object.setPrecipitationType) ? SetPrecipitationType.fromJSON(object.setPrecipitationType) : void 0,
        setGroundCondition: isSet12(object.setGroundCondition) ? SetGroundCondition.fromJSON(object.setGroundCondition) : void 0,
        setOpticalVisibility: isSet12(object.setOpticalVisibility) ? SetOpticalVisibility.fromJSON(object.setOpticalVisibility) : void 0,
        setThermalCondition: isSet12(object.setThermalCondition) ? SetThermalCondition.fromJSON(object.setThermalCondition) : void 0,
        setNetworkStatus: isSet12(object.setNetworkStatus) ? SetNetworkStatus.fromJSON(object.setNetworkStatus) : void 0,
        setLightSourceCondition: isSet12(object.setLightSourceCondition) ? SetLightSourceCondition.fromJSON(object.setLightSourceCondition) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setWeatherCondition !== void 0) {
        obj.setWeatherCondition = SetWeatherCondition.toJSON(message.setWeatherCondition);
      }
      if (message.setLightingCondition !== void 0) {
        obj.setLightingCondition = SetLightingCondition.toJSON(message.setLightingCondition);
      }
      if (message.setPrecipitationType !== void 0) {
        obj.setPrecipitationType = SetPrecipitationType.toJSON(message.setPrecipitationType);
      }
      if (message.setGroundCondition !== void 0) {
        obj.setGroundCondition = SetGroundCondition.toJSON(message.setGroundCondition);
      }
      if (message.setOpticalVisibility !== void 0) {
        obj.setOpticalVisibility = SetOpticalVisibility.toJSON(message.setOpticalVisibility);
      }
      if (message.setThermalCondition !== void 0) {
        obj.setThermalCondition = SetThermalCondition.toJSON(message.setThermalCondition);
      }
      if (message.setNetworkStatus !== void 0) {
        obj.setNetworkStatus = SetNetworkStatus.toJSON(message.setNetworkStatus);
      }
      if (message.setLightSourceCondition !== void 0) {
        obj.setLightSourceCondition = SetLightSourceCondition.toJSON(message.setLightSourceCondition);
      }
      return obj;
    },
    create(base) {
      return Root11.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot11();
      message.setWeatherCondition = object.setWeatherCondition !== void 0 && object.setWeatherCondition !== null ? SetWeatherCondition.fromPartial(object.setWeatherCondition) : void 0;
      message.setLightingCondition = object.setLightingCondition !== void 0 && object.setLightingCondition !== null ? SetLightingCondition.fromPartial(object.setLightingCondition) : void 0;
      message.setPrecipitationType = object.setPrecipitationType !== void 0 && object.setPrecipitationType !== null ? SetPrecipitationType.fromPartial(object.setPrecipitationType) : void 0;
      message.setGroundCondition = object.setGroundCondition !== void 0 && object.setGroundCondition !== null ? SetGroundCondition.fromPartial(object.setGroundCondition) : void 0;
      message.setOpticalVisibility = object.setOpticalVisibility !== void 0 && object.setOpticalVisibility !== null ? SetOpticalVisibility.fromPartial(object.setOpticalVisibility) : void 0;
      message.setThermalCondition = object.setThermalCondition !== void 0 && object.setThermalCondition !== null ? SetThermalCondition.fromPartial(object.setThermalCondition) : void 0;
      message.setNetworkStatus = object.setNetworkStatus !== void 0 && object.setNetworkStatus !== null ? SetNetworkStatus.fromPartial(object.setNetworkStatus) : void 0;
      message.setLightSourceCondition = object.setLightSourceCondition !== void 0 && object.setLightSourceCondition !== null ? SetLightSourceCondition.fromPartial(object.setLightSourceCondition) : void 0;
      return message;
    }
  };
  function createBaseSetWeatherCondition() {
    return { value: 0 };
  }
  var SetWeatherCondition = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetWeatherCondition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentWeatherConditionFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentWeatherConditionToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetWeatherCondition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetWeatherCondition();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetLightingCondition() {
    return { value: 0 };
  }
  var SetLightingCondition = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetLightingCondition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentLightingConditionFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentLightingConditionToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetLightingCondition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetLightingCondition();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetPrecipitationType() {
    return { value: 0 };
  }
  var SetPrecipitationType = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetPrecipitationType();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentPrecipitationTypeFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentPrecipitationTypeToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetPrecipitationType.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetPrecipitationType();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetGroundCondition() {
    return { value: 0 };
  }
  var SetGroundCondition = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetGroundCondition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentGroundConditionFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentGroundConditionToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetGroundCondition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetGroundCondition();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetOpticalVisibility() {
    return { value: 0 };
  }
  var SetOpticalVisibility = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetOpticalVisibility();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentOpticalVisibilityFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentOpticalVisibilityToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetOpticalVisibility.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetOpticalVisibility();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetThermalCondition() {
    return { value: 0 };
  }
  var SetThermalCondition = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetThermalCondition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentThermalConditionFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentThermalConditionToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetThermalCondition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetThermalCondition();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetNetworkStatus() {
    return { value: 0 };
  }
  var SetNetworkStatus = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetNetworkStatus();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentNetworkStatusFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentNetworkStatusToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetNetworkStatus.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetNetworkStatus();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function createBaseSetLightSourceCondition() {
    return { value: 0 };
  }
  var SetLightSourceCondition = {
    encode(message, writer = import_minimal12.default.Writer.create()) {
      if (message.value !== 0) {
        writer.uint32(8).int32(message.value);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetLightSourceCondition();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.value = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return { value: isSet12(object.value) ? jonGuiDataEnvironmentLightSourceFromJSON(object.value) : 0 };
    },
    toJSON(message) {
      const obj = {};
      if (message.value !== 0) {
        obj.value = jonGuiDataEnvironmentLightSourceToJSON(message.value);
      }
      return obj;
    },
    create(base) {
      return SetLightSourceCondition.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetLightSourceCondition();
      message.value = object.value ?? 0;
      return message;
    }
  };
  function isSet12(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd_power.ts
  var import_minimal13 = __toESM(require_minimal2());
  function createBaseRoot12() {
    return { setDeviceState: void 0, getMeteo: void 0 };
  }
  var Root12 = {
    encode(message, writer = import_minimal13.default.Writer.create()) {
      if (message.setDeviceState !== void 0) {
        SetDeviceState.encode(message.setDeviceState, writer.uint32(10).fork()).ldelim();
      }
      if (message.getMeteo !== void 0) {
        GetMeteo7.encode(message.getMeteo, writer.uint32(26).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot12();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.setDeviceState = SetDeviceState.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.getMeteo = GetMeteo7.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        setDeviceState: isSet13(object.setDeviceState) ? SetDeviceState.fromJSON(object.setDeviceState) : void 0,
        getMeteo: isSet13(object.getMeteo) ? GetMeteo7.fromJSON(object.getMeteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.setDeviceState !== void 0) {
        obj.setDeviceState = SetDeviceState.toJSON(message.setDeviceState);
      }
      if (message.getMeteo !== void 0) {
        obj.getMeteo = GetMeteo7.toJSON(message.getMeteo);
      }
      return obj;
    },
    create(base) {
      return Root12.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot12();
      message.setDeviceState = object.setDeviceState !== void 0 && object.setDeviceState !== null ? SetDeviceState.fromPartial(object.setDeviceState) : void 0;
      message.getMeteo = object.getMeteo !== void 0 && object.getMeteo !== null ? GetMeteo7.fromPartial(object.getMeteo) : void 0;
      return message;
    }
  };
  function createBaseGetMeteo7() {
    return {};
  }
  var GetMeteo7 = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseGetMeteo7();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo7.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseGetMeteo7();
      return message;
    }
  };
  function createBasePowerOn() {
    return {};
  }
  var PowerOn = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePowerOn();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerOn.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePowerOn();
      return message;
    }
  };
  function createBasePowerOff2() {
    return {};
  }
  var PowerOff2 = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePowerOff2();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerOff2.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePowerOff2();
      return message;
    }
  };
  function createBasePowerReset() {
    return {};
  }
  var PowerReset = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBasePowerReset();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerReset.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePowerReset();
      return message;
    }
  };
  function createBaseCanOn() {
    return {};
  }
  var CanOn = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCanOn();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CanOn.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCanOn();
      return message;
    }
  };
  function createBaseCanOff() {
    return {};
  }
  var CanOff = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCanOff();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CanOff.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCanOff();
      return message;
    }
  };
  function createBaseCanReset() {
    return {};
  }
  var CanReset = {
    encode(_5, writer = import_minimal13.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseCanReset();
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CanReset.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseCanReset();
      return message;
    }
  };
  function createBaseSetDeviceState() {
    return {
      device: 0,
      powerOn: void 0,
      powerOff: void 0,
      powerReset: void 0,
      canOn: void 0,
      canOff: void 0,
      canReset: void 0
    };
  }
  var SetDeviceState = {
    encode(message, writer = import_minimal13.default.Writer.create()) {
      if (message.device !== 0) {
        writer.uint32(8).int32(message.device);
      }
      if (message.powerOn !== void 0) {
        PowerOn.encode(message.powerOn, writer.uint32(18).fork()).ldelim();
      }
      if (message.powerOff !== void 0) {
        PowerOff2.encode(message.powerOff, writer.uint32(26).fork()).ldelim();
      }
      if (message.powerReset !== void 0) {
        PowerReset.encode(message.powerReset, writer.uint32(34).fork()).ldelim();
      }
      if (message.canOn !== void 0) {
        CanOn.encode(message.canOn, writer.uint32(42).fork()).ldelim();
      }
      if (message.canOff !== void 0) {
        CanOff.encode(message.canOff, writer.uint32(50).fork()).ldelim();
      }
      if (message.canReset !== void 0) {
        CanReset.encode(message.canReset, writer.uint32(58).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseSetDeviceState();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.device = reader.int32();
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.powerOn = PowerOn.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.powerOff = PowerOff2.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.powerReset = PowerReset.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.canOn = CanOn.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.canOff = CanOff.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.canReset = CanReset.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        device: isSet13(object.device) ? jonGuiDataPowerCanDeviceFromJSON(object.device) : 0,
        powerOn: isSet13(object.powerOn) ? PowerOn.fromJSON(object.powerOn) : void 0,
        powerOff: isSet13(object.powerOff) ? PowerOff2.fromJSON(object.powerOff) : void 0,
        powerReset: isSet13(object.powerReset) ? PowerReset.fromJSON(object.powerReset) : void 0,
        canOn: isSet13(object.canOn) ? CanOn.fromJSON(object.canOn) : void 0,
        canOff: isSet13(object.canOff) ? CanOff.fromJSON(object.canOff) : void 0,
        canReset: isSet13(object.canReset) ? CanReset.fromJSON(object.canReset) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.device !== 0) {
        obj.device = jonGuiDataPowerCanDeviceToJSON(message.device);
      }
      if (message.powerOn !== void 0) {
        obj.powerOn = PowerOn.toJSON(message.powerOn);
      }
      if (message.powerOff !== void 0) {
        obj.powerOff = PowerOff2.toJSON(message.powerOff);
      }
      if (message.powerReset !== void 0) {
        obj.powerReset = PowerReset.toJSON(message.powerReset);
      }
      if (message.canOn !== void 0) {
        obj.canOn = CanOn.toJSON(message.canOn);
      }
      if (message.canOff !== void 0) {
        obj.canOff = CanOff.toJSON(message.canOff);
      }
      if (message.canReset !== void 0) {
        obj.canReset = CanReset.toJSON(message.canReset);
      }
      return obj;
    },
    create(base) {
      return SetDeviceState.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseSetDeviceState();
      message.device = object.device ?? 0;
      message.powerOn = object.powerOn !== void 0 && object.powerOn !== null ? PowerOn.fromPartial(object.powerOn) : void 0;
      message.powerOff = object.powerOff !== void 0 && object.powerOff !== null ? PowerOff2.fromPartial(object.powerOff) : void 0;
      message.powerReset = object.powerReset !== void 0 && object.powerReset !== null ? PowerReset.fromPartial(object.powerReset) : void 0;
      message.canOn = object.canOn !== void 0 && object.canOn !== null ? CanOn.fromPartial(object.canOn) : void 0;
      message.canOff = object.canOff !== void 0 && object.canOff !== null ? CanOff.fromPartial(object.canOff) : void 0;
      message.canReset = object.canReset !== void 0 && object.canReset !== null ? CanReset.fromPartial(object.canReset) : void 0;
      return message;
    }
  };
  function isSet13(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_cmd.ts
  var import_minimal14 = __toESM(require_minimal2());
  function createBaseRoot13() {
    return {
      protocolVersion: 0,
      sessionId: 0,
      important: false,
      dayCamera: void 0,
      heatCamera: void 0,
      gps: void 0,
      compass: void 0,
      lrf: void 0,
      lrfCalib: void 0,
      rotary: void 0,
      osd: void 0,
      ping: void 0,
      noop: void 0,
      frozen: void 0,
      system: void 0,
      environment: void 0,
      geoTest: void 0,
      power: void 0
    };
  }
  var Root13 = {
    encode(message, writer = import_minimal14.default.Writer.create()) {
      if (message.protocolVersion !== 0) {
        writer.uint32(8).uint32(message.protocolVersion);
      }
      if (message.sessionId !== 0) {
        writer.uint32(16).uint32(message.sessionId);
      }
      if (message.important !== false) {
        writer.uint32(24).bool(message.important);
      }
      if (message.dayCamera !== void 0) {
        Root8.encode(message.dayCamera, writer.uint32(162).fork()).ldelim();
      }
      if (message.heatCamera !== void 0) {
        Root5.encode(message.heatCamera, writer.uint32(170).fork()).ldelim();
      }
      if (message.gps !== void 0) {
        Root.encode(message.gps, writer.uint32(178).fork()).ldelim();
      }
      if (message.compass !== void 0) {
        Root6.encode(message.compass, writer.uint32(186).fork()).ldelim();
      }
      if (message.lrf !== void 0) {
        Root7.encode(message.lrf, writer.uint32(194).fork()).ldelim();
      }
      if (message.lrfCalib !== void 0) {
        Root9.encode(message.lrfCalib, writer.uint32(202).fork()).ldelim();
      }
      if (message.rotary !== void 0) {
        Root4.encode(message.rotary, writer.uint32(210).fork()).ldelim();
      }
      if (message.osd !== void 0) {
        Root2.encode(message.osd, writer.uint32(218).fork()).ldelim();
      }
      if (message.ping !== void 0) {
        Ping.encode(message.ping, writer.uint32(226).fork()).ldelim();
      }
      if (message.noop !== void 0) {
        Noop.encode(message.noop, writer.uint32(234).fork()).ldelim();
      }
      if (message.frozen !== void 0) {
        Frozen.encode(message.frozen, writer.uint32(242).fork()).ldelim();
      }
      if (message.system !== void 0) {
        Root10.encode(message.system, writer.uint32(250).fork()).ldelim();
      }
      if (message.environment !== void 0) {
        Root11.encode(message.environment, writer.uint32(258).fork()).ldelim();
      }
      if (message.geoTest !== void 0) {
        Root3.encode(message.geoTest, writer.uint32(266).fork()).ldelim();
      }
      if (message.power !== void 0) {
        Root12.encode(message.power, writer.uint32(274).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal14.default.Reader ? input : import_minimal14.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRoot13();
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
            message.dayCamera = Root8.decode(reader, reader.uint32());
            continue;
          case 21:
            if (tag !== 170) {
              break;
            }
            message.heatCamera = Root5.decode(reader, reader.uint32());
            continue;
          case 22:
            if (tag !== 178) {
              break;
            }
            message.gps = Root.decode(reader, reader.uint32());
            continue;
          case 23:
            if (tag !== 186) {
              break;
            }
            message.compass = Root6.decode(reader, reader.uint32());
            continue;
          case 24:
            if (tag !== 194) {
              break;
            }
            message.lrf = Root7.decode(reader, reader.uint32());
            continue;
          case 25:
            if (tag !== 202) {
              break;
            }
            message.lrfCalib = Root9.decode(reader, reader.uint32());
            continue;
          case 26:
            if (tag !== 210) {
              break;
            }
            message.rotary = Root4.decode(reader, reader.uint32());
            continue;
          case 27:
            if (tag !== 218) {
              break;
            }
            message.osd = Root2.decode(reader, reader.uint32());
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
            message.system = Root10.decode(reader, reader.uint32());
            continue;
          case 32:
            if (tag !== 258) {
              break;
            }
            message.environment = Root11.decode(reader, reader.uint32());
            continue;
          case 33:
            if (tag !== 266) {
              break;
            }
            message.geoTest = Root3.decode(reader, reader.uint32());
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
    fromJSON(object) {
      return {
        protocolVersion: isSet14(object.protocolVersion) ? globalThis.Number(object.protocolVersion) : 0,
        sessionId: isSet14(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
        important: isSet14(object.important) ? globalThis.Boolean(object.important) : false,
        dayCamera: isSet14(object.dayCamera) ? Root8.fromJSON(object.dayCamera) : void 0,
        heatCamera: isSet14(object.heatCamera) ? Root5.fromJSON(object.heatCamera) : void 0,
        gps: isSet14(object.gps) ? Root.fromJSON(object.gps) : void 0,
        compass: isSet14(object.compass) ? Root6.fromJSON(object.compass) : void 0,
        lrf: isSet14(object.lrf) ? Root7.fromJSON(object.lrf) : void 0,
        lrfCalib: isSet14(object.lrfCalib) ? Root9.fromJSON(object.lrfCalib) : void 0,
        rotary: isSet14(object.rotary) ? Root4.fromJSON(object.rotary) : void 0,
        osd: isSet14(object.osd) ? Root2.fromJSON(object.osd) : void 0,
        ping: isSet14(object.ping) ? Ping.fromJSON(object.ping) : void 0,
        noop: isSet14(object.noop) ? Noop.fromJSON(object.noop) : void 0,
        frozen: isSet14(object.frozen) ? Frozen.fromJSON(object.frozen) : void 0,
        system: isSet14(object.system) ? Root10.fromJSON(object.system) : void 0,
        environment: isSet14(object.environment) ? Root11.fromJSON(object.environment) : void 0,
        geoTest: isSet14(object.geoTest) ? Root3.fromJSON(object.geoTest) : void 0,
        power: isSet14(object.power) ? Root12.fromJSON(object.power) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.protocolVersion !== 0) {
        obj.protocolVersion = Math.round(message.protocolVersion);
      }
      if (message.sessionId !== 0) {
        obj.sessionId = Math.round(message.sessionId);
      }
      if (message.important !== false) {
        obj.important = message.important;
      }
      if (message.dayCamera !== void 0) {
        obj.dayCamera = Root8.toJSON(message.dayCamera);
      }
      if (message.heatCamera !== void 0) {
        obj.heatCamera = Root5.toJSON(message.heatCamera);
      }
      if (message.gps !== void 0) {
        obj.gps = Root.toJSON(message.gps);
      }
      if (message.compass !== void 0) {
        obj.compass = Root6.toJSON(message.compass);
      }
      if (message.lrf !== void 0) {
        obj.lrf = Root7.toJSON(message.lrf);
      }
      if (message.lrfCalib !== void 0) {
        obj.lrfCalib = Root9.toJSON(message.lrfCalib);
      }
      if (message.rotary !== void 0) {
        obj.rotary = Root4.toJSON(message.rotary);
      }
      if (message.osd !== void 0) {
        obj.osd = Root2.toJSON(message.osd);
      }
      if (message.ping !== void 0) {
        obj.ping = Ping.toJSON(message.ping);
      }
      if (message.noop !== void 0) {
        obj.noop = Noop.toJSON(message.noop);
      }
      if (message.frozen !== void 0) {
        obj.frozen = Frozen.toJSON(message.frozen);
      }
      if (message.system !== void 0) {
        obj.system = Root10.toJSON(message.system);
      }
      if (message.environment !== void 0) {
        obj.environment = Root11.toJSON(message.environment);
      }
      if (message.geoTest !== void 0) {
        obj.geoTest = Root3.toJSON(message.geoTest);
      }
      if (message.power !== void 0) {
        obj.power = Root12.toJSON(message.power);
      }
      return obj;
    },
    create(base) {
      return Root13.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRoot13();
      message.protocolVersion = object.protocolVersion ?? 0;
      message.sessionId = object.sessionId ?? 0;
      message.important = object.important ?? false;
      message.dayCamera = object.dayCamera !== void 0 && object.dayCamera !== null ? Root8.fromPartial(object.dayCamera) : void 0;
      message.heatCamera = object.heatCamera !== void 0 && object.heatCamera !== null ? Root5.fromPartial(object.heatCamera) : void 0;
      message.gps = object.gps !== void 0 && object.gps !== null ? Root.fromPartial(object.gps) : void 0;
      message.compass = object.compass !== void 0 && object.compass !== null ? Root6.fromPartial(object.compass) : void 0;
      message.lrf = object.lrf !== void 0 && object.lrf !== null ? Root7.fromPartial(object.lrf) : void 0;
      message.lrfCalib = object.lrfCalib !== void 0 && object.lrfCalib !== null ? Root9.fromPartial(object.lrfCalib) : void 0;
      message.rotary = object.rotary !== void 0 && object.rotary !== null ? Root4.fromPartial(object.rotary) : void 0;
      message.osd = object.osd !== void 0 && object.osd !== null ? Root2.fromPartial(object.osd) : void 0;
      message.ping = object.ping !== void 0 && object.ping !== null ? Ping.fromPartial(object.ping) : void 0;
      message.noop = object.noop !== void 0 && object.noop !== null ? Noop.fromPartial(object.noop) : void 0;
      message.frozen = object.frozen !== void 0 && object.frozen !== null ? Frozen.fromPartial(object.frozen) : void 0;
      message.system = object.system !== void 0 && object.system !== null ? Root10.fromPartial(object.system) : void 0;
      message.environment = object.environment !== void 0 && object.environment !== null ? Root11.fromPartial(object.environment) : void 0;
      message.geoTest = object.geoTest !== void 0 && object.geoTest !== null ? Root3.fromPartial(object.geoTest) : void 0;
      message.power = object.power !== void 0 && object.power !== null ? Root12.fromPartial(object.power) : void 0;
      return message;
    }
  };
  function createBasePing() {
    return {};
  }
  var Ping = {
    encode(_5, writer = import_minimal14.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal14.default.Reader ? input : import_minimal14.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Ping.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBasePing();
      return message;
    }
  };
  function createBaseNoop() {
    return {};
  }
  var Noop = {
    encode(_5, writer = import_minimal14.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal14.default.Reader ? input : import_minimal14.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Noop.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseNoop();
      return message;
    }
  };
  function createBaseFrozen() {
    return {};
  }
  var Frozen = {
    encode(_5, writer = import_minimal14.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal14.default.Reader ? input : import_minimal14.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(_5) {
      return {};
    },
    toJSON(_5) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Frozen.fromPartial(base ?? {});
    },
    fromPartial(_5) {
      const message = createBaseFrozen();
      return message;
    }
  };
  function isSet14(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/cmd/cmdSender/cmdSenderShared.ts
  function createRootMessage() {
    return Root13.create();
  }
  function createAxisMessage() {
    return index_cmd_RotaryPlatform_exports.Axis.create();
  }
  function encodeCmdMessage(rootMsg) {
    return Root13.encode(rootMsg).finish();
  }
  function sendCmdMessage(rootMsg) {
    if (!rootMsg.ping) {
      console.log("Sending cmd message:", Root13.toJSON(rootMsg));
    }
    const encodedMessage = encodeCmdMessage(rootMsg);
    let shouldBuffer = true;
    if (rootMsg.ping) {
      shouldBuffer = false;
    }
    cmdChannel.postMessage({ pld: encodedMessage, shouldBuffer });
  }
  function sendCmdPing() {
    let rootMsg = createRootMessage();
    rootMsg.ping = Ping.create();
    sendCmdMessage(rootMsg);
  }
  function sendCmdFrozen() {
    let rootMsg = createRootMessage();
    rootMsg.frozen = Frozen.create();
    sendCmdMessage(rootMsg);
  }
  function sendRotaryAxisCommand(axisMessageContent) {
    let axisMsg = createAxisMessage();
    if (axisMessageContent.azimuth) {
      axisMsg.azimuth = axisMessageContent.azimuth;
    }
    if (axisMessageContent.elevation) {
      axisMsg.elevation = axisMessageContent.elevation;
    }
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ axis: axisMsg });
    sendCmdMessage(rootMsg);
  }
  var cmdChannel = new BroadcastChannel("cmd");

  // frontend/js/configFetcher.js
  async function fetchConfig(url) {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error(`HTTP error! Status: ${response.status}`);
      console.error("Config fetch error:", error);
      throw error;
    }
    return await response.json();
  }

  // frontend/js/canvasManager.js
  var CanvasManager = class _CanvasManager {
    #canvasElementId;
    #canvas;
    #worker;
    #dayConfig;
    #heatConfig;
    static #EVENT_VISIBILITY_CHANGE = "visibilitychange";
    static #EVENT_BEFORE_UNLOAD = "beforeunload";
    static #EVENT_RESIZE = "resize";
    static #EVENT_FULLSCREEN_CHANGE = "fullscreenchange";
    /**
     * Constructs an instance of CanvasManager, sets up the canvas and worker, and handles
     * configuration fetching.
     * @param {string} canvasElementId - The ID of the canvas element to initialize.
     * @throws {Error} If the canvas element cannot be found by the provided ID.
     */
    constructor(canvasElementId) {
      this.#workerState = "stopped";
      this.#canvasElementId = canvasElementId;
      this.#canvas = document.getElementById(canvasElementId);
      if (!this.#canvas) {
        throw new Error(`Canvas element with id '${canvasElementId}' not found.`);
      }
      this.#worker = null;
      this.#dayConfig = null;
      this.#heatConfig = null;
    }
    /**
     * Initializes the web worker, fetches video configurations, and posts initial configuration
     * to the worker. Sets up the canvas for offscreen rendering and replaces the original canvas
     * to handle potential WebGL context losses.
     * @returns {Promise<void>} A promise that resolves when the worker and canvas are fully initialized.
     */
    async initWorker() {
      this.#canvas.replaceWith(this.#canvas.cloneNode());
      this.#canvas = document.getElementById(this.#canvasElementId);
      this.offscreen = this.#canvas.transferControlToOffscreen();
      this.#worker = new Worker("./js/gl/canvasWorker.js", { type: "module" });
      try {
        this.#dayConfig = await fetchConfig("../config/video/day_config.json");
        this.#heatConfig = await fetchConfig("../config/video/heat_config.json");
        this.#worker.postMessage({
          type: "init",
          canvas: this.offscreen,
          dayConfig: this.#dayConfig,
          heatConfig: this.#heatConfig
        }, [this.offscreen]);
        this.sendResizeMessage();
      } catch (error) {
        console.error("Error fetching configs:", error);
        throw error;
      }
      this.setupEventListeners();
      this.#workerState = "running";
      requestAnimationFrame(this.animationFrameLoop.bind(this));
    }
    /**
     * Sets up necessary event listeners for managing canvas and worker lifecycle events, such as
     * resizing, visibility changes, and unloading events.
     */
    setupEventListeners() {
      this.#worker.onmessage = this.handleWorkerMessages.bind(this);
      window.addEventListener(_CanvasManager.#EVENT_RESIZE, this.sendResizeMessage.bind(this), { passive: true });
      document.addEventListener(_CanvasManager.#EVENT_VISIBILITY_CHANGE, this.handleVisibilityChange.bind(this));
      document.addEventListener(_CanvasManager.#EVENT_FULLSCREEN_CHANGE, this.sendResizeMessage.bind(this), { passive: true });
      window.addEventListener(_CanvasManager.#EVENT_BEFORE_UNLOAD, this.handleBeforeUnload.bind(this));
    }
    /**
     * Updates the canvas size and sends the current window size to the worker in a microtask to ensure it is processed after all
     * synchronously scheduled tasks.
     */
    sendResizeMessage() {
      queueMicrotask(() => {
        const pixelRatio = window.devicePixelRatio || 1;
        this.#worker.postMessage({
          type: "resize",
          width: window.innerWidth * pixelRatio,
          height: window.innerHeight * pixelRatio
        });
      });
    }
    /**
     * Animation frame loop to request new frames for rendering. This is a recursive function that
     * schedules itself as long as the manager is not flagged as unloading.
     */
    animationFrameLoop() {
      this.#worker.postMessage({ type: "animationFrame" });
      requestAnimationFrame(this.animationFrameLoop.bind(this));
    }
    /**
     * Sends a message to the worker to request the next video rect layout.
     */
    nextLayout() {
      this.#worker.postMessage({ type: "nextLayout" });
    }
    /**
     * Handles messages from the worker, including context loss which requires worker restart.
     * @param {MessageEvent} event - The message event from the worker.
     */
    handleWorkerMessages(event) {
      if (event.data.type === "contextLost") {
        console.log("Context lost in worker. Attempting to restart...");
        this.restartWorker().catch((error) => {
          console.error("Failed to restart worker:", error);
        });
      }
    }
    /**
     * Restarts the worker by terminating the current one and initializing a new one.
     * @returns {Promise<void>} A promise that resolves when the worker is successfully restarted.
     */
    async restartWorker() {
      this.#worker.terminate();
      this.#worker = null;
      await this.initWorker();
    }
    /**
      * Worker state flag
      * @type {'suspended'|'running'|'stopped'}
      * @private
    */
    #workerState = "stopped";
    /**
     *  Handles visibility changes to manage the worker's state effectively, pausing and resuming as necessary.
     */
    handleVisibilityChange() {
      if (document.visibilityState === "hidden" && this.#workerState === "running") {
        this.#workerState = "suspended";
        this.#worker.postMessage({ type: "suspend" });
      } else if (document.visibilityState !== "hidden" && this.#workerState === "suspended") {
        this.#workerState = "running";
        this.#worker.postMessage({ type: "resume" });
        this.sendResizeMessage();
      }
    }
    /**
     * Manages cleanup and setting a flag during the beforeunload event, to prevent unnecessary operations during page unload.
     * This ensures the worker is cleanly terminated and all resources are appropriately released.
     * @param {BeforeUnloadEvent} event - The beforeunload event object.
     */
    handleBeforeUnload(event) {
      this.#workerState = "stopped";
      this.#worker.postMessage({ type: "cleanUpResources" });
      event.preventDefault();
      event.returnValue = "";
    }
  };

  // frontend/ts/cmd/cmdSender/cmdRotary.ts
  function rotaryHaltAzimuth() {
    console.log("Sending halt azimuth command");
    let azimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      halt: index_cmd_RotaryPlatform_exports.HaltAzimuth.create()
    });
    sendRotaryAxisCommand({ azimuth: azimuthMsg });
  }
  function rotaryHaltElevation() {
    console.log("Sending halt elevation command");
    let elevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      halt: index_cmd_RotaryPlatform_exports.HaltElevation.create()
    });
    sendRotaryAxisCommand({ elevation: elevationMsg });
  }
  function rotaryHaltElevationAndAzimuth() {
    console.log("Sending halt elevation and azimuth command");
    let azimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      halt: index_cmd_RotaryPlatform_exports.HaltAzimuth.create()
    });
    let elevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      halt: index_cmd_RotaryPlatform_exports.HaltElevation.create()
    });
    sendRotaryAxisCommand({
      azimuth: azimuthMsg,
      elevation: elevationMsg
    });
  }
  function rotaryAzimuthRotate(speed, direction) {
    console.log(`Rotating azimuth continuously at speed ${speed} with direction ${direction}`);
    let rotateAzimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      rotate: index_cmd_RotaryPlatform_exports.RotateAzimuth.create({ speed, direction })
    });
    sendRotaryAxisCommand({ azimuth: rotateAzimuthMsg });
  }
  function rotaryElevationRotate(speed, direction) {
    console.log(`Rotating elevation continuously at speed ${speed} with direction ${direction}`);
    let rotateElevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      rotate: index_cmd_RotaryPlatform_exports.RotateElevation.create({ speed, direction })
    });
    sendRotaryAxisCommand({ elevation: rotateElevationMsg });
  }
  function rotateBoth(azimuthSpeed, azimuthDirection, elevationSpeed, elevationDirection) {
    console.log(`Rotating azimuth at speed ${azimuthSpeed} and elevation at speed ${elevationSpeed} and azimuth direction ${azimuthDirection} and elevation direction ${elevationDirection}`);
    let rotateElevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      rotate: index_cmd_RotaryPlatform_exports.RotateElevation.create({
        speed: elevationSpeed,
        direction: elevationDirection
      })
    });
    let rotateAzimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      rotate: index_cmd_RotaryPlatform_exports.RotateAzimuth.create({
        speed: azimuthSpeed,
        direction: azimuthDirection
      })
    });
    sendRotaryAxisCommand({
      elevation: rotateElevationMsg,
      azimuth: rotateAzimuthMsg
    });
  }

  // frontend/ts/gamepad/groups/RotaryControl.ts
  var Indices = {
    ROTARY_SPEED_MULTIPLIER_BUTTON: 6,
    // Bumper button
    ROTARY_AZIMUTH_STICK: 0,
    ROTARY_ELEVATION_STICK: 1
  };
  function inIndices(value) {
    return Object.values(Indices).includes(value);
  }
  var RotaryControl = class {
    constructor(day_cam_signal, heat_cam_signal) {
      this.deadZoneRadius = 0.15;
      this.curvatureCoefficient = 3;
      this.baseMaxSpeed = 0.35;
      this.bumperValue = 0;
      this.zoomSpeedCoefficientMin = 0.2;
      this.zoomSpeedCoefficientMax = 1;
      this.zoomThresholdLower = 0.5;
      this.zoomThresholdUpper = 0.9;
      this.lastStickValues = {};
      this.speeds = {
        azimuth: 0,
        elevation: 0
      };
      this.directions = {
        azimuth: 0 /* JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED */,
        elevation: 0 /* JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED */
      };
      this.day_cam_signal = day_cam_signal;
      this.heat_cam_signal = heat_cam_signal;
    }
    calculateZoomSpeedCoefficient() {
      const day_zoom_pos = this.day_cam_signal.value?.zoomPos || 0;
      const heat_zoom_pos = this.heat_cam_signal.value?.zoomPos || 0;
      const zoom_pos = Math.max(day_zoom_pos, heat_zoom_pos);
      if (zoom_pos <= this.zoomThresholdLower) {
        return this.zoomSpeedCoefficientMax;
      }
      if (zoom_pos >= this.zoomThresholdUpper) {
        return this.zoomSpeedCoefficientMin;
      }
      const normalizedZoom = (zoom_pos - this.zoomThresholdLower) / (this.zoomThresholdUpper - this.zoomThresholdLower);
      return this.zoomSpeedCoefficientMax - normalizedZoom * (this.zoomSpeedCoefficientMax - this.zoomSpeedCoefficientMin);
    }
    handleStickEvent(event) {
      if (!inIndices(event.index)) {
        return;
      }
      this.lastStickValues[event.index] = event.value;
      this.handleStickMovement();
    }
    handleButtonEvent(event) {
      if (event.index === Indices.ROTARY_SPEED_MULTIPLIER_BUTTON) {
        this.updateBumperValue(event.value);
      }
    }
    calculateSpeed(stickInput, bumperMultiplier) {
      const normalizedInput = Math.max(0, (stickInput - this.deadZoneRadius) / (1 - this.deadZoneRadius));
      let speedAdjustment = normalizedInput * this.baseMaxSpeed;
      if (normalizedInput > 0) {
        const speedBoost = bumperMultiplier * (1 - this.baseMaxSpeed);
        speedAdjustment += speedBoost;
      }
      speedAdjustment = Math.pow(speedAdjustment, this.curvatureCoefficient);
      speedAdjustment = Math.min(speedAdjustment, 1);
      const zoomSpeedCoefficient = this.calculateZoomSpeedCoefficient();
      return speedAdjustment * zoomSpeedCoefficient;
    }
    rotate() {
      if (this.speeds.azimuth === 0 && this.speeds.elevation === 0) {
        rotaryHaltElevationAndAzimuth();
        return;
      }
      if (this.speeds.azimuth > 0 && this.speeds.elevation > 0) {
        rotateBoth(
          this.speeds.azimuth,
          this.directions.azimuth,
          this.speeds.elevation,
          this.directions.elevation
        );
        return;
      }
      if (this.speeds.azimuth > 0) {
        rotaryAzimuthRotate(
          this.speeds.azimuth,
          this.directions.azimuth
        );
        rotaryHaltElevation();
        return;
      }
      if (this.speeds.elevation > 0) {
        rotaryElevationRotate(
          this.speeds.elevation,
          this.directions.elevation
        );
        rotaryHaltAzimuth();
        return;
      }
    }
    updateBumperValue(value) {
      this.bumperValue = value;
      this.handleStickMovement();
    }
    handleStickMovement() {
      const azimuthValue = this.lastStickValues[Indices.ROTARY_AZIMUTH_STICK] || 0;
      const elevationValue = this.lastStickValues[Indices.ROTARY_ELEVATION_STICK] || 0;
      const magnitude = Math.sqrt(azimuthValue * azimuthValue + elevationValue * elevationValue);
      if (magnitude < this.deadZoneRadius) {
        this.speeds.azimuth = 0;
        this.speeds.elevation = 0;
      } else {
        const normalizedAzimuth = azimuthValue / magnitude;
        const normalizedElevation = elevationValue / magnitude;
        const speed = this.calculateSpeed(magnitude, this.bumperValue);
        this.speeds.azimuth = Math.abs(normalizedAzimuth * speed);
        this.speeds.elevation = Math.abs(normalizedElevation * speed);
      }
      this.directions.azimuth = this.getDirection(azimuthValue);
      this.directions.elevation = this.getDirection(-elevationValue);
      this.rotate();
    }
    getDirection(value) {
      return value > 0 ? 1 /* JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE */ : 2 /* JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE */;
    }
  };

  // frontend/ts/cmd/cmdSender/cmdHeatCamera.ts
  function heatCameraSetAutoFocus(value) {
    console.log(`Heat Camera Setting auto focus to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ setAutoFocus: { value } });
    sendCmdMessage(rootMsg);
  }
  function heatCameraZoomIn() {
    console.log("Sending heatCamera zoom in");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoomIn: index_cmd_HeatCamera_exports.ZoomIn.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraZoomOut() {
    console.log("Sending heatCamera zoom out");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoomOut: index_cmd_HeatCamera_exports.ZoomOut.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraZoomStop() {
    console.log("Sending heatCamera zoom stop");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoomStop: index_cmd_HeatCamera_exports.ZoomStop.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraFocusStop() {
    console.log("Sending heatCamera focus stop");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ focusStop: index_cmd_HeatCamera_exports.FocusStop.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraFocusIn() {
    console.log("Sending heatCamera focus in");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ focusIn: index_cmd_HeatCamera_exports.FocusIn.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraFocusOut() {
    console.log("Sending heatCamera focus out");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ focusOut: index_cmd_HeatCamera_exports.FocusOut.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/gamepad/groups/HeatCameraControl.ts
  var Indices2 = {
    ZOOM_PLUS_BUTTON: 12,
    ZOOM_MINUS_BUTTON: 13,
    FOCUS_PLUS_BUTTON: 15,
    FOCUS_MINUS_BUTTON: 14,
    AUTO_FOCUS_BUTTON: 0
  };
  var HeatCameraControl = class {
    constructor() {
    }
    handleButtonEvent(event) {
      switch (event.index) {
        case Indices2.AUTO_FOCUS_BUTTON:
          heatCameraSetAutoFocus(true);
          break;
        case Indices2.ZOOM_PLUS_BUTTON:
          if (event.value === 1) {
            heatCameraZoomIn();
          } else {
            heatCameraZoomStop();
          }
          break;
        case Indices2.ZOOM_MINUS_BUTTON:
          if (event.value === 1) {
            heatCameraZoomOut();
          } else {
            heatCameraZoomStop();
          }
          break;
        case Indices2.FOCUS_PLUS_BUTTON:
          if (event.value === 1) {
            heatCameraFocusIn();
          } else {
            heatCameraFocusStop();
          }
          break;
        case Indices2.FOCUS_MINUS_BUTTON:
          if (event.value === 1) {
            heatCameraFocusOut();
          } else {
            heatCameraFocusStop();
          }
          break;
        default:
          break;
      }
    }
  };

  // frontend/ts/cmd/cmdSender/cmdDayCamera.ts
  function dayCameraMoveFocus(targetValue, speed) {
    console.log(`Moving day camera focus to ${targetValue} at speed ${speed}`);
    let focus = index_cmd_DayCamera_exports.Focus.create({ move: { targetValue, speed } });
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ focus });
    sendCmdMessage(rootMsg);
  }
  function dayCameraHaltFocus() {
    console.log("Halting day camera focus");
    let focus = index_cmd_DayCamera_exports.Focus.create({ halt: {} });
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ focus });
    sendCmdMessage(rootMsg);
  }
  function dayCameraMoveZoom(targetValue, speed) {
    console.log(`Moving day camera zoom to ${targetValue} at speed ${speed}`);
    let zoom = index_cmd_DayCamera_exports.Zoom.create({ move: { targetValue, speed } });
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function dayCameraHaltZoom() {
    console.log("Halting day camera zoom");
    let zoom = index_cmd_DayCamera_exports.Zoom.create({ halt: {} });
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/gamepad/groups/DayCameraControl.ts
  var Indices3 = {
    ZOOM_FOCUS_SPEED_MULTIPLIER_BUTTON: 7,
    ZOOM_CONTROL_STICK: 3,
    FOCUS_CONTROL_STICK: 2
  };
  function inIndices2(value) {
    return Object.values(Indices3).includes(value);
  }
  var DayCameraControl = class {
    constructor() {
      this.sensitivityThreshold = 5e-4;
      this.curvatureCoefficient = 3;
      this.baseMaxSpeed = 0.35;
      this.bumperValue = 0;
      this.lastStickValues = {};
      this.activeAxis = null;
      this.activeSpeed = 0;
      this.activeDirection = 0;
    }
    handleStickEvent(event) {
      if (!inIndices2(event.index)) {
        return;
      }
      this.lastStickValues[event.index] = event.value;
      this.handleStickMovement();
    }
    handleButtonEvent(event) {
      if (event.index === Indices3.ZOOM_FOCUS_SPEED_MULTIPLIER_BUTTON) {
        this.updateBumperValue(event.value);
      }
    }
    calculateSpeed(stickInput, bumperMultiplier) {
      const normalizedInput = Math.abs(stickInput);
      let speedAdjustment = normalizedInput * this.baseMaxSpeed;
      if (normalizedInput > 0) {
        const speedBoost = bumperMultiplier * (1 - this.baseMaxSpeed);
        speedAdjustment += speedBoost;
      }
      speedAdjustment = Math.pow(speedAdjustment, this.curvatureCoefficient);
      return Math.min(speedAdjustment, 1);
    }
    MoveLenses() {
      if (this.activeAxis === null || this.activeSpeed < this.sensitivityThreshold) {
        dayCameraHaltZoom();
        dayCameraHaltFocus();
        return;
      }
      if (this.activeAxis === "zoom") {
        dayCameraMoveZoom(this.activeDirection, this.activeSpeed);
        dayCameraHaltFocus();
      } else {
        dayCameraMoveFocus(this.activeDirection, this.activeSpeed);
        dayCameraHaltZoom();
      }
    }
    updateBumperValue(value) {
      this.bumperValue = value;
      this.handleStickMovement();
    }
    handleStickMovement() {
      const zoomValue = this.lastStickValues[Indices3.ZOOM_CONTROL_STICK] || 0;
      const focusValue = this.lastStickValues[Indices3.FOCUS_CONTROL_STICK] || 0;
      if (Math.abs(zoomValue) > Math.abs(focusValue)) {
        this.activeAxis = "zoom";
        this.activeSpeed = this.calculateSpeed(zoomValue, this.bumperValue);
        this.activeDirection = zoomValue > 0 ? 0 : 1;
      } else if (Math.abs(focusValue) > Math.abs(zoomValue)) {
        this.activeAxis = "focus";
        this.activeSpeed = this.calculateSpeed(focusValue, this.bumperValue);
        this.activeDirection = focusValue > 0 ? 1 : 0;
      } else {
        this.activeAxis = null;
        this.activeSpeed = 0;
        this.activeDirection = 0;
      }
      this.MoveLenses();
    }
  };

  // frontend/ts/cmd/cmdSender/cmdLRF.ts
  function lrfScanOn() {
    console.log("Sending LRF scan on");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ scanOn: index_cmd_Lrf_exports.ScanOn.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfScanOff() {
    console.log("Sending LRF scan off");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ scanOff: index_cmd_Lrf_exports.ScanOff.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfMeasure() {
    console.log("Sending LRF measure");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ measure: index_cmd_Lrf_exports.Measure.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfTargetDesignatorOff() {
    console.log("Sending LRF target designator off");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ targetDesignatorOff: index_cmd_Lrf_exports.TargetDesignatorOff.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfTargetDesignatorOnModeA() {
    console.log("Sending LRF target designator on mode A");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ targetDesignatorOnModeA: index_cmd_Lrf_exports.TargetDesignatorOnModeA.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdSender/cmdOSD.ts
  function OSDShowDefaultScreen() {
    console.log("Sending show default screen");
    let rootMsg = createRootMessage();
    rootMsg.osd = index_cmd_OSD_exports.Root.create({ showDefaultScreen: index_cmd_OSD_exports.ShowDefaultScreen.create() });
    sendCmdMessage(rootMsg);
  }
  function OSDShowLRFMeasureScreen() {
    console.log("Sending show LRF measure screen");
    let rootMsg = createRootMessage();
    rootMsg.osd = index_cmd_OSD_exports.Root.create({ showLrfMeasureScreen: index_cmd_OSD_exports.ShowLRFMeasureScreen.create() });
    sendCmdMessage(rootMsg);
  }
  function OSDShowLRFResultScreen() {
    console.log("Sending show LRF result screen");
    let rootMsg = createRootMessage();
    rootMsg.osd = index_cmd_OSD_exports.Root.create({ showLrfResultScreen: index_cmd_OSD_exports.ShowLRFResultScreen.create() });
    sendCmdMessage(rootMsg);
  }
  function OSDShowLRFResultSimplifiedScreen() {
    console.log("Sending show LRF result simplified screen");
    let rootMsg = createRootMessage();
    rootMsg.osd = index_cmd_OSD_exports.Root.create({ showLrfResultSimplifiedScreen: index_cmd_OSD_exports.ShowLRFResultSimplifiedScreen.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/gamepad/groups/LRFControl.ts
  var Indices4 = {
    MEASURE_BUTTON: 4,
    POINTER_BUTTON: 3
  };
  var LRFControl = class {
    // Holds the timeout ID for the long press
    constructor() {
      this.pressStartTime = null;
      this.state = "Idle";
      this.longPressThreshold = 500;
      // Milliseconds for determining long press
      this.longPressTimer = null;
    }
    handleButtonEvent(event) {
      if (event.index !== Indices4.MEASURE_BUTTON && event.index !== Indices4.POINTER_BUTTON) return;
      if (event.index === Indices4.MEASURE_BUTTON) {
        if (event.value === 1) {
          this.pressStartTime = Date.now();
          this.state = "Measuring";
          OSDShowLRFMeasureScreen();
          this.startLongPressCheck();
        } else if (event.value === 0) {
          this.clearLongPressCheck();
          if (this.state === "Scanning") {
            this.stopScanning();
          } else if (Date.now() - this.pressStartTime < this.longPressThreshold) {
            this.measure();
          }
          this.pressStartTime = null;
        }
      }
      if (event.index === Indices4.POINTER_BUTTON) {
        if (event.value === 1) {
          lrfTargetDesignatorOnModeA();
        } else {
          lrfTargetDesignatorOff();
        }
      }
    }
    startLongPressCheck() {
      this.clearLongPressCheck();
      this.longPressTimer = window.setTimeout(() => {
        if (this.state === "Measuring") {
          this.startScanning();
        }
      }, this.longPressThreshold);
    }
    clearLongPressCheck() {
      if (this.longPressTimer !== null) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    }
    startScanning() {
      this.state = "Scanning";
      lrfScanOn();
      OSDShowLRFResultSimplifiedScreen();
    }
    stopScanning() {
      lrfScanOff();
    }
    measure() {
      lrfMeasure();
      OSDShowLRFResultScreen();
      this.state = "Idle";
    }
  };

  // frontend/ts/gamepad/groups/OSDControl.ts
  var Indices5 = {
    EXIT_BUTTON: 8,
    NEXT_OSD_LAYOUT: 5
  };
  var OSDControl = class {
    constructor(options) {
      this.nextLayout = options.nextLayout;
    }
    handleButtonEvent(event) {
      switch (event.index) {
        case Indices5.EXIT_BUTTON:
          if (event.value === 1) OSDShowDefaultScreen();
          break;
        case Indices5.NEXT_OSD_LAYOUT:
          if (event.value === 1) this.nextLayout();
          break;
      }
    }
  };

  // frontend/ts/gamepad/GamepadManager.ts
  var GamepadManager = class {
    constructor(callback) {
      this.axisSensitivity = 2;
      this.buttonSensitivity = 2;
      this.buttonThreshold = 0.1;
      this.axisThreshold = 0.25;
      this.queryRate = 33;
      this.loop = null;
      this.prevButtonValues = /* @__PURE__ */ new Map();
      this.prevAxisValues = /* @__PURE__ */ new Map();
      this.callback = callback;
      window.addEventListener("gamepadconnected", this.onGamepadEvent.bind(this));
      window.addEventListener("gamepaddisconnected", this.onGamepadEvent.bind(this));
    }
    setQueryRate(rate) {
      this.queryRate = rate;
      if (this.loop) {
        this.stopLoop();
        this.startLoopIfNeeded();
      }
    }
    onGamepadEvent() {
      this.startLoopIfNeeded();
    }
    getGamepads() {
      return navigator.getGamepads ? Array.from(navigator.getGamepads()) : [];
    }
    startLoopIfNeeded() {
      const gamepads = this.getGamepads().filter((gp) => gp !== null);
      if (gamepads.length > 0 && !this.loop) {
        this.loop = window.setTimeout(() => this.gamepadLoop(), this.queryRate);
      } else if (gamepads.length === 0 && this.loop) {
        this.stopLoop();
      }
    }
    normalizeValue(value, threshold) {
      if (Math.abs(value) < threshold) return 0;
      const sign = Math.sign(value);
      const normalized = (Math.abs(value) - threshold) / (1 - threshold);
      return sign * normalized;
    }
    roundValue(value, sensitivity) {
      const factor = Math.pow(10, sensitivity);
      return Math.round(value * factor) / factor;
    }
    handleButtons(gamepad) {
      const prevValues = this.prevButtonValues.get(gamepad.index) || [];
      gamepad.buttons.forEach((button, i8) => {
        const rawValue = button.value;
        const normalizedValue = this.normalizeValue(rawValue, this.buttonThreshold);
        const roundedValue = this.roundValue(normalizedValue, this.buttonSensitivity);
        const prevRoundedValue = prevValues[i8] || 0;
        if (!this.areFloatsEqual(roundedValue, prevRoundedValue)) {
          this.callback({ type: "button", index: i8, value: roundedValue });
          prevValues[i8] = roundedValue;
        }
      });
      this.prevButtonValues.set(gamepad.index, prevValues);
    }
    handleSticks(gamepad) {
      const prevValues = this.prevAxisValues.get(gamepad.index) || [];
      gamepad.axes.forEach((axis, i8) => {
        const normalizedValue = this.normalizeValue(axis, this.axisThreshold);
        const roundedValue = this.roundValue(normalizedValue, this.axisSensitivity);
        const prevRoundedValue = prevValues[i8] || 0;
        if (!this.areFloatsEqual(roundedValue, prevRoundedValue)) {
          this.callback({ type: "stick", index: i8, value: roundedValue });
          prevValues[i8] = roundedValue;
        }
      });
      this.prevAxisValues.set(gamepad.index, prevValues);
    }
    areFloatsEqual(a6, b4, epsilon = 1e-5) {
      return Math.abs(a6 - b4) < epsilon;
    }
    gamepadLoop() {
      this.getGamepads().forEach((gamepad) => {
        if (gamepad) {
          this.handleButtons(gamepad);
          this.handleSticks(gamepad);
        }
      });
      this.loop = window.setTimeout(() => this.gamepadLoop(), this.queryRate);
    }
    stopLoop() {
      if (this.loop) {
        clearTimeout(this.loop);
        this.loop = null;
      }
    }
  };

  // frontend/ts/gamepad/GamepadBindings.ts
  var InputDeviceManager = class {
    constructor(options) {
      this.heatCamera = new HeatCameraControl();
      this.dayCamera = new DayCameraControl();
      this.lrf = new LRFControl();
      this.gamepadManager = new GamepadManager(this.handleGamepadEvent.bind(this));
      this.initGamepadManager();
      this.osd = new OSDControl({ nextLayout: options.nextLayout });
      this.rotary = new RotaryControl(options.day_cam_signal, options.heat_cam_signal);
    }
    handleGamepadEvent(event) {
      if (!document.hasFocus()) {
        return;
      }
      if (event.type === "button") {
        this.handleButtonEvent(event);
        this.heatCamera.handleButtonEvent(event);
        this.dayCamera.handleButtonEvent(event);
        this.lrf.handleButtonEvent(event);
        this.osd.handleButtonEvent(event);
      } else if (event.type === "stick") {
        this.handleStickEvent(event);
        this.dayCamera.handleStickEvent(event);
      }
    }
    handleStickEvent(event) {
      console.log(`Stick ${event.index} value: ${event.value}`);
      this.rotary.handleStickEvent(event);
    }
    handleButtonEvent(event) {
      console.log(`Button ${event.index} value: ${event.value}`);
      this.rotary.handleButtonEvent(event);
    }
    initGamepadManager() {
      this.gamepadManager.setQueryRate(33);
    }
  };

  // frontend/node_modules/@preact/signals-core/dist/signals-core.module.js
  var i = Symbol.for("preact-signals");
  function t() {
    if (!(s > 1)) {
      var i8, t8 = false;
      while (void 0 !== h) {
        var r9 = h;
        h = void 0;
        f++;
        while (void 0 !== r9) {
          var o7 = r9.o;
          r9.o = void 0;
          r9.f &= -3;
          if (!(8 & r9.f) && c(r9)) try {
            r9.c();
          } catch (r10) {
            if (!t8) {
              i8 = r10;
              t8 = true;
            }
          }
          r9 = o7;
        }
      }
      f = 0;
      s--;
      if (t8) throw i8;
    } else s--;
  }
  var o = void 0;
  var h = void 0;
  var s = 0;
  var f = 0;
  var v = 0;
  function e(i8) {
    if (void 0 !== o) {
      var t8 = i8.n;
      if (void 0 === t8 || t8.t !== o) {
        t8 = { i: 0, S: i8, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t8 };
        if (void 0 !== o.s) o.s.n = t8;
        o.s = t8;
        i8.n = t8;
        if (32 & o.f) i8.S(t8);
        return t8;
      } else if (-1 === t8.i) {
        t8.i = 0;
        if (void 0 !== t8.n) {
          t8.n.p = t8.p;
          if (void 0 !== t8.p) t8.p.n = t8.n;
          t8.p = o.s;
          t8.n = void 0;
          o.s.n = t8;
          o.s = t8;
        }
        return t8;
      }
    }
  }
  function u(i8) {
    this.v = i8;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  u.prototype.brand = i;
  u.prototype.h = function() {
    return true;
  };
  u.prototype.S = function(i8) {
    if (this.t !== i8 && void 0 === i8.e) {
      i8.x = this.t;
      if (void 0 !== this.t) this.t.e = i8;
      this.t = i8;
    }
  };
  u.prototype.U = function(i8) {
    if (void 0 !== this.t) {
      var t8 = i8.e, r9 = i8.x;
      if (void 0 !== t8) {
        t8.x = r9;
        i8.e = void 0;
      }
      if (void 0 !== r9) {
        r9.e = t8;
        i8.x = void 0;
      }
      if (i8 === this.t) this.t = r9;
    }
  };
  u.prototype.subscribe = function(i8) {
    var t8 = this;
    return E(function() {
      var r9 = t8.value, n7 = o;
      o = void 0;
      try {
        i8(r9);
      } finally {
        o = n7;
      }
    });
  };
  u.prototype.valueOf = function() {
    return this.value;
  };
  u.prototype.toString = function() {
    return this.value + "";
  };
  u.prototype.toJSON = function() {
    return this.value;
  };
  u.prototype.peek = function() {
    var i8 = o;
    o = void 0;
    try {
      return this.value;
    } finally {
      o = i8;
    }
  };
  Object.defineProperty(u.prototype, "value", { get: function() {
    var i8 = e(this);
    if (void 0 !== i8) i8.i = this.i;
    return this.v;
  }, set: function(i8) {
    if (i8 !== this.v) {
      if (f > 100) throw new Error("Cycle detected");
      this.v = i8;
      this.i++;
      v++;
      s++;
      try {
        for (var r9 = this.t; void 0 !== r9; r9 = r9.x) r9.t.N();
      } finally {
        t();
      }
    }
  } });
  function d(i8) {
    return new u(i8);
  }
  function c(i8) {
    for (var t8 = i8.s; void 0 !== t8; t8 = t8.n) if (t8.S.i !== t8.i || !t8.S.h() || t8.S.i !== t8.i) return true;
    return false;
  }
  function a(i8) {
    for (var t8 = i8.s; void 0 !== t8; t8 = t8.n) {
      var r9 = t8.S.n;
      if (void 0 !== r9) t8.r = r9;
      t8.S.n = t8;
      t8.i = -1;
      if (void 0 === t8.n) {
        i8.s = t8;
        break;
      }
    }
  }
  function l(i8) {
    var t8 = i8.s, r9 = void 0;
    while (void 0 !== t8) {
      var o7 = t8.p;
      if (-1 === t8.i) {
        t8.S.U(t8);
        if (void 0 !== o7) o7.n = t8.n;
        if (void 0 !== t8.n) t8.n.p = o7;
      } else r9 = t8;
      t8.S.n = t8.r;
      if (void 0 !== t8.r) t8.r = void 0;
      t8 = o7;
    }
    i8.s = r9;
  }
  function y(i8) {
    u.call(this, void 0);
    this.x = i8;
    this.s = void 0;
    this.g = v - 1;
    this.f = 4;
  }
  (y.prototype = new u()).h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === v) return true;
    this.g = v;
    this.f |= 1;
    if (this.i > 0 && !c(this)) {
      this.f &= -2;
      return true;
    }
    var i8 = o;
    try {
      a(this);
      o = this;
      var t8 = this.x();
      if (16 & this.f || this.v !== t8 || 0 === this.i) {
        this.v = t8;
        this.f &= -17;
        this.i++;
      }
    } catch (i9) {
      this.v = i9;
      this.f |= 16;
      this.i++;
    }
    o = i8;
    l(this);
    this.f &= -2;
    return true;
  };
  y.prototype.S = function(i8) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t8 = this.s; void 0 !== t8; t8 = t8.n) t8.S.S(t8);
    }
    u.prototype.S.call(this, i8);
  };
  y.prototype.U = function(i8) {
    if (void 0 !== this.t) {
      u.prototype.U.call(this, i8);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t8 = this.s; void 0 !== t8; t8 = t8.n) t8.S.U(t8);
      }
    }
  };
  y.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i8 = this.t; void 0 !== i8; i8 = i8.x) i8.t.N();
    }
  };
  Object.defineProperty(y.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i8 = e(this);
    this.h();
    if (void 0 !== i8) i8.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function _(i8) {
    var r9 = i8.u;
    i8.u = void 0;
    if ("function" == typeof r9) {
      s++;
      var n7 = o;
      o = void 0;
      try {
        r9();
      } catch (t8) {
        i8.f &= -2;
        i8.f |= 8;
        g(i8);
        throw t8;
      } finally {
        o = n7;
        t();
      }
    }
  }
  function g(i8) {
    for (var t8 = i8.s; void 0 !== t8; t8 = t8.n) t8.S.U(t8);
    i8.x = void 0;
    i8.s = void 0;
    _(i8);
  }
  function p(i8) {
    if (o !== this) throw new Error("Out-of-order effect");
    l(this);
    o = i8;
    this.f &= -2;
    if (8 & this.f) g(this);
    t();
  }
  function b(i8) {
    this.x = i8;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  b.prototype.c = function() {
    var i8 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t8 = this.x();
      if ("function" == typeof t8) this.u = t8;
    } finally {
      i8();
    }
  };
  b.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    _(this);
    a(this);
    s++;
    var i8 = o;
    o = this;
    return p.bind(this, i8);
  };
  b.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = h;
      h = this;
    }
  };
  b.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) g(this);
  };
  function E(i8) {
    var t8 = new b(i8);
    try {
      t8.c();
    } catch (i9) {
      t8.d();
      throw i9;
    }
    return t8.d.bind(t8);
  }

  // frontend/node_modules/@lit-labs/preact-signals/node_modules/lit/node_modules/lit-html/directive.js
  var t2 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e2 = (t8) => (...e9) => ({ _$litDirective$: t8, values: e9 });
  var i2 = class {
    constructor(t8) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t8, e9, i8) {
      this._$Ct = t8, this._$AM = e9, this._$Ci = i8;
    }
    _$AS(t8, e9) {
      return this.update(t8, e9);
    }
    update(t8, e9) {
      return this.render(...e9);
    }
  };

  // frontend/node_modules/@lit-labs/preact-signals/node_modules/lit/node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i3 = t3.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o2 = "?" + h2;
  var n = `<${o2}>`;
  var r = document;
  var l2 = () => r.createComment("");
  var c2 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
  var a2 = Array.isArray;
  var u2 = (t8) => a2(t8) || "function" == typeof t8?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v2 = /-->/g;
  var _2 = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g2 = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t8) => (i8, ...s6) => ({ _$litType$: t8, strings: i8, values: s6 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E2 = r.createTreeWalker(r, 129);
  function C(t8, i8) {
    if (!Array.isArray(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i8) : i8;
  }
  var P = (t8, i8) => {
    const s6 = t8.length - 1, o7 = [];
    let r9, l4 = 2 === i8 ? "<svg>" : "", c7 = f2;
    for (let i9 = 0; i9 < s6; i9++) {
      const s7 = t8[i9];
      let a6, u4, d4 = -1, y4 = 0;
      for (; y4 < s7.length && (c7.lastIndex = y4, u4 = c7.exec(s7), null !== u4); ) y4 = c7.lastIndex, c7 === f2 ? "!--" === u4[1] ? c7 = v2 : void 0 !== u4[1] ? c7 = _2 : void 0 !== u4[2] ? ($.test(u4[2]) && (r9 = RegExp("</" + u4[2], "g")), c7 = m) : void 0 !== u4[3] && (c7 = m) : c7 === m ? ">" === u4[0] ? (c7 = r9 ?? f2, d4 = -1) : void 0 === u4[1] ? d4 = -2 : (d4 = c7.lastIndex - u4[2].length, a6 = u4[1], c7 = void 0 === u4[3] ? m : '"' === u4[3] ? g2 : p2) : c7 === g2 || c7 === p2 ? c7 = m : c7 === v2 || c7 === _2 ? c7 = f2 : (c7 = m, r9 = void 0);
      const x3 = c7 === m && t8[i9 + 1].startsWith("/>") ? " " : "";
      l4 += c7 === f2 ? s7 + n : d4 >= 0 ? (o7.push(a6), s7.slice(0, d4) + e3 + s7.slice(d4) + h2 + x3) : s7 + h2 + (-2 === d4 ? i9 : x3);
    }
    return [C(t8, l4 + (t8[s6] || "<?>") + (2 === i8 ? "</svg>" : "")), o7];
  };
  var V = class _V {
    constructor({ strings: t8, _$litType$: s6 }, n7) {
      let r9;
      this.parts = [];
      let c7 = 0, a6 = 0;
      const u4 = t8.length - 1, d4 = this.parts, [f8, v4] = P(t8, s6);
      if (this.el = _V.createElement(f8, n7), E2.currentNode = this.el.content, 2 === s6) {
        const t9 = this.el.content.firstChild;
        t9.replaceWith(...t9.childNodes);
      }
      for (; null !== (r9 = E2.nextNode()) && d4.length < u4; ) {
        if (1 === r9.nodeType) {
          if (r9.hasAttributes()) for (const t9 of r9.getAttributeNames()) if (t9.endsWith(e3)) {
            const i8 = v4[a6++], s7 = r9.getAttribute(t9).split(h2), e9 = /([.?@])?(.*)/.exec(i8);
            d4.push({ type: 1, index: c7, name: e9[2], strings: s7, ctor: "." === e9[1] ? k : "?" === e9[1] ? H : "@" === e9[1] ? I : R }), r9.removeAttribute(t9);
          } else t9.startsWith(h2) && (d4.push({ type: 6, index: c7 }), r9.removeAttribute(t9));
          if ($.test(r9.tagName)) {
            const t9 = r9.textContent.split(h2), s7 = t9.length - 1;
            if (s7 > 0) {
              r9.textContent = i3 ? i3.emptyScript : "";
              for (let i8 = 0; i8 < s7; i8++) r9.append(t9[i8], l2()), E2.nextNode(), d4.push({ type: 2, index: ++c7 });
              r9.append(t9[s7], l2());
            }
          }
        } else if (8 === r9.nodeType) if (r9.data === o2) d4.push({ type: 2, index: c7 });
        else {
          let t9 = -1;
          for (; -1 !== (t9 = r9.data.indexOf(h2, t9 + 1)); ) d4.push({ type: 7, index: c7 }), t9 += h2.length - 1;
        }
        c7++;
      }
    }
    static createElement(t8, i8) {
      const s6 = r.createElement("template");
      return s6.innerHTML = t8, s6;
    }
  };
  function N(t8, i8, s6 = t8, e9) {
    if (i8 === w) return i8;
    let h7 = void 0 !== e9 ? s6._$Co?.[e9] : s6._$Cl;
    const o7 = c2(i8) ? void 0 : i8._$litDirective$;
    return h7?.constructor !== o7 && (h7?._$AO?.(false), void 0 === o7 ? h7 = void 0 : (h7 = new o7(t8), h7._$AT(t8, s6, e9)), void 0 !== e9 ? (s6._$Co ??= [])[e9] = h7 : s6._$Cl = h7), void 0 !== h7 && (i8 = N(t8, h7._$AS(t8, i8.values), h7, e9)), i8;
  }
  var S = class {
    constructor(t8, i8) {
      this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i8;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t8) {
      const { el: { content: i8 }, parts: s6 } = this._$AD, e9 = (t8?.creationScope ?? r).importNode(i8, true);
      E2.currentNode = e9;
      let h7 = E2.nextNode(), o7 = 0, n7 = 0, l4 = s6[0];
      for (; void 0 !== l4; ) {
        if (o7 === l4.index) {
          let i9;
          2 === l4.type ? i9 = new M(h7, h7.nextSibling, this, t8) : 1 === l4.type ? i9 = new l4.ctor(h7, l4.name, l4.strings, this, t8) : 6 === l4.type && (i9 = new L(h7, this, t8)), this._$AV.push(i9), l4 = s6[++n7];
        }
        o7 !== l4?.index && (h7 = E2.nextNode(), o7++);
      }
      return E2.currentNode = r, e9;
    }
    p(t8) {
      let i8 = 0;
      for (const s6 of this._$AV) void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t8, s6, i8), i8 += s6.strings.length - 2) : s6._$AI(t8[i8])), i8++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t8, i8, s6, e9) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t8, this._$AB = i8, this._$AM = s6, this.options = e9, this._$Cv = e9?.isConnected ?? true;
    }
    get parentNode() {
      let t8 = this._$AA.parentNode;
      const i8 = this._$AM;
      return void 0 !== i8 && 11 === t8?.nodeType && (t8 = i8.parentNode), t8;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t8, i8 = this) {
      t8 = N(this, t8, i8), c2(t8) ? t8 === T || null == t8 || "" === t8 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t8 !== this._$AH && t8 !== w && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : u2(t8) ? this.k(t8) : this._(t8);
    }
    S(t8) {
      return this._$AA.parentNode.insertBefore(t8, this._$AB);
    }
    T(t8) {
      this._$AH !== t8 && (this._$AR(), this._$AH = this.S(t8));
    }
    _(t8) {
      this._$AH !== T && c2(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(r.createTextNode(t8)), this._$AH = t8;
    }
    $(t8) {
      const { values: i8, _$litType$: s6 } = t8, e9 = "number" == typeof s6 ? this._$AC(t8) : (void 0 === s6.el && (s6.el = V.createElement(C(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e9) this._$AH.p(i8);
      else {
        const t9 = new S(e9, this), s7 = t9.u(this.options);
        t9.p(i8), this.T(s7), this._$AH = t9;
      }
    }
    _$AC(t8) {
      let i8 = A.get(t8.strings);
      return void 0 === i8 && A.set(t8.strings, i8 = new V(t8)), i8;
    }
    k(t8) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i8 = this._$AH;
      let s6, e9 = 0;
      for (const h7 of t8) e9 === i8.length ? i8.push(s6 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s6 = i8[e9], s6._$AI(h7), e9++;
      e9 < i8.length && (this._$AR(s6 && s6._$AB.nextSibling, e9), i8.length = e9);
    }
    _$AR(t8 = this._$AA.nextSibling, i8) {
      for (this._$AP?.(false, true, i8); t8 && t8 !== this._$AB; ) {
        const i9 = t8.nextSibling;
        t8.remove(), t8 = i9;
      }
    }
    setConnected(t8) {
      void 0 === this._$AM && (this._$Cv = t8, this._$AP?.(t8));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t8, i8, s6, e9, h7) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t8, this.name = i8, this._$AM = e9, this.options = h7, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T;
    }
    _$AI(t8, i8 = this, s6, e9) {
      const h7 = this.strings;
      let o7 = false;
      if (void 0 === h7) t8 = N(this, t8, i8, 0), o7 = !c2(t8) || t8 !== this._$AH && t8 !== w, o7 && (this._$AH = t8);
      else {
        const e10 = t8;
        let n7, r9;
        for (t8 = h7[0], n7 = 0; n7 < h7.length - 1; n7++) r9 = N(this, e10[s6 + n7], i8, n7), r9 === w && (r9 = this._$AH[n7]), o7 ||= !c2(r9) || r9 !== this._$AH[n7], r9 === T ? t8 = T : t8 !== T && (t8 += (r9 ?? "") + h7[n7 + 1]), this._$AH[n7] = r9;
      }
      o7 && !e9 && this.j(t8);
    }
    j(t8) {
      t8 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t8) {
      this.element[this.name] = t8 === T ? void 0 : t8;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t8) {
      this.element.toggleAttribute(this.name, !!t8 && t8 !== T);
    }
  };
  var I = class extends R {
    constructor(t8, i8, s6, e9, h7) {
      super(t8, i8, s6, e9, h7), this.type = 5;
    }
    _$AI(t8, i8 = this) {
      if ((t8 = N(this, t8, i8, 0) ?? T) === w) return;
      const s6 = this._$AH, e9 = t8 === T && s6 !== T || t8.capture !== s6.capture || t8.once !== s6.once || t8.passive !== s6.passive, h7 = t8 !== T && (s6 === T || e9);
      e9 && this.element.removeEventListener(this.name, this, s6), h7 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
    }
    handleEvent(t8) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
    }
  };
  var L = class {
    constructor(t8, i8, s6) {
      this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t8) {
      N(this, t8);
    }
  };
  var z = { P: e3, A: h2, C: o2, M: 1, L: P, R: S, D: u2, V: N, I: M, H: R, N: H, U: I, B: k, F: L };
  var Z = t3.litHtmlPolyfillSupport;
  Z?.(V, M), (t3.litHtmlVersions ??= []).push("3.1.4");

  // frontend/node_modules/@lit-labs/preact-signals/node_modules/lit/node_modules/lit-html/directive-helpers.js
  var { I: t4 } = z;
  var f3 = (o7) => void 0 === o7.strings;

  // frontend/node_modules/@lit-labs/preact-signals/node_modules/lit/node_modules/lit-html/async-directive.js
  var s3 = (i8, t8) => {
    const e9 = i8._$AN;
    if (void 0 === e9) return false;
    for (const i9 of e9) i9._$AO?.(t8, false), s3(i9, t8);
    return true;
  };
  var o3 = (i8) => {
    let t8, e9;
    do {
      if (void 0 === (t8 = i8._$AM)) break;
      e9 = t8._$AN, e9.delete(i8), i8 = t8;
    } while (0 === e9?.size);
  };
  var r2 = (i8) => {
    for (let t8; t8 = i8._$AM; i8 = t8) {
      let e9 = t8._$AN;
      if (void 0 === e9) t8._$AN = e9 = /* @__PURE__ */ new Set();
      else if (e9.has(i8)) break;
      e9.add(i8), c3(t8);
    }
  };
  function h3(i8) {
    void 0 !== this._$AN ? (o3(this), this._$AM = i8, r2(this)) : this._$AM = i8;
  }
  function n2(i8, t8 = false, e9 = 0) {
    const r9 = this._$AH, h7 = this._$AN;
    if (void 0 !== h7 && 0 !== h7.size) if (t8) if (Array.isArray(r9)) for (let i9 = e9; i9 < r9.length; i9++) s3(r9[i9], false), o3(r9[i9]);
    else null != r9 && (s3(r9, false), o3(r9));
    else s3(this, i8);
  }
  var c3 = (i8) => {
    i8.type == t2.CHILD && (i8._$AP ??= n2, i8._$AQ ??= h3);
  };
  var f4 = class extends i2 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i8, t8, e9) {
      super._$AT(i8, t8, e9), r2(this), this.isConnected = i8._$AU;
    }
    _$AO(i8, t8 = true) {
      i8 !== this.isConnected && (this.isConnected = i8, i8 ? this.reconnected?.() : this.disconnected?.()), t8 && (s3(this, i8), o3(this));
    }
    setValue(t8) {
      if (f3(this._$Ct)) this._$Ct._$AI(t8, this);
      else {
        const i8 = [...this._$Ct._$AH];
        i8[this._$Ci] = t8, this._$Ct._$AI(i8, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // frontend/node_modules/@lit-labs/preact-signals/lib/watch.js
  var s4 = e2(class extends f4 {
    render(i8) {
      var t8;
      if (i8 !== this._$Oi) {
        null === (t8 = this._$Oo) || void 0 === t8 || t8.call(this), this._$Oi = i8;
        let s6 = true;
        this._$Oo = i8.subscribe((i9) => {
          false === s6 && this.setValue(i9);
        }), s6 = false;
      }
      return i8.peek();
    }
    disconnected() {
      var i8;
      null === (i8 = this._$Oo) || void 0 === i8 || i8.call(this);
    }
    reconnected() {
      var i8;
      this._$Oo = null === (i8 = this._$Oi) || void 0 === i8 ? void 0 : i8.subscribe((i9) => {
        this.setValue(i9);
      });
    }
  });

  // frontend/node_modules/@lit-labs/preact-signals/lib/html-tag.js
  var m2 = (t8) => (o7, ...m4) => t8(o7, ...m4.map((t9) => t9 instanceof u ? s4(t9) : t9));
  var a3 = m2(x);
  var i4 = m2(b2);

  // frontend/ts/proto/jon/jon_shared_data.ts
  var import_minimal26 = __toESM(require_minimal2());

  // frontend/ts/proto/jon/jon_shared_data_camera_day.ts
  var import_minimal15 = __toESM(require_minimal2());
  function createBaseJonGuiDataCameraDay() {
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
      meteo: void 0,
      crossPosX: 0,
      crossPosY: 0
    };
  }
  var JonGuiDataCameraDay = {
    encode(message, writer = import_minimal15.default.Writer.create()) {
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
      if (message.meteo !== void 0) {
        JonGuiDataMeteo.encode(message.meteo, writer.uint32(114).fork()).ldelim();
      }
      if (message.crossPosX !== 0) {
        writer.uint32(120).int32(message.crossPosX);
      }
      if (message.crossPosY !== 0) {
        writer.uint32(136).int32(message.crossPosY);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal15.default.Reader ? input : import_minimal15.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
          case 15:
            if (tag !== 120) {
              break;
            }
            message.crossPosX = reader.int32();
            continue;
          case 17:
            if (tag !== 136) {
              break;
            }
            message.crossPosY = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        focusPos: isSet15(object.focusPos) ? globalThis.Number(object.focusPos) : 0,
        zoomPos: isSet15(object.zoomPos) ? globalThis.Number(object.zoomPos) : 0,
        irisPos: isSet15(object.irisPos) ? globalThis.Number(object.irisPos) : 0,
        exposure: isSet15(object.exposure) ? globalThis.Number(object.exposure) : 0,
        gain: isSet15(object.gain) ? globalThis.Number(object.gain) : 0,
        autoFocus: isSet15(object.autoFocus) ? globalThis.Boolean(object.autoFocus) : false,
        recording: isSet15(object.recording) ? globalThis.Boolean(object.recording) : false,
        autoIris: isSet15(object.autoIris) ? globalThis.Boolean(object.autoIris) : false,
        infraredFilter: isSet15(object.infraredFilter) ? globalThis.Boolean(object.infraredFilter) : false,
        syncZoomToHeatCamera: isSet15(object.syncZoomToHeatCamera) ? globalThis.Boolean(object.syncZoomToHeatCamera) : false,
        zoomTablePos: isSet15(object.zoomTablePos) ? globalThis.Number(object.zoomTablePos) : 0,
        zoomTablePosMax: isSet15(object.zoomTablePosMax) ? globalThis.Number(object.zoomTablePosMax) : 0,
        meteo: isSet15(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0,
        crossPosX: isSet15(object.crossPosX) ? globalThis.Number(object.crossPosX) : 0,
        crossPosY: isSet15(object.crossPosY) ? globalThis.Number(object.crossPosY) : 0
      };
    },
    toJSON(message) {
      const obj = {};
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
      if (message.meteo !== void 0) {
        obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
      }
      if (message.crossPosX !== 0) {
        obj.crossPosX = Math.round(message.crossPosX);
      }
      if (message.crossPosY !== 0) {
        obj.crossPosY = Math.round(message.crossPosY);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataCameraDay.fromPartial(base ?? {});
    },
    fromPartial(object) {
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
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      message.crossPosX = object.crossPosX ?? 0;
      message.crossPosY = object.crossPosY ?? 0;
      return message;
    }
  };
  function isSet15(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_camera_heat.ts
  var import_minimal16 = __toESM(require_minimal2());
  function createBaseJonGuiDataCameraHeat() {
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
      meteo: void 0,
      ddeLevel: 0,
      ddeEnabled: false,
      ddeMaxLevel: 0,
      crossPosX: 0,
      crossPosY: 0
    };
  }
  var JonGuiDataCameraHeat = {
    encode(message, writer = import_minimal16.default.Writer.create()) {
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
      if (message.meteo !== void 0) {
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
      if (message.crossPosX !== 0) {
        writer.uint32(112).int32(message.crossPosX);
      }
      if (message.crossPosY !== 0) {
        writer.uint32(120).int32(message.crossPosY);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal16.default.Reader ? input : import_minimal16.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
            message.agcMode = reader.int32();
            continue;
          case 4:
            if (tag !== 32) {
              break;
            }
            message.filter = reader.int32();
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
          case 14:
            if (tag !== 112) {
              break;
            }
            message.crossPosX = reader.int32();
            continue;
          case 15:
            if (tag !== 120) {
              break;
            }
            message.crossPosY = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        focusPos: isSet16(object.focusPos) ? globalThis.Number(object.focusPos) : 0,
        zoomPos: isSet16(object.zoomPos) ? globalThis.Number(object.zoomPos) : 0,
        agcMode: isSet16(object.agcMode) ? jonGuiDataVideoChannelHeatAGCModesFromJSON(object.agcMode) : 0,
        filter: isSet16(object.filter) ? jonGuiDataVideoChannelHeatFiltersFromJSON(object.filter) : 0,
        autoFocus: isSet16(object.autoFocus) ? globalThis.Boolean(object.autoFocus) : false,
        recording: isSet16(object.recording) ? globalThis.Boolean(object.recording) : false,
        syncZoomToDayCamera: isSet16(object.syncZoomToDayCamera) ? globalThis.Boolean(object.syncZoomToDayCamera) : false,
        zoomTablePos: isSet16(object.zoomTablePos) ? globalThis.Number(object.zoomTablePos) : 0,
        zoomTablePosMax: isSet16(object.zoomTablePosMax) ? globalThis.Number(object.zoomTablePosMax) : 0,
        meteo: isSet16(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0,
        ddeLevel: isSet16(object.ddeLevel) ? globalThis.Number(object.ddeLevel) : 0,
        ddeEnabled: isSet16(object.ddeEnabled) ? globalThis.Boolean(object.ddeEnabled) : false,
        ddeMaxLevel: isSet16(object.ddeMaxLevel) ? globalThis.Number(object.ddeMaxLevel) : 0,
        crossPosX: isSet16(object.crossPosX) ? globalThis.Number(object.crossPosX) : 0,
        crossPosY: isSet16(object.crossPosY) ? globalThis.Number(object.crossPosY) : 0
      };
    },
    toJSON(message) {
      const obj = {};
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
      if (message.meteo !== void 0) {
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
      if (message.crossPosX !== 0) {
        obj.crossPosX = Math.round(message.crossPosX);
      }
      if (message.crossPosY !== 0) {
        obj.crossPosY = Math.round(message.crossPosY);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataCameraHeat.fromPartial(base ?? {});
    },
    fromPartial(object) {
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
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      message.ddeLevel = object.ddeLevel ?? 0;
      message.ddeEnabled = object.ddeEnabled ?? false;
      message.ddeMaxLevel = object.ddeMaxLevel ?? 0;
      message.crossPosX = object.crossPosX ?? 0;
      message.crossPosY = object.crossPosY ?? 0;
      return message;
    }
  };
  function isSet16(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_compass.ts
  var import_minimal17 = __toESM(require_minimal2());
  function createBaseJonGuiDataCompass() {
    return {
      azimuth: 0,
      elevation: 0,
      bank: 0,
      offsetAzimuth: 0,
      offsetElevation: 0,
      magneticDeclination: 0,
      calibrating: false,
      meteo: void 0
    };
  }
  var JonGuiDataCompass = {
    encode(message, writer = import_minimal17.default.Writer.create()) {
      if (message.azimuth !== 0) {
        writer.uint32(13).float(message.azimuth);
      }
      if (message.elevation !== 0) {
        writer.uint32(21).float(message.elevation);
      }
      if (message.bank !== 0) {
        writer.uint32(29).float(message.bank);
      }
      if (message.offsetAzimuth !== 0) {
        writer.uint32(37).float(message.offsetAzimuth);
      }
      if (message.offsetElevation !== 0) {
        writer.uint32(45).float(message.offsetElevation);
      }
      if (message.magneticDeclination !== 0) {
        writer.uint32(53).float(message.magneticDeclination);
      }
      if (message.calibrating !== false) {
        writer.uint32(56).bool(message.calibrating);
      }
      if (message.meteo !== void 0) {
        JonGuiDataMeteo.encode(message.meteo, writer.uint32(66).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal17.default.Reader ? input : import_minimal17.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataCompass();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.azimuth = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.elevation = reader.float();
            continue;
          case 3:
            if (tag !== 29) {
              break;
            }
            message.bank = reader.float();
            continue;
          case 4:
            if (tag !== 37) {
              break;
            }
            message.offsetAzimuth = reader.float();
            continue;
          case 5:
            if (tag !== 45) {
              break;
            }
            message.offsetElevation = reader.float();
            continue;
          case 6:
            if (tag !== 53) {
              break;
            }
            message.magneticDeclination = reader.float();
            continue;
          case 7:
            if (tag !== 56) {
              break;
            }
            message.calibrating = reader.bool();
            continue;
          case 8:
            if (tag !== 66) {
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
    fromJSON(object) {
      return {
        azimuth: isSet17(object.azimuth) ? globalThis.Number(object.azimuth) : 0,
        elevation: isSet17(object.elevation) ? globalThis.Number(object.elevation) : 0,
        bank: isSet17(object.bank) ? globalThis.Number(object.bank) : 0,
        offsetAzimuth: isSet17(object.offsetAzimuth) ? globalThis.Number(object.offsetAzimuth) : 0,
        offsetElevation: isSet17(object.offsetElevation) ? globalThis.Number(object.offsetElevation) : 0,
        magneticDeclination: isSet17(object.magneticDeclination) ? globalThis.Number(object.magneticDeclination) : 0,
        calibrating: isSet17(object.calibrating) ? globalThis.Boolean(object.calibrating) : false,
        meteo: isSet17(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.azimuth !== 0) {
        obj.azimuth = message.azimuth;
      }
      if (message.elevation !== 0) {
        obj.elevation = message.elevation;
      }
      if (message.bank !== 0) {
        obj.bank = message.bank;
      }
      if (message.offsetAzimuth !== 0) {
        obj.offsetAzimuth = message.offsetAzimuth;
      }
      if (message.offsetElevation !== 0) {
        obj.offsetElevation = message.offsetElevation;
      }
      if (message.magneticDeclination !== 0) {
        obj.magneticDeclination = message.magneticDeclination;
      }
      if (message.calibrating !== false) {
        obj.calibrating = message.calibrating;
      }
      if (message.meteo !== void 0) {
        obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataCompass.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataCompass();
      message.azimuth = object.azimuth ?? 0;
      message.elevation = object.elevation ?? 0;
      message.bank = object.bank ?? 0;
      message.offsetAzimuth = object.offsetAzimuth ?? 0;
      message.offsetElevation = object.offsetElevation ?? 0;
      message.magneticDeclination = object.magneticDeclination ?? 0;
      message.calibrating = object.calibrating ?? false;
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      return message;
    }
  };
  function isSet17(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_compass_calibration.ts
  var import_minimal18 = __toESM(require_minimal2());
  function createBaseJonGuiDataCompassCalibration() {
    return { stage: 0, finalStage: 0, targetAzimuth: 0, targetElevation: 0, targetBank: 0, status: 0 };
  }
  var JonGuiDataCompassCalibration = {
    encode(message, writer = import_minimal18.default.Writer.create()) {
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
    decode(input, length) {
      const reader = input instanceof import_minimal18.default.Reader ? input : import_minimal18.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
            message.status = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        stage: isSet18(object.stage) ? globalThis.Number(object.stage) : 0,
        finalStage: isSet18(object.finalStage) ? globalThis.Number(object.finalStage) : 0,
        targetAzimuth: isSet18(object.targetAzimuth) ? globalThis.Number(object.targetAzimuth) : 0,
        targetElevation: isSet18(object.targetElevation) ? globalThis.Number(object.targetElevation) : 0,
        targetBank: isSet18(object.targetBank) ? globalThis.Number(object.targetBank) : 0,
        status: isSet18(object.status) ? jonGuiDataCompassCalibrateStatusFromJSON(object.status) : 0
      };
    },
    toJSON(message) {
      const obj = {};
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
    create(base) {
      return JonGuiDataCompassCalibration.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataCompassCalibration();
      message.stage = object.stage ?? 0;
      message.finalStage = object.finalStage ?? 0;
      message.targetAzimuth = object.targetAzimuth ?? 0;
      message.targetElevation = object.targetElevation ?? 0;
      message.targetBank = object.targetBank ?? 0;
      message.status = object.status ?? 0;
      return message;
    }
  };
  function isSet18(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_environment.ts
  var import_minimal19 = __toESM(require_minimal2());
  function createBaseJonGuiDataEnvironment() {
    return {
      weatherCondition: 0,
      lightingCondition: 0,
      precipitationType: 0,
      groundCondition: 0,
      opticalVisibility: 0,
      thermalCondition: 0,
      networkStatus: 0,
      lightSourceCondition: 0
    };
  }
  var JonGuiDataEnvironment = {
    encode(message, writer = import_minimal19.default.Writer.create()) {
      if (message.weatherCondition !== 0) {
        writer.uint32(8).int32(message.weatherCondition);
      }
      if (message.lightingCondition !== 0) {
        writer.uint32(16).int32(message.lightingCondition);
      }
      if (message.precipitationType !== 0) {
        writer.uint32(24).int32(message.precipitationType);
      }
      if (message.groundCondition !== 0) {
        writer.uint32(32).int32(message.groundCondition);
      }
      if (message.opticalVisibility !== 0) {
        writer.uint32(40).int32(message.opticalVisibility);
      }
      if (message.thermalCondition !== 0) {
        writer.uint32(48).int32(message.thermalCondition);
      }
      if (message.networkStatus !== 0) {
        writer.uint32(56).int32(message.networkStatus);
      }
      if (message.lightSourceCondition !== 0) {
        writer.uint32(64).int32(message.lightSourceCondition);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal19.default.Reader ? input : import_minimal19.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataEnvironment();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.weatherCondition = reader.int32();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.lightingCondition = reader.int32();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.precipitationType = reader.int32();
            continue;
          case 4:
            if (tag !== 32) {
              break;
            }
            message.groundCondition = reader.int32();
            continue;
          case 5:
            if (tag !== 40) {
              break;
            }
            message.opticalVisibility = reader.int32();
            continue;
          case 6:
            if (tag !== 48) {
              break;
            }
            message.thermalCondition = reader.int32();
            continue;
          case 7:
            if (tag !== 56) {
              break;
            }
            message.networkStatus = reader.int32();
            continue;
          case 8:
            if (tag !== 64) {
              break;
            }
            message.lightSourceCondition = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        weatherCondition: isSet19(object.weatherCondition) ? jonGuiDataEnvironmentWeatherConditionFromJSON(object.weatherCondition) : 0,
        lightingCondition: isSet19(object.lightingCondition) ? jonGuiDataEnvironmentLightingConditionFromJSON(object.lightingCondition) : 0,
        precipitationType: isSet19(object.precipitationType) ? jonGuiDataEnvironmentPrecipitationTypeFromJSON(object.precipitationType) : 0,
        groundCondition: isSet19(object.groundCondition) ? jonGuiDataEnvironmentGroundConditionFromJSON(object.groundCondition) : 0,
        opticalVisibility: isSet19(object.opticalVisibility) ? jonGuiDataEnvironmentOpticalVisibilityFromJSON(object.opticalVisibility) : 0,
        thermalCondition: isSet19(object.thermalCondition) ? jonGuiDataEnvironmentThermalConditionFromJSON(object.thermalCondition) : 0,
        networkStatus: isSet19(object.networkStatus) ? jonGuiDataEnvironmentNetworkStatusFromJSON(object.networkStatus) : 0,
        lightSourceCondition: isSet19(object.lightSourceCondition) ? jonGuiDataEnvironmentLightSourceFromJSON(object.lightSourceCondition) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.weatherCondition !== 0) {
        obj.weatherCondition = jonGuiDataEnvironmentWeatherConditionToJSON(message.weatherCondition);
      }
      if (message.lightingCondition !== 0) {
        obj.lightingCondition = jonGuiDataEnvironmentLightingConditionToJSON(message.lightingCondition);
      }
      if (message.precipitationType !== 0) {
        obj.precipitationType = jonGuiDataEnvironmentPrecipitationTypeToJSON(message.precipitationType);
      }
      if (message.groundCondition !== 0) {
        obj.groundCondition = jonGuiDataEnvironmentGroundConditionToJSON(message.groundCondition);
      }
      if (message.opticalVisibility !== 0) {
        obj.opticalVisibility = jonGuiDataEnvironmentOpticalVisibilityToJSON(message.opticalVisibility);
      }
      if (message.thermalCondition !== 0) {
        obj.thermalCondition = jonGuiDataEnvironmentThermalConditionToJSON(message.thermalCondition);
      }
      if (message.networkStatus !== 0) {
        obj.networkStatus = jonGuiDataEnvironmentNetworkStatusToJSON(message.networkStatus);
      }
      if (message.lightSourceCondition !== 0) {
        obj.lightSourceCondition = jonGuiDataEnvironmentLightSourceToJSON(message.lightSourceCondition);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataEnvironment.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataEnvironment();
      message.weatherCondition = object.weatherCondition ?? 0;
      message.lightingCondition = object.lightingCondition ?? 0;
      message.precipitationType = object.precipitationType ?? 0;
      message.groundCondition = object.groundCondition ?? 0;
      message.opticalVisibility = object.opticalVisibility ?? 0;
      message.thermalCondition = object.thermalCondition ?? 0;
      message.networkStatus = object.networkStatus ?? 0;
      message.lightSourceCondition = object.lightSourceCondition ?? 0;
      return message;
    }
  };
  function isSet19(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_gps.ts
  var import_minimal20 = __toESM(require_minimal2());
  function createBaseJonGuiDataGps() {
    return {
      longitude: 0,
      latitude: 0,
      altitude: 0,
      manualLongitude: 0,
      manualLatitude: 0,
      manualAltitude: 0,
      fixType: 0,
      useManual: false,
      radius: 0,
      meteo: void 0
    };
  }
  var JonGuiDataGps = {
    encode(message, writer = import_minimal20.default.Writer.create()) {
      if (message.longitude !== 0) {
        writer.uint32(9).double(message.longitude);
      }
      if (message.latitude !== 0) {
        writer.uint32(17).double(message.latitude);
      }
      if (message.altitude !== 0) {
        writer.uint32(25).double(message.altitude);
      }
      if (message.manualLongitude !== 0) {
        writer.uint32(33).double(message.manualLongitude);
      }
      if (message.manualLatitude !== 0) {
        writer.uint32(41).double(message.manualLatitude);
      }
      if (message.manualAltitude !== 0) {
        writer.uint32(49).double(message.manualAltitude);
      }
      if (message.fixType !== 0) {
        writer.uint32(56).int32(message.fixType);
      }
      if (message.useManual !== false) {
        writer.uint32(64).bool(message.useManual);
      }
      if (message.radius !== 0) {
        writer.uint32(73).double(message.radius);
      }
      if (message.meteo !== void 0) {
        JonGuiDataMeteo.encode(message.meteo, writer.uint32(82).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal20.default.Reader ? input : import_minimal20.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataGps();
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
            message.manualLongitude = reader.double();
            continue;
          case 5:
            if (tag !== 41) {
              break;
            }
            message.manualLatitude = reader.double();
            continue;
          case 6:
            if (tag !== 49) {
              break;
            }
            message.manualAltitude = reader.double();
            continue;
          case 7:
            if (tag !== 56) {
              break;
            }
            message.fixType = reader.int32();
            continue;
          case 8:
            if (tag !== 64) {
              break;
            }
            message.useManual = reader.bool();
            continue;
          case 9:
            if (tag !== 73) {
              break;
            }
            message.radius = reader.double();
            continue;
          case 10:
            if (tag !== 82) {
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
    fromJSON(object) {
      return {
        longitude: isSet20(object.longitude) ? globalThis.Number(object.longitude) : 0,
        latitude: isSet20(object.latitude) ? globalThis.Number(object.latitude) : 0,
        altitude: isSet20(object.altitude) ? globalThis.Number(object.altitude) : 0,
        manualLongitude: isSet20(object.manualLongitude) ? globalThis.Number(object.manualLongitude) : 0,
        manualLatitude: isSet20(object.manualLatitude) ? globalThis.Number(object.manualLatitude) : 0,
        manualAltitude: isSet20(object.manualAltitude) ? globalThis.Number(object.manualAltitude) : 0,
        fixType: isSet20(object.fixType) ? jonGuiDataGpsFixTypeFromJSON(object.fixType) : 0,
        useManual: isSet20(object.useManual) ? globalThis.Boolean(object.useManual) : false,
        radius: isSet20(object.radius) ? globalThis.Number(object.radius) : 0,
        meteo: isSet20(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.longitude !== 0) {
        obj.longitude = message.longitude;
      }
      if (message.latitude !== 0) {
        obj.latitude = message.latitude;
      }
      if (message.altitude !== 0) {
        obj.altitude = message.altitude;
      }
      if (message.manualLongitude !== 0) {
        obj.manualLongitude = message.manualLongitude;
      }
      if (message.manualLatitude !== 0) {
        obj.manualLatitude = message.manualLatitude;
      }
      if (message.manualAltitude !== 0) {
        obj.manualAltitude = message.manualAltitude;
      }
      if (message.fixType !== 0) {
        obj.fixType = jonGuiDataGpsFixTypeToJSON(message.fixType);
      }
      if (message.useManual !== false) {
        obj.useManual = message.useManual;
      }
      if (message.radius !== 0) {
        obj.radius = message.radius;
      }
      if (message.meteo !== void 0) {
        obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataGps.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataGps();
      message.longitude = object.longitude ?? 0;
      message.latitude = object.latitude ?? 0;
      message.altitude = object.altitude ?? 0;
      message.manualLongitude = object.manualLongitude ?? 0;
      message.manualLatitude = object.manualLatitude ?? 0;
      message.manualAltitude = object.manualAltitude ?? 0;
      message.fixType = object.fixType ?? 0;
      message.useManual = object.useManual ?? false;
      message.radius = object.radius ?? 0;
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      return message;
    }
  };
  function isSet20(value) {
    return value !== null && value !== void 0;
  }

  // frontend/node_modules/long/index.js
  var wasm = null;
  try {
    wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
      0,
      97,
      115,
      109,
      1,
      0,
      0,
      0,
      1,
      13,
      2,
      96,
      0,
      1,
      127,
      96,
      4,
      127,
      127,
      127,
      127,
      1,
      127,
      3,
      7,
      6,
      0,
      1,
      1,
      1,
      1,
      1,
      6,
      6,
      1,
      127,
      1,
      65,
      0,
      11,
      7,
      50,
      6,
      3,
      109,
      117,
      108,
      0,
      1,
      5,
      100,
      105,
      118,
      95,
      115,
      0,
      2,
      5,
      100,
      105,
      118,
      95,
      117,
      0,
      3,
      5,
      114,
      101,
      109,
      95,
      115,
      0,
      4,
      5,
      114,
      101,
      109,
      95,
      117,
      0,
      5,
      8,
      103,
      101,
      116,
      95,
      104,
      105,
      103,
      104,
      0,
      0,
      10,
      191,
      1,
      6,
      4,
      0,
      35,
      0,
      11,
      36,
      1,
      1,
      126,
      32,
      0,
      173,
      32,
      1,
      173,
      66,
      32,
      134,
      132,
      32,
      2,
      173,
      32,
      3,
      173,
      66,
      32,
      134,
      132,
      126,
      34,
      4,
      66,
      32,
      135,
      167,
      36,
      0,
      32,
      4,
      167,
      11,
      36,
      1,
      1,
      126,
      32,
      0,
      173,
      32,
      1,
      173,
      66,
      32,
      134,
      132,
      32,
      2,
      173,
      32,
      3,
      173,
      66,
      32,
      134,
      132,
      127,
      34,
      4,
      66,
      32,
      135,
      167,
      36,
      0,
      32,
      4,
      167,
      11,
      36,
      1,
      1,
      126,
      32,
      0,
      173,
      32,
      1,
      173,
      66,
      32,
      134,
      132,
      32,
      2,
      173,
      32,
      3,
      173,
      66,
      32,
      134,
      132,
      128,
      34,
      4,
      66,
      32,
      135,
      167,
      36,
      0,
      32,
      4,
      167,
      11,
      36,
      1,
      1,
      126,
      32,
      0,
      173,
      32,
      1,
      173,
      66,
      32,
      134,
      132,
      32,
      2,
      173,
      32,
      3,
      173,
      66,
      32,
      134,
      132,
      129,
      34,
      4,
      66,
      32,
      135,
      167,
      36,
      0,
      32,
      4,
      167,
      11,
      36,
      1,
      1,
      126,
      32,
      0,
      173,
      32,
      1,
      173,
      66,
      32,
      134,
      132,
      32,
      2,
      173,
      32,
      3,
      173,
      66,
      32,
      134,
      132,
      130,
      34,
      4,
      66,
      32,
      135,
      167,
      36,
      0,
      32,
      4,
      167,
      11
    ])), {}).exports;
  } catch (e9) {
  }
  function Long(low, high, unsigned) {
    this.low = low | 0;
    this.high = high | 0;
    this.unsigned = !!unsigned;
  }
  Long.prototype.__isLong__;
  Object.defineProperty(Long.prototype, "__isLong__", { value: true });
  function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
  }
  function ctz32(value) {
    var c7 = Math.clz32(value & -value);
    return value ? 31 - c7 : c7;
  }
  Long.isLong = isLong;
  var INT_CACHE = {};
  var UINT_CACHE = {};
  function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
      value >>>= 0;
      if (cache = 0 <= value && value < 256) {
        cachedObj = UINT_CACHE[value];
        if (cachedObj)
          return cachedObj;
      }
      obj = fromBits(value, 0, true);
      if (cache)
        UINT_CACHE[value] = obj;
      return obj;
    } else {
      value |= 0;
      if (cache = -128 <= value && value < 128) {
        cachedObj = INT_CACHE[value];
        if (cachedObj)
          return cachedObj;
      }
      obj = fromBits(value, value < 0 ? -1 : 0, false);
      if (cache)
        INT_CACHE[value] = obj;
      return obj;
    }
  }
  Long.fromInt = fromInt;
  function fromNumber(value, unsigned) {
    if (isNaN(value))
      return unsigned ? UZERO : ZERO;
    if (unsigned) {
      if (value < 0)
        return UZERO;
      if (value >= TWO_PWR_64_DBL)
        return MAX_UNSIGNED_VALUE;
    } else {
      if (value <= -TWO_PWR_63_DBL)
        return MIN_VALUE;
      if (value + 1 >= TWO_PWR_63_DBL)
        return MAX_VALUE;
    }
    if (value < 0)
      return fromNumber(-value, unsigned).neg();
    return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
  }
  Long.fromNumber = fromNumber;
  function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
  }
  Long.fromBits = fromBits;
  var pow_dbl = Math.pow;
  function fromString(str, unsigned, radix) {
    if (str.length === 0)
      throw Error("empty string");
    if (typeof unsigned === "number") {
      radix = unsigned;
      unsigned = false;
    } else {
      unsigned = !!unsigned;
    }
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
      return unsigned ? UZERO : ZERO;
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
      throw RangeError("radix");
    var p4;
    if ((p4 = str.indexOf("-")) > 0)
      throw Error("interior hyphen");
    else if (p4 === 0) {
      return fromString(str.substring(1), unsigned, radix).neg();
    }
    var radixToPower = fromNumber(pow_dbl(radix, 8));
    var result = ZERO;
    for (var i8 = 0; i8 < str.length; i8 += 8) {
      var size = Math.min(8, str.length - i8), value = parseInt(str.substring(i8, i8 + size), radix);
      if (size < 8) {
        var power = fromNumber(pow_dbl(radix, size));
        result = result.mul(power).add(fromNumber(value));
      } else {
        result = result.mul(radixToPower);
        result = result.add(fromNumber(value));
      }
    }
    result.unsigned = unsigned;
    return result;
  }
  Long.fromString = fromString;
  function fromValue(val, unsigned) {
    if (typeof val === "number")
      return fromNumber(val, unsigned);
    if (typeof val === "string")
      return fromString(val, unsigned);
    return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
  }
  Long.fromValue = fromValue;
  var TWO_PWR_16_DBL = 1 << 16;
  var TWO_PWR_24_DBL = 1 << 24;
  var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
  var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
  var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
  var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
  var ZERO = fromInt(0);
  Long.ZERO = ZERO;
  var UZERO = fromInt(0, true);
  Long.UZERO = UZERO;
  var ONE = fromInt(1);
  Long.ONE = ONE;
  var UONE = fromInt(1, true);
  Long.UONE = UONE;
  var NEG_ONE = fromInt(-1);
  Long.NEG_ONE = NEG_ONE;
  var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
  Long.MAX_VALUE = MAX_VALUE;
  var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
  Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
  var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
  Long.MIN_VALUE = MIN_VALUE;
  var LongPrototype = Long.prototype;
  LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
  };
  LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
      return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
  };
  LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
      throw RangeError("radix");
    if (this.isZero())
      return "0";
    if (this.isNegative()) {
      if (this.eq(MIN_VALUE)) {
        var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
        return div.toString(radix) + rem1.toInt().toString(radix);
      } else
        return "-" + this.neg().toString(radix);
    }
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
    var result = "";
    while (true) {
      var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
      rem = remDiv;
      if (rem.isZero())
        return digits + result;
      else {
        while (digits.length < 6)
          digits = "0" + digits;
        result = "" + digits + result;
      }
    }
  };
  LongPrototype.getHighBits = function getHighBits() {
    return this.high;
  };
  LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
  };
  LongPrototype.getLowBits = function getLowBits() {
    return this.low;
  };
  LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
  };
  LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative())
      return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
      if ((val & 1 << bit) != 0)
        break;
    return this.high != 0 ? bit + 33 : bit + 1;
  };
  LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
  };
  LongPrototype.eqz = LongPrototype.isZero;
  LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
  };
  LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
  };
  LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
  };
  LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
  };
  LongPrototype.equals = function equals(other) {
    if (!isLong(other))
      other = fromValue(other);
    if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
      return false;
    return this.high === other.high && this.low === other.low;
  };
  LongPrototype.eq = LongPrototype.equals;
  LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(
      /* validates */
      other
    );
  };
  LongPrototype.neq = LongPrototype.notEquals;
  LongPrototype.ne = LongPrototype.notEquals;
  LongPrototype.lessThan = function lessThan(other) {
    return this.comp(
      /* validates */
      other
    ) < 0;
  };
  LongPrototype.lt = LongPrototype.lessThan;
  LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(
      /* validates */
      other
    ) <= 0;
  };
  LongPrototype.lte = LongPrototype.lessThanOrEqual;
  LongPrototype.le = LongPrototype.lessThanOrEqual;
  LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(
      /* validates */
      other
    ) > 0;
  };
  LongPrototype.gt = LongPrototype.greaterThan;
  LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(
      /* validates */
      other
    ) >= 0;
  };
  LongPrototype.gte = LongPrototype.greaterThanOrEqual;
  LongPrototype.ge = LongPrototype.greaterThanOrEqual;
  LongPrototype.compare = function compare(other) {
    if (!isLong(other))
      other = fromValue(other);
    if (this.eq(other))
      return 0;
    var thisNeg = this.isNegative(), otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
      return -1;
    if (!thisNeg && otherNeg)
      return 1;
    if (!this.unsigned)
      return this.sub(other).isNegative() ? -1 : 1;
    return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
  };
  LongPrototype.comp = LongPrototype.compare;
  LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
      return MIN_VALUE;
    return this.not().add(ONE);
  };
  LongPrototype.neg = LongPrototype.negate;
  LongPrototype.add = function add(addend) {
    if (!isLong(addend))
      addend = fromValue(addend);
    var a48 = this.high >>> 16;
    var a32 = this.high & 65535;
    var a16 = this.low >>> 16;
    var a00 = this.low & 65535;
    var b48 = addend.high >>> 16;
    var b32 = addend.high & 65535;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 65535;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 65535;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 65535;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c48 += a48 + b48;
    c48 &= 65535;
    return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
  };
  LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
      subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
  };
  LongPrototype.sub = LongPrototype.subtract;
  LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
      return this;
    if (!isLong(multiplier))
      multiplier = fromValue(multiplier);
    if (wasm) {
      var low = wasm["mul"](
        this.low,
        this.high,
        multiplier.low,
        multiplier.high
      );
      return fromBits(low, wasm["get_high"](), this.unsigned);
    }
    if (multiplier.isZero())
      return this.unsigned ? UZERO : ZERO;
    if (this.eq(MIN_VALUE))
      return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
      return this.isOdd() ? MIN_VALUE : ZERO;
    if (this.isNegative()) {
      if (multiplier.isNegative())
        return this.neg().mul(multiplier.neg());
      else
        return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
      return this.mul(multiplier.neg()).neg();
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
      return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
    var a48 = this.high >>> 16;
    var a32 = this.high & 65535;
    var a16 = this.low >>> 16;
    var a00 = this.low & 65535;
    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 65535;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 65535;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 65535;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 65535;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 65535;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 65535;
    return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
  };
  LongPrototype.mul = LongPrototype.multiply;
  LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
      divisor = fromValue(divisor);
    if (divisor.isZero())
      throw Error("division by zero");
    if (wasm) {
      if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
        return this;
      }
      var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
        this.low,
        this.high,
        divisor.low,
        divisor.high
      );
      return fromBits(low, wasm["get_high"](), this.unsigned);
    }
    if (this.isZero())
      return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
      if (this.eq(MIN_VALUE)) {
        if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
          return MIN_VALUE;
        else if (divisor.eq(MIN_VALUE))
          return ONE;
        else {
          var halfThis = this.shr(1);
          approx = halfThis.div(divisor).shl(1);
          if (approx.eq(ZERO)) {
            return divisor.isNegative() ? ONE : NEG_ONE;
          } else {
            rem = this.sub(divisor.mul(approx));
            res = approx.add(rem.div(divisor));
            return res;
          }
        }
      } else if (divisor.eq(MIN_VALUE))
        return this.unsigned ? UZERO : ZERO;
      if (this.isNegative()) {
        if (divisor.isNegative())
          return this.neg().div(divisor.neg());
        return this.neg().div(divisor).neg();
      } else if (divisor.isNegative())
        return this.div(divisor.neg()).neg();
      res = ZERO;
    } else {
      if (!divisor.unsigned)
        divisor = divisor.toUnsigned();
      if (divisor.gt(this))
        return UZERO;
      if (divisor.gt(this.shru(1)))
        return UONE;
      res = UZERO;
    }
    rem = this;
    while (rem.gte(divisor)) {
      approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
      var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
      while (approxRem.isNegative() || approxRem.gt(rem)) {
        approx -= delta;
        approxRes = fromNumber(approx, this.unsigned);
        approxRem = approxRes.mul(divisor);
      }
      if (approxRes.isZero())
        approxRes = ONE;
      res = res.add(approxRes);
      rem = rem.sub(approxRem);
    }
    return res;
  };
  LongPrototype.div = LongPrototype.divide;
  LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
      divisor = fromValue(divisor);
    if (wasm) {
      var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
        this.low,
        this.high,
        divisor.low,
        divisor.high
      );
      return fromBits(low, wasm["get_high"](), this.unsigned);
    }
    return this.sub(this.div(divisor).mul(divisor));
  };
  LongPrototype.mod = LongPrototype.modulo;
  LongPrototype.rem = LongPrototype.modulo;
  LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
  };
  LongPrototype.countLeadingZeros = function countLeadingZeros() {
    return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
  };
  LongPrototype.clz = LongPrototype.countLeadingZeros;
  LongPrototype.countTrailingZeros = function countTrailingZeros() {
    return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
  };
  LongPrototype.ctz = LongPrototype.countTrailingZeros;
  LongPrototype.and = function and(other) {
    if (!isLong(other))
      other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
  };
  LongPrototype.or = function or(other) {
    if (!isLong(other))
      other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
  };
  LongPrototype.xor = function xor(other) {
    if (!isLong(other))
      other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
  };
  LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
      numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
      return this;
    else if (numBits < 32)
      return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
    else
      return fromBits(0, this.low << numBits - 32, this.unsigned);
  };
  LongPrototype.shl = LongPrototype.shiftLeft;
  LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
      numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
      return this;
    else if (numBits < 32)
      return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
    else
      return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  };
  LongPrototype.shr = LongPrototype.shiftRight;
  LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;
    if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned);
    if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
    return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
  };
  LongPrototype.shru = LongPrototype.shiftRightUnsigned;
  LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
  LongPrototype.rotateLeft = function rotateLeft(numBits) {
    var b4;
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;
    if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
    if (numBits < 32) {
      b4 = 32 - numBits;
      return fromBits(this.low << numBits | this.high >>> b4, this.high << numBits | this.low >>> b4, this.unsigned);
    }
    numBits -= 32;
    b4 = 32 - numBits;
    return fromBits(this.high << numBits | this.low >>> b4, this.low << numBits | this.high >>> b4, this.unsigned);
  };
  LongPrototype.rotl = LongPrototype.rotateLeft;
  LongPrototype.rotateRight = function rotateRight(numBits) {
    var b4;
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;
    if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
    if (numBits < 32) {
      b4 = 32 - numBits;
      return fromBits(this.high << b4 | this.low >>> numBits, this.low << b4 | this.high >>> numBits, this.unsigned);
    }
    numBits -= 32;
    b4 = 32 - numBits;
    return fromBits(this.low << b4 | this.high >>> numBits, this.high << b4 | this.low >>> numBits, this.unsigned);
  };
  LongPrototype.rotr = LongPrototype.rotateRight;
  LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
      return this;
    return fromBits(this.low, this.high, false);
  };
  LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
      return this;
    return fromBits(this.low, this.high, true);
  };
  LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
  };
  LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high, lo = this.low;
    return [
      lo & 255,
      lo >>> 8 & 255,
      lo >>> 16 & 255,
      lo >>> 24,
      hi & 255,
      hi >>> 8 & 255,
      hi >>> 16 & 255,
      hi >>> 24
    ];
  };
  LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high, lo = this.low;
    return [
      hi >>> 24,
      hi >>> 16 & 255,
      hi >>> 8 & 255,
      hi & 255,
      lo >>> 24,
      lo >>> 16 & 255,
      lo >>> 8 & 255,
      lo & 255
    ];
  };
  Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
  };
  Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
      bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
      bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
      unsigned
    );
  };
  Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
      bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
      bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
      unsigned
    );
  };
  var long_default = Long;

  // frontend/ts/proto/jon/jon_shared_data_lrf.ts
  var import_minimal21 = __toESM(require_minimal2());
  function createBaseJonGuiDataLrf() {
    return { isScanning: false, isMeasuring: false, measureId: 0, target: void 0, meteo: void 0 };
  }
  var JonGuiDataLrf = {
    encode(message, writer = import_minimal21.default.Writer.create()) {
      if (message.isScanning !== false) {
        writer.uint32(8).bool(message.isScanning);
      }
      if (message.isMeasuring !== false) {
        writer.uint32(16).bool(message.isMeasuring);
      }
      if (message.measureId !== 0) {
        writer.uint32(24).int32(message.measureId);
      }
      if (message.target !== void 0) {
        JonGuiDataTarget.encode(message.target, writer.uint32(34).fork()).ldelim();
      }
      if (message.meteo !== void 0) {
        JonGuiDataMeteo.encode(message.meteo, writer.uint32(42).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataLrf();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.isScanning = reader.bool();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.isMeasuring = reader.bool();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.measureId = reader.int32();
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.target = JonGuiDataTarget.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
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
    fromJSON(object) {
      return {
        isScanning: isSet21(object.isScanning) ? globalThis.Boolean(object.isScanning) : false,
        isMeasuring: isSet21(object.isMeasuring) ? globalThis.Boolean(object.isMeasuring) : false,
        measureId: isSet21(object.measureId) ? globalThis.Number(object.measureId) : 0,
        target: isSet21(object.target) ? JonGuiDataTarget.fromJSON(object.target) : void 0,
        meteo: isSet21(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.isScanning !== false) {
        obj.isScanning = message.isScanning;
      }
      if (message.isMeasuring !== false) {
        obj.isMeasuring = message.isMeasuring;
      }
      if (message.measureId !== 0) {
        obj.measureId = Math.round(message.measureId);
      }
      if (message.target !== void 0) {
        obj.target = JonGuiDataTarget.toJSON(message.target);
      }
      if (message.meteo !== void 0) {
        obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataLrf.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataLrf();
      message.isScanning = object.isScanning ?? false;
      message.isMeasuring = object.isMeasuring ?? false;
      message.measureId = object.measureId ?? 0;
      message.target = object.target !== void 0 && object.target !== null ? JonGuiDataTarget.fromPartial(object.target) : void 0;
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      return message;
    }
  };
  function createBaseJonGuiDataTarget() {
    return {
      timestamp: 0,
      targetLongitude: 0,
      targetLatitude: 0,
      targetAltitude: 0,
      observerLongitude: 0,
      observerLatitude: 0,
      observerAltitude: 0,
      observerAzimuth: 0,
      observerElevation: 0,
      observerBank: 0,
      distance2d: 0,
      distance3b: 0,
      observerFixType: 0,
      rangeA: 0,
      rangeB: 0,
      rangeC: 0,
      radius: 0,
      sessionId: 0,
      targetId: 0,
      targetColor: void 0,
      type: 0
    };
  }
  var JonGuiDataTarget = {
    encode(message, writer = import_minimal21.default.Writer.create()) {
      if (message.timestamp !== 0) {
        writer.uint32(8).int64(message.timestamp);
      }
      if (message.targetLongitude !== 0) {
        writer.uint32(17).double(message.targetLongitude);
      }
      if (message.targetLatitude !== 0) {
        writer.uint32(25).double(message.targetLatitude);
      }
      if (message.targetAltitude !== 0) {
        writer.uint32(33).double(message.targetAltitude);
      }
      if (message.observerLongitude !== 0) {
        writer.uint32(41).double(message.observerLongitude);
      }
      if (message.observerLatitude !== 0) {
        writer.uint32(49).double(message.observerLatitude);
      }
      if (message.observerAltitude !== 0) {
        writer.uint32(57).double(message.observerAltitude);
      }
      if (message.observerAzimuth !== 0) {
        writer.uint32(65).double(message.observerAzimuth);
      }
      if (message.observerElevation !== 0) {
        writer.uint32(73).double(message.observerElevation);
      }
      if (message.observerBank !== 0) {
        writer.uint32(81).double(message.observerBank);
      }
      if (message.distance2d !== 0) {
        writer.uint32(89).double(message.distance2d);
      }
      if (message.distance3b !== 0) {
        writer.uint32(97).double(message.distance3b);
      }
      if (message.observerFixType !== 0) {
        writer.uint32(104).int32(message.observerFixType);
      }
      if (message.rangeA !== 0) {
        writer.uint32(113).double(message.rangeA);
      }
      if (message.rangeB !== 0) {
        writer.uint32(121).double(message.rangeB);
      }
      if (message.rangeC !== 0) {
        writer.uint32(129).double(message.rangeC);
      }
      if (message.radius !== 0) {
        writer.uint32(137).double(message.radius);
      }
      if (message.sessionId !== 0) {
        writer.uint32(144).int32(message.sessionId);
      }
      if (message.targetId !== 0) {
        writer.uint32(152).int32(message.targetId);
      }
      if (message.targetColor !== void 0) {
        RgbColor.encode(message.targetColor, writer.uint32(162).fork()).ldelim();
      }
      if (message.type !== 0) {
        writer.uint32(168).uint32(message.type);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataTarget();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.timestamp = longToNumber(reader.int64());
            continue;
          case 2:
            if (tag !== 17) {
              break;
            }
            message.targetLongitude = reader.double();
            continue;
          case 3:
            if (tag !== 25) {
              break;
            }
            message.targetLatitude = reader.double();
            continue;
          case 4:
            if (tag !== 33) {
              break;
            }
            message.targetAltitude = reader.double();
            continue;
          case 5:
            if (tag !== 41) {
              break;
            }
            message.observerLongitude = reader.double();
            continue;
          case 6:
            if (tag !== 49) {
              break;
            }
            message.observerLatitude = reader.double();
            continue;
          case 7:
            if (tag !== 57) {
              break;
            }
            message.observerAltitude = reader.double();
            continue;
          case 8:
            if (tag !== 65) {
              break;
            }
            message.observerAzimuth = reader.double();
            continue;
          case 9:
            if (tag !== 73) {
              break;
            }
            message.observerElevation = reader.double();
            continue;
          case 10:
            if (tag !== 81) {
              break;
            }
            message.observerBank = reader.double();
            continue;
          case 11:
            if (tag !== 89) {
              break;
            }
            message.distance2d = reader.double();
            continue;
          case 12:
            if (tag !== 97) {
              break;
            }
            message.distance3b = reader.double();
            continue;
          case 13:
            if (tag !== 104) {
              break;
            }
            message.observerFixType = reader.int32();
            continue;
          case 14:
            if (tag !== 113) {
              break;
            }
            message.rangeA = reader.double();
            continue;
          case 15:
            if (tag !== 121) {
              break;
            }
            message.rangeB = reader.double();
            continue;
          case 16:
            if (tag !== 129) {
              break;
            }
            message.rangeC = reader.double();
            continue;
          case 17:
            if (tag !== 137) {
              break;
            }
            message.radius = reader.double();
            continue;
          case 18:
            if (tag !== 144) {
              break;
            }
            message.sessionId = reader.int32();
            continue;
          case 19:
            if (tag !== 152) {
              break;
            }
            message.targetId = reader.int32();
            continue;
          case 20:
            if (tag !== 162) {
              break;
            }
            message.targetColor = RgbColor.decode(reader, reader.uint32());
            continue;
          case 21:
            if (tag !== 168) {
              break;
            }
            message.type = reader.uint32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        timestamp: isSet21(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
        targetLongitude: isSet21(object.targetLongitude) ? globalThis.Number(object.targetLongitude) : 0,
        targetLatitude: isSet21(object.targetLatitude) ? globalThis.Number(object.targetLatitude) : 0,
        targetAltitude: isSet21(object.targetAltitude) ? globalThis.Number(object.targetAltitude) : 0,
        observerLongitude: isSet21(object.observerLongitude) ? globalThis.Number(object.observerLongitude) : 0,
        observerLatitude: isSet21(object.observerLatitude) ? globalThis.Number(object.observerLatitude) : 0,
        observerAltitude: isSet21(object.observerAltitude) ? globalThis.Number(object.observerAltitude) : 0,
        observerAzimuth: isSet21(object.observerAzimuth) ? globalThis.Number(object.observerAzimuth) : 0,
        observerElevation: isSet21(object.observerElevation) ? globalThis.Number(object.observerElevation) : 0,
        observerBank: isSet21(object.observerBank) ? globalThis.Number(object.observerBank) : 0,
        distance2d: isSet21(object.distance2d) ? globalThis.Number(object.distance2d) : 0,
        distance3b: isSet21(object.distance3b) ? globalThis.Number(object.distance3b) : 0,
        observerFixType: isSet21(object.observerFixType) ? jonGuiDataGpsFixTypeFromJSON(object.observerFixType) : 0,
        rangeA: isSet21(object.rangeA) ? globalThis.Number(object.rangeA) : 0,
        rangeB: isSet21(object.rangeB) ? globalThis.Number(object.rangeB) : 0,
        rangeC: isSet21(object.rangeC) ? globalThis.Number(object.rangeC) : 0,
        radius: isSet21(object.radius) ? globalThis.Number(object.radius) : 0,
        sessionId: isSet21(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
        targetId: isSet21(object.targetId) ? globalThis.Number(object.targetId) : 0,
        targetColor: isSet21(object.targetColor) ? RgbColor.fromJSON(object.targetColor) : void 0,
        type: isSet21(object.type) ? globalThis.Number(object.type) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.timestamp !== 0) {
        obj.timestamp = Math.round(message.timestamp);
      }
      if (message.targetLongitude !== 0) {
        obj.targetLongitude = message.targetLongitude;
      }
      if (message.targetLatitude !== 0) {
        obj.targetLatitude = message.targetLatitude;
      }
      if (message.targetAltitude !== 0) {
        obj.targetAltitude = message.targetAltitude;
      }
      if (message.observerLongitude !== 0) {
        obj.observerLongitude = message.observerLongitude;
      }
      if (message.observerLatitude !== 0) {
        obj.observerLatitude = message.observerLatitude;
      }
      if (message.observerAltitude !== 0) {
        obj.observerAltitude = message.observerAltitude;
      }
      if (message.observerAzimuth !== 0) {
        obj.observerAzimuth = message.observerAzimuth;
      }
      if (message.observerElevation !== 0) {
        obj.observerElevation = message.observerElevation;
      }
      if (message.observerBank !== 0) {
        obj.observerBank = message.observerBank;
      }
      if (message.distance2d !== 0) {
        obj.distance2d = message.distance2d;
      }
      if (message.distance3b !== 0) {
        obj.distance3b = message.distance3b;
      }
      if (message.observerFixType !== 0) {
        obj.observerFixType = jonGuiDataGpsFixTypeToJSON(message.observerFixType);
      }
      if (message.rangeA !== 0) {
        obj.rangeA = message.rangeA;
      }
      if (message.rangeB !== 0) {
        obj.rangeB = message.rangeB;
      }
      if (message.rangeC !== 0) {
        obj.rangeC = message.rangeC;
      }
      if (message.radius !== 0) {
        obj.radius = message.radius;
      }
      if (message.sessionId !== 0) {
        obj.sessionId = Math.round(message.sessionId);
      }
      if (message.targetId !== 0) {
        obj.targetId = Math.round(message.targetId);
      }
      if (message.targetColor !== void 0) {
        obj.targetColor = RgbColor.toJSON(message.targetColor);
      }
      if (message.type !== 0) {
        obj.type = Math.round(message.type);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataTarget.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataTarget();
      message.timestamp = object.timestamp ?? 0;
      message.targetLongitude = object.targetLongitude ?? 0;
      message.targetLatitude = object.targetLatitude ?? 0;
      message.targetAltitude = object.targetAltitude ?? 0;
      message.observerLongitude = object.observerLongitude ?? 0;
      message.observerLatitude = object.observerLatitude ?? 0;
      message.observerAltitude = object.observerAltitude ?? 0;
      message.observerAzimuth = object.observerAzimuth ?? 0;
      message.observerElevation = object.observerElevation ?? 0;
      message.observerBank = object.observerBank ?? 0;
      message.distance2d = object.distance2d ?? 0;
      message.distance3b = object.distance3b ?? 0;
      message.observerFixType = object.observerFixType ?? 0;
      message.rangeA = object.rangeA ?? 0;
      message.rangeB = object.rangeB ?? 0;
      message.rangeC = object.rangeC ?? 0;
      message.radius = object.radius ?? 0;
      message.sessionId = object.sessionId ?? 0;
      message.targetId = object.targetId ?? 0;
      message.targetColor = object.targetColor !== void 0 && object.targetColor !== null ? RgbColor.fromPartial(object.targetColor) : void 0;
      message.type = object.type ?? 0;
      return message;
    }
  };
  function createBaseRgbColor() {
    return { red: 0, green: 0, blue: 0 };
  }
  var RgbColor = {
    encode(message, writer = import_minimal21.default.Writer.create()) {
      if (message.red !== 0) {
        writer.uint32(8).uint32(message.red);
      }
      if (message.green !== 0) {
        writer.uint32(16).uint32(message.green);
      }
      if (message.blue !== 0) {
        writer.uint32(24).uint32(message.blue);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseRgbColor();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.red = reader.uint32();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.green = reader.uint32();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.blue = reader.uint32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        red: isSet21(object.red) ? globalThis.Number(object.red) : 0,
        green: isSet21(object.green) ? globalThis.Number(object.green) : 0,
        blue: isSet21(object.blue) ? globalThis.Number(object.blue) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.red !== 0) {
        obj.red = Math.round(message.red);
      }
      if (message.green !== 0) {
        obj.green = Math.round(message.green);
      }
      if (message.blue !== 0) {
        obj.blue = Math.round(message.blue);
      }
      return obj;
    },
    create(base) {
      return RgbColor.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseRgbColor();
      message.red = object.red ?? 0;
      message.green = object.green ?? 0;
      message.blue = object.blue ?? 0;
      return message;
    }
  };
  function longToNumber(long) {
    if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
      throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
      throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
    }
    return long.toNumber();
  }
  if (import_minimal21.default.util.Long !== long_default) {
    import_minimal21.default.util.Long = long_default;
    import_minimal21.default.configure();
  }
  function isSet21(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_power.ts
  var import_minimal22 = __toESM(require_minimal2());
  function createBaseJonGuiDataPowerModuleState() {
    return {
      voltage: 0,
      current: 0,
      power: 0,
      isAlarm: false,
      canCmdAddress: 0,
      canDataAddress: 0,
      isPowerOn: false,
      canDevice: 0
    };
  }
  var JonGuiDataPowerModuleState = {
    encode(message, writer = import_minimal22.default.Writer.create()) {
      if (message.voltage !== 0) {
        writer.uint32(8).int32(message.voltage);
      }
      if (message.current !== 0) {
        writer.uint32(16).int32(message.current);
      }
      if (message.power !== 0) {
        writer.uint32(24).int32(message.power);
      }
      if (message.isAlarm !== false) {
        writer.uint32(32).bool(message.isAlarm);
      }
      if (message.canCmdAddress !== 0) {
        writer.uint32(40).int32(message.canCmdAddress);
      }
      if (message.canDataAddress !== 0) {
        writer.uint32(48).int32(message.canDataAddress);
      }
      if (message.isPowerOn !== false) {
        writer.uint32(56).bool(message.isPowerOn);
      }
      if (message.canDevice !== 0) {
        writer.uint32(64).int32(message.canDevice);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal22.default.Reader ? input : import_minimal22.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataPowerModuleState();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.voltage = reader.int32();
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.current = reader.int32();
            continue;
          case 3:
            if (tag !== 24) {
              break;
            }
            message.power = reader.int32();
            continue;
          case 4:
            if (tag !== 32) {
              break;
            }
            message.isAlarm = reader.bool();
            continue;
          case 5:
            if (tag !== 40) {
              break;
            }
            message.canCmdAddress = reader.int32();
            continue;
          case 6:
            if (tag !== 48) {
              break;
            }
            message.canDataAddress = reader.int32();
            continue;
          case 7:
            if (tag !== 56) {
              break;
            }
            message.isPowerOn = reader.bool();
            continue;
          case 8:
            if (tag !== 64) {
              break;
            }
            message.canDevice = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        voltage: isSet22(object.voltage) ? globalThis.Number(object.voltage) : 0,
        current: isSet22(object.current) ? globalThis.Number(object.current) : 0,
        power: isSet22(object.power) ? globalThis.Number(object.power) : 0,
        isAlarm: isSet22(object.isAlarm) ? globalThis.Boolean(object.isAlarm) : false,
        canCmdAddress: isSet22(object.canCmdAddress) ? globalThis.Number(object.canCmdAddress) : 0,
        canDataAddress: isSet22(object.canDataAddress) ? globalThis.Number(object.canDataAddress) : 0,
        isPowerOn: isSet22(object.isPowerOn) ? globalThis.Boolean(object.isPowerOn) : false,
        canDevice: isSet22(object.canDevice) ? jonGuiDataPowerCanDeviceFromJSON(object.canDevice) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.voltage !== 0) {
        obj.voltage = Math.round(message.voltage);
      }
      if (message.current !== 0) {
        obj.current = Math.round(message.current);
      }
      if (message.power !== 0) {
        obj.power = Math.round(message.power);
      }
      if (message.isAlarm !== false) {
        obj.isAlarm = message.isAlarm;
      }
      if (message.canCmdAddress !== 0) {
        obj.canCmdAddress = Math.round(message.canCmdAddress);
      }
      if (message.canDataAddress !== 0) {
        obj.canDataAddress = Math.round(message.canDataAddress);
      }
      if (message.isPowerOn !== false) {
        obj.isPowerOn = message.isPowerOn;
      }
      if (message.canDevice !== 0) {
        obj.canDevice = jonGuiDataPowerCanDeviceToJSON(message.canDevice);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataPowerModuleState.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataPowerModuleState();
      message.voltage = object.voltage ?? 0;
      message.current = object.current ?? 0;
      message.power = object.power ?? 0;
      message.isAlarm = object.isAlarm ?? false;
      message.canCmdAddress = object.canCmdAddress ?? 0;
      message.canDataAddress = object.canDataAddress ?? 0;
      message.isPowerOn = object.isPowerOn ?? false;
      message.canDevice = object.canDevice ?? 0;
      return message;
    }
  };
  function createBaseJonGuiDataPower() {
    return {
      s0: void 0,
      s1: void 0,
      s2: void 0,
      s3: void 0,
      s4: void 0,
      s5: void 0,
      s6: void 0,
      s7: void 0,
      meteo: void 0
    };
  }
  var JonGuiDataPower = {
    encode(message, writer = import_minimal22.default.Writer.create()) {
      if (message.s0 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s0, writer.uint32(10).fork()).ldelim();
      }
      if (message.s1 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s1, writer.uint32(18).fork()).ldelim();
      }
      if (message.s2 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s2, writer.uint32(26).fork()).ldelim();
      }
      if (message.s3 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s3, writer.uint32(34).fork()).ldelim();
      }
      if (message.s4 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s4, writer.uint32(42).fork()).ldelim();
      }
      if (message.s5 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s5, writer.uint32(50).fork()).ldelim();
      }
      if (message.s6 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s6, writer.uint32(58).fork()).ldelim();
      }
      if (message.s7 !== void 0) {
        JonGuiDataPowerModuleState.encode(message.s7, writer.uint32(66).fork()).ldelim();
      }
      if (message.meteo !== void 0) {
        JonGuiDataMeteo.encode(message.meteo, writer.uint32(74).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal22.default.Reader ? input : import_minimal22.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataPower();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }
            message.s0 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 2:
            if (tag !== 18) {
              break;
            }
            message.s1 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.s2 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.s3 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.s4 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.s5 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.s6 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.s7 = JonGuiDataPowerModuleState.decode(reader, reader.uint32());
            continue;
          case 9:
            if (tag !== 74) {
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
    fromJSON(object) {
      return {
        s0: isSet22(object.s0) ? JonGuiDataPowerModuleState.fromJSON(object.s0) : void 0,
        s1: isSet22(object.s1) ? JonGuiDataPowerModuleState.fromJSON(object.s1) : void 0,
        s2: isSet22(object.s2) ? JonGuiDataPowerModuleState.fromJSON(object.s2) : void 0,
        s3: isSet22(object.s3) ? JonGuiDataPowerModuleState.fromJSON(object.s3) : void 0,
        s4: isSet22(object.s4) ? JonGuiDataPowerModuleState.fromJSON(object.s4) : void 0,
        s5: isSet22(object.s5) ? JonGuiDataPowerModuleState.fromJSON(object.s5) : void 0,
        s6: isSet22(object.s6) ? JonGuiDataPowerModuleState.fromJSON(object.s6) : void 0,
        s7: isSet22(object.s7) ? JonGuiDataPowerModuleState.fromJSON(object.s7) : void 0,
        meteo: isSet22(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.s0 !== void 0) {
        obj.s0 = JonGuiDataPowerModuleState.toJSON(message.s0);
      }
      if (message.s1 !== void 0) {
        obj.s1 = JonGuiDataPowerModuleState.toJSON(message.s1);
      }
      if (message.s2 !== void 0) {
        obj.s2 = JonGuiDataPowerModuleState.toJSON(message.s2);
      }
      if (message.s3 !== void 0) {
        obj.s3 = JonGuiDataPowerModuleState.toJSON(message.s3);
      }
      if (message.s4 !== void 0) {
        obj.s4 = JonGuiDataPowerModuleState.toJSON(message.s4);
      }
      if (message.s5 !== void 0) {
        obj.s5 = JonGuiDataPowerModuleState.toJSON(message.s5);
      }
      if (message.s6 !== void 0) {
        obj.s6 = JonGuiDataPowerModuleState.toJSON(message.s6);
      }
      if (message.s7 !== void 0) {
        obj.s7 = JonGuiDataPowerModuleState.toJSON(message.s7);
      }
      if (message.meteo !== void 0) {
        obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataPower.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataPower();
      message.s0 = object.s0 !== void 0 && object.s0 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s0) : void 0;
      message.s1 = object.s1 !== void 0 && object.s1 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s1) : void 0;
      message.s2 = object.s2 !== void 0 && object.s2 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s2) : void 0;
      message.s3 = object.s3 !== void 0 && object.s3 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s3) : void 0;
      message.s4 = object.s4 !== void 0 && object.s4 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s4) : void 0;
      message.s5 = object.s5 !== void 0 && object.s5 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s5) : void 0;
      message.s6 = object.s6 !== void 0 && object.s6 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s6) : void 0;
      message.s7 = object.s7 !== void 0 && object.s7 !== null ? JonGuiDataPowerModuleState.fromPartial(object.s7) : void 0;
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      return message;
    }
  };
  function isSet22(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_rotary.ts
  var import_minimal23 = __toESM(require_minimal2());
  function createBaseJonGuiDataRotary() {
    return {
      azimuth: 0,
      azimuthSpeed: 0,
      elevation: 0,
      elevationSpeed: 0,
      baseAzimuth: 0,
      baseElevation: 0,
      baseBank: 0,
      isMoving: false,
      meteo: void 0,
      mode: 0
    };
  }
  var JonGuiDataRotary = {
    encode(message, writer = import_minimal23.default.Writer.create()) {
      if (message.azimuth !== 0) {
        writer.uint32(13).float(message.azimuth);
      }
      if (message.azimuthSpeed !== 0) {
        writer.uint32(21).float(message.azimuthSpeed);
      }
      if (message.elevation !== 0) {
        writer.uint32(29).float(message.elevation);
      }
      if (message.elevationSpeed !== 0) {
        writer.uint32(37).float(message.elevationSpeed);
      }
      if (message.baseAzimuth !== 0) {
        writer.uint32(45).float(message.baseAzimuth);
      }
      if (message.baseElevation !== 0) {
        writer.uint32(53).float(message.baseElevation);
      }
      if (message.baseBank !== 0) {
        writer.uint32(61).float(message.baseBank);
      }
      if (message.isMoving !== false) {
        writer.uint32(64).bool(message.isMoving);
      }
      if (message.meteo !== void 0) {
        JonGuiDataMeteo.encode(message.meteo, writer.uint32(74).fork()).ldelim();
      }
      if (message.mode !== 0) {
        writer.uint32(80).int32(message.mode);
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal23.default.Reader ? input : import_minimal23.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataRotary();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 13) {
              break;
            }
            message.azimuth = reader.float();
            continue;
          case 2:
            if (tag !== 21) {
              break;
            }
            message.azimuthSpeed = reader.float();
            continue;
          case 3:
            if (tag !== 29) {
              break;
            }
            message.elevation = reader.float();
            continue;
          case 4:
            if (tag !== 37) {
              break;
            }
            message.elevationSpeed = reader.float();
            continue;
          case 5:
            if (tag !== 45) {
              break;
            }
            message.baseAzimuth = reader.float();
            continue;
          case 6:
            if (tag !== 53) {
              break;
            }
            message.baseElevation = reader.float();
            continue;
          case 7:
            if (tag !== 61) {
              break;
            }
            message.baseBank = reader.float();
            continue;
          case 8:
            if (tag !== 64) {
              break;
            }
            message.isMoving = reader.bool();
            continue;
          case 9:
            if (tag !== 74) {
              break;
            }
            message.meteo = JonGuiDataMeteo.decode(reader, reader.uint32());
            continue;
          case 10:
            if (tag !== 80) {
              break;
            }
            message.mode = reader.int32();
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        azimuth: isSet23(object.azimuth) ? globalThis.Number(object.azimuth) : 0,
        azimuthSpeed: isSet23(object.azimuthSpeed) ? globalThis.Number(object.azimuthSpeed) : 0,
        elevation: isSet23(object.elevation) ? globalThis.Number(object.elevation) : 0,
        elevationSpeed: isSet23(object.elevationSpeed) ? globalThis.Number(object.elevationSpeed) : 0,
        baseAzimuth: isSet23(object.baseAzimuth) ? globalThis.Number(object.baseAzimuth) : 0,
        baseElevation: isSet23(object.baseElevation) ? globalThis.Number(object.baseElevation) : 0,
        baseBank: isSet23(object.baseBank) ? globalThis.Number(object.baseBank) : 0,
        isMoving: isSet23(object.isMoving) ? globalThis.Boolean(object.isMoving) : false,
        meteo: isSet23(object.meteo) ? JonGuiDataMeteo.fromJSON(object.meteo) : void 0,
        mode: isSet23(object.mode) ? jonGuiDataRotaryModeFromJSON(object.mode) : 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.azimuth !== 0) {
        obj.azimuth = message.azimuth;
      }
      if (message.azimuthSpeed !== 0) {
        obj.azimuthSpeed = message.azimuthSpeed;
      }
      if (message.elevation !== 0) {
        obj.elevation = message.elevation;
      }
      if (message.elevationSpeed !== 0) {
        obj.elevationSpeed = message.elevationSpeed;
      }
      if (message.baseAzimuth !== 0) {
        obj.baseAzimuth = message.baseAzimuth;
      }
      if (message.baseElevation !== 0) {
        obj.baseElevation = message.baseElevation;
      }
      if (message.baseBank !== 0) {
        obj.baseBank = message.baseBank;
      }
      if (message.isMoving !== false) {
        obj.isMoving = message.isMoving;
      }
      if (message.meteo !== void 0) {
        obj.meteo = JonGuiDataMeteo.toJSON(message.meteo);
      }
      if (message.mode !== 0) {
        obj.mode = jonGuiDataRotaryModeToJSON(message.mode);
      }
      return obj;
    },
    create(base) {
      return JonGuiDataRotary.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataRotary();
      message.azimuth = object.azimuth ?? 0;
      message.azimuthSpeed = object.azimuthSpeed ?? 0;
      message.elevation = object.elevation ?? 0;
      message.elevationSpeed = object.elevationSpeed ?? 0;
      message.baseAzimuth = object.baseAzimuth ?? 0;
      message.baseElevation = object.baseElevation ?? 0;
      message.baseBank = object.baseBank ?? 0;
      message.isMoving = object.isMoving ?? false;
      message.meteo = object.meteo !== void 0 && object.meteo !== null ? JonGuiDataMeteo.fromPartial(object.meteo) : void 0;
      message.mode = object.mode ?? 0;
      return message;
    }
  };
  function isSet23(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_system.ts
  var import_minimal24 = __toESM(require_minimal2());
  function createBaseJonGuiDataSystem() {
    return { cpuTemperature: 0, gpuTemperature: 0, gpuLoad: 0, cpuLoad: 0, powerConsumption: 0 };
  }
  var JonGuiDataSystem = {
    encode(message, writer = import_minimal24.default.Writer.create()) {
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
    decode(input, length) {
      const reader = input instanceof import_minimal24.default.Reader ? input : import_minimal24.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
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
    fromJSON(object) {
      return {
        cpuTemperature: isSet24(object.cpuTemperature) ? globalThis.Number(object.cpuTemperature) : 0,
        gpuTemperature: isSet24(object.gpuTemperature) ? globalThis.Number(object.gpuTemperature) : 0,
        gpuLoad: isSet24(object.gpuLoad) ? globalThis.Number(object.gpuLoad) : 0,
        cpuLoad: isSet24(object.cpuLoad) ? globalThis.Number(object.cpuLoad) : 0,
        powerConsumption: isSet24(object.powerConsumption) ? globalThis.Number(object.powerConsumption) : 0
      };
    },
    toJSON(message) {
      const obj = {};
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
    create(base) {
      return JonGuiDataSystem.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataSystem();
      message.cpuTemperature = object.cpuTemperature ?? 0;
      message.gpuTemperature = object.gpuTemperature ?? 0;
      message.gpuLoad = object.gpuLoad ?? 0;
      message.cpuLoad = object.cpuLoad ?? 0;
      message.powerConsumption = object.powerConsumption ?? 0;
      return message;
    }
  };
  function isSet24(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data_time.ts
  var import_minimal25 = __toESM(require_minimal2());
  function createBaseJonGuiDataTime() {
    return { timestamp: 0, manualTimestamp: 0, zoneId: 0, useManualTime: false };
  }
  var JonGuiDataTime = {
    encode(message, writer = import_minimal25.default.Writer.create()) {
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
    decode(input, length) {
      const reader = input instanceof import_minimal25.default.Reader ? input : import_minimal25.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGuiDataTime();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 8) {
              break;
            }
            message.timestamp = longToNumber2(reader.int64());
            continue;
          case 2:
            if (tag !== 16) {
              break;
            }
            message.manualTimestamp = longToNumber2(reader.int64());
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
    fromJSON(object) {
      return {
        timestamp: isSet25(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
        manualTimestamp: isSet25(object.manualTimestamp) ? globalThis.Number(object.manualTimestamp) : 0,
        zoneId: isSet25(object.zoneId) ? globalThis.Number(object.zoneId) : 0,
        useManualTime: isSet25(object.useManualTime) ? globalThis.Boolean(object.useManualTime) : false
      };
    },
    toJSON(message) {
      const obj = {};
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
    create(base) {
      return JonGuiDataTime.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGuiDataTime();
      message.timestamp = object.timestamp ?? 0;
      message.manualTimestamp = object.manualTimestamp ?? 0;
      message.zoneId = object.zoneId ?? 0;
      message.useManualTime = object.useManualTime ?? false;
      return message;
    }
  };
  function longToNumber2(long) {
    if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
      throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
      throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
    }
    return long.toNumber();
  }
  if (import_minimal25.default.util.Long !== long_default) {
    import_minimal25.default.util.Long = long_default;
    import_minimal25.default.configure();
  }
  function isSet25(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/jon_shared_data.ts
  function createBaseJonGUIState() {
    return {
      protocolVersion: 0,
      system: void 0,
      meteoInternal: void 0,
      meteoExternal: void 0,
      lrf: void 0,
      time: void 0,
      gps: void 0,
      compass: void 0,
      rotary: void 0,
      cameraDay: void 0,
      cameraHeat: void 0,
      compassCalibration: void 0,
      environment: void 0,
      power: void 0
    };
  }
  var JonGUIState = {
    encode(message, writer = import_minimal26.default.Writer.create()) {
      if (message.protocolVersion !== 0) {
        writer.uint32(8).uint32(message.protocolVersion);
      }
      if (message.system !== void 0) {
        JonGuiDataSystem.encode(message.system, writer.uint32(18).fork()).ldelim();
      }
      if (message.meteoInternal !== void 0) {
        JonGuiDataMeteo.encode(message.meteoInternal, writer.uint32(26).fork()).ldelim();
      }
      if (message.meteoExternal !== void 0) {
        JonGuiDataMeteo.encode(message.meteoExternal, writer.uint32(34).fork()).ldelim();
      }
      if (message.lrf !== void 0) {
        JonGuiDataLrf.encode(message.lrf, writer.uint32(42).fork()).ldelim();
      }
      if (message.time !== void 0) {
        JonGuiDataTime.encode(message.time, writer.uint32(50).fork()).ldelim();
      }
      if (message.gps !== void 0) {
        JonGuiDataGps.encode(message.gps, writer.uint32(58).fork()).ldelim();
      }
      if (message.compass !== void 0) {
        JonGuiDataCompass.encode(message.compass, writer.uint32(66).fork()).ldelim();
      }
      if (message.rotary !== void 0) {
        JonGuiDataRotary.encode(message.rotary, writer.uint32(74).fork()).ldelim();
      }
      if (message.cameraDay !== void 0) {
        JonGuiDataCameraDay.encode(message.cameraDay, writer.uint32(82).fork()).ldelim();
      }
      if (message.cameraHeat !== void 0) {
        JonGuiDataCameraHeat.encode(message.cameraHeat, writer.uint32(90).fork()).ldelim();
      }
      if (message.compassCalibration !== void 0) {
        JonGuiDataCompassCalibration.encode(message.compassCalibration, writer.uint32(98).fork()).ldelim();
      }
      if (message.environment !== void 0) {
        JonGuiDataEnvironment.encode(message.environment, writer.uint32(106).fork()).ldelim();
      }
      if (message.power !== void 0) {
        JonGuiDataPower.encode(message.power, writer.uint32(114).fork()).ldelim();
      }
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal26.default.Reader ? input : import_minimal26.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseJonGUIState();
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
            if (tag !== 18) {
              break;
            }
            message.system = JonGuiDataSystem.decode(reader, reader.uint32());
            continue;
          case 3:
            if (tag !== 26) {
              break;
            }
            message.meteoInternal = JonGuiDataMeteo.decode(reader, reader.uint32());
            continue;
          case 4:
            if (tag !== 34) {
              break;
            }
            message.meteoExternal = JonGuiDataMeteo.decode(reader, reader.uint32());
            continue;
          case 5:
            if (tag !== 42) {
              break;
            }
            message.lrf = JonGuiDataLrf.decode(reader, reader.uint32());
            continue;
          case 6:
            if (tag !== 50) {
              break;
            }
            message.time = JonGuiDataTime.decode(reader, reader.uint32());
            continue;
          case 7:
            if (tag !== 58) {
              break;
            }
            message.gps = JonGuiDataGps.decode(reader, reader.uint32());
            continue;
          case 8:
            if (tag !== 66) {
              break;
            }
            message.compass = JonGuiDataCompass.decode(reader, reader.uint32());
            continue;
          case 9:
            if (tag !== 74) {
              break;
            }
            message.rotary = JonGuiDataRotary.decode(reader, reader.uint32());
            continue;
          case 10:
            if (tag !== 82) {
              break;
            }
            message.cameraDay = JonGuiDataCameraDay.decode(reader, reader.uint32());
            continue;
          case 11:
            if (tag !== 90) {
              break;
            }
            message.cameraHeat = JonGuiDataCameraHeat.decode(reader, reader.uint32());
            continue;
          case 12:
            if (tag !== 98) {
              break;
            }
            message.compassCalibration = JonGuiDataCompassCalibration.decode(reader, reader.uint32());
            continue;
          case 13:
            if (tag !== 106) {
              break;
            }
            message.environment = JonGuiDataEnvironment.decode(reader, reader.uint32());
            continue;
          case 14:
            if (tag !== 114) {
              break;
            }
            message.power = JonGuiDataPower.decode(reader, reader.uint32());
            continue;
        }
        if ((tag & 7) === 4 || tag === 0) {
          break;
        }
        reader.skipType(tag & 7);
      }
      return message;
    },
    fromJSON(object) {
      return {
        protocolVersion: isSet26(object.protocolVersion) ? globalThis.Number(object.protocolVersion) : 0,
        system: isSet26(object.system) ? JonGuiDataSystem.fromJSON(object.system) : void 0,
        meteoInternal: isSet26(object.meteoInternal) ? JonGuiDataMeteo.fromJSON(object.meteoInternal) : void 0,
        meteoExternal: isSet26(object.meteoExternal) ? JonGuiDataMeteo.fromJSON(object.meteoExternal) : void 0,
        lrf: isSet26(object.lrf) ? JonGuiDataLrf.fromJSON(object.lrf) : void 0,
        time: isSet26(object.time) ? JonGuiDataTime.fromJSON(object.time) : void 0,
        gps: isSet26(object.gps) ? JonGuiDataGps.fromJSON(object.gps) : void 0,
        compass: isSet26(object.compass) ? JonGuiDataCompass.fromJSON(object.compass) : void 0,
        rotary: isSet26(object.rotary) ? JonGuiDataRotary.fromJSON(object.rotary) : void 0,
        cameraDay: isSet26(object.cameraDay) ? JonGuiDataCameraDay.fromJSON(object.cameraDay) : void 0,
        cameraHeat: isSet26(object.cameraHeat) ? JonGuiDataCameraHeat.fromJSON(object.cameraHeat) : void 0,
        compassCalibration: isSet26(object.compassCalibration) ? JonGuiDataCompassCalibration.fromJSON(object.compassCalibration) : void 0,
        environment: isSet26(object.environment) ? JonGuiDataEnvironment.fromJSON(object.environment) : void 0,
        power: isSet26(object.power) ? JonGuiDataPower.fromJSON(object.power) : void 0
      };
    },
    toJSON(message) {
      const obj = {};
      if (message.protocolVersion !== 0) {
        obj.protocolVersion = Math.round(message.protocolVersion);
      }
      if (message.system !== void 0) {
        obj.system = JonGuiDataSystem.toJSON(message.system);
      }
      if (message.meteoInternal !== void 0) {
        obj.meteoInternal = JonGuiDataMeteo.toJSON(message.meteoInternal);
      }
      if (message.meteoExternal !== void 0) {
        obj.meteoExternal = JonGuiDataMeteo.toJSON(message.meteoExternal);
      }
      if (message.lrf !== void 0) {
        obj.lrf = JonGuiDataLrf.toJSON(message.lrf);
      }
      if (message.time !== void 0) {
        obj.time = JonGuiDataTime.toJSON(message.time);
      }
      if (message.gps !== void 0) {
        obj.gps = JonGuiDataGps.toJSON(message.gps);
      }
      if (message.compass !== void 0) {
        obj.compass = JonGuiDataCompass.toJSON(message.compass);
      }
      if (message.rotary !== void 0) {
        obj.rotary = JonGuiDataRotary.toJSON(message.rotary);
      }
      if (message.cameraDay !== void 0) {
        obj.cameraDay = JonGuiDataCameraDay.toJSON(message.cameraDay);
      }
      if (message.cameraHeat !== void 0) {
        obj.cameraHeat = JonGuiDataCameraHeat.toJSON(message.cameraHeat);
      }
      if (message.compassCalibration !== void 0) {
        obj.compassCalibration = JonGuiDataCompassCalibration.toJSON(message.compassCalibration);
      }
      if (message.environment !== void 0) {
        obj.environment = JonGuiDataEnvironment.toJSON(message.environment);
      }
      if (message.power !== void 0) {
        obj.power = JonGuiDataPower.toJSON(message.power);
      }
      return obj;
    },
    create(base) {
      return JonGUIState.fromPartial(base ?? {});
    },
    fromPartial(object) {
      const message = createBaseJonGUIState();
      message.protocolVersion = object.protocolVersion ?? 0;
      message.system = object.system !== void 0 && object.system !== null ? JonGuiDataSystem.fromPartial(object.system) : void 0;
      message.meteoInternal = object.meteoInternal !== void 0 && object.meteoInternal !== null ? JonGuiDataMeteo.fromPartial(object.meteoInternal) : void 0;
      message.meteoExternal = object.meteoExternal !== void 0 && object.meteoExternal !== null ? JonGuiDataMeteo.fromPartial(object.meteoExternal) : void 0;
      message.lrf = object.lrf !== void 0 && object.lrf !== null ? JonGuiDataLrf.fromPartial(object.lrf) : void 0;
      message.time = object.time !== void 0 && object.time !== null ? JonGuiDataTime.fromPartial(object.time) : void 0;
      message.gps = object.gps !== void 0 && object.gps !== null ? JonGuiDataGps.fromPartial(object.gps) : void 0;
      message.compass = object.compass !== void 0 && object.compass !== null ? JonGuiDataCompass.fromPartial(object.compass) : void 0;
      message.rotary = object.rotary !== void 0 && object.rotary !== null ? JonGuiDataRotary.fromPartial(object.rotary) : void 0;
      message.cameraDay = object.cameraDay !== void 0 && object.cameraDay !== null ? JonGuiDataCameraDay.fromPartial(object.cameraDay) : void 0;
      message.cameraHeat = object.cameraHeat !== void 0 && object.cameraHeat !== null ? JonGuiDataCameraHeat.fromPartial(object.cameraHeat) : void 0;
      message.compassCalibration = object.compassCalibration !== void 0 && object.compassCalibration !== null ? JonGuiDataCompassCalibration.fromPartial(object.compassCalibration) : void 0;
      message.environment = object.environment !== void 0 && object.environment !== null ? JonGuiDataEnvironment.fromPartial(object.environment) : void 0;
      message.power = object.power !== void 0 && object.power !== null ? JonGuiDataPower.fromPartial(object.power) : void 0;
      return message;
    }
  };
  function isSet26(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/statePub/deviceStateDispatch.ts
  var DeviceStateDispatch = class {
    constructor(channelName = "deviceState") {
      this.channel = new BroadcastChannel(channelName);
      this.channel.onmessage = this.handleBroadcastMessage.bind(this);
      this.systemSignal = d(void 0);
      this.lrfSignal = d(void 0);
      this.timeSignal = d(void 0);
      this.gpsSignal = d(void 0);
      this.compassSignal = d(void 0);
      this.rotarySignal = d(void 0);
      this.powerSignal = d(void 0);
      this.cameraDaySignal = d(void 0);
      this.cameraHeatSignal = d(void 0);
      this.compassCalibrationSignal = d(void 0);
      this.environmentSignal = d(void 0);
    }
    handleBroadcastMessage(event) {
      try {
        const binaryData = new Uint8Array(event.data);
        const deserializedData = JonGUIState.decode(binaryData);
        this.updateSignals(deserializedData);
      } catch (error) {
        console.error("Error deserializing JonGUIState:", error);
      }
    }
    updateSignals(newState) {
      this.compareAndUpdateSignal("system", this.systemSignal, newState.system);
      this.compareAndUpdateSignal("lrf", this.lrfSignal, newState.lrf);
      this.compareAndUpdateSignal("time", this.timeSignal, newState.time);
      this.compareAndUpdateSignal("gps", this.gpsSignal, newState.gps);
      this.compareAndUpdateSignal("compass", this.compassSignal, newState.compass);
      this.compareAndUpdateSignal("rotary", this.rotarySignal, newState.rotary);
      this.compareAndUpdateSignal("power", this.powerSignal, newState.power);
      this.compareAndUpdateSignal("cameraDay", this.cameraDaySignal, newState.cameraDay);
      this.compareAndUpdateSignal("cameraHeat", this.cameraHeatSignal, newState.cameraHeat);
      this.compareAndUpdateSignal("compassCalibration", this.compassCalibrationSignal, newState.compassCalibration);
      this.compareAndUpdateSignal("environment", this.environmentSignal, newState.environment);
    }
    compareAndUpdateSignal(key, signal, newValue) {
      if (JSON.stringify(signal.value) !== JSON.stringify(newValue)) {
        console.log(`Updating ${key} signal:`, newValue);
        signal.value = newValue;
      }
    }
    get system() {
      return this.systemSignal;
    }
    get lrf() {
      return this.lrfSignal;
    }
    get time() {
      return this.timeSignal;
    }
    get gps() {
      return this.gpsSignal;
    }
    get compass() {
      return this.compassSignal;
    }
    get rotary() {
      return this.rotarySignal;
    }
    get power() {
      return this.powerSignal;
    }
    get cameraDay() {
      return this.cameraDaySignal;
    }
    get cameraHeat() {
      return this.cameraHeatSignal;
    }
    get compassCalibration() {
      return this.compassCalibrationSignal;
    }
    get environment() {
      return this.environmentSignal;
    }
    destroy() {
      this.channel.close();
    }
  };

  // frontend/node_modules/@lit/reactive-element/css-tag.js
  var t5 = globalThis;
  var e5 = t5.ShadowRoot && (void 0 === t5.ShadyCSS || t5.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s5 = Symbol();
  var o4 = /* @__PURE__ */ new WeakMap();
  var n3 = class {
    constructor(t8, e9, o7) {
      if (this._$cssResult$ = true, o7 !== s5) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t8, this.t = e9;
    }
    get styleSheet() {
      let t8 = this.o;
      const s6 = this.t;
      if (e5 && void 0 === t8) {
        const e9 = void 0 !== s6 && 1 === s6.length;
        e9 && (t8 = o4.get(s6)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && o4.set(s6, t8));
      }
      return t8;
    }
    toString() {
      return this.cssText;
    }
  };
  var r3 = (t8) => new n3("string" == typeof t8 ? t8 : t8 + "", void 0, s5);
  var i5 = (t8, ...e9) => {
    const o7 = 1 === t8.length ? t8[0] : e9.reduce((e10, s6, o8) => e10 + ((t9) => {
      if (true === t9._$cssResult$) return t9.cssText;
      if ("number" == typeof t9) return t9;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t8[o8 + 1], t8[0]);
    return new n3(o7, t8, s5);
  };
  var S2 = (s6, o7) => {
    if (e5) s6.adoptedStyleSheets = o7.map((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet);
    else for (const e9 of o7) {
      const o8 = document.createElement("style"), n7 = t5.litNonce;
      void 0 !== n7 && o8.setAttribute("nonce", n7), o8.textContent = e9.cssText, s6.appendChild(o8);
    }
  };
  var c4 = e5 ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
    let e9 = "";
    for (const s6 of t9.cssRules) e9 += s6.cssText;
    return r3(e9);
  })(t8) : t8;

  // frontend/node_modules/@lit/reactive-element/reactive-element.js
  var { is: i6, defineProperty: e6, getOwnPropertyDescriptor: r4, getOwnPropertyNames: h4, getOwnPropertySymbols: o5, getPrototypeOf: n4 } = Object;
  var a4 = globalThis;
  var c5 = a4.trustedTypes;
  var l3 = c5 ? c5.emptyScript : "";
  var p3 = a4.reactiveElementPolyfillSupport;
  var d3 = (t8, s6) => t8;
  var u3 = { toAttribute(t8, s6) {
    switch (s6) {
      case Boolean:
        t8 = t8 ? l3 : null;
        break;
      case Object:
      case Array:
        t8 = null == t8 ? t8 : JSON.stringify(t8);
    }
    return t8;
  }, fromAttribute(t8, s6) {
    let i8 = t8;
    switch (s6) {
      case Boolean:
        i8 = null !== t8;
        break;
      case Number:
        i8 = null === t8 ? null : Number(t8);
        break;
      case Object:
      case Array:
        try {
          i8 = JSON.parse(t8);
        } catch (t9) {
          i8 = null;
        }
    }
    return i8;
  } };
  var f5 = (t8, s6) => !i6(t8, s6);
  var y3 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f5 };
  Symbol.metadata ??= Symbol("metadata"), a4.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b3 = class extends HTMLElement {
    static addInitializer(t8) {
      this._$Ei(), (this.l ??= []).push(t8);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t8, s6 = y3) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.elementProperties.set(t8, s6), !s6.noAccessor) {
        const i8 = Symbol(), r9 = this.getPropertyDescriptor(t8, i8, s6);
        void 0 !== r9 && e6(this.prototype, t8, r9);
      }
    }
    static getPropertyDescriptor(t8, s6, i8) {
      const { get: e9, set: h7 } = r4(this.prototype, t8) ?? { get() {
        return this[s6];
      }, set(t9) {
        this[s6] = t9;
      } };
      return { get() {
        return e9?.call(this);
      }, set(s7) {
        const r9 = e9?.call(this);
        h7.call(this, s7), this.requestUpdate(t8, r9, i8);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t8) {
      return this.elementProperties.get(t8) ?? y3;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d3("elementProperties"))) return;
      const t8 = n4(this);
      t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d3("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d3("properties"))) {
        const t9 = this.properties, s6 = [...h4(t9), ...o5(t9)];
        for (const i8 of s6) this.createProperty(i8, t9[i8]);
      }
      const t8 = this[Symbol.metadata];
      if (null !== t8) {
        const s6 = litPropertyMetadata.get(t8);
        if (void 0 !== s6) for (const [t9, i8] of s6) this.elementProperties.set(t9, i8);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t9, s6] of this.elementProperties) {
        const i8 = this._$Eu(t9, s6);
        void 0 !== i8 && this._$Eh.set(i8, t9);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i8 = [];
      if (Array.isArray(s6)) {
        const e9 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e9) i8.unshift(c4(s7));
      } else void 0 !== s6 && i8.push(c4(s6));
      return i8;
    }
    static _$Eu(t8, s6) {
      const i8 = s6.attribute;
      return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t8) => t8(this));
    }
    addController(t8) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && t8.hostConnected?.();
    }
    removeController(t8) {
      this._$EO?.delete(t8);
    }
    _$E_() {
      const t8 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i8 of s6.keys()) this.hasOwnProperty(i8) && (t8.set(i8, this[i8]), delete this[i8]);
      t8.size > 0 && (this._$Ep = t8);
    }
    createRenderRoot() {
      const t8 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S2(t8, this.constructor.elementStyles), t8;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t8) => t8.hostConnected?.());
    }
    enableUpdating(t8) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t8) => t8.hostDisconnected?.());
    }
    attributeChangedCallback(t8, s6, i8) {
      this._$AK(t8, i8);
    }
    _$EC(t8, s6) {
      const i8 = this.constructor.elementProperties.get(t8), e9 = this.constructor._$Eu(t8, i8);
      if (void 0 !== e9 && true === i8.reflect) {
        const r9 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u3).toAttribute(s6, i8.type);
        this._$Em = t8, null == r9 ? this.removeAttribute(e9) : this.setAttribute(e9, r9), this._$Em = null;
      }
    }
    _$AK(t8, s6) {
      const i8 = this.constructor, e9 = i8._$Eh.get(t8);
      if (void 0 !== e9 && this._$Em !== e9) {
        const t9 = i8.getPropertyOptions(e9), r9 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== t9.converter?.fromAttribute ? t9.converter : u3;
        this._$Em = e9, this[e9] = r9.fromAttribute(s6, t9.type), this._$Em = null;
      }
    }
    requestUpdate(t8, s6, i8) {
      if (void 0 !== t8) {
        if (i8 ??= this.constructor.getPropertyOptions(t8), !(i8.hasChanged ?? f5)(this[t8], s6)) return;
        this.P(t8, s6, i8);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t8, s6, i8) {
      this._$AL.has(t8) || this._$AL.set(t8, s6), true === i8.reflect && this._$Em !== t8 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t8);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t9) {
        Promise.reject(t9);
      }
      const t8 = this.scheduleUpdate();
      return null != t8 && await t8, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t10, s7] of this._$Ep) this[t10] = s7;
          this._$Ep = void 0;
        }
        const t9 = this.constructor.elementProperties;
        if (t9.size > 0) for (const [s7, i8] of t9) true !== i8.wrapped || this._$AL.has(s7) || void 0 === this[s7] || this.P(s7, this[s7], i8);
      }
      let t8 = false;
      const s6 = this._$AL;
      try {
        t8 = this.shouldUpdate(s6), t8 ? (this.willUpdate(s6), this._$EO?.forEach((t9) => t9.hostUpdate?.()), this.update(s6)) : this._$EU();
      } catch (s7) {
        throw t8 = false, this._$EU(), s7;
      }
      t8 && this._$AE(s6);
    }
    willUpdate(t8) {
    }
    _$AE(t8) {
      this._$EO?.forEach((t9) => t9.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t8) {
      return true;
    }
    update(t8) {
      this._$Ej &&= this._$Ej.forEach((t9) => this._$EC(t9, this[t9])), this._$EU();
    }
    updated(t8) {
    }
    firstUpdated(t8) {
    }
  };
  b3.elementStyles = [], b3.shadowRootOptions = { mode: "open" }, b3[d3("elementProperties")] = /* @__PURE__ */ new Map(), b3[d3("finalized")] = /* @__PURE__ */ new Map(), p3?.({ ReactiveElement: b3 }), (a4.reactiveElementVersions ??= []).push("2.0.4");

  // frontend/node_modules/lit-html/lit-html.js
  var n5 = globalThis;
  var c6 = n5.trustedTypes;
  var h5 = c6 ? c6.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
  var f6 = "$lit$";
  var v3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var m3 = "?" + v3;
  var _3 = `<${m3}>`;
  var w2 = document;
  var lt = () => w2.createComment("");
  var st = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
  var g3 = Array.isArray;
  var $2 = (t8) => g3(t8) || "function" == typeof t8?.[Symbol.iterator];
  var x2 = "[ 	\n\f\r]";
  var T2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var E3 = /-->/g;
  var k2 = />/g;
  var O = RegExp(`>|${x2}(?:([^\\s"'>=/]+)(${x2}*=${x2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var S3 = /'/g;
  var j = /"/g;
  var M2 = /^(?:script|style|textarea|title)$/i;
  var P2 = (t8) => (i8, ...s6) => ({ _$litType$: t8, strings: i8, values: s6 });
  var ke = P2(1);
  var Oe = P2(2);
  var Se = P2(3);
  var R2 = Symbol.for("lit-noChange");
  var D = Symbol.for("lit-nothing");
  var V2 = /* @__PURE__ */ new WeakMap();
  var I2 = w2.createTreeWalker(w2, 129);
  function N2(t8, i8) {
    if (!g3(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== h5 ? h5.createHTML(i8) : i8;
  }
  var U = (t8, i8) => {
    const s6 = t8.length - 1, e9 = [];
    let h7, o7 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", n7 = T2;
    for (let i9 = 0; i9 < s6; i9++) {
      const s7 = t8[i9];
      let r9, l4, c7 = -1, a6 = 0;
      for (; a6 < s7.length && (n7.lastIndex = a6, l4 = n7.exec(s7), null !== l4); ) a6 = n7.lastIndex, n7 === T2 ? "!--" === l4[1] ? n7 = E3 : void 0 !== l4[1] ? n7 = k2 : void 0 !== l4[2] ? (M2.test(l4[2]) && (h7 = RegExp("</" + l4[2], "g")), n7 = O) : void 0 !== l4[3] && (n7 = O) : n7 === O ? ">" === l4[0] ? (n7 = h7 ?? T2, c7 = -1) : void 0 === l4[1] ? c7 = -2 : (c7 = n7.lastIndex - l4[2].length, r9 = l4[1], n7 = void 0 === l4[3] ? O : '"' === l4[3] ? j : S3) : n7 === j || n7 === S3 ? n7 = O : n7 === E3 || n7 === k2 ? n7 = T2 : (n7 = O, h7 = void 0);
      const u4 = n7 === O && t8[i9 + 1].startsWith("/>") ? " " : "";
      o7 += n7 === T2 ? s7 + _3 : c7 >= 0 ? (e9.push(r9), s7.slice(0, c7) + f6 + s7.slice(c7) + v3 + u4) : s7 + v3 + (-2 === c7 ? i9 : u4);
    }
    return [N2(t8, o7 + (t8[s6] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), e9];
  };
  var B = class _B {
    constructor({ strings: t8, _$litType$: i8 }, s6) {
      let e9;
      this.parts = [];
      let h7 = 0, o7 = 0;
      const n7 = t8.length - 1, r9 = this.parts, [l4, a6] = U(t8, i8);
      if (this.el = _B.createElement(l4, s6), I2.currentNode = this.el.content, 2 === i8 || 3 === i8) {
        const t9 = this.el.content.firstChild;
        t9.replaceWith(...t9.childNodes);
      }
      for (; null !== (e9 = I2.nextNode()) && r9.length < n7; ) {
        if (1 === e9.nodeType) {
          if (e9.hasAttributes()) for (const t9 of e9.getAttributeNames()) if (t9.endsWith(f6)) {
            const i9 = a6[o7++], s7 = e9.getAttribute(t9).split(v3), n8 = /([.?@])?(.*)/.exec(i9);
            r9.push({ type: 1, index: h7, name: n8[2], strings: s7, ctor: "." === n8[1] ? Y : "?" === n8[1] ? Z2 : "@" === n8[1] ? q : G }), e9.removeAttribute(t9);
          } else t9.startsWith(v3) && (r9.push({ type: 6, index: h7 }), e9.removeAttribute(t9));
          if (M2.test(e9.tagName)) {
            const t9 = e9.textContent.split(v3), i9 = t9.length - 1;
            if (i9 > 0) {
              e9.textContent = c6 ? c6.emptyScript : "";
              for (let s7 = 0; s7 < i9; s7++) e9.append(t9[s7], lt()), I2.nextNode(), r9.push({ type: 2, index: ++h7 });
              e9.append(t9[i9], lt());
            }
          }
        } else if (8 === e9.nodeType) if (e9.data === m3) r9.push({ type: 2, index: h7 });
        else {
          let t9 = -1;
          for (; -1 !== (t9 = e9.data.indexOf(v3, t9 + 1)); ) r9.push({ type: 7, index: h7 }), t9 += v3.length - 1;
        }
        h7++;
      }
    }
    static createElement(t8, i8) {
      const s6 = w2.createElement("template");
      return s6.innerHTML = t8, s6;
    }
  };
  function z2(t8, i8, s6 = t8, e9) {
    if (i8 === R2) return i8;
    let h7 = void 0 !== e9 ? s6.o?.[e9] : s6.l;
    const o7 = st(i8) ? void 0 : i8._$litDirective$;
    return h7?.constructor !== o7 && (h7?._$AO?.(false), void 0 === o7 ? h7 = void 0 : (h7 = new o7(t8), h7._$AT(t8, s6, e9)), void 0 !== e9 ? (s6.o ??= [])[e9] = h7 : s6.l = h7), void 0 !== h7 && (i8 = z2(t8, h7._$AS(t8, i8.values), h7, e9)), i8;
  }
  var F = class {
    constructor(t8, i8) {
      this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i8;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t8) {
      const { el: { content: i8 }, parts: s6 } = this._$AD, e9 = (t8?.creationScope ?? w2).importNode(i8, true);
      I2.currentNode = e9;
      let h7 = I2.nextNode(), o7 = 0, n7 = 0, r9 = s6[0];
      for (; void 0 !== r9; ) {
        if (o7 === r9.index) {
          let i9;
          2 === r9.type ? i9 = new et(h7, h7.nextSibling, this, t8) : 1 === r9.type ? i9 = new r9.ctor(h7, r9.name, r9.strings, this, t8) : 6 === r9.type && (i9 = new K(h7, this, t8)), this._$AV.push(i9), r9 = s6[++n7];
        }
        o7 !== r9?.index && (h7 = I2.nextNode(), o7++);
      }
      return I2.currentNode = w2, e9;
    }
    p(t8) {
      let i8 = 0;
      for (const s6 of this._$AV) void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t8, s6, i8), i8 += s6.strings.length - 2) : s6._$AI(t8[i8])), i8++;
    }
  };
  var et = class _et {
    get _$AU() {
      return this._$AM?._$AU ?? this.v;
    }
    constructor(t8, i8, s6, e9) {
      this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t8, this._$AB = i8, this._$AM = s6, this.options = e9, this.v = e9?.isConnected ?? true;
    }
    get parentNode() {
      let t8 = this._$AA.parentNode;
      const i8 = this._$AM;
      return void 0 !== i8 && 11 === t8?.nodeType && (t8 = i8.parentNode), t8;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t8, i8 = this) {
      t8 = z2(this, t8, i8), st(t8) ? t8 === D || null == t8 || "" === t8 ? (this._$AH !== D && this._$AR(), this._$AH = D) : t8 !== this._$AH && t8 !== R2 && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : $2(t8) ? this.k(t8) : this._(t8);
    }
    O(t8) {
      return this._$AA.parentNode.insertBefore(t8, this._$AB);
    }
    T(t8) {
      this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
    }
    _(t8) {
      this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(w2.createTextNode(t8)), this._$AH = t8;
    }
    $(t8) {
      const { values: i8, _$litType$: s6 } = t8, e9 = "number" == typeof s6 ? this._$AC(t8) : (void 0 === s6.el && (s6.el = B.createElement(N2(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e9) this._$AH.p(i8);
      else {
        const t9 = new F(e9, this), s7 = t9.u(this.options);
        t9.p(i8), this.T(s7), this._$AH = t9;
      }
    }
    _$AC(t8) {
      let i8 = V2.get(t8.strings);
      return void 0 === i8 && V2.set(t8.strings, i8 = new B(t8)), i8;
    }
    k(t8) {
      g3(this._$AH) || (this._$AH = [], this._$AR());
      const i8 = this._$AH;
      let s6, e9 = 0;
      for (const h7 of t8) e9 === i8.length ? i8.push(s6 = new _et(this.O(lt()), this.O(lt()), this, this.options)) : s6 = i8[e9], s6._$AI(h7), e9++;
      e9 < i8.length && (this._$AR(s6 && s6._$AB.nextSibling, e9), i8.length = e9);
    }
    _$AR(t8 = this._$AA.nextSibling, i8) {
      for (this._$AP?.(false, true, i8); t8 && t8 !== this._$AB; ) {
        const i9 = t8.nextSibling;
        t8.remove(), t8 = i9;
      }
    }
    setConnected(t8) {
      void 0 === this._$AM && (this.v = t8, this._$AP?.(t8));
    }
  };
  var G = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t8, i8, s6, e9, h7) {
      this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t8, this.name = i8, this._$AM = e9, this.options = h7, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = D;
    }
    _$AI(t8, i8 = this, s6, e9) {
      const h7 = this.strings;
      let o7 = false;
      if (void 0 === h7) t8 = z2(this, t8, i8, 0), o7 = !st(t8) || t8 !== this._$AH && t8 !== R2, o7 && (this._$AH = t8);
      else {
        const e10 = t8;
        let n7, r9;
        for (t8 = h7[0], n7 = 0; n7 < h7.length - 1; n7++) r9 = z2(this, e10[s6 + n7], i8, n7), r9 === R2 && (r9 = this._$AH[n7]), o7 ||= !st(r9) || r9 !== this._$AH[n7], r9 === D ? t8 = D : t8 !== D && (t8 += (r9 ?? "") + h7[n7 + 1]), this._$AH[n7] = r9;
      }
      o7 && !e9 && this.j(t8);
    }
    j(t8) {
      t8 === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
    }
  };
  var Y = class extends G {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t8) {
      this.element[this.name] = t8 === D ? void 0 : t8;
    }
  };
  var Z2 = class extends G {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t8) {
      this.element.toggleAttribute(this.name, !!t8 && t8 !== D);
    }
  };
  var q = class extends G {
    constructor(t8, i8, s6, e9, h7) {
      super(t8, i8, s6, e9, h7), this.type = 5;
    }
    _$AI(t8, i8 = this) {
      if ((t8 = z2(this, t8, i8, 0) ?? D) === R2) return;
      const s6 = this._$AH, e9 = t8 === D && s6 !== D || t8.capture !== s6.capture || t8.once !== s6.once || t8.passive !== s6.passive, h7 = t8 !== D && (s6 === D || e9);
      e9 && this.element.removeEventListener(this.name, this, s6), h7 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
    }
    handleEvent(t8) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
    }
  };
  var K = class {
    constructor(t8, i8, s6) {
      this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t8) {
      z2(this, t8);
    }
  };
  var Re = n5.litHtmlPolyfillSupport;
  Re?.(B, et), (n5.litHtmlVersions ??= []).push("3.2.0");
  var Q = (t8, i8, s6) => {
    const e9 = s6?.renderBefore ?? i8;
    let h7 = e9._$litPart$;
    if (void 0 === h7) {
      const t9 = s6?.renderBefore ?? null;
      e9._$litPart$ = h7 = new et(i8.insertBefore(lt(), t9), t9, void 0, s6 ?? {});
    }
    return h7._$AI(t8), h7;
  };

  // frontend/node_modules/lit-element/lit-element.js
  var h6 = class extends b3 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
    }
    createRenderRoot() {
      const t8 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t8.firstChild, t8;
    }
    update(t8) {
      const e9 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this.o = Q(e9, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this.o?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.o?.setConnected(false);
    }
    render() {
      return R2;
    }
  };
  h6._$litElement$ = true, h6["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: h6 });
  var f7 = globalThis.litElementPolyfillSupport;
  f7?.({ LitElement: h6 });
  (globalThis.litElementVersions ??= []).push("4.1.0");

  // frontend/node_modules/@lit/reactive-element/decorators/custom-element.js
  var t6 = (t8) => (e9, o7) => {
    void 0 !== o7 ? o7.addInitializer(() => {
      customElements.define(t8, e9);
    }) : customElements.define(t8, e9);
  };

  // frontend/node_modules/@lit/reactive-element/decorators/property.js
  var o6 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f5 };
  var r5 = (t8 = o6, e9, r9) => {
    const { kind: n7, metadata: i8 } = r9;
    let s6 = globalThis.litPropertyMetadata.get(i8);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i8, s6 = /* @__PURE__ */ new Map()), s6.set(r9.name, t8), "accessor" === n7) {
      const { name: o7 } = r9;
      return { set(r10) {
        const n8 = e9.get.call(this);
        e9.set.call(this, r10), this.requestUpdate(o7, n8, t8);
      }, init(e10) {
        return void 0 !== e10 && this.P(o7, void 0, t8), e10;
      } };
    }
    if ("setter" === n7) {
      const { name: o7 } = r9;
      return function(r10) {
        const n8 = this[o7];
        e9.call(this, r10), this.requestUpdate(o7, n8, t8);
      };
    }
    throw Error("Unsupported decorator location: " + n7);
  };
  function n6(t8) {
    return (e9, o7) => "object" == typeof o7 ? r5(t8, e9, o7) : ((t9, e10, o8) => {
      const r9 = e10.hasOwnProperty(o8);
      return e10.constructor.createProperty(o8, r9 ? { ...t9, wrapped: true } : t9), r9 ? Object.getOwnPropertyDescriptor(e10, o8) : void 0;
    })(t8, e9, o7);
  }

  // frontend/node_modules/@lit/reactive-element/decorators/state.js
  function r6(r9) {
    return n6({ ...r9, state: true, attribute: false });
  }

  // frontend/node_modules/@lit/reactive-element/decorators/base.js
  var e7 = (e9, t8, c7) => (c7.configurable = true, c7.enumerable = true, Reflect.decorate && "object" != typeof t8 && Object.defineProperty(e9, t8, c7), c7);

  // frontend/node_modules/@lit/reactive-element/decorators/query.js
  function e8(e9, r9) {
    return (n7, s6, i8) => {
      const o7 = (t8) => t8.renderRoot?.querySelector(e9) ?? null;
      if (r9) {
        const { get: e10, set: r10 } = "object" == typeof s6 ? n7 : i8 ?? (() => {
          const t8 = Symbol();
          return { get() {
            return this[t8];
          }, set(e11) {
            this[t8] = e11;
          } };
        })();
        return e7(n7, s6, { get() {
          let t8 = e10.call(this);
          return void 0 === t8 && (t8 = o7(this), (null !== t8 || this.hasUpdated) && r10.call(this, t8)), t8;
        } });
      }
      return e7(n7, s6, { get() {
        return o7(this);
      } });
    };
  }

  // frontend/node_modules/@lit/reactive-element/decorators/query-async.js
  function r7(r9) {
    return (n7, e9) => e7(n7, e9, { async get() {
      return await this.updateComplete, this.renderRoot?.querySelector(r9) ?? null;
    } });
  }

  // frontend/node_modules/style-vendorizer/dist/esm/bundle.min.mjs
  var i7 = /* @__PURE__ */ new Map([["align-self", "-ms-grid-row-align"], ["color-adjust", "-webkit-print-color-adjust"], ["column-gap", "grid-column-gap"], ["forced-color-adjust", "-ms-high-contrast-adjust"], ["gap", "grid-gap"], ["grid-template-columns", "-ms-grid-columns"], ["grid-template-rows", "-ms-grid-rows"], ["justify-self", "-ms-grid-column-align"], ["margin-inline-end", "-webkit-margin-end"], ["margin-inline-start", "-webkit-margin-start"], ["mask-border", "-webkit-mask-box-image"], ["mask-border-outset", "-webkit-mask-box-image-outset"], ["mask-border-slice", "-webkit-mask-box-image-slice"], ["mask-border-source", "-webkit-mask-box-image-source"], ["mask-border-repeat", "-webkit-mask-box-image-repeat"], ["mask-border-width", "-webkit-mask-box-image-width"], ["overflow-wrap", "word-wrap"], ["padding-inline-end", "-webkit-padding-end"], ["padding-inline-start", "-webkit-padding-start"], ["print-color-adjust", "color-adjust"], ["row-gap", "grid-row-gap"], ["scroll-margin-bottom", "scroll-snap-margin-bottom"], ["scroll-margin-left", "scroll-snap-margin-left"], ["scroll-margin-right", "scroll-snap-margin-right"], ["scroll-margin-top", "scroll-snap-margin-top"], ["scroll-margin", "scroll-snap-margin"], ["text-combine-upright", "-ms-text-combine-horizontal"]]);
  function r8(r9) {
    return i7.get(r9);
  }
  function a5(i8) {
    var r9 = /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(i8);
    return r9 ? r9[1] ? 1 : r9[2] ? 2 : r9[3] ? 3 : 5 : 0;
  }
  function t7(i8, r9) {
    var a6 = /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(i8);
    return a6 ? a6[1] ? /^sti/i.test(r9) ? 1 : 0 : a6[2] ? /^pat/i.test(r9) ? 1 : 0 : a6[3] ? /^image-/i.test(r9) ? 1 : 0 : a6[4] ? "-" === r9[3] ? 2 : 0 : /^(?:inline-)?grid$/i.test(r9) ? 4 : 0 : 0;
  }

  // frontend/node_modules/twind/twind.js
  var includes = (value, search) => !!~value.indexOf(search);
  var join = (parts, separator = "-") => parts.join(separator);
  var joinTruthy = (parts, separator) => join(parts.filter(Boolean), separator);
  var tail = (array, startIndex = 1) => array.slice(startIndex);
  var identity = (value) => value;
  var noop = () => {
  };
  var capitalize = (value) => value[0].toUpperCase() + tail(value);
  var hyphenate = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
  var evalThunk = (value, context) => {
    while (typeof value == "function") {
      value = value(context);
    }
    return value;
  };
  var ensureMaxSize = (map, max) => {
    if (map.size > max) {
      map.delete(map.keys().next().value);
    }
  };
  var isCSSProperty = (key, value) => !includes("@:&", key[0]) && (includes("rg", (typeof value)[5]) || Array.isArray(value));
  var merge = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
    const value = evalThunk(source[key], context);
    if (isCSSProperty(key, value)) {
      target2[hyphenate(key)] = value;
    } else {
      target2[key] = key[0] == "@" && includes("figa", key[1]) ? (target2[key] || []).concat(value) : merge(target2[key] || {}, value, context);
    }
    return target2;
  }, target) : target;
  var escape = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
  var buildMediaQuery = (screen) => {
    if (!Array.isArray(screen)) {
      screen = [screen];
    }
    return "@media " + join(screen.map((screen2) => {
      if (typeof screen2 == "string") {
        screen2 = { min: screen2 };
      }
      return screen2.raw || join(Object.keys(screen2).map((feature) => `(${feature}-width:${screen2[feature]})`), " and ");
    }), ",");
  };
  var cyrb32 = (value) => {
    for (var h7 = 9, index = value.length; index--; ) {
      h7 = Math.imul(h7 ^ value.charCodeAt(index), 1597334677);
    }
    return "tw-" + ((h7 ^ h7 >>> 9) >>> 0).toString(36);
  };
  var sortedInsertionIndex = (array, element) => {
    for (var low = 0, high = array.length; low < high; ) {
      const pivot = high + low >> 1;
      if (array[pivot] <= element) {
        low = pivot + 1;
      } else {
        high = pivot;
      }
    }
    return high;
  };
  var groupings;
  var rules;
  var startGrouping = (value = "") => {
    groupings.push(value);
    return "";
  };
  var endGrouping = (isWhitespace) => {
    groupings.length = Math.max(groupings.lastIndexOf("") + ~~isWhitespace, 0);
  };
  var onlyPrefixes = (s6) => s6 && !includes("!:", s6[0]);
  var onlyVariants = (s6) => s6[0] == ":";
  var addRule = (directive2, negate2) => {
    rules.push({
      v: groupings.filter(onlyVariants),
      d: directive2,
      n: negate2,
      i: includes(groupings, "!"),
      $: ""
    });
  };
  var saveRule = (buffer) => {
    const negate2 = buffer[0] == "-";
    if (negate2) {
      buffer = tail(buffer);
    }
    const prefix = join(groupings.filter(onlyPrefixes));
    addRule(buffer == "&" ? prefix : (prefix && prefix + "-") + buffer, negate2);
    return "";
  };
  var parseString = (token, isVariant) => {
    let buffer = "";
    for (let char, dynamic = false, position2 = 0; char = token[position2++]; ) {
      if (dynamic || char == "[") {
        buffer += char;
        dynamic = char != "]";
        continue;
      }
      switch (char) {
        case ":":
          buffer = buffer && startGrouping(":" + (token[position2] == char ? token[position2++] : "") + buffer);
          break;
        case "(":
          buffer = buffer && startGrouping(buffer);
          startGrouping();
          break;
        case "!":
          startGrouping(char);
          break;
        case ")":
        case " ":
        case "	":
        case "\n":
        case "\r":
          buffer = buffer && saveRule(buffer);
          endGrouping(char !== ")");
          break;
        default:
          buffer += char;
      }
    }
    if (buffer) {
      if (isVariant) {
        startGrouping(":" + buffer);
      } else if (buffer.slice(-1) == "-") {
        startGrouping(buffer.slice(0, -1));
      } else {
        saveRule(buffer);
      }
    }
  };
  var parseGroupedToken = (token) => {
    startGrouping();
    parseToken(token);
    endGrouping();
  };
  var parseGroup = (key, token) => {
    if (token) {
      startGrouping();
      const isVariant = includes("tbu", (typeof token)[1]);
      parseString(key, isVariant);
      if (isVariant) {
        parseGroupedToken(token);
      }
      endGrouping();
    }
  };
  var parseToken = (token) => {
    switch (typeof token) {
      case "string":
        parseString(token);
        break;
      case "function":
        addRule(token);
        break;
      case "object":
        if (Array.isArray(token)) {
          token.forEach(parseGroupedToken);
        } else if (token) {
          Object.keys(token).forEach((key) => {
            parseGroup(key, token[key]);
          });
        }
    }
  };
  var staticsCaches = /* @__PURE__ */ new WeakMap();
  var buildStatics = (strings) => {
    let statics = staticsCaches.get(strings);
    if (!statics) {
      let slowModeIndex = NaN;
      let buffer = "";
      statics = strings.map((token, index) => {
        if (slowModeIndex !== slowModeIndex && (token.slice(-1) == "[" || includes(":-(", (strings[index + 1] || "")[0]))) {
          slowModeIndex = index;
        }
        if (index >= slowModeIndex) {
          return (interpolation) => {
            if (index == slowModeIndex) {
              buffer = "";
            }
            buffer += token;
            if (includes("rg", (typeof interpolation)[5])) {
              buffer += interpolation;
            } else if (interpolation) {
              parseString(buffer);
              buffer = "";
              parseToken(interpolation);
            }
            if (index == strings.length - 1) {
              parseString(buffer);
            }
          };
        }
        const staticRules = rules = [];
        parseString(token);
        const activeGroupings = [...groupings];
        rules = [];
        return (interpolation) => {
          rules.push(...staticRules);
          groupings = [...activeGroupings];
          if (interpolation) {
            parseToken(interpolation);
          }
        };
      });
      staticsCaches.set(strings, statics);
    }
    return statics;
  };
  var parse = (tokens) => {
    groupings = [];
    rules = [];
    if (Array.isArray(tokens[0]) && Array.isArray(tokens[0].raw)) {
      buildStatics(tokens[0]).forEach((apply2, index) => apply2(tokens[index + 1]));
    } else {
      parseToken(tokens);
    }
    return rules;
  };
  var isFunctionFree;
  var detectFunction = (key, value) => {
    if (typeof value == "function") {
      isFunctionFree = false;
    }
    return value;
  };
  var stringify = (data) => {
    isFunctionFree = true;
    const key = JSON.stringify(data, detectFunction);
    return isFunctionFree && key;
  };
  var cacheByFactory = /* @__PURE__ */ new WeakMap();
  var directive = (factory, data) => {
    const key = stringify(data);
    let directive2;
    if (key) {
      var cache = cacheByFactory.get(factory);
      if (!cache) {
        cacheByFactory.set(factory, cache = /* @__PURE__ */ new Map());
      }
      directive2 = cache.get(key);
    }
    if (!directive2) {
      directive2 = Object.defineProperty((params, context) => {
        context = Array.isArray(params) ? context : params;
        return evalThunk(factory(data, context), context);
      }, "toJSON", {
        value: () => key || data
      });
      if (cache) {
        cache.set(key, directive2);
        ensureMaxSize(cache, 1e4);
      }
    }
    return directive2;
  };
  var applyFactory = (tokens, { css: css2 }) => css2(parse(tokens));
  var apply = (...tokens) => directive(applyFactory, tokens);
  var positions = (resolve) => (value, position2, prefix, suffix) => {
    if (value) {
      const properties = position2 && resolve(position2);
      if (properties && properties.length > 0) {
        return properties.reduce((declarations, property2) => {
          declarations[joinTruthy([prefix, property2, suffix])] = value;
          return declarations;
        }, {});
      }
    }
  };
  var corners = /* @__PURE__ */ positions((key) => ({
    t: ["top-left", "top-right"],
    r: ["top-right", "bottom-right"],
    b: ["bottom-left", "bottom-right"],
    l: ["bottom-left", "top-left"],
    tl: ["top-left"],
    tr: ["top-right"],
    bl: ["bottom-left"],
    br: ["bottom-right"]
  })[key]);
  var expandEdges = (key) => {
    const parts = ({ x: "lr", y: "tb" }[key] || key || "").split("").sort();
    for (let index = parts.length; index--; ) {
      if (!(parts[index] = {
        t: "top",
        r: "right",
        b: "bottom",
        l: "left"
      }[parts[index]]))
        return;
    }
    if (parts.length)
      return parts;
  };
  var edges = /* @__PURE__ */ positions(expandEdges);
  var stringifyVariant = (selector, variant) => selector + (variant[1] == ":" ? tail(variant, 2) + ":" : tail(variant)) + ":";
  var stringifyRule = (rule, directive2 = rule.d) => typeof directive2 == "function" ? "" : rule.v.reduce(stringifyVariant, "") + (rule.i ? "!" : "") + (rule.n ? "-" : "") + directive2;
  var _4;
  var __;
  var $3;
  var toColumnsOrRows = (x3) => x3 == "cols" ? "columns" : "rows";
  var property = (property2) => (params, context, id) => ({
    [property2]: id + ((_4 = join(params)) && "-" + _4)
  });
  var propertyValue = (property2, separator) => (params, context, id) => (_4 = join(params, separator)) && {
    [property2 || id]: _4
  };
  var themeProperty = (section) => (params, { theme: theme2 }, id) => (_4 = theme2(section || id, params)) && {
    [section || id]: _4
  };
  var themePropertyFallback = (section, separator) => (params, { theme: theme2 }, id) => (_4 = theme2(section || id, params, join(params, separator))) && {
    [section || id]: _4
  };
  var alias = (handler, name) => (params, context) => handler(params, context, name);
  var display = property("display");
  var position = property("position");
  var textTransform = property("textTransform");
  var textDecoration = property("textDecoration");
  var fontStyle = property("fontStyle");
  var fontVariantNumeric = (key) => (params, context, id) => ({
    ["--tw-" + key]: id,
    fontVariantNumeric: "var(--tw-ordinal,/*!*/ /*!*/) var(--tw-slashed-zero,/*!*/ /*!*/) var(--tw-numeric-figure,/*!*/ /*!*/) var(--tw-numeric-spacing,/*!*/ /*!*/) var(--tw-numeric-fraction,/*!*/ /*!*/)"
  });
  var inset = (params, { theme: theme2 }, id) => (_4 = theme2("inset", params)) && { [id]: _4 };
  var opacityProperty = (params, theme2, id, section = id) => (_4 = theme2(section + "Opacity", tail(params))) && {
    [`--tw-${id}-opacity`]: _4
  };
  var parseColorComponent = (chars, factor) => Math.round(parseInt(chars, 16) * factor);
  var asRGBA = (color, opacityProperty2, opacityDefault) => {
    if (color && color[0] == "#" && (_4 = (color.length - 1) / 3) && ($3 = [17, 1, 0.062272][_4 - 1])) {
      return `rgba(${parseColorComponent(color.substr(1, _4), $3)},${parseColorComponent(color.substr(1 + _4, _4), $3)},${parseColorComponent(color.substr(1 + 2 * _4, _4), $3)},${opacityProperty2 ? `var(--tw-${opacityProperty2}${opacityDefault ? "," + opacityDefault : ""})` : opacityDefault || 1})`;
    }
    return color;
  };
  var withOpacityFallback = (property2, kind, color) => color && typeof color == "string" ? (_4 = asRGBA(color, kind + "-opacity")) && _4 !== color ? {
    [`--tw-${kind}-opacity`]: "1",
    [property2]: [color, _4]
  } : { [property2]: color } : void 0;
  var transparentTo = (color) => ($3 = asRGBA(color, "", "0")) == _4 ? "transparent" : $3;
  var reversableEdge = (params, { theme: theme2 }, id, section, prefix, suffix) => (_4 = { x: ["right", "left"], y: ["bottom", "top"] }[params[0]]) && ($3 = `--tw-${id}-${params[0]}-reverse`) ? params[1] == "reverse" ? {
    [$3]: "1"
  } : {
    [$3]: "0",
    [joinTruthy([prefix, _4[0], suffix])]: (__ = theme2(section, tail(params))) && `calc(${__} * var(${$3}))`,
    [joinTruthy([prefix, _4[1], suffix])]: __ && [__, `calc(${__} * calc(1 - var(${$3})))`]
  } : void 0;
  var placeHelper = (property2, params) => params[0] && {
    [property2]: (includes("wun", (params[0] || "")[3]) ? "space-" : "") + params[0]
  };
  var contentPluginFor = (property2) => (params) => includes(["start", "end"], params[0]) ? { [property2]: "flex-" + params[0] } : placeHelper(property2, params);
  var gridPlugin = (kind) => (params, { theme: theme2 }) => {
    if (_4 = theme2("grid" + capitalize(kind), params, "")) {
      return { ["grid-" + kind]: _4 };
    }
    switch (params[0]) {
      case "span":
        return params[1] && {
          ["grid-" + kind]: `span ${params[1]} / span ${params[1]}`
        };
      case "start":
      case "end":
        return (_4 = theme2("grid" + capitalize(kind) + capitalize(params[0]), tail(params), join(tail(params)))) && {
          [`grid-${kind}-${params[0]}`]: _4
        };
    }
  };
  var border = (params, { theme: theme2 }, id) => {
    switch (params[0]) {
      case "solid":
      case "dashed":
      case "dotted":
      case "double":
      case "none":
        return propertyValue("borderStyle")(params);
      case "collapse":
      case "separate":
        return propertyValue("borderCollapse")(params);
      case "opacity":
        return opacityProperty(params, theme2, id);
    }
    return (_4 = theme2(id + "Width", params, "")) ? { borderWidth: _4 } : withOpacityFallback("borderColor", id, theme2(id + "Color", params));
  };
  var borderEdges = (params, context, id) => {
    var _a;
    const edges2 = (_a = expandEdges(params[0])) == null ? void 0 : _a.map(capitalize);
    if (edges2) {
      params = tail(params);
    }
    let rules2 = border(params, context, id);
    if (edges2 && rules2 && typeof rules2 === "object") {
      rules2 = Object.entries(rules2).reduce((newRules, [key, value]) => {
        if (key.startsWith("border")) {
          for (const edge of edges2) {
            newRules[key.slice(0, 6) + edge + key.slice(6)] = value;
          }
        } else {
          newRules[key] = value;
        }
        return newRules;
      }, {});
    }
    return rules2;
  };
  var transform = (gpu) => (gpu ? "translate3d(var(--tw-translate-x,0),var(--tw-translate-y,0),0)" : "translateX(var(--tw-translate-x,0)) translateY(var(--tw-translate-y,0))") + " rotate(var(--tw-rotate,0)) skewX(var(--tw-skew-x,0)) skewY(var(--tw-skew-y,0)) scaleX(var(--tw-scale-x,1)) scaleY(var(--tw-scale-y,1))";
  var transformXYFunction = (params, context, id) => params[0] && (_4 = context.theme(id, params[1] || params[0])) && {
    [`--tw-${id}-x`]: params[0] !== "y" && _4,
    [`--tw-${id}-y`]: params[0] !== "x" && _4,
    transform: [`${id}${params[1] ? params[0].toUpperCase() : ""}(${_4})`, transform()]
  };
  var edgesPluginFor = (key) => (params, context, id) => id[1] ? edges(context.theme(key, params), id[1], key) : themeProperty(key)(params, context, id);
  var padding = edgesPluginFor("padding");
  var margin = edgesPluginFor("margin");
  var minMax = (params, { theme: theme2 }, id) => (_4 = { w: "width", h: "height" }[params[0]]) && {
    [_4 = `${id}${capitalize(_4)}`]: theme2(_4, tail(params))
  };
  var filter = (params, { theme: theme2 }, id) => {
    const parts = id.split("-");
    const prefix = parts[0] == "backdrop" ? parts[0] + "-" : "";
    if (!prefix) {
      params.unshift(...parts);
    }
    if (params[0] == "filter") {
      const filters = [
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "hue-rotate",
        "invert",
        prefix && "opacity",
        "saturate",
        "sepia",
        !prefix && "drop-shadow"
      ].filter(Boolean);
      return params[1] == "none" ? { [prefix + "filter"]: "none" } : filters.reduce((css2, key) => {
        css2["--tw-" + prefix + key] = "var(--tw-empty,/*!*/ /*!*/)";
        return css2;
      }, {
        [prefix + "filter"]: filters.map((key) => `var(--tw-${prefix}${key})`).join(" ")
      });
    }
    $3 = params.shift();
    if (includes(["hue", "drop"], $3))
      $3 += capitalize(params.shift());
    return (_4 = theme2(prefix ? "backdrop" + capitalize($3) : $3, params)) && {
      ["--tw-" + prefix + $3]: (Array.isArray(_4) ? _4 : [_4]).map((_42) => `${hyphenate($3)}(${_42})`).join(" ")
    };
  };
  var corePlugins = {
    group: (params, { tag }, id) => tag(join([id, ...params])),
    hidden: alias(display, "none"),
    inline: display,
    block: display,
    contents: display,
    flow: display,
    table: (params, context, id) => includes(["auto", "fixed"], params[0]) ? { tableLayout: params[0] } : display(params, context, id),
    flex(params, context, id) {
      switch (params[0]) {
        case "row":
        case "col":
          return {
            flexDirection: join(params[0] == "col" ? ["column", ...tail(params)] : params)
          };
        case "nowrap":
        case "wrap":
          return { flexWrap: join(params) };
        case "grow":
        case "shrink":
          _4 = context.theme("flex" + capitalize(params[0]), tail(params), params[1] || 1);
          return _4 != null && {
            ["flex-" + params[0]]: "" + _4
          };
      }
      return (_4 = context.theme("flex", params, "")) ? { flex: _4 } : display(params, context, id);
    },
    grid(params, context, id) {
      switch (params[0]) {
        case "cols":
        case "rows":
          return (_4 = context.theme("gridTemplate" + capitalize(toColumnsOrRows(params[0])), tail(params), params.length == 2 && Number(params[1]) ? `repeat(${params[1]},minmax(0,1fr))` : join(tail(params)))) && {
            ["gridTemplate-" + toColumnsOrRows(params[0])]: _4
          };
        case "flow":
          return params.length > 1 && {
            gridAutoFlow: join(params[1] == "col" ? ["column", ...tail(params, 2)] : tail(params), " ")
          };
      }
      return display(params, context, id);
    },
    auto: (params, { theme: theme2 }) => includes(["cols", "rows"], params[0]) && (_4 = theme2("gridAuto" + capitalize(toColumnsOrRows(params[0])), tail(params), join(tail(params)))) && {
      ["gridAuto-" + toColumnsOrRows(params[0])]: _4
    },
    static: position,
    fixed: position,
    absolute: position,
    relative: position,
    sticky: position,
    visible: { visibility: "visible" },
    invisible: { visibility: "hidden" },
    antialiased: {
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    },
    "subpixel-antialiased": {
      WebkitFontSmoothing: "auto",
      MozOsxFontSmoothing: "auto"
    },
    truncate: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    "sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      clip: "rect(0,0,0,0)",
      borderWidth: "0"
    },
    "not-sr-only": {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      whiteSpace: "normal",
      clip: "auto"
    },
    resize: (params) => ({
      resize: { x: "horizontal", y: "vertical" }[params[0]] || params[0] || "both"
    }),
    box: (params) => params[0] && { boxSizing: params[0] + "-box" },
    appearance: propertyValue(),
    cursor: themePropertyFallback(),
    float: propertyValue(),
    clear: propertyValue(),
    decoration: propertyValue("boxDecorationBreak"),
    isolate: { isolation: "isolate" },
    isolation: propertyValue(),
    "mix-blend": propertyValue("mixBlendMode"),
    top: inset,
    right: inset,
    bottom: inset,
    left: inset,
    inset: (params, { theme: theme2 }) => (_4 = expandEdges(params[0])) ? edges(theme2("inset", tail(params)), params[0]) : (_4 = theme2("inset", params)) && {
      top: _4,
      right: _4,
      bottom: _4,
      left: _4
    },
    underline: textDecoration,
    "line-through": textDecoration,
    "no-underline": alias(textDecoration, "none"),
    "text-underline": alias(textDecoration, "underline"),
    "text-no-underline": alias(textDecoration, "none"),
    "text-line-through": alias(textDecoration, "line-through"),
    uppercase: textTransform,
    lowercase: textTransform,
    capitalize: textTransform,
    "normal-case": alias(textTransform, "none"),
    "text-normal-case": alias(textTransform, "none"),
    italic: fontStyle,
    "not-italic": alias(fontStyle, "normal"),
    "font-italic": alias(fontStyle, "italic"),
    "font-not-italic": alias(fontStyle, "normal"),
    font: (params, context, id) => (_4 = context.theme("fontFamily", params, "")) ? { fontFamily: _4 } : themeProperty("fontWeight")(params, context, id),
    items: (params) => params[0] && {
      alignItems: includes(["start", "end"], params[0]) ? "flex-" + params[0] : join(params)
    },
    "justify-self": propertyValue(),
    "justify-items": propertyValue(),
    justify: contentPluginFor("justifyContent"),
    content: contentPluginFor("alignContent"),
    self: contentPluginFor("alignSelf"),
    place: (params) => params[0] && placeHelper("place-" + params[0], tail(params)),
    overscroll: (params) => params[0] && {
      ["overscrollBehavior" + (params[1] ? "-" + params[0] : "")]: params[1] || params[0]
    },
    col: gridPlugin("column"),
    row: gridPlugin("row"),
    duration: themeProperty("transitionDuration"),
    delay: themeProperty("transitionDelay"),
    tracking: themeProperty("letterSpacing"),
    leading: themeProperty("lineHeight"),
    z: themeProperty("zIndex"),
    opacity: themeProperty(),
    ease: themeProperty("transitionTimingFunction"),
    p: padding,
    py: padding,
    px: padding,
    pt: padding,
    pr: padding,
    pb: padding,
    pl: padding,
    m: margin,
    my: margin,
    mx: margin,
    mt: margin,
    mr: margin,
    mb: margin,
    ml: margin,
    w: themeProperty("width"),
    h: themeProperty("height"),
    min: minMax,
    max: minMax,
    fill: themeProperty(),
    order: themeProperty(),
    origin: themePropertyFallback("transformOrigin", " "),
    select: propertyValue("userSelect"),
    "pointer-events": propertyValue(),
    align: propertyValue("verticalAlign"),
    whitespace: propertyValue("whiteSpace"),
    "normal-nums": { fontVariantNumeric: "normal" },
    ordinal: fontVariantNumeric("ordinal"),
    "slashed-zero": fontVariantNumeric("slashed-zero"),
    "lining-nums": fontVariantNumeric("numeric-figure"),
    "oldstyle-nums": fontVariantNumeric("numeric-figure"),
    "proportional-nums": fontVariantNumeric("numeric-spacing"),
    "tabular-nums": fontVariantNumeric("numeric-spacing"),
    "diagonal-fractions": fontVariantNumeric("numeric-fraction"),
    "stacked-fractions": fontVariantNumeric("numeric-fraction"),
    overflow: (params, context, id) => includes(["ellipsis", "clip"], params[0]) ? propertyValue("textOverflow")(params) : params[1] ? { ["overflow-" + params[0]]: params[1] } : propertyValue()(params, context, id),
    transform: (params) => params[0] == "none" ? { transform: "none" } : {
      "--tw-translate-x": "0",
      "--tw-translate-y": "0",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1",
      transform: transform(params[0] == "gpu")
    },
    rotate: (params, { theme: theme2 }) => (_4 = theme2("rotate", params)) && {
      "--tw-rotate": _4,
      transform: [`rotate(${_4})`, transform()]
    },
    scale: transformXYFunction,
    translate: transformXYFunction,
    skew: transformXYFunction,
    gap: (params, context, id) => (_4 = { x: "column", y: "row" }[params[0]]) ? { [_4 + "Gap"]: context.theme("gap", tail(params)) } : themeProperty("gap")(params, context, id),
    stroke: (params, context, id) => (_4 = context.theme("stroke", params, "")) ? { stroke: _4 } : themeProperty("strokeWidth")(params, context, id),
    outline: (params, { theme: theme2 }) => (_4 = theme2("outline", params)) && {
      outline: _4[0],
      outlineOffset: _4[1]
    },
    "break-normal": {
      wordBreak: "normal",
      overflowWrap: "normal"
    },
    "break-words": { overflowWrap: "break-word" },
    "break-all": { wordBreak: "break-all" },
    text(params, { theme: theme2 }, id) {
      switch (params[0]) {
        case "left":
        case "center":
        case "right":
        case "justify":
          return { textAlign: params[0] };
        case "uppercase":
        case "lowercase":
        case "capitalize":
          return textTransform([], _4, params[0]);
        case "opacity":
          return opacityProperty(params, theme2, id);
      }
      const fontSize = theme2("fontSize", params, "");
      if (fontSize) {
        return typeof fontSize == "string" ? { fontSize } : {
          fontSize: fontSize[0],
          ...typeof fontSize[1] == "string" ? { lineHeight: fontSize[1] } : fontSize[1]
        };
      }
      return withOpacityFallback("color", "text", theme2("textColor", params));
    },
    bg(params, { theme: theme2 }, id) {
      switch (params[0]) {
        case "fixed":
        case "local":
        case "scroll":
          return propertyValue("backgroundAttachment", ",")(params);
        case "bottom":
        case "center":
        case "left":
        case "right":
        case "top":
          return propertyValue("backgroundPosition", " ")(params);
        case "no":
          return params[1] == "repeat" && propertyValue("backgroundRepeat")(params);
        case "repeat":
          return includes("xy", params[1]) ? propertyValue("backgroundRepeat")(params) : { backgroundRepeat: params[1] || params[0] };
        case "opacity":
          return opacityProperty(params, theme2, id, "background");
        case "clip":
        case "origin":
          return params[1] && {
            ["background-" + params[0]]: params[1] + (params[1] == "text" ? "" : "-box")
          };
        case "blend":
          return propertyValue("background-blend-mode")(tail(params));
        case "gradient":
          if (params[1] == "to" && (_4 = expandEdges(params[2]))) {
            return {
              backgroundImage: `linear-gradient(to ${join(_4, " ")},var(--tw-gradient-stops))`
            };
          }
      }
      return (_4 = theme2("backgroundPosition", params, "")) ? { backgroundPosition: _4 } : (_4 = theme2("backgroundSize", params, "")) ? { backgroundSize: _4 } : (_4 = theme2("backgroundImage", params, "")) ? { backgroundImage: _4 } : withOpacityFallback("backgroundColor", "bg", theme2("backgroundColor", params));
    },
    from: (params, { theme: theme2 }) => (_4 = theme2("gradientColorStops", params)) && {
      "--tw-gradient-from": _4,
      "--tw-gradient-stops": `var(--tw-gradient-from),var(--tw-gradient-to,${transparentTo(_4)})`
    },
    via: (params, { theme: theme2 }) => (_4 = theme2("gradientColorStops", params)) && {
      "--tw-gradient-stops": `var(--tw-gradient-from),${_4},var(--tw-gradient-to,${transparentTo(_4)})`
    },
    to: (params, { theme: theme2 }) => (_4 = theme2("gradientColorStops", params)) && {
      "--tw-gradient-to": _4
    },
    border: borderEdges,
    divide: (params, context, id) => (_4 = reversableEdge(params, context, id, "divideWidth", "border", "width") || border(params, context, id)) && {
      "&>:not([hidden])~:not([hidden])": _4
    },
    space: (params, context, id) => (_4 = reversableEdge(params, context, id, "space", "margin")) && {
      "&>:not([hidden])~:not([hidden])": _4
    },
    placeholder: (params, { theme: theme2 }, id) => (_4 = params[0] == "opacity" ? opacityProperty(params, theme2, id) : withOpacityFallback("color", "placeholder", theme2("placeholderColor", params))) && {
      "&::placeholder": _4
    },
    shadow: (params, { theme: theme2 }) => (_4 = theme2("boxShadow", params)) && {
      ":global": {
        "*": {
          "--tw-shadow": "0 0 transparent"
        }
      },
      "--tw-shadow": _4 == "none" ? "0 0 transparent" : _4,
      boxShadow: [
        _4,
        `var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)`
      ]
    },
    animate: (params, { theme: theme2, tag }) => {
      if ($3 = theme2("animation", params)) {
        const parts = $3.split(" ");
        if ((_4 = theme2("keyframes", parts[0], __ = {})) !== __) {
          return ($3 = tag(parts[0])) && {
            animation: $3 + " " + join(tail(parts), " "),
            ["@keyframes " + $3]: _4
          };
        }
        return { animation: $3 };
      }
    },
    ring(params, { theme: theme2 }, id) {
      switch (params[0]) {
        case "inset":
          return { "--tw-ring-inset": "inset" };
        case "opacity":
          return opacityProperty(params, theme2, id);
        case "offset":
          return (_4 = theme2("ringOffsetWidth", tail(params), "")) ? {
            "--tw-ring-offset-width": _4
          } : {
            "--tw-ring-offset-color": theme2("ringOffsetColor", tail(params))
          };
      }
      return (_4 = theme2("ringWidth", params, "")) ? {
        "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
        "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${_4} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        boxShadow: `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)`,
        ":global": {
          "*": {
            "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
            "--tw-ring-offset-width": theme2("ringOffsetWidth", "", "0px"),
            "--tw-ring-offset-color": theme2("ringOffsetColor", "", "#fff"),
            "--tw-ring-color": asRGBA(theme2("ringColor", "", "#93c5fd"), "ring-opacity", theme2("ringOpacity", "", "0.5")),
            "--tw-ring-offset-shadow": "0 0 transparent",
            "--tw-ring-shadow": "0 0 transparent"
          }
        }
      } : {
        "--tw-ring-opacity": "1",
        "--tw-ring-color": asRGBA(theme2("ringColor", params), "ring-opacity")
      };
    },
    object: (params, context, id) => includes(["contain", "cover", "fill", "none", "scale-down"], join(params)) ? { objectFit: join(params) } : themePropertyFallback("objectPosition", " ")(params, context, id),
    list: (params, context, id) => join(params) == "item" ? display(params, context, id) : includes(["inside", "outside"], join(params)) ? { listStylePosition: params[0] } : themePropertyFallback("listStyleType")(params, context, id),
    rounded: (params, context, id) => corners(context.theme("borderRadius", tail(params), ""), params[0], "border", "radius") || themeProperty("borderRadius")(params, context, id),
    "transition-none": { transitionProperty: "none" },
    transition: (params, { theme: theme2 }) => ({
      transitionProperty: theme2("transitionProperty", params),
      transitionTimingFunction: theme2("transitionTimingFunction", ""),
      transitionDuration: theme2("transitionDuration", "")
    }),
    container: (params, { theme: theme2 }) => {
      const { screens = theme2("screens"), center, padding: padding2 } = theme2("container");
      const paddingFor = (screen) => (_4 = padding2 && (typeof padding2 == "string" ? padding2 : padding2[screen] || padding2.DEFAULT)) ? {
        paddingRight: _4,
        paddingLeft: _4
      } : {};
      return Object.keys(screens).reduce((rules2, screen) => {
        if (($3 = screens[screen]) && typeof $3 == "string") {
          rules2[buildMediaQuery($3)] = {
            "&": {
              "max-width": $3,
              ...paddingFor(screen)
            }
          };
        }
        return rules2;
      }, {
        width: "100%",
        ...center ? { marginRight: "auto", marginLeft: "auto" } : {},
        ...paddingFor("xs")
      });
    },
    filter,
    blur: filter,
    brightness: filter,
    contrast: filter,
    grayscale: filter,
    "hue-rotate": filter,
    invert: filter,
    saturate: filter,
    sepia: filter,
    "drop-shadow": filter,
    backdrop: filter
  };
  var createPreflight = (theme2) => ({
    ":root": { tabSize: 4 },
    "body,blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre,fieldset,ol,ul": { margin: "0" },
    button: { backgroundColor: "transparent", backgroundImage: "none" },
    'button,[type="button"],[type="reset"],[type="submit"]': { WebkitAppearance: "button" },
    "button:focus": { outline: ["1px dotted", "5px auto -webkit-focus-ring-color"] },
    "fieldset,ol,ul,legend": { padding: "0" },
    "ol,ul": { listStyle: "none" },
    html: {
      lineHeight: "1.5",
      WebkitTextSizeAdjust: "100%",
      fontFamily: theme2("fontFamily.sans", "ui-sans-serif,system-ui,sans-serif")
    },
    body: { fontFamily: "inherit", lineHeight: "inherit" },
    "*,::before,::after": {
      boxSizing: "border-box",
      border: `0 solid ${theme2("borderColor.DEFAULT", "currentColor")}`
    },
    hr: { height: "0", color: "inherit", borderTopWidth: "1px" },
    img: { borderStyle: "solid" },
    textarea: { resize: "vertical" },
    "input::placeholder,textarea::placeholder": {
      opacity: "1",
      color: theme2("placeholderColor.DEFAULT", theme2("colors.gray.400", "#a1a1aa"))
    },
    'button,[role="button"]': { cursor: "pointer" },
    table: { textIndent: "0", borderColor: "inherit", borderCollapse: "collapse" },
    "h1,h2,h3,h4,h5,h6": { fontSize: "inherit", fontWeight: "inherit" },
    a: { color: "inherit", textDecoration: "inherit" },
    "button,input,optgroup,select,textarea": {
      fontFamily: "inherit",
      fontSize: "100%",
      margin: "0",
      padding: "0",
      lineHeight: "inherit",
      color: "inherit"
    },
    "button,select": { textTransform: "none" },
    "::-moz-focus-inner": { borderStyle: "none", padding: "0" },
    ":-moz-focusring": { outline: "1px dotted ButtonText" },
    ":-moz-ui-invalid": { boxShadow: "none" },
    progress: { verticalAlign: "baseline" },
    "::-webkit-inner-spin-button,::-webkit-outer-spin-button": { height: "auto" },
    '[type="search"]': { WebkitAppearance: "textfield", outlineOffset: "-2px" },
    "::-webkit-search-decoration": { WebkitAppearance: "none" },
    "::-webkit-file-upload-button": { WebkitAppearance: "button", font: "inherit" },
    summary: { display: "list-item" },
    "abbr[title]": { textDecoration: "underline dotted" },
    "b,strong": { fontWeight: "bolder" },
    "pre,code,kbd,samp": {
      fontFamily: theme2("fontFamily", "mono", "ui-monospace,monospace"),
      fontSize: "1em"
    },
    "sub,sup": { fontSize: "75%", lineHeight: "0", position: "relative", verticalAlign: "baseline" },
    sub: { bottom: "-0.25em" },
    sup: { top: "-0.5em" },
    "img,svg,video,canvas,audio,iframe,embed,object": { display: "block", verticalAlign: "middle" },
    "img,video": { maxWidth: "100%", height: "auto" }
  });
  var coreVariants = {
    dark: "@media (prefers-color-scheme:dark)",
    sticky: "@supports ((position: -webkit-sticky) or (position:sticky))",
    "motion-reduce": "@media (prefers-reduced-motion:reduce)",
    "motion-safe": "@media (prefers-reduced-motion:no-preference)",
    first: "&:first-child",
    last: "&:last-child",
    even: "&:nth-child(2n)",
    odd: "&:nth-child(odd)",
    children: "&>*",
    siblings: "&~*",
    sibling: "&+*",
    override: "&&"
  };
  var STYLE_ELEMENT_ID = "__twind";
  var getStyleElement = (nonce) => {
    let element = self[STYLE_ELEMENT_ID];
    if (!element) {
      element = document.head.appendChild(document.createElement("style"));
      element.id = STYLE_ELEMENT_ID;
      nonce && (element.nonce = nonce);
      element.appendChild(document.createTextNode(""));
    }
    return element;
  };
  var cssomSheet = ({
    nonce,
    target = getStyleElement(nonce).sheet
  } = {}) => {
    const offset = target.cssRules.length;
    return {
      target,
      insert: (rule, index) => target.insertRule(rule, offset + index)
    };
  };
  var voidSheet = () => ({
    target: null,
    insert: noop
  });
  var mode = (report) => ({
    unknown(section, key = [], optional, context) {
      if (!optional) {
        this.report({ id: "UNKNOWN_THEME_VALUE", key: section + "." + join(key) }, context);
      }
    },
    report({ id, ...info }) {
      return report(`[${id}] ${JSON.stringify(info)}`);
    }
  });
  var warn = /* @__PURE__ */ mode((message) => console.warn(message));
  var strict = /* @__PURE__ */ mode((message) => {
    throw new Error(message);
  });
  var silent = /* @__PURE__ */ mode(noop);
  var noprefix = (property2, value, important) => `${property2}:${value}${important ? " !important" : ""}`;
  var autoprefix = (property2, value, important) => {
    let cssText = "";
    const propertyAlias = r8(property2);
    if (propertyAlias)
      cssText += `${noprefix(propertyAlias, value, important)};`;
    let flags = a5(property2);
    if (flags & 1)
      cssText += `-webkit-${noprefix(property2, value, important)};`;
    if (flags & 2)
      cssText += `-moz-${noprefix(property2, value, important)};`;
    if (flags & 4)
      cssText += `-ms-${noprefix(property2, value, important)};`;
    flags = t7(property2, value);
    if (flags & 1)
      cssText += `${noprefix(property2, `-webkit-${value}`, important)};`;
    if (flags & 2)
      cssText += `${noprefix(property2, `-moz-${value}`, important)};`;
    if (flags & 4)
      cssText += `${noprefix(property2, `-ms-${value}`, important)};`;
    cssText += noprefix(property2, value, important);
    return cssText;
  };
  var ratios = (start, end) => {
    const result = {};
    do {
      for (let dividend = 1; dividend < start; dividend++) {
        result[`${dividend}/${start}`] = Number((dividend / start * 100).toFixed(6)) + "%";
      }
    } while (++start <= end);
    return result;
  };
  var exponential = (stop, unit, start = 0) => {
    const result = {};
    for (; start <= stop; start = start * 2 || 1) {
      result[start] = start + unit;
    }
    return result;
  };
  var linear = (stop, unit = "", divideBy = 1, start = 0, step = 1, result = {}) => {
    for (; start <= stop; start += step) {
      result[start] = start / divideBy + unit;
    }
    return result;
  };
  var alias2 = (section) => (theme2) => theme2(section);
  var themeFactory = (args, { theme: theme2 }) => theme2(...args);
  var theme = (...args) => directive(themeFactory, args);
  var defaultTheme = {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d"
      },
      yellow: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f"
      },
      green: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81"
      },
      purple: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843"
      }
    },
    spacing: {
      px: "1px",
      0: "0px",
      .../* @__PURE__ */ linear(4, "rem", 4, 0.5, 0.5),
      .../* @__PURE__ */ linear(12, "rem", 4, 5),
      14: "3.5rem",
      .../* @__PURE__ */ linear(64, "rem", 4, 16, 4),
      72: "18rem",
      80: "20rem",
      96: "24rem"
    },
    durations: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1e3: "1000ms"
    },
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite"
    },
    backdropBlur: /* @__PURE__ */ alias2("blur"),
    backdropBrightness: /* @__PURE__ */ alias2("brightness"),
    backdropContrast: /* @__PURE__ */ alias2("contrast"),
    backdropGrayscale: /* @__PURE__ */ alias2("grayscale"),
    backdropHueRotate: /* @__PURE__ */ alias2("hueRotate"),
    backdropInvert: /* @__PURE__ */ alias2("invert"),
    backdropOpacity: /* @__PURE__ */ alias2("opacity"),
    backdropSaturate: /* @__PURE__ */ alias2("saturate"),
    backdropSepia: /* @__PURE__ */ alias2("sepia"),
    backgroundColor: /* @__PURE__ */ alias2("colors"),
    backgroundImage: {
      none: "none"
    },
    backgroundOpacity: /* @__PURE__ */ alias2("opacity"),
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain"
    },
    blur: {
      0: "0",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      "2xl": "40px",
      "3xl": "64px"
    },
    brightness: {
      .../* @__PURE__ */ linear(200, "", 100, 0, 50),
      .../* @__PURE__ */ linear(110, "", 100, 90, 5),
      75: "0.75",
      125: "1.25"
    },
    borderColor: (theme2) => ({
      ...theme2("colors"),
      DEFAULT: theme2("colors.gray.200", "currentColor")
    }),
    borderOpacity: /* @__PURE__ */ alias2("opacity"),
    borderRadius: {
      none: "0px",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "1/2": "50%",
      full: "9999px"
    },
    borderWidth: {
      DEFAULT: "1px",
      .../* @__PURE__ */ exponential(8, "px")
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
      md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
      inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
      none: "none"
    },
    contrast: {
      .../* @__PURE__ */ linear(200, "", 100, 0, 50),
      75: "0.75",
      125: "1.25"
    },
    divideColor: /* @__PURE__ */ alias2("borderColor"),
    divideOpacity: /* @__PURE__ */ alias2("borderOpacity"),
    divideWidth: /* @__PURE__ */ alias2("borderWidth"),
    dropShadow: {
      sm: "0 1px 1px rgba(0,0,0,0.05)",
      DEFAULT: ["0 1px 2px rgba(0,0,0,0.1)", "0 1px 1px rgba(0,0,0,0.06)"],
      md: ["0 4px 3px rgba(0,0,0,0.07)", "0 2px 2px rgba(0,0,0,0.06)"],
      lg: ["0 10px 8px rgba(0,0,0,0.04)", "0 4px 3px rgba(0,0,0,0.1)"],
      xl: ["0 20px 13px rgba(0,0,0,0.03)", "0 8px 5px rgba(0,0,0,0.08)"],
      "2xl": "0 25px 25px rgba(0,0,0,0.15)",
      none: "0 0 #0000"
    },
    fill: { current: "currentColor" },
    grayscale: {
      0: "0",
      DEFAULT: "100%"
    },
    hueRotate: {
      0: "0deg",
      15: "15deg",
      30: "30deg",
      60: "60deg",
      90: "90deg",
      180: "180deg"
    },
    invert: {
      0: "0",
      DEFAULT: "100%"
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none"
    },
    fontFamily: {
      sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(","),
      serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(","),
      mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(",")
    },
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.125rem", "1.75rem"],
      xl: ["1.25rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2.25rem", "2.5rem"],
      "5xl": ["3rem", "1"],
      "6xl": ["3.75rem", "1"],
      "7xl": ["4.5rem", "1"],
      "8xl": ["6rem", "1"],
      "9xl": ["8rem", "1"]
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridAutoColumns: {
      min: "min-content",
      max: "max-content",
      fr: "minmax(0,1fr)"
    },
    gridAutoRows: {
      min: "min-content",
      max: "max-content",
      fr: "minmax(0,1fr)"
    },
    gridColumn: {
      auto: "auto",
      "span-full": "1 / -1"
    },
    gridRow: {
      auto: "auto",
      "span-full": "1 / -1"
    },
    gap: /* @__PURE__ */ alias2("spacing"),
    gradientColorStops: /* @__PURE__ */ alias2("colors"),
    height: (theme2) => ({
      auto: "auto",
      ...theme2("spacing"),
      ...ratios(2, 6),
      full: "100%",
      screen: "100vh"
    }),
    inset: (theme2) => ({
      auto: "auto",
      ...theme2("spacing"),
      ...ratios(2, 4),
      full: "100%"
    }),
    keyframes: {
      spin: {
        from: {
          transform: "rotate(0deg)"
        },
        to: {
          transform: "rotate(360deg)"
        }
      },
      ping: {
        "0%": {
          transform: "scale(1)",
          opacity: "1"
        },
        "75%,100%": {
          transform: "scale(2)",
          opacity: "0"
        }
      },
      pulse: {
        "0%,100%": {
          opacity: "1"
        },
        "50%": {
          opacity: ".5"
        }
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
        },
        "50%": {
          transform: "none",
          animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
        }
      }
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      .../* @__PURE__ */ linear(10, "rem", 4, 3)
    },
    margin: (theme2) => ({
      auto: "auto",
      ...theme2("spacing")
    }),
    maxHeight: (theme2) => ({
      ...theme2("spacing"),
      full: "100%",
      screen: "100vh"
    }),
    maxWidth: (theme2, { breakpoints }) => ({
      none: "none",
      0: "0rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      full: "100%",
      min: "min-content",
      max: "max-content",
      prose: "65ch",
      ...breakpoints(theme2("screens"))
    }),
    minHeight: {
      0: "0px",
      full: "100%",
      screen: "100vh"
    },
    minWidth: {
      0: "0px",
      full: "100%",
      min: "min-content",
      max: "max-content"
    },
    opacity: {
      .../* @__PURE__ */ linear(100, "", 100, 0, 10),
      5: "0.05",
      25: "0.25",
      75: "0.75",
      95: "0.95"
    },
    order: {
      first: "-9999",
      last: "9999",
      none: "0",
      .../* @__PURE__ */ linear(12, "", 1, 1)
    },
    outline: {
      none: ["2px solid transparent", "2px"],
      white: ["2px dotted white", "2px"],
      black: ["2px dotted black", "2px"]
    },
    padding: /* @__PURE__ */ alias2("spacing"),
    placeholderColor: /* @__PURE__ */ alias2("colors"),
    placeholderOpacity: /* @__PURE__ */ alias2("opacity"),
    ringColor: (theme2) => ({
      DEFAULT: theme2("colors.blue.500", "#3b82f6"),
      ...theme2("colors")
    }),
    ringOffsetColor: /* @__PURE__ */ alias2("colors"),
    ringOffsetWidth: /* @__PURE__ */ exponential(8, "px"),
    ringOpacity: (theme2) => ({
      DEFAULT: "0.5",
      ...theme2("opacity")
    }),
    ringWidth: {
      DEFAULT: "3px",
      .../* @__PURE__ */ exponential(8, "px")
    },
    rotate: {
      .../* @__PURE__ */ exponential(2, "deg"),
      .../* @__PURE__ */ exponential(12, "deg", 3),
      .../* @__PURE__ */ exponential(180, "deg", 45)
    },
    saturate: /* @__PURE__ */ linear(200, "", 100, 0, 50),
    scale: {
      .../* @__PURE__ */ linear(150, "", 100, 0, 50),
      .../* @__PURE__ */ linear(110, "", 100, 90, 5),
      75: "0.75",
      125: "1.25"
    },
    sepia: {
      0: "0",
      DEFAULT: "100%"
    },
    skew: {
      .../* @__PURE__ */ exponential(2, "deg"),
      .../* @__PURE__ */ exponential(12, "deg", 3)
    },
    space: /* @__PURE__ */ alias2("spacing"),
    stroke: {
      current: "currentColor"
    },
    strokeWidth: /* @__PURE__ */ linear(2),
    textColor: /* @__PURE__ */ alias2("colors"),
    textOpacity: /* @__PURE__ */ alias2("opacity"),
    transitionDuration: (theme2) => ({
      DEFAULT: "150ms",
      ...theme2("durations")
    }),
    transitionDelay: /* @__PURE__ */ alias2("durations"),
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT: "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
      colors: "background-color,border-color,color,fill,stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform"
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
      linear: "linear",
      in: "cubic-bezier(0.4,0,1,1)",
      out: "cubic-bezier(0,0,0.2,1)",
      "in-out": "cubic-bezier(0.4,0,0.2,1)"
    },
    translate: (theme2) => ({
      ...theme2("spacing"),
      ...ratios(2, 4),
      full: "100%"
    }),
    width: (theme2) => ({
      auto: "auto",
      ...theme2("spacing"),
      ...ratios(2, 6),
      ...ratios(12, 12),
      screen: "100vw",
      full: "100%",
      min: "min-content",
      max: "max-content"
    }),
    zIndex: {
      auto: "auto",
      .../* @__PURE__ */ linear(50, "", 1, 0, 10)
    }
  };
  var flattenColorPalette = (colors, target = {}, prefix = []) => {
    Object.keys(colors).forEach((property2) => {
      const value = colors[property2];
      if (property2 == "DEFAULT") {
        target[join(prefix)] = value;
        target[join(prefix, ".")] = value;
      }
      const key = [...prefix, property2];
      target[join(key)] = value;
      target[join(key, ".")] = value;
      if (value && typeof value == "object") {
        flattenColorPalette(value, target, key);
      }
    }, target);
    return target;
  };
  var resolveContext = {
    negative: () => ({}),
    breakpoints: (screens) => Object.keys(screens).filter((key) => typeof screens[key] == "string").reduce((target, key) => {
      target["screen-" + key] = screens[key];
      return target;
    }, {})
  };
  var handleArbitraryValues = (section, key) => (key = key[0] == "[" && key.slice(-1) == "]" && key.slice(1, -1)) && includes(section, "olor") == /^(#|(hsl|rgb)a?\(|[a-z]+$)/.test(key) && (includes(key, "calc(") ? key.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ") : key);
  var makeThemeResolver = (config) => {
    const cache = /* @__PURE__ */ new Map();
    const theme2 = { ...defaultTheme, ...config };
    const deref = (theme3, section) => {
      const base = theme3 && theme3[section];
      const value = typeof base == "function" ? base(resolve, resolveContext) : base;
      return value && section == "colors" ? flattenColorPalette(value) : value;
    };
    const resolve = (section, key, defaultValue) => {
      const keypath = section.split(".");
      section = keypath[0];
      if (keypath.length > 1) {
        defaultValue = key;
        key = join(tail(keypath), ".");
      }
      let base = cache.get(section);
      if (!base) {
        cache.set(section, base = { ...deref(theme2, section) });
        Object.assign(base, deref(theme2.extend, section));
      }
      if (key != null) {
        key = (Array.isArray(key) ? join(key) : key) || "DEFAULT";
        const value = handleArbitraryValues(section, key) || base[key];
        return value == null ? defaultValue : Array.isArray(value) && !includes(["fontSize", "outline", "dropShadow"], section) ? join(value, ",") : value;
      }
      return base;
    };
    return resolve;
  };
  var translate = (plugins, context) => (rule, isTranslating) => {
    if (typeof rule.d == "function") {
      return rule.d(context);
    }
    const parameters = rule.d.split(/-(?![^[]*])/g);
    if (!isTranslating && parameters[0] == "tw" && rule.$ == rule.d) {
      return rule.$;
    }
    for (let index = parameters.length; index; index--) {
      const id = join(parameters.slice(0, index));
      if (Object.prototype.hasOwnProperty.call(plugins, id)) {
        const plugin = plugins[id];
        return typeof plugin == "function" ? plugin(tail(parameters, index), context, id) : typeof plugin == "string" ? context[isTranslating ? "css" : "tw"](plugin) : plugin;
      }
    }
  };
  var _22;
  var GROUP_RE = /^:(group(?:(?!-focus).+?)*)-(.+)$/;
  var NOT_PREFIX_RE = /^(:not)-(.+)/;
  var prepareVariantSelector = (variant) => variant[1] == "[" ? tail(variant) : variant;
  var decorate = (darkMode, variants, { theme: theme2, tag }) => {
    const applyVariant = (translation, variant) => {
      if (_22 = theme2("screens", tail(variant), "")) {
        return { [buildMediaQuery(_22)]: translation };
      }
      if (variant == ":dark" && darkMode == "class") {
        return { ".dark &": translation };
      }
      if (_22 = GROUP_RE.exec(variant)) {
        return { [`.${escape(tag(_22[1]))}:${_22[2]} &`]: translation };
      }
      return {
        [variants[tail(variant)] || "&" + variant.replace(NOT_PREFIX_RE, (_42, not2, variant2) => not2 + "(" + prepareVariantSelector(":" + variant2) + ")")]: translation
      };
    };
    return (translation, rule) => rule.v.reduceRight(applyVariant, translation);
  };
  var _32;
  var responsivePrecedence = (css2) => (((_32 = /(?:^|min-width: *)(\d+(?:.\d+)?)(p)?/.exec(css2)) ? +_32[1] / (_32[2] ? 15 : 1) / 10 : 0) & 31) << 22;
  var seperatorPrecedence = (string) => {
    _32 = 0;
    for (let index = string.length; index--; ) {
      _32 += includes("-:,", string[index]);
    }
    return _32;
  };
  var atRulePresedence = (css2) => (seperatorPrecedence(css2) & 15) << 18;
  var PRECEDENCES_BY_PSEUDO_CLASS = [
    "rst",
    "st",
    "en",
    "d",
    "nk",
    "sited",
    "pty",
    "ecked",
    "cus-w",
    "ver",
    "cus",
    "cus-v",
    "tive",
    "sable",
    "ad-on",
    "tiona",
    "quire"
  ];
  var pseudoPrecedence = (pseudoClass) => 1 << (~(_32 = PRECEDENCES_BY_PSEUDO_CLASS.indexOf(pseudoClass.replace(GROUP_RE, ":$2").slice(3, 8))) ? _32 : 17);
  var makeVariantPresedenceCalculator = (theme2, variants) => (presedence, variant) => presedence | ((_32 = theme2("screens", tail(variant), "")) ? 1 << 27 | responsivePrecedence(buildMediaQuery(_32)) : variant == ":dark" ? 1 << 30 : (_32 = variants[variant] || variant.replace(NOT_PREFIX_RE, ":$2"))[0] == "@" ? atRulePresedence(_32) : pseudoPrecedence(variant));
  var declarationPropertyPrecedence = (property2) => property2[0] == "-" ? 0 : seperatorPrecedence(property2) + ((_32 = /^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/.exec(property2)) ? +!!_32[1] || -!!_32[2] : 0) + 1;
  var stringifyBlock = (body, selector) => selector + "{" + body + "}";
  var serialize = (prefix, variants, context) => {
    const { theme: theme2, tag } = context;
    const tagVar = (_42, property2) => "--" + tag(property2);
    const tagVars = (value) => `${value}`.replace(/--(tw-[\w-]+)\b/g, tagVar);
    const stringifyDeclaration = (property2, value, important) => {
      property2 = tagVars(property2);
      return Array.isArray(value) ? join(value.filter(Boolean).map((value2) => prefix(property2, tagVars(value2), important)), ";") : prefix(property2, tagVars(value), important);
    };
    let rules2;
    const stringify2 = (atRules, selector, presedence, css2, important) => {
      if (Array.isArray(css2)) {
        css2.forEach((css22) => css22 && stringify2(atRules, selector, presedence, css22, important));
        return;
      }
      let declarations = "";
      let maxPropertyPresedence = 0;
      let numberOfDeclarations = 0;
      if (css2["@apply"]) {
        css2 = merge(evalThunk(apply(css2["@apply"]), context), { ...css2, "@apply": void 0 }, context);
      }
      Object.keys(css2).forEach((key) => {
        const value = evalThunk(css2[key], context);
        if (isCSSProperty(key, value)) {
          if (value !== "" && key.length > 1) {
            const property2 = hyphenate(key);
            numberOfDeclarations += 1;
            maxPropertyPresedence = Math.max(maxPropertyPresedence, declarationPropertyPrecedence(property2));
            declarations = (declarations && declarations + ";") + stringifyDeclaration(property2, value, important);
          }
        } else if (value) {
          if (key == ":global") {
            key = "@global";
          }
          if (key[0] == "@") {
            if (key[1] == "g") {
              stringify2([], "", 0, value, important);
            } else if (key[1] == "f") {
              stringify2([], key, 0, value, important);
            } else if (key[1] == "k") {
              const currentSize = rules2.length;
              stringify2([], "", 0, value, important);
              const waypoints = rules2.splice(currentSize, rules2.length - currentSize);
              rules2.push({
                r: stringifyBlock(join(waypoints.map((p4) => p4.r), ""), key),
                p: waypoints.reduce((sum, p4) => sum + p4.p, 0)
              });
            } else if (key[1] == "i") {
              ;
              (Array.isArray(value) ? value : [value]).forEach((value2) => value2 && rules2.push({ p: 0, r: `${key} ${value2};` }));
            } else {
              if (key[2] == "c") {
                key = buildMediaQuery(context.theme("screens", tail(key, 8).trim()));
              }
              stringify2([...atRules, key], selector, presedence | responsivePrecedence(key) | atRulePresedence(key), value, important);
            }
          } else {
            stringify2(atRules, selector ? selector.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_42, selectorPart, comma) => key.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_5, keyPart, comma2) => (includes(keyPart, "&") ? keyPart.replace(/&/g, selectorPart) : (selectorPart && selectorPart + " ") + keyPart) + comma2) + comma) : key, presedence, value, important);
          }
        }
      });
      if (numberOfDeclarations) {
        rules2.push({
          r: atRules.reduceRight(stringifyBlock, stringifyBlock(declarations, selector)),
          p: presedence * (1 << 8) + ((Math.max(0, 15 - numberOfDeclarations) & 15) << 4 | (maxPropertyPresedence || 15) & 15)
        });
      }
    };
    const variantPresedence = makeVariantPresedenceCalculator(theme2, variants);
    return (css2, className, rule, layer = 0) => {
      layer <<= 28;
      rules2 = [];
      stringify2([], className ? "." + escape(className) : "", rule ? rule.v.reduceRight(variantPresedence, layer) : layer, css2, rule && rule.i);
      return rules2;
    };
  };
  var inject = (sheet2, mode2, init, context) => {
    let sortedPrecedences;
    init((value = []) => sortedPrecedences = value);
    let insertedRules;
    init((value = /* @__PURE__ */ new Set()) => insertedRules = value);
    return ({ r: css2, p: presedence }) => {
      if (!insertedRules.has(css2)) {
        insertedRules.add(css2);
        const index = sortedInsertionIndex(sortedPrecedences, presedence);
        try {
          sheet2.insert(css2, index);
          sortedPrecedences.splice(index, 0, presedence);
        } catch (error) {
          if (!/:-[mwo]/.test(css2)) {
            mode2.report({ id: "INJECT_CSS_ERROR", css: css2, error }, context);
          }
        }
      }
    };
  };
  var sanitize = (value, defaultValue, disabled, enabled = defaultValue) => value === false ? disabled : value === true ? enabled : value || defaultValue;
  var loadMode = (mode2) => (typeof mode2 == "string" ? { t: strict, a: warn, i: silent }[mode2[1]] : mode2) || warn;
  var COMPONENT_PROPS = { _: { value: "", writable: true } };
  var configure = (config = {}) => {
    const theme2 = makeThemeResolver(config.theme);
    const mode2 = loadMode(config.mode);
    const hash = sanitize(config.hash, false, false, cyrb32);
    const important = config.important;
    let activeRule = { v: [] };
    let translateDepth = 0;
    const lastTranslations = [];
    const context = {
      tw: (...tokens) => process(tokens),
      theme: (section, key, defaultValue) => {
        var _a;
        const value = (_a = theme2(section, key, defaultValue)) != null ? _a : mode2.unknown(section, key == null || Array.isArray(key) ? key : key.split("."), defaultValue != null, context);
        return activeRule.n && value && includes("rg", (typeof value)[5]) ? `calc(${value} * -1)` : value;
      },
      tag: (value) => hash ? hash(value) : value,
      css: (rules2) => {
        translateDepth++;
        const lastTranslationsIndex = lastTranslations.length;
        try {
          ;
          (typeof rules2 == "string" ? parse([rules2]) : rules2).forEach(convert);
          const css2 = Object.create(null, COMPONENT_PROPS);
          for (let index = lastTranslationsIndex; index < lastTranslations.length; index++) {
            const translation = lastTranslations[index];
            if (translation) {
              switch (typeof translation) {
                case "object":
                  merge(css2, translation, context);
                  break;
                case "string":
                  css2._ += (css2._ && " ") + translation;
              }
            }
          }
          return css2;
        } finally {
          lastTranslations.length = lastTranslationsIndex;
          translateDepth--;
        }
      }
    };
    const translate22 = translate({ ...corePlugins, ...config.plugins }, context);
    const doTranslate = (rule) => {
      const parentRule = activeRule;
      activeRule = rule;
      try {
        return evalThunk(translate22(rule), context);
      } finally {
        activeRule = parentRule;
      }
    };
    const variants = { ...coreVariants, ...config.variants };
    const decorate22 = decorate(config.darkMode || "media", variants, context);
    const serialize2 = serialize(sanitize(config.prefix, autoprefix, noprefix), variants, context);
    const sheet2 = config.sheet || (typeof window == "undefined" ? voidSheet() : cssomSheet(config));
    const { init = (callback) => callback() } = sheet2;
    const inject2 = inject(sheet2, mode2, init, context);
    let idToClassName;
    init((value = /* @__PURE__ */ new Map()) => idToClassName = value);
    const inlineDirectiveName = /* @__PURE__ */ new WeakMap();
    const evaluateFunctions = (key, value) => key == "_" ? void 0 : typeof value == "function" ? JSON.stringify(evalThunk(value, context), evaluateFunctions) : value;
    const convert = (rule) => {
      if (!translateDepth && activeRule.v.length) {
        rule = { ...rule, v: [...activeRule.v, ...rule.v], $: "" };
      }
      if (!rule.$) {
        rule.$ = stringifyRule(rule, inlineDirectiveName.get(rule.d));
      }
      let className = translateDepth ? null : idToClassName.get(rule.$);
      if (className == null) {
        let translation = doTranslate(rule);
        if (!rule.$) {
          rule.$ = cyrb32(JSON.stringify(translation, evaluateFunctions));
          inlineDirectiveName.set(rule.d, rule.$);
          rule.$ = stringifyRule(rule, rule.$);
        }
        if (translation && typeof translation == "object") {
          rule.v = rule.v.map(prepareVariantSelector);
          if (important)
            rule.i = important;
          translation = decorate22(translation, rule);
          if (translateDepth) {
            lastTranslations.push(translation);
          } else {
            const layer = typeof rule.d == "function" ? typeof translation._ == "string" ? 1 : 3 : 2;
            className = hash || typeof rule.d == "function" ? (hash || cyrb32)(layer + rule.$) : rule.$;
            serialize2(translation, className, rule, layer).forEach(inject2);
            if (translation._) {
              className += " " + translation._;
            }
          }
        } else {
          if (typeof translation == "string") {
            className = translation;
          } else {
            className = rule.$;
            mode2.report({ id: "UNKNOWN_DIRECTIVE", rule: className }, context);
          }
          if (translateDepth && typeof rule.d !== "function") {
            lastTranslations.push(className);
          }
        }
        if (!translateDepth) {
          idToClassName.set(rule.$, className);
          ensureMaxSize(idToClassName, 3e4);
        }
      }
      return className;
    };
    const process = (tokens) => join(parse(tokens).map(convert).filter(Boolean), " ");
    const preflight = sanitize(config.preflight, identity, false);
    if (preflight) {
      const css2 = createPreflight(theme2);
      const styles = serialize2(typeof preflight == "function" ? evalThunk(preflight(css2, context), context) || css2 : { ...css2, ...preflight });
      init((injected = (styles.forEach(inject2), true)) => injected);
    }
    return {
      init: () => mode2.report({ id: "LATE_SETUP_CALL" }, context),
      process
    };
  };
  var create = (config) => {
    let process = (tokens) => {
      init();
      return process(tokens);
    };
    let init = (config2) => {
      ;
      ({ process, init } = configure(config2));
    };
    if (config)
      init(config);
    let context;
    const fromContext = (key) => () => {
      if (!context) {
        process([
          (_42) => {
            context = _42;
            return "";
          }
        ]);
      }
      return context[key];
    };
    return {
      tw: Object.defineProperties((...tokens) => process(tokens), {
        theme: {
          get: fromContext("theme")
        }
      }),
      setup: (config2) => init(config2)
    };
  };
  var { tw, setup } = /* @__PURE__ */ create();

  // frontend/node_modules/twind/css/css.js
  var includes2 = (value, search) => !!~value.indexOf(search);
  var hyphenate2 = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
  var evalThunk2 = (value, context) => {
    while (typeof value == "function") {
      value = value(context);
    }
    return value;
  };
  var isCSSProperty2 = (key, value) => !includes2("@:&", key[0]) && (includes2("rg", (typeof value)[5]) || Array.isArray(value));
  var merge2 = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
    const value = evalThunk2(source[key], context);
    if (isCSSProperty2(key, value)) {
      target2[hyphenate2(key)] = value;
    } else {
      target2[key] = key[0] == "@" && includes2("figa", key[1]) ? (target2[key] || []).concat(value) : merge2(target2[key] || {}, value, context);
    }
    return target2;
  }, target) : target;
  var escape2 = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
  var translate2 = (tokens, context) => {
    const collect = (target, token) => Array.isArray(token) ? token.reduce(collect, target) : merge2(target, evalThunk2(token, context), context);
    return tokens.reduce(collect, {});
  };
  var newRule = /\s*(?:([\w-%@]+)\s*:?\s*([^{;]+?)\s*(?:;|$|})|([^;}{]*?)\s*{)|(})/gi;
  var ruleClean = /\/\*[\s\S]*?\*\/|\s+|\n/gm;
  var decorate2 = (selectors, currentBlock) => selectors.reduceRight((rules2, selector) => ({ [selector]: rules2 }), currentBlock);
  var saveBlock = (rules2, selectors, currentBlock) => {
    if (currentBlock) {
      rules2.push(decorate2(selectors, currentBlock));
    }
  };
  var interleave = (strings, interpolations, context) => {
    let buffer = strings[0];
    const result = [];
    for (let index = 0; index < interpolations.length; ) {
      const interpolation = evalThunk2(interpolations[index], context);
      if (interpolation && typeof interpolation == "object") {
        result.push(buffer, interpolation);
        buffer = strings[++index];
      } else {
        buffer += (interpolation || "") + strings[++index];
      }
    }
    result.push(buffer);
    return result;
  };
  var astish = (values, context) => {
    const selectors = [];
    const rules2 = [];
    let currentBlock;
    let match;
    for (let index = 0; index < values.length; index++) {
      const value = values[index];
      if (typeof value == "string") {
        while (match = newRule.exec(value.replace(ruleClean, " "))) {
          if (!match[0])
            continue;
          if (match[4]) {
            currentBlock = saveBlock(rules2, selectors, currentBlock);
            selectors.pop();
          }
          if (match[3]) {
            currentBlock = saveBlock(rules2, selectors, currentBlock);
            selectors.push(match[3]);
          } else if (!match[4]) {
            if (!currentBlock)
              currentBlock = {};
            const value2 = match[2] && /\S/.test(match[2]) ? match[2] : values[++index];
            if (value2) {
              if (match[1] == "@apply") {
                merge2(currentBlock, evalThunk2(apply(value2), context), context);
              } else {
                currentBlock[match[1]] = value2;
              }
            }
          }
        }
      } else {
        currentBlock = saveBlock(rules2, selectors, currentBlock);
        rules2.push(decorate2(selectors, value));
      }
    }
    saveBlock(rules2, selectors, currentBlock);
    return rules2;
  };
  var cssFactory = (tokens, context) => translate2(Array.isArray(tokens[0]) && Array.isArray(tokens[0].raw) ? astish(interleave(tokens[0], tokens.slice(1), context), context) : tokens, context);
  var css = (...tokens) => directive(cssFactory, tokens);
  var keyframesFactory = (tokens, context) => {
    const waypoints = cssFactory(tokens, context);
    const id = cyrb32(JSON.stringify(waypoints));
    context.tw(() => ({ [`@keyframes ${id}`]: waypoints }));
    return id;
  };
  var keyframes = (...tokens) => directive(keyframesFactory, tokens);

  // frontend/ts/components/lit/themes/defaultTheme.ts
  var sheet = cssomSheet({ target: new CSSStyleSheet() });
  var twindConfig = {
    theme: {
      extend: {
        colors: {
          panel: {
            bgActive: "oklch(80% 150 260 / 0.4)"
          },
          overlay: {
            bg: "oklch(100% 0 0 / 0.05)",
            bgHover: "oklch(60% 70 240 / 0.2)",
            bgActive: "oklch(60% 70 240 / 0.4)",
            border: "oklch(100% 0 0 / 0.3)",
            shadow: "oklch(0% 0 0 / 0.15)",
            highlight: "oklch(100% 0 0 / 0.5)"
          },
          icon: {
            default: "oklch(100% 0 0 / 0.7)",
            hover: "oklch(100% 80 240)",
            active: "oklch(100% 150 260)",
            glow: "oklch(70% 150 260 / 0.8)"
          }
        }
      }
    }
  };
  var { tw: tw2 } = create({ sheet, ...twindConfig });
  var sweepLightKeyframes = keyframes({
    "0%": { transform: "translate(-40%, -40%)" },
    "100%": { transform: "translate(40%, 40%)" }
  });
  var bounceKeyframes = keyframes({
    "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
    "40%": { transform: "translateY(-5px)" },
    "60%": { transform: "translateY(-2px)" }
  });
  var pulseGlowKeyframes = keyframes({
    "0%, 100%": { filter: "drop-shadow(0 0 3px var(--icon-glow-color))" },
    "50%": { filter: "drop-shadow(0 0 8px var(--icon-glow-color))" }
  });
  var flexCenter = apply`flex items-center justify-center`;
  var gridLayout = apply`grid grid-cols-3 grid-rows-3 gap-2`;
  var fullSize = apply`w-full h-full`;
  var roundedMd = apply`rounded-md`;
  var overlayBackground = css`
  background: linear-gradient(135deg, ${theme("colors.overlay.bg")}, ${theme("colors.overlay.bg")});
  backdrop-filter: blur(10px);
`;
  var buttonNormalBackground = css`
  background: linear-gradient(135deg, ${theme("colors.overlay.bg")}, ${theme("colors.overlay.bg")});
`;
  var buttonHoverBackground = css`
  background: linear-gradient(135deg, ${theme("colors.overlay.bgHover")}, ${theme("colors.overlay.bgHover")});
`;
  var buttonActiveBackground = css`
  background: linear-gradient(135deg, ${theme("colors.overlay.bgActive")}, ${theme("colors.overlay.bgActive")});
`;
  var overlayBorder = css`border: 1px solid ${theme("colors.overlay.border")}`;
  var buttonShadow = css`
  box-shadow: 0 2px 4px ${theme("colors.overlay.shadow")}, inset 0 1px 0 ${theme("colors.overlay.bg")};
`;
  var defaultTransition = apply`transition-all duration-200 ease-in-out`;
  var cursorPointer = apply`cursor-pointer`;
  var scaleOnActive = apply`active:scale-97`;
  var sweepLightAnimation = css`
  &::before {
    content: '';
    position: absolute;
    top: -200%;
    left: -200%;
    width: 500%;
    height: 500%;
    background: linear-gradient(
      135deg,
      ${theme("colors.overlay.bg")} 20%,
      ${theme("colors.overlay.bg")} 35%,
      ${theme("colors.overlay.highlight")} 49%,
      ${theme("colors.overlay.highlight")} 50%,
      ${theme("colors.overlay.highlight")} 51%,
      ${theme("colors.overlay.bg")} 65%,
      ${theme("colors.overlay.bg")} 80%
    );
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
    animation: ${sweepLightKeyframes} 0.6s linear infinite;
  }
`;
  var bounceAnimation = css`
  animation: ${bounceKeyframes} 0.5s ease-in-out;
`;
  var pulseGlowAnimation = css`
  animation: ${pulseGlowKeyframes} 2s ease-in-out infinite;
`;
  var iconBaseStyles = css`
  --icon-glow-color: ${theme("colors.icon.glow")};
  & path, & circle, & line {
    stroke: ${theme("colors.icon.default")};
    stroke-width: 2;
    transition: all 0.2s ease-in-out;
  }
`;
  var iconHoverStyles = css`
  & path, & circle, & line {
    stroke: ${theme("colors.icon.hover")};
  }
`;
  var iconActiveStyles = css`
  & path, & circle, & line {
    stroke: ${theme("colors.icon.active")};
    stroke-width: 3;
  }
  ${pulseGlowAnimation}
`;
  var overlayContainerStyles = apply`
  ${gridLayout} ${fullSize} ${roundedMd}
  p-2 box-border
  ${overlayBackground}
`;
  var buttonBaseStyles = apply`
  ${flexCenter} ${fullSize} ${roundedMd}
  ${defaultTransition} ${cursorPointer}
  ${buttonNormalBackground}
  ${overlayBorder}
  ${buttonShadow}
  relative overflow-hidden
  ${sweepLightAnimation}
`;
  var ActivePanelBaseStyles = apply`
  ${overlayBorder}
  ${buttonShadow}
  relative overflow-hidden
`;
  var buttonHoverStyles = apply`
  hover:${buttonHoverBackground}
`;
  var buttonActiveStyles = apply`
  ${scaleOnActive}
  ${buttonActiveBackground}
  ${bounceAnimation}
`;
  var iconStyles = apply`
  w-1/3 h-1/3 ${defaultTransition}
  ${iconBaseStyles}
  ${css`
    button:hover & {
      ${iconHoverStyles}
    }
    .active & {
      ${iconActiveStyles}
    }
  `}
`;

  // frontend/ts/components/lit/panelElement/ndcHelpers.ts
  function clientToNDC(clientX, clientY, width, height) {
    return {
      x: clientX / width * 2 - 1,
      y: -(clientY / height * 2 - 1)
    };
  }
  function getNDCPixels(ndcPosition, ndcSize, containerWidth, containerHeight) {
    return {
      left: (ndcPosition.x + 1) / 2 * containerWidth,
      top: (1 - ndcPosition.y) / 2 * containerHeight,
      width: ndcSize.width / 2 * containerWidth,
      height: ndcSize.height / 2 * containerHeight
    };
  }
  function getValidUpdate(position2, size) {
    if (size.width <= 0 || size.height <= 0) {
      return null;
    }
    let left = position2.x;
    let right = position2.x + size.width;
    let top = position2.y;
    let bottom = position2.y - size.height;
    if (right < -1 || left > 1 || top < -1 || bottom > 1) {
      return null;
    }
    if (left < -1) {
      position2.x = -1;
      size.width = Math.min(right + 1, 2);
    }
    if (right > 1) {
      size.width = 1 - position2.x;
    }
    if (bottom < -1) {
      size.height = position2.y + 1;
    }
    if (top > 1) {
      position2.y = 1;
      size.height = Math.min(1 - bottom, 2);
    }
    return { position: position2, size };
  }
  function determineResizeQuadrant(ndcCursor, ndcPosition, ndcSize) {
    const elementCenterX = ndcPosition.x + ndcSize.width / 2;
    const elementCenterY = ndcPosition.y - ndcSize.height / 2;
    const isLeft = ndcCursor.x < elementCenterX;
    const isTop = ndcCursor.y > elementCenterY;
    if (isLeft && isTop) return "topLeft";
    else if (!isLeft && isTop) return "topRight";
    else if (isLeft && !isTop) return "bottomLeft";
    else return "bottomRight";
  }
  function calculateDelta(currentPosition, startPosition) {
    return {
      dx: currentPosition.x - startPosition.x,
      dy: currentPosition.y - startPosition.y
    };
  }
  function calculateNewSize(quadrant, dx, dy, initialSize, minWidth, maxWidth, minHeight, maxHeight) {
    let width = initialSize.width;
    let height = initialSize.height;
    switch (quadrant) {
      case "topLeft":
      case "bottomLeft":
        width = Math.max(minWidth, Math.min(maxWidth, initialSize.width - dx));
        break;
      case "topRight":
      case "bottomRight":
        width = Math.max(minWidth, Math.min(maxWidth, initialSize.width + dx));
        break;
    }
    switch (quadrant) {
      case "topLeft":
      case "topRight":
        height = Math.max(minHeight, Math.min(maxHeight, initialSize.height + dy));
        break;
      case "bottomLeft":
      case "bottomRight":
        height = Math.max(minHeight, Math.min(maxHeight, initialSize.height - dy));
        break;
    }
    return { width, height };
  }
  function calculateNewPosition(quadrant, initialPosition, initialSize, newWidth, newHeight) {
    let x3 = initialPosition.x;
    let y4 = initialPosition.y;
    if (quadrant === "topLeft" || quadrant === "bottomLeft") {
      x3 = initialPosition.x + initialSize.width - newWidth;
    }
    if (quadrant === "topLeft" || quadrant === "topRight") {
      y4 = initialPosition.y - (initialSize.height - newHeight);
    }
    return { x: x3, y: y4 };
  }

  // frontend/ts/components/lit/panelElement/panelElement.ts
  var interactiveStyles = {
    base: tw2``,
    draggable: tw2`
    ${ActivePanelBaseStyles}
    border-solid border-4
    ${css`border-color: ${theme("colors.panel.bgActive")}`}
  `,
    resizable: tw2`
    ${ActivePanelBaseStyles}
    border-dotted border-4
    ${css`border-color: ${theme("colors.panel.bgActive")}`}
  `,
    hover: tw2`shadow-lg`
  };
  var PanelElement = class extends h6 {
    constructor() {
      super();
      this.name = "Interactive Element";
      this.ndcX = 0;
      this.ndcY = 0;
      this.ndcWidth = 0.2;
      this.ndcHeight = 0.2;
      this.zIndex = 0;
      this.mode = "fixed";
      this.minWidth = 0;
      this.maxWidth = 2;
      this.minHeight = 0;
      this.maxHeight = 2;
      this.ndcPosition = { x: 0, y: 0 };
      this.ndcSize = { width: 0.2, height: 0.2 };
      this.resizeObserver = null;
      this.resizeQuadrant = "topLeft";
      this.interactionState = {
        isInteracting: false,
        startPosition: { x: 0, y: 0 },
        currentPosition: { x: 0, y: 0 }
      };
      this.initialSize = { width: 0, height: 0 };
      this.initialPosition = { x: 0, y: 0 };
      this.handleBaseResize = () => {
        this.updatePositionAndSize();
      };
      this.handlePointerDown = (e9) => {
        const position2 = this.clientToNDC(e9.clientX, e9.clientY);
        this.startInteraction(position2);
        e9.preventDefault();
      };
      this.handlePointerMove = (e9) => {
        const position2 = this.clientToNDC(e9.clientX, e9.clientY);
        this.updateInteraction(position2);
      };
      this.handlePointerUp = () => {
        this.endInteraction();
      };
      this.handleBaseResize = this.handleBaseResize.bind(this);
      this.addEventListener("pointerdown", this.handlePointerDown);
    }
    connectedCallback() {
      super.connectedCallback();
      this.resizeObserver = new ResizeObserver(this.handleBaseResize);
      this.resizeObserver.observe(this);
      this.handleBaseResize();
      this.adjustSizeToConstraints();
      this.updateInteractionStyle();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      this.removeEventListener("pointerdown", this.handlePointerDown);
      this.removeGlobalListeners();
    }
    firstUpdated() {
      this.updatePositionAndSize();
      this.mainWrapperF.then((el) => {
        this.updateWrapperClasses(el);
      });
    }
    updated(changedProperties) {
      if (changedProperties.has("ndcX") || changedProperties.has("ndcY") || changedProperties.has("ndcWidth") || changedProperties.has("ndcHeight") || changedProperties.has("zIndex")) {
        this.updatePositionAndSize();
      }
      if (changedProperties.has("mode")) {
        this.updateInteractionStyle();
      }
      super.updated(changedProperties);
    }
    updatePositionAndSize() {
      this.ndcSize = { width: this.ndcWidth, height: this.ndcHeight };
      this.ndcPosition = { x: this.ndcX, y: this.ndcY };
      this.updateContentStyles();
    }
    updateContentStyles() {
      const { left, top, width, height } = this.getNDCPixels();
      let setStyle = (el) => {
        el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
      };
      this.mainWrapper ? setStyle(this.mainWrapper) : this.mainWrapperF.then(setStyle);
      this.style.zIndex = this.zIndex.toString();
    }
    render() {
      return ke`
      <div id="main-wrapper" class="content-wrapper">
        <div id="child-wrapper" class="slot-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
    }
    getNDCPixels() {
      const { width, height } = this.getBoundingClientRect();
      return getNDCPixels(this.ndcPosition, this.ndcSize, width, height);
    }
    clientToNDC(clientX, clientY) {
      const { width, height } = this.getBoundingClientRect();
      return clientToNDC(clientX, clientY, width, height);
    }
    updateNDC(position2, size) {
      const draftPosition = {
        x: position2?.x ?? this.ndcPosition.x,
        y: position2?.y ?? this.ndcPosition.y
      };
      const draftSize = {
        width: size?.width ?? this.ndcSize.width,
        height: size?.height ?? this.ndcSize.height
      };
      const validUpdate = getValidUpdate(draftPosition, draftSize);
      if (!validUpdate) {
        console.warn("Invalid update rejected:", { position: draftPosition, size: draftSize });
        return;
      }
      this.ndcPosition = validUpdate.position;
      this.ndcSize = validUpdate.size;
      this.ndcX = this.ndcPosition.x;
      this.ndcY = this.ndcPosition.y;
      this.ndcWidth = this.ndcSize.width;
      this.ndcHeight = this.ndcSize.height;
      this.updateContentStyles();
      this.requestUpdate();
    }
    updateInteractionStyle() {
      this.updateCursorStyle();
      this.mainWrapperF.then((el) => {
        this.updateWrapperClasses(el);
      });
    }
    updateCursorStyle() {
      switch (this.mode) {
        case "fixed":
          this.style.cursor = "default";
          break;
        case "draggable":
          this.style.cursor = "pointer";
          break;
        case "resizable":
          this.style.cursor = "move";
          break;
      }
    }
    updateWrapperClasses(wrapper) {
      wrapper.classList.remove("interactive-fixed", "interactive-draggable", "interactive-resizable");
      wrapper.classList.add(`interactive-${this.mode}`);
      wrapper.className += " " + tw2`
      ${interactiveStyles.base}
      ${this.mode === "draggable" ? interactiveStyles.draggable : ""}
      ${this.mode === "resizable" ? interactiveStyles.resizable : ""}
      hover:${interactiveStyles.hover}
    `;
    }
    adjustSizeToConstraints() {
      const newSize = {
        width: Math.max(this.minWidth, Math.min(this.maxWidth, this.ndcSize.width)),
        height: Math.max(this.minHeight, Math.min(this.maxHeight, this.ndcSize.height))
      };
      if (newSize.width !== this.ndcSize.width || newSize.height !== this.ndcSize.height) {
        this.updateNDC(void 0, newSize);
      }
    }
    startInteraction(position2) {
      if (this.mode !== "fixed") {
        this.interactionState = {
          isInteracting: true,
          startPosition: position2,
          currentPosition: position2
        };
        this.initialSize = { ...this.ndcSize };
        this.initialPosition = { ...this.ndcPosition };
        if (this.mode === "resizable") {
          this.resizeQuadrant = determineResizeQuadrant(position2, this.ndcPosition, this.ndcSize);
        }
        this.addGlobalListeners();
      }
    }
    updateInteraction(position2) {
      if (this.interactionState.isInteracting) {
        this.interactionState.currentPosition = position2;
        if (this.mode === "draggable") {
          this.handleDrag();
        } else if (this.mode === "resizable") {
          this.handleResize(this.resizeQuadrant);
        }
      }
    }
    endInteraction() {
      if (this.interactionState.isInteracting) {
        this.interactionState.isInteracting = false;
        this.removeGlobalListeners();
      }
    }
    addGlobalListeners() {
      window.addEventListener("pointermove", this.handlePointerMove);
      window.addEventListener("pointerup", this.handlePointerUp);
      window.addEventListener("pointercancel", this.handlePointerUp);
    }
    removeGlobalListeners() {
      window.removeEventListener("pointermove", this.handlePointerMove);
      window.removeEventListener("pointerup", this.handlePointerUp);
      window.removeEventListener("pointercancel", this.handlePointerUp);
    }
    handleDrag() {
      const { dx, dy } = calculateDelta(this.interactionState.currentPosition, this.interactionState.startPosition);
      const newPosition = {
        x: Math.max(-1, Math.min(1 - this.ndcSize.width, this.initialPosition.x + dx)),
        y: Math.max(-1 + this.ndcSize.height, Math.min(1, this.initialPosition.y + dy))
      };
      this.updateNDC(newPosition);
    }
    handleResize(quadrant) {
      const { dx, dy } = calculateDelta(this.interactionState.currentPosition, this.interactionState.startPosition);
      const newSize = calculateNewSize(quadrant, dx, dy, this.initialSize, this.minWidth, this.maxWidth, this.minHeight, this.maxHeight);
      const newPosition = calculateNewPosition(quadrant, this.initialPosition, this.initialSize, newSize.width, newSize.height);
      this.updateNDC(newPosition, newSize);
    }
  };
  PanelElement.styles = [
    sheet.target,
    i5`
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        box-sizing: border-box;
        contain: layout size style;
      }
      .content-wrapper {
        position: absolute;
        overflow: visible;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        transform-origin: top left;
        will-change: transform, width, height;
        contain: layout style;
      }
      .slot-wrapper {
        flex-grow: 1;
        width: 100%;
        height: 100%;
      }
    `
  ];
  __decorateClass([
    n6({ type: String })
  ], PanelElement.prototype, "name", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "ndcX", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "ndcY", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "ndcWidth", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "ndcHeight", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "zIndex", 2);
  __decorateClass([
    n6({ type: String })
  ], PanelElement.prototype, "mode", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "minWidth", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "maxWidth", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "minHeight", 2);
  __decorateClass([
    n6({ type: Number })
  ], PanelElement.prototype, "maxHeight", 2);
  __decorateClass([
    r7("#main-wrapper")
  ], PanelElement.prototype, "mainWrapperF", 2);
  __decorateClass([
    e8("#main-wrapper", true)
  ], PanelElement.prototype, "mainWrapper", 2);
  __decorateClass([
    r7("#child-wrapper")
  ], PanelElement.prototype, "childWrapperF", 2);
  __decorateClass([
    e8("#child-wrapper", true)
  ], PanelElement.prototype, "childWrapper", 2);
  __decorateClass([
    r6()
  ], PanelElement.prototype, "ndcPosition", 2);
  __decorateClass([
    r6()
  ], PanelElement.prototype, "ndcSize", 2);
  PanelElement = __decorateClass([
    t6("panel-element")
  ], PanelElement);

  // frontend/ts/components/lit/aspectRatioElement/alignmentButtonOverlay.ts
  var AlignmentButtonOverlay = class extends h6 {
    constructor() {
      super(...arguments);
      this.align = "center" /* Center */;
      this.highlightedAlignment = "center" /* Center */;
    }
    updated(changedProperties) {
      if (changedProperties.has("align")) {
        this.highlightedAlignment = this.align;
      }
    }
    render() {
      return ke`
      <div class="${tw2(overlayContainerStyles)}"
           @pointerdown=${this.handlePointerDown}
           @pointermove=${this.handlePointerMove}
           @pointerup=${this.handlePointerUp}>
        ${this.renderAlignmentButtons()}
      </div>
    `;
    }
    renderAlignmentButtons() {
      const renderArrow = (direction) => Oe`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${tw2(iconStyles)}">
        <path d="${this.getArrowPath(direction)}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
      const renderCenter = Oe`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${tw2(iconStyles)}">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
    </svg>
    `;
      const buttonContentStyles = apply`
      ${flexCenter} ${fullSize} ${defaultTransition}
      relative z-10
    `;
      const renderButton = (alignment, icon) => ke`
      <button @pointerdown=${() => this.handleAlignment(alignment)}
              class="${tw2`
                ${buttonBaseStyles}
                ${buttonHoverStyles}
                ${this.highlightedAlignment === alignment ? buttonActiveStyles : ""}
                ${sweepLightAnimation}
                ${scaleOnActive}
              `}">
        <div class="${tw2(buttonContentStyles)} ${this.highlightedAlignment === alignment ? "active" : ""}">
          ${icon}
        </div>
      </button>
    `;
      return ke`
      ${renderButton("top-left" /* TopLeft */, renderArrow("top-left"))}
      ${renderButton("top" /* Top */, renderArrow("top"))}
      ${renderButton("top-right" /* TopRight */, renderArrow("top-right"))}
      ${renderButton("left" /* Left */, renderArrow("left"))}
      ${renderButton("center" /* Center */, renderCenter)}
      ${renderButton("right" /* Right */, renderArrow("right"))}
      ${renderButton("bottom-left" /* BottomLeft */, renderArrow("bottom-left"))}
      ${renderButton("bottom" /* Bottom */, renderArrow("bottom"))}
      ${renderButton("bottom-right" /* BottomRight */, renderArrow("bottom-right"))}
    `;
    }
    getArrowPath(direction) {
      switch (direction) {
        case "top-left":
          return "M17 17L7 7M7 7h10M7 7v10";
        case "top":
          return "M12 19V5M5 12l7-7 7 7";
        case "top-right":
          return "M7 17L17 7M17 7H7M17 7v10";
        case "left":
          return "M19 12H5M12 5l-7 7 7 7";
        case "right":
          return "M5 12h14M12 5l7 7-7 7";
        case "bottom-left":
          return "M17 7L7 17M7 17h10M7 17V7";
        case "bottom":
          return "M12 5v14M5 12l7 7 7-7";
        case "bottom-right":
          return "M7 7l10 10M17 17H7M17 17V7";
        default:
          return "";
      }
    }
    handlePointerDown(e9) {
      e9.preventDefault();
      e9.stopPropagation();
    }
    handlePointerMove(e9) {
      e9.preventDefault();
    }
    handlePointerUp(e9) {
      e9.preventDefault();
    }
    handleAlignment(newAlignment) {
      this.highlightedAlignment = newAlignment;
      this.dispatchEvent(new CustomEvent("alignment-changed", {
        detail: { alignment: newAlignment },
        bubbles: true,
        composed: true
      }));
    }
  };
  AlignmentButtonOverlay.styles = [
    sheet.target,
    i5`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        touch-action: none;
      }
    `
  ];
  __decorateClass([
    n6({ type: String })
  ], AlignmentButtonOverlay.prototype, "align", 2);
  __decorateClass([
    r6()
  ], AlignmentButtonOverlay.prototype, "highlightedAlignment", 2);
  AlignmentButtonOverlay = __decorateClass([
    t6("alignment-button-overlay")
  ], AlignmentButtonOverlay);

  // frontend/ts/components/lit/aspectRatioElement/aspectRatioElement.ts
  var AspectRatioInteractiveElement = class extends h6 {
    constructor() {
      super();
      this.zIndex = 0;
      this.aspectRatio = "auto";
      this.align = "center" /* Center */;
      this.editMode = false;
      this.resizeObserver = null;
      this.handleResize = this.handleResize.bind(this);
      this.handleAlignmentChanged = this.handleAlignmentChanged.bind(this);
    }
    connectedCallback() {
      super.connectedCallback();
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
    firstUpdated() {
      this.updatePositionAndSize();
    }
    updated(changedProperties) {
      if (changedProperties.has("aspectRatio") || changedProperties.has("align") || changedProperties.has("zIndex")) {
        this.updatePositionAndSize();
      }
      super.updated(changedProperties);
    }
    updatePositionAndSize() {
      const contentWrapper = this.shadowRoot?.querySelector(".content-wrapper");
      if (!contentWrapper) return;
      const { width: hostWidth, height: hostHeight } = this.getBoundingClientRect();
      const { width, height } = this.calculateSize(hostWidth, hostHeight);
      const { left, top } = this.calculatePosition(width, height, hostWidth, hostHeight);
      contentWrapper.style.width = `${width}px`;
      contentWrapper.style.height = `${height}px`;
      contentWrapper.style.transform = `translate(${left}px, ${top}px)`;
      this.style.zIndex = this.zIndex.toString();
    }
    calculateSize(hostWidth, hostHeight) {
      if (this.aspectRatio === "auto") {
        return { width: hostWidth, height: hostHeight };
      }
      const aspectRatio = typeof this.aspectRatio === "number" ? this.aspectRatio : parseFloat(this.aspectRatio);
      const hostAspectRatio = hostWidth / hostHeight;
      if (hostAspectRatio > aspectRatio) {
        const height = hostHeight;
        const width = height * aspectRatio;
        return { width, height };
      } else {
        const width = hostWidth;
        const height = width / aspectRatio;
        return { width, height };
      }
    }
    calculatePosition(width, height, hostWidth, hostHeight) {
      const positions2 = {
        ["top-left" /* TopLeft */]: { left: 0, top: 0 },
        ["top" /* Top */]: { left: (hostWidth - width) / 2, top: 0 },
        ["top-right" /* TopRight */]: { left: hostWidth - width, top: 0 },
        ["left" /* Left */]: { left: 0, top: (hostHeight - height) / 2 },
        ["center" /* Center */]: { left: (hostWidth - width) / 2, top: (hostHeight - height) / 2 },
        ["right" /* Right */]: { left: hostWidth - width, top: (hostHeight - height) / 2 },
        ["bottom-left" /* BottomLeft */]: { left: 0, top: hostHeight - height },
        ["bottom" /* Bottom */]: { left: (hostWidth - width) / 2, top: hostHeight - height },
        ["bottom-right" /* BottomRight */]: { left: hostWidth - width, top: hostHeight - height }
      };
      return positions2[this.align] || positions2["center" /* Center */];
    }
    render() {
      return ke`
      <div class="content-wrapper ${this.editMode ? "edit-mode" : ""}" @pointerdown=${this.handlePointerDown}>
        <div class="slot-wrapper">
          <slot></slot>
        </div>
        ${this.editMode ? this.renderAlignmentOverlay() : ""}
      </div>
    `;
    }
    renderAlignmentOverlay() {
      return ke`
      <div class="button-overlay">
        <alignment-button-overlay
          .align=${this.align}
          @alignment-changed=${this.handleAlignmentChanged}
        ></alignment-button-overlay>
      </div>
    `;
    }
    handleAlignmentChanged(e9) {
      this.setAlignment(e9.detail.alignment);
    }
    setAlignment(newAlignment) {
      this.align = newAlignment;
      this.updatePositionAndSize();
      this.dispatchEvent(new CustomEvent("alignment-changed", {
        detail: { alignment: newAlignment },
        bubbles: true,
        composed: true
      }));
    }
    handlePointerDown(e9) {
      if (!e9.target.closest("alignment-button-overlay")) {
        this.dispatchEvent(new PointerEvent("pointerdown", e9));
      }
    }
    handleResize() {
      this.updatePositionAndSize();
    }
  };
  AspectRatioInteractiveElement.styles = i5`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .content-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .slot-wrapper {
      width: 100%;
      height: 100%;
    }
    .button-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .button-overlay > * {
      pointer-events: auto;
    }
    .edit-mode {
      cursor: move;
    }
  `;
  __decorateClass([
    n6({ type: Number })
  ], AspectRatioInteractiveElement.prototype, "zIndex", 2);
  __decorateClass([
    n6({ type: String })
  ], AspectRatioInteractiveElement.prototype, "aspectRatio", 2);
  __decorateClass([
    n6({ type: String })
  ], AspectRatioInteractiveElement.prototype, "align", 2);
  __decorateClass([
    n6({ type: Boolean })
  ], AspectRatioInteractiveElement.prototype, "editMode", 2);
  AspectRatioInteractiveElement = __decorateClass([
    t6("aspect-ratio-interactive-element")
  ], AspectRatioInteractiveElement);

  // frontend/ts/components/lit/interactionObserver/pointerGestureRecognizer.ts
  var PointerGestureRecognizer = class {
    constructor(element, onGesture, moveThreshold = 100, tapDurationThreshold = 200, longPressDurationThreshold = 300, swipeVelocityThreshold = 0.5, swipeTimeThreshold = 300, zoomThreshold = 0.1) {
      this.moveThreshold = moveThreshold;
      this.tapDurationThreshold = tapDurationThreshold;
      this.longPressDurationThreshold = longPressDurationThreshold;
      this.swipeVelocityThreshold = swipeVelocityThreshold;
      this.swipeTimeThreshold = swipeTimeThreshold;
      this.zoomThreshold = zoomThreshold;
      this.gestureState = 0 /* Idle */;
      this.gestureStartTime = 0;
      this.longPressTimeout = null;
      this.activePointers = /* @__PURE__ */ new Map();
      this.initialDistance = null;
      this.panStartedByLongPress = false;
      this.handlePointerDown = (event) => {
        event.preventDefault();
        if (event.button !== 0) return;
        this.activePointers.set(event.pointerId, {
          id: event.pointerId,
          startX: event.pageX,
          startY: event.pageY,
          currentX: event.pageX,
          currentY: event.pageY
        });
        if (this.activePointers.size === 1) {
          this.gestureStartTime = Date.now();
          this.gestureState = 1 /* PotentialGesture */;
          this.startLongPressTimeout(event);
        } else if (this.activePointers.size === 2) {
          this.clearLongPressTimeout();
          this.gestureState = 4 /* Zooming */;
          this.initialDistance = this.calculateDistanceBetweenFirstTwoPointers();
        }
      };
      this.handlePointerMove = (event) => {
        event.preventDefault();
        const pointer = this.activePointers.get(event.pointerId);
        if (!pointer) return;
        pointer.currentX = event.pageX;
        pointer.currentY = event.pageY;
        if (!this.isPointerWithinElement(event)) {
          this.handlePointerExit(event);
          return;
        }
        if (this.gestureState === 1 /* PotentialGesture */ || this.gestureState === 2 /* Moving */) {
          this.handlePan(event);
        }
      };
      this.handlePointerUp = (event) => {
        event.preventDefault();
        this.finalizeGesture(event);
        this.activePointers.delete(event.pointerId);
      };
      this.handlePointerCancel = (event) => {
        event.preventDefault();
        this.finalizeGesture(event);
        this.activePointers.delete(event.pointerId);
      };
      this.handlePointerLeave = (event) => {
        event.preventDefault();
        this.handlePointerExit(event);
      };
      this.handlePointerOut = (event) => {
        event.preventDefault();
        if (!this.element.contains(event.relatedTarget) || event.target === this.element) {
          this.handlePointerExit(event);
        }
      };
      this.handleLongPress = (event) => {
        if (this.gestureState === 1 /* PotentialGesture */) {
          this.panStartedByLongPress = true;
          this.gestureState = 2 /* Moving */;
          this.onGesture({ type: "panStart", x: event.pageX, y: event.pageY });
        }
      };
      this.element = element;
      this.onGesture = onGesture;
      this.setupInteractions();
    }
    destroy() {
      this.removeEventListeners();
      this.clearLongPressTimeout();
    }
    setupInteractions() {
      this.element.addEventListener("pointerdown", this.handlePointerDown);
      this.element.addEventListener("pointermove", this.handlePointerMove);
      this.element.addEventListener("pointerup", this.handlePointerUp);
      this.element.addEventListener("pointercancel", this.handlePointerCancel);
      this.element.addEventListener("pointerleave", this.handlePointerLeave);
      this.element.addEventListener("pointerout", this.handlePointerOut);
    }
    removeEventListeners() {
      this.element.removeEventListener("pointerdown", this.handlePointerDown);
      this.element.removeEventListener("pointermove", this.handlePointerMove);
      this.element.removeEventListener("pointerup", this.handlePointerUp);
      this.element.removeEventListener("pointercancel", this.handlePointerCancel);
      this.element.removeEventListener("pointerleave", this.handlePointerLeave);
      this.element.removeEventListener("pointerout", this.handlePointerOut);
    }
    handlePointerExit(event) {
      if (this.activePointers.has(event.pointerId)) {
        const fakePointerUpEvent = new PointerEvent("pointerup", event);
        this.handlePointerUp(fakePointerUpEvent);
      }
    }
    isPointerWithinElement(event) {
      const rect = this.element.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    }
    handlePan(event) {
      const pointer = this.activePointers.get(event.pointerId);
      if (!pointer) return;
      const distance = Math.hypot(pointer.currentX - pointer.startX, pointer.currentY - pointer.startY);
      const timeSinceStart = Date.now() - this.gestureStartTime;
      if (this.panStartedByLongPress || distance > this.moveThreshold) {
        this.clearLongPressTimeout();
        if (this.gestureState === 1 /* PotentialGesture */) {
          this.gestureState = timeSinceStart < this.swipeTimeThreshold ? 3 /* Swiping */ : 2 /* Moving */;
          if (this.gestureState === 2 /* Moving */) {
            this.onGesture({ type: "panStart", x: pointer.startX, y: pointer.startY });
          }
        }
        if (this.gestureState === 2 /* Moving */) {
          const deltaX = pointer.currentX - pointer.startX;
          const deltaY = pointer.currentY - pointer.startY;
          this.onGesture({ type: "panMove", deltaX, deltaY });
        }
      }
    }
    finalizeGesture(event) {
      this.clearLongPressTimeout();
      this.panStartedByLongPress = false;
      if (this.gestureState === 4 /* Zooming */) {
        if (this.activePointers.size < 2 && this.initialDistance !== null) {
          const finalDistance = this.calculateDistanceBetweenFirstTwoPointers();
          const zoomChange = Math.abs(finalDistance - this.initialDistance) / this.initialDistance;
          if (zoomChange >= this.zoomThreshold) {
            if (finalDistance > this.initialDistance) {
              this.onGesture({ type: "zoomOut" });
            } else {
              this.onGesture({ type: "zoomIn" });
            }
          }
          this.resetGestureState();
        }
        return;
      }
      const pointer = this.activePointers.get(event.pointerId);
      if (!pointer) return;
      const duration = Date.now() - this.gestureStartTime;
      const distance = Math.hypot(pointer.currentX - pointer.startX, pointer.currentY - pointer.startY);
      const velocity = distance / duration;
      if (this.gestureState === 1 /* PotentialGesture */ && duration < this.tapDurationThreshold) {
        this.onGesture({ type: "tap", x: pointer.currentX, y: pointer.currentY });
      } else if (this.gestureState === 2 /* Moving */) {
        this.onGesture({ type: "panStop" });
      } else if (this.gestureState === 3 /* Swiping */ || velocity > this.swipeVelocityThreshold) {
        this.handleSwipe(pointer);
      }
      if (this.activePointers.size === 0) {
        this.resetGestureState();
      }
    }
    handleSwipe(pointer) {
      const deltaX = pointer.currentX - pointer.startX;
      const deltaY = pointer.currentY - pointer.startY;
      const angle = Math.atan2(deltaY, deltaX);
      let direction;
      if (angle > -Math.PI / 4 && angle <= Math.PI / 4) direction = "right";
      else if (angle > Math.PI / 4 && angle <= 3 * Math.PI / 4) direction = "down";
      else if (angle > 3 * Math.PI / 4 || angle <= -3 * Math.PI / 4) direction = "left";
      else direction = "up";
      this.onGesture({ type: "swipe", direction });
    }
    calculateDistanceBetweenFirstTwoPointers() {
      const pointers = Array.from(this.activePointers.values());
      if (pointers.length < 2) return 0;
      const [p1, p22] = pointers;
      return Math.hypot(p22.currentX - p1.currentX, p22.currentY - p1.currentY);
    }
    startLongPressTimeout(event) {
      this.clearLongPressTimeout();
      this.longPressTimeout = window.setTimeout(() => this.handleLongPress(event), this.longPressDurationThreshold);
    }
    clearLongPressTimeout() {
      if (this.longPressTimeout) {
        clearTimeout(this.longPressTimeout);
        this.longPressTimeout = null;
      }
    }
    resetGestureState() {
      this.gestureState = 0 /* Idle */;
      this.initialDistance = null;
      this.panStartedByLongPress = false;
    }
  };

  // frontend/ts/components/lit/interactionObserver/interactionObserverElement.ts
  var InteractionObserverElement = class extends h6 {
    constructor() {
      super();
      this.moveThreshold = 100;
      this.tapDurationThreshold = 200;
      this.longPressDurationThreshold = 300;
      this.swipeVelocityThreshold = 0.5;
      this.swipeTimeThreshold = 300;
      this.zoomThreshold = 1.1;
      this.doubleTapThreshold = 300;
      this.debugVisible = false;
      this.eventDebounceThreshold = 50;
      this.frameCount = 0;
      this.animationFrameId = null;
      this.lastPosition = { x: 0, y: 0, width: 0, height: 0 };
      this.gestureRecognizer = null;
      this.lastTapTime = 0;
      this.lastTapPosition = null;
      this.tapTimer = null;
      this.lastEventTime = 0;
      this.lastEventType = null;
      this.positionSignal = d(null);
      this.interactionSignal = d(null);
      this.boundHandleWheel = this.handleWheel.bind(this);
    }
    connectedCallback() {
      super.connectedCallback();
      this.startUpdateLoop();
      this.setupInteractions();
      this.addEventListener("wheel", this.boundHandleWheel, { passive: false });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.stopUpdateLoop();
      this.teardownInteractions();
      this.removeEventListener("wheel", this.boundHandleWheel);
      this.positionSignal.value = null;
      this.interactionSignal.value = null;
    }
    updated() {
      this.updateDebugVisibility();
    }
    updateDebugVisibility() {
      if (this.debugVisible) {
        this.style.border = "2px solid #ff00ff";
        this.style.backgroundColor = "rgba(255, 0, 255, 0.1)";
      } else {
        this.style.border = "none";
        this.style.backgroundColor = "transparent";
      }
    }
    startUpdateLoop() {
      const update = () => {
        this.frameCount++;
        if (this.frameCount % 10 === 0) {
          this.checkAndUpdatePosition();
        }
        this.animationFrameId = requestAnimationFrame(update);
      };
      this.animationFrameId = requestAnimationFrame(update);
    }
    stopUpdateLoop() {
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
    checkAndUpdatePosition() {
      const rect = this.getBoundingClientRect();
      const { width: screenWidth, height: screenHeight } = document.documentElement.getBoundingClientRect();
      const ndcX = rect.left / screenWidth * 2 - 1;
      const ndcY = -(rect.top / screenHeight) * 2 + 1;
      const ndcWidth = rect.width / screenWidth;
      const ndcHeight = rect.height / screenHeight;
      const newPosition = { x: ndcX, y: ndcY, width: ndcWidth, height: ndcHeight };
      if (this.hasPositionChanged(newPosition)) {
        this.lastPosition = newPosition;
        this.positionSignal.value = newPosition;
      }
    }
    hasPositionChanged(newPosition) {
      const epsilon = 1e-4;
      return Math.abs(newPosition.x - this.lastPosition.x) > epsilon || Math.abs(newPosition.y - this.lastPosition.y) > epsilon || Math.abs(newPosition.width - this.lastPosition.width) > epsilon || Math.abs(newPosition.height - this.lastPosition.height) > epsilon;
    }
    pageToNDC(pageX, pageY) {
      const rect = this.getBoundingClientRect();
      const ndcX = (pageX - rect.left) / rect.width * 2 - 1;
      const ndcY = -((pageY - rect.top) / rect.height) * 2 + 1;
      return { ndcX, ndcY };
    }
    pixelToNDCDelta(deltaX, deltaY) {
      const rect = this.getBoundingClientRect();
      const ndcDeltaX = deltaX / rect.width * 2;
      const ndcDeltaY = -(deltaY / rect.height) * 2;
      return { ndcDeltaX, ndcDeltaY };
    }
    setupInteractions() {
      this.gestureRecognizer = new PointerGestureRecognizer(
        this,
        this.handleGesture.bind(this),
        this.moveThreshold,
        this.tapDurationThreshold,
        this.longPressDurationThreshold,
        this.swipeVelocityThreshold,
        this.swipeTimeThreshold,
        this.zoomThreshold
      );
    }
    teardownInteractions() {
      if (this.gestureRecognizer) {
        this.gestureRecognizer.destroy();
        this.gestureRecognizer = null;
      }
    }
    handleGesture(event) {
      let ndcEvent;
      switch (event.type) {
        case "tap":
          const { ndcX, ndcY } = this.pageToNDC(event.x, event.y);
          ndcEvent = { type: "tap", x: event.x, y: event.y, ndcX, ndcY };
          this.handleTap(ndcEvent);
          break;
        case "panStart":
          const { ndcX: startNdcX, ndcY: startNdcY } = this.pageToNDC(event.x, event.y);
          ndcEvent = { type: "panStart", x: event.x, y: event.y, ndcX: startNdcX, ndcY: startNdcY };
          this.cancelPotentialDoubleTap();
          this.emitEvent(ndcEvent);
          break;
        case "panMove":
          const { ndcDeltaX, ndcDeltaY } = this.pixelToNDCDelta(event.deltaX, event.deltaY);
          ndcEvent = { type: "panMove", deltaX: event.deltaX, deltaY: event.deltaY, ndcDeltaX, ndcDeltaY };
          this.cancelPotentialDoubleTap();
          this.emitEvent(ndcEvent);
          break;
        case "swipe":
          ndcEvent = { type: "swipe", direction: event.direction };
          this.cancelPotentialDoubleTap();
          this.emitEvent(ndcEvent);
          break;
        case "panStop":
          ndcEvent = { type: "panStop" };
          this.cancelPotentialDoubleTap();
          this.emitEvent(ndcEvent);
          break;
        case "zoomIn":
        case "zoomOut":
          ndcEvent = { type: event.type };
          this.cancelPotentialDoubleTap();
          this.emitEvent(ndcEvent);
          break;
      }
    }
    handleWheel(e9) {
      e9.preventDefault();
      const { deltaY } = e9;
      const eventType = deltaY < 0 ? "zoomIn" : "zoomOut";
      const event = { type: eventType };
      this.emitEvent(event);
    }
    handleTap(event) {
      const currentTime = Date.now();
      if (this.lastTapTime && currentTime - this.lastTapTime < this.doubleTapThreshold && this.lastTapPosition && Math.abs(this.lastTapPosition.x - event.x) < 10 && Math.abs(this.lastTapPosition.y - event.y) < 10) {
        const doubleTapEvent = {
          type: "doubleTap",
          x: event.x,
          y: event.y,
          ndcX: event.ndcX,
          ndcY: event.ndcY
        };
        this.emitEvent(doubleTapEvent);
        this.lastTapTime = 0;
        this.lastTapPosition = null;
        if (this.tapTimer) {
          clearTimeout(this.tapTimer);
          this.tapTimer = null;
        }
      } else {
        this.lastTapTime = currentTime;
        this.lastTapPosition = { x: event.x, y: event.y };
        this.tapTimer = window.setTimeout(() => {
          this.emitEvent(event);
          this.lastTapTime = 0;
          this.lastTapPosition = null;
          this.tapTimer = null;
        }, this.doubleTapThreshold);
      }
    }
    cancelPotentialDoubleTap() {
      if (this.tapTimer) {
        clearTimeout(this.tapTimer);
        this.tapTimer = null;
      }
      if (this.lastTapTime && this.lastTapPosition) {
        const { ndcX, ndcY } = this.pageToNDC(this.lastTapPosition.x, this.lastTapPosition.y);
        this.emitEvent({
          type: "tap",
          x: this.lastTapPosition.x,
          y: this.lastTapPosition.y,
          ndcX,
          ndcY
        });
        this.lastTapTime = 0;
        this.lastTapPosition = null;
      }
    }
    emitEvent(event) {
      const currentTime = Date.now();
      if (event.type !== this.lastEventType || currentTime - this.lastEventTime > this.eventDebounceThreshold) {
        this.interactionSignal.value = event;
        this.lastEventTime = currentTime;
        this.lastEventType = event.type;
      }
    }
    render() {
      return ke`
      <div>
        <slot></slot>
      </div>
    `;
    }
    get position() {
      return this.positionSignal;
    }
    get interaction() {
      return this.interactionSignal;
    }
  };
  InteractionObserverElement.styles = i5`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      border: 2px solid #ff00ff;
      background-color: rgba(255, 0, 255, 0.1);
      box-sizing: border-box;
    }
  `;
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "moveThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "tapDurationThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "longPressDurationThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "swipeVelocityThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "swipeTimeThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "zoomThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "doubleTapThreshold", 2);
  __decorateClass([
    n6({ type: Boolean })
  ], InteractionObserverElement.prototype, "debugVisible", 2);
  __decorateClass([
    n6({ type: Number })
  ], InteractionObserverElement.prototype, "eventDebounceThreshold", 2);
  InteractionObserverElement = __decorateClass([
    t6("interaction-observer-element")
  ], InteractionObserverElement);

  // frontend/ts/components/lit/videoProxyElement/videoProxyElement.ts
  var VideoProxyElement = class extends h6 {
    constructor() {
      super();
      this.name = "Video Proxy";
      this.ndcX = 0;
      this.ndcY = 0;
      this.ndcWidth = 0.5;
      this.ndcHeight = 0.5;
      this.mode = "fixed";
      this.zIndex = 10;
      this.aspectRatio = "auto";
      this.align = "center" /* Center */;
      this.debug = false;
      this.moveThreshold = 100;
      this.tapDurationThreshold = 200;
      this.longPressDurationThreshold = 300;
      this.swipeVelocityThreshold = 0.5;
      this.swipeTimeThreshold = 300;
      this.doubleTapThreshold = 300;
      this.zoomThreshold = 1.1;
      this.eventDebounceThreshold = 50;
      this.lifecycleSignal = d(null);
      this.signalUnsubscribers = [];
      this.panelElement = new PanelElement();
      this.aspectRatioElement = new AspectRatioInteractiveElement();
      this.interactionObserver = new InteractionObserverElement();
      this.slotElement = document.createElement("slot");
      this.interactionObserver.appendChild(this.slotElement);
      this.aspectRatioElement.appendChild(this.interactionObserver);
      this.panelElement.appendChild(this.aspectRatioElement);
      this.updateElementProperties();
    }
    updateElementProperties() {
      this.panelElement.name = this.name;
      this.panelElement.ndcX = this.ndcX;
      this.panelElement.ndcY = this.ndcY;
      this.panelElement.ndcWidth = this.ndcWidth;
      this.panelElement.ndcHeight = this.ndcHeight;
      this.panelElement.zIndex = this.zIndex;
      switch (this.mode) {
        case "fixed":
          this.panelElement.mode = "fixed";
          break;
        case "draggable":
          this.panelElement.mode = "draggable";
          break;
        case "resizable":
          this.panelElement.mode = "resizable";
          break;
        default:
          this.panelElement.mode = "fixed";
          break;
      }
      this.aspectRatioElement.aspectRatio = this.aspectRatio;
      this.aspectRatioElement.align = this.align;
      this.aspectRatioElement.editMode = this.mode === "alignable";
      this.interactionObserver.debugVisible = this.debug;
      this.interactionObserver.moveThreshold = this.moveThreshold;
      this.interactionObserver.eventDebounceThreshold = this.eventDebounceThreshold;
      this.interactionObserver.tapDurationThreshold = this.tapDurationThreshold;
      this.interactionObserver.longPressDurationThreshold = this.longPressDurationThreshold;
      this.interactionObserver.swipeVelocityThreshold = this.swipeVelocityThreshold;
      this.interactionObserver.swipeTimeThreshold = this.swipeTimeThreshold;
      this.interactionObserver.doubleTapThreshold = this.doubleTapThreshold;
      this.interactionObserver.zoomThreshold = this.zoomThreshold;
      if (this.debug) {
        this.subscribeToSignals();
      }
    }
    updated(changedProperties) {
      if (changedProperties.has("debug")) {
        if (this.debug) {
          this.subscribeToSignals();
        } else {
          this.unsubscribeFromSignals();
        }
      }
      if (changedProperties.size > 0) {
        this.updateElementProperties();
      }
    }
    render() {
      return this.panelElement;
    }
    handleAlignmentChanged(e9) {
      this.align = e9.detail.alignment;
      this.dispatchEvent(new CustomEvent("alignment-changed", {
        detail: { alignment: this.align },
        bubbles: true,
        composed: true
      }));
    }
    get position() {
      return this.interactionObserver.position;
    }
    get interaction() {
      return this.interactionObserver.interaction;
    }
    get lifecycle() {
      return this.lifecycleSignal;
    }
    connectedCallback() {
      super.connectedCallback();
      this.aspectRatioElement.addEventListener("alignment-changed", this.handleAlignmentChanged);
      this.lifecycleSignal.value = "mounted";
      this.logDebugInfo("Lifecycle", this.lifecycleSignal.value);
      if (this.debug) {
        this.subscribeToSignals();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.aspectRatioElement.removeEventListener("alignment-changed", this.handleAlignmentChanged);
      this.lifecycleSignal.value = "unmounted";
      this.logDebugInfo("Lifecycle", this.lifecycleSignal.value);
      this.unsubscribeFromSignals();
    }
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.lifecycleSignal.value = "firstUpdated";
      this.logDebugInfo("Lifecycle", this.lifecycleSignal.value);
    }
    subscribeToSignals() {
      this.unsubscribeFromSignals();
      this.signalUnsubscribers = [
        this.position.subscribe(this.logPositionUpdate.bind(this)),
        this.interaction.subscribe(this.logInteractionUpdate.bind(this)),
        this.lifecycle.subscribe(this.logLifecycleUpdate.bind(this))
      ];
    }
    unsubscribeFromSignals() {
      this.signalUnsubscribers.forEach((unsubscribe) => unsubscribe());
      this.signalUnsubscribers = [];
    }
    logPositionUpdate(position2) {
      if (!position2) {
        this.logDebugInfo("Position", "null");
        return;
      }
      this.logDebugInfo("Position", `(${position2.x.toFixed(2)}, ${position2.y.toFixed(2)})`);
    }
    logInteractionUpdate(interaction) {
      this.logDebugInfo("Interaction", interaction ? interaction.type : "None");
    }
    logLifecycleUpdate(lifecycle) {
      this.logDebugInfo("Lifecycle", lifecycle);
    }
    logDebugInfo(type, value) {
      if (this.debug) {
        console.log(`[VideoProxyElement] ${type}:`, value);
      }
    }
  };
  VideoProxyElement.shadowRootOptions = { mode: "closed" };
  VideoProxyElement.styles = i5`
    :host {
      display: block;
    }
  `;
  __decorateClass([
    n6({ type: String })
  ], VideoProxyElement.prototype, "name", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "ndcX", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "ndcY", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "ndcWidth", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "ndcHeight", 2);
  __decorateClass([
    n6({ type: String })
  ], VideoProxyElement.prototype, "mode", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "zIndex", 2);
  __decorateClass([
    n6({ type: String })
  ], VideoProxyElement.prototype, "aspectRatio", 2);
  __decorateClass([
    n6({ type: String })
  ], VideoProxyElement.prototype, "align", 2);
  __decorateClass([
    n6({ type: Boolean })
  ], VideoProxyElement.prototype, "debug", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "moveThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "tapDurationThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "longPressDurationThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "swipeVelocityThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "swipeTimeThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "doubleTapThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "zoomThreshold", 2);
  __decorateClass([
    n6({ type: Number })
  ], VideoProxyElement.prototype, "eventDebounceThreshold", 2);
  VideoProxyElement = __decorateClass([
    t6("video-proxy-element")
  ], VideoProxyElement);

  // frontend/ts/app.ts
  var canvasManager;
  document.addEventListener("DOMContentLoaded", function() {
    canvasManager = new CanvasManager("main-canvas");
    if (isControllerTrue(window.location.href)) {
      let deviceStateDispatch = new DeviceStateDispatch();
      let day_cam_s = deviceStateDispatch.cameraDay;
      let heat_cam_s = deviceStateDispatch.cameraHeat;
      new InputDeviceManager({
        nextLayout: () => {
          canvasManager.nextLayout();
        },
        day_cam_signal: day_cam_s,
        heat_cam_signal: heat_cam_s
      });
    }
    canvasManager.initWorker().then(() => {
      let wscm = new WebSocketConnectionManager();
      wscm.startWebSocketWorker("wss://sych.app/ws/ws_video_day", "videoDayFeedback", "videoDay");
      wscm.startWebSocketWorker("wss://sych.app/ws/ws_video_heat", "videoHeatFeedback", "videoHeat");
      wscm.startWebSocketWorker("wss://sych.app/ws/ws_cmd", "cmd", "deviceState");
      let videoProxyMovable = new VideoProxyElement();
      videoProxyMovable.name = "Movable Video";
      videoProxyMovable.ndcX = 0;
      videoProxyMovable.ndcY = 0.5;
      videoProxyMovable.ndcWidth = 0.4;
      videoProxyMovable.ndcHeight = 0.4;
      videoProxyMovable.mode = "resizable";
      videoProxyMovable.debug = true;
      videoProxyMovable.zIndex = 10;
      videoProxyMovable.aspectRatio = 16 / 9;
      videoProxyMovable.align = "center" /* Center */;
      document.body.appendChild(videoProxyMovable);
      videoProxyMovable.position.subscribe((pos) => {
        console.log(pos);
      });
      videoProxyMovable.interaction.subscribe((interaction) => {
        console.log(interaction);
      });
      document.addEventListener("click", () => {
        canvasManager.nextLayout();
      });
      setInterval(() => {
        if (document.visibilityState === "visible") {
          sendCmdPing();
        }
      }, 300);
      function handleVisibilityChange() {
        if (document.visibilityState === "hidden") {
          sendCmdFrozen();
        }
      }
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleVisibilityChange);
      window.addEventListener("focus", handleVisibilityChange);
      window.addEventListener("beforeunload", () => {
        sendCmdFrozen();
      });
      requestAnimationFrame(handleVisibilityChange);
    }).catch((error) => {
      console.error("Error initializing canvas:", error);
    });
  });
  function isControllerTrue(urlString) {
    try {
      const url = new URL(urlString);
      const params = new URLSearchParams(url.search);
      return params.get("controller") === "true";
    } catch (error) {
      console.error("Invalid URL:", error);
      return false;
    }
  }
})();
/*! Bundled license information:

@lit-labs/preact-signals/lib/signal-watcher.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/preact-signals/lib/watch.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/preact-signals/lib/html-tag.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
