"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayColumns = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _tools = require("./tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DisplayColumns = function DisplayColumns() {
  var tableModel = _react.default.useContext(_tools.TableContext);

  var displayColumns = tableModel.displayColumns,
      allColumns = tableModel.allColumns;

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var clickMenuItem = function clickMenuItem(item) {
    tableModel.toggleDisplay(item);
  };

  var DropdownOverlay = /*#__PURE__*/_react.default.createElement(_antd.Menu, {
    onClick: function onClick() {
      return setVisible(true);
    }
  }, allColumns.map(function (e) {
    return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      key: e.$$id,
      onClick: function onClick() {
        return clickMenuItem(e.$$id);
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
      checked: displayColumns.includes(e.$$id),
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, e.title));
  }));

  return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    className: "display-columns",
    onVisibleChange: function onVisibleChange(b) {
      return setVisible(b);
    },
    visible: visible,
    overlay: DropdownOverlay
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link"
  }, "\u9009\u62E9\u663E\u793A\u5217"));
};

exports.DisplayColumns = DisplayColumns;