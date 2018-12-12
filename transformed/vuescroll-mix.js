"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isIos() {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

var _default = {
  methods: {
    handleVueScroll: (0, _lodash.default)(function (scrollTop) {
      this._setActiveHash(scrollTop);
    }, 300),
    _setActiveHash: function _setActiveHash(scrollTop) {
      var _this = this;

      if (isIos()) return;

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