"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberWidget = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NumberWidget = function NumberWidget(props) {
  var ui = props.ui,
      record = props.record,
      dataIndex = props.dataIndex,
      tableModel = props.tableModel,
      value = props.value;

  var onChange = function onChange(val) {
    tableModel.edit(record, dataIndex, val);
  };

  return /*#__PURE__*/_react.default.createElement(_antd.InputNumber, _extends({}, ui, {
    className: "cell-input",
    value: value,
    onChange: onChange,
    autoFocus: true
  }));
};

exports.NumberWidget = NumberWidget;