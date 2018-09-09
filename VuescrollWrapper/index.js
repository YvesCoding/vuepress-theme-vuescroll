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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// It is not yet time to use Vuex to manage the global state
// singleton object as a global store.
var state = {
  disableScrollBehavior: false
};
var _default = state;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  methods: {
    handleVueScroll: (0, _lodash.default)(function (scrollTop) {
      this._setActiveHash(scrollTop);
    }, 300),
    _setActiveHash: function _setActiveHash(scrollTop) {
      var _this = this;

      if (_store.default.specifyAuthor) {
        _store.default.disableScrollBehavior = true;
        this.$router.replace(decodeURIComponent(_store.default.specifyAuthor), function () {
          // execute after scrollBehavior handler.
          _this.$nextTick(function () {
            _store.default.disableScrollBehavior = false;
          });
        }, function () {
          // execute after scrollBehavior handler.
          _this.$nextTick(function () {
            _store.default.disableScrollBehavior = false;
          });
        });
        return;
      }

      var sidebarLinks = [].slice.call(document.querySelectorAll('.sidebar-link'));
      var anchors = [].slice.call(document.querySelectorAll('.header-anchor')).filter(function (anchor) {
        return sidebarLinks.some(function (sidebarLink) {
          return sidebarLink.hash === anchor.hash;
        });
      });

      for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        var nextAnchor = anchors[i + 1];
        var isActive = i === 0 && scrollTop === 0 || scrollTop >= anchor.parentElement.offsetTop + 10 && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10);

        if (isActive && decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor.hash)) {
          _store.default.disableScrollBehavior = true;
          this.$router.replace(decodeURIComponent(anchor.hash), function () {
            // execute after scrollBehavior handler.
            _this.$nextTick(function () {
              _store.default.disableScrollBehavior = false;
            });
          });
          return;
        }
      }
    }
  }
};
exports.default = _default;
