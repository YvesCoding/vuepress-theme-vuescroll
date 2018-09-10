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
    rail: {
      gutterOfEnds: '60px'
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
  baseOptions.ops = ops;
}