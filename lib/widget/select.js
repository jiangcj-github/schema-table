"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectWidget = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _pinyinMatch = require("pinyin-match");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SelectWidget = function SelectWidget(props) {
  var _ui$options, _ui$allowClear;

  var ui = props.ui,
      record = props.record,
      dataIndex = props.dataIndex,
      tableModel = props.tableModel,
      value = props.value;

  var onChange = function onChange(val) {
    tableModel.edit(record, dataIndex, val);
  };

  var filterOption = function filterOption(input, option) {
    var _ui$filterOption;

    var filterOption = (_ui$filterOption = ui.filterOption) !== null && _ui$filterOption !== void 0 ? _ui$filterOption : true;
    return filterOption ? !!(0, _pinyinMatch.match)(option.label, input) : true;
  };

  var options = (_ui$options = ui === null || ui === void 0 ? void 0 : ui.options) !== null && _ui$options !== void 0 ? _ui$options : [];
  options.forEach(function (e, idx) {
    e.key = idx;
  });
  return /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({}, ui, {
    value: value,
    onChange: onChange,
    options: options,
    className: "cell-input",
    autoFocus: true,
    showSearch: true,
    allowClear: (_ui$allowClear = ui.allowClear) !== null && _ui$allowClear !== void 0 ? _ui$allowClear : true,
    filterOption: filterOption
  }));
};

exports.SelectWidget = SelectWidget;