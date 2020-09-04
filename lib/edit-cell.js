"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCell = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _classnames = _interopRequireDefault(require("classnames"));

var _registry = require("./widget/registry");

var _lodash = _interopRequireDefault(require("lodash"));

var _tools = require("./tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    cursor: text;\n    .cell-mask {\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        &.active {\n            position: fixed;\n            z-index: 1000;\n        }\n        &.active + .cell {\n            position: relative;\n            z-index: 1001;\n        }\n    }\n    .cell {\n        outline: 0;\n    }\n    .cell-input {\n        width: 100%;\n        max-width: 200px;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EditCell = function EditCell(props) {
  var tableModel = _react.default.useContext(_tools.TableContext);

  var col = props.col,
      record = props.record;
  var editable = typeof col.editable === "function" ? col.editable.call(tableModel, record) : col.editable;

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      inEdit = _React$useState2[0],
      setInEdit = _React$useState2[1];

  _react.default.useEffect(function () {
    setInEdit(false);
    document.body.style.removeProperty("overflow");
  }, [tableModel.editId]);

  var onFocus = function onFocus() {
    setInEdit(true);
    document.body.style.setProperty("overflow", "hidden");
  };

  var clickMask = function clickMask() {
    setInEdit(false);
    document.body.style.removeProperty("overflow");
  };

  var Widget = _registry.widgetRegistry.get((editable === null || editable === void 0 ? void 0 : editable.widget) || "");

  return /*#__PURE__*/_react.default.createElement(Div, null, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)({
      "cell-mask": true,
      "active": inEdit
    }),
    onClick: clickMask
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "cell",
    onClick: onFocus
  }, inEdit ? /*#__PURE__*/_react.default.createElement(Widget, {
    ui: editable,
    dataIndex: col.dataIndex,
    value: _lodash.default.get(record, col.dataIndex),
    record: record,
    tableModel: tableModel
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.children)));
};

exports.EditCell = EditCell;

var Div = _styledComponents.default.div(_templateObject());