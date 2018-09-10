"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = registry;
exports.default = void 0;

var _vuescroll = _interopRequireDefault(require("vuescroll"));

var _vuescrollMix = _interopRequireDefault(require("./vuescroll-mix"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ops = {
  bar: {
    background: '#3eaf7c'
  },
  rail: {
    gutterOfEnds: '60px'
  },
  scrollPanel: {
    scrollingX: false
  }
};
var _default = _ops;
exports.default = _default;

function registry(_ref) {
  var Vue = _ref.Vue,
      router = _ref.router;
  var ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ops;
  Vue.use(_vuescroll.default);
  Vue.mixin(_vuescrollMix.default);
  router.afterEach(function (to, from) {
    if (!Vue.prototype.$isServer) {
      if (window.vs && !_store.default.disableScrollBehavior) {
        var y;

        if (!to.hash) {
          y = 0;
        } else {
          y = document.querySelector(to.hash).offsetTop;
        }

        window.vs.scrollTo({
          y: y
        });
        _store.default.specifyAuthor = to.hash;
      }
    }
  });
  _ops = ops;
}