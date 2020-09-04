"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _tools = require("./tools");

var _displayColumns = require("./display-columns");

var ICON = _interopRequireWildcard(require("@ant-design/icons"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    padding: 0 12px;\n    .display-columns {\n        padding-right: 0;\n    }\n    .op-btn {\n        padding: 0;\n    }\n    .changed {\n        .cg-tip {\n            margin-right: 5px;\n        }\n        .ant-btn {\n            padding: 0;\n            margin-left: 5px;\n        }\n    }\n    .selection {\n        .ant-btn {\n            padding: 0;\n            margin-left: 5px;\n        }\n    }\n    .ant-btn > .anticon + span {\n        margin-left: 4px;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StatusBar = function StatusBar(props) {
  var _props$buttons;

  var tableModel = _react.default.useContext(_tools.TableContext);

  var _tableModel$changedIn = tableModel.changedInfo,
      adds = _tableModel$changedIn.adds,
      modifies = _tableModel$changedIn.modifies,
      dels = _tableModel$changedIn.dels;
  var hasChanged = !!adds.length || !!modifies.length || !!dels.length;
  var selectedRows = tableModel.selectedRows;
  var hasSelected = !!selectedRows.length;

  var onSave = function onSave() {
    var _props$onSave;

    if (((_props$onSave = props.onSave) === null || _props$onSave === void 0 ? void 0 : _props$onSave.call(tableModel, tableModel.changed)) === false) {
      return;
    }

    console.log(tableModel.changed);
  };

  var onCancel = function onCancel() {
    var _props$onCancel;

    if (((_props$onCancel = props.onCancel) === null || _props$onCancel === void 0 ? void 0 : _props$onCancel.call(tableModel, tableModel.changed)) === false) {
      return;
    }

    tableModel.resetEdit();
  };

  var onAdd = function onAdd() {
    var _props$onAdd;

    if (((_props$onAdd = props.onAdd) === null || _props$onAdd === void 0 ? void 0 : _props$onAdd.call(tableModel)) === false) {
      return;
    }

    tableModel.add();
  };

  var onExport = function onExport() {
    var _props$onExport;

    if (((_props$onExport = props.onExport) === null || _props$onExport === void 0 ? void 0 : _props$onExport.call(tableModel, tableModel.mergedData)) === false) {
      return;
    }

    tableModel.exportXlsx("下载");
  };

  var onDeleteSelection = function onDeleteSelection() {
    var _props$onDelete;

    if (((_props$onDelete = props.onDelete) === null || _props$onDelete === void 0 ? void 0 : _props$onDelete.call(tableModel, tableModel.selectedRecords)) === false) {
      return;
    }

    tableModel.deleteSelection();
  };

  return /*#__PURE__*/_react.default.createElement(Div, null, !props.hideAdjustColumns && /*#__PURE__*/_react.default.createElement(_displayColumns.DisplayColumns, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical",
    orientation: "center"
  }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onAdd,
    className: "op-btn",
    icon: /*#__PURE__*/_react.default.createElement(ICON.PlusCircleOutlined, null)
  }, "\u6DFB\u52A0"), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical",
    orientation: "center"
  }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onExport,
    className: "op-btn",
    icon: /*#__PURE__*/_react.default.createElement(ICON.ExportOutlined, null)
  }, "\u5BFC\u51FA"), (_props$buttons = props.buttons) === null || _props$buttons === void 0 ? void 0 : _props$buttons.map(function (e, idx) {
    var _e$icon;

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: idx
    }, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
      type: "vertical",
      orientation: "center"
    }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "link",
      onClick: function onClick() {
        var _e$onClick;

        return (_e$onClick = e.onClick) === null || _e$onClick === void 0 ? void 0 : _e$onClick.call(tableModel);
      },
      icon: (_e$icon = e.icon) !== null && _e$icon !== void 0 ? _e$icon : /*#__PURE__*/_react.default.createElement(ICON.SettingOutlined, null),
      className: "op-btn"
    }, e.text));
  })), hasSelected && /*#__PURE__*/_react.default.createElement("div", {
    className: "selection"
  }, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical",
    orientation: "center"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "sel-tip"
  }, "\u5DF2\u9009\u4E2D", selectedRows.length, "\u9879"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onDeleteSelection,
    icon: /*#__PURE__*/_react.default.createElement(ICON.DeleteOutlined, null)
  }, "\u5220\u9664")), hasChanged && /*#__PURE__*/_react.default.createElement("div", {
    className: "changed"
  }, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical",
    orientation: "center"
  }), !!adds.length && /*#__PURE__*/_react.default.createElement("span", {
    className: "cg-tip"
  }, "\u65B0\u589E[", adds.length, "]"), !!modifies.length && /*#__PURE__*/_react.default.createElement("span", {
    className: "cg-tip"
  }, "\u4FEE\u6539[", modifies.length, "]"), !!dels.length && /*#__PURE__*/_react.default.createElement("span", {
    className: "cg-tip"
  }, "\u5220\u9664[", dels.length, "]"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onSave,
    icon: /*#__PURE__*/_react.default.createElement(ICON.CloudUploadOutlined, null)
  }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onCancel,
    icon: /*#__PURE__*/_react.default.createElement(ICON.RedoOutlined, null)
  }, "\u64A4\u9500")));
};

exports.StatusBar = StatusBar;

var Div = _styledComponents.default.div(_templateObject());