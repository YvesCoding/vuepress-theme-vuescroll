"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = registry;
exports.default = void 0;
var baseOptions = {
  ops: {
    bar: {
      background: '#3eaf7c'
    },
    scrollPanel: {
      scrollingX: false
    }
  }
};
var _default = baseOptions;
exports.default = _default;

function registry() {
  var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseOptions.ops;
  var mode = arguments.length > 1 ? arguments[1] : undefined;
  baseOptions.ops = ops;
  baseOptions.mode = mode;
}