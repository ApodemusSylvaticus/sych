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
        var p = string.length;
        if (!p)
          return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
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
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
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
        } catch (e) {
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
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
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
        var parts = null, chunk = [], i = 0, t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128)
            chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
          else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
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
      LongBits.fromNumber = function fromNumber(value) {
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
      LongBits.prototype.toNumber = function toNumber(unsigned) {
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
      util.isSet = function isSet14(obj, prop) {
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
        } catch (e) {
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
      function merge(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
        return dst;
      }
      util.merge = merge;
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
            merge(this, properties);
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
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
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
      function noop() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create();
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
        for (var i = 0; i < val.length; ++i)
          buf[pos + i] = val[i];
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
        this.head = this.tail = new Op(noop, 0, 0);
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
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
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
        Writer.create = create();
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
          else for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
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
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create();
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
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
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
        Reader.create = create();
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
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure();
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

  // frontend/ts/proto/jon/index.cmd.Gps.ts
  var index_cmd_Gps_exports = {};
  __export(index_cmd_Gps_exports, {
    GetMeteo: () => GetMeteo,
    Root: () => Root,
    SetManualPosition: () => SetManualPosition,
    SetRefreshRate: () => SetRefreshRate,
    SetUseManualPosition: () => SetUseManualPosition,
    Start: () => Start,
    Stop: () => Stop
  });

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
    encode(_, writer = import_minimal.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStart();
      return message;
    }
  };
  function createBaseStop() {
    return {};
  }
  var Stop = {
    encode(_, writer = import_minimal.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStop();
      return message;
    }
  };
  function createBaseGetMeteo() {
    return {};
  }
  var GetMeteo = {
    encode(_, writer = import_minimal.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
    encode(_, writer = import_minimal2.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowDefaultScreen.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseShowDefaultScreen();
      return message;
    }
  };
  function createBaseShowLRFMeasureScreen() {
    return {};
  }
  var ShowLRFMeasureScreen = {
    encode(_, writer = import_minimal2.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowLRFMeasureScreen.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseShowLRFMeasureScreen();
      return message;
    }
  };
  function createBaseShowLRFResultScreen() {
    return {};
  }
  var ShowLRFResultScreen = {
    encode(_, writer = import_minimal2.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowLRFResultScreen.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseShowLRFResultScreen();
      return message;
    }
  };
  function createBaseShowLRFResultSimplifiedScreen() {
    return {};
  }
  var ShowLRFResultSimplifiedScreen = {
    encode(_, writer = import_minimal2.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ShowLRFResultSimplifiedScreen.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseShowLRFResultSimplifiedScreen();
      return message;
    }
  };
  function isSet2(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.GeoTest.ts
  var index_cmd_GeoTest_exports = {};
  __export(index_cmd_GeoTest_exports, {
    Root: () => Root3
  });

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
        start: isSet4(object.start) ? Start2.fromJSON(object.start) : void 0,
        stop: isSet4(object.stop) ? Stop2.fromJSON(object.stop) : void 0,
        axis: isSet4(object.axis) ? Axis.fromJSON(object.axis) : void 0,
        setPlatformAzimuth: isSet4(object.setPlatformAzimuth) ? SetPlatformAzimuth.fromJSON(object.setPlatformAzimuth) : void 0,
        setPlatformElevation: isSet4(object.setPlatformElevation) ? SetPlatformElevation.fromJSON(object.setPlatformElevation) : void 0,
        setPlatformBank: isSet4(object.setPlatformBank) ? SetPlatformBank.fromJSON(object.setPlatformBank) : void 0,
        halt: isSet4(object.halt) ? Halt.fromJSON(object.halt) : void 0,
        setCalculateBasePositionFromCompass: isSet4(object.setCalculateBasePositionFromCompass) ? SetCalculateBasePositionFromCompass.fromJSON(object.setCalculateBasePositionFromCompass) : void 0,
        rotateToGps: isSet4(object.rotateToGps) ? RotateToGPS.fromJSON(object.rotateToGps) : void 0,
        setOriginGps: isSet4(object.setOriginGps) ? SetOriginGPS.fromJSON(object.setOriginGps) : void 0,
        getMeteo: isSet4(object.getMeteo) ? GetMeteo2.fromJSON(object.getMeteo) : void 0,
        setMode: isSet4(object.setMode) ? SetMode.fromJSON(object.setMode) : void 0
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
        azimuth: isSet4(object.azimuth) ? Azimuth.fromJSON(object.azimuth) : void 0,
        elevation: isSet4(object.elevation) ? Elevation.fromJSON(object.elevation) : void 0
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
      return { mode: isSet4(object.mode) ? jonGuiDataRotaryModeFromJSON(object.mode) : 0 };
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
        value: isSet4(object.value) ? globalThis.Number(object.value) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
        targetValue: isSet4(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet4(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
        speed: isSet4(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
        speed: isSet4(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
      return { value: isSet4(object.value) ? globalThis.Number(object.value) : 0 };
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
        targetValue: isSet4(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet4(object.speed) ? globalThis.Number(object.speed) : 0
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
        value: isSet4(object.value) ? globalThis.Number(object.value) : 0,
        speed: isSet4(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
        value: isSet4(object.value) ? globalThis.Number(object.value) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
        value: isSet4(object.value) ? globalThis.Number(object.value) : 0,
        speed: isSet4(object.speed) ? globalThis.Number(object.speed) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
        value: isSet4(object.value) ? globalThis.Number(object.value) : 0,
        direction: isSet4(object.direction) ? jonGuiDataRotaryDirectionFromJSON(object.direction) : 0
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
      return { value: isSet4(object.value) ? globalThis.Number(object.value) : 0 };
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
      return { value: isSet4(object.value) ? globalThis.Number(object.value) : 0 };
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
      return { value: isSet4(object.value) ? globalThis.Number(object.value) : 0 };
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
    encode(_, writer = import_minimal5.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo2.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
        setValue: isSet4(object.setValue) ? SetAzimuthValue.fromJSON(object.setValue) : void 0,
        rotateTo: isSet4(object.rotateTo) ? RotateAzimuthTo.fromJSON(object.rotateTo) : void 0,
        rotate: isSet4(object.rotate) ? RotateAzimuth.fromJSON(object.rotate) : void 0,
        relative: isSet4(object.relative) ? RotateAzimuthRelative.fromJSON(object.relative) : void 0,
        relativeSet: isSet4(object.relativeSet) ? RotateAzimuthRelativeSet.fromJSON(object.relativeSet) : void 0,
        halt: isSet4(object.halt) ? HaltAzimuth.fromJSON(object.halt) : void 0
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
    encode(_, writer = import_minimal5.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStart2();
      return message;
    }
  };
  function createBaseStop2() {
    return {};
  }
  var Stop2 = {
    encode(_, writer = import_minimal5.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStop2();
      return message;
    }
  };
  function createBaseHalt() {
    return {};
  }
  var Halt = {
    encode(_, writer = import_minimal5.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Halt.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseHalt();
      return message;
    }
  };
  function createBaseHaltAzimuth() {
    return {};
  }
  var HaltAzimuth = {
    encode(_, writer = import_minimal5.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltAzimuth.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseHaltAzimuth();
      return message;
    }
  };
  function createBaseHaltElevation() {
    return {};
  }
  var HaltElevation = {
    encode(_, writer = import_minimal5.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltElevation.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
        setValue: isSet4(object.setValue) ? SetElevationValue.fromJSON(object.setValue) : void 0,
        rotateTo: isSet4(object.rotateTo) ? RotateElevationTo.fromJSON(object.rotateTo) : void 0,
        rotate: isSet4(object.rotate) ? RotateElevation.fromJSON(object.rotate) : void 0,
        relative: isSet4(object.relative) ? RotateElevationRelative.fromJSON(object.relative) : void 0,
        relativeSet: isSet4(object.relativeSet) ? RotateElevationRelativeSet.fromJSON(object.relativeSet) : void 0,
        halt: isSet4(object.halt) ? HaltElevation.fromJSON(object.halt) : void 0
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
      return { flag: isSet4(object.flag) ? globalThis.Boolean(object.flag) : false };
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
        latitude: isSet4(object.latitude) ? globalThis.Number(object.latitude) : 0,
        longitude: isSet4(object.longitude) ? globalThis.Number(object.longitude) : 0,
        altitude: isSet4(object.altitude) ? globalThis.Number(object.altitude) : 0
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
        latitude: isSet4(object.latitude) ? globalThis.Number(object.latitude) : 0,
        longitude: isSet4(object.longitude) ? globalThis.Number(object.longitude) : 0,
        altitude: isSet4(object.altitude) ? globalThis.Number(object.altitude) : 0
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
  function isSet4(value) {
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
        focus: isSet5(object.focus) ? Focus.fromJSON(object.focus) : void 0,
        zoom: isSet5(object.zoom) ? Zoom.fromJSON(object.zoom) : void 0,
        setAgc: isSet5(object.setAgc) ? SetAGC.fromJSON(object.setAgc) : void 0,
        setFilter: isSet5(object.setFilter) ? SetFilters.fromJSON(object.setFilter) : void 0,
        setAutoFocus: isSet5(object.setAutoFocus) ? SetAutoFocus.fromJSON(object.setAutoFocus) : void 0,
        setRecording: isSet5(object.setRecording) ? SetRecording.fromJSON(object.setRecording) : void 0,
        start: isSet5(object.start) ? Start3.fromJSON(object.start) : void 0,
        stop: isSet5(object.stop) ? Stop3.fromJSON(object.stop) : void 0,
        photo: isSet5(object.photo) ? Photo.fromJSON(object.photo) : void 0,
        syncZoom: isSet5(object.syncZoom) ? SyncZoomToHeatCamera.fromJSON(object.syncZoom) : void 0,
        getPos: isSet5(object.getPos) ? GetPos.fromJSON(object.getPos) : void 0,
        zoomIn: isSet5(object.zoomIn) ? ZoomIn.fromJSON(object.zoomIn) : void 0,
        zoomOut: isSet5(object.zoomOut) ? ZoomOut.fromJSON(object.zoomOut) : void 0,
        zoomStop: isSet5(object.zoomStop) ? ZoomStop.fromJSON(object.zoomStop) : void 0,
        focusIn: isSet5(object.focusIn) ? FocusIn.fromJSON(object.focusIn) : void 0,
        focusOut: isSet5(object.focusOut) ? FocusOut.fromJSON(object.focusOut) : void 0,
        focusStop: isSet5(object.focusStop) ? FocusStop.fromJSON(object.focusStop) : void 0,
        calibrate: isSet5(object.calibrate) ? Calibrate.fromJSON(object.calibrate) : void 0,
        haltAll: isSet5(object.haltAll) ? HaltAll.fromJSON(object.haltAll) : void 0,
        getMeteo: isSet5(object.getMeteo) ? GetMeteo3.fromJSON(object.getMeteo) : void 0,
        setDdeLevel: isSet5(object.setDdeLevel) ? SetDDELevel.fromJSON(object.setDdeLevel) : void 0,
        enableDde: isSet5(object.enableDde) ? EnableDDE.fromJSON(object.enableDde) : void 0,
        disableDde: isSet5(object.disableDde) ? DisableDDE.fromJSON(object.disableDde) : void 0
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
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltAll.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseHaltAll();
      return message;
    }
  };
  function createBaseEnableDDE() {
    return {};
  }
  var EnableDDE = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return EnableDDE.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseEnableDDE();
      return message;
    }
  };
  function createBaseDisableDDE() {
    return {};
  }
  var DisableDDE = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return DisableDDE.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
      return { value: isSet5(object.value) ? globalThis.Number(object.value) : 0 };
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
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ZoomIn.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseZoomIn();
      return message;
    }
  };
  function createBaseZoomOut() {
    return {};
  }
  var ZoomOut = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ZoomOut.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseZoomOut();
      return message;
    }
  };
  function createBaseZoomStop() {
    return {};
  }
  var ZoomStop = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ZoomStop.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseZoomStop();
      return message;
    }
  };
  function createBaseFocusIn() {
    return {};
  }
  var FocusIn = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return FocusIn.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseFocusIn();
      return message;
    }
  };
  function createBaseFocusOut() {
    return {};
  }
  var FocusOut = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return FocusOut.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseFocusOut();
      return message;
    }
  };
  function createBaseFocusStop() {
    return {};
  }
  var FocusStop = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return FocusStop.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseFocusStop();
      return message;
    }
  };
  function createBaseCalibrate() {
    return {};
  }
  var Calibrate = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Calibrate.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseCalibrate();
      return message;
    }
  };
  function createBaseGetPos() {
    return {};
  }
  var GetPos = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetPos.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
        setValue: isSet5(object.setValue) ? SetValue.fromJSON(object.setValue) : void 0,
        move: isSet5(object.move) ? Move.fromJSON(object.move) : void 0,
        halt: isSet5(object.halt) ? Halt2.fromJSON(object.halt) : void 0
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
        setValue: isSet5(object.setValue) ? SetValue.fromJSON(object.setValue) : void 0,
        setZoomTableValue: isSet5(object.setZoomTableValue) ? SetZoomTableValue.fromJSON(object.setZoomTableValue) : void 0,
        move: isSet5(object.move) ? Move.fromJSON(object.move) : void 0,
        halt: isSet5(object.halt) ? Halt2.fromJSON(object.halt) : void 0,
        nextZoomTablePos: isSet5(object.nextZoomTablePos) ? NextZoomTablePos.fromJSON(object.nextZoomTablePos) : void 0,
        prevZoomTablePos: isSet5(object.prevZoomTablePos) ? PrevZoomTablePos.fromJSON(object.prevZoomTablePos) : void 0
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
      return { value: isSet5(object.value) ? globalThis.Number(object.value) : 0 };
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
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return NextZoomTablePos.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseNextZoomTablePos();
      return message;
    }
  };
  function createBasePrevZoomTablePos() {
    return {};
  }
  var PrevZoomTablePos = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PrevZoomTablePos.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
      return { value: isSet5(object.value) ? jonGuiDataVideoChannelHeatAGCModesFromJSON(object.value) : 0 };
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
      return { value: isSet5(object.value) ? jonGuiDataVideoChannelHeatFiltersFromJSON(object.value) : 0 };
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
      return { value: isSet5(object.value) ? globalThis.Boolean(object.value) : false };
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
      return { value: isSet5(object.value) ? globalThis.Boolean(object.value) : false };
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
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start3.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStart3();
      return message;
    }
  };
  function createBaseStop3() {
    return {};
  }
  var Stop3 = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop3.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStop3();
      return message;
    }
  };
  function createBaseHalt2() {
    return {};
  }
  var Halt2 = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Halt2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseHalt2();
      return message;
    }
  };
  function createBasePhoto() {
    return {};
  }
  var Photo = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Photo.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePhoto();
      return message;
    }
  };
  function createBaseGetMeteo3() {
    return {};
  }
  var GetMeteo3 = {
    encode(_, writer = import_minimal6.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo3.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
      return { value: isSet5(object.value) ? globalThis.Boolean(object.value) : false };
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
  function isSet5(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.Compass.ts
  var index_cmd_Compass_exports = {};
  __export(index_cmd_Compass_exports, {
    CalibrateCencel: () => CalibrateCencel,
    CalibrateNext: () => CalibrateNext,
    CalibrateStartLong: () => CalibrateStartLong,
    CalibrateStartShort: () => CalibrateStartShort,
    GetMeteo: () => GetMeteo4,
    Next: () => Next,
    Root: () => Root6,
    SetMagneticDeclination: () => SetMagneticDeclination,
    SetOffsetAngleAzimuth: () => SetOffsetAngleAzimuth,
    SetOffsetAngleElevation: () => SetOffsetAngleElevation,
    SetRefreshRate: () => SetRefreshRate2,
    SetUseRotaryPosition: () => SetUseRotaryPosition,
    Start: () => Start4,
    Stop: () => Stop4
  });

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
        start: isSet6(object.start) ? Start4.fromJSON(object.start) : void 0,
        stop: isSet6(object.stop) ? Stop4.fromJSON(object.stop) : void 0,
        refreshRate: isSet6(object.refreshRate) ? SetRefreshRate2.fromJSON(object.refreshRate) : void 0,
        setMagneticDeclination: isSet6(object.setMagneticDeclination) ? SetMagneticDeclination.fromJSON(object.setMagneticDeclination) : void 0,
        setOffsetAngleAzimuth: isSet6(object.setOffsetAngleAzimuth) ? SetOffsetAngleAzimuth.fromJSON(object.setOffsetAngleAzimuth) : void 0,
        setOffsetAngleElevation: isSet6(object.setOffsetAngleElevation) ? SetOffsetAngleElevation.fromJSON(object.setOffsetAngleElevation) : void 0,
        setUseRotaryPosition: isSet6(object.setUseRotaryPosition) ? SetUseRotaryPosition.fromJSON(object.setUseRotaryPosition) : void 0,
        startCalibrateLong: isSet6(object.startCalibrateLong) ? CalibrateStartLong.fromJSON(object.startCalibrateLong) : void 0,
        startCalibrateShort: isSet6(object.startCalibrateShort) ? CalibrateStartShort.fromJSON(object.startCalibrateShort) : void 0,
        calibrateNext: isSet6(object.calibrateNext) ? CalibrateNext.fromJSON(object.calibrateNext) : void 0,
        calibrateCencel: isSet6(object.calibrateCencel) ? CalibrateCencel.fromJSON(object.calibrateCencel) : void 0,
        getMeteo: isSet6(object.getMeteo) ? GetMeteo4.fromJSON(object.getMeteo) : void 0
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
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start4.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStart4();
      return message;
    }
  };
  function createBaseStop4() {
    return {};
  }
  var Stop4 = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop4.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStop4();
      return message;
    }
  };
  function createBaseNext() {
    return {};
  }
  var Next = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
      return writer;
    },
    decode(input, length) {
      const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
      let end = length === void 0 ? reader.len : reader.pos + length;
      const message = createBaseNext();
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Next.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseNext();
      return message;
    }
  };
  function createBaseGetMeteo4() {
    return {};
  }
  var GetMeteo4 = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo4.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseGetMeteo4();
      return message;
    }
  };
  function createBaseCalibrateStartLong() {
    return {};
  }
  var CalibrateStartLong = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateStartLong.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseCalibrateStartLong();
      return message;
    }
  };
  function createBaseCalibrateStartShort() {
    return {};
  }
  var CalibrateStartShort = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateStartShort.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseCalibrateStartShort();
      return message;
    }
  };
  function createBaseCalibrateNext() {
    return {};
  }
  var CalibrateNext = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateNext.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseCalibrateNext();
      return message;
    }
  };
  function createBaseCalibrateCencel() {
    return {};
  }
  var CalibrateCencel = {
    encode(_, writer = import_minimal7.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CalibrateCencel.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
      return { flag: isSet6(object.flag) ? globalThis.Boolean(object.flag) : false };
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
  function isSet6(value) {
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
        measure: isSet7(object.measure) ? Measure.fromJSON(object.measure) : void 0,
        scanOn: isSet7(object.scanOn) ? ScanOn.fromJSON(object.scanOn) : void 0,
        scanOff: isSet7(object.scanOff) ? ScanOff.fromJSON(object.scanOff) : void 0,
        start: isSet7(object.start) ? Start5.fromJSON(object.start) : void 0,
        stop: isSet7(object.stop) ? Stop5.fromJSON(object.stop) : void 0,
        targetDesignatorOff: isSet7(object.targetDesignatorOff) ? TargetDesignatorOff.fromJSON(object.targetDesignatorOff) : void 0,
        targetDesignatorOnModeA: isSet7(object.targetDesignatorOnModeA) ? TargetDesignatorOnModeA.fromJSON(object.targetDesignatorOnModeA) : void 0,
        targetDesignatorOnModeB: isSet7(object.targetDesignatorOnModeB) ? TargetDesignatorOnModeB.fromJSON(object.targetDesignatorOnModeB) : void 0,
        enableFogMode: isSet7(object.enableFogMode) ? EnableFogMode.fromJSON(object.enableFogMode) : void 0,
        disableFogMode: isSet7(object.disableFogMode) ? DisableFogMode.fromJSON(object.disableFogMode) : void 0,
        setScanMode: isSet7(object.setScanMode) ? setScanMode.fromJSON(object.setScanMode) : void 0,
        newSession: isSet7(object.newSession) ? NewSession.fromJSON(object.newSession) : void 0,
        getMeteo: isSet7(object.getMeteo) ? GetMeteo5.fromJSON(object.getMeteo) : void 0
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
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start5.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStart5();
      return message;
    }
  };
  function createBaseStop5() {
    return {};
  }
  var Stop5 = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop5.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStop5();
      return message;
    }
  };
  function createBaseMeasure() {
    return {};
  }
  var Measure = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Measure.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseMeasure();
      return message;
    }
  };
  function createBaseScanOn() {
    return {};
  }
  var ScanOn = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ScanOn.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseScanOn();
      return message;
    }
  };
  function createBaseScanOff() {
    return {};
  }
  var ScanOff = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ScanOff.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseScanOff();
      return message;
    }
  };
  function createBaseTargetDesignatorOff() {
    return {};
  }
  var TargetDesignatorOff = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return TargetDesignatorOff.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseTargetDesignatorOff();
      return message;
    }
  };
  function createBaseTargetDesignatorOnModeA() {
    return {};
  }
  var TargetDesignatorOnModeA = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return TargetDesignatorOnModeA.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseTargetDesignatorOnModeA();
      return message;
    }
  };
  function createBaseTargetDesignatorOnModeB() {
    return {};
  }
  var TargetDesignatorOnModeB = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return TargetDesignatorOnModeB.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseTargetDesignatorOnModeB();
      return message;
    }
  };
  function createBaseEnableFogMode() {
    return {};
  }
  var EnableFogMode = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return EnableFogMode.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseEnableFogMode();
      return message;
    }
  };
  function createBaseDisableFogMode() {
    return {};
  }
  var DisableFogMode = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return DisableFogMode.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseDisableFogMode();
      return message;
    }
  };
  function createBaseGetMeteo5() {
    return {};
  }
  var GetMeteo5 = {
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo5.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
      return { mode: isSet7(object.mode) ? jonGuiDataLrfScanModesFromJSON(object.mode) : 0 };
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
    encode(_, writer = import_minimal8.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return NewSession.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseNewSession();
      return message;
    }
  };
  function isSet7(value) {
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
      return { value: isSet8(object.value) ? globalThis.Number(object.value) : 0 };
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
        targetValue: isSet8(object.targetValue) ? globalThis.Number(object.targetValue) : 0,
        speed: isSet8(object.speed) ? globalThis.Number(object.speed) : 0
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
        focus: isSet8(object.focus) ? Focus2.fromJSON(object.focus) : void 0,
        zoom: isSet8(object.zoom) ? Zoom2.fromJSON(object.zoom) : void 0,
        setExposure: isSet8(object.setExposure) ? SetExposure.fromJSON(object.setExposure) : void 0,
        setGain: isSet8(object.setGain) ? SetGain.fromJSON(object.setGain) : void 0,
        setIris: isSet8(object.setIris) ? SetIris.fromJSON(object.setIris) : void 0,
        setAutoFocus: isSet8(object.setAutoFocus) ? SetAutoFocus2.fromJSON(object.setAutoFocus) : void 0,
        setRecording: isSet8(object.setRecording) ? SetRecording2.fromJSON(object.setRecording) : void 0,
        setInfraRedFilter: isSet8(object.setInfraRedFilter) ? SetInfraRedFilter.fromJSON(object.setInfraRedFilter) : void 0,
        start: isSet8(object.start) ? Start6.fromJSON(object.start) : void 0,
        stop: isSet8(object.stop) ? Stop6.fromJSON(object.stop) : void 0,
        photo: isSet8(object.photo) ? Photo2.fromJSON(object.photo) : void 0,
        setAutoIris: isSet8(object.setAutoIris) ? SetAutoIris.fromJSON(object.setAutoIris) : void 0,
        syncZoom: isSet8(object.syncZoom) ? SyncZoomToDayCamera.fromJSON(object.syncZoom) : void 0,
        getPos: isSet8(object.getPos) ? GetPos2.fromJSON(object.getPos) : void 0,
        haltAll: isSet8(object.haltAll) ? HaltAll2.fromJSON(object.haltAll) : void 0,
        getMeteo: isSet8(object.getMeteo) ? GetMeteo6.fromJSON(object.getMeteo) : void 0
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
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetPos2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseGetPos2();
      return message;
    }
  };
  function createBaseHaltAll2() {
    return {};
  }
  var HaltAll2 = {
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return HaltAll2.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
        setValue: isSet8(object.setValue) ? SetValue2.fromJSON(object.setValue) : void 0,
        move: isSet8(object.move) ? Move2.fromJSON(object.move) : void 0,
        halt: isSet8(object.halt) ? Halt3.fromJSON(object.halt) : void 0
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
        setValue: isSet8(object.setValue) ? SetValue2.fromJSON(object.setValue) : void 0,
        move: isSet8(object.move) ? Move2.fromJSON(object.move) : void 0,
        halt: isSet8(object.halt) ? Halt3.fromJSON(object.halt) : void 0,
        setZoomTableValue: isSet8(object.setZoomTableValue) ? SetZoomTableValue2.fromJSON(object.setZoomTableValue) : void 0,
        nextZoomTablePos: isSet8(object.nextZoomTablePos) ? NextZoomTablePos2.fromJSON(object.nextZoomTablePos) : void 0,
        prevZoomTablePos: isSet8(object.prevZoomTablePos) ? PrevZoomTablePos2.fromJSON(object.prevZoomTablePos) : void 0
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
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return NextZoomTablePos2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseNextZoomTablePos2();
      return message;
    }
  };
  function createBasePrevZoomTablePos2() {
    return {};
  }
  var PrevZoomTablePos2 = {
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PrevZoomTablePos2.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
      return { value: isSet8(object.value) ? globalThis.Number(object.value) : 0 };
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
      return { value: isSet8(object.value) ? globalThis.Number(object.value) : 0 };
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
      return { value: isSet8(object.value) ? globalThis.Number(object.value) : 0 };
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
      return { value: isSet8(object.value) ? globalThis.Boolean(object.value) : false };
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
      return { value: isSet8(object.value) ? globalThis.Boolean(object.value) : false };
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
      return { value: isSet8(object.value) ? globalThis.Boolean(object.value) : false };
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
      return { value: isSet8(object.value) ? globalThis.Boolean(object.value) : false };
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
      return { value: isSet8(object.value) ? globalThis.Boolean(object.value) : false };
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
      return { value: isSet8(object.value) ? globalThis.Number(object.value) : 0 };
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
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Stop6.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStop6();
      return message;
    }
  };
  function createBaseStart6() {
    return {};
  }
  var Start6 = {
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Start6.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStart6();
      return message;
    }
  };
  function createBasePhoto2() {
    return {};
  }
  var Photo2 = {
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Photo2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePhoto2();
      return message;
    }
  };
  function createBaseHalt3() {
    return {};
  }
  var Halt3 = {
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Halt3.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseHalt3();
      return message;
    }
  };
  function createBaseGetMeteo6() {
    return {};
  }
  var GetMeteo6 = {
    encode(_, writer = import_minimal9.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo6.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseGetMeteo6();
      return message;
    }
  };
  function isSet8(value) {
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
        day: isSet9(object.day) ? Offsets.fromJSON(object.day) : void 0,
        heat: isSet9(object.heat) ? Offsets.fromJSON(object.heat) : void 0
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
        set: isSet9(object.set) ? SetOffsets.fromJSON(object.set) : void 0,
        save: isSet9(object.save) ? SaveOffsets.fromJSON(object.save) : void 0,
        reset: isSet9(object.reset) ? ResetOffsets.fromJSON(object.reset) : void 0,
        shift: isSet9(object.shift) ? ShiftOffsetsBy.fromJSON(object.shift) : void 0
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
        x: isSet9(object.x) ? globalThis.Number(object.x) : 0,
        y: isSet9(object.y) ? globalThis.Number(object.y) : 0
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
        x: isSet9(object.x) ? globalThis.Number(object.x) : 0,
        y: isSet9(object.y) ? globalThis.Number(object.y) : 0
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
    encode(_, writer = import_minimal10.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return ResetOffsets.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseResetOffsets();
      return message;
    }
  };
  function createBaseSaveOffsets() {
    return {};
  }
  var SaveOffsets = {
    encode(_, writer = import_minimal10.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return SaveOffsets.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseSaveOffsets();
      return message;
    }
  };
  function isSet9(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.System.ts
  var index_cmd_System_exports = {};
  __export(index_cmd_System_exports, {
    PowerOff: () => PowerOff,
    Reboot: () => Reboot,
    Root: () => Root10,
    StartALl: () => StartALl,
    StopALl: () => StopALl
  });

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
        startAll: isSet10(object.startAll) ? StartALl.fromJSON(object.startAll) : void 0,
        stopAll: isSet10(object.stopAll) ? StopALl.fromJSON(object.stopAll) : void 0,
        reboot: isSet10(object.reboot) ? Reboot.fromJSON(object.reboot) : void 0,
        powerOff: isSet10(object.powerOff) ? PowerOff.fromJSON(object.powerOff) : void 0
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
    encode(_, writer = import_minimal11.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return StartALl.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStartALl();
      return message;
    }
  };
  function createBaseStopALl() {
    return {};
  }
  var StopALl = {
    encode(_, writer = import_minimal11.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return StopALl.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseStopALl();
      return message;
    }
  };
  function createBaseReboot() {
    return {};
  }
  var Reboot = {
    encode(_, writer = import_minimal11.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Reboot.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseReboot();
      return message;
    }
  };
  function createBasePowerOff() {
    return {};
  }
  var PowerOff = {
    encode(_, writer = import_minimal11.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerOff.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePowerOff();
      return message;
    }
  };
  function isSet10(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.Environment.ts
  var index_cmd_Environment_exports = {};
  __export(index_cmd_Environment_exports, {
    Root: () => Root11,
    SetGroundCondition: () => SetGroundCondition,
    SetLightSourceCondition: () => SetLightSourceCondition,
    SetLightingCondition: () => SetLightingCondition,
    SetNetworkStatus: () => SetNetworkStatus,
    SetOpticalVisibility: () => SetOpticalVisibility,
    SetPrecipitationType: () => SetPrecipitationType,
    SetThermalCondition: () => SetThermalCondition,
    SetWeatherCondition: () => SetWeatherCondition
  });

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
        setWeatherCondition: isSet11(object.setWeatherCondition) ? SetWeatherCondition.fromJSON(object.setWeatherCondition) : void 0,
        setLightingCondition: isSet11(object.setLightingCondition) ? SetLightingCondition.fromJSON(object.setLightingCondition) : void 0,
        setPrecipitationType: isSet11(object.setPrecipitationType) ? SetPrecipitationType.fromJSON(object.setPrecipitationType) : void 0,
        setGroundCondition: isSet11(object.setGroundCondition) ? SetGroundCondition.fromJSON(object.setGroundCondition) : void 0,
        setOpticalVisibility: isSet11(object.setOpticalVisibility) ? SetOpticalVisibility.fromJSON(object.setOpticalVisibility) : void 0,
        setThermalCondition: isSet11(object.setThermalCondition) ? SetThermalCondition.fromJSON(object.setThermalCondition) : void 0,
        setNetworkStatus: isSet11(object.setNetworkStatus) ? SetNetworkStatus.fromJSON(object.setNetworkStatus) : void 0,
        setLightSourceCondition: isSet11(object.setLightSourceCondition) ? SetLightSourceCondition.fromJSON(object.setLightSourceCondition) : void 0
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentWeatherConditionFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentLightingConditionFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentPrecipitationTypeFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentGroundConditionFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentOpticalVisibilityFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentThermalConditionFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentNetworkStatusFromJSON(object.value) : 0 };
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
      return { value: isSet11(object.value) ? jonGuiDataEnvironmentLightSourceFromJSON(object.value) : 0 };
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
  function isSet11(value) {
    return value !== null && value !== void 0;
  }

  // frontend/ts/proto/jon/index.cmd.Power.ts
  var index_cmd_Power_exports = {};
  __export(index_cmd_Power_exports, {
    CanOff: () => CanOff,
    CanOn: () => CanOn,
    CanReset: () => CanReset,
    GetMeteo: () => GetMeteo7,
    PowerOff: () => PowerOff2,
    PowerOn: () => PowerOn,
    PowerReset: () => PowerReset,
    Root: () => Root12,
    SetDeviceState: () => SetDeviceState
  });

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
        setDeviceState: isSet12(object.setDeviceState) ? SetDeviceState.fromJSON(object.setDeviceState) : void 0,
        getMeteo: isSet12(object.getMeteo) ? GetMeteo7.fromJSON(object.getMeteo) : void 0
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
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return GetMeteo7.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseGetMeteo7();
      return message;
    }
  };
  function createBasePowerOn() {
    return {};
  }
  var PowerOn = {
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerOn.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePowerOn();
      return message;
    }
  };
  function createBasePowerOff2() {
    return {};
  }
  var PowerOff2 = {
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerOff2.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePowerOff2();
      return message;
    }
  };
  function createBasePowerReset() {
    return {};
  }
  var PowerReset = {
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return PowerReset.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePowerReset();
      return message;
    }
  };
  function createBaseCanOn() {
    return {};
  }
  var CanOn = {
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CanOn.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseCanOn();
      return message;
    }
  };
  function createBaseCanOff() {
    return {};
  }
  var CanOff = {
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CanOff.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseCanOff();
      return message;
    }
  };
  function createBaseCanReset() {
    return {};
  }
  var CanReset = {
    encode(_, writer = import_minimal13.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return CanReset.fromPartial(base ?? {});
    },
    fromPartial(_) {
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
        device: isSet12(object.device) ? jonGuiDataPowerCanDeviceFromJSON(object.device) : 0,
        powerOn: isSet12(object.powerOn) ? PowerOn.fromJSON(object.powerOn) : void 0,
        powerOff: isSet12(object.powerOff) ? PowerOff2.fromJSON(object.powerOff) : void 0,
        powerReset: isSet12(object.powerReset) ? PowerReset.fromJSON(object.powerReset) : void 0,
        canOn: isSet12(object.canOn) ? CanOn.fromJSON(object.canOn) : void 0,
        canOff: isSet12(object.canOff) ? CanOff.fromJSON(object.canOff) : void 0,
        canReset: isSet12(object.canReset) ? CanReset.fromJSON(object.canReset) : void 0
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
  function isSet12(value) {
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
        protocolVersion: isSet13(object.protocolVersion) ? globalThis.Number(object.protocolVersion) : 0,
        sessionId: isSet13(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
        important: isSet13(object.important) ? globalThis.Boolean(object.important) : false,
        dayCamera: isSet13(object.dayCamera) ? Root8.fromJSON(object.dayCamera) : void 0,
        heatCamera: isSet13(object.heatCamera) ? Root5.fromJSON(object.heatCamera) : void 0,
        gps: isSet13(object.gps) ? Root.fromJSON(object.gps) : void 0,
        compass: isSet13(object.compass) ? Root6.fromJSON(object.compass) : void 0,
        lrf: isSet13(object.lrf) ? Root7.fromJSON(object.lrf) : void 0,
        lrfCalib: isSet13(object.lrfCalib) ? Root9.fromJSON(object.lrfCalib) : void 0,
        rotary: isSet13(object.rotary) ? Root4.fromJSON(object.rotary) : void 0,
        osd: isSet13(object.osd) ? Root2.fromJSON(object.osd) : void 0,
        ping: isSet13(object.ping) ? Ping.fromJSON(object.ping) : void 0,
        noop: isSet13(object.noop) ? Noop.fromJSON(object.noop) : void 0,
        frozen: isSet13(object.frozen) ? Frozen.fromJSON(object.frozen) : void 0,
        system: isSet13(object.system) ? Root10.fromJSON(object.system) : void 0,
        environment: isSet13(object.environment) ? Root11.fromJSON(object.environment) : void 0,
        geoTest: isSet13(object.geoTest) ? Root3.fromJSON(object.geoTest) : void 0,
        power: isSet13(object.power) ? Root12.fromJSON(object.power) : void 0
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
    encode(_, writer = import_minimal14.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Ping.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBasePing();
      return message;
    }
  };
  function createBaseNoop() {
    return {};
  }
  var Noop = {
    encode(_, writer = import_minimal14.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Noop.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseNoop();
      return message;
    }
  };
  function createBaseFrozen() {
    return {};
  }
  var Frozen = {
    encode(_, writer = import_minimal14.default.Writer.create()) {
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
    fromJSON(_) {
      return {};
    },
    toJSON(_) {
      const obj = {};
      return obj;
    },
    create(base) {
      return Frozen.fromPartial(base ?? {});
    },
    fromPartial(_) {
      const message = createBaseFrozen();
      return message;
    }
  };
  function isSet13(value) {
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

  // frontend/ts/cmd/cmdSender/cmdGps.ts
  function gpsStart() {
    console.log("Sending gps start");
    let rootMsg = createRootMessage();
    rootMsg.gps = index_cmd_Gps_exports.Root.create({ start: index_cmd_Gps_exports.Start.create() });
    sendCmdMessage(rootMsg);
  }
  function gpsStop() {
    console.log("Sending gps stop");
    let rootMsg = createRootMessage();
    rootMsg.gps = index_cmd_Gps_exports.Root.create({ stop: index_cmd_Gps_exports.Stop.create() });
    sendCmdMessage(rootMsg);
  }
  function setGpsRefreshRate(refreshRate) {
    console.log("Sending gps refresh rate");
    let rootMsg = createRootMessage();
    let rate = index_cmd_Gps_exports.SetRefreshRate.create({ value: refreshRate });
    rootMsg.gps = index_cmd_Gps_exports.Root.create({ setRefreshRate: rate });
    sendCmdMessage(rootMsg);
  }
  function setManualPosition(latitude, longitude, altitude) {
    console.log("Sending manual position");
    let rootMsg = createRootMessage();
    let position = index_cmd_Gps_exports.SetManualPosition.create({
      latitude,
      longitude,
      altitude
    });
    rootMsg.gps = index_cmd_Gps_exports.Root.create({ setManualPosition: position });
    sendCmdMessage(rootMsg);
  }
  function setUseManualPosition(useManual) {
    console.log("Sending use manual position");
    let rootMsg = createRootMessage();
    let position = index_cmd_Gps_exports.SetUseManualPosition.create({ flag: useManual });
    rootMsg.gps = index_cmd_Gps_exports.Root.create({ setUseManualPosition: position });
    sendCmdMessage(rootMsg);
  }
  function getMeteo() {
    console.log("Requesting GPS meteo data");
    let rootMsg = createRootMessage();
    rootMsg.gps = index_cmd_Gps_exports.Root.create({ getMeteo: index_cmd_Gps_exports.GetMeteo.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/CardElements.ts
  function createButton(id, text, className) {
    const button = document.createElement("button");
    button.id = id;
    button.className = `py-2 px-4 ${className} rounded-lg`;
    button.textContent = text;
    return button;
  }
  function createInput(id, placeholder, type = "number") {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.className = "py-2 px-4 border rounded-lg";
    return input;
  }
  function createNormalizedSlider(id, labelText, className = "slider-thumb") {
    const card = document.createElement("div");
    card.className = "bg-gray-200 p-4 rounded-lg shadow-sm mb-4";
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;
    label.className = "block text-sm text-black font-semibold mb-2";
    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = id;
    slider.className = `w-full h-2 bg-cyan-200 rounded-lg cursor-pointer ${className}`;
    slider.min = "0.0";
    slider.max = "1.0";
    slider.step = "0.0001";
    const input = document.createElement("input");
    input.type = "number";
    input.id = `${id}-number`;
    input.className = "form-input mt-2 w-full";
    input.min = "0.0";
    input.max = "1.0";
    input.step = "0.0001";
    input.value = "0.0";
    slider.addEventListener("input", () => {
      input.value = slider.value;
    });
    input.addEventListener("input", () => {
      slider.value = input.value;
    });
    card.appendChild(label);
    card.appendChild(slider);
    card.appendChild(input);
    return card;
  }
  function createRowSeparator(className = "h-4 border-b") {
    const separator = document.createElement("div");
    separator.className = className;
    return separator;
  }
  function createSelect(id, options) {
    const select = document.createElement("select");
    select.id = id;
    select.className = "py-2 px-4 border rounded-lg";
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText.toLowerCase().replace(/\s+/g, "");
      option.textContent = optionText;
      select.appendChild(option);
    });
    return select;
  }
  function createDropdown(id, elements) {
    const dropdown = document.createElement("select");
    dropdown.id = id;
    dropdown.className = "py-2 px-4 border rounded-lg my-2";
    elements.forEach((element, index) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.getAttribute("data-title");
      dropdown.appendChild(option);
      if (index > 0) element.style.display = "none";
    });
    dropdown.addEventListener("change", () => {
      elements.forEach((element) => {
        element.style.display = element.id === dropdown.value ? "" : "none";
      });
      queueMicrotask(() => {
        const cardSelector = document.getElementById("card-selector");
        const event = new Event("change");
        cardSelector?.dispatchEvent(event);
      });
    });
    return dropdown;
  }
  function createSubCard(id, title, contentElements) {
    const subCard = document.createElement("div");
    subCard.id = id;
    subCard.setAttribute("data-title", title);
    subCard.className = "flex flex-col space-y-2 p-4 rounded-lg border shadow-sm";
    contentElements.forEach((element) => subCard.appendChild(element));
    return subCard;
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdGPSCard.ts
  function attachGpsEventListeners() {
    document.getElementById("gpsStart")?.addEventListener("click", gpsStart);
    document.getElementById("gpsStop")?.addEventListener("click", gpsStop);
    document.getElementById("gpsGetMeteo")?.addEventListener("click", getMeteo);
    document.getElementById("setRefreshRateButtonGPS")?.addEventListener("click", () => setGpsRefreshRate(parseInt(document.getElementById("refreshRateValueGPS").value)));
    document.getElementById("setUseManualPositionOn")?.addEventListener("click", () => {
      setUseManualPosition(true);
    });
    document.getElementById("setUseManualPositionOff")?.addEventListener("click", () => {
      setUseManualPosition(false);
    });
    document.getElementById("setManualPositionButton")?.addEventListener("click", () => {
      const latitudeInput = document.getElementById("latitudeValue").value;
      const longitudeInput = document.getElementById("longitudeValue").value;
      const altitudeInput = document.getElementById("altitudeValue").value;
      const latitude = parseInt(latitudeInput);
      const longitude = parseInt(longitudeInput);
      const altitude = parseInt(altitudeInput);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        console.error("Invalid latitude. Please enter a value between -90 and 90.");
        return;
      }
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        console.error("Invalid longitude. Please enter a value between -180 and 180.");
        return;
      }
      if (isNaN(altitude)) {
        console.error("Invalid altitude. Please enter a valid integer.");
        return;
      }
      setManualPosition(latitude, longitude, altitude);
    });
  }
  function createGpsCard() {
    const gpsCard = document.createElement("div");
    gpsCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = [
      createSubCard("gpsControls", "Controls", [
        createButton("gpsStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("gpsStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
        createButton("gpsGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("gpsSettings", "Settings", [
        createInput("refreshRateValueGPS", "Refresh Rate (ms)", "setRefreshRateButton"),
        createButton("setRefreshRateButtonGPS", "Set Refresh Rate", "bg-green-500 text-white hover:bg-green-700"),
        createButton("setUseManualPositionOn", "Use Manual Position: on", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("setUseManualPositionOff", "Use Manual position: off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("gpsSetManPos", "Set manual position", [
        createInput("latitudeValue", "Latitude", "setManualPositionButton"),
        createInput("longitudeValue", "Longitude", "setManualPositionButton"),
        createInput("altitudeValue", "Altitude (meters)", "setManualPositionButton"),
        createButton("setManualPositionButton", "Set Manual Position", "bg-yellow-500 text-white hover:bg-yellow-700")
      ])
    ];
    const dropdown = createDropdown("gps-dd", subCards);
    gpsCard.appendChild(dropdown);
    subCards.forEach((subCard) => gpsCard.appendChild(subCard));
    queueMicrotask(attachGpsEventListeners);
    return { name: "GPS", element: gpsCard };
  }

  // frontend/ts/cmd/cmdSender/cmdCompass.ts
  function compassStart() {
    console.log("Sending compass start");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ start: index_cmd_Compass_exports.Start.create() });
    sendCmdMessage(rootMsg);
  }
  function getMeteo2() {
    console.log("Requesting compass meteo data");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ getMeteo: index_cmd_Compass_exports.GetMeteo.create() });
    sendCmdMessage(rootMsg);
  }
  function compassStop() {
    console.log("Sending compass stop");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ stop: index_cmd_Compass_exports.Stop.create() });
    sendCmdMessage(rootMsg);
  }
  function setRefreshRate(value) {
    console.log(`Setting refresh rate to ${value} ms`);
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ refreshRate: { value } });
    sendCmdMessage(rootMsg);
  }
  function setMagneticDeclination(value) {
    console.log(`Setting magnetic declination to ${value} mils`);
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ setMagneticDeclination: { value } });
    sendCmdMessage(rootMsg);
  }
  function setOffsetAngleAzimuth(value) {
    console.log(`Setting offset angle azimuth to ${value} mils`);
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ setOffsetAngleAzimuth: { value } });
    sendCmdMessage(rootMsg);
  }
  function setOffsetAngleElevation(value) {
    console.log(`Setting offset angle elevation to ${value} mils`);
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ setOffsetAngleElevation: { value } });
    sendCmdMessage(rootMsg);
  }
  function calibrateLongStart() {
    console.log("Sending calibrate long start");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ startCalibrateLong: index_cmd_Compass_exports.CalibrateStartLong.create() });
    sendCmdMessage(rootMsg);
  }
  function calibrateShortStart() {
    console.log("Sending calibrate short start");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ startCalibrateShort: index_cmd_Compass_exports.CalibrateStartShort.create() });
    sendCmdMessage(rootMsg);
  }
  function calibrateNext() {
    console.log("Sending calibrate next");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ calibrateNext: index_cmd_Compass_exports.CalibrateNext.create() });
    sendCmdMessage(rootMsg);
  }
  function calibrateCancel() {
    console.log("Sending calibrate cancel");
    let rootMsg = createRootMessage();
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ calibrateCencel: index_cmd_Compass_exports.CalibrateCencel.create() });
    sendCmdMessage(rootMsg);
  }
  function setUseRotaryPosition(useRotary) {
    console.log("Sending use rotary position");
    let rootMsg = createRootMessage();
    let position = index_cmd_Compass_exports.SetUseRotaryPosition.create({ flag: useRotary });
    rootMsg.compass = index_cmd_Compass_exports.Root.create({ setUseRotaryPosition: position });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdCompassCard.ts
  function attachEventListeners() {
    document.getElementById("compassStart")?.addEventListener("click", compassStart);
    document.getElementById("compassStop")?.addEventListener("click", compassStop);
    document.getElementById("compassGetMeteo")?.addEventListener("click", getMeteo2);
    document.getElementById("setRefreshRateButtonCompass")?.addEventListener("click", () => setRefreshRate(parseInt(document.getElementById("refreshRateValueCompass").value)));
    document.getElementById("setMagneticDeclinationButton")?.addEventListener("click", () => setMagneticDeclination(parseInt(document.getElementById("magneticDeclinationValue").value)));
    document.getElementById("setOffsetAzimuthButton")?.addEventListener("click", () => setOffsetAngleAzimuth(parseInt(document.getElementById("offsetAzimuthValue").value)));
    document.getElementById("setOffsetElevationButton")?.addEventListener("click", () => setOffsetAngleElevation(parseInt(document.getElementById("offsetElevationValue").value)));
    document.getElementById("calibrateStartShort")?.addEventListener("click", calibrateShortStart);
    document.getElementById("calibrateStartLong")?.addEventListener("click", calibrateLongStart);
    document.getElementById("calibrateNext")?.addEventListener("click", calibrateNext);
    document.getElementById("calibrateCancel")?.addEventListener("click", calibrateCancel);
    document.getElementById("useRotaryPositionOn")?.addEventListener("click", () => {
      setUseRotaryPosition(true);
    });
    document.getElementById("useRotaryPositionOff")?.addEventListener("click", () => {
      setUseRotaryPosition(false);
    });
  }
  function createCompassCard() {
    const compassCard = document.createElement("div");
    compassCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = [
      createSubCard("compassControls", "Controls", [
        createButton("compassStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("compassStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
        createButton("compassGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("compassSettings", "Settings", [
        createInput("refreshRateValueCompass", "Refresh Rate (ms)", "setRefreshRateButtonCompass"),
        createButton("setRefreshRateButtonCompass", "Set Refresh Rate", "bg-green-500 text-white hover:bg-green-700"),
        createInput("magneticDeclinationValue", "Magnetic Declination (mils)", "setMagneticDeclinationButton"),
        createButton("setMagneticDeclinationButton", "Set Declination", "bg-yellow-500 text-white hover:bg-yellow-700"),
        createInput("offsetAzimuthValue", "Offset Azimuth (mils)", "setOffsetAzimuthButton"),
        createButton("setOffsetAzimuthButton", "Set Azimuth", "bg-purple-500 text-white hover:bg-purple-700"),
        createInput("offsetElevationValue", "Offset Elevation (mils)", "setOffsetElevationButton"),
        createButton("setOffsetElevationButton", "Set Elevation", "bg-orange-500 text-white hover:bg-orange-700")
      ]),
      createSubCard("compassCalibration", "Calibration", [
        createButton("calibrateStartLong", "Start Long Calibration", "bg-teal-500 text-white hover:bg-teal-700"),
        createButton("calibrateStartShort", "Start Short Calibration", "bg-pink-500 text-white hover:bg-pink-700"),
        createButton("calibrateNext", "Next calibration stage", "bg-red-500 text-white hover:bg-red-700"),
        createButton("calibrateCancel", "Cancel Calibration", "bg-blue-500 text-white hover:bg-blue-700")
      ]),
      createSubCard("RotaryIntegration", "Rotary Integration", [
        createButton("useRotaryPositionOn", "Use Rotary position: on", "bg-green-500 text-white hover:bg-green-700"),
        createButton("useRotaryPositionOff", "Don't Rotary Position: off", "bg-red-500 text-white hover:bg-red-700")
      ])
    ];
    const dropdown = createDropdown("compass-dd", subCards);
    compassCard.appendChild(dropdown);
    subCards.forEach((subCard) => compassCard.appendChild(subCard));
    queueMicrotask(attachEventListeners);
    return { name: "Compass", element: compassCard };
  }

  // frontend/ts/cmd/cmdSender/cmdLRF.ts
  function lrfStart() {
    console.log("Sending LRF start");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ start: index_cmd_Lrf_exports.Start.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfStop() {
    console.log("Sending LRF stop");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ stop: index_cmd_Lrf_exports.Stop.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfNewSession() {
    console.log("Sending LRF new session");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ newSession: index_cmd_Lrf_exports.NewSession.create() });
    sendCmdMessage(rootMsg);
  }
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
  function lrfSetScanMode(mode) {
    console.log("Sending LRF set scan mode");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ setScanMode: index_cmd_Lrf_exports.setScanMode.create({ mode }) });
    sendCmdMessage(rootMsg);
  }
  function lrfEnableFogMode() {
    console.log("Sending LRF enable fog mode");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ enableFogMode: index_cmd_Lrf_exports.EnableFogMode.create() });
    sendCmdMessage(rootMsg);
  }
  function lrfDisableFogMode() {
    console.log("Sending LRF disable fog mode");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ disableFogMode: index_cmd_Lrf_exports.DisableFogMode.create() });
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
  function lrfTargetDesignatorOnModeB() {
    console.log("Sending LRF target designator on mode B");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ targetDesignatorOnModeB: index_cmd_Lrf_exports.TargetDesignatorOnModeB.create() });
    sendCmdMessage(rootMsg);
  }
  function getMeteo3() {
    console.log("Requesting LRF meteo data");
    let rootMsg = createRootMessage();
    rootMsg.lrf = index_cmd_Lrf_exports.Root.create({ getMeteo: index_cmd_Lrf_exports.GetMeteo.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdLRFCard.ts
  function createLrfCard() {
    const lrfCard = document.createElement("div");
    lrfCard.className = "p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 mt-4";
    lrfCard.innerHTML = `
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Communication</div>
      <button id="lrfStart" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Start</button>
      <button id="lrfStop" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Stop</button>
      <button id="LrfGetMeteo" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">Get Meteo</button>
      <button id="lrfNewSession" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-blue-700">New Session</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Scan</div>
      <button id="lrfScanOn" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Scan On</button>
      <button id="lrfScanOff" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Scan Off</button>
      <select id="lrfScanMode" class="py-2 px-4 bg-gray-200 text-black rounded-lg">
        <option value="0">Select Scan Mode</option>
        <option value="1">1 Hz Continuous</option>
        <option value="2">4 Hz Continuous</option>
        <option value="3">10 Hz Continuous</option>
        <option value="4">20 Hz Continuous</option>
        <option value="5">100 Hz Continuous</option>
        <option value="6">200 Hz Continuous</option>
      </select>
      <button id="lrfSetScanMode" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Set Scan Mode</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Measure</div>
      <button id="lrfMeasure" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">Measure</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <button id="lrfEnableFogMode" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Enable Fog Mode</button>
      <button id="lrfDisableFogMode" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Disable Fog Mode</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <button id="lrfTargetDesignatorOff" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Designator Off</button>
      <button id="lrfTargetDesignatorOnModeA" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">Designator On Mode A</button>
      <button id="lrfTargetDesignatorOnModeB" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Designator On Mode B</button>
    </div>
  `;
    queueMicrotask(() => {
      document.getElementById("lrfStart")?.addEventListener("click", lrfStart);
      document.getElementById("lrfStop")?.addEventListener("click", lrfStop);
      document.getElementById("LrfGetMeteo")?.addEventListener("click", getMeteo3);
      document.getElementById("lrfNewSession")?.addEventListener("click", lrfNewSession);
      document.getElementById("lrfScanOn")?.addEventListener("click", lrfScanOn);
      document.getElementById("lrfScanOff")?.addEventListener("click", lrfScanOff);
      document.getElementById("lrfMeasure")?.addEventListener("click", lrfMeasure);
      document.getElementById("lrfEnableFogMode")?.addEventListener("click", lrfEnableFogMode);
      document.getElementById("lrfDisableFogMode")?.addEventListener("click", lrfDisableFogMode);
      document.getElementById("lrfTargetDesignatorOff")?.addEventListener("click", lrfTargetDesignatorOff);
      document.getElementById("lrfTargetDesignatorOnModeA")?.addEventListener("click", () => lrfTargetDesignatorOnModeA());
      document.getElementById("lrfTargetDesignatorOnModeB")?.addEventListener("click", () => lrfTargetDesignatorOnModeB());
      document.getElementById("lrfSetScanMode")?.addEventListener("click", () => {
        const modeSelect = document.getElementById("lrfScanMode");
        const mode = parseInt(modeSelect.value);
        if (!isNaN(mode) && mode >= 0) {
          lrfSetScanMode(mode);
        }
      });
    });
    return { name: "LRF", element: lrfCard };
  }

  // frontend/ts/cmd/cmdSender/cmdRotary.ts
  function rotaryStart() {
    console.log("Sending rotary start command");
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ start: index_cmd_RotaryPlatform_exports.Start.create() });
    sendCmdMessage(rootMsg);
  }
  function rotaryStop() {
    console.log("Sending rotary stop command");
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ stop: index_cmd_RotaryPlatform_exports.Stop.create() });
    sendCmdMessage(rootMsg);
  }
  function rotaryHalt() {
    console.log("Sending rotary halt command");
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ halt: index_cmd_RotaryPlatform_exports.Halt.create() });
    sendCmdMessage(rootMsg);
  }
  function rotarySetPlatformAzimuth(value) {
    console.log(`Setting platform azimuth to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ setPlatformAzimuth: index_cmd_RotaryPlatform_exports.SetPlatformAzimuth.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function rotarySetPlatformElevation(value) {
    console.log(`Setting platform elevation to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ setPlatformElevation: index_cmd_RotaryPlatform_exports.SetPlatformElevation.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function rotarySetPlatformBank(value) {
    console.log(`Setting platform bank to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ setPlatformBank: index_cmd_RotaryPlatform_exports.SetPlatformBank.create({ value }) });
    sendCmdMessage(rootMsg);
  }
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
  function rotaryAzimuthSetValue(value, direction) {
    console.log(`Setting azimuth value to ${value} with direction ${direction}`);
    let setAzimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      setValue: index_cmd_RotaryPlatform_exports.SetAzimuthValue.create({ value, direction })
    });
    sendRotaryAxisCommand({ azimuth: setAzimuthMsg });
  }
  function rotaryAzimuthRotateTo(targetValue, speed, direction) {
    console.log(`Rotating azimuth to ${targetValue} with speed ${speed} and direction ${direction}`);
    let rotateAzimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      rotateTo: index_cmd_RotaryPlatform_exports.RotateAzimuthTo.create({
        targetValue,
        speed,
        direction
      })
    });
    sendRotaryAxisCommand({ azimuth: rotateAzimuthMsg });
  }
  function rotaryAzimuthRotateRelative(value, speed, direction) {
    console.log(`Rotating azimuth RELATIVE to the current position by ${value} at speed ${speed} with direction ${direction}`);
    let rotateAzimuthRelativeMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      relative: index_cmd_RotaryPlatform_exports.RotateAzimuthRelative.create({
        value,
        speed,
        direction
      })
    });
    sendRotaryAxisCommand({ azimuth: rotateAzimuthRelativeMsg });
  }
  function rotaryElevationRotateRelative(value, speed, direction) {
    console.log(`Rotating elevation RELATIVE to the current position by ${value} at speed ${speed} with direction ${direction}`);
    let rotateElevationRelativeMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      relative: index_cmd_RotaryPlatform_exports.RotateElevationRelative.create({
        value,
        speed,
        direction
      })
    });
    sendRotaryAxisCommand({ elevation: rotateElevationRelativeMsg });
  }
  function rotaryElevationRotateRelativeSet(value, direction) {
    console.log(`Setting elevation value RELATIVE to the current position to ${value} with direction ${direction}`);
    let rotateElevationRelativeSetMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      relativeSet: index_cmd_RotaryPlatform_exports.RotateElevationRelativeSet.create({
        value,
        direction
      })
    });
    sendRotaryAxisCommand({ elevation: rotateElevationRelativeSetMsg });
  }
  function rotaryAzimuthRotateRelativeSet(value, direction) {
    console.log(`Setting azimuth value RELATIVE to the current position to ${value} with direction ${direction}`);
    let rotateAzimuthRelativeSetMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      relativeSet: index_cmd_RotaryPlatform_exports.RotateAzimuthRelativeSet.create({
        value,
        direction
      })
    });
    sendRotaryAxisCommand({ azimuth: rotateAzimuthRelativeSetMsg });
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
  function rotaryElevationSetValue(value) {
    console.log(`Setting elevation value to ${value}`);
    let rotateElevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      setValue: index_cmd_RotaryPlatform_exports.SetElevationValue.create({ value })
    });
    sendRotaryAxisCommand({ elevation: rotateElevationMsg });
  }
  function rotaryElevationRotateTo(targetValue, speed) {
    console.log(`Rotating elevation to ${targetValue} at speed ${speed}`);
    let rotateElevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      rotateTo: index_cmd_RotaryPlatform_exports.RotateElevationTo.create({
        targetValue,
        speed
      })
    });
    sendRotaryAxisCommand({ elevation: rotateElevationMsg });
  }
  function rotateBothTo(azimuth, azimuthSpeed, azimuthDirection, elevation, elevationSpeed) {
    console.log(`Rotating azimuth to ${azimuth} at speed ${azimuthSpeed} and elevation to ${elevation} at speed ${elevationSpeed} and azimuth direction ${azimuthDirection}`);
    let rotateElevationToMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      rotateTo: index_cmd_RotaryPlatform_exports.RotateElevationTo.create({
        targetValue: elevation,
        speed: elevationSpeed
      })
    });
    let rotateAzimuthToMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      rotateTo: index_cmd_RotaryPlatform_exports.RotateAzimuthTo.create({
        targetValue: azimuth,
        speed: azimuthSpeed,
        direction: azimuthDirection
      })
    });
    sendRotaryAxisCommand({
      elevation: rotateElevationToMsg,
      azimuth: rotateAzimuthToMsg
    });
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
  function rotateBothRelative(azimuth, azimuthSpeed, azimuthDirection, elevation, elevationSpeed, elevationDirection) {
    console.log(`Rotating azimuth relative to ${azimuth} at speed ${azimuthSpeed} and elevation relative to ${elevation} at speed ${elevationSpeed} and azimuth direction ${azimuthDirection} and elevation direction ${elevationDirection}`);
    let rotateElevationRelativeMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      relative: index_cmd_RotaryPlatform_exports.RotateElevationRelative.create({
        value: elevation,
        speed: elevationSpeed,
        direction: elevationDirection
      })
    });
    let rotateAzimuthRelativeMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      relative: index_cmd_RotaryPlatform_exports.RotateAzimuthRelative.create({
        value: azimuth,
        speed: azimuthSpeed,
        direction: azimuthDirection
      })
    });
    sendRotaryAxisCommand({
      elevation: rotateElevationRelativeMsg,
      azimuth: rotateAzimuthRelativeMsg
    });
  }
  function rotateBothRelativeSet(azimuth, azimuthDirection, elevation, elevationDirection) {
    console.log(`Setting azimuth relative to ${azimuth} and elevation relative to ${elevation} and azimuth direction ${azimuthDirection} and elevation direction ${elevationDirection}`);
    let rotateElevationRelativeSetMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      relativeSet: index_cmd_RotaryPlatform_exports.RotateElevationRelativeSet.create({
        value: elevation,
        direction: elevationDirection
      })
    });
    let rotateAzimuthRelativeSetMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      relativeSet: index_cmd_RotaryPlatform_exports.RotateAzimuthRelativeSet.create({
        value: azimuth,
        direction: azimuthDirection
      })
    });
    sendRotaryAxisCommand({
      elevation: rotateElevationRelativeSetMsg,
      azimuth: rotateAzimuthRelativeSetMsg
    });
  }
  function setBothTo(azimuth, elevation, azimuthDirection) {
    console.log(`Setting azimuth to ${azimuth} and elevation to ${elevation} and azimuth direction ${azimuthDirection}`);
    let setAzimuthMsg = index_cmd_RotaryPlatform_exports.Azimuth.create({
      setValue: index_cmd_RotaryPlatform_exports.SetAzimuthValue.create({
        value: azimuth,
        direction: azimuthDirection
      })
    });
    let setElevationMsg = index_cmd_RotaryPlatform_exports.Elevation.create({
      setValue: index_cmd_RotaryPlatform_exports.SetElevationValue.create({ value: elevation })
    });
    sendRotaryAxisCommand({
      azimuth: setAzimuthMsg,
      elevation: setElevationMsg
    });
  }
  function setCalculateBasePositionFromCompass(value) {
    console.log(`Setting calculate base position from compass to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ setCalculateBasePositionFromCompass: { flag: value } });
    sendCmdMessage(rootMsg);
  }
  function getMeteo4() {
    console.log("Requesting rotary meteo data");
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ getMeteo: index_cmd_RotaryPlatform_exports.GetMeteo.create() });
    sendCmdMessage(rootMsg);
  }
  function setRotateToGps(lon, lat, alt) {
    console.log(`Setting rotate to GPS to ${lon}, ${lat}, ${alt}`);
    let rotateToGpsMsg = index_cmd_RotaryPlatform_exports.RotateToGPS.create({
      longitude: lon,
      latitude: lat,
      altitude: alt
    });
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ rotateToGps: rotateToGpsMsg });
    sendCmdMessage(rootMsg);
  }
  function setOriginGps(lon, lat, alt) {
    console.log(`Setting origin GPS to ${lon}, ${lat}, ${alt}`);
    let setOriginGpsMsg = index_cmd_RotaryPlatform_exports.SetOriginGPS.create({
      longitude: lon,
      latitude: lat,
      altitude: alt
    });
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ setOriginGps: setOriginGpsMsg });
    sendCmdMessage(rootMsg);
  }
  function stringToRotaryMode(value) {
    switch (value) {
      case "init":
        return 1 /* JON_GUI_DATA_ROTARY_MODE_INITIALIZATION */;
      case "speed":
        return 2 /* JON_GUI_DATA_ROTARY_MODE_SPEED */;
      case "position":
        return 3 /* JON_GUI_DATA_ROTARY_MODE_POSITION */;
      case "stabilization":
        return 4 /* JON_GUI_DATA_ROTARY_MODE_STABILIZATION */;
      case "targeting":
        return 5 /* JON_GUI_DATA_ROTARY_MODE_TARGETING */;
      case "video_tracker":
        return 6 /* JON_GUI_DATA_ROTARY_MODE_VIDEO_TRACKER */;
      default:
        return 0 /* JON_GUI_DATA_ROTARY_MODE_UNSPECIFIED */;
    }
  }
  function setRotaryMode(mode) {
    console.log(`Setting rotary mode to ${mode}`);
    let rootMsg = createRootMessage();
    rootMsg.rotary = index_cmd_RotaryPlatform_exports.Root.create({ setMode: { mode } });
    sendCmdMessage(rootMsg);
  }
  function stringToRotaryDirection(value) {
    switch (value.toLowerCase()) {
      case "clockwise":
        return 1 /* JON_GUI_DATA_ROTARY_DIRECTION_CLOCKWISE */;
      case "counterclockwise":
      case "counter clockwise":
        return 2 /* JON_GUI_DATA_ROTARY_DIRECTION_COUNTER_CLOCKWISE */;
      default:
        return 0 /* JON_GUI_DATA_ROTARY_DIRECTION_UNSPECIFIED */;
    }
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdRotaryPlatformCard.ts
  function attachEventListeners2() {
    document.getElementById("rotaryStart")?.addEventListener("click", rotaryStart);
    document.getElementById("rotaryStop")?.addEventListener("click", rotaryStop);
    document.getElementById("RotaryGetMeteo")?.addEventListener("click", getMeteo4);
    document.getElementById("rotaryHalt")?.addEventListener("click", rotaryHalt);
    document.getElementById("rotaryHaltAzimuth")?.addEventListener("click", rotaryHaltAzimuth);
    document.getElementById("rotaryHaltElevation")?.addEventListener("click", rotaryHaltElevation);
    document.getElementById("rotaryHaltElevationAndAzimuth")?.addEventListener("click", rotaryHaltElevationAndAzimuth);
    document.getElementById("calculateBasePositionFromCompassOn")?.addEventListener("click", () => setCalculateBasePositionFromCompass(true));
    document.getElementById("calculateBasePositionFromCompassOff")?.addEventListener("click", () => setCalculateBasePositionFromCompass(false));
    const azimuthInput = document.getElementById("azimuthValue");
    const elevationInput = document.getElementById("elevationValue");
    const bankInput = document.getElementById("bankValue");
    document.getElementById("setOrientation")?.addEventListener(
      "click",
      () => {
        if (azimuthInput.value) {
          rotarySetPlatformAzimuth(Number(azimuthInput.value));
        }
        if (elevationInput.value) {
          rotarySetPlatformElevation(Number(elevationInput.value));
        }
        if (bankInput.value) {
          rotarySetPlatformBank(Number(bankInput.value));
        }
      }
    );
    setupActions();
  }
  function setupActions() {
    const rotateToValueInputAZ = document.getElementById(`rotateToValueAzimuth`);
    const rotateToSpeedInputAZ = document.getElementById(`rotateToSpeedAzimuth`);
    const rotateSpeedInputAZ = document.getElementById(`rotateSpeedAzimuth`);
    const rotateToDirectionSelectAZ = document.getElementById(`rotateToDirectionAzimuth`);
    const rotateDirectionSelectAZ = document.getElementById(`rotateDirectionAzimuth`);
    const setValueValueInputAZ = document.getElementById(`setValueValueAzimuth`);
    const setValueDirectionSelectAZ = document.getElementById(`setValueDirectionAzimuth`);
    const rotateValueInputRelativeAZ = document.getElementById(`rotateValueAzimuthRelative`);
    const rotateSpeedInputRelativeAZ = document.getElementById(`rotateSpeedAzimuthRelative`);
    const rotateDirectionSelectRelativeAZ = document.getElementById(`rotateDirectionAzimuthRelative`);
    const setValueValueInputRelativeAZ = document.getElementById(`setValueValueAzimuthRelative`);
    const setValueDirectionSelectRelativeAZ = document.getElementById(`setValueDirectionAzimuthRelative`);
    const rotateToValueInputEL = document.getElementById(`rotateToValueElevation`);
    const rotateToSpeedInputEL = document.getElementById(`rotateToSpeedElevation`);
    const rotateSpeedInputEL = document.getElementById(`rotateSpeedElevation`);
    const rotateDirectionSelectEL = document.getElementById(`rotateDirectionElevation`);
    const setValueValueInputEL = document.getElementById(`setValueValueElevation`);
    const rotateValueInputRelativeEL = document.getElementById(`rotateValueElevationRelative`);
    const rotateSpeedInputRelativeEL = document.getElementById(`rotateSpeedElevationRelative`);
    const rotateDirectionSelectRelativeEL = document.getElementById(`rotateDirectionElevationRelative`);
    const setValueValueInputRelativeEL = document.getElementById(`setValueValueElevationRelative`);
    const setValueDirectionSelectRelativeEL = document.getElementById(`setValueDirectionElevationRelative`);
    const RotaryGPSlatitudeValueEL = document.getElementById(`RotaryGPSlatitudeValue`);
    const RotaryGPSlongitudeValueEL = document.getElementById(`RotaryGPSlongitudeValue`);
    const RotaryGPSaltitudeValueEL = document.getElementById(`RotaryGPSaltitudeValue`);
    const RotarySetOriginGPSlatitudeValueEL = document.getElementById(`RotarySetOriginGPSlatitudeValue`);
    const RotarySetOriginGPSlongitudeValueEL = document.getElementById(`RotarySetOriginGPSlongitudeValue`);
    const RotarySetOriginGPSaltitudeValueEL = document.getElementById(`RotarySetOriginGPSaltitudeValue`);
    const RotaryModeSelect = document.getElementById(`RotaryModeSelect`);
    const RotaryModeButton = document.getElementById(`RotaryModeButton`);
    RotaryModeButton?.addEventListener("click", () => {
      setRotaryMode(stringToRotaryMode(RotaryModeSelect.value));
    });
    document.getElementById(`RotaryGPSSetRotateToGps`)?.addEventListener("click", () => {
      if (RotaryGPSlatitudeValueEL.value && RotaryGPSlongitudeValueEL.value && RotaryGPSaltitudeValueEL.value) {
        setRotateToGps(Number(RotaryGPSlatitudeValueEL.value), Number(RotaryGPSlongitudeValueEL.value), Number(RotaryGPSaltitudeValueEL.value));
      }
    });
    document.getElementById(`RotarySetOriginGPSSetOriginGps`)?.addEventListener("click", () => {
      if (RotarySetOriginGPSlatitudeValueEL.value && RotarySetOriginGPSlongitudeValueEL.value && RotarySetOriginGPSaltitudeValueEL.value) {
        setOriginGps(Number(RotarySetOriginGPSlatitudeValueEL.value), Number(RotarySetOriginGPSlongitudeValueEL.value), Number(RotarySetOriginGPSaltitudeValueEL.value));
      }
    });
    document.getElementById(`rotateToOrientationButton`)?.addEventListener("click", () => {
      if (rotateToSpeedInputAZ.value && rotateToValueInputAZ.value && rotateToSpeedInputEL.value && rotateToValueInputEL.value) {
        rotateBothTo(
          Number(rotateToValueInputAZ.value),
          Number(rotateToSpeedInputAZ.value),
          stringToRotaryDirection(rotateToDirectionSelectAZ.value),
          Number(rotateToValueInputEL.value),
          Number(rotateToSpeedInputEL.value)
        );
      } else if (rotateToSpeedInputAZ.value && rotateToValueInputAZ.value) {
        rotaryAzimuthRotateTo(
          Number(rotateToValueInputAZ.value),
          Number(rotateToSpeedInputAZ.value),
          stringToRotaryDirection(rotateToDirectionSelectAZ.value)
        );
      } else if (rotateToSpeedInputEL.value && rotateToValueInputEL.value) {
        rotaryElevationRotateTo(Number(rotateToValueInputEL.value), Number(rotateToSpeedInputEL.value));
      }
    });
    document.getElementById(`continuousRotateOrientationButton`)?.addEventListener("click", () => {
      if (rotateSpeedInputAZ.value && rotateSpeedInputEL.value) {
        rotateBoth(
          Number(rotateSpeedInputAZ.value),
          stringToRotaryDirection(rotateDirectionSelectAZ.value),
          Number(rotateSpeedInputEL.value),
          stringToRotaryDirection(rotateDirectionSelectEL.value)
        );
      } else if (rotateSpeedInputAZ.value) {
        rotaryAzimuthRotate(Number(rotateSpeedInputAZ.value), stringToRotaryDirection(rotateDirectionSelectAZ.value));
      } else if (rotateSpeedInputEL.value) {
        rotaryElevationRotate(Number(rotateSpeedInputEL.value), stringToRotaryDirection(rotateDirectionSelectEL.value));
      }
    });
    document.getElementById(`setValueOrientationButton`)?.addEventListener("click", () => {
      if (setValueValueInputAZ.value && setValueValueInputEL.value) {
        setBothTo(Number(setValueValueInputAZ.value), Number(setValueValueInputEL.value), stringToRotaryDirection(setValueDirectionSelectAZ.value));
      } else if (setValueValueInputAZ.value) {
        rotaryAzimuthSetValue(Number(setValueValueInputAZ.value), stringToRotaryDirection(setValueDirectionSelectAZ.value));
      } else if (setValueValueInputEL.value) {
        rotaryElevationSetValue(Number(setValueValueInputEL.value));
      }
    });
    document.getElementById(`continuousRotateOrientationRelativeButton`)?.addEventListener("click", () => {
      if (rotateSpeedInputRelativeAZ.value && rotateSpeedInputRelativeEL.value) {
        rotateBothRelative(
          Number(rotateValueInputRelativeAZ.value),
          Number(rotateSpeedInputRelativeAZ.value),
          stringToRotaryDirection(rotateDirectionSelectRelativeAZ.value),
          Number(rotateValueInputRelativeEL.value),
          Number(rotateSpeedInputRelativeEL.value),
          stringToRotaryDirection(rotateDirectionSelectRelativeEL.value)
        );
      } else if (rotateSpeedInputRelativeAZ.value) {
        rotaryAzimuthRotateRelative(
          Number(rotateValueInputRelativeAZ.value),
          Number(rotateSpeedInputRelativeAZ.value),
          stringToRotaryDirection(rotateDirectionSelectRelativeAZ.value)
        );
      } else if (rotateSpeedInputRelativeEL.value) {
        rotaryElevationRotateRelative(
          Number(rotateValueInputRelativeEL.value),
          Number(rotateSpeedInputRelativeEL.value),
          stringToRotaryDirection(rotateDirectionSelectRelativeEL.value)
        );
      }
    });
    document.getElementById(`setValueOrientationRelativeButton`)?.addEventListener("click", () => {
      if (setValueValueInputRelativeAZ.value && setValueValueInputRelativeEL.value) {
        rotateBothRelativeSet(
          Number(setValueValueInputRelativeAZ.value),
          stringToRotaryDirection(setValueDirectionSelectRelativeAZ.value),
          Number(setValueValueInputRelativeEL.value),
          stringToRotaryDirection(setValueDirectionSelectRelativeEL.value)
        );
      } else if (setValueValueInputRelativeAZ.value) {
        rotaryAzimuthRotateRelativeSet(Number(setValueValueInputRelativeAZ.value), stringToRotaryDirection(setValueDirectionSelectRelativeAZ.value));
      } else if (setValueValueInputRelativeEL.value) {
        rotaryElevationRotateRelativeSet(Number(setValueValueInputRelativeEL.value), stringToRotaryDirection(setValueDirectionSelectRelativeEL.value));
      }
    });
  }
  function createRotaryCard() {
    const rotaryCard = document.createElement("div");
    rotaryCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = [
      createSubCard("control", "Control", [
        createButton("rotaryStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("rotaryStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
        createButton("RotaryGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
        createButton("rotaryHalt", "Halt", "bg-yellow-500 text-white hover:bg-yellow-700"),
        createButton("rotaryHaltAzimuth", "Halt Azimuth", "bg-green-500 text-white hover:bg-green-700"),
        createButton("rotaryHaltElevation", "Halt Elevation", "bg-purple-500 text-white hover:bg-purple-700"),
        createButton("rotaryHaltElevationAndAzimuth", "Halt Azimuth and Elevation", "bg-cyan-500 text-white hover:bg-cyan-700")
      ]),
      createSubCard("setBaseOrientation", "Set Base Orientation", [
        createInput("azimuthValue", "Azimuth"),
        createInput("elevationValue", "Elevation"),
        createInput("bankValue", "Bank"),
        createButton("setOrientation", "Set Orientation", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("RotaryCompassIntegration", "Compass Integration", [
        createButton("calculateBasePositionFromCompassOn", "Base Position From Compass: on", "bg-green-500 text-white hover:bg-green-700"),
        createButton("calculateBasePositionFromCompassOff", "Base Position From Compass: off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("rotateToOrientation", "Rotate To Orientation", [
        createInput("rotateToValueAzimuth", "Value (Azimuth)"),
        createInput("rotateToSpeedAzimuth", "Speed (Azimuth)"),
        createSelect("rotateToDirectionAzimuth", ["Clockwise", "Counter Clockwise"]),
        createRowSeparator(),
        createInput("rotateToValueElevation", "Value (Elevation)"),
        createInput("rotateToSpeedElevation", "Speed (Elevation)"),
        createButton("rotateToOrientationButton", "Rotate To Orientation", "bg-purple-500 text-white hover:bg-purple-700")
      ]),
      createSubCard("rotateOrientation", "Rotate Orientation", [
        createInput("rotateSpeedAzimuth", "Speed (Azimuth)"),
        createSelect("rotateDirectionAzimuth", ["Clockwise", "Counter Clockwise"]),
        createRowSeparator(),
        createInput("rotateSpeedElevation", "Speed (Elevation)"),
        createSelect("rotateDirectionElevation", ["Clockwise", "Counter Clockwise"]),
        createButton("continuousRotateOrientationButton", "Continuous Rotate", "bg-purple-500 text-white hover:bg-purple-700")
      ]),
      createSubCard("setValueOrientation", "Set Value Orientation", [
        createInput("setValueValueAzimuth", "Value (Azimuth)"),
        createSelect("setValueDirectionAzimuth", ["Clockwise", "Counter Clockwise"]),
        createRowSeparator(),
        createInput("setValueValueElevation", "Value (Elevation)"),
        createButton("setValueOrientationButton", "Set Orientation", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("rotateOrientationRelative", "Rotate Orientation Relative", [
        createInput("rotateValueAzimuthRelative", "Value (Azimuth) relative"),
        createInput("rotateSpeedAzimuthRelative", "Speed (Azimuth) relative"),
        createSelect("rotateDirectionAzimuthRelative", ["Clockwise", "Counter Clockwise"]),
        createRowSeparator(),
        createInput("rotateValueElevationRelative", "Value (Elevation) relative"),
        createInput("rotateSpeedElevationRelative", "Speed (Elevation) relative"),
        createSelect("rotateDirectionElevationRelative", ["Clockwise", "Counter Clockwise"]),
        createButton("continuousRotateOrientationRelativeButton", "Continuous Rotate Relative", "bg-purple-500 text-white hover:bg-purple-700")
      ]),
      createSubCard("setValueOrientationRelative", "Set Value Orientation Relative", [
        createInput("setValueValueAzimuthRelative", "Value (Azimuth) relative"),
        createSelect("setValueDirectionAzimuthRelative", ["Clockwise", "Counter Clockwise"]),
        createRowSeparator(),
        createInput("setValueValueElevationRelative", "Value (Elevation) relative"),
        createSelect("setValueDirectionElevationRelative", ["Clockwise", "Counter Clockwise"]),
        createButton("setValueOrientationRelativeButton", "Set Orientation Relative", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("RotarySetOriginGPSCommands", "Set origin GPS", [
        createInput("RotarySetOriginGPSlatitudeValue", "Latitude", "setManualPositionButton"),
        createInput("RotarySetOriginGPSlongitudeValue", "Longitude", "setManualPositionButton"),
        createInput("RotarySetOriginGPSaltitudeValue", "Altitude (meters)", "setManualPositionButton"),
        createButton("RotarySetOriginGPSSetOriginGps", "Set Origin GPS", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("RotaryGPSCommands", "Rotate to GPS", [
        createInput("RotaryGPSlatitudeValue", "Latitude", "setManualPositionButton"),
        createInput("RotaryGPSlongitudeValue", "Longitude", "setManualPositionButton"),
        createInput("RotaryGPSaltitudeValue", "Altitude (meters)", "setManualPositionButton"),
        createButton("RotaryGPSSetRotateToGps", "Rotate To GPS", "bg-blue-500 text-white hover:bg-blue-700")
      ]),
      createSubCard("RotaryMode", "Rotary Mode", [
        createSelect("RotaryModeSelect", ["init", "speed", "position", "stabilization", "targeting", "video_tracker"]),
        createButton("RotaryModeButton", "Set Rotary Mode", "bg-green-500 text-white hover:bg-green-700")
      ])
    ];
    const dropdown = createDropdown("rotary-dd", subCards);
    rotaryCard.appendChild(dropdown);
    subCards.forEach((subCard) => rotaryCard.appendChild(subCard));
    queueMicrotask(attachEventListeners2);
    return { name: "Rotary Platform", element: rotaryCard };
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

  // frontend/ts/cmd/cmdWindow/cards/cmdOSDCard.ts
  function createOSDCard(opts) {
    const OSDCard = document.createElement("div");
    OSDCard.className = "p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 mt-4";
    OSDCard.innerHTML = `
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">Layouts</div>
      <button id="layoutsNext" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Next layout</button>
    </div>
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">OSD Controls</div>
      <button id="osdDefaultScreen" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Default Screen</button>
      <button id="osdLRFResultScreen" class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700">LRF Result Screen</button>
      <button id="osdLRFResultSimpleScreen" class="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">LRF Simple Result Screen</button>
      <button id="osdLRFMeasureScreen" class="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700">LRF Measure Screen</button>
    </div>
    `;
    queueMicrotask(() => {
      document.getElementById("layoutsNext")?.addEventListener("click", opts.nextLayout);
      document.getElementById("osdDefaultScreen")?.addEventListener("click", OSDShowDefaultScreen);
      document.getElementById("osdLRFResultScreen")?.addEventListener("click", OSDShowLRFResultScreen);
      document.getElementById("osdLRFResultSimpleScreen")?.addEventListener("click", OSDShowLRFResultSimplifiedScreen);
      document.getElementById("osdLRFMeasureScreen")?.addEventListener("click", OSDShowLRFMeasureScreen);
    });
    return { name: "OSD", element: OSDCard };
  }

  // frontend/ts/cmd/cmdSender/cmdSystem.ts
  function SystemReboot() {
    console.log("Sending system reboot");
    let rootMsg = createRootMessage();
    rootMsg.system = index_cmd_System_exports.Root.create({ reboot: index_cmd_System_exports.Reboot.create() });
    sendCmdMessage(rootMsg);
  }
  function SystemPowerOff() {
    console.log("Sending system power off");
    let rootMsg = createRootMessage();
    rootMsg.system = index_cmd_System_exports.Root.create({ powerOff: index_cmd_System_exports.PowerOff.create() });
    sendCmdMessage(rootMsg);
  }
  function SystemStartAll() {
    console.log("Sending system start all");
    let rootMsg = createRootMessage();
    rootMsg.system = index_cmd_System_exports.Root.create({ startAll: index_cmd_System_exports.StartALl.create() });
    sendCmdMessage(rootMsg);
  }
  function SystemStopAll() {
    console.log("Sending system stop all");
    let rootMsg = createRootMessage();
    rootMsg.system = index_cmd_System_exports.Root.create({ stopAll: index_cmd_System_exports.StopALl.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdSystemCard.ts
  function createSystemCard() {
    const SystemCard = document.createElement("div");
    SystemCard.className = "p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 mt-4";
    SystemCard.innerHTML = `
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-md font-semibold">System Actions</div>
      <button id="systemStartAll" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Start All Systems</button>
      <button id="systemStopAll" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700">Stop All Systems</button>
      <button id="systemReboot" class="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">Reboot System</button>
      <button id="systemPowerOff" class="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700">Power Off</button>
    </div>
    `;
    queueMicrotask(() => {
      document.getElementById("systemStartAll")?.addEventListener("click", SystemStartAll);
      document.getElementById("systemStopAll")?.addEventListener("click", SystemStopAll);
      document.getElementById("systemReboot")?.addEventListener("click", SystemReboot);
      document.getElementById("systemPowerOff")?.addEventListener("click", SystemPowerOff);
    });
    return { name: "System", element: SystemCard };
  }

  // frontend/ts/cmd/cmdSender/cmdHeatCamera.ts
  function heatCameraSetSyncZoom(value) {
    console.log(`Heat Camera Setting sync zoom to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ syncZoom: { value } });
    sendCmdMessage(rootMsg);
  }
  function heatCameraGetPos() {
    console.log("Getting heat camera position");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ getPos: index_cmd_HeatCamera_exports.GetPos.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraSetRecording(value) {
    console.log(`Heat Camera Setting recording to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ setRecording: { value } });
    sendCmdMessage(rootMsg);
  }
  function heatCameraSetAutoFocus(value) {
    console.log(`Heat Camera Setting auto focus to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ setAutoFocus: { value } });
    sendCmdMessage(rootMsg);
  }
  function heatCameraTakePhoto() {
    console.log("Taking photo");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({
      photo: function() {
        return index_cmd_HeatCamera_exports.Photo.create();
      }
    });
    sendCmdMessage(rootMsg);
  }
  function heatCameraSetAgc(value) {
    console.log(`Heat Camera Setting agc to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ setAgc: index_cmd_HeatCamera_exports.SetAGC.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function heatCameraSetFilter(value) {
    console.log(`Heat Camera Setting filter to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ setFilter: index_cmd_HeatCamera_exports.SetFilters.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function heatCameraSetZoomTableValue(value) {
    console.log(`Heat Camera Setting optical zoom table value to ${value}`);
    let rootMsg = createRootMessage();
    let zoom = index_cmd_HeatCamera_exports.Zoom.create({ setZoomTableValue: { value } });
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function stringToHeatCameraAgcMode(value) {
    switch (value.toLowerCase()) {
      case "mode_1":
        return 1 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_1 */;
      case "mode_2":
        return 2 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_2 */;
      case "mode_3":
        return 3 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_3 */;
      default:
        return 0 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_AGC_MODE_UNSPECIFIED */;
    }
  }
  function stringToHeatCameraFilter(value) {
    switch (value.toLowerCase()) {
      case "hot_black":
        return 2 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_BLACK */;
      case "hot_white":
        return 1 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_HOT_WHITE */;
      case "sepia":
        return 3 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_SEPIA */;
      default:
        return 0 /* JON_GUI_DATA_VIDEO_CHANNEL_HEAT_FILTER_UNSPECIFIED */;
    }
  }
  function heatCameraCalibrate() {
    console.log("Sending heatCamera calibrate");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ calibrate: index_cmd_HeatCamera_exports.Calibrate.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraStart() {
    console.log("Sending heatCamera start");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ start: index_cmd_HeatCamera_exports.Start.create() });
    sendCmdMessage(rootMsg);
  }
  function heatCameraStop() {
    console.log("Sending heatCamera stop");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ stop: index_cmd_HeatCamera_exports.Stop.create() });
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
  function heatCameraSetFocus(value) {
    console.log(`Heat Camera Setting heat camera focus value to ${value}`);
    let focus = index_cmd_HeatCamera_exports.Focus.create({ setValue: { value } });
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ focus });
    sendCmdMessage(rootMsg);
  }
  function heatCameraMoveFocus(targetValue, speed) {
    console.log(`Heat Camera Moving heat camera focus to ${targetValue} at speed ${speed}`);
    let focus = index_cmd_HeatCamera_exports.Focus.create({ move: { targetValue, speed } });
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ focus });
    sendCmdMessage(rootMsg);
  }
  function heatCameraHaltFocus() {
    console.log("Halting heat camera focus");
    let focus = index_cmd_HeatCamera_exports.Focus.create({ halt: {} });
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ focus });
    sendCmdMessage(rootMsg);
  }
  function heatCameraSetZoom(value) {
    console.log(`Heat Camera Setting heat camera zoom value to ${value}`);
    let zoom = index_cmd_HeatCamera_exports.Zoom.create({ setValue: { value } });
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function heatCameraMoveZoom(targetValue, speed) {
    console.log(`Heat Camera Moving heat camera zoom to ${targetValue} at speed ${speed}`);
    let zoom = index_cmd_HeatCamera_exports.Zoom.create({ move: { targetValue, speed } });
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function heatCameraHaltZoom() {
    console.log("Halting heat camera zoom");
    let zoom = index_cmd_HeatCamera_exports.Zoom.create({ halt: {} });
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function heatCameraNextZoomTablePos() {
    console.log(`Heat Camera Setting next optical zoom table position`);
    let rootMsg = createRootMessage();
    let zoom = index_cmd_HeatCamera_exports.Zoom.create({ nextZoomTablePos: {} });
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function heatCameraPrevZoomTablePos() {
    console.log(`Heat Camera Setting previous optical zoom table position`);
    let rootMsg = createRootMessage();
    let zoom = index_cmd_HeatCamera_exports.Zoom.create({ prevZoomTablePos: {} });
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function getMeteo5() {
    console.log("Requesting camera heat meteo data");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ getMeteo: index_cmd_HeatCamera_exports.GetMeteo.create() });
    sendCmdMessage(rootMsg);
  }
  function enableDDE() {
    console.log("Enabling DDE");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ enableDde: index_cmd_HeatCamera_exports.EnableDDE.create() });
    sendCmdMessage(rootMsg);
  }
  function disableDDE() {
    console.log("Disabling DDE");
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ disableDde: index_cmd_HeatCamera_exports.DisableDDE.create() });
    sendCmdMessage(rootMsg);
  }
  function setDDELevel(level) {
    console.log(`Setting DDE level to ${level}`);
    let rootMsg = createRootMessage();
    rootMsg.heatCamera = index_cmd_HeatCamera_exports.Root.create({ setDdeLevel: index_cmd_HeatCamera_exports.SetDDELevel.create({ value: level }) });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdHeatCameraCard.ts
  function attachEventListeners3() {
    document.getElementById("HCamStart")?.addEventListener("click", heatCameraStart);
    document.getElementById("HCamStop")?.addEventListener("click", heatCameraStop);
    document.getElementById("HCamGetMeteo")?.addEventListener("click", getMeteo5);
    document.getElementById("HCamGetPos")?.addEventListener("click", () => heatCameraGetPos());
    document.getElementById("HCamFocusHalt")?.addEventListener("click", heatCameraHaltFocus);
    document.getElementById("HCamZoomHalt")?.addEventListener("click", heatCameraHaltZoom);
    document.getElementById("HCamTakePhoto")?.addEventListener("click", heatCameraTakePhoto);
    document.getElementById("HCamZoomIn")?.addEventListener("mousedown", heatCameraZoomIn);
    document.getElementById("HCamZoomOut")?.addEventListener("mousedown", heatCameraZoomOut);
    document.getElementById("HCamZoomIn")?.addEventListener("mouseup", heatCameraZoomStop);
    document.getElementById("HCamZoomOut")?.addEventListener("mouseup", heatCameraZoomStop);
    document.getElementById("HCamZoomStop")?.addEventListener("click", heatCameraZoomStop);
    document.getElementById("HCamFocusIn")?.addEventListener("mousedown", heatCameraFocusIn);
    document.getElementById("HCamFocusOut")?.addEventListener("mousedown", heatCameraFocusOut);
    document.getElementById("HCamFocusIn")?.addEventListener("mouseup", heatCameraFocusStop);
    document.getElementById("HCamFocusOut")?.addEventListener("mouseup", heatCameraFocusStop);
    document.getElementById("HCamFocusStop")?.addEventListener("click", heatCameraFocusStop);
    document.getElementById("HCamCalibrate")?.addEventListener("click", heatCameraCalibrate);
    document.getElementById("HCamEnableDDE")?.addEventListener("click", enableDDE);
    document.getElementById("HCamDisableDDE")?.addEventListener("click", disableDDE);
    document.getElementById("HCamSetZoomTableValue")?.addEventListener("click", () => {
      const input = document.getElementById("HCamZoomTableValue");
      const value = Number(input.value);
      heatCameraSetZoomTableValue(value);
    });
    document.getElementById("HCamNextZoomTablePos")?.addEventListener("click", heatCameraNextZoomTablePos);
    document.getElementById("HCamPrevZoomTablePos")?.addEventListener("click", heatCameraPrevZoomTablePos);
    setupHeatCameraFocusAndZoomActions();
    setupHeatCameraSettingsActions();
  }
  function setupHeatCameraFocusAndZoomActions() {
    const actions = ["Focus", "Zoom"];
    actions.forEach((action) => {
      const setValueInputId = `HCamSet${action}Value`;
      const moveValueInputId = `HCamMove${action}Value`;
      const moveSpeedInputId = `HCamMove${action}Speed`;
      document.getElementById(`HCamSet${action}`)?.addEventListener("click", () => {
        const input = document.getElementById(setValueInputId);
        const value = Number(input.value);
        if (action === "Focus") heatCameraSetFocus(value);
        else heatCameraSetZoom(value);
      });
      document.getElementById(`HCamMove${action}`)?.addEventListener("click", () => {
        const targetInput = document.getElementById(moveValueInputId);
        const speedInput = document.getElementById(moveSpeedInputId);
        const targetValue = Number(targetInput.value);
        const speed = Number(speedInput.value);
        if (action === "Focus") heatCameraMoveFocus(targetValue, speed);
        else heatCameraMoveZoom(targetValue, speed);
      });
      document.getElementById(`HCamHalt${action}`)?.addEventListener("click", () => {
        if (action === "Focus") heatCameraHaltFocus();
        else heatCameraHaltZoom();
      });
    });
  }
  function setupHeatCameraSettingsActions() {
    document.getElementById("HCamSetAGC")?.addEventListener("click", () => {
      const agcModeSelect = document.getElementById("HCamAGCMode");
      const input = agcModeSelect;
      const agcMode = stringToHeatCameraAgcMode(input.value);
      heatCameraSetAgc(agcMode);
    });
    document.getElementById("HCamSetFilter")?.addEventListener("click", () => {
      const filterModeSelect = document.getElementById("HCamFilterMode");
      const input = filterModeSelect;
      const filterMode = stringToHeatCameraFilter(input.value);
      heatCameraSetFilter(filterMode);
    });
    document.getElementById("HCamSetDDELevel")?.addEventListener("click", () => {
      const ddeLevelInput = document.getElementById("HCamDDELevel");
      const input = ddeLevelInput;
      const ddeLevel = Number(input.value);
      setDDELevel(ddeLevel);
    });
    setupOnOffSettingsActions();
  }
  function setupOnOffSettingsActions() {
    const settingsActions = {
      "AutoFocus": heatCameraSetAutoFocus,
      "Recording": heatCameraSetRecording,
      "SyncZoom": heatCameraSetSyncZoom
    };
    Object.entries(settingsActions).forEach(([setting, actionFunction]) => {
      document.getElementById(`HCamSet${setting}On`)?.addEventListener("click", () => actionFunction(true));
      document.getElementById(`HCamSet${setting}Off`)?.addEventListener("click", () => actionFunction(false));
    });
  }
  function createHeatCameraCard() {
    const heatCameraCard = document.createElement("div");
    heatCameraCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = [
      createSubCard("control", "Control", [
        createButton("HCamStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("HCamStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
        createButton("HCamGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamTakePhoto", "Take Photo", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamGetPos", "Get Position", "bg-yellow-500 text-white hover:bg-yellow-700"),
        createButton("HCamCalibrate", "Calibrate", "bg-yellow-500 text-white hover:bg-yellow-700")
      ]),
      createSubCard("focusControl", "Focus Control", [
        createButton("HCamFocusIn", "Focus In", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamFocusOut", "Focus Out", "bg-red-500 text-white hover:bg-red-700"),
        createButton("HCamFocusStop", "Focus Stop", "bg-yellow-500 text-white hover:bg-yellow-700"),
        createNormalizedSlider("HCamSetFocusValue", "Set Focus Value (0.0 - 1.0)"),
        createButton("HCamSetFocus", "Set Focus", "bg-green-500 text-white hover:bg-green-700"),
        createNormalizedSlider("HCamMoveFocusValue", "Move To Value (0.0 - 1.0)"),
        createNormalizedSlider("HCamMoveFocusSpeed", "Speed (0.0 - 1.0)"),
        createButton("HCamMoveFocus", "Move Focus", "bg-purple-500 text-white hover:bg-purple-700"),
        createButton("HCamFocusHalt", "Halt Focus", "bg-yellow-500 text-white hover:bg-yellow-700")
      ]),
      createSubCard("zoomControl", "Zoom Control", [
        createButton("HCamZoomIn", "Zoom In", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamZoomOut", "Zoom Out", "bg-red-500 text-white hover:bg-red-700"),
        createButton("HCamZoomStop", "Zoom Stop", "bg-yellow-500 text-white hover:bg-yellow-700"),
        createNormalizedSlider("HCamSetZoomValue (digital)", "Set Zoom Value (0.0 - 1.0)"),
        createButton("HCamSetZoom", "Set Zoom (digital)", "bg-green-500 text-white hover:bg-green-700"),
        createNormalizedSlider("HCamMoveZoomValue", "Move To Value (0.0 - 1.0)"),
        createNormalizedSlider("HCamMoveZoomSpeed", "Speed (0.0 - 1.0)"),
        createButton("HCamMoveZoom", "Move Zoom", "bg-purple-500 text-white hover:bg-purple-700"),
        createButton("HCamZoomHalt", "Halt Zoom", "bg-yellow-500 text-white hover:bg-yellow-700")
      ]),
      createSubCard("HCZoomTableControl", "Zoom Table Control", [
        createButton("HCamNextZoomTablePos", "Next Zoom Table Position", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamPrevZoomTablePos", "Previous Zoom Table Position", "bg-red-500 text-white hover:bg-red-700"),
        createInput("HCamZoomTableValue", "Enter zoom table index", "number"),
        createButton("HCamSetZoomTableValue", "Set Zoom Table Value", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("AGCMode", "AGC Mode", [
        createSelect("HCamAGCMode", ["mode_1", "mode_2", "mode_3"]),
        createButton("HCamSetAGC", "Set AGC Mode", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("DDELevel", "DDE Level", [
        createInput("HCamDDELevel", "Enter DDE Level", "number"),
        createButton("HCamSetDDELevel", "Set DDE Level", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamEnableDDE", "Enable DDE", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("HCamDisableDDE", "Disable DDE", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("FilterMode", "Filter Mode", [
        createSelect("HCamFilterMode", ["hot_black", "hot_white", "sepia"]),
        createButton("HCamSetFilter", "Set Filter Mode", "bg-green-500 text-white hover:bg-green-700")
      ]),
      createSubCard("AutoFocus", "Auto Focus", [
        createButton("HCamSetAutoFocusOn", "On", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamSetAutoFocusOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("Recording", "Recording", [
        createButton("HCamSetRecordingOn", "On", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamSetRecordingOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("SyncZoom", "Sync Zoom", [
        createButton("HCamSetSyncZoomOn", "On", "bg-green-500 text-white hover:bg-green-700"),
        createButton("HCamSetSyncZoomOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ])
    ];
    const dropdown = createDropdown("HCam-dd", subCards);
    heatCameraCard.appendChild(dropdown);
    subCards.forEach((subCard) => heatCameraCard.appendChild(subCard));
    queueMicrotask(attachEventListeners3);
    return { name: "Heat Camera", element: heatCameraCard };
  }

  // frontend/ts/cmd/cmdSender/cmdDayCamera.ts
  function dayCameraSetGain(value) {
    console.log(`Day Camera Setting gain to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setGain: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetExposure(value) {
    console.log(`Day Camera Setting exposure to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setExposure: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetInfraRedFilter(value) {
    console.log(`Day Camera Setting infra red filter to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setInfraRedFilter: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetIris(value) {
    console.log(`Day Camera Setting iris to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setIris: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetAutoIris(value) {
    console.log(`Day Camera Setting auto iris to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setAutoIris: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetSyncZoom(value) {
    console.log(`Day Camera Setting sync zoom to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ syncZoom: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetRecording(value) {
    console.log(`Day Camera Setting recording to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setRecording: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetAutoFocus(value) {
    console.log(`Day Camera Setting auto focus to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ setAutoFocus: { value } });
    sendCmdMessage(rootMsg);
  }
  function dayCameraTakePhoto() {
    console.log("Day Camera Taking photo");
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({
      photo: function() {
        return index_cmd_DayCamera_exports.Photo.create();
      }
    });
    sendCmdMessage(rootMsg);
  }
  function dayCameraStart() {
    console.log("Day Camera Sending dayCamera start");
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ start: index_cmd_DayCamera_exports.Start.create() });
    sendCmdMessage(rootMsg);
  }
  function dayCameraGetPos() {
    console.log("Day Camera Getting dayCamera position");
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ getPos: index_cmd_DayCamera_exports.GetPos.create() });
    sendCmdMessage(rootMsg);
  }
  function dayCameraStop() {
    console.log("Day Camera Sending dayCamera stop");
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ stop: index_cmd_DayCamera_exports.Stop.create() });
    sendCmdMessage(rootMsg);
  }
  function dayCameraSetFocus(value) {
    console.log(`Day Camera Setting day camera focus value to ${value}`);
    let focus = index_cmd_DayCamera_exports.Focus.create({ setValue: { value } });
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ focus });
    sendCmdMessage(rootMsg);
  }
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
  function dayCameraSetZoom(value) {
    console.log(`Day Camera Setting day camera zoom value to ${value}`);
    let zoom = index_cmd_DayCamera_exports.Zoom.create({ setValue: { value } });
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ zoom });
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
  function dayCameraSetZoomTableValue(value) {
    console.log(`Day Camera Setting optical zoom table value to ${value}`);
    let rootMsg = createRootMessage();
    let zoom = index_cmd_DayCamera_exports.Zoom.create({ setZoomTableValue: { value } });
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function dayCameraNextZoomTablePos() {
    console.log(`Day Camera Setting next optical zoom table position`);
    let rootMsg = createRootMessage();
    let zoom = index_cmd_DayCamera_exports.Zoom.create({ nextZoomTablePos: {} });
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function dayCameraPrevZoomTablePos() {
    console.log(`Day Camera Setting previous optical zoom table position`);
    let rootMsg = createRootMessage();
    let zoom = index_cmd_DayCamera_exports.Zoom.create({ prevZoomTablePos: {} });
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ zoom });
    sendCmdMessage(rootMsg);
  }
  function getMeteo6() {
    console.log("Requesting camera day meteo data");
    let rootMsg = createRootMessage();
    rootMsg.dayCamera = index_cmd_DayCamera_exports.Root.create({ getMeteo: index_cmd_DayCamera_exports.GetMeteo.create() });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdDayCameraCard.ts
  function attachDayCameraEventListeners() {
    document.getElementById("DCamStart")?.addEventListener("click", dayCameraStart);
    document.getElementById("DCamStop")?.addEventListener("click", dayCameraStop);
    document.getElementById("DCamGetMeteo")?.addEventListener("click", getMeteo6);
    document.getElementById("DCamTakePhoto")?.addEventListener("click", dayCameraTakePhoto);
    document.getElementById("DCamSetFocus")?.addEventListener("click", () => dayCameraSetFocus(parseFloat(document.getElementById("DCamFocusValue").value)));
    document.getElementById("DCamGetPos")?.addEventListener("click", () => dayCameraGetPos());
    document.getElementById("DCamMoveFocus")?.addEventListener("click", () => dayCameraMoveFocus(
      parseFloat(document.getElementById("DCamFocusTargetValue").value),
      parseFloat(document.getElementById("DCamFocusSpeedValue").value)
    ));
    document.getElementById("DCamHaltFocus")?.addEventListener("click", dayCameraHaltFocus);
    document.getElementById("DCamSetZoom")?.addEventListener("click", () => dayCameraSetZoom(parseFloat(document.getElementById("DCamZoomValue").value)));
    document.getElementById("DCamMoveZoom")?.addEventListener("click", () => dayCameraMoveZoom(
      parseFloat(document.getElementById("DCamZoomTargetValue").value),
      parseFloat(document.getElementById("DCamZoomSpeedValue").value)
    ));
    document.getElementById("DCamHaltZoom")?.addEventListener("click", dayCameraHaltZoom);
    document.getElementById("DCamSetExposure")?.addEventListener("click", () => dayCameraSetExposure(parseFloat(document.getElementById("DCamExposureValue").value)));
    document.getElementById("DCamSetGain")?.addEventListener("click", () => dayCameraSetGain(parseFloat(document.getElementById("DCamGainValue").value)));
    document.getElementById("DCamSetIris")?.addEventListener("click", () => dayCameraSetIris(parseFloat(document.getElementById("DCamIrisValue").value)));
    document.getElementById("DCamSetAutoFocusOn")?.addEventListener("click", () => {
      dayCameraSetAutoFocus(true);
    });
    document.getElementById("DCamSetAutoFocusOff")?.addEventListener("click", () => {
      dayCameraSetAutoFocus(false);
    });
    document.getElementById("DCamSetRecordingOn")?.addEventListener("click", () => {
      dayCameraSetRecording(true);
    });
    document.getElementById("DCamSetRecordingOff")?.addEventListener("click", () => {
      dayCameraSetRecording(false);
    });
    document.getElementById("DCamSetInfraRedFilterOn")?.addEventListener("click", () => {
      dayCameraSetInfraRedFilter(true);
    });
    document.getElementById("DCamSetInfraRedFilterOff")?.addEventListener("click", () => {
      dayCameraSetInfraRedFilter(false);
    });
    document.getElementById("DCamSetAutoIrisOn")?.addEventListener("click", () => {
      dayCameraSetAutoIris(true);
    });
    document.getElementById("DCamSetAutoIrisOff")?.addEventListener("click", () => {
      dayCameraSetAutoIris(false);
    });
    document.getElementById("DCamSetSyncZoomOn")?.addEventListener("click", () => {
      dayCameraSetSyncZoom(true);
    });
    document.getElementById("DCamSetSyncZoomOff")?.addEventListener("click", () => {
      dayCameraSetSyncZoom(false);
    });
    document.getElementById("DCamSetZoomTableValue")?.addEventListener("click", () => {
      const input = document.getElementById("DCamZoomTableValue");
      const value = Number(input.value);
      dayCameraSetZoomTableValue(value);
    });
    document.getElementById("DCamNextZoomTablePos")?.addEventListener("click", () => {
      dayCameraNextZoomTablePos();
    });
    document.getElementById("DCamPrevZoomTablePos")?.addEventListener("click", () => {
      dayCameraPrevZoomTablePos();
    });
  }
  function createDayCameraCard() {
    const dayCameraCard = document.createElement("div");
    dayCameraCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = [
      createSubCard("DCamControls", "Controls", [
        createButton("DCamStart", "Start", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("DCamStop", "Stop", "bg-red-500 text-white hover:bg-red-700"),
        createButton("DCamGetMeteo", "Get Meteo", "bg-green-500 text-white hover:bg-green-700"),
        createButton("DCamTakePhoto", "Take Photo", "bg-green-500 text-white hover:bg-green-700"),
        createButton("DCamGetPos", "Get Position", "bg-yellow-500 text-white hover:bg-yellow-700")
      ]),
      createSubCard("DCamFocusSettings", "Focus", [
        createNormalizedSlider("DCamFocusValue", "Set Focus Value (0.0 - 1.0)"),
        createButton("DCamSetFocus", "Set Focus", "bg-blue-500 text-white hover:bg-blue-700"),
        createNormalizedSlider("DCamFocusTargetValue", "Move Focus Target Value (0.0 - 1.0)"),
        createNormalizedSlider("DCamFocusSpeedValue", "Move Focus Speed (0.0 - 1.0)"),
        createButton("DCamMoveFocus", "Move Focus", "bg-orange-500 text-white hover:bg-orange-700"),
        createButton("DCamHaltFocus", "Halt Focus", "bg-yellow-500 text-white hover:bg-yellow-700")
      ]),
      createSubCard("DCamZoomSettings", "Zoom", [
        createNormalizedSlider("DCamZoomValue", "Set Zoom Value (0.0 - 1.0)"),
        createButton("DCamSetZoom", "Set Zoom", "bg-blue-500 text-white hover:bg-blue-700"),
        createNormalizedSlider("DCamZoomTargetValue", "Move Zoom Target Value (0.0 - 1.0)"),
        createNormalizedSlider("DCamZoomSpeedValue", "Move Zoom Speed (0.0 - 1.0)"),
        createButton("DCamMoveZoom", "Move Zoom", "bg-orange-500 text-white hover:bg-orange-700"),
        createButton("DCamHaltZoom", "Halt Zoom", "bg-yellow-500 text-white hover:bg-yellow-700")
      ]),
      createSubCard("DCamImageSettings", "Image Settings", [
        createInput("DCamExposureValue", "Set Exposure (0.0 - 1.0)", "DCamSetExposure"),
        createButton("DCamSetExposure", "Set Exposure", "bg-purple-500 text-white hover:bg-purple-700"),
        createInput("DCamGainValue", "Set Gain (0.0 - 1.0)", "DCamSetGain"),
        createButton("DCamSetGain", "Set Gain", "bg-green-500 text-white hover:bg-purple-700"),
        createInput("DCamIrisValue", "Set Iris (0.0 - 1.0)", "DCamSetIris"),
        createButton("DCamSetIris", "Set Iris", "bg-yellow-500 text-white hover:bg-purple-700")
      ]),
      createSubCard("DCamAutoFocusSettings", "Auto Focus", [
        createButton("DCamSetAutoFocusOn", "On", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("DCamSetAutoFocusOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("DCamRecordingSettings", "Recording", [
        createButton("DCamSetRecordingOn", "On", "bg-green-500 text-white hover:bg-green-700"),
        createButton("DCamSetRecordingOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("DCamInfraRedFilterSettings", "Infra-Red Filter", [
        createButton("DCamSetInfraRedFilterOn", "On", "bg-green-500 text-white hover:bg-green-700"),
        createButton("DCamSetInfraRedFilterOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("DCamAutoIrisSettings", "Auto Iris", [
        createButton("DCamSetAutoIrisOn", "On", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("DCamSetAutoIrisOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("DCamSyncZoomSettings", "Sync Zoom", [
        createButton("DCamSetSyncZoomOn", "On", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("DCamSetSyncZoomOff", "Off", "bg-red-500 text-white hover:bg-red-700")
      ]),
      createSubCard("DCZoomTableControl", "Zoom Table Control", [
        createButton("DCamNextZoomTablePos", "Next Zoom Table Position", "bg-blue-500 text-white hover:bg-blue-700"),
        createButton("DCamPrevZoomTablePos", "Previous Zoom Table Position", "bg-red-500 text-white hover:bg-red-700"),
        createInput("DCamZoomTableValue", "Enter zoom table index", "number"),
        createButton("DCamSetZoomTableValue", "Set Zoom Table Value", "bg-green-500 text-white hover:bg-green-700")
      ])
    ];
    const dropdown = createDropdown("DCam-dd", subCards);
    dayCameraCard.appendChild(dropdown);
    subCards.forEach((subCard) => dayCameraCard.appendChild(subCard));
    queueMicrotask(attachDayCameraEventListeners);
    return { name: "Day Camera", element: dayCameraCard };
  }

  // frontend/ts/cmd/cmdSender/cmdEnvironment.ts
  function stringToWeatherCondition(value) {
    switch (value.toLowerCase()) {
      case "clear":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_CLEAR */;
      case "cloudy":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_CLOUDY */;
      case "foggy":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_FOGGY */;
      case "hazy":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_HAZY */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_WEATHER_UNSPECIFIED */;
    }
  }
  function stringToLightingCondition(value) {
    switch (value.toLowerCase()) {
      case "day":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAY */;
      case "night":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_NIGHT */;
      case "dusk":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DUSK */;
      case "dawn":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_DAWN */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_LIGHTING_UNSPECIFIED */;
    }
  }
  function stringToPrecipitationType(value) {
    switch (value.toLowerCase()) {
      case "none":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_NONE */;
      case "rain":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_RAIN */;
      case "snow":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_SNOW */;
      case "sleet":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_SLEET */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_PRECIP_UNSPECIFIED */;
    }
  }
  function stringToGroundCondition(value) {
    switch (value.toLowerCase()) {
      case "dry":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_GROUND_DRY */;
      case "wet":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_GROUND_WET */;
      case "snowy":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_GROUND_SNOWY */;
      case "icy":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_GROUND_ICY */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_GROUND_UNSPECIFIED */;
    }
  }
  function stringToOpticalVisibility(value) {
    switch (value.toLowerCase()) {
      case "highcontrast":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_HIGH_CONTRAST */;
      case "lowcontrast":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_LOW_CONTRAST */;
      case "glare":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_GLARE */;
      case "shadow":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_SHADOW */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_OPTICAL_VISIBILITY_UNSPECIFIED */;
    }
  }
  function stringToThermalCondition(value) {
    switch (value.toLowerCase()) {
      case "highheatcontrast":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_HIGH_HEAT_CONTRAST */;
      case "lowheatcontrast":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_LOW_HEAT_CONTRAST */;
      case "ambientwarm":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_WARM */;
      case "ambientcold":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_AMBIENT_COLD */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_THERMAL_UNSPECIFIED */;
    }
  }
  function stringToNetworkStatus(value) {
    switch (value.toLowerCase()) {
      case "disconnected":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_DISCONNECTED */;
      case "flaky":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_FLAKY */;
      case "lowbandwidth":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_LOW_BANDWIDTH */;
      case "mediumbandwidth":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_MEDIUM_BANDWIDTH */;
      case "lan":
        return 5 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_LAN */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_NETWORK_UNSPECIFIED */;
    }
  }
  function stringToLightSourceCondition(value) {
    switch (value.toLowerCase()) {
      case "none":
        return 1 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_NONE */;
      case "fullmoon":
        return 2 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_FULL_MOON */;
      case "starrynight":
        return 3 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_STARRY_NIGHT */;
      case "sunabove":
        return 4 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_ABOVE */;
      case "sunfront":
        return 5 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_FRONT */;
      case "sunbehind":
        return 6 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_SUN_BEHIND */;
      case "diffusedstrong":
        return 7 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_STRONG */;
      case "diffusedweak":
        return 8 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_DIFFUSED_WEAK */;
      case "projector":
        return 9 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_PROJECTOR */;
      case "littarget":
        return 10 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_LIT_TARGET */;
      default:
        return 0 /* JON_GUI_DATA_ENVIRONMENT_LIGHT_SOURCE_UNSPECIFIED */;
    }
  }
  function environmentSetWeatherCondition(value) {
    console.log(`Setting weather condition to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setWeatherCondition: index_cmd_Environment_exports.SetWeatherCondition.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetLightingCondition(value) {
    console.log(`Setting lighting condition to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setLightingCondition: index_cmd_Environment_exports.SetLightingCondition.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetPrecipitationType(value) {
    console.log(`Setting precipitation type to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setPrecipitationType: index_cmd_Environment_exports.SetPrecipitationType.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetGroundCondition(value) {
    console.log(`Setting ground condition to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setGroundCondition: index_cmd_Environment_exports.SetGroundCondition.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetOpticalVisibility(value) {
    console.log(`Setting optical visibility to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setOpticalVisibility: index_cmd_Environment_exports.SetOpticalVisibility.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetThermalCondition(value) {
    console.log(`Setting thermal condition to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setThermalCondition: index_cmd_Environment_exports.SetThermalCondition.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetNetworkStatus(value) {
    console.log(`Setting network status to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setNetworkStatus: index_cmd_Environment_exports.SetNetworkStatus.create({ value }) });
    sendCmdMessage(rootMsg);
  }
  function environmentSetLightSourceCondition(value) {
    console.log(`Setting light source condition to ${value}`);
    let rootMsg = createRootMessage();
    rootMsg.environment = index_cmd_Environment_exports.Root.create({ setLightSourceCondition: index_cmd_Environment_exports.SetLightSourceCondition.create({ value }) });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdEnvironmentCard.ts
  var environmentOptions = {
    Weather: ["Unspecified", "Clear", "Cloudy", "Foggy", "Hazy"],
    Lighting: ["Unspecified", "Day", "Night", "Dusk", "Dawn"],
    Precipitation: ["Unspecified", "None", "Rain", "Snow", "Sleet"],
    Ground: ["Unspecified", "Dry", "Wet", "Snowy", "Icy"],
    Visibility: ["Unspecified", "High Contrast", "Low Contrast", "Glare", "Shadow"],
    Thermal: ["Unspecified", "High Heat Contrast", "Low Heat Contrast", "Ambient Warm", "Ambient Cold"],
    Network: ["Unspecified", "Disconnected", "Flaky", "Low Bandwidth", "Medium Bandwidth", "LAN"],
    LightSource: ["Unspecified", "None", "Full Moon", "Starry Night", "Sun Above", "Sun Front", "Sun Behind", "Diffused Strong", "Diffused Weak", "Projector", "Lit Target"]
  };
  function setupEnvironmentSettingsActions() {
    Object.keys(environmentOptions).forEach((key) => {
      const buttonId = `Set${key}`;
      const selectId = `Select${key}`;
      document.getElementById(buttonId)?.addEventListener("click", () => {
        const selectElement = document.getElementById(selectId);
        const value = selectElement.value;
        switch (key) {
          case "Weather":
            environmentSetWeatherCondition(stringToWeatherCondition(value));
            break;
          case "Lighting":
            environmentSetLightingCondition(stringToLightingCondition(value));
            break;
          case "Precipitation":
            environmentSetPrecipitationType(stringToPrecipitationType(value));
            break;
          case "Ground":
            environmentSetGroundCondition(stringToGroundCondition(value));
            break;
          case "Visibility":
            environmentSetOpticalVisibility(stringToOpticalVisibility(value));
            break;
          case "Thermal":
            environmentSetThermalCondition(stringToThermalCondition(value));
            break;
          case "Network":
            environmentSetNetworkStatus(stringToNetworkStatus(value));
            break;
          case "LightSource":
            environmentSetLightSourceCondition(stringToLightSourceCondition(value));
            break;
          default:
            console.error("Invalid environment setting");
        }
      });
    });
  }
  function createEnvironmentSettingsCard() {
    const environmentCard = document.createElement("div");
    environmentCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = Object.entries(environmentOptions).map(([key, options]) => {
      const select = createSelect(`Select${key}`, options);
      const button = createButton(`Set${key}`, `Set ${key}`, "bg-blue-500 text-white hover:bg-blue-700");
      return createSubCard(key, `${key} Condition`, [select, button]);
    });
    subCards.forEach((subCard) => environmentCard.appendChild(subCard));
    queueMicrotask(setupEnvironmentSettingsActions);
    return { name: "Environment Settings", element: environmentCard };
  }

  // frontend/ts/cmd/cmdSender/cmdGeoTest.ts
  function GeoTestSend(args) {
    console.log("Sending GeoTest with data ", args);
    let rootMsg = createRootMessage();
    rootMsg.geoTest = index_cmd_GeoTest_exports.Root.create({
      longitude: args.longitude ?? 0,
      latitude: args.latitude ?? 0,
      altitude: args.altitude ?? 0,
      range: args.range ?? 0,
      azimuth: args.azimuth ?? 0,
      elevation: args.elevation ?? 0,
      bank: args.bank ?? 0
    });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdGeoTestCard.ts
  function attachGeoTestEventListeners() {
    const longitudeInput = document.getElementById("geoTest_longitudeValue");
    const latitudeInput = document.getElementById("geoTest_latitudeValue");
    const altitudeInput = document.getElementById("geoTest_altitudeValue");
    const rangeInput = document.getElementById("geoTest_rangeValue");
    const azimuthInput = document.getElementById("geoTest_azimuthValue");
    const elevationInput = document.getElementById("geoTest_elevationValue");
    const bankInput = document.getElementById("geoTest_bankValue");
    document.getElementById("geoTest_sendGeoTestButton")?.addEventListener("click", () => {
      GeoTestSend({
        longitude: longitudeInput.value ? Number(longitudeInput.value) : void 0,
        latitude: latitudeInput.value ? Number(latitudeInput.value) : void 0,
        altitude: altitudeInput.value ? Number(altitudeInput.value) : void 0,
        range: rangeInput.value ? Number(rangeInput.value) : void 0,
        azimuth: azimuthInput.value ? Number(azimuthInput.value) : void 0,
        elevation: elevationInput.value ? Number(elevationInput.value) : void 0,
        bank: bankInput.value ? Number(bankInput.value) : void 0
      });
    });
    document.getElementById("geoTest_newSessionButton")?.addEventListener("click", lrfNewSession);
  }
  function createGeoTestCard() {
    const geoTestCard = document.createElement("div");
    geoTestCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const subCards = [
      createSubCard("geoTestFull", "Full Geo Data", [
        createInput("geoTest_longitudeValue", "Longitude"),
        createInput("geoTest_latitudeValue", "Latitude"),
        createInput("geoTest_altitudeValue", "Altitude"),
        createInput("geoTest_rangeValue", "Range"),
        createInput("geoTest_azimuthValue", "Azimuth"),
        createInput("geoTest_elevationValue", "Elevation"),
        createInput("geoTest_bankValue", "Bank"),
        createButton("geoTest_sendGeoTestButton", "Send Geo Test", "bg-blue-500 text-white hover:bg-blue-700")
      ]),
      createSubCard("geoTestSess", "New Session", [
        createButton("geoTest_newSessionButton", "New Session", "bg-green-500 text-white hover:bg-green-700")
      ])
    ];
    const dropdown = createDropdown("geoTest_geo-test-dd", subCards);
    geoTestCard.appendChild(dropdown);
    subCards.forEach((subCard) => geoTestCard.appendChild(subCard));
    queueMicrotask(attachGeoTestEventListeners);
    return { name: "Fake LRF measurements", element: geoTestCard };
  }

  // frontend/ts/cmd/cmdSender/cmdPower.ts
  function stringToPowerCanDevice(value) {
    switch (value) {
      case "compass":
        return 2 /* JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS */;
      case "gps":
        return 3 /* JON_GUI_DATA_POWER_CAN_DEVICE_GPS */;
      case "cam_day":
        return 4 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY */;
      case "cam_heat":
        return 5 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT */;
      case "lrf":
        return 6 /* JON_GUI_DATA_POWER_CAN_DEVICE_LRF */;
      case "none":
        return 1 /* JON_GUI_DATA_POWER_CAN_DEVICE_NONE */;
      default:
        return 0 /* JON_GUI_DATA_POWER_CAN_DEVICE_UNSPECIFIED */;
    }
  }
  function powerCanDeviceToString(device) {
    switch (device) {
      case 2 /* JON_GUI_DATA_POWER_CAN_DEVICE_COMPASS */:
        return "Compass";
      case 3 /* JON_GUI_DATA_POWER_CAN_DEVICE_GPS */:
        return "GPS";
      case 4 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_DAY */:
        return "Day Camera";
      case 5 /* JON_GUI_DATA_POWER_CAN_DEVICE_CAM_HEAT */:
        return "Heat Camera";
      case 6 /* JON_GUI_DATA_POWER_CAN_DEVICE_LRF */:
        return "LRF";
      case 1 /* JON_GUI_DATA_POWER_CAN_DEVICE_NONE */:
        return "None";
      default:
        return "Unspecified";
    }
  }
  function PowerPowerOn(device) {
    console.log(`Powering on ${powerCanDeviceToString(device)}`);
    let powerOn = index_cmd_Power_exports.PowerOn.create();
    let pld = index_cmd_Power_exports.SetDeviceState.create({ powerOn, device });
    let rootMsg = createRootMessage();
    rootMsg.power = index_cmd_Power_exports.Root.create({ setDeviceState: pld });
    sendCmdMessage(rootMsg);
  }
  function PowerPowerOff(device) {
    console.log(`Powering off ${powerCanDeviceToString(device)}`);
    let powerOff = index_cmd_Power_exports.PowerOff.create();
    let pld = index_cmd_Power_exports.SetDeviceState.create({ powerOff, device });
    let rootMsg = createRootMessage();
    rootMsg.power = index_cmd_Power_exports.Root.create({ setDeviceState: pld });
    sendCmdMessage(rootMsg);
  }
  function PowerPowerReset(device) {
    console.log(`Resetting power ${powerCanDeviceToString(device)}`);
    let powerReset = index_cmd_Power_exports.PowerReset.create();
    let pld = index_cmd_Power_exports.SetDeviceState.create({ powerReset, device });
    let rootMsg = createRootMessage();
    rootMsg.power = index_cmd_Power_exports.Root.create({ setDeviceState: pld });
    sendCmdMessage(rootMsg);
  }
  function PowerCanOn(device) {
    console.log(`CAN on ${powerCanDeviceToString(device)}`);
    let canOn = index_cmd_Power_exports.CanOn.create();
    let pld = index_cmd_Power_exports.SetDeviceState.create({ canOn, device });
    let rootMsg = createRootMessage();
    rootMsg.power = index_cmd_Power_exports.Root.create({ setDeviceState: pld });
    sendCmdMessage(rootMsg);
  }
  function PowerCanOff(device) {
    console.log(`CAN off ${powerCanDeviceToString(device)}`);
    let canOff = index_cmd_Power_exports.CanOff.create();
    let pld = index_cmd_Power_exports.SetDeviceState.create({ canOff, device });
    let rootMsg = createRootMessage();
    rootMsg.power = index_cmd_Power_exports.Root.create({ setDeviceState: pld });
    sendCmdMessage(rootMsg);
  }
  function PowerCanReset(device) {
    console.log(`CAN reset ${powerCanDeviceToString(device)}`);
    let canReset = index_cmd_Power_exports.CanReset.create();
    let pld = index_cmd_Power_exports.SetDeviceState.create({ canReset, device });
    let rootMsg = createRootMessage();
    rootMsg.power = index_cmd_Power_exports.Root.create({ setDeviceState: pld });
    sendCmdMessage(rootMsg);
  }

  // frontend/ts/cmd/cmdWindow/cards/cmdPowerCard.ts
  function attachEventListeners4() {
    const deviceSelect = document.getElementById("powerDeviceSelect");
    const actionSelect = document.getElementById("powerActionSelect");
    document.getElementById("executeActionButton")?.addEventListener("click", () => {
      const device = stringToPowerCanDevice(deviceSelect.value);
      const action = actionSelect.value;
      switch (action) {
        case "poweron":
          PowerPowerOn(device);
          break;
        case "poweroff":
          PowerPowerOff(device);
          break;
        case "powerreset":
          PowerPowerReset(device);
          break;
        case "canon":
          PowerCanOn(device);
          break;
        case "canoff":
          PowerCanOff(device);
          break;
        case "canreset":
          PowerCanReset(device);
          break;
        default:
          console.error("Unknown action:", action);
      }
    });
  }
  function createPowerControlCard() {
    const powerControlCard = document.createElement("div");
    powerControlCard.className = "p-4 bg-white rounded-lg shadow-md space-y-4 mt-4";
    const deviceOptions = [
      "compass",
      "gps",
      "cam_day",
      "cam_heat",
      "lrf",
      "none"
    ];
    const actionOptions = [
      "Power On",
      "Power Off",
      "Power Reset",
      "CAN On",
      "CAN Off",
      "CAN Reset"
    ];
    const subCards = [
      createSubCard("deviceControl", "Device Control", [
        createSelect("powerDeviceSelect", deviceOptions),
        createRowSeparator(),
        createSelect("powerActionSelect", actionOptions),
        createRowSeparator(),
        createButton("executeActionButton", "Execute Action", "bg-blue-500 text-white hover:bg-blue-700")
      ])
    ];
    const dropdown = createDropdown("power-control-dd", subCards);
    powerControlCard.appendChild(dropdown);
    subCards.forEach((subCard) => powerControlCard.appendChild(subCard));
    queueMicrotask(attachEventListeners4);
    return { name: "Power Control", element: powerControlCard };
  }

  // frontend/ts/cmd/cmdWindow/createDemoCmd.ts
  var nextLayout = () => {
  };
  var cardCreators = [
    createGpsCard,
    createCompassCard,
    createHeatCameraCard,
    createDayCameraCard,
    createSystemCard,
    () => createOSDCard({ nextLayout }),
    createRotaryCard,
    createLrfCard,
    createEnvironmentSettingsCard,
    createGeoTestCard,
    createPowerControlCard
  ];
  function displayCards(cardCreators2) {
    const container = document.getElementById("cards-container");
    if (!container) {
      console.error("Card container not found");
      return;
    }
    cardCreators2.forEach((create) => {
      const card = create();
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("card-wrapper");
      const header = document.createElement("h3");
      header.textContent = card.name;
      header.classList.add("card-header");
      cardWrapper.appendChild(header);
      cardWrapper.appendChild(card.element);
      cardWrapper.style.marginBottom = "20px";
      container.appendChild(cardWrapper);
    });
  }
  function initCards(opts) {
    nextLayout = opts.nextLayout;
    displayCards(cardCreators);
  }

  // frontend/ts/ctl_app.ts
  document.addEventListener("DOMContentLoaded", function() {
    initCards({ nextLayout: () => {
      window.alert("nextLayout not implemented, use controller or simply tap on video!");
    } });
    let wscm = new WebSocketConnectionManager();
    wscm.startWebSocketWorker("wss://sych.app/ws/ws_cmd", "cmd", "deviceState");
    setInterval(() => {
      if (document.visibilityState === "visible" && document.hasFocus()) {
        sendCmdPing();
      }
    }, 300);
  });
})();
