"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputWidget = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InputWidget = function InputWidget(props) {
  var _ui$allowClear;

  var ui = props.ui,
      record = props.record,
      dataIndex = props.dataIndex,
      tableModel = props.tableModel,
      value = props.value;

  var onChange = function onChange(e) {
    var value = e.target.value;
    tableModel.edit(record, dataIndex, value);
  };

  return /*#__PURE__*/_react.default.createElement(_antd.Input, _extends({}, ui, {
    className: "cell-input",
    value: value,
    onChange: onChange,
    autoFocus: true,
    allowClear: (_ui$allowClear = ui.allowClear) !== null && _ui$allowClear !== void 0 ? _ui$allowClear : true
  }));
};

exports.InputWidget = InputWidget;