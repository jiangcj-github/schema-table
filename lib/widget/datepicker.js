"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerWidget = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DatePickerWidget = function DatePickerWidget(props) {
  var _ui$allowClear;

  var ui = props.ui,
      record = props.record,
      dataIndex = props.dataIndex,
      tableModel = props.tableModel,
      value = props.value;

  ui.toVal = ui.toVal || function (moment) {
    return moment.valueOf();
  };

  ui.formVal = ui.formVal || function (val) {
    return (0, _moment.default)(val);
  };

  var onChange = function onChange(moment) {
    var value = moment ? ui.toVal(moment) : undefined;
    tableModel.edit(record, dataIndex, value);
  };

  var _value = value ? ui.formVal(value) : null;

  return /*#__PURE__*/_react.default.createElement(_antd.DatePicker, _extends({}, ui, {
    value: _value,
    onChange: onChange,
    autoFocus: true,
    allowClear: (_ui$allowClear = ui.allowClear) !== null && _ui$allowClear !== void 0 ? _ui$allowClear : true
  }));
};

exports.DatePickerWidget = DatePickerWidget;