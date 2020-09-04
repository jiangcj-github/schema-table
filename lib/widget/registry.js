"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgetRegistry = void 0;

var _input = require("./input");

var _select = require("./select");

var _number = require("./number");

var _switch = require("./switch");

var _datepicker = require("./datepicker");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WidgetRegistry = /*#__PURE__*/function () {
  function WidgetRegistry() {
    _classCallCheck(this, WidgetRegistry);

    this._map = [];
  }

  _createClass(WidgetRegistry, [{
    key: "registry",
    value: function registry(name, widget) {
      this._map[name] = widget;
    }
  }, {
    key: "setDefault",
    value: function setDefault(widget) {
      this._default = widget;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this._map[name] || this._default;
    }
  }]);

  return WidgetRegistry;
}();

var widgetRegistry = new WidgetRegistry();
exports.widgetRegistry = widgetRegistry;
widgetRegistry.registry("input", _input.InputWidget);
widgetRegistry.registry("select", _select.SelectWidget);
widgetRegistry.registry("number", _number.NumberWidget);
widgetRegistry.registry("switch", _switch.SwitchWidget);
widgetRegistry.registry("datepicker", _datepicker.DatePickerWidget);
widgetRegistry.setDefault(_input.InputWidget);